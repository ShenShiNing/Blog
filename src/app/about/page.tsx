import { Metadata } from "next";
import AboutSection from "@/modules/sections/about/about-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about my personal experience, skills and professional background",
};

const AboutPage = () => {
  return (
    <main className="main px-4">
      <AboutSection />
    </main>
  );
};

export default AboutPage;
