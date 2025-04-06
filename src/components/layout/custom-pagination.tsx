import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "../ui/pagination";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface CustomPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const CustomPagination = ({
  totalPages,
  currentPage,
  onPageChange,
  className = "",
}: CustomPaginationProps) => {
  const [visiblePages, setVisiblePages] = useState<(number | "ellipsis")[]>([]);

  // 生成页码数组
  useEffect(() => {
    if (totalPages <= 7) {
      // 如果总页数不超过7，直接显示所有页码
      setVisiblePages(Array.from({ length: totalPages }, (_, i) => i + 1));
    } else {
      // 如果总页数超过7，显示省略号
      let pages: (number | "ellipsis")[] = [];

      // 始终显示第一页
      pages.push(1);

      // 当前页前后的页码处理
      if (currentPage <= 3) {
        // 当前页靠近开始
        pages = [...pages, 2, 3, 4, "ellipsis", totalPages];
      } else if (currentPage >= totalPages - 2) {
        // 当前页靠近结束
        pages = [
          ...pages,
          "ellipsis",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        // 当前页在中间
        pages = [
          ...pages,
          "ellipsis",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "ellipsis",
          totalPages,
        ];
      }

      setVisiblePages(pages);
    }
  }, [totalPages, currentPage]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`my-8 ${className}`}
    >
      <Pagination className="select-none">
        <PaginationContent className="gap-1 md:gap-2">
          {/* 上一页按钮 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`prev-${currentPage}`}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <PaginationItem>
                <PaginationPrevious
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                      onPageChange(currentPage - 1);
                    }
                  }}
                  className={`${
                    currentPage === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:text-primary hover:border-primary transition-colors"
                  }`}
                  href="#"
                />
              </PaginationItem>
            </motion.div>
          </AnimatePresence>

          {/* 页码 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`pages-${currentPage}`}
              className="flex items-center gap-1 md:gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {visiblePages.map((page, index) =>
                page === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis className="text-muted-foreground" />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={page}>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <PaginationLink
                        isActive={page === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          onPageChange(page);
                        }}
                        href="#"
                        className={`${
                          page === currentPage
                            ? "bg-foreground text-background hover:bg-primary/90 font-medium"
                            : "hover:bg-muted hover:text-foreground"
                        } transition-colors`}
                      >
                        {page}
                      </PaginationLink>
                    </motion.div>
                  </PaginationItem>
                )
              )}
            </motion.div>
          </AnimatePresence>

          {/* 下一页按钮 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`next-${currentPage}`}
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <PaginationItem>
                <PaginationNext
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) {
                      onPageChange(currentPage + 1);
                    }
                  }}
                  className={`${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:text-primary hover:border-primary transition-colors"
                  }`}
                  href="#"
                />
              </PaginationItem>
            </motion.div>
          </AnimatePresence>
        </PaginationContent>
      </Pagination>
    </motion.div>
  );
};

export default CustomPagination;
