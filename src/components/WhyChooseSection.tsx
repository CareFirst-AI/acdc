import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Layers, Lightbulb, HandshakeIcon } from "lucide-react";

const reasons = [
  {
    icon: Users,
    title: "Experienced Engineers",
    desc: "Our team of certified instrumentation and control engineers brings deep expertise across multiple industrial sectors.",
  },
  {
    icon: Layers,
    title: "End-to-End Solutions",
    desc: "From initial design and engineering through installation, commissioning, and ongoing maintenance support.",
  },
  {
    icon: Lightbulb,
    title: "Innovation-Driven",
    desc: "We combine cutting-edge technology with creative vision to deliver solutions that perform and inspire.",
  },
  {
    icon: HandshakeIcon,
    title: "Reliable Local Partner",
    desc: "Based in the Philippines with rapid response times, local knowledge, and commitment to lasting partnerships.",
  },
];

const WhyChooseSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding gradient-navy relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-electric/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-energy/5 rounded-full blur-3xl" />

      <div className="container-narrow relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-electric text-sm font-semibold tracking-wider uppercase">
            Why ACDC
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mt-3 mb-4">
            Why Choose ACDC Automation?
          </h2>
          <p className="text-primary-foreground/60 max-w-2xl mx-auto">
            We're more than a contractor — we're your engineering partner for automation solutions that last.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-6 text-center hover:bg-primary-foreground/10 transition-colors"
            >
              <div className="w-14 h-14 rounded-xl gradient-electric flex items-center justify-center mx-auto mb-4">
                <r.icon className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="font-display font-bold text-primary-foreground mb-2">{r.title}</h3>
              <p className="text-primary-foreground/60 text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
