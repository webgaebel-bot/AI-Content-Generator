import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Chrome, KeyRound } from "lucide-react";
import AuthShell from "@/components/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, continueWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirectTo = location.state?.from ?? "/";

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({ email, password });
    navigate(redirectTo, { replace: true });
  };

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Login and pick up right where you left off."
      description="Sign in to save drafts, unlock full history, and keep your content workflow organized across sessions."
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Login</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Guest access still works, but signed-in users get saved history and more credits.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          className="h-12 w-full justify-center gap-3 rounded-2xl"
          onClick={() => {
            continueWithGoogle();
            navigate(redirectTo, { replace: true });
          }}
        >
          <Chrome className="h-4 w-4" />
          Continue with Google
        </Button>

        <div className="relative text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <span className="bg-card px-3">or use email</span>
          <div className="absolute left-0 top-1/2 -z-10 h-px w-full -translate-y-1/2 bg-border" />
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <Button type="submit" size="lg" className="h-12 w-full rounded-2xl">
            <KeyRound className="mr-2 h-4 w-4" />
            Login
          </Button>
        </form>

        <p className="text-sm text-muted-foreground">
          New here?{" "}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </AuthShell>
  );
};

export default LoginPage;
