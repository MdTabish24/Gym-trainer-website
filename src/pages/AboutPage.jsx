import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '@/components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, HeartPulse, BookOpen, Check, X } from 'lucide-react';

const AboutPage = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <PageTransition>
      <Helmet>
        <title>About Maaz Momin | Expert Fitness Trainer</title>
        <meta name="description" content="Learn about Maaz Momin's journey as a fitness trainer and nutritionist. Discover his expertise and passion for helping others achieve their fitness goals." />
      </Helmet>

      <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
              Meet Maaz Shoaib
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transforming lives through science-backed fitness and nutrition expertise
            </p>
          </motion.div>

          {/* Main Content Grid hii*/}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-1 relative"
            >
              <div className="sticky top-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                {/* Profile Image */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-orange-400 to-red-400 p-1">
                    <img
                      src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face"
                      alt="Maaz Shoaib"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Maaz Momin</h2>
                  <p className="text-orange-400 font-semibold">Certified Fitness Expert</p>
                  <p className="text-gray-300 text-sm mt-2">8+ Years Experience</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-white/10 rounded-xl">
                    <div className="text-2xl font-bold text-orange-400">4+</div>
                    <div className="text-xs text-gray-300">Years of Experience</div>
                  </div>
                  <div className="text-center p-3 bg-white/10 rounded-xl">
                    <div className="text-2xl font-bold text-red-400">95%</div>
                    <div className="text-xs text-gray-300">Success Rate</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Story & Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* My Story */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-orange-400 to-red-400 rounded-full mr-4"></div>
                  My Fitness Journey
                </h3>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    My transformation began 8 years ago when I was overweight and struggling with confidence.
                    That personal journey from 95kg to 75kg of lean muscle taught me that fitness isn't just about
                    physical change—it's about mental resilience and lifestyle transformation.
                  </p>
                  <p>
                    Today, I combine scientific knowledge with real-world experience to help others achieve
                    sustainable results. Every client's success story reminds me why I chose this path.
                  </p>
                </div>
              </div>

              {/* Certifications Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
  title: "IFSA Certified Fitness Coach",
  description: "Certification by Intellectual Fitness & Sports Academy (IFSA). This certification validates knowledge in fitness coaching, exercise science, and training methodologies, ensuring competence in guiding clients toward safe and effective fitness goals.",
  icon: <Award className="h-6 w-6" />,
  gradient: "from-blue-400 to-indigo-400",
  year: "2023",
  certImage: "m5.jpg",
  fullCertImage: "m5.jpg"
},
                  {
                    title: "Precision Nutrition Coach",
                    description: "Evidence-based nutrition coaching and behavior change certification. Focuses on sustainable nutrition habits, client psychology, and personalized meal planning strategies for long-term success.",
                    icon: <HeartPulse className="h-6 w-6" />,
                    gradient: "from-red-400 to-pink-400",
                    year: "2021",
                    certImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&h=200&fit=crop",
                    fullCertImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=600&fit=crop"
                  },
                  {
                    title: "Sports Science Degree",
                    description: "Bachelor's degree in Exercise Physiology and Biomechanics. Comprehensive study of human movement, muscle physiology, metabolic systems, and scientific approach to fitness training.",
                    icon: <BookOpen className="h-6 w-6" />,
                    gradient: "from-yellow-400 to-orange-400",
                    year: "2019",
                    certImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
                    fullCertImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop"
                  },
                  {
                    title: "Corrective Exercise Specialist",
                    description: "Specialized certification in injury prevention and movement pattern correction. Expertise in identifying muscle imbalances, postural issues, and designing corrective exercise programs.",
                    icon: <Check className="h-6 w-6" />,
                    gradient: "from-green-400 to-teal-400",
                    year: "2022",
                    certImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
                    fullCertImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop"
                  }
                ].map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedCert(cert)}
                  >
                    {/* Glow effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${cert.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>

                    {/* Certificate Image */}
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={cert.certImage}
                        alt={cert.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          console.log('Image failed to load:', cert.certImage);
                          e.target.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                      <div className="absolute top-3 right-3">
                        <span className="text-xs text-white bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">{cert.year}</span>
                      </div>
                    </div>

                    <div className="relative p-6">
                      {/* Icon */}
                      <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${cert.gradient} bg-opacity-20 mb-3`}>
                        <div className="text-white">{cert.icon}</div>
                      </div>

                      {/* Content */}
                      <h4 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors">
                        {cert.title}
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                        {cert.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center bg-gradient-to-r from-orange-500/10 via-red-500/10 to-yellow-500/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20"
          >
            <h3 className="text-3xl font-bold text-white mb-6">My Mission</h3>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              To bridge the gap between scientific fitness knowledge and real-world application.
              I believe every person deserves a customized approach that fits their lifestyle,
              goals, and challenges. Together, we'll build not just physical strength,
              but unshakeable confidence and lifelong healthy habits.
            </p>
          </motion.div>
        </div>

        {/* Certificate Modal */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Certificate Image - Dynamic ratio */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={selectedCert.fullCertImage}
                    alt={selectedCert.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Year Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {selectedCert.year}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="p-6">
                  <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${selectedCert.gradient} bg-opacity-20 mb-4`}>
                    <div className="text-white">{selectedCert.icon}</div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {selectedCert.title}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed">
                    {selectedCert.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default AboutPage;
