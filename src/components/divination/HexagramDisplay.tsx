import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface HexagramData {
  upper: string;
  lower: string;
  changing: number;
  result: string;
  interpretation: string;
}

const trigramLines: Record<string, boolean[]> = {
  '乾': [true, true, true],
  '坤': [false, false, false],
  '震': [false, false, true],
  '巽': [true, true, false],
  '坎': [false, true, false],
  '离': [true, false, true],
  '艮': [true, false, false],
  '兑': [false, true, true],
};

const HexagramLines = ({ upper, lower, changing }: { upper: string; lower: string; changing?: number }) => {
  const upperLines = trigramLines[upper] || [true, true, true];
  const lowerLines = trigramLines[lower] || [false, false, false];
  const allLines = [...upperLines, ...lowerLines];

  return (
    <div className="space-y-1.5">
      {allLines.map((isSolid, index) => {
        const lineNumber = 6 - index;
        const isChanging = changing === lineNumber;
        
        return (
          <div key={index} className="flex items-center gap-2">
            <div className="text-[10px] text-muted-foreground w-3">{lineNumber}</div>
            <div className="flex-1 h-1.5 flex gap-1.5">
              {isSolid ? (
                <div 
                  className={`flex-1 rounded-full transition-all ${
                    isChanging 
                      ? 'bg-accent animate-pulse shadow-[0_0_8px_hsl(var(--accent))]' 
                      : 'bg-accent/80'
                  }`} 
                />
              ) : (
                <>
                  <div 
                    className={`flex-1 rounded-full transition-all ${
                      isChanging 
                        ? 'bg-accent animate-pulse shadow-[0_0_8px_hsl(var(--accent))]' 
                        : 'bg-accent/80'
                    }`} 
                  />
                  <div 
                    className={`flex-1 rounded-full transition-all ${
                      isChanging 
                        ? 'bg-accent animate-pulse shadow-[0_0_8px_hsl(var(--accent))]' 
                        : 'bg-accent/80'
                    }`} 
                  />
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const HexagramDisplay = ({ data }: { data: HexagramData }) => {
  return (
    <TooltipProvider>
      <Card className="p-6 bg-card/80 backdrop-blur-sm border-accent/20 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-accent border-b border-accent/20 pb-2 mb-4">
          梅花易数 · 卦象
        </h2>

        <div className="grid md:grid-cols-3 gap-6 items-center">
          {/* Original Hexagram */}
          <div className="space-y-3">
            <div className="text-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-sm text-muted-foreground mb-1 cursor-help">本卦</div>
                </TooltipTrigger>
                <TooltipContent>原始卦象，代表当前状态</TooltipContent>
              </Tooltip>
              <div className="text-base font-bold text-accent">
                {data.upper}{data.lower}
              </div>
            </div>
            <HexagramLines upper={data.upper} lower={data.lower} changing={data.changing} />
            <div className="text-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-[10px] text-muted-foreground cursor-help">变爻: 第{data.changing}爻</div>
                </TooltipTrigger>
                <TooltipContent>爻：卦的组成单位，从下往上数</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <ArrowRight className="w-6 h-6 text-accent animate-pulse" />
          </div>

          {/* Result Hexagram */}
          <div className="space-y-3">
            <div className="text-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-sm text-muted-foreground mb-1 cursor-help">变卦</div>
                </TooltipTrigger>
                <TooltipContent>变化后的卦象，指示未来趋势</TooltipContent>
              </Tooltip>
              <div className="text-base font-bold text-accent">{data.result}</div>
            </div>
            <HexagramLines 
              upper={data.result.charAt(0)} 
              lower={data.result.charAt(1)} 
            />
          </div>
        </div>

        {/* Interpretation */}
        <div className="mt-6 p-3 bg-accent/5 rounded-lg border border-accent/20">
          <h3 className="text-xs font-semibold text-accent mb-1">卦象解读</h3>
          <p className="text-sm text-foreground/90 leading-relaxed">{data.interpretation}</p>
        </div>
      </Card>
    </TooltipProvider>
  );
};