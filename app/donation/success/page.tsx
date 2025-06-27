"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => router.push("/"), 1000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-3xl font-bold mb-4">🎉 Thank You!</h1>
        <p className="mb-2">Your donation was successful.</p>
        <p className="text-sm text-gray-500">Redirecting home in 10 seconds…</p>
      </div>
    </div>
  );
}
