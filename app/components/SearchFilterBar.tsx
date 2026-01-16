"use client";

import type { HookEventType, HookFilters, SortOption } from "@/app/types/hook";

interface SearchFilterBarProps {
  filters: HookFilters;
  onFiltersChange: (filters: HookFilters) => void;
}

const eventTypes: Array<{ value: HookEventType | "all"; label: string }> = [
  { value: "all", label: "All Events" },
  { value: "PreToolUse", label: "Pre Tool Use" },
  { value: "PostToolUse", label: "Post Tool Use" },
  { value: "PermissionRequest", label: "Permission Request" },
  { value: "UserPromptSubmit", label: "User Prompt Submit" },
  { value: "Notification", label: "Notification" },
  { value: "Stop", label: "Stop" },
  { value: "SubagentStop", label: "Subagent Stop" },
  { value: "SessionStart", label: "Session Start" },
  { value: "SessionEnd", label: "Session End" },
  { value: "PreCompact", label: "Pre Compact" },
];

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: "recent", label: "Most Recent" },
  { value: "stars", label: "Most Stars" },
  { value: "name", label: "Alphabetical" },
];

const SearchIcon = () => (
  <svg
    className="h-5 w-5 text-zinc-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const SearchFilterBar = ({ filters, onFiltersChange }: SearchFilterBarProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, search: e.target.value });
  };

  const handleEventTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      eventType: e.target.value as HookEventType | "all",
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, sort: e.target.value as SortOption });
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-grow">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon />
        </div>
        <input
          type="text"
          value={filters.search}
          onChange={handleSearchChange}
          placeholder="Search hooks..."
          className="block w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder-zinc-500 transition-colors focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-400 dark:focus:border-zinc-500"
          aria-label="Search hooks by name or description"
        />
      </div>

      <div className="flex gap-3">
        <select
          value={filters.eventType}
          onChange={handleEventTypeChange}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 transition-colors focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          aria-label="Filter by event type"
        >
          {eventTypes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={filters.sort}
          onChange={handleSortChange}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 transition-colors focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          aria-label="Sort hooks"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilterBar;
