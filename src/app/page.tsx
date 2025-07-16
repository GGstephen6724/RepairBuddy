"use client";

import { useState, useEffect } from "react";
//import { BackToHome } from "@/components/ui/BackToHome";
import Navbar from "@/components/ui/Navbar";
import motorcyclesRaw from "@/lib/motorcycles";

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
    <>
      <Navbar />
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
    </>
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
