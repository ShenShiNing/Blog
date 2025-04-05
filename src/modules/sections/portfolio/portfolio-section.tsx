"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft } from "lucide-react";

import { PortfolioList } from "@/components/portfolio/portfolio-list";
import { PortfolioDetail } from "@/components/portfolio/portfolio-detail";
import { Button } from "@/components/ui/button";
import { portfolioItems } from "@/content/portfolio/portfolio-data";
import type { Portfolio } from "@/types/portfolio";

export function PortfolioSection() {
  const [selectedItem, setSelectedItem] = useState<Portfolio | null>(null);

  const handleSelectItem = (item: Portfolio) => {
    setSelectedItem(item);
  };

  const handleBack = () => {
    setSelectedItem(null);
  };

  return (
    <section className="main px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Portfolio
        </h2>
        <p className="text-muted-foreground max-w-[700px]">
          Explore my recent projects and creative works. Each project represents
          my skills, passion, and dedication to creating meaningful digital
          experiences.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {selectedItem ? (
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
              onClick={handleBack}
              className="mb-6 flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to all projects
            </Button>
            <PortfolioDetail item={selectedItem} />
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
            <PortfolioList
              items={portfolioItems}
              onSelectItem={handleSelectItem}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
