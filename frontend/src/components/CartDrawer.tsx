"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer({
  isOpen,
  onClose,
  onCheckout,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}) {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl transition-transform transform translate-x-0 border-l border-secondary/20">
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-primary">Your Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary/10 rounded-full transition-colors text-foreground"
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
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12 text-foreground/60">
                Your cart is empty.
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between border border-secondary/10"
                >
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground">{item.name}</h4>
                    <p className="text-primary font-semibold">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 bg-background rounded-lg border border-secondary/20 p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 hover:bg-secondary/10 rounded text-foreground"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-bold text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 hover:bg-secondary/10 rounded text-foreground"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="mt-8 pt-8 border-t border-secondary/20">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-foreground">Total:</span>
                <span className="text-2xl font-bold text-primary">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full py-4 bg-primary hover:bg-secondary text-white rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
