import { useState, useRef, useEffect, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import ImageGridReveal from "./ui/ImageGridReveal";

type Slide = {
  layers: {
    src: string;
    mobileSrc?: string;
    alt: string;
    parallax: number; // e.g., 0.2 for background, 1.0 for foreground
  }[];
  title: string;
  caption: string;
};

type ParallaxCarouselProps = {
  slides: Slide[];
};

const ParallaxCarousel = ({ slides }: ParallaxCarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLImageElement | null)[][]>([]);
  const [progress, setProgress] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasInitialAnimationPlayed, setHasInitialAnimationPlayed] =
    useState(false);

  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const prefersReducedMotion = useMediaQuery({
    query: "(prefers-reduced-motion: reduce)",
  });

  const updateLayers = useCallback(
    (scrollAmount: number) => {
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-scrollAmount}px, 0, 0)`;
      }
      layerRefs.current.forEach((slideLayers, slideIndex) => {
        slideLayers.forEach((layerEl, layerIndex) => {
          if (layerEl) {
            const parallaxFactor =
              slides[slideIndex].layers[layerIndex].parallax;
            const offsetX = scrollAmount * (1 - parallaxFactor);
            layerEl.style.transform = `translate3d(${offsetX}px, 0, 0)`;
          }
        });
      });
    },
    [slides]
  );

  const handleJumpToSlide = useCallback(
    (index: number) => {
      if (!containerRef.current) return;

      const scrollableHeight =
        containerRef.current.offsetHeight - window.innerHeight;
      const topOfContainer =
        window.scrollY + containerRef.current.getBoundingClientRect().top;

      const targetScrollFraction = index / (slides.length - 1);
      const targetScrollY =
        topOfContainer + targetScrollFraction * scrollableHeight;

      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });
    },
    [slides.length]
  );

  useEffect(() => {
    if (!isIntersecting || prefersReducedMotion) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        const nextSlide = Math.min(
          slides.length - 1,
          Math.round(progress * (slides.length - 1)) + 1
        );
        handleJumpToSlide(nextSlide);
      } else if (e.key === "ArrowLeft") {
        const prevSlide = Math.max(
          0,
          Math.round(progress * (slides.length - 1)) - 1
        );
        handleJumpToSlide(prevSlide);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isIntersecting,
    prefersReducedMotion,
    progress,
    slides.length,
    handleJumpToSlide,
  ]);

  useEffect(() => {
    // If reduced motion is preferred, we don't want any of the scroll effects.
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(() => {
        const { top, height } = container.getBoundingClientRect();
        const scrollableHeight = height - window.innerHeight;
        const currentScroll = -top;
        const scrollFraction = Math.max(
          0,
          Math.min(1, currentScroll / scrollableHeight)
        );

        if (trackRef.current) {
          const trackWidth = trackRef.current.scrollWidth - window.innerWidth;
          updateLayers(scrollFraction * trackWidth);
          setProgress(scrollFraction);
        }
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting) {
          window.addEventListener("scroll", onScroll, { passive: true });
        } else {
          window.removeEventListener("scroll", onScroll);
        }
      },
      { threshold: 0 }
    );

    observer.observe(container);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion, updateLayers]);

  if (prefersReducedMotion) {
    // Fallback for reduced motion
    return (
      <div className="flex overflow-x-auto snap-x snap-mandatory">
        {slides.map((slide, i) => {
          const lastLayer = slide.layers[slide.layers.length - 1];
          const imageSrc =
            isMobile && lastLayer.mobileSrc
              ? lastLayer.mobileSrc
              : lastLayer.src;
          return (
            <div
              key={i}
              className="w-full flex-shrink-0 h-screen snap-start relative"
            >
              <img
                src={imageSrc}
                alt={lastLayer.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-10 left-10 text-white bg-black/50 p-4 rounded-lg">
                <h3 className="text-2xl font-bold">{slide.title}</h3>
                <p>{slide.caption}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const activeSlide = Math.round(progress * (slides.length - 1));

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${slides.length * 150}vh` }}
    >
      <div
        className={`fixed top-1/2 -translate-y-1/2 right-8 z-10 flex flex-col gap-4 transition-opacity duration-300 ${
          isIntersecting ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        role="navigation"
        aria-label="Carousel progress"
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleJumpToSlide(index)}
            className="w-3 h-3 rounded-full border-2 border-white/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50"
            style={{
              backgroundColor: activeSlide === index ? "white" : "transparent",
            }}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={activeSlide === index ? "step" : undefined}
          />
        ))}
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-full"
          style={{ width: `${slides.length * 100}vw`, willChange: "transform" }}
        >
          {slides.map((slide, i) => {
            const lastLayer = slide.layers[slide.layers.length - 1];
            const imageGridSrc =
              isMobile && lastLayer.mobileSrc
                ? lastLayer.mobileSrc
                : lastLayer.src;
            return (
              <div key={i} className="h-screen w-screen relative">
                {!hasInitialAnimationPlayed && i === 0 && (
                  <ImageGridReveal
                    src={imageGridSrc}
                    rows={8}
                    cols={12}
                    onComplete={() => setHasInitialAnimationPlayed(true)}
                  />
                )}
                <div
                  className={`absolute inset-0 ${
                    hasInitialAnimationPlayed || i > 0
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  {slide.layers.map((layer, j) => {
                    const imageSrc =
                      isMobile && layer.mobileSrc ? layer.mobileSrc : layer.src;
                    return (
                      <img
                        key={j}
                        ref={(el) => {
                          if (!layerRefs.current[i]) layerRefs.current[i] = [];
                          if (el) layerRefs.current[i][j] = el;
                        }}
                        src={imageSrc}
                        alt={layer.alt}
                        className="absolute w-full h-full object-cover"
                        style={{ willChange: "transform" }}
                      />
                    );
                  })}
                </div>
                <div
                  className={`absolute bottom-20 left-1/2 -translate-x-1/2 text-center text-white bg-black/50 p-4 rounded-xl backdrop-blur-sm transition-all duration-500 ease-in-out ${
                    (hasInitialAnimationPlayed || i > 0) && activeSlide === i
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4 pointer-events-none"
                  }`}
                >
                  <h3 className="text-2xl md:text-3xl font-bold hero-text">
                    {slide.title}
                  </h3>
                  <p className="text-md md:text-lg">{slide.caption}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ParallaxCarousel;
