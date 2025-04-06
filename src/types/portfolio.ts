import { ReactNode } from "react";

export interface Portfolio {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  tags: string[];
  features?: string[];
  images?: string[];
  liveUrl?: string;
  githubUrl?: string;
  date: string;
  content?: ReactNode; // 编译后的MDX内容
}
