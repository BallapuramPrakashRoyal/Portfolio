import { motion } from 'framer-motion';
import { GraduationCap, Trophy, CheckCircle2 } from 'lucide-react';
import type { PortfolioData } from '@/lib/types';

interface AboutProps {
  data: PortfolioData;
  accent: string;
}

export default function About({ data, accent }: AboutProps) {
  const { about, experience, education, achievements } = data;

  return (
    <section id="about" className="relative py-28 sm:py-36">
      {/* Ambient glow */}
      <div
        className="absolute left-1/4 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <span
            className="text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: accent }}
          >
            01 — Get to know me
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {about.heading}
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr,1fr] lg:items-start">
          {/* Paragraphs */}
          <div className="space-y-6">
            {about.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="text-lg leading-relaxed text-white/70"
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {about.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, type: 'spring', stiffness: 120 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl glass p-6"
              >
                <div
                  className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ background: accent }}
                />
                <div
                  className="font-display text-4xl font-bold"
                  style={{ color: accent }}
                >
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-white/50">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education & Key Achievements Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {/* Education */}
          {education && education.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="group relative overflow-hidden rounded-3xl glass p-7 noise"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: `${data.theme.accentColor2}20` }}
                >
                  <GraduationCap className="h-5 w-5" style={{ color: data.theme.accentColor2 }} />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
                    Education
                  </span>
                  <h3 className="font-display text-xl font-bold text-white">Academics</h3>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {education.map((edu, i) => (
                  <div
                    key={i}
                    className="border-l-2 pl-4"
                    style={{ borderColor: `${data.theme.accentColor2}60` }}
                  >
                    <div className="font-display text-base font-semibold text-white">
                      {edu.degree}
                    </div>
                    <div className="text-sm font-medium text-white/70">
                      {edu.institution}
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${accent}18`, color: accent }}>
                      CGPA: {edu.cgpa}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Key Achievements */}
          {achievements && achievements.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative overflow-hidden rounded-3xl glass p-7 noise"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: `${accent}20` }}
                >
                  <Trophy className="h-5 w-5" style={{ color: accent }} />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
                    Honors &amp; Milestones
                  </span>
                  <h3 className="font-display text-xl font-bold text-white">Key Achievements</h3>
                </div>
              </div>

              <div className="mt-5 space-y-2.5">
                {achievements.map((ach, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs leading-relaxed text-white/70">
                    <CheckCircle2
                      className="mt-0.5 h-3.5 w-3.5 shrink-0"
                      style={{ color: accent }}
                    />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
