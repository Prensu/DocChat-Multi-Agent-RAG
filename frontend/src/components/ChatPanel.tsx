"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Message } from "@/types";
import { FileIcon, SendIcon, SparkIcon, ShieldIcon } from "@/components/icons";
import { VerificationReport } from "@/components/VerificationReport";

function MessageRow({ message, index }: { message: Message; index: number }) { return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * .06, .3), duration: .35 }} className={`message-row ${message.role}`}>
  {message.role === "assistant" && <div className="bot-avatar"><SparkIcon size={15} /></div>}
  <div className="message-content"><div className="message-meta">{message.role === "assistant" ? "DocChat" : "You"}<span>·</span><time>{index === 0 ? "Just now" : `${index} min ago`}</time></div><div className="message-bubble">{message.content}</div>{message.verification && <VerificationReport report={message.verification} />}</div>
</motion.div>; }

export function ChatPanel({ messages, isLoading, onSend, hasFiles }: { messages: Message[]; isLoading: boolean; onSend: (value: string) => void; hasFiles: boolean }) {
  const [value, setValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => { const node = scrollRef.current; if (node) node.scrollTo({ top: node.scrollHeight, behavior: "smooth" }); }, [messages, isLoading]);
  const submit = () => { if (value.trim() && !isLoading) { onSend(value); setValue(""); } };
  return <section className="chat-panel"><div className="chat-heading"><div className="chat-title"><div className="chat-orb"><SparkIcon size={17} /></div><div><h1>Ask your documents</h1><p>{hasFiles ? "Answers grounded in your source material" : "Upload a source to start a conversation"}</p></div></div><div className="online-status"><span /> API connected</div></div>
    <div className="chat-scroll" ref={scrollRef}><div className="date-divider"><span>Today</span></div><AnimatePresence initial={false}>{messages.map((message, index) => <MessageRow key={message.id} message={message} index={index} />)}</AnimatePresence>{isLoading && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="message-row assistant"><div className="bot-avatar"><SparkIcon size={15} /></div><div className="message-content"><div className="message-meta">DocChat <span>·</span> writing</div><div className="typing-bubble"><span /><span /><span /></div></div></motion.div>}{!hasFiles && <div className="empty-hint"><div className="empty-icon"><FileIcon size={23} /></div><h3>Your knowledge base is empty</h3><p>Upload a document on the left, then ask a question here. Your answers stay grounded and verifiable.</p></div>}</div>
    <div className="composer-wrap"><div className="composer"><textarea value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } }} placeholder="Ask anything about your documents..." rows={1} /><div className="composer-actions"><span className="composer-hint">↵ to send <span>·</span> shift + ↵ for new line</span><motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: .96 }} className="send-button" onClick={submit} disabled={!value.trim() || isLoading}><SendIcon size={16} /></motion.button></div></div><div className="composer-note"><ShieldIcon size={13} /> Responses are generated from your uploaded documents</div></div>
  </section>;
}
