"use client";

import React from "react";
import { useCart } from "@/context/CartContext";

export default function Navbar({ onCartOpen }: { onCartOpen: () => void }) {
  const { items } = useCart();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-secondary/20 h-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto h-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg transform -rotate-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="3"
            >
              <path d="M12 2L2 7l10 5l10-5l-10-5z" />
              <path d="M2 17l10 5l10-5" />
              <path d="M2 12l10 5l10-5" />
            </svg>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-primary">
            Tasty<span className="text-secondary">App</span>
          </h1>
          <div className="hidden md:flex ml-8 gap-6 font-bold text-foreground/60">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <a href="/menu" className="hover:text-primary transition-colors">Menu</a>
          </div>
        </div>

        <button
          onClick={onCartOpen}
          className="relative p-3 bg-white hover:bg-secondary/10 rounded-2xl border border-secondary/20 transition-all shadow-sm hover:shadow-md active:scale-95 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary group-hover:text-secondary h-6 w-6"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-md animate-in zoom-in border-2 border-background">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
