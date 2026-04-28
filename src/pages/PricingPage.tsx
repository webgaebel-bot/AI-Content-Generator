import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "/month",
    description: "Try the workflow without pressure",
    credits: "25 credits/month",
    features: ["All core content types", "English and Urdu drafts", "Copy and text export", "Guest mode available"],
    highlighted: false,
    plan: "free",
  },
  {
    name: "Studio Pro",
    price: "$19",
    period: "/month",
    description: "Best fit for freelancers and agencies",
    credits: "200 credits/month",
    features: ["Everything in Starter", "Higher monthly credits", "Saved working history", "Priority-ready workflow", "Pro plan badge in app"],
    highlighted: true,
    plan: "pro",
  },
  {
    name: "Team",
    price: "$49",
    period: "/month",
    description: "Reserved visual concept for future backend rollout",
    credits: "Contact us",
    features: ["Shared seats", "Approvals", "Template libraries", "Admin controls", "Priority support"],
    highlighted: false,
    plan: "pro",
  },
] as const;

const PricingPage = () => {
  const { user, setPlan } = useAuth();

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <div className="grid gap-6 rounded-[2rem] border border-border/70 bg-card/90 p-8 shadow-soft lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Pricing</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">Choose the plan that matches your writing volume.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            The app now supports guest access, free accounts, and a stronger pro mode so the product feels more believable and usable, not just like a visual template.
          </p>
        </div>
        <div className="rounded-[1.75rem] bg-[#f3e8d7] p-6 text-[#503e30]">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3 py-1 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            Active plan
          </div>
          <p className="mt-4 text-3xl font-semibold capitalize">{user?.plan ?? "guest"}</p>
          <p className="mt-2 text-sm leading-7">
            {user ? `${user.credits} credits available for this account.` : "You are browsing in guest mode with limited generations."}
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col rounded-[2rem] border p-6 transition-all ${
              plan.highlighted
                ? "border-foreground bg-foreground text-background shadow-soft"
                : "border-border/70 bg-card/95 shadow-soft"
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-3 left-6 rounded-full bg-[#dca874] px-3 py-1 text-xs font-semibold text-[#38291e]">
                Best value
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className={`mt-1 text-sm ${plan.highlighted ? "text-background/72" : "text-muted-foreground"}`}>
                {plan.description}
              </p>
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-semibold">{plan.price}</span>
              <span className={`text-sm ${plan.highlighted ? "text-background/70" : "text-muted-foreground"}`}>
                {plan.period}
              </span>
            </div>
            <div className={`mt-2 text-sm font-medium ${plan.highlighted ? "text-[#f3d7b3]" : "text-primary"}`}>
              {plan.credits}
            </div>
            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check className={`h-4 w-4 shrink-0 ${plan.highlighted ? "text-[#f3d7b3]" : "text-primary"}`} />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className={`mt-6 w-full rounded-2xl ${
                plan.highlighted ? "bg-background text-foreground hover:bg-background/90" : ""
              }`}
              variant={plan.highlighted ? "secondary" : "outline"}
              onClick={() => setPlan(plan.plan)}
            >
              {plan.plan === "free" ? "Switch to Starter" : "Choose Pro"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
