"use client";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useExpenses } from "@/hooks/useExpenses";
import ExpenseForm from "@/components/ExpenseForm";
import { Expense } from "@/lib/types";

export default function EditExpensePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { getExpenseById, updateExpense, isLoaded } = useExpenses();

  const expense = getExpenseById(id);

  const handleSubmit = (data: Omit<Expense, "id" | "createdAt">) => {
    updateExpense(id, data);
    router.push("/expenses?toast=updated");
  };

  if (!isLoaded) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-8 animate-pulse space-y-4">
        <div className="h-5 w-28 bg-gray-200 rounded" />
        <div className="h-8 w-48 bg-gray-200 rounded" />
        <div className="h-96 bg-gray-200 rounded-2xl" />
      </div>
    );
  }

  if (!expense) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-800 px-4 py-4 rounded-xl">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <div>
            <p className="font-medium text-sm">Expense not found</p>
            <Link href="/expenses" className="text-sm underline text-red-700">
              Back to expenses
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
        <h1 className="text-2xl font-bold text-gray-900">Edit Expense</h1>
        <p className="text-sm text-gray-500 mt-0.5">Update the details of your expense</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
        <ExpenseForm
          mode="edit"
          initialValues={{
            description: expense.description,
            amount: expense.amount,
            category: expense.category,
            date: expense.date,
          }}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
