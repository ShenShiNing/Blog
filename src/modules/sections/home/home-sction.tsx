import Link from "next/link";
import { motion } from "motion/react";
import { Github, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MorphingText } from "@/components/ui/morphing-text";
import { scrollToSection } from "@/lib/scroll";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

const HomeSection = () => {
  return (
    <section id="home" className="main flex items-center justify-between">
      <div className="container px-4 flex flex-col md:flex-row items-center justify-between gap-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full order-2 md:order-1 text-center lg:text-left"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl 2xl:text-7xl font-bold mb-8"
          >
            <span className="block">I&apos;m Xiaoshen</span>
            <span className="text-blue-500 block">A Web Developer</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <MorphingText
              texts={texts}
              className="text-lg text-blue-500 text-center lg:text-left"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-lg text-muted-foreground mb-8"
          >
            I transform ideas into exceptional digital products that deliver
            meaningful experiences and drive business growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-wrap gap-4 justify-center md:justify-start mb-8"
          >
            <Button
              className="cursor-pointer"
              onClick={() => scrollToSection("about")}
            >
              About me
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => scrollToSection("contact")}
            >
              Get touch
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="flex gap-4 justify-center md:justify-start"
          >
            {icons.map((icon, index) => (
              <Button
                key={index}
                variant="outline"
                size="icon"
                className="rounded-full text-muted-foreground"
              >
                {icon.icon}
              </Button>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="w-full hidden md:flex items-center justify-end order-1 md:order-2">
          <Link href="#about" className="relative group">
            <div className="absolute w-[calc(100%+20px)] h-[calc(100%+20px)] rounded-full bg-blue-500 blur-3xl -top-2.5 -left-2.5" />
            <Avatar className="w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] transition-transform duration-300 group-hover:scale-105">
              <AvatarImage src="/images/Avatar.jpg" />
              <AvatarFallback>X</AvatarFallback>
            </Avatar>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeSection;
