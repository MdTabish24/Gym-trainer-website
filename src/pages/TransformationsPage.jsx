import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const TransformationsPage = () => {
  const { toast } = useToast();

  React.useEffect(() => {
    toast({
      title: "🚧 Page Under Construction",
      description: "This page is coming soon with amazing before & after photos! You can request this feature next. 🚀",
    });
  }, [toast]);

  return (
    <PageTransition>
      <Helmet>
        <title>Client Transformations | Maaz Shoaib Success Stories</title>
        <meta name="description" content="See amazing transformation results from Maaz Shoaib's clients. Real people, real results." />
      </Helmet>

      <div className="min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Transformations</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Amazing before & after photos coming soon!
            </p>
            <div className="text-6xl mb-4">🚧</div>
            <p className="text-muted-foreground">
              This page is currently under construction. Check back soon for inspiring transformation stories!
            </p>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default TransformationsPage;