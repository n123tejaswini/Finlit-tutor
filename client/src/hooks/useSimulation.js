import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export function useSimulation() {
  const [cities, setCities] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/simulation/prices`);
        const data = await res.json();
        setCities(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { cities, loading };
}
