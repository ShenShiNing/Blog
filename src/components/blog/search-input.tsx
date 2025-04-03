import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Blog } from "@/types/blog";

interface SearchInputProps {
  blogs: Blog[];
  onSearchResults: (results: Blog[]) => void;
  isMobile?: boolean;
}

const SearchInput = ({
  blogs,
  onSearchResults,
  isMobile = false,
}: SearchInputProps) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const performSearch = () => {
    if (!search.trim()) {
      // 如果搜索为空，返回所有博客
      onSearchResults(blogs);
      return;
    }

    const searchTerm = search.toLowerCase().trim();

    // 搜索标题、描述、作者、标签和内容
    const results = blogs.filter((blog) => {
      return (
        blog.title.toLowerCase().includes(searchTerm) ||
        blog.description?.toLowerCase().includes(searchTerm) ||
        false ||
        blog.author.toLowerCase().includes(searchTerm) ||
        blog.tags?.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
        false ||
        blog.content?.toLowerCase().includes(searchTerm) ||
        false
      );
    });

    onSearchResults(results);
  };

  return (
    <div className="flex items-center">
      <Input
        type="text"
        placeholder="Search..."
        className={`w-full border-none rounded-r-none ${
          isMobile
            ? "!bg-foreground !text-background"
            : "!bg-background !text-foreground"
        }`}
        onChange={(e) => handleSearch(e)}
        value={search}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            performSearch();
          }
        }}
      />
      <Button
        className={`rounded-l-none cursor-pointer ${
          isMobile
            ? "bg-foreground hover:bg-foreground text-background"
            : "bg-background hover:bg-background"
        }`}
        onClick={(e) => {
          e.preventDefault();
          performSearch();
        }}
      >
        <SearchIcon className="w-5 h-5 text-muted-foreground" />
      </Button>
    </div>
  );
};

export default SearchInput;
