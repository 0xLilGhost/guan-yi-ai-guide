import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface CategoryCardProps {
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  gradient: string;
  index: number;
}

const CategoryCard = ({
  titleKey,
  subtitleKey,
  descriptionKey,
  gradient,
  index,
}: CategoryCardProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const title = t(titleKey);
  const subtitle = t(subtitleKey);
  const description = t(descriptionKey);

  const handleClick = () => {
    navigate('/inquiry', { state: { category: title } });
  };

  return (
    <Card
      onClick={handleClick}
      className={cn(
        "group relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm",
        "hover:border-accent/50 hover:shadow-gold-glow transition-mystical cursor-pointer",
        "animate-fade-in"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Background gradient */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-mystical",
          gradient
        )}
      ></div>

      {/* Content */}
      <div className="relative p-8 space-y-6">
        {/* Icon */}
        <div className="flex items-center justify-between">
          <div className="w-16 h-16 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-mystical flex items-center justify-center border-2 border-accent/30 group-hover:border-accent/50">
            <span className="text-3xl font-bold text-accent">易</span>
          </div>
          <div className="text-accent/30 text-6xl font-bold group-hover:text-accent/50 transition-mystical">
            {index + 1}
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-mystical">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground uppercase tracking-wider">
            {subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Decorative line */}
        <div className="h-px bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0 opacity-0 group-hover:opacity-100 transition-mystical"></div>
      </div>

      {/* Corner decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-accent/20 opacity-0 group-hover:opacity-100 transition-mystical"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-accent/20 opacity-0 group-hover:opacity-100 transition-mystical"></div>
    </Card>
  );
};

export default CategoryCard;
