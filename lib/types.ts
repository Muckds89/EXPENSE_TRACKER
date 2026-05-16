export type Category =
  | "Food"
  | "Transportation"
  | "Entertainment"
  | "Shopping"
  | "Bills"
  | "Other";

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  description: string;
  date: string;
  createdAt: string;
}

export interface ExpenseFilter {
  dateFrom: string;
  dateTo: string;
  category: Category | "All";
  search: string;
}

export interface CategoryStat {
  category: Category;
  total: number;
  count: number;
  percentage: number;
  color: string;
  bgColor: string;
}

export interface MonthlyStat {
  month: string;
  total: number;
}
