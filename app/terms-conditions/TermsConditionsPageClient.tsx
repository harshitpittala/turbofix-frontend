"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CTA from "@/components/home/CTA";
import { staggerContainer, fadeInUp } from "@/lib/utils";

export default function TermsConditionsPageClient() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#02040F]" />
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 radial-glow" />

        <div className="container relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeInUp} className="flex justify-center mb-4">
              <span className="section-label">Terms & Conditions</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-6xl font-bold mb-5">
              <span className="gradient-text">TurboFix Policies</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-gray-400 text-lg max-w-2xl mx-auto">
              Complete information about our repair services, warranty coverage, and terms of service.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="container relative max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="prose prose-invert max-w-none"
            style={{
              "--tw-prose-body": "rgb(209, 213, 219)",
              "--tw-prose-headings": "rgb(255, 255, 255)",
              "--tw-prose-links": "rgb(0, 170, 255)",
              "--tw-prose-strong": "rgb(255, 255, 255)",
              "--tw-prose-code": "rgb(156, 163, 175)",
              "--tw-prose-pre-bg": "rgba(0, 0, 0, 0.3)",
              "--tw-prose-th-borders": "rgba(255, 255, 255, 0.1)",
              "--tw-prose-td-borders": "rgba(255, 255, 255, 0.05)",
            } as any}
          >
            {/* How TurboFix Works */}
            <h2 className="text-3xl font-bold text-white mt-0 mb-4">How TurboFix Works?</h2>
            <p>
              TurboFix provides onsite mobile repair services at your convenient time and place. We also provide pickup
              and delivery service, where our field executive will collect your phone, repair it, and deliver it back
              safely.
            </p>
            <p>
              To book an appointment, visit{" "}
              <a href="https://www.turbofix.in" target="_blank" rel="noopener noreferrer">
                TurboFix
              </a>{" "}
              and place a service request directly through the website. Our customer support executive will contact you
              to confirm the order, preferred service location, and expected service time.
            </p>
            <p>
              <strong>Note:</strong> You can also book an appointment through our customer care number:{" "}
              <strong>8884827842</strong>
            </p>

            {/* Warranty Policy */}
            <h2 className="text-3xl font-bold text-white mt-8 mb-4">TurboFix Warranty Policy</h2>
            <p>
              TurboFix offers a <strong>6-month warranty</strong> on Redmi, Oppo, Vivo, and selected mobile screen
              repairs/replacements carried out by us from the date of invoice.
            </p>
            <p>
              We also provide a <strong>3-month warranty</strong> on all other spare parts replaced by TurboFix.
            </p>

            <h3 className="text-2xl font-bold text-white mt-6 mb-3">The 6-Month Warranty Covers:</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-300 mb-4">
              <li>Screen/LCD malfunctioning or not functioning as intended.</li>
              <li>Touch-related display issues arising without physical or manual damage.</li>
              <li>Manufacturing defects related to the replaced screen.</li>
            </ol>
            <p>
              If the screen replaced by TurboFix develops any of the above-mentioned issues, you may claim a replacement
              screen under the continued warranty period.
            </p>

            {/* Warranty Terms */}
            <h3 className="text-2xl font-bold text-white mt-6 mb-3">Warranty Terms</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Warranty is valid only for the specific repaired device and original customer.</li>
              <li>Warranty is non-transferable if the device is sold or handed over to another person.</li>
              <li>The mobile phone must switch on and function normally apart from the screen issue.</li>
              <li>
                If the old damaged screen is not handed over to the technician during repair, warranty validity will be
                limited to 3 months only.
              </li>
            </ol>

            {/* How to Claim Warranty */}
            <h3 className="text-2xl font-bold text-white mt-6 mb-3">How to Claim Warranty?</h3>
            <p>To claim your warranty, you need to:</p>
            <ol className="list-decimal list-inside space-y-2 text-gray-300 mb-4">
              <li>
                Share a video showing the display issue with your device at{" "}
                <a href="mailto:support@turbofix.in">support@turbofix.in</a>
              </li>
              <li>Share your Phone Number / Order Number / IMEI Number via email.</li>
            </ol>
            <p>You can also contact our support team through chat or email for additional assistance.</p>

            {/* Resolution Time */}
            <h3 className="text-2xl font-bold text-white mt-6 mb-3">Warranty Resolution Time</h3>
            <p>
              TurboFix generally resolves warranty-related issues within <strong>48 to 72 hours</strong> after receiving
              your complaint. You will receive an acknowledgement email once your request is registered.
            </p>
            <p>
              Warranty is limited only to the repaired/replaced parts and services paid for during the original repair.
            </p>

            {/* Not Applicable */}
            <h3 className="text-2xl font-bold text-white mt-6 mb-3">Warranty Will Not Apply Under These Conditions</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Any accidental or physical damage after repair.</li>
              <li>Visible lines or blank display issues caused after manual or accidental damage.</li>
              <li>Excessive or critical device damage affecting internal components.</li>
              <li>Bent, twisted, cracked, or heavily damaged frames.</li>
              <li>Hard pressure damage causing display discoloration or lines.</li>
              <li>Accidental drops after repair.</li>
              <li>Water or liquid damage.</li>
              <li>Tampering with internal hardware.</li>
              <li>Damage caused due to self-repair attempts.</li>
              <li>Software-related issues not connected to the repair.</li>
              <li>Rooted or jailbroken devices.</li>
              <li>New damages unrelated to the original repair.</li>
              <li>Data loss during or after repair. Customers are advised to back up data before repair.</li>
              <li>If the issue occurs within 7 days of repair, TurboFix will provide onsite support at your location.</li>
              <li>
                If the same issue occurs after 7 days, the customer may need to visit the TurboFix service center and a
                service charge of ₹499 may apply.
              </li>
              <li>TurboFix is responsible only for the repairs/services performed by us. Any unrelated physical damage is not covered.</li>
            </ol>

            {/* Pre-Repair Conditions */}
            <h3 className="text-2xl font-bold text-white mt-6 mb-3">Warranty Also Does Not Cover</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-300 mb-4">
              <li>Existing manufacturing defects unrelated to the repair.</li>
              <li>Existing frame damage noted before repair.</li>
              <li>Water-damaged devices.</li>
              <li>Rooted or jailbroken devices.</li>
              <li>Internal hardware tampering or unauthorized repair attempts.</li>
            </ol>
            <p>
              Under certain circumstances, internal damage may make repair impossible. Our technicians will explain the
              issue after device diagnosis.
            </p>

            {/* Refund Policy */}
            <h3 className="text-2xl font-bold text-white mt-6 mb-3">Refund Policy</h3>
            <p>
              Refunds are not applicable for spare parts once installed, especially display/screen replacements.
            </p>
            <p>Please refer to your invoice or order confirmation email for more information.</p>

            {/* Not Covered */}
            <h3 className="text-2xl font-bold text-white mt-6 mb-3">What Is Not Covered Under Warranty?</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Water damage</li>
              <li>Physical damage</li>
              <li>Internal hardware failure unrelated to the repair</li>
            </ul>

            {/* Payment Methods */}
            <h3 className="text-2xl font-bold text-white mt-6 mb-3">Payment Methods</h3>
            <p>Customers can make payment through:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
              <li>Cash</li>
              <li>UPI</li>
              <li>Google Pay</li>
              <li>PhonePe</li>
              <li>Paytm</li>
              <li>Online Payment Gateway</li>
            </ul>
            <p>
              <strong>Note:</strong> No extra charges apply for payments made through Cash or UPI apps. A{" "}
              <strong>2.5% convenience fee</strong> may apply for online payment gateway transactions.
            </p>

            {/* Faulty Parts */}
            <h3 className="text-2xl font-bold text-white mt-6 mb-3">Faulty Parts Return Policy</h3>
            <p>
              Replaced faulty parts must be handed over to the TurboFix technician after service completion. Failure to
              do so may void the warranty.
            </p>

            {/* Service Charges */}
            <h3 className="text-2xl font-bold text-white mt-6 mb-3">Service / Visit Charges</h3>
            <p>A minimum service/visit charge of <strong>₹499</strong> will apply in the following situations:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
              <li>Repair declined by the customer</li>
              <li>Device not repaired after inspection</li>
              <li>Estimated repair cost not approved</li>
              <li>Job incomplete due to customer-side reasons</li>
            </ul>

            {/* Copyright Policy */}
            <h3 className="text-2xl font-bold text-white mt-6 mb-3">Copyright Policy</h3>
            <p>
              TurboFix respects the intellectual property rights of others. Any copyright infringement claims related to
              content available on our platform should be reported to:
            </p>
            <p>
              <a href="mailto:support@turbofix.in">support@turbofix.in</a>
              <br />
              <strong>Subject Line:</strong> "Copyright Infringement"
            </p>
            <p>
              Please include a detailed explanation of the alleged infringement along with supporting proof.
            </p>
            <p>
              False or misleading copyright claims may result in legal liability, including damages and legal expenses.
            </p>

            {/* Contact */}
            <h3 className="text-2xl font-bold text-white mt-6 mb-3">Contact Information</h3>
            <p>For support or warranty-related queries:</p>
            <ul className="text-gray-300 space-y-2">
              <li>📧 <a href="mailto:support@turbofix.in">support@turbofix.in</a></li>
              <li>📞 8884827842</li>
              <li>🌐 <a href="https://www.turbofix.in" target="_blank" rel="noopener noreferrer">TurboFix Official Website</a></li>
            </ul>
          </motion.div>
        </div>
      </section>

      <CTA />
    </>
  );
}
