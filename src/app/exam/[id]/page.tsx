import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EXAMS, EXAMS_BY_ID } from "@/content/exams";
import { ExamRunner } from "@/components/exam/ExamRunner";

export function generateStaticParams() {
  return EXAMS.map((e) => ({ id: e.id }));
}

export default async function ExamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!EXAMS_BY_ID[id]) notFound();
  return (
    <Suspense>
      <ExamRunner id={id} />
    </Suspense>
  );
}
