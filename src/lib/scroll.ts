// 禁止滚动
export const scrollLock = {
  enable: () => {
    document.documentElement.classList.add("overflow-hidden");
  },
  disable: () => {
    document.documentElement.classList.remove("overflow-hidden");
  },
};

// 滚动到指定section
export const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};
