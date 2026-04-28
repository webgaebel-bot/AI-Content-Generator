import { Link } from "react-router-dom";
import { ArrowLeft, BadgeCheck } from "lucide-react";

const AuthShell = ({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-6xl items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-ink px-8 py-10 text-white shadow-soft lg:px-12 lg:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(220,168,116,0.28),transparent_30%)]" />
        <div className="relative">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/80 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to workspace
          </Link>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">{eyebrow}</p>
          <h1 className="mt-4 max-w-md text-4xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/76">{description}</p>
          <div className="mt-10 space-y-4 text-sm text-white/84">
            {[
              "Save every generation in your personal history.",
              "Unlock higher monthly credits and cleaner export options.",
              "Keep guest access available for quick trials before signup.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-border/70 bg-card/95 p-6 shadow-soft lg:p-8">
        {children}
      </section>
    </div>
  );
};

export default AuthShell;
