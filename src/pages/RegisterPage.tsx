import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Chrome, UserPlus } from "lucide-react";
import AuthShell from "@/components/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, continueWithGoogle } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    register({ name, email, password });
    navigate("/", { replace: true });
  };

  return (
    <AuthShell
      eyebrow="Create your space"
      title="Register once, then build faster with saved content and credits."
      description="Set up a simple account, continue with Google, and keep guest mode available whenever you just want a quick test."
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Register</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account starts on the free plan with enough credits to explore properly.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          className="h-12 w-full justify-center gap-3 rounded-2xl"
          onClick={() => {
            continueWithGoogle();
            navigate("/", { replace: true });
          }}
        >
          <Chrome className="h-4 w-4" />
          Continue with Google
        </Button>

        <div className="relative text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <span className="bg-card px-3">or register with email</span>
          <div className="absolute left-0 top-1/2 -z-10 h-px w-full -translate-y-1/2 bg-border" />
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              placeholder="Ayesha Khan"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-email">Email</Label>
            <Input
              id="register-email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-password">Password</Label>
            <Input
              id="register-password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <Button type="submit" size="lg" className="h-12 w-full rounded-2xl">
            <UserPlus className="mr-2 h-4 w-4" />
            Create account
          </Button>
        </form>

        <p className="text-sm text-muted-foreground">
          Already registered?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </AuthShell>
  );
};

export default RegisterPage;
