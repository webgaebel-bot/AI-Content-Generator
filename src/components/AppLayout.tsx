import { Link, useLocation } from "react-router-dom";
import { Sparkles, History, CreditCard, Zap } from "lucide-react";

const navItems = [
  { to: "/", label: "Generator", icon: Sparkles },
  { to: "/history", label: "History", icon: History },
  { to: "/pricing", label: "Pricing", icon: CreditCard },
];

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              AI Content Generator
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Credits badge */}
          <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1.5">
            <Zap className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-semibold text-foreground">50 credits</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container py-8">{children}</main>
    </div>
  );
};

export default AppLayout;
