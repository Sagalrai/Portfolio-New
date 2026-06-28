import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import Background3D from "./components/Background3D";
import {
  Shield, Server, Code2, Database, Cpu,
  ShoppingCart, GraduationCap, Utensils, CalendarCheck, Briefcase,
  Phone, Copy, Check, Terminal, Layers, Globe, Zap, Sparkles, ArrowRight, Lock,
  Moon, Sun
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
  } catch { }
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
  { title: "E-Commerce Architectures", desc: "High-conversion digital storefronts built with lightning-fast product querying, secure payment gateways, and automated inventory management.", icon: <ShoppingCart className="w-6 h-6 text-cyan-400" />, tag: "Retail & Sales", border: "hover:border-cyan-500/50" },
  { title: "Campus & LMS Portals", desc: "Comprehensive institutional software featuring real-time grading ledgers, secure fee processing, notice distribution, and faculty management dashboards.", icon: <GraduationCap className="w-6 h-6 text-purple-400" />, tag: "Education", border: "hover:border-purple-500/50" },
  { title: "Hospitality & POS Engines", desc: "Dynamic interactive menus, table reservation engines, and instantaneous kitchen order routing built for zero-latency restaurant operations.", icon: <Utensils className="w-6 h-6 text-emerald-400" />, tag: "Hospitality", border: "hover:border-emerald-500/50" },
  { title: "Automated Booking Systems", desc: "Flawless appointment scheduling infrastructure equipped with multi-timezone synchronization, SMS reminders, and calendar integrations.", icon: <CalendarCheck className="w-6 h-6 text-amber-400" />, tag: "Service Industry", border: "hover:border-amber-500/50" },
  { title: "Executive Web Footprints", desc: "Premium, ultra-fast minimalist web portfolios designed to establish undisputed market authority for elite corporate agencies and public figures.", icon: <Briefcase className="w-6 h-6 text-rose-400" />, tag: "Enterprise", border: "hover:border-rose-500/50" },
  { title: "Application Hardening", desc: "Subjecting codebase architectures to rigorous offensive security auditing to neutralize SQL injection, cross-site scripting, and unauthorized API scraping.", icon: <Shield className="w-6 h-6 text-indigo-400" />, tag: "Cybersecurity", border: "hover:border-indigo-500/50" },
];

const heroStats = [
  { value: "2+", label: "Years", detail: "full-stack builds" },
  { value: "12", label: "Core tools", detail: "frontend to systems" },
  { value: "100%", label: "Focus", detail: "secure delivery" },
];

const heroSignals = [
  { label: "React interfaces", icon: <Code2 className="w-4 h-4" /> },
  { label: "API architecture", icon: <Server className="w-4 h-4" /> },
  { label: "Database design", icon: <Database className="w-4 h-4" /> },
  { label: "Security review", icon: <Shield className="w-4 h-4" /> },
];

const orbitBadges = [
  { label: "React", className: "left-0 top-8", delay: 0 },
  { label: "Node", className: "right-0 top-14", delay: 0.25 },
  { label: "SQL", className: "left-3 bottom-20", delay: 0.5 },
  { label: "C++", className: "right-4 bottom-10", delay: 0.75 },
];

const heroCodeSnippets = [
  "const secure = true;",
  "npm run build",
  "api.status(200)",
  "db.index({ speed: 1 })",
];

const processSteps = [
  "Audit",
  "Design",
  "Build",
  "Harden",
  "Launch",
];

const typewriterPhrases = [
  "I build secure full-stack systems.",
  "I craft fast React experiences.",
  "I harden APIs before launch.",
  "I connect software with hardware.",
];

const TypewriterText = ({ phrases, isDark }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const isComplete = displayText === currentPhrase;
    const isEmpty = displayText === "";
    const delay = isComplete ? 1300 : isDeleting ? 34 : 58;

    const timeout = setTimeout(() => {
      if (!isDeleting && isComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && isEmpty) {
        setIsDeleting(false);
        setPhraseIndex((current) => (current + 1) % phrases.length);
        return;
      }

      setDisplayText((current) => (
        isDeleting
          ? currentPhrase.slice(0, current.length - 1)
          : currentPhrase.slice(0, current.length + 1)
      ));
    }, delay);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex, phrases]);

  return (
    <span className="inline-flex min-h-7 items-center">
      <span>{displayText}</span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.85, repeat: Infinity }}
        className={`ml-1 inline-block h-6 w-0.5 ${isDark ? "bg-cyan-400" : "bg-amber-500"}`}
      />
    </span>
  );
};

const Companion = ({ mousePos, isJumping, isDark }) => {
  const [jokeIdx, setJokeIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setJokeIdx((prev) => (prev + 1) % jokes.length), 9000);
    return () => clearInterval(interval);
  }, []);

  const eyeX = ((mousePos.x / window.innerWidth) - 0.5) * 10;
  const eyeY = ((mousePos.y / window.innerHeight) - 0.5) * 10;

  return (
    <div className="fixed bottom-6 right-6 z-50 hidden md:flex flex-col items-end pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={jokeIdx}
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.8 }}
          className={`mb-3 w-64 border-2 text-xs p-3.5 rounded-2xl shadow-2xl backdrop-blur-md pointer-events-auto cursor-pointer relative transition-colors duration-700 ${isDark
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
          <div className={`absolute -bottom-2 right-10 w-4 h-4 border-b-2 border-r-2 rotate-45 transition-colors duration-700 ${isDark ? "bg-slate-900 border-cyan-500/60" : "bg-white border-amber-400/70"
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
  const [filter, setFilter] = useState("All");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', scope: '' });
  const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: false });
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.2 });
  const pageGlowY = useTransform(smoothScrollProgress, [0, 1], ["0%", "75%"]);
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
    <div className={`min-h-screen ${themeClasses.page} selection:text-black font-sans relative isolate overflow-x-hidden antialiased transition-colors duration-700`} ref={scrollRef}>
      <motion.div
        style={{ scaleX: smoothScrollProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 origin-left z-50 transition-colors duration-700"
      />

      <Background3D isDark={isDark} />

      <motion.div
        aria-hidden="true"
        style={{
          y: pageGlowY,
          background: `radial-gradient(circle at ${mousePos.x || 50}px ${mousePos.y || 50}px, ${isDark ? "rgba(34,211,238,0.18)" : "rgba(245,158,11,0.18)"}, transparent 28rem)`,
        }}
        className="fixed inset-0 z-[1] pointer-events-none mix-blend-screen"
      />

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
              className={`h-11 w-11 rounded-full border flex items-center justify-center transition-all duration-500 hover:scale-105 ${isDark ? "bg-slate-900 text-cyan-300 border-slate-700 shadow-lg shadow-cyan-500/10" : "bg-amber-50 text-amber-600 border-amber-200 shadow-lg shadow-amber-500/20"
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

      <section id="hero" className="min-h-screen flex items-center justify-center pt-24 sm:pt-28 pb-16 px-6 relative z-10 overflow-hidden">
        <motion.div
          aria-hidden="true"
          animate={{ opacity: [0.22, 0.5, 0.22], scale: [1, 1.06, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute left-1/2 top-28 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl ${isDark ? "bg-cyan-500/20" : "bg-amber-300/30"}`}
        />
        <div className="absolute inset-0 hidden lg:block pointer-events-none">
          {heroCodeSnippets.map((snippet, index) => (
            <motion.div
              key={snippet}
              initial={{ opacity: 0, y: 20, rotate: index % 2 ? 5 : -5 }}
              animate={{
                opacity: [0.18, 0.52, 0.18],
                y: [0, index % 2 ? -18 : 18, 0],
                rotate: [index % 2 ? 5 : -5, index % 2 ? -3 : 3, index % 2 ? 5 : -5],
              }}
              transition={{ duration: 7 + index, repeat: Infinity, delay: index * 0.5, ease: "easeInOut" }}
              className={`absolute rounded-xl border px-3 py-2 font-mono text-xs backdrop-blur-md ${themeClasses.chip}`}
              style={{
                left: `${12 + index * 21}%`,
                top: `${24 + (index % 2) * 50}%`,
              }}
            >
              {snippet}
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <motion.div
            initial={{ scale: 0.92, opacity: 0, x: -30 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 90 }}
            className="lg:col-span-5 flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[28rem] min-h-[31rem] sm:min-h-[34rem] flex items-center justify-center">
              <motion.div
                aria-hidden="true"
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                className={`absolute h-[25rem] w-[25rem] rounded-full border border-dashed ${isDark ? "border-cyan-400/20" : "border-amber-400/30"}`}
              />

              {orbitBadges.map((badge) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                  transition={{ opacity: { delay: 0.7 + badge.delay }, scale: { delay: 0.7 + badge.delay }, y: { duration: 3.8, repeat: Infinity, delay: badge.delay } }}
                  className={`absolute ${badge.className} hidden sm:flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-mono font-bold backdrop-blur-md ${themeClasses.chip}`}
                >
                  <span className={`h-2 w-2 rounded-full ${isDark ? "bg-cyan-400" : "bg-amber-500"}`} />
                  {badge.label}
                </motion.div>
              ))}

              <motion.div
                animate={{ y: [0, -16, 0], rotate: [0, 1.5, -1.5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className={`relative w-72 h-72 sm:w-96 sm:h-96 rounded-full p-1.5 bg-gradient-to-tr ${isDark ? "from-cyan-500 via-indigo-500 to-emerald-400 shadow-cyan-500/20" : "from-amber-400 via-orange-400 to-sky-400 shadow-amber-500/25"} shadow-2xl group transition-colors duration-700`}
              >
                <motion.div
                  animate={{ opacity: [0.35, 0.9, 0.35] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                  className={`absolute -inset-5 rounded-full blur-2xl ${isDark ? "bg-cyan-500/15" : "bg-amber-300/25"}`}
                />
                <div className={`relative w-full h-full rounded-full overflow-hidden ${themeClasses.card} border-4 ${isDark ? "border-[#030712]" : "border-white"} flex items-center justify-center transition-colors duration-700`}>
                  <img src="https://scontent.fbir1-1.fna.fbcdn.net/v/t1.15752-9/728195566_1358907119641663_6883743813025796832_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_ohc=2RKbk0fwNEkQ7kNvwHhRvLm&_nc_oc=AdrsQN6tu05hadE_dveOMV5yII8XFp8C2S6VqzQzCmCzQ9xRDDY_prSYXa5VTAeVxsE&_nc_ad=z-m&_nc_cid=5011&_nc_zt=23&_nc_ht=scontent.fbir1-1.fna&_nc_ss=7a22e&oh=03_Q7cD5gHvhqDCwdrOe6y_7DUk9qDNIZQHhHKlB_JHIMNDOjDkcQ&oe=6A62C2C6" alt="Sagal Rai" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <motion.div
                    aria-hidden="true"
                    animate={{ y: ["-120%", "120%"] }}
                    transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-white/18 to-transparent"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className={`absolute bottom-0 left-1/2 w-[min(24rem,92vw)] -translate-x-1/2 rounded-2xl border p-4 backdrop-blur-xl ${themeClasses.cardStrong}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className={`text-[10px] font-mono uppercase tracking-widest ${themeClasses.faint}`}>Current mode</p>
                    <p className={`mt-1 text-sm font-black ${themeClasses.heading}`}>Building production-ready systems</p>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.16, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    className="h-3 w-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/40"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-7 text-center lg:text-left">
            <div className="mx-auto lg:mx-0 max-w-3xl space-y-6">
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
                className={`text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight ${themeClasses.heading} leading-[1.02] transition-colors duration-700`}
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
                className={`max-w-2xl text-lg sm:text-xl ${themeClasses.body} font-normal leading-relaxed transition-colors duration-700`}
              >
                I architect high-fidelity digital infrastructure. Combining over 2 years of full-stack engineering with raw bare-metal hardware control and rigorous offensive penetration testing methodologies.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.48 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3"
              >
                {heroStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -5, scale: 1.02 }}
                    animate={{ y: [0, index % 2 ? 6 : -6, 0] }}
                    transition={{ y: { duration: 5 + index, repeat: Infinity, ease: "easeInOut" } }}
                    className={`rounded-2xl border p-4 ${themeClasses.cardStrong}`}
                  >
                    <p className={`text-3xl font-black ${index === 1 ? "text-emerald-400" : themeClasses.accent}`}>{stat.value}</p>
                    <p className={`mt-1 text-xs font-mono uppercase tracking-widest ${themeClasses.heading}`}>{stat.label}</p>
                    <p className={`mt-1 text-xs ${themeClasses.muted}`}>{stat.detail}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.56 }}
                className="flex flex-wrap gap-4 justify-center lg:justify-start pt-1"
              >
                <motion.a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); scrollToSection('contact'); playPopSound(); }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-7 sm:px-8 py-4 rounded-2xl bg-gradient-to-r ${themeClasses.primaryButton} font-extrabold text-sm tracking-wide transition-all shadow-xl flex items-center gap-2 cursor-pointer`}
                >
                  <span>Secure Your Project</span><ArrowRight className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="#services"
                  onClick={(e) => { e.preventDefault(); scrollToSection('services'); playPopSound(); }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-7 sm:px-8 py-4 rounded-2xl ${themeClasses.secondaryButton} border font-bold text-sm tracking-wide transition-all flex items-center gap-2 cursor-pointer`}
                >
                  <span>View Capabilities</span>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-4"
          >
            <div className={`lg:col-span-8 overflow-hidden rounded-2xl border ${themeClasses.cardStrong}`}>
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="flex w-max gap-3 px-4 py-4"
              >
                {[...heroSignals, ...heroSignals].map((signal, index) => (
                  <div key={`${signal.label}-${index}`} className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${themeClasses.chip}`}>
                    {signal.icon}
                    <span>{signal.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
            <motion.div
              animate={{ opacity: [0.82, 1, 0.82] }}
              transition={{ duration: 2.6, repeat: Infinity }}
              className={`lg:col-span-4 rounded-2xl border p-4 font-mono text-xs ${themeClasses.cardStrong}`}
            >
              <div className="flex items-center gap-2">
                <Terminal className={`w-4 h-4 ${themeClasses.accent}`} />
                <span className={themeClasses.faint}>deploy_status</span>
                <span className="ml-auto text-emerald-400">online</span>
              </div>
              <div className={`mt-3 h-2 overflow-hidden rounded-full ${isDark ? "bg-slate-800" : "bg-sky-100"}`}>
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className={`h-full w-1/2 rounded-full bg-gradient-to-r ${isDark ? "from-cyan-500 to-emerald-400" : "from-amber-400 to-sky-400"}`}
                />
              </div>
            </motion.div>
            <div className={`lg:col-span-12 rounded-2xl border p-3 sm:p-4 ${themeClasses.cardStrong}`}>
              <div className="grid grid-cols-5 gap-2">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.85 + index * 0.08 }}
                    className="relative flex flex-col items-center gap-2 text-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.22, 1], boxShadow: isDark ? ["0 0 0 rgba(34,211,238,0)", "0 0 28px rgba(34,211,238,0.35)", "0 0 0 rgba(34,211,238,0)"] : ["0 0 0 rgba(245,158,11,0)", "0 0 28px rgba(245,158,11,0.35)", "0 0 0 rgba(245,158,11,0)"] }}
                      transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.28 }}
                      className={`h-3 w-3 rounded-full ${isDark ? "bg-cyan-400" : "bg-amber-500"}`}
                    />
                    <span className={`text-[10px] sm:text-xs font-mono uppercase tracking-widest ${themeClasses.muted}`}>{step}</span>
                    {index < processSteps.length - 1 && (
                      <span className={`absolute left-1/2 top-1.5 h-px w-full ${isDark ? "bg-cyan-400/20" : "bg-amber-400/30"}`} />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      <section id="about" className={`py-36 px-6 border-t ${themeClasses.border} ${themeClasses.sectionAlt} relative z-10 transition-colors duration-700`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-7 space-y-6">
            <motion.span
              whileInView={{ x: [0, 8, 0] }}
              transition={{ duration: 1.2 }}
              className={`text-xs font-mono ${themeClasses.accent} uppercase tracking-widest flex items-center gap-2 transition-colors duration-700`}
            >
              <Shield className="w-4 h-4" /><span>UNCOMPROMISING ARCHITECTURE</span>
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${themeClasses.heading} leading-tight transition-colors duration-700`}
            >
              Building software through the rigorous lens of a security auditor.
            </motion.h2>
            <div className={`space-y-4 ${themeClasses.body} leading-relaxed font-normal text-base sm:text-lg transition-colors duration-700`}>
              <p>Most developers construct applications solely for the "happy path," leaving gaping structural vulnerabilities beneath pretty interfaces. As an offensive security specialist and Full Stack Developer, I anticipate edge cases, injection vectors, and logic flaws before writing a single line of production code.</p>
              <p>My technical reach spans from buttery-smooth React interfaces down to low-level hardware instructions. Because I program bare-metal microcontrollers and build custom Arduino circuitry, I possess an unshakeable grasp of how high-level web code interacts with physical memory and server processors.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {["Threats", "Latency", "UX", "Scale"].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                  className={`rounded-xl border p-3 text-center text-xs font-mono uppercase tracking-widest ${themeClasses.card}`}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="lg:col-span-5 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.03, rotate: 1 }}
              className={`relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border-2 ${themeClasses.card} shadow-2xl transition-colors duration-700`}
            >
              <img src="https://scontent.fbir1-1.fna.fbcdn.net/v/t1.15752-9/730373184_1323060453264145_9085179104798166664_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=fc17b8&_nc_ohc=2ZbxzTnJHo8Q7kNvwHCkBDn&_nc_oc=Adq4vaOnrOwOKHb-Se2y6WYkjal4HkumqR6aPQa-BrJl1RPA-iCiIKfyNKcycG2dF3A&_nc_ad=z-m&_nc_cid=5011&_nc_zt=23&_nc_ht=scontent.fbir1-1.fna&_nc_ss=7a22e&oh=03_Q7cD5gGRghnTrjXZZLaR2We2YD2Nhu0aQq0rBBtNXu_a7rKKUA&oe=6A62F87C" alt="Sagal Rai Workspace" className="w-full h-full object-cover" />
              <motion.div
                aria-hidden="true"
                animate={{ y: ["-110%", "110%"] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-x-0 h-28 bg-gradient-to-b from-transparent via-white/16 to-transparent"
              />
              <div className={`absolute bottom-4 left-4 right-4 rounded-2xl border p-4 backdrop-blur-xl ${themeClasses.cardStrong}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono uppercase tracking-widest ${themeClasses.faint}`}>workspace</span>
                  <motion.span
                    animate={{ opacity: [0.35, 1, 0.35] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="h-2.5 w-2.5 rounded-full bg-emerald-400"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="services" className={`py-36 px-6 border-t ${themeClasses.border} relative z-10 transition-colors duration-700`}>
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
                whileHover={{ y: -10, rotateX: 2, rotateY: idx % 2 ? -2 : 2 }}
                className={`${themeClasses.cardStrong} border ${srv.border} rounded-3xl p-8 flex flex-col justify-between shadow-xl transition-all duration-300 relative overflow-hidden group`}
              >
                <motion.div
                  aria-hidden="true"
                  animate={{ x: ["-120%", "130%"] }}
                  transition={{ duration: 4, repeat: Infinity, delay: idx * 0.35, ease: "easeInOut" }}
                  className={`absolute top-0 h-px w-2/3 bg-gradient-to-r from-transparent ${isDark ? "via-cyan-400/70" : "via-amber-400/80"} to-transparent`}
                />
                <motion.div
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className={`absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl ${isDark ? "bg-cyan-500/20" : "bg-amber-300/30"}`}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <motion.div
                      whileHover={{ rotate: [0, -8, 8, 0], scale: 1.12 }}
                      transition={{ duration: 0.5 }}
                      className={`p-4 rounded-2xl ${themeClasses.iconBox} border`}
                    >
                      {srv.icon}
                    </motion.div>
                    <span className={`text-[11px] font-mono px-3.5 py-1 rounded-full ${themeClasses.chip} border transition-colors duration-700`}>{srv.tag}</span>
                  </div>
                  <h3 className={`text-2xl font-extrabold ${themeClasses.heading} mb-3`}>{srv.title}</h3>
                  <p className={`${themeClasses.muted} text-sm leading-relaxed font-normal`}>{srv.desc}</p>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.12 + 0.2, duration: 0.8 }}
                    className={`mt-6 h-px bg-gradient-to-r ${isDark ? "from-cyan-400/0 via-cyan-400/60 to-transparent" : "from-amber-400/0 via-amber-400/70 to-transparent"}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className={`py-36 px-6 border-t ${themeClasses.border} ${themeClasses.sectionAlt} relative z-10 transition-colors duration-700`}>
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
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
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
                  whileHover={{ y: -8, scale: 1.04 }}
                  className={`${themeClasses.card} border rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden group`}
                >
                  <motion.div
                    aria-hidden="true"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className={`absolute inset-0 ${isDark ? "bg-cyan-500/5" : "bg-amber-300/15"}`}
                  />
                  <motion.div
                    animate={{ rotate: [0, 2, -2, 0] }}
                    transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                    className={`relative p-4 rounded-xl ${themeClasses.iconBox} border mb-4 group-hover:shadow-lg ${isDark ? "group-hover:shadow-cyan-500/20" : "group-hover:shadow-amber-400/25"}`}
                  >
                    {tech.icon}
                  </motion.div>
                  <span className={`font-extrabold text-sm ${themeClasses.body}`}>{tech.name}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section id="contact" className={`py-36 px-6 border-t ${themeClasses.border} relative z-10`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className={`text-xs font-mono ${themeClasses.accent} uppercase tracking-widest`}>SECURE TRANSMISSION</span>
              <h2 className={`text-4xl sm:text-6xl font-black ${themeClasses.heading}`}>Initiate a Secure Dialogue.</h2>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className={`p-8 rounded-3xl ${themeClasses.cardStrong} border ${themeClasses.body} text-base shadow-xl relative overflow-hidden`}
            >
              <motion.div
                aria-hidden="true"
                animate={{ x: ["-120%", "130%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute top-0 h-px w-3/4 bg-gradient-to-r from-transparent ${isDark ? "via-cyan-400/70" : "via-amber-400/80"} to-transparent`}
              />
              "I manage client deliverables with strict personal accountability. I guarantee prompt communications, transparent development cycles, and robust software architectures."
            </motion.div>
            <div className="space-y-4 pt-2 font-mono">
              <motion.div
                onClick={() => copyToClipboard('+9779705974665', 'phone')}
                whileHover={{ x: 8, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-between p-5 rounded-2xl ${themeClasses.card} border cursor-pointer`}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ rotate: copiedPhone ? [0, -12, 12, 0] : 0 }}
                    className={`p-3 rounded-xl ${themeClasses.accentSoft}`}
                  >
                    <Phone className="w-5 h-5" />
                  </motion.div>
                  <div><p className={`text-xs ${themeClasses.faint} font-bold`}>DIRECT LINE</p><p className={`text-sm font-extrabold ${themeClasses.heading}`}>+977 9705974665</p></div>
                </div>
                {copiedPhone ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className={`w-4 h-4 ${themeClasses.faint}`} />}
              </motion.div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className={`lg:col-span-6 ${themeClasses.cardStrong} border-2 rounded-3xl p-10 shadow-2xl relative overflow-hidden`}
          >
            <motion.div
              aria-hidden="true"
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              className={`absolute -right-20 -top-20 h-44 w-44 rounded-full border ${isDark ? "border-cyan-400/15" : "border-amber-400/25"}`}
            />
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.input whileFocus={{ scale: 1.01 }} type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Name" className={`w-full ${themeClasses.input} border rounded-xl px-5 py-4 text-sm relative z-10`} />
              <motion.input whileFocus={{ scale: 1.01 }} type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" className={`w-full ${themeClasses.input} border rounded-xl px-5 py-4 text-sm relative z-10`} />
              <motion.textarea whileFocus={{ scale: 1.01 }} rows={5} required value={formData.scope} onChange={(e) => setFormData({ ...formData, scope: e.target.value })} placeholder="Project Details" className={`w-full ${themeClasses.input} border rounded-xl px-5 py-4 text-sm resize-none relative z-10`} />
              <motion.button
                type="submit"
                disabled={formStatus.loading}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-xl bg-gradient-to-r ${themeClasses.primaryButton} font-black text-xs uppercase relative z-10`}
              >
                {formStatus.loading ? "Transmitting..." : "Transmit"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      <Companion mousePos={mousePos} isJumping={isJumping} isDark={isDark} />
    </div>
  );
}