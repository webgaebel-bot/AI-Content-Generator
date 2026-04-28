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
    className={`group flex flex-col items-start gap-3 rounded-[1.5rem] border p-5 text-left transition-all ${
      selected
        ? "border-foreground bg-[#fffaf2] shadow-soft"
        : "border-border/70 bg-card/95 hover:-translate-y-0.5 hover:border-[#b99268] hover:shadow-soft"
    }`}
  >
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
        selected ? "bg-foreground" : "bg-secondary group-hover:bg-[#f3e8d7]"
      }`}
    >
      <Icon className={`h-5 w-5 ${selected ? "text-background" : "text-muted-foreground group-hover:text-primary"}`} />
    </div>
    <div>
      <p className="text-sm font-semibold text-foreground">{label}</p>
      <p className="mt-1 text-xs leading-6 text-muted-foreground">{description}</p>
    </div>
  </button>
);

export default ContentTypeCard;
