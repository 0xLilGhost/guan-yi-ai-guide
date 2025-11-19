import { Card } from "@/components/ui/card";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface BaziPillar {
  heavenlyStem: string;
  earthlyBranch: string;
  element: string;
}

interface BaziData {
  year: BaziPillar | null;
  month: BaziPillar | null;
  day: BaziPillar | null;
  hour: BaziPillar | null;
  dayMaster: string;
  elementBalance?: {
    wood: number;
    fire: number;
    earth: number;
    metal: number;
    water: number;
  };
}

const elementColors: Record<string, string> = {
  wood: "hsl(140, 60%, 50%)",
  fire: "hsl(350, 70%, 60%)",
  earth: "hsl(35, 70%, 50%)",
  metal: "hsl(43, 85%, 55%)",
  water: "hsl(210, 70%, 55%)",
};

const elementNames: Record<string, string> = {
  wood: "木",
  fire: "火",
  earth: "土",
  metal: "金",
  water: "水",
};

const elementChineseNames: Record<string, string> = {
  wood: "木",
  fire: "火",
  earth: "土",
  metal: "金",
  water: "水",
};

export const BaziChart = ({ data }: { data: BaziData }) => {
  const pillars = [
    { name: "年柱", data: data.year, tooltip: "代表祖辈、童年时期（0-15岁）" },
    { name: "月柱", data: data.month, tooltip: "代表父母、青年时期（16-30岁）" },
    { name: "日柱", data: data.day, tooltip: "代表自己、配偶、中年时期（31-45岁）" },
    { name: "时柱", data: data.hour, tooltip: "代表子女、晚年时期（46岁以后）" },
  ];

  const validPillars = pillars.filter((pillar) => {
    const d = pillar.data as BaziPillar | null | undefined;
    return (
      !!d &&
      typeof d.heavenlyStem === "string" &&
      typeof d.earthlyBranch === "string" &&
      typeof d.element === "string"
    );
  });

  const maxValue = data.elementBalance ? Math.max(...Object.values(data.elementBalance)) : 0;

  // Calculate dominant and weak elements
  const elementAnalysis = data.elementBalance
    ? Object.entries(data.elementBalance)
        .map(([element, count]) => ({
          element,
          count,
          name: elementChineseNames[element],
          color: elementColors[element],
        }))
        .sort((a, b) => b.count - a.count)
    : [];

  const dominantElement = elementAnalysis[0];
  const weakElement = elementAnalysis[elementAnalysis.length - 1];

  return (
    <TooltipProvider>
      <Card className="p-6 bg-card/80 backdrop-blur-sm border-accent/20 max-w-4xl mx-auto space-y-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <h2 className="text-2xl font-bold text-accent border-b-2 border-accent/30 pb-3 cursor-help">
              八字命盘
            </h2>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            八字命盘：根据出生年月日时排出的四柱八字，用于分析命运格局
          </TooltipContent>
        </Tooltip>

        {/* Traditional Bazi Table Layout */}
        <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl p-4 border border-accent/20">
          <div className="grid grid-cols-5 gap-3">
            {/* Header Row */}
            <div className="text-center">
              <div className="text-sm font-semibold text-muted-foreground mb-2">四柱</div>
            </div>
            {validPillars.map((pillar, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div className="text-center cursor-help">
                    <div className="text-sm font-semibold text-accent mb-2">{pillar.name}</div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>{pillar.tooltip}</TooltipContent>
              </Tooltip>
            ))}

            {/* Heavenly Stems Row */}
            <div className="flex items-center justify-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-xs text-muted-foreground cursor-help font-medium">天干</div>
                </TooltipTrigger>
                <TooltipContent>天干：代表天时、外在表现、主动性</TooltipContent>
              </Tooltip>
            </div>
            {validPillars.map((pillar, index) => {
              const d = pillar.data as BaziPillar;
              const elementKey = (d.element || "").toLowerCase() as keyof typeof elementColors;
              const color = elementColors[elementKey] || elementColors.earth;
              return (
                <div
                  key={index}
                  className="bg-card border-2 rounded-lg p-3 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                  style={{ borderColor: color }}
                >
                  <div className="text-2xl font-bold" style={{ color }}>
                    {d.heavenlyStem}
                  </div>
                </div>
              );
            })}

            {/* Earthly Branches Row */}
            <div className="flex items-center justify-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-xs text-muted-foreground cursor-help font-medium">地支</div>
                </TooltipTrigger>
                <TooltipContent>地支：代表地利、内在本质、被动性</TooltipContent>
              </Tooltip>
            </div>
            {validPillars.map((pillar, index) => {
              const d = pillar.data as BaziPillar;
              const elementKey = (d.element || "").toLowerCase() as keyof typeof elementColors;
              const color = elementColors[elementKey] || elementColors.earth;
              return (
                <div
                  key={index}
                  className="bg-card border-2 rounded-lg p-3 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                  style={{ borderColor: color }}
                >
                  <div className="text-2xl font-bold" style={{ color }}>
                    {d.earthlyBranch}
                  </div>
                </div>
              );
            })}

            {/* Elements Row */}
            <div className="flex items-center justify-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-xs text-muted-foreground cursor-help font-medium">五行</div>
                </TooltipTrigger>
                <TooltipContent>五行：金木水火土，代表五种基本能量属性</TooltipContent>
              </Tooltip>
            </div>
            {validPillars.map((pillar, index) => {
              const d = pillar.data as BaziPillar;
              const elementKey = (d.element || "").toLowerCase() as keyof typeof elementColors;
              const color = elementColors[elementKey] || elementColors.earth;
              return (
                <div
                  key={index}
                  className="rounded-lg p-2 flex items-center justify-center text-xs font-semibold"
                  style={{
                    backgroundColor: `${color}20`,
                    color: color,
                  }}
                >
                  {d.element}
                </div>
              );
            })}
          </div>
        </div>

        {/* Day Master Section */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg p-4 border-2 border-accent/30">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-sm text-muted-foreground mb-2 cursor-help font-medium">
                  日主（命主五行）
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                日主：日柱天干，代表命主本人的五行属性，是八字分析的核心
              </TooltipContent>
            </Tooltip>
            <div className="text-4xl font-bold text-accent text-center">{data.dayMaster}</div>
          </div>

          {dominantElement && (
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg p-4 border-2 border-accent/30">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-sm text-muted-foreground mb-2 cursor-help font-medium">五行强弱</div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  统计八字中各五行出现次数，判断五行旺衰
                </TooltipContent>
              </Tooltip>
              <div className="flex items-center justify-around text-center">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">最旺</div>
                  <div className="text-2xl font-bold" style={{ color: dominantElement.color }}>
                    {dominantElement.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{dominantElement.count}个</div>
                </div>
                <div className="w-px h-12 bg-accent/20"></div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">最弱</div>
                  <div className="text-2xl font-bold" style={{ color: weakElement.color }}>
                    {weakElement.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{weakElement.count}个</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Five Elements Balance Chart */}
        {data.elementBalance && (
          <div className="space-y-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <h3 className="text-lg font-semibold text-accent cursor-help flex items-center gap-2">
                  五行分布图
                  <span className="text-xs text-muted-foreground font-normal">
                    （共{Object.values(data.elementBalance).reduce((a, b) => a + b, 0)}个）
                  </span>
                </h3>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                五行平衡：分析命局中金木水火土的数量分布，判断五行是否均衡
              </TooltipContent>
            </Tooltip>
            <div className="space-y-3">
              {elementAnalysis.map(({ element, count, name, color }) => (
                <div key={element}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: color }}
                      ></div>
                      <span className="text-sm font-medium" style={{ color }}>
                        {name} {elementNames[element]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {count}个 ({((count / (Object.values(data.elementBalance!).reduce((a, b) => a + b, 0))) * 100).toFixed(0)}%)
                      </span>
                    </div>
                  </div>
                  <div className="h-3 bg-muted/50 rounded-full overflow-hidden relative">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${(count / maxValue) * 100}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Five Elements Relationship Explanation */}
        <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
          <h4 className="text-sm font-semibold text-accent mb-2">五行相生相克</h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div>
              <span className="font-medium text-foreground">相生：</span>
              木生火、火生土、土生金、金生水、水生木
            </div>
            <div>
              <span className="font-medium text-foreground">相克：</span>
              木克土、土克水、水克火、火克金、金克木
            </div>
          </div>
        </div>
      </Card>
    </TooltipProvider>
  );
};
