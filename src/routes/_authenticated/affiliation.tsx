import { createFileRoute } from "@tanstack/react-router";
import { Link2 } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { EmptyState } from "@/components/app/empty-state";

export const Route = createFileRoute("/_authenticated/affiliation")({
  head: () => ({
    meta: [
      { title: "Affiliation · VisionNet" },
      { name: "description", content: "Affiliation — VisionNet" },
      { property: "og:title", content: "Affiliation · VisionNet" },
      { property: "og:description", content: "Affiliation — VisionNet" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Affiliation" />
      <EmptyState icon={Link2} title="Disponible à l'étape 2" />
    </>
  );
}
