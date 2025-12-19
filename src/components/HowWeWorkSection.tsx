import { motion } from "framer-motion";
import { MapPin, Cog, FlaskConical, Factory, Package, User } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "Farmer",
    text: "Geo-tagged harvesting with real-time capture of origin, species, and quality.",
  },
  {
    icon: Cog,
    title: "Collector",
    text: "Centralized aggregation ensuring proper documentation and authenticated handover.",
  },
  {
    icon: FlaskConical,
    title: "Tester",
    text: "Laboratory validation of moisture, pesticides, DNA authentication, and purity.",
  },
  {
    icon: Factory,
    title: "Processing",
    text: "Processed in certified facilities with complete traceability maintained.",
  },
  {
    icon: Package,
    title: "Manufacturer",
    text: "Processing, formulation, packaging, and final QR tagging powered by blockchain.",
  },
  {
    icon: User,
    title: "Consumer",
    text: "Complete traceability access—origin, purity tests, sustainability, and batch details.",
  },
];

const HowWeWorkSection = () => {
  return (
    <section id="how-we-work" className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            How We Work
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ensuring transparency, purity, and trust at every stage of the journey.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center mb-4 shadow-lg relative z-10"
                >
                  <step.icon size={28} className="text-primary-foreground" />
                </motion.div>
                <h3 className="font-serif font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
