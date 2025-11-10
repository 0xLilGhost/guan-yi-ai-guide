import { Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      {/* Mystical background effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/20 blur-[120px] animate-pulse"></div>
      </div>

      {/* Chinese character decoration */}
      <div className="absolute top-20 left-10 text-accent/10 text-9xl font-bold select-none">
        易
      </div>
      <div className="absolute bottom-20 right-10 text-accent/10 text-9xl font-bold select-none">
        卦
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center space-y-8 max-w-4xl">
        {/* Top Chinese character */}
        <div className="text-accent text-6xl font-bold tracking-widest animate-fade-in">
          观
        </div>

        {/* Main title */}
        <div className="space-y-4">
          <h1 className="text-7xl md:text-8xl font-black tracking-wider text-gradient-gold animate-fade-in">
            观易
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent"></div>
            <Sparkles className="w-6 h-6 text-accent animate-pulse" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent"></div>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-2xl md:text-3xl text-foreground/90 font-serif tracking-wide">
          融合传统玄学与现代AI的智能决策指引
        </p>

        {/* Description */}
        <div className="space-y-3 text-muted-foreground text-lg max-w-2xl mx-auto">
          <p className="leading-relaxed">
            梅花易数 · 紫微斗数 · 风水学 · 奇门遁甲 · 太乙神数
          </p>
          <p className="text-base opacity-80">
            AI智能解析，助您洞察天机，把握时运
          </p>
        </div>

        {/* Bottom Chinese character */}
        <div className="pt-8">
          <div className="text-accent text-5xl font-bold tracking-widest animate-fade-in">
            悟
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
