import React, { useEffect, useRef, useState } from "react";

/**
 * MobileServicesAccordion
 * ----------------------------------------------------------
 * A minimal, mobile-first accordion that:
 *  - Uses only top/bottom borders (transparent background)
 *  - White text and borders
 *  - Each item fades in sequentially on scroll
 *  - On click, a RANDOM letter in the service title smoothly morphs
 *    into an oval container that reveals an image (placeholder by default)
 *
 * Tech stack: React + TailwindCSS + Pure CSS Animations
 *
 * Drop this component directly under your "Chatbot Integration" section.
 * Assumes Tailwind is configured and page background is dark (for white text).
 */

// ---------- Types ----------

type Service = {
  id: string;
  title: string;
  img?: string; // optional custom image URL for the service
  description?: string; // optional short description inside the accordion body
};

type Props = {
  services: Service[];
  className?: string;
};

// ---------- Helpers ----------

// Return a random letter index excluding spaces & punctuation
function randomLetterIndex(label: string) {
  const validIndices = [...label]
    .map((ch, i) => ({ ch, i }))
    .filter(({ ch }) => /[A-Za-z0-9]/.test(ch));
  if (validIndices.length === 0) return -1;
  const { i } = validIndices[Math.floor(Math.random() * validIndices.length)];
  return i;
}

// Default placeholder images (royalty-free endpoints); swap if needed
const PLACEHOLDERS = [
  "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542831371-d531d36971e6?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555949963-aa79dcee981d?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
];

function pickImage(index: number, fallback?: string) {
  if (fallback) return fallback;
  return PLACEHOLDERS[index % PLACEHOLDERS.length];
}

// ---------- Component ----------

export default function MobileServicesAccordion({ services, className = "" }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [animatedItems, setAnimatedItems] = useState<Set<number>>(new Set());

  const [openId, setOpenId] = useState<string | null>(null);
  const [openingIds, setOpeningIds] = useState<Record<string, boolean>>({}); // slide out
  const [settlingIds, setSettlingIds] = useState<Record<string, boolean>>({}); // slide back a little
  const [imageVisibleIds, setImageVisibleIds] = useState<Record<string, boolean>>({});
  const [descriptionVisibleIds, setDescriptionVisibleIds] = useState<Record<string, boolean>>({});
  const [morphState, setMorphState] = useState<{
    id: string | null; // which service is morphing/active
    letterIndex: number; // index of the letter inside title
    rect: { x: number; y: number; w: number; h: number } | null; // origin rect of the letter
  }>({ id: null, letterIndex: -1, rect: null });

  // Refs to measure individual character bounds for each service
  const charRefs = useRef<Record<string, (HTMLSpanElement | null)[]>>({});
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            // Stagger animation for each item
            services.forEach((_, index) => {
              setTimeout(() => {
                setAnimatedItems(prev => new Set([...prev, index]));
              }, index * 120); // 120ms stagger
            });
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: "0px 0px -20% 0px"
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [services]);

  // Close handler (tap again or open another)
  const toggle = (svc: Service, index: number) => () => {
    const isOpening = openId !== svc.id;

    if (isOpening) {
      setOpenId(svc.id);
      // 1) start slide out on next frame so transition runs from translate-x-0
      requestAnimationFrame(() => {
        setOpeningIds(prev => ({ ...prev, [svc.id]: true }));
      });
      // 2) after slide starts, begin image fade with delay
      setTimeout(() => {
        setImageVisibleIds(prev => ({ ...prev, [svc.id]: true }));
      }, 550);
      // 3) after main slide completes, slide back slightly
      setTimeout(() => {
        setOpeningIds(prev => ({ ...prev, [svc.id]: false }));
        setSettlingIds(prev => ({ ...prev, [svc.id]: true }));
        // 4) end settle
        setTimeout(() => {
          setSettlingIds(prev => ({ ...prev, [svc.id]: false }));
          // Fade in description right after settle finishes
          setDescriptionVisibleIds(prev => ({ ...prev, [svc.id]: true }));
        }, 220);
      }, 520);
    } else {
      setOpenId(null);
      setOpeningIds(prev => ({ ...prev, [svc.id]: false }));
      setSettlingIds(prev => ({ ...prev, [svc.id]: false }));
      setImageVisibleIds(prev => ({ ...prev, [svc.id]: false }));
      setDescriptionVisibleIds(prev => ({ ...prev, [svc.id]: false }));
    }
  };

  return (
    <div
      ref={containerRef}
      className={"relative lg:hidden w-full select-none mb-5 " + className}
      aria-label="Services Accordion"
    >
      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute w-24 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full opacity-20 animate-float" style={{ top: '10%', left: '6%' }} />
        <div className="absolute w-16 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full opacity-20 animate-float" style={{ bottom: '18%', right: '8%', animationDelay: '2s' }} />
        <div className="absolute w-20 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full opacity-20 animate-float" style={{ top: '0%', right: '14%', animationDelay: '4s' }} />
        <div className="absolute w-14 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full opacity-20 animate-float" style={{ bottom: '5%', left: '2%', animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
      {services.map((svc, index) => {
        const isAnimated = animatedItems.has(index);
        const isOpen = openId === svc.id;
        const isMorphing = false;

        return (
          <div
            key={svc.id}
            className={`relative transition-all duration-500 ease-out px-2 ${
              isAnimated 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-3'
            }`}
            style={{ transitionDelay: `${index * 120}ms` }}
          >
            {/* Header Row */}
            <div
              ref={(el) => (rowRefs.current[svc.id] = el)}
              className={`text-white bg-transparent ${
                index === 0
                  ? 'border-b border-black/30'
                  : index === services.length - 1
                    ? ''
                    : 'border-b border-black/30'
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`panel-${svc.id}`}
                onClick={toggle(svc, index)}
                className="w-full flex items-center text-black justify-between py-4 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                {/* Title rendered letter-by-letter so we can morph one */}
                <div className="relative">
                  <span className="sr-only">{svc.title}</span>
                  <div aria-hidden className="poppins-regular whitespace-pre flex items-center py-4">
                    {(() => {
                      const parts = svc.title.split(' ');
                      const hasSpace = parts.length > 1;
                      const first = hasSpace ? parts[0] : '';
                      const rest = hasSpace ? parts.slice(1).join(' ') : svc.title;
                      if (!isOpen) {
                        // Closed: render the full title with no extra inline elements or gaps
                        return <span className="align-baseline">{svc.title}</span>;
                      }
                      // Open: render inline oval at first space and a small spacer so text reflows
                      return (
                        <>
                          {hasSpace && <span className="align-baseline">{first}</span>}
                          <span
                            className={`inline-block align-middle overflow-hidden border border-white/40 rounded-full ml-2 mr-2 transition-opacity duration-300 ease-out`}
                            style={{ width: 84, height: 48, background: 'transparent', opacity: imageVisibleIds[svc.id] ? 1 : 0 }}
                          >
                            {imageVisibleIds[svc.id] && (
                              <img
                                src={pickImage(index, svc.img)}
                                alt="Service visual"
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            )}
                          </span>
                          <span
                            className={`inline-block align-baseline transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                              openingIds[svc.id] ? 'translate-x-6' : settlingIds[svc.id] ? 'translate-x-1' : 'translate-x-0'
                            }`}
                          >
                            {rest} 
                          </span>
                        </>
                      );
                    })()}
                  </div>
                </div>

                <span
                  aria-hidden
                  className={`text-black/80 text-xl leading-none transition-transform duration-300 ease-out ${
                    isOpen ? 'rotate-45' : 'rotate-0'
                  }`}
                >
                  +
                </span>
              </button>
            </div>

            {/* Panel (no extra borders to avoid doubles) */}
            <div
              id={`panel-${svc.id}`}
              role="region"
              aria-labelledby={`button-${svc.id}`}
              className={`overflow-hidden transition-all duration-400 ease-out ${
                isOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className={`px-4 pb-3 pt-3 text-black/80 text-sm bg-gray-100 leading-relaxed transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                descriptionVisibleIds[svc.id] ? 'opacity-100' : 'opacity-0'
              }`}>
                {svc.description}
              </div>
            </div>
          </div>
        );
      })}
      </div>

      {/* no extra styles needed */}
    </div>
  );
}

/**
 * USAGE EXAMPLE
 * ----------------------------------------------------------
 * <MobileServicesAccordion
 *   services={[
 *     { id: 'sell', title: 'Websites That Sell', description: 'Optimized to convert visitors into customers.' },
 *     { id: 'rapid', title: 'Rapid Development', description: 'Ship in days, not months.' },
 *     { id: 'mobile', title: 'Mobile Design', description: 'Flawless on every screen size.' },
 *     { id: 'performance', title: 'Performance Optimization', description: 'Speed equals revenue.' },
 *     { id: 'brand', title: 'Marketing & Branding', description: 'Memorable visuals and messaging.' },
 *   ]}
 * />
 *
 * Place directly beneath your Chatbot Integration section on mobile.
 */

// ----------------------------------------------------------
// DESIGN & BEHAVIOR NOTES
// ----------------------------------------------------------
// 1) Minimal Look: Only `border-y` per item (top/bottom), transparent backgrounds, white text.
// 2) Fade-in as you scroll: We detect in-view on the container and animate items with index-based delay.
// 3) Random-letter morph: On open, we pick a random alphanumeric char, measure its bounding box, and
//    overlay a div that expands to an oval with an image using CSS animations.
// 4) Accessibility: Each header is a <button> with aria-expanded/aria-controls. The panel has role="region".
// 5) Mobile-first: Hidden on large screens via `lg:hidden`. Adjust as needed.
// 6) Performance: Images are lazy-loaded, overlay uses CSS transitions; no external animation library.
// 7) Customization: 
//    - Adjust oval target size in the keyframes (width/height). 
//    - Swap `pickImage` with your brand visuals or CMS.
//    - If your background isn't dark, change text/border colors.
// 8) Edge cases: If a title has no alphanumerics, morph is skipped. If measuring fails, overlay still animates from small to oval near the title.
// ----------------------------------------------------------
