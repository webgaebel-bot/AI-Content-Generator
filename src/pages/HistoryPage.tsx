import { useMemo } from "react";
import { Clock3, FileText, Globe, Megaphone, MessageSquare, ShoppingBag } from "lucide-react";
import GuestGate from "@/components/GuestGate";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { readHistory } from "@/lib/storage";
import { ContentType, GenerationRecord } from "@/types/app";

const typeIcons: Record<ContentType, React.ElementType> = {
  blog: FileText,
  social: MessageSquare,
  product: ShoppingBag,
  ad: Megaphone,
};

const HistoryPage = () => {
  const { isAuthenticated } = useAuth();
  const history = useMemo(() => readHistory(), []);

  if (!isAuthenticated) {
    return (
      <GuestGate
        title="History is saved for logged-in members."
        description="Guest users can explore the generator, but saved generation history is only available after login or registration."
      />
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Generation history</h1>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          Every logged-in generation is saved locally so you can revisit drafts without hunting through tabs.
        </p>
      </div>

      {history.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-border bg-card/80 p-10 text-center text-muted-foreground shadow-soft">
          No saved drafts yet. Generate your first piece from the workspace and it will appear here.
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item: GenerationRecord) => {
            const Icon = typeIcons[item.contentType];
            return (
              <div
                key={item.id}
                className="group flex gap-4 rounded-[1.5rem] border border-border/70 bg-card/95 p-5 shadow-soft transition hover:-translate-y-0.5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="text-base font-semibold text-foreground">{item.topic}</h3>
                    <div className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock3 className="h-3 w-3" />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="mt-2 line-clamp-2 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                    {item.content}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs capitalize">
                      {item.contentType}
                    </Badge>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {item.tone}
                    </Badge>
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
      )}
    </div>
  );
};

export default HistoryPage;
