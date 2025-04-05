import { Metadata } from "next";

import { PortfolioSection } from "@/modules/sections/portfolio/portfolio-section";
export const metadata: Metadata = {
  title: "Portfolio",
};

const Page = () => {
  return (
    <div className="main">
      <PortfolioSection />
    </div>
  );
};

export default Page;
