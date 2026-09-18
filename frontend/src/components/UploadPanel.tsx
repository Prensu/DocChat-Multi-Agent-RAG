"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { UploadedFile } from "@/types";
import { CloseIcon, FileIcon, UploadIcon } from "@/components/icons";

function formatSize(bytes: number) { return bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`; }
function extension(file: UploadedFile) { return file.name.split(".").pop()?.toUpperCase() || "DOC"; }

export function UploadPanel({ files, addFiles, removeFile }: { files: UploadedFile[]; addFiles: (files: FileList | File[]) => Promise<void>; removeFile: (id: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const onDrop = (event: React.DragEvent<HTMLDivElement>) => { event.preventDefault(); setDragging(false); void addFiles(event.dataTransfer.files); };
  return <aside className="upload-panel">
    <div className="panel-heading"><div><p className="eyebrow">Workspace</p><h2>Source documents</h2></div><span className="file-count">{files.length.toString().padStart(2, "0")}</span></div>
    <div className={`dropzone ${dragging ? "is-dragging" : ""}`} onDragEnter={(e) => { e.preventDefault(); setDragging(true); }} onDragOver={(e) => e.preventDefault()} onDragLeave={() => setDragging(false)} onDrop={onDrop} onClick={() => inputRef.current?.click()}>
      <input ref={inputRef} type="file" multiple hidden accept=".pdf,.doc,.docx,.txt,.md,.csv" onChange={(e) => { if (e.target.files) void addFiles(e.target.files); e.target.value = ""; }} />
      <motion.div className="upload-symbol" animate={dragging ? { scale: 1.08, rotate: -4 } : { scale: 1, rotate: 0 }}><UploadIcon size={19} /></motion.div>
      <span className="drop-title">Drop files here</span><span className="drop-subtitle">or <u>browse from your computer</u></span>
      <span className="drop-types">PDF, DOCX, TXT, MD · up to 20 MB</span>
    </div>
    <div className="files-heading"><span>Uploaded files</span><span>{files.length ? "Recently added" : "None yet"}</span></div>
    <div className="file-list"><AnimatePresence initial={false}>{files.map((file) => <motion.div key={file.id} layout initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24, height: 0, marginBottom: 0 }} transition={{ duration: .25 }} className="file-card">
      <div className="file-icon"><FileIcon size={19} /><small>{extension(file)}</small></div><div className="file-info"><span className="file-name" title={file.name}>{file.name}</span><span className="file-meta">{formatSize(file.size)} <i /> {file.status === "uploading" ? `${file.progress}% uploading` : "Ready"}</span>{file.status === "uploading" && <div className="progress-track"><motion.div initial={{ width: 0 }} animate={{ width: `${file.progress}%` }} className="progress-value" /></div>}</div><button className="icon-button remove-button" onClick={() => removeFile(file.id)} aria-label={`Remove ${file.name}`}><CloseIcon size={15} /></button>
    </motion.div>)}</AnimatePresence>{files.length === 0 && <div className="no-files"><span>+</span><p>Your references will appear here</p></div>}</div>
    <div className="upload-footer"><span className="status-pulse" /> <span>Private workspace</span><span className="footer-lock">⌘ K</span></div>
  </aside>;
}
