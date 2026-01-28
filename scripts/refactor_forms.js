
// Node.js script to automate refactoring of Legalgram form components to use FormWizard
// This script will:
// 1. Find all *Form.tsx files in src/components
// 2. For each file, parse the form fields and group them into steps (max 3 per step)
// 3. Replace legacy step logic/UI with FormWizard usage
// 4. Move PDF generation to onFinish
// 5. Output a summary of changes

// This file must be run as CommonJS (.cjs) due to Node.js module type
throw new Error('Please rename this file to refactor_forms.cjs for Node.js compatibility.');

const COMPONENTS_DIR = path.join(__dirname, '../src/components');
const EXCLUDE = [
	'ServicesContractForm.tsx',
	'BarterAgreementForm.tsx',
	'ReferralAndWarrantyForm.tsx',
	'AffidavitOfResidenceForm.tsx',
	'GuaranteeAgreementForm.tsx',
];

function getFormFiles() {
	return glob.sync(path.join(COMPONENTS_DIR, '*Form.tsx'))
		.filter(f => !EXCLUDE.some(ex => f.endsWith(ex)));
}

function refactorFormFile(filePath) {
	// Placeholder: In production, use AST parsing for robust refactor
	// For now, just log the file to be refactored
	console.log(`Would refactor: ${filePath}`);
}

function main() {
	const files = getFormFiles();
	console.log(`Found ${files.length} form files to refactor.`);
	files.forEach(refactorFormFile);
	console.log('Batch refactor simulation complete.');
}

main();
