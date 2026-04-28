import { CreditCard, History, LogOut, Menu, PenSquare, UserRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { guestUsageLimit, readGuestUsage } from "@/lib/storage";

const navItems = [
  { to: "/", label: "Workspace", icon: PenSquare },
  { to: "/history", label: "History", icon: History },
  { to: "/pricing", label: "Pricing", icon: CreditCard },
];

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const guestGenerationsLeft = Math.max(guestUsageLimit - readGuestUsage(), 0);
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(79,70,55,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(184,115,51,0.12),transparent_22%),linear-gradient(180deg,#f7f1e8_0%,#fbf8f3_42%,#f3ede4_100%)]" />

      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/82 backdrop-blur-xl">
        <div className="container flex h-20 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border/80 bg-card shadow-soft">
              <PenSquare className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                Studio
              </p>
              <span className="text-lg font-semibold tracking-tight text-foreground">Content Draft</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 rounded-full border border-border/70 bg-card/70 p-1.5 shadow-soft md:flex">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {!isAuthPage && (
              <div className="hidden rounded-full border border-border/80 bg-card/80 px-4 py-2 text-xs font-medium text-muted-foreground shadow-soft sm:block">
                {isAuthenticated
                  ? `${user?.credits ?? 0} credits on ${user?.plan ?? "free"}`
                  : `${guestGenerationsLeft} guest generations left`}
              </div>
            )}

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-11 rounded-full px-4">
                    <UserRound className="mr-2 h-4 w-4" />
                    {user?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem className="flex-col items-start">
                    <span className="font-medium">{user?.email}</span>
                    <span className="text-xs text-muted-foreground">
                      {user?.provider === "google" ? "Google account" : "Email account"}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <Button asChild variant="ghost" className="rounded-full">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="rounded-full px-5">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 md:hidden">
                {navItems.map((item) => (
                  <DropdownMenuItem key={item.to} asChild>
                    <Link to={item.to} className="flex w-full items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                {!isAuthenticated && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/login">Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/register">Register</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container py-8">{children}</main>
    </div>
  );
};

export default AppLayout;
