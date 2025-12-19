import React from "react";
import { motion } from "framer-motion";
import { Link2, ShieldCheck, Stethoscope } from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Track Your Medicine",
    description: "End-to-end traceability from source to shelf.",
    color: "from-primary to-teal-light",
    bgColor: "bg-primary/10",
  },
  {
    icon: ShieldCheck,
    title: "Blockchain Proof",
    description: "Tamper-proof authenticity you can trust.",
    color: "from-sky to-primary",
    bgColor: "bg-sky/10",
  },
  {
    icon: Stethoscope,
    title: "Doctor Analysis",
    description: "Personalized safety checks & insights.",
    color: "from-gold to-warning",
    bgColor: "bg-gold/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const FeatureHighlights: React.FC = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose AyuSethu?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete healthcare ecosystem powered by blockchain technology 
            and personalized AI analysis.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="medical-card h-full hover-lift cursor-pointer">
                <div className={`w-16 h-16 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                <div className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r ${feature.color} rounded-full transition-all duration-500`} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
