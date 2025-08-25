import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "✅ Message Sent!",
      description: "Thanks for reaching out! I'll get back to you shortly.",
    });
    e.target.reset();
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Contact Maaz Shoaib | Get Started Today</title>
        <meta name="description" content="Ready to start your fitness journey? Contact Maaz Shoaib for personalized training and nutrition coaching." />
      </Helmet>

      <div className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl text-muted-foreground">
              Ready to start your transformation? Let's discuss your fitness goals!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6">Let's Start Your Journey</h2>
              <p className="text-muted-foreground mb-8">
                Whether you're looking to lose weight, build muscle, or improve your overall health, 
                I'm here to help you achieve your goals with personalized training and nutrition plans.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">What to Expect:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Free initial consultation</li>
                    <li>• Personalized fitness assessment</li>
                    <li>• Custom workout and nutrition plan</li>
                    <li>• Ongoing support and motivation</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-lg border">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" />
                </div>

                <div>
                  <Label htmlFor="goals">Fitness Goals</Label>
                  <Textarea 
                    id="goals" 
                    name="goals" 
                    placeholder="Tell me about your fitness goals and what you'd like to achieve..."
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ContactPage;