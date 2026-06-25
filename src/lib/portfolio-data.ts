export const portfolioData = {
  name: "Abhisek Guha",
  email: "abhisek.guha04@gmail.com",
  phone: "+91 6296043475",
  location: "Bengaluru / Hyderabad, India",
  linkedin: "https://www.linkedin.com/in/abhisek-guha-0565a5264/",
  github: "https://github.com/Abhisekguha",
  x: "https://x.com/AbhisekGuha_26",
  tagline:
    "Agentic AI · Production AI Systems · OCR · Vision Language Models · AI Evaluation",
  summary:
    "I design & build end-to-end machine learning systems with a focus on Agentic AI and scalable pipeline architectures.",
  experience: [
    {
      year: 2026,
      company: "Mondee Tech Pvt. Ltd.",
      role: "AI/ML Engineer",
      period: "Mar 2026 – Jul 2026",
      location: "Hyderabad, India",
      highlights: [
        "Enterprise evaluation framework for multi-agent AI systems",
        "93% token reduction via FastOCR + YOLOv11s OCR pipeline",
        "Qwen3-4B fine-tuning outperforming Gemini Pro by 35%",
      ],
    },
    {
      year: 2025,
      company: "HyperWorks Imaging Pvt. Ltd.",
      role: "Machine Learning Engineer",
      period: "Jan 2025 – Jan 2026",
      location: "Bangalore, India",
      highlights: [
        "Production OCR platform — 93.5% accuracy, 3.4× throughput",
        "10K+ handwritten records digitized with VLM",
        "Multi-agent orchestration with DSPy + MCP",
      ],
    },
    {
      year: 2024,
      company: "Aavaaz Inc.",
      role: "AI Research Intern",
      period: "Dec 2024 – Jan 2025",
      location: "Chicago, IL (Remote)",
      highlights: [
        "Multilingual ASR, STT, TTS evaluation pipelines",
        "Transformer LLM benchmarking for voice intelligence",
      ],
    },
    {
      year: 2024,
      company: "NIT Raipur",
      role: "AI/ML Researcher",
      period: "Aug 2024 – Nov 2024",
      location: "Raipur, India",
      highlights: [
        "94% classification accuracy on AES-128 side-channel attacks",
        "Cryptographic countermeasures improving resistance by 40%",
      ],
    },
    {
      year: 2024,
      company: "Shoonya Technologies",
      role: "CV Engineer Intern",
      period: "Jan 2024 – Jul 2024",
      location: "Bengaluru (Remote)",
      highlights: [
        "YOLOv8 waste sorting — 85% precision",
        "Led 7-person team, zero deployment rollbacks on Azure",
      ],
    },
  ],
  projects: [
    {
      id: "fastocr",
      name: "FASTOCR",
      subtitle: "Production Invoice Intelligence",
      description:
        "Intelligent OCR pipeline with FastOCR quality scoring, YOLOv11s region detection, and adaptive downsampling — eliminating wasteful LLM processing on low-quality inputs.",
      metrics: [
        { value: "93%", label: "Token reduction" },
        { value: "3.4×", label: "Throughput increase" },
      ],
      tech: ["FastOCR", "YOLOv11s", "Gemini API", "FastAPI", "React 18"],
      theme: "documents" as const,
    },
    {
      id: "aes",
      name: "AES Side-Channel Research",
      subtitle: "Cryptographic AI Defense",
      description:
        "Modernized CNN and MLP architectures for AI-driven side-channel attack detection on AES-128 encryption via power-trace analysis on Sakura-G board.",
      metrics: [{ value: "94%", label: "Classification accuracy" }],
      tech: ["CNNs", "MLPs", "MySQL", "Cryptographic AI"],
      theme: "traces" as const,
    },
    {
      id: "medical-ai",
      name: "Medical AI Multi-Agent",
      subtitle: "Clinical Reasoning System",
      description:
        "Multi-agent medical AI with Llama 3.2 11B VLM, LangGraph confidence routing, FAISS CAG pipeline, and MCP server with 4 specialized tools.",
      metrics: [
        { value: "83.54%", label: "Macro F1" },
        { value: "3–9s", label: "Clinical response" },
      ],
      tech: ["Llama 3.2", "LangGraph", "FAISS", "MCP", "FastAPI"],
      theme: "graph" as const,
    },
  ],
  aiOSPanels: [
    {
      id: "observe",
      title: "OBSERVE",
      items: ["OCR", "Vision Models", "Document Intelligence"],
      description: "Perception layer — ingest, parse, and understand multimodal inputs at scale.",
    },
    {
      id: "reason",
      title: "REASON",
      items: ["Agents", "Planning", "RAG", "Evaluation"],
      description: "Cognitive layer — orchestrate reasoning, retrieval, and rigorous evaluation.",
    },
    {
      id: "execute",
      title: "EXECUTE",
      items: ["Automation", "APIs", "Production Deployment"],
      description: "Action layer — ship reliable systems that survive real-world constraints.",
    },
  ],
  manifesto: [
    { id: "001", text: "BUILD FOR REAL USERS.", image: "/manifesto/users.jpg" },
    { id: "002", text: "LATENCY IS A FEATURE.", image: "/manifesto/latency.jpg" },
    { id: "003", text: "AUTOMATE REPETITION.", image: "/manifesto/automate.jpg" },
    { id: "004", text: "MEASURE EVERYTHING.", image: "/manifesto/measure.jpg" },
    { id: "005", text: "AI WITHOUT EVALUATION IS GUESSWORK.", image: "/manifesto/eval.jpg" },
    { id: "006", text: "SIMPLE SYSTEMS SCALE.", image: "/manifesto/scale.jpg" },
    { id: "007", text: "SHIP BEFORE PERFECT.", image: "/manifesto/ship.jpg" },
    { id: "008", text: "OBSERVE BEFORE OPTIMIZING.", image: "/manifesto/observe.jpg" },
    { id: "009", text: "AUTOMATION IS LEVERAGE.", image: "/manifesto/leverage.jpg" },
    { id: "010", text: "BUILD THINGS PEOPLE USE.", image: "/manifesto/build.jpg" },
  ],
  skills: [
    {
      id: "ai-systems",
      label: "AI Systems",
      tools: ["PyTorch", "TensorFlow", "FastAPI", "Docker", "Evaluation Frameworks"],
      color: "#3b82f6",
    },
    {
      id: "vision",
      label: "Vision AI",
      tools: ["YOLOv8/10/11", "RF-DETR", "PaddleOCR", "OpenCV", "DocTR"],
      color: "#6366f1",
    },
    {
      id: "agents",
      label: "Agents",
      tools: ["LangGraph", "LangChain", "DSPy", "MCP", "Multi-Agent Orchestration"],
      color: "#8b5cf6",
    },
    {
      id: "llms",
      label: "LLMs",
      tools: ["Fine-tuning", "RAG", "FAISS", "Qwen", "Gemini", "Llama"],
      color: "#a855f7",
    },
    {
      id: "infra",
      label: "Infrastructure",
      tools: ["Azure", "GCP", "AWS", "BigQuery", "MySQL", "Batch Processing"],
      color: "#22d3ee",
    },
    {
      id: "frontend",
      label: "Frontend",
      tools: ["React 18", "TypeScript", "Next.js", "Tailwind", "TanStack Query"],
      color: "#34d399",
    },
  ],
};

export type PortfolioData = typeof portfolioData;
