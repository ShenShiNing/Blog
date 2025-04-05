"use client";

import { useMemo, useEffect } from "react";

import BlogCard from "@/components/blog/blog-card";
import { Blog } from "@/types/blog";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBlogStore } from "@/store/blog";

interface LatestBlogProps {
  initialBlogs?: Blog[]; // 可选：用于服务器端初始化
  mobileCount?: number;
  desktopCount?: number;
}

export function LatestBlog({
  initialBlogs,
  mobileCount = 4,
  desktopCount = 3,
}: LatestBlogProps) {
  const isMobile = useIsMobile();
  const { blogs, setBlogs } = useBlogStore();

  // 初始化博客数据（仅在首次加载时）
  useEffect(() => {
    if (initialBlogs && blogs.length === 0) {
      setBlogs(initialBlogs);
    }
  }, [initialBlogs, blogs.length, setBlogs]);

  // 获取最新博客
  const blogsToShow = useMemo(() => {
    const sortedBlogs = [...blogs].sort(
      (a, b) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    );
    return sortedBlogs.slice(0, isMobile ? mobileCount : desktopCount);
  }, [blogs, isMobile, mobileCount, desktopCount]);

  // 空状态处理
  if (!blogsToShow.length) {
    return (
      <section className="space-y-6 mt-4 text-center">
        <p className="text-muted-foreground">No recent blogs available.</p>
      </section>
    );
  }

  return (
    <section className="space-y-6 mt-4">
      <BlogCard blogs={blogsToShow} />
    </section>
  );
}

export default LatestBlog;
