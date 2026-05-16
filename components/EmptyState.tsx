import Link from "next/link";
import { Plus, Receipt } from "lucide-react";

interface Props {
  filtered?: boolean;
}

export default function EmptyState({ filtered = false }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
        <Receipt className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-1">
        {filtered ? "No expenses found" : "No expenses yet"}
      </h3>
      <p className="text-sm text-gray-400 mb-6 max-w-xs">
        {filtered
          ? "Try adjusting your filters to find what you're looking for."
          : "Start tracking your spending by adding your first expense."}
      </p>
      {!filtered && (
        <Link
          href="/add"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add First Expense
        </Link>
      )}
    </div>
  );
}
