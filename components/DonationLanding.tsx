// app/donation/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DonationLanding() {
  const [amount, setAmount] = useState<number | "">("");
  const [isMonthly, setIsMonthly] = useState(false);
  const [cause, setCause] = useState("Sponsor a Dev");
  const router = useRouter();

  const canProceed = amount !== "" && Number(amount) > 0;

  const navigate = (method: "card" | "bank") => {
    router.push(
      `/donation/${method}?amt=${amount}&monthly=${isMonthly}&cause=${encodeURIComponent(
        cause
      )}`
    );
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      {/* ← Header */}
      <h2 className="text-2xl font-bold mb-4">PassItOn</h2>

      {/* ← Amount presets + Other */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[50, 100, 250, 500].map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setAmount(v)}
            className={`p-2 rounded cursor-pointer ${
              amount === v
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            ${v}
          </button>
        ))}

        <input
          type="number"
          placeholder="Other"
          value={amount === "" ? "" : amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="col-span-3 p-2 border rounded cursor-text"
        />
      </div>

      {/* ← Frequency radios */}
      <div className="flex items-center mb-4 space-x-4">
        <label className="cursor-pointer">
          <input
            type="radio"
            checked={!isMonthly}
            onChange={() => setIsMonthly(false)}
            className="mr-1 cursor-pointer"
          />
          One-Time
        </label>
        <label className="cursor-pointer">
          <input
            type="radio"
            checked={isMonthly}
            onChange={() => setIsMonthly(true)}
            className="mr-1 cursor-pointer"
          />
          Monthly
        </label>
      </div>

      {/* ← Cause dropdown */}
      <select
        value={cause}
        onChange={(e) => setCause(e.target.value)}
        className="w-full p-2 border rounded mb-6 cursor-pointer"
      >
        <option>Sponsor a Dev</option>
        <option>Tech Alliance</option>
      </select>

      {/* ← Pay buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("card")}
          disabled={!canProceed}
          className={`flex-1 py-2 rounded ${
            canProceed
              ? "bg-green-500 text-white cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Pay with Card
        </button>
        <button
          onClick={() => navigate("bank")}
          disabled={!canProceed}
          className={`flex-1 py-2 rounded ${
            canProceed
              ? "bg-blue-500 text-white cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Pay via Bank
        </button>
      </div>
    </div>
  );
}
