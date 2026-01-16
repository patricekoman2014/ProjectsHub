"use client";

import { useState, useMemo } from "react";
import HookCard from "@/app/components/HookCard";
import SearchFilterBar from "@/app/components/SearchFilterBar";
import { mockHooks } from "@/app/data/mockHooks";
import type { Hook, HookFilters } from "@/app/types/hook";

const GitHubIcon = () => (
  <svg
    className="h-5 w-5"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

const filterAndSortHooks = (hooks: Hook[], filters: HookFilters): Hook[] => {
  let filtered = [...hooks];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (hook) =>
        hook.name.toLowerCase().includes(searchLower) ||
        hook.description.toLowerCase().includes(searchLower) ||
        hook.author.toLowerCase().includes(searchLower)
    );
  }

  if (filters.eventType !== "all") {
    filtered = filtered.filter((hook) => hook.eventType === filters.eventType);
  }

  switch (filters.sort) {
    case "stars":
      filtered.sort((a, b) => b.stars - a.stars);
      break;
    case "name":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "recent":
    default:
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
  }

  return filtered;
};

export default function Home() {
  const [filters, setFilters] = useState<HookFilters>({
    search: "",
    eventType: "all",
    sort: "recent",
  });

  const filteredHooks = useMemo(
    () => filterAndSortHooks(mockHooks, filters),
    [filters]
  );

  const handleFiltersChange = (newFilters: HookFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-100">
              <span className="text-lg font-bold text-white dark:text-zinc-900">
                H
              </span>
            </div>
            <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              HookHub
            </span>
          </div>

          <nav className="flex items-center gap-4">
            <a
              href="/submit"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
              aria-label="Submit a new hook"
            >
              Submit Hook
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              aria-label="View project on GitHub"
            >
              <GitHubIcon />
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
            Discover Claude Code Hooks
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Find and share hooks from the community to enhance your Claude Code
            workflow. Browse curated hooks for every event type.
          </p>
        </section>

        <section className="mb-8">
          <SearchFilterBar
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        </section>

        <section aria-label="Hooks grid">
          {filteredHooks.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                No hooks found matching your criteria.
              </p>
              <button
                onClick={() =>
                  setFilters({ search: "", eventType: "all", sort: "recent" })
                }
                className="mt-4 text-sm font-medium text-zinc-900 underline hover:no-underline dark:text-zinc-100"
                type="button"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
                Showing {filteredHooks.length} hook
                {filteredHooks.length !== 1 ? "s" : ""}
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredHooks.map((hook) => (
                  <HookCard key={hook.id} hook={hook} />
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            Made with Claude Code
          </p>
        </div>
      </footer>
    </div>
  );
}
