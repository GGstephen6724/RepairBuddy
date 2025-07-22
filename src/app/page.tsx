"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import motorcyclesRaw from "@/lib/motorcycles";
import LoginForm from "@/components/ui/LoginForm";
import SignupForm from "@/components/ui/SignupForm";

type MotorcycleData = {
  [make: string]: {
    [model: string]: string[];
  };
};

export default function HomePage() {
  const motorcycles: MotorcycleData = motorcyclesRaw;

  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const [years, setYears] = useState<string[]>([]);
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };
    getUser();
  }, []);

  function handleLogout() {
    supabase.auth.signOut();
    setUser(null);
  }

  useEffect(() => {
    const allYearsSet = new Set<string>();
    Object.values(motorcycles).forEach((models) =>
      Object.values(models).forEach((yearArr) =>
        yearArr.forEach((yearStr) => allYearsSet.add(yearStr))
      )
    );
    const sortedYears = Array.from(allYearsSet).sort((a, b) => Number(b) - Number(a));
    setYears(sortedYears);
  }, [motorcycles]);

  useEffect(() => {
    if (!year) {
      setMakes(Object.keys(motorcycles));
      setMake("");
      setModel("");
      setModels([]);
      return;
    }
    const filteredMakes = Object.entries(motorcycles)
      .filter(([make, models]) =>
        Object.values(models).some((yearArr) => yearArr.includes(year))
      )
      .map(([make]) => make);
    setMakes(filteredMakes);
    setMake("");
    setModel("");
    setModels([]);
  }, [year, motorcycles]);

  useEffect(() => {
    if (!year || !make) {
      setModels([]);
      setModel("");
      return;
    }
    const modelsForMake = motorcycles[make];
    if (!modelsForMake) {
      setModels([]);
      setModel("");
      return;
    }
    const filteredModels = Object.entries(modelsForMake)
      .filter(([model, yearsArr]) => yearsArr.includes(year))
      .map(([model]) => model);
    setModels(filteredModels);
    setModel("");
  }, [make, year, motorcycles]);

  function handleSearch() {
    alert(`Searching for ${year} ${make} ${model}`);
  }

  return (
    <div className="relative min-h-screen">
      {/* Top-right auth area */}
      <div className="absolute top-4 right-4 z-50">
        {user ? (
          <div className="flex items-center gap-4 text-white bg-black/50 px-4 py-2 rounded shadow">
            <span>Welcome, {user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowLogin(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow"
          >
            Login
          </button>
        )}
      </div>

      <main style={styles.main}>
        <div style={styles.container}>
          <h1 style={styles.title}>Welcome to RepairBuddy</h1>
          <p style={styles.subtitle}>Tell us about your motorcycle:</p>
          <div style={styles.searchRow}>
            <select value={year} onChange={(e) => setYear(e.target.value)} style={styles.select}>
              <option value="" disabled style={styles.option}>
                Year
              </option>
              {years.map((y) => (
                <option key={y} value={y} style={styles.option}>
                  {y}
                </option>
              ))}
            </select>

            <select
              value={make}
              onChange={(e) => setMake(e.target.value)}
              disabled={!year}
              style={styles.select}
            >
              <option value="" disabled style={styles.option}>
                Make
              </option>
              {makes.map((m) => (
                <option key={m} value={m} style={styles.option}>
                  {m}
                </option>
              ))}
            </select>

            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              disabled={!make || !year}
              style={styles.select}
            >
              <option value="" disabled style={styles.option}>
                Model
              </option>
              {models.map((m) => (
                <option key={m} value={m} style={styles.option}>
                  {m}
                </option>
              ))}
            </select>

            <button
              style={styles.searchButton}
              onClick={handleSearch}
              disabled={!year || !make || !model}
            >
              Search
            </button>
          </div>
        </div>
      </main>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <LoginForm
            onBack={() => setShowLogin(false)}
            onSwitchToSignup={() => {
              setShowLogin(false);
              setShowSignup(true);
            }}
          />
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <SignupForm
            onBack={() => setShowSignup(false)}
            onSwitchToLogin={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
          />
        </div>
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: 'url("/michael-wade-UJdiHd3iH1g-unsplash.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "20px",
    color: "white",
    flexDirection: "column",
  },
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
    maxWidth: "700px",
    width: "100%",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "1.25rem",
    marginBottom: "2rem",
  },
  searchRow: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  select: {
    flex: "1 1 150px",
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "white",
    appearance: "none",
    cursor: "pointer",
  },
  option: {
    backgroundColor: "white",
    color: "black",
  },
  searchButton: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    fontWeight: "bold",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4f46e5",
    color: "white",
    cursor: "pointer",
    flexShrink: 0,
  },
};
