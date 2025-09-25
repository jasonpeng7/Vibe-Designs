import React from "react";

const CustomCursor: React.FC = () => {
  const bannerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    const onMove = (e: MouseEvent) => {
      // Offset banner a bit to the right and down of native cursor
      const x = e.clientX + 12;
      const y = e.clientY + 12;
      banner.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Hide on touch devices / small screens
  const isTouch = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
  if (isTouch) return null;

  return (
    <div
      ref={bannerRef}
      aria-hidden
      className="pointer-events-none fixed z-[1000] select-none"
      style={{
        // Start off-screen until first move
        transform: "translate3d(-1000px, -1000px, 0)",
      }}
    >
      <div
        className="px-2 py-[2px] rounded-sm bg-[rgba(124,58,237,0.95)] text-white text-[10px] leading-none font-semibold shadow-sm"
        style={{
          border: "1px solid rgba(255,255,255,0.2)",
          textShadow: "0 1px 0 rgba(0,0,0,0.35)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
          letterSpacing: "0.08em",
        }}
      >
        VIBE
      </div>
    </div>
  );
};

export default CustomCursor;


