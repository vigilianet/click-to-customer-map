import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { EmptyState } from "@/components/app/empty-state";

export const Route = createFileRoute("/_authenticated/documentation")({
  head: () => ({
    meta: [
      { title: "Documentation · VisionNet" },
      { name: "description", content: "Documentation — VisionNet" },
      { property: "og:title", content: "Documentation · VisionNet" },
      { property: "og:description", content: "Documentation — VisionNet" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Documentation" />
      <EmptyState icon={BookOpen} title="Disponible à l'étape 5" />
    </>
  );
}
