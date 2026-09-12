#!/bin/bash
routes=("habits|HabitsView|Habits|Track your daily habits." "courses|CoursesView|Courses|Manage your courses." "flashcards|FlashcardsView|Flashcards|Study with flashcards." "exams|ExamsView|Exams|Track your exams." "languages|LanguagesView|Languages|Learn new languages." "movies|MoviesView|Movies|Movies to watch." "games|GamesView|Games|Games to play." "podcasts|PodcastsView|Podcasts|Podcasts to listen to." "events|EventsView|Events|Upcoming events.")

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
