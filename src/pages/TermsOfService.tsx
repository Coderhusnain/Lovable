import Layout from "@/components/layout/Layout";

const TermsOfService = () => {
  return (
    <Layout>
      <section className="pt-32 pb-16 bg-white min-h-screen">
        <div className="container-custom max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-gray-500 mb-10">Last updated: August 2026</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">1. About Legalgram</h2>
              <p>
                Legalgram provides self-help legal document templates, document automation tools, and general legal information. By using the site, you agree to these Terms of Service.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Not a Law Firm</h2>
              <p>
                Legalgram is not a law firm and does not provide legal advice. Use of our document templates and tools does not create an attorney client relationship. For advice about your specific situation, please consult a licensed attorney in your jurisdiction.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Your Account</h2>
              <p>
                You are responsible for keeping your account credentials secure and for all activity under your account. You agree to provide accurate information when creating an account or using our services.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Use of Documents</h2>
              <p>
                Documents you create with Legalgram are for your own personal or business use. You are responsible for reviewing every document before use and for ensuring it meets the requirements of your jurisdiction. We recommend having important documents reviewed by a licensed attorney.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Acceptable Use</h2>
              <p>
                You agree not to misuse the service, including attempting to access it by unauthorized means, using it for unlawful purposes, or interfering with its operation for other users.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Limitation of Liability</h2>
              <p>
                The service is provided on an "as is" basis. To the maximum extent permitted by law, Legalgram is not liable for any indirect, incidental, or consequential damages arising from your use of the service or the documents created with it.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">7. Changes to These Terms</h2>
              <p>
                We may update these terms from time to time. Continued use of the service after changes take effect constitutes acceptance of the updated terms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TermsOfService;
