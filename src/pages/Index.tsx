import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowWeWorkSection />
      <AboutSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
