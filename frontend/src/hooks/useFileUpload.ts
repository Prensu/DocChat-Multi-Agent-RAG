"use client";

import { useCallback, useState } from "react";
import type { UploadedFile } from "@/types";

const UPLOAD_URL = "http://localhost:8000/upload";

const formatId = (file: File) => `${file.name}-${file.size}-${file.lastModified}`;

export function useFileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addFiles = useCallback(async (incoming: FileList | File[]) => {
    const selected = Array.from(incoming).filter((file) => file.size > 0);
    if (!selected.length) return;

    const additions = selected.map((file) => ({
      id: formatId(file), name: file.name, size: file.size, type: file.type,
      progress: 12, status: "uploading" as const, file,
    }));
    setError(null);
    setFiles((current) => [...current, ...additions.filter((item) => !current.some((file) => file.id === item.id))]);

    await Promise.all(additions.map(async (item) => {
      try {
        const formData = new FormData();
        formData.append("file", item.file as File);
        const response = await fetch(UPLOAD_URL, { method: "POST", body: formData });
        if (!response.ok) throw new Error("Upload failed");
        setFiles((current) => current.map((file) => file.id === item.id ? { ...file, progress: 100, status: "ready" } : file));
      } catch {
        // Keep the local file visible so the user can continue exploring the UI offline.
        setFiles((current) => current.map((file) => file.id === item.id ? { ...file, progress: 100, status: "ready" } : file));
        setError("The upload service is unavailable. Your file is available locally for this session.");
      }
    }));
  }, []);

  const removeFile = useCallback((id: string) => setFiles((current) => current.filter((file) => file.id !== id)), []);
  const clearError = useCallback(() => setError(null), []);

  return { files, addFiles, removeFile, error, clearError };
}
