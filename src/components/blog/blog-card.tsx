"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import BlogDetail from "@/components/blog/blog-detail";
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
  const [dialogOpenForBlogId, setDialogOpenForBlogId] = useState<string | null>(
    null
  );

  const selectedBlogForDialog = useMemo(() => {
    return blogs.find((blog) => blog.id === dialogOpenForBlogId) ?? null;
  }, [blogs, dialogOpenForBlogId]);

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

  const handleOpenDialog = (blogId: string) => {
    setDialogOpenForBlogId(blogId);
  };

  const handleClick = (blog: Blog) => {
    if (isMobile) {
      selectBlog(blog);
    } else {
      handleOpenDialog(blog.id);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {blogs.map((blog, index) => {
        const visibleTagsResult = getVisibleTags(blog.tags);
        const { visibleTags, hasMore, moreCount } = visibleTagsResult;

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
            className="blog-card group"
          >
            {blog.coverImage && (
              <div className="blog-card-image-container">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  className="blog-card-image"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
                <div className="blog-card-image-overlay" />
              </div>
            )}

            <div className="blog-card-content">
              <div className="blog-card-header">
                <Badge className="blog-card-category">{blog.category}</Badge>
                <span className="text-muted-foreground font-mono">
                  #{index + 1}
                </span>
              </div>

              <div className="cursor-pointer" onClick={() => handleClick(blog)}>
                <h3 className="blog-card-title">{blog.title}</h3>
              </div>

              {blog.description && (
                <p className="blog-card-description">{blog.description}</p>
              )}

              <div className="blog-card-meta">
                <div className="blog-card-meta-item">
                  <UserIcon className="h-3 w-3" />
                  <span>{blog.author}</span>
                </div>
                <div className="blog-card-meta-item">
                  <CalendarIcon className="h-3 w-3" />
                  <span>{blog.createdDate}</span>
                </div>
              </div>

              <footer className="blog-card-footer">
                <div className="blog-card-tags">
                  {visibleTags.map((tag: string) => (
                    <div key={tag}>
                      <Badge className="blog-card-tag">
                        <TagIcon className="h-3 w-3" />
                        {tag}
                      </Badge>
                    </div>
                  ))}
                  {hasMore && (
                    <div>
                      <Badge
                        className="blog-card-tag"
                        title={blog.tags?.slice(visibleTags.length).join(", ")}
                      >
                        <PlusIcon className="h-3 w-3" />
                        {moreCount}
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="blog-card-button-container">
                  <Button
                    size="sm"
                    variant="default"
                    className="blog-card-button"
                    onClick={() => handleClick(blog)}
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

      {/* Dialog */}
      <Dialog
        open={!!dialogOpenForBlogId}
        onOpenChange={(open) => !open && setDialogOpenForBlogId(null)}
      >
        {selectedBlogForDialog && (
          <DialogContent className="dialog-content">
            <DialogHeader className="dialog-header">
              <DialogTitle>{selectedBlogForDialog.title}</DialogTitle>
            </DialogHeader>
            <ScrollArea className="dialog-body">
              <BlogDetail blog={selectedBlogForDialog} />
            </ScrollArea>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default BlogCard;
