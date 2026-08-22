import { NotFoundView } from "@/components/seo/not-found-view";

/**
 * Custom 404.
 *
 * With 6,000 static pages and no dynamic fallback, a wrong slug, an old link
 * or an FC 27 player URL all land here. The default Next page is a dead end;
 * this one says which of those probably happened and offers a way onward.
 */
export default function NotFound() {
  return <NotFoundView />;
}
