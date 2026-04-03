import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Cpu,
  Monitor,
  Zap,
  Settings,
  GraduationCap,
  Factory,
  Droplets,
  TreePine,
  Music,
  Waves,
  Wrench,
  Sparkles,
} from "lucide-react";

const industrialServices = [
  { icon: Cpu, title: "PLC Programming", desc: "Testing & commissioning of programmable logic controllers" },
  { icon: Monitor, title: "HMI / SCADA", desc: "Programming, networking & system integration" },
  { icon: Zap, title: "Electrical Design", desc: "Complete electrical design & installation" },
  { icon: Settings, title: "Troubleshooting", desc: "Maintenance, documentation & support" },
  { icon: GraduationCap, title: "Training", desc: "Basic & advanced automation courses" },
  { icon: Factory, title: "Industries", desc: "Sugar, Power, F&B, Wastewater" },
];

const fountainServices = [
  { icon: Droplets, title: "Fountain Design", desc: "Civil construction & engineering design" },
  { icon: TreePine, title: "Landscaping", desc: "Integrated landscape architecture" },
  { icon: Sparkles, title: "Sequence Programming", desc: "Water & lighting choreography" },
  { icon: Music, title: "Musical Systems", desc: "Dancing & musical fountain automation" },
  { icon: Wrench, title: "Rehabilitation", desc: "Repair & restoration of existing fountains" },
  { icon: Waves, title: "Fountain Types", desc: "Static, Dancing, Cascade, Musical, Lake" },
];

const ServiceCard = ({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
}) => (
  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-card/50 transition-colors group">
    <div className="w-9 h-9 rounded-lg bg-electric/10 flex items-center justify-center flex-shrink-0 group-hover:bg-electric/20 transition-colors">
      <Icon className="w-4 h-4 text-electric" />
    </div>
    <div>
      <div className="font-display font-semibold text-sm text-foreground">{title}</div>
      <div className="text-muted-foreground text-xs mt-0.5">{desc}</div>
    </div>
  </div>
);

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" ref={ref} className="section-padding bg-surface-alt">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-electric text-sm font-semibold tracking-wider uppercase">
            Our Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Two Divisions, One Commitment to Excellence
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From industrial process control to breathtaking water features, we deliver engineering solutions
            that combine precision, reliability, and innovation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Industrial Automation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-2xl p-6 md:p-8 border-t-4 border-t-electric"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-electric flex items-center justify-center">
                <Cpu className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">Industrial Automation</h3>
                <p className="text-muted-foreground text-sm">Process Control & Systems Integration</p>
              </div>
            </div>
            <div className="space-y-1">
              {industrialServices.map((s) => (
                <ServiceCard key={s.title} {...s} />
              ))}
            </div>
          </motion.div>

          {/* Fountain Automation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card rounded-2xl p-6 md:p-8 border-t-4 border-t-energy water-ripple"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-energy flex items-center justify-center">
                <Droplets className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">Water Features & Fountains</h3>
                <p className="text-muted-foreground text-sm">Design, Construction & Automation</p>
              </div>
            </div>
            <div className="space-y-1">
              {fountainServices.map((s) => (
                <ServiceCard key={s.title} {...s} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
