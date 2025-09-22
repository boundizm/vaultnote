'use client';

import Link from 'next/link';
import { Shield, Lock, ArrowRight, Menu, X, Clock, MapPin } from 'lucide-react';
import { useState } from 'react';
import React from 'react';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import Hero07 from "@/components/hero-07/hero-07";
import Features01 from "@/components/features-01/features-01";
import HowItWorks from "@/components/how-it-works/how-it-works";
import Stats02 from "@/components/stats-02/stats-02";
import FAQ03 from "@/components/faq-03/faq-03";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Animation variants
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-6">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <Lock className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">VAULTNOTE</span>
            </Link>
          </div>

          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <Link href="/" className="transition-colors hover:text-foreground text-muted-foreground">
              Home
            </Link>
            <Link href="/features" className="transition-colors hover:text-foreground text-muted-foreground">
              Features
            </Link>
            <Link href="/security" className="transition-colors hover:text-foreground text-muted-foreground">
              Security
            </Link>
            <Link href="/about" className="transition-colors hover:text-foreground text-muted-foreground">
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button asChild variant="default" size="sm">
              <Link href="/create">
                <Lock className="mr-1.5 h-3.5 w-3.5" />
                Create Note
              </Link>
            </Button>
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-border md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link
                href="/"
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/features"
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/security"
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Security
              </Link>
              <Link
                href="/about"
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm font-medium">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <Hero07 />

      {/* Features Section */}
      <Features01 />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Stats Section */}
      <Stats02 />

      {/* FAQ Section */}
      <FAQ03 />

      {/* CTA Section */}
      <section className="px-6 py-16 sm:py-32 sm:px-8">
        <div className="max-w-screen-xl mx-auto w-full py-12 xs:py-20 px-6">
          <motion.div variants={fadeUp}>
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to secure your communications?
            </h2>
            <p className="mb-12 text-xl text-muted-foreground leading-relaxed">
              Start creating secure, self-destructing notes in seconds. No registration required.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/create">
                  <Lock className="mr-2 h-5 w-5" />
                  Create Secure Note
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base shadow-none"
                asChild
              >
                <Link href="/learn-more">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Learn More
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gradient-to-b from-background to-background/80 border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <Lock className="h-10 w-10 text-primary" />
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-background"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    VaultNote
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">Secure Communication Platform</p>
                </div>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed mb-6 max-w-md">
                Advanced zero-knowledge encryption with Swiss hosting infrastructure.
                Your privacy, secured by design.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center space-x-3 px-3 py-2 bg-green-500/10 rounded-lg border border-green-500/20">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">Zero-Knowledge</span>
                </div>
                <div className="flex items-center space-x-3 px-3 py-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Swiss Hosting</span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">
                Platform
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/create" className="group flex items-center text-muted-foreground hover:text-foreground transition-all duration-200">
                    <span className="text-sm font-medium">Create Secure Note</span>
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Support */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">
                Legal
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <a href="mailto:contact@vaultnote.app" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Contact Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    System Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-border/40">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
                <p className="text-sm text-muted-foreground font-medium">
                  © 2025 VaultNote. All rights reserved.
                </p>
                <div className="flex items-center space-x-6 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🇨🇭</span>
                    <span>Made in Switzerland</span>
                  </div>
                  <span className="text-muted-foreground/50">•</span>
                  <span>Open Source</span>
                  <span className="text-muted-foreground/50">•</span>
                  <span>No Tracking</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <a
                  href="https://github.com/vaultnote"
                  className="group flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted rounded-lg transition-all duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Repository"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="text-sm font-medium">GitHub</span>
                </a>
                <a
                  href="https://discord.gg/vaultnote"
                  className="group flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted rounded-lg transition-all duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord Community"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 3.279 1.793 7.052 0a.077.077 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  <span className="text-sm font-medium">Discord</span>
                </a>
                <a
                  href="https://twitter.com/vaultnote"
                  className="group flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted rounded-lg transition-all duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter/X"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span className="text-sm font-medium">Twitter</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
