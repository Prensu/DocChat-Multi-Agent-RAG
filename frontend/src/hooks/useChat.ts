"use client";

import { useCallback, useState } from "react";
import type { ApiResponse, Message } from "@/types";

const QUERY_URL = "http://localhost:8000/query";

const initialMessages: Message[] = [{
  id: "welcome",
  role: "assistant",
  createdAt: new Date().toISOString(),
  content: "Welcome to DocChat. Upload a document and ask anything about its contents. I’ll ground every answer in your source material.",
  verification: { supported: ["DocChat answers are grounded in uploaded source material."], unsupported: [] },
}];

export function useChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    const cleanContent = content.trim();
    if (!cleanContent || isLoading) return;
    const userMessage: Message = { id: crypto.randomUUID(), role: "user", content: cleanContent, createdAt: new Date().toISOString() };
    setMessages((current) => [...current, userMessage]);
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(QUERY_URL, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: cleanContent }),
      });
      if (!response.ok) throw new Error("Query failed");
      const data = await response.json() as ApiResponse;
      setMessages((current) => [...current, {
        id: crypto.randomUUID(), role: "assistant", createdAt: new Date().toISOString(),
        content: data.answer || data.response || data.message || "I couldn’t find a grounded answer in the uploaded documents.",
        verification: data.verification,
      }]);
    } catch {
      setError("I couldn’t reach the answer service. Please check that the DocChat API is running and try again.");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const clearError = useCallback(() => setError(null), []);
  return { messages, isLoading, sendMessage, error, clearError };
}
