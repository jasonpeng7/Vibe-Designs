import { Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-secondary/20 py-12 px-2">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand Identity */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <img src="/vibe.png" alt="ViBE Design" className="w-22 h-10" />
              <span className="text-2xl font-bold">ViBE Design</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Establish your online presence today.
            </p>
          </div>

          {/* Contact & Legal */}
          <div className="text-center md:text-right space-y-4">
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
            <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground md:flex-row md:justify-end md:gap-4">
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
    </footer>
  );
};

export default Footer;
