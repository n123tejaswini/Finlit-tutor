import { useState } from "react";
import { useSimulation } from "../hooks/useSimulation";

export default function Simulation() {
  const { cities, loading } = useSimulation();
  const [city, setCity] = useState("Bengaluru");
  const prices = cities[city];

  if (loading) return <p>Loading simulations...</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Budget Simulation</h1>
      <select
        className="rounded bg-slate-900 p-2"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      >
        {Object.keys(cities).map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      {prices && (
        <div className="rounded-lg border border-slate-800 p-4">
          <p>Rent (1BHK): INR {prices.rent_1bhk}</p>
          <p>Milk/L: INR {prices.milk_litre}</p>
          <p>Rice/Kg: INR {prices.rice_kg}</p>
          <p>Internet: INR {prices.internet_monthly}</p>
        </div>
      )}
    </div>
  );
}
