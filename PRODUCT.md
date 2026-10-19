# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Electron desktop app with plain HTML/CSS/JS in the windows. No UI framework (user's choice; revisit only if screens grow complex).

## Users

The owner first: a developer running several AI coding agents at once (Claude Code, Gemini CLI, Antigravity, Codex…) who wants to see them all at a glance without switching terminals. Later: public GitHub release for other developers with the same setup.

## Product Purpose

Collective-Runtime connects independent AI agents so they can communicate, reason, and build solutions together, and shows that work on the desktop. Each agent appears as its own small pet that reacts to its state (idle, working, waiting for you, done). Success: you notice at a glance which agent needs you, and agents coordinate instead of working blind to each other.

## Positioning

Built for many agents at once: one pet per agent, side by side. Agent-to-agent communication is a core goal from the start, not just status display. clawd-on-desk (the inspiration) centers on a single pet reacting to sessions.

## Operating Context

- The pet window floats, see-through and always on top, in a corner of the desktop while the user works in terminals and editors.
- Agents report state through hooks that post to a local event server (127.0.0.1 only).
- A Settings window configures the app. v1 sections: Agents (connect/disconnect each agent's hooks), General (pet size, labels), Theme (which pet character).

## Capabilities and Constraints

- Working today: pet window, local event server with input validation, Claude Code hook script (`hooks/notify.js`).
- Not built yet: agent-to-agent messaging, Settings window, hook install/uninstall from the UI, real mascot art.
- License is MIT. clawd-on-desk is AGPL-3.0: copy its look and ideas, never its code or sprite files.
- Undecided: how agents exchange messages (protocol, what the user sees of it).

## Brand Commitments

- Visual reference is binding: `Referance/` screenshots of clawd-on-desk's Settings window. Settings should be built from the same kind of boxes (grouped cards with a title, a one-line description, and a control on the right).
- Copy follows the reference's style: short title, one plain sentence explaining what the setting does.
- The mascot must be original. Clawd is Anthropic's Claude Code mascot and must not be reused. Mascot direction: smooth, cute characters (ip-as-logo skill), not pixel art. Art not made yet.

## Evidence on Hand

- `Referance/`: 12 unique screenshots of clawd-on-desk Settings (3 files are duplicate "- Copy"s).
- No users, testimonials, metrics, or release history yet. Do not invent any.

## Product Principles

1. The pet tells you who needs you; everything else is secondary.
2. Many agents, one glance: every screen must scale from one agent to many.
3. Local and private by default: nothing leaves the machine unless the user turns it on.
4. Agents collaborate, the user stays in charge: coordination is visible, never silent.
