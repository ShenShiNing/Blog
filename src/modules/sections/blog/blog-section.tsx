"use client";

import { LatestBlog } from "@/components/blog/latest-blog";
import { Blog } from "@/types/blog";

const blogsList: Blog[] = [
  {
    id: "1",
    author: "John Doe",
    createdDate: "2025-01-01",
    title: "Web Design Trends",
    description: "Latest design techniques...",
    category: "Web Design",
    tags: ["web-design"],
    coverImage: "/images/Test.jpg",
  },
  {
    id: "2",
    author: "John Doe",
    createdDate: "2025-01-02",
    title: "React Server Components",
    description: "How to use RSC in Next.js 13...",
    category: "Development",
    tags: ["development"],
    coverImage: "/images/Test.jpg",
  },
  {
    id: "3",
    author: "John Doe",
    createdDate: "2025-01-03",
    title: "Database Optimization",
    description: "Speed up queries...",
    category: "Databases",
    tags: ["databases"],
    coverImage: "/images/Test.jpg",
  },
  {
    id: "4",
    author: "John Doe",
    createdDate: "2025-01-04",
    title: "SEO in 2024",
    description: "Boost your website ranking...",
    category: "SEO",
    tags: ["seo"],
    coverImage: "/images/Test.jpg",
  },
  {
    id: "5",
    author: "John Doe",
    createdDate: "2025-01-05",
    title: "Marketing Strategies",
    description: "Growth hacking tips...",
    category: "Marketing",
    tags: ["marketing"],
    coverImage: "/images/Test.jpg",
  },
  {
    id: "6",
    author: "John Doe",
    createdDate: "2025-01-06",
    title: "Web Design Trends",
    description: "Latest design techniques...",
    category: "Web Design",
    tags: ["web-design"],
    coverImage: "/images/Test.jpg",
  },
];

const BlogSection = () => {
  return (
    <section id="blog" className="main flex flex-col px-4">
      <h1 className="text-2xl font-bold px-4 md:px-0 text-center md:text-left">
        Blog & Articles
      </h1>
      <LatestBlog blogs={blogsList} />
    </section>
  );
};

export default BlogSection;
