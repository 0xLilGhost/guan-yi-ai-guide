import { useState } from "react";
import { cn } from "@/lib/utils";

const trigrams = [
  { name: "乾", element: "天", position: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" },
  { name: "兑", element: "泽", position: "top-[15%] right-[15%] translate-x-1/4 -translate-y-1/4" },
  { name: "离", element: "火", position: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2" },
  { name: "震", element: "雷", position: "bottom-[15%] right-[15%] translate-x-1/4 translate-y-1/4" },
  { name: "巽", element: "风", position: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" },
  { name: "坎", element: "水", position: "bottom-[15%] left-[15%] -translate-x-1/4 translate-y-1/4" },
  { name: "艮", element: "山", position: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" },
  { name: "坤", element: "地", position: "top-[15%] left-[15%] -translate-x-1/4 -translate-y-1/4" },
];

const BaguaDiagram = () => {
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setRotation((prev) => prev + 45);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-square flex items-center justify-center">
      {/* Outer ring with trigrams */}
      <div
        className={cn(
          "absolute inset-0 transition-mystical cursor-pointer",
          isHovered && "scale-105"
        )}
        style={{ transform: `rotate(${rotation}deg)` }}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Octagonal border */}
        <div className="absolute inset-[10%] border-2 border-accent/40 rounded-full"></div>
        <div className="absolute inset-[15%] border border-accent/20 rounded-full"></div>

        {/* Eight trigrams */}
        {trigrams.map((trigram, index) => (
          <div
            key={index}
            className={cn(
              "absolute px-4 py-2 rounded-lg bg-card/80 backdrop-blur-sm border border-accent/30",
              "hover:bg-accent/20 hover:border-accent transition-mystical",
              trigram.position
            )}
          >
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-accent">{trigram.name}</div>
              <div className="text-xs text-muted-foreground">{trigram.element}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Center Yin-Yang */}
      <div className="relative z-10 w-48 h-48 rounded-full bg-gradient-to-br from-accent to-background border-4 border-accent shadow-gold-glow transition-mystical hover:scale-110 cursor-pointer">
        {/* Yin-Yang symbol */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-40 h-40">
            {/* Yang (light) half */}
            <div className="absolute inset-0 rounded-full bg-accent overflow-hidden">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-background rounded-l-full"></div>
              <div className="absolute top-1/4 left-1/4 w-1/4 h-1/4 rounded-full bg-background"></div>
              <div className="absolute bottom-1/4 right-1/4 w-1/4 h-1/4 rounded-full bg-accent"></div>
            </div>
          </div>
        </div>

        {/* Center character */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl font-bold text-gradient-gold mix-blend-difference">
            太極
          </div>
        </div>
      </div>

      {/* Decorative lines connecting to trigrams */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => {
          const rad = (angle * Math.PI) / 180;
          const startX = 50 + 12 * Math.cos(rad);
          const startY = 50 + 12 * Math.sin(rad);
          const endX = 50 + 35 * Math.cos(rad);
          const endY = 50 + 35 * Math.sin(rad);
          
          return (
            <line
              key={index}
              x1={`${startX}%`}
              y1={`${startY}%`}
              x2={`${endX}%`}
              y2={`${endY}%`}
              stroke="hsl(var(--accent))"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          );
        })}
      </svg>

      {/* Instruction hint */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center">
        <p className="text-sm text-muted-foreground">点击八卦旋转 · Click to Rotate</p>
      </div>
    </div>
  );
};

export default BaguaDiagram;
