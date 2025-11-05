import { Card } from "@/components/ui/card";

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
    { name: '年柱', data: data.year },
    { name: '月柱', data: data.month },
    { name: '日柱', data: data.day },
    { name: '时柱', data: data.hour },
  ];

  const maxValue = data.elementBalance 
    ? Math.max(...Object.values(data.elementBalance))
    : 0;

  return (
    <Card className="p-8 bg-card/80 backdrop-blur-sm border-accent/20">
      <h2 className="text-2xl font-bold text-accent border-b border-accent/20 pb-3 mb-6">
        八字排盘
      </h2>
      
      {/* Four Pillars */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {pillars.map((pillar, index) => (
          <div key={index} className="text-center">
            <div className="text-sm text-muted-foreground mb-2">{pillar.name}</div>
            <div className="space-y-2">
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
                <div className="text-2xl font-bold text-accent">{pillar.data.heavenlyStem}</div>
                <div className="text-xs text-muted-foreground mt-1">天干</div>
              </div>
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
                <div className="text-2xl font-bold text-accent">{pillar.data.earthlyBranch}</div>
                <div className="text-xs text-muted-foreground mt-1">地支</div>
              </div>
            </div>
            <div 
              className="mt-2 text-sm font-semibold px-3 py-1 rounded-full inline-block"
              style={{ 
                backgroundColor: `${elementColors[pillar.data.element.toLowerCase()] || elementColors.earth}20`,
                color: elementColors[pillar.data.element.toLowerCase()] || elementColors.earth
              }}
            >
              {pillar.data.element}
            </div>
          </div>
        ))}
      </div>

      {/* Day Master */}
      <div className="mb-8 p-4 bg-gradient-to-r from-accent/5 to-accent/10 rounded-lg border border-accent/20">
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-2">日主（本命五行）</div>
          <div className="text-3xl font-bold text-accent">{data.dayMaster}</div>
        </div>
      </div>

      {/* Element Balance Chart */}
      {data.elementBalance && (
        <div>
          <h3 className="text-lg font-semibold text-accent mb-4">五行平衡</h3>
          <div className="space-y-3">
            {Object.entries(data.elementBalance).map(([element, value]) => (
              <div key={element}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium" style={{ color: elementColors[element] }}>
                    {elementNames[element]}
                  </span>
                  <span className="text-sm text-muted-foreground">{value}</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${(value / maxValue) * 100}%`,
                      backgroundColor: elementColors[element]
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
