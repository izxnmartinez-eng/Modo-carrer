import type { Metadata } from "next";
import { InfoPageView } from "@/components/seo/info-page";
import { ABOUT } from "@/lib/info-content";

export const metadata: Metadata = {
  title: ABOUT.title.es,
  description: ABOUT.description.es,
  alternates: {
    canonical: "/es/sobre-la-web",
    languages: { en: "/about", es: "/es/sobre-la-web", "x-default": "/about" },
  },
};

export default function Page() {
  return <InfoPageView page={ABOUT} locale="es" />;
}
