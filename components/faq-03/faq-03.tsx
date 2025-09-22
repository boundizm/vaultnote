"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

const faq = [
  {
    question: "How does VaultNote ensure my data privacy?",
    answer:
      "VaultNote uses end-to-end encryption where all encryption happens in your browser. Your notes are encrypted before they leave your device, and we store only encrypted data. We cannot read your content.",
  },
  {
    question: "Are my notes really deleted automatically?",
    answer:
      "Yes! Notes are automatically deleted after being read once or after a set time period (from minutes to years). You have full control over expiration times, and deletion happens permanently with no way to recover the content.",
  },
  {
    question: "Is VaultNote really free?",
    answer:
      "Yes, VaultNote is completely free with no subscription fees, premium features, or hidden costs. We believe secure communication should be accessible to everyone.",
  },
  {
    question: "Where is my data stored?",
    answer:
      "Your data is stored in Switzerland with some of the world's strongest privacy laws. We use Swiss data centers that comply with GDPR and Swiss data protection regulations.",
  },
  {
    question: "Can I trust that my data is secure?",
    answer:
      "VaultNote uses military-grade AES-256 encryption and zero-knowledge architecture. Your encryption keys never leave your browser, and we have no access to your content.",
  },
  {
    question: "How does the encryption work?",
    answer:
      "All encryption happens client-side in your browser using the Web Crypto API. Your encryption key is generated locally and never sent to our servers. This ensures true zero-knowledge security.",
  },
  {
    question: "What happens if I lose the link?",
    answer:
      "If you lose the link, the note cannot be recovered. This is by design for security - only people with the direct link can access the note. Make sure to share links securely.",
  },
  {
    question: "Can I edit or update a note after sending?",
    answer:
      "No, notes cannot be edited after creation for security reasons. If you need to make changes, create a new note. This ensures the integrity and immutability of shared information.",
  },
  {
    question: "Are there any file size limits?",
    answer:
      "Notes are limited to text content only for security and performance reasons. We don't support file uploads to maintain our zero-knowledge architecture and fast loading times.",
  },
  {
    question: "How do I contact support?",
    answer:
      "VaultNote is open source and community-driven. For questions or issues, please visit our GitHub repository or create an issue. We don't offer direct customer support.",
  },
];
const FAQ03 = () => {
  const [value, setValue] = useState<string>();

  return (
    <div className="py-16 sm:py-32 bg-muted/20">
      <div className="max-w-screen-xl mx-auto w-full py-12 xs:py-20 px-6">
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-12">
          Frequently Asked Questions
        </h2>

        <div className="w-full grid md:grid-cols-2 gap-x-10 gap-y-6">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={value}
            onValueChange={setValue}
          >
            {faq.slice(0, 5).map(({ question, answer }, index) => (
              <AccordionItem key={question} value={`question-${index}`}>
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger
                    className={cn(
                      "flex flex-1 items-center justify-between py-4 font-semibold transition-all hover:underline [&[data-state=open]>svg]:rotate-45",
                      "text-start text-lg"
                    )}
                  >
                    {question}
                    <PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionContent className="text-base text-muted-foreground text-pretty">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={value}
            onValueChange={setValue}
          >
            {faq.slice(5).map(({ question, answer }, index) => (
              <AccordionItem key={question} value={`question-${index + 5}`}>
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger
                    className={cn(
                      "flex flex-1 items-center justify-between py-4 font-semibold tracking-tight transition-all hover:underline [&[data-state=open]>svg]:rotate-45",
                      "text-start text-lg"
                    )}
                  >
                    {question}
                    <PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionContent className="text-base text-muted-foreground text-pretty">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ03;
