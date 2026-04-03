import { motion, useInView } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const AnimatedCounter = ({ value, suffix = "", inView }: { value: number; suffix?: string; inView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <>{count}{suffix}</>;
};

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster=""
          className="w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy/90 to-navy-deep/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-navy-deep/30" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-electric/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-energy/5 rounded-full blur-3xl" />

      <div className="relative container-narrow section-padding pt-32 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-electric/30 bg-electric/10 mb-6">
            <Play className="w-3 h-3 text-electric fill-electric" />
            <span className="text-electric text-xs font-semibold tracking-wider uppercase">
              Systems Integration Experts
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6">
            Engineering Excellence in{" "}
            <span className="text-gradient-electric">Industrial Automation</span>{" "}
            & Spectacular{" "}
            <span className="text-gradient-electric">Water Features</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mb-10 leading-relaxed font-body">
            Systems Integration • PLC • SCADA • HMI • Fountain Automation
            <br />
            <span className="text-primary-foreground/50">San Pedro, Laguna, Philippines</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollTo("#services")}
              className="gradient-electric text-accent-foreground font-semibold px-8 py-4 rounded-xl text-base flex items-center justify-center gap-2 hover:opacity-90 transition-opacity animate-pulse-glow"
            >
              Explore Industrial Solutions
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollTo("#projects")}
              className="border border-primary-foreground/20 text-primary-foreground font-semibold px-8 py-4 rounded-xl text-base flex items-center justify-center gap-2 hover:bg-primary-foreground/5 transition-colors"
            >
              See Our Fountain Projects
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Stats bar with animated counters */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {[
            { value: 15, suffix: "+", label: "Years Experience" },
            { value: 200, suffix: "+", label: "Projects Completed" },
            { value: 50, suffix: "+", label: "Industrial Clients" },
            { value: 24, suffix: "/7", label: "Technical Support" },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="font-display text-3xl md:text-4xl font-bold text-electric mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={statsInView} />
              </div>
              <div className="text-primary-foreground/50 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
