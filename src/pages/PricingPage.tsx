import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Get started with AI content generation",
    credits: "10 credits/month",
    features: ["All content types", "English & Urdu", "Copy to clipboard", "Basic export"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For professionals and small teams",
    credits: "200 credits/month",
    features: ["Everything in Free", "Priority generation", "DOCX & PDF export", "History dashboard", "Tone customization"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$49",
    period: "/month",
    description: "Unlimited power for agencies",
    credits: "Unlimited credits",
    features: ["Everything in Pro", "API access", "Team collaboration", "Custom templates", "Dedicated support"],
    highlighted: false,
  },
];

const PricingPage = () => (
  <div className="mx-auto max-w-5xl space-y-10">
    <div className="text-center">
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        Simple, Transparent <span className="gradient-text">Pricing</span>
      </h1>
      <p className="mt-2 text-muted-foreground">Choose the plan that fits your content needs</p>
    </div>

    <div className="grid gap-6 sm:grid-cols-3">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`relative flex flex-col rounded-2xl border-2 p-6 transition-all ${
            plan.highlighted
              ? "border-primary shadow-elevated scale-[1.02]"
              : "border-border bg-card shadow-card hover:shadow-elevated"
          }`}
        >
          {plan.highlighted && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
              Most Popular
            </div>
          )}
          <div>
            <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
          </div>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
            <span className="text-sm text-muted-foreground">{plan.period}</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-sm font-medium text-accent">
            <Zap className="h-4 w-4" />
            {plan.credits}
          </div>
          <ul className="mt-6 flex-1 space-y-3">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                <Check className="h-4 w-4 shrink-0 text-accent" />
                {feature}
              </li>
            ))}
          </ul>
          <Button
            className={`mt-6 w-full ${
              plan.highlighted
                ? "gradient-primary text-primary-foreground hover:opacity-90"
                : ""
            }`}
            variant={plan.highlighted ? "default" : "outline"}
          >
            {plan.name === "Free" ? "Get Started" : "Upgrade"}
          </Button>
        </div>
      ))}
    </div>
  </div>
);

export default PricingPage;
