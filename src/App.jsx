import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Server, Code2, Database, Cpu, 
  ShoppingCart, GraduationCap, Utensils, CalendarCheck, Briefcase, 
  Mail, Phone, Copy, Check, Terminal, Layers, Globe, Zap, Award, Sparkles, ArrowRight, Lock
} from 'lucide-react';

const playPopSound = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(350, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {}
};

const jokes = [
  "Hey there! I'm CyberPup, Sagal's AI assistant. Click anywhere to see me jump!",
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "Sagal's code is so secure, even I can't find a vulnerability... and I live inside it!",
  "An SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
  "I asked Sagal to optimize my core algorithms. Now I generate 50% more puns!",
  "Need high-fidelity digital infrastructure? You are looking at the exact right portfolio.",
  "My favorite CSS property? box-shadow: 0 0 50px #06b6d4; Obviously.",
  "Frontend, backend, bare-metal hardware, web security... Sagal executes it all flawlessly."
];

const techStack = [
  { name: "JavaScript (ES6+)", category: "Frontend", gradient: "from-amber-400 to-orange-500", icon: <Code2 className="w-5 h-5 text-amber-400" /> },
  { name: "React.js", category: "Frontend", gradient: "from-cyan-400 to-blue-500", icon: <Globe className="w-5 h-5 text-cyan-400" /> },
  { name: "Tailwind CSS", category: "Frontend", gradient: "from-teal-400 to-emerald-500", icon: <Layers className="w-5 h-5 text-teal-400" /> },
  { name: "Node.js", category: "Backend & DB", gradient: "from-emerald-400 to-green-600", icon: <Server className="w-5 h-5 text-emerald-400" /> },
  { name: "Express.js", category: "Backend & DB", gradient: "from-slate-300 to-slate-500", icon: <Server className="w-5 h-5 text-slate-300" /> },
  { name: "MongoDB", category: "Backend & DB", gradient: "from-green-400 to-emerald-500", icon: <Database className="w-5 h-5 text-green-400" /> },
  { name: "PostgreSQL", category: "Backend & DB", gradient: "from-blue-400 to-indigo-600", icon: <Database className="w-5 h-5 text-blue-400" /> },
  { name: "Redis Caching", category: "Backend & DB", gradient: "from-red-400 to-rose-600", icon: <Zap className="w-5 h-5 text-red-400" /> },
  { name: "Python", category: "Core & Systems", gradient: "from-blue-400 to-yellow-400", icon: <Terminal className="w-5 h-5 text-blue-400" /> },
  { name: "C / C++", category: "Core & Systems", gradient: "from-indigo-400 to-purple-600", icon: <Cpu className="w-5 h-5 text-indigo-400" /> },
  { name: "Arduino Hardware", category: "Core & Systems", gradient: "from-teal-500 to-cyan-600", icon: <Cpu className="w-5 h-5 text-teal-400" /> },
  { name: "Penetration Testing", category: "Security", gradient: "from-rose-500 to-red-600", icon: <Shield className="w-5 h-5 text-rose-400" /> },
];

const servicesOffered = [
  { title: "E-Commerce Architectures", desc: "High-conversion digital storefronts built with lightning-fast product querying, secure payment gateways, and automated inventory management.", icon: <ShoppingCart className="w-6 h-6 text-cyan-400"/>, tag: "Retail & Sales", border: "hover:border-cyan-500/50" },
  { title: "Campus & LMS Portals", desc: "Comprehensive institutional software featuring real-time grading ledgers, secure fee processing, notice distribution, and faculty management dashboards.", icon: <GraduationCap className="w-6 h-6 text-purple-400"/>, tag: "Education", border: "hover:border-purple-500/50" },
  { title: "Hospitality & POS Engines", desc: "Dynamic interactive menus, table reservation engines, and instantaneous kitchen order routing built for zero-latency restaurant operations.", icon: <Utensils className="w-6 h-6 text-emerald-400"/>, tag: "Hospitality", border: "hover:border-emerald-500/50" },
  { title: "Automated Booking Systems", desc: "Flawless appointment scheduling infrastructure equipped with multi-timezone synchronization, SMS reminders, and calendar integrations.", icon: <CalendarCheck className="w-6 h-6 text-amber-400"/>, tag: "Service Industry", border: "hover:border-amber-500/50" },
  { title: "Executive Web Footprints", desc: "Premium, ultra-fast minimalist web portfolios designed to establish undisputed market authority for elite corporate agencies and public figures.", icon: <Briefcase className="w-6 h-6 text-rose-400"/>, tag: "Enterprise", border: "hover:border-rose-500/50" },
  { title: "Application Hardening", desc: "Subjecting codebase architectures to rigorous offensive security auditing to neutralize SQL injection, cross-site scripting, and unauthorized API scraping.", icon: <Shield className="w-6 h-6 text-indigo-400"/>, tag: "Cybersecurity", border: "hover:border-indigo-500/50" },
];

const Companion = ({ mousePos, isJumping }) => {
  const [jokeIdx, setJokeIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setJokeIdx((prev) => (prev + 1) % jokes.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const eyeX = ((mousePos.x / window.innerWidth) - 0.5) * 10;
  const eyeY = ((mousePos.y / window.innerHeight) - 0.5) * 10;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={jokeIdx}
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.8 }}
          className="mb-3 w-64 bg-slate-900/95 border-2 border-cyan-500/60 text-slate-100 text-xs p-3.5 rounded-2xl shadow-2xl backdrop-blur-md pointer-events-auto cursor-pointer shadow-cyan-500/10 relative"
          onClick={() => { setJokeIdx((prev) => (prev + 1) % jokes.length); playPopSound(); }}
        >
          <div className="flex items-center gap-1.5 mb-1 text-cyan-400 font-mono font-bold text-[10px]">
            <Sparkles className="w-3 h-3 animate-spin" />
            <span>CYBERPUP_AI // CLICK FOR JOKE</span>
          </div>
          <p className="font-sans leading-relaxed">{jokes[jokeIdx]}</p>
          <div className="absolute -bottom-2 right-10 w-4 h-4 bg-slate-900 border-b-2 border-r-2 border-cyan-500/60 rotate-45" />
        </motion.div>
      </AnimatePresence>

      <motion.div
        animate={{ 
          y: isJumping ? [-25, -65, 0] : [0, -10, 0],
          rotate: isJumping ? [0, 15, -15, 0] : [0, 0]
        }}
        transition={{ 
          y: isJumping ? { duration: 0.4, ease: "easeOut" } : { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
          rotate: isJumping ? { duration: 0.4 } : {}
        }}
        onClick={playPopSound}
        className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-violet-600 via-cyan-500 to-emerald-400 p-0.5 shadow-2xl shadow-cyan-500/30 cursor-pointer pointer-events-auto relative select-none group hover:scale-105 transition-transform"
      >
        <div className="w-full h-full bg-[#050b18] rounded-[22px] flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute -top-2 left-3 w-3.5 h-6 bg-violet-500 rounded-full rotate-[-35deg]" />
          <div className="absolute -top-2 right-3 w-3.5 h-6 bg-cyan-500 rounded-full rotate-[35deg]" />

          <div className="flex gap-2.5 mb-1 z-10">
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-inner overflow-hidden border border-slate-400">
              <div 
                style={{ transform: `translate(${eyeX}px, ${eyeY}px)` }}
                className="w-2.5 h-2.5 bg-slate-950 rounded-full" 
              />
            </div>
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-inner overflow-hidden border border-slate-400">
              <div 
                style={{ transform: `translate(${eyeX}px, ${eyeY}px)` }}
                className="w-2.5 h-2.5 bg-slate-950 rounded-full" 
              />
            </div>
          </div>

          <div className="w-6 h-2.5 bg-emerald-400 rounded-b-full transition-all duration-300 group-hover:scale-125 z-10 shadow-lg shadow-emerald-400/50" />

          <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-cyan-500/10 rounded-full blur-md" />
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [filter, setFilter] = useState("All");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);

  const [formData, setFormData] = useState({ name: '', email: '', scope: '' });
  const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: false });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleClick = () => {
      setIsJumping(true);
      playPopSound();
      setTimeout(() => setIsJumping(false), 400);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    playPopSound();
    if (type === 'phone') { setCopiedPhone(true); setTimeout(() => setCopiedPhone(false), 2000); }
    if (type === 'email') { setCopiedEmail(true); setTimeout(() => setCopiedEmail(false), 2000); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: false });
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY",
          name: formData.name,
          email: formData.email,
          message: formData.scope,
          subject: `New Portfolio Inquiry from ${formData.name}`,
          to_email: "sagalchampingrai@gmail.com"
        })
      });
      const data = await res.json();
      if (data.success) {
        setFormStatus({ loading: false, success: true, error: false });
        setFormData({ name: '', email: '', scope: '' });
        playPopSound();
      } else {
        setFormStatus({ loading: false, success: false, error: true });
      }
    } catch (err) {
      setFormStatus({ loading: false, success: false, error: true });
    }
  };

  const filteredTech = filter === "All" ? techStack : techStack.filter(t => t.category === filter);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 selection:bg-cyan-500 selection:text-black font-sans relative overflow-x-hidden antialiased">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-violet-600/15 to-cyan-600/15 blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-gradient-to-br from-emerald-600/10 to-blue-600/10 blur-[150px] pointer-events-none -z-10" />

      <div className="fixed top-6 left-0 right-0 z-40 flex justify-center px-6 pointer-events-none">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="pointer-events-auto w-full max-w-6xl bg-[#080e1e]/90 backdrop-blur-md border border-slate-800 rounded-full px-8 py-4 flex items-center justify-between shadow-2xl shadow-black/80"
        >
          <a href="#hero" onClick={playPopSound} className="flex items-center gap-3 group">
            <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-cyan-400 to-emerald-400 group-hover:scale-125 transition-transform" />
            <span className="font-extrabold tracking-widest text-white text-sm font-mono">SAGAL RAI</span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {['About', 'Services', 'Skills'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={playPopSound}
                className="hover:text-cyan-400 transition-colors cursor-pointer"
              >
                {item}
              </a>
            ))}
          </div>

          <a 
            href="#contact"
            onClick={playPopSound}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105"
          >
            Direct Dispatch
          </a>
        </motion.nav>
      </div>

      <section id="hero" className="min-h-screen flex items-center justify-center pt-32 pb-24 px-6 relative">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center lg:justify-start"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full p-1.5 bg-gradient-to-tr from-cyan-500 via-indigo-500 to-emerald-400 shadow-2xl shadow-cyan-500/20 group">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#091022] border-4 border-[#030712] flex items-center justify-center relative">
                <img 
                  src="https://scontent.fbir1-1.fna.fbcdn.net/v/t1.15752-9/728195566_1358907119641663_6883743813025796832_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_ohc=2RKbk0fwNEkQ7kNvwHhRvLm&_nc_oc=AdrsQN6tu05hadE_dveOMV5yII8XFp8C2S6VqzQzCmCzQ9xRDDY_prSYXa5VTAeVxsE&_nc_ad=z-m&_nc_cid=5011&_nc_zt=23&_nc_ht=scontent.fbir1-1.fna&_nc_ss=7a22e&oh=03_Q7cD5gHvhqDCwdrOe6y_7DUk9qDNIZQHhHKlB_JHIMNDOjDkcQ&oe=6A62C2C6" 
                  alt="Sagal Rai" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-slate-900 border border-slate-700 px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-slate-200">AVAILABLE FOR HIRE</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-cyan-400 text-xs font-mono tracking-widest uppercase shadow-inner">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hardened Code & Flawless UX</span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Full Stack <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                Web Developer.
              </span>
            </h1>

            <p className="max-w-xl text-lg text-slate-300 font-normal leading-relaxed">
              I architect high-fidelity digital infrastructure. Combining over <strong className="text-white font-semibold">2 years of full-stack engineering</strong> with raw bare-metal hardware control and rigorous offensive penetration testing methodologies.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
              <a 
                href="#contact"
                onClick={playPopSound}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm tracking-wide transition-all shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 flex items-center gap-2"
              >
                <span>Secure Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#services"
                onClick={playPopSound}
                className="px-8 py-4 rounded-2xl bg-[#0b1224] hover:bg-[#131e38] text-slate-200 border border-slate-800 font-bold text-sm tracking-wide transition-all flex items-center gap-2"
              >
                <span>View Capabilities</span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/80 max-w-lg">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">2+</p>
                <p className="text-[11px] font-mono text-slate-400 uppercase mt-0.5">Years Mastery</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-cyan-400">100%</p>
                <p className="text-[11px] font-mono text-slate-400 uppercase mt-0.5">Secure Code</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-400">Bare-Metal</p>
                <p className="text-[11px] font-mono text-slate-400 uppercase mt-0.5">Arduino & C++</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      <section id="about" className="py-36 px-6 border-t border-slate-900/80 bg-[#050914] relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>UNCOMPROMISING ARCHITECTURE</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Building software through the rigorous lens of a security auditor.
            </h2>

            <div className="space-y-4 text-slate-300 leading-relaxed font-normal text-base sm:text-lg">
              <p>
                Most developers construct applications solely for the "happy path," leaving gaping structural vulnerabilities beneath pretty interfaces. As an offensive security specialist and Full Stack Developer, I anticipate edge cases, injection vectors, and logic flaws before writing a single line of production code.
              </p>
              <p>
                My technical reach spans from buttery-smooth React interfaces down to low-level hardware instructions. Because I program bare-metal microcontrollers and build custom Arduino circuitry, I possess an unshakeable grasp of how high-level web code interacts with physical memory and server processors.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-[#091022] border border-slate-800 flex items-start gap-4">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl mt-1">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Zero-Latency DBs</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-normal">Highly optimized indexing across PostgreSQL and MongoDB clusters.</p>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-[#091022] border border-slate-800 flex items-start gap-4">
                <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl mt-1">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Pentested Code</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-normal">Systematic protection against XSS, SQLi, and automated bot scraping.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border-2 border-slate-800 bg-[#091022] shadow-2xl group">
              <img 
                src="https://scontent.fbir1-1.fna.fbcdn.net/v/t1.15752-9/730373184_1323060453264145_9085179104798166664_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=fc17b8&_nc_ohc=2ZbxzTnJHo8Q7kNvwHCkBDn&_nc_oc=Adq4vaOnrOwOKHb-Se2y6WYkjal4HkumqR6aPQa-BrJl1RPA-iCiIKfyNKcycG2dF3A&_nc_ad=z-m&_nc_cid=5011&_nc_zt=23&_nc_ht=scontent.fbir1-1.fna&_nc_ss=7a22e&oh=03_Q7cD5gGRghnTrjXZZLaR2We2YD2Nhu0aQq0rBBtNXu_a7rKKUA&oe=6A62F87C" 
                alt="Sagal Rai Workspace" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>

        </div>
      </section>

      <section id="services" className="py-36 px-6 border-t border-slate-900/80 relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">WHAT I ENGINEER</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">Enterprise Capabilities</h2>
            <p className="text-slate-400 text-lg">High-performance digital platforms built to flawless corporate specifications.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesOffered.map((srv, idx) => (
              <motion.div 
                key={srv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-[#080e20] border border-slate-800 ${srv.border} rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 shadow-xl group hover:-translate-y-1.5`}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 group-hover:scale-110 transition-transform">
                      {srv.icon}
                    </div>
                    <span className="text-[11px] font-mono px-3.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-700">
                      {srv.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-white mb-3 group-hover:text-cyan-300 transition-colors">{srv.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-normal">{srv.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <section id="skills" className="py-36 px-6 border-t border-slate-900/80 bg-[#050914] relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="space-y-3">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">TECHNICAL ARSENAL</span>
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">Skills & Technologies</h2>
            </div>

            <div className="flex flex-wrap gap-2 p-1.5 bg-[#091022] border border-slate-800 rounded-2xl">
              {["All", "Frontend", "Backend & DB", "Core & Systems"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setFilter(cat); playPopSound(); }}
                  className={`px-5 py-2.5 rounded-xl text-xs font-mono transition-all ${
                    filter === cat 
                      ? "bg-cyan-500 text-slate-950 font-extrabold shadow-lg shadow-cyan-500/20" 
                      : "text-slate-400 hover:text-white font-medium"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <AnimatePresence>
              {filteredTech.map((tech) => (
                <motion.div
                  key={tech.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-[#091022] border border-slate-800 hover:border-slate-600 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all shadow-lg group hover:-translate-y-1"
                >
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 mb-4 group-hover:scale-110 transition-transform">
                    {tech.icon}
                  </div>
                  <span className="font-extrabold text-sm text-slate-200 group-hover:text-white transition-colors">{tech.name}</span>
                  <span className="text-[11px] font-mono text-slate-500 mt-1">{tech.category.split('&')[0]}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      <section id="contact" className="py-36 px-6 border-t border-slate-900/80 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>SECURE TRANSMISSION</span>
              </span>
              <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
                Initiate a Secure Dialogue.
              </h2>
            </div>

            <div className="p-8 rounded-3xl bg-[#080e20] border border-slate-800 leading-relaxed text-slate-300 text-base sm:text-lg shadow-xl">
              "I manage client deliverables with strict personal accountability. I guarantee prompt communications, transparent development cycles, and robust software architectures engineered to stay online."
            </div>

            <div className="space-y-4 pt-2 font-mono">
              <div 
                onClick={() => copyToClipboard('+9779705974665', 'phone')}
                className="flex items-center justify-between p-5 rounded-2xl bg-[#091022] border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all group shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold">DIRECT LINE (NEPAL)</p>
                    <p className="text-sm font-extrabold text-white mt-0.5">+977 9705974665</p>
                  </div>
                </div>
                {copiedPhone ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-500 group-hover:text-white" />}
              </div>

              <div 
                onClick={() => copyToClipboard('sagalchampingrai@gmail.com', 'email')}
                className="flex items-center justify-between p-5 rounded-2xl bg-[#091022] border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all group shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold">SECURE INBOX</p>
                    <p className="text-xs sm:text-sm font-extrabold text-white mt-0.5">sagalchampingrai@gmail.com</p>
                  </div>
                </div>
                {copiedEmail ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-500 group-hover:text-white" />}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#080e20] border-2 border-slate-800 rounded-3xl p-10 shadow-2xl relative">
            <div className="flex items-center gap-2.5 mb-8 pb-6 border-b border-slate-800">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">DISPATCH_PORTAL // LIVE</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-2">Client Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Richard Hendricks" 
                  className="w-full bg-[#030712] border border-slate-700 rounded-xl px-5 py-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-2">Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="richard@piedpiper.com" 
                  className="w-full bg-[#030712] border border-slate-700 rounded-xl px-5 py-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-2">Project Scope & Parameters</label>
                <textarea 
                  rows={5} 
                  required 
                  value={formData.scope}
                  onChange={(e) => setFormData({...formData, scope: e.target.value})}
                  placeholder="Outline platform deliverables, security testing targets, or timeline specifications..." 
                  className="w-full bg-[#030712] border border-slate-700 rounded-xl px-5 py-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono resize-none transition-all"
                />
              </div>

              <button 
                type="submit"
                disabled={formStatus.loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {formStatus.loading ? "Transmitting..." : "Transmit Secure Dispatch"}
              </button>

              {formStatus.success && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono text-center">
                  ✓ Dispatch received! Sagal will review and respond shortly.
                </div>
              )}
              {formStatus.error && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono text-center">
                  ✕ Transmission failed. Please email directly or check your Access Key.
                </div>
              )}
            </form>
          </div>

        </div>
      </section>

      <footer className="py-12 border-t border-slate-900 text-center text-xs font-mono text-slate-500 bg-[#02050d]">
        <p>© {new Date().getFullYear()} SAGAL RAI. SECURE INFRASTRUCTURE. ALL RIGHTS RESERVED.</p>
      </footer>

      <Companion mousePos={mousePos} isJumping={isJumping} />
    </div>
  );
}