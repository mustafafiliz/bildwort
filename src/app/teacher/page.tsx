import { Suspense } from "react";
import { TeacherChat } from "@/components/teacher/TeacherChat";
export const metadata = { title: "AI Öğretmen · Bildwort" };
export default function TeacherPage() {
  return (
    <Suspense>
      <TeacherChat />
    </Suspense>
  );
}
