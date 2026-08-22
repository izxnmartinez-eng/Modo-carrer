import type { Metadata } from "next";
import { FaqView } from "@/components/seo/info-page";
import { FAQ_META } from "@/lib/info-content";

export const metadata: Metadata = {
  title: FAQ_META.title.es,
  description: FAQ_META.description.es,
  alternates: {
    canonical: "/es/preguntas-frecuentes",
    languages: { en: "/faq", es: "/es/preguntas-frecuentes", "x-default": "/faq" },
  },
};

export default function Page() {
  return <FaqView locale="es" />;
}
