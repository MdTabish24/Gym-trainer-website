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
        <title>Maaz Momin | Expert Fitness Trainer & Nutritionist</title>
        <meta name="description" content="Transform your body with Maaz Momin, expert fitness trainer and nutritionist. Personalized training, nutrition plans, and lifestyle coaching." />
      </Helmet>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-4">
        {/* Background Image with Dark Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://i.pinimg.com/originals/7e/79/cf/7e79cf22847356c20b64aabe21d8ee3c.jpg)'
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
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
                  Unleash Your Strength <ArrowRight className="ml-2 h-5 w-5" />
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

      {/* Hybrid Transformation + 3D Glassmorphic Section */}
      <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Animated particles background */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeIn('up', 0.2)}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent"
            >
              Your Fitness, Our Priority
            </motion.h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Transformation Carousel */}
            <motion.div
              variants={fadeIn('left', 0.3)}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Real Transformations</h3>
                
                {/* Before/After Slider */}
                <div className="relative h-80 rounded-2xl overflow-hidden mb-6 group cursor-grab active:cursor-grabbing select-none">
                  {/* Before Image */}
                  <div className="absolute inset-0">
                    <img 
                      src="https://mdtabish24.github.io/Gym-trainer-website/beforeimg.jpg" 
                      alt="Before transformation"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-red-500/80 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-sm font-semibold">BEFORE</span>
                    </div>
                  </div>
                  
                  {/* After Image with slider */}
                  <div 
                    className="absolute inset-0"
                    style={{ clipPath: 'inset(0 50% 0 0)' }}
                    id="afterImage"
                  >
                    <img 
                      src="https://mdtabish24.github.io/Gym-trainer-website/afterimg.jpg" 
                      alt="After transformation"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 right-4 bg-green-500/80 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-sm font-semibold">AFTER</span>
                    </div>
                  </div>
                  
                  {/* Interactive Overlay */}
                  <div 
                    className="absolute inset-0 z-10"
                    onMouseDown={(e) => {
                      const container = e.currentTarget.parentElement;
                      const afterImg = container.querySelector('#afterImage');
                      const rect = container.getBoundingClientRect();
                      
                      const updateSlider = (clientX) => {
                        const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
                        afterImg.style.clipPath = `inset(0 ${100-x}% 0 0)`;
                      };
                      
                      const handleMouseMove = (e) => updateSlider(e.clientX);
                      const handleTouchMove = (e) => updateSlider(e.touches[0].clientX);
                      
                      const cleanup = () => {
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', cleanup);
                        document.removeEventListener('touchmove', handleTouchMove);
                        document.removeEventListener('touchend', cleanup);
                      };
                      
                      document.addEventListener('mousemove', handleMouseMove);
                      document.addEventListener('mouseup', cleanup);
                      document.addEventListener('touchmove', handleTouchMove);
                      document.addEventListener('touchend', cleanup);
                      
                      updateSlider(e.clientX);
                    }}
                    onTouchStart={(e) => {
                      const container = e.currentTarget.parentElement;
                      const afterImg = container.querySelector('#afterImage');
                      const rect = container.getBoundingClientRect();
                      
                      const updateSlider = (clientX) => {
                        const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
                        afterImg.style.clipPath = `inset(0 ${100-x}% 0 0)`;
                      };
                      
                      updateSlider(e.touches[0].clientX);
                    }}
                  >
                  </div>
                  
                  {/* Slider Handle */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-full bg-white/80 pointer-events-none z-20">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 z-20">
                    <span className="text-white text-sm">Drag to compare</span>
                  </div>
                </div>
                
                {/* Stats Badges */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Success Rate", value: "95%", color: "from-red-400 to-pink-400" },
                    { label: "Years Experience", value: "4+", color: "from-yellow-400 to-orange-400" }
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className={`bg-gradient-to-r ${stat.color} p-0.5 rounded-xl mb-2`}>
                        <div className="bg-black/80 rounded-xl px-3 py-2">
                          <div className="text-2xl font-bold text-white">{stat.value}</div>
                        </div>
                      </div>
                      <div className="text-gray-300 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Side - 3D Floating Panels */}
            <motion.div
              variants={fadeIn('right', 0.3)}
              className="grid grid-cols-2 gap-6"
            >
              {[
                {
                  icon: <Target className="h-8 w-8" />,
                  title: "Personalized Plans",
                  description: "Custom workout and nutrition plans",
                  gradient: "from-orange-400 to-red-400",
                  delay: 0.1
                },
                {
                  icon: <Zap className="h-8 w-8" />,
                  title: "Proven Results",
                  description: "Track record of success",
                  gradient: "from-red-400 to-pink-400",
                  delay: 0.2
                },
                {
                  icon: <Users className="h-8 w-8" />,
                  title: "Expert Guidance",
                  description: "Professional coaching",
                  gradient: "from-yellow-400 to-orange-400",
                  delay: 0.3
                },
                {
                  icon: <Star className="h-8 w-8" />,
                  title: "Ongoing Support",
                  description: "Continuous motivation",
                  gradient: "from-pink-400 to-red-400",
                  delay: 0.4
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn('up', feature.delay)}
                  whileHover={{ 
                    scale: 1.05,
                    rotateX: 5,
                    rotateY: 5,
                    z: 50
                  }}
                  className="group relative p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-500 cursor-pointer transform-gpu perspective-1000"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Neon glow effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`}></div>
                  
                  {/* Icon with glow */}
                  <div className={`relative mb-4 w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} p-0.5 group-hover:shadow-lg group-hover:shadow-current transition-all duration-500`}>
                    <div className="w-full h-full rounded-xl bg-black/80 flex items-center justify-center text-white group-hover:text-white transition-colors">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors">{feature.title}</h3>
                  <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{feature.description}</p>
                  
                  {/* 3D depth effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
              ))}
            </motion.div>
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