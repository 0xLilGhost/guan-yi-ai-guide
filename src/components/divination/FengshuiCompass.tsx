import { Card } from "@/components/ui/card";
import { Compass } from "lucide-react";

interface FengshuiData {
  favorableDirection: string[];
  unfavorableDirection: string[];
  suggestions: {
    color: string;
    element: string;
    placement: string;
  };
}

const directions = [
  { name: '北', angle: 0 },
  { name: '东北', angle: 45 },
  { name: '东', angle: 90 },
  { name: '东南', angle: 135 },
  { name: '南', angle: 180 },
  { name: '西南', angle: 225 },
  { name: '西', angle: 270 },
  { name: '西北', angle: 315 },
];

export const FengshuiCompass = ({ data }: { data: FengshuiData }) => {
  return (
    <Card className="p-8 bg-card/80 backdrop-blur-sm border-accent/20">
      <h2 className="text-2xl font-bold text-accent border-b border-accent/20 pb-3 mb-6 flex items-center gap-2">
        <Compass className="w-6 h-6" />
        风水罗盘 · 方位分析
      </h2>

      {/* Compass */}
      <div className="mb-8 flex justify-center">
        <div className="relative w-64 h-64">
          {/* Outer circle */}
          <div className="absolute inset-0 rounded-full border-4 border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10" />
          
          {/* Center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
              <Compass className="w-8 h-8 text-accent" />
            </div>
          </div>

          {/* Directions */}
          {directions.map((dir, index) => {
            const isFavorable = data.favorableDirection.some(d => d.includes(dir.name));
            const isUnfavorable = data.unfavorableDirection.some(d => d.includes(dir.name));
            const radius = 120;
            const angle = (dir.angle - 90) * (Math.PI / 180);
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            return (
              <div
                key={index}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
              >
                <div className={`
                  px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap
                  ${isFavorable ? 'bg-green-500/20 text-green-600 border-2 border-green-500 shadow-lg' : ''}
                  ${isUnfavorable ? 'bg-red-500/20 text-red-600 border-2 border-red-500' : ''}
                  ${!isFavorable && !isUnfavorable ? 'bg-accent/10 text-accent/60 border border-accent/30' : ''}
                `}>
                  {dir.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Directions Summary */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
          <div className="text-sm font-semibold text-green-600 mb-2">吉方位</div>
          <div className="text-green-700 font-bold">
            {data.favorableDirection.join('、')}
          </div>
        </div>
        <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
          <div className="text-sm font-semibold text-red-600 mb-2">凶方位</div>
          <div className="text-red-700 font-bold">
            {data.unfavorableDirection.join('、')}
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-accent mb-3">调理建议</h3>
        
        <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
          <div className="text-sm text-muted-foreground mb-1">建议颜色</div>
          <div className="text-lg font-semibold text-accent">{data.suggestions.color}</div>
        </div>

        <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
          <div className="text-sm text-muted-foreground mb-1">补充五行</div>
          <div className="text-lg font-semibold text-accent">{data.suggestions.element}</div>
        </div>

        <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
          <div className="text-sm text-muted-foreground mb-2">摆设建议</div>
          <p className="text-foreground/90 leading-relaxed">{data.suggestions.placement}</p>
        </div>
      </div>
    </Card>
  );
};
