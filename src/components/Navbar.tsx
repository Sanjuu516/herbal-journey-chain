import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ["About", "How We Work", "Contact"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-3">
            <img
              src="https://res.cloudinary.com/dmolvlt7e/image/upload/v1766070051/Gemini_Generated_Image_ysxwkbysxwkbysxw-removebg-preview_jezctz.png"
              alt="AyuSethu Logo"
              className="h-10 md:h-12 w-auto"
            />
            <span className="font-serif text-xl md:text-2xl font-semibold text-primary">
              AyuSethu
            </span>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-foreground/80 hover:text-primary font-medium transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item}
                </a>
              </li>
            ))}
            <li>
              <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium hover:bg-forest-light transition-colors duration-200">
                Login
              </button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <ul className="py-4 space-y-4">
                {navItems.map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="block text-foreground/80 hover:text-primary font-medium transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
                <li>
                  <button className="w-full bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium">
                    Login
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
