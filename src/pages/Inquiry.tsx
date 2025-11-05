import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sparkles, ArrowLeft, Briefcase, Heart, Activity, Home, Layers } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Category styling configurations based on Five Elements
const categoryStyles = {
  '事业运势': {
    icon: Briefcase,
    primaryColor: 'hsl(43, 85%, 55%)',
    secondaryColor: 'hsl(45, 90%, 65%)',
    bgGradient: 'radial-gradient(circle at center, hsl(43, 55%, 30%) 0%, hsl(43, 35%, 18%) 60%, hsl(45, 25%, 12%) 100%)',
    accentClass: 'from-yellow-500/20 to-amber-500/20',
    element: '金',
    description: '金生水，水生木，事业运势需天时地利人和'
  },
  '情感婚姻': {
    icon: Heart,
    primaryColor: 'hsl(350, 70%, 60%)',
    secondaryColor: 'hsl(340, 80%, 70%)',
    bgGradient: 'radial-gradient(circle at center, hsl(350, 55%, 30%) 0%, hsl(350, 35%, 18%) 60%, hsl(350, 25%, 12%) 100%)',
    accentClass: 'from-pink-500/20 to-rose-500/20',
    element: '水',
    description: '水能载舟，情感需要滋养与包容'
  },
  '健康养生': {
    icon: Activity,
    primaryColor: 'hsl(140, 60%, 50%)',
    secondaryColor: 'hsl(150, 70%, 60%)',
    bgGradient: 'radial-gradient(circle at center, hsl(140, 55%, 30%) 0%, hsl(140, 35%, 18%) 60%, hsl(140, 25%, 12%) 100%)',
    accentClass: 'from-green-500/20 to-emerald-500/20',
    element: '木',
    description: '木旺则生，调和阴阳，养生固本'
  },
  '风水布局': {
    icon: Home,
    primaryColor: 'hsl(35, 70%, 50%)',
    secondaryColor: 'hsl(40, 80%, 60%)',
    bgGradient: 'radial-gradient(circle at center, hsl(35, 55%, 30%) 0%, hsl(35, 35%, 18%) 60%, hsl(35, 25%, 12%) 100%)',
    accentClass: 'from-orange-500/20 to-yellow-600/20',
    element: '土',
    description: '土载万物，风水布局定乾坤'
  },
  '综合占卜': {
    icon: Layers,
    primaryColor: 'hsl(270, 60%, 55%)',
    secondaryColor: 'hsl(280, 70%, 65%)',
    bgGradient: 'radial-gradient(circle at center, hsl(270, 55%, 30%) 0%, hsl(270, 35%, 18%) 60%, hsl(270, 25%, 12%) 100%)',
    accentClass: 'from-purple-500/20 to-violet-500/20',
    element: '混元',
    description: '五行相生相克，万象归一'
  }
};

const Inquiry = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const categoryTitle = location.state?.category || "综合占卜";
  
  const categoryStyle = useMemo(() => 
    categoryStyles[categoryTitle as keyof typeof categoryStyles] || categoryStyles['综合占卜'],
    [categoryTitle]
  );
  
  const CategoryIcon = categoryStyle.icon;
  
  const [isLoading, setIsLoading] = useState(false);
  const [divineMethod, setDivineMethod] = useState<'time' | 'number'>('time');
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
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
          },
          divineData: {
            method: divineMethod,
            number1: number1 ? parseInt(number1) : undefined,
            number2: number2 ? parseInt(number2) : undefined
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
    <div 
      className="min-h-screen px-6 py-12 relative overflow-hidden"
      style={{ background: categoryStyle.bgGradient }}
    >
      {/* Decorative Element Badge */}
      <div className="absolute top-8 right-8 opacity-10 text-9xl font-bold select-none pointer-events-none">
        {categoryStyle.element}
      </div>
      
      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="hover:bg-white/10 transition-all"
            style={{ color: categoryStyle.primaryColor }}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <CategoryIcon className="w-10 h-10" style={{ color: categoryStyle.primaryColor }} />
              <h1 
                className="text-4xl font-bold"
                style={{ color: categoryStyle.primaryColor }}
              >
                {categoryTitle}
              </h1>
            </div>
            <p className="text-foreground/70 italic">{categoryStyle.description}</p>
          </div>
        </div>

        {/* Form */}
        <Card 
          className="p-8 backdrop-blur-sm border-2 transition-all"
          style={{ 
            background: `linear-gradient(135deg, ${categoryStyle.primaryColor}10, ${categoryStyle.secondaryColor}05)`,
            borderColor: `${categoryStyle.primaryColor}40`
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Question */}
            <div className="space-y-2">
              <Label 
                htmlFor="question" 
                className="text-lg font-semibold flex items-center gap-2"
                style={{ color: categoryStyle.primaryColor }}
              >
                <Sparkles className="w-4 h-4" />
                您的问题 *
              </Label>
              <Textarea
                id="question"
                placeholder={`例如：${
                  categoryTitle === '事业运势' ? '我适合什么时候换工作？今年事业运势如何？' :
                  categoryTitle === '情感婚姻' ? '我和ta的姻缘如何？何时能遇到正缘？' :
                  categoryTitle === '健康养生' ? '我的身体状况如何？需要注意什么？' :
                  categoryTitle === '风水布局' ? '我的房屋风水如何？如何改善？' :
                  '请输入您想咨询的问题'
                }`}
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="min-h-[120px] bg-background/50 backdrop-blur-sm transition-all focus:ring-2"
                style={{ 
                  borderColor: `${categoryStyle.primaryColor}40`,
                }}
                required
              />
            </div>

            {/* Birth Data */}
            <div className="space-y-4 p-6 rounded-lg bg-background/30 backdrop-blur-sm border"
              style={{ borderColor: `${categoryStyle.primaryColor}20` }}
            >
              <Label 
                className="text-lg font-semibold"
                style={{ color: categoryStyle.primaryColor }}
              >
                生辰信息（可选）
              </Label>
              <p className="text-sm text-foreground/70">
                提供生辰八字可获得更精准的术数分析
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
                    className="bg-background/50"
                    style={{ borderColor: `${categoryStyle.primaryColor}30` }}
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
                    className="bg-background/50"
                    style={{ borderColor: `${categoryStyle.primaryColor}30` }}
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
                    className="bg-background/50"
                    style={{ borderColor: `${categoryStyle.primaryColor}30` }}
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
                    className="bg-background/50"
                    style={{ borderColor: `${categoryStyle.primaryColor}30` }}
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

            {/* 起卦方式 - 仅在梅花易数或综合占卜时显示 */}
            {(categoryTitle === '梅花易数' || categoryTitle === '综合占卜') && (
              <div className="space-y-4 p-6 rounded-lg bg-background/30 backdrop-blur-sm border"
                style={{ borderColor: `${categoryStyle.primaryColor}20` }}
              >
                <Label 
                  className="text-lg font-semibold"
                  style={{ color: categoryStyle.primaryColor }}
                >
                  起卦方式
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDivineMethod('time')}
                    className={`px-4 py-3 rounded-xl border transition-all ${
                      divineMethod === 'time'
                        ? 'bg-background/40 border-primary/60 ring-2 ring-primary/20'
                        : 'bg-background/20 border-primary/20 hover:bg-background/30'
                    }`}
                  >
                    <span className="font-medium">时间起卦</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDivineMethod('number')}
                    className={`px-4 py-3 rounded-xl border transition-all ${
                      divineMethod === 'number'
                        ? 'bg-background/40 border-primary/60 ring-2 ring-primary/20'
                        : 'bg-background/20 border-primary/20 hover:bg-background/30'
                    }`}
                  >
                    <span className="font-medium">数字起卦</span>
                  </button>
                </div>

                {divineMethod === 'number' && (
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="num1">上卦数</Label>
                      <Input
                        id="num1"
                        type="number"
                        min="1"
                        value={number1}
                        onChange={(e) => setNumber1(e.target.value)}
                        placeholder="任意正整数"
                        className="bg-background/50"
                        style={{ borderColor: `${categoryStyle.primaryColor}30` }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="num2">下卦数</Label>
                      <Input
                        id="num2"
                        type="number"
                        min="1"
                        value={number2}
                        onChange={(e) => setNumber2(e.target.value)}
                        placeholder="任意正整数"
                        className="bg-background/50"
                        style={{ borderColor: `${categoryStyle.primaryColor}30` }}
                      />
                    </div>
                  </div>
                )}
                <p className="text-sm text-foreground/70 mt-2">
                  {divineMethod === 'time' 
                    ? '将使用您提供的出生时间或当前时间自动起卦' 
                    : '请输入两个数字，系统将自动计算卦象'}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full font-bold py-6 text-lg transition-all hover:scale-105 disabled:scale-100 shadow-2xl"
              style={{ 
                background: `linear-gradient(135deg, ${categoryStyle.primaryColor}, ${categoryStyle.secondaryColor})`,
                boxShadow: `0 0 30px ${categoryStyle.primaryColor}40`
              }}
            >
              {isLoading ? (
                <span className="flex items-center gap-2 text-white">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  正在占卜中...
                </span>
              ) : (
                <span className="flex items-center gap-2 text-white">
                  <Sparkles className="w-5 h-5" />
                  开始占卜
                </span>
              )}
            </Button>
          </form>
        </Card>

        {/* Disclaimer */}
        <div 
          className="text-center text-sm p-4 rounded-lg backdrop-blur-sm border"
          style={{ 
            borderColor: `${categoryStyle.primaryColor}20`,
            background: `${categoryStyle.primaryColor}05`
          }}
        >
          <p className="text-foreground/70">* 占卜结果仅供参考，具体决策请结合实际情况</p>
          <p className="mt-1 text-foreground/70">AI整合传统术数逻辑，助您洞察天机</p>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
