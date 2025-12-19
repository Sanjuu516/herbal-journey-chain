import { motion } from "framer-motion";
import { MapPin, Cog, User } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "QR Code Product",
    subtitle: "Verification",
    variant: "default" as const,
  },
  {
    icon: Cog,
    title: "End-to-End",
    subtitle: "Traceability Viewer",
    variant: "dark" as const,
  },
  {
    icon: User,
    title: "Multi-Language",
    subtitle: "Support",
    variant: "accent" as const,
  },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background Images Slider */}
      <div className="absolute inset-0 z-0">
        <div className="relative h-full w-full">
          <img
            src="https://www.ayurorganic.com.au/cdn/shop/files/Ayurvedic_and_Organic_SIngle_and_Blended_Herbs_1.webp?v=1749389990&width=1500"
            alt="Ayurvedic Herbs"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/50 to-transparent" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-primary-foreground"
        >
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-4">
            Track Every Herb
          </h1>
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-gold mb-6">
            From Farm to Formulation
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-lg">
            Blockchain-powered traceability for authentic Ayurvedic formulations
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gold text-foreground px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            Get Started
          </motion.button>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bottom-8 left-4 right-4 md:left-auto md:right-8 md:bottom-12"
        >
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`flex items-center gap-4 p-4 md:p-5 rounded-xl backdrop-blur-sm ${
                  feature.variant === "dark"
                    ? "bg-foreground/90 text-background"
                    : feature.variant === "accent"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background/90 text-foreground"
                }`}
              >
                <feature.icon size={36} className={feature.variant === "accent" ? "text-gold" : "text-primary"} />
                <div>
                  <h3 className="font-semibold text-sm md:text-base">{feature.title}</h3>
                  <p className="text-xs md:text-sm opacity-80">{feature.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
