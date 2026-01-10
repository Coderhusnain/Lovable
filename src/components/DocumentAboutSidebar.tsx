import { useState } from "react";
import { ChevronDown, ChevronUp, Info, FileText, AlertCircle, CheckCircle, BookOpen, HelpCircle, Scale, Clock, Target, Sparkles, Gavel } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export interface DocumentInfo {
  title: string;
  shortDescription: string;
  fullDescription: string;
  whenToUse: string[];
  keyTerms: { term: string; definition: string }[];
  tips: string[];
  warnings: string[];
  relatedDocuments?: { title: string; id: string }[];
  estimatedTime?: string;
}

export const documentInfoDatabase: Record<string, DocumentInfo> = {};

const getDefaultDocumentInfo = (documentId: string): DocumentInfo => ({
  title: documentId.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
  shortDescription: "Complete this legal document to protect your interests.",
  fullDescription: "This document helps establish a formal agreement between parties.",
  whenToUse: ["When you need a formal written agreement"],
  keyTerms: [{ term: "Parties", definition: "Individuals or entities in this agreement." }],
  tips: ["Read all sections carefully before signing"],
  warnings: ["This document creates legal obligations"],
  estimatedTime: "15-25 minutes"
});

interface DocumentAboutSidebarProps {
  documentId: string;
  onNavigateToDocument?: (id: string) => void;
}

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection = ({ title, icon, children, defaultOpen = false }: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-orange-50 rounded-lg">
        <div className="flex items-center gap-2">{icon}<span className="font-medium text-gray-700">{title}</span></div>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3 pb-3">{children}</CollapsibleContent>
    </Collapsible>
  );
};

const DocumentAboutSidebar = ({ documentId, onNavigateToDocument }: DocumentAboutSidebarProps) => {
  const docInfo = documentInfoDatabase[documentId] || getDefaultDocumentInfo(documentId);
  return (
    <Card className="w-full lg:w-80 bg-white border-orange-200 shadow-lg sticky top-4">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-lg"><BookOpen className="h-5 w-5" />About This Document</CardTitle>
        {docInfo.estimatedTime && <div className="flex items-center gap-1 text-orange-100 text-sm"><Clock className="h-4 w-4" /><span>Est. {docInfo.estimatedTime}</span></div>}
      </CardHeader>
      <CardContent className="p-0 max-h-[calc(100vh-200px)] overflow-y-auto">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-2">{docInfo.title}</h3>
          <p className="text-sm text-gray-600">{docInfo.shortDescription}</p>
        </div>
        <div className="divide-y divide-gray-100">
          <CollapsibleSection title="What Is This?" icon={<HelpCircle className="h-4 w-4 text-orange-500" />} defaultOpen={true}>
            <p className="text-sm text-gray-600">{docInfo.fullDescription}</p>
          </CollapsibleSection>
          <CollapsibleSection title="When To Use" icon={<Target className="h-4 w-4 text-blue-500" />}>
            <ul className="space-y-2">{docInfo.whenToUse.map((item, i) => <li key={i} className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle className="h-4 w-4 text-green-500" /><span>{item}</span></li>)}</ul>
          </CollapsibleSection>
          <CollapsibleSection title="Key Terms" icon={<Scale className="h-4 w-4 text-purple-500" />}>
            <div className="space-y-3">{docInfo.keyTerms.map((item, i) => <div key={i} className="bg-gray-50 rounded-lg p-2"><div className="font-medium text-sm">{item.term}</div><div className="text-xs text-gray-600">{item.definition}</div></div>)}</div>
          </CollapsibleSection>
          <CollapsibleSection title="Helpful Tips" icon={<Info className="h-4 w-4 text-green-500" />}>
            <ul className="space-y-2">{docInfo.tips.map((tip, i) => <li key={i} className="flex items-start gap-2 text-sm text-gray-600"><Sparkles className="h-4 w-4 text-yellow-500" /><span>{tip}</span></li>)}</ul>
          </CollapsibleSection>
          <CollapsibleSection title="Warnings" icon={<AlertCircle className="h-4 w-4 text-red-500" />}>
            <ul className="space-y-2">{docInfo.warnings.map((w, i) => <li key={i} className="flex items-start gap-2 text-sm text-red-700 bg-red-50 p-2 rounded"><AlertCircle className="h-4 w-4 text-red-500" /><span>{w}</span></li>)}</ul>
          </CollapsibleSection>
          {docInfo.relatedDocuments && docInfo.relatedDocuments.length > 0 && (
            <CollapsibleSection title="Related" icon={<FileText className="h-4 w-4 text-orange-500" />}>
              <div className="space-y-2">{docInfo.relatedDocuments.map((doc, i) => <button key={i} onClick={() => onNavigateToDocument?.(doc.id)} className="w-full flex items-center gap-2 p-2 text-sm text-orange-600 hover:bg-orange-50 rounded-lg text-left"><FileText className="h-4 w-4" /><span>{doc.title}</span></button>)}</div>
            </CollapsibleSection>
          )}
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <div className="flex items-start gap-2"><Gavel className="h-4 w-4 text-gray-400" /><p className="text-xs text-gray-500">This is for general guidance only.</p></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentAboutSidebar;
