import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FormWizard } from "./FormWizard";

const AccountingContractForm = () => {
	const [form, setForm] = useState({
		clientName: "",
		accountantName: "",
		serviceType: "",
		startDate: "",
		endDate: "",
		fee: "",
		terms: "",
	});

	const steps = [
		{
			label: "Parties & Term",
			content: (
				<>
					<label>
						Client Name
						<input
							type="text"
							value={form.clientName}
							onChange={(e) => setForm((f) => ({ ...f, clientName: e.target.value }))}
							required
						/>
					</label>
					<label>
						Accountant Name
						<input
							type="text"
							value={form.accountantName}
							onChange={(e) => setForm((f) => ({ ...f, accountantName: e.target.value }))}
							required
						/>
					</label>
					<label>
						Service Type
						<input
							type="text"
							value={form.serviceType}
							onChange={(e) => setForm((f) => ({ ...f, serviceType: e.target.value }))}
							required
						/>
					</label>
				</>
			),
			validate: () => Boolean(form.clientName && form.accountantName && form.serviceType),
		},
		{
			label: "Services & Fees",
			content: (
				<>
					<label>
						Start Date
						<input
							type="date"
							value={form.startDate}
							onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
							required
						/>
					</label>
					<label>
						End Date
						<input
							type="date"
							value={form.endDate}
							onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
						/>
					</label>
					<label>
						Fee
						<input
							type="number"
							value={form.fee}
							onChange={(e) => setForm((f) => ({ ...f, fee: e.target.value }))}
							required
						/>
					</label>
				</>
			),
			validate: () => Boolean(form.startDate && form.fee),
		},
		{
			label: "Cooperation & Confidentiality",
			content: (
				<label>
					Terms
					<textarea
						value={form.terms}
						onChange={(e) => setForm((f) => ({ ...f, terms: e.target.value }))}
						required
					/>
				</label>
			),
			validate: () => Boolean(form.terms),
		},
	];

	return (
		<div className="p-6 max-w-4xl mx-auto space-y-4">
			<FormWizard steps={steps} onFinish={() => alert("Form submitted!")} />
		</div>
	);
};

export default AccountingContractForm;
