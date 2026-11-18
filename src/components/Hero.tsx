import { lazy, Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Twitter, Mail, MapPin } from 'lucide-react';
import ErrorBoundary from './ErrorBoundary';
import type { PortfolioData } from '@/lib/types';

const Hero3D = lazy(() => import('./Hero3D'));
const Developer3D = lazy(() => import('./Developer3D'));

function BlobFallback({ color1, color2 }: { color1: string; color2: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="h-72 w-72 animate-blob opacity-60 blur-2xl sm:h-96 sm:w-96"
        style={{ background: `radial-gradient(circle at 30% 30%, ${color1}, ${color2})` }}
      />
      <div
        className="absolute h-56 w-56 animate-blob opacity-40 blur-xl sm:h-72 sm:w-72"
        style={{ background: `radial-gradient(circle, ${color2}, transparent 70%)`, animationDelay: '2s' }}
      />
    </div>
  );
}

function DeveloperFallback({ color1, color2 }: { color1: string; color2: string }) {
  return (
    <div className="flex h-full min-h-[320px] items-center justify-center">
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="h-48 w-48 animate-blob rounded-full opacity-70 blur-md sm:h-64 sm:w-64"
        style={{ background: `radial-gradient(circle at 35% 35%, ${color1}, ${color2})` }}
      />
    </div>
  );
}

interface HeroProps {
  data: PortfolioData;
  accent: string;
}

export default function Hero({ data, accent }: HeroProps) {
  const { profile, hero, social } = data;
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % hero.rotatingWords.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [hero.rotatingWords.length]);

  const socials = [
    { icon: Github, url: social.github },
    { icon: Linkedin, url: social.linkedin },
    { icon: Twitter, url: social.twitter },
    { icon: Mail, url: social.email ? `mailto:${social.email}` : '' },
  ].filter((s) => s.url);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <ErrorBoundary
          fallback={
            <BlobFallback color1={data.theme.accentColor} color2={data.theme.accentColor2} />
          }
        >
          <Suspense
            fallback={
              <BlobFallback color1={data.theme.accentColor} color2={data.theme.accentColor2} />
            }
          >
            <Hero3D
              color1={data.theme.accentColor}
              color2={data.theme.accentColor2}
              speed={data.theme.blobSpeed}
            />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-ink-950/80 via-ink-950/40 to-transparent" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/30" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
        <div>
          {/* Left column — text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-white/70"
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ background: accent }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: accent }} />
            </span>
            Open to opportunities
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-white/50"
          >
            {hero.greeting}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            {profile.name}
          </motion.h1>

          <div className="mt-3 flex h-12 items-center sm:h-14">
            <div className="relative h-10 w-full overflow-hidden sm:h-12 lg:h-14">
              {hero.rotatingWords.map((word, i) => (
                <motion.span
                  key={word}
                  className="absolute left-0 top-0 font-display text-3xl font-bold capitalize sm:text-4xl lg:text-5xl"
                  style={{
                    color: i === wordIndex ? accent : 'transparent',
                    WebkitTextStroke: i === wordIndex ? 'none' : `1px ${accent}40`,
                  }}
                  animate={{
                    y: i === wordIndex ? 0 : 40,
                    opacity: i === wordIndex ? 1 : 0,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 max-w-md text-base leading-relaxed text-white/60 sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-5 flex items-center gap-2 text-sm text-white/40"
          >
            <MapPin className="h-4 w-4" style={{ color: accent }} />
            {profile.location}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative overflow-hidden rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              style={{ background: `linear-gradient(135deg, ${accent}, ${data.theme.accentColor2})` }}
            >
              <span className="relative z-10">View My Work</span>
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
            </button>

            <div className="flex items-center gap-1">
              {socials.map(({ icon: Icon, url }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl glass text-white/60 transition-all hover:scale-110 hover:text-white"
                  style={{ ['--tw-shadow-color' as string]: accent }}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right column — 3D developer figure */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[320px] sm:h-[420px] lg:h-[500px]"
        >
          <ErrorBoundary
            fallback={
              <DeveloperFallback color1={data.theme.accentColor} color2={data.theme.accentColor2} />
            }
          >
            <Suspense
              fallback={
                <DeveloperFallback color1={data.theme.accentColor} color2={data.theme.accentColor2} />
              }
            >
              <Developer3D color1={data.theme.accentColor} color2={data.theme.accentColor2} />
            </Suspense>
          </ErrorBoundary>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/40 hover:text-white/70"
      >
        <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
        <div className="flex h-9 w-5 justify-center rounded-full border border-white/20 pt-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-1.5 w-1 rounded-full bg-white/50"
          />
        </div>
        <ArrowDown className="h-3 w-3" />
      </motion.button>
    </section>
  );
}
