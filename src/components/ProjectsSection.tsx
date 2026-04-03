import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";

import projectPlc from "@/assets/project-plc.jpg";
import projectScada from "@/assets/project-scada.jpg";
import projectCascade from "@/assets/project-cascade.jpg";
import projectDancing from "@/assets/project-dancing.jpg";
import projectElectrical from "@/assets/project-electrical.jpg";
import projectLake from "@/assets/project-lake.jpg";

const projects = [
  { src: projectPlc, title: "PLC Control Panel", category: "Industrial", span: "col-span-1" },
  { src: projectDancing, title: "Dancing Fountain", category: "Water Feature", span: "col-span-1 md:col-span-2 md:row-span-2" },
  { src: projectScada, title: "SCADA Monitoring", category: "Industrial", span: "col-span-1" },
  { src: projectCascade, title: "Cascade Fountain", category: "Water Feature", span: "col-span-1" },
  { src: projectElectrical, title: "Electrical Installation", category: "Industrial", span: "col-span-1" },
  { src: projectLake, title: "Lake Fountain", category: "Water Feature", span: "col-span-1" },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="projects" ref={ref} className="section-padding bg-surface">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-electric text-sm font-semibold tracking-wider uppercase">
            Our Work
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From industrial control systems to spectacular water features — explore our portfolio of engineering excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className={`${p.span} relative group cursor-pointer rounded-xl overflow-hidden`}
              onClick={() => setLightbox(i)}
            >
              <img
                src={p.src}
                alt={p.title}
                loading="lazy"
                width={800}
                height={800}
                className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6">
                <div>
                  <span className="text-electric text-xs font-semibold uppercase tracking-wider">{p.category}</span>
                  <h3 className="font-display font-bold text-primary-foreground text-sm md:text-lg">{p.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-navy-deep/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground"
            onClick={() => setLightbox(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={projects[lightbox].src}
            alt={projects[lightbox].title}
            className="max-w-full max-h-[85vh] rounded-xl object-contain"
          />
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
