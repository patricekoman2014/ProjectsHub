import type { Hook, HookEventType } from "@/app/types/hook";
import Image from "next/image";

interface HookCardProps {
  hook: Hook;
}

const eventTypeColors: Record<HookEventType, string> = {
  PreToolUse: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  PostToolUse:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  PermissionRequest:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  UserPromptSubmit:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Notification:
    "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  Stop: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  SubagentStop:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  SessionStart:
    "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
  SessionEnd: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
  PreCompact:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
};

const StarIcon = () => (
  <svg
    className="h-4 w-4"
    fill="currentColor"
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const GitHubIcon = () => (
  <svg
    className="h-4 w-4"
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

const HookCard = ({ hook }: HookCardProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.open(hook.repoLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <article
      className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
      tabIndex={0}
      role="article"
      aria-label={`${hook.name} hook by ${hook.author}`}
      onKeyDown={handleKeyDown}
    >
      <div className="mb-3 flex items-center justify-between">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${eventTypeColors[hook.eventType]}`}
        >
          {hook.eventType}
        </span>
        <span
          className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400"
          aria-label={`${hook.stars} GitHub stars`}
        >
          <StarIcon />
          {hook.stars.toLocaleString()}
        </span>
      </div>

      <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {hook.name}
      </h3>

      <p className="mb-4 line-clamp-2 flex-grow text-sm text-zinc-600 dark:text-zinc-400">
        {hook.description}
      </p>

      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          {hook.authorAvatar ? (
            <Image
              src={hook.authorAvatar}
              alt={`${hook.author}'s avatar`}
              width={24}
              height={24}
              className="rounded-full"
            />
          ) : (
            <div
              className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-xs font-medium text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
              aria-hidden="true"
            >
              {hook.author.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="text-sm text-zinc-700 dark:text-zinc-300">
            {hook.author}
          </span>
        </div>

        <a
          href={hook.repoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          aria-label={`View ${hook.name} on GitHub`}
          tabIndex={0}
        >
          <GitHubIcon />
          <span>View</span>
        </a>
      </div>
    </article>
  );
};

export default HookCard;
