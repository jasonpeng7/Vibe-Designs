import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    }
    // Close mobile menu after clicking
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (sectionId: string) => {
    // Update URL for SEO
    window.history.pushState(null, "", `/#${sectionId}`);
    scrollToSection(sectionId);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/">
              <img
                src="/vibe_lgo.png"
                alt="VBE Design"
                className="h-10 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Button
              variant="ghost"
              onClick={() => handleNavClick("services")}
              className="text-white focus:outline-none focus:ring-0"
            >
              Services
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleNavClick("portfolio")}
              className="text-white focus:outline-none focus:ring-0"
            >
              Portfolio
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleNavClick("pricing")}
              className="text-white focus:outline-none focus:ring-0"
            >
              Pricing
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleNavClick("team")}
              className="text-white focus:outline-none focus:ring-0"
            >
              Team
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleNavClick("contact")}
              className="text-white focus:outline-none focus:ring-0"
            >
              Contact
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none focus:ring-0"
            >
              {isMobileMenuOpen ? (
                <X className="h-8 w-8" />
              ) : (
                <Menu className="h-8 w-8" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-2 pt-4">
              <Button
                variant="ghost"
                onClick={() => handleNavClick("services")}
                className="text-white justify-start focus:outline-none focus:ring-0"
              >
                Services
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleNavClick("portfolio")}
                className="text-white justify-start focus:outline-none focus:ring-0"
              >
                Portfolio
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleNavClick("pricing")}
                className="text-white justify-start focus:outline-none focus:ring-0"
              >
                Pricing
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleNavClick("team")}
                className="text-white justify-start focus:outline-none focus:ring-0"
              >
                Team
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleNavClick("contact")}
                className="text-white justify-start focus:outline-none focus:ring-0"
              >
                Contact
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
