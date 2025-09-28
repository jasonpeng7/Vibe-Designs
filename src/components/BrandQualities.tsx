import React from "react";

type BrandQualitiesProps = {
  qualities: string[];
  durationMs?: number; // default 2000
};

const BrandQualities: React.FC<BrandQualitiesProps> = ({ qualities, durationMs = 2000 }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [cycleKey, setCycleKey] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (!qualities || qualities.length === 0) return;
    
    // Initial delay before showing the component
    const initialDelay = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Start cycling after the initial delay
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % Math.min(3, qualities.length));
      setCycleKey((k) => k + 1); // restart animation on active bar
    }, durationMs);
    
    return () => {
      clearTimeout(initialDelay);
      clearInterval(id);
    };
  }, [qualities, durationMs]);

  const bars = new Array(3).fill(0);

  if (!isVisible) {
    return <div className="w-full max-w-[280px] h-8"></div>; // Placeholder to maintain layout
  }

  return (
    <div className="w-full max-w-[280px]">
      {/* Bars on one row */}
      <div className="flex items-center gap-2">
        {bars.map((_, i) => {
          const isActive = i === activeIndex;
          return (
            <div key={`${i}-${isActive ? cycleKey : 0}`} className="relative h-px w-16 rounded-full bg-black/20 overflow-hidden">
              {isActive && (
                <div
                  className="absolute inset-y-0 left-0 bg-black will-change-transform origin-left"
                  style={{
                    height: "1px",
                    animation: `bar-countdown ${durationMs}ms linear forwards`,
                    width: "100%",
                  }}
                  aria-hidden
                />
              )}
            </div>
          );
        })}
      </div>
      {/* Active quality text below */}
      <div className="mt-2 text-left min-h-[1rem]">
        <div
          key={`${activeIndex}-${cycleKey}`}
          className="text-[11px] xs:text-[12px] tracking-wide uppercase text-black/80"
        >
          {(qualities[activeIndex] ?? "").split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="quality-word-container">
              <span 
                className="quality-word-slide-up"
                style={{
                  animationDelay: `${(wordIndex + 1) * 0.15}s`
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandQualities;


