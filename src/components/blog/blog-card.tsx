"use client";

import Image from "next/image";
import { useMemo } from "react";
import { motion } from "motion/react";

import {
  TagIcon,
  CalendarIcon,
  BookOpenIcon,
  PlusIcon,
  UserIcon,
} from "lucide-react";

import { Blog } from "@/types/blog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBlogStore } from "@/store/blog";

interface BlogCardProps {
  blogs: Blog[];
}

interface TagsResult {
  visibleTags: string[];
  hasMore: boolean;
  moreCount: number;
}

const MAX_VISIBLE_TAGS = {
  mobile: 3,
  desktop: 5,
};

const BlogCard = ({ blogs }: BlogCardProps) => {
  const isMobile = useIsMobile();
  const { selectBlog } = useBlogStore();

  // 计算可见标签
  const getVisibleTags = useMemo(
    () =>
      (tags: string[] | undefined): TagsResult => {
        if (!tags?.length) {
          return { visibleTags: [], hasMore: false, moreCount: 0 };
        }

        const maxVisibleTags = isMobile
          ? MAX_VISIBLE_TAGS.mobile
          : MAX_VISIBLE_TAGS.desktop;

        const visibleTags = tags.slice(0, maxVisibleTags);
        const hasMore = tags.length > maxVisibleTags;
        const moreCount = hasMore ? tags.length - maxVisibleTags : 0;

        return { visibleTags, hasMore, moreCount };
      },
    [isMobile]
  );

  return (
    <div className="grid grid-cols-1 gap-6">
      {blogs.map((blog, index) => {
        const { visibleTags, hasMore, moreCount } = getVisibleTags(blog.tags);

        return (
          <motion.article
            key={blog.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.5,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            className="group flex flex-col md:flex-row gap-4 p-4 rounded-lg border border-border/50 hover:border-primary/30 hover:shadow-md transition-all bg-card"
          >
            {/* Cover Image */}
            {blog.coverImage && (
              <div className="relative overflow-hidden rounded-lg w-full md:w-[30%] aspect-video">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all" />
              </div>
            )}

            {/* Blog Content */}
            <div className="flex flex-col flex-1 space-y-3">
              {/* Blog Header - 分类和序号 */}
              <div className="flex justify-between items-center text-sm">
                <Badge className="px-2 py-1 font-medium">{blog.category}</Badge>
                <span className="text-muted-foreground font-mono">
                  #{index + 1}
                </span>
              </div>

              {/* Blog Title */}
              <div className="cursor-pointer" onClick={() => selectBlog(blog)}>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-200">
                  {blog.title}
                </h3>
              </div>

              {/* Blog Description */}
              {blog.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {blog.description}
                </p>
              )}

              {/* Author & Date */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <UserIcon className="h-3 w-3" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-3 w-3" />
                  <span>{blog.createdDate}</span>
                </div>
              </div>

              {/* Tags and Button */}
              <footer className="mt-auto pt-3 flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-3 border-t border-dashed">
                {/* Blog Tags */}
                <div className="flex flex-wrap gap-2">
                  {visibleTags.map((tag: string) => (
                    <div key={tag}>
                      <Badge className="text-xs flex items-center gap-1">
                        <TagIcon className="h-3 w-3" />
                        {tag}
                      </Badge>
                    </div>
                  ))}

                  {hasMore && (
                    <div>
                      <Badge
                        className="text-xs flex items-center gap-1"
                        title={blog.tags?.slice(visibleTags.length).join(", ")}
                      >
                        <PlusIcon className="h-3 w-3" />
                        {moreCount}
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="block md:inline-block w-full md:w-auto">
                  <Button
                    size="sm"
                    variant="default"
                    className="w-full md:w-auto flex items-center gap-2"
                    onClick={() => selectBlog(blog)}
                  >
                    <BookOpenIcon className="h-4 w-4" />
                    Read More
                  </Button>
                </div>
              </footer>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
};

export default BlogCard;
