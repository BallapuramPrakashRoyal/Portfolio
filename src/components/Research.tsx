import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronDown, ExternalLink, Microscope } from 'lucide-react';
import type { PortfolioData } from '@/lib/types';

interface ResearchProps {
  data: PortfolioData;
  accent: string;
}

export default function Research({ data, accent }: ResearchProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="research" className="relative py-28 sm:py-36">
      <div
        className="absolute right-0 top-1/4 h-80 w-80 translate-x-1/2 rounded-full opacity-15 blur-3xl"
        style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: accent }}>
            04 — Publications
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Research Work
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/50">
            Peer-reviewed publications and research contributions at the intersection of
            cybersecurity, artificial intelligence, and automated vulnerability assessment.
          </p>
        </motion.div>

        <div className="mt-12 space-y-4">
          {data.research.map((paper, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="overflow-hidden rounded-2xl glass"
                data-hover
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left transition-colors hover:bg-white/[0.03] sm:px-7"
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: `${accent}18` }}
                  >
                    <FileText className="h-5 w-5" style={{ color: accent }} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg font-semibold text-white sm:text-xl">
                      {paper.title}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/40">
                      <span className="flex items-center gap-1.5">
                        <Microscope className="h-3.5 w-3.5" style={{ color: accent }} />
                        {paper.venue}
                      </span>
                      <span className="text-white/20">•</span>
                      <span>{paper.year}</span>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 text-white/40"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-5 pb-5 sm:px-7">
                        <div
                          className="mb-4 h-px w-full"
                          style={{ background: `linear-gradient(90deg, ${accent}40, transparent)` }}
                        />
                        <p className="text-base leading-relaxed text-white/60">{paper.abstract}</p>
                        {paper.link && (
                          <a
                            href={paper.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80"
                            style={{ color: accent }}
                          >
                            View Research Work <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
