"use client";
import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { useExpenses } from "@/hooks/useExpenses";
import { filterExpenses, exportToCSV, formatCurrency } from "@/lib/utils";
import { ExpenseFilter } from "@/lib/types";
import FilterBar from "@/components/FilterBar";
import ExpenseCard from "@/components/ExpenseCard";
import EmptyState from "@/components/EmptyState";

const DEFAULT_FILTER: ExpenseFilter = {
  search: "",
  category: "All",
  dateFrom: "",
  dateTo: "",
};

function ExpensesContent() {
  const { expenses, isLoaded, deleteExpense } = useExpenses();
  const [filter, setFilter] = useState<ExpenseFilter>(DEFAULT_FILTER);
  const searchParams = useSearchParams();
  const toast = searchParams.get("toast");

  const sorted = useMemo(() => {
    const filtered = filterExpenses(expenses, filter);
    return [...filtered].sort((a, b) => b.date.localeCompare(a.date));
  }, [expenses, filter]);

  const filteredTotal = useMemo(
    () => sorted.reduce((s, e) => s + e.amount, 0),
    [sorted]
  );

  if (!isLoaded) {
    return (
      <div className="space-y-3 animate-pulse">
        <div className="h-32 bg-gray-200 rounded-xl" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 bg-gray-200 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {toast && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-sm animate-slide-up">
          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          {toast === "added" && "Expense added successfully."}
          {toast === "updated" && "Expense updated successfully."}
        </div>
      )}

      <FilterBar
        filter={filter}
        onChange={setFilter}
        onExport={() => exportToCSV(sorted)}
      />

      <div className="bg-white rounded-xl border border-gray-100 shadow-card overflow-hidden">
        {sorted.length === 0 ? (
          <EmptyState filtered={expenses.length > 0} />
        ) : (
          <>
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50/50">
              <p className="text-xs text-gray-500">
                {sorted.length} of {expenses.length} expense
                {expenses.length !== 1 ? "s" : ""}
              </p>
              <p className="text-xs font-semibold text-gray-700">
                {formatCurrency(filteredTotal)}
              </p>
            </div>
            {sorted.map((expense) => (
              <ExpenseCard key={expense.id} expense={expense} onDelete={deleteExpense} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default function ExpensesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Browse, filter, and manage all your expenses
        </p>
      </div>
      <Suspense
        fallback={
          <div className="animate-pulse h-64 bg-gray-200 rounded-xl" />
        }
      >
        <ExpensesContent />
      </Suspense>
    </div>
  );
}
