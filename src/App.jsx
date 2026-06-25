import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Shield, Server, Code2, Database, Cpu, 
  ShoppingCart, GraduationCap, Utensils, CalendarCheck, Briefcase, 
  Mail, Phone, Copy, Check, Terminal, Layers, Globe, Zap, Award, Sparkles, ArrowRight, Lock,
  Moon, Sun, Hexagon, Triangle
} from 'lucide-react';

const AnimatedCounter = ({ value, label, isDark }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let current = 0;
    const target = parseInt(value);
    const increment = target / 50;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);
    return () => clearInterval(interval);
  }, [isVisible, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <motion.p className={`text-5xl font-black transition-colors duration-700 ${isDark ? 'text-cyan-400' : 'text-amber-600'}`}>
        {count}+
      </motion.p>
      <p className={`text-sm font-semibold mt-2 transition-colors duration-700 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        {label}
      </p>
    </motion.div>
  );
};

const AnimatedBackground = ({ isDark }) => {
  const particles = Array.from({ length: 50 });

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">

      {/* Moving Cyber Grid */}
      <motion.div
        animate={{
          backgroundPosition: ["0px 0px", "0px 120px"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(6,182,212,0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6,182,212,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Existing Glow Blob 1 */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl ${
          isDark ? "bg-cyan-500/30" : "bg-amber-400/20"
        }`}
      />

      {/* Existing Glow Blob 2 */}
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className={`absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl ${
          isDark ? "bg-purple-500/30" : "bg-orange-400/20"
        }`}
      />

      {/* Existing Glow Blob 3 */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{ duration: 9, repeat: Infinity, delay: 2 }}
        className={`absolute bottom-20 left-1/2 w-80 h-80 rounded-full blur-3xl ${
          isDark ? "bg-emerald-500/20" : "bg-cyan-400/15"
        }`}
      />

      {/* Floating Particles */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${
            isDark ? "bg-cyan-400/40" : "bg-amber-400/40"
          }`}
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-15, 15, -15],
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating Hexagon */}
      <motion.div
        animate={{
          y: [0, -40, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "linear",
        }}
        className={`absolute top-1/3 left-1/4 opacity-15 ${
          isDark ? "text-cyan-500" : "text-amber-500"
        }`}
      >
        <Hexagon className="w-40 h-40" />
      </motion.div>

      {/* Floating Triangle */}
      <motion.div
        animate={{
          y: [0, 50, 0],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className={`absolute bottom-1/4 right-1/4 opacity-15 ${
          isDark ? "text-purple-500" : "text-orange-400"
        }`}
      >
        <Triangle className="w-44 h-44" />
      </motion.div>

    </div>
  );
};























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
  } catch {}
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
  { name: "JavaScript (ES6+)", category: "Frontend", icon: <Code2 className="w-5 h-5 text-amber-400" /> },
  { name: "React.js", category: "Frontend", icon: <Globe className="w-5 h-5 text-cyan-400" /> },
  { name: "Tailwind CSS", category: "Frontend", icon: <Layers className="w-5 h-5 text-teal-400" /> },
  { name: "Node.js", category: "Backend & DB", icon: <Server className="w-5 h-5 text-emerald-400" /> },
  { name: "Express.js", category: "Backend & DB", icon: <Server className="w-5 h-5 text-slate-300" /> },
  { name: "MongoDB", category: "Backend & DB", icon: <Database className="w-5 h-5 text-green-400" /> },
  { name: "PostgreSQL", category: "Backend & DB", icon: <Database className="w-5 h-5 text-blue-400" /> },
  { name: "Redis Caching", category: "Backend & DB", icon: <Zap className="w-5 h-5 text-red-400" /> },
  { name: "Python", category: "Core & Systems", icon: <Terminal className="w-5 h-5 text-blue-400" /> },
  { name: "C / C++", category: "Core & Systems", icon: <Cpu className="w-5 h-5 text-indigo-400" /> },
  { name: "Arduino Hardware", category: "Core & Systems", icon: <Cpu className="w-5 h-5 text-teal-400" /> },
  { name: "Penetration Testing", category: "Security", icon: <Shield className="w-5 h-5 text-rose-400" /> },
];

const servicesOffered = [
  { title: "E-Commerce Architectures", desc: "High-conversion digital storefronts built with lightning-fast product querying, secure payment gateways, and automated inventory management.", icon: <ShoppingCart className="w-6 h-6 text-cyan-400"/>, tag: "Retail & Sales", border: "hover:border-cyan-500/50" },
  { title: "Campus & LMS Portals", desc: "Comprehensive institutional software featuring real-time grading ledgers, secure fee processing, notice distribution, and faculty management dashboards.", icon: <GraduationCap className="w-6 h-6 text-purple-400"/>, tag: "Education", border: "hover:border-purple-500/50" },
  { title: "Hospitality & POS Engines", desc: "Dynamic interactive menus, table reservation engines, and instantaneous kitchen order routing built for zero-latency restaurant operations.", icon: <Utensils className="w-6 h-6 text-emerald-400"/>, tag: "Hospitality", border: "hover:border-emerald-500/50" },
  { title: "Automated Booking Systems", desc: "Flawless appointment scheduling infrastructure equipped with multi-timezone synchronization, SMS reminders, and calendar integrations.", icon: <CalendarCheck className="w-6 h-6 text-amber-400"/>, tag: "Service Industry", border: "hover:border-amber-500/50" },
  { title: "Executive Web Footprints", desc: "Premium, ultra-fast minimalist web portfolios designed to establish undisputed market authority for elite corporate agencies and public figures.", icon: <Briefcase className="w-6 h-6 text-rose-400"/>, tag: "Enterprise", border: "hover:border-rose-500/50" },
  { title: "Application Hardening", desc: "Subjecting codebase architectures to rigorous offensive security auditing to neutralize SQL injection, cross-site scripting, and unauthorized API scraping.", icon: <Shield className="w-6 h-6 text-indigo-400"/>, tag: "Cybersecurity", border: "hover:border-indigo-500/50" },
];

const Companion = ({ mousePos, isJumping, isDark }) => {
  const [jokeIdx, setJokeIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setJokeIdx((prev) => (prev + 1) % jokes.length), 9000);
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
          className={`mb-3 w-64 border-2 text-xs p-3.5 rounded-2xl shadow-2xl backdrop-blur-md pointer-events-auto cursor-pointer relative transition-colors duration-700 ${
            isDark
              ? "bg-slate-900/95 border-cyan-500/60 text-slate-100 shadow-cyan-500/10"
              : "bg-white/95 border-amber-400/70 text-slate-800 shadow-amber-500/20"
          }`}
          onClick={() => { setJokeIdx((prev) => (prev + 1) % jokes.length); playPopSound(); }}
        >
          <div className={`flex items-center gap-1.5 mb-1 font-mono font-bold text-[10px] ${isDark ? "text-cyan-400" : "text-amber-600"}`}>
            <Sparkles className="w-3 h-3 animate-spin" />
            <span>CYBERPUP_AI // CLICK FOR JOKE</span>
          </div>
          <p className="font-sans leading-relaxed">{jokes[jokeIdx]}</p>
          <div className={`absolute -bottom-2 right-10 w-4 h-4 border-b-2 border-r-2 rotate-45 transition-colors duration-700 ${
            isDark ? "bg-slate-900 border-cyan-500/60" : "bg-white border-amber-400/70"
          }`} />
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
              <div style={{ transform: `translate(${eyeX}px, ${eyeY}px)` }} className="w-2.5 h-2.5 bg-slate-950 rounded-full" />
            </div>
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-inner overflow-hidden border border-slate-400">
              <div style={{ transform: `translate(${eyeX}px, ${eyeY}px)` }} className="w-2.5 h-2.5 bg-slate-950 rounded-full" />
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
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem('portfolio-theme') || 'dark';
  });
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [filter, setFilter] = useState("All");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', scope: '' });
  const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: false });
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const isDark = theme === 'dark';

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleClick = () => { setIsJumping(true); playPopSound(); setTimeout(() => setIsJumping(false), 400); };
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
    } catch {
      setFormStatus({ loading: false, success: false, error: true });
    }
  };

  const filteredTech = filter === "All" ? techStack : techStack.filter(t => t.category === filter);
  
  const toggleTheme = (e) => {
    e.stopPropagation();
    setTheme((current) => current === 'dark' ? 'light' : 'dark');
    playPopSound();
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const themeClasses = {
    page: isDark ? "bg-[#030712] text-slate-200 selection:bg-cyan-500" : "bg-[#f8fbff] text-slate-700 selection:bg-amber-300",
    nav: isDark ? "bg-[#080e1e]/90 border-slate-800 shadow-black/80" : "bg-white/90 border-sky-100 shadow-sky-900/10",
    sectionAlt: isDark ? "bg-[#050914]" : "bg-[#eef7ff]",
    border: isDark ? "border-slate-900/80" : "border-sky-100",
    heading: isDark ? "text-white" : "text-slate-950",
    body: isDark ? "text-slate-300" : "text-slate-600",
    muted: isDark ? "text-slate-400" : "text-slate-500",
    faint: isDark ? "text-slate-500" : "text-slate-500",
    accent: isDark ? "text-cyan-400" : "text-amber-600",
    accentSoft: isDark ? "bg-cyan-500/10 text-cyan-400" : "bg-amber-100 text-amber-700",
    card: isDark ? "bg-[#091022] border-slate-800" : "bg-white/85 border-sky-100 shadow-sky-900/10",
    cardStrong: isDark ? "bg-[#080e20] border-slate-800" : "bg-white border-sky-100 shadow-sky-900/10",
    chip: isDark ? "bg-slate-900/80 border-slate-800 text-cyan-400" : "bg-white/80 border-amber-200 text-amber-700",
    iconBox: isDark ? "bg-slate-900 border-slate-800" : "bg-sky-50 border-sky-100",
    secondaryButton: isDark ? "bg-[#0b1224] hover:bg-[#131e38] text-slate-200 border-slate-800" : "bg-white hover:bg-sky-50 text-slate-800 border-sky-100 shadow-lg shadow-sky-900/10",
    primaryButton: isDark ? "from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/20 hover:shadow-cyan-500/40" : "from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 shadow-amber-500/25 hover:shadow-amber-500/40",
    input: isDark ? "bg-[#030712] border-slate-700 text-white placeholder-slate-600" : "bg-white border-sky-100 text-slate-900 placeholder-slate-400",
  };

  return (
    <div className={`min-h-screen ${themeClasses.page} selection:text-black font-sans relative overflow-x-hidden antialiased transition-colors duration-700`} ref={scrollRef}>
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 origin-left z-50 transition-colors duration-700"
      />

      <AnimatedBackground isDark={isDark} />

      <div className="fixed top-6 left-0 right-0 z-40 flex justify-center px-6 pointer-events-none">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`pointer-events-auto w-full max-w-6xl ${themeClasses.nav} backdrop-blur-md border rounded-full px-5 sm:px-8 py-4 flex items-center justify-between shadow-2xl transition-colors duration-700`}
        >
          <motion.a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); playPopSound(); }} whileHover={{ scale: 1.05 }} className="flex items-center gap-3 group cursor-pointer">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="w-3 h-3 rounded-full bg-gradient-to-tr from-cyan-400 to-emerald-400" />
            <span className={`font-extrabold tracking-widest ${themeClasses.heading} text-sm font-mono transition-colors duration-700`}>SAGAL RAI</span>
          </motion.a>

          <div className={`hidden md:flex items-center gap-8 text-sm font-medium ${themeClasses.body} transition-colors duration-700`}>
            {['About', 'Services', 'Skills'].map((item) => (
              <motion.a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={(e) => { e.preventDefault(); scrollToSection(item.toLowerCase()); playPopSound(); }} 
                whileHover={{ scale: 1.05 }}
                className={`${isDark ? "hover:text-cyan-400" : "hover:text-amber-600"} transition-colors cursor-pointer`}
              >
                {item}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <motion.button
              whileHover={{ rotate: 20 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={toggleTheme}
              className={`h-11 w-11 rounded-full border flex items-center justify-center transition-all duration-500 hover:scale-105 ${
                isDark ? "bg-slate-900 text-cyan-300 border-slate-700 shadow-lg shadow-cyan-500/10" : "bg-amber-50 text-amber-600 border-amber-200 shadow-lg shadow-amber-500/20"
              }`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
            <motion.a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); playPopSound(); }} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`hidden sm:inline-flex px-6 py-2.5 rounded-full bg-gradient-to-r ${themeClasses.primaryButton} font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer`}
            >
              Direct Dispatch
            </motion.a>
          </div>
        </motion.nav>
      </div>

      <section id="hero" className="min-h-screen flex items-center justify-center pt-32 pb-24 px-6 relative">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="lg:col-span-5 flex justify-center lg:justify-start">
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 2, -2, 0],
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className={`relative w-72 h-72 sm:w-96 sm:h-96 rounded-full p-1.5 bg-gradient-to-tr ${isDark ? "from-cyan-500 via-indigo-500 to-emerald-400 shadow-cyan-500/20" : "from-amber-400 via-orange-400 to-sky-400 shadow-amber-500/25"} shadow-2xl group transition-colors duration-700`}
            >
              <div className={`w-full h-full rounded-full overflow-hidden ${themeClasses.card} border-4 ${isDark ? "border-[#030712]" : "border-white"} flex items-center justify-center relative transition-colors duration-700`}>
                <img src="https://scontent.fbir1-1.fna.fbcdn.net/v/t1.15752-9/728195566_1358907119641663_6883743813025796832_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_ohc=2RKbk0fwNEkQ7kNvwHhRvLm&_nc_oc=AdrsQN6tu05hadE_dveOMV5yII8XFp8C2S6VqzQzCmCzQ9xRDDY_prSYXa5VTAeVxsE&_nc_ad=z-m&_nc_cid=5011&_nc_zt=23&_nc_ht=scontent.fbir1-1.fna&_nc_ss=7a22e&oh=03_Q7cD5gHvhqDCwdrOe6y_7DUk9qDNIZQHhHKlB_JHIMNDOjDkcQ&oe=6A62C2C6" alt="Sagal Rai" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              </div>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${themeClasses.chip} border text-xs font-mono tracking-widest uppercase shadow-inner transition-colors duration-700`}
            >
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hardened Code & Flawless UX</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-5xl sm:text-7xl font-extrabold tracking-tight ${themeClasses.heading} leading-[1.08] transition-colors duration-700`}
            >
              Full Stack <br />
              <motion.span
                animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{
                  backgroundImage: isDark 
                    ? 'linear-gradient(90deg, #06b6d4, #14b8a6, #10b981, #06b6d4)' 
                    : 'linear-gradient(90deg, #f59e0b, #ff8c42, #ff6b9d, #f59e0b)',
                  backgroundSize: '200% 100%',
                }}
                className="bg-clip-text text-transparent"
              >
                Web Developer.
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`max-w-xl text-lg ${themeClasses.body} font-normal leading-relaxed transition-colors duration-700`}
            >
              I architect high-fidelity digital infrastructure. Combining over 2 years of full-stack engineering with raw bare-metal hardware control and rigorous offensive penetration testing methodologies.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2"
            >
              <motion.a 
                href="#contact" 
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); playPopSound(); }} 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-2xl bg-gradient-to-r ${themeClasses.primaryButton} font-extrabold text-sm tracking-wide transition-all shadow-xl flex items-center gap-2 cursor-pointer`}
              >
                <span>Secure Your Project</span><ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a 
                href="#services" 
                onClick={(e) => { e.preventDefault(); scrollToSection('services'); playPopSound(); }} 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-2xl ${themeClasses.secondaryButton} border font-bold text-sm tracking-wide transition-all flex items-center gap-2 cursor-pointer`}
              >
                <span>View Capabilities</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      
      <section id="about" className={`py-36 px-6 border-t ${themeClasses.border} ${themeClasses.sectionAlt} relative transition-colors duration-700`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-7 space-y-6">
            <span className={`text-xs font-mono ${themeClasses.accent} uppercase tracking-widest flex items-center gap-2 transition-colors duration-700`}><Shield className="w-4 h-4" /><span>UNCOMPROMISING ARCHITECTURE</span></span>
            <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${themeClasses.heading} leading-tight transition-colors duration-700`}>Building software through the rigorous lens of a security auditor.</h2>
            <div className={`space-y-4 ${themeClasses.body} leading-relaxed font-normal text-base sm:text-lg transition-colors duration-700`}>
              <p>Most developers construct applications solely for the "happy path," leaving gaping structural vulnerabilities beneath pretty interfaces. As an offensive security specialist and Full Stack Developer, I anticipate edge cases, injection vectors, and logic flaws before writing a single line of production code.</p>
              <p>My technical reach spans from buttery-smooth React interfaces down to low-level hardware instructions. Because I program bare-metal microcontrollers and build custom Arduino circuitry, I possess an unshakeable grasp of how high-level web code interacts with physical memory and server processors.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="lg:col-span-5 flex justify-center">
            <div className={`relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border-2 ${themeClasses.card} shadow-2xl transition-colors duration-700`}>
              <img src="https://scontent.fbir1-1.fna.fbcdn.net/v/t1.15752-9/730373184_1323060453264145_9085179104798166664_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=fc17b8&_nc_ohc=2ZbxzTnJHo8Q7kNvwHCkBDn&_nc_oc=Adq4vaOnrOwOKHb-Se2y6WYkjal4HkumqR6aPQa-BrJl1RPA-iCiIKfyNKcycG2dF3A&_nc_ad=z-m&_nc_cid=5011&_nc_zt=23&_nc_ht=scontent.fbir1-1.fna&_nc_ss=7a22e&oh=03_Q7cD5gGRghnTrjXZZLaR2We2YD2Nhu0aQq0rBBtNXu_a7rKKUA&oe=6A62F87C" alt="Sagal Rai Workspace" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      <section id="services" className={`py-36 px-6 border-t ${themeClasses.border} relative transition-colors duration-700`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className={`text-xs font-mono ${themeClasses.accent} uppercase tracking-widest transition-colors duration-700 block`}>WHAT I ENGINEER</span>
            <h2 className={`text-4xl sm:text-5xl font-black ${themeClasses.heading} tracking-tight transition-colors duration-700`}>Enterprise Capabilities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesOffered.map((srv, idx) => (
              <motion.div
                key={srv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`${themeClasses.cardStrong} border ${srv.border} rounded-3xl p-8 flex flex-col justify-between shadow-xl transition-all duration-300 relative overflow-hidden`}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className={`p-4 rounded-2xl ${themeClasses.iconBox} border`}>{srv.icon}</div>
                    <span className={`text-[11px] font-mono px-3.5 py-1 rounded-full ${themeClasses.chip} border transition-colors duration-700`}>{srv.tag}</span>
                  </div>
                  <h3 className={`text-2xl font-extrabold ${themeClasses.heading} mb-3`}>{srv.title}</h3>
                  <p className={`${themeClasses.muted} text-sm leading-relaxed font-normal`}>{srv.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className={`py-36 px-6 border-t ${themeClasses.border} ${themeClasses.sectionAlt} relative transition-colors duration-700`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="space-y-3">
              <span className={`text-xs font-mono ${themeClasses.accent} uppercase tracking-widest`}>TECHNICAL ARSENAL</span>
              <h2 className={`text-4xl sm:text-5xl font-black ${themeClasses.heading}`}>Skills & Technologies</h2>
            </div>
            <div className={`flex flex-wrap gap-2 p-1.5 ${themeClasses.card} border rounded-2xl`}>
              {["All", "Frontend", "Backend & DB", "Core & Systems"].map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => { setFilter(cat); playPopSound(); }}
                  className={`px-5 py-2.5 rounded-xl text-xs font-mono transition-all ${filter === cat ? `${isDark ? "bg-cyan-500" : "bg-amber-400"} text-slate-950 font-extrabold shadow-lg` : `${themeClasses.muted}`}`}
                >
                  {cat}
                </motion.button>
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
                  className={`${themeClasses.card} border rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg`}
                >
                  <div className={`p-4 rounded-xl ${themeClasses.iconBox} border mb-4`}>{tech.icon}</div>
                  <span className={`font-extrabold text-sm ${themeClasses.body}`}>{tech.name}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section id="contact" className={`py-36 px-6 border-t ${themeClasses.border} relative`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className={`text-xs font-mono ${themeClasses.accent} uppercase tracking-widest`}>SECURE TRANSMISSION</span>
              <h2 className={`text-4xl sm:text-6xl font-black ${themeClasses.heading}`}>Initiate a Secure Dialogue.</h2>
            </div>
            <div className={`p-8 rounded-3xl ${themeClasses.cardStrong} border ${themeClasses.body} text-base shadow-xl`}>
              "I manage client deliverables with strict personal accountability. I guarantee prompt communications, transparent development cycles, and robust software architectures."
            </div>
            <div className="space-y-4 pt-2 font-mono">
              <div onClick={() => copyToClipboard('+9779705974665', 'phone')} className={`flex items-center justify-between p-5 rounded-2xl ${themeClasses.card} border cursor-pointer`}>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${themeClasses.accentSoft}`}><Phone className="w-5 h-5" /></div>
                  <div><p className={`text-xs ${themeClasses.faint} font-bold`}>DIRECT LINE</p><p className={`text-sm font-extrabold ${themeClasses.heading}`}>+977 9705974665</p></div>
                </div>
                {copiedPhone ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className={`w-4 h-4 ${themeClasses.faint}`} />}
              </div>
            </div>
          </div>
          <motion.div className={`lg:col-span-6 ${themeClasses.cardStrong} border-2 rounded-3xl p-10 shadow-2xl`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Name" className={`w-full ${themeClasses.input} border rounded-xl px-5 py-4 text-sm`} />
              <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Email" className={`w-full ${themeClasses.input} border rounded-xl px-5 py-4 text-sm`} />
              <textarea rows={5} required value={formData.scope} onChange={(e) => setFormData({...formData, scope: e.target.value})} placeholder="Project Details" className={`w-full ${themeClasses.input} border rounded-xl px-5 py-4 text-sm resize-none`} />
              <button type="submit" disabled={formStatus.loading} className={`w-full py-4 rounded-xl bg-gradient-to-r ${themeClasses.primaryButton} font-black text-xs uppercase`}>
                {formStatus.loading ? "Transmitting..." : "Transmit"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Companion mousePos={mousePos} isJumping={isJumping} isDark={isDark} />
    </div>
  );
}