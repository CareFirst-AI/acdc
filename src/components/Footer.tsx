import { Zap } from "lucide-react";

const Footer = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-navy-deep border-t border-primary-foreground/5">
      <div className="container-narrow section-padding !py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-electric flex items-center justify-center">
              <Zap className="w-4 h-4 text-accent-foreground" />
            </div>
            <span className="font-display font-bold text-primary-foreground">
              ACDC <span className="text-electric">Automation</span>
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {["Home", "About", "Services", "Projects", "Contact"].map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(`#${l.toLowerCase()}`)}
                className="text-primary-foreground/50 hover:text-electric text-sm transition-colors"
              >
                {l}
              </button>
            ))}
          </div>

          <p className="text-primary-foreground/30 text-xs">
            © {new Date().getFullYear()} ACDC Automation Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
