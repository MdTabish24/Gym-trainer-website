import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { Award, HeartPulse, BookOpen, Check } from 'lucide-react';

const AboutPage = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>About Maaz Shoaib | Expert Fitness Trainer</title>
        <meta name="description" content="Learn about Maaz Shoaib's journey as a fitness trainer and nutritionist. Discover his expertise and passion for helping others achieve their fitness goals." />
      </Helmet>

      <div className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Maaz</h1>
            <p className="text-xl text-muted-foreground">
              Passionate fitness trainer dedicated to transforming lives through health and wellness
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">My Journey</h2>
              <p className="text-muted-foreground mb-4">
                With over 5 years of experience in the fitness industry, I've dedicated my life to helping people achieve their health and fitness goals. My journey began with my own transformation, which sparked a passion for fitness that I now share with others.
              </p>
              <p className="text-muted-foreground mb-4">
                I believe that fitness is not just about physical transformation—it's about building confidence, discipline, and a healthier lifestyle that extends beyond the gym.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card p-8 rounded-lg border"
            >
              <h3 className="text-2xl font-semibold mb-6">Certifications & Expertise</h3>
              <div className="space-y-4">
                {[
                  { icon: <Award className="h-5 w-5" />, text: "Certified Personal Trainer" },
                  { icon: <HeartPulse className="h-5 w-5" />, text: "Nutrition Specialist" },
                  { icon: <BookOpen className="h-5 w-5" />, text: "Sports Science Degree" },
                  { icon: <Check className="h-5 w-5" />, text: "5+ Years Experience" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="text-primary">{item.icon}</div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center bg-primary/5 p-8 rounded-lg"
          >
            <h3 className="text-2xl font-bold mb-4">My Mission</h3>
            <p className="text-lg text-muted-foreground">
              To empower individuals to take control of their health and fitness journey through personalized training, 
              expert nutrition guidance, and unwavering support. Together, we'll build not just a stronger body, 
              but a more confident and healthier you.
            </p>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AboutPage;