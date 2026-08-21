import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Shield, AlertTriangle, CheckCircle, Users, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getDocumentContent } from "@/data/documentContent";

const GiftAffidavitInfo = () => {
  const navigate = useNavigate();
  const doc = getDocumentContent("Gift Affidavit");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/forms')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Forms
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{doc.title}</h1>
            <p className="text-lg text-gray-600 whitespace-pre-line">{doc.whatIs}</p>
            {doc.otherNames?.length ? (
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {doc.otherNames.map((name) => (
                  <span key={name} className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-sm font-medium">
                    {name}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                What is a Gift Affidavit?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 whitespace-pre-line">{doc.whatIs}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                When is a Gift Affidavit Required?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                {doc.whenToUse.map((item) => (
                  <div key={item} className="flex items-start">
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Key Elements of a Gift Affidavit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Gift Giver Information</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      {doc.whatYouNeed.slice(0, 2).map((item) => <li key={item}>• {item}</li>)}
                    </ul>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Gift Recipient Information</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      {doc.whatYouNeed.slice(1, 3).map((item) => <li key={item}>• {item}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">Gift Details</h4>
                    <ul className="text-purple-700 text-sm space-y-1">
                      {doc.whatYouNeed.slice(2, 6).map((item) => <li key={item}>• {item}</li>)}
                    </ul>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-800 mb-2">Legal Declarations</h4>
                    <ul className="text-orange-700 text-sm space-y-1">
                      <li>• No payment was made</li>
                      <li>• No loan exists</li>
                      <li>• Voluntary transfer</li>
                      <li>• No conditions attached</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Important Legal and Tax Considerations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">Federal Gift Tax</h4>
                <p className="text-red-700 text-sm">
                  Certain gifts may require the giver to file a gift tax return depending on the amount and the applicable tax rules.
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-semibold text-amber-800 mb-2">Annual Exclusion</h4>
                <p className="text-amber-700 text-sm">
                  Annual exclusion and filing rules depend on the current tax year and jurisdiction.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Documentation Requirements</h4>
                <p className="text-blue-700 text-sm">
                  Keep copies of the affidavit, bank records showing the transfer, and any supporting documentation.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Situations Requiring Gift Affidavits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Real Estate Transactions</h4>
                  <p className="text-gray-700 text-sm">
                    Mortgage lenders may require gift affidavits when borrowers receive funds from family members for down payments, closing costs, or to pay off debts before closing.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Business Formation</h4>
                  <p className="text-gray-700 text-sm">
                    When starting a business with family funding, a gift affidavit clarifies that the money is not a loan that needs to be repaid.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Financial Aid Applications</h4>
                  <p className="text-gray-700 text-sm">
                    Students may need gift affidavits when family members provide funds for education expenses.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Best Practices for Gift Affidavits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <p><strong>Be Specific:</strong> Include exact amounts, dates, and detailed descriptions of what is being given.</p>
                </div>
                <div className="flex items-start">
                  <p><strong>Notarize the Document:</strong> Have the affidavit signed in front of a notary public to increase its legal validity.</p>
                </div>
                <div className="flex items-start">
                  <p><strong>Keep Bank Records:</strong> Maintain records of the actual transfer, including bank statements and transaction receipts.</p>
                </div>
                <div className="flex items-start">
                  <p><strong>File Promptly:</strong> Complete the affidavit close to the time of the gift transfer for accuracy.</p>
                </div>
                <div className="flex items-start">
                  <p><strong>Consult Professionals:</strong> For large gifts or complex situations, consult with tax professionals or attorneys.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {doc.faqs.map((faq) => (
                  <div key={faq.q} className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                    <p className="text-gray-700">{faq.a}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-600 text-sm whitespace-pre-line">{doc.legalDisclaimer}</p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};


export default GiftAffidavitInfo;
