import React from "react";

type BrandQualitiesProps = {
  qualities: string[];
  durationMs?: number; // default 2000
};

const BrandQualities: React.FC<BrandQualitiesProps> = ({ qualities, durationMs = 2000 }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [cycleKey, setCycleKey] = React.useState(0);

  React.useEffect(() => {
    if (!qualities || qualities.length === 0) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % Math.min(3, qualities.length));
      setCycleKey((k) => k + 1); // restart animation on active bar
    }, durationMs);
    return () => clearInterval(id);
  }, [qualities, durationMs]);

  const bars = new Array(3).fill(0);

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
        <span
          key={`${activeIndex}-${cycleKey}`}
          className="quality-fade text-[11px] xs:text-[12px] tracking-wide uppercase text-black/80 inline-block"
        >
          {qualities[activeIndex] ?? ""}
        </span>
      </div>
    </div>
  );
};

export default BrandQualities;


