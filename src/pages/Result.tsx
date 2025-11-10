import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Home, Sparkles, Wand2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import { BaziChart } from "@/components/divination/BaziChart";
import { HexagramDisplay } from "@/components/divination/HexagramDisplay";
import { QimenGrid } from "@/components/divination/QimenGrid";
import { ZiweiPalace } from "@/components/divination/ZiweiPalace";
import { FengshuiCompass } from "@/components/divination/FengshuiCompass";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { result, category, question } = location.state || {};
  const [isGenerating, setIsGenerating] = useState(false);
  const [guardianCard, setGuardianCard] = useState<string | null>(null);

  const handleGenerateCard = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-guardian-card', {
        body: { category, result, question }
      });

      if (error) throw error;

      if (data?.imageUrl) {
        setGuardianCard(data.imageUrl);
        toast.success(t('result.cardGenerated'));
      }
    } catch (error) {
      console.error('Error generating guardian card:', error);
      toast.error(t('result.cardFailed'));
    } finally {
      setIsGenerating(false);
    }
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-mystical flex items-center justify-center px-6">
        <LanguageSwitcher />
        <Card className="p-8 bg-card/80 backdrop-blur-sm text-center">
          <p className="text-muted-foreground">{t('result.noResult')}</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            {t('common.backToHome')}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-mystical px-6 py-12">
      <LanguageSwitcher />
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
              <p className="text-muted-foreground mt-2">{t('result.title')}</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="border-accent/30 text-accent hover:bg-accent/10"
          >
            <Home className="w-4 h-4 mr-2" />
            {t('common.backToHome')}
          </Button>
        </div>

        {/* Question */}
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-accent/20">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-accent mb-2">{t('result.yourQuestion')}</h3>
              <p className="text-foreground">{question}</p>
            </div>
          </div>
        </Card>

        {/* Visual Data - Divination Charts */}
        <div className="space-y-6">
          {result.visualData?.bazi && (
            <BaziChart data={result.visualData.bazi} />
          )}

          {result.visualData?.hexagram && (
            <HexagramDisplay data={result.visualData.hexagram} />
          )}

          {result.visualData?.qimen && (
            <QimenGrid data={result.visualData.qimen} />
          )}

          {result.visualData?.ziwei && (
            <ZiweiPalace data={result.visualData.ziwei} />
          )}

          {result.visualData?.fengshui && (
            <FengshuiCompass data={result.visualData.fengshui} />
          )}
        </div>

        {/* Result Sections */}
        <div className="space-y-6">
          {result.overview && (
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-accent/20 space-y-4">
              <h2 className="text-2xl font-bold text-accent border-b border-accent/20 pb-3">
                {t('result.overview')}
              </h2>
              <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                {result.overview}
              </div>
            </Card>
          )}

          {result.analysis && (
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-accent/20 space-y-4">
              <h2 className="text-2xl font-bold text-accent border-b border-accent/20 pb-3">
                {t('result.analysis')}
              </h2>
              <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                {result.analysis}
              </div>
            </Card>
          )}

          {result.reasoning && (
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-accent/20 space-y-4">
              <h2 className="text-2xl font-bold text-accent border-b border-accent/20 pb-3">
                {t('result.reasoning')}
              </h2>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {result.reasoning}
              </div>
            </Card>
          )}

          {result.suggestions && result.suggestions.length > 0 && (
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-accent/20 space-y-4">
              <h2 className="text-2xl font-bold text-accent border-b border-accent/20 pb-3">
                {t('result.suggestions')}
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
                <span className="text-muted-foreground">{t('result.accuracy')}</span>
                <span className="text-accent font-bold text-lg">{result.probability}</span>
              </div>
            </Card>
          )}
        </div>

        {/* Guardian Card Generation */}
        <Card className="p-8 bg-card/80 backdrop-blur-sm border-accent/20">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-accent">{t('result.guardianCard')}</h2>
              <p className="text-muted-foreground">{t('result.guardianCardDesc')}</p>
            </div>
            
            {!guardianCard ? (
              <Button
                onClick={handleGenerateCard}
                disabled={isGenerating}
                className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground font-bold py-6 px-8 text-lg"
              >
                <Wand2 className="w-5 h-5 mr-2" />
                {isGenerating ? t('result.generatingCard') : t('result.generateCard')}
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="relative max-w-sm mx-auto aspect-[2/3] rounded-lg overflow-hidden shadow-gold-glow border-2 border-accent/30">
                  <img 
                    src={guardianCard} 
                    alt="守护牌" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={handleGenerateCard}
                    disabled={isGenerating}
                    variant="outline"
                    className="border-accent/30 text-accent hover:bg-accent/10"
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    {t('result.regenerate')}
                  </Button>
                  <Button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = guardianCard;
                      link.download = `${t('result.guardianCard')}-${category}.png`;
                      link.click();
                    }}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    {t('result.download')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => navigate('/inquiry', { state: { category } })}
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-6"
          >
            {t('common.divineAgain')}
          </Button>
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="flex-1 border-accent/30 text-accent hover:bg-accent/10 py-6"
          >
            {t('common.changeCategory')}
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="text-center text-sm text-muted-foreground space-y-1">
          <p>{t('result.disclaimer1')}</p>
          <p>{t('result.disclaimer2')}</p>
        </div>
      </div>
    </div>
  );
};

export default Result;
