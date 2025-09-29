export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-gray-600 mb-8">Last updated: January 1, 2024</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              We collect information you provide directly to us, such as when you create an account, 
              make a purchase, or contact us for support.
            </p>
            <h3 className="text-lg font-semibold">Personal Information:</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Name and contact information (email, phone number, address)</li>
              <li>Payment information (credit card details, billing address)</li>
              <li>Account credentials (username, password)</li>
              <li>Purchase history and preferences</li>
            </ul>
            <h3 className="text-lg font-semibold">Automatically Collected Information:</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent, clicks)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
          <div className="space-y-4 text-gray-700">
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Process and fulfill your orders</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Send you updates about your orders and account</li>
              <li>Improve our products and services</li>
              <li>Personalize your shopping experience</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Prevent fraud and ensure security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
          <div className="space-y-4 text-gray-700">
            <p>We may share your information with:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Service Providers:</strong> Third parties who help us operate our business</li>
              <li><strong>Payment Processors:</strong> To process your payments securely</li>
              <li><strong>Shipping Partners:</strong> To deliver your orders</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with mergers or acquisitions</li>
            </ul>
            <p>We do not sell your personal information to third parties for marketing purposes.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>SSL encryption for data transmission</li>
              <li>Secure servers and databases</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and employee training</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
          <div className="space-y-4 text-gray-700">
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability</li>
              <li>Object to processing in certain circumstances</li>
            </ul>
            <p>
              To exercise these rights, please contact us at privacy@clothestore.com or use the 
              account settings in your profile.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">6. Cookies and Tracking</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              We use cookies and similar technologies to enhance your browsing experience, 
              analyze site traffic, and personalize content.
            </p>
            <p>
              You can control cookies through your browser settings, but disabling cookies may 
              affect the functionality of our website.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">7. Children's Privacy</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Our services are not intended for children under 13 years of age. We do not 
              knowingly collect personal information from children under 13.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">8. International Transfers</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Your information may be transferred to and processed in countries other than your 
              country of residence. We ensure appropriate safeguards are in place for such transfers.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">9. Changes to This Policy</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any 
              material changes by posting the new policy on our website and updating the 
              "Last updated" date.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
          <div className="space-y-4 text-gray-700">
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <ul className="list-none space-y-2 ml-4">
              <li><strong>Email:</strong> privacy@clothestore.com</li>
              <li><strong>Phone:</strong> +1 (555) 123-4567</li>
              <li><strong>Address:</strong> 123 Fashion St, Style City, SC 12345</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}