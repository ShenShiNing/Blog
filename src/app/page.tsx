"use client";

import HomeSection from "@/modules/sections/home/home-sction";
import BlogSection from "@/modules/sections/blog/blog-section";
import AboutSection from "@/modules/sections/about/about-section";
import PortfolioSection from "@/modules/sections/portfolio/portfolio-section";
import ContactSection from "@/modules/sections/contact/contact-section";

const Page = () => {
  return (
    <main>
      <HomeSection />
      <BlogSection />
      <PortfolioSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
};

export default Page;
