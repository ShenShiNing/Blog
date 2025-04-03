import { Metadata } from "next";
import BlogList from "@/components/blog/blog-list";
export const metadata: Metadata = {
  title: "Blog",
};

const Page = () => {
  return (
    <main className="main px-4">
      <h1 className="text-2xl font-bold mb-4">Blog & Articles</h1>
      <BlogList />
    </main>
  );
};

export default Page;
