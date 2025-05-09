"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/lib/mock-data";

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  if (!faqs || faqs.length === 0) {
    return <p className="text-muted-foreground">No FAQs found for this topic.</p>;
  }
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq) => (
        <AccordionItem value={faq.id} key={faq.id} className="border-b border-border/80">
          <AccordionTrigger className="text-left hover:no-underline text-base py-4 font-medium">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground pb-4 pt-1 text-sm leading-relaxed">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
