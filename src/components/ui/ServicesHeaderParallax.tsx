import React, { useRef, useEffect, useState } from "react";

type Props = {
  className?: string;
};

export default function ServicesHeaderParallax({ className = "" }: Props) {
  const [hasRun, setHasRun] = useState(false);
  const [active, setActive] = useState(false);
  const coverRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (hasRun) return;

    const onScroll = () => {
      if (hasRun || active) return;
      const el = coverRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Trigger when the cover enters viewport by ~30%
      if (rect.top < window.innerHeight * 0.7) {
        setActive(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasRun, active]);

  useEffect(() => {
    if (!active || hasRun) return;

    // Lock the scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Animate the text sliding from left to right
    const text = textRef.current;
    if (text) {
      text.style.transform = "translateX(-100%)";
      // next frame
      requestAnimationFrame(() => {
        text.style.transition = "transform 3500ms cubic-bezier(0.22,1,0.36,1)";
        text.style.transform = "translateX(0)";
      });
    }

    // After animation ends, unlock scroll and mark as run
    const timeout = window.setTimeout(() => {
      document.body.style.overflow = prevOverflow;
      setHasRun(true);
      setActive(false);
    }, 1800);

    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, hasRun]);

  return (
    <div ref={coverRef} className={`relative py-16 overflow-hidden ${className}`}>
      <div className="relative">
        <div className="relative px-4 py-1">
          <div
            ref={textRef}
            className="text-center"
            style={{
              transform: hasRun ? "translateX(0)" : "translateX(-100%)",
              transition: active ? "transform 3500ms cubic-bezier(0.22,1,0.36,1)" : "none",
            }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
              Services We Provide
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Comprehensive digital solutions designed to fuel your business growth and maximize your online potential.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * USAGE EXAMPLE
 * ----------------------------------------------------------
 * <ServicesHeaderParallax />
 *
 * Desktop-optimized parallax header with horizontal sliding animation.
 */
