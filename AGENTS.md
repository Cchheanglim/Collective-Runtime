# Collective-Runtime: brief for AI agents

A Windows desktop app that connects independent AI coding agents (Claude Code, Gemini CLI, Antigravity, Codex CLI) and shows each one on the desktop as its own small pet that reacts to its state: idle, working, waiting for you, done. Agent-to-agent communication is a core goal from the start. Inspired by clawd-on-desk (github.com/rullerzhou-afk/clawd-on-desk). The owner is a beginner: explain things plainly.

Full product context: `PRODUCT.md`. Settings window design contract: `.impeccable/surfaces/src-settings-html.md`.

## Rules

- Stack: Electron + plain HTML/CSS/JS. No UI framework.
- License is MIT. clawd-on-desk is AGPL-3.0: copy its look and ideas only, never its code or sprite files. Never reuse "Clawd" (Anthropic's mascot); our mascot must be original.
- The look is pinned to the screenshots in `Referance/`: dark theme, left sidebar, coral accent, settings grouped in rounded boxes (title, one plain sentence, control on the right).
- Mascot style: smooth and cute, not pixel art. Not made yet.
- Never put API keys or other secrets in files, commits, or chat.
- Work on branch `Cook-branch`. Run `npm test` before saying something works; start the app with `npm start`.

## Code map

- `src/main.js`: pet window (see-through, always on top), local event server (`127.0.0.1:47321`, `POST /event` with JSON `{agent, session, state}`), right-click menu (Settings / Quit), saved settings, Settings window.
- `src/events.js`: validates incoming events.
- `src/claude-hooks.js`: adds/removes our hook in `~/.claude/settings.json`; keeps other tools' hooks, backs up first, refuses files it can't parse.
- `hooks/collective-notify.js`: Claude Code hook that reports session state to the app.
- `src/pets.js`, `src/pets.css`: placeholder pets, shared by both windows.
- `src/settings.html|css|js`: Settings window (in progress).

## Settings v1

- Agents: real Connect/Disconnect for Claude Code. Gemini CLI, Antigravity, and Codex CLI show as "coming soon".
- General: pet size (50–150%), show name labels, remove finished pets (after 30s), start with Windows.
- Theme: the placeholder pets (active) plus a "mascot coming soon" card.

## Next up

1. Finish and visually check the Settings window.
2. Mascot images: waiting on an image-generation API key with billing enabled.
3. Security review of the event server and hook script.
4. Hooks for Gemini CLI, Antigravity, and Codex.
5. Agent-to-agent messaging (design undecided).
