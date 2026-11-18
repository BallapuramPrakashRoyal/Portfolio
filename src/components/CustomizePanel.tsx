import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Save,
  Loader2,
  Plus,
  Trash2,
  Image as ImageIcon,
  User,
  Briefcase,
  Palette,
  Sparkles,
  FileText,
  Award,
} from 'lucide-react';
import type { PortfolioData } from '@/lib/types';

interface CustomizePanelProps {
  open: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSave: (data: PortfolioData) => Promise<boolean>;
}

type Tab = 'profile' | 'projects' | 'skills' | 'research' | 'certifications' | 'theme';

export default function CustomizePanel({ open, onClose, data, onSave }: CustomizePanelProps) {
  const [draft, setDraft] = useState<PortfolioData>(data);
  const [tab, setTab] = useState<Tab>('profile');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Sync draft when panel opens
  const handleOpen = () => setDraft(data);

  const save = async () => {
    setSaving(true);
    const ok = await onSave(draft);
    setSaving(false);
    if (ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const tabs: { id: Tab; label: string; icon: typeof User }[] = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Sparkles },
    { id: 'research', label: 'Research', icon: FileText },
    { id: 'certifications', label: 'Certs', icon: Award },
    { id: 'theme', label: 'Theme', icon: Palette },
  ];

  return (
    <AnimatePresence onExitComplete={() => {}}>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            onAnimationStart={handleOpen}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col glass-strong"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5" style={{ color: draft.theme.accentColor }} />
                <h3 className="font-display text-lg font-bold text-white">Customize</h3>
              </div>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-white/10 px-4">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`flex items-center gap-1.5 border-b-2 px-3 py-3 text-xs font-medium transition-colors ${
                    tab === id
                      ? 'border-white text-white'
                      : 'border-transparent text-white/40 hover:text-white/70'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </button>
              ))}
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {tab === 'profile' && <ProfileEditor draft={draft} setDraft={setDraft} />}
              {tab === 'projects' && <ProjectsEditor draft={draft} setDraft={setDraft} />}
              {tab === 'skills' && <SkillsEditor draft={draft} setDraft={setDraft} />}
              {tab === 'research' && <ResearchEditor draft={draft} setDraft={setDraft} />}
              {tab === 'certifications' && <CertificationsEditor draft={draft} setDraft={setDraft} />}
              {tab === 'theme' && <ThemeEditor draft={draft} setDraft={setDraft} />}
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 px-6 py-4">
              <button
                onClick={save}
                disabled={saving}
                className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01] disabled:opacity-70"
                style={{ background: `linear-gradient(135deg, ${draft.theme.accentColor}, ${draft.theme.accentColor2})` }}
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : saved ? (
                  <>Saved!</>
                ) : (
                  <>
                    <Save className="h-4 w-4" /> Save Changes
                  </>
                )}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ---------- Field helpers ---------- */

function TextInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-white/40">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-white/30"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-white/40">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-white/30"
      />
    </label>
  );
}

/* ---------- Editors ---------- */

function ProfileEditor({
  draft,
  setDraft,
}: {
  draft: PortfolioData;
  setDraft: (d: PortfolioData) => void;
}) {
  return (
    <div className="space-y-4">
      <TextInput
        label="Name"
        value={draft.profile.name}
        onChange={(v) => setDraft({ ...draft, profile: { ...draft.profile, name: v } })}
      />
      <TextInput
        label="Title"
        value={draft.profile.title}
        onChange={(v) => setDraft({ ...draft, profile: { ...draft.profile, title: v } })}
      />
      <TextArea
        label="Tagline"
        value={draft.profile.tagline}
        onChange={(v) => setDraft({ ...draft, profile: { ...draft.profile, tagline: v } })}
      />
      <TextInput
        label="Location"
        value={draft.profile.location}
        onChange={(v) => setDraft({ ...draft, profile: { ...draft.profile, location: v } })}
      />

      <div className="pt-2">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-white/40">
          Hero — Rotating Words
        </span>
        <div className="space-y-2">
          {draft.hero.rotatingWords.map((word, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={word}
                onChange={(e) => {
                  const words = [...draft.hero.rotatingWords];
                  words[i] = e.target.value;
                  setDraft({ ...draft, hero: { ...draft.hero, rotatingWords: words } });
                }}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-white/30"
              />
              <button
                onClick={() => {
                  const words = draft.hero.rotatingWords.filter((_, idx) => idx !== i);
                  setDraft({ ...draft, hero: { ...draft.hero, rotatingWords: words } });
                }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/40 hover:text-coral-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              setDraft({
                ...draft,
                hero: { ...draft.hero, rotatingWords: [...draft.hero.rotatingWords, 'new word'] },
              })
            }
            className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-2 text-xs font-medium text-white/60 hover:text-white"
          >
            <Plus className="h-3.5 w-3.5" /> Add word
          </button>
        </div>
      </div>

      <div className="pt-2">
        <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-white/40">
          Social Links
        </span>
        <div className="space-y-3">
          {(['github', 'linkedin', 'twitter', 'email'] as const).map((key) => (
            <TextInput
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              value={draft.social[key]}
              onChange={(v) => setDraft({ ...draft, social: { ...draft.social, [key]: v } })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsEditor({
  draft,
  setDraft,
}: {
  draft: PortfolioData;
  setDraft: (d: PortfolioData) => void;
}) {
  const update = (i: number, patch: Partial<PortfolioData['projects'][number]>) => {
    const projects = [...draft.projects];
    projects[i] = { ...projects[i], ...patch };
    setDraft({ ...draft, projects });
  };

  return (
    <div className="space-y-6">
      {draft.projects.map((project, i) => (
        <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-white/40">Project {i + 1}</span>
            <button
              onClick={() => {
                const projects = draft.projects.filter((_, idx) => idx !== i);
                setDraft({ ...draft, projects });
              }}
              className="text-white/30 hover:text-coral-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3">
            <TextInput
              label="Title"
              value={project.title}
              onChange={(v) => update(i, { title: v })}
            />
            <TextArea
              label="Description"
              value={project.description}
              onChange={(v) => update(i, { description: v })}
              rows={2}
            />
            <TextInput
              label="Image URL"
              value={project.image}
              onChange={(v) => update(i, { image: v })}
            />
            <TextInput
              label="Link"
              value={project.link}
              onChange={(v) => update(i, { link: v })}
            />
            <TextInput
              label="Tags (comma separated)"
              value={project.tags.join(', ')}
              onChange={(v) => update(i, { tags: v.split(',').map((t) => t.trim()).filter(Boolean) })}
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={project.featured}
                onChange={(e) => update(i, { featured: e.target.checked })}
                className="h-4 w-4 rounded border-white/20 bg-white/10"
              />
              <span className="text-sm text-white/60">Featured project</span>
            </label>
          </div>
        </div>
      ))}

      <button
        onClick={() =>
          setDraft({
            ...draft,
            projects: [
              ...draft.projects,
              {
                title: 'New Project',
                description: 'Describe your project...',
                tags: [],
                link: '',
                image: '',
                featured: false,
              },
            ],
          })
        }
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 py-3 text-sm font-medium text-white/60 hover:text-white"
      >
        <Plus className="h-4 w-4" /> Add Project
      </button>
    </div>
  );
}

function SkillsEditor({
  draft,
  setDraft,
}: {
  draft: PortfolioData;
  setDraft: (d: PortfolioData) => void;
}) {
  const update = (i: number, patch: Partial<PortfolioData['skills'][number]>) => {
    const skills = [...draft.skills];
    skills[i] = { ...skills[i], ...patch };
    setDraft({ ...draft, skills });
  };

  return (
    <div className="space-y-5">
      {draft.skills.map((group, i) => (
        <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-white/40">Category {i + 1}</span>
            <button
              onClick={() => {
                const skills = draft.skills.filter((_, idx) => idx !== i);
                setDraft({ ...draft, skills });
              }}
              className="text-white/30 hover:text-coral-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3">
            <TextInput
              label="Category name"
              value={group.category}
              onChange={(v) => update(i, { category: v })}
            />
            <TextInput
              label="Skills (comma separated)"
              value={group.items.join(', ')}
              onChange={(v) => update(i, { items: v.split(',').map((t) => t.trim()).filter(Boolean) })}
            />
          </div>
        </div>
      ))}

      <button
        onClick={() =>
          setDraft({
            ...draft,
            skills: [...draft.skills, { category: 'New Category', items: [] }],
          })
        }
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 py-3 text-sm font-medium text-white/60 hover:text-white"
      >
        <Plus className="h-4 w-4" /> Add Category
      </button>
    </div>
  );
}

function ThemeEditor({
  draft,
  setDraft,
}: {
  draft: PortfolioData;
  setDraft: (d: PortfolioData) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <span className="mb-2 block text-xs font-medium text-white/40">Accent Color 1 (primary)</span>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={draft.theme.accentColor}
            onChange={(e) =>
              setDraft({ ...draft, theme: { ...draft.theme, accentColor: e.target.value } })
            }
            className="h-11 w-16 cursor-pointer rounded-lg border border-white/10 bg-transparent"
          />
          <input
            type="text"
            value={draft.theme.accentColor}
            onChange={(e) =>
              setDraft({ ...draft, theme: { ...draft.theme, accentColor: e.target.value } })
            }
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-white/30"
          />
        </div>
      </div>

      <div>
        <span className="mb-2 block text-xs font-medium text-white/40">Accent Color 2 (secondary)</span>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={draft.theme.accentColor2}
            onChange={(e) =>
              setDraft({ ...draft, theme: { ...draft.theme, accentColor2: e.target.value } })
            }
            className="h-11 w-16 cursor-pointer rounded-lg border border-white/10 bg-transparent"
          />
          <input
            type="text"
            value={draft.theme.accentColor2}
            onChange={(e) =>
              setDraft({ ...draft, theme: { ...draft.theme, accentColor2: e.target.value } })
            }
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-white/30"
          />
        </div>
      </div>

      <div>
        <span className="mb-2 block text-xs font-medium text-white/40">
          3D Blob Animation Speed: {draft.theme.blobSpeed.toFixed(1)}x
        </span>
        <input
          type="range"
          min="0.2"
          max="3"
          step="0.1"
          value={draft.theme.blobSpeed}
          onChange={(e) =>
            setDraft({ ...draft, theme: { ...draft.theme, blobSpeed: parseFloat(e.target.value) } })
          }
          className="w-full accent-liquid-400"
        />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-2 text-xs text-white/40">
          <ImageIcon className="h-4 w-4" />
          Preview
        </div>
        <div
          className="mt-3 h-24 rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${draft.theme.accentColor}, ${draft.theme.accentColor2})`,
          }}
        />
        <div className="mt-3 flex gap-2">
          <div
            className="h-8 flex-1 rounded-lg"
            style={{ background: draft.theme.accentColor }}
          />
          <div
            className="h-8 flex-1 rounded-lg"
            style={{ background: draft.theme.accentColor2 }}
          />
        </div>
      </div>
    </div>
  );
}

function ResearchEditor({
  draft,
  setDraft,
}: {
  draft: PortfolioData;
  setDraft: (d: PortfolioData) => void;
}) {
  const update = (i: number, patch: Partial<PortfolioData['research'][number]>) => {
    const research = [...draft.research];
    research[i] = { ...research[i], ...patch };
    setDraft({ ...draft, research });
  };

  return (
    <div className="space-y-6">
      {draft.research.map((paper, i) => (
        <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-white/40">Paper {i + 1}</span>
            <button
              onClick={() => {
                const research = draft.research.filter((_, idx) => idx !== i);
                setDraft({ ...draft, research });
              }}
              className="text-white/30 hover:text-coral-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3">
            <TextInput
              label="Title"
              value={paper.title}
              onChange={(v) => update(i, { title: v })}
            />
            <TextInput
              label="Venue / Conference"
              value={paper.venue}
              onChange={(v) => update(i, { venue: v })}
            />
            <TextInput
              label="Year"
              value={paper.year}
              onChange={(v) => update(i, { year: v })}
            />
            <TextArea
              label="Abstract"
              value={paper.abstract}
              onChange={(v) => update(i, { abstract: v })}
              rows={3}
            />
            <TextInput
              label="Link"
              value={paper.link}
              onChange={(v) => update(i, { link: v })}
            />
          </div>
        </div>
      ))}

      <button
        onClick={() =>
          setDraft({
            ...draft,
            research: [
              ...draft.research,
              {
                title: 'New Research Paper',
                venue: '',
                year: '',
                abstract: '',
                link: '',
              },
            ],
          })
        }
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 py-3 text-sm font-medium text-white/60 hover:text-white"
      >
        <Plus className="h-4 w-4" /> Add Paper
      </button>
    </div>
  );
}

function CertificationsEditor({
  draft,
  setDraft,
}: {
  draft: PortfolioData;
  setDraft: (d: PortfolioData) => void;
}) {
  const update = (i: number, patch: Partial<PortfolioData['certifications'][number]>) => {
    const certifications = [...draft.certifications];
    certifications[i] = { ...certifications[i], ...patch };
    setDraft({ ...draft, certifications });
  };

  return (
    <div className="space-y-6">
      {draft.certifications.map((cert, i) => (
        <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-white/40">Certification {i + 1}</span>
            <button
              onClick={() => {
                const certifications = draft.certifications.filter((_, idx) => idx !== i);
                setDraft({ ...draft, certifications });
              }}
              className="text-white/30 hover:text-coral-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3">
            <TextInput
              label="Title"
              value={cert.title}
              onChange={(v) => update(i, { title: v })}
            />
            <TextInput
              label="Issuer"
              value={cert.issuer}
              onChange={(v) => update(i, { issuer: v })}
            />
            <TextInput
              label="Year"
              value={cert.year}
              onChange={(v) => update(i, { year: v })}
            />
            <TextInput
              label="Credential ID"
              value={cert.credentialId}
              onChange={(v) => update(i, { credentialId: v })}
            />
            <TextInput
              label="Link"
              value={cert.link}
              onChange={(v) => update(i, { link: v })}
            />
          </div>
        </div>
      ))}

      <button
        onClick={() =>
          setDraft({
            ...draft,
            certifications: [
              ...draft.certifications,
              {
                title: 'New Certification',
                issuer: '',
                year: '',
                credentialId: '',
                link: '',
              },
            ],
          })
        }
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 py-3 text-sm font-medium text-white/60 hover:text-white"
      >
        <Plus className="h-4 w-4" /> Add Certification
      </button>
    </div>
  );
}
