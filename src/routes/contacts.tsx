import { createFileRoute } from "@tanstack/react-router";
import { ContactsView } from "../wira/components/views/ContactsView";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "CRM — Client OS" },
      { name: "description", content: "Customer Relationship Management." },
    ],
  }),
  component: ContactsViewPage,
});

function ContactsViewPage() {
  return (
    <AppShell title="CRM" subtitle="Customer Relationship Management.">
      <div className="w-full">
        <ContactsView />
      </div>
    </AppShell>
  );
}
