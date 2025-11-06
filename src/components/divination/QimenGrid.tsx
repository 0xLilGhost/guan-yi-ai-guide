import { Card } from "@/components/ui/card";
import { Compass } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface QimenData {
  palace: string;
  gate: string;
  star: string;
  direction: string;
  timing: string;
}

const palacePositions: Record<string, { row: number; col: number }> = {
  '巽宫': { row: 0, col: 0 },
  '离宫': { row: 0, col: 1 },
  '坤宫': { row: 0, col: 2 },
  '震宫': { row: 1, col: 0 },
  '中宫': { row: 1, col: 1 },
  '兑宫': { row: 1, col: 2 },
  '艮宫': { row: 2, col: 0 },
  '坎宫': { row: 2, col: 2 },
  '乾宫': { row: 2, col: 2 },
};

const palaceDirections: Record<string, string> = {
  '巽宫': '东南',
  '离宫': '南',
  '坤宫': '西南',
  '震宫': '东',
  '中宫': '中',
  '兑宫': '西',
  '艮宫': '东北',
  '坎宫': '北',
  '乾宫': '西北',
};

export const QimenGrid = ({ data }: { data: QimenData }) => {
  const grid = [
    ['巽宫', '离宫', '坤宫'],
    ['震宫', '中宫', '兑宫'],
    ['艮宫', '坎宫', '乾宫'],
  ];

  return (
    <TooltipProvider>
      <Card className="p-6 bg-card/80 backdrop-blur-sm border-accent/20 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-accent border-b border-accent/20 pb-2 mb-4 flex items-center gap-2">
          <Compass className="w-5 h-5" />
          奇门遁甲 · 九宫格局
        </h2>

        {/* Nine Palaces Grid */}
        <div className="mb-6">
          <div className="grid grid-cols-3 gap-1.5 max-w-xs mx-auto">
            {grid.map((row, rowIndex) => 
              row.map((palace, colIndex) => {
                const isActive = palace === data.palace;
                return (
                  <Tooltip key={`${rowIndex}-${colIndex}`}>
                    <TooltipTrigger asChild>
                      <div
                        className={`aspect-square border-2 rounded-lg p-2 transition-all cursor-help ${
                          isActive
                            ? 'bg-accent/20 border-accent shadow-[0_0_15px_hsl(var(--accent)/0.3)] scale-105'
                            : 'bg-card/50 border-accent/30 hover:bg-accent/5'
                        }`}
                      >
                        <div className="h-full flex flex-col items-center justify-center space-y-0.5">
                          <div className={`text-[10px] font-semibold ${isActive ? 'text-accent' : 'text-muted-foreground'}`}>
                            {palaceDirections[palace]}
                          </div>
                          <div className={`text-xs font-bold ${isActive ? 'text-accent' : 'text-foreground/70'}`}>
                            {palace}
                          </div>
                          {isActive && (
                            <div className="text-xs text-accent/80">★</div>
                          )}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>九宫之一，对应特定方位和能量场</TooltipContent>
                  </Tooltip>
                );
              })
            )}
          </div>
        </div>

        {/* Details */}
        <div className="grid md:grid-cols-2 gap-3 mb-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="p-3 bg-accent/5 rounded-lg border border-accent/20 cursor-help">
                <div className="text-xs text-muted-foreground mb-0.5">值使门</div>
                <div className="text-base font-bold text-accent">{data.gate}</div>
              </div>
            </TooltipTrigger>
            <TooltipContent>八门之一，影响事物发展的关键因素</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="p-3 bg-accent/5 rounded-lg border border-accent/20 cursor-help">
                <div className="text-xs text-muted-foreground mb-0.5">值符星</div>
                <div className="text-base font-bold text-accent">{data.star}</div>
              </div>
            </TooltipTrigger>
            <TooltipContent>九星之一，代表天时能量</TooltipContent>
          </Tooltip>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="p-3 bg-gradient-to-r from-accent/5 to-accent/10 rounded-lg border border-accent/20 cursor-help">
              <div className="text-xs text-muted-foreground mb-1">吉方位</div>
              <div className="text-base font-bold text-accent mb-2">{data.direction}</div>
              <div className="text-xs text-foreground/90 leading-relaxed">{data.timing}</div>
            </div>
          </TooltipTrigger>
          <TooltipContent>最有利的行动方向和时机</TooltipContent>
        </Tooltip>
      </Card>
    </TooltipProvider>
  );
};