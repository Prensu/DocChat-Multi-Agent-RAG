"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { VerificationReport as Report } from "@/types";
import { CheckIcon, ChevronIcon } from "@/components/icons";

export function VerificationReport({ report }: { report: Report }) {
  const [open, setOpen] = useState(false);
  const total = report.supported.length + report.unsupported.length;

  return (
    <div
      className="w-full max-w-[600px] mt-3 overflow-hidden rounded-lg"
      style={{
        border: "1px solid var(--border-default)",
        background: "var(--bg-card)",
        boxShadow: `0 2px 8px var(--shadow-color)`,
      }}
    >
      {/* Toggle button */}
      <button
        className="flex items-center justify-between w-full px-3 py-2.5 border-0 bg-transparent text-[10px] transition-colors"
        style={{ color: "var(--text-muted)" }}
        onClick={() => setOpen(!open)}
      >
        <span className="flex items-center gap-2">
          <span
            className="grid place-items-center w-5 h-5 rounded-md"
            style={{ background: "rgba(52, 211, 153, 0.1)", color: "var(--success)" }}
          >
            <CheckIcon size={12} />
          </span>
          <span className="font-medium">Verification report</span>
          <span className="text-[9px] font-mono" style={{ color: "var(--text-faint)" }}>
            {total} {total === 1 ? "claim" : "claims"}
          </span>
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} style={{ color: "var(--text-faint)" }}>
          <ChevronIcon size={16} />
        </motion.span>
      </button>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ borderTop: "1px solid var(--border-subtle)" }}
          >
            <div className="grid gap-2 p-3 font-mono text-[10px] leading-relaxed">
              {/* Supported */}
              <span
                className="text-[8px] tracking-[0.12em] font-bold uppercase"
                style={{ color: "var(--success)" }}
              >
                Supported
              </span>
              {report.supported.map((claim, i) => (
                <div
                  key={`s-${i}`}
                  className="flex items-start gap-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <CheckIcon
                    size={12}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: "var(--success)" }}
                  />
                  <span>{claim}</span>
                </div>
              ))}

              {/* Unsupported */}
              {report.unsupported.length > 0 && (
                <>
                  <span
                    className="text-[8px] tracking-[0.12em] font-bold uppercase mt-1.5"
                    style={{ color: "var(--danger)" }}
                  >
                    Unsupported
                  </span>
                  {report.unsupported.map((claim, i) => (
                    <div
                      key={`u-${i}`}
                      className="flex items-start gap-2"
                      style={{ color: "var(--danger)", opacity: 0.8 }}
                    >
                      <span className="flex-shrink-0 w-3 text-base leading-3 font-medium" style={{ color: "var(--danger)" }}>
                        ×
                      </span>
                      <span>{claim}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
