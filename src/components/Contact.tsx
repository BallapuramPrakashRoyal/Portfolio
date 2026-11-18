import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, Github, Linkedin, Twitter, Mail, MapPin, User, Phone } from 'lucide-react';
import type { PortfolioData } from '@/lib/types';

interface ContactProps {
  data: PortfolioData;
  accent: string;
}

export default function Contact({ data, accent }: ContactProps) {
  const { profile, social } = data;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Build mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    const mailtoAddress = social.email || 'your.email@example.com';
    window.open(`mailto:${mailtoAddress}?subject=${subject}&body=${body}`, '_self');

    setStatus('success');
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setStatus('idle'), 4000);
  };

  const socials = [
    { icon: Github, url: social.github, label: 'GitHub' },
    { icon: Linkedin, url: social.linkedin, label: 'LinkedIn' },
    { icon: Twitter, url: social.twitter, label: 'Twitter' },
  ].filter((s) => s.url);

  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <div
        className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: accent }}>
              06 — Get In Touch
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Get In <span className="text-gradient">Touch</span>
            </h2>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/60">
              Have a project in mind or just want to connect? Feel free to reach out — I'd love to
              hear from you.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3.5">
                <div
                  className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl glass"
                  style={{ color: accent }}
                >
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-white/40">Name</span>
                  <span className="text-base font-medium text-white">{profile.name}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div
                  className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl glass"
                  style={{ color: accent }}
                >
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-white/40">E-mail</span>
                  <a
                    href={`mailto:${social.email}`}
                    className="text-base font-medium text-white transition-colors hover:underline hover:opacity-80"
                  >
                    {social.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div
                  className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl glass"
                  style={{ color: accent }}
                >
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-white/40">Mobile</span>
                  <a
                    href="tel:+916302366691"
                    className="text-base font-medium text-white transition-colors hover:underline hover:opacity-80"
                  >
                    +91 6302366691
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div
                  className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl glass"
                  style={{ color: accent }}
                >
                  <Linkedin className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-white/40">LinkedIn</span>
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-base font-medium text-white transition-colors hover:underline hover:opacity-80"
                  >
                    {social.linkedin}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div
                  className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl glass"
                  style={{ color: accent }}
                >
                  <Github className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-white/40">Github</span>
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-base font-medium text-white transition-colors hover:underline hover:opacity-80"
                  >
                    {social.github}
                  </a>
                </div>
              </div>

              {profile.location && (
                <div className="flex items-start gap-3.5">
                  <div
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl glass"
                    style={{ color: accent }}
                  >
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-white/40">Location</span>
                    <span className="text-base text-white/70">{profile.location}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex items-center gap-3">
              {socials.map(({ icon: Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-xl glass text-white/60 transition-all hover:scale-110 hover:text-white"
                  style={{ boxShadow: `0 0 0 0 ${accent}` }}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl glass-strong p-8 noise"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <Field label="Your Name">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Jane Doe"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-white/30"
                />
              </Field>

              <Field label="Email Address">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="jane@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-white/30"
                />
              </Field>

              <Field label="Message">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-white/30"
                />
              </Field>

              <button
                type="submit"
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.01]"
                style={{ background: `linear-gradient(135deg, ${accent}, ${data.theme.accentColor2})` }}
              >
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      Send Message <Send className="h-4 w-4" />
                    </motion.span>
                  )}
                  {status === 'success' && (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      Opening email client… <Check className="h-4 w-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <p className="text-center text-xs text-white/30">
                This will open your default email client to send the message.
              </p>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-24 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/40">
            {new Date().getFullYear()} {profile.name}. Crafted with care.
          </p>
          <p className="text-sm text-white/40">Designed &amp; built from scratch</p>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-white/40">
        {label}
      </span>
      {children}
    </label>
  );
}
