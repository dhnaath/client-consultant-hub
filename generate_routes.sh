#!/bin/bash
routes=("recipes|RecipesView|Recipes|Manage your recipes." "music|MusicView|Music|Listen and manage music." "weather|WeatherView|Weather|Check the weather." "reading|ReadingListView|Reading List|Books and articles to read." "trips|TripsView|Trips|Plan your trips." "shopping|ShoppingListView|Shopping List|Manage your shopping list." "health|HealthView|Health|Track your health." "inventory|InventoryView|Inventory|Manage your inventory." "subscriptions|SubscriptionsView|Subscriptions|Manage your subscriptions.")

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
