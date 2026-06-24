import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => (
  <section className="h-screen flex flex-col justify-center items-center text-center px-6">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="text-7xl md:text-9xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
    >
      FULL-STACK.
    </motion.h2>
    <p className="text-xl text-gray-400 max-w-lg">Sagal Rai. Building secure, scalable, and premium digital architectures.</p>
  </section>
);

export default Hero;