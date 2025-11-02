import { Briefcase, Heart, Sprout, Home, Sparkles } from "lucide-react";
import CategoryCard from "./CategoryCard";

const categories = [
  {
    icon: Briefcase,
    title: "事业运势",
    subtitle: "Career Fortune",
    description: "职场发展 · 投资决策 · 事业转机",
    gradient: "from-red-900/40 to-red-950/40",
  },
  {
    icon: Heart,
    title: "情感婚姻",
    subtitle: "Love & Marriage",
    description: "姻缘配对 · 情感走向 · 婚姻和合",
    gradient: "from-pink-900/40 to-rose-950/40",
  },
  {
    icon: Sprout,
    title: "健康养生",
    subtitle: "Health & Wellness",
    description: "五行调理 · 身心平衡 · 养生之道",
    gradient: "from-green-900/40 to-emerald-950/40",
  },
  {
    icon: Home,
    title: "风水布局",
    subtitle: "Feng Shui",
    description: "家居布局 · 财位分析 · 气场调整",
    gradient: "from-amber-900/40 to-yellow-950/40",
  },
  {
    icon: Sparkles,
    title: "综合占卜",
    subtitle: "General Divination",
    description: "吉凶预测 · 时机把握 · 趋吉避凶",
    gradient: "from-purple-900/40 to-indigo-950/40",
  },
];

const CategoryGrid = () => {
  return (
    <section className="relative px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-accent">
            选择咨询类别
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose Your Path of Inquiry
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
