"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminUser = process.env.NEXT_PUBLIC_ADMIN_USER;
    const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASS;

    if (username === adminUser && password === adminPass) {
      localStorage.setItem("isAdmin", "true");
      router.push("/admin");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-secondary/20">
        <h1 className="text-4xl font-black text-primary mb-8 text-center italic">
          Admin Login
        </h1>
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm font-bold text-center border border-red-100">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-foreground/70 mb-2 ml-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-secondary/30 focus:border-primary outline-none transition-colors text-foreground"
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-foreground/70 mb-2 ml-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-secondary/30 focus:border-primary outline-none transition-colors text-foreground"
              placeholder="Enter password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-primary hover:bg-secondary text-white rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
