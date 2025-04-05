"use client";

import { useEffect } from "react";
import { Blog } from "@/types/blog";
import BlogCard from "@/components/blog/blog-card";
import Categories from "@/components/blog/categories";
import { useBlogStore } from "@/store/blog";

interface BlogListProps {
  initialBlogs: Blog[];
}

const BlogList = ({ initialBlogs }: BlogListProps) => {
  const { blogs, filteredBlogs, setBlogs } = useBlogStore();

  // 初始化博客数据
  useEffect(() => {
    if (blogs.length === 0 && initialBlogs.length > 0) {
      setBlogs(initialBlogs);
    }
  }, [initialBlogs, blogs.length, setBlogs]);

  return (
    <div className="space-y-6 mb-8">
      <Categories />
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-foreground">No blogs found...</p>
        </div>
      ) : (
        <BlogCard blogs={filteredBlogs} />
      )}
    </div>
  );
};

export default BlogList;
