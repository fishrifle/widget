"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DonationLanding from "./DonationLanding";

export default function DonateWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(true)}
            className="bg-blue-500 text-white border-4 border-blue-200 py-2 px-4 rounded-full"
          >
            Donate
          </motion.button>
        )}
      </AnimatePresence>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl leading-none"
            >
              ×
            </button>
            <DonationLanding />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
