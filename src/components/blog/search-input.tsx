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
    <div className="search-container">
      <Input
        type="text"
        placeholder="Search"
        className="search-input"
        onChange={handleInputChange}
        value={searchQuery}
      />

      {/* 搜索图标或清除按钮 */}
      <div className="search-button">
        {searchQuery ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="search-clear-button"
            onClick={clearSearch}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        ) : (
          <SearchIcon className="search-icon" />
        )}
      </div>
    </div>
  );
};

export default SearchInput;
