"use client";

import { LatestBlog } from "@/components/blog/latest-blog";
import { Blog } from "@/types/blog";

interface BlogSectionProps {
  initialBlogs: Blog[];
}

export default function BlogSection({ initialBlogs }: BlogSectionProps) {
  return (
    <section id="blog" className="main flex flex-col px-4">
      <h1 className="text-2xl font-bold px-4 md:px-0 text-center md:text-left">
        Blog & Articles
      </h1>
      <LatestBlog initialBlogs={initialBlogs} />
    </section>
  );
}
