import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import type { PortfolioData } from '@/lib/types';
import SkillIcon from './SkillIcon';

interface SkillsProps {
  data: PortfolioData;
  accent: string;
}

export default function Skills({ data, accent }: SkillsProps) {
  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <div
        className="absolute right-1/4 top-0 h-80 w-80 translate-x-1/2 rounded-full opacity-15 blur-3xl"
        style={{ background: `radial-gradient(circle, ${data.theme.accentColor2}, transparent 70%)` }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: accent }}>
            02 — What I work with
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Skills &amp; Tools
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {data.skills.map((group, gi) => (
            <SkillCard key={gi} group={group} accent={accent} index={gi} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({
  group,
  accent,
  index,
}: {
  group: { category: string; items: string[] };
  accent: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -y * 10, ry: x * 10 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      style={{
        transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: 'transform 0.2s ease-out',
      }}
      className="group relative overflow-hidden rounded-3xl glass p-8 noise"
      data-hover
    >
      {/* Spotlight glow follows cursor */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at 50% 0%, ${accent}15, transparent 60%)`,
        }}
      />

      <div className="relative">
        <div className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>
          0{index + 1}
        </div>
        <h3 className="font-display text-2xl font-bold text-white">{group.category}</h3>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {group.items.map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 + i * 0.04, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.06, y: -2 }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-white hover:shadow-lg"
            >
              <SkillIcon name={item} className="h-4 w-4 shrink-0" />
              <span>{item}</span>
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
