"use client";
import { useState, useEffect, useCallback } from "react";
import { Expense } from "@/lib/types";
import { loadExpenses, saveExpenses } from "@/lib/storage";
import { generateId } from "@/lib/utils";

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setExpenses(loadExpenses());
    setIsLoaded(true);
  }, []);

  const sync = useCallback((updated: Expense[]) => {
    setExpenses(updated);
    saveExpenses(updated);
  }, []);

  const addExpense = useCallback(
    (data: Omit<Expense, "id" | "createdAt">): Expense => {
      const expense: Expense = {
        ...data,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };
      setExpenses((prev) => {
        const updated = [expense, ...prev];
        saveExpenses(updated);
        return updated;
      });
      return expense;
    },
    []
  );

  const updateExpense = useCallback(
    (id: string, data: Omit<Expense, "id" | "createdAt">) => {
      setExpenses((prev) => {
        const updated = prev.map((e) => (e.id === id ? { ...e, ...data } : e));
        saveExpenses(updated);
        return updated;
      });
    },
    []
  );

  const deleteExpense = useCallback((id: string) => {
    setExpenses((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      saveExpenses(updated);
      return updated;
    });
  }, []);

  const getExpenseById = useCallback(
    (id: string) => expenses.find((e) => e.id === id),
    [expenses]
  );

  return { expenses, isLoaded, addExpense, updateExpense, deleteExpense, getExpenseById };
}
