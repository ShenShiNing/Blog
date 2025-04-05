import { ReactNode } from "react";

export interface Blog {
  id: string;
  slug: string; // 用于路由
  author: string;
  category: string;
  title: string;
  description?: string;
  tags?: string[];
  coverImage?: string;
  createdDate: string;
  updatedDate?: string;
  content: ReactNode; // 编译后的 MDX 内容
  readTime?: string;
  isPublished?: boolean;
}

export interface Category {
  name: string;
  value: string;
}
