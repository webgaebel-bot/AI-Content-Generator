import { GenerationRecord, UserSession } from "@/types/app";

const AUTH_KEY = "acg-auth-session";
const HISTORY_KEY = "acg-history";
const GUEST_USAGE_KEY = "acg-guest-usage";

export const guestUsageLimit = 2;

export const readSession = (): UserSession | null => {
  const raw = window.localStorage.getItem(AUTH_KEY);
  return raw ? (JSON.parse(raw) as UserSession) : null;
};

export const writeSession = (session: UserSession | null) => {
  if (!session) {
    window.localStorage.removeItem(AUTH_KEY);
    return;
  }

  window.localStorage.setItem(AUTH_KEY, JSON.stringify(session));
};

export const readHistory = (): GenerationRecord[] => {
  const raw = window.localStorage.getItem(HISTORY_KEY);
  return raw ? (JSON.parse(raw) as GenerationRecord[]) : [];
};

export const writeHistory = (history: GenerationRecord[]) => {
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

export const readGuestUsage = () => {
  return Number(window.localStorage.getItem(GUEST_USAGE_KEY) ?? "0");
};

export const writeGuestUsage = (count: number) => {
  window.localStorage.setItem(GUEST_USAGE_KEY, String(count));
};
