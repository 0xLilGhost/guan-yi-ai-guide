import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

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
    <div className="space-y-2">
      {allLines.map((isSolid, index) => {
        const lineNumber = 6 - index; // Count from bottom
        const isChanging = changing === lineNumber;
        
        return (
          <div key={index} className="flex items-center gap-2">
            <div className="text-xs text-muted-foreground w-4">{lineNumber}</div>
            <div className="flex-1 h-2 flex gap-2">
              {isSolid ? (
                <div 
                  className={`flex-1 rounded-full transition-all ${
                    isChanging 
                      ? 'bg-accent animate-pulse shadow-[0_0_10px_hsl(var(--accent))]' 
                      : 'bg-accent/80'
                  }`} 
                />
              ) : (
                <>
                  <div 
                    className={`flex-1 rounded-full transition-all ${
                      isChanging 
                        ? 'bg-accent animate-pulse shadow-[0_0_10px_hsl(var(--accent))]' 
                        : 'bg-accent/80'
                    }`} 
                  />
                  <div 
                    className={`flex-1 rounded-full transition-all ${
                      isChanging 
                        ? 'bg-accent animate-pulse shadow-[0_0_10px_hsl(var(--accent))]' 
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
    <Card className="p-8 bg-card/80 backdrop-blur-sm border-accent/20">
      <h2 className="text-2xl font-bold text-accent border-b border-accent/20 pb-3 mb-6">
        梅花易数 · 卦象
      </h2>

      <div className="grid md:grid-cols-3 gap-8 items-center">
        {/* Original Hexagram */}
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-2">本卦</div>
            <div className="text-xl font-bold text-accent">
              {data.upper}{data.lower}
            </div>
          </div>
          <HexagramLines upper={data.upper} lower={data.lower} changing={data.changing} />
          <div className="text-center">
            <div className="text-xs text-muted-foreground">变爻: 第{data.changing}爻</div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <ArrowRight className="w-8 h-8 text-accent animate-pulse" />
        </div>

        {/* Result Hexagram */}
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-2">变卦</div>
            <div className="text-xl font-bold text-accent">{data.result}</div>
          </div>
          <HexagramLines 
            upper={data.result.charAt(0)} 
            lower={data.result.charAt(1)} 
          />
        </div>
      </div>

      {/* Interpretation */}
      <div className="mt-8 p-4 bg-accent/5 rounded-lg border border-accent/20">
        <h3 className="text-sm font-semibold text-accent mb-2">卦象解读</h3>
        <p className="text-foreground/90 leading-relaxed">{data.interpretation}</p>
      </div>
    </Card>
  );
};
