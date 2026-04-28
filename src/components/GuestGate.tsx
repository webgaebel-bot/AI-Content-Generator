import { Link } from "react-router-dom";
import { LockKeyhole, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GuestGateProps {
  title: string;
  description: string;
}

const GuestGate = ({ title, description }: GuestGateProps) => {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center rounded-[2rem] border border-border/70 bg-card/90 p-8 text-center shadow-soft">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <LockKeyhole className="h-6 w-6" />
      </div>
      <h1 className="mt-5 text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
      <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">{description}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg" className="rounded-full px-6">
          <Link to="/register">Create account</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="rounded-full px-6">
          <Link to="/login">Login</Link>
        </Button>
      </div>
      <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-medium text-secondary-foreground">
        <Sparkle className="h-3.5 w-3.5" />
        Guest mode still lets you try the generator with limited usage.
      </div>
    </div>
  );
};

export default GuestGate;
