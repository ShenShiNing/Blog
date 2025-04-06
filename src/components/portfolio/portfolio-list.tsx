"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState, useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CustomPagination from "@/components/layout/custom-pagination";
import type { Portfolio } from "@/types/portfolio";

interface PortfolioListProps {
  items: Portfolio[];
  onSelectItem: (item: Portfolio) => void;
}

export function PortfolioList({ items, onSelectItem }: PortfolioListProps) {
  // 分页相关状态
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // 每页显示的项目数
  const totalPages = Math.ceil(items.length / pageSize);

  // 获取当前页的项目
  const getPaginatedItems = () => {
    const startIndex = (currentPage - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  };

  // 当前页的作品集
  const paginatedItems = getPaginatedItems();

  // 处理页码变化
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 滚动到页面顶部
    window.scrollTo({
      top: document.getElementById("portfolio")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  // 当items变化时重置页码
  useEffect(() => {
    setCurrentPage(1);
  }, [items.length]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {paginatedItems.map((portfolioItem) => (
          <motion.div key={portfolioItem.id} variants={item}>
            <Card
              className="overflow-hidden cursor-pointer group h-full flex flex-col"
              onClick={() => onSelectItem(portfolioItem)}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={portfolioItem.coverImage || "/placeholder.svg"}
                  alt={portfolioItem.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-5 flex-1 flex flex-col">
                <h3 className="font-semibold text-xl mb-2">
                  {portfolioItem.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 flex-1">
                  {portfolioItem.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {portfolioItem.tags.map((tag) => (
                    <Badge key={tag} className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

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
  );
}
