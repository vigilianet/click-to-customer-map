# Click To Customer Map

Construis VisionNet, une plateforme web privée qui centralise le suivi de croissance de mes différents SaaS (MarketNet, PayLix, etc.). Elle suit le parcours complet source → clic → inscription → activation → abonnement.



STACK

React + Vite + TypeScript, Tailwind, shadcn/ui, React Router, TanStack Query, Recharts. Backend : Supabase (Postgres, Auth, Edge Functions, RLS). Déploiement Vercel. Langue de l'interface : français.



DESIGN

Professionnel, épuré, aéré, jamais surchargé. Responsive mobile-first, sidebar repliable, mode clair/sombre. Aucun texte descriptif inutile : libellés courts, états vides sobres. Composants réutilisables : PageHeader, StatCard, DataTable, EmptyState, StatusBadge, CopyField, ConfirmDialog, FunnelChart, DateRangePicker. Skeletons au chargement, toasts pour les retours.



PAGES

1. /login : connexion email + mot de passe (pas d'inscription publique).

2. /dashboard : KPIs (clics, inscriptions, activations, abonnements, taux de conversion) avec filtre de période, courbe d'évolution, top sources, derniers événements.

3. /saas : liste des SaaS connectés, ajout d'un SaaS (nom, URL, logo), statut de connexion (dernier événement reçu), clé API et secret de webhook (affichés une seule fois, régénérables).

4. /affiliation : choisir un SaaS, créer des liens de suivi (nom, canal : Facebook, WhatsApp, Telegram, TikTok, Instagram, YouTube, Autre, campagne optionnelle). Lien generer Bouton Copier. Stats par lien : clics, inscriptions, activations, conversion.

5. /analytique : entonnoir par SaaS (clics → inscriptions → étapes d'onboarding → activation → abonnement payant), étape de blocage la plus fréquente, performance par canal, et cartographie source → SaaS → étape (diagramme de flux de type Sankey).

6. /integrations : cartes d'intégrations (Telegram actif, d'autres à venir : Email, WhatsApp, Webhook sortant).

7. /documentation : guide d'intégration d'un SaaS (voir plus bas), avec onglets, blocs de code copiables, et la clé du SaaS sélectionné pré-remplie.

8. /parametres : profil, changement de mot de passe, journal d'activité.



MODÈLE DE DONNÉES (RLS activé partout, accès réservé aux utilisateurs authentifiés)

- saas(id, name, url, logo_url, api_key_hash, webhook_secret_encrypted, last_event_at, created_at)

- tracking_links(id, saas_id, code unique court, name, channel, campaign, created_at)

- clicks(id, link_id, ip_hash, user_agent, referrer, country, created_at)

- events(id, saas_id, link_id nullable, ref_code, event_type, external_user_id, step, metadata jsonb, created_at)

  event_type : signup, onboarding_step, subscription_activated, subscription_cancelled

- integrations(id, type, config_encrypted, status, created_at)

- alert_rules(id, integration_id, saas_id nullable, event_type, enabled)

- audit_logs(id, user_id, action, details jsonb, created_at)

- profiles(id, role) avec rôle admin



FLUX DE SUIVI (Edge Functions)

1. r/<code> : enregistre le clic (IP hachée, jamais en clair), puis redirige vers l'URL du SaaS avec ?vn_ref=<code>.

2. ingest-event : reçoit un POST JSON d'un SaaS. Authentifie via l'en-tête x-api-key, vérifie la signature HMAC SHA-256 (en-tête x-signature, corps brut, secret du SaaS) et un timestamp de moins de 5 minutes. Rejette sinon. Rattache l'événement au lien via ref_code, rend l'insertion idempotente (clé : saas_id + event_type + external_user_id + step), puis déclenche les alertes configurées. Limitation de débit par clé API.

3. Le SaaS conserve vn_ref à l'inscription et le renvoie dans chaque événement.



TELEGRAM

- L'utilisateur saisit le token du bot (BotFather). Il est chiffré en AES-256-GCM avec une clé stockée dans les secrets Supabase, jamais renvoyé au navigateur.

- VisionNet génère un code de liaison à usage unique (expire en 10 minutes) et l'affiche. L'utilisateur envoie ce code au bot ; la fonction telegram-webhook enregistre automatiquement le chat_id et confirme par un message.

- Configuration des alertes : par SaaS et par type d'événement (nouvelle inscription, activation, abonnement, annulation, blocage), avec interrupteurs.

- Message d'alerte court : SaaS, événement, canal source, heure.

- Bouton « Envoyer un test ».



DOCUMENTATION (page /documentation)

Sections courtes avec code copiable :

1. Vue d'ensemble : schéma du flux.

2. Récupérer sa clé API et son secret.

3. Capturer vn_ref à l'arrivée sur le SaaS (cookie ou stockage) et le sauvegarder à l'inscription.

4. Envoyer un événement : exemples en JavaScript/TypeScript (Bun/Node) et cURL, avec la génération de la signature HMAC.

5. Liste des événements et de leurs champs.

6. Tester la connexion (bouton « Envoyer un événement test » qui valide en direct).

7. Codes d'erreur et dépannage.



SÉCURITÉ

Aucun secret en clair dans le code ou le navigateur. Validation des entrées (zod) côté client et serveur. RLS strict. CORS restreint. Journal d'audit des actions sensibles. Mots de passe gérés par Supabase Auth. Pas de dépendance à une clé service côté client.



COMPTE ADMIN

Crée un utilisateur admin avec l'email kayoyolandry@gmail.com. Ne mets aucun mot de passe dans le code : je le définis moi-même dans Supabase Auth, ou via un lien de réinitialisation à la première connexion.



ORDRE DE CONSTRUCTION

1. Auth, layout, design system, schéma de base avec RLS.

2. SaaS connectés + Affiliation + fonctions r/ et ingest-event.

3. Dashboard + Analytique.

4. Intégration Telegram + alertes.

5. Documentation + Paramètres + journal d'audit.

Avance étape par étape, et demande-moi confirmation avant de passer à la suivante.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://click-to-customer-map.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fae80cea-37e5-43c8-93ca-c4dd5b50b1e2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
