import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/admin/ui";
import { QueryManager } from "@/components/admin/QueryManager";

export const Route = createFileRoute("/admin/seller-queries")({
  head: () => ({ meta: [{ title: "Seller Queries — Aurelia Admin" }, { name: "description", content: "Seller Queries for the Aurelia Estates brokerage team." }, { property: "og:title", content: "Seller Queries — Aurelia Admin" }, { property: "og:description", content: "Seller Queries for the Aurelia Estates brokerage team." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <>
      <PageHeader title="Seller queries" text="Owners who want to list, sell or rent out their property." />
      <QueryManager kind="Seller" />
    </>
  ),
});
