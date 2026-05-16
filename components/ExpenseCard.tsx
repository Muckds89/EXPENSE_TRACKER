"use client";
import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Expense } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import CategoryBadge from "./CategoryBadge";
import DeleteModal from "./DeleteModal";

interface Props {
  expense: Expense;
  onDelete: (id: string) => void;
}

export default function ExpenseCard({ expense, onDelete }: Props) {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors group">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {expense.description}
            </p>
            <CategoryBadge category={expense.category} size="sm" />
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{formatDate(expense.date)}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <p className="text-sm font-bold text-gray-900 tabular-nums">
            {formatCurrency(expense.amount)}
          </p>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Link
              href={`/edit/${expense.id}`}
              className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              title="Edit"
            >
              <Pencil className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => setShowDelete(true)}
              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={showDelete}
        description={expense.description}
        onCancel={() => setShowDelete(false)}
        onConfirm={() => {
          onDelete(expense.id);
          setShowDelete(false);
        }}
      />
    </>
  );
}
