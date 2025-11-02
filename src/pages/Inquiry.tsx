import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sparkles, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Inquiry = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const categoryTitle = location.state?.category || "综合占卜";
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    birthHour: "",
    gender: "male",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.question.trim()) {
      toast({
        title: "请输入您的问题",
        description: "问题不能为空",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('divination', {
        body: {
          category: categoryTitle,
          question: formData.question,
          birthData: {
            year: formData.birthYear,
            month: formData.birthMonth,
            day: formData.birthDay,
            hour: formData.birthHour,
            gender: formData.gender,
          }
        }
      });

      if (error) throw error;

      navigate('/result', { 
        state: { 
          result: data.result,
          category: categoryTitle,
          question: formData.question 
        } 
      });
    } catch (error) {
      console.error('Divination error:', error);
      toast({
        title: "占卜失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-mystical px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="text-accent hover:text-accent/80"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-accent">{categoryTitle}</h1>
            <p className="text-muted-foreground mt-2">请输入您的问题和生辰信息</p>
          </div>
        </div>

        {/* Form */}
        <Card className="p-8 bg-card/80 backdrop-blur-sm border-accent/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Question */}
            <div className="space-y-2">
              <Label htmlFor="question" className="text-lg text-accent">
                您的问题 *
              </Label>
              <Textarea
                id="question"
                placeholder="例如：我适合什么时候换工作？今年事业运势如何？"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="min-h-[120px] bg-background/50 border-accent/30 focus:border-accent"
                required
              />
            </div>

            {/* Birth Data */}
            <div className="space-y-4">
              <Label className="text-lg text-accent">生辰信息（可选）</Label>
              <p className="text-sm text-muted-foreground">
                提供生辰信息可获得更精准的分析
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">年份</Label>
                  <Input
                    id="year"
                    type="number"
                    placeholder="1990"
                    value={formData.birthYear}
                    onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                    className="bg-background/50 border-accent/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="month">月份</Label>
                  <Input
                    id="month"
                    type="number"
                    placeholder="6"
                    min="1"
                    max="12"
                    value={formData.birthMonth}
                    onChange={(e) => setFormData({ ...formData, birthMonth: e.target.value })}
                    className="bg-background/50 border-accent/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="day">日期</Label>
                  <Input
                    id="day"
                    type="number"
                    placeholder="15"
                    min="1"
                    max="31"
                    value={formData.birthDay}
                    onChange={(e) => setFormData({ ...formData, birthDay: e.target.value })}
                    className="bg-background/50 border-accent/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hour">时辰</Label>
                  <Input
                    id="hour"
                    type="number"
                    placeholder="14"
                    min="0"
                    max="23"
                    value={formData.birthHour}
                    onChange={(e) => setFormData({ ...formData, birthHour: e.target.value })}
                    className="bg-background/50 border-accent/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>性别</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-4 h-4 text-accent"
                    />
                    <span className="text-foreground">男</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-4 h-4 text-accent"
                    />
                    <span className="text-foreground">女</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-6 text-lg shadow-gold-glow"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin"></div>
                  正在占卜中...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  开始占卜
                </span>
              )}
            </Button>
          </form>
        </Card>

        {/* Disclaimer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>* 占卜结果仅供参考，具体决策请结合实际情况</p>
          <p className="mt-1">AI整合传统术数逻辑，助您洞察天机</p>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
