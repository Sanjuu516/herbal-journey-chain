import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import testimonialBg from "@/assets/ayurveda-testimonial-bg.jpg";

const testimonialsData = [
  {
    name: "Dr. Meera Rao",
    role: "Ayurveda Practitioner",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
    quote: "AyuSethu transformed my daily wellness routine. The natural formulations exceeded my expectations. Highly recommended!",
  },
  {
    name: "Rahul Sharma",
    role: "Wellness Blogger",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
    quote: "The best holistic products I've used. The commitment to authenticity really shows in every bottle.",
  },
  {
    name: "Anjali Verma",
    role: "Yoga Instructor",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    quote: "Clean ingredients, genuine benefits, and a beautiful brand story. AyuSethu has become a staple in my lifestyle.",
  },
  {
    name: "Dr. Arvind Patel",
    role: "Herbal Researcher",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    quote: "The transparency in sourcing through blockchain technology sets AyuSethu apart in the Ayurvedic industry.",
  },
  {
    name: "Priya Desai",
    role: "Nutritionist",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
    quote: "My clients love knowing exactly where their supplements come from. The traceability feature is revolutionary.",
  },
];

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonialsData.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen py-20 md:py-32"
      style={{
        backgroundImage: `url(${testimonialBg})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-foreground/60" />

      {/* Content that scrolls over the fixed background */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Hear from people who have trusted AyuSethu for their wellness journey.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-center justify-center gap-4 md:gap-8">
            {/* Previous Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
            >
              <ChevronLeft size={24} />
            </motion.button>

            {/* Testimonial Card */}
            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card rounded-2xl p-8 md:p-12 text-center"
                >
                  <Quote className="w-12 h-12 text-primary mx-auto mb-6" />
                  <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed mb-8 font-serif italic">
                    "{testimonialsData[currentTestimonial].quote}"
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={testimonialsData[currentTestimonial].image}
                      alt={testimonialsData[currentTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-primary/20"
                    />
                    <div className="text-left">
                      <h4 className="font-semibold text-foreground text-lg">
                        {testimonialsData[currentTestimonial].name}
                      </h4>
                      <p className="text-muted-foreground">
                        {testimonialsData[currentTestimonial].role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-gold w-8"
                    : "bg-primary-foreground/40 hover:bg-primary-foreground/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
