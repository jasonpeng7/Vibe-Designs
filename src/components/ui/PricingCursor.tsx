import React from "react";
import { useLocation } from "react-router-dom";

const PricingCursor: React.FC = () => {
  const bannerRef = React.useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const [shouldShow, setShouldShow] = React.useState(false);

  React.useEffect(() => {
    const checkDeviceType = () => {
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Only show on pricing page and non-touch, non-mobile devices
      setShouldShow(location.pathname === '/pricing' && !isTouch && !isMobile);
    };

    // Check initially
    checkDeviceType();
  }, [location.pathname]);

  React.useEffect(() => {
    if (!shouldShow) return;

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
  }, [shouldShow]);

  // Don't render if should not show
  if (!shouldShow) return null;

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
        className="px-2 py-[2px] rounded-sm text-white text-[10px] leading-none font-semibold shadow-sm"
        style={{
          backgroundColor: "#3b82f6", // bluish background
          border: "1px solid rgba(255,255,255,0.2)",
          textShadow: "0 1px 0 rgba(0,0,0,0.35)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
          letterSpacing: "0.08em",
        }}
      >
        GROWTH
      </div>
    </div>
  );
};

export default PricingCursor;
