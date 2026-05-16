"use client";
import { useMemo } from "react";
import { Expense } from "@/lib/types";
import { getCategoryStats, formatCurrency } from "@/lib/utils";
import { CATEGORY_CONFIG } from "@/lib/constants";

interface Props {
  expenses: Expense[];
}

export default function CategoryBreakdown({ expenses }: Props) {
  const stats = useMemo(() => getCategoryStats(expenses), [expenses]);

  if (stats.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
        No data to display yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {stats.map(({ category, total, percentage }) => {
        const config = CATEGORY_CONFIG[category];
        return (
          <div key={category}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span>{config.icon}</span>
                <span className="text-sm font-medium text-gray-700">{category}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">{percentage.toFixed(0)}%</span>
                <span className="text-sm font-semibold text-gray-900 tabular-nums">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${percentage}%`, backgroundColor: config.chartColor }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
