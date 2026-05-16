"use client";
import { Trash2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({ isOpen, description, onCancel, onConfirm }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-slide-up">
        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
          <Trash2 className="w-6 h-6 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-center text-gray-900 mb-2">
          Delete Expense
        </h3>
        <p className="text-sm text-gray-500 text-center mb-6">
          Are you sure you want to delete{" "}
          <span className="font-medium text-gray-700">"{description}"</span>? This cannot be
          undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
