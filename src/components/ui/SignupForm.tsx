"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

type SignupFormProps = {
  onBack: () => void;
  onSwitchToLogin?: () => void;
};

export default function SignupForm({ onBack, onSwitchToLogin }: SignupFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      if (error.message.toLowerCase().includes("already registered")) {
        setMessage("This email is already registered. Please log in instead.");
      } else {
        setMessage(`Error: ${error.message}`);
      }
    } else {
      setMessage("Check your email for the confirmation link!");
    }

    setLoading(false);
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-xl shadow-md bg-white text-black">
      <h2 className="text-2xl font-semibold mb-4">Create your account</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
          >
            Back
          </button>
        </div>
      </form>

      {message && <p className="mt-4 text-left text-red-600">{message}</p>}

      {onSwitchToLogin && (
        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:underline font-semibold bg-none border-0 p-0 cursor-pointer"
          >
            Log in here
          </button>
        </p>
      )}
    </div>
  );
}
