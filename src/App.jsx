import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  ChevronRight,
  Code2,
  BrainCircuit,
  Database,
  Globe,
  Terminal,
  Cpu,
  Award,
  Briefcase,
  User,
  Coffee,
  Instagram,
  Twitter,
  ArrowUpRight,
  Menu,
  X
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-display font-bold tracking-tight"
        >
          MP.
        </motion.div>

        <div className="hidden md:flex gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-primary transition-colors text-gray-600">
              {link.name}
            </a>
          ))}
        </div>

        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4 text-lg font-medium">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-gray-800">
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const InteractiveHero = () => {
  const canvasRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();

    const dots = [];
    for (let i = 0; i < 100; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';

      dots.forEach(dot => {
        dot.x += dot.speedX;
        dot.y += dot.speedY;

        if (dot.x < 0 || dot.x > canvas.width) dot.speedX *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.speedY *= -1;

        const dx = mousePosition.current.x - dot.x;
        const dy = mousePosition.current.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(mousePosition.current.x, mousePosition.current.y);
          ctx.strokeStyle = `rgba(59, 130, 246, ${1 - dist / 150})`;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" />;
}

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#fafafa]">
      <InteractiveHero />
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-primary/5 text-primary text-sm font-semibold mb-6">
              Available for Internships & Projects
            </span>
            <h1 className="text-6xl md:text-8xl font-display font-extrabold text-foreground leading-[1.1] mb-8 tracking-tight">
              Madhav <span className="text-gray-400">Pachaury</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-display font-medium text-gray-500 mb-8 max-w-2xl leading-relaxed">
              Software Engineer | AI & Machine Learning Developer | Data Analytics Professional
            </h2>
            <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl leading-relaxed">
              Innovative engineer building intelligent, data-driven systems. Delivering models with <span className="text-foreground font-semibold">92% accuracy</span> and solving <span className="text-foreground font-semibold">300+ LeetCode</span> challenges.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-foreground text-background rounded-full font-bold shadow-lg flex items-center gap-2 group"
              >
                View My Work
                <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
              <div className="flex items-center gap-6 px-4">
                <a href="https://github.com/madhavcodeer" target="_blank" className="text-gray-400 hover:text-foreground transition-colors"><Github size={24} /></a>
                <a href="https://www.linkedin.com/in/madhav-pachaury/" target="_blank" className="text-gray-400 hover:text-foreground transition-colors"><Linkedin size={24} /></a>
                <a href="mailto:madhavpachaury1@gmail.com" className="text-gray-400 hover:text-foreground transition-colors"><Mail size={24} /></a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-300 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-current rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

const InteractiveAvatar = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const avatarRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (avatarRef.current) {
        const rect = avatarRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate relative position (-1 to 1)
        const relX = (e.clientX - centerX) / (window.innerWidth / 2);
        const relY = (e.clientY - centerY) / (window.innerHeight / 2);

        setMousePos({
          x: Math.max(-1, Math.min(1, relX)),
          y: Math.max(-1, Math.min(1, relY))
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation values
  const headRotateX = mousePos.y * -5;
  const headRotateY = mousePos.x * 8;
  const pupilX = mousePos.x * 6;
  const pupilY = mousePos.y * 4;
  const mouthScale = 1 + Math.abs(mousePos.x) * 0.2;

  return (
    <div ref={avatarRef} className="w-full h-full flex items-center justify-center p-8 perspective-1000">
      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full max-w-[400px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          rotateX: headRotateX,
          rotateY: headRotateY
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      >
        {/* Shadow Background */}
        <ellipse cx="100" cy="180" rx="60" ry="10" fill="rgba(0,0,0,0.05)" />

        {/* Neck */}
        <path d="M85 150 Q100 165 115 150 L110 175 Q100 185 90 175 Z" fill="#E0F2FE" stroke="#7e57c2" strokeWidth="2" />

        {/* Face Shape */}
        <path d="M60 70 Q60 40 100 40 Q140 40 140 70 L140 120 Q140 160 100 160 Q60 160 60 120 Z" fill="#E0F2FE" stroke="#7e57c2" strokeWidth="3" />

        {/* Hair - Stylized like the image */}
        <path d="M60 75 Q55 45 75 35 Q85 20 105 25 Q120 20 135 35 Q145 45 140 75 Q130 65 120 70 Q110 60 100 70 Q90 60 80 70 Q70 65 60 75" fill="#bae6fd" stroke="#7e57c2" strokeWidth="2" />

        {/* Ears */}
        <circle cx="58" cy="100" r="10" fill="#E0F2FE" stroke="#7e57c2" strokeWidth="2" />
        <circle cx="142" cy="100" r="10" fill="#E0F2FE" stroke="#7e57c2" strokeWidth="2" />

        {/* Eyes White */}
        <ellipse cx="80" cy="95" rx="15" ry="12" fill="white" stroke="#7e57c2" strokeWidth="2" />
        <ellipse cx="120" cy="95" rx="15" ry="12" fill="white" stroke="#7e57c2" strokeWidth="2" />

        {/* Pupils */}
        <motion.circle
          animate={{ cx: 80 + pupilX, cy: 95 + pupilY }}
          r="4" fill="#7e57c2"
        />
        <motion.circle
          animate={{ cx: 120 + pupilX, cy: 95 + pupilY }}
          r="4" fill="#7e57c2"
        />

        {/* Glasses Frame */}
        <rect x="62" y="85" width="37" height="25" rx="8" fill="none" stroke="#7e57c2" strokeWidth="4" opacity="0.8" />
        <rect x="101" y="85" width="37" height="25" rx="8" fill="none" stroke="#7e57c2" strokeWidth="4" opacity="0.8" />
        <line x1="99" y1="95" x2="101" y2="95" stroke="#7e57c2" strokeWidth="4" />
        <line x1="55" y1="95" x2="62" y2="95" stroke="#7e57c2" strokeWidth="2" />
        <line x1="138" y1="95" x2="145" y2="95" stroke="#7e57c2" strokeWidth="2" />

        {/* Nose */}
        <path d="M100 105 Q108 125 100 130 Q92 125 100 105" fill="#bae6fd" stroke="#7e57c2" strokeWidth="2" />

        {/* Mouth */}
        <motion.path
          animate={{ d: `M85 145 Q100 ${145 + Math.abs(mousePos.x) * 10} 115 145` }}
          fill="none" stroke="#7e57c2" strokeWidth="3" strokeLinecap="round"
        />

        {/* Brows */}
        <motion.path
          animate={{ d: `M70 ${80 + mousePos.y * 2} Q80 ${75 + mousePos.y * 2} 90 ${80 + mousePos.y * 2}` }}
          fill="none" stroke="#7e57c2" strokeWidth="3"
        />
        <motion.path
          animate={{ d: `M110 ${80 + mousePos.y * 2} Q120 ${75 + mousePos.y * 2} 130 ${80 + mousePos.y * 2}` }}
          fill="none" stroke="#7e57c2" strokeWidth="3"
        />
      </motion.svg>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden shadow-2xl relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent group-hover:opacity-0 transition-opacity duration-500" />
              <InteractiveAvatar />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold mb-8">Engineering Intelligence</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              I am a B.Tech Computer Science & Engineering student specializing in <span className="text-foreground font-semibold">AI & Machine Learning</span> at JSS Academy of Technical Education, Noida. With a passion for bridging the gap between complex data and actionable insights, I've dedicated my career to building systems that don't just process information, but understand it.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              My academic journey began with a strong foundation, achieving <span className="text-foreground font-semibold">93% in High School</span> and <span className="text-foreground font-semibold">91% in Intermediate</span> from Rajiv International School, Mathura. Today, I maintain a <span className="text-foreground font-semibold">7.89 CGPA</span> while tackling real-world problems through intelligent automation and predictive analytics.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
              <div>
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Education</h4>
                <p className="text-foreground font-semibold">JSS Academy of Tech Ed</p>
                <p className="text-sm text-gray-500">Noida, Expected 2026</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Location</h4>
                <p className="text-foreground font-semibold">Noida, UP, India</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const Skills = () => {
  const categories = [
    {
      title: "Programming",
      icon: <Terminal className="text-primary" />,
      skills: ["Python", "Java", "JavaScript", "SQL", "C++", "HTML", "CSS"]
    },
    {
      title: "Web & Backend",
      icon: <Globe className="text-primary" />,
      skills: ["React", "Node.js", "Express", "Flask", "FastAPI", "TailwindCSS"]
    },
    {
      title: "AI / ML & Data",
      icon: <BrainCircuit className="text-primary" />,
      skills: ["TensorFlow", "PyTorch", "Scikit-Learn", "NLP", "CNN", "NumPy", "Pandas"]
    },
    {
      title: "Databases & Tools",
      icon: <Database className="text-primary" />,
      skills: ["MongoDB", "MySQL", "Git", "Docker", "Jupyter", "VS Code"]
    }
  ];

  return (
    <section id="skills" className="py-32 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <h2 className="text-4xl font-display font-bold">Toolbox of Choice</h2>
          <p className="text-gray-500 max-w-sm">Crafting digital experiences with a modern stack optimized for performance and intelligence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-6">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium border border-gray-100 italic">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const experiences = [
    {
      company: "Console.success",
      role: "Software Development Intern",
      period: "Dec 2025 – Jan 2026",
      description: "Working on project-based learning, building full-stack applications using React and Node.js. Collaborating in agile teams and delivering production-grade code.",
      type: "Remote"
    },
    {
      company: "EliteTech",
      role: "Machine Learning Intern",
      period: "July 2025 – Aug 2025",
      description: "Developed end-to-end ML projects including CNN-based Image Classification and Movie Recommendation Systems. Implemented predictive systems improving training outcomes by 90%.",
      type: "Noida"
    }
  ];

  return (
    <section id="experience" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-display font-bold mb-16">Career So Far</h2>
        <div className="max-w-4xl">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-12 pb-16 border-l-2 border-gray-100 last:pb-0"
            >
              <div className="absolute left-0 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-primary shadow-sm" />
              <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4 gap-2">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{exp.role}</h3>
                  <p className="text-primary font-medium">{exp.company}</p>
                </div>
                <div className="px-4 py-1.5 bg-gray-50 rounded-full text-sm font-medium text-gray-500">
                  {exp.period}
                </div>
              </div>
              <p className="text-gray-500 text-lg leading-relaxed max-w-3xl">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Projects = () => {
  const projects = [
    {
      title: "Healthcare Analytics Dashboard",
      tech: "React, FastAPI, Python",
      desc: "Predictive dashboard for hospital staff attrition and resource optimization using ML.",
      accuracy: "Predictive Analysis",
      icon: <Database className="text-white" />
    },
    {
      title: "CinemasAI",
      tech: "React, Neural SVD, TMDB",
      desc: "Hybrid Movie Recommendation Engine with real-time integration and explainable AI.",
      accuracy: "Hybrid Engine",
      icon: <Coffee className="text-white" />
    },
    {
      title: "Lung Cancer Detection",
      tech: "CNN, TensorFlow, Flask",
      desc: "Medical imaging system achieving 92% accuracy in early diagnosis using Deep Learning.",
      accuracy: "92% Accuracy",
      icon: <BrainCircuit className="text-white" />
    },
    {
      title: "Mady AI Assistant",
      tech: "Google Gemini 2.0, Node.js",
      desc: "Intelligent assistant with voice control, file analysis and advanced reasoning.",
      accuracy: "LLM Implementation",
      icon: <Cpu className="text-white" />
    },
    {
      title: "SmartWareX",
      tech: "AI, Route Optimization",
      desc: "Warehouse optimization system for forecasting demand and optimizing delivery routes.",
      accuracy: "Optimized Logic",
      icon: <Terminal className="text-white" />
    },
    {
      title: "Trade Predictor",
      tech: "Stock Market, Analytics",
      desc: "Forecasting stock trends using time-series analysis and real-time market data.",
      accuracy: "Real-time Data",
      icon: <TrendingUp className="text-white" />
    }
  ];

  return (
    <section id="projects" className="py-32 bg-gray-50/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <h2 className="text-4xl font-display font-bold">Featured Creations</h2>
          <a href="https://github.com/madhavcodeer" target="_blank" className="text-primary font-bold flex items-center gap-2 group italic underline-offset-4 hover:underline">
            Explore Github <ArrowUpRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.title}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col items-start gap-4 h-full"
            >
              <div className="w-14 h-14 bg-foreground rounded-2xl flex items-center justify-center mb-2 shadow-lg">
                {proj.icon}
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{proj.tech}</p>
                <h3 className="text-2xl font-bold mb-4 leading-tight">{proj.title}</h3>
                <p className="text-gray-500 leading-relaxed">{proj.desc}</p>
              </div>
              <div className="pt-6 w-full flex justify-between items-center border-t border-gray-50 mt-6">
                <span className="text-sm font-bold text-primary">{proj.accuracy}</span>
                <ArrowUpRight className="text-gray-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Achievements = () => {
  const items = [
    {
      title: "Research Publication",
      org: "IIT Roorkee",
      desc: "Published research work in collaboration with IIT Roorkee, focusing on advanced technical domains.",
      icon: <Award className="text-primary" />
    },
    {
      title: "Google Cloud Skills",
      org: "Silver Badge",
      desc: "Recognized for proficiency in Google Cloud Platform services and cloud architecture.",
      icon: <Globe className="text-primary" />
    },
    {
      title: "Quantitative Research Simulator",
      org: "J.P. Morgan",
      desc: "Completed the Quantitative Research Job Simulation, solving complex mathematical and financial problems.",
      icon: <TrendingUp className="text-primary" />
    },
    {
      title: "Core Java Certification",
      org: "Infosys Springboard",
      desc: "Professional certification validating expertise in Java programming and software design principles.",
      icon: <Code2 className="text-primary" />
    },
    {
      title: "Data Analytics Certifications",
      org: "Multiple Platforms",
      desc: "Specialized certifications in predictive modeling, statistical analysis, and data visualization.",
      icon: <Database className="text-primary" />
    },
    {
      title: "Hackathon Participant",
      org: "AI Tech Confluence 2025",
      desc: "Innovated and built AI-driven solutions in a competitive 48-hour development environment.",
      icon: <BrainCircuit className="text-primary" />
    }
  ];

  return (
    <section id="achievements" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-display font-bold mb-16">Milestones & Recognition</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-primary text-sm font-bold mb-4 uppercase tracking-wider">{item.org}</p>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-foreground text-background rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
            <div>
              <h2 className="text-5xl font-display font-bold mb-8">Let's build something intelligent.</h2>
              <p className="text-gray-400 text-lg mb-12 max-w-md">Currently seeking exciting opportunities and collaborations in AI, ML, and Software Engineering.</p>

              <div className="space-y-6">
                <a href="mailto:madhavpachaury1@gmail.com" className="flex items-center gap-4 text-xl hover:text-primary transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center"><Mail size={20} /></div>
                  madhavpachaury1@gmail.com
                </a>
                <a href="tel:+919528959861" className="flex items-center gap-4 text-xl hover:text-primary transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center"><Phone size={20} /></div>
                  +91 95289 59861
                </a>
                <div className="flex gap-4 pt-4">
                  <a href="https://www.linkedin.com/in/madhav-pachaury/" target="_blank" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Linkedin /></a>
                  <a href="https://github.com/madhavcodeer" target="_blank" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Github /></a>
                </div>
              </div>
            </div>

            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-primary transition-colors outline-none" />
              <input type="email" placeholder="Your Email" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-primary transition-colors outline-none" />
              <textarea placeholder="Your Message" rows="4" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-primary transition-colors outline-none resize-none" />
              <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-gray-100 italic">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-400">© 2026 Madhav Pachaury. All rights reserved.</p>
        <div className="flex gap-8 text-sm text-gray-400">
          <a href="#" className="hover:text-foreground transition-colors">Twitter / X</a>
          <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
          <a href="#" className="hover:text-foreground transition-colors">Dribbble</a>
        </div>
      </div>
    </footer>
  );
};

// --- Custom Components ---
const TrendingUp = (props) => (
  <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
);

export default function App() {
  return (
    <div className="selection:bg-primary/20 scroll-smooth">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  );
}
