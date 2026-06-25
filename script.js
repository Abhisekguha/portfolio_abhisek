// Get API key from environment (server.py will inject it)
// DO NOT hardcode API keys in production!
const OPENROUTER_API_KEY = "";
// Model will be determined by server (from .env file)
const OPENROUTER_MODEL = "";

// ────────────────────────────────────────────
// RAG Context — structured portfolio data
// Force Markdown output from AI via system prompt
// Uses marked.js + DOMPurify for safe rendering
// ────────────────────────────────────────────

const portfolioData = {
  name: "Abhisek Guha",
  phone: "+91 6296043475",
  email: "abhisek.guha04@gmail.com",
  location: "Bengaluru / Hyderabad, India",

  // ─── Education ───
  education: [
    {
      degree: "B.Tech in Computer Science and Engineering (Artificial Intelligence)",
      institution: "Chhattisgarh Swami Vivekananda Technical University (CSVTU), Bhilai",
      period: "Oct 2022 – Jun 2026",
      cgpa: "7.5"
    },
    {
      degree: "Higher Secondary Education (10+2) — Science",
      institution: "Delhi Public School, Siliguri, West Bengal",
      period: "Apr 2020 – Jun 2022",
      cgpa: "8.72"
    }
  ],

  // ─── Social / Links ───
  linkedin: "https://www.linkedin.com/in/abhisek-guha-0565a5264/",
  github: "https://github.com/Abhisekguha",
  x: "https://x.com/AbhisekGuha_26",

  // ─── Professional summary (LinkedIn) ───
  summary:
    "I design & build end-to-end machine learning systems with a focus on Agentic AI and scalable pipeline architectures. " +
    "My work centres on designing multi-agent, multimodal AI and fine-tuning LLM & VLM systems that integrate perception, " +
    "reasoning, retrieval, and execution into cohesive, production-ready workflows. " +
    "I specialise in transformer-based systems, modular ML design, orchestration strategies, and architecting scalable " +
    "inference pipelines that operate reliably under real-world constraints.",

  // ─── Core focus areas (from LinkedIn) ───
  coreAreas: [
    "Agentic & multi-agent systems",
    "Multimodal AI",
    "Retrieval and reasoning architectures",
    "Production ML deployment"
  ],

  // ─── Top strengths ───
  strengths: [
    "LLM / VLM fine-tuning",
    "Multi-agent orchestration",
    "Document AI & OCR pipelines",
    "React + TypeScript frontend",
    "Production ML deployment"
  ],

  // ─── Experience ───
  experience: [
    {
      company: "Mondee Tech Pvt. Ltd.",
      role: "AI/ML Engineer",
      period: "Mar 2026 – Jul 2026",
      type: "Full-time",
      location: "Hyderabad, Telangana, India",
      highlights: [
        "Built and deployed an enterprise-level evaluation framework for multi-agent AI systems — automated assessment of agent collaboration, workflow execution, tool interactions, policy compliance, and operational reliability.",
        "Deployed agentic LLM flows (Google Gemini API) with prompt chaining, context management, and async orchestration; achieved 40% faster processing across autonomous multi-step retrieval and summarisation workflows.",
        "Fine-tuned and deployed Qwen3-4B (4-bit quantized) for visa processing, outperforming Gemini Pro by 35% in accuracy and 15% in response consistency; designed a quantitative + qualitative evaluation framework showing 20% superior reasoning on specialised tasks.",
        "Architected an intelligent OCR pipeline for invoice/bill extraction — 93% token reduction through CPU-efficient pre-processing (FastOCR quality scoring + YOLOv11s region detection via Transfer Learning + adaptive image downsampling), eliminating wasteful LLM processing on low-quality inputs.",
        "Developed a responsive, state-managed frontend UI in React 18 + TypeScript (Vite, Tailwind, TanStack Query) for seamless document ingestion, structured extraction, and user interaction workflows."
      ],
      tech: ["Gemini API", "Qwen3-4B", "YOLOv11s", "FastOCR", "React 18", "TypeScript", "Vite", "Tailwind", "TanStack Query", "FastAPI"]
    },
    {
      company: "HyperWorks Imaging Pvt. Ltd.",
      role: "Machine Learning Engineer",
      period: "Jan 2025 – Jan 2026",
      type: "Full-time",
      location: "Bangalore, Karnataka, India",
      highlights: [
        "Architected end-to-end document AI pipelines with YOLOv10 + RF-DETR for layout detection; built OCR-assisted table, figure, and caption extraction with rotation-aware parsing (DocTR, PaddleOCR), adaptive windowing, orientation correction, and coordinate-based cell normalisation across diverse document formats.",
        "Spearheaded a production-grade OCR platform (PaddleOCR + ViT-HTR + Qwen2-VL) achieving 93.5% extraction accuracy and 3.4× throughput improvement; fine-tuned VLM-based OCR to digitise 10,000+ handwritten lithological records, improving data accessibility by 85% and reducing manual effort by 70%.",
        "Built GUI-aware vision-language browser automation (OmniParser + RF-DETR) for GUI element detection; processed web-scraped data through DSPy RLMs to create contextual memory and validation signals — enabling reliable flight booking and e-commerce transaction execution beyond rule-based automation.",
        "Applied DSPy-based RLM memory compression: 93% context reduction with 85% convergence; conceived and deployed multi-agent orchestration combining document extraction, retrieval-augmented QA, and MCP services for end-to-end ingestion, inference, and report generation.",
        "Initiated low-compute generative AI with StyleGAN + Stable Diffusion for synthetic dataset expansion — 2,500+ high-fidelity samples, 60% faster data scalability; implemented Graph-PReFLexOR reasoning with GRPO-optimised Qwen-Instruct, reducing hallucinations by 8% via structured graph retrieval.",
        "Delivered production ML infrastructure and APIs in Python, PyTorch, and FastAPI with end-to-end data preprocessing and large-scale batch processing across 10,000+ document records."
      ],
      tech: ["YOLOv10", "RF-DETR", "PaddleOCR", "ViT-HTR", "Qwen2-VL", "DSPy", "OmniParser", "StyleGAN", "Stable Diffusion", "PyTorch", "FastAPI", "MCP"]
    },
    {
      company: "Aavaaz Inc.",
      role: "AI Research Intern",
      period: "Dec 2024 – Jan 2025",
      type: "Part-time",
      location: "Chicago, IL, USA (Remote)",
      highlights: [
        "Developed and evaluated multilingual ASR, STT, TTS, and NLP models for real-time voice intelligence — benchmarked against existing pipelines to resolve acoustic feature inconsistencies, improve contextual understanding, and reduce inference latency across production environments.",
        "Restructured speech-to-text preprocessing and model validation pipelines; diagnosed latency bottlenecks and benchmarked transformer-based LLMs to improve contextual accuracy and system robustness."
      ],
      tech: ["ASR", "STT", "TTS", "NLP", "Transformers", "Python"]
    },
    {
      company: "National Institute of Technology (NIT) Raipur",
      role: "AI/ML Researcher (R&D)",
      period: "Aug 2024 – Nov 2024",
      type: "Research / Full-time",
      location: "Raipur, Chhattisgarh, India",
      highlights: [
        "Modernised CNN and MLP architectures for AI-driven side-channel attack detection on AES-128 encryption — 94% classification accuracy, 25% above baseline Differential Power Analysis (DPA) via power-trace analysis on a Sakura-G board.",
        "Leveraged MySQL to manage and query power-trace voltage datasets for efficient retrieval and mapping across cryptographic analysis pipelines.",
        "Proposed cryptographic countermeasures improving system resistance to AI-based adversarial attacks by 40%, validated through rigorous power-trace testing."
      ],
      tech: ["CNNs", "MLPs", "MySQL", "Python", "Cryptographic AI", "AES-128"]
    },
    {
      company: "Shoonya Technologies",
      role: "Computer Vision Engineer Intern",
      period: "Jan 2024 – Jul 2024",
      type: "Part-time",
      location: "Bengaluru, India (Remote)",
      highlights: [
        "Implemented YOLOv8 + TensorFlow classification pipelines for waste sorting — 85% precision in recyclable material detection; engineered custom data preprocessing reducing training time by 35% and improving accuracy by 12% through refined Python-Azure workflows.",
        "Led a 7-member engineering team to deploy across Azure Cloud + Docker with zero deployment rollbacks, ensuring scalability, fault tolerance, and real-time production reliability."
      ],
      tech: ["YOLOv8", "TensorFlow", "Python", "Azure", "Docker"]
    }
  ],

  // ─── Skills by category ───
  skills: {
    "Languages": ["Python", "C++", "R", "Matlab", "JavaScript", "TypeScript"],
    "Machine Learning": ["scikit-learn", "XGBoost", "Random Forest", "pandas", "NumPy", "Feature Engineering", "Model Validation"],
    "Deep Learning": ["PyTorch", "TensorFlow", "CNNs", "GANs", "Transformers", "VLMs", "LLMs", "NLP"],
    "LLMs & Agents": ["LangChain", "LangGraph", "DSPy", "MCP", "FAISS", "RAG", "HuggingFace", "Fine-tuning"],
    "Computer Vision": ["YOLOv8", "YOLOv10", "RF-DETR", "OpenCV", "StyleGAN", "Stable Diffusion", "PaddleOCR", "OmniParser"],
    "Infrastructure & DevOps": ["FastAPI", "Docker", "Git", "Python", "PyTorch"],
    "Cloud": ["Google Cloud (GCP)", "AWS", "Azure", "BigQuery"],
    "Databases": ["MySQL", "BigQuery", "FAISS"],
    "Web & Frontend": ["React 18", "Vite", "Tailwind CSS", "TanStack Query", "HTML5", "CSS", "JavaScript", "Node.js", "Django"],
    "Data & Analytics": ["Power BI", "Tableau", "Excel"],
    "Platforms": ["Jupyter Notebook", "Google Colab", "Anaconda", "VS Code"]
  },

  // ─── Projects ───
  projects: [
    {
      name: "Multi-Agent Medical AI System with MCP Integration",
      date: "Dec 2025",
      description:
        "Architected a multi-agent medical AI integrating Llama 3.2 11B VLM and fine-tuned LLMs — 83.54% Macro F1 on disease classification with human-in-the-loop validation via LangGraph confidence-based routing.",
      details:
        "Cache-Augmented Generation (CAG) pipeline with FAISS-indexed retrieval (3,000+ chunks, hybrid BM25 + dense search) delivers clinical responses in 3–9s and VLM inferences in 10–30s within a 1,024-token context window. " +
        "4-bit quantisation on T4 GPU (10.5 GB / 15 GB VRAM) · LangGraph confidence routing · MCP server with 4 specialised tools (Medical image analysis, Triage assessment, Multimodal diagnosis, Guideline search) · " +
        "FastAPI multimodal UI with real-time orchestration across three reasoning modes (sequential / parallel / VLM-first), structured triage classification (Emergency / Urgent / Routine), result caching, and comprehensive logging.",
      tech: ["Llama 3.2 11B", "LangGraph", "FAISS", "MCP", "FastAPI", "PyTorch", "BM25", "4-bit Quantisation"],
      featured: true
    },
    {
      name: "IoT-Based Anomaly Detection using Surveillance Camera",
      date: "May 2024",
      description:
        "Devised a low-cost traffic surveillance system using OpenCV + Raspberry Pi — 92% operational cost reduction. Upscaled video feeds to 4K/60 FPS with YOLOv8, achieving 75% storage efficiency and 89% AI model refinement for road safety.",
      details:
        "Deployed on Raspberry Pi with YOLOv8 + TensorFlow for real-time anomaly detection; optimised inference pipeline for edge compute constraints.",
      tech: ["OpenCV", "YOLOv8", "Raspberry Pi", "TensorFlow", "Python"],
      featured: false
    },
    {
      name: "Quick E-Commerce Market Prediction — INFED Hackathon",
      date: "Nov 2024",
      description:
        "2nd place at IIM Nagpur INFED Data Analytics Hackathon — end-to-end ML prediction pipeline (Python, scikit-learn, Random Forest) forecasting Quick E-Commerce market trends with 90%+ accuracy and 85% forecasting accuracy.",
      details:
        "Designed a Power BI dashboard with 10+ SWOT, GAP, and Trend Analysis reports; improved decision-making efficiency by 40%. Included web scraping, feature engineering, and full model validation.",
      tech: ["scikit-learn", "Random Forest", "Python", "Power BI", "Web Scraping"],
      featured: false
    },
    {
      name: "Real-Time Data Pipeline — Informatica Hackathon",
      date: "Apr 2024",
      description:
        "Built a cost-efficient GCP + BigQuery pipeline for real-time data ingestion and analysis — 35% reduction in processing bottlenecks, 60% increase in decision-making speed.",
      details:
        "Managed a 4-member cross-functional team; integrated Claude API to reduce development time by 30% and boost productivity by 40%.",
      tech: ["GCP", "BigQuery", "Claude API", "Python"],
      featured: false
    }
  ],

  // ─── Key metrics / impact stats ───
  keyMetrics: [
    { value: "93%",   label: "Token reduction via FastOCR pipeline (Mondee)" },
    { value: "3.4×",  label: "Throughput improvement on production OCR platform" },
    { value: "93.5%", label: "OCR extraction accuracy (HyperWorks)" },
    { value: "10K+",  label: "Handwritten records digitised with VLM" },
    { value: "94%",   label: "Classification accuracy on AES-128 side-channel attacks" },
    { value: "83.54%",label: "Macro F1 on medical disease classification (Multi-Agent AI)" },
    { value: "92%",   label: "Cost reduction on IoT traffic surveillance system" },
    { value: "40%",   label: "Faster LLM processing via async orchestration" }
  ],

  // ─── Certifications & Awards ───
  certifications: [
    "🏆 2nd Place — INFED Data Analytics Hackathon, IIM Nagpur (Nov 2024)",
    "📜 Generative AI with Large Language Models — Coursera (May 2024)",
    "☁️ Google Cloud Computing — Google Developers Group (Aug 2023)",
    "🤖 Supervised Machine Learning — Coursera (Jul 2023)"
  ],

  // ─── Leadership & Extracurriculars ───
  extracurricular: [
    "⚙️ Smart India Hackathon — Qualifier (Oct 2024)",
    "🔍 Google Hackathon H2S — Qualifier via Hack2Skill (May 2024)"
  ]
};

// ────────────────────────────────────────────
// System prompt — forces Markdown output
// ────────────────────────────────────────────
const systemPrompt = `You are an AI portfolio assistant for ${portfolioData.name}. You MUST respond using **proper Markdown formatting** at all times.

## Response Formatting Rules:
- Use **bold** for emphasis, *italic* for secondary emphasis.
- Use \`code\` for technical terms, model names, frameworks, and technologies.
- Use bullet lists (- ) for lists of items.
- Use numbered lists (1. ) for ranked or sequential information.
- Use ### headings to organise longer responses.
- Use | tables | to | format | structured data (skills by category, experience timeline).
- Use > blockquotes for key quotes or highlights.
- Use \`\`\` fences for code blocks when showing technical configurations or metrics.

## Portfolio Data:
Use the details below to answer questions accurately and professionally. Do not invent job titles or experience beyond this information.

**Profile:**
- Name: ${portfolioData.name}
- Phone: ${portfolioData.phone}
- Email: ${portfolioData.email}
- Location: ${portfolioData.location}
- [LinkedIn](${portfolioData.linkedin})
- [GitHub](${portfolioData.github})
- [X / Twitter](${portfolioData.x})

**Summary:**
${portfolioData.summary}

**Core Focus Areas:** ${portfolioData.coreAreas.join(" · ")}

**Education:**
${portfolioData.education.map(e => `- ${e.degree} — ${e.institution} (${e.period}) | CGPA: ${e.cgpa}`).join('\n')}

**Key Strengths:** ${portfolioData.strengths.join(", ")}

**Experience:**
| Period | Company | Role | Location |
|--------|---------|------|----------|
${portfolioData.experience.map(e => `| ${e.period} | ${e.company} | ${e.role} | ${e.location} |`).join('\n')}

**Skills by Category:**
${Object.entries(portfolioData.skills).map(([cat, items]) => `- **${cat}:** ${items.join(", ")}`).join('\n')}

**Projects:**
${portfolioData.projects.map(p => `- **${p.name}** (${p.date}): ${p.description} [Tech: ${p.tech.join(", ")}]`).join('\n')}

**Key Metrics:**
${portfolioData.keyMetrics.map(m => `- **${m.value}** — ${m.label}`).join('\n')}

**Certifications & Awards:**
${portfolioData.certifications.map(c => `- ${c}`).join('\n')}

**Leadership & Extracurriculars:**
${portfolioData.extracurricular.map(e => `- ${e}`).join('\n')}

**Guidelines:**
1. When asked about experience, present it as a Markdown table (Period · Company · Role · Location) then elaborate with bullet points per role.
2. When asked about skills, group them by category in a Markdown table or organised list.
3. When asked about projects, present them as cards: **bold name**, *italic date*, description, and \`tech\` tags.
4. Keep responses concise but informative. Use tables for comparisons.
5. If the user asks for details beyond what's provided here, say the full resume is available on request.
6. NEVER wrap your entire response in a code block — write natural Markdown.
7. ALWAYS use proper Markdown syntax — this is non-negotiable.`;

// ────────────────────────────────────────────
// Chat UI
// ────────────────────────────────────────────

const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatPanel = document.getElementById('chatPanel');
const chatFab = document.getElementById('chatFab');
const chatOverlay = document.getElementById('chatOverlay');
const chatCloseBtn = document.getElementById('chatCloseBtn');
const chatSendBtn = document.getElementById('chatSendBtn');
const chatSuggestions = document.getElementById('chatSuggestions');

/**
 * Render Markdown safely: parse with marked, sanitize with DOMPurify
 */
function renderMarkdown(text) {
  // Configure marked for safety and compatibility
  marked.setOptions({
    breaks: true,
    gfm: true
  });
  
  // Parse Markdown → HTML, then sanitize with DOMPurify
  const rawHtml = marked.parse(text);
  return DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr',
      'ul', 'ol', 'li',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'pre', 'code',
      'blockquote',
      'strong', 'em', 'b', 'i', 'u', 's',
      'a', 'img',
      'span', 'div'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'class']
  });
}

function addMessage(content, role) {
  const message = document.createElement('div');
  message.className = `message ${role}`;
  
  if (role === 'bot') {
    // Render Markdown for bot messages
    message.innerHTML = renderMarkdown(content);
  } else {
    // User messages: plain text, escape HTML
    message.textContent = content;
  }
  
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// setLoadingMessage() — defined below with improved typing dots animation

function toggleChat(open) {
  if (open === undefined) {
    open = !chatPanel.classList.contains('active');
  }
  if (open) {
    chatPanel.classList.add('active');
    chatOverlay.classList.add('active');
    chatInput.focus();
  } else {
    chatPanel.classList.remove('active');
    chatOverlay.classList.remove('active');
  }
}

chatFab.addEventListener('click', () => toggleChat(true));
chatCloseBtn.addEventListener('click', () => toggleChat(false));
chatOverlay.addEventListener('click', () => toggleChat(false));

document.getElementById('navChatBtn').addEventListener('click', () => toggleChat(true));

chatSendBtn.addEventListener('click', handleSubmit);
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSubmit();
  }
});

function handleSubmit() {
  const userText = chatInput.value.trim();
  if (!userText) return;
  
  addMessage(userText, 'user');
  chatInput.value = '';
  
  // Remove suggestions on first message
  if (chatSuggestions) {
    chatSuggestions.style.display = 'none';
  }
  
  setLoadingMessage();
  
  sendChatRequest(userText)
    .then((responseText) => {
      const loadingEl = document.getElementById('loadingMessage');
      if (loadingEl) {
        loadingEl.remove();
      }
      addMessage(responseText, 'bot');
    })
    .catch((error) => {
      const loadingEl = document.getElementById('loadingMessage');
      if (loadingEl) {
        loadingEl.remove();
      }
      addMessage(`⚠️ Error: ${error.message}`, 'bot');
      console.error('Chat error:', error);
    });
  
  chatInput.focus();
}

function askSuggestion(button) {
  const text = button.textContent;
  chatInput.value = text;
  handleSubmit();
}

async function sendChatRequest(question) {
  try {
    const payload = {
      model: OPENROUTER_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question }
      ],
      temperature: 0.65,
      max_tokens: 1500
    };

    // Add timeout wrapper
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorBody = '';
      try {
        errorBody = await response.text();
      } catch (e) {
        errorBody = 'Unable to read error response';
      }
      
      if (response.status === 429) {
        throw new Error('Rate limited. Please wait a moment before trying again.');
      } else if (response.status === 401 || response.status === 403) {
        throw new Error('Authentication failed. API key may be invalid or expired.');
      } else if (response.status >= 500) {
        throw new Error('OpenRouter service unavailable. Please try again later.');
      } else {
        throw new Error(`Request failed (${response.status}): ${errorBody.substring(0, 100)}`);
      }
    }

    let data;
    try {
      data = await response.json();
    } catch (e) {
      throw new Error('Invalid response format from server.');
    }

    const answer = data?.choices?.[0]?.message?.content;
    if (!answer) {
      console.error("No answer found in response. Full response:", data);
      throw new Error('No response content from OpenRouter.');
    }
    
    return answer.trim();
  } catch (error) {
    // Handle timeout
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    // Re-throw with proper context
    throw error;
  }
}

// ────────────────────────────────────────────
// Premium Photo — Linear/Vercel/Apple style
// ────────────────────────────────────────────

function initPremiumPhoto() {
  const photoSection = document.getElementById('heroPhoto');
  const photoFrame = document.getElementById('photoFrame');
  const canvas = document.getElementById('photoParticles');
  if (!photoFrame || !canvas) return;

  // ─── Particle System ───
  let particles = [];
  let mousePX = 0, mousePY = 0;
  let rafId = null;
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    const rect = photoSection.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  class Particle {
    constructor(w, h) {
      this.reset(w, h);
    }
    reset(w, h) {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.25;
      this.speedY = (Math.random() - 0.5) * 0.25;
      this.opacity = Math.random() * 0.3 + 0.05;
      this.baseX = this.x;
      this.baseY = this.y;
    }
    update(w, h, mx, my) {
      this.x += this.speedX;
      this.y += this.speedY;
      // Mouse influence
      const dx = this.x - mx;
      const dy = this.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        const force = (150 - dist) / 150;
        this.x += dx * force * 0.015;
        this.y += dy * force * 0.015;
      }
      // Return to base
      this.x += (this.baseX - this.x) * 0.003;
      this.y += (this.baseY - this.y) * 0.003;
      // Boundary wrap
      if (this.x < 0) this.x = w;
      if (this.x > w) this.x = 0;
      if (this.y < 0) this.y = h;
      if (this.y > h) this.y = 0;
    }
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(96, 165, 250, ${this.opacity})`;
      ctx.fill();
    }
  }

  function initParticles() {
    const w = canvas.width / window.devicePixelRatio;
    const h = canvas.height / window.devicePixelRatio;
    const count = Math.min(Math.floor((w * h) / 5000), 50);
    particles = Array.from({ length: count }, () => new Particle(w, h));
  }

  function animateParticles() {
    const w = canvas.width / window.devicePixelRatio;
    const h = canvas.height / window.devicePixelRatio;
    ctx.clearRect(0, 0, w, h);
    const rect = photoSection.getBoundingClientRect();
    const mx = mousePX - rect.left;
    const my = mousePY - rect.top;
    particles.forEach(p => {
      p.update(w, h, mx, my);
      p.draw(ctx);
    });
    rafId = requestAnimationFrame(animateParticles);
  }

  resizeCanvas();
  initParticles();
  animateParticles();

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });

  // ─── 3D Tilt on Hover (spring physics via CSS transition) ───
  function handleMouseMove(e) {
    const rect = photoSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePX = e.clientX;
    mousePY = e.clientY;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = -((y - centerY) / centerY) * 6;
    const scaleVal = 1.02;
    
    photoFrame.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(${scaleVal}, ${scaleVal}, ${scaleVal})
    `;
  }

  function handleMouseLeave() {
    photoFrame.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `;
  }

  photoSection.addEventListener('mousemove', handleMouseMove);
  photoSection.addEventListener('mouseleave', handleMouseLeave);

  // ─── GSAP Scroll Reveal ───
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      try {
        // Set initial state only if the element is in the viewport or below
        const rect = photoSection.getBoundingClientRect();
        const inView = rect.top < window.innerHeight;
        if (!inView) {
          gsap.set('.photo-frame', { opacity: 0, scale: 0.92, filter: 'blur(10px)', y: 20 });
          gsap.set('.photo-glow', { opacity: 0, scale: 0.8 });
        }

        ScrollTrigger.create({
          trigger: photoSection,
          start: 'top 95%',
          once: true,
          onEnter: () => {
            gsap.to('.photo-frame', { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0, duration: 1.1, ease: 'power3.out' });
            gsap.to('.photo-glow', { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.1 });
          }
        });
      } catch(e) {
        forceVisibility();
      }
    });
  }

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    if (rafId) cancelAnimationFrame(rafId);
  });
}

// ─── Magnetic Buttons ───
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.magnetic-btn');
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const deltaX = (x - centerX) * 0.15;
      const deltaY = (y - centerY) * 0.15;
      btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// ─── Floating Image Animation (GSAP) ───
function initFloatingImage() {
  const frame = document.querySelector('.photo-frame');
  if (!frame) return;
  gsap.to(frame, {
    y: -10,
    repeat: -1,
    yoyo: true,
    duration: 3.5,
    ease: 'sine.inOut'
  });
}

// ────────────────────────────────────────────
// GSAP — hero entrance + scroll reveals
// ────────────────────────────────────────────

function forceVisibility() {
  // Guarantee all content is visible regardless of GSAP state
  const selectors = [
    '#terminalTag', '#heroTitle', '.hero-sub', '.hero-badges', '.hero-actions',
    '.hero-word', '.section-heading', '.about-grid', '.timeline',
    '.projects-grid', '.skills-grid', '.contact-grid', '.photo-frame', '.photo-glow'
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.filter = 'none';
      el.style.visibility = 'visible';
    });
  });

  // Extra: ensure h1 text is never invisible — override any broken gradient
  const h1 = document.getElementById('heroTitle');
  if (h1) {
    // Always revert the parent h1 text fill to prevent transparent leaking into child spans
    h1.style.webkitTextFillColor = 'revert';
    h1.style.color = '#e2e8f0';
    h1.style.background = 'none';
    // Ensure any hero-word spans inside the h1 have visible styling
    h1.querySelectorAll('.hero-word').forEach(word => {
      word.style.opacity = '1';
      word.style.transform = 'none';
      word.style.filter = 'none';
      word.style.visibility = 'visible';
      word.style.webkitTextFillColor = 'revert';
      word.style.color = '#e2e8f0';
      word.style.background = 'none';
    });
  }

  const termText = document.getElementById('termText');
  if (termText && !termText.textContent) termText.textContent = 'cat portfolio.json';
}

function initAnimations() {
  // Always show content immediately as fallback
  forceVisibility();

  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  const termText = document.getElementById('termText');
  const typewriterText = 'cat portfolio.json';
  const statNumbers = document.querySelectorAll('.stat-number[data-value]');

  const setFinalStates = () => {
    if (termText) termText.textContent = typewriterText;
    statNumbers.forEach((el) => {
      const value = parseFloat(el.dataset.value);
      const suffix = el.dataset.suffix || '';
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      el.textContent = `${value.toFixed(decimals)}${suffix}`;
    });
    gsap.set('.hero-sub, .hero-badges, .hero-actions, .stat-card', {
      opacity: 1,
      y: 0,
      clearProps: 'transform'
    });
    gsap.set('#terminalTag', { opacity: 1, y: 0, clearProps: 'transform' });
    gsap.set('.section-heading, .about-grid, .timeline, .projects-grid, .skills-grid, .contact-grid', {
      opacity: 1,
      y: 0,
      clearProps: 'transform'
    });
  };

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: reduce)', setFinalStates);

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    try {
    gsap.set('.hero-sub, .hero-badges, .hero-actions, .stat-card', {
      opacity: 0,
      y: 28
    });
    gsap.set('#terminalTag', { opacity: 0, y: 16 });

    // ─── Word-by-word Hero Reveal ───
    const heroTitle = document.getElementById('heroTitle');
    const originalText = heroTitle ? heroTitle.textContent : '';
    if (heroTitle) {
      // Remove transparent text fill from parent h1 to prevent leaking into child spans
      heroTitle.style.webkitTextFillColor = 'revert';
      heroTitle.style.color = '#e2e8f0';
      // Apply the gradient to each word span so it's visible after GSAP animates opacity
      const words = originalText.split(' ').map(w => `<span class="hero-word" style="display:inline-block;opacity:0;transform:translateY(40px);filter:blur(8px);background:linear-gradient(100deg,#38e8c8 0%,#5ddfc0 18%,#a5f3fc 40%,#ffffff 65%,#f0fdf4 100%);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;">${w}</span>`).join(' ');
      heroTitle.innerHTML = words;
    }

    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    const typewriter = { chars: 0 };

    heroTl
      .to('#terminalTag', { opacity: 1, y: 0, duration: 0.55 })
      .to(typewriter, {
        chars: typewriterText.length,
        duration: 1.25,
        ease: 'none',
        onUpdate: () => {
          if (termText) {
            termText.textContent = typewriterText.slice(0, Math.round(typewriter.chars));
          }
        }
      })
      .to('.hero-word', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        stagger: 0.04,
        duration: 0.7
      }, '-=0.2')
      .to('.hero-sub', { opacity: 1, y: 0, duration: 0.65 }, '-=0.35')
      .to('.hero-badges', { opacity: 1, y: 0, duration: 0.55 }, '-=0.35')
      .to('.hero-actions', { opacity: 1, y: 0, duration: 0.55 }, '-=0.3')
      .to('.stat-card', { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, '-=0.25');

    // ─── Scroll Scrub: hero content parallax on scroll ───
    ScrollTrigger.create({
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      animation: gsap.to('.hero-copy', {
        y: -120,
        scale: 0.95,
        ease: 'none'
      })
    });

    statNumbers.forEach((el, index) => {
      const counter = { val: 0 };
      const target = parseFloat(el.dataset.value);
      const suffix = el.dataset.suffix || '';
      const decimals = parseInt(el.dataset.decimals || '0', 10);

      heroTl.to(
        counter,
        {
          val: target,
          duration: 1.35,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${counter.val.toFixed(decimals)}${suffix}`;
          }
        },
        index === 0 ? '-=0.55' : '<0.08'
      );
    });

    gsap.utils.toArray('.section').forEach((section) => {
      const heading = section.querySelector('.section-heading');
      const content = section.querySelector(
        '.about-grid, .timeline, .projects-grid, .skills-grid, .contact-grid'
      );
      if (!heading || !content) return;

      gsap.set([heading, content], { opacity: 0, y: 36 });

      ScrollTrigger.create({
        trigger: section,
        start: 'top 82%',
        once: true,
        animation: gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .to(heading, { opacity: 1, y: 0, duration: 0.7 })
          .to(content, { opacity: 1, y: 0, duration: 0.85 }, '-=0.45')
      });
    });

    return () => {
      heroTl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
    } catch(e) {
      console.warn('GSAP animation error, showing content:', e);
      forceVisibility();
    }
  });
}

// ────────────────────────────────────────────
// Scroll Progress Bar
// ────────────────────────────────────────────
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

// ────────────────────────────────────────────
// Topbar scroll class
// ────────────────────────────────────────────
function initTopbarScroll() {
  const topbar = document.getElementById('topbar');
  if (!topbar) return;
  window.addEventListener('scroll', () => {
    topbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ────────────────────────────────────────────
// Active Nav Link on Scroll
// ────────────────────────────────────────────
function initActiveNav() {
  const sections = ['about', 'experience', 'projects', 'skills', 'contact'];
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

// ────────────────────────────────────────────
// Mobile Nav
// ────────────────────────────────────────────
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavChatBtn = document.getElementById('mobileNavChatBtn');
  if (!hamburger || !mobileNav) return;

  function closeMobileNav() {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  }

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });

  mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  if (mobileNavChatBtn) {
    mobileNavChatBtn.addEventListener('click', () => {
      closeMobileNav();
      toggleChat(true);
    });
  }
}

// ────────────────────────────────────────────
// Stats Bar Counter Animation
// ────────────────────────────────────────────
function initStatsBar() {
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  if (!statNums.length) return;

  const formatNum = (val, abbrev, suffix, decimals) => {
    let display = val;
    if (abbrev && val >= 1000) {
      display = (val / 1000).toFixed(1) + 'K';
    } else if (decimals > 0) {
      display = val.toFixed(decimals);
    } else {
      display = Math.round(val).toString();
    }
    return display + (suffix || '');
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);

      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const decimals = parseInt(el.dataset.decimal || '0', 10);
      const abbrev = el.dataset.abbrev === 'true';
      const duration = 1600;
      const start = performance.now();

      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;
        el.textContent = formatNum(current, abbrev, suffix, decimals);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = formatNum(target, abbrev, suffix, decimals);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.4 });

  statNums.forEach(el => observer.observe(el));
}

// ────────────────────────────────────────────
// Improved typing indicator (3 animated dots)
// ────────────────────────────────────────────
function setLoadingMessage() {
  const msg = document.createElement('div');
  msg.className = 'message bot typing';
  msg.id = 'loadingMessage';
  // Three dot spans for CSS animation
  msg.innerHTML = '<span></span>';
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

window.addEventListener('DOMContentLoaded', () => {
  initPremiumPhoto();
  initAnimations();
  initMagneticButtons();
  initFloatingImage();
  initScrollProgress();
  initTopbarScroll();
  initActiveNav();
  initMobileNav();
  initStatsBar();

  // Initialize with welcome message (Markdown formatted)
  addMessage(`Hi! I'm **Abhisek's AI assistant**. 👋

Ask me about:

- 💼 His **experience** and **work history**
- 🛠️ His **technical skills** (grouped by category)
- 📁 **Projects** he has built
- 🎓 **Education** and **certifications**
- 📊 **Key metrics** from his work

I respond in proper **Markdown** with tables, lists, and code formatting!`, 'bot');
});