import { Expense } from "./types";
import { STORAGE_KEY } from "./constants";

export function loadExpenses(): Expense[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Expense[]) : [];
  } catch {
    return [];
  }
}

export function saveExpenses(expenses: Expense[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch {
    console.error("Failed to save expenses to localStorage");
  }
}
