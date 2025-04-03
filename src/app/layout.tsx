import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";

import type { Metadata } from "next";

import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "xiaoshen-site",
    template: "%s | xiaoshen-site",
  },
  description: "Xiaoshen's personal website",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
