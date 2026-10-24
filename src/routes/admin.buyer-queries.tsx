import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/admin/ui";
import { QueryManager } from "@/components/admin/QueryManager";

export const Route = createFileRoute("/admin/buyer-queries")({
  head: () => ({ meta: [{ title: "Buyer Queries — Aurelia Admin" }, { name: "description", content: "Buyer Queries for the Aurelia Estates brokerage team." }, { property: "og:title", content: "Buyer Queries — Aurelia Admin" }, { property: "og:description", content: "Buyer Queries for the Aurelia Estates brokerage team." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <>
      <PageHeader title="Buyer queries" text="Requirements captured from WhatsApp, AI calls and the website." />
      <QueryManager kind="Buyer" />
    </>
  ),
});
