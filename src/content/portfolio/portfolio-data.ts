import type { Portfolio } from "@/types/portfolio";

export const portfolioItems: Portfolio[] = [
  {
    id: "1",
    title: "Youtube Clone (Full Stack)",
    shortDescription:
      "A clone of Youtube, a video sharing platform that allows users to upload, watch, and share videos.",
    description:
      "A clone of Youtube, a video sharing platform that allows users to upload, watch, and share videos. Built with React, Next.js, and shadcn/ui components for a modern and responsive user interface.",
    coverImage: "/images/portfolio/Home.png",
    tags: [
      "React",
      "Next.js",
      "TypeScript",
      "shadcn/ui",
      "Tailwind CSS",
      "tRPC",
      "Drizzle ORM",
      "Clerk Authentication",
      "Uploadthing",
      "Upstash",
      "WorkFlows",
    ],
    features: [
      "Upload videos",
      "Watch videos",
      "Share videos",
      "Like videos",
      "Comment on videos",
      "Search for videos",
      "Responsive design for all devices",
      "Dark and light mode support",
    ],
    images: [
      "/images/portfolio/WatchVideo.png",
      "/images/portfolio/EditVideo.png",
    ],
    liveUrl: "https://new-tube-virid.vercel.app",
    githubUrl: "https://github.com/ShenShiNing/new-tube",
    date: "2025-02-15",
  },
];
