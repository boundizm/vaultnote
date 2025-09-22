import {
  Shield,
  Lock,
  Clock,
  Zap,
  Eye,
  MapPin,
} from "lucide-react";
import React from "react";

const features = [
  {
    icon: Shield,
    title: "End-to-End Encrypted",
    description:
      "Military-grade AES-256 encryption protects your notes from the moment you create them.",
  },
  {
    icon: Lock,
    title: "Zero-Knowledge",
    description:
      "We cannot read your notes. The encryption keys exist only in your browser.",
  },
  {
    icon: Clock,
    title: "Automatic Self-Destruction",
    description:
      "Notes automatically delete after being read or after a set time period.",
  },
  {
    icon: Zap,
    title: "Instant Encryption",
    description:
      "All encryption happens instantly in your browser before any data leaves your device.",
  },
  {
    icon: Eye,
    title: "One-Time Reading",
    description:
      "Notes are automatically deleted after being viewed once for maximum security.",
  },
  {
    icon: MapPin,
    title: "Swiss Privacy Laws",
    description:
      "Hosted in Switzerland with some of the world's strongest privacy regulations.",
  },
];

const Features01Page = () => {
  return (
    <div className="py-32 bg-muted/5 dark:bg-muted/10">
      <div className="max-w-screen-xl mx-auto w-full py-12 xs:py-20 px-6">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight sm:max-w-xl text-pretty sm:mx-auto sm:text-center">
          Everything you need for secure communication
        </h2>
        <p className="mt-2 text-muted-foreground text-lg sm:text-xl sm:text-center">
          Built with modern cryptography and designed for maximum privacy.
        </p>
        <div className="mt-12 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col border border-border/50 rounded-xl py-6 px-5 bg-card/50 hover:bg-card/80 transition-colors"
            >
              <div className="mb-4 h-12 w-12 flex items-center justify-center bg-primary/10 rounded-full">
                <feature.icon className="size-6 text-primary" />
              </div>
              <span className="text-lg font-semibold">{feature.title}</span>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features01Page;
