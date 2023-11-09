import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import ThemeToogle from "@/components/theme-toggle";
import { iconForTheme } from "@/components/icons";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Panoptico",
    default: "Panoptico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = cookies().get("theme");

  return (
    <html lang="en" className={cn(theme?.value || "dark", "antialiased")}>
      <body
        className={cn(
          inter.className,
          "flex flex-col bg-background text-foreground",
        )}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 bg-muted">{children}</main>
        </div>
        <Footer />
        <ThemeToogle defaultIcon={iconForTheme(theme?.value)} />
      </body>
    </html>
  );
}
