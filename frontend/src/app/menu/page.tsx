"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import FoodList from "@/components/FoodList";
import CartDrawer from "@/components/CartDrawer";
import OrderForm from "@/components/OrderForm";
import Toast from "@/components/Toast";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <Navbar onCartOpen={() => setIsCartOpen(true)} />
      
      <div className="max-w-7xl mx-auto py-12 px-6">
        <header className="mb-12 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4">
            Craving something <span className="text-primary italic">special</span>?
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Order delicious food from your favorite local restaurant. Delivered fast and fresh!
          </p>
        </header>

        <section>
          <FoodList />
        </section>
      </div>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsOrderFormOpen(true);
        }}
      />

      <OrderForm 
        isOpen={isOrderFormOpen} 
        onClose={() => setIsOrderFormOpen(false)}
        onSuccess={() => setShowToast(true)}
      />

      <Toast 
        message="Order placed successfully! 🍕" 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />

      <footer className="py-12 border-t border-secondary/20 text-center text-foreground/40 mt-auto">
        <p>© 2026 TastyApp Food Delivery. All rights reserved.</p>
      </footer>
    </main>
  );
}
