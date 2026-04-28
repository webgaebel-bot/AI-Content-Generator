import { useMemo, useState } from "react";
import {
  FileText,
  Loader2,
  Megaphone,
  MessageSquare,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import ContentTypeCard from "@/components/ContentTypeCard";
import GeneratedContent from "@/components/GeneratedContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { guestUsageLimit, readGuestUsage, readHistory, writeGuestUsage, writeHistory } from "@/lib/storage";
import { ContentType, GenerationRecord, LanguageOption, Tone } from "@/types/app";

const contentTypes: { id: ContentType; icon: typeof FileText; label: string; description: string }[] = [
  { id: "blog", icon: FileText, label: "Blog Post", description: "Editorial pieces and explainers" },
  { id: "social", icon: MessageSquare, label: "Social Media", description: "Captions, threads, and launches" },
  { id: "product", icon: ShoppingBag, label: "Product Copy", description: "Landing page and listing text" },
  { id: "ad", icon: Megaphone, label: "Ad Campaign", description: "Short persuasive campaigns" },
];

const Generator = () => {
  const { isAuthenticated, user } = useAuth();
  const [contentType, setContentType] = useState<ContentType>("blog");
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState<Tone>("formal");
  const [language, setLanguage] = useState<LanguageOption>("english");
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [usageCount, setUsageCount] = useState(() => readGuestUsage());

  const guestGenerationsLeft = Math.max(guestUsageLimit - usageCount, 0);
  const canGenerate = isAuthenticated || guestGenerationsLeft > 0;

  const generatorMessage = useMemo(() => {
    if (isAuthenticated) {
      return `Signed in as ${user?.name}. Your generations will be saved to history automatically.`;
    }

    return guestGenerationsLeft > 0
      ? `Guest mode is active. You still have ${guestGenerationsLeft} trial generation${guestGenerationsLeft === 1 ? "" : "s"} left.`
      : "Guest limit reached. Login or register to keep generating and save your drafts.";
  }, [guestGenerationsLeft, isAuthenticated, user?.name]);

  const buildContent = () => {
    const keywordLine = keywords.trim()
      ? keywords
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
          .join(", ")
      : "No supporting keywords provided";

    if (language === "urdu") {
      return `عنوان: ${topic}

خلاصہ:
یہ ${contentType === "blog" ? "مضمون" : contentType === "social" ? "سوشل پوسٹ" : contentType === "product" ? "پروڈکٹ کاپی" : "اشتہاری مسودہ"} آپ کے موضوع "${topic}" کے لیے تیار کیا گیا ہے۔

مرکزی نکات:
- لہجہ: ${tone}
- مطلوبہ الفاظ: ${keywordLine}
- مقصد: واضح، قابلِ استعمال، اور قدرتی انداز میں لکھا گیا مواد

نمونہ متن:
${topic} کے بارے میں اچھی تحریر وہ ہوتی ہے جو قاری کو فوراً سمجھ آئے، ضرورت کے مطابق فائدہ دے، اور غیر ضروری مشکل الفاظ کے بغیر اعتماد پیدا کرے۔ اسی لیے یہ کاپی ایک سیدھے، پیشہ ور، اور انسانوں کے لکھے ہوئے انداز کے قریب رکھی گئی ہے تاکہ آپ اسے فوری طور پر استعمال یا مزید بہتر کر سکیں۔`;
    }

    if (language === "both") {
      return `# ${topic}

## English Draft
${topic} deserves content that feels useful, specific, and believable. This draft uses a ${tone} tone, works the keywords in naturally, and keeps the structure practical so your team can publish faster without rewriting everything from scratch.

Keywords: ${keywordLine}

## Urdu Draft
${topic} کے لیے یہ مسودہ ایسا رکھا گیا ہے جو قدرتی، واضح، اور کام کے قابل محسوس ہو۔ اس میں مطلوبہ الفاظ کو زبردستی شامل کرنے کے بجائے روانی کے ساتھ استعمال کیا گیا ہے تاکہ عبارت مشینی نہ لگے بلکہ انسانی انداز کے قریب رہے۔`;
    }

    return `# ${topic}

This ${contentType} draft is shaped in a ${tone} tone and built to feel clear, grounded, and publishable. Instead of sounding generic, it focuses on one practical promise: helping your audience understand the value quickly and trust the message.

Keywords: ${keywordLine}

Suggested direction:
- Open with the real problem or opportunity.
- Add one credible benefit with concrete language.
- Close with a calm, specific next step.

Working paragraph:
When people search for ${topic}, they usually want something more useful than polished filler. They want language that respects their time, answers the obvious question, and sounds like it came from a capable human team. This draft is designed around that idea so you can use it as-is or refine it into a stronger final version.`;
  };

  const handleGenerate = async () => {
    if (!topic.trim() || !canGenerate) return;
    setLoading(true);
    setGeneratedContent("");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const sampleContent = buildContent();
    setGeneratedContent(sampleContent);

    const nextRecord: GenerationRecord = {
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}`,
      createdAt: new Date().toISOString(),
      contentType,
      topic,
      keywords,
      tone,
      language,
      content: sampleContent,
    };

    if (isAuthenticated) {
      writeHistory([nextRecord, ...readHistory()].slice(0, 24));
    } else {
      const nextUsage = usageCount + 1;
      writeGuestUsage(nextUsage);
      setUsageCount(nextUsage);
    }

    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] border border-border/70 bg-card/90 p-8 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Human-sounding drafts
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Write sharper blog posts, ads, and product copy in English or Urdu.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            This workspace keeps the interface calm, practical, and less robotic. Guests can try it with limits,
            while logged-in users get saved history and more room to work.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm text-secondary-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            {generatorMessage}
          </div>
        </div>

        <div className="rounded-[2rem] border border-border/70 bg-[#f3e8d7] p-6 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7d5f45]">Access model</p>
          <div className="mt-4 space-y-4 text-sm leading-7 text-[#503e30]">
            <div className="rounded-2xl bg-white/70 p-4">
              <p className="font-medium">Guest mode</p>
              <p>Quick trials without login, limited to {guestUsageLimit} generations and no saved history.</p>
            </div>
            <div className="rounded-2xl bg-white/70 p-4">
              <p className="font-medium">Member mode</p>
              <p>Login or register to unlock saved drafts, better credit balance, and private history.</p>
            </div>
          </div>
          {!isAuthenticated && (
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild className="rounded-full px-5">
                <Link to="/register">Register</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-[#bba17d] bg-transparent px-5 text-[#503e30] hover:bg-white/70"
              >
                <Link to="/login">Login</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <div className="space-y-3">
        <Label className="text-sm font-semibold text-foreground">Content Type</Label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
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

      <div className="grid gap-5 rounded-[2rem] border border-border/70 bg-card/95 p-6 shadow-soft sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="topic">Topic *</Label>
          <Input
            id="topic"
            placeholder="e.g., Why local brands need clearer product storytelling"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="keywords">Keywords</Label>
          <Textarea
            id="keywords"
            placeholder="content strategy, product messaging, small business branding"
            value={keywords}
            onChange={(event) => setKeywords(event.target.value)}
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label>Tone</Label>
          <Select value={tone} onValueChange={(value) => setTone(value as Tone)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="formal">Formal</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="persuasive">Persuasive</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Language</Label>
          <Select value={language} onValueChange={(value) => setLanguage(value as LanguageOption)}>
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
            disabled={loading || !topic.trim() || !canGenerate}
            className="w-full gap-2 rounded-2xl bg-foreground text-background transition hover:bg-foreground/92"
            size="lg"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? "Generating..." : canGenerate ? "Generate Content" : "Login to continue"}
          </Button>
        </div>
      </div>

      {generatedContent && <GeneratedContent content={generatedContent} language={language} />}
    </div>
  );
};

export default Generator;
