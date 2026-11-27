import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { EmptyState } from "@/components/app/empty-state";

export const Route = createFileRoute("/_authenticated/parametres")({
  head: () => ({
    meta: [
      { title: "Paramètres · VisionNet" },
      { name: "description", content: "Paramètres — VisionNet" },
      { property: "og:title", content: "Paramètres · VisionNet" },
      { property: "og:description", content: "Paramètres — VisionNet" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Paramètres" />
      <EmptyState icon={Settings} title="Disponible à l'étape 5" />
    </>
  );
}
