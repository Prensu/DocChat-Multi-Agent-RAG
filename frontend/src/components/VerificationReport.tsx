"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { VerificationReport as Report } from "@/types";
import { CheckIcon, ChevronIcon } from "@/components/icons";

export function VerificationReport({ report }: { report: Report }) {
  const [open, setOpen] = useState(false);
  const total = report.supported.length + report.unsupported.length;
  return <div className="verification"><button className="verification-toggle" onClick={() => setOpen(!open)}><span className="verification-title"><span className="shield"><CheckIcon size={13} /></span> Verification report <span className="verification-count">{total} {total === 1 ? "claim" : "claims"}</span></span><motion.span animate={{ rotate: open ? 180 : 0 }}><ChevronIcon size={16} /></motion.span></button><AnimatePresence initial={false}>{open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .3, ease: "easeInOut" }} className="verification-body"><div className="report-grid"><span className="report-label supported-label">SUPPORTED</span>{report.supported.map((claim, index) => <div className="claim supported-claim" key={`supported-${index}`}><CheckIcon size={13} /><span>{claim}</span></div>)}{report.unsupported.length > 0 && <span className="report-label unsupported-label">UNSUPPORTED</span>}{report.unsupported.map((claim, index) => <div className="claim unsupported-claim" key={`unsupported-${index}`}><span className="x-mark">×</span><span>{claim}</span></div>)}</div></motion.div>}</AnimatePresence></div>;
}
