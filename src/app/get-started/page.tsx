"use client";

import React, { useState } from "react";
import SignupForm from "@/components/ui/SignupForm";
import LoginForm from "@/components/ui/LoginForm";


export default function LandingPage() {
  const [mode, setMode] = useState<"welcome" | "signup" | "login">("welcome");

  return (
    <main style={styles.main}>
      {mode === "welcome" && (
        <div style={styles.welcomeBox}>
          <h1 style={styles.title}>Welcome to RepairBuddy</h1>
          <p style={styles.description}>
            Your go-to platform for vehicle and motorcycle repair guides.
          </p>
          <div style={styles.buttons}>
            <button onClick={() => setMode("signup")} style={styles.button}>
              Get Started
            </button>
            <button
              onClick={() => setMode("login")}
              style={{ ...styles.button, ...styles.loginButton }}
            >
              Log In
            </button>
          </div>
        </div>
      )}

      {mode === "signup" && <SignupForm onBack={() => setMode("welcome")} />}
      {mode === "login" && (
        <LoginForm
          onBack={() => setMode("welcome")}
          onSwitchToSignup={() => setMode("signup")}
        />
      )}
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: 'url("/michael-wade-UJdiHd3iH1g-unsplash.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "0 40px",
    color: "#ffffff",
  },
  welcomeBox: {
    textAlign: "center",
    maxWidth: "600px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(8px)",
    padding: "2rem",
    borderRadius: "1rem",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "1rem",
    color: "#ffffff",
  },
  description: {
    fontSize: "1.25rem",
    marginBottom: "1rem",
    color: "#ffffff",
    maxWidth: "400px",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  button: {
    backgroundColor: "#4f46e5",
    color: "white",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
    border: "none",
    cursor: "pointer",
  },
  loginButton: {
    backgroundColor: "#555",
  },
};
