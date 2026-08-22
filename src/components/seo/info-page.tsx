import Link from "next/link";
import { Breadcrumbs } from "./seo-parts";
import { SEO_STRINGS } from "./strings";
import { FAQ, FAQ_META, type InfoPage } from "@/lib/info-content";
import { homePath, type SeoLocale } from "@/lib/seo";

/** A plain prose page — about, privacy — rendered from its content object. */
export function InfoPageView({ page, locale }: { page: InfoPage; locale: SeoLocale }) {
  const href = locale === "es" ? `/es/${page.slug.es}` : `/${page.slug.en}`;

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: SEO_STRINGS[locale].home, href: homePath(locale) },
          { name: page.h1[locale], href },
        ]}
      />
      <h1 className="text-2xl font-bold text-zinc-50 sm:text-3xl">{page.h1[locale]}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">{page.intro[locale]}</p>

      {page.sections[locale].map((section) => (
        <section key={section.heading} className="mt-8 max-w-2xl">
          <h2 className="text-lg font-semibold text-zinc-100">{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="mt-2 text-sm leading-relaxed text-zinc-400">
              {paragraph}
            </p>
          ))}
        </section>
      ))}

      <p className="mt-10 text-sm">
        <Link href={homePath(locale)} className="focus-ring rounded text-accent hover:underline">
          {locale === "es" ? "Volver a la base de datos →" : "Back to the database →"}
        </Link>
      </p>
    </>
  );
}

/** The FAQ, which also emits FAQPage structured data. */
export function FaqView({ locale }: { locale: SeoLocale }) {
  const entries = FAQ[locale];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs
        trail={[
          { name: SEO_STRINGS[locale].home, href: homePath(locale) },
          { name: FAQ_META.h1[locale], href: locale === "es" ? "/es/preguntas-frecuentes" : "/faq" },
        ]}
      />
      <h1 className="text-2xl font-bold text-zinc-50 sm:text-3xl">{FAQ_META.h1[locale]}</h1>

      <dl className="mt-6 max-w-2xl">
        {entries.map((entry) => (
          <div key={entry.question} className="border-b border-line py-5 last:border-0">
            <dt className="text-base font-semibold text-zinc-100">{entry.question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-zinc-400">{entry.answer}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-8 text-sm">
        <Link href={homePath(locale)} className="focus-ring rounded text-accent hover:underline">
          {locale === "es" ? "Volver a la base de datos →" : "Back to the database →"}
        </Link>
      </p>
    </>
  );
}
