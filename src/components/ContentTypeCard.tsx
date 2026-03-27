import { LucideIcon } from "lucide-react";

interface ContentTypeCardProps {
  icon: LucideIcon;
  label: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

const ContentTypeCard = ({ icon: Icon, label, description, selected, onClick }: ContentTypeCardProps) => (
  <button
    onClick={onClick}
    className={`group flex flex-col items-start gap-2 rounded-xl border-2 p-4 text-left transition-all ${
      selected
        ? "border-primary bg-primary/5 shadow-card"
        : "border-border bg-card hover:border-primary/30 hover:shadow-card"
    }`}
  >
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
        selected ? "gradient-primary" : "bg-muted group-hover:bg-primary/10"
      }`}
    >
      <Icon className={`h-5 w-5 ${selected ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"}`} />
    </div>
    <div>
      <p className="text-sm font-semibold text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  </button>
);

export default ContentTypeCard;
