import Layout from "@/components/layout/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <section className="pt-32 pb-16 bg-white min-h-screen">
        <div className="container-custom max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-500 mb-10">Last updated: August 2026</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Information We Collect</h2>
              <p>
                When you use Legalgram, we collect the information you provide directly to us, including your name, email address, phone number, and the details you enter while creating legal documents or requesting consultations. We also collect basic usage information that helps us improve the service.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">2. How We Use Your Information</h2>
              <p>
                We use your information to provide our services: creating your legal documents, managing your account, responding to consultation requests, and sending emails you have subscribed to, such as our weekly legal tips. We do not sell your personal information to third parties.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Document Confidentiality</h2>
              <p>
                The information you enter while creating legal documents is used solely to generate your documents. We treat this information as confidential and protect it with industry standard security measures, including encryption in transit and at rest.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Data Storage and Security</h2>
              <p>
                Your data is stored securely with our infrastructure providers. We take reasonable technical and organizational measures to protect it against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Your Rights</h2>
              <p>
                You may access, update, or delete your personal information at any time from your account dashboard, or by contacting us. You can unsubscribe from our emails using the link included in every message.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or how your information is handled, please reach out through our contact page and we will respond promptly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
