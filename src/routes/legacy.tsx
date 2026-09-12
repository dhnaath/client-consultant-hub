import { createFileRoute } from "@tanstack/react-router";
import { LegacyView } from "../finance/views/LegacyView";
import { AppShell } from "../components/app-shell";
import { useState } from "react";
import { useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/legacy")({
  head: () => ({
    meta: [
      { title: "Tahap Legacy — Client OS" },
      { name: "description", content: "Tahap 5: Legacy (Warisan)." },
    ],
  }),
  component: LegacyPage,
});

function LegacyPage() {
  const [currentTab, setCurrentTab] = useState("");
  const router = useRouter();

  return (
    <AppShell title="Tahap 5: Legacy" subtitle="Warisan">
      <div className="w-full -mt-8">
        <LegacyView
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
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
