export type ContentType = "blog" | "social" | "product" | "ad";

export type Tone = "formal" | "casual" | "persuasive" | "expert";

export type LanguageOption = "english" | "urdu" | "both";

export interface GenerationRecord {
  id: string;
  createdAt: string;
  contentType: ContentType;
  topic: string;
  keywords: string;
  tone: Tone;
  language: LanguageOption;
  content: string;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  provider: "email" | "google";
  plan: "guest" | "free" | "pro";
  credits: number;
}
