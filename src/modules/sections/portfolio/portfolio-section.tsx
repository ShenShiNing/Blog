"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft } from "lucide-react";

import { PortfolioList } from "@/components/portfolio/portfolio-list";
import { PortfolioDetail } from "@/components/portfolio/portfolio-detail";
import { Button } from "@/components/ui/button";
import type { Portfolio } from "@/types/portfolio";
import { usePortfolioStore } from "@/store/portfolio";

interface PortfolioSectionProps {
  initialPortfolios: Portfolio[];
}

const PortfolioSection = ({ initialPortfolios }: PortfolioSectionProps) => {
  const { selectedPortfolio, isDetailView, clearSelectedPortfolio } =
    usePortfolioStore();

  return (
    <section id="portfolio" className="main px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Portfolio
        </h2>
        <p className="text-muted-foreground">
          Here are some of my projects and works.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {isDetailView && selectedPortfolio ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            <Button
              variant="ghost"
              onClick={clearSelectedPortfolio}
              className="mb-6 flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Portfolio
            </Button>
            <PortfolioDetail item={selectedPortfolio} />
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
            <PortfolioList items={initialPortfolios} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;
