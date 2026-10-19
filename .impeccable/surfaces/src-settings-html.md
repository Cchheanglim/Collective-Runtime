---
version: 1
slug: "src-settings-html"
primary_target: "src/settings.html"
related_targets: []
---

# Settings window

Scope: the Electron Settings window (`src/settings.html`). Mode: Operate.

Audience and job: the owner, a developer running several AI agents, adjusts how the desktop pets behave and connects agents. Visits are short and infrequent: connect an agent once, tweak size and labels now and then.

v1 sections (user-confirmed):
- Agents: Claude Code Connect/Disconnect really edits `~/.claude/settings.json` (preserve every other key and hook, back up, never write over unparseable JSON). Gemini CLI, Antigravity, and Codex CLI are listed as coming soon.
- General: pet size slider, show name labels, remove finished pets, start with Windows.
- Theme: which pet character. Only the placeholder exists; the mascot art is pending.
Opened by right-clicking a pet (Settings / Quit).

Constraints: the look is pinned to the `Referance/` screenshots (clawd-on-desk Settings). Copy the look, never its code or assets (AGPL). Plain HTML/CSS/JS, no framework.

## Direction contract

THESIS: A quiet, familiar desktop settings panel, close to the reference: left sidebar, a title and one sentence per page, settings grouped in rounded boxes. It refuses the generic web-dashboard look (top nav, hero, icon tiles) and the one-pet framing: every page assumes many agents.

OWN-WORLD: Near-black charcoal ground, a slightly darker sidebar, raised charcoal boxes with hairline borders, and a coral accent used only for on-switches, the slider, the selected nav icon, primary actions, and the active theme. Group headings are small grey uppercase tracked labels that head their box (never an eyebrow above another heading). Pill badges for state. Each agent carries its own identity color (Claude coral, Gemini cyan, Antigravity violet, Codex pink), shown as its dot on the Agents page and as the ring around its live pet. A pet's body colour is its state (grey idle, blue working, amber needs you, green done). System UI sans (Segoe UI) throughout.

STORY: The user sees whether the app is healthy (the event server status at the top of the sidebar), sees which agents are connected and what they are doing right now, and changes a setting with one click. Every change applies immediately; there is no Save button.

FIRST VIEWPORT: 1100×760 window. Sidebar (240px): server status pill on top, nav (Agents, General, Theme), and at the bottom the signature live pet row. Content: page title, one-line description, then grouped boxes. Agents opens first: Claude Code row with badges, live session summary, and Connect/Disconnect on the right; coming-soon agents below, muted.

FORM: brief-pinned reference layout (the user pinned the world). Signature move: the sidebar's bottom shows the real pets currently on the desktop, live, in their current states, so Settings never forgets it is about agents. seed:3362f4a43d23db7c (rolled after the user pinned the world to Referance/; the pinned layout stands)

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
