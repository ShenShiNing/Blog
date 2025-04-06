"use client";

import { useCallback } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, XIcon } from "lucide-react";
import { useBlogStore } from "@/store/blog";

const SearchInput = () => {
  const { searchQuery, setSearch } = useBlogStore();

  // 处理输入框变化
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [setSearch]
  );

  // 清除搜索
  const clearSearch = useCallback(() => {
    setSearch("");
  }, [setSearch]);

  return (
    <div className="relative flex items-center w-full">
      <Input
        type="text"
        placeholder="Search"
        className={`w-full text-foreground !bg-background`}
        onChange={handleInputChange}
        value={searchQuery}
      />

      {/* 搜索图标或清除按钮 */}
      <div className="absolute right-2">
        {searchQuery ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={clearSearch}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        ) : (
          <SearchIcon className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
    </div>
  );
};

export default SearchInput;
