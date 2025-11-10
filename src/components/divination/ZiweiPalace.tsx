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
        <Tooltip>
          <TooltipTrigger asChild>
            <h2 className="text-xl font-bold text-accent border-b border-accent/20 pb-2 mb-4 flex items-center gap-2 cursor-help">
              <Star className="w-5 h-5" />
              紫微斗数 · 命盘
            </h2>
          </TooltipTrigger>
          <TooltipContent>紫微斗数：中国古代星命术，通过出生时辰推算命运轨迹</TooltipContent>
        </Tooltip>

        {/* Main Star */}
        <div className="mb-6 p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg border-2 border-accent/30">
          <div className="text-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-xs text-muted-foreground mb-1 cursor-help">主星</div>
              </TooltipTrigger>
              <TooltipContent>命盘中最重要的星曜，决定性格特质和命运主线</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-2xl font-bold text-accent mb-1 cursor-help">{data.mainStar || '未知'}</div>
              </TooltipTrigger>
              <TooltipContent>
                {data.mainStar?.includes('紫微') && '紫微星：帝王之星，领导能力强'}
                {data.mainStar?.includes('天机') && '天机星：智慧之星，善于谋略'}
                {data.mainStar?.includes('太阳') && '太阳星：光明之星，热情开朗'}
                {data.mainStar?.includes('武曲') && '武曲星：财星，理财能力佳'}
                {data.mainStar?.includes('天同') && '天同星：福星，平和快乐'}
                {data.mainStar?.includes('廉贞') && '廉贞星：桃花星，魅力十足'}
                {data.mainStar && !data.mainStar.match(/紫微|天机|太阳|武曲|天同|廉贞/) && '重要星曜，影响命运走向'}
                {!data.mainStar && '主星信息'}
              </TooltipContent>
            </Tooltip>
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
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-3 bg-accent/5 rounded-lg border border-accent/20 cursor-help">
                    <div className="text-xs font-semibold text-accent mb-1">💼 官禄宫（事业）</div>
                    <p className="text-xs text-foreground/90">{data.keyPalaces.career}</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>官禄宫：代表事业发展、工作状况、社会地位</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-3 bg-accent/5 rounded-lg border border-accent/20 cursor-help">
                    <div className="text-xs font-semibold text-accent mb-1">💰 财帛宫（财运）</div>
                    <p className="text-xs text-foreground/90">{data.keyPalaces.wealth}</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>财帛宫：代表财富状况、理财能力、收入来源</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-3 bg-accent/5 rounded-lg border border-accent/20 cursor-help">
                    <div className="text-xs font-semibold text-accent mb-1">❤️ 夫妻宫（姻缘）</div>
                    <p className="text-xs text-foreground/90">{data.keyPalaces.relationship}</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>夫妻宫：代表婚姻感情、配偶特质、恋爱运势</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-3 bg-accent/5 rounded-lg border border-accent/20 cursor-help">
                    <div className="text-xs font-semibold text-accent mb-1">🏥 疾厄宫（健康）</div>
                    <p className="text-xs text-foreground/90">{data.keyPalaces.health}</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>疾厄宫：代表健康状况、体质强弱、疾病倾向</TooltipContent>
              </Tooltip>
            </div>
          </div>
        )}
      </Card>
    </TooltipProvider>
  );
};