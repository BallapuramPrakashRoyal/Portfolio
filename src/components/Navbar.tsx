import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface NavProps {
  accent: string;
  onEditClick?: () => void;
}

const links = [
  { label: 'Home', target: 'home' },
  { label: 'About', target: 'about' },
  { label: 'Skills', target: 'skills' },
  { label: 'Work', target: 'work' },
  { label: 'Research', target: 'research' },
  { label: 'Certs', target: 'certifications' },
  { label: 'Contact', target: 'contact' },
];

export default function Navbar({ accent, onEditClick }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const isClickingRef = useRef(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // If scrolled to the bottom of the page, activate contact automatically
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (atBottom && !isClickingRef.current) {
        setActive('contact');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const ids = links.map((l) => l.target);
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickingRef.current) return;
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id);
          }
        });
      },
      { threshold: 0.25, rootMargin: '-10% 0px -40% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const go = (target: string) => {
    setActive(target);
    isClickingRef.current = true;
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
    setTimeout(() => {
      isClickingRef.current = false;
    }, 850);
  };

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-50 h-0.5 w-full origin-left"
        style={{ scaleX: progress, background: `linear-gradient(90deg, ${accent}, #ff4d6d)` }}
      />

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 right-0 top-0 z-40 px-4 pt-3 sm:px-6"
      >
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
            scrolled ? 'glass-strong shadow-2xl' : 'bg-transparent'
          }`}
        >
          <button onClick={() => go('home')} className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ background: `linear-gradient(135deg, ${accent}, #ff4d6d)` }}
            >
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-base font-bold tracking-tight text-white">
              PR<span style={{ color: accent }}>.</span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const isActive = active === link.target;
              return (
                <button
                  key={link.target}
                  onClick={() => go(link.target)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-white font-semibold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, ${accent}25, rgba(255,255,255,0.06))`,
                        boxShadow: `inset 0 0 0 1px ${accent}60, 0 4px 16px -2px ${accent}30`,
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                    />
                  )}
                  {link.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 md:hidden"
              aria-label="Menu"
            >
              <div className="space-y-1.5">
                <span
                  className={`block h-0.5 w-5 bg-white transition-all ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`}
                />
                <span className={`block h-0.5 w-5 bg-white transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
                <span
                  className={`block h-0.5 w-5 bg-white transition-all ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`}
                />
              </div>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-2 max-w-6xl rounded-2xl glass-strong p-3 md:hidden"
          >
            {links.map((link) => {
              const isActive = active === link.target;
              return (
                <button
                  key={link.target}
                  onClick={() => go(link.target)}
                  className={`block w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                  style={isActive ? { color: accent } : {}}
                >
                  {link.label}
                </button>
              );
            })}
          </motion.nav>
        )}
      </motion.header>
    </>
  );
}
