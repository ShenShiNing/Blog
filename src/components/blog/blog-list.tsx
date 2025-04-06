"use client";

import { useEffect } from "react";
import { Blog } from "@/types/blog";
import BlogCard from "@/components/blog/blog-card";
import { useBlogStore } from "@/store/blog";
import { SearchXIcon } from "lucide-react";
import CustomPagination from "../layout/custom-pagination";

interface BlogListProps {
  initialBlogs: Blog[];
}

const BlogList = ({ initialBlogs }: BlogListProps) => {
  const {
    blogs,
    filteredBlogs,
    selectedCategory,
    searchQuery,
    currentPage,
    setBlogs,
    setCurrentPage,
    getPaginatedBlogs,
    getTotalPages,
  } = useBlogStore();

  // 获取当前页的博客数据
  const paginatedBlogs = getPaginatedBlogs();
  // 计算总页数
  const totalPages = getTotalPages();

  // 初始化博客数据
  useEffect(() => {
    if (blogs.length === 0 && initialBlogs.length > 0) {
      setBlogs(initialBlogs);
    }
  }, [initialBlogs, blogs.length, setBlogs]);

  // 处理页码变化
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 滚动到页面顶部
    window.scrollTo({
      top: document.getElementById("blog")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  // 构建空状态消息
  const getEmptyStateMessage = () => {
    if (searchQuery) {
      return `No blogs found for "${searchQuery}"`;
    } else if (selectedCategory) {
      return `No blogs available in "${selectedCategory}" category`;
    }
    return "No blogs available";
  };

  return (
    <div className="mt-6">
      {/* 结果计数 */}
      {filteredBlogs.length > 0 && (
        <div className="mb-4 text-sm text-muted-foreground">
          Displaying {filteredBlogs.length} articles
          {(selectedCategory || searchQuery) && (
            <span>
              {selectedCategory && ` in "${selectedCategory}" category`}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
          )}
        </div>
      )}

      {/* 博客列表或空状态 */}
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-16 bg-muted/30 rounded-lg border border-border/50">
          <div>
            <SearchXIcon className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-lg font-medium mb-2">{getEmptyStateMessage()}</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or selecting another category
            </p>
          </div>
        </div>
      ) : (
        <div>
          {/* 分页后的博客列表 */}
          <BlogCard blogs={paginatedBlogs} />

          {/* 只有当总页数大于1时显示分页 */}
          {totalPages > 1 && (
            <CustomPagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              className="mt-10"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default BlogList;
