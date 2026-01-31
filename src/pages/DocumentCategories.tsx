import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, ChevronRight, ArrowLeft, FileText, Heart, Briefcase, Building2, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// IMPORT THE CENTRAL LISTS
import { familyProtectionDocs, businessSecurityDocs, propertyMattersDocs } from "./Documents";

// Category structure with Imported Data
const categories = [
  {
    id: "family",
    title: "Family Protection",
    icon: Heart,
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-rose-50",
    iconColor: "text-rose-600",
    documents: familyProtectionDocs,
    subcategories: ["Child & Family", "Marriage & Divorce", "Healthcare", "Power of Attorney", "Affidavits", "Legal Reports"]
  },
  {
    id: "business",
    title: "Business Security",
    icon: Briefcase,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    documents: businessSecurityDocs,
    subcategories: ["Contracts", "Employment", "Business Formation", "Confidentiality", "Financial", "Marketing", "Technology", "Healthcare", "Commercial Lease"]
  },
  {
    id: "property",
    title: "Property Matters",
    icon: Building2,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
    documents: propertyMattersDocs,
    subcategories: ["Residential Lease", "Commercial Lease", "Lease Modifications", "Property Sales", "Construction", "Property Management", "Notices & Letters", "Energy & Resources", "Affidavits", "Property Protection"]
  }
];

const DocumentCategories = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const activeCategory = useMemo(() => {
    return categories.find(c => c.id === selectedCategory) || null;
  }, [selectedCategory]);

  const filteredDocuments = useMemo(() => {
    if (!activeCategory) return [];
    let docs = activeCategory.documents;
    
    // Filter by subcategory
    if (selectedSubcategory) {
      docs = docs.filter(d => d.category === selectedSubcategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      docs = docs.filter(d => 
        d.title.toLowerCase().includes(query) || 
        d.description.toLowerCase().includes(query)
      );
    }
    return docs;
  }, [activeCategory, selectedSubcategory, searchQuery]);

  const filteredCategories = useMemo(() =>
    categories.map(cat => ({
      ...cat,
      documents: cat.documents.filter(doc => doc.title.toLowerCase().includes(searchTerm.toLowerCase()))
    })).filter(cat => cat.documents.length > 0),
    [searchTerm]
  );

  const toggleCategoryExpand = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
    setSearchQuery("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubcategorySelect = (subcategory: string) => {
    setSelectedSubcategory(subcategory === selectedSubcategory ? null : subcategory);
  };

  const handleDocumentClick = (docId: string) => {
    navigate(`/documents/${docId}`);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSearchQuery("");
  };

  const renderCategoryList = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Browse Document Categories</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">Select a category to explore legal documents.</p>
      </div>
      <div className="max-w-md mx-auto">
        <Input placeholder="Search documents..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="mb-6" />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {filteredCategories.map((category) => {
          const IconComponent = category.icon;
          const isExpanded = expandedCategories.includes(category.id);
          return (
            <Card key={category.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <div className={`bg-gradient-to-r ${category.color} p-6 cursor-pointer`} onClick={() => handleCategorySelect(category.id)}>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl"><IconComponent className="h-8 w-8 text-white" /></div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                    <p className="text-white/80 text-sm">{category.documents.length} documents</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {category.subcategories.slice(0, 3).map((sub) => (
                    <Badge key={sub} variant="secondary" className={`${category.bgColor} ${category.iconColor} border-0`}>{sub}</Badge>
                  ))}
                  {category.subcategories.length > 3 && <Badge variant="outline" className="text-gray-500">+{category.subcategories.length - 3} more</Badge>}
                </div>
                <button onClick={() => toggleCategoryExpand(category.id)} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 w-full">
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  {isExpanded ? "Hide subcategories" : "Show all subcategories"}
                </button>
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t space-y-2">
                    {category.subcategories.map((sub) => {
                      const count = category.documents.filter(d => d.category === sub).length;
                      return (
                        <button key={sub} onClick={() => { handleCategorySelect(category.id); setTimeout(() => handleSubcategorySelect(sub), 100); }} className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-left text-sm hover:bg-gray-100 transition-colors">
                          <span className="text-gray-700">{sub}</span>
                          <span className="text-gray-400 text-xs">{count} docs</span>
                        </button>
                      );
                    })}
                  </div>
                )}
                <Button onClick={() => handleCategorySelect(category.id)} className={`w-full mt-4 bg-gradient-to-r ${category.color} hover:opacity-90 text-white`}>Browse {category.title}</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="flex justify-center gap-8 mt-8 py-6 bg-gray-50 rounded-xl">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">{categories.reduce((sum, c) => sum + c.documents.length, 0)}</div>
          <div className="text-sm text-gray-500">Total Documents</div>
        </div>
      </div>
    </div>
  );

  const renderDocumentsView = () => {
    if (!activeCategory) return null;
    const IconComponent = activeCategory.icon;
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={handleBackToCategories} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5" /> Back to Categories
          </Button>
        </div>
        <div className={`bg-gradient-to-r ${activeCategory.color} rounded-2xl p-6 md:p-8`}>
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/20 rounded-xl"><IconComponent className="h-10 w-10 text-white" /></div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{activeCategory.title}</h1>
              <p className="text-white/80">{filteredDocuments.length} of {activeCategory.documents.length} documents</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input type="text" placeholder={`Search in ${activeCategory.title}...`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant={selectedSubcategory === null ? "default" : "outline"} size="sm" onClick={() => setSelectedSubcategory(null)} className={selectedSubcategory === null ? `bg-gradient-to-r ${activeCategory.color} text-white` : ""}>All ({activeCategory.documents.length})</Button>
          {activeCategory.subcategories.map((sub) => {
             const isSelected = selectedSubcategory === sub;
             const count = activeCategory.documents.filter(d => d.category === sub).length;
             return <Button key={sub} variant={isSelected ? "default" : "outline"} size="sm" onClick={() => handleSubcategorySelect(sub)} className={isSelected ? `bg-gradient-to-r ${activeCategory.color} text-white` : ""}>{sub} ({count})</Button>;
          })}
        </div>
        {filteredDocuments.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((doc) => {
              const DocIcon = doc.icon || FileText;
              return (
                <Card key={doc.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-orange-300 group" onClick={() => handleDocumentClick(doc.id)}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${activeCategory.bgColor} group-hover:scale-110 transition-transform`}><DocIcon className={`h-6 w-6 ${activeCategory.iconColor}`} /></div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">{doc.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2">{doc.description}</p>
                        <Badge variant="outline" className="mt-2 text-xs">{doc.category}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedSubcategory(null); }} className="mt-4">Clear Filters</Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation - simplified for clarity, ensure matches App.tsx */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => navigate("/")} className="flex items-center gap-2 text-xl font-bold">
              <Scale className="h-6 w-6 text-orange-500" />
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Legalgram</span>
            </button>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate("/documents")} className="text-gray-600 hover:text-gray-900">All Documents</Button>
              <Button onClick={() => navigate("/documents")} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedCategory ? renderDocumentsView() : renderCategoryList()}
      </main>
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2020 Legalgram. Professional legal document templates for everyone.</p>
        </div>
      </footer>
    </div>
  );
};

export default DocumentCategories;