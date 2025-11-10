import CategoryCard from "./CategoryCard";
import BaguaDiagram from "./BaguaDiagram";

const categories = [
  {
    title: "事业运势",
    subtitle: "Career Fortune",
    description: "职场发展 · 投资决策 · 事业转机",
    gradient: "from-red-900/40 to-red-950/40",
  },
  {
    title: "情感婚姻",
    subtitle: "Love & Marriage",
    description: "姻缘配对 · 情感走向 · 婚姻和合",
    gradient: "from-pink-900/40 to-rose-950/40",
  },
  {
    title: "健康养生",
    subtitle: "Health & Wellness",
    description: "五行调理 · 身心平衡 · 养生之道",
    gradient: "from-green-900/40 to-emerald-950/40",
  },
  {
    title: "风水布局",
    subtitle: "Feng Shui",
    description: "家居布局 · 财位分析 · 气场调整",
    gradient: "from-amber-900/40 to-yellow-950/40",
  },
  {
    title: "综合占卜",
    subtitle: "General Divination",
    description: "吉凶预测 · 时机把握 · 趋吉避凶",
    gradient: "from-purple-900/40 to-indigo-950/40",
  },
];

const CategoryGrid = () => {
  return (
    <section className="relative px-6 py-32">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-24 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-accent">
            选择咨询类别
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose Your Path of Inquiry
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
