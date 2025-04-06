import HeroSection from "@/modules/sections/hero/hero-section";
import BlogSection from "@/modules/sections/blog/blog-section";
import { PortfolioSection } from "@/modules/sections/portfolio/portfolio-section";
import ContactSection from "@/modules/sections/contact/contact-section";
import AboutSection from "@/modules/sections/about/about-section";
import { getAllBlogs } from "@/lib/blog";
import { getAllPortfolios } from "@/lib/portfolio";

const Page = async () => {
  const blogs = await getAllBlogs();
  const portfolios = await getAllPortfolios();

  return (
    <main>
      <HeroSection />
      <BlogSection initialBlogs={blogs} />
      <PortfolioSection initialPortfolios={portfolios} />
      <AboutSection />
      <ContactSection />
    </main>
  );
};

export default Page;
