import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award } from "lucide-react";

const PartnersSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-surface-alt">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-electric text-sm font-semibold tracking-wider uppercase">
            Our Partners
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">
            Trusted Partnerships
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto glass-card rounded-2xl p-8 md:p-12 text-center"
        >
          <div className="w-20 h-20 rounded-2xl gradient-energy flex items-center justify-center mx-auto mb-6">
            <Award className="w-10 h-10 text-accent-foreground" />
          </div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-2">Bonfiglioli</h3>
          <p className="text-electric font-semibold text-sm mb-4">Authorized Distributor</p>
          <p className="text-muted-foreground leading-relaxed">
            As an authorized distributor of Bonfiglioli, we supply premium gear motors, gear reducers, 
            and drive systems. Backed by our technical expertise, we ensure the right solution is specified, 
            installed, and supported for your application.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
