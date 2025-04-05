import HeroSection from "@/modules/sections/hero/hero-section";
import BlogSection from "@/modules/sections/blog/blog-section";
import PortfolioSection from "@/modules/sections/portfolio/portfolio-section";
import ContactSection from "@/modules/sections/contact/contact-section";
import { getAllBlogs } from "@/lib/blog";

const Page = async () => {
  const blogs = await getAllBlogs();

  return (
    <main>
      <HeroSection />
      <BlogSection initialBlogs={blogs} />
      <PortfolioSection />
      <ContactSection />
    </main>
  );
};

export default Page;
