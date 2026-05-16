import { CATEGORY_CONFIG } from "@/lib/constants";
import { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  category: Category;
  size?: "sm" | "md";
}

export default function CategoryBadge({ category, size = "md" }: Props) {
  const config = CATEGORY_CONFIG[category];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium whitespace-nowrap",
        config.bgColor,
        config.color,
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
      )}
    >
      <span>{config.icon}</span>
      {category}
    </span>
  );
}
