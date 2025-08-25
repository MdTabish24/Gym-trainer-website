import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import { ArrowRight, Star, Zap, Target, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const fadeIn = (direction = 'up', delay = 0) => ({
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 20 : -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  });

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Maaz Shoaib | Expert Fitness Trainer & Nutritionist</title>
        <meta name="description" content="Transform your body with Maaz Shoaib, expert fitness trainer and nutritionist. Personalized training, nutrition plans, and lifestyle coaching." />
      </Helmet>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.h1
              variants={fadeIn('up', 0.2)}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            >
              Transform Your Body,
              <br />
              Transform Your Life
            </motion.h1>
            
            <motion.p
              variants={fadeIn('up', 0.4)}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
            >
              Expert fitness training and nutrition coaching to help you achieve your dream physique and optimal health.
            </motion.p>

            <motion.div
              variants={fadeIn('up', 0.6)}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/contact">
                  Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link to="/services">
                  View Services
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeIn('up', 0.2)}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Why Choose Me?
            </motion.h2>
            <motion.p
              variants={fadeIn('up', 0.4)}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Personalized approach, proven results, and unwavering support on your fitness journey.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Target className="h-8 w-8" />,
                title: "Personalized Plans",
                description: "Custom workout and nutrition plans tailored to your goals and lifestyle."
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Proven Results",
                description: "Track record of helping clients achieve their fitness goals efficiently."
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Expert Guidance",
                description: "Professional coaching with years of experience in fitness and nutrition."
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: "Ongoing Support",
                description: "Continuous motivation and adjustments to keep you on track."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn('up', 0.2 + index * 0.1)}
                className="text-center p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
              >
                <div className="text-primary mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.h2
              variants={fadeIn('up', 0.2)}
              className="text-4xl md:text-5xl font-bold"
            >
              Ready to Start Your Transformation?
            </motion.h2>
            <motion.p
              variants={fadeIn('up', 0.4)}
              className="text-xl text-muted-foreground"
            >
              Join hundreds of satisfied clients who have achieved their fitness goals with my guidance.
            </motion.p>
            <motion.div variants={fadeIn('up', 0.6)}>
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/contact">
                  Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default HomePage;