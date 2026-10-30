import { notFound } from "next/navigation";
import { SCENARIOS, SCENARIOS_BY_ID } from "@/content/scenarios";
import { SpeakingRoom } from "@/components/practice/SpeakingRoom";

export function generateStaticParams() {
  return SCENARIOS.map((s) => ({ id: s.id }));
}

export default async function SpeakPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!SCENARIOS_BY_ID[id]) notFound();
  return <SpeakingRoom id={id} />;
}
