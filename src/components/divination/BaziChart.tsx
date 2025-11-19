import { Card } from "@/components/ui/card";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface BaziPillar {
  heavenlyStem: string;
  earthlyBranch: string;
  element: string;
}

interface BaziData {
  year: BaziPillar;
  month: BaziPillar;
  day: BaziPillar;
  hour: BaziPillar;
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
  wood: 'hsl(140, 60%, 50%)',
  fire: 'hsl(350, 70%, 60%)',
  earth: 'hsl(35, 70%, 50%)',
  metal: 'hsl(43, 85%, 55%)',
  water: 'hsl(210, 70%, 55%)',
};

const elementNames: Record<string, string> = {
  wood: '木',
  fire: '火',
  earth: '土',
  metal: '金',
  water: '水',
};

export const BaziChart = ({ data }: { data: BaziData }) => {
  const pillars = [
    { name: '年柱', data: data.year, tooltip: '代表祖辈、童年时期（0-15岁）' },
    { name: '月柱', data: data.month, tooltip: '代表父母、青年时期（16-30岁）' },
    { name: '日柱', data: data.day, tooltip: '代表自己、配偶、中年时期（31-45岁）' },
    { name: '时柱', data: data.hour, tooltip: '代表子女、晚年时期（46岁以后）' },
  ];

  const maxValue = data.elementBalance 
    ? Math.max(...Object.values(data.elementBalance))
    : 0;
  
  const totalValue = data.elementBalance
    ? Object.values(data.elementBalance).reduce((sum, val) => sum + val, 0)
    : 0;

  return (
    <TooltipProvider>
      <Card className="p-6 bg-card/80 backdrop-blur-sm border-accent/20 max-w-3xl mx-auto">
        <Tooltip>
          <TooltipTrigger asChild>
            <h2 className="text-xl font-bold text-accent border-b border-accent/20 pb-2 mb-4 cursor-help">
              八字排盘
            </h2>
          </TooltipTrigger>
          <TooltipContent>八字：根据出生年月日时排出的四柱八个字，用于推算命运</TooltipContent>
        </Tooltip>
        
        {/* Four Pillars */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {pillars.map((pillar, index) => (
            <div key={index} className="text-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-xs text-muted-foreground mb-2 cursor-help">{pillar.name}</div>
                </TooltipTrigger>
                <TooltipContent>{pillar.tooltip}</TooltipContent>
              </Tooltip>
              <div className="space-y-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-2 cursor-help">
                      <div className="text-lg font-bold text-accent">{pillar.data.heavenlyStem}</div>
                      <div className="text-[10px] text-muted-foreground">天干</div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>天干：代表天时、外在表现、主动性</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-2 cursor-help">
                      <div className="text-lg font-bold text-accent">{pillar.data.earthlyBranch}</div>
                      <div className="text-[10px] text-muted-foreground">地支</div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>地支：代表地利、内在本质、被动性</TooltipContent>
                </Tooltip>
              </div>
              <div 
                className="mt-1 text-xs font-semibold px-2 py-0.5 rounded-full inline-block"
                style={{ 
                  backgroundColor: `${elementColors[pillar.data.element.toLowerCase()] || elementColors.earth}20`,
                  color: elementColors[pillar.data.element.toLowerCase()] || elementColors.earth
                }}
              >
                {elementNames[pillar.data.element.toLowerCase()] || pillar.data.element}
              </div>
            </div>
          ))}
        </div>

        {/* Day Master */}
        <div className="mb-6 p-3 bg-gradient-to-r from-accent/5 to-accent/10 rounded-lg border border-accent/20">
          <div className="text-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-xs text-muted-foreground mb-1 cursor-help">日主（本命五行）</div>
              </TooltipTrigger>
              <TooltipContent>日柱天干，代表命主自身的五行属性</TooltipContent>
            </Tooltip>
            <div className="text-2xl font-bold text-accent">{elementNames[data.dayMaster.toLowerCase()] || data.dayMaster}</div>
          </div>
        </div>

        {/* Element Balance Chart */}
        {data.elementBalance && (
          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <h3 className="text-base font-semibold text-accent mb-3 cursor-help">五行平衡</h3>
              </TooltipTrigger>
              <TooltipContent>五行（金木水火土）在八字中的强弱分布</TooltipContent>
            </Tooltip>
            <div className="space-y-2">
              {Object.entries(data.elementBalance).map(([element, value]) => {
                const percentage = totalValue > 0 ? ((value / totalValue) * 100).toFixed(1) : '0.0';
                return (
                  <div key={element}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium" style={{ color: elementColors[element] }}>
                        {elementNames[element]}
                      </span>
                      <span className="text-xs text-muted-foreground">{percentage}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: elementColors[element]
                        }}
                      />
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