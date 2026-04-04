"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FoodItem } from "@/components/FoodList";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";

export default function AdminDashboard() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentFood, setCurrentFood] = useState<Partial<FoodItem> | null>(null);
  const [itemToDelete, setItemToDelete] = useState<FoodItem | null>(null);
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      router.push("/admin/login");
    } else {
      fetchFoods();
    }
  }, []);

  const fetchFoods = () => {
    fetch(`${apiUrl}/api/`)
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/");
  };

  const handleDeleteClick = (food: FoodItem) => {
    setItemToDelete(food);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      fetch(`${apiUrl}/api/${itemToDelete.id}/`, {
        method: "DELETE",
      }).then(() => {
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
        fetchFoods();
      });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const method = currentFood?.id ? "PUT" : "POST";
    const url = currentFood?.id
      ? `${apiUrl}/api/${currentFood.id}/`
      : `${apiUrl}/api/`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentFood),
    }).then(() => {
      setIsModalOpen(false);
      fetchFoods();
    });
  };

  if (loading) return <div className="p-20 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-black text-primary italic">Admin Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setCurrentFood({ name: "", price: "" });
                setIsModalOpen(true);
              }}
              className="px-6 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              + Add Item
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-white text-foreground border border-secondary/20 rounded-2xl font-bold shadow-sm hover:bg-secondary/10 transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-secondary/10">
          <table className="w-full text-left">
            <thead className="bg-secondary/10 text-primary font-bold">
              <tr>
                <th className="px-8 py-6">Name</th>
                <th className="px-8 py-6">Price</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary/10">
              {foods.map((food) => (
                <tr key={food.id} className="hover:bg-background/50 transition-colors">
                  <td className="px-8 py-6 font-bold text-foreground">{food.name}</td>
                  <td className="px-8 py-6 text-primary font-semibold">${food.price}</td>
                  <td className="px-8 py-6 text-right space-x-4">
                    <button
                      onClick={() => {
                        setCurrentFood(food);
                        setIsModalOpen(true);
                      }}
                      className="text-secondary hover:text-primary font-bold transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(food)}
                      className="text-red-500 hover:text-red-600 font-bold transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-primary mb-6">
              {currentFood?.id ? "Edit Item" : "Add New Item"}
            </h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-foreground/70 mb-2">Item Name</label>
                <input
                  required
                  type="text"
                  value={currentFood?.name}
                  onChange={(e) => setCurrentFood({ ...currentFood, name: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl border border-secondary/30 outline-none focus:border-primary text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-foreground/70 mb-2">Price ($)</label>
                <input
                  required
                  type="text"
                  value={currentFood?.price}
                  onChange={(e) => setCurrentFood({ ...currentFood, price: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl border border-secondary/30 outline-none focus:border-primary text-foreground"
                />
              </div>
              <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.name || ""}
      />
    </div>
  );
}
