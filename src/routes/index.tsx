import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VisionNet" },
      { name: "description", content: "Suivi de croissance centralisé de vos SaaS." },
      { property: "og:title", content: "VisionNet" },
      { property: "og:description", content: "Suivi de croissance centralisé de vos SaaS." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" });
  },
});
