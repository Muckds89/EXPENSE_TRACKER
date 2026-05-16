"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Expense, Category } from "@/lib/types";
import { CATEGORIES, CATEGORY_CONFIG } from "@/lib/constants";
import { todayISO } from "@/lib/utils";

type FormData = Omit<Expense, "id" | "createdAt">;

interface FormErrors {
  description?: string;
  amount?: string;
  date?: string;
}

interface Props {
  initialValues?: Partial<FormData>;
  onSubmit: (data: FormData) => void;
  mode: "add" | "edit";
}

export default function ExpenseForm({ initialValues, onSubmit, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    description: initialValues?.description ?? "",
    amount: initialValues?.amount ?? (0 as any),
    category: initialValues?.category ?? "Food",
    date: initialValues?.date ?? todayISO(),
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = <K extends keyof FormData>(field: K, value: FormData[K]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.description.trim()) errs.description = "Description is required.";
    else if (form.description.trim().length < 2) errs.description = "Too short — add more detail.";
    if (!form.amount || Number(form.amount) <= 0)
      errs.amount = "Amount must be greater than $0.";
    if (!form.date) errs.date = "Date is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      onSubmit({ ...form, amount: Number(form.amount) });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    "w-full px-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors placeholder:text-gray-400";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Description <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="e.g. Lunch at restaurant"
          className={`${inputBase} ${errors.description ? "border-red-300 bg-red-50/50" : "border-gray-200"}`}
        />
        {errors.description && (
          <p className="mt-1.5 text-xs text-red-500">{errors.description}</p>
        )}
      </div>

      {/* Amount + Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Amount <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm select-none">
              $
            </span>
            <input
              type="number"
              value={form.amount || ""}
              onChange={(e) => update("amount", e.target.value as any)}
              placeholder="0.00"
              step="0.01"
              min="0.01"
              className={`${inputBase} pl-8 ${errors.amount ? "border-red-300 bg-red-50/50" : "border-gray-200"}`}
            />
          </div>
          {errors.amount && (
            <p className="mt-1.5 text-xs text-red-500">{errors.amount}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
            max={todayISO()}
            className={`${inputBase} ${errors.date ? "border-red-300 bg-red-50/50" : "border-gray-200"}`}
          />
          {errors.date && (
            <p className="mt-1.5 text-xs text-red-500">{errors.date}</p>
          )}
        </div>
      </div>

      {/* Category picker */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CATEGORIES.map((cat) => {
            const cfg = CATEGORY_CONFIG[cat];
            const selected = form.category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => update("category", cat)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                  selected
                    ? `${cfg.bgColor} ${cfg.color} border-current shadow-sm`
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <span className="text-base leading-none">{cfg.icon}</span>
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "Saving…" : mode === "add" ? "Add Expense" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
