"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useExpenses } from "@/hooks/useExpenses";
import ExpenseForm from "@/components/ExpenseForm";
import { Expense } from "@/lib/types";

export default function AddExpensePage() {
  const router = useRouter();
  const { addExpense } = useExpenses();

  const handleSubmit = (data: Omit<Expense, "id" | "createdAt">) => {
    addExpense(data);
    router.push("/expenses?toast=added");
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <Link
          href="/expenses"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Expenses
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Add Expense</h1>
        <p className="text-sm text-gray-500 mt-0.5">Record a new expense to your tracker</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
        <ExpenseForm mode="add" onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
