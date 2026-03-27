import { Copy, FileText, FileDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface GeneratedContentProps {
  content: string;
  language: string;
}

const GeneratedContent = ({ content, language }: GeneratedContentProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportTxt = () => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated-content.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="animate-fade-in rounded-xl border border-border bg-card shadow-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <h3 className="text-sm font-semibold text-foreground">Generated Content</h3>
        <div className="flex gap-1.5">
          <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 gap-1.5 text-xs">
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleExportTxt} className="h-8 gap-1.5 text-xs">
            <FileDown className="h-3.5 w-3.5" />
            Export
          </Button>
        </div>
      </div>
      <div className={`p-5 ${language === "urdu" ? "urdu-text" : ""}`}>
        <div className="prose prose-sm max-w-none whitespace-pre-wrap text-foreground">
          {content}
        </div>
      </div>
    </div>
  );
};

export default GeneratedContent;
