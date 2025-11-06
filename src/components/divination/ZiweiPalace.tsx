import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface ZiweiData {
  mainStar: string;
  palace: string;
  keyPalaces?: {
    career: string;
    wealth: string;
    relationship: string;
    health: string;
  };
}

const palaceNames = [
  '命宫', '兄弟', '夫妻', '子女',
  '财帛', '疾厄', '迁移', '奴仆',
  '官禄', '田宅', '福德', '父母'
];

const palaceTooltips: Record<string, string> = {
  '命宫': '代表个性、命运主轴',
  '兄弟': '代表兄弟姐妹、朋友关系',
  '夫妻': '代表婚姻、配偶状况',
  '子女': '代表子女、创造力',
  '财帛': '代表财运、理财能力',
  '疾厄': '代表健康、体质',
  '迁移': '代表外出、变动',
  '奴仆': '代表下属、服务',
  '官禄': '代表工作、事业发展',
  '田宅': '代表家庭、不动产',
  '福德': '代表福气、精神状态',
  '父母': '代表父母、长辈关系'
};

export const ZiweiPalace = ({ data }: { data: ZiweiData }) => {
  return (
    <TooltipProvider>
      <Card className="p-6 bg-card/80 backdrop-blur-sm border-accent/20 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-accent border-b border-accent/20 pb-2 mb-4 flex items-center gap-2">
          <Star className="w-5 h-5" />
          紫微斗数 · 命盘
        </h2>

        {/* Main Star */}
        <div className="mb-6 p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg border-2 border-accent/30">
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">主星</div>
            <div className="text-2xl font-bold text-accent mb-1">{data.mainStar}</div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-xs text-accent/80 cursor-help">坐守 {data.palace}</div>
              </TooltipTrigger>
              <TooltipContent>主星所在宫位，影响命运主要方向</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Twelve Palaces */}
        <div className="mb-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <h3 className="text-base font-semibold text-accent mb-3 cursor-help">十二宫位</h3>
            </TooltipTrigger>
            <TooltipContent>代表人生各个方面的十二个宫位</TooltipContent>
          </Tooltip>
          <div className="grid grid-cols-4 gap-1.5">
            {palaceNames.map((palace, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div
                    className={`p-2 rounded-lg border transition-all text-center cursor-help ${
                      palace === data.palace
                        ? 'bg-accent/20 border-accent shadow-lg'
                        : 'bg-card/50 border-accent/20 hover:bg-accent/5'
                    }`}
                  >
                    <div className={`text-xs font-semibold ${
                      palace === data.palace ? 'text-accent' : 'text-foreground/70'
                    }`}>
                      {palace}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>{palaceTooltips[palace]}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Key Palaces Analysis */}
        {data.keyPalaces && (
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-accent mb-3">重要宫位分析</h3>
            
            <div className="grid gap-2">
              <div className="p-3 bg-accent/5 rounded-lg border border-accent/20">
                <div className="text-xs font-semibold text-accent mb-1">💼 官禄宫（事业）</div>
                <p className="text-xs text-foreground/90">{data.keyPalaces.career}</p>
              </div>

              <div className="p-3 bg-accent/5 rounded-lg border border-accent/20">
                <div className="text-xs font-semibold text-accent mb-1">💰 财帛宫（财运）</div>
                <p className="text-xs text-foreground/90">{data.keyPalaces.wealth}</p>
              </div>

              <div className="p-3 bg-accent/5 rounded-lg border border-accent/20">
                <div className="text-xs font-semibold text-accent mb-1">❤️ 夫妻宫（姻缘）</div>
                <p className="text-xs text-foreground/90">{data.keyPalaces.relationship}</p>
              </div>

              <div className="p-3 bg-accent/5 rounded-lg border border-accent/20">
                <div className="text-xs font-semibold text-accent mb-1">🏥 疾厄宫（健康）</div>
                <p className="text-xs text-foreground/90">{data.keyPalaces.health}</p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </TooltipProvider>
  );
};