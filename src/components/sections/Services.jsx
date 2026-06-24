import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Code, Database } from 'lucide-react';

const services = [
  { icon: <Shield size={32}/>, title: 'Web Security', desc: 'Hardened architecture & vulnerability assessments.' },
  { icon: <Code size={32}/>, title: 'Full-Stack Dev', desc: 'Modern React & Node.js ecosystems.' },
  { icon: <Database size={32}/>, title: 'Data Systems', desc: 'Optimized PostgreSQL & Redis caching.' }
];

const Services = () => (
  <section id="services" className="py-24 px-6 max-w-6xl mx-auto">
    <h3 className="text-4xl font-bold mb-12">Expertise</h3>
    <div className="grid md:grid-cols-3 gap-6">
      {services.map((s, i) => (
        <motion.div 
          key={i}
          whileHover={{ y: -10 }}
          className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all"
        >
          <div className="text-blue-500 mb-4">{s.icon}</div>
          <h4 className="text-xl font-bold mb-2">{s.title}</h4>
          <p className="text-gray-400">{s.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Services;