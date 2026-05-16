"use client";
import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { useExpenses } from "@/hooks/useExpenses";
import SummaryCards from "@/components/SummaryCards";
import SpendingChart from "@/components/SpendingChart";
import CategoryBreakdown from "@/components/CategoryBreakdown";
import ExpenseCard from "@/components/ExpenseCard";
import EmptyState from "@/components/EmptyState";

function SkeletonCard() {
  return <div className="h-28 bg-gray-200 rounded-xl animate-pulse" />;
}

export default function Dashboard() {
  const { expenses, isLoaded, deleteExpense } = useExpenses();

  const recent = useMemo(
    () => [...expenses].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5),
    [expenses]
  );

  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        <div className="h-72 bg-gray-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {expenses.length === 0
              ? "Start tracking your expenses"
              : `${expenses.length} expense${expenses.length !== 1 ? "s" : ""} recorded`}
          </p>
        </div>
        <Link
          href="/add"
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Expense</span>
          <span className="sm:hidden">Add</span>
        </Link>
      </div>

      {/* Summary */}
      <SummaryCards expenses={expenses} />

      {expenses.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-card">
          <EmptyState />
        </div>
      ) : (
        <>
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 shadow-card p-6">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-5">
                Monthly Spending
              </h2>
              <SpendingChart expenses={expenses} />
            </div>
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-card p-6">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-5">
                By Category
              </h2>
              <CategoryBreakdown expenses={expenses} />
            </div>
          </div>

          {/* Recent expenses */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Recent Expenses
              </h2>
              <Link
                href="/expenses"
                className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
              >
                View all
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {recent.map((expense) => (
              <ExpenseCard key={expense.id} expense={expense} onDelete={deleteExpense} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
