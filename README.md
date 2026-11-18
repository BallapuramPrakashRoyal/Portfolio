# Ballapuram Prakash Royal — Developer Portfolio

A modern, high-performance 3D developer portfolio website built with **React 18**, **TypeScript**, **Vite**, **Three.js / React Three Fiber**, **Framer Motion**, and **Tailwind CSS**.

---

## 🌟 Overview

- **Architectural Design**: 100% self-contained frontend client — zero external databases or third-party server requirements.
- **3D Experiences**: Interactive WebGL mesh distortion blob (`Hero3D`) & low-poly 3D developer figure (`Developer3D`) using `@react-three/fiber` & `@react-three/drei`.
- **Dynamic Accent System**: Built-in interactive **Customize Panel** for adjusting accent palettes & 3D speeds, persisted via `localStorage`.
- **Modular Data Architecture**: All personal information, skills, projects, certifications, and research are centralized in modular TypeScript files under `src/data/`.
- **Production Ready**: Optimized asset chunking, responsive typography, custom smooth cursor glow, Open Graph meta tags, robots.txt, and sitemap.

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Language**: TypeScript 5.5
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3.4
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Motion & Transitions**: Framer Motion 14
- **Icons**: Lucide React
- **Deployment Target**: Vercel

---

## 📂 Project Structure

```
├── public/
│   ├── robots.txt              # Search engine directives
│   └── sitemap.xml             # XML Sitemap
├── src/
│   ├── components/             # Reusable UI & 3D components
│   │   ├── About.tsx           # Bio, stats, experience, education & achievements
│   │   ├── Certifications.tsx  # Accredited certifications with merit badges
│   │   ├── Contact.tsx         # Direct contact & mailto integration
│   │   ├── CursorGlow.tsx      # Smooth fluid cursor follower
│   │   ├── CustomizePanel.tsx  # Live theme & palette customizer
│   │   ├── Developer3D.tsx     # Stylized 3D developer workspace figure
│   │   ├── ErrorBoundary.tsx   # Graceful WebGL error boundaries with blob fallbacks
│   │   ├── Hero.tsx            # Main hero with rotating title roles
│   │   ├── Hero3D.tsx          # Real-time WebGL mesh-distortion sphere
│   │   ├── Navbar.tsx          # Scroll-reactive navigation
│   │   ├── Projects.tsx        # Featured cards & project grid with status tags
│   │   ├── Research.tsx        # Peer-reviewed publication showcase
│   │   └── Skills.tsx          # 3D tilt hover cards categorized by domain
│   ├── data/                   # Centralized configuration (Edit your details here!)
│   │   ├── achievements.ts     # Key achievements & milestones
│   │   ├── certifications.ts   # Certificates & credential IDs
│   │   ├── education.ts        # Academic background & CGPA
│   │   ├── experience.ts       # Employment & internship roles
│   │   ├── personal.ts         # Profile name, bio, tagline & stats
│   │   ├── projects.ts         # Primary projects & status
│   │   ├── research.ts         # Research papers & abstracts
│   │   ├── skills.ts           # Categorized technical skills
│   │   ├── social.ts           # GitHub, LinkedIn, Twitter, Email
│   │   └── index.ts            # Aggregated configuration export
│   ├── lib/
│   │   ├── hooks.ts            # Local data hook with localStorage theme persistence
│   │   └── types.ts            # TypeScript interfaces & types
│   ├── App.tsx                 # Root layout & ambient backgrounds
│   ├── index.css               # Design system, glassmorphism & keyframes
│   └── main.tsx                # Entry point
├── vercel.json                 # SPA routing rewrite rules for Vercel
├── package.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm`, `yarn`, or `pnpm`

### Installation

1. Navigate to the project directory:
   ```bash
   cd portfolio1-main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

### Type Checking & Production Build

- **Typecheck**:
  ```bash
  npm run typecheck
  ```

- **Build**:
  ```bash
  npm run build
  ```

- **Preview Production Build**:
  ```bash
  npm run preview
  ```

---

## ✏️ Customizing Your Information

All portfolio content is neatly separated from UI code in `src/data/`:

- **Social Links & Email**: Edit `src/data/social.ts`
- **Projects**: Edit `src/data/projects.ts`
- **Skills**: Edit `src/data/skills.ts`
- **Certifications**: Edit `src/data/certifications.ts`
- **Education & Experience**: Edit `src/data/education.ts` and `src/data/experience.ts`
- **Research**: Edit `src/data/research.ts`

---

## 🌐 Deploying to Vercel

### Option 1: Via GitHub & Vercel Dashboard (Recommended)

1. **Initialize Git & Commit**:
   ```bash
   git init
   git add .
   git commit -m "feat: Ballapuram Prakash Royal developer portfolio"
   ```

2. **Push to your GitHub repository**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

3. **Deploy via Vercel**:
   - Go to [vercel.com](https://vercel.com/) and sign in with your GitHub account.
   - Click **Add New...** > **Project**.
   - Select your portfolio repository.
   - Framework Preset: **Vite** (auto-detected).
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Click **Deploy**.

### Option 2: Deploy using Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

---

## 📄 License

MIT License. Designed & developed with care.
