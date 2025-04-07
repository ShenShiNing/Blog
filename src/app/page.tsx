import HeroSection from "@/modules/sections/hero/hero-section";
import BlogSection from "@/modules/sections/blog/blog-section";
import PortfolioSection from "@/modules/sections/portfolio/portfolio-section";
import AboutSection from "@/modules/sections/about/about-section";
import ContactSection from "@/modules/sections/contact/contact-section";
import { getAllBlogs } from "@/lib/blog";
import { getAllPortfolios } from "@/lib/portfolio";
import { Blog } from "@/types/blog";
import { Portfolio } from "@/types/portfolio";

export const dynamicParams = true;
export const revalidate = 604800;
export const generateStaticParams = async () => {
  const blogs = await getAllBlogs();
  const portfolios = await getAllPortfolios();
  return {
    blogs,
    portfolios,
  };
};

const Page = async ({
  params,
}: {
  params: Promise<{ blogs: Blog[]; portfolios: Portfolio[] }>;
}) => {
  const { blogs, portfolios } = await params;

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
