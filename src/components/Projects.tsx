import { motion } from 'framer-motion';
import { Star, Clock, ExternalLink, Github } from 'lucide-react';
import type { PortfolioData } from '@/lib/types';

interface ProjectsProps {
  data: PortfolioData;
  accent: string;
}

export default function Projects({ data, accent }: ProjectsProps) {
  const featured = data.projects.filter((p) => p.featured);
  const rest = data.projects.filter((p) => !p.featured);

  return (
    <section id="work" className="relative py-28 sm:py-36">
      <div
        className="absolute left-0 top-1/3 h-80 w-80 rounded-full opacity-15 blur-3xl"
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
            03 — Selected work
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Featured Projects
          </h2>
        </motion.div>

        {/* Featured large cards */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {featured.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              accent={accent}
              index={i}
              large
            />
          ))}
        </div>

        {/* Rest in a grid */}
        {rest.length > 0 && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {rest.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                accent={accent}
                index={i + featured.length}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  accent,
  index,
  large = false,
}: {
  project: PortfolioData['projects'][number];
  accent: string;
  index: number;
  large?: boolean;
}) {
  const primaryUrl = project.liveUrl || project.link || project.repoUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl glass text-left"
      data-hover
    >
      <div>
        {/* Landing Page Preview Image */}
        <div className={`relative overflow-hidden ${large ? 'h-64 sm:h-80' : 'h-52 sm:h-60'} border-b border-white/10 bg-ink-950`}>
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {project.featured && (
              <div className="flex items-center gap-1.5 rounded-full glass-strong px-3 py-1.5 text-xs font-medium text-white shadow-md">
                <Star className="h-3 w-3" style={{ color: accent, fill: accent }} />
                Featured
              </div>
            )}
            {project.status && (
              <div className="flex items-center gap-1.5 rounded-full glass-strong px-3 py-1.5 text-xs font-medium text-white/90 shadow-md">
                <Clock className="h-3 w-3" style={{ color: accent }} />
                {project.status}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className={`font-display font-bold text-white ${large ? 'text-2xl' : 'text-xl'}`}>
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/65">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-white/5 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Links & Footer */}
      <div className="px-6 pb-6 pt-2">
        <div className="flex flex-wrap items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-lg transition-transform hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${accent}, #ff4d6d)` }}
            >
              View Live Application <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 transition-all hover:bg-white/10 hover:text-white hover:scale-105"
            >
              <Github className="h-3.5 w-3.5" />
              {project.liveUrl ? 'View Project Repo' : (project.linkLabel || 'View Project')}
            </a>
          )}
          {!project.liveUrl && !project.repoUrl && project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-lg transition-transform hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${accent}, #ff4d6d)` }}
            >
              {project.linkLabel || 'View Project'} <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Bottom accent line on hover */}
      <div
        className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full"
        style={{ background: `linear-gradient(90deg, ${accent}, ${'#ff4d6d'})` }}
      />
    </motion.div>
  );
}
