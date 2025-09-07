import SEO from "@/components/SEO";

const PrivacyPolicy = () => {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Read the Privacy Policy for ViBE Design to understand how we collect, use, and protect your personal information."
      />
      <div className="bg-background text-foreground min-h-screen py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-bold mb-8 hero-text">Privacy Policy</h1>

          <div className="space-y-8 text-muted-foreground">
            <section>
              <p className="text-sm text-muted-foreground text-yellow-100">
                Effective Date: 9/7/25
              </p>
            </section>

            <section>
              <p>
                ViBE Design (“we,” “our,” or “us”) respects your privacy and is
                committed to protecting the personal information you share with
                us. This Privacy Policy explains how we collect, use, and
                safeguard your information when you visit our website or
                interact with our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">
                1. Information We Collect
              </h2>
              <p>
                We only collect the following personal information when you
                voluntarily provide it through forms on our website:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Name</li>
                <li>Email address</li>
              </ul>
              <p className="mt-4">
                We do not collect sensitive personal information such as payment
                details, government IDs, or health-related data through this
                website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">
                2. How We Use Your Information
              </h2>
              <p>We use the information you provide to:</p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Respond to inquiries and communicate with you.</li>
                <li>Provide information about our services.</li>
                <li>Improve our website and offerings.</li>
              </ul>
              <p className="mt-4">
                We will not sell, rent, or share your information with third
                parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">
                3. Your Rights
              </h2>
              <p>
                You have the right to request access to, correction of, or
                deletion of your personal information at any time. To exercise
                these rights, please contact us at{" "}
                <a
                  href="mailto:vbewebdesign@gmail.com"
                  className="text-accent hover:underline"
                >
                  vbewebdesign@gmail.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">
                6. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Updates
                will be posted on this page with a new effective date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">
                7. Contact Us
              </h2>
              <p>
                If you have any questions, please contact us at:
                <br />
                <a
                  href="mailto:vbewebdesign@gmail.com"
                  className="text-accent hover:underline"
                >
                  vbewebdesign@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
