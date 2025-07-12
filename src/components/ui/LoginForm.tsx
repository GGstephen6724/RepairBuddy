"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type LoginFormProps = {
  onBack: () => void;
};

export default function LoginForm({ onBack }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("Logged in successfully!");
      router.push("/dashboard");
    }

    setLoading(false);
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Log In to Your Account</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          style={styles.input}
        />

        <div style={styles.buttonsRow}>
          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.button, ...styles.loginButton }}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
          <button
            type="button"
            onClick={onBack}
            style={{ ...styles.button, ...styles.backButton }}
          >
            Back
          </button>
        </div>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "500px",
    padding: "2rem",
    borderRadius: "12px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    backdropFilter: "blur(8px)",
  },
  heading: {
    marginBottom: "1.5rem",
    fontSize: "1.75rem",
    fontWeight: "bold",
    textAlign: "left",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#fff",
  },
  buttonsRow: {
    display: "flex",
    gap: "1rem",
    marginTop: "1rem",
  },
  button: {
    flex: 1,
    padding: "0.75rem",
    borderRadius: "8px",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },
  loginButton: {
    backgroundColor: "#4f46e5",
    color: "white",
  },
  backButton: {
    backgroundColor: "#555",
    color: "white",
  },
  message: {
    marginTop: "1rem",
    color: "#fff",
    textAlign: "left",
  },
};
