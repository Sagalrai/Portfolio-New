import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  { title: "E-Commerce Suite", tech: "React & Node" },
  { title: "Dental Booking", tech: "Full-Stack" },
  { title: "SaaS Portal", tech: "Next.js" },
];

const Projects = () => (
  <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
    <h3 className="text-4xl font-bold mb-12">Projects</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {projects.map((p, i) => (
        <motion.div 
          key={i}
          whileHover={{ y: -10 }}
          className="h-80 bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-end hover:border-blue-500/50 transition-all duration-300"
        >
          <h4 className="text-2xl font-bold">{p.title}</h4>
          <p className="text-blue-500">{p.tech}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Projects;