# DocChat 🗂️

> Ask questions about your documents and get **fact-checked, hallucination-free answers** — powered by a multi-agent RAG system.

---

## Why DocChat?

Traditional chatbots like ChatGPT and DeepSeek struggle with long, structured documents — they misread tables, miss footnotes, and fabricate citations. DocChat takes a different approach by combining **multiple AI agents**, each with a specific role, to ensure every answer is grounded in your documents.

---

## What you can do

- 📄 Upload long documents — PDFs, Word files, text reports
- 💬 Ask questions and get precise, source-backed answers
- 📊 Extract data from tables, figures, and dense text
- 🚨 Get alerted when a question is out of scope
- 🔍 Query across multiple documents — DocChat finds the right one

---

## How it works

```
User Query
    │
    ▼
Analyze Relevance ──── Out of scope ──▶ END
    │
  In scope
    │
    ▼
Conduct Research (Hybrid BM25 + Vector Search)
    │
    ▼
Verify Answer
    │
    ├── Supported ──▶ Respond ──▶ END
    │
    └── Not supported ──▶ Re-research ──▶ Verify again
```

### 1 · Relevance checking

Before anything, a **Scope-Checking Agent** determines if the question can be answered from the uploaded documents. Out-of-scope questions are flagged immediately — no hallucinations.

### 2 · Hybrid retrieval

Documents are parsed by **Docling** into structured Markdown, chunked by **LangChain**, and stored in **ChromaDB**. Retrieval combines:

- **BM25** — keyword-based search
- **Vector search** — semantic similarity search

Both results are merged for maximum accuracy.

### 3 · Research agent

The **Research Agent** generates an initial answer using the most relevant retrieved chunks, grounded strictly in your documents.

### 4 · Verification & self-correction

The **Verification Agent** cross-checks the answer for hallucinations, unsupported claims, and contradictions. If it fails — the system automatically re-runs research until a verified answer is found.

---

## Tech Stack

| Layer               | Tool                                              | Why                                                 |
| ------------------- | ------------------------------------------------- | --------------------------------------------------- |
| Document parsing    | [Docling](https://github.com/DS4SD/docling)       | Handles complex PDFs, tables, scanned docs with OCR |
| Vector store        | [ChromaDB](https://github.com/chroma-core/chroma) | Fast, persistent, lightweight vector search         |
| RAG pipeline        | LangChain                                         | Text splitting, BM25 + vector hybrid retrieval      |
| Agent orchestration | LangGraph                                         | Graph-based stateful multi-agent workflows          |
| LLM                 | Groq (Llama 3)                                    | Free, fast inference                                |
| Embeddings          | Sentence Transformers                             | Local, free, no API key needed                      |
| Backend             | FastAPI                                           | REST API                                            |
| Frontend            | Next.js + Tailwind                                | Modern, responsive UI                               |

---

## Project Structure

```
DocChat/
├── backend/
│   ├── agents/
│   │   ├── relevance_checker.py   # Scope checking
│   │   ├── research_agent.py      # Answer generation
│   │   ├── verification_agent.py  # Fact checking
│   │   └── workflow.py            # LangGraph state machine
│   ├── config/
│   ├── document_processor/        # Docling + caching
│   ├── retriever/                 # Hybrid BM25 + vector
│   ├── utils/
│   └── main.py                    # FastAPI entrypoint
├── frontend/                      # Next.js app
├── Makefile
└── .gitignore
```

---

## Getting Started

### Prerequisites

- Python 3.11+, [uv](https://github.com/astral-sh/uv), Node.js 18+, pnpm
- Free Groq API key → [console.groq.com](https://console.groq.com)

### Setup

```bash
# Install everything
make install

# Add your Groq key
echo "GROQ_API_KEY=your_key_here" > backend/.env

# Run both frontend and backend
make dev
```

- Backend → http://localhost:8000
- Frontend → http://localhost:3000
