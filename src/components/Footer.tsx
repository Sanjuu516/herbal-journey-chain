import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://res.cloudinary.com/domogztsv/image/upload/v1765220874/WhatsApp_Image_2025-12-09_at_12.36.40_AM_bp8jxt.jpg"
                alt="AyuSethu Logo"
                className="h-12 w-12 rounded-full object-cover"
              />
              <h3 className="font-serif text-2xl font-bold">AyuSethu</h3>
            </div>
            <p className="text-primary-foreground/70 leading-relaxed">
              Blockchain-powered traceability for authentic Ayurvedic formulations from farm to formulation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4 text-gold">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About Us", "How We Work", "Contact", "Login"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4 text-gold">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-gold flex-shrink-0 mt-1" />
                <span className="text-primary-foreground/70 text-sm">
                  123 Ayurveda Street, Haridwar, Uttarakhand, India 249401
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-gold" />
                <span className="text-primary-foreground/70">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-gold" />
                <span className="text-primary-foreground/70">info@ayusethu.com</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4 text-gold">Follow Us</h4>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-gold hover:text-foreground transition-all duration-300"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              &copy; {currentYear} AyuSethu. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-primary-foreground/60 hover:text-gold transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
