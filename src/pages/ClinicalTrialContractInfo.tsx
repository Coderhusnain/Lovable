import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  FileText,
  Shield,
  Users,
  Download,
  Hospital,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const InfoBadge = ({ icon: Icon, title, children, className = "" }) => (
  <div className={`bg-white border border-gray-100 rounded-lg p-4 shadow-sm ${className}`}>
    <div className="flex items-start">
      <div className="flex-shrink-0 mr-3 mt-0.5">
        <Icon className="w-6 h-6 text-indigo-600" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <div className="text-gray-700 text-sm mt-1">{children}</div>
      </div>
    </div>
  </div>
);

const ClinicalTrialContractInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/documents")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Contracts
          </Button>

          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <FileText className="w-8 h-8 text-indigo-700" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Clinical Trial Agreement Information</h1>
            <p className="text-lg text-gray-600">Clinical Trial Agreement • Clinical Trial Agreement Form</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-sky-600" />
                What Is a Clinical Trial Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                A <strong>Clinical Trial Agreement (CTA)</strong> is a legally binding contract used when commercial
                products—such as pharmaceuticals, medical devices, or cosmetics—are tested on human participants prior to
                approval or sale. The agreement is entered into between the product developer or sponsor and a qualified
                institution (for example, a research university, hospital, or clinical research organization).
              </p>

              <p className="text-gray-700">
                A properly drafted CTA addresses legal, regulatory, and ethical issues related to human subject research,
                including allocation of risk and liability, protection of participant rights, data ownership,
                confidentiality, and regulatory compliance. Using the best format of Clinical Trial Agreement helps ensure
                transparency and legal certainty for all parties.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Hospital className="w-5 h-5 mr-2 text-green-600" />
                What Does a Draft Clinical Trial Agreement Cover?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Investigational Product:</strong> The product or investigational drug/device supplied by the sponsor.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Funding:</strong> Any financial support, funding, or reimbursement provided for the trial.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Confidentiality:</strong> Access to proprietary or confidential information and data protection terms.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Institution Responsibilities:</strong> The institution’s obligation to conduct the trial and deliver research data.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p><strong>Publications & IP:</strong> Rights related to publication of results and future intellectual property development.</p>
                </div>
              </div>

              <p className="text-gray-700 mt-2">
                The Clinical Trial Agreement on Legalgram ensures that each party’s contributions and expectations are clearly documented and legally enforceable.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                When Should You Use a Clinical Trial Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>When a company or sponsor commissions a clinical trial to test a product.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>When you represent an institution that conducts clinical trials and need formal agreements.</p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>When you developed a product that must undergo clinical testing before commercialization.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-indigo-600" />
                Why Use the Best Format of Clinical Trial Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <InfoBadge icon={FileText} title="Proven Template">
                  This agreement has been customized over <strong>2,800</strong> times, demonstrating reliability and practical value.
                </InfoBadge>

                <InfoBadge icon={Shield} title="Legal Review Recommended">
                  Because clinical trials are highly regulated, consult a Legal Pro to review the agreement before execution.
                </InfoBadge>

                <InfoBadge icon={Hospital} title="Regulatory Compliance">
                  Designed to address regulatory and ethical obligations required for human subject research.
                </InfoBadge>

                <InfoBadge icon={CheckCircle} title="eSign Available">
                  The Clinical Trial Agreement on Legalgram can be signed online for free for a fast, secure, and efficient process.
                </InfoBadge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="w-5 h-5 mr-2 text-amber-600" />
                Download Clinical Trial Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-gray-700">
                  <p className="mb-1">Download a professional, customizable Clinical Trial Agreement suitable for sponsors, research institutions, and clinical professionals.</p>
                  <p className="text-sm text-gray-500">Prepared to support regulatory compliance and clear documentation of responsibilities.</p>
                </div>

                <div className="flex items-center gap-3">
                  <Button onClick={() => navigate('/documents')}>
                    <FileText className="w-4 h-4 mr-2" />
                    Sign Online
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-600 text-sm">
                  This information is provided for educational purposes only and does not constitute legal advice. For
                  complex clinical trials or regulatory matters, consult a qualified attorney or compliance professional to
                  ensure the agreement complies with applicable laws and protects all parties involved.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default ClinicalTrialContractInfo;
