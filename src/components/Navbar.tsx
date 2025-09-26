import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import MaxWidthWrapper from "./ui/MaxWidthWrapper";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hideOnPortfolio, setHideOnPortfolio] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const isCaseStudyPage = location.pathname.startsWith("/portfolio");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const portfolioSection = document.getElementById("portfolio");
      if (!portfolioSection) {
        setHideOnPortfolio(false);
        return;
      }

      const rect = portfolioSection.getBoundingClientRect();
      const topOfViewport = 0; // viewport top
      // Hide when the viewport top is within the portfolio section bounds
      const shouldHide = rect.top <= topOfViewport && rect.bottom > topOfViewport;
      setHideOnPortfolio(shouldHide);
    };

    // Run once on mount to set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll as any);
      window.removeEventListener("resize", handleScroll as any);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
  }, [location]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.history.pushState(null, "", `/#${sectionId}`);
      setActiveSection(sectionId);
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (linkId: string) => {
    if (linkId === "pricing") {
      navigate("/pricing");
    } else {
      scrollToSection(linkId);
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: "portfolio", title: "Work" },
    { id: "services", title: "Services" },
    { id: "pricing", title: "Pricing" },
    { id: "team", title: "Team" },
  ];

  return (
    <header
      role="navigation"
      aria-label="Main"
      className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled || isMobileMenuOpen || isCaseStudyPage
          ? "bg-transparent"
          : "bg-transparent"
      } ${hideOnPortfolio ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <MaxWidthWrapper className="h-20 flex items-center justify-between">
        {/* --- Desktop Header --- */}
        <div className="hidden md:flex w-full items-center justify-between px-10">
          {/* Logo */}
          <div className="flex-1 flex justify-start">
            <a href="/" aria-label="ViBE Creative Home">
              <img
                src="/vibe_lgo.png"
                alt="VBE Design Logo"
                className="h-7 w-auto"
              />
            </a>
          </div>

          {/* Desktop Nav Island */}
          <nav className="rounded-full bg-white/20 backdrop-blur-lg border border-black/70">
            <div className="flex items-center gap-x-2 px-2 py-1">
              {navLinks.map((link) => (
                <Button
                  key={link.id}
                  variant="ghost"
                  onClick={() => handleNavClick(link.id)}
                  className={cn(
                    "poppins-regular rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ease-in-out hover:bg-transparent hover:scale-110",
                    activeSection === link.id
                      ? "bg-primary/10 hero-text"
                      : "text-black/70"
                  )}
                >
                  {link.title}
                </Button>
              ))}
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="flex-1 flex justify-end">
            <Button
              onClick={() => scrollToSection("contact")}
              className="p-2 bg-transparent rounded-none  backdrop-blur-sm bg-white/20"
            >
              <p className="text-xs text-black poppins-regular px-2">Start a Project</p>
            </Button>
          </div>
        </div>

        {/* --- Mobile Header --- */}
        <div className="md:hidden w-full p-2">
          <div className="relative">
            {/* Mobile Nav Island */}
            <nav className="mx-[20px] flex items-center justify-between rounded-full border border-black/70 bg-white/20 p-2 backdrop-blur-md h-12">
              <a href="/" aria-label="ViBE Creative Home" className="flex items-center">
                <img
                  src="/vibe_lgo.png"
                  alt="VBE Design Logo"
                  className="h-6 w-auto"
                />
              </a>
              <Button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                size="icon"
                className="bg-transparent text-black hover:bg-transparent hover:text-black/30 flex items-center justify-center h-10 w-10 p-0"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <span className="sr-only">Open main menu</span>
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <Menu 
                    className={cn(
                      "absolute inset-0 m-auto h-5 w-5 transition-all duration-300 ease-out",
                      isMobileMenuOpen ? "opacity-0 rotate-180 scale-0" : "opacity-100 rotate-0 scale-100"
                    )} 
                  />
                  <X 
                    className={cn(
                      "absolute inset-0 m-auto h-5 w-5 transition-all duration-300 ease-out",
                      isMobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-0"
                    )} 
                  />
                </div>
              </Button>
            </nav>

            {/* Mobile Dropdown Menu - Opens Downward */}
            <div
              id="mobile-menu"
              className={cn(
                "absolute top-full left-0 right-0 mt-2 backdrop-blur-sm transition-opacity duration-500 ease-out will-change-transform will-change-opacity",
                isMobileMenuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4 pointer-events-none"
              )}
            >
              <div className="mx-[20px] rounded-3xl border border-black/70 bg-white/20 p-6 shadow-lg backdrop-blur-md ">
                <div className="flex flex-col items-center space-y-4">
                  {navLinks.map((link, index) => (
                    <Button
                      key={link.id}
                      variant="ghost"
                      onClick={() => handleNavClick(link.id)}
                      className={cn(
                        "w-full justify-center gap-x-2 rounded-lg py-3 text-center text-lg font-medium",
                        activeSection === link.id
                          ? "hero-text"
                          : "text-black",
                        isMobileMenuOpen 
                          ? "translate-y-0 opacity-100" 
                          : "translate-y-4 opacity-0"
                      )}
                      style={{
                        transitionDelay: isMobileMenuOpen ? `${index * 100 + 200}ms` : `${(navLinks.length - index) * 50}ms`
                      }}
                    >
                      {link.title}
                    </Button>
                  ))}
                  
                  {/* CTA Button */}
                  <div 
                    className={cn(
                      "w-full pt-4 border-t border-black/20 mt-2 transition-all duration-300",
                      isMobileMenuOpen 
                        ? "translate-y-0 opacity-100" 
                        : "translate-y-4 opacity-0"
                    )}
                    style={{
                      transitionDelay: isMobileMenuOpen ? `${navLinks.length * 100 + 300}ms` : "0ms"
                    }}
                  >
                    <Button
                      onClick={() => scrollToSection("contact")}
                      className="btn-gradient w-full text-lg py-3 hover:scale-105 transition-transform duration-200"
                    >
                      Start a Project
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Navbar;
