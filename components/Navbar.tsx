"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wallet, LayoutDashboard, List, Plus, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/expenses", label: "Expenses", icon: List },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-gray-900">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <span className="text-base">ExpenseTracker</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === href
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/add"
              className="hidden sm:flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Expense
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1 animate-fade-in">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                pathname === href
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
          <Link
            href="/add"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium bg-indigo-600 text-white"
          >
            <Plus className="w-4 h-4" />
            Add Expense
          </Link>
        </div>
      )}
    </nav>
  );
}
