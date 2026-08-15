import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";
import { Toaster } from "@/components/ui/toaster";
import { VersionTheme } from "@/components/layout/version-theme";

export const metadata: Metadata = {
  title: "Career Hub — EA SPORTS FC Career Mode Database",
  description:
    "Wonderkids, release clauses, real manager tactical codes, squad planning and youth academy maths for EA SPORTS FC Career Mode. No Ultimate Team.",
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-version="fc27" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <VersionTheme />
        <AppShell>{children}</AppShell>
        <Toaster />
      </body>
    </html>
  );
}
