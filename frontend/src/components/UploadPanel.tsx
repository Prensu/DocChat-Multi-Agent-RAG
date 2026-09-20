"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { UploadedFile } from "@/types";
import { CloseIcon, FileIcon, UploadIcon } from "@/components/icons";

function formatSize(bytes: number) {
  return bytes > 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function extension(file: UploadedFile) {
  return file.name.split(".").pop()?.toUpperCase() || "DOC";
}

export function UploadPanel({
  files,
  addFiles,
  removeFile,
}: {
  files: UploadedFile[];
  addFiles: (files: FileList | File[]) => Promise<void>;
  removeFile: (id: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    void addFiles(event.dataTransfer.files);
  };

  return (
    <aside
      className="h-full px-5 pt-7 pb-5 flex flex-col md:h-full max-md:h-auto max-md:border-r-0 max-md:border-b max-md:pb-5"
      style={{
        borderRight: "1px solid var(--border-default)",
        background: "var(--bg-surface)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Heading */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p
            className="text-[10px] font-bold tracking-[0.15em] uppercase mb-1"
            style={{ color: "var(--accent-from)" }}
          >
            Workspace
          </p>
          <h2
            className="text-base font-semibold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Source documents
          </h2>
        </div>
        <span
          className="text-xs font-mono"
          style={{ color: "var(--text-muted)" }}
        >
          {files.length.toString().padStart(2, "0")}
        </span>
      </div>

      {/* Dropzone */}
      <div
        className="min-h-[170px] flex flex-col items-center justify-center px-4 py-6 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all duration-300 ease-out"
        style={{
          borderColor: dragging ? "var(--accent-from)" : "var(--border-default)",
          background: dragging ? "var(--accent-surface)" : "var(--bg-card)",
          transform: dragging ? "scale(1.01)" : "scale(1)",
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          accept=".pdf,.doc,.docx,.txt,.md,.csv"
          onChange={(e) => {
            if (e.target.files) void addFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <motion.div
          className="w-10 h-10 grid place-items-center mb-3 rounded-xl"
          style={{
            border: "1px solid var(--accent-border)",
            background: "var(--accent-surface)",
            color: "var(--accent-from)",
          }}
          animate={
            dragging ? { scale: 1.1, rotate: -4 } : { scale: 1, rotate: 0 }
          }
        >
          <UploadIcon size={19} />
        </motion.div>
        <span
          className="text-sm font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Drop files here
        </span>
        <span className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
          or{" "}
          <span
            className="underline underline-offset-2"
            style={{ color: "var(--accent-from)", textDecorationColor: "var(--accent-border)" }}
          >
            browse from your computer
          </span>
        </span>
        <span
          className="mt-4 text-[10px] tracking-wide font-medium"
          style={{ color: "var(--text-faint)" }}
        >
          PDF, DOCX, TXT, MD · up to 20 MB
        </span>
      </div>

      {/* Files heading */}
      <div className="flex items-center justify-between mt-6 mb-3">
        <span
          className="text-[11px] font-medium"
          style={{ color: "var(--text-muted)" }}
        >
          Uploaded files
        </span>
        <span className="text-[10px]" style={{ color: "var(--text-faint)" }}>
          {files.length ? "Recently added" : "None yet"}
        </span>
      </div>

      {/* File list */}
      <div className="flex-1 min-h-[100px] overflow-y-auto custom-scrollbar max-md:max-h-[180px]">
        <AnimatePresence initial={false}>
          {files.map((file) => (
            <motion.div
              key={file.id}
              layout
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-3 p-2.5 mb-2 rounded-lg transition-all duration-200"
              style={{
                border: "1px solid var(--border-default)",
                background: "var(--bg-card)",
              }}
            >
              {/* File icon */}
              <div
                className="relative grid place-items-center flex-shrink-0 w-9 h-9 rounded-lg"
                style={{
                  background: "var(--accent-surface)",
                  color: "var(--accent-from)",
                }}
              >
                <FileIcon size={18} />
                <small
                  className="absolute bottom-[3px] text-[6px] font-bold tracking-wide"
                  style={{ color: "var(--accent-from)" }}
                >
                  {extension(file)}
                </small>
              </div>

              {/* File info */}
              <div className="min-w-0 flex-1">
                <span
                  className="block text-[11px] font-medium truncate"
                  style={{ color: "var(--text-primary)" }}
                  title={file.name}
                >
                  {file.name}
                </span>
                <span
                  className="flex items-center gap-1.5 mt-1 text-[9px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {formatSize(file.size)}
                  <i
                    className="w-0.5 h-0.5 rounded-full inline-block"
                    style={{ background: "var(--text-faint)" }}
                  />
                  {file.status === "uploading"
                    ? `${file.progress}% uploading`
                    : "Ready"}
                </span>
                {file.status === "uploading" && (
                  <div
                    className="h-0.5 mt-1.5 rounded-full overflow-hidden"
                    style={{ background: "var(--border-default)" }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${file.progress}%` }}
                      className="h-full rounded-full"
                      style={{
                        background: "linear-gradient(90deg, var(--accent-from), var(--accent-to))",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Remove button */}
              <button
                className="grid place-items-center p-1 rounded-md transition-colors self-start border-0 bg-transparent"
                style={{ color: "var(--text-faint)" }}
                onClick={() => removeFile(file.id)}
                aria-label={`Remove ${file.name}`}
              >
                <CloseIcon size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {files.length === 0 && (
          <div className="grid place-items-center py-8 text-center">
            <span
              className="text-2xl font-light"
              style={{ color: "var(--text-faint)" }}
            >
              +
            </span>
            <p
              className="mt-2 text-[10px]"
              style={{ color: "var(--text-faint)" }}
            >
              Your references will appear here
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className="flex items-center gap-2 mt-auto pt-5 text-[10px] max-md:hidden"
        style={{ color: "var(--text-faint)" }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "var(--success)", animation: "pulse-ring 2s infinite" }}
        />
        <span>Private workspace</span>
        <span
          className="ml-auto px-1.5 py-0.5 rounded text-[9px] font-mono"
          style={{
            border: "1px solid var(--border-default)",
            color: "var(--text-muted)",
          }}
        >
          ⌘ K
        </span>
      </div>
    </aside>
  );
}
