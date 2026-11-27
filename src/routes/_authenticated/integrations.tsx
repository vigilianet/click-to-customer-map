import { createFileRoute } from "@tanstack/react-router";
import { Plug } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { EmptyState } from "@/components/app/empty-state";

export const Route = createFileRoute("/_authenticated/integrations")({
  head: () => ({
    meta: [
      { title: "Intégrations · VisionNet" },
      { name: "description", content: "Intégrations — VisionNet" },
      { property: "og:title", content: "Intégrations · VisionNet" },
      { property: "og:description", content: "Intégrations — VisionNet" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Intégrations" />
      <EmptyState icon={Plug} title="Disponible à l'étape 4" />
    </>
  );
}
