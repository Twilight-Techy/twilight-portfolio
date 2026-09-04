export interface ProjectTechnologies {
  frontend: string[];
  backend: string[];
  deployment: string[];
  other: string[];
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  challenge: string;
  solution: string;
  outcome: string;
  image: string;
  coverImage: string;
  images: string[];
  tags: string[];
  category: string;
  status: "Live" | "Open source" | "In development";
  /** Phone screenshots: letterbox them instead of cropping to fill. */
  portraitImages?: boolean;
  link?: string;
  github?: string;
  featured: boolean;
  completedAt: string;
  duration: string;
  client: string;
  role: string;
  keyFeatures: string[];
  technologies: ProjectTechnologies;
}

const PLACEHOLDER = "/placeholder.svg";

export const projects: Project[] = [
  {
    id: 1,
    slug: "artemis",
    title: "Artemis",
    subtitle: "An AI agent that reasons over sensor data and controls real hardware",
    description:
      "A smart-home agent that turns speech into tool calls and controls physical devices, gated by an explicit reasoning trace and user approval before anything happens.",
    longDescription:
      "Artemis is a voice- and text-driven agent for smart-home automation. Rather than matching commands against a fixed rule table, it hands the model a set of tools and lets it decide which to call and with what arguments. The system runs the complete agentic loop: the model selects a tool, the backend executes it against real hardware, the result is fed back into the conversation as a function response, and the model composes the confirmation the user hears. It spans four layers: a React Native client, a FastAPI intelligence core, ESP32 firmware in C++, and a Python simulator that mirrors the firmware exactly.",
    challenge:
      "An agent that can switch on a heater is not the same problem as an agent that can write a paragraph. A wrong tool call has physical consequences, so the model cannot be trusted to act unilaterally. The second challenge was development itself: needing a wired breadboard on the desk to test any backend change would have made the project impossible to work on.",
    solution:
      "Every tool call carries a mandatory reasoning_trace parameter (the model must state its observations and deductions before it can request an action) and the action is held behind a plain-English confirmation question until the user approves. For development, I wrote a Python simulator that reproduces the ESP32's exact REST and MQTT footprint, so the entire stack is runnable with no hardware attached. Sensors publish only on state change rather than polling, which keeps the network quiet.",
    outcome:
      "The full pipeline works end to end on physical hardware: a spoken command is transcribed, resolved to a tool call with a visible reasoning trace, approved by the user, and executed on an ESP32 driving a four-channel relay. The simulator makes the same flow reproducible without any hardware.",
    image: "/images/projects/artemis-dashboard.png",
    coverImage: "/images/projects/artemis-dashboard.png",
    images: ["/images/projects/artemis-dashboard.png", "/images/projects/artemis-automations.png", "/images/projects/artemis-devices.png", "/images/projects/artemis-capabilities.png"],
    tags: ["FastAPI", "Gemini", "Model Context Protocol", "MQTT", "ESP32", "React Native"],
    category: "agents",
    status: "Open source",
    portraitImages: true,
    github: "https://github.com/Twilight-Techy/artemis",
    featured: true,
    completedAt: "2026-07-15",
    duration: "Final-year project",
    client: "Self-initiated",
    role: "Sole engineer (backend, firmware, mobile client)",
    keyFeatures: [
      "Full agentic loop: tool selection, execution, result fed back, spoken confirmation",
      "Mandatory reasoning trace before any physical action",
      "Human-in-the-loop approval gate on every device command",
      "Voice pipeline with on-request transcription",
      "Event-driven sensor telemetry over MQTT, published only on state change",
      "Dynamic UI that renders controls from device-advertised capabilities",
      "Python simulator mirroring the firmware's exact wire contract",
    ],
    technologies: {
      frontend: ["React Native", "Expo", "TypeScript"],
      backend: ["FastAPI", "Python", "SQLAlchemy", "Pydantic"],
      deployment: ["MQTT broker", "Uvicorn", "SQLite"],
      other: ["Gemini", "Model Context Protocol", "ESP32", "C++", "DHT22 / PIR / LDR sensors"],
    },
  },
  {
    id: 2,
    slug: "kliniq",
    title: "Kliniq",
    subtitle: "Clinical triage across four Nigerian languages, on a model I deployed myself",
    description:
      "Clinical triage in English, Hausa, Igbo and Yoruba, built on N-ATLaS, an open-weight Nigerian multilingual model served on GPUs with vLLM.",
    longDescription:
      "Kliniq is a healthcare platform that lets patients describe symptoms in the language they actually speak, and gives clinicians a triaged view of what came in. It is built on N-ATLaS, an open-weight Nigerian multilingual model, which I deployed and served myself rather than calling a hosted API. A model that understands Hausa, Igbo and Yoruba is not something you can buy off a commercial endpoint.",
    challenge:
      "Two hard problems. First, serving a large open-weight model affordably: GPUs are expensive, and a health platform cannot pay for an idle A10G around the clock. Second, N-ATLaS has no native function calling, so there was no built-in way for the model to actually create a triage record or request an appointment rather than just talking about doing so.",
    solution:
      "The model runs on Modal with vLLM behind a container that scales to zero: FP16 weights, an 8K context window, model weights cached in a persistent volume so cold starts pull from disk instead of the network, and request concurrency so one warm container serves several users. For tool use I defined a structured call protocol the model emits as part of its generation, then parsed those blocks out of the raw text and executed them transactionally against PostgreSQL, giving an open-weight model the same capability commercial APIs provide natively.",
    outcome:
      "Deployed and live. Patients can hold a triage conversation in four languages, and tool calls parsed from raw generations create real appointment requests and triage records in the database. Built for the Awarri Developer Challenge 2025.",
    image: "/images/projects/kliniq-patient.png",
    coverImage: "/images/projects/kliniq-patient.png",
    images: ["/images/projects/kliniq-patient.png", "/images/projects/kliniq-clinician.png", "/images/projects/kliniq-nurse.png", "/images/projects/kliniq-patients.png", "/images/projects/kliniq-landing.png"],
    tags: ["vLLM", "Modal", "FastAPI", "PostgreSQL", "SQLAlchemy", "Multilingual AI"],
    category: "llm",
    status: "Live",
    link: "https://kliniq-ui.vercel.app/",
    github: "https://github.com/Twilight-Techy/kliniq-api",
    featured: true,
    completedAt: "2026-03-11",
    duration: "Hackathon build, extended after",
    client: "Awarri Developer Challenge 2025",
    role: "Backend and inference infrastructure",
    keyFeatures: [
      "N-ATLaS served on Modal A10G GPUs with vLLM",
      "Tool calling implemented on a model with no native function-calling support",
      "Triage conversations in English, Hausa, Igbo and Yoruba",
      "Voice messages with transcription and translation",
      "Role-based access for patients, nurses and doctors",
      "Appointment scheduling and hospital linking",
      "Fully async backend on SQLAlchemy 2.0 and asyncpg",
    ],
    technologies: {
      frontend: ["Next.js", "TypeScript"],
      backend: ["FastAPI", "SQLAlchemy 2.0", "asyncpg", "PyJWT", "Alembic"],
      deployment: ["Modal", "A10G GPU", "Render", "Vercel", "PostgreSQL"],
      other: ["vLLM", "N-ATLaS", "Tool calling", "FP16 inference"],
    },
  },
  {
    id: 3,
    slug: "ev-range-estimation",
    title: "EV Range Estimation",
    subtitle: "An LSTM compressed to run on a $5 microcontroller",
    description:
      "Range prediction for electric tricycles from a 60-second telemetry window, quantized to INT8 and running on an ESP32 inside a 120 KB tensor arena.",
    longDescription:
      "An end-to-end pipeline that predicts the remaining range of a Keke Maruwa electric tricycle from live telemetry, then runs that prediction on the vehicle itself rather than in the cloud. Range is a time-series problem: a tricycle driven hard for the last minute has very different remaining range than one driven smoothly, even at identical state of charge and battery temperature. The model therefore reads a 60-second rolling window of ten sensor features rather than an instantaneous snapshot.",
    challenge:
      "The model had to run on hardware with roughly 120 KB of usable RAM for inference. A trained LSTM in its native form is far too large, and its graph contains operations that only exist on GPU builds of TensorFlow. Cloud inference was not an option, a vehicle in traffic cannot depend on connectivity for a reading on its own dashboard.",
    solution:
      "KerasTuner Bayesian optimization searched the architecture (LSTM units, dropout, learning rate) under the constraint of what could plausibly fit. The trained model was then put through full-integer post-training quantization to INT8 using a representative dataset, cutting the footprint by over 75% and stripping the GPU-only operations. On device, the firmware maintains a ring buffer of the trailing 60 seconds, scales inputs with the StandardScaler constants exported from training, and invokes the TFLite Micro interpreter once per second.",
    outcome:
      "Inference runs on an ESP32 within the 120 KB tensor arena at one prediction per second, driven by four potentiometers and displayed on an OLED in a Wokwi simulation of the full circuit. Training data is synthetic, generated from a physics-based consumption model, replacing it with real CAN-bus logs is the natural next step.",
    image: "/images/projects/ev-range-estimation.png",
    coverImage: "/images/projects/ev-range-estimation.png",
    images: ["/images/projects/ev-range-estimation.png"],
    tags: ["TensorFlow", "KerasTuner", "TFLite Micro", "Quantization", "ESP32", "Edge AI"],
    category: "ml",
    status: "Open source",
    github: "https://github.com/Twilight-Techy/ev-range-estimation-system",
    featured: true,
    completedAt: "2026-07-11",
    duration: "Research and build",
    client: "Self-initiated",
    role: "Sole engineer (modelling, quantization, firmware)",
    keyFeatures: [
      "LSTM over a 60-second rolling window of 10 telemetry features",
      "KerasTuner Bayesian search over units, dropout and learning rate",
      "Full-integer INT8 post-training quantization, >75% size reduction",
      "TFLite Micro inference inside a 120 KB tensor arena",
      "Ring buffer holding trailing sensor history in RAM",
      "Synthetic telemetry generator with injected sensor noise",
      "Wokwi circuit simulation with potentiometer inputs and OLED output",
    ],
    technologies: {
      frontend: ["Wokwi simulation", "SSD1306 OLED"],
      backend: ["TensorFlow", "Keras", "KerasTuner", "NumPy", "pandas"],
      deployment: ["TFLite Micro", "ESP32", "Kaggle GPU"],
      other: ["INT8 quantization", "LSTM", "Edge AI", "C++"],
    },
  },
  {
    id: 4,
    slug: "attention-malaria-tb-screening",
    title: "Attention-Based Malaria & TB Screening",
    subtitle: "Five architectures compared properly, with significance testing",
    description:
      "CBAM attention written from scratch and injected into five CNN architectures, compared with McNemar significance testing rather than raw accuracy deltas.",
    longDescription:
      "A deep learning framework for automated screening of malaria in blood smears and tuberculosis in chest X-rays, built around Convolutional Block Attention Modules. The interesting part is not any single model but the comparison: five architectures evaluated under matched conditions, with statistical testing, interpretability, and deployment cost all measured rather than assumed.",
    challenge:
      "Comparative studies usually fail in one of two ways. Either the models are trained under subtly different conditions, so the comparison measures the setup rather than the architecture; or a winner is declared on a fourth-decimal accuracy difference that is well inside noise. On top of that, a diagnostic model nobody can interrogate is not clinically useful, and a model too heavy to run is not deployable in the settings that need it.",
    solution:
      "Every transfer model is constructed by one shared builder, so the backbone is the only variable across runs. CBAM (channel attention through a shared bottleneck MLP, then spatial attention via a 7×7 convolution) is implemented from scratch and drops into each architecture at the same point. Differences between model pairs are tested with McNemar rather than compared by eye. Grad-CAM heatmaps show where each model actually looked, and inference latency and on-disk size are benchmarked alongside accuracy.",
    outcome:
      "A comparison whose conclusions hold up: architectural claims are backed by significance tests, predictions are visually explainable through Grad-CAM, and the accuracy-versus-cost trade-off is quantified for constrained deployment. The research design belongs to a separate project; the implementation is mine.",
    image: "/images/projects/attention-malaria-tb-screening.png",
    coverImage: "/images/projects/attention-malaria-tb-screening.png",
    images: ["/images/projects/attention-malaria-tb-screening.png"],
    tags: ["TensorFlow", "Keras", "CBAM", "Grad-CAM", "OpenCV", "scikit-learn"],
    category: "ml",
    status: "Open source",
    github: "https://github.com/Twilight-Techy/attention-malaria-tb-detection",
    featured: false,
    completedAt: "2026-07-10",
    duration: "Research implementation",
    client: "Research project",
    role: "Implementation (attention modules, pipeline, evaluation suite)",
    keyFeatures: [
      "CBAM channel and spatial attention implemented from scratch",
      "Five architectures behind one shared builder for a fair comparison",
      "McNemar significance testing between model pairs",
      "Grad-CAM heatmaps for clinical interpretability",
      "CLAHE contrast enhancement applied in LAB colour space",
      "Two-phase training: frozen backbone, then fine-tuning",
      "Inference latency and model-size benchmarks",
    ],
    technologies: {
      frontend: ["Jupyter", "Matplotlib", "Seaborn"],
      backend: ["TensorFlow", "Keras", "scikit-learn", "statsmodels", "OpenCV"],
      deployment: ["Kaggle GPU", "Google Colab"],
      other: ["CBAM", "Grad-CAM", "ResNet50", "VGG16", "MobileNetV2", "DenseNet121"],
    },
  },
  {
    id: 5,
    slug: "ruby-smart-notes",
    title: "Ruby Smart Notes",
    subtitle: "Photograph your handwriting, get a summary and a quiz",
    description:
      "Upload notes as text, a PDF, slides or a photo of your handwriting, and Gemini returns a summary, key concepts, a quiz, and a tutor that has read them.",
    longDescription:
      "A study platform that takes lecture notes in whatever form they exist (typed, scanned, photographed, or buried in a slide deck) and turns them into something you can actually revise from. Gemini produces a summary, extracts key concepts with plain-English explanations, and generates a quiz; a chat interface then answers questions using your own material as context. Everything is scoped to your account.",
    challenge:
      "Real student notes are messy. They are photographs taken at an angle, PDFs of scanned pages, PowerPoint decks, and handwriting. A tool that only accepts clean typed text solves the easy half of the problem and none of the actual one.",
    solution:
      "Gemini Vision handles image and PDF ingestion directly, including handwritten pages, while officeparser extracts text from Word, PowerPoint and Excel files. Everything converges on one text representation before analysis, so a photograph of a handwritten page and a typed document follow the same downstream path. Conversations persist per note, so a study session can be resumed.",
    outcome:
      "Deployed and live, with multi-tenant accounts behind email and Google sign-in. Handwritten notes photographed on a phone come back as a structured summary, a concept list and a quiz.",
    image: PLACEHOLDER,
    coverImage: PLACEHOLDER,
    images: [PLACEHOLDER],
    tags: ["Next.js", "Gemini", "Neon Postgres", "Drizzle", "TypeScript", "OCR"],
    category: "fullstack",
    status: "Live",
    link: "https://ruby-puce.vercel.app/",
    github: "https://github.com/Twilight-Techy/ruby-smart-notes",
    featured: true,
    completedAt: "2026-03-09",
    duration: "Ongoing",
    client: "Self-initiated",
    role: "Sole engineer",
    keyFeatures: [
      "Ingests text, PDF, Word, PowerPoint, images and handwriting",
      "Gemini Vision OCR for photographed and handwritten pages",
      "Automatic summary, key-concept extraction and quiz generation",
      "Chat grounded in your own uploaded material",
      "Persistent conversation history per note",
      "Multi-tenant, with data scoped per account",
      "Email and Google OAuth sign-in",
    ],
    technologies: {
      frontend: ["Next.js 16", "TypeScript", "Framer Motion"],
      backend: ["Drizzle ORM", "Neon Auth", "officeparser"],
      deployment: ["Vercel", "Neon Serverless Postgres"],
      other: ["Gemini 2.5 Flash", "Gemini Vision", "OCR"],
    },
  },
  {
    id: 6,
    slug: "crisp",
    title: "Crisp",
    subtitle: "Crime reporting rendered on a 3D globe",
    description:
      "A crime reporting and incident platform with geospatial visualization, rendering reports on a 3D globe through CesiumJS alongside flat-map views.",
    longDescription:
      "Crisp is a platform for reporting, tracking and analysing incidents. Reports carry location, so the interface treats geography as the primary axis rather than an afterthought: incidents are plotted on a 3D globe via CesiumJS, with MapLibre and MapTiler over OpenStreetMap for flat-map views. Alongside the public reporting flow sits an admin surface for alerts, analytics, communications and case tracking.",
    challenge:
      "Incident data is only useful in context, a list of reports tells you far less than the same reports seen as a distribution across a city. Rendering that well means handling two very different mapping paradigms, a 3D globe and a 2D tiled map, inside one application without the bundle or the interface falling apart.",
    solution:
      "CesiumJS handles the globe view where spatial distribution matters, and MapLibre with MapTiler tiles covers the flat-map cases where precision and speed matter more. The application runs on Next.js with serverless API routes backed by Prisma and PostgreSQL, so reporting, tracking and analytics share one data model.",
    outcome:
      "Deployed and live, with incident reporting, tracking, mapping and an admin dashboard working end to end.",
    image: "/images/projects/crisp-map.png",
    coverImage: "/images/projects/crisp-map.png",
    images: ["/images/projects/crisp-map.png", "/images/projects/crisp-landing.png", "/images/projects/crisp-admin.png"],
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "CesiumJS", "MapLibre"],
    category: "fullstack",
    status: "Live",
    link: "https://crisp-hazel.vercel.app/",
    github: "https://github.com/Twilight-Techy/crisp",
    featured: false,
    completedAt: "2025-09-10",
    duration: "Multi-month build",
    client: "Self-initiated",
    role: "Full-stack engineer",
    keyFeatures: [
      "Incident reporting with location capture",
      "3D globe visualization through CesiumJS",
      "Flat-map views via MapLibre and MapTiler over OpenStreetMap",
      "Admin dashboard for alerts, analytics and communications",
      "Incident tracking and status workflow",
      "Serverless API routes on Next.js",
      "Responsive across desktop and mobile",
    ],
    technologies: {
      frontend: ["Next.js", "TypeScript", "Tailwind CSS", "CesiumJS", "MapLibre"],
      backend: ["Next.js API routes", "Prisma", "PostgreSQL"],
      deployment: ["Vercel", "Vercel Functions"],
      other: ["MapTiler", "OpenStreetMap", "Geospatial visualization"],
    },
  },
  {
    id: 7,
    slug: "skyla",
    title: "Skyla",
    subtitle: "An agentic life-automation platform, in development",
    description:
      "A platform where users compose specialised agents that run long tasks, call external tools and keep persistent context, with sandboxed execution.",
    longDescription:
      "Skyla is where the agent work goes next. Instead of one assistant answering questions, users compose several specialised agents, each owning a slice of their life, one handling reminders, another monitoring something, another running a recurring workflow. Agents run long tasks, call external tools, and keep context across sessions rather than starting cold each time.",
    challenge:
      "An agent with real capability is an agent with real blast radius. If agents can run arbitrary work on a user's behalf, then execution isolation, permission boundaries and cost control stop being polish and become the architecture. Getting that wrong in a system with many agents per user is not recoverable later.",
    solution:
      "Agents execute sandboxed, with no direct reach into the core backend or its filesystem, the design principle from the outset rather than a hardening pass afterwards. The platform stays a monolith while it is small, on the reasoning that premature service decomposition would cost more than it returns before there are users to scale for.",
    outcome:
      "In active development. Repositories are private while the platform is being built, so there is nothing public to link yet.",
    image: "/images/projects/skyla.png",
    coverImage: "/images/projects/skyla.png",
    images: ["/images/projects/skyla.png"],
    tags: ["TypeScript", "AI Agents", "Sandboxing", "Orchestration"],
    category: "agents",
    status: "In development",
    featured: false,
    completedAt: "",
    duration: "Ongoing",
    client: "Self-initiated",
    role: "Founder and engineer",
    keyFeatures: [
      "Multiple specialised agents per user",
      "Long-running task execution",
      "Tool calling against external services",
      "Persistent context and memory across sessions",
      "Sandboxed agent execution isolated from the core backend",
      "Voice and messaging entry points",
    ],
    technologies: {
      frontend: ["Next.js", "TypeScript"],
      backend: ["Agent runtime", "Orchestration layer"],
      deployment: ["Sandboxed execution environments"],
      other: ["LLM agents", "Tool calling", "Persistent context"],
    },
  },
];

export const projectCategories = [
  "All",
  "Agents",
  "LLM Systems",
  "Machine Learning",
  "Full Stack",
];

// Maps the display labels above to the `category` value stored on each project.
export const categorySlugs: Record<string, string> = {
  All: "all",
  Agents: "agents",
  "LLM Systems": "llm",
  "Machine Learning": "ml",
  "Full Stack": "fullstack",
};
