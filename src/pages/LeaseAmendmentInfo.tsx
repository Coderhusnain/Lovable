import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Users, Calendar, BookOpen, Lock } from "lucide-react";
import { getDocumentContent } from "@/data/documentContent";

const LeaseAmendmentInfo = () => {
  const navigate = useNavigate();
  const doc = getDocumentContent("Lease Amendment Agreement");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/documents')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Documents
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{doc.title}</h1>
            <p className="text-lg text-gray-600">{doc.whatIs}</p>

            {doc.otherNames && doc.otherNames.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {doc.otherNames.map((name) => (
                  <span
                    key={name}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full"
                  >
                    {name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                What Is a {doc.title}?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{doc.whatIs}</p>
            </CardContent>
          </Card>

          {doc.whenToUse && doc.whenToUse.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  When to Use
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  {doc.whenToUse.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Key Protections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {(doc.keyProtections || []).map((protection, index) => (
                  <div key={index} className="flex items-start gap-3 bg-blue-50 rounded-lg p-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <span className="text-gray-700 text-sm">{protection}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                What You Need
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid md:grid-cols-2 gap-3">
                {(doc.whatYouNeed || []).map((item, index) => (
                  <li key={index} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                FAQ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(doc.faqs || []).map((faq, index) => (
                  <div key={index} className="p-4 bg-orange-50 border-l-4 border-orange-400 rounded-r-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                    <p className="text-sm text-gray-700">{faq.a}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Ready to Create Your {doc.title}?</h3>
              <p className="text-gray-600 mb-4">
                {doc.estimatedTime ? `Estimated time: ${doc.estimatedTime}. ` : ""}Our guided form will help you create a comprehensive and legally sound lease amendment that properly modifies your existing lease agreement.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeaseAmendmentInfo;
