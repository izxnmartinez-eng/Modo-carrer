import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";
import { Toaster } from "@/components/ui/toaster";
import { VersionTheme } from "@/components/layout/version-theme";
import { WelcomeTour } from "@/components/onboarding/welcome-tour";
import { SiteFooter } from "@/components/seo/site-footer";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Career Hub — EA SPORTS FC Career Mode Database",
  description:
    "Wonderkids, release clauses, real manager tactical codes, squad planning and youth academy maths for EA SPORTS FC Career Mode. No Ultimate Team.",
  alternates: { canonical: "/" },
  // Search Console ownership. The .vercel.app DNS belongs to Vercel, so the
  // meta-tag method is the only one available to this deployment.
  verification: { google: "WT5jyBnhiNf12pVRrkDThfwFQr3QCtriz5WT3RWXByg" },
  openGraph: {
    type: "website",
    siteName: "Career Hub",
    title: "Career Hub — EA SPORTS FC Career Mode Database",
    description:
      "Wonderkids, release clauses, growth curves, squad planning and youth academy maths for EA SPORTS FC Career Mode. Free, no ads, no signup.",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-version="fc26" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <VersionTheme />
        <AppShell>
          {children}
          <SiteFooter />
        </AppShell>
        <WelcomeTour />
        <Toaster />
      </body>
    </html>
  );
}
