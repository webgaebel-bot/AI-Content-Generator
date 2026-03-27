import { useState } from "react";
import { FileText, MessageSquare, ShoppingBag, Megaphone, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ContentTypeCard from "@/components/ContentTypeCard";
import GeneratedContent from "@/components/GeneratedContent";

const contentTypes = [
  { id: "blog", icon: FileText, label: "Blog Post", description: "Long-form articles" },
  { id: "social", icon: MessageSquare, label: "Social Media", description: "Captions & posts" },
  { id: "product", icon: ShoppingBag, label: "Product Description", description: "Sell your product" },
  { id: "ad", icon: Megaphone, label: "Ad Copy", description: "Marketing ads" },
];

const Generator = () => {
  const [contentType, setContentType] = useState("blog");
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("formal");
  const [language, setLanguage] = useState("english");
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setGeneratedContent("");

    // Simulate generation for now (will be replaced with actual AI call)
    await new Promise((r) => setTimeout(r, 2000));

    const sampleContent =
      language === "urdu"
        ? `یہ "${topic}" کے موضوع پر تیار کردہ مواد ہے۔\n\nکلیدی الفاظ: ${keywords || "N/A"}\nلہجہ: ${tone === "formal" ? "رسمی" : tone === "casual" ? "غیر رسمی" : "قائل کرنے والا"}\n\nیہ ایک عارضی مواد ہے۔ AI انضمام کے بعد، اعلیٰ معیار کا مواد تیار کیا جائے گا۔`
        : `# ${topic}\n\nThis is a sample ${contentType} generated with a ${tone} tone.\n\n**Keywords:** ${keywords || "None specified"}\n\nThis is placeholder content. Once the AI backend is connected, high-quality ${language === "both" ? "bilingual (English & Urdu)" : language} content will be generated here based on your inputs.\n\nThe content will be tailored to your specific needs, incorporating your keywords naturally and maintaining the ${tone} tone throughout.`;

    setGeneratedContent(sampleContent);
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Hero */}
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          AI Content <span className="gradient-text">Generator</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Generate professional content in English, Urdu, or both languages
        </p>
      </div>

      {/* Content Type Selection */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-foreground">Content Type</Label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {contentTypes.map((type) => (
            <ContentTypeCard
              key={type.id}
              icon={type.icon}
              label={type.label}
              description={type.description}
              selected={contentType === type.id}
              onClick={() => setContentType(type.id)}
            />
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="grid gap-5 rounded-xl border border-border bg-card p-6 shadow-card sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="topic">Topic *</Label>
          <Input
            id="topic"
            placeholder="e.g., Benefits of AI in Healthcare"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="keywords">Keywords</Label>
          <Textarea
            id="keywords"
            placeholder="Enter keywords separated by commas"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label>Tone</Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="formal">Formal</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="persuasive">Persuasive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="urdu">اردو (Urdu)</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="sm:col-span-2">
          <Button
            onClick={handleGenerate}
            disabled={loading || !topic.trim()}
            className="w-full gap-2 gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
            size="lg"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {loading ? "Generating..." : "Generate Content"}
          </Button>
        </div>
      </div>

      {/* Output */}
      {generatedContent && (
        <GeneratedContent content={generatedContent} language={language} />
      )}
    </div>
  );
};

export default Generator;
