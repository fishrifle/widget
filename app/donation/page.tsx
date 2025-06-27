// app/donation/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DonationLanding() {
  const [amount, setAmount] = useState<number | "">("");
  const [isOther, setIsOther] = useState(false);
  const [isMonthly, setIsMonthly] = useState(false);
  const [cause, setCause] = useState("Sponsor a Dev");
  const router = useRouter();

  const presets = [50, 100, 250, 500] as const;

  const goTo = (method: "card" | "bank") => {
    if (!amount || Number(amount) <= 0) return;
    router.push(
      `/donation/${method}?amt=${amount}&monthly=${isMonthly}&cause=${encodeURIComponent(
        cause
      )}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow space-y-6">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center">PassItOn</h2>

        {/* Amount presets + Other/input */}
        <div className="grid grid-cols-3 gap-2">
          {presets.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => {
                setIsOther(false);
                setAmount(v);
              }}
              className={`p-3 rounded-lg font-medium cursor-pointer transition ${
                amount === v
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              ${v}
            </button>
          ))}

          {isOther ? (
            <input
              type="number"
              placeholder="Other"
              value={amount === "" ? "" : amount}
              onChange={(e) =>
                setAmount(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="col-span-3 p-3 border border-gray-300 rounded-lg focus:outline-none cursor-text"
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsOther(true)}
              className="col-span-3 p-3 rounded-lg font-medium cursor-pointer transition bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Other
            </button>
          )}
        </div>

        {/* Frequency */}
        <div className="flex gap-2">
          <button
            onClick={() => setIsMonthly(false)}
            className={`flex-1 p-3 rounded-lg font-medium transition cursor-pointer ${
              !isMonthly
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            One-time
          </button>
          <button
            onClick={() => setIsMonthly(true)}
            className={`flex-1 p-3 rounded-lg font-medium transition cursor-pointer ${
              isMonthly ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            Monthly
          </button>
        </div>

        {/* Cause */}
        <select
          value={cause}
          onChange={(e) => setCause(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
        >
          <option>Sponsor a Dev</option>
          <option>Tech Alliance</option>
          <option>The Greatest Need</option>
        </select>

        {/* Pay buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => goTo("card")}
            className="flex-1 py-3 bg-green-500 text-white rounded-lg font-medium cursor-pointer transition hover:bg-green-600 disabled:opacity-50"
          >
            Pay with Card
          </button>
          <button
            onClick={() => goTo("bank")}
            className="flex-1 py-3 bg-blue-500 text-white rounded-lg font-medium cursor-pointer transition hover:bg-blue-600 disabled:opacity-50"
          >
            Pay via Bank
          </button>
        </div>
      </div>
    </div>
  );
}
