import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/app/logo";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Nouveau mot de passe · VisionNet" },
      { name: "description", content: "Définir un nouveau mot de passe." },
      { property: "og:title", content: "Nouveau mot de passe · VisionNet" },
      { property: "og:description", content: "Définir un nouveau mot de passe." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResetPage,
});

const schema = z.object({ password: z.string().min(8, "8 caractères minimum").max(128), confirm: z.string() })
  .refine((d) => d.password === d.confirm, { message: "Les mots de passe diffèrent" });

function ResetPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setReady(true);
    });
    supabase.auth.getSession().then(({ data: d }) => d.session && setReady(true));
    return () => data.subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const r = schema.safeParse({ password, confirm });
    if (!r.success) { toast.error(r.error.issues[0]?.message ?? "Invalide"); return; }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: r.data.password });
    setBusy(false);
    if (error) { toast.error("Mise à jour impossible"); return; }
    toast.success("Mot de passe défini");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <Logo className="mb-10 justify-center" />
        <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <h1 className="mb-6 text-lg font-semibold tracking-tight">Nouveau mot de passe</h1>
          {ready ? (
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="pw">Mot de passe</Label>
                <Input id="pw" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pw2">Confirmation</Label>
                <Input id="pw2" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
              </div>
              <Button type="submit" className="w-full" disabled={busy}>
                {busy ? <Loader2 className="size-4 animate-spin" /> : null}
                Enregistrer
              </Button>
            </form>
          ) : (
            <p className="text-sm text-muted-foreground">Lien invalide ou expiré.</p>
          )}
        </div>
      </div>
    </div>
  );
}
