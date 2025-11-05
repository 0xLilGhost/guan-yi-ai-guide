import { Card } from "@/components/ui/card";
import { Compass } from "lucide-react";

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
    <Card className="p-8 bg-card/80 backdrop-blur-sm border-accent/20">
      <h2 className="text-2xl font-bold text-accent border-b border-accent/20 pb-3 mb-6 flex items-center gap-2">
        <Compass className="w-6 h-6" />
        奇门遁甲 · 九宫格局
      </h2>

      {/* Nine Palaces Grid */}
      <div className="mb-8">
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          {grid.map((row, rowIndex) => 
            row.map((palace, colIndex) => {
              const isActive = palace === data.palace;
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`aspect-square border-2 rounded-lg p-4 transition-all ${
                    isActive
                      ? 'bg-accent/20 border-accent shadow-[0_0_20px_hsl(var(--accent)/0.3)] scale-105'
                      : 'bg-card/50 border-accent/30 hover:bg-accent/5'
                  }`}
                >
                  <div className="h-full flex flex-col items-center justify-center space-y-1">
                    <div className={`text-xs font-semibold ${isActive ? 'text-accent' : 'text-muted-foreground'}`}>
                      {palaceDirections[palace]}
                    </div>
                    <div className={`text-sm font-bold ${isActive ? 'text-accent' : 'text-foreground/70'}`}>
                      {palace}
                    </div>
                    {isActive && (
                      <div className="text-xs text-accent/80 mt-2 text-center">
                        <div>★</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Details */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
          <div className="text-sm text-muted-foreground mb-1">值使门</div>
          <div className="text-xl font-bold text-accent">{data.gate}</div>
        </div>
        <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
          <div className="text-sm text-muted-foreground mb-1">值符星</div>
          <div className="text-lg font-bold text-accent">{data.star}</div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gradient-to-r from-accent/5 to-accent/10 rounded-lg border border-accent/20">
        <div className="text-sm text-muted-foreground mb-2">吉方位</div>
        <div className="text-xl font-bold text-accent mb-3">{data.direction}</div>
        <div className="text-sm text-foreground/90 leading-relaxed">{data.timing}</div>
      </div>
    </Card>
  );
};
