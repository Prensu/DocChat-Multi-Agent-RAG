"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Message } from "@/types";
import { FileIcon, SendIcon, SparkIcon, ShieldIcon } from "@/components/icons";
import { VerificationReport } from "@/components/VerificationReport";

function MessageRow({
  message,
  index,
}: {
  message: Message;
  index: number;
}) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: Math.min(index * 0.06, 0.3),
        duration: 0.35,
      }}
      className={`flex gap-3 mb-6 max-w-[670px] ${
        isUser ? "justify-end max-w-none ml-auto" : ""
      }`}
    >
      {/* Bot avatar */}
      {!isUser && (
        <div
          className="grid place-items-center flex-shrink-0 w-8 h-8 rounded-lg text-white shadow-md"
          style={{
            background: "linear-gradient(135deg, var(--accent-from), var(--accent-to))",
            boxShadow: `0 4px 12px var(--accent-glow)`,
          }}
        >
          <SparkIcon size={15} />
        </div>
      )}

      <div
        className={`flex flex-col ${
          isUser ? "items-end" : "items-start"
        } max-w-[610px]`}
      >
        {/* Meta */}
        <div
          className="flex items-center gap-2 mb-2 text-[10px] font-semibold"
          style={{ color: "var(--text-muted)" }}
        >
          {isUser ? "You" : "DocChat"}
          <span style={{ color: "var(--text-faint)" }}>·</span>
          <time style={{ color: "var(--text-faint)" }}>
            {index === 0 ? "Just now" : `${index} min ago`}
          </time>
        </div>

        {/* Bubble */}
        <div
          className="text-[13px] leading-relaxed"
          style={
            isUser
              ? {
                  padding: "10px 16px",
                  borderRadius: "14px 14px 4px 14px",
                  background: "linear-gradient(135deg, var(--accent-from), var(--accent-to))",
                  color: "#ffffff",
                  boxShadow: `0 4px 16px var(--accent-glow)`,
                }
              : {
                  color: "var(--text-secondary)",
                }
          }
        >
          {message.content}
        </div>

        {/* Verification */}
        {message.verification && (
          <VerificationReport report={message.verification} />
        )}
      </div>
    </motion.div>
  );
}

export function ChatPanel({
  messages,
  isLoading,
  onSend,
  hasFiles,
}: {
  messages: Message[];
  isLoading: boolean;
  onSend: (value: string) => void;
  hasFiles: boolean;
}) {
  const [value, setValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  const submit = () => {
    if (value.trim() && !isLoading) {
      onSend(value);
      setValue("");
    }
  };

  return (
    <section className="relative flex flex-col h-full">
      {/* Heading */}
      <div
        className="flex items-center justify-between px-8 py-6 max-md:px-5 max-md:py-5"
        style={{ borderBottom: "1px solid var(--border-subtle)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="grid place-items-center w-9 h-9 rounded-xl"
            style={{
              background: "var(--accent-surface)",
              border: "1px solid var(--accent-border)",
              color: "var(--accent-from)",
            }}
          >
            <SparkIcon size={17} />
          </div>
          <div>
            <h1
              className="text-[15px] font-semibold tracking-tight m-0"
              style={{ color: "var(--text-primary)" }}
            >
              Ask your documents
            </h1>
            <p
              className="text-[11px] mt-0.5 m-0"
              style={{ color: "var(--text-muted)" }}
            >
              {hasFiles
                ? "Answers grounded in your source material"
                : "Upload a source to start a conversation"}
            </p>
          </div>
        </div>
        <div
          className="hidden md:flex items-center gap-2 text-[10px]"
          style={{ color: "var(--text-muted)" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--success)", animation: "pulse-ring 2s infinite" }}
          />
          API connected
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-8 pt-6 pb-40 custom-scrollbar max-md:px-5 max-md:pt-5 max-md:pb-36 max-md:min-h-[440px]"
        ref={scrollRef}
      >
        {/* Date divider */}
        <div
          className="flex items-center gap-3 mb-7 text-[10px]"
          style={{ color: "var(--text-faint)" }}
        >
          <span className="h-px flex-1" style={{ background: "var(--border-subtle)" }} />
          <span>Today</span>
          <span className="h-px flex-1" style={{ background: "var(--border-subtle)" }} />
        </div>

        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <MessageRow key={message.id} message={message} index={index} />
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 mb-6"
          >
            <div
              className="grid place-items-center flex-shrink-0 w-8 h-8 rounded-lg text-white shadow-md"
              style={{
                background: "linear-gradient(135deg, var(--accent-from), var(--accent-to))",
                boxShadow: `0 4px 12px var(--accent-glow)`,
              }}
            >
              <SparkIcon size={15} />
            </div>
            <div className="flex flex-col items-start">
              <div
                className="flex items-center gap-2 mb-2 text-[10px] font-semibold"
                style={{ color: "var(--text-muted)" }}
              >
                DocChat <span style={{ color: "var(--text-faint)" }}>·</span>{" "}
                <span style={{ color: "var(--text-faint)" }}>writing</span>
              </div>
              <div
                className="flex gap-1.5 px-4 py-3 rounded-xl shadow-sm"
                style={{
                  border: "1px solid var(--border-default)",
                  background: "var(--bg-card)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--accent-from)", animation: "bounce-dot 1.1s infinite" }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "var(--accent-from)",
                    animation: "bounce-dot 1.1s infinite",
                    animationDelay: "0.15s",
                  }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "var(--accent-from)",
                    animation: "bounce-dot 1.1s infinite",
                    animationDelay: "0.3s",
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Empty state — NOW uses relative flow positioning to avoid overlap */}
        {!hasFiles && messages.length <= 1 && (
          <div className="flex items-center justify-center py-12">
            <div className="w-[270px] text-center">
              <div
                className="grid place-items-center w-12 h-12 mx-auto mb-4 rounded-2xl"
                style={{
                  border: "1px solid var(--accent-border)",
                  background: "var(--accent-surface)",
                  color: "var(--accent-from)",
                }}
              >
                <FileIcon size={23} />
              </div>
              <h3
                className="text-sm font-semibold m-0"
                style={{ color: "var(--text-secondary)" }}
              >
                Your knowledge base is empty
              </h3>
              <p
                className="mt-2 text-[11px] leading-relaxed m-0"
                style={{ color: "var(--text-muted)" }}
              >
                Upload a document on the left, then ask a question here. Your
                answers stay grounded and verifiable.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Composer */}
      <div
        className="absolute right-0 bottom-0 left-0 px-8 pt-4 pb-5 max-md:px-5 max-md:pb-4"
        style={{
          background: `linear-gradient(to top, var(--bg-primary) 60%, transparent)`,
        }}
      >
        <div
          className="flex items-end gap-3 min-h-[56px] px-4 py-3 rounded-xl shadow-lg transition-all duration-200"
          style={{
            border: "1px solid var(--border-default)",
            background: "var(--bg-card)",
            boxShadow: `0 4px 20px var(--shadow-color)`,
          }}
        >
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            placeholder="Ask anything about your documents..."
            rows={1}
            className="flex-1 resize-none max-h-[90px] py-1.5 border-0 outline-0 text-[13px] leading-relaxed bg-transparent"
            style={{
              color: "var(--text-primary)",
            }}
          />
          <div className="flex items-center gap-3">
            <span
              className="hidden md:block text-[9px] whitespace-nowrap"
              style={{ color: "var(--text-faint)" }}
            >
              ↵ send <span style={{ color: "var(--border-default)" }}>·</span> shift + ↵
              new line
            </span>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="grid place-items-center w-9 h-9 rounded-lg border-0 text-white shadow-md disabled:opacity-30 disabled:shadow-none disabled:cursor-default transition-opacity"
              style={{
                background: "linear-gradient(135deg, var(--accent-from), var(--accent-to))",
                boxShadow: `0 4px 12px var(--accent-glow)`,
              }}
              onClick={submit}
              disabled={!value.trim() || isLoading}
            >
              <SendIcon size={16} />
            </motion.button>
          </div>
        </div>
        <div
          className="flex items-center justify-center gap-1.5 mt-3 text-[9px]"
          style={{ color: "var(--text-faint)" }}
        >
          <ShieldIcon size={13} style={{ color: "var(--accent-from)" }} />
          Responses are generated from your uploaded documents
        </div>
      </div>
    </section>
  );
}
