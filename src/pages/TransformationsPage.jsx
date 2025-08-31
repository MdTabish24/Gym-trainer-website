import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '@/components/PageTransition';
import { motion, useScroll } from 'framer-motion';

const TransformationsPage = () => {
  const { scrollYProgress } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);

  const timelineItems = [
    {
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop",
      name: "Sarah M.",
      type: "before",
      side: "left"
    },
    {
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&h=500&fit=crop",
      result: "Lost 15kg in 3 months",
      type: "after",
      side: "right"
    },
    {
      image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=500&h=500&fit=crop",
      name: "Ahmed K.",
      type: "before",
      side: "left"
    },
    {
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=500&fit=crop",
      result: "Gained 8kg muscle mass",
      type: "after",
      side: "right"
    },
    {
      image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=500&h=500&fit=crop",
      name: "Maria L.",
      type: "before",
      side: "left"
    },
    {
      image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=500&h=500&fit=crop",
      result: "Complete body transformation",
      type: "after",
      side: "right"
    }
  ];

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(latest => {
      setScrollProgress(latest);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <PageTransition>
      <Helmet>
        <title>Client Transformations | Maaz Shoaib Success Stories</title>
        <meta name="description" content="See amazing transformation results from Maaz Shoaib's clients. Real people, real results." />
      </Helmet>

      <div className="min-h-[300vh] bg-gradient-to-br from-gray-900 via-black to-gray-800 py-20 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
            Transformation Timeline
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Journey from before to after
          </p>
        </motion.div>

        {/* Vertical Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-600">
            <div 
              className="w-full bg-gradient-to-b from-orange-500 to-green-500 transition-all duration-300"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-16">
            {timelineItems.map((item, index) => {
              const itemProgress = Math.max(0, Math.min(1, (scrollProgress * timelineItems.length) - index));
              
              return (
                <motion.div 
                  key={index}
                  className="flex items-center relative"
                  style={{
                    opacity: itemProgress > 0 ? 1 : 0.3,
                    transform: `translateY(${(1 - itemProgress) * 50}px)`
                  }}
                >
                  {/* Left Side */}
                  <div className="flex-1 text-right pr-8">
                    {item.side === 'left' && (
                      <div className="inline-block">
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.type}
                            className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-3xl shadow-2xl"
                          />
                          <div className="absolute top-4 left-4">
                            <span className={`px-3 py-2 rounded-full font-bold text-sm text-white ${
                              item.type === 'before' ? 'bg-red-500' : 'bg-green-500'
                            }`}>
                              {item.type.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        {item.name && (
                          <h3 className="text-lg md:text-xl font-bold text-white mt-4">{item.name}</h3>
                        )}
                        {item.result && (
                          <p className="text-md md:text-lg font-bold text-yellow-400 mt-4">{item.result}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Timeline Dot */}
                  <div className="relative z-10">
                    <div className={`w-4 h-4 md:w-6 md:h-6 rounded-full border-2 md:border-4 border-white transition-colors duration-500 ${
                      item.type === 'before' ? 'bg-orange-500' : 'bg-green-500'
                    }`} />
                  </div>

                  {/* Right Side */}
                  <div className="flex-1 text-left pl-8">
                    {item.side === 'right' && (
                      <div className="inline-block">
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.type}
                            className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-3xl shadow-2xl"
                          />
                          <div className="absolute top-4 left-4">
                            <span className={`px-3 py-2 rounded-full font-bold text-sm text-white ${
                              item.type === 'before' ? 'bg-red-500' : 'bg-green-500'
                            }`}>
                              {item.type.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        {item.name && (
                          <h3 className="text-lg md:text-xl font-bold text-white mt-4">{item.name}</h3>
                        )}
                        {item.result && (
                          <p className="text-md md:text-lg font-bold text-yellow-400 mt-4">{item.result}</p>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default TransformationsPage;