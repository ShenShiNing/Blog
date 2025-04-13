import { create } from "zustand";
import { Portfolio } from "@/types/portfolio"; // 假设 Portfolio 类型定义在 @/types/portfolio

interface PortfolioState {
  selectedPortfolio: Portfolio | null;
  isDetailView: boolean;
  selectPortfolio: (portfolio: Portfolio) => void;
  clearSelectedPortfolio: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  selectedPortfolio: null,
  isDetailView: false,
  selectPortfolio: (portfolio) =>
    set({ selectedPortfolio: portfolio, isDetailView: true }),
  clearSelectedPortfolio: () =>
    set({ selectedPortfolio: null, isDetailView: false }),
}));
