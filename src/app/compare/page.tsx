import type { Metadata } from "next";
import { CompareView } from "@/components/squad/compare-view";

export const metadata: Metadata = {
  title: "Player Comparison — Career Hub",
};

export default function ComparePage() {
  return <CompareView />;
}
