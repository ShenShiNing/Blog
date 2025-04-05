"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import {
  TagIcon,
  CalendarIcon,
  BookOpenIcon,
  PlusIcon,
  UserIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Blog } from "@/types/blog";
import { useIsMobile } from "@/hooks/use-mobile";

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
  desktop: 4,
};

const BlogCard = ({ blogs }: BlogCardProps) => {
  const isMobile = useIsMobile();

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
    <div className="grid grid-cols-1 gap-6 md:gap-8">
      {blogs.map((blog, index) => {
        const { visibleTags, hasMore, moreCount } = getVisibleTags(blog.tags);

        return (
          <article
            key={blog.id}
            className="group flex flex-col md:flex-row gap-4 p-4 rounded-lg border border-border/50 hover:shadow-md transition-all"
          >
            {/* Cover Image */}
            {blog.coverImage && (
              <div className="relative overflow-hidden rounded-lg w-full md:w-1/4 aspect-video">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
            )}

            {/* Blog Content */}
            <div className="flex flex-col flex-1 space-y-2">
              {/* Blog Header */}
              <header className="flex flex-wrap items-center gap-2 md:gap-4 text-sm text-muted-foreground">
                <span className="font-bold text-primary">{`0${index + 1}.`}</span>
                <span>{blog.category}</span>
                <div className="flex items-center gap-1">
                  <UserIcon className="h-4 w-4" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{blog.createdDate}</span>
                </div>
              </header>

              {/* Blog Title */}
              <Link href={`/blog/${blog.slug}`} className="block">
                <h3 className="text-lg font-bold group-hover:underline">
                  {blog.title}
                </h3>
              </Link>

              {/* Blog Description */}
              {blog.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {blog.description}
                </p>
              )}

              {/* Tags and Button */}
              <footer className="mt-auto pt-2 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                {/* Blog Tags */}
                <div className="flex flex-wrap gap-2">
                  {visibleTags.map((tag: string) => (
                    <Badge
                      className="text-xs flex items-center gap-1"
                      key={tag}
                    >
                      <TagIcon className="h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}

                  {hasMore && (
                    <Badge
                      className="text-xs flex items-center gap-1"
                      title={blog.tags?.slice(visibleTags.length).join(", ")}
                    >
                      <PlusIcon className="h-3 w-3" />
                      {moreCount}
                    </Badge>
                  )}
                </div>

                <Link
                  href={`/blog/${blog.slug}`}
                  className="block md:inline-block w-full md:w-auto"
                >
                  <Button
                    size="lg"
                    className="w-full md:w-auto bg-foreground text-background flex items-center gap-2"
                  >
                    <BookOpenIcon className="h-4 w-4" />
                    Read More
                  </Button>
                </Link>
              </footer>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default BlogCard;
