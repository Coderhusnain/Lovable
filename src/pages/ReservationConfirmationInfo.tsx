import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";

const ReservationConfirmationInfo = () => {
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
              What Is a Reservation Confirmation Letter?
            </h1>
            <p className="text-xl text-gray-600">
              A formal request to confirm room or accommodation reservations
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Reservation Confirmation Letter is a formal written request used to
              reserve a room or accommodation at a hotel, guesthouse, or similar
              establishment. It serves as official documentation requesting
              confirmation of availability, reservation details, and receipt of any
              required payment.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                A Reservation Confirmation Letter typically includes:
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Requested reservation start and end dates</li>
                <li>• Room or accommodation requirements</li>
                <li>• Expected arrival date</li>
                <li>• Payment details, if required</li>
                <li>• Contact information of the requesting party</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              This letter helps ensure clear communication between the guest and the
              establishment and provides written proof of the reservation request.
            </p>
          </section>

          {/* When to Use Section */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                When to Use a Reservation Confirmation Letter
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              You may use this letter in the following situations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Requesting a room reservation in advance</li>
                  <li>• Confirming availability for specific dates</li>
                  <li>• Submitting payment to secure a reservation</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  <li>• Following up on a pending reservation request</li>
                  <li>• Making additional or repeat reservations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Requirements Section */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Key Requirements for a Reservation Confirmation Letter
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              To ensure your reservation request is processed smoothly, include the
              following:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  1. Reservation Details
                </h3>
                <p className="text-gray-700">
                  Clearly state the start and end dates of the reservation, along with
                  any specific room or accommodation requirements.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  2. Arrival Information
                </h3>
                <p className="text-gray-700">
                  Include the anticipated arrival date to assist the establishment in
                  planning and scheduling.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  3. Payment Submission
                </h3>
                <p className="text-gray-700">
                  If required, attach payment to secure the reservation and request
                  confirmation of receipt.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">
                  4. Signature and Contact Information
                </h3>
                <p className="text-gray-700">
                  The letter should be signed by the requesting party and include
                  accurate contact details.
                </p>
              </div>
            </div>
          </section>

          {/* How to Create Section */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                How to Create a Reservation Confirmation Letter for Free
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              With Legalgram, creating a professional reservation confirmation letter
              takes just a few minutes:
            </p>
            
            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>Enter the establishment’s name and address.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Provide reservation dates, arrival details, and requirements.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Add payment details, if applicable.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Review, customize, and download the letter.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</span>
                  <span>Sign and submit it to the establishment.</span>
                </li>
              </ol>
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
                  ✅ Is a signature required?
                </h3>
                <p className="text-green-800">
                  Yes. The letter should be signed by the requesting party to ensure
                  authenticity and clarity.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ✅ Should I keep a copy of this letter?
                </h3>
                <p className="text-blue-800">
                  Absolutely. Retain a copy of the signed letter and any proof of
                  payment for your records.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-900 mb-2">
                  ✅ Can I reissue this letter?
                </h3>
                <p className="text-purple-800">
                  Yes. You may submit a follow-up or reissued letter to confirm a
                  pending reservation or request additional bookings.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                <h3 className="font-semibold text-orange-900 mb-2">
                  ✅ Is payment always required?
                </h3>
                <p className="text-orange-800">
                  Not always. Payment requirements depend on the establishment’s
                  reservation policy.
                </p>
              </div>
            </div>
          </section>

          {/* Final Steps Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Final Checklist After Sending Your Request
            </h2>
            <p className="text-gray-700 mb-4">
              Before and after submitting your reservation confirmation letter:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-2">
                <li>1. Ensure the letter is signed.</li>
                <li>2. Attach payment, if required.</li>
                <li>3. Retain copies of the letter and proof of payment.</li>
                <li>4. Follow up if confirmation is not received.</li>
              </ol>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Create Your Reservation Confirmation Letter Now
            </h2>
            <p className="text-xl mb-6">
              Secure your accommodations with confidence. Our Reservation
              Confirmation Letter template is professional, clear, and free to use.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/documents/reservation-confirmation')}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Your Reservation Request Today
            </Button>
            <p className="text-bright-orange-100 mt-4">
              Clear communication. Reliable confirmation.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default ReservationConfirmationInfo;
