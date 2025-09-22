'use client';

import Link from 'next/link';
import { Shield, ArrowLeft, ChevronDown } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function FAQ() {
  const faqs = [
    {
      question: "How secure is VaultNote?",
      answer: "VaultNote uses AES-256-GCM encryption, the same standard used by governments and banks. Your notes are encrypted in your browser before being sent to our servers, so we never see your data."
    },
    {
      question: "Can VaultNote read my notes?",
      answer: "No. VaultNote uses zero-knowledge encryption, meaning the encryption key never leaves your browser. Even if we wanted to, we couldn't read your notes because we don't have the decryption key."
    },
    {
      question: "What happens when a note self-destructs?",
      answer: "When a note reaches its expiration time or read limit, it's permanently deleted from our servers. This deletion is irreversible - the note cannot be recovered by anyone, including us."
    },
    {
      question: "Where are my notes stored?",
      answer: "Your encrypted notes are stored on servers in Switzerland, which has some of the world's strongest data protection laws. We chose Switzerland specifically for its privacy-focused legal framework."
    },
    {
      question: "Do you track users or collect analytics?",
      answer: "No. We don't use any tracking cookies, analytics, or collect any personal information. We don't even store IP addresses or timestamps with your notes."
    },
    {
      question: "Is VaultNote free?",
      answer: "Yes, VaultNote is completely free to use. There are no premium features, no ads, and no hidden costs. We believe privacy should be accessible to everyone."
    },
    {
      question: "Can I use VaultNote for business?",
      answer: "Absolutely. Many businesses use VaultNote to share sensitive information like passwords, API keys, and confidential documents. The zero-knowledge encryption makes it perfect for business use."
    },
    {
      question: "What if I lose the link to my note?",
      answer: "Unfortunately, if you lose the link, the note cannot be recovered. This is by design - we don't store any way to identify or recover notes without the original link and encryption key."
    },
    {
      question: "How long can notes be stored?",
      answer: "You can set notes to expire anywhere from 5 minutes to 30 days. If no expiration is set, notes will automatically delete after 30 days for security reasons."
    },
    {
      question: "Is the source code available?",
      answer: "Yes, VaultNote is open source. You can review our code on GitHub to verify our security claims and contribute to the project."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center dark:bg-gray-100">
                <Shield className="h-5 w-5 text-white dark:text-gray-900" />
              </div>
              <span className="text-lg font-semibold text-foreground">VaultNote</span>
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link href="/create" className="btn-primary">
                Create Note
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about VaultNote's security, privacy, and features.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details key={index} className="card p-6 group">
                <summary className="flex justify-between items-center cursor-pointer">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Still have questions?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We're here to help. Reach out to our support team.
          </p>
          <Link href="/contact" className="btn-primary text-lg px-8 py-4">
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  );
}
