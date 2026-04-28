import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { readSession, writeSession } from "@/lib/storage";
import { UserSession } from "@/types/app";

interface AuthContextValue {
  user: UserSession | null;
  isAuthenticated: boolean;
  login: (input: { email: string; password: string }) => void;
  register: (input: { name: string; email: string; password: string }) => void;
  continueWithGoogle: () => void;
  logout: () => void;
  setPlan: (plan: UserSession["plan"]) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const makeSession = (input: Partial<UserSession> & Pick<UserSession, "name" | "email" | "provider">): UserSession => ({
  id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}`,
  name: input.name,
  email: input.email,
  provider: input.provider,
  plan: input.plan ?? "free",
  credits: input.credits ?? 25,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    setUser(readSession());
  }, []);

  const persist = (session: UserSession | null) => {
    setUser(session);
    writeSession(session);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login: ({ email }) => {
        const name = email.split("@")[0].replace(/[._-]/g, " ");
        persist(
          makeSession({
            name: name.replace(/\b\w/g, (char) => char.toUpperCase()),
            email,
            provider: "email",
          }),
        );
      },
      register: ({ name, email }) => {
        persist(
          makeSession({
            name,
            email,
            provider: "email",
          }),
        );
      },
      continueWithGoogle: () => {
        persist(
          makeSession({
            name: "Google User",
            email: "google.user@example.com",
            provider: "google",
          }),
        );
      },
      logout: () => persist(null),
      setPlan: (plan) => {
        if (!user) return;

        persist({
          ...user,
          plan,
          credits: plan === "pro" ? 200 : 25,
        });
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
