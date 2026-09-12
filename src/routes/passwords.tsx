import { createFileRoute } from "@tanstack/react-router";
import { PasswordsView } from "../wira/components/views/PasswordsView";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/passwords")({
  head: () => ({
    meta: [
      { title: "Passwords — Client OS" },
      { name: "description", content: "Securely manage your passwords and secrets." },
    ],
  }),
  component: PasswordsViewPage,
});

function PasswordsViewPage() {
  return (
    <AppShell title="Passwords" subtitle="Securely manage your passwords and secrets.">
      <div className="w-full">
        <PasswordsView />
      </div>
    </AppShell>
  );
}
