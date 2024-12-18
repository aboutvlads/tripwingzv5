"use client";

import { cn } from "@/lib/utils";
import type { TripTag } from "@/types/flight";

interface TagProps {
  tag: TripTag;
  selected?: boolean;
  size?: "sm" | "md";
}

const tagStyles: Record<TripTag, { bg: string, hoverBg: string }> = {
  foodie: {
    bg: "bg-[#FFE4E1]/40", // Pastel Pink
    hoverBg: "hover:bg-[#FFE4E1]/60"
  },
  rave: {
    bg: "bg-[#E6E6FA]/40", // Pastel Purple
    hoverBg: "hover:bg-[#E6E6FA]/60"
  },
  girlstrip: {
    bg: "bg-[#FFB6C1]/40", // Light Pink
    hoverBg: "hover:bg-[#FFB6C1]/60"
  },
  date: {
    bg: "bg-[#98FB98]/40", // Pastel Green
    hoverBg: "hover:bg-[#98FB98]/60"
  },
  cartrip: {
    bg: "bg-[#87CEEB]/40", // Sky Blue
    hoverBg: "hover:bg-[#87CEEB]/60"
  },
  friends: {
    bg: "bg-[#DDA0DD]/40", // Plum
    hoverBg: "hover:bg-[#DDA0DD]/60"
  }
};

const tagEmojis: Record<TripTag, string> = {
  foodie: "🍽️",
  rave: "🎉",
  girlstrip: "👯‍♀️",
  date: "💕",
  cartrip: "🚗",
  friends: "🤝"
};

const tagLabels: Record<TripTag, string> = {
  foodie: "foodie",
  rave: "rave",
  girlstrip: "girlstrip",
  date: "date",
  cartrip: "cartrip",
  friends: "friends"
};

export function Tag({ tag, selected = false, size = "md" }: TagProps) {
  const styles = tagStyles[tag];
  
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full transition-colors",
        size === "md" ? "px-4 py-2" : "px-3 py-1.5 text-sm",
        selected
          ? "bg-black text-white"
          : cn(styles.bg, styles.hoverBg, "text-black")
      )}
    >
      <span>{tagEmojis[tag]}</span>
      <span className="font-medium">{tagLabels[tag]}</span>
    </div>
  );
}