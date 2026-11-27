import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { EmptyState } from "@/components/app/empty-state";

export const Route = createFileRoute("/_authenticated/saas")({
  head: () => ({
    meta: [
      { title: "SaaS connectés · VisionNet" },
      { name: "description", content: "SaaS connectés — VisionNet" },
      { property: "og:title", content: "SaaS connectés · VisionNet" },
      { property: "og:description", content: "SaaS connectés — VisionNet" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="SaaS connectés" />
      <EmptyState icon={Boxes} title="Disponible à l'étape 2" />
    </>
  );
}
