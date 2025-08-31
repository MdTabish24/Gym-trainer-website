import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';

const GalleryPage = () => {
  const [mainImage, setMainImage] = useState(0);
  
  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      title: "Beast Mode Training",
      category: "Training"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=600&fit=crop",
      title: "Shredded Physique",
      category: "Physique"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&h=600&fit=crop",
      title: "Power Lifting",
      category: "Training"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop",
      title: "Muscle Definition",
      category: "Physique"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&h=600&fit=crop",
      title: "Cardio Session",
      category: "Training"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
      title: "Peak Condition",
      category: "Physique"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=800&h=600&fit=crop",
      title: "Strength Training",
      category: "Training"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop",
      title: "Aesthetic Goals",
      category: "Physique"
    }
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Gallery | Maaz Shoaib Fitness Gallery</title>
        <meta name="description" content="Explore Maaz Shoaib's fitness journey through an interactive split-screen gallery." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-20 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
            Fitness Gallery
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Click thumbnails to explore my fitness journey
          </p>
        </motion.div>

        {/* Split Screen Gallery */}
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6 h-[600px]">
            {/* Thumbnail Sidebar */}
            <div className="w-1/3">
              <div className="grid grid-cols-1 gap-4 h-full overflow-y-auto">
                {galleryImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    className={`relative cursor-pointer rounded-2xl overflow-hidden ${
                      index === mainImage ? 'ring-4 ring-orange-500' : ''
                    }`}
                    onClick={() => setMainImage(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-32 object-cover"
                    />
                    
                    {/* Active Indicator */}
                    {index === mainImage && (
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-red-500/30" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Main Display */}
            <div className="w-2/3">
              <motion.div
                key={mainImage}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative h-full rounded-3xl overflow-hidden shadow-2xl"
              >
                <img
                  src={galleryImages[mainImage].src}
                  alt={galleryImages[mainImage].title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default GalleryPage;