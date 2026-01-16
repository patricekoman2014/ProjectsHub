# HookHub - Project Specification

## Overview

HookHub is a web application that serves as a curated directory of Claude Code hooks. Users can discover, browse, and share hooks from GitHub repositories displayed in an intuitive grid layout.

---

## Core Concept

Claude Code hooks are user-defined shell commands that execute at various points in Claude Code's lifecycle. HookHub aggregates these hooks from GitHub repositories, making them easily discoverable for the community.

---

## Data Model

### Hook Entity

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier |
| `name` | string | Hook name |
| `description` | string | Brief description of what the hook does |
| `repoLink` | string | GitHub repository URL |
| `author` | string | GitHub username or organization |
| `hookType` | enum | `command` or `prompt` |
| `eventType` | enum | Hook event type (see below) |
| `stars` | number | GitHub stars count |
| `createdAt` | datetime | When the hook was added |
| `updatedAt` | datetime | Last update timestamp |

### Hook Event Types

- `PreToolUse` - Before tool calls
- `PostToolUse` - After tool calls complete
- `PermissionRequest` - When permission dialogs are shown
- `UserPromptSubmit` - When user submits a prompt
- `Notification` - When Claude Code sends notifications
- `Stop` - When main agent finishes
- `SubagentStop` - When subagent tasks complete
- `SessionStart` - When session starts/resumes
- `SessionEnd` - When session ends
- `PreCompact` - Before context compaction

---

## Pages & Features

### 1. Main Page (Home)

**URL:** `/`

**Layout:** Grid of hook cards

**Features:**
- Display all hooks in a responsive grid (3-4 columns on desktop, 2 on tablet, 1 on mobile)
- Each card shows:
  - Hook name
  - Short description (truncated if needed)
  - Event type badge
  - GitHub stars
  - Author avatar/name
- Search bar for filtering hooks by name/description
- Filter dropdown by event type
- Sort options: Most recent, Most stars, Alphabetical

### 2. Hook Detail Page

**URL:** `/hooks/:id`

**Features:**
- Full hook name and description
- Link to GitHub repository
- Author information
- Event type with explanation
- Installation instructions
- Code preview (if available)
- Related hooks section

### 3. Submit Hook Page

**URL:** `/submit`

**Features:**
- Form to submit a new hook
- Fields: GitHub repo URL (required), name, description
- Auto-fetch repo metadata from GitHub API
- Validation for valid Claude Code hook structure

### 4. Categories Page

**URL:** `/categories`

**Features:**
- Browse hooks grouped by event type
- Visual representation of each category
- Count of hooks per category

---

## UI Components

### Hook Card

```
+----------------------------------+
|  [Event Badge]         [Stars]   |
|                                  |
|  Hook Name                       |
|  Short description text that     |
|  might wrap to multiple lines... |
|                                  |
|  [Author Avatar] author-name     |
|  [View on GitHub]                |
+----------------------------------+
```

### Search & Filter Bar

```
+--------------------------------------------------+
| [Search icon] Search hooks...  | [Filter v] [Sort v] |
+--------------------------------------------------+
```

### Grid Layout

```
+----------+  +----------+  +----------+
|  Card 1  |  |  Card 2  |  |  Card 3  |
+----------+  +----------+  +----------+
+----------+  +----------+  +----------+
|  Card 4  |  |  Card 5  |  |  Card 6  |
+----------+  +----------+  +----------+
```

---

## Technical Stack (Suggested)

| Layer | Technology |
|-------|------------|
| Frontend | React / Next.js |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes or Express |
| Database | PostgreSQL or SQLite |
| API | GitHub API for repo metadata |
| Hosting | Vercel / Railway |

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/hooks` | List all hooks (with pagination, filters) |
| GET | `/api/hooks/:id` | Get single hook details |
| POST | `/api/hooks` | Submit a new hook |
| GET | `/api/categories` | List hooks grouped by event type |
| GET | `/api/search?q=` | Search hooks |

### Query Parameters for `/api/hooks`

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)
- `eventType` - Filter by event type
- `sort` - Sort by: `stars`, `recent`, `name`
- `q` - Search query

---

## User Stories

1. **As a developer**, I want to browse available Claude Code hooks so I can enhance my workflow.

2. **As a developer**, I want to filter hooks by event type so I can find hooks relevant to my needs.

3. **As a hook author**, I want to submit my hook repository so others can discover and use it.

4. **As a visitor**, I want to search for hooks by keyword so I can quickly find what I need.

5. **As a visitor**, I want to see GitHub stars so I can gauge the popularity of a hook.

---

## Future Enhancements

- User authentication (GitHub OAuth)
- Upvoting/favoriting hooks
- Comments and reviews
- Hook collections/lists
- One-click installation instructions
- Hook compatibility badges
- Trending hooks section
- Newsletter for new hooks

---

## Wireframe Reference

### Main Page Wireframe

```
+----------------------------------------------------------+
|  [Logo] HookHub                    [Submit Hook] [GitHub] |
+----------------------------------------------------------+
|                                                          |
|  Discover Claude Code Hooks                              |
|  Find and share hooks from the community                 |
|                                                          |
|  +----------------------------------------------------+  |
|  | [Search...]              [Event Type v] [Sort v]   |  |
|  +----------------------------------------------------+  |
|                                                          |
|  +------------+  +------------+  +------------+          |
|  |            |  |            |  |            |          |
|  |  Hook 1    |  |  Hook 2    |  |  Hook 3    |          |
|  |            |  |            |  |            |          |
|  +------------+  +------------+  +------------+          |
|                                                          |
|  +------------+  +------------+  +------------+          |
|  |            |  |            |  |            |          |
|  |  Hook 4    |  |  Hook 5    |  |  Hook 6    |          |
|  |            |  |            |  |            |          |
|  +------------+  +------------+  +------------+          |
|                                                          |
|  [Load More...]                                          |
|                                                          |
+----------------------------------------------------------+
|  Footer - Made with Claude Code                          |
+----------------------------------------------------------+
```

---

## Success Metrics

- Number of hooks listed
- Monthly active users
- Hook submissions per month
- Search queries performed
- Click-through rate to GitHub repos

---

## Version

**v1.0** - Initial specification
