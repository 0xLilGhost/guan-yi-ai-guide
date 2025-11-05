import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

interface ZiweiData {
  mainStar: string;
  palace: string;
  keyPalaces: {
    career: string;
    wealth: string;
    relationship: string;
    health: string;
  };
}

const palaceNames = [
  '命宫', '兄弟', '夫妻', '子女',
  '财帛', '疾厄', '迁移', '奴仆',
  '官禄', '田宅', '福德', '父母'
];

export const ZiweiPalace = ({ data }: { data: ZiweiData }) => {
  return (
    <Card className="p-8 bg-card/80 backdrop-blur-sm border-accent/20">
      <h2 className="text-2xl font-bold text-accent border-b border-accent/20 pb-3 mb-6 flex items-center gap-2">
        <Star className="w-6 h-6" />
        紫微斗数 · 命盘
      </h2>

      {/* Main Star */}
      <div className="mb-8 p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg border-2 border-accent/30">
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-2">主星</div>
          <div className="text-4xl font-bold text-accent mb-2">{data.mainStar}</div>
          <div className="text-sm text-accent/80">坐守 {data.palace}</div>
        </div>
      </div>

      {/* Twelve Palaces */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-accent mb-4">十二宫位</h3>
        <div className="grid grid-cols-3 gap-2">
          {palaceNames.map((palace, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border transition-all text-center ${
                palace === data.palace
                  ? 'bg-accent/20 border-accent shadow-lg'
                  : 'bg-card/50 border-accent/20 hover:bg-accent/5'
              }`}
            >
              <div className={`text-sm font-semibold ${
                palace === data.palace ? 'text-accent' : 'text-foreground/70'
              }`}>
                {palace}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Palaces Analysis */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-accent mb-4">重要宫位分析</h3>
        
        <div className="grid gap-3">
          <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-accent">官禄宫（事业）</span>
            </div>
            <p className="text-sm text-foreground/90">{data.keyPalaces.career}</p>
          </div>

          <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-accent">财帛宫（财运）</span>
            </div>
            <p className="text-sm text-foreground/90">{data.keyPalaces.wealth}</p>
          </div>

          <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-accent">夫妻宫（姻缘）</span>
            </div>
            <p className="text-sm text-foreground/90">{data.keyPalaces.relationship}</p>
          </div>

          <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-accent">疾厄宫（健康）</span>
            </div>
            <p className="text-sm text-foreground/90">{data.keyPalaces.health}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
