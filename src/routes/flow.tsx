import { createFileRoute } from "@tanstack/react-router";
import { FlowView } from "../finance/views/FlowView";
import { AppShell } from "../components/app-shell";
import { useState } from "react";
import { useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/flow")({
  head: () => ({
    meta: [
      { title: "Tahap Flow — Client OS" },
      { name: "description", content: "Tahap 2: Flow (Arus Kas)." },
    ],
  }),
  component: FlowPage,
});

function FlowPage() {
  const [currentTab, setCurrentTab] = useState("");
  const router = useRouter();

  return (
    <AppShell title="Tahap 2: Flow" subtitle="Arus Kas">
      <div className="w-full -mt-8">
        <FlowView
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          onNavigate={(view) => {
            router.navigate({ to: `/${view}` }).catch(() => {
              console.warn("View not found:", view);
            });
          }}
          onBack={() => {
            if (currentTab) {
              setCurrentTab("");
            } else {
              router.navigate({ to: "/" });
            }
          }}
        />
      </div>
    </AppShell>
  );
}
