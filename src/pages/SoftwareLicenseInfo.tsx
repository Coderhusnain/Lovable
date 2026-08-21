import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Computer, ShieldCheck, Repeat, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const SoftwareLicenseInfo = () => {
	const navigate = useNavigate();

	return (
		<Layout>
			<div className="container mx-auto px-4 py-12 max-w-4xl">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">Software License Agreement</h1>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Best format Software License Agreement from Legalgram — secure your software business
						with clear licensing, subscription, and distribution terms.
					</p>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl text-gray-900">What is a Software License Agreement?</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-600 mb-4">
							A Software License Agreement is a legal contract between the software owner (licensor) and
							the user or company (licensee). It grants limited rights to use the software under stated
							conditions while preserving ownership of the software and source code.
						</p>
						<p className="text-gray-600">
							Use this agreement for desktop apps, mobile apps, SaaS subscriptions, enterprise deployments,
							or commercial distribution to protect your IP, control use, and define support and payment terms.
						</p>
					</CardContent>
				</Card>

				<div className="grid md:grid-cols-3 gap-6 mb-12">
					<Card className="text-center">
						<CardHeader>
							<CardTitle className="text-lg">Protect Ownership</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600">Preserve ownership of the software and restrict copying or redistribution.</p>
						</CardContent>
					</Card>

					<Card className="text-center">
						<CardHeader>
							<CardTitle className="text-lg">Subscription & Updates</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600">Define renewal, billing, update, and maintenance terms for SaaS products.</p>
						</CardContent>
					</Card>

					<Card className="text-center">
						<CardHeader>
							<CardTitle className="text-lg">Device Limits</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600">Set installation limits, user counts, enterprise deployment caps, and sublicensing rules.</p>
						</CardContent>
					</Card>
				</div>

				<Card className="mb-8 text-center bg-gradient-to-r from-sky-50 to-indigo-50 border-sky-200">
					<CardHeader>
						<CardTitle className="text-2xl text-gray-900">Ready to Create Your Software License Agreement?</CardTitle>
						<CardDescription className="text-lg">Download an editable Software License Agreement template in Word or PDF and customize it for your product.</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<Button
								size="lg"
								className="bg-sky-700 hover:bg-sky-800 text-white px-8 py-3"
								onClick={() => navigate('/documents/software')}
							>
								Create Software License Agreement Now
								<ArrowRight className="w-5 h-5 ml-2" />
							</Button>
							<p className="text-sm text-gray-500">Professionally drafted, editable, and ready for immediate use.</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</Layout>
	);
};

export default SoftwareLicenseInfo;
