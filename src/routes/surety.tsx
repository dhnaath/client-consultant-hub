import { createFileRoute } from "@tanstack/react-router";
import { SuretyView } from "../finance/views/SuretyView";
import { AppShell } from "../components/app-shell";
import { useState } from "react";
import { useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/surety")({
  head: () => ({
    meta: [
      { title: "Tahap Surety — Client OS" },
      { name: "description", content: "Tahap 1: Surety (Kepastian)." },
    ],
  }),
  component: SuretyPage,
});

function SuretyPage() {
  const [currentTab, setCurrentTab] = useState("");
  const router = useRouter();

  return (
    <AppShell title="Tahap 1: Surety" subtitle="Kepastian">
      <div className="w-full -mt-8">
        <SuretyView
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
