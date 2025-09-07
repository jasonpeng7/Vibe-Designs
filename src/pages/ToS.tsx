const TermsOfService = () => {
  return (
    <div className="bg-background text-foreground min-h-screen py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="text-4xl font-bold mb-8 hero-text">Terms of Service</h1>

        <div className="space-y-8 text-muted-foreground">
          <section>
            <p className="text-sm text-muted-foreground text-yellow-100">
              Effective Date: 9/7/25
            </p>
          </section>

          <section>
            <p>
              Welcome to ViBE Design (“we,” “our,” or “us”). By accessing or
              using our website and services, you agree to the following Terms
              of Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              1. Use of Our Website
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>You agree to use our website only for lawful purposes.</li>
              <li>
                You must not attempt to disrupt or interfere with the security,
                functionality, or content of the site.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              2. Services
            </h2>
            <p>
              We provide creative web design and development services. The
              scope, timeline, and pricing of any project will be defined in a
              separate written agreement or proposal with clients.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              3. Intellectual Property
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                All content on this site (including text, graphics, logos, and
                designs) is owned by ViBE Design and may not be copied,
                reproduced, or distributed without permission.
              </li>
              <li>
                You retain ownership of any content you provide to us for use in
                your project.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              4. Limitation of Liability
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Our website and services are provided “as is” without warranties
                of any kind.
              </li>
              <li>
                To the fullest extent permitted by law, we are not liable for
                any damages resulting from your use of our website.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              5. Third-Party Links
            </h2>
            <p>
              Our website may contain links to third-party websites. We are not
              responsible for the content, privacy practices, or policies of
              those websites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              6. Termination
            </h2>
            <p>
              We reserve the right to restrict or terminate access to our
              website at any time for misuse or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              7. Changes to These Terms
            </h2>
            <p>
              We may update these Terms of Service from time to time. Updates
              will be posted on this page with a new effective date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              8. Contact Us
            </h2>
            <p>
              For questions about these Terms, contact us at:
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
  );
};

export default TermsOfService;
