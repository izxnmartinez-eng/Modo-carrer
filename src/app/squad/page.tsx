import type { Metadata } from "next";
import { SquadView } from "@/components/squad/squad-view";

export const metadata: Metadata = {
  title: "Squad Planner — Career Hub",
};

export default function SquadPage() {
  return <SquadView />;
}
