"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CustomPagination from "@/components/layout/custom-pagination";
import type { Portfolio } from "@/types/portfolio";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PortfolioDetail } from "@/components/portfolio/portfolio-detail";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePortfolioStore } from "@/store/portfolio";

interface PortfolioListProps {
  items: Portfolio[];
}

export function PortfolioList({ items }: PortfolioListProps) {
  const isMobile = useIsMobile();
  const { selectPortfolio } = usePortfolioStore();
  const [dialogOpenForPortfolioId, setDialogOpenForPortfolioId] = useState<
    string | null
  >(null);

  const selectedPortfolioForDialog = useMemo(() => {
    return items.find((item) => item.id === dialogOpenForPortfolioId) ?? null;
  }, [items, dialogOpenForPortfolioId]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const totalPages = Math.ceil(items.length / pageSize);
  const getPaginatedItems = () => {
    const startIndex = (currentPage - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  };
  const paginatedItems = getPaginatedItems();
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: document.getElementById("portfolio")?.offsetTop || 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [items.length]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };
  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const handleOpenDialog = (portfolioId: string) => {
    setDialogOpenForPortfolioId(portfolioId);
  };

  const handleClick = (portfolioItem: Portfolio) => {
    if (isMobile) {
      selectPortfolio(portfolioItem);
    } else {
      handleOpenDialog(portfolioItem.id);
    }
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
          <motion.div key={portfolioItem.id} variants={itemVariant}>
            <Card
              className="portfolio-card group"
              onClick={() => handleClick(portfolioItem)}
            >
              <div className="portfolio-card-image-container">
                <Image
                  src={portfolioItem.coverImage || "/placeholder.svg"}
                  alt={portfolioItem.title}
                  fill
                  className="portfolio-card-image"
                />
              </div>
              <CardContent className="portfolio-card-content">
                <h3 className="portfolio-card-title">{portfolioItem.title}</h3>
                <p className="portfolio-card-description">
                  {portfolioItem.shortDescription}
                </p>
                <div className="portfolio-card-tags">
                  {portfolioItem.tags.map((tag) => (
                    <Badge key={tag} className="portfolio-card-tag">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {totalPages > 1 && (
        <CustomPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          className="mt-10"
        />
      )}

      {/* Dialog */}
      <Dialog
        open={!!dialogOpenForPortfolioId}
        onOpenChange={(open) => !open && setDialogOpenForPortfolioId(null)}
      >
        {selectedPortfolioForDialog && (
          <DialogContent className="dialog-content">
            <DialogHeader className="dialog-header">
              <DialogTitle>{selectedPortfolioForDialog.title}</DialogTitle>
            </DialogHeader>
            <ScrollArea className="dialog-body">
              <PortfolioDetail item={selectedPortfolioForDialog} />
            </ScrollArea>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
