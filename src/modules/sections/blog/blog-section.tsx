"use client";

import { ChevronLeftIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import BlogDetail from "@/components/blog/blog-detail";
import BlogList from "@/components/blog/blog-list";
import Categories from "@/components/blog/categories";

import { Blog } from "@/types/blog";
import { Button } from "@/components/ui/button";
import { useBlogStore } from "@/store/blog";

interface BlogSectionProps {
  initialBlogs: Blog[];
}

export default function BlogSection({ initialBlogs }: BlogSectionProps) {
  const { isDetailView, selectedBlog, clearSelectedBlog } = useBlogStore();

  return (
    <section id="blog" className="main px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Blog & Articles
        </h2>
        <p className="text-muted-foreground">
          Here are some of my blog posts and articles.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {isDetailView ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-12"
          >
            {/* 返回按钮 */}
            <Button
              variant="ghost"
              className="mb-6 flex items-center gap-1"
              onClick={clearSelectedBlog}
            >
              <ChevronLeftIcon className="h-4 w-4" />
              <span>Back to Blog</span>
            </Button>

            {/* 博客详情 */}
            {selectedBlog && <BlogDetail blog={selectedBlog} />}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-12"
          >
            {/* 类别和搜索 */}
            <Categories />

            {/* 博客列表 */}
            <BlogList initialBlogs={initialBlogs} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
