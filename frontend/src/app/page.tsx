"use client";

import React from "react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />
      
      <div className="max-w-4xl w-full text-center relative z-10">
        <div className="mb-12 inline-flex items-center gap-3 px-6 py-2 bg-white rounded-full shadow-lg border border-secondary/20">
          <span className="w-3 h-3 bg-primary rounded-full animate-ping" />
          <span className="text-sm font-bold text-foreground/60 uppercase tracking-widest">Welcome to TastyApp</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-foreground mb-8 tracking-tighter leading-tight">
          How would you like to <span className="text-primary italic">proceed?</span>
        </h1>
        
        <p className="text-xl text-foreground/60 max-w-2xl mx-auto mb-16 leading-relaxed">
          Choose your experience: Explore our delicious menu or manage the restaurant through the admin dashboard.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link 
            href="/menu"
            className="group relative overflow-hidden bg-white p-10 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all border-2 border-transparent hover:border-primary active:scale-95"
          >
            <div className="mb-8 w-20 h-20 bg-accent/20 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9B8EC7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                <path d="M7 2v20" />
                <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                <path d="M18 5h3" />
              </svg>
            </div>
            <h3 className="text-3xl font-black text-foreground mb-4">I'm Hungry</h3>
            <p className="text-foreground/50 font-medium">Browse our exclusive menu and order your favorite dishes.</p>
            <div className="mt-8 flex items-center justify-center gap-2 text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              <span>View Menu</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
          </Link>

          <Link 
            href="/admin"
            className="group relative overflow-hidden bg-primary p-10 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all active:scale-95"
          >
            <div className="mb-8 w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            </div>
            <h3 className="text-3xl font-black text-white mb-4">I'm Admin</h3>
            <p className="text-white/60 font-medium">Manage food items, prices, and oversee restaurant operations.</p>
            <div className="mt-8 flex items-center justify-center gap-2 text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Enter Dashboard</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
