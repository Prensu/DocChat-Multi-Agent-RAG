"use client";

import { motion } from "framer-motion";
import { ChatPanel } from "@/components/ChatPanel";
import { Toast } from "@/components/Toast";
import { UploadPanel } from "@/components/UploadPanel";
import { useChat } from "@/hooks/useChat";
import { useFileUpload } from "@/hooks/useFileUpload";

export default function Home() {
  const upload = useFileUpload();
  const chat = useChat();
  const error = upload.error || chat.error;
  return <main className="app-shell"><motion.header initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="topbar"><div className="brand"><div className="brand-mark"><span /><span /><span /></div><span className="brand-name">DocChat</span><span className="brand-divider" /><span className="brand-tagline">Your documents, understood.</span></div><div className="topbar-right"><span className="secure-label"><span className="status-pulse" /> Secure workspace</span><div className="avatar">PD</div></div></motion.header><div className="workspace"><motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .1, duration: .45 }}><UploadPanel files={upload.files} addFiles={upload.addFiles} removeFile={upload.removeFile} /></motion.div><motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .16, duration: .45 }} className="chat-wrap"><ChatPanel messages={chat.messages} isLoading={chat.isLoading} onSend={chat.sendMessage} hasFiles={upload.files.length > 0} /></motion.div></div><Toast message={error} onClose={() => { upload.clearError(); chat.clearError(); }} /></main>;
}
