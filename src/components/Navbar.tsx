import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import MaxWidthWrapper from "./ui/MaxWidthWrapper";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();

  const isCaseStudyPage = location.pathname.startsWith("/portfolio");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled || isMobileMenuOpen || isCaseStudyPage
          ? "bg-transparent"
          : "bg-transparent"
      }`}
    >
      <MaxWidthWrapper className="h-24 flex items-center justify-between">
        {/* --- Desktop Header --- */}
        <div className="hidden md:flex w-full items-center justify-between px-10">
          {/* Logo */}
          <div className="flex-1 flex justify-start">
            <a href="/" aria-label="ViBE Creative Home">
              <img
                src="/vibe_lgo.png"
                alt="VBE Design Logo"
                className="h-8 w-auto"
              />
            </a>
          </div>

          {/* Desktop Nav Island */}
          <nav className="rounded-full  bg-background/50 shadow-lg backdrop-blur-lg">
            <div className="flex items-center gap-x-2 px-2 py-2">
              {navLinks.map((link) => (
                <Button
                  key={link.id}
                  variant="ghost"
                  onClick={() => scrollToSection(link.id)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ease-in-out hover:text-primary",
                    activeSection === link.id
                      ? "bg-primary/10 text-primary"
                      : "text-white/70"
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
              className="bg-background/50 shadow-lg backdrop-blur-lg rounded-xl border border-white"
            >
              <p className="hero-text font-regular  ">Start a Project</p>
            </Button>
          </div>
        </div>

        {/* --- Mobile Header --- */}
        <div className="md:hidden w-full p-2">
          <div className="relative">
            {/* Mobile Nav Island */}
            <nav className="mx-[20px] flex items-center justify-between rounded-full  bg-background/70 p-2 shadow-lg backdrop-blur-md">
              <a href="/" aria-label="ViBE Creative Home">
                <img
                  src="/vibe_lgo.png"
                  alt="VBE Design Logo"
                  className="h-7 w-auto"
                />
              </a>
              <Button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                variant="ghost"
                size="icon"
                className="bg-transparent"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </nav>

            {/* Mobile Dropdown Menu */}
            <div
              id="mobile-menu"
              className={cn(
                "absolute top-full left-0 right-0 mt-2 transition-all duration-300 ease-in-out",
                isMobileMenuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4 pointer-events-none"
              )}
            >
              <div className="mx-auto max-w-[95%] rounded-2xl border border-white/30 bg-background/95 p-4 shadow-lg backdrop-blur-lg">
                <div className="flex flex-col items-center space-y-2">
                  {navLinks.map((link) => (
                    <Button
                      key={link.id}
                      variant="ghost"
                      onClick={() => scrollToSection(link.id)}
                      className={cn(
                        "w-full justify-center gap-x-2 rounded-lg py-3 text-center text-lg font-medium transition-colors hover:bg-primary/10 hover:text-primary",
                        activeSection === link.id
                          ? "bg-primary/10 text-primary"
                          : "text-white/80"
                      )}
                    >
                      {link.title}
                    </Button>
                  ))}
                  <div className="w-full pt-4 border-t border-border/20 mt-2">
                    <Button
                      onClick={() => scrollToSection("contact")}
                      className="btn-gradient w-full text-lg"
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
