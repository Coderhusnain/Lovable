import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";

const ChangeOfBeneficiaryInfo = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          <div className="text-center mb-8">
            <FileText className="w-16 h-16 text-bright-orange-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">What Is a Change of Beneficiary Letter?</h1>
            <p className="text-xl text-gray-600">
              A complete guide to requesting beneficiary updates for a life insurance policy
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">

          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Change of Beneficiary Letter is a formal written request submitted by a life insurance policy owner to notify the insurer of an update to beneficiary information. This document is commonly used when a beneficiary's name has changed or needs correction in the insurance company's records.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">A Change of Beneficiary Letter typically includes:</h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Policy number and insured's details</li>
                <li>• Name of the policy owner</li>
                <li>• Identification of the beneficiary whose name is being updated</li>
                <li>• A formal request for amendment of policy records</li>
                <li>• Signature and contact information of the policy owner</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed">
              This letter helps ensure that beneficiary records remain accurate and up to date, preventing delays or disputes during claim processing.
            </p>
          </section>

          {/* When to Use Section */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">When to Use a Change of Beneficiary Letter</h2>
            </div>
            <p className="text-gray-700 mb-4">You may need to submit this letter to your insurance provider in the following situations:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• A beneficiary's legal name has changed</li>
                  <li>• There is an error or misspelling in beneficiary records</li>
                  <li>• The insurer requests written confirmation of a beneficiary update</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Additional beneficiary changes are required</li>
                  <li>• The insurer needs documentation for record verification</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Requirements Section */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Key Requirements for a Change of Beneficiary Letter</h2>
            </div>
            <p className="text-gray-700 mb-6">To ensure the request is accepted and processed without delay, the following requirements should be met:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">1. Policy Owner Authorization</h3>
                <p className="text-gray-700">The request must be made and signed by the policy owner of record. Requests submitted by unauthorized individuals may be rejected.</p>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">2. Policy Details</h3>
                <p className="text-gray-700">Include the life insurance policy number, insured's name, and any relevant identifying information to help the insurer locate the policy.</p>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">3. Written Confirmation Request</h3>
                <p className="text-gray-700">The letter should request written confirmation once the beneficiary update has been completed.</p>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">4. Supporting Documentation</h3>
                <p className="text-gray-700">Some insurers may require submission of the original policy document or additional forms. Verification with the insurer is recommended.</p>
              </div>
            </div>
          </section>

          {/* Document Draft Section */}
          <section>
            <div className="flex items-center mb-6">
              <FileText className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Document Draft</h2>
            </div>
            <div className="border border-gray-200 rounded-xl bg-white p-10 font-serif text-gray-800 text-[15px] leading-8 space-y-5 shadow-inner">

              <p className="text-center text-xl font-bold underline tracking-widest uppercase">
                Change of Beneficiary Letter
              </p>

              {/* Header fields */}
              <div className="space-y-2">
                <p><strong>Date:</strong>{" "}
                  <span className="border-b border-gray-500 inline-block w-36">&nbsp;</span>,{" "}
                  <span className="border-b border-gray-500 inline-block w-28">&nbsp;</span>
                </p>
                <p><strong>To:</strong>{" "}
                  <span className="border-b border-gray-500 inline-block w-64">&nbsp;</span>
                </p>
                <p><strong>Re:</strong> Life Insurance Policy No.{" "}
                  <span className="border-b border-gray-500 inline-block w-44">&nbsp;</span>
                </p>
                <p><strong>Insured:</strong>{" "}
                  <span className="border-b border-gray-500 inline-block w-56">&nbsp;</span>
                </p>
                <p><strong>Policy Owner:</strong>{" "}
                  <span className="border-b border-gray-500 inline-block w-52">&nbsp;</span>
                </p>
              </div>

              <p><strong>Dear Sir or Madam:</strong></p>

              <p>
                I am writing in my capacity as the <strong>owner of the above-referenced life insurance policy</strong> to formally request an update to the policy records.
              </p>
              <p>
                Please be advised that there has been a <strong>change in the name of a primary beneficiary</strong>, and I hereby instruct that the policy be amended accordingly to reflect the correct beneficiary name.
              </p>
              <p>
                Kindly confirm this change in writing at your earliest convenience. If the completion of any additional forms or documentation is required to effectuate this amendment, please forward the same to me without delay.
              </p>
              <p>Thank you for your cooperation and assistance in this matter.</p>

              <p className="font-bold">Sincerely,</p>

              <div className="space-y-3 pt-2">
                <p>Signature of Policy Owner: <span className="border-b border-gray-500 inline-block w-52">&nbsp;</span></p>
                <p>Printed Name: <span className="border-b border-gray-500 inline-block w-56">&nbsp;</span></p>
                <p>Address: <span className="border-b border-gray-500 inline-block w-64">&nbsp;</span></p>
                <p>Contact Information: <span className="border-b border-gray-500 inline-block w-52">&nbsp;</span></p>
              </div>

              {/* Important Notes */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-4 space-y-4">
                <p className="font-bold uppercase tracking-wide underline text-base">Important Notes</p>

                <div>
                  <p className="font-bold">Legal Requirement</p>
                  <ul className="text-gray-700 mt-1 space-y-1">
                    <li>• This request <strong>must be signed by the policy owner</strong> of record.</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Recordkeeping</p>
                  <ul className="text-gray-700 mt-1 space-y-1">
                    <li>• The policy owner should <strong>retain a copy of this letter</strong> and all related correspondence for personal records.</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">When to Consult Legal Counsel</p>
                  <ul className="text-gray-700 mt-1 space-y-1">
                    <li>• If the policy owner is legally incapacitated or otherwise incompetent, the <strong>appointed guardian or legal representative</strong> should consult an attorney to determine the scope of their authority to change beneficiary designations.</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Additional Information</p>
                  <ul className="text-gray-700 mt-1 space-y-1">
                    <li>• The insurance company may require the <strong>original policy document</strong> to be submitted along with this request. The policy owner should consult the insurance agent or insurer to confirm whether this is necessary.</li>
                    <li>• Unless specifically required by the insurer, this request <strong>does not need to be notarized or witnessed</strong>.</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Reasons to Submit an Updated Request</p>
                  <ul className="text-gray-700 mt-1 space-y-1">
                    <li>• To make additional changes to beneficiary designations.</li>
                    <li>• To notify the insurer of a subsequent name change of any listed beneficiary.</li>
                  </ul>
                </div>
              </div>

            </div>
          </section>

          {/* How to Create Section */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">How to Create a Change of Beneficiary Letter for Free</h2>
            </div>
            <p className="text-gray-700 mb-6">Legalgram allows you to prepare a professional Change of Beneficiary Letter quickly and at no cost. Follow these simple steps:</p>
            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>Enter your life insurance policy details.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Provide the correct beneficiary name and relevant information.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Review and customize the letter to match your situation.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Download and print the completed document.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</span>
                  <span>Sign and submit it to your insurance provider.</span>
                </li>
              </ol>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 bg-green-50 p-4">
                <h3 className="font-semibold text-green-900 mb-2">✅ Who must sign the Change of Beneficiary Letter?</h3>
                <p className="text-green-800">The letter must be signed by the policy owner of record. If the policy owner is legally incapacitated, a guardian or legal representative should consult an attorney.</p>
              </div>
              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">✅ Is notarization required?</h3>
                <p className="text-blue-800">Not usually. Unless specifically requested by the insurer, this letter does not need to be notarized or witnessed.</p>
              </div>
              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-900 mb-2">✅ Should I keep a copy of this letter?</h3>
                <p className="text-purple-800">Yes. The policy owner should retain a copy of the letter and all related correspondence for personal records.</p>
              </div>
              <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                <h3 className="font-semibold text-orange-900 mb-2">✅ Can the insurer request additional documents?</h3>
                <p className="text-orange-800">Yes. Some insurers may request the original policy document or additional forms to complete the update.</p>
              </div>
            </div>
          </section>

          {/* Final Steps Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Final Steps After Submitting Your Letter</h2>
            <p className="text-gray-700 mb-4">After submitting your Change of Beneficiary Letter:</p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-2">
                <li>1. Wait for written confirmation from the insurer.</li>
                <li>2. Follow up if additional documentation is requested.</li>
                <li>3. Store confirmation records with your policy documents.</li>
                <li>4. Submit a new request if further changes are required.</li>
              </ol>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">Create Your Change of Beneficiary Letter Now</h2>
            <p className="text-xl mb-6">Keep your life insurance records accurate and up to date. Our Change of Beneficiary Letter template is clear, professional, and free to use.</p>
            <Button
              size="lg"
              onClick={() => navigate('/documents/change-of-beneficiary-form')}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Your Letter Today
            </Button>
            <p className="text-bright-orange-100 mt-4">Simple, secure, and insurer-ready.</p>
          </section>

        </div>
      </div>
    </Layout>
  );
};

export default ChangeOfBeneficiaryInfo;
