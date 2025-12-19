import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-5xl font-bold text-center text-foreground mb-16"
        >
          Motive Of <span className="text-primary">AyuSethu</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-gold/20 rounded-3xl blur-xl" />
            <img
              src="https://res.cloudinary.com/dmolvlt7e/image/upload/v1766033128/WhatsApp_Image_2025-12-09_at_08.28.38-removebg-preview_vtrebu.png"
              alt="Ayurvedic Herbs"
              className="relative w-full max-w-md mx-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              <span className="text-primary font-semibold">AYU SETHU</span> brings 
              transparency and trust to the Ayurvedic herbal supply chain by securely 
              recording every stage of a herb's journey—from cultivation and procurement 
              to lab testing and manufacturing—using blockchain and geo-tagging.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              By scanning a QR code, consumers can instantly verify origin, quality, 
              lab reports, and sustainability compliance, ensuring that every Ayurvedic 
              product is <span className="text-gold font-semibold">pure</span>, 
              <span className="text-gold font-semibold"> authentic</span>, and 
              <span className="text-gold font-semibold"> responsibly sourced</span>.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-forest-light transition-colors"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
