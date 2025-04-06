"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "motion/react";
import { DownloadIcon, Github, Mail, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

// 通用动画变体
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

// 通用 Section 组件
const SectionBlock = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <motion.section
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    className="mb-16 md:mb-24"
  >
    <div className="flex flex-col md:flex-row gap-6 md:gap-12">
      <div className="md:w-1/3">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
        <div className="h-1 w-10 bg-primary" />
      </div>
      <div className="md:w-2/3">{children}</div>
    </div>
  </motion.section>
);

// 社交按钮组件
const SocialButton = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) => (
  <Link href={href} target="_blank">
    <Button size="icon" variant="outline" className="rounded-full h-10 w-10">
      <Icon className="h-4 w-4" />
      <span className="sr-only">{label}</span>
    </Button>
  </Link>
);

export default function AboutSection() {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();

  return (
    <section id="about" ref={containerRef} className="main">
      <div className="py-16 sm:py-20 lg:py-28 relative min-h-screen px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          {/* 头像部分 - 移动端在上方，桌面端在右侧 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center md:justify-end order-first md:order-last"
          >
            <div
              className={`relative ${isMobile ? "w-56 h-56" : "w-64 h-64 lg:w-72 lg:h-72"} group`}
            >
              <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-400 blur-lg transition-all group-hover:blur-xl" />
              <div className="relative w-full h-full overflow-hidden rounded-full border-4 border-background shadow-xl transition-transform group-hover:scale-105">
                <Image
                  src="/images/Avatar.jpg"
                  alt="Profile picture"
                  fill
                  className="object-cover"
                  priority
                  sizes=" 200px"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-1.5">
                <Badge className="text-xs px-2 py-0.5">
                  Available for work
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* 标题和按钮部分 - 移动端居中，桌面端靠左 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h1
              className={`${isMobile ? "text-4xl" : "text-5xl lg:text-6xl"} font-bold tracking-tight mb-6`}
            >
              <span className="text-primary">Xiaoshen</span>
            </h1>
            <p
              className={`${isMobile ? "text-lg" : "text-xl"} text-muted-foreground mb-6 leading-relaxed max-w-md`}
            >
              I create meaningful digital experiences that connect people and
              technology.
            </p>
            <div className="flex gap-3 mb-6">
              <SocialButton
                href="https://github.com/ShenShiNing"
                icon={Github}
                label="GitHub"
              />
              <SocialButton
                href="https://twitter.com"
                icon={Twitter}
                label="Twitter"
              />
              <SocialButton
                href="mailto:shen353824385@gmail.com"
                icon={Mail}
                label="Email"
              />
            </div>
            <Button
              asChild
              size="lg"
              className={`rounded-md px-6 ${isMobile ? "w-full" : "md:w-auto"}`}
            >
              <Link href="/contact">
                <DownloadIcon className="h-4 w-4 mr-2" />
                Resume
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Bio Section */}
        <SectionBlock title="Bio">
          <div className={`space-y-4 ${isMobile ? "text-base" : "text-lg"}`}>
            <p>Hello! I&apos;m Xiaoshen, a frontend developer.</p>
            <p>
              With over 1 year of experience in the tech industry, I&apos;m
              passionate about staying updated with the latest trends and
              technologies, applying this knowledge to my work. I believe
              excellent user experiences stem from attention to detail and
              understanding user needs.
            </p>
            <p>
              I&apos;m familiar with modern frontend workflows and tools,
              including component-based design, state management, and
              performance optimization.
            </p>
            <p>When not coding, I enjoy watching movies or playing games.</p>
          </div>
        </SectionBlock>

        {/* Experience Section */}
        <SectionBlock title="Experience">
          <div className="relative border-l border-border pl-6 space-y-12">
            {[
              {
                title: "ERP实施顾问",
                company: "厦门同荣科技有限公司",
                period: "2024-07 - Present",
                description:
                  "Responsible for implementing and deploying Kingdee products. Successfully assisted three companies with digital transformation, focusing on supply chain and production modules.",
              },
            ].map((job, index) => (
              <motion.div
                key={index}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                <div className="absolute -left-8 mt-1 h-4 w-4 rounded-full border-2 border-background bg-primary" />
                <h3 className={`${isMobile ? "text-lg" : "text-xl"} font-bold`}>
                  {job.title}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                  <p className="text-muted-foreground">{job.company}</p>
                  <Badge
                    className={`rounded-md ${isMobile ? "mt-2" : "sm:mt-0"}`}
                  >
                    {job.period}
                  </Badge>
                </div>
                <p>{job.description}</p>
              </motion.div>
            ))}
          </div>
        </SectionBlock>

        {/* Skills Section */}
        <SectionBlock title="Skills">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {[
              "Java",
              "Git",
              "Python",
              "Django",
              "JavaScript",
              "TypeScript",
              "Vue",
              "React",
              "Next.js",
              "Node.js",
              "Tailwind CSS",
              "Responsive Design",
            ].map((skill, index) => (
              <motion.div
                key={skill}
                variants={badgeVariants}
                initial="hidden"
                whileInView={{
                  ...badgeVariants.visible,
                  transition: { delay: index * 0.05 },
                }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <Badge
                  className={`px-3 py-1 ${isMobile ? "text-sm" : ""} font-medium`}
                >
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </SectionBlock>

        {/* Education Section */}
        <SectionBlock title="Education">
          <div className="relative border-l border-border pl-6">
            <div className="absolute -left-8 mt-1 h-4 w-4 rounded-full border-2 border-background bg-primary" />
            <h3 className={`${isMobile ? "text-lg" : "text-xl"} font-bold`}>
              Information Management and Information System
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
              <p className="text-muted-foreground">Guizhou Normal University</p>
              <Badge className={`rounded-md ${isMobile ? "mt-2" : "sm:mt-0"}`}>
                2020-09 - 2024-06
              </Badge>
            </div>
            <p>
              Graduated with honors. Specialized in web development and
              human-computer interaction.
            </p>
          </div>
        </SectionBlock>
      </div>
    </section>
  );
}
