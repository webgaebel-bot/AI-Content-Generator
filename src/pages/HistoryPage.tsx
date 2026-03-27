import { FileText, MessageSquare, ShoppingBag, Megaphone, Clock, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const typeIcons: Record<string, React.ElementType> = {
  blog: FileText,
  social: MessageSquare,
  product: ShoppingBag,
  ad: Megaphone,
};

const sampleHistory = [
  { id: "1", type: "blog", topic: "Benefits of AI in Healthcare", tone: "formal", language: "english", date: "2025-03-25", preview: "Artificial Intelligence is transforming the healthcare industry..." },
  { id: "2", type: "social", topic: "Product Launch Announcement", tone: "casual", language: "both", date: "2025-03-24", preview: "🚀 Exciting news! We're thrilled to announce..." },
  { id: "3", type: "product", topic: "Wireless Earbuds Pro", tone: "persuasive", language: "urdu", date: "2025-03-23", preview: "وائرلیس ایئربڈز پرو - بہترین آواز کا تجربہ..." },
];

const HistoryPage = () => (
  <div className="mx-auto max-w-4xl space-y-8">
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
        Generation <span className="gradient-text">History</span>
      </h1>
      <p className="mt-2 text-muted-foreground">View and manage your previously generated content</p>
    </div>

    <div className="space-y-3">
      {sampleHistory.map((item) => {
        const Icon = typeIcons[item.type] || FileText;
        return (
          <div
            key={item.id}
            className="group flex gap-4 rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-elevated cursor-pointer"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold text-foreground">{item.topic}</h3>
                <div className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {item.date}
                </div>
              </div>
              <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{item.preview}</p>
              <div className="mt-2.5 flex gap-2">
                <Badge variant="secondary" className="text-xs capitalize">{item.type}</Badge>
                <Badge variant="secondary" className="text-xs capitalize">{item.tone}</Badge>
                <Badge variant="outline" className="gap-1 text-xs capitalize">
                  <Globe className="h-3 w-3" />
                  {item.language}
                </Badge>
              </div>
            </div>
          </div>
        );
      })}
    </div>

    <p className="text-center text-sm text-muted-foreground">
      History will be stored in the database once the backend is connected.
    </p>
  </div>
);

export default HistoryPage;
