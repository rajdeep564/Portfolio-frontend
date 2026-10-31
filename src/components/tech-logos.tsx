"use client";

import type { ComponentType, CSSProperties } from "react";
import { FaAws } from "react-icons/fa";
import {
  SiClaude,
  SiCloudflare,
  SiCplusplus,
  SiCursor,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGoogledrive,
  SiGooglegemini,
  SiJavascript,
  SiJsonwebtokens,
  SiKubernetes,
  SiMinimax,
  SiMongodb,
  SiMongoose,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPm2,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiPython,
  SiQuickbooks,
  SiRazorpay,
  SiReact,
  SiRedis,
  SiRedux,
  SiReplicate,
  SiSocketdotio,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import {
  BookOpen,
  BrainCircuit,
  Boxes,
  Braces,
  Bot,
  Clapperboard,
  Database,
  KanbanSquare,
  KeyRound,
  MonitorSmartphone,
  PawPrint,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type Logo = { icon: ComponentType<{ className?: string }>; color?: string };

const AWS: Logo = { icon: FaAws, color: "#ff9900" };
const EXPRESS: Logo = { icon: SiExpress };
const FIREBASE: Logo = { icon: SiFirebase, color: "#ffca28" };
const NODE: Logo = { icon: SiNodedotjs, color: "#5fa04e" };
const POSTGRES: Logo = { icon: SiPostgresql, color: "#4169e1" };
const PRISMA: Logo = { icon: SiPrisma, color: "#5a67d8" };
const QUICKBOOKS: Logo = { icon: SiQuickbooks, color: "#2ca01c" };
const REACT: Logo = { icon: SiReact, color: "#61dafb" };
const REPLICATE: Logo = { icon: SiReplicate };

const LOGOS: Record<string, Logo> = {
  TypeScript: { icon: SiTypescript, color: "#3178c6" },
  JavaScript: { icon: SiJavascript, color: "#f7b500" },
  "C++": { icon: SiCplusplus, color: "#00599c" },
  Python: { icon: SiPython, color: "#3776ab" },
  "Node.js": NODE,
  Express: EXPRESS,
  "Express.js": EXPRESS,
  NestJS: { icon: SiNestjs, color: "#e0234e" },
  "REST APIs": { icon: Braces },
  Microservices: { icon: Boxes },
  React: REACT,
  "React.js": REACT,
  "Next.js": { icon: SiNextdotjs },
  "Redux Toolkit": { icon: SiRedux, color: "#764abc" },
  Zustand: { icon: PawPrint },
  TailwindCSS: { icon: SiTailwindcss, color: "#06b6d4" },
  PostgreSQL: POSTGRES,
  MongoDB: { icon: SiMongodb, color: "#47a248" },
  MySQL: { icon: SiMysql, color: "#4479a1" },
  Prisma: PRISMA,
  "Prisma ORM": PRISMA,
  Mongoose: { icon: SiMongoose, color: "#880000" },
  Redis: { icon: SiRedis, color: "#dc382d" },
  "AWS Lambda": AWS,
  "AWS Lambda & API Gateway": AWS,
  "AWS ECS/S3": AWS,
  S3: AWS,
  Docker: { icon: SiDocker, color: "#2496ed" },
  Kubernetes: { icon: SiKubernetes, color: "#326ce5" },
  Firebase: FIREBASE,
  "Firebase Firestore": FIREBASE,
  "CI/CD": { icon: Workflow },
  PM2: { icon: SiPm2, color: "#2b037a" },
  Git: { icon: SiGit, color: "#f05032" },
  GitHub: { icon: SiGithub },
  JWT: { icon: SiJsonwebtokens, color: "#d63aff" },
  "OAuth 2.0": { icon: KeyRound },
  WebSockets: { icon: SiSocketdotio },
  Postman: { icon: SiPostman, color: "#ff6c37" },
  "Agile/Scrum": { icon: KanbanSquare },
  Razorpay: { icon: SiRazorpay, color: "#3395ff" },
  Stripe: { icon: SiStripe, color: "#635bff" },
  "LLM Fine-tuning": { icon: BrainCircuit },
  "Diffusion Models": { icon: Sparkles },
  RAG: { icon: BookOpen },
  "Vector DB": { icon: Database },
  "Kiosk UI": { icon: MonitorSmartphone },
  "Fal AI": { icon: Zap },
  "Runway ML": { icon: Clapperboard },
  MinMax: { icon: SiMinimax, color: "#e73562" },
  OpenClaw: { icon: Bot },
  "Gemini AI Studio": { icon: SiGooglegemini, color: "#8e75b2" },
  Claude: { icon: SiClaude, color: "#d97757" },
  Cursor: { icon: SiCursor },
  FastAPI: { icon: SiFastapi, color: "#009688" },
  "Cloudflare R2": { icon: SiCloudflare, color: "#f38020" },
  "Google Drive API": { icon: SiGoogledrive, color: "#4285f4" },
  "Replicate API": REPLICATE,
  "QuickBooks API": QUICKBOOKS,
};

interface Props {
  names: readonly string[];
  size?: "sm" | "md";
}

export function TechLogos({ names, size = "md" }: Props) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {names.map((name) => {
        const { icon: Icon = Sparkles, color } = LOGOS[name] ?? {};
        return (
          <li key={name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  tabIndex={0}
                  role="img"
                  aria-label={name}
                  style={{ "--brand": color } as CSSProperties}
                  className={cn(
                    "flex items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    color ? "hover:text-[var(--brand)]" : "hover:text-foreground",
                    size === "md" ? "size-11" : "size-8"
                  )}
                >
                  <Icon className={size === "md" ? "size-6" : "size-4"} />
                </span>
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={6}>
                {name}
              </TooltipContent>
            </Tooltip>
          </li>
        );
      })}
    </ul>
  );
}
