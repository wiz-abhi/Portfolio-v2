import bookwise from "../assets/projects/bookwise.png";
import travellopedia from "../assets/projects/travellopedia.png";


// (Achievements will be text-only and editable below)
import profileImg from "../assets/about.jpg";


// Type definitions
export interface Experience {
  year: string;
  role: string;
  company: string;
  description: string;
  technologies: string[];
}

export interface Project {
  title: string;
  image: string;
  description: string;
  technologies: string[];
  link: string;
  repo?: string;
}

// Technology metadata — add or remove entries here to control icons across the site
export interface Technology {
  name: string; // display name (e.g. "TypeScript")
  slug: string; // simpleicons slug (used by CDN: https://cdn.simpleicons.org/<slug>)
  aliases?: string[]; // variants used in project entries (lowercased)
  showInHero?: boolean; // whether to include in the rotating hero icon cloud
}

export const TECHNOLOGIES: Technology[] = [
  { name: "TypeScript", slug: "typescript", aliases: ["typescript"], showInHero: true },
  { name: "JavaScript", slug: "javascript", aliases: ["javascript", "js"], showInHero: true },
  { name: "React", slug: "react", aliases: ["react", "reactjs", "react.js", "reactjs"], showInHero: true },
  { name: "Next.js", slug: "nextdotjs", aliases: ["next.js", "nextjs"], showInHero: true },
  { name: "Express.js", slug: "express", aliases: ["express", "express.js"], showInHero: true },
  { name: "Node.js", slug: "nodedotjs", aliases: ["nodejs", "node.js", "node"], showInHero: true },
  { name: "PostgreSQL", slug: "postgresql", aliases: ["postgresql", "postgres"], showInHero: true },
  { name: "MongoDB", slug: "mongodb", aliases: ["mongodb", "mongo db", "mongo"], showInHero: true },
  { name: "Tailwind CSS", slug: "tailwindcss", aliases: ["tailwind css", "tailwind"], showInHero: true },
  { name: "Python", slug: "python", aliases: ["python"], showInHero: true },
  { name: "Django", slug: "django", aliases: ["django"], showInHero: true },
  { name: "Prisma", slug: "prisma", aliases: ["prisma"], showInHero: true },
  { name: "Redis", slug: "redis", aliases: ["redis"], showInHero: true },
  { name: "OpenAI (GenAI)", slug: "openai", aliases: ["openai", "genai", "gpt", "ai"], showInHero: true },
  { name: "Gemini API", slug: "", aliases: ["gemini api", "gemini", "gemini ai", "gemini 2.5 flash", "gemini 2.5"], showInHero: false },
  { name: "RAG", slug: "", aliases: ["rag", "retrieval augmented generation"], showInHero: false },
  // { name: "Voice-to-Voice", slug: "", aliases: ["voice-to-voice", "voice to voice"], showInHero: false },
  { name: "Vector DB", slug: "", aliases: ["vector db", "vectordb", "vector-database"], showInHero: false },
  { name: "n8n", slug: "n8n", aliases: ["n8n"], showInHero: true },
  { name: "Docker", slug: "docker", aliases: ["docker"], showInHero: true },
  { name: "Supabase", slug: "supabase", aliases: ["supabase"], showInHero: true },
];

// Constants
export const NAME = "Abhishek Gupta";
export const ROLE = "Full Stack Developer";
export const RESUME_FILENAME = "resume.pdf"; // 

export const HERO_CONTENT: string = `I love building full-stack products with AI integration — building intelligent agents and automation tools that make real workflows faster and smarter.`;

// Path to profile image used in About section
export const PROFILE_IMAGE = profileImg;

export const ABOUT_TEXT: string = `I'm a Full Stack Developer focused on building reliable web products with AI-powered experiences — from production-ready APIs to client apps and lightweight automation agents. I enjoy turning ideas into robust end-to-end systems and iterating fast.`;

export const EXPERIENCES: Experience[] = [
  {
    year: "2024",
    role: "Finalist",
    company: "HackVSIT @ VIPS Delhi",
    description: `Finalist at HackVSIT (VIPS Delhi). Built a working prototype and demo that addressed the hackathon challenge; delivered an end-to-end solution.`,
    technologies: ["ReactJs"],
  },

  {
    year: "2024",
    role: "Top 10 Finalist",
    company: "Hackstacy @ SRM Ghaziabad",
    description: `Top 10 finalist at Hackstacy (SRM Ghaziabad); contributed to product development, prototyping, and presentation.`,
    technologies: [],
  }
];

export const PROJECTS: Project[] = [
  {
    title: "BookWise AI",
    image: bookwise,
    description: `BookWise AI — an AI-powered book companion and eLibrary platform. Users can ask questions while reading and get answers grounded in the actual book text. Built a RAG-backed conversational system using Gemini API to provide context-aware responses, and shipped a feature-rich chat interface with both text and voice-to-voice conversational support, memory, emotion‑aware tone customization, and dynamic quote referencing from uploaded books.`,
    technologies: ["Gemini API", "RAG", "Voice-to-Voice", "Vector DB", "Next.js", "TypeScript"],
    link: "https://linkly.link/2RHv8",
    repo: "https://github.com/wiz-abhi/BookWise-AI",
  },
  {
    title: "Travellopedia — AI Travel Platform",
    image: travellopedia,
    description: `Built an AI-powered travel platform using Gemini 2.5 Flash to deliver personalized travel recommendations, smart itineraries, and destination insights. Designed a MongoDB-backed system to store user data, itineraries, memories, and travel content. Implemented response caching for similar queries to reduce API usage and improve performance. Added features like a travel memories gallery, to-do list, and a rate-limited mode allowing 5 free AI queries without login.`,
    technologies: ["Gemini 2.5 Flash", "MongoDB", "Caching", "React", "Next.js", "TypeScript"],
    link: "https://travellopedia-blue.vercel.app/",
    repo: "https://github.com/git-sakshii/Travellopedia",
  },
];


export const ACHIEVEMENTS = [
  {
    title: "Finalist — HackVSIT @ VIPS Delhi",
    description: "Finalist at HackVSIT (VIPS Delhi) — built a prototype that addressed topic X and delivered a working demo.",
    date: "2024",
  },
  {
    title: "300+ problems solved on LeetCode",
    description: "Solved over 300 algorithm and DS problems on LeetCode to strengthen problem-solving and system design skills.",
    date: "2024",
  },
];

// Social links
export const SOCIAL_LINKS = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/abhishek-gupta-4b03b9276" },
  { name: "GitHub", url: "https://github.com/wiz-abhi" },
  { name: "Twitter", url: "https://twitter.com/wiz_abhi" },
  { name: "Email", url: "mailto:abhishekg8318@gmail.com" },
];
