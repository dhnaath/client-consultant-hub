import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Item, QuadrantData } from "../types";

interface QuadrantProps {
  data: QuadrantData;
  items: Item[];
  onAddItem: (text: string) => void;
  onRemoveItem: (id: string) => void;
}

const themeStyles = {
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-700",
    button: "bg-emerald-500 text-white hover:bg-emerald-600",
    itemBg: "bg-emerald-50 border-emerald-100",
  },
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-700",
    button: "bg-amber-500 text-white hover:bg-amber-600",
    itemBg: "bg-amber-50 border-amber-100",
  },
  rose: {
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    text: "text-rose-700",
    button: "bg-rose-500 text-white hover:bg-rose-600",
    itemBg: "bg-rose-50 border-rose-100",
  },
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-700",
    button: "bg-blue-500 text-white hover:bg-blue-600",
    itemBg: "bg-blue-50 border-blue-100",
  },
  indigo: {
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    text: "text-indigo-700",
    button: "bg-indigo-500 text-white hover:bg-indigo-600",
    itemBg: "bg-indigo-50 border-indigo-100",
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    text: "text-purple-700",
    button: "bg-purple-500 text-white hover:bg-purple-600",
    itemBg: "bg-purple-50 border-purple-100",
  },
};

export function Quadrant({ data, items, onAddItem, onRemoveItem }: QuadrantProps) {
  const [newItemText, setNewItemText] = useState("");
  const styles = themeStyles[data.theme];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemText.trim()) {
      onAddItem(newItemText.trim());
      setNewItemText("");
    }
  };

  return (
    <div
      className={`flex flex-col rounded-2xl border ${styles.border} ${styles.bg} p-5 overflow-hidden transition-all duration-200 hover:shadow-md`}
    >
      <div className="mb-4">
        <h3 className={`text-lg font-bold ${styles.text} mb-1`}>{data.title}</h3>
        <p className="text-sm text-muted-foreground font-medium">{data.subtitle}</p>
      </div>

      <div className="flex-1 overflow-y-auto min-h-[150px] mb-4 space-y-2 pr-2 custom-scrollbar">
        {items.map((item) => (
          <div
            key={item.id}
            className={`group flex items-start gap-3 rounded-xl border ${styles.itemBg} p-3 transition-all hover:shadow-sm`}
          >
            <div
              className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${styles.text.replace("text-", "bg-")}`}
            />
            <span className="flex-1 text-sm font-medium text-foreground leading-relaxed">
              {item.text}
            </span>
            <button
              onClick={() => onRemoveItem(item.id)}
              className="shrink-0 rounded-md p-1.5 text-muted-foreground opacity-0 transition-all hover:bg-black/5 hover:text-destructive group-hover:opacity-100"
              title="Remove item"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <div className="flex h-full items-center justify-center rounded-xl border-2 border-dashed border-black/5 bg-white/50 p-6 text-center">
            <p className="text-sm font-medium text-muted-foreground/60">
              Belum ada item ditambahkan
            </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="relative mt-auto">
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Ketik lalu Enter..."
          className="w-full rounded-xl border border-input bg-background/80 px-4 py-2.5 pr-12 text-sm shadow-sm backdrop-blur transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={!newItemText.trim()}
          className={`absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-lg transition-colors disabled:opacity-50 ${styles.button}`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
