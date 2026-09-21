import type { Metadata } from "next";

import { ProcessStepBlock } from "@/components/process/ProcessStep";
import { PageHero } from "@/components/shared/PageHero";
import { PROCESS_STEPS } from "@/data/process";

export const metadata: Metadata = {
  title: "The Process",
  description:
    "A garment does not begin with cloth. It begins with understanding the person who will wear it.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHero title="From measure to garment.">
        <p>A garment does not begin with cloth.</p>
        <p>It begins with understanding the person who will wear it.</p>
      </PageHero>
      {PROCESS_STEPS.map((step, index) => (
        <ProcessStepBlock key={step.number} index={index} {...step} />
      ))}
    </>
  );
}
