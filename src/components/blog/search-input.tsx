"use client";

import { useCallback } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBlogStore } from "@/store/blog";

const SearchInput = () => {
  const isMobile = useIsMobile();
  const { searchQuery, setSearch } = useBlogStore();

  // 处理输入框变化
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [setSearch]
  );

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
        onChange={(e) => handleInputChange(e)}
        value={searchQuery}
      />
      <Button
        className={`rounded-l-none cursor-pointer ${
          isMobile
            ? "bg-foreground hover:bg-foreground text-background"
            : "bg-background hover:bg-background"
        }`}
      >
        <SearchIcon className="w-5 h-5 text-muted-foreground" />
      </Button>
    </div>
  );
};

export default SearchInput;
