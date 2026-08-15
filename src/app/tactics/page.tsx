import type { Metadata } from "next";
import { TacticsView } from "@/components/tactics/tactics-view";

export const metadata: Metadata = {
  title: "Tactical Hub & Manager Codes — Career Hub",
};

export default function TacticsPage() {
  return <TacticsView />;
}
