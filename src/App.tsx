import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Research from '@/components/Research';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import CustomizePanel from '@/components/CustomizePanel';
import CursorGlow from '@/components/CursorGlow';
import { usePortfolioData } from '@/lib/hooks';

export default function App() {
  const { data, loading, save } = usePortfolioData();
  const [customizeOpen, setCustomizeOpen] = useState(false);

  const accent = data.theme.accentColor;
  const accent2 = data.theme.accentColor2;

  // Set CSS variables for accent colors so any component can use them
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent);
    document.documentElement.style.setProperty('--accent2', accent2);
  }, [accent, accent2]);

  const bgColor = useMemo(
    () => `radial-gradient(ellipse 80% 60% at 50% 0%, ${accent}10, transparent 60%)`,
    [accent],
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink-950">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 z-0" style={{ background: bgColor }} />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-30">
        <div className="absolute left-[-10%] top-[20%] h-[400px] w-[400px] animate-blob rounded-full bg-liquid-500/10 blur-3xl" />
        <div className="absolute right-[-10%] top-[50%] h-[500px] w-[500px] animate-blob rounded-full bg-coral-500/10 blur-3xl" style={{ animationDelay: '3s' }} />
        <div className="absolute left-[30%] bottom-[10%] h-[350px] w-[350px] animate-blob rounded-full bg-liquid-400/10 blur-3xl" style={{ animationDelay: '6s' }} />
      </div>

      <CursorGlow color={accent} />

      <AnimatePresence>
        {loading && <LoadingScreen accent={accent} />}
      </AnimatePresence>

      <div className="relative z-10">
        <Navbar accent={accent} onEditClick={() => setCustomizeOpen(true)} />

        <main>
          <Hero data={data} accent={accent} />
          <About data={data} accent={accent} />
          <Skills data={data} accent={accent} />
          <Projects data={data} accent={accent} />
          <Research data={data} accent={accent} />
          <Certifications data={data} accent={accent} />
          <Contact data={data} accent={accent} />
        </main>
      </div>

      <CustomizePanel
        open={customizeOpen}
        onClose={() => setCustomizeOpen(false)}
        data={data}
        onSave={save}
      />
    </div>
  );
}

function LoadingScreen({ accent }: { accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-20 w-20">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: `2px solid ${accent}30` }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-t-2"
            style={{ borderColor: accent }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-3 rounded-full"
            style={{ background: `linear-gradient(135deg, ${accent}, #ff4d6d)` }}
            animate={{ scale: [1, 0.85, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="font-display text-sm font-medium uppercase tracking-[0.3em] text-white/50"
        >
          Loading
        </motion.p>
      </div>
    </motion.div>
  );
}
