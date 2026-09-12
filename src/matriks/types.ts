export type QuadrantId = "tl" | "tr" | "bl" | "br";
export type Theme = "emerald" | "amber" | "rose" | "blue" | "indigo" | "purple";

export interface Item {
  id: string;
  text: string;
}

export interface QuadrantData {
  id: QuadrantId;
  title: string;
  subtitle: string;
  theme: Theme;
}

export interface Framework {
  id: string;
  name: string;
  description: string;
  quadrants: Record<QuadrantId, QuadrantData>;
}
