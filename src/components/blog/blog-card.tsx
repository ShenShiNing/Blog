import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Tag, Plus, User, CalendarIcon, BookOpenIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Blog } from "@/types/blog";

interface BlogCardProps {
  blogs: Blog[];
}

interface TagsResult {
  visibleTags: string[];
  hasMore: boolean;
  moreCount: number;
}

const BlogCard = ({ blogs }: BlogCardProps) => {
  // 是否为移动端视图
  const [isMobile, setIsMobile] = useState(false);

  // 检测窗口尺寸并更新移动端状态
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 初始检查
    checkIfMobile();

    // 监听窗口大小变化
    window.addEventListener("resize", checkIfMobile);

    // 清理监听器
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // 根据屏幕尺寸获取显示标签的数量
  const getVisibleTags = (tags: string[] | undefined): TagsResult => {
    if (!tags || tags.length === 0) {
      return { visibleTags: [], hasMore: false, moreCount: 0 };
    }

    const maxVisibleTags = isMobile ? 3 : 4;

    if (tags.length <= maxVisibleTags) {
      return { visibleTags: tags, hasMore: false, moreCount: 0 };
    } else {
      return {
        visibleTags: tags.slice(0, maxVisibleTags),
        hasMore: true,
        moreCount: tags.length - maxVisibleTags,
      };
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:gap-8">
      {blogs.map((blog, index) => {
        const { visibleTags, hasMore, moreCount } = getVisibleTags(blog.tags);

        return (
          <div
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
                />
              </div>
            )}

            {/* Blog Content */}
            <div className="flex flex-col flex-grow space-y-2">
              {/* Blog Header */}
              <div className="flex flex-wrap items-center gap-2 md:gap-4">
                <span className="font-bold text-primary">{`0${index + 1}.`}</span>
                <span className="text-sm text-muted-foreground">
                  {blog.category}
                </span>
                <div className="flex items-center gap-1 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{blog.createdDate}</span>
                </div>
              </div>

              {/* Blog Title */}
              <Link href={`/blog/${blog.id}`}>
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

              {/* Blog Meta */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-auto pt-2 gap-3">
                {/* Blog Tags */}
                <div className="flex flex-wrap gap-2">
                  {visibleTags.map((tag: string) => (
                    <Badge className="text-base" key={tag}>
                      <Tag className="mr-1" />
                      {tag}
                    </Badge>
                  ))}

                  {hasMore && (
                    <Badge
                      variant="outline"
                      className="text-xs bg-muted/30 hover:bg-muted/50 cursor-pointer"
                      title={blog.tags?.slice(visibleTags.length).join(", ")}
                    >
                      <Plus className="mr-1" />
                      {moreCount}
                    </Badge>
                  )}
                </div>

                {/* Read More Button */}
                <div className="w-full md:w-auto">
                  <Link
                    href={`/blog/${blog.id}`}
                    className="w-full block md:inline-block"
                  >
                    <Button
                      size="lg"
                      className="text-background bg-foreground w-full md:w-auto cursor-pointer"
                    >
                      <BookOpenIcon />
                      Read More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BlogCard;
