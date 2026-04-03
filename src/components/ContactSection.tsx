import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, AlertCircle } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be under 100 characters"),
  email: z.string().trim().min(1, "Email is required").email("Please enter a valid email").max(255),
  phone: z.string().max(20, "Phone number too long").optional().or(z.literal("")),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be under 200 characters"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be under 2000 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof ContactForm, string>>;

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState<ContactForm>({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactForm, boolean>>>({});

  const validateField = (field: keyof ContactForm, value: string) => {
    const partial = { ...formData, [field]: value };
    const result = contactSchema.safeParse(partial);
    if (!result.success) {
      const fieldError = result.error.issues.find((i) => i.path[0] === field);
      setErrors((prev) => ({ ...prev, [field]: fieldError?.message }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleChange = (field: keyof ContactForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) validateField(field, value);
  };

  const handleBlur = (field: keyof ContactForm) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field] || "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      const allTouched: Partial<Record<keyof ContactForm, boolean>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactForm;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
        allTouched[field] = true;
      });
      setErrors(fieldErrors);
      setTouched(allTouched);
      return;
    }
    const d = result.data;
    const mailtoLink = `mailto:carlo@acdcautomations.com?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(`Name: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone || "N/A"}\n\n${d.message}`)}`;
    window.location.href = mailtoLink;
  };

  const contactInfo = [
    { icon: MapPin, label: "Location", value: "San Pedro, Laguna, Philippines" },
    { icon: Mail, label: "Email", value: "carlo@acdcautomations.com", href: "mailto:carlo@acdcautomations.com" },
    { icon: Phone, label: "Phone", value: "(+632) 995 870 7537", href: "tel:+6329958707537" },
    { icon: Clock, label: "Hours", value: "Mon–Fri 8am–5pm | Sat 10am–5pm" },
  ];

  const inputClass = (field: keyof ContactForm) =>
    `w-full bg-primary-foreground/5 border rounded-lg px-4 py-3 text-primary-foreground text-sm placeholder:text-primary-foreground/30 focus:outline-none focus:ring-2 transition-colors ${
      errors[field] && touched[field]
        ? "border-destructive focus:ring-destructive/50"
        : "border-primary-foreground/15 focus:ring-electric/50"
    }`;

  return (
    <section id="contact" ref={ref} className="section-padding gradient-navy relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-electric/5 rounded-full blur-3xl -translate-x-1/2" />

      <div className="container-narrow relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-electric text-sm font-semibold tracking-wider uppercase">Get in Touch</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mt-3 mb-4">
            Let's Build Something Extraordinary
          </h2>
          <p className="text-primary-foreground/60 max-w-xl mx-auto">
            Ready to discuss your next automation or fountain project? Contact us today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((c) => (
              <div key={c.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center flex-shrink-0">
                  <c.icon className="w-5 h-5 text-electric" />
                </div>
                <div>
                  <div className="text-primary-foreground/50 text-xs uppercase tracking-wider mb-0.5">{c.label}</div>
                  {c.href ? (
                    <a href={c.href} className="text-primary-foreground font-medium text-sm hover:text-electric transition-colors">
                      {c.value}
                    </a>
                  ) : (
                    <div className="text-primary-foreground font-medium text-sm">{c.value}</div>
                  )}
                </div>
              </div>
            ))}
            <div className="rounded-xl overflow-hidden border border-primary-foreground/10 mt-6">
              <iframe
                title="ACDC Automation Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30906.384741273!2d121.04!3d14.36!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d7706e0b7d1d%3A0x28b1290db5cc6523!2sSan%20Pedro%2C%20Laguna%2C%20Philippines!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-3 bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-6 md:p-8 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-primary-foreground/60 text-xs uppercase tracking-wider mb-1.5 block">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  className={inputClass("name")}
                  placeholder="Juan Dela Cruz"
                />
                {errors.name && touched.name && (
                  <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label className="text-primary-foreground/60 text-xs uppercase tracking-wider mb-1.5 block">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  className={inputClass("email")}
                  placeholder="you@email.com"
                />
                {errors.email && touched.email && (
                  <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-primary-foreground/60 text-xs uppercase tracking-wider mb-1.5 block">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                  className={inputClass("phone")}
                  placeholder="+63 XXX XXX XXXX"
                />
                {errors.phone && touched.phone && (
                  <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.phone}
                  </p>
                )}
              </div>
              <div>
                <label className="text-primary-foreground/60 text-xs uppercase tracking-wider mb-1.5 block">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  onBlur={() => handleBlur("subject")}
                  className={inputClass("subject")}
                  placeholder="Project Inquiry"
                />
                {errors.subject && touched.subject && (
                  <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.subject}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="text-primary-foreground/60 text-xs uppercase tracking-wider mb-1.5 block">Message</label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                onBlur={() => handleBlur("message")}
                className={`${inputClass("message")} resize-none`}
                placeholder="Tell us about your project..."
              />
              {errors.message && touched.message && (
                <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full gradient-electric text-accent-foreground font-semibold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              Send Message
              <Send className="w-4 h-4" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
