"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

export interface FoodItem {
  id: number;
  name: string;
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {foods.map((food) => (
        <div
          key={food.id}
          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-secondary/20 group"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-foreground">{food.name}</h3>
            <span className="text-lg font-semibold text-primary">
              ${food.price}
            </span>
          </div>
          <button
            onClick={() =>
              addToCart({ id: food.id, name: food.name, price: Number(food.price) })
            }
            className="w-full py-3 bg-secondary hover:bg-primary text-white rounded-xl font-bold transition-colors shadow-md hover:shadow-lg active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
