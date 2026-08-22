import type { Metadata } from "next";
import { InfoPageView } from "@/components/seo/info-page";
import { PRIVACY } from "@/lib/info-content";

export const metadata: Metadata = {
  title: PRIVACY.title.es,
  description: PRIVACY.description.es,
  alternates: {
    canonical: "/es/privacidad",
    languages: { en: "/privacy", es: "/es/privacidad", "x-default": "/privacy" },
  },
};

export default function Page() {
  return <InfoPageView page={PRIVACY} locale="es" />;
}
