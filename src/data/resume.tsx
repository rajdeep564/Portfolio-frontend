import { Icons } from "@/components/icons";
import { FileTextIcon, FolderIcon, HomeIcon } from "lucide-react";

export const DATA = {
  name: "Rajdeep Sinh Chavda",
  initials: "RC",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  location: "Ahmedabad, Gujarat",
  locationLink: "https://www.google.com/maps/place/Ahmedabad,+Gujarat",
  role: "Full Stack Developer",
  resumeUrl: "/Rajdeep-Sinh-Chavda-Resume.pdf",
  description:
    "Full Stack Developer building scalable Node.js, React and NestJS systems, GenAI platforms and AI agent orchestration.",
  seo: {
    title: "Rajdeep Sinh Chavda | Full Stack Developer in Ahmedabad",
    description:
      "Rajdeep Sinh Chavda is a Full Stack Developer in Ahmedabad building Node.js, NestJS and React apps, GenAI platforms and SEO-ready websites for clients.",
    alternateNames: ["Rajdeep Chavda", "Rajdeepsinh Chavda"],
    keywords: [
      "Rajdeep Sinh Chavda",
      "Rajdeep Chavda",
      "Rajdeepsinh Chavda",
      "Full Stack Developer",
      "Full Stack Developer in Ahmedabad",
      "MERN Stack Developer",
      "Node.js Developer",
      "NestJS Developer",
      "React Developer",
      "Next.js Developer",
      "GenAI Developer",
      "AI Agent Developer",
      "Website Developer in Ahmedabad",
    ],
    expertise: [
      "Full Stack Development",
      "Node.js",
      "NestJS",
      "React",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "MongoDB",
      "Microservices",
      "Generative AI",
      "AI Agent Orchestration",
      "Search Engine Optimization",
    ],
  },
  summary:
    "I'm a Full Stack Developer with 1+ year of hands-on experience building scalable MERN stack and Node.js backend systems, RESTful APIs, and production-grade GenAI platforms. I architect microservices, integrate third-party AI providers, and deliver end-to-end features from database design to cloud deployment, with a strong record of optimizing performance and shipping reliable software across GenAI, enterprise ERP, and regulated QMS domains. I also design and build websites for clients, handle their SEO and digital marketing, and am a partner at Spaciva AI.",
  avatarUrl: "/me.jpg",
  skills: [
    {
      category: "Languages",
      joke: "Four languages, and I still can't explain my job to my mom.",
      items: ["TypeScript", "JavaScript", "C++", "Python"],
    },
    {
      category: "Backend",
      joke: "Where all the drama happens and nobody claps.",
      items: ["Node.js", "Express.js", "NestJS", "REST APIs", "Microservices"],
    },
    {
      category: "Frontend",
      joke: "I can center a div on the first try. Usually.",
      items: ["React.js", "Next.js", "Redux Toolkit", "Zustand", "TailwindCSS"],
    },
    {
      category: "Databases & ORMs",
      joke: "I know where all the data is buried.",
      items: ["PostgreSQL", "MongoDB", "MySQL", "Prisma ORM", "Mongoose", "Redis"],
    },
    {
      category: "Cloud & DevOps",
      joke: "It worked on my machine, so I shipped my machine.",
      items: [
        "AWS Lambda & API Gateway",
        "Docker",
        "Kubernetes",
        "Firebase",
        "CI/CD",
        "PM2",
      ],
    },
    {
      category: "Tools & Practices",
      joke: "My finest commit message to date: \"yes\".",
      items: [
        "Git",
        "GitHub",
        "JWT",
        "OAuth 2.0",
        "WebSockets",
        "Postman",
        "Agile/Scrum",
      ],
    },
    {
      category: "Payments",
      joke: "Two gateways taught to accept money. Neither has shared any with me.",
      items: ["Razorpay", "Stripe"],
    },
    {
      category: "AI / GenAI",
      joke: "I fine-tune models. The GPUs handle the crying.",
      items: [
        "LLM Fine-tuning",
        "Diffusion Models",
        "Fal AI",
        "Runway ML",
        "MinMax",
        "OpenClaw",
        "Gemini AI Studio",
      ],
    },
    {
      category: "My Coworkers",
      joke: "They write code with me, never take a chai break and never ask for a raise.",
      items: ["Claude", "Cursor"],
    },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/#projects", icon: FolderIcon, label: "Projects" },
    { href: "/Rajdeep-Sinh-Chavda-Resume.pdf", icon: FileTextIcon, label: "Resume" },
  ],
  contact: {
    email: "chavdarajdeep77@gmail.com",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/rajdeep564",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/rajdeepsinhchavda",
        icon: Icons.linkedin,
        navbar: true,
      },
      Email: {
        name: "Send Email",
        url: "mailto:chavdarajdeep77@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "WildMind AI Pvt. Ltd.",
      location: "Ahmedabad",
      title: "Full Stack Developer",
      logoUrl: "",
      start: "July 2025",
      end: "Present",
      highlights: [
        "Engineered Node.js/NestJS REST APIs powering 6+ GenAI pipelines for 500+ concurrent users.",
        "Architected a self-hosted OpenClaw orchestration gateway with a 4-layer stack for natural-language creative workflows.",
        "Integrated Razorpay and Stripe payment gateways and shipped a credit-based billing microservice across 3 tiers, cutting billing disputes by 90%.",
        "Delivered a multi-tenant ATS, a drone-show ERP and a pharmaceutical QMS across the full stack.",
      ],
    },
    {
      company: "Satva Solutions Pvt. Ltd.",
      location: "Ahmedabad",
      title: "MERN Stack Developer Intern",
      logoUrl: "",
      start: "January 2025",
      end: "June 2025",
      highlights: [
        "Built a bi-directional accounting sync platform handling 1,000+ real-time events per day on AWS Lambda.",
        "Led a full-stack inventory platform managing 5,000+ SKUs with 10,000+ record bulk imports per batch.",
      ],
    },
  ],
  education: [
    {
      school: "U.V. Patel College of Engineering, Ganpat University",
      href: "https://www.ganpatuniversity.ac.in",
      degree: "Bachelor of Technology, Computer Engineering · CGPA 7.78",
      logoUrl: "/ganpat.png",
      start: "2021",
      end: "2025",
    },
  ],
  certifications: [
    "MERN Stack",
    "Docker & Kubernetes",
    "AWS ML Foundations",
    "Frontend Dev Libraries",
    "Applied Data Science (IBM)",
    "Data Analytics (IBM)",
  ],
  projects: [
    {
      title: "GenAI SaaS Platform & AgentCore Gateway",
      context: "WildMind AI",
      description:
        "Unified adapter across 4 AI providers (Fal AI, MinMax, Runway ML, BFL Flux) for image, video, music, ad, song and product pipelines, cutting new-provider onboarding time by 60%. A self-hosted OpenClaw gateway with deny-by-default tool allowlists and dual-layer auth lets natural-language prompts trigger multi-step workflows. Integrated Razorpay and Stripe payment gateways for credit-based billing. Fine-tuned LLMs and diffusion models on H200 GPUs, cutting inference latency by 40% while scaling to 2,000+ daily requests.",
      technologies: ["Node.js", "NestJS", "OpenClaw", "PostgreSQL", "Redis", "Razorpay", "Stripe", "JWT", "S3"],
      links: [{ label: "Case study", href: "https://solutions.wildmindai.com/projects/wildmind-ai" }],
    },
    {
      title: "Vachanamrut AI",
      context: "Cultural heritage AI, live at a museum in Ahmedabad",
      description:
        "A conversational AI kiosk that lets museum visitors talk with a RAG assistant grounded in the Vachanamrut, a sacred text. It answers in Gujarati, Hindi and English with citations, stays within the source text through built-in guardrails, and runs unattended 24/7 with automatic recovery and remote monitoring.",
      technologies: ["Claude", "RAG", "Vector DB", "React", "Kiosk UI"],
      links: [{ label: "Case study", href: "https://solutions.wildmindai.com/projects/vachanamrut-ai" }],
    },
    {
      title: "Kofeko",
      context: "Multi-tenant B2B recruitment SaaS",
      description:
        "Core platform for a multi-tenant ATS spanning recruiter, candidate and super-admin portals. Includes a Redis-backed cache with in-memory fallback, a typed SSE event bus for real-time pipeline updates, an AI resume-evaluation pipeline, and an AWS ECS/CloudFormation deployment with zero-exposure RDS access via SSM tunneling.",
      technologies: ["Next.js", "Express", "TypeScript", "Prisma", "PostgreSQL", "Redis", "AWS ECS/S3", "Replicate API"],
      links: [{ label: "Live site", href: "https://kofeko.com/" }],
    },
    {
      title: "Flybit Dashboard",
      context: "Drone show operations & ERP",
      description:
        "End-to-end ERP for a commercial drone-show operator covering booking to billing, airspace compliance classification and automated regulatory permission documents. Features a GST-compliant invoicing engine, an 11-module RBAC layer with audit logging, and a fuzzy-matching importer for unstructured spreadsheet leads.",
      technologies: ["Next.js", "React", "TypeScript", "Firebase Firestore", "Cloudflare R2", "Google Drive API"],
      links: [],
    },
    {
      title: "AC-QMS",
      context: "Pharmaceutical quality management",
      description:
        "Frontend and API layer of a QMS covering document control, batch release and change control, with a FastAPI engine generating controlled Word documents. Designed a database-driven role and permission framework with field-level audit logging of every data change and denied access attempt for regulatory traceability.",
      technologies: ["Next.js", "TypeScript", "Zustand", "Express", "Prisma", "PostgreSQL", "FastAPI"],
      links: [{ label: "Case study", href: "https://solutions.wildmindai.com/projects/aditya-chemicals" }],
    },
    {
      title: "Unified Accounting Integration Platform",
      context: "Satva Solutions",
      description:
        "Bi-directional sync of vendors, invoices and payments across QuickBooks, NetSuite, FreshBooks and Xero. Cut manual data entry by 70% and scaled to 1,000+ real-time sync events per day on serverless AWS Lambda.",
      technologies: ["Node.js", "Express.js", "AWS Lambda", "OAuth 2.0", "PostgreSQL"],
      links: [
        { label: "Satva platform", href: "https://satvasolutions.com/unified-integration-platform" },
      ],
    },
    {
      title: "3nStar",
      context: "Spare parts inventory control",
      description:
        "Full-stack inventory platform managing 5,000+ SKUs, with bulk Excel/CSV import-export of 10,000+ records per batch via real-time QuickBooks sync, cutting entry time by 80% and reconciliation time by 65%.",
      technologies: ["React.js", "Node.js", "Express.js", "PostgreSQL", "QuickBooks API", "JWT"],
      links: [
        { label: "Satva case study", href: "https://satvasolutions.com/case-study/automation-system-development-for-3nstar" },
      ],
    },
  ],
  clientWork: {
    featured: {
      name: "FLYBIT Dynamics",
      href: "https://www.flybitdynamics.com/",
      domain: "flybitdynamics.com",
      services: ["Website", "SEO", "Digital Marketing"],
      description:
        "Designed and built the website for a drone light show company, then led its SEO and digital marketing, taking it into the top search results for common drone show searches in India.",
    },
    sites: [
      {
        name: "AD Engineers",
        href: "https://www.adengineers.co.in/",
        domain: "adengineers.co.in",
        description: "Industrial centrifuge manufacturer and exporter, established in 1990.",
      },
      {
        name: "Siddhraj Developers",
        href: "https://siddhrajdevelopers.com/",
        domain: "siddhrajdevelopers.com",
        description: "Residential real estate developer.",
      },
      {
        name: "Unoloft",
        href: "https://www.unoloft.com/",
        domain: "unoloft.com",
        description: "Premium PG accommodation in Ahmedabad.",
      },
      {
        name: "Kedar Foundation",
        href: "https://www.kedarfoundation.com/",
        domain: "kedarfoundation.com",
        description: "Foundation for rural communities, education and sustainable farming.",
      },
    ],
    partner: {
      name: "Spaciva AI",
      href: "https://www.spaciva.tech/",
      description: "Custom AI agents and software for agencies, professional services and e-commerce brands.",
    },
  },
} as const;
