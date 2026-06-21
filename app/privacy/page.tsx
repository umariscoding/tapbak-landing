import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — TapBak",
  description:
    "How TapBak collects, uses, and protects your information when you use our service.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0F0A1F] text-[#D1D5DB]">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <Link
          href="/"
          className="text-[#9CA3AF] hover:text-white transition-colors text-sm"
        >
          ← Back to TapBak
        </Link>

        <h1 className="mt-6 text-3xl md:text-4xl font-bold text-white">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-[#9CA3AF]">
          Last Updated: September 30, 2025
        </p>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              1. Introduction
            </h2>
            <p>
              TapBak (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is
              committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when
              you use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. Information We Collect
            </h2>
            <h3 className="text-lg font-semibold text-white mt-4 mb-2">
              2.1 Information You Provide
            </h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Account information (name, email, business name)</li>
              <li>Payment information</li>
              <li>Business branding (logos, colors, card designs)</li>
              <li>
                Customer data you input (names, phone numbers, email addresses,
                transaction history)
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-4 mb-2">
              2.2 Automatically Collected Information
            </h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                Device information (IP address, browser type, operating system)
              </li>
              <li>Usage data (features used, time spent, interactions)</li>
              <li>Log data (access times, pages viewed, errors)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. How We Use Your Information
            </h2>
            <p>We use your information to:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Provide, maintain, and improve the Service</li>
              <li>Process payments and transactions</li>
              <li>
                Send loyalty cards to customer wallets (Apple Wallet, Google
                Wallet)
              </li>
              <li>Generate QR codes and manage stamp tracking</li>
              <li>Provide analytics and insights</li>
              <li>Send administrative notifications and updates</li>
              <li>Respond to customer support inquiries</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. Data Sharing and Disclosure
            </h2>
            <p>
              We do not sell your personal information. We may share data with:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>
                <strong>Service Providers:</strong> hosting providers and
                Apple/Google (wallet integration)
              </li>
              <li>
                <strong>Legal Compliance:</strong> When required by law or to
                protect our rights
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with mergers,
                acquisitions, or asset sales
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              5. Data Security
            </h2>
            <p>We implement industry-standard security measures including:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Encryption of data in transit (HTTPS/TLS)</li>
              <li>Encryption of data at rest</li>
              <li>JWT-based authentication</li>
              <li>Regular security audits</li>
              <li>Access controls and monitoring</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              6. Data Retention
            </h2>
            <p>
              We retain your data for as long as your account is active or as
              needed to provide services. After account deletion, we may retain
              certain data for legal compliance, dispute resolution, and fraud
              prevention.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              7. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Object to data processing</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, contact us at support@tapbak.com
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              8. GDPR Compliance
            </h2>
            <p>
              For users in the European Economic Area (EEA), we process data
              based on:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Contract performance (providing the Service)</li>
              <li>Consent (where applicable)</li>
              <li>
                Legitimate interests (fraud prevention, service improvement)
              </li>
              <li>Legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              9. Cookies and Tracking
            </h2>
            <p>We use cookies and similar technologies for:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Authentication and session management</li>
              <li>Analytics and performance monitoring</li>
              <li>User preferences</li>
            </ul>
            <p className="mt-2">
              You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              10. Third-Party Services
            </h2>
            <p>Our Service integrates with:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>
                <strong>Apple Wallet:</strong> Subject to Apple&apos;s privacy
                policy
              </li>
              <li>
                <strong>Google Wallet:</strong> Subject to Google&apos;s privacy
                policy
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              11. Children&apos;s Privacy
            </h2>
            <p>
              TapBak is not intended for users under 18. We do not knowingly
              collect data from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              12. International Data Transfers
            </h2>
            <p>
              Your data may be transferred to and processed in countries other
              than your own. We ensure appropriate safeguards are in place for
              such transfers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              13. Changes to Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you
              of significant changes via email or through the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              14. Contact Us
            </h2>
            <p>For privacy-related questions or concerns, contact us at:</p>
            <p className="mt-2">Email: support@tapbak.com</p>
          </section>
        </div>
      </div>
    </main>
  );
}
