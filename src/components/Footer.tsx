import { Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "./Footer.css";

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const mobileFooterRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isMobileInView, setIsMobileInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of footer is visible
    );

    const mobileObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMobileInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    if (mobileFooterRef.current) {
      mobileObserver.observe(mobileFooterRef.current);
    }

    return () => {
      observer.disconnect();
      mobileObserver.disconnect();
    };
  }, []);

  return (
    <footer className="py-12 px-2">
      {/* Desktop: Full-width VIBE DESIGN Layout - bypasses container constraints */}
      <div className="hidden md:block w-full" ref={footerRef}>
        <div className="text-center mb-8 flex items-center justify-center w-full min-h-[200px]">
          {/* VIBE DESIGN responsive text that fills width with minimal spacing */}
          <div className="vibe-design-text poppins-bold font-black leading-none w-full px-4">
            {['V', 'I', 'B', 'E', ' ', 'D', 'E', 'S', 'I', 'G', 'N'].map((letter, index) => (
              <span 
                key={index}
                className={`vibe-letter ${isInView ? 'animate-fill' : ''}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto max-w-6xl mt-[50px]">
        {/* Desktop: Contact & Legal */}
        <div className="hidden md:block">
          <div className="flex justify-center items-center">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>
                © {new Date().getFullYear()} ViBE Design. All rights reserved.
              </span>
              <a
                href="/terms-of-service"
                className="hover:text-accent transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/privacy-policy"
                className="hover:text-accent transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        {/* Mobile: Same as desktop */}
        <div className="md:hidden w-full" ref={mobileFooterRef}>
          <div className="text-center mb-8 flex items-center justify-center w-full min-h-[200px]">
            {/* VIBE DESIGN responsive text that fills width with minimal spacing */}
            <div className="vibe-design-text poppins-bold font-black leading-none w-full px-4">
              {['V', 'I', 'B', 'E', ' ', 'D', 'E', 'S', 'I', 'G', 'N'].map((letter, index) => (
                <span 
                  key={index}
                  className={`vibe-letter ${isMobileInView ? 'animate-fill' : ''}`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col justify-between items-center gap-8">
            {/* Contact & Legal */}
            <div className="text-center space-y-4 ">

              {/* Legal */}
              <div className="flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
                <span>
                  © {new Date().getFullYear()} ViBE Design. All rights reserved.
                </span>
                <a
                  href="/terms-of-service"
                  className="hover:text-accent transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="/privacy-policy"
                  className="hover:text-accent transition-colors"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
