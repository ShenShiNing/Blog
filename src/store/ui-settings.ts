import { create } from "zustand";

type Theme = "light" | "dark" | "system";

interface UISettingsState {
  theme: Theme;
  isMobileMenuOpen: boolean;
  setTheme: (theme: Theme) => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export const useUISettingsStore = create<UISettingsState>((set) => ({
  theme: "system", // Default theme
  isMobileMenuOpen: false,
  setTheme: (theme) => set({ theme }),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
}));
