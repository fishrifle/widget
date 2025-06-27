"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSearchParams, useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export default function BankClient() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const params = useSearchParams();

  const amt = parseInt(params?.get("amt") ?? "0", 10) || 0;
  const monthly = params?.get("monthly") === "true";
  const cause = params?.get("cause") ?? "";

  // build queryString for BackButton
  const entries = params ? Array.from(params.entries()) : [];
  const queryString =
    entries.length > 0
      ? "?" + entries.map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join("&")
      : "";

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: amt * 100,
        isMonthly: monthly,
        paymentMethod: "bank",
        cause,
      }),
    })
      .then((res) => res.json())
      .then(({ clientSecret }) => setClientSecret(clientSecret))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to initialize bank payment.");
      });
  }, [amt, monthly, cause]);

  if (!clientSecret) {
    return <div className="p-6 text-center">Loading bank payment form…</div>;
  }

  return (
    <>
      <ToastContainer position="top-center" />
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <BankForm queryString={queryString} />
      </Elements>
    </>
  );
}

function BankForm({ queryString }: { queryString: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      toast.warn("Stripe is still loading…");
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message || "Bank payment failed.");
    } else {
      toast.success("Bank payment successful!");
      setTimeout(() => router.push("/donation"), 1500);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-bold">Bank (ACH) Payment</h2>
      <PaymentElement className="border p-2 rounded" />
      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer disabled:opacity-50"
      >
        Pay with Bank
      </button>
      <BackButton href={`/donation${queryString}`}>Back</BackButton>
    </form>
  );
}
