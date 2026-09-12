import { createFileRoute } from "@tanstack/react-router";
import { SubscriptionsView } from "../wira/components/views/SubscriptionsView";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/subscriptions")({
  head: () => ({
    meta: [
      { title: "Subscriptions — Client OS" },
      { name: "description", content: "Manage your subscriptions." },
    ],
  }),
  component: SubscriptionsViewPage,
});

function SubscriptionsViewPage() {
  return (
    <AppShell title="Subscriptions" subtitle="Manage your subscriptions.">
      <div className="w-full">
        <SubscriptionsView />
      </div>
    </AppShell>
  );
}
