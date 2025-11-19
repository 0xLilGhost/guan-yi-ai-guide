import { Card } from "@/components/ui/card";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface BaziPillar {
  heavenlyStem: string;
  earthlyBranch: string;
  element: string;
  shiShen?: string;
  hiddenStems?: string[];
  growth?: string;
  naYin?: string;
  shenSha?: string[];
}

interface BaziData {
  year: BaziPillar | null;
  month: BaziPillar | null;
  day: BaziPillar | null;
  hour: BaziPillar | null;
  dayMaster: string;
  kongWang?: string;
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

const elementEmojis: Record<string, string> = {
  wood: "🌳",
  fire: "🔥",
  earth: "⛰️",
  metal: "🔱",
  water: "💧",
};

const stemToElement: Record<string, string> = {
  "甲": "wood", "乙": "wood",
  "丙": "fire", "丁": "fire",
  "戊": "earth", "己": "earth",
  "庚": "metal", "辛": "metal",
  "壬": "water", "癸": "water",
};

const branchToElement: Record<string, string> = {
  "子": "water", "丑": "earth", "寅": "wood", "卯": "wood",
  "辰": "earth", "巳": "fire", "午": "fire", "未": "earth",
  "申": "metal", "酉": "metal", "戌": "earth", "亥": "water",
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
      typeof d.earthlyBranch === "string"
    );
  });

  const getStemColor = (stem: string) => {
    const element = stemToElement[stem] || "earth";
    return elementColors[element];
  };

  const getBranchColor = (branch: string) => {
    const element = branchToElement[branch] || "earth";
    return elementColors[element];
  };

  const getStemEmoji = (stem: string) => {
    const element = stemToElement[stem] || "earth";
    return elementEmojis[element];
  };

  const getBranchEmoji = (branch: string) => {
    const element = branchToElement[branch] || "earth";
    return elementEmojis[element];
  };

  return (
    <TooltipProvider>
      <Card className="p-6 bg-card/80 backdrop-blur-sm border-accent/20 max-w-5xl mx-auto space-y-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <h2 className="text-2xl font-bold text-accent border-b-2 border-accent/30 pb-3 cursor-help">
              八字命盘详解
            </h2>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            八字命盘：根据出生年月日时排出的完整四柱命盘，含十神、藏干、纳音、神煞等
          </TooltipContent>
        </Tooltip>

        {/* Main Bazi Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              {/* Header Row - 日期 */}
              <tr className="border-b border-accent/20">
                <td className="p-2 text-sm text-muted-foreground font-medium w-20">日期</td>
                {validPillars.map((pillar, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <td className="p-2 text-center font-semibold text-accent cursor-help">
                        {pillar.name}
                      </td>
                    </TooltipTrigger>
                    <TooltipContent>{pillar.tooltip}</TooltipContent>
                  </Tooltip>
                ))}
              </tr>

              {/* 主星 Row - ShiShen (Ten Gods) */}
              <tr className="border-b border-accent/20 bg-accent/5">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <td className="p-2 text-sm text-muted-foreground font-medium cursor-help">主星</td>
                  </TooltipTrigger>
                  <TooltipContent>十神：代表与日主的关系，判断六亲、性格、事业等</TooltipContent>
                </Tooltip>
                {validPillars.map((pillar, index) => {
                  const d = pillar.data as BaziPillar;
                  return (
                    <td key={index} className="p-2 text-center font-bold text-accent">
                      {d.shiShen || ""}
                    </td>
                  );
                })}
              </tr>

              {/* 天干 Row - Heavenly Stems */}
              <tr className="border-b border-accent/20">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <td className="p-2 text-sm text-muted-foreground font-medium cursor-help">天干</td>
                  </TooltipTrigger>
                  <TooltipContent>天干：代表天时、外在表现、主动性</TooltipContent>
                </Tooltip>
                {validPillars.map((pillar, index) => {
                  const d = pillar.data as BaziPillar;
                  const color = getStemColor(d.heavenlyStem);
                  const emoji = getStemEmoji(d.heavenlyStem);
                  return (
                    <td key={index} className="p-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-2xl font-bold" style={{ color }}>
                          {d.heavenlyStem}
                        </span>
                        <span className="text-lg">{emoji}</span>
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* 地支 Row - Earthly Branches */}
              <tr className="border-b border-accent/20">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <td className="p-2 text-sm text-muted-foreground font-medium cursor-help">地支</td>
                  </TooltipTrigger>
                  <TooltipContent>地支：代表地利、内在本质、被动性</TooltipContent>
                </Tooltip>
                {validPillars.map((pillar, index) => {
                  const d = pillar.data as BaziPillar;
                  const color = getBranchColor(d.earthlyBranch);
                  const emoji = getBranchEmoji(d.earthlyBranch);
                  return (
                    <td key={index} className="p-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-2xl font-bold" style={{ color }}>
                          {d.earthlyBranch}
                        </span>
                        <span className="text-lg">{emoji}</span>
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* 藏干 Row - Hidden Stems */}
              {validPillars.some((p) => (p.data as BaziPillar).hiddenStems) && (
                <tr className="border-b border-accent/20 bg-accent/5">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <td className="p-2 text-sm text-muted-foreground font-medium cursor-help">藏干</td>
                    </TooltipTrigger>
                    <TooltipContent>地支藏干：地支中所藏的天干，影响内在特质</TooltipContent>
                  </Tooltip>
                  {validPillars.map((pillar, index) => {
                    const d = pillar.data as BaziPillar;
                    const hiddenStems = d.hiddenStems || [];
                    return (
                      <td key={index} className="p-2 text-center">
                        <div className="flex flex-col gap-0.5 text-xs">
                          {hiddenStems.map((stem, i) => {
                            const color = getStemColor(stem);
                            const element = stemToElement[stem] || "earth";
                            return (
                              <div key={i} style={{ color }}>
                                {stem}{element.charAt(0).toUpperCase()}{element.slice(1).substring(0, 2)}
                              </div>
                            );
                          })}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              )}

              {/* 副星 Row - Secondary ShiShen */}
              {validPillars.some((p) => (p.data as BaziPillar).hiddenStems) && (
                <tr className="border-b border-accent/20">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <td className="p-2 text-sm text-muted-foreground font-medium cursor-help">副星</td>
                    </TooltipTrigger>
                    <TooltipContent>地支藏干对应的十神关系</TooltipContent>
                  </Tooltip>
                  {validPillars.map((pillar, index) => {
                    const d = pillar.data as BaziPillar;
                    return (
                      <td key={index} className="p-2 text-center text-xs text-muted-foreground">
                        {/* This would need to be calculated based on hidden stems */}
                      </td>
                    );
                  })}
                </tr>
              )}

              {/* 星运 Row - Growth Phase */}
              {validPillars.some((p) => (p.data as BaziPillar).growth) && (
                <tr className="border-b border-accent/20 bg-accent/5">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <td className="p-2 text-sm text-muted-foreground font-medium cursor-help">星运</td>
                    </TooltipTrigger>
                    <TooltipContent>十二长生：日主在各柱的生命状态（长生、沐浴、冠带等）</TooltipContent>
                  </Tooltip>
                  {validPillars.map((pillar, index) => {
                    const d = pillar.data as BaziPillar;
                    return (
                      <td key={index} className="p-2 text-center text-sm">
                        {d.growth || ""}
                      </td>
                    );
                  })}
                </tr>
              )}

              {/* 空亡 Row - Void */}
              {data.kongWang && (
                <tr className="border-b border-accent/20">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <td className="p-2 text-sm text-muted-foreground font-medium cursor-help">空亡</td>
                    </TooltipTrigger>
                    <TooltipContent>空亡：某些地支处于虚空状态，力量减弱</TooltipContent>
                  </Tooltip>
                  {validPillars.map((pillar, index) => {
                    const d = pillar.data as BaziPillar;
                    const isKongWang = data.kongWang?.includes(d.earthlyBranch);
                    return (
                      <td key={index} className="p-2 text-center text-sm">
                        {isKongWang ? data.kongWang : ""}
                      </td>
                    );
                  })}
                </tr>
              )}

              {/* 纳音 Row - NaYin */}
              {validPillars.some((p) => (p.data as BaziPillar).naYin) && (
                <tr className="border-b border-accent/20 bg-accent/5">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <td className="p-2 text-sm text-muted-foreground font-medium cursor-help">纳音</td>
                    </TooltipTrigger>
                    <TooltipContent>纳音五行：干支组合产生的特殊五行属性（如海中金、山下火）</TooltipContent>
                  </Tooltip>
                  {validPillars.map((pillar, index) => {
                    const d = pillar.data as BaziPillar;
                    return (
                      <td key={index} className="p-2 text-center text-sm">
                        {d.naYin || ""}
                      </td>
                    );
                  })}
                </tr>
              )}

              {/* 神煞 Row - Spiritual Influences */}
              {validPillars.some((p) => (p.data as BaziPillar).shenSha) && (
                <tr className="border-b border-accent/20">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <td className="p-2 text-sm text-muted-foreground font-medium cursor-help">神煞</td>
                    </TooltipTrigger>
                    <TooltipContent>神煞：各种吉凶神煞，如天乙贵人、桃花、华盖等</TooltipContent>
                  </Tooltip>
                  {validPillars.map((pillar, index) => {
                    const d = pillar.data as BaziPillar;
                    const shenSha = d.shenSha || [];
                    return (
                      <td key={index} className="p-2 text-center">
                        <div className="flex flex-col gap-0.5 text-xs text-muted-foreground max-h-24 overflow-y-auto">
                          {shenSha.slice(0, 5).map((sha, i) => (
                            <div key={i}>{sha}</div>
                          ))}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Day Master Info */}
        <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg p-4 border-2 border-accent/30">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-sm text-muted-foreground mb-2 cursor-help font-medium text-center">
                日主（命主本命）
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              日主：日柱天干，代表命主本人，是八字分析的核心基准
            </TooltipContent>
          </Tooltip>
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl font-bold" style={{ color: getStemColor(data.dayMaster) }}>
              {data.dayMaster}
            </span>
            <span className="text-3xl">{getStemEmoji(data.dayMaster)}</span>
          </div>
        </div>

        {/* Five Elements Balance */}
        {data.elementBalance && (
          <div className="space-y-3 pt-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <h3 className="text-lg font-semibold text-accent cursor-help flex items-center gap-2">
                  五行分布
                  <span className="text-xs text-muted-foreground font-normal">
                    （共{Object.values(data.elementBalance).reduce((a, b) => a + b, 0)}个）
                  </span>
                </h3>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                统计命局中金木水火土的数量分布，判断五行旺衰平衡
              </TooltipContent>
            </Tooltip>
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(data.elementBalance).map(([element, count]) => {
                const color = elementColors[element];
                const emoji = elementEmojis[element];
                const maxValue = Math.max(...Object.values(data.elementBalance!));
                return (
                  <div key={element} className="text-center">
                    <div className="text-2xl mb-1">{emoji}</div>
                    <div className="text-xs font-medium mb-1" style={{ color }}>
                      {element.charAt(0).toUpperCase() + element.slice(1)}
                    </div>
                    <div
                      className="h-16 rounded-md flex items-end justify-center text-white font-bold text-sm"
                      style={{
                        backgroundColor: color,
                        opacity: 0.3 + (count / maxValue) * 0.7,
                      }}
                    >
                      <span className="pb-2">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Card>
    </TooltipProvider>
  );
};
