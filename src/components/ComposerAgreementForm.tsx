import React, { useState } from "react";
import { FormWizard } from "./FormWizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import jsPDF from "jspdf";
import CountryStateAPI from 'countries-states-cities';

// --- Interfaces & Helpers ---
interface CountryData { id: number; name: string; iso3: string; iso2: string; phone_code: string; capital: string; currency: string; native: string; region: string; subregion: string; emoji: string; }
interface StateData { id: number; name: string; country_id: number; country_code: string; state_code: string; }

const getAllCountries = (): CountryData[] => CountryStateAPI.getAllCountries();
const getStatesByCountry = (countryId: number): StateData[] => CountryStateAPI.getStatesOfCountry(countryId);
const getCountryName = (countryId: string): string => { const c = getAllCountries().find(c => c.id.toString() === countryId); return c?.name || countryId; };
const getStateName = (countryId: string, stateId: string): string => { const c = getAllCountries().find(c => c.id.toString() === countryId); if (!c) return stateId; const s = getStatesByCountry(c.id).find(s => s.id.toString() === stateId); return s?.name || stateId; };

interface FormData {
  country: string;
  state: string;
  effectiveDate: string;
  companyName: string;
  companyAddress: string;
  composerName: string;
  composerAddress: string;
  pictureTitle: string;
  termEndDate: string;
  deliveryDate: string;
  fixedFee: string;
  royaltyPercentage: string;
  additionalTerms: string;
}

const initialFormData: FormData = {
  country: '', state: '', effectiveDate: '', companyName: '', companyAddress: '',
  composerName: '', composerAddress: '', pictureTitle: '', termEndDate: '',
  deliveryDate: '', fixedFee: '', royaltyPercentage: '', additionalTerms: ''
};

export default function ComposerAgreementForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'country') setFormData(prev => ({ ...prev, state: '' }));
  };

  const getStatesForCountry = (): StateData[] => {
    if (!formData.country) return [];
    return getStatesByCountry(parseInt(formData.country));
  };

  // --- PDF Generation Logic ---
  const generatePDF = () => {
    setIsGenerating(true);
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const lh = 7;
      let y = 20;
      const checkPage = (n: number = 25) => { if (y > 270 - n) { doc.addPage(); y = 20; } };

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("COMPOSER AGREEMENT", pageWidth / 2, y, { align: "center" });
      y += lh * 2;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      const intro = `This Composer Agreement ("Agreement") is made and entered into as of ${formData.effectiveDate || '__________'} ("Effective Date"), by and between:`;
      doc.splitTextToSize(intro, 180).forEach((line: string) => { doc.text(line, 15, y); y += lh; });
      y += lh;

      doc.setFont("helvetica", "bold");
      doc.text("Company:", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.companyName || '__________'}`, 20, y); y += lh;
      doc.text(`Address: ${formData.companyAddress || '__________'}`, 20, y); y += lh * 2;

      doc.setFont("helvetica", "bold");
      doc.text("Composer:", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.composerName || '__________'}`, 20, y); y += lh;
      doc.text(`Address: ${formData.composerAddress || '__________'}`, 20, y); y += lh * 2;

      const sections = [
        { title: "1. ENGAGEMENT", content: `The Company hereby engages the Composer to compose original musical compositions for the motion picture entitled "${formData.pictureTitle || '__________'}" (the "Picture").` },
        { title: "2. TERM", content: `The term shall commence on the Effective Date and continue until ${formData.termEndDate || '__________'}.` },
        { title: "3. COMPENSATION", content: `The Composer shall receive a fixed fee of $${formData.fixedFee || '__________'}.` },
        { title: "4. ROYALTIES", content: `Company shall pay royalties equal to ${formData.royaltyPercentage || '__________'}% of net U.S. sales of soundtrack albums.` },
        { title: "5. GOVERNING LAW", content: `Governed by the laws of ${getStateName(formData.country, formData.state)}, ${getCountryName(formData.country)}.` }
      ];

      sections.forEach(section => {
        checkPage(30);
        doc.setFont("helvetica", "bold");
        doc.text(section.title, 15, y); y += lh;
        doc.setFont("helvetica", "normal");
        doc.splitTextToSize(section.content, 175).forEach((line: string) => { doc.text(line, 15, y); y += lh; });
        y += lh / 2;
      });

      // Signatures
      checkPage(60);
      doc.setFont("helvetica", "bold");
      doc.text("SIGNATURES", pageWidth / 2, y, { align: "center" }); y += lh * 2;
      
      doc.text("COMPANY", 15, y); 
      doc.text("COMPOSER", 110, y); y += lh;
      
      doc.setFont("helvetica", "normal");
      doc.text("__________________________", 15, y); 
      doc.text("__________________________", 110, y); y += lh;
      doc.text(`Name: ${formData.companyName}`, 15, y); 
      doc.text(`Name: ${formData.composerName}`, 110, y);

      doc.save("Composer_Agreement.pdf");
      toast.success("PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  // --- Wizard Steps ---
  const steps = [
    {
      label: "Location & Date",
      content: (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Country</Label>
              <Select value={formData.country} onValueChange={(v) => handleInputChange('country', v)}>
                <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                <SelectContent>
                  {getAllCountries().map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>State/Province</Label>
              <Select value={formData.state} onValueChange={(v) => handleInputChange('state', v)} disabled={!formData.country}>
                <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                <SelectContent>
                  {getStatesForCountry().map(s => <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Effective Date</Label>
            <Input type="date" value={formData.effectiveDate} onChange={(e) => handleInputChange('effectiveDate', e.target.value)} />
          </div>
        </div>
      )
    },
    {
      label: "Parties",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input value={formData.companyName} onChange={(e) => handleInputChange('companyName', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Company Address</Label>
            <Textarea value={formData.companyAddress} onChange={(e) => handleInputChange('companyAddress', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Composer Name</Label>
            <Input value={formData.composerName} onChange={(e) => handleInputChange('composerName', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Composer Address</Label>
            <Textarea value={formData.composerAddress} onChange={(e) => handleInputChange('composerAddress', e.target.value)} />
          </div>
        </div>
      )
    },
    {
      label: "Project & Terms",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Motion Picture Title</Label>
            <Input value={formData.pictureTitle} onChange={(e) => handleInputChange('pictureTitle', e.target.value)} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Term End Date</Label>
              <Input type="date" value={formData.termEndDate} onChange={(e) => handleInputChange('termEndDate', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Delivery Date</Label>
              <Input type="date" value={formData.deliveryDate} onChange={(e) => handleInputChange('deliveryDate', e.target.value)} />
            </div>
          </div>
        </div>
      )
    },
    {
      label: "Financials",
      content: (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Fixed Fee ($)</Label>
              <Input type="number" value={formData.fixedFee} onChange={(e) => handleInputChange('fixedFee', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Royalty Percentage (%)</Label>
              <Input type="number" value={formData.royaltyPercentage} onChange={(e) => handleInputChange('royaltyPercentage', e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Additional Terms</Label>
            <Textarea value={formData.additionalTerms} onChange={(e) => handleInputChange('additionalTerms', e.target.value)} />
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Composer Agreement</h2>
      <FormWizard steps={steps} onFinish={generatePDF} />
    </div>
  );
}