import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { EmptyState } from "@/components/app/empty-state";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Tableau de bord · VisionNet" },
      { name: "description", content: "Tableau de bord — VisionNet" },
      { property: "og:title", content: "Tableau de bord · VisionNet" },
      { property: "og:description", content: "Tableau de bord — VisionNet" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Tableau de bord" />
      <EmptyState icon={LayoutDashboard} title="Disponible à l'étape 3" />
    </>
  );
}
