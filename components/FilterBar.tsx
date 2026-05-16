"use client";
import { Search, X, Download } from "lucide-react";
import { ExpenseFilter, Category } from "@/lib/types";
import { CATEGORIES } from "@/lib/constants";

interface Props {
  filter: ExpenseFilter;
  onChange: (filter: ExpenseFilter) => void;
  onExport: () => void;
}

export default function FilterBar({ filter, onChange, onExport }: Props) {
  const update = (partial: Partial<ExpenseFilter>) =>
    onChange({ ...filter, ...partial });

  const hasFilters =
    filter.search || filter.category !== "All" || filter.dateFrom || filter.dateTo;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-card p-4 space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={filter.search}
          onChange={(e) => update({ search: e.target.value })}
          placeholder="Search by description or category…"
          className="w-full pl-9 pr-9 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors"
        />
        {filter.search && (
          <button
            onClick={() => update({ search: "" })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <select
          value={filter.category}
          onChange={(e) => update({ category: e.target.value as Category | "All" })}
          className="flex-1 min-w-[130px] py-2.5 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 bg-white text-gray-700 transition-colors"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={filter.dateFrom}
          onChange={(e) => update({ dateFrom: e.target.value })}
          className="flex-1 min-w-[140px] py-2.5 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 text-gray-700 transition-colors"
          placeholder="From"
        />
        <input
          type="date"
          value={filter.dateTo}
          onChange={(e) => update({ dateTo: e.target.value })}
          className="flex-1 min-w-[140px] py-2.5 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 text-gray-700 transition-colors"
          placeholder="To"
        />

        {hasFilters && (
          <button
            onClick={() =>
              onChange({ search: "", category: "All", dateFrom: "", dateTo: "" })
            }
            className="py-2.5 px-3 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
          >
            Clear
          </button>
        )}

        <button
          onClick={onExport}
          className="flex items-center gap-1.5 py-2.5 px-4 text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors ml-auto"
        >
          <Download className="w-3.5 h-3.5" />
          Export CSV
        </button>
      </div>
    </div>
  );
}
