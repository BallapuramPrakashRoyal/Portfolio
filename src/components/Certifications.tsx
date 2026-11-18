import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BadgeCheck, ExternalLink, ShieldCheck, FileText, X, Eye } from 'lucide-react';
import type { PortfolioData } from '@/lib/types';
import type { CertificationItem } from '@/data/certifications';

interface CertificationsProps {
  data: PortfolioData;
  accent: string;
}

export default function Certifications({ data, accent }: CertificationsProps) {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    if (selectedCert) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedCert]);

  return (
    <section id="certifications" className="relative py-28 sm:py-36">
      <div
        className="absolute left-0 bottom-1/4 h-80 w-80 -translate-x-1/2 rounded-full opacity-15 blur-3xl"
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
            05 — Credentials
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Certifications
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/50">
            Verified credentials and certificates in application security, network security, ethical
            hacking, cloud, and programming.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {data.certifications.map((cert, i) => {
            const proofUrl = cert.proof || cert.link;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl glass p-5 sm:p-6 noise text-left"
                data-hover
              >
                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
                  style={{ background: accent }}
                />

                <div className="relative flex flex-col sm:flex-row items-start gap-4">
                  {/* Certificate Image Thumbnail (replaces emoji/icon) */}
                  <div
                    onClick={() => cert.image && setSelectedCert(cert)}
                    className="group/thumb relative h-28 w-full sm:h-24 sm:w-36 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-ink-900/60 shadow-md transition-all duration-300 hover:border-white/30"
                    title="Click to preview certificate"
                  >
                    {cert.image ? (
                      <>
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover/thumb:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover/thumb:opacity-100">
                          <span className="flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
                            <Eye className="h-3.5 w-3.5" /> Preview
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <FileText className="h-7 w-7 text-white/40" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-base sm:text-lg font-semibold leading-snug text-white">
                        {cert.title}
                      </h3>
                    </div>

                    {cert.issuer && (
                      <div className="mt-1 text-xs sm:text-sm font-medium text-white/50">{cert.issuer}</div>
                    )}

                    {(cert.year || cert.credentialId) && (
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                        {cert.year && (
                          <span
                            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium"
                            style={{ background: `${accent}15`, color: accent }}
                          >
                            <BadgeCheck className="h-3.5 w-3.5" />
                            {cert.year}
                          </span>
                        )}
                        {cert.credentialId && (
                          <span className="flex items-center gap-1.5 text-white/40">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            {cert.credentialId}
                          </span>
                        )}
                      </div>
                    )}

                    {/* View Certificate Button */}
                    {proofUrl && (
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <a
                          href={proofUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-all hover:scale-105"
                          style={{
                            background: `linear-gradient(135deg, ${accent}30, ${data.theme.accentColor2}30)`,
                            boxShadow: `inset 0 0 0 1px ${accent}40`,
                          }}
                        >
                          <FileText className="h-3.5 w-3.5" style={{ color: accent }} />
                          View Certificate
                          <ExternalLink className="h-3 w-3 opacity-70" />
                        </a>
                        {cert.image && (
                          <button
                            type="button"
                            onClick={() => setSelectedCert(cert)}
                            className="text-xs text-white/50 transition-colors hover:text-white"
                          >
                            Preview Image
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom accent line on hover */}
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full"
                  style={{ background: `linear-gradient(90deg, ${accent}, ${data.theme.accentColor2})` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Certificate Preview Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl glass-strong border border-white/20 p-5 sm:p-6 shadow-2xl"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                    {selectedCert.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60">
                    {selectedCert.issuer} {selectedCert.year ? `• ${selectedCert.year}` : ''}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {(selectedCert.proof || selectedCert.link) && (
                    <a
                      href={selectedCert.proof || selectedCert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold text-white shadow-lg transition-transform hover:scale-105"
                      style={{ background: `linear-gradient(135deg, ${accent}, ${data.theme.accentColor2})` }}
                    >
                      <FileText className="h-4 w-4" />
                      View Certificate (PDF)
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {selectedCert.image && (
                <div className="flex max-h-[72vh] items-center justify-center overflow-auto rounded-xl border border-white/10 bg-black/70 p-2 sm:p-4">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="mx-auto max-h-[66vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
