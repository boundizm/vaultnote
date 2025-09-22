'use client';

import Link from 'next/link';
import { Lock, FileText, AlertTriangle, Scale } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TermsOfService() {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <Lock className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight">VaultNote</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <motion.div variants={fadeUp} initial="initial" animate="animate">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Terms of Service</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex items-center space-x-3 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <FileText className="h-8 w-8 text-blue-500" />
                <div>
                  <h3 className="font-semibold text-blue-700 dark:text-blue-400">Clear Terms</h3>
                  <p className="text-sm text-muted-foreground">Transparent usage agreement</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <Scale className="h-8 w-8 text-orange-500" />
                <div>
                  <h3 className="font-semibold text-orange-700 dark:text-orange-400">Fair Use</h3>
                  <p className="text-sm text-muted-foreground">Balanced service terms</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                <AlertTriangle className="h-8 w-8 text-red-500" />
                <div>
                  <h3 className="font-semibold text-red-700 dark:text-red-400">Compliance</h3>
                  <p className="text-sm text-muted-foreground">Legal requirements</p>
                </div>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By accessing and using VaultNote ("the Service"), you accept and agree to be bound by the terms
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                VaultNote is a zero-knowledge encrypted note-taking service that allows users to create,
                store, and share encrypted notes. The service operates on a zero-knowledge architecture,
                meaning we cannot access the content of your encrypted notes.
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Create and store encrypted notes</li>
                <li>Set expiration times for notes</li>
                <li>Share notes via secure links</li>
                <li>Optional account creation for better organization</li>
                <li>Mobile-responsive interface</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>

              <h3 className="text-xl font-semibold mb-3">3.1 Account Creation</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Account creation is optional</li>
                <li>You may use the service without creating an account</li>
                <li>Accounts are free and do not require payment information</li>
                <li>You are responsible for maintaining account security</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">3.2 Account Responsibilities</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Provide accurate registration information</li>
                <li>Maintain confidentiality of login credentials</li>
                <li>Notify us immediately of unauthorized account access</li>
                <li>You are responsible for all activities under your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Acceptable Use Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree not to use the Service to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Transmit harmful, threatening, or offensive content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use the service for spam or unsolicited communications</li>
                <li>Distribute malware or engage in hacking activities</li>
                <li>Create notes that promote illegal activities</li>
                <li>Share content that violates intellectual property rights</li>
                <li>Overload our servers with excessive requests</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Content and Data</h2>

              <h3 className="text-xl font-semibold mb-3">5.1 Your Content</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>You retain ownership of all content you create</li>
                <li>You are responsible for the content of your notes</li>
                <li>We do not claim any rights to your content</li>
                <li>You grant us limited rights to store and transmit your content</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">5.2 Data Retention</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Notes are automatically deleted after expiration</li>
                <li>Account data is retained until account deletion</li>
                <li>We may delete inactive accounts after 12 months</li>
                <li>Backups are maintained for disaster recovery purposes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Service Availability</h2>

              <h3 className="text-xl font-semibold mb-3">6.1 Service Levels</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>We strive for 99.9% uptime for the service</li>
                <li>Scheduled maintenance will be communicated in advance</li>
                <li>Emergency maintenance may occur without notice</li>
                <li>The service is provided "as is" without warranties</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">6.2 Limitations</h3>
              <p className="text-muted-foreground leading-relaxed">
                The service has reasonable usage limits to ensure fair access for all users.
                Excessive usage may result in temporary restrictions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Privacy and Data Protection</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Your privacy is our priority. Please review our Privacy Policy for detailed information about:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>How we handle your data</li>
                <li>Zero-knowledge encryption implementation</li>
                <li>Swiss data protection compliance</li>
                <li>Your rights regarding personal data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Intellectual Property</h2>

              <h3 className="text-xl font-semibold mb-3">8.1 Our Rights</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>We own all rights to the VaultNote platform and software</li>
                <li>You may not copy, modify, or reverse engineer our service</li>
                <li>Trademarks and branding remain our property</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">8.2 Open Source Components</h3>
              <p className="text-muted-foreground leading-relaxed">
                Some components of our service may be open source. These are licensed under their respective licenses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Termination</h2>

              <h3 className="text-xl font-semibold mb-3">9.1 Termination by You</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may terminate your account at any time through your account settings or by contacting support.
              </p>

              <h3 className="text-xl font-semibold mb-3">9.2 Termination by Us</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may terminate or suspend your account if:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>You violate these terms</li>
                <li>You engage in harmful or illegal activities</li>
                <li>You abuse our service or other users</li>
                <li>Required by law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Disclaimers and Limitations</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND.</strong>
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We disclaim all warranties, express or implied, including but not limited to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Merchantability and fitness for a particular purpose</li>
                <li>Security and availability of the service</li>
                <li>Accuracy or reliability of information</li>
                <li>Non-infringement of third-party rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
                OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF DATA, USE, OR PROFITS.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our total liability shall not exceed the amount paid by you for the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">12. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of material
                changes via email or through our service. Continued use of the service constitutes acceptance
                of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">13. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms are governed by Swiss law. Any disputes arising from these terms or the use
                of our service shall be resolved in the competent courts of Switzerland.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">14. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-muted/50 rounded-lg p-6">
                <p className="text-sm">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:legal@vaultnote.app" className="text-primary hover:underline">
                    legal@vaultnote.app
                  </a>
                </p>
                <p className="text-sm mt-2">
                  <strong>Address:</strong> VaultNote, Switzerland
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/50 mt-16">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2025 VaultNote. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="/status" className="text-sm text-muted-foreground hover:text-foreground">
                System Status
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
