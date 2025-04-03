"use client";

import BlogCard from "@/components/blog/blog-card";
import { Blog } from "@/types/blog";

interface BlogSectionProps {
  blogs: Blog[];
}
export function LatestBlog({ blogs }: BlogSectionProps) {
  const sortedBlogs = [...blogs].sort(
    (a, b) =>
      new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
  );
  const recentBlogs = sortedBlogs.slice(0, 3);
  const mobileBlogs = sortedBlogs.slice(0, 4);

  return (
    <div className="space-y-6 mt-4">
      {/* Mobile blogs */}
      <div className="flex flex-col gap-2 md:hidden">
        <BlogCard blogs={mobileBlogs} />
      </div>

      {/* Desktop blogs */}
      <div className="hidden md:flex flex-col gap-2 ">
        <BlogCard blogs={recentBlogs} />
      </div>
    </div>
  );
}
