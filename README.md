# 🚀 Latest Tech Versions Tracker

> A beautiful, real-time dashboard that tracks the latest versions of 87+ programming languages, frameworks, databases, and development tools.

[🌐 Live Demo](#) | [📖 Documentation](#features) | [🐛 Report Bug](https://github.com/nakvi/latest-tech-version/issues) | [✨ Request Feature](https://github.com/nakvi/latest-tech-version/issues)

---

## 📸 Screenshots

<div align="center">

### Desktop View
![Desktop View](./screenshots/desktop-hero.png)


### Search & Filter
![Search Functionality](./screenshots/search-demo.png)

</div>

---

## ✨ Features

### 🎯 Core Functionality
- **Real-time Version Tracking** - Auto-updates every 12 hours from official sources
- **87+ Technologies** - Comprehensive coverage across 8 categories
- **Smart Search** - Instant filtering across names and descriptions
- **Category Filters** - Quick access to specific technology types
- **Official Links** - Direct links to each technology's website

### 🎨 User Experience
- **Beautiful UI** - Modern design with gradient effects and smooth animations
- **Responsive Design** - Perfect on desktop, tablet, and mobile
- **Dark Mode Ready** - Easy to extend with dark theme
- **Accessibility** - ARIA labels and keyboard navigation support
- **Performance Optimized** - Server-side rendering and edge caching

### 📱 Mobile Features
- **Pull-to-Refresh** - Native app-like refresh gesture
- **Scroll Navigation** - Smart scroll-to-top/bottom button
- **Horizontal Category Scroll** - Smooth category browsing on small screens
- **Touch Optimized** - All interactions designed for touch devices

### 🛠️ Technical Features
- **Server Components** - Fast initial page loads with Next.js 14
- **API Integration** - npm registry, GitHub API, PyPI, official APIs
- **Type Safety** - Full TypeScript coverage
- **Auto-Revalidation** - Configurable cache invalidation
- **Error Handling** - Graceful fallbacks for failed API calls

---

## 🗂️ Technology Coverage

<table>
<tr>
<td valign="top" width="50%">

### 💻 Programming Languages (15)
- 🐍 Python
- 📜 JavaScript
- 🐹 Go
- 🦀 Rust
- ☕ Java
- 🐘 PHP
- 💎 Ruby
- 🔷 C# (.NET)
- 🎯 Kotlin
- 🦅 Swift
- 🎯 Dart
- 🔴 Scala
- 💧 Elixir
- 🐪 Perl
- 📊 R

### ⚡ Runtimes (3)
- 🟢 Node.js
- 🦕 Deno
- 🥟 Bun

### 🏗️ Frontend Frameworks (8)
- ⚛️ React
- ▲ Next.js
- 💚 Vue.js
- 💚 Nuxt
- 🧡 Svelte
- 🧡 SvelteKit
- 🅰️ Angular
- 🚀 Astro

### 📱 Mobile Frameworks (4)
- 📱 React Native
- 🦋 Flutter
- ⚫ Expo
- 💙 Ionic

</td>
<td valign="top" width="50%">

### 🔧 Backend Frameworks (9)
- 🚂 Express
- ⚡ Fastify
- 🐈 NestJS
- 🎸 Django
- 🧪 Flask
- 🚀 FastAPI
- 🔴 Laravel
- 🛤️ Ruby on Rails
- 🍃 Spring Boot

### 🗄️ Databases (12)
**SQL:**
- 🐘 PostgreSQL
- 🐬 MySQL
- 🦭 MariaDB
- 🪶 SQLite

**NoSQL:**
- 🍃 MongoDB
- 🔴 Redis
- ⭐ Cassandra
- 🛋️ CouchDB
- 🔗 Neo4j
- 🔍 Elasticsearch
- 🔥 Firebase
- ⚡ Supabase

### ✏️ Code Editors (6)
- 💙 VS Code
- 🤖 Cursor
- ⚡ Zed
- 🟢 Vim
- 🌙 Neovim
- 🟣 Emacs

</td>
</tr>
<tr>
<td valign="top" colspan="2">

### 🤖 AI Tools (10)
- 🤖 OpenAI API (ChatGPT)
- 🔮 Anthropic Claude API
- ✨ Google Gemini API
- 🤗 Hugging Face Transformers
- 🦜 LangChain
- 🦙 Ollama
- 🧠 TensorFlow
- 🔥 PyTorch
- 🎨 Stable Diffusion WebUI
- 🎨 ComfyUI

### 📦 Libraries (4)
- 💨 Tailwind CSS
- 🅱️ Bootstrap
- Ⓜ️ Material-UI
- 🎨 shadcn/ui

### 🔧 Development Tools (12)
- 🔷 TypeScript
- ⚡ Vite
- 📦 Webpack
- ⚡ esbuild
- 🚀 Turbo
- 🔺 Prisma
- 🔍 ESLint
- ✨ Prettier
- 🃏 Jest
- ⚡ Vitest
- 🎭 Playwright
- 🐳 Docker

</td>
</tr>
</table>

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/nakvi/latest-tech-version
cd tech-versions-tracker
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
tech-versions-tracker/
├── app/
│   ├── page.tsx              # Main server component with data fetching
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   └── VersionGrid.tsx       # Client component with UI and interactions
├── public/
│   └── screenshots/          # Demo images
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

---


## 📊 Data Sources

| Source | Technologies | Rate Limit | Authentication |
|--------|-------------|------------|----------------|
| npm Registry | JavaScript packages | Very high | Not required |
| GitHub API | Languages, tools | 60/hour (unauth)<br>5000/hour (auth) | Optional |
| PyPI | Python packages | High | Not required |
| Go.dev | Go releases | High | Not required |
| PHP.net | PHP versions | Moderate | Not required |

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@nakvi](https://github.com/nakvi)
- LinkedIn: [Toseeq Naqvi](https://www.linkedin.com/in/nakvi9999/)
- Website: [Portfolio](https://toseeq-portfolio.vercel.app/)

---


## 💡 Inspiration

This project was inspired by the need to have a single source of truth for checking technology versions when starting new projects or updating dependencies. Instead of visiting multiple documentation sites, developers can now check all versions in one beautiful interface.

---

## 📈 Future Roadmap

- [x] Basic version tracking
- [x] Search and filter functionality
- [x] Mobile-responsive design
- [x] Pull-to-refresh on mobile
- [ ] Dark mode support
- [ ] Version history tracking
- [ ] Email notifications for updates
- [ ] Browser extension
- [ ] API endpoint for programmatic access
- [ ] Version comparison tool
- [ ] Changelog integration
- [ ] Dependency tree visualization
- [ ] Community voting for new technologies

---

<div align="center">

### Show your support by giving a ⭐ if this project helped you!

Made with ❤️ by [Toseeq Naqvi](https://github.com/nakvi)

</div>