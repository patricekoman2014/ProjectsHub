export type HookEventType =
  | "PreToolUse"
  | "PostToolUse"
  | "PermissionRequest"
  | "UserPromptSubmit"
  | "Notification"
  | "Stop"
  | "SubagentStop"
  | "SessionStart"
  | "SessionEnd"
  | "PreCompact";

export type HookType = "command" | "prompt";

export interface Hook {
  id: string;
  name: string;
  description: string;
  repoLink: string;
  author: string;
  authorAvatar?: string;
  hookType: HookType;
  eventType: HookEventType;
  stars: number;
  createdAt: string;
  updatedAt: string;
}

export type SortOption = "recent" | "stars" | "name";

export interface HookFilters {
  search: string;
  eventType: HookEventType | "all";
  sort: SortOption;
}
