import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Award, MapPin, Wrench } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="section-padding bg-surface">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          <div>
            <span className="text-electric text-sm font-semibold tracking-wider uppercase">
              About ACDC Automation
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
              Your Trusted Partner in Automation & Water Feature Engineering
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              ACDC Automation Services is a specialized systems integrator based in San Pedro, Laguna, Philippines. 
              With a team of highly trained instrumentation and control engineers, we deliver total solutions in 
              industrial process control and fountain automation.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              From sugar cane processing plants and power generation facilities to spectacular musical fountains 
              in commercial plazas, we bring engineering precision and creative innovation to every project. 
              As an authorized distributor of Bonfiglioli gear motors and reducers, we provide world-class 
              components backed by expert installation and support.
            </p>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-lg gradient-energy flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <div className="font-display font-semibold text-foreground">Authorized Bonfiglioli Distributor</div>
                <div className="text-muted-foreground text-sm">Premium gear motors & reducers</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Shield, title: "Certified Engineers", desc: "Highly trained I&C professionals" },
              { icon: Wrench, title: "End-to-End Solutions", desc: "Design through commissioning" },
              { icon: Award, title: "Proven Track Record", desc: "200+ successful installations" },
              { icon: MapPin, title: "Philippine Based", desc: "San Pedro, Laguna" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="glass-card rounded-xl p-6 text-center hover:scale-[1.02] transition-transform"
              >
                <div className="w-12 h-12 rounded-lg gradient-electric flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <div className="font-display font-semibold text-foreground text-sm mb-1">{item.title}</div>
                <div className="text-muted-foreground text-xs">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
