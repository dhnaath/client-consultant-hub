import { createFileRoute } from "@tanstack/react-router";
import { BuildView } from "../finance/views/BuildView";
import { AppShell } from "../components/app-shell";
import { useState } from "react";
import { useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/build")({
  head: () => ({
    meta: [
      { title: "Tahap Build — Client OS" },
      { name: "description", content: "Tahap 3: Build (Pembangunan)." },
    ],
  }),
  component: BuildPage,
});

function BuildPage() {
  const [currentTab, setCurrentTab] = useState("");
  const router = useRouter();

  return (
    <AppShell title="Tahap 3: Build" subtitle="Pembangunan">
      <div className="w-full -mt-8">
        <BuildView
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
