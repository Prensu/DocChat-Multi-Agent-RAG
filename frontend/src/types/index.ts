export interface VerificationReport {
  supported: string[];
  unsupported: string[];
  confidence?: number;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  verification?: VerificationReport;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: "uploading" | "ready" | "error";
  file?: File;
}

export interface ApiResponse {
  answer?: string;
  response?: string;
  message?: string;
  verification?: VerificationReport;
}
