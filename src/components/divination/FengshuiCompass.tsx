import { Card } from "@/components/ui/card";
import { Compass } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

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
    <TooltipProvider>
      <Card className="p-6 bg-card/80 backdrop-blur-sm border-accent/20 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-accent border-b border-accent/20 pb-2 mb-4 flex items-center gap-2">
          <Compass className="w-5 h-5" />
          风水罗盘 · 方位分析
        </h2>

        {/* Compass */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-56 h-56">
            {/* Outer circle */}
            <div className="absolute inset-0 rounded-full border-4 border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10" />
            
            {/* Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
                <Compass className="w-6 h-6 text-accent" />
              </div>
            </div>

            {/* Directions */}
            {directions.map((dir, index) => {
              const isFavorable = data.favorableDirection.some(d => d.includes(dir.name));
              const isUnfavorable = data.unfavorableDirection.some(d => d.includes(dir.name));
              const radius = 105;
              const angle = (dir.angle - 90) * (Math.PI / 180);
              const x = radius * Math.cos(angle);
              const y = radius * Math.sin(angle);

              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <div
                      className="absolute"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      }}
                    >
                      <div className={`
                        px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap cursor-help
                        ${isFavorable ? 'bg-green-500/20 text-green-600 border-2 border-green-500 shadow-lg' : ''}
                        ${isUnfavorable ? 'bg-red-500/20 text-red-600 border-2 border-red-500' : ''}
                        ${!isFavorable && !isUnfavorable ? 'bg-accent/10 text-accent/60 border border-accent/30' : ''}
                      `}>
                        {dir.name}
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isFavorable && "吉方：有利方位，宜朝向此方"}
                    {isUnfavorable && "凶方：不利方位，应避免"}
                    {!isFavorable && !isUnfavorable && "中性方位"}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>

        {/* Directions Summary */}
        <div className="grid md:grid-cols-2 gap-3 mb-4">
          <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
            <div className="text-xs font-semibold text-green-600 mb-1">吉方位</div>
            <div className="text-sm text-green-700 font-bold">
              {data.favorableDirection.join('、')}
            </div>
          </div>
          <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/30">
            <div className="text-xs font-semibold text-red-600 mb-1">凶方位</div>
            <div className="text-sm text-red-700 font-bold">
              {data.unfavorableDirection.join('、')}
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-accent mb-2">调理建议</h3>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="p-3 bg-accent/5 rounded-lg border border-accent/20 cursor-help">
                <div className="text-xs text-muted-foreground mb-0.5">建议颜色</div>
                <div className="text-sm font-semibold text-accent">{data.suggestions.color}</div>
              </div>
            </TooltipTrigger>
            <TooltipContent>根据五行选择合适的颜色增强气场</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="p-3 bg-accent/5 rounded-lg border border-accent/20 cursor-help">
                <div className="text-xs text-muted-foreground mb-0.5">补充五行</div>
                <div className="text-sm font-semibold text-accent">{data.suggestions.element}</div>
              </div>
            </TooltipTrigger>
            <TooltipContent>应用对应五行属性的物品来调和气场</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="p-3 bg-accent/5 rounded-lg border border-accent/20 cursor-help">
                <div className="text-xs text-muted-foreground mb-1">摆设建议</div>
                <p className="text-xs text-foreground/90 leading-relaxed">{data.suggestions.placement}</p>
              </div>
            </TooltipTrigger>
            <TooltipContent>家居或办公空间的摆设建议</TooltipContent>
          </Tooltip>
        </div>
      </Card>
    </TooltipProvider>
  );
};