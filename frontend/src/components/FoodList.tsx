"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

export interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: string;
}

export default function FoodList() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    fetch(`${apiUrl}/api/`)
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch foods:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {foods.map((food) => (
        <div
          key={food.id}
          className="relative group bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-secondary/10"
        >
          {/* Gradient Header */}
          <div className="h-40 bg-gradient-to-br from-primary via-secondary to-accent relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
            <div className="absolute top-6 right-6 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
              <span className="text-white font-black text-lg">${food.price}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 pt-6 relative">
            {/* Decoration */}
            <div className="absolute -top-10 left-8 w-20 h-20 bg-white rounded-3xl shadow-xl transform rotate-12 flex items-center justify-center p-4">
              <span className="text-4xl">🍕</span>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-black text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                {food.name}
              </h3>
              <p className="text-foreground/50 text-sm font-medium leading-relaxed mb-8 line-clamp-2">
                {food.description || "No description provided."}
              </p>
            </div>

            <button
              onClick={() =>
                addToCart({ id: food.id, name: food.name, price: Number(food.price) })
              }
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95 group-hover:bg-secondary"
            >
              <span>Add to Cart</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
