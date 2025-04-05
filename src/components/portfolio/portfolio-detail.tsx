"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Portfolio } from "@/types/portfolio";

interface PortfolioDetailProps {
  item: Portfolio;
}

export function PortfolioDetail({ item }: PortfolioDetailProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
        <Image
          src={item.coverImage || "/placeholder.svg"}
          alt={item.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          className="object-contain rounded-md"
        />
      </div>
      <CardContent className="p-4 sm:p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-2xl md:text-3xl font-bold"
            >
              {item.title}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-wrap gap-2 mt-3"
            >
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex gap-3 mt-2 md:mt-0"
          >
            {item.liveUrl && (
              <Button asChild>
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
            {item.githubUrl && (
              <Button variant="outline" asChild>
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  Source Code
                </a>
              </Button>
            )}
          </motion.div>
        </div>

        <Separator className="my-6" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold mb-4">Project Overview</h3>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-4">{item.description}</p>
          </div>

          {item.features && item.features.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mt-8 mb-4">Key Features</h3>
              <ul className="space-y-2 list-disc pl-5">
                {item.features.map((feature, index) => (
                  <li key={index} className="text-muted-foreground">
                    {feature}
                  </li>
                ))}
              </ul>
            </>
          )}

          {item.images && item.images.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mt-8 mb-4">Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {item.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative rounded-md overflow-hidden aspect-video w-full"
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${item.title} screenshot ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
}
