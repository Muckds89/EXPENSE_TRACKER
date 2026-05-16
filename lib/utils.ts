import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, startOfMonth, endOfMonth, parseISO } from "date-fns";
import { Expense, ExpenseFilter, CategoryStat, MonthlyStat, Category } from "./types";
import { CATEGORY_CONFIG } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), "MMM d, yyyy");
  } catch {
    return dateStr;
  }
}

export function todayISO(): string {
  return format(new Date(), "yyyy-MM-dd");
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function filterExpenses(expenses: Expense[], filter: ExpenseFilter): Expense[] {
  return expenses.filter((e) => {
    if (filter.category !== "All" && e.category !== filter.category) return false;
    if (filter.dateFrom && e.date < filter.dateFrom) return false;
    if (filter.dateTo && e.date > filter.dateTo) return false;
    if (filter.search) {
      const q = filter.search.toLowerCase();
      if (!e.description.toLowerCase().includes(q) && !e.category.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });
}

export function getCategoryStats(expenses: Expense[]): CategoryStat[] {
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const map: Record<string, { total: number; count: number }> = {};

  for (const e of expenses) {
    if (!map[e.category]) map[e.category] = { total: 0, count: 0 };
    map[e.category].total += e.amount;
    map[e.category].count++;
  }

  return Object.entries(map)
    .map(([category, { total: cat, count }]) => ({
      category: category as any,
      total: cat,
      count,
      percentage: total > 0 ? (cat / total) * 100 : 0,
      color: CATEGORY_CONFIG[category as Category]?.color ?? "text-gray-600",
      bgColor: CATEGORY_CONFIG[category as Category]?.bgColor ?? "bg-gray-100",
    }))
    .sort((a, b) => b.total - a.total);
}

export function getMonthlyStats(expenses: Expense[]): MonthlyStat[] {
  const map: Record<string, number> = {};
  for (const e of expenses) {
    const month = e.date.substring(0, 7);
    map[month] = (map[month] ?? 0) + e.amount;
  }
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([month, total]) => ({
      month: format(parseISO(`${month}-01`), "MMM yy"),
      total,
    }));
}

export function getCurrentMonthTotal(expenses: Expense[]): number {
  const now = new Date();
  const start = format(startOfMonth(now), "yyyy-MM-dd");
  const end = format(endOfMonth(now), "yyyy-MM-dd");
  return expenses
    .filter((e) => e.date >= start && e.date <= end)
    .reduce((s, e) => s + e.amount, 0);
}

export function exportToCSV(expenses: Expense[]): void {
  const headers = ["Date", "Amount", "Category", "Description"];
  const rows = expenses.map((e) => [
    e.date,
    e.amount.toFixed(2),
    e.category,
    `"${e.description.replace(/"/g, '""')}"`,
  ]);
  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `expenses-${format(new Date(), "yyyy-MM-dd")}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
