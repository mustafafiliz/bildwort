import { Suspense } from "react";
import { ReviewSession } from "@/components/vocab/ReviewSession";

export const metadata = { title: "Kelime tekrarı · Bildwort" };

export default function ReviewPage() {
  return (
    <Suspense>
      <ReviewSession />
    </Suspense>
  );
}
