import React, { useState } from 'react';
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
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    age: '',
    goal: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const message = `Hi Maaz! I'm interested in your fitness services.\n\nMy Details:\n• Name: ${formData.firstName} ${formData.lastName}\n• Phone: ${formData.phone}\n• Age: ${formData.age}\n• Goal: ${formData.goal}\n• Message: ${formData.message}`;
    
    const whatsappUrl = `https://wa.me/917666987232?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "✅ Redirecting to WhatsApp!",
      description: "Opening WhatsApp with your details filled in.",
    });
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
                    <Input 
                      id="firstName" 
                      name="firstName" 
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      name="lastName" 
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    type="tel" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input 
                      id="age" 
                      name="age" 
                      type="number" 
                      min="16" 
                      max="80"
                      value={formData.age}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="goal">Fitness Goal</Label>
                    <select
                      id="goal"
                      name="goal"
                      value={formData.goal}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary bg-background text-foreground"
                      required
                    >
                      <option value="">Select Goal</option>
                      <option value="muscle">Muscle Building</option>
                      <option value="fat-loss">Fat Loss</option>
                      <option value="maintain">Maintain Weight</option>
                      <option value="stamina">Stamina & Endurance</option>
                      <option value="sports">Sports Training</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Additional Message (Optional)</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Any specific questions or additional information..."
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Contact via WhatsApp
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