"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion"; // 修正导入路径
import { Github, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MorphingText } from "@/components/ui/morphing-text";
import { scrollToSection } from "@/lib/scroll";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// 通用动画变体
const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay },
  }),
};

// 社交图标组件
const SocialIcon = ({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) => (
  <Link href={href} target="_blank">
    <Button
      variant="outline"
      size="icon"
      className="rounded-full text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
    >
      {icon}
    </Button>
  </Link>
);

const texts = ["Welcome to my site", "Let's make something great together"];
const icons = [
  {
    icon: <Github className="h-5 w-5" />,
    href: "https://github.com/ShenShiNing",
  },
  {
    icon: <MailIcon className="h-5 w-5" />,
    href: "mailto:shen353824385@gmail.com",
  },
];

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      <div className="container flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        {/* 头像部分 - 移动端在上方居中，桌面端在右侧 */}
        <motion.div
          custom={0}
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="w-full flex justify-center md:justify-end order-first md:order-last"
        >
          <Link href="#about" className="relative group">
            <div className="absolute w-[calc(100%+20px)] h-[calc(100%+20px)] rounded-full bg-blue-500 blur-3xl -top-2.5 -left-2.5 transition-all group-hover:blur-2xl" />
            <Avatar className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 transition-transform duration-300 group-hover:scale-105">
              <AvatarImage src="/images/Avatar.jpg" />
              <AvatarFallback>X</AvatarFallback>
            </Avatar>
          </Link>
        </motion.div>

        {/* 文本和按钮部分 - 移动端居中，桌面端左对齐 */}
        <motion.div className="w-11/12 md:w-full  flex-col items-center md:items-start text-center md:text-left order-last md:order-first">
          <motion.h1
            custom={0.2}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-bold mb-6"
          >
            <span className="block">I&apos;m Xiaoshen</span>
            <span className="text-blue-500 block">A Web Developer</span>
          </motion.h1>

          <motion.div
            custom={0.4}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <MorphingText
              texts={texts}
              className="text-base sm:text-lg text-center md:text-left text-blue-500"
            />
          </motion.div>

          <motion.p
            custom={0.6}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-base sm:text-lg text-muted-foreground mb-6 max-w-lg"
          >
            I transform ideas into exceptional digital products that deliver
            meaningful experiences and drive business growth.
          </motion.p>

          <motion.div
            custom={0.8}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="flex flex-wrap gap-4 justify-center md:justify-start mb-6"
          >
            <Link href="/about">
              <Button className="w-full sm:w-auto cursor-pointer ">
                About me
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full sm:w-auto cursor-pointer"
              onClick={() => scrollToSection("contact")}
            >
              Get in touch
            </Button>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="flex gap-4 justify-center md:justify-start"
          >
            {icons.map((icon, index) => (
              <SocialIcon key={index} href={icon.href} icon={icon.icon} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
