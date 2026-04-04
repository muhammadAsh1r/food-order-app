"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function OrderForm({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { items, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({ customer: "", address: "" });
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    try {
      const response = await fetch(`${apiUrl}/order/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: formData.customer,
          address: formData.address,
          totalPrice: totalPrice,
          items: items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });

      if (response.ok) {
        clearCart();
        onSuccess();
        onClose();
        setFormData({ customer: "", address: "" }); // Reset form
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 border border-secondary/20">
        <h2 className="text-3xl font-bold text-primary mb-6">
          Delivery Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-foreground/70 mb-2 ml-1">
              Your Name
            </label>
            <input
              required
              type="text"
              value={formData.customer}
              onChange={(e) =>
                setFormData({ ...formData, customer: e.target.value })
              }
              className="w-full px-5 py-4 rounded-2xl border border-secondary/30 focus:border-primary outline-none transition-colors text-foreground"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-foreground/70 mb-2 ml-1">
              Delivery Address
            </label>
            <textarea
              required
              rows={3}
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full px-5 py-4 rounded-2xl border border-secondary/30 focus:border-primary outline-none transition-colors text-foreground"
              placeholder="123 Food St, Tasty City"
            />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-primary hover:bg-secondary text-white rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-70"
            >
              {submitting ? "Processing..." : `Confirm Order | $${totalPrice.toFixed(2)}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
