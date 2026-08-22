import type { Metadata } from "next";
import { FaqView } from "@/components/seo/info-page";
import { FAQ_META } from "@/lib/info-content";

export const metadata: Metadata = {
  title: FAQ_META.title.en,
  description: FAQ_META.description.en,
  alternates: {
    canonical: "/faq",
    languages: { en: "/faq", es: "/es/preguntas-frecuentes", "x-default": "/faq" },
  },
};

export default function Page() {
  return <FaqView locale="en" />;
}
