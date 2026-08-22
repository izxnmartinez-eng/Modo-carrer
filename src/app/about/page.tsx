import type { Metadata } from "next";
import { InfoPageView } from "@/components/seo/info-page";
import { ABOUT } from "@/lib/info-content";

export const metadata: Metadata = {
  title: ABOUT.title.en,
  description: ABOUT.description.en,
  alternates: {
    canonical: "/about",
    languages: { en: "/about", es: "/es/sobre-la-web", "x-default": "/about" },
  },
};

export default function Page() {
  return <InfoPageView page={ABOUT} locale="en" />;
}
