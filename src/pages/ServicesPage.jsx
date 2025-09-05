import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const services = [
  {
    name: "Personal Training",
    desc: "One-on-one coaching at its best. Fully customized workout and nutrition plans designed for peak performance.",
    price: "Starts From ₹400/session",
    features: [
      "Custom workout plans",
      "Nutrition guidance",
      "Progress tracking",
      "24/7 support",
      "Visible Results"
    ]
  },
  {
    name: "Online Coaching",
    desc: "Get expert guidance from anywhere. Perfect for busy schedules with flexible training options.",
    price: "Starts From ₹1000/month",
    features: [
      "Weekly check-ins",
      "Custom meal plans",
      "Video form analysis",
      "Personalized Workout",
      "Goal Setting & Reviews"
    ]
  },
  {
    name: "Nutrition Coaching",
    desc: "Transform your relationship with food. Learn sustainable eating habits for long-term success.",
    price: "Starts From ₹700/month",
    features: [
      "Personalized meal plans",
      "Macro calculations",
      "Recipe suggestions",
      "Habit coaching",
      "Sustainable Lifestyle Tips"
    ]
  },
  {
    name: "Group Training",
    desc: "Train with friends and stay motivated together. Small group sessions for maximum attention.",
    price: "Starts From ₹200/session per person",
    features: [
      "Small groups (2-4 people)",
      "Shared motivation",
      "Cost-effective",
      "Fun atmosphere",
      "Faster Results"
    ]
  }
];


const ServicesPage = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Fitness Services | Maaz Momin Personal Training</title>
        <meta name="description" content="Explore our comprehensive fitness services including personal training, online coaching, nutrition guidance, and group sessions." />
      </Helmet>

      <div className="min-h-screen py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16" 
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Choose your Roadmap to Health & Strength</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect training option that fits your lifestyle and goals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card p-8 rounded-lg border hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-bold mb-4">{service.name}</h3>
                <p className="text-muted-foreground mb-6">{service.desc}</p>
                <div className="text-2xl font-bold text-primary mb-6">{service.price}</div>
                
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="text-primary mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button asChild className="w-full">
                  <Link to="/contact">Get Started</Link>
                </Button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-16 bg-primary/5 p-8 rounded-lg"
          >
            <h2 className="text-3xl font-bold mb-4">Not Sure Which Service Is Right for You?</h2>
            <p className="text-muted-foreground mb-6">
              Book a free consultation and we'll discuss your goals to find the perfect fit.
            </p>
            <Button asChild size="lg">
              <Link to="/contact">Book Free Consultation</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ServicesPage;