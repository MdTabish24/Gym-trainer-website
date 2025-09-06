import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Mail } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Footer = () => {
  const { toast } = useToast();

  const handleSocialClick = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 Feature Not Implemented",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <footer className="bg-card border-t">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Maaz Momin</h3>
            <p className="text-muted-foreground mb-4">
              Expert fitness trainer and nutritionist helping you achieve your dream physique and optimal health.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Instagram className="h-5 w-5" />, label: "Instagram", link: "https://www.instagram.com/maxzlifts?igsh=MThhbXVncnd1anRuNQ%3D%3D&utm_source=qr" },
                { icon: <Twitter className="h-5 w-5" />, label: "Twitter", link: null },
                { icon: <Youtube className="h-5 w-5" />, label: "YouTube", link: null },
                { icon: <Mail className="h-5 w-5" />, label: "Email", link: null }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link || "#"}
                  onClick={social.link ? undefined : handleSocialClick}
                  target={social.link ? "_blank" : undefined}
                  rel={social.link ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'About', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Transformations', path: '/transformations' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {['Personal Training', 'Nutrition Coaching', 'Online Programs', 'Group Classes'].map((service) => (
                <li key={service}>
                  <span className="text-muted-foreground">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2021-2025 Maaz Momin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;