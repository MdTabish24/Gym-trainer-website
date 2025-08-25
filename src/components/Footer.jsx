import React from 'react';
import { motion } from 'framer-motion';
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
            <h3 className="text-2xl font-bold mb-4">Maaz Shoaib</h3>
            <p className="text-muted-foreground mb-4">
              Expert fitness trainer and nutritionist helping you achieve your dream physique and optimal health.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
                { icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
                { icon: <Youtube className="h-5 w-5" />, label: "YouTube" },
                { icon: <Mail className="h-5 w-5" />, label: "Email" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  onClick={handleSocialClick}
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
              {['About', 'Services', 'Transformations', 'Blog', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`/${link.toLowerCase()}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
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
          <p>&copy; 2024 Maaz Shoaib. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;