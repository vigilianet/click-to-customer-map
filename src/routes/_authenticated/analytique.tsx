import { createFileRoute } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { EmptyState } from "@/components/app/empty-state";

export const Route = createFileRoute("/_authenticated/analytique")({
  head: () => ({
    meta: [
      { title: "Analytique · VisionNet" },
      { name: "description", content: "Analytique — VisionNet" },
      { property: "og:title", content: "Analytique · VisionNet" },
      { property: "og:description", content: "Analytique — VisionNet" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Analytique" />
      <EmptyState icon={BarChart3} title="Disponible à l'étape 3" />
    </>
  );
}
