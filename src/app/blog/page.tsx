import { Metadata } from "next";
import BlogList from "@/components/blog/blog-list";
import { getAllBlogs } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
};

const Page = async () => {
  const blogs = await getAllBlogs();

  return (
    <main className="main px-4">
      <h1 className="text-2xl font-bold mb-4">Blog & Articles</h1>
      <BlogList initialBlogs={blogs} />
    </main>
  );
};

export default Page;
