"use client";

import React from "react";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl p-8 border border-secondary/20 text-center animate-in zoom-in duration-200">
        <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-6 text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-black text-foreground mb-3">Delete Item?</h2>
        <p className="text-foreground/60 mb-8 leading-relaxed">
          Are you sure you want to remove <span className="text-primary font-bold">"{itemName}"</span>? This action cannot be undone.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className="w-full py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            Yes, Delete It
          </button>
          <button
            onClick={onClose}
            className="w-full py-4 bg-white hover:bg-secondary/10 text-foreground/60 rounded-2xl font-bold transition-all border border-secondary/20"
          >
            Keep It
          </button>
        </div>
      </div>
    </div>
  );
}
