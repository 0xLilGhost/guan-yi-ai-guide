import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Home, Sparkles } from "lucide-react";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, category, question } = location.state || {};

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-mystical flex items-center justify-center px-6">
        <Card className="p-8 bg-card/80 backdrop-blur-sm text-center">
          <p className="text-muted-foreground">未找到占卜结果</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            返回首页
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-mystical px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-accent hover:text-accent/80"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-accent">{category}</h1>
              <p className="text-muted-foreground mt-2">占卜结果</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="border-accent/30 text-accent hover:bg-accent/10"
          >
            <Home className="w-4 h-4 mr-2" />
            返回首页
          </Button>
        </div>

        {/* Question */}
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-accent/20">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-accent mb-2">您的问题</h3>
              <p className="text-foreground">{question}</p>
            </div>
          </div>
        </Card>

        {/* Result Sections */}
        <div className="space-y-6">
          {result.overview && (
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-accent/20 space-y-4">
              <h2 className="text-2xl font-bold text-accent border-b border-accent/20 pb-3">
                总体运势
              </h2>
              <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                {result.overview}
              </div>
            </Card>
          )}

          {result.analysis && (
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-accent/20 space-y-4">
              <h2 className="text-2xl font-bold text-accent border-b border-accent/20 pb-3">
                详细分析
              </h2>
              <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                {result.analysis}
              </div>
            </Card>
          )}

          {result.reasoning && (
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-accent/20 space-y-4">
              <h2 className="text-2xl font-bold text-accent border-b border-accent/20 pb-3">
                推演逻辑
              </h2>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {result.reasoning}
              </div>
            </Card>
          )}

          {result.suggestions && result.suggestions.length > 0 && (
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-accent/20 space-y-4">
              <h2 className="text-2xl font-bold text-accent border-b border-accent/20 pb-3">
                建议指引
              </h2>
              <div className="space-y-3">
                {result.suggestions.map((suggestion: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-accent text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-foreground leading-relaxed">{suggestion}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {result.probability && (
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-accent/20">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">准确度参考</span>
                <span className="text-accent font-bold text-lg">{result.probability}</span>
              </div>
            </Card>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => navigate('/inquiry', { state: { category } })}
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-6"
          >
            再次占卜
          </Button>
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="flex-1 border-accent/30 text-accent hover:bg-accent/10 py-6"
          >
            更换类别
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="text-center text-sm text-muted-foreground space-y-1">
          <p>* 本结果由AI整合梅花易数、紫微斗数、奇门遁甲等传统术数逻辑生成</p>
          <p>* 仅供参考，不作为绝对依据，请结合实际情况判断</p>
        </div>
      </div>
    </div>
  );
};

export default Result;
