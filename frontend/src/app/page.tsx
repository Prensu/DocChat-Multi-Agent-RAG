"use client";

import { motion } from "framer-motion";
import { ChatPanel } from "@/components/ChatPanel";
import { Toast } from "@/components/Toast";
import { UploadPanel } from "@/components/UploadPanel";
import { useChat } from "@/hooks/useChat";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useTheme } from "@/hooks/useTheme";
import { SparkIcon, MoonIcon, SunIcon } from "@/components/icons";

export default function Home() {
  const upload = useFileUpload();
  const chat = useChat();
  const { theme, toggleTheme } = useTheme();
  const error = upload.error || chat.error;

  return (
    <main className="min-h-screen bg-mesh">
      {/* ── Top Navigation Bar ─────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-16 flex items-center justify-between px-6 md:px-8 sticky top-0 z-20"
        style={{
          borderBottom: "1px solid var(--border-default)",
          background: "var(--bg-surface)",
          backdropFilter: "blur(20px)",
          boxShadow: `0 1px 12px ${theme === "dark" ? "rgba(0,0,0,0.4)" : "rgba(99,102,241,0.06)"}`,
        }}
      >
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 flex items-center justify-center rounded-lg shadow-md"
            style={{
              background: "linear-gradient(135deg, var(--accent-from), var(--accent-to))",
              boxShadow: `0 4px 12px var(--accent-glow)`,
            }}
          >
            <SparkIcon size={16} className="text-white" />
          </div>
          <span
            className="text-[15px] font-semibold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            DocChat
          </span>
          <span
            className="hidden md:block h-4 w-px"
            style={{ background: "var(--border-default)" }}
          />
          <span
            className="hidden md:block text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            Your documents, understood
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={toggleTheme}
            className="grid place-items-center w-9 h-9 rounded-lg border-0 transition-all duration-300"
            style={{
              background: "var(--bg-hover)",
              color: "var(--text-secondary)",
              boxShadow: `0 0 0 1px var(--border-default)`,
            }}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <motion.div
              key={theme}
              initial={{ rotate: -45, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            >
              {theme === "dark" ? <SunIcon size={16} /> : <MoonIcon size={16} />}
            </motion.div>
          </motion.button>

          <span className="hidden sm:flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--success)", animation: "pulse-ring 2s infinite" }}
            />
            Secure workspace
          </span>
          <div
            className="w-8 h-8 grid place-items-center rounded-full text-white text-[11px] font-semibold shadow-md"
            style={{
              background: "linear-gradient(135deg, var(--accent-from), var(--accent-to))",
              boxShadow: `0 4px 12px var(--accent-glow)`,
            }}
          >
            PD
          </div>
        </div>
      </motion.header>

      {/* ── Workspace (two-column layout) ──────────────── */}
      <div className="flex flex-col md:grid md:grid-cols-[340px_minmax(0,1fr)] max-w-[1500px] mx-auto h-[calc(100vh-64px)]">
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
        >
          <UploadPanel
            files={upload.files}
            addFiles={upload.addFiles}
            removeFile={upload.removeFile}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.16, duration: 0.45 }}
          className="min-w-0"
        >
          <ChatPanel
            messages={chat.messages}
            isLoading={chat.isLoading}
            onSend={chat.sendMessage}
            hasFiles={upload.files.length > 0}
          />
        </motion.div>
      </div>

      <Toast
        message={error}
        onClose={() => {
          upload.clearError();
          chat.clearError();
        }}
      />
    </main>
  );
}
