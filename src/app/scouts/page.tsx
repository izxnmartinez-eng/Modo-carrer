import type { Metadata } from "next";
import { ScoutsView } from "@/components/scouts/scouts-view";

export const metadata: Metadata = {
  title: "Scouts & Academy Calculator — Career Hub",
};

export default function ScoutsPage() {
  return <ScoutsView />;
}
