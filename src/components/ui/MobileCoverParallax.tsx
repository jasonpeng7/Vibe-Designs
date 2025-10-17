import React, { useEffect, useRef, useState } from "react";

// Mobile-only parallax cover. Locks the scroll briefly while text slides horizontally, then releases and never runs again.
export default function MobileCoverParallax() {
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

    // Animate the text sliding from right to left
    const text = textRef.current;
    if (text) {
      text.style.transform = "translateX(100%)";
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
    }, 1500);

    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, hasRun]);

  return (
    <div ref={coverRef} className="lg:hidden w-full">
      <div className="relative">
        <div className="relative px-4 py-1">
          <div
            ref={textRef}
            className="text-black poppins-regular text-center"
            style={{
              transform: hasRun ? "translateX(0)" : "translateX(100%)",
              transition: active ? "transform 900ms cubic-bezier(0.22,1,0.36,1)" : "none",
            }}
          >
            <h1 className="text-5xl hero-text m-0">We Provide ...</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
