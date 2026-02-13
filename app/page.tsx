// app/page-with-icons.tsx
// This is the complete version with all technologies and their icons
// Replace your app/page.tsx with this file

import VersionGrid from '@/app/components/VersionGrid';

type VersionInfo = {
  name: string;
  version: string;
  released?: string;
  url?: string;
  category: "language" | "runtime" | "framework" | "library" | "tool" | "database" | "editor" | "ai";
  description?: string;
  icon?: string;
};

async function getLatestVersions(): Promise<VersionInfo[]> {
  const results: VersionInfo[] = [];

  const safeFetch = async (
    url: string,
    parser: (data: any) => VersionInfo | null
  ) => {
    try {
      const res = await fetch(url, { 
        next: { revalidate: 43200 },
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; VersionTracker/1.0)'
        }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const info = parser(data);
      if (info) results.push(info);
    } catch (error) {
      console.error(`Error fetching from ${url}:`, error);
    }
  };

  // === PROGRAMMING LANGUAGES ===
  
  await safeFetch("https://api.github.com/repos/python/cpython/releases/latest", (data) => ({
    name: "Python", version: data.tag_name?.replace("v", "") || "N/A", released: data.published_at,
    url: "https://www.python.org", category: "language", description: "High-level programming language", icon: "🐍",
  }));

  await safeFetch("https://go.dev/dl/?mode=json", (data) => ({
    name: "Go", version: data[0]?.version?.replace("go", "") || "N/A",
    url: "https://go.dev", category: "language", description: "Fast, efficient compiled language", icon: "🐹",
  }));

  await safeFetch("https://api.github.com/repos/rust-lang/rust/releases/latest", (data) => ({
    name: "Rust", version: data.tag_name || "N/A", released: data.published_at,
    url: "https://www.rust-lang.org", category: "language", description: "Memory-safe systems language", icon: "🦀",
  }));

  await safeFetch("https://api.github.com/repos/openjdk/jdk/releases/latest", (data) => ({
    name: "Java", version: data.tag_name?.replace("jdk-", "") || "N/A", released: data.published_at,
    url: "https://openjdk.org", category: "language", description: "Enterprise programming language", icon: "☕",
  }));

  await safeFetch("https://www.php.net/releases/index.php?json&version=8", (data) => ({
    name: "PHP", version: data.version || "N/A", released: data.date,
    url: "https://www.php.net", category: "language", description: "Server-side scripting language", icon: "🐘",
  }));

  await safeFetch("https://api.github.com/repos/ruby/ruby/releases/latest", (data) => ({
    name: "Ruby", version: data.tag_name?.replace("v", "").replace("_", ".") || "N/A", released: data.published_at,
    url: "https://www.ruby-lang.org", category: "language", description: "Dynamic programming language", icon: "💎",
  }));

  await safeFetch("https://api.github.com/repos/dotnet/runtime/releases/latest", (data) => ({
    name: "C# (.NET)", version: data.tag_name?.replace("v", "") || "N/A", released: data.published_at,
    url: "https://dotnet.microsoft.com", category: "language", description: "Modern object-oriented language", icon: "🔷",
  }));

  await safeFetch("https://api.github.com/repos/JetBrains/kotlin/releases/latest", (data) => ({
    name: "Kotlin", version: data.tag_name?.replace("v", "") || "N/A", released: data.published_at,
    url: "https://kotlinlang.org", category: "language", description: "Modern JVM & Android language", icon: "🎯",
  }));

  await safeFetch("https://api.github.com/repos/apple/swift/releases/latest", (data) => ({
    name: "Swift", version: data.tag_name?.replace("swift-", "").replace("-RELEASE", "") || "N/A", released: data.published_at,
    url: "https://swift.org", category: "language", description: "iOS/macOS development language", icon: "🦅",
  }));

  // === RUNTIMES ===
  
  await safeFetch("https://nodejs.org/dist/index.json", (data) => ({
    name: "Node.js", version: data[0]?.version || "N/A", released: data[0]?.date,
    url: "https://nodejs.org", category: "runtime", description: "JavaScript runtime built on V8", icon: "🟢",
  }));

  await safeFetch("https://api.github.com/repos/denoland/deno/releases/latest", (data) => ({
    name: "Deno", version: data.tag_name?.replace("v", "") || "N/A", released: data.published_at,
    url: "https://deno.land", category: "runtime", description: "Secure JavaScript/TypeScript runtime", icon: "🦕",
  }));

  await safeFetch("https://api.github.com/repos/oven-sh/bun/releases/latest", (data) => ({
    name: "Bun", version: data.tag_name?.replace("bun-v", "") || "N/A", released: data.published_at,
    url: "https://bun.sh", category: "runtime", description: "Fast all-in-one JavaScript runtime", icon: "🥟",
  }));

  // === FRAMEWORKS - Frontend ===
  
  await safeFetch("https://registry.npmjs.org/react/latest", (data) => ({
    name: "React", version: data.version || "N/A",
    url: "https://react.dev", category: "framework", description: "JavaScript library for UIs", icon: "⚛️",
  }));

  await safeFetch("https://registry.npmjs.org/next/latest", (data) => ({
    name: "Next.js", version: data.version || "N/A",
    url: "https://nextjs.org", category: "framework", description: "React framework for production", icon: "▲",
  }));

  await safeFetch("https://registry.npmjs.org/vue/latest", (data) => ({
    name: "Vue.js", version: data.version || "N/A",
    url: "https://vuejs.org", category: "framework", description: "Progressive JavaScript framework", icon: "💚",
  }));

  await safeFetch("https://registry.npmjs.org/nuxt/latest", (data) => ({
    name: "Nuxt", version: data.version || "N/A",
    url: "https://nuxt.com", category: "framework", description: "Vue.js framework", icon: "💚",
  }));

  await safeFetch("https://registry.npmjs.org/svelte/latest", (data) => ({
    name: "Svelte", version: data.version || "N/A",
    url: "https://svelte.dev", category: "framework", description: "Cybernetically enhanced web apps", icon: "🧡",
  }));

  await safeFetch("https://registry.npmjs.org/@angular/core/latest", (data) => ({
    name: "Angular", version: data.version || "N/A",
    url: "https://angular.dev", category: "framework", description: "Platform for building web apps", icon: "🅰️",
  }));

  await safeFetch("https://registry.npmjs.org/astro/latest", (data) => ({
    name: "Astro", version: data.version || "N/A",
    url: "https://astro.build", category: "framework", description: "All-in-one web framework", icon: "🚀",
  }));

  // === FRAMEWORKS - Mobile ===
  
  await safeFetch("https://registry.npmjs.org/react-native/latest", (data) => ({
    name: "React Native", version: data.version || "N/A",
    url: "https://reactnative.dev", category: "framework", description: "Mobile framework for iOS/Android", icon: "📱",
  }));

  await safeFetch("https://api.github.com/repos/flutter/flutter/releases/latest", (data) => ({
    name: "Flutter", version: data.tag_name || "N/A", released: data.published_at,
    url: "https://flutter.dev", category: "framework", description: "UI toolkit for mobile/web/desktop", icon: "🦋",
  }));

  await safeFetch("https://registry.npmjs.org/expo/latest", (data) => ({
    name: "Expo", version: data.version || "N/A",
    url: "https://expo.dev", category: "framework", description: "React Native framework", icon: "⚫",
  }));

  // === FRAMEWORKS - Backend ===
  
  await safeFetch("https://registry.npmjs.org/express/latest", (data) => ({
    name: "Express", version: data.version || "N/A",
    url: "https://expressjs.com", category: "framework", description: "Fast Node.js web framework", icon: "🚂",
  }));

  await safeFetch("https://registry.npmjs.org/fastify/latest", (data) => ({
    name: "Fastify", version: data.version || "N/A",
    url: "https://fastify.dev", category: "framework", description: "Fast and low overhead framework", icon: "⚡",
  }));

  await safeFetch("https://registry.npmjs.org/@nestjs/core/latest", (data) => ({
    name: "NestJS", version: data.version || "N/A",
    url: "https://nestjs.com", category: "framework", description: "Progressive Node.js framework", icon: "🐈",
  }));

  await safeFetch("https://pypi.org/pypi/Django/json", (data) => ({
    name: "Django", version: data.info?.version || "N/A",
    url: "https://www.djangoproject.com", category: "framework", description: "Python web framework", icon: "🎸",
  }));

  await safeFetch("https://pypi.org/pypi/Flask/json", (data) => ({
    name: "Flask", version: data.info?.version || "N/A",
    url: "https://flask.palletsprojects.com", category: "framework", description: "Lightweight Python framework", icon: "🧪",
  }));

  await safeFetch("https://pypi.org/pypi/fastapi/json", (data) => ({
    name: "FastAPI", version: data.info?.version || "N/A",
    url: "https://fastapi.tiangolo.com", category: "framework", description: "Modern Python web framework", icon: "🚀",
  }));

  await safeFetch("https://api.github.com/repos/laravel/laravel/releases/latest", (data) => ({
    name: "Laravel", version: data.tag_name?.replace("v", "") || "N/A", released: data.published_at,
    url: "https://laravel.com", category: "framework", description: "PHP web application framework", icon: "🔴",
  }));

  await safeFetch("https://api.github.com/repos/rails/rails/releases/latest", (data) => ({
    name: "Ruby on Rails", version: data.tag_name?.replace("v", "") || "N/A", released: data.published_at,
    url: "https://rubyonrails.org", category: "framework", description: "Ruby web framework", icon: "🛤️",
  }));

  await safeFetch("https://api.github.com/repos/spring-projects/spring-boot/releases/latest", (data) => ({
    name: "Spring Boot", version: data.tag_name?.replace("v", "") || "N/A", released: data.published_at,
    url: "https://spring.io/projects/spring-boot", category: "framework", description: "Java application framework", icon: "🍃",
  }));

  // === DATABASES ===
  
  await safeFetch("https://api.github.com/repos/postgres/postgres/tags", (data) => ({
    name: "PostgreSQL", version: data[0]?.name?.replace("REL_", "").replace(/_/g, ".") || "N/A",
    url: "https://www.postgresql.org", category: "database", description: "Advanced open source database", icon: "🐘",
  }));

  await safeFetch("https://api.github.com/repos/mysql/mysql-server/tags", (data) => ({
    name: "MySQL", version: data[0]?.name?.replace("mysql-", "") || "N/A",
    url: "https://www.mysql.com", category: "database", description: "Popular open source database", icon: "🐬",
  }));

  await safeFetch("https://api.github.com/repos/mongodb/mongo/releases/latest", (data) => ({
    name: "MongoDB", version: data.tag_name?.replace("r", "") || "N/A", released: data.published_at,
    url: "https://www.mongodb.com", category: "database", description: "Popular NoSQL database", icon: "🍃",
  }));

  await safeFetch("https://api.github.com/repos/redis/redis/releases/latest", (data) => ({
    name: "Redis", version: data.tag_name || "N/A", released: data.published_at,
    url: "https://redis.io", category: "database", description: "In-memory data store", icon: "🔴",
  }));

  await safeFetch("https://registry.npmjs.org/firebase/latest", (data) => ({
    name: "Firebase", version: data.version || "N/A",
    url: "https://firebase.google.com", category: "database", description: "Google's app development platform", icon: "🔥",
  }));

  await safeFetch("https://registry.npmjs.org/@supabase/supabase-js/latest", (data) => ({
    name: "Supabase", version: data.version || "N/A",
    url: "https://supabase.com", category: "database", description: "Open source Firebase alternative", icon: "⚡",
  }));

  // === CODE EDITORS ===
  
  await safeFetch("https://api.github.com/repos/microsoft/vscode/releases/latest", (data) => ({
    name: "VS Code", version: data.tag_name || "N/A", released: data.published_at,
    url: "https://code.visualstudio.com", category: "editor", description: "Popular code editor", icon: "💙",
  }));

  await safeFetch("https://api.github.com/repos/getcursor/cursor/releases/latest", (data) => ({
    name: "Cursor", version: data.tag_name?.replace("v", "") || "N/A", released: data.published_at,
    url: "https://cursor.sh", category: "editor", description: "AI-powered code editor", icon: "🤖",
  }));

  await safeFetch("https://api.github.com/repos/zed-industries/zed/releases/latest", (data) => ({
    name: "Zed", version: data.tag_name?.replace("v", "") || "N/A", released: data.published_at,
    url: "https://zed.dev", category: "editor", description: "High-performance code editor", icon: "⚡",
  }));

  await safeFetch("https://api.github.com/repos/neovim/neovim/releases/latest", (data) => ({
    name: "Neovim", version: data.tag_name?.replace("v", "") || "N/A", released: data.published_at,
    url: "https://neovim.io", category: "editor", description: "Hyperextensible Vim-based editor", icon: "🌙",
  }));

  // === AI TOOLS ===
  
  await safeFetch("https://pypi.org/pypi/openai/json", (data) => ({
    name: "OpenAI API", version: data.info?.version || "N/A",
    url: "https://openai.com", category: "ai", description: "ChatGPT & GPT-4 API", icon: "🤖",
  }));

  await safeFetch("https://pypi.org/pypi/anthropic/json", (data) => ({
    name: "Claude API", version: data.info?.version || "N/A",
    url: "https://anthropic.com", category: "ai", description: "Claude AI API", icon: "🔮",
  }));

  await safeFetch("https://pypi.org/pypi/google-generativeai/json", (data) => ({
    name: "Gemini API", version: data.info?.version || "N/A",
    url: "https://ai.google.dev", category: "ai", description: "Google Gemini AI API", icon: "✨",
  }));

  await safeFetch("https://pypi.org/pypi/transformers/json", (data) => ({
    name: "Hugging Face", version: data.info?.version || "N/A",
    url: "https://huggingface.co", category: "ai", description: "Transformers library", icon: "🤗",
  }));

  await safeFetch("https://pypi.org/pypi/langchain/json", (data) => ({
    name: "LangChain", version: data.info?.version || "N/A",
    url: "https://www.langchain.com", category: "ai", description: "LLM application framework", icon: "🦜",
  }));

  await safeFetch("https://api.github.com/repos/ollama/ollama/releases/latest", (data) => ({
    name: "Ollama", version: data.tag_name?.replace("v", "") || "N/A", released: data.published_at,
    url: "https://ollama.com", category: "ai", description: "Run LLMs locally", icon: "🦙",
  }));

  await safeFetch("https://pypi.org/pypi/tensorflow/json", (data) => ({
    name: "TensorFlow", version: data.info?.version || "N/A",
    url: "https://www.tensorflow.org", category: "ai", description: "ML platform", icon: "🧠",
  }));

  await safeFetch("https://pypi.org/pypi/torch/json", (data) => ({
    name: "PyTorch", version: data.info?.version || "N/A",
    url: "https://pytorch.org", category: "ai", description: "ML framework", icon: "🔥",
  }));

  // === LIBRARIES ===
  
  await safeFetch("https://registry.npmjs.org/tailwindcss/latest", (data) => ({
    name: "Tailwind CSS", version: data.version || "N/A",
    url: "https://tailwindcss.com", category: "library", description: "Utility-first CSS framework", icon: "💨",
  }));

  await safeFetch("https://registry.npmjs.org/bootstrap/latest", (data) => ({
    name: "Bootstrap", version: data.version || "N/A",
    url: "https://getbootstrap.com", category: "library", description: "Popular CSS framework", icon: "🅱️",
  }));

  await safeFetch("https://registry.npmjs.org/@mui/material/latest", (data) => ({
    name: "Material-UI", version: data.version || "N/A",
    url: "https://mui.com", category: "library", description: "React component library", icon: "Ⓜ️",
  }));

  // === DEVELOPMENT TOOLS ===
  
  await safeFetch("https://registry.npmjs.org/typescript/latest", (data) => ({
    name: "TypeScript", version: data.version || "N/A",
    url: "https://www.typescriptlang.org", category: "tool", description: "Typed superset of JavaScript", icon: "🔷",
  }));

  await safeFetch("https://registry.npmjs.org/vite/latest", (data) => ({
    name: "Vite", version: data.version || "N/A",
    url: "https://vitejs.dev", category: "tool", description: "Next generation build tool", icon: "⚡",
  }));

  await safeFetch("https://registry.npmjs.org/webpack/latest", (data) => ({
    name: "Webpack", version: data.version || "N/A",
    url: "https://webpack.js.org", category: "tool", description: "Static module bundler", icon: "📦",
  }));

  await safeFetch("https://registry.npmjs.org/prisma/latest", (data) => ({
    name: "Prisma", version: data.version || "N/A",
    url: "https://www.prisma.io", category: "tool", description: "Next-gen ORM for Node.js", icon: "🔺",
  }));

  await safeFetch("https://registry.npmjs.org/eslint/latest", (data) => ({
    name: "ESLint", version: data.version || "N/A",
    url: "https://eslint.org", category: "tool", description: "Pluggable linting utility", icon: "🔍",
  }));

  await safeFetch("https://registry.npmjs.org/prettier/latest", (data) => ({
    name: "Prettier", version: data.version || "N/A",
    url: "https://prettier.io", category: "tool", description: "Opinionated code formatter", icon: "✨",
  }));

  await safeFetch("https://registry.npmjs.org/jest/latest", (data) => ({
    name: "Jest", version: data.version || "N/A",
    url: "https://jestjs.io", category: "tool", description: "JavaScript testing framework", icon: "🃏",
  }));

  await safeFetch("https://registry.npmjs.org/vitest/latest", (data) => ({
    name: "Vitest", version: data.version || "N/A",
    url: "https://vitest.dev", category: "tool", description: "Blazing fast unit test framework", icon: "⚡",
  }));

  await safeFetch("https://api.github.com/repos/docker/cli/releases/latest", (data) => ({
    name: "Docker", version: data.tag_name?.replace("v", "") || "N/A", released: data.published_at,
    url: "https://www.docker.com", category: "tool", description: "Containerization platform", icon: "🐳",
  }));

  return results.sort((a, b) => a.name.localeCompare(b.name));
}

export default async function Home() {
  const versions = await getLatestVersions();
  const now = new Date();

  return <VersionGrid versions={versions} lastUpdated={now} />;
}

export const revalidate = 43200;