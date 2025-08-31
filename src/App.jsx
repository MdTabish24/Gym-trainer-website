import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ServicesPage from '@/pages/ServicesPage';
import TransformationsPage from '@/pages/TransformationsPage';
import GalleryPage from '@/pages/GalleryPage';
import ContactPage from '@/pages/ContactPage';
import DietPlanPage from '@/pages/DietPlanPage';
import WorkoutPlanPage from '@/pages/WorkoutPlanPage';
import AnimatedCursor from '@/components/AnimatedCursor';

function App() {
  const location = useLocation();

  // Handle GitHub Pages routing
  useEffect(() => {
    if (location.search.includes('/?/')) {
      const redirect = location.search.split('/?/')[1];
      if (redirect) {
        const newPath = '/' + redirect.replace(/~and~/g, '&');
        window.history.replaceState(null, null, newPath);
      }
    }
  }, [location]);

  return (
    <>
      <AnimatedCursor />
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/transformations" element={<TransformationsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/diet-plan" element={<DietPlanPage />} />
            <Route path="/workout-plan" element={<WorkoutPlanPage />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </>
  );
}

export default App;