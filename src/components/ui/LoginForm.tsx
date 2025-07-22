"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type LoginFormProps = {
  onBack: () => void;
  onSwitchToSignup: () => void;
};

export default function LoginForm({ onBack, onSwitchToSignup }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  setLoading(false);

  if (error) {
    alert(error.message);
  } else if (data.user) {
    alert("Login successful!");
    router.push("/"); // redirect to homepage
    setTimeout(() => {
      window.location.reload(); // refresh the page to update state
    }, 100);
  }
};


  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-xl shadow-md bg-white">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-4 text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={() => {
            if (onSwitchToSignup) {
              onSwitchToSignup();
            } else {
              console.warn("onSwitchToSignup prop not provided");
            }
          }}
          className="text-blue-600 hover:underline"
        >
          Sign up here
        </button>
      </div>

      <div className="mt-2 text-center">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-gray-400 hover:underline"
        >
          ← Back to welcome
        </button>
      </div>
    </div>
  );
}
