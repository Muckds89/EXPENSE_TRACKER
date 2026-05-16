"use client";
import { useMemo } from "react";
import { TrendingUp, Calendar, CreditCard, DollarSign } from "lucide-react";
import { Expense } from "@/lib/types";
import { formatCurrency, getCurrentMonthTotal } from "@/lib/utils";

interface Props {
  expenses: Expense[];
}

export default function SummaryCards({ expenses }: Props) {
  const stats = useMemo(() => {
    const total = expenses.reduce((s, e) => s + e.amount, 0);
    const thisMonth = getCurrentMonthTotal(expenses);
    const avg = expenses.length > 0 ? total / expenses.length : 0;
    return { total, thisMonth, avg, count: expenses.length };
  }, [expenses]);

  const cards = [
    {
      label: "Total Spending",
      value: formatCurrency(stats.total),
      icon: DollarSign,
      lightColor: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
    {
      label: "This Month",
      value: formatCurrency(stats.thisMonth),
      icon: Calendar,
      lightColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      label: "Avg per Expense",
      value: formatCurrency(stats.avg),
      icon: TrendingUp,
      lightColor: "bg-amber-50",
      textColor: "text-amber-600",
    },
    {
      label: "Total Expenses",
      value: stats.count.toString(),
      icon: CreditCard,
      lightColor: "bg-rose-50",
      textColor: "text-rose-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon, lightColor, textColor }) => (
        <div
          key={label}
          className="bg-white rounded-xl p-5 shadow-card border border-gray-100"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
            <div
              className={`w-9 h-9 ${lightColor} ${textColor} rounded-lg flex items-center justify-center`}
            >
              <Icon className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 tabular-nums">{value}</p>
        </div>
      ))}
    </div>
  );
}
