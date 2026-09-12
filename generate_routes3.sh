#!/bin/bash
routes=("design|DesignView|Design|Design projects and resources." "photography|PhotographyView|Photography|Manage your photos." "writing|WritingView|Writing|Write and manage documents." "code|CodeView|Code|Code snippets and projects." "contacts|ContactsView|CRM|Customer Relationship Management.")

for route in "${routes[@]}"; do
  IFS="|" read -r id component title desc <<< "$route"
  cat << INNER_EOF > src/routes/$id.tsx
import { createFileRoute } from "@tanstack/react-router";
import { $component } from "../wira/components/views/$component";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/$id")({
  head: () => ({
    meta: [
      { title: "$title — Client OS" },
      { name: "description", content: "$desc" },
    ],
  }),
  component: ${component}Page,
});

function ${component}Page() {
  return (
    <AppShell title="$title" subtitle="$desc">
      <div className="w-full">
        <$component />
      </div>
    </AppShell>
  );
}
INNER_EOF
done
