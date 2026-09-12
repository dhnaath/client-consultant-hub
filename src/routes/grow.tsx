import { createFileRoute } from "@tanstack/react-router";
import { GrowView } from "../finance/views/GrowView";
import { AppShell } from "../components/app-shell";
import { useState } from "react";
import { useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/grow")({
  head: () => ({
    meta: [
      { title: "Tahap Grow — Client OS" },
      { name: "description", content: "Tahap 4: Grow (Pertumbuhan)." },
    ],
  }),
  component: GrowPage,
});

function GrowPage() {
  const [currentTab, setCurrentTab] = useState("");
  const router = useRouter();

  return (
    <AppShell title="Tahap 4: Grow" subtitle="Pertumbuhan">
      <div className="w-full -mt-8">
        <GrowView
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
