import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";

const LotteryPoolContractInfo = () => {
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
            <h1 className="text-4xl font-bold mb-4">
              What Is a Lottery Pool Contract?
            </h1>
            <p className="text-xl text-gray-600">
              An agreement for shared ownership and distribution of lottery entries and winnings
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Lottery Pool Contract is a legally binding agreement among multiple participants
              (“Co-Owners”) who jointly purchase lottery tickets and share any resulting winnings.
              It defines ownership interests, management responsibilities, and how prizes are claimed
              and distributed.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                A Lottery Pool Contract typically includes:
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Term and covered lottery entries</li>
                <li>• Participant contributions and ownership shares</li>
                <li>• Manager designation and authority</li>
                <li>• Prize claim and distribution rules</li>
                <li>• Withdrawal and amendment provisions</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              These agreements are commonly used by friends, coworkers, and families who want
              to pool funds for lottery participation while protecting everyone’s rights.
            </p>
          </section>

          {/* When to Use Section */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                When to Use a Lottery Pool Contract
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              A Lottery Pool Contract should be used in the following situations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Pooling money to buy lottery tickets as a group</li>
                  <li>• Sharing jackpot or prize winnings fairly</li>
                  <li>• Assigning a manager to buy and hold tickets</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Avoiding disputes over ownership of tickets</li>
                  <li>• Documenting group participation in lottery draws</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Requirements Section */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Key Components of a Lottery Pool Contract
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              To be effective and enforceable, a Lottery Pool Contract should include:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  1. Ownership & Contributions
                </h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Participant names and payments</li>
                  <li>• Number of lottery entries</li>
                  <li>• Shared ownership interests</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  2. Manager Designation
                </h3>
                <p className="text-gray-700">
                  One participant is authorized to collect funds, purchase tickets,
                  and safeguard them for the group.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  3. Prize Claims
                </h3>
                <p className="text-gray-700">
                  The agreement explains how prizes are claimed and held in trust
                  if paid to a single individual.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  4. Distribution & Withdrawal
                </h3>
                <p className="text-gray-700">
                  Winnings are split proportionally, and participants may withdraw
                  with written notice.
                </p>
              </div>
            </div>
          </section>

          {/* How to Create Section */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                How to Create a Lottery Pool Contract
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              With Legalgram, creating a Lottery Pool Contract is simple and efficient:
            </p>

            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>Enter participant and contribution details.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Select the lottery entries and drawing date.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Assign a manager and prize distribution rules.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Download, sign, and store the contract securely.</span>
                </li>
              </ol>
              <p className="text-gray-700 mt-4 font-medium">
                A written contract prevents disputes and protects all participants.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              <div className="border-l-4 border-green-500 bg-green-50 p-4">
                <h3 className="font-semibold text-green-900 mb-2">
                  ✅ Is a Lottery Pool Contract legally binding?
                </h3>
                <p className="text-green-800">
                  Yes. Once signed by all co-owners, it is legally enforceable.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ✅ Who holds the lottery tickets?
                </h3>
                <p className="text-blue-800">
                  The designated manager safeguards the tickets on behalf of all participants.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-900 mb-2">
                  ✅ How are winnings split?
                </h3>
                <p className="text-purple-800">
                  Winnings are distributed in proportion to each participant’s ownership interest.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                <h3 className="font-semibold text-orange-900 mb-2">
                  ✅ Can someone leave the pool?
                </h3>
                <p className="text-orange-800">
                  Yes. Any participant may withdraw with written notice without affecting prior entries.
                </p>
              </div>
            </div>
          </section>

          {/* Final Steps Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Final Steps After Creating Your Lottery Pool Contract
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-2">
                <li>1. Review all participant details.</li>
                <li>2. Ensure every co-owner signs and dates the contract.</li>
                <li>3. Share copies with all participants.</li>
                <li>4. Store the original securely with the manager.</li>
              </ol>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Create Your Lottery Pool Contract Now
            </h2>
            <p className="text-xl mb-6">
              Set clear rules and share winnings the right way.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/documents/lottery-pool-contract")}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Your Lottery Pool Contract
            </Button>
            <p className="text-bright-orange-100 mt-4">
              Fair shares. Clear rules. Peace of mind.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default LotteryPoolContractInfo;
