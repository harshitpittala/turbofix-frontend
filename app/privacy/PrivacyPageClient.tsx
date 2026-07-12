"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { staggerContainer, fadeInUp } from "@/lib/utils";

/* ─── Types ─────────────────────────────────────────────────────────────── */
type Item   = { kind: "para"; text: string } | { kind: "list"; items: string[] };
type Sub    = { heading?: string; items: Item[] };
type Section = {
  id:   string;
  title: string;
  subs:  Sub[];
};

/* ─── Content ────────────────────────────────────────────────────────────── */
const SECTIONS: Section[] = [
  {
    id: "intro",
    title: "Introduction",
    subs: [
      {
        items: [
          {
            kind: "para",
            text: 'Welcome to TurboFix (“TurboFix”, “we”, “our”, or “us”). TurboFix operates the website turbofix.in and provides mobile device service, doorstep pickup and delivery, diagnostics, maintenance, and related support services.',
          },
          {
            kind: "para",
            text: "This Privacy Policy explains how we collect, use, store, process, and protect your personal information when you use our website, book our services, communicate with us, or interact with our platform.",
          },
          {
            kind: "para",
            text: "By accessing or using TurboFix services, you agree to the practices described in this Privacy Policy.",
          },
        ],
      },
    ],
  },
  {
    id: "collect",
    title: "Information We Collect",
    subs: [
      {
        heading: "Information You Provide Directly",
        items: [
          {
            kind: "list",
            items: [
              "Full Name",
              "Mobile Number",
              "Email Address",
              "Pickup Address",
              "Delivery Address",
              "Device Brand",
              "Device Model",
              "Device IMEI Number (if provided)",
              "Device Condition Details",
              "Service Requests and Requirements",
              "Payment Information",
              "Customer Support Communications",
              "Feedback and Reviews",
            ],
          },
        ],
      },
      {
        heading: "Account and Service Information",
        items: [
          {
            kind: "list",
            items: [
              "Service Orders",
              "Service History",
              "Booking Details",
              "Invoice Records",
              "Warranty Information",
              "Order Tracking Information",
              "Customer Preferences",
            ],
          },
        ],
      },
      {
        heading: "Automatically Collected Information",
        items: [
          {
            kind: "para",
            text: "When you visit our website, we may automatically collect:",
          },
          {
            kind: "list",
            items: [
              "IP Address",
              "Browser Type and Version",
              "Device Information",
              "Operating System",
              "Referral URLs",
              "Website Usage Data",
              "Session Information",
              "Cookies and Similar Technologies",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "use",
    title: "How We Use Your Information",
    subs: [
      {
        heading: "Service Delivery",
        items: [
          {
            kind: "list",
            items: [
              "Process service requests",
              "Schedule pickups and deliveries",
              "Diagnose device issues",
              "Complete service work",
              "Manage warranties",
            ],
          },
        ],
      },
      {
        heading: "Order Management",
        items: [
          {
            kind: "list",
            items: [
              "Generate service tickets",
              "Track service progress",
              "Maintain service records",
              "Generate invoices",
              "Process payments",
            ],
          },
        ],
      },
      {
        heading: "Customer Communication",
        items: [
          {
            kind: "list",
            items: [
              "Confirm service bookings",
              "Provide service status updates",
              "Send pickup and delivery notifications",
              "Respond to customer support requests",
            ],
          },
        ],
      },
      {
        heading: "Platform Improvement",
        items: [
          {
            kind: "list",
            items: [
              "Improve website functionality",
              "Analyze customer usage patterns",
              "Enhance service quality",
              "Develop new features and services",
            ],
          },
        ],
      },
      {
        heading: "Legal and Security Purposes",
        items: [
          {
            kind: "list",
            items: [
              "Prevent fraud and abuse",
              "Verify customer identity",
              "Protect platform security",
              "Comply with legal obligations",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "device",
    title: "Device Data & Privacy",
    subs: [
      {
        items: [
          {
            kind: "para",
            text: "TurboFix respects the privacy of data stored on customer devices. Our technicians do not intentionally access, copy, modify, or share personal content stored on customer devices, including:",
          },
          {
            kind: "list",
            items: ["Photos", "Videos", "Contacts", "Messages", "Emails", "Documents", "Personal Files"],
          },
          {
            kind: "para",
            text: "However, certain services may require device testing to verify functionality afterward. Customers are strongly advised to:",
          },
          {
            kind: "list",
            items: [
              "Back up all important data before submitting a device for service.",
              "Remove confidential information whenever possible.",
              "Disable security locks only when necessary for diagnostics.",
            ],
          },
          {
            kind: "para",
            text: "TurboFix is not responsible for data loss caused by existing hardware failures, existing software corruption, device manufacturer limitations, pre-existing device defects, or unavoidable service procedures.",
          },
        ],
      },
    ],
  },
  {
    id: "payments",
    title: "Payments",
    subs: [
      {
        items: [
          {
            kind: "para",
            text: "TurboFix may accept payments through:",
          },
          {
            kind: "list",
            items: [
              "UPI",
              "Debit Cards",
              "Credit Cards",
              "Net Banking",
              "Digital Wallets",
              "Online Payment Gateways",
              "Cash Payments (where available)",
            ],
          },
          {
            kind: "para",
            text: "Payment transactions may be processed by trusted third-party payment providers. TurboFix does not store complete payment card details on its servers.",
          },
        ],
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies & Analytics",
    subs: [
      {
        items: [
          {
            kind: "para",
            text: "TurboFix uses cookies and similar technologies to improve user experience.",
          },
        ],
      },
      {
        heading: "Essential Cookies",
        items: [
          {
            kind: "list",
            items: [
              "Login functionality",
              "Session management",
              "Website security",
              "Service availability",
            ],
          },
        ],
      },
      {
        heading: "Analytics Cookies",
        items: [
          {
            kind: "list",
            items: [
              "Understanding website traffic",
              "Measuring user engagement",
              "Improving website performance",
              "Optimizing customer experience",
            ],
          },
        ],
      },
      {
        items: [
          {
            kind: "para",
            text: "You may disable cookies through your browser settings, although some website features may not function properly.",
          },
        ],
      },
    ],
  },
  {
    id: "communications",
    title: "Communications",
    subs: [
      {
        items: [
          {
            kind: "para",
            text: "TurboFix may contact you through:",
          },
          {
            kind: "list",
            items: ["SMS", "WhatsApp", "Email", "Phone Calls", "Push Notifications (if applicable)"],
          },
          {
            kind: "para",
            text: "These communications may include:",
          },
          {
            kind: "list",
            items: [
              "Booking confirmations",
              "Service status updates",
              "Pickup and delivery notifications",
              "Invoice notifications",
              "Service reminders",
              "Customer support responses",
            ],
          },
          {
            kind: "para",
            text: "Where legally required, marketing communications will only be sent with your consent. You may opt out of promotional communications at any time.",
          },
        ],
      },
    ],
  },
  {
    id: "sharing",
    title: "Sharing of Information",
    subs: [
      {
        items: [
          {
            kind: "para",
            text: "TurboFix does not sell customer personal information. We may share information only when necessary with:",
          },
        ],
      },
      {
        heading: "Service Providers",
        items: [
          {
            kind: "list",
            items: [
              "Cloud Hosting Providers",
              "Website Infrastructure Providers",
              "CRM Platforms",
              "Analytics Providers",
            ],
          },
        ],
      },
      {
        heading: "Payment Providers",
        items: [
          {
            kind: "list",
            items: ["Payment Gateways", "Banking Partners", "Financial Service Providers"],
          },
        ],
      },
      {
        heading: "Logistics Partners",
        items: [
          {
            kind: "list",
            items: ["Pickup Agents", "Delivery Personnel", "Courier Partners"],
          },
        ],
      },
      {
        heading: "Legal Authorities",
        items: [
          {
            kind: "para",
            text: "Where required by law, court order, regulatory authority, or governmental request.",
          },
        ],
      },
    ],
  },
  {
    id: "security",
    title: "Data Security",
    subs: [
      {
        items: [
          {
            kind: "para",
            text: "TurboFix takes reasonable technical and organizational measures to protect personal information. Security measures may include:",
          },
          {
            kind: "list",
            items: [
              "Secure Servers",
              "SSL Encryption",
              "Access Controls",
              "Authentication Systems",
              "Database Security Controls",
              "Regular Monitoring and Auditing",
            ],
          },
          {
            kind: "para",
            text: "While we strive to protect your information, no online platform can guarantee absolute security.",
          },
        ],
      },
    ],
  },
  {
    id: "retention",
    title: "Data Retention",
    subs: [
      {
        items: [
          {
            kind: "para",
            text: "TurboFix retains personal information only for as long as necessary to:",
          },
          {
            kind: "list",
            items: [
              "Complete service work",
              "Fulfill warranty obligations",
              "Maintain service history",
              "Process payments",
              "Comply with legal requirements",
              "Resolve disputes",
            ],
          },
          {
            kind: "para",
            text: "When information is no longer required, it will be securely deleted or anonymized where feasible.",
          },
        ],
      },
    ],
  },
  {
    id: "rights",
    title: "Your Rights",
    subs: [
      {
        items: [
          {
            kind: "para",
            text: "Subject to applicable laws, you may have the right to:",
          },
        ],
      },
      {
        heading: "Right to Access",
        items: [{ kind: "para", text: "Request access to personal information held by TurboFix." }],
      },
      {
        heading: "Right to Correction",
        items: [{ kind: "para", text: "Request correction of inaccurate or incomplete information." }],
      },
      {
        heading: "Right to Deletion",
        items: [
          {
            kind: "para",
            text: "Request deletion of personal information, subject to legal and operational requirements.",
          },
        ],
      },
      {
        heading: "Right to Withdraw Consent",
        items: [
          {
            kind: "para",
            text: "Withdraw previously provided consent where processing relies on consent.",
          },
        ],
      },
      {
        heading: "Right to Object",
        items: [{ kind: "para", text: "Object to certain uses of your personal information." }],
      },
      {
        heading: "Right to Lodge a Complaint",
        items: [
          {
            kind: "para",
            text: "Raise concerns regarding how your personal information is handled.",
          },
        ],
      },
    ],
  },
  {
    id: "third-party",
    title: "Third-Party Links",
    subs: [
      {
        items: [
          {
            kind: "para",
            text: "The TurboFix website may contain links to third-party websites. We are not responsible for the privacy practices, content, or policies of external websites. Users should review the privacy policies of those websites separately.",
          },
        ],
      },
    ],
  },
  {
    id: "children",
    title: "Children's Privacy",
    subs: [
      {
        items: [
          {
            kind: "para",
            text: "TurboFix services are intended for individuals who are legally capable of entering into contracts under applicable laws. We do not knowingly collect personal information from individuals under 18 years of age without parental or guardian consent.",
          },
        ],
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to this Privacy Policy",
    subs: [
      {
        items: [
          {
            kind: "para",
            text: 'TurboFix may update this Privacy Policy periodically. Any updates will be posted on this page with a revised "Last Updated" date. Continued use of our services after changes become effective constitutes acceptance of the revised Privacy Policy.',
          },
        ],
      },
    ],
  },
];

/* ─── Sub-renderer ───────────────────────────────────────────────────────── */
function RenderItems({ items }: { items: Item[] }) {
  return (
    <>
      {items.map((item, i) =>
        item.kind === "para" ? (
          <p key={i} className="text-gray-400 leading-relaxed mb-3 last:mb-0">
            {item.text}
          </p>
        ) : (
          <ul key={i} className="mt-2 mb-3 last:mb-0 space-y-1.5 pl-1">
            {item.items.map((li) => (
              <li key={li} className="flex items-start gap-2.5 text-gray-400 text-sm leading-relaxed">
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "#00AAFF" }}
                />
                {li}
              </li>
            ))}
          </ul>
        )
      )}
    </>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function PrivacyPageClient() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#02040F]" />
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 radial-glow" />
        <div className="container relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeInUp} className="flex justify-center mb-4">
              <span className="section-label">Legal</span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="font-display text-5xl md:text-6xl font-bold mb-5"
            >
              Privacy <span className="gradient-text">Policy</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-gray-400 text-lg">
              Last Updated: May 31, 2026
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="relative py-16 pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="container relative max-w-4xl mx-auto px-4 sm:px-6">

          {/* Intro banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl p-8 mb-10"
            style={{
              background: "rgba(0,170,255,0.05)",
              border: "1px solid rgba(0,170,255,0.2)",
            }}
          >
            <p className="text-gray-300 leading-relaxed">
              At TurboFix, we are committed to protecting your privacy and ensuring the security of
              your personal data. This Privacy Policy explains how we collect, use, store, process,
              and protect your personal information when you use our website, book our services,
              communicate with us, or interact with our platform.
            </p>
          </motion.div>

          {/* Section cards */}
          <div className="space-y-6">
            {SECTIONS.map((section, si) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(si * 0.04, 0.3) }}
                className="rounded-2xl p-7"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Section title */}
                <h2 className="text-white font-bold text-xl mb-5 flex items-center gap-3">
                  <span
                    className="w-1.5 h-5 rounded-full shrink-0"
                    style={{ background: "linear-gradient(180deg,#0066FF,#00AAFF)" }}
                  />
                  {section.title}
                </h2>

                {/* Sub-sections */}
                <div className="space-y-5">
                  {section.subs.map((sub, sj) => (
                    <div key={sj}>
                      {sub.heading && (
                        <h3 className="text-[#00AAFF] font-semibold text-sm uppercase tracking-wider mb-2">
                          {sub.heading}
                        </h3>
                      )}
                      <RenderItems items={sub.items} />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 rounded-2xl p-8"
            style={{
              background: "rgba(0,170,255,0.05)",
              border: "1px solid rgba(0,170,255,0.2)",
            }}
          >
            <h2 className="text-white font-bold text-xl mb-4 flex items-center gap-3">
              <span
                className="w-1.5 h-5 rounded-full shrink-0"
                style={{ background: "linear-gradient(180deg,#0066FF,#00AAFF)" }}
              />
              Contact Us
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              If you have any questions, requests, or concerns regarding this Privacy Policy or
              your personal information, please contact us:
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300 font-semibold">TurboFix</p>
              <p className="text-gray-400">
                Website:{" "}
                <a
                  href="https://turbofix.in"
                  className="text-[#00AAFF] hover:underline"
                >
                  https://turbofix.in
                </a>
              </p>
              <p className="text-gray-400">
                Email:{" "}
                <a
                  href="mailto:support@turbofix.in"
                  className="text-[#00AAFF] hover:underline"
                >
                  support@turbofix.in
                </a>
              </p>
              <p className="text-gray-400">
                Customer Support: Available through the TurboFix website and official communication
                channels.
              </p>
            </div>
            <p className="text-gray-500 text-xs mt-6 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              By using TurboFix services, you acknowledge that you have read, understood, and agreed
              to this Privacy Policy.
            </p>
          </motion.div>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-gray-500 text-sm mb-4">
              Questions about our privacy practices?
            </p>
            <Link
              href="/contact"
              className="btn-neon inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
