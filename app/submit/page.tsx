"use client";

import { useState } from "react";
import Link from "next/link";
import type { HookEventType, HookType } from "@/app/types/hook";

interface FormData {
  name: string;
  description: string;
  repoLink: string;
  author: string;
  hookType: HookType;
  eventType: HookEventType;
}

const initialFormData: FormData = {
  name: "",
  description: "",
  repoLink: "",
  author: "",
  hookType: "command",
  eventType: "PreToolUse",
};

const eventTypes: Array<{ value: HookEventType; label: string }> = [
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

const hookTypes: Array<{ value: HookType; label: string; description: string }> = [
  { value: "command", label: "Command", description: "Runs a shell command" },
  { value: "prompt", label: "Prompt", description: "Sends a prompt to Claude" },
];

export default function SubmitPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Hook name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.repoLink.trim()) {
      newErrors.repoLink = "Repository link is required";
    } else if (!formData.repoLink.startsWith("https://github.com/")) {
      newErrors.repoLink = "Must be a valid GitHub repository URL";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // In a real app, this would send the data to an API
      console.log("Submitted hook:", formData);
      setIsSubmitted(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <svg
                className="h-6 w-6 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Hook Submitted!
            </h2>
            <p className="mb-6 text-zinc-600 dark:text-zinc-400">
              Thank you for your submission. Your hook will be reviewed and added to the directory soon.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/"
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
              >
                Back to Home
              </Link>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData(initialFormData);
                }}
                className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                Submit Another
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-100">
              <span className="text-lg font-bold text-white dark:text-zinc-900">H</span>
            </div>
            <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">HookHub</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Submit a Hook
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Share your Claude Code hook with the community. All submissions are reviewed before being published.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Hook Details
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Hook Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Auto-format on Save"
                  className={`mt-1 block w-full rounded-lg border ${
                    errors.name
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500 dark:border-zinc-700 dark:focus:border-zinc-500"
                  } bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-500 transition-colors focus:outline-none focus:ring-1 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-400`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe what your hook does..."
                  className={`mt-1 block w-full rounded-lg border ${
                    errors.description
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500 dark:border-zinc-700 dark:focus:border-zinc-500"
                  } bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-500 transition-colors focus:outline-none focus:ring-1 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-400`}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="repoLink"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  GitHub Repository URL
                </label>
                <input
                  type="url"
                  id="repoLink"
                  name="repoLink"
                  value={formData.repoLink}
                  onChange={handleChange}
                  placeholder="https://github.com/username/repo"
                  className={`mt-1 block w-full rounded-lg border ${
                    errors.repoLink
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500 dark:border-zinc-700 dark:focus:border-zinc-500"
                  } bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-500 transition-colors focus:outline-none focus:ring-1 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-400`}
                />
                {errors.repoLink && (
                  <p className="mt-1 text-sm text-red-500">{errors.repoLink}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="author"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Author (GitHub Username)
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="e.g., octocat"
                  className={`mt-1 block w-full rounded-lg border ${
                    errors.author
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500 dark:border-zinc-700 dark:focus:border-zinc-500"
                  } bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-500 transition-colors focus:outline-none focus:ring-1 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-400`}
                />
                {errors.author && (
                  <p className="mt-1 text-sm text-red-500">{errors.author}</p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Hook Configuration
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Hook Type
                </label>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {hookTypes.map((type) => (
                    <label
                      key={type.value}
                      className={`flex cursor-pointer flex-col rounded-lg border p-4 transition-colors ${
                        formData.hookType === type.value
                          ? "border-zinc-900 bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-800"
                          : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="hookType"
                          value={type.value}
                          checked={formData.hookType === type.value}
                          onChange={handleChange}
                          className="h-4 w-4 border-zinc-300 text-zinc-900 focus:ring-zinc-500 dark:border-zinc-600 dark:text-zinc-100"
                        />
                        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          {type.label}
                        </span>
                      </div>
                      <span className="mt-1 pl-6 text-xs text-zinc-500 dark:text-zinc-400">
                        {type.description}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="eventType"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Event Type
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition-colors focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                >
                  {eventTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Link
              href="/"
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              Submit Hook
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
