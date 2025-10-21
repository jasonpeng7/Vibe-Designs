import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Code, Rocket, Search, Smartphone, Zap } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ScrollAnimation from "./ui/ScrollAnimation";
import MobileServicesAccordion from "./ui/MobileServicesAccordion";
import DesktopServicesAccordion from "./ui/DesktopServicesAccordion";
import DesktopServiceCards from "./ui/DesktopServiceCards";
import MobileServiceCards from "./ui/MobileServiceCards";
import MobileCoverParallax from "./ui/MobileCoverParallax";
import ServicesHeaderParallax from "./ui/ServicesHeaderParallax";
// Local images for the mobile accordion
import accordionSell from "/accordion-sell.webp";
import accordionRapid from "/accordion-rapid-development.webp";
import accordionSEO from "/accordion-seo.webp";
import accordionMobile from "/accordion-mobile-design.webp";
import accordionBrand from "/accordion-branding.webp";
import accordionPerformance from "/accordion-performance-optimization.webp";
import "./ServicesSection.css";
import React, { Suspense } from "react";

const ServicesSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Scroll-linked fill animation refs (same as hero section)
  const fillRef = useRef<HTMLSpanElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const initialYRef = useRef<number>(0);
  const currentRef = useRef<number>(0);
  const targetRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const desktopAnimContainerRef = useRef<HTMLDivElement | null>(null);
  const mobileAnimContainerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const [lottieLib, setLottieLib] = useState<any | null>(null);
  const desktopAnimationRef = useRef<any | null>(null);
  const mobileAnimationRef = useRef<any | null>(null);

  const services = [
    {
      icon: Palette,
      title: "Websites That Sell",
      description:
        "Optimized designs following best UI/UX practices that turn visitors into customers.",
      features: ["User Psychology", "Mobile-First Design"],
    },
    {
      icon: Code,
      title: "Rapid Development",
      description:
        "Get your website live in days, not months. Built to look great, work fast, and grow with your business.",
      features: ["Launch Ready", "Curated Visuals"],
    },
    {
      icon: Search,
      title: "SEO Optimization",
      description:
        "We help you rank higher on Google by directing more organic traffic to your website.",
      features: ["Search Engine Optimization", "Google Search"],
    },
    {
      icon: Smartphone,
      title: "Mobile Design",
      description:
        "We carefully design your website to be responsive and work perfectly on all devices.",
      features: ["Responsive Design", "Mobile Components"],
    },
    {
      icon: Rocket,
      title: "Performance Optimization",
      description: (
        <>
          Fast websites that load almost instantly.{" "}
          <span className="font-bold text-accent">Speed equals revenue.</span>
        </>
      ),
      features: ["CDN Setup", "Image Optimization", "Lazy Loading"],
    },
    {
      icon: Zap,
      title: "Marketing & Branding",
      description: "Memorable brands that stick in minds AND wallets.",
      features: ["Logo Design", "Ongoing Marketing", "Google Ads"],
    },
  ];

  // Accordion services data
  const accordionServices = [
    {
      id: "sell",
      title: "Websites That Sell",
      description: "Optimized designs following best UI/UX practices that turn visitors into customers.",
      img: accordionSell
    },
    {
      id: "rapid",
      title: "Rapid Development",
      description: "Get your website live in days, not months. Built to grow with your business.",
      img: accordionRapid
    },
    {
      id: "seo",
      title: "SEO Optimization",
      description: "We help you rank higher on Google by directing more organic traffic to your website.",
      img: accordionSEO
    },
    {
      id: "mobile",
      title: "Mobile Design",
      description: "We carefully design your website to be responsive and work perfectly on all devices.",
      img: accordionMobile
    },
    {
      id: "performance",
      title: "Performance Optimization",
      description: "Fast websites that load almost instantly. Speed equals revenue.",
      img: accordionPerformance
    },
    {
      id: "brand",
      title: "Marketing & Branding",
      description: "Memorable brands that stick in minds AND wallets.",
      img: accordionBrand
    }
  ];

  // Intersection Observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Reset initial position each time section comes into view
            initialYRef.current = window.scrollY;
          } else {
            // Reset animation when section goes out of view
            const el = fillRef.current;
            if (el) el.style.setProperty("--fill", `0%`);
            currentRef.current = 0;
            targetRef.current = 0;
          }
        });
      },
      {
        threshold: 0.3, // Start animation when 30% of section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Text animation intersection observer
  useEffect(() => {
    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsTextVisible(true);
            }, 500); // Delay for dramatic effect
          } else {
            setIsTextVisible(false);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of text element is visible
      }
    );

    if (textRef.current) {
      textObserver.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        textObserver.unobserve(textRef.current);
      }
    };
  }, []);

  // Scroll-linked fill animation (only when in view)
  React.useEffect(() => {
    if (!isInView) return;

    const el = fillRef.current;
    if (el) el.style.setProperty("--fill", `0%`); // start gray
    let threshold = Math.max(100, Math.min(window.innerHeight * 0.4, 200));

    const tick = () => {
      const el2 = fillRef.current;
      if (!el2) return;
      const current = currentRef.current;
      const target = targetRef.current;
      const next = current + (target - current) * 0.2;
      currentRef.current = next;
      el2.style.setProperty("--fill", `${Math.round(next * 100)}%`);
      if (Math.abs(target - next) > 0.001) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };

    const onScroll = () => {
      if (!isInView) return;
      const delta = window.scrollY - initialYRef.current;
      const progress = Math.min(Math.max(delta / threshold, 0), 1);
      targetRef.current = progress;
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick);
    };

    const onResize = () => {
      threshold = Math.max(100, Math.min(window.innerHeight * 0.4, 200));
      onScroll();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isInView]);

  // Lazy-load lottie-web
  useEffect(() => {
    let mounted = true;
    import('lottie-web').then((mod) => {
      if (mounted) setLottieLib(mod.default ?? mod);
    });
    return () => { mounted = false };
  }, []);

  // Initialize lottie only for current breakpoint
  useEffect(() => {
    if (!lottieLib) return;

    const isDesktop = window.matchMedia('(min-width: 768px)').matches;

    // Destroy any existing animations first
    if (desktopAnimationRef.current) {
      desktopAnimationRef.current.destroy();
      desktopAnimationRef.current = null;
    }
    if (mobileAnimationRef.current) {
      mobileAnimationRef.current.destroy();
      mobileAnimationRef.current = null;
    }

    // if (isDesktop && desktopAnimContainerRef.current) {
    //   desktopAnimationRef.current = lottieLib.loadAnimation({
    //     container: desktopAnimContainerRef.current,
    //     renderer: 'svg',
    //     loop: false,
    //     autoplay: false,
    //     path: '/services-motion.json',
    //   });
    // } else
    // On mobile we now use a GIF instead of Lottie to improve performance

    const onResize = () => {
      const nowDesktop = window.matchMedia('(min-width: 768px)').matches;
      // if (nowDesktop && !desktopAnimationRef.current && desktopAnimContainerRef.current) {
      //   if (mobileAnimationRef.current) { mobileAnimationRef.current.destroy(); mobileAnimationRef.current = null; }
      //   desktopAnimationRef.current = lottieLib.loadAnimation({
      //     container: desktopAnimContainerRef.current,
      //     renderer: 'svg',
      //     loop: false,
      //     autoplay: false,
      //     path: '/services-motion.json',
      //   });
      // } else if (!nowDesktop && !mobileAnimationRef.current && mobileAnimContainerRef.current) {
      //   // No-op: mobile uses GIF now
      // }
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (desktopAnimationRef.current) {
        desktopAnimationRef.current.destroy();
        desktopAnimationRef.current = null;
      }
      if (mobileAnimationRef.current) {
        mobileAnimationRef.current.destroy();
        mobileAnimationRef.current = null;
      }
    };
  }, [lottieLib]);

  // Play/stop only when in view
  useEffect(() => {
    const active = desktopAnimationRef.current || mobileAnimationRef.current;
    if (!active) return;
    if (isInView) {
      active.play();
    } else {
      active.stop();
    }
  }, [isInView]);


  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);


  return (
    <section
      ref={sectionRef}
      id="services"
      className="services-section relative bg-black overflow-hidden mt-[-1px] w-full"
    >
      {/* Floating Decorative Elements */}
      {/* <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute w-32 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full shadow-lg animate-float opacity-20" style={{top: '15%', right: '8%'}}></div>
        <div className="absolute w-28 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full shadow-lg animate-float opacity-20" style={{top: '8%', left: '5%', animationDelay: '2s'}}></div>
        <div className="absolute w-24 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full shadow-lg animate-float opacity-20" style={{top: '70%', right: '15%', animationDelay: '4s'}}></div>
        <div className="absolute w-20 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full shadow-lg animate-float opacity-20" style={{top: '60%', left: '10%', animationDelay: '1s'}}></div>
      </div> */}
      
      <div className="relative z-10">
        {/* Header */}
        <ScrollAnimation>
          <div className="text-center">
            <div className="flex justify-center">
              <div className="hidden xl:block relative w-full">
                <div className="w-full max-w-[1500px] mx-auto px-5 md:px-20">
                <div className="hidden md:flex items-center gap-4 lg:gap-8 xl:gap-15 mb-10">
                  <span className="text-grey-400 poppins-extralight text-sm leading-tight tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    ELEVATE
                  </span>
                  <span className="text-white poppins-regular text-sm leading-tight tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    AI SOLUTIONS
                  </span>
                  <span className="text-grey-400 poppins-extralight text-sm leading-tight tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    CHATBOT INTEGRATION
                  </span>
                </div>
                  
                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                  {/* Video */}
                  <div className="flex-1 lg:flex-[2]">
                    <video 
                      loop 
                      muted 
                      playsInline 
                      autoPlay
                      className="w-full"
                      preload="metadata"
                    >
                      <source src="/services-chatbot-desktop.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    {/* TeamSection-style overlay to hide watermark */}
                    <div 
                      className="absolute bg-black bottom-0 left-0 w-full h-10 mb-[-1px]"
                    ></div>
                  </div>

                  {/* Blog Content - Desktop: Right of video, Mobile: Below video */}
                  <div className="flex-1 lg:flex-[1] min-w-0">
                    <div className="space-y-6 text-left">
                      <div>
                        <h3 className="text-white text-2xl uppercase poppins-light leading-tight block mt-1">
                          AI SOLUTIONS
                        </h3>
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-white text-sm leading-relaxed poppins-light uppercase ">
                        An AI-powered chatbot that answers questions instantly. 
                        We build smart and automated chatbots that enhance customer support, 
                        capture leads, and personalize your website experience.
                        </p>
                      </div>

                      <div className="pt-4">
                        <p className="text-white text-xs uppercase tracking-wider poppins-light">
                          Chatbot • AI • Customer Service
                        </p>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>

              <div className="hidden sm:block xl:hidden w-full">
                <div className="w-full max-w-[1500px] mx-auto px-5 md:px-20">
                  <div className="hidden md:flex items-center gap-4 lg:gap-8 xl:gap-15 mb-10">
                    <span className="text-grey-400 poppins-extralight text-sm leading-tight tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      ELEVATE
                    </span>
                    <span className="text-white poppins-regular text-sm leading-tight tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      AI SOLUTIONS
                    </span>
                    <span className="text-grey-400 poppins-extralight text-sm leading-tight tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      CHATBOT INTEGRATION
                    </span>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Video */}
                    <div className="flex-1 lg:flex-[2] relative">
                      <video 
                        loop 
                        muted 
                        playsInline 
                        autoPlay
                        className="w-full"
                        preload="metadata"
                      >
                        <source src="/services-chatbot-tablet.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <div 
                        className="absolute bg-black bottom-0 left-0 w-full h-12 mb-[-1px]"
                      ></div>

                    </div>

                    <div className="flex-1 lg:flex-[1] min-w-0 mb-10">
                      <div className="space-y-6 text-left">
                        <div>
                          <h3 className="text-white text-2xl uppercase poppins-light leading-tight block mt-1">
                            AI SOLUTIONS
                          </h3>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-white text-sm leading-relaxed poppins-light uppercase ">
                            An AI-powered chatbot that answers questions instantly. 
                            We build smart and automated chatbots that enhance customer support, 
                            capture leads, and personalize your website experience.
                          </p>
                        </div>

                        <div className="pt-4">
                          <p className="text-white text-xs uppercase tracking-wider poppins-light">
                            Chatbot • AI • Customer Service
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="block sm:hidden relative w-full">
                <div className="w-full">
                <div className="flex md:hidden items-start justify-between w-full px-5">
                    {/* Left side - HOME IMPROVEMENT */}
                    <span className="text-white poppins-regular text-sm leading-tight tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      AI SOLUTIONS
                    </span>
                    
                    {/* Right side - VISION, APLUS4HOME, VIEW CASE STUDY stacked vertically */}
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-white poppins-extralight text-sm leading-tight tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        ELEVATE
                      </span>
                      <span className="text-white poppins-extralight text-sm leading-tight tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        CHATBOT INTEGRATION
                      </span>
                    </div>
                  </div>

                  
                  <div className="flex flex-col gap-8 -mx-[20px]">
                    {/* Video */}
                    <div className="flex-1 relative">
                      <video 
                        loop 
                        muted 
                        playsInline 
                        autoPlay
                        className="w-full"
                        preload="metadata"
                      >
                        <source src="/services-chatbot-mobile.mp4" type="video/mp4" />
                        Your browser does not support the video tag.


                      </video>  
                      <div 
                        className="absolute bg-black bottom-0 left-0 w-full h-20 mb-[-1px]"
                      ></div>
                    </div>

                    {/* Blog Content - Mobile: Below video */}
                    <div className="flex-1 min-w-0">
                      <div className="space-y-6 text-left px-10">
                        <div>
                          <h3 className="text-white text-2xl uppercase poppins-light leading-tight block mt-1">
                            AI SOLUTIONS
                          </h3>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-white text-sm leading-relaxed poppins-light uppercase ">
                            An AI-powered chatbot that answers questions instantly. 
                            We build smart and automated chatbots that enhance customer support, 
                            capture leads, and personalize your website experience.
                          </p>
                        </div>

                        <div className="pt-4">
                          <p className="text-white text-xs uppercase tracking-wider poppins-light">
                            Chatbot • AI • Customer Service
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </ScrollAnimation>

        {/* Mobile Parallax Cover (runs once) */}
        <div className="block md:hidden mt-10 sm:mt-0">
          <MobileCoverParallax />
        </div>

        {/* Services We Provide Section with Parallax - Desktop Only */}
        <div className="hidden md:block">
          <ServicesHeaderParallax />
        </div>

        {/* Desktop Service Cards */}
        <DesktopServiceCards services={services} />

        {/* Mobile Service Cards Carousel */}
        <MobileServiceCards services={services} />
      </div>
    </section>
  );
};

export default ServicesSection;
