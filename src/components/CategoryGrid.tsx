import CategoryCard from "./CategoryCard";
import BaguaDiagram from "./BaguaDiagram";
import { useTranslation } from "react-i18next";

const CategoryGrid = () => {
  const { t } = useTranslation();
  
  const categories = [
    {
      titleKey: "categories.career.title",
      subtitleKey: "categories.career.subtitle",
      descriptionKey: "categories.career.description",
      gradient: "from-red-900/40 to-red-950/40",
    },
    {
      titleKey: "categories.love.title",
      subtitleKey: "categories.love.subtitle",
      descriptionKey: "categories.love.description",
      gradient: "from-pink-900/40 to-rose-950/40",
    },
    {
      titleKey: "categories.health.title",
      subtitleKey: "categories.health.subtitle",
      descriptionKey: "categories.health.description",
      gradient: "from-green-900/40 to-emerald-950/40",
    },
    {
      titleKey: "categories.fengshui.title",
      subtitleKey: "categories.fengshui.subtitle",
      descriptionKey: "categories.fengshui.description",
      gradient: "from-amber-900/40 to-yellow-950/40",
    },
    {
      titleKey: "categories.general.title",
      subtitleKey: "categories.general.subtitle",
      descriptionKey: "categories.general.description",
      gradient: "from-purple-900/40 to-indigo-950/40",
    },
  ];
  

  return (
    <section className="relative px-6 py-32">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-24 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-accent">
            {t('categories.sectionTitle')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('categories.sectionSubtitle')}
          </p>
        </div>

        {/* Circular category layout */}
        <div className="relative w-full max-w-4xl mx-auto aspect-square">
          {/* Center Bagua Diagram */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]">
            <BaguaDiagram />
          </div>

          {/* Categories arranged in circle */}
          {categories.map((category, index) => {
            const angle = (index * 72 - 90) * (Math.PI / 180); // 72 degrees apart, starting from top
            const radius = 45; // percentage of container
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);
            
            return (
              <div
                key={index}
                className="absolute w-56"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <CategoryCard {...category} index={index} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
