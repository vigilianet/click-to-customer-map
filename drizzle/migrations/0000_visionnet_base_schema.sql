
create type public.app_role as enum ('admin', 'user');
create type public.event_type as enum ('signup','onboarding_step','subscription_activated','subscription_cancelled');
create type public.link_channel as enum ('facebook','whatsapp','telegram','tiktok','instagram','youtube','other');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  email text,
  created_at timestamptz not null default now()
);
grant select, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create policy "own profile read" on public.profiles for select to authenticated using (id = auth.uid() or public.has_role(auth.uid(),'admin'));
create policy "own profile update" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "own roles read" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email) on conflict do nothing;
  if lower(new.email) = 'kayoyolandry@gmail.com' then
    insert into public.user_roles (user_id, role) values (new.id, 'admin') on conflict do nothing;
  end if;
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- SaaS
create table public.saas (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  url text not null,
  logo_url text,
  api_key_hash text unique,
  api_key_prefix text,
  webhook_secret_encrypted text,
  last_event_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.tracking_links (
  id uuid primary key default gen_random_uuid(),
  saas_id uuid not null references public.saas(id) on delete cascade,
  code text not null unique check (code ~ '^[A-Za-z0-9_-]{4,16}$'),
  name text not null,
  channel public.link_channel not null default 'other',
  campaign text,
  created_at timestamptz not null default now()
);
create index on public.tracking_links (saas_id);

create table public.clicks (
  id uuid primary key default gen_random_uuid(),
  link_id uuid not null references public.tracking_links(id) on delete cascade,
  ip_hash text,
  user_agent text,
  referrer text,
  country text,
  created_at timestamptz not null default now()
);
create index on public.clicks (link_id, created_at);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  saas_id uuid not null references public.saas(id) on delete cascade,
  link_id uuid references public.tracking_links(id) on delete set null,
  ref_code text,
  event_type public.event_type not null,
  external_user_id text not null,
  step text not null default '',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (saas_id, event_type, external_user_id, step)
);
create index on public.events (saas_id, created_at);
create index on public.events (link_id);

create table public.integrations (
  id uuid primary key default gen_random_uuid(),
  type text not null unique,
  config_encrypted text,
  status text not null default 'inactive',
  created_at timestamptz not null default now()
);

create table public.alert_rules (
  id uuid primary key default gen_random_uuid(),
  integration_id uuid not null references public.integrations(id) on delete cascade,
  saas_id uuid references public.saas(id) on delete cascade,
  event_type text not null,
  enabled boolean not null default true,
  unique (integration_id, saas_id, event_type)
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  action text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index on public.audit_logs (created_at desc);

-- grants + admin-only RLS
grant select, insert, update, delete on public.saas, public.tracking_links, public.clicks, public.events, public.integrations, public.alert_rules to authenticated;
grant select, insert on public.audit_logs to authenticated;
grant all on public.saas, public.tracking_links, public.clicks, public.events, public.integrations, public.alert_rules, public.audit_logs to service_role;

alter table public.saas enable row level security;
alter table public.tracking_links enable row level security;
alter table public.clicks enable row level security;
alter table public.events enable row level security;
alter table public.integrations enable row level security;
alter table public.alert_rules enable row level security;
alter table public.audit_logs enable row level security;

create policy "admin all" on public.saas for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "admin all" on public.tracking_links for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "admin all" on public.clicks for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "admin all" on public.events for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "admin all" on public.integrations for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "admin all" on public.alert_rules for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "admin read" on public.audit_logs for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admin insert own" on public.audit_logs for insert to authenticated with check (public.has_role(auth.uid(),'admin') and user_id = auth.uid());
