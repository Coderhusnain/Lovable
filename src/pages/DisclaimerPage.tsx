import Layout from "@/components/layout/Layout";

const DisclaimerPage = () => {
  return (
    <Layout>
      <section className="pt-24 pb-10 bg-white min-h-screen">
        <div className="container-custom max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Legal Disclaimer</h1>
          <p className="text-gray-500 mb-10">Last updated: August 2026</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No Legal Advice</h2>
              <p>
                The information, documents, and tools available on Legalgram are provided for general informational purposes only and do not constitute legal advice. Legalgram is not a law firm, and no attorney client relationship is created by your use of this site.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Documents Are Templates</h2>
              <p>
                Documents generated on Legalgram, including documents drafted with the help of our AI assistant, are templates based on the information you provide. They have not been reviewed by a licensed attorney. Laws vary by jurisdiction and change over time, and a template may not fit your specific circumstances.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Consult an Attorney</h2>
              <p>
                For any matter that is important to you, we strongly recommend having your documents reviewed by a licensed attorney in your jurisdiction before signing or relying on them. If you need help finding legal counsel, our consultation service can connect you with a professional.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No Guarantee of Outcomes</h2>
              <p>
                While we work hard to keep our templates accurate and up to date, we make no warranties about the completeness, reliability, or suitability of any document or information on this site, and we are not responsible for any outcome resulting from their use.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DisclaimerPage;
