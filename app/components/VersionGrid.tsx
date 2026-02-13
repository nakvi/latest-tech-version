// components/VersionGrid.tsx
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { format } from "date-fns";

type VersionInfo = {
  name: string;
  version: string;
  released?: string;
  url?: string;
  category: "language" | "runtime" | "framework" | "library" | "tool" | "database" | "editor" | "ai";
  description?: string;
  icon?: string;
};

type VersionGridProps = {
  versions: VersionInfo[];
  lastUpdated: Date;
};

export default function VersionGrid({ versions, lastUpdated }: VersionGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  
  const touchStartY = useRef(0);
  const isPulling = useRef(false);

  const categoryLabels = {
    all: "All",
    language: "Programming Languages",
    runtime: "Runtimes",
    framework: "Frameworks",
    library: "Libraries",
    tool: "Development Tools",
    database: "Databases",
    editor: "Code Editors",
    ai: "AI Tools",
  };

  const categoryIcons = {
    all: "🌐",
    language: "💻",
    runtime: "⚡",
    framework: "🏗️",
    library: "📦",
    tool: "🔧",
    database: "🗄️",
    editor: "✏️",
    ai: "🤖",
  };

  // Scroll to top/bottom button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pull to refresh functionality
  useEffect(() => {
    let startY = 0;
    let currentY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY;
        isPulling.current = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling.current || window.scrollY > 0) {
        isPulling.current = false;
        setPullDistance(0);
        return;
      }

      currentY = e.touches[0].clientY;
      const distance = currentY - startY;

      if (distance > 0 && distance < 150) {
        e.preventDefault();
        setPullDistance(distance);
      }
    };

    const handleTouchEnd = () => {
      if (isPulling.current && pullDistance > 80) {
        setIsRefreshing(true);
        // Trigger page refresh
        window.location.reload();
      }
      
      isPulling.current = false;
      setPullDistance(0);
    };

    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [pullDistance]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Scroll to bottom function
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  // Filter versions based on search and category
  const filteredVersions = useMemo(() => {
    return versions.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [versions, searchQuery, selectedCategory]);

  // Group by category
  const grouped = filteredVersions.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, VersionInfo[]>);

  // Count by category for stats
  const categoryCounts = versions.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Pull to Refresh Indicator */}
      {pullDistance > 0 && (
        <div
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-all duration-300"
          style={{
            height: `${Math.min(pullDistance, 80)}px`,
            opacity: pullDistance / 80,
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <svg
              className={`w-6 h-6 ${pullDistance > 80 ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="text-sm font-medium">
              {pullDistance > 80 ? "Release to refresh" : "Pull to refresh"}
            </span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        {/* Animated Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block animate-bounce mb-4">
            <div className="text-6xl md:text-7xl">🚀</div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
            Latest Tech Versions
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-2 max-w-2xl mx-auto px-4">
            Always up-to-date versions of popular programming languages, frameworks & tools
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Last updated: {format(lastUpdated, "PPP 'at' p")}</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              ⏱️ Auto-refreshes every 12 hours
            </span>
          </div>
        </div>

        {/* Enhanced Search and Filter Bar */}
        <div className="mb-6 md:mb-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-4 md:p-6 border border-white/20">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 md:px-6 py-3 md:py-4 pl-12 md:pl-14 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-base md:text-lg bg-white"
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-gray-400 transition-colors group-hover:text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Category Pills - Horizontal Scroll on Mobile */}
            <div className="relative">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
                {Object.entries(categoryLabels).map(([key, label]) => {
                  const count = key === "all" ? versions.length : categoryCounts[key] || 0;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      className={`snap-start flex-shrink-0 px-4 md:px-5 py-2.5 md:py-3 rounded-xl whitespace-nowrap transition-all duration-300 font-medium text-sm md:text-base shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95 ${
                        selectedCategory === key
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <span className="mr-2 text-lg">
                        {categoryIcons[key as keyof typeof categoryIcons]}
                      </span>
                      <span className="hidden sm:inline">{label}</span>
                      <span className="sm:hidden">{label.split(" ")[0]}</span>
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                        selectedCategory === key 
                          ? "bg-white/30" 
                          : "bg-gray-100"
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
              {/* Scroll indicators */}
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white/80 to-transparent pointer-events-none md:hidden"></div>
              <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white/80 to-transparent pointer-events-none md:hidden"></div>
            </div>

            {/* Results count with animation */}
            <div className="flex items-center justify-between text-sm text-gray-600 px-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  Showing {filteredVersions.length} of {versions.length}
                </span>
                {searchQuery && (
                  <span className="text-blue-600">
                    for &quot;{searchQuery}&quot;
                  </span>
                )}
              </div>
              {filteredVersions.length === 0 && (
                <span className="text-orange-600 animate-pulse">No results found</span>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards - Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4 mb-8 md:mb-12">
          {Object.entries(categoryLabels)
            .filter(([key]) => key !== "all")
            .map(([key, label], index) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                style={{ animationDelay: `${index * 50}ms` }}
                className={`bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-xl text-center transition-all duration-300 hover:-translate-y-1 border border-white/20 animate-fadeInUp ${
                  selectedCategory === key ? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/30" : ""
                }`}
              >
                <div className="text-3xl md:text-4xl mb-1 md:mb-2 animate-bounce-slow">
                  {categoryIcons[key as keyof typeof categoryIcons]}
                </div>
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {categoryCounts[key] || 0}
                </div>
                <div className="text-xs md:text-sm text-gray-600 mt-1 line-clamp-1">
                  {label}
                </div>
              </button>
            ))}
        </div>

        {/* Version Cards */}
        {filteredVersions.length === 0 ? (
          <div className="text-center py-16 md:py-24 animate-fadeIn">
            <div className="text-6xl md:text-8xl mb-4 animate-bounce">🔍</div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-600 mb-2">
              No results found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Clear Filters
            </button>
          </div>
        ) : selectedCategory === "all" ? (
          // Show all grouped by category
          Object.entries(categoryLabels)
            .filter(([key]) => key !== "all" && grouped[key]?.length > 0)
            .map(([category, label]) => {
              const items = grouped[category];
              return (
                <div key={category} className="mb-10 md:mb-16 animate-fadeIn">
                  <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6 pb-3 border-b-2 border-gray-200">
                    <span className="text-4xl md:text-5xl animate-bounce-slow">
                      {categoryIcons[category as keyof typeof categoryIcons]}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      {label}
                    </h2>
                    <span className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      {items.length}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {items.map((item, index) => (
                      <VersionCard key={item.name} item={item} index={index} />
                    ))}
                  </div>
                </div>
              );
            })
        ) : (
          // Show filtered results in grid
          <div className="animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredVersions.map((item, index) => (
                <VersionCard key={item.name} item={item} index={index} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Scroll to Top/Bottom Button */}
      <button
        onClick={showScrollTop ? scrollToTop : scrollToBottom}
        className={`fixed right-6 bottom-6 z-50 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-110 active:scale-95 ${
          showScrollTop ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
        aria-label={showScrollTop ? "Scroll to top" : "Scroll to bottom"}
      >
        <svg
          className={`w-6 h-6 transition-transform duration-300 ${
            showScrollTop ? "rotate-0" : "rotate-180"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

function VersionCard({ item, index }: { item: VersionInfo; index: number }) {
  return (
    <div
      style={{ animationDelay: `${index * 30}ms` }}
      className="group bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-300 hover:-translate-y-2 animate-fadeInUp"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2 flex-1">
          {item.icon && (
            <div className="text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
          )}
          <h3 className="text-lg md:text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
            {item.name}
          </h3>
        </div>
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 text-gray-400 hover:text-blue-600 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
            title="Visit official website"
            onClick={(e) => e.stopPropagation()}
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}
      </div>

      {item.description && (
        <p className="text-xs md:text-sm text-gray-500 mb-3 line-clamp-2">
          {item.description}
        </p>
      )}

      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg md:rounded-xl p-3 md:p-4 mb-3 group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative">
          <div className="text-xs text-gray-600 mb-1 font-medium">Version</div>
          <div className="text-xl md:text-2xl font-mono font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {item.version}
          </div>
        </div>
      </div>

      {item.released && (
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="line-clamp-1">
            Released: {format(new Date(item.released), "MMM d, yyyy")}
          </span>
        </div>
      )}
    </div>
  );
}