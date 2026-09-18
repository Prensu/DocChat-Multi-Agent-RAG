"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon } from "@/components/icons";

export function Toast({ message, onClose }: { message: string | null; onClose: () => void }) {
  return <AnimatePresence>{message && <motion.div initial={{ opacity: 0, y: -12, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12 }} className="toast" role="alert"><span className="toast-dot" /><span>{message}</span><button onClick={onClose} aria-label="Close notification"><CloseIcon size={14} /></button></motion.div>}</AnimatePresence>;
}
