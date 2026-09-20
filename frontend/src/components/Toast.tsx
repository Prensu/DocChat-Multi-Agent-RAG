"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon } from "@/components/icons";

export function Toast({
  message,
  onClose,
}: {
  message: string | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12 }}
          className="fixed top-20 right-6 z-50 flex items-center gap-3 max-w-[360px] px-4 py-3 rounded-xl text-[11px]"
          style={{
            border: "1px solid var(--danger)",
            background: "var(--bg-card)",
            color: "var(--text-secondary)",
            boxShadow: `0 4px 20px rgba(248, 113, 113, 0.15)`,
          }}
          role="alert"
        >
          <span
            className="w-1.5 h-1.5 flex-shrink-0 rounded-full"
            style={{ background: "var(--danger)" }}
          />
          <span>{message}</span>
          <button
            onClick={onClose}
            className="grid place-items-center ml-auto border-0 bg-transparent transition-colors"
            style={{ color: "var(--text-faint)" }}
            aria-label="Close notification"
          >
            <CloseIcon size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
