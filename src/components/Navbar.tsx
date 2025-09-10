import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import MaxWidthWrapper from "./ui/MaxWidthWrapper";

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

  const leftLinks = navLinks.slice(0, 2);
  const rightLinks = navLinks.slice(2);

  return (
    <nav
      role="navigation"
      aria-label="Main"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled || isMobileMenuOpen || isCaseStudyPage
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-md h-16"
          : "bg-transparent h-20"
      }`}
    >
      <MaxWidthWrapper className="flex items-center justify-between h-full">
        {/* Left Navigation */}
        <div className="hidden md:flex items-center gap-1 px-10">
          {leftLinks.map((link) => (
            <Button
              key={link.id}
              variant="ghost"
              onClick={() => scrollToSection(link.id)}
              className="text-white font-thin hover:bg-transparent hover:hero-text px-4 relative"
              aria-current={activeSection === link.id ? "page" : undefined}
            >
              {link.title}
            </Button>
          ))}
        </div>

        {/* Centered Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <a href="/" aria-label="ViBE Creative Home">
            <img
              src="/vibe_lgo.png"
              alt="VBE Design"
              className={`h-10 w-auto transition-all duration-300 ${
                isScrolled || isCaseStudyPage ? "scale-90" : ""
              }`}
            />
          </a>
        </div>

        {/* Right Navigation */}
        <div className="hidden md:flex items-center gap-1 px-10">
          {rightLinks.map((link) => (
            <Button
              key={link.id}
              variant="ghost"
              onClick={() => scrollToSection(link.id)}
              className="text-white font-thin hover:bg-transparent hover:hero-text px-4 relative"
              aria-current={activeSection === link.id ? "page" : undefined}
            >
              {link.title}
            </Button>
          ))}
          <Button
            onClick={() => scrollToSection("contact")}
            className="ml-4 btn-gradient font-thin text-black"
          >
            Start a Project
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="hover:text-white hover:bg-transparent"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <X className="h-10 w-10" />
            ) : (
              <Menu className="h-10 w-10" />
            )}
          </Button>
        </div>
      </MaxWidthWrapper>

      {/* Mobile Navigation Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-lg transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-[120%] invisible"
        }`}
      >
        <div className="flex flex-col space-y-2 p-6">
          {navLinks.map((link) => (
            <Button
              key={link.id}
              variant="ghost"
              onClick={() => scrollToSection(link.id)}
              className="text-white justify-start text-lg font-thin py-3 hover:bg-transparent active:bg-transparent"
            >
              {link.title}
            </Button>
          ))}
          <div className="mt-2 border-t border-border/20 pt-4">
            <Button
              onClick={() => scrollToSection("contact")}
              className="btn-gradient w-full py-3 text-lg"
            >
              Free Discovery Call
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
