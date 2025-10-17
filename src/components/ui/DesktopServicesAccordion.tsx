import React, { useEffect, useRef, useState } from "react";

/**
 * DesktopServicesAccordion
 * ----------------------------------------------------------
 * A desktop-optimized accordion that:
 *  - Uses a more spacious layout for larger screens
 *  - Larger text and images
 *  - Enhanced hover effects and animations
 *  - Grid-based layout for better visual hierarchy
 *
 * Tech stack: React + TailwindCSS + Pure CSS Animations
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

export default function DesktopServicesAccordion({ services, className = "" }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [animatedItems, setAnimatedItems] = useState<Set<number>>(new Set());

  const [openId, setOpenId] = useState<string | null>(null);
  const [openingIds, setOpeningIds] = useState<Record<string, boolean>>({}); // slide out
  const [settlingIds, setSettlingIds] = useState<Record<string, boolean>>({}); // slide back a little
  const [imageVisibleIds, setImageVisibleIds] = useState<Record<string, boolean>>({});
  const [descriptionVisibleIds, setDescriptionVisibleIds] = useState<Record<string, boolean>>({});

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
              }, index * 150); // 150ms stagger for desktop
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
      // 2) after slide starts, begin image fade
      setTimeout(() => {
        setImageVisibleIds(prev => ({ ...prev, [svc.id]: true }));
      }, 400);
      // 3) after main slide completes, slide back slightly
      setTimeout(() => {
        setOpeningIds(prev => ({ ...prev, [svc.id]: false }));
        setSettlingIds(prev => ({ ...prev, [svc.id]: true }));
        // 4) end settle
        setTimeout(() => {
          setSettlingIds(prev => ({ ...prev, [svc.id]: false }));
          // Fade in description right after settle finishes
          setDescriptionVisibleIds(prev => ({ ...prev, [svc.id]: true }));
        }, 250);
      }, 600);
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
      className={"relative hidden md:block w-full select-none " + className}
      aria-label="Services Accordion"
    >
      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute w-32 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full opacity-15 animate-float" style={{ top: '8%', left: '4%' }} />
        <div className="absolute w-24 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full opacity-15 animate-float" style={{ bottom: '15%', right: '6%', animationDelay: '2s' }} />
        <div className="absolute w-28 h-18 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full opacity-15 animate-float" style={{ top: '0%', right: '12%', animationDelay: '4s' }} />
        <div className="absolute w-20 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full opacity-15 animate-float" style={{ bottom: '3%', left: '1%', animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        {services.map((svc, index) => {
          const isAnimated = animatedItems.has(index);
          const isOpen = openId === svc.id;

          return (
            <div
              key={svc.id}
              className={`relative transition-all duration-700 ease-out px-2 ${
                isAnimated 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Header Row */}
              <div
                ref={(el) => (rowRefs.current[svc.id] = el)}
                className={`text-black bg-transparent ${
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
                  className="w-full flex items-center text-black justify-between py-6 px-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  {/* Title rendered letter-by-letter so we can morph one */}
                  <div className="relative">
                    <span className="sr-only">{svc.title}</span>
                    <div aria-hidden className="poppins-regular whitespace-pre flex items-center">
                      {(() => {
                        const parts = svc.title.split(' ');
                        const hasSpace = parts.length > 1;
                        const first = hasSpace ? parts[0] : '';
                        const rest = hasSpace ? parts.slice(1).join(' ') : svc.title;
                        if (!isOpen) {
                          // Closed: render the full title with no extra inline elements or gaps
                          return <span className="align-baseline text-xl font-semibold">{svc.title}</span>;
                        }
                        // Open: render inline oval at first space and a small spacer so text reflows
                        return (
                          <>
                            {hasSpace && <span className="align-baseline text-xl font-semibold">{first}</span>}
                            <span
                              className={`inline-block align-middle overflow-hidden border border-white/40 rounded-full ml-3 mr-3 transition-opacity duration-300 ease-out`}
                              style={{ width: 120, height: 68, background: 'transparent', opacity: imageVisibleIds[svc.id] ? 1 : 0 }}
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
                              className={`inline-block align-baseline text-xl font-semibold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                openingIds[svc.id] ? 'translate-x-8' : settlingIds[svc.id] ? 'translate-x-2' : 'translate-x-0'
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
                    className={`text-black/80 text-2xl leading-none transition-transform duration-300 ease-out ${
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
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className={`px-6 pb-4 pt-4 text-black/80 text-base bg-gray-100 leading-relaxed transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  descriptionVisibleIds[svc.id] ? 'opacity-100' : 'opacity-0'
                }`}>
                  {svc.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * USAGE EXAMPLE
 * ----------------------------------------------------------
 * <DesktopServicesAccordion
 *   services={[
 *     { id: 'sell', title: 'Websites That Sell', description: 'Optimized to convert visitors into customers.' },
 *     { id: 'rapid', title: 'Rapid Development', description: 'Ship in days, not months.' },
 *     { id: 'mobile', title: 'Mobile Design', description: 'Flawless on every screen size.' },
 *     { id: 'performance', title: 'Performance Optimization', description: 'Speed equals revenue.' },
 *     { id: 'brand', title: 'Marketing & Branding', description: 'Memorable visuals and messaging.' },
 *   ]}
 * />
 *
 * Desktop-optimized version with larger text, images, and grid layout.
 */
