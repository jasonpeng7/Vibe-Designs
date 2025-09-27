import { Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "./Footer.css";

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of footer is visible
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
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
      
      <div className="container mx-auto max-w-6xl">
        {/* Desktop: Contact & Legal */}
        <div className="hidden md:block">
          <div className="flex justify-between items-center">
            <div>
              <a
                href="mailto:vbewebdesign@gmail.com"
                className="inline-flex items-center text-accent hover:underline"
              >
                <Mail className="w-4 h-4 mr-2" />
                vbewebdesign@gmail.com
              </a>
            </div>

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

        {/* Mobile: Keep original layout */}
        <div className="md:hidden">
          <div className="flex flex-col justify-between items-center gap-8">
            {/* Brand Identity */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <img src="/vibe.png" alt="ViBE Design" className="w-22 h-10" />
                <span className="text-2xl font-bold">ViBE Design</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Establish your online presence today.
              </p>
            </div>

            {/* Contact & Legal */}
            <div className="text-center space-y-4">
              {/* Contact */}
              <div>
                <a
                  href="mailto:vbewebdesign@gmail.com"
                  className="inline-flex items-center text-accent hover:underline"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  vbewebdesign@gmail.com
                </a>
              </div>

              {/* Legal */}
              <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
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
