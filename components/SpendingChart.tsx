"use client";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Expense } from "@/lib/types";
import { getMonthlyStats, formatCurrency } from "@/lib/utils";

interface Props {
  expenses: Expense[];
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload?.[0]) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-3">
        <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
        <p className="text-base font-bold text-indigo-600">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
}

export default function SpendingChart({ expenses }: Props) {
  const data = useMemo(() => getMonthlyStats(expenses), [expenses]);

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
        No data to display yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `$${v}`}
          width={55}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f5f3ff", radius: 4 }} />
        <Bar dataKey="total" fill="#6366f1" radius={[6, 6, 0, 0]} maxBarSize={52} />
      </BarChart>
    </ResponsiveContainer>
  );
}
