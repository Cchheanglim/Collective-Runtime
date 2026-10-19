---
name: Collective Runtime
description: A quiet dark desktop settings panel and floating pet window for watching many AI agents at once.
colors:
  ground: "#1b1c1f"
  sidebar: "#141517"
  sidebar-line: "#222326"
  box: "#222327"
  raised: "#2a2c31"
  raised-hover: "#33353b"
  nav-hover: "#1e1f22"
  nav-active: "#26272c"
  line: "#2f3136"
  control-off: "#3a3c42"
  knob: "#f4f4f5"
  text: "#ececee"
  text-2: "#a3a6ad"
  accent: "#e2775a"
  accent-hover: "#ec8a6f"
  on-accent: "#1d1210"
  ok: "#3fbf7f"
  ok-text: "#5fd89a"
  danger: "#f07070"
  danger-text: "#ff8b8b"
  agent-claude: "#e2775a"
  agent-gemini: "#45c4dc"
  agent-antigravity: "#9b7bf0"
  agent-codex: "#e46fb0"
  pet-idle: "#9aa3ad"
  pet-working: "#5b8def"
  pet-waiting: "#f0b03a"
  pet-done: "#3fbf7f"
typography:
  headline:
    fontFamily: "Segoe UI Variable Text, Segoe UI, system-ui, sans-serif"
    fontSize: "26px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Segoe UI Variable Text, Segoe UI, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
  body:
    fontFamily: "Segoe UI Variable Text, Segoe UI, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  body-strong:
    fontFamily: "Segoe UI Variable Text, Segoe UI, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.5
  body-small:
    fontFamily: "Segoe UI Variable Text, Segoe UI, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Segoe UI Variable Text, Segoe UI, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    letterSpacing: "0.06em"
  label-badge:
    fontFamily: "Segoe UI Variable Text, Segoe UI, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    letterSpacing: "0.04em"
  mono:
    fontFamily: "Cascadia Mono, Consolas, monospace"
    fontSize: "12.5px"
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  health: "10px"
  box: "12px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  row-y: "14px"
  lg: "16px"
  row-x: "20px"
  section: "28px"
  page-top: "44px"
  page-x: "48px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "34px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-secondary:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.text}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "34px"
  button-secondary-hover:
    backgroundColor: "{colors.raised-hover}"
  nav-item:
    backgroundColor: "transparent"
    textColor: "{colors.text-2}"
    rounded: "{rounded.md}"
    padding: "0 12px"
    height: "40px"
  nav-item-hover:
    backgroundColor: "{colors.nav-hover}"
    textColor: "{colors.text}"
  nav-item-active:
    backgroundColor: "{colors.nav-active}"
    textColor: "{colors.text}"
  box:
    backgroundColor: "{colors.box}"
    rounded: "{rounded.box}"
  setting-row:
    typography: "{typography.body}"
    padding: "14px 20px"
    height: "68px"
  badge:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.text-2}"
    typography: "{typography.label-badge}"
    rounded: "{rounded.sm}"
    padding: "0 8px"
    height: "20px"
  badge-ok:
    backgroundColor: "rgba(63, 191, 127, 0.14)"
    textColor: "{colors.ok-text}"
  badge-error:
    backgroundColor: "rgba(240, 112, 112, 0.14)"
    textColor: "{colors.danger-text}"
  switch-off:
    backgroundColor: "{colors.control-off}"
    rounded: "{rounded.pill}"
    width: "42px"
    height: "24px"
  switch-on:
    backgroundColor: "{colors.accent}"
  health-pill:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.text}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.health}"
    padding: "10px 12px"
  theme-card:
    backgroundColor: "{colors.box}"
    rounded: "{rounded.box}"
    padding: "14px"
  code-inline:
    backgroundColor: "{colors.raised}"
    typography: "{typography.mono}"
    rounded: "{rounded.xs}"
    padding: "1px 5px"
---

# Design System: Collective Runtime

## Overview

**Creative North Star: "The Quiet Switchboard"**

Collective Runtime's Settings window is a calm, dark desktop panel where several agents are plugged in side by side. It is built like a familiar native settings app: a darker left sidebar, a page title with one plain sentence, and settings grouped into rounded charcoal boxes, each row a title and a sentence on the left with its control on the right. Nothing competes for attention; the panel is visited briefly to connect an agent or nudge a setting, and every change applies the moment it is made.

Colour carries meaning, never decoration. One coral accent marks what is switched on or chosen. Separately, each agent owns an identity colour (shown as a dot and as a ring), and each pet's body colour is its state. Those three channels never mix. The sidebar foot always shows the live pets currently on the desktop, so the panel never forgets it exists to watch many agents.

The world rejects the generic web-dashboard look (top navigation, hero banners, icon-tile grids) and any single-pet framing: every page assumes more than one agent. The layout follows the user-pinned `Referance/` screenshots in kind, but the system, tokens and markup here are this project's own.

**Key Characteristics:**
- Near-black charcoal ground with a darker sidebar and slightly raised boxes, separated by hairline borders rather than shadows.
- One coral accent, reserved for on-states, the slider, the selected nav icon, the primary action and the active theme.
- Three independent colour channels: accent (on/chosen), agent identity (dot and ring), pet state (body colour).
- System UI sans (Segoe UI Variable) throughout, with small uppercase tracked labels heading groups and badges.
- Dense, quiet rows: title plus one sentence, control on the right, changes apply instantly with no Save button.
- A live pet row at the foot of the sidebar as the signature element.

## Colors

A dark charcoal neutral ladder with one warm coral accent and two families of meaning colours (agent identity and pet state).

### Primary
- **Ember Coral** (accent): the only interactive accent. Fills an on-switch, the filled part of the slider track, the slider thumb ring and its value readout, the selected nav icon, the primary button, and the active theme card's border and "Active" status. Text that sits on it uses **Ember Ink** (on-accent), a near-black brown. Hover lifts it to **Lit Coral** (accent-hover).

### Neutral
- **Charcoal Ground** (ground): the content area background, the health pill fill, and the inset of the theme preview.
- **Night Sidebar** (sidebar): the sidebar, one step darker than the ground; separated from content and from the live-pet foot by **Sidebar Seam** (sidebar-line).
- **Raised Charcoal** (box): every grouped settings box and theme card.
- **Lifted Charcoal** (raised) and **Lifted Charcoal Hover** (raised-hover): secondary buttons, neutral badges and inline code chips.
- **Nav Hover** (nav-hover) and **Nav Selected** (nav-active): the two fills of a sidebar nav item.
- **Hairline** (line): every box border, the divider between rows, button borders and the pending theme card's dashed outline.
- **Switch Rest** (control-off): an off switch and the unfilled slider track.
- **Knob White** (knob): the switch knob and slider thumb.
- **Paper Text** (text): titles and primary copy.
- **Fog Text** (text-2): row descriptions, page descriptions, group labels, unselected nav items, neutral badges, muted coming-soon agent titles.

### Status
- **Signal Green** (ok): the event-server health dot when the server is running. Its tinted badge uses **Signal Green Text** (ok-text) on a 14% green wash.
- **Alarm Red** (danger): the health dot, health status and messages when something is broken, and the row-level error line. Its tinted badge uses **Alarm Red Text** (danger-text) on a 14% red wash.

### Agent identity
- **Claude Coral** (agent-claude), **Gemini Cyan** (agent-gemini), **Antigravity Violet** (agent-antigravity), **Codex Pink** (agent-codex): each agent's own colour, shown as a 10px dot beside its name on the Agents page and as the ring around its live pet in the sidebar. Claude Coral shares Ember Coral's value by design (the coral is Claude's identity); it is still an identity colour wherever it appears as a dot or ring.

### Pet state
- **Idle Grey** (pet-idle), **Working Blue** (pet-working), **Needs-You Amber** (pet-waiting), **Done Green** (pet-done): the body colour of a pet. A finished ("gone") pet keeps its colour and fades to 45% opacity.

### Named Rules
**The One Ember Rule.** Ember Coral means "on" or "chosen" and nothing else. If an element is not a switched-on control, the slider, the selected nav icon, a primary action, or the active theme, it is not coral.

**The Three Channels Rule.** A pet's body colour is its state; its ring is its agent; the accent is never either. Never tint a pet by agent or ring it by state.

**The Words-Too Rule.** Colour never carries meaning alone: every status colour sits beside a word (a badge, the health status text, an accessible pet label).

## Typography

**Body Font:** Segoe UI Variable Text (with Segoe UI, system-ui, sans-serif)
**Label/Mono Font:** Cascadia Mono (with Consolas, monospace), for file paths only

**Character:** One native Windows sans at a handful of sizes and two weights. It reads as part of the operating system, not as a website.

### Hierarchy
- **Headline** (600, 26px, 1.25, -0.01em): the page title, one per page.
- **Title** (600, 15px): the name on a theme card.
- **Body** (400, 14px, 1.5): page descriptions (capped at 70ch) and general copy. Setting and agent names use **Body Strong** (600). Sidebar nav items run at 14.5px.
- **Body Small** (400, 13px): the one-sentence description under each setting, in Fog Text, capped at 75ch.
- **Label** (600, 12px, 0.06em, uppercase): group labels that sit directly above the box they name ("Available", "Pets", "Startup"). The sidebar's "On your desktop" heading uses the same size and weight without uppercase.
- **Label Badge** (600, 11px, 0.04em, uppercase): badge text and the health status word.
- **Mono** (12.5px): inline file paths such as the Claude settings file, on a Lifted Charcoal chip.

### Named Rules
**The Heads-Its-Box Rule.** An uppercase group label always names the box directly below it. It is never an eyebrow stacked above another heading.

**The One-Sentence Rule.** Every page and every setting row gets a short title and one plain sentence explaining what it does; numbers in readouts use tabular figures.

## Layout

A fixed two-column window: a 240px sidebar and a fluid content column, designed for a 1100×760 window.

- **Sidebar:** 16px vertical and 12px horizontal padding, 16px between its blocks. From the top: the event-server health pill, the nav (items 2px apart), and, pushed to the bottom, the live pet row behind a top seam.
- **Content:** scrolls independently; padding 44px top, 48px sides, 64px bottom. Pages are capped at 920px wide.
- **Rhythm:** the page head is followed by 28px; each group label sits 28px below the previous box and 10px above its own box. Rows are at least 68px tall with 14px by 20px padding and a 14px gap between dot, text and control. Theme cards sit in an auto-fill grid of minimum 240px columns with a 16px gap.
- **Narrow windows (900px and below):** sidebar shrinks to 200px, content padding drops to 32px top, 28px sides, 48px bottom, the slider narrows from 220px to 160px, and the live pets shrink (scale 0.42, 8px gap, thinner rings) so four still fit one row.
- **Pet window:** a transparent, always-on-top window. Pets line up along the bottom right, spaced 12px (scaled by pet size), and the whole window is a drag handle.

## Elevation & Depth

The system is flat and tonal. Depth comes from three steps of charcoal (sidebar darkest, ground, then raised boxes) and 1px hairline borders, never from shadows on surfaces. The only shadows sit under the small white knobs of switches and sliders so they read as physical handles, plus the spread "ring" shadows that draw agent rings around live pets.

### Shadow Vocabulary
- **Knob lift** (`box-shadow: 0 1px 2px rgba(0, 0, 0, 0.35)`): the switch knob.
- **Thumb lift** (`box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4)`): the slider thumb.
- **Agent ring** (`box-shadow: 0 0 0 2px <sidebar>, 0 0 0 4px <agent colour>`): a 2px sidebar-coloured gap then a 2px identity ring around a live pet; 1px gap and 2px ring at narrow widths.

### Named Rules
**The Hairline-Not-Shadow Rule.** Boxes, cards, buttons and the health pill separate by tone and a 1px hairline. A drop shadow on a surface is out of system.

## Shapes

Gently rounded rectangles at every scale, softer as the element grows: inline code chips (4px), badges (6px), buttons, nav items and the theme preview inset (8px), the health pill (10px), boxes and theme cards (12px). Switches, slider tracks, the scrollbar thumb and pet name labels are full pills (999px); status and agent dots are circles. Rows inside a box are divided by a single hairline, never by gaps. The one dashed border marks something not yet available (the pending mascot card). The placeholder pet is a soft blob, slightly flatter at the bottom (50% 50% 45% 45%).

Icons are inline line drawings on a 20-unit grid, drawn at 18px with a 1.6 round stroke in the current text colour (16px with a 2 stroke for the theme status check).

## Components

### Buttons
Calm and solid; one per row, on the right.
- **Shape:** gently rounded (8px), 34px tall, 16px side padding, Body Strong text.
- **Primary:** Ember Coral fill with Ember Ink text and no visible border. Used for the action the user most likely wants next (Connect).
- **Secondary:** Lifted Charcoal fill, Paper Text, hairline border. Used for the reversing action (Disconnect).
- **Hover / Focus:** fill steps up one shade over 0.15s on the house ease; keyboard focus draws a 2px Ember Coral outline 2px out.
- **Busy / Disabled:** 55% opacity, no hover change; the label states the action in progress ("Connecting…").

### Badges
- **Style:** small uppercase pills (20px tall, 6px radius) in Label Badge type. Neutral badges are Lifted Charcoal with Fog Text ("Hook", "Coming soon", "Placeholder", "Not connected").
- **State:** a positive state uses the green wash with Signal Green Text ("Connected"); an error state uses the red wash with Alarm Red Text.

### Grouped Box and Setting Row
The core unit of the system.
- **Corner Style:** 12px.
- **Background:** Raised Charcoal with a Hairline border; no shadow.
- **Rows:** at least 68px, 14px by 20px padding. Left: optional 10px agent dot, then a Body Strong title (with inline badges) over a Body Small sentence. Right: the control. Rows after the first get a top hairline.
- **Note row:** an explanatory sentence row with no control and no minimum height.
- **Error row:** a warning-triangle icon in Alarm Red beside Paper Text explaining what failed and that nothing was changed.
- **Muted row:** for agents not available yet; the title drops to Fog Text and the dot dims to 75%.

### Switches and Slider
- **Switch:** a restyled native checkbox with the switch role, 42×24px pill. Off is Switch Rest; on is Ember Coral; the 18px Knob White knob slides 18px over 0.2s. Disabled is 50% opacity.
- **Slider:** a 220px native range with a 4px pill track, Ember Coral fill up to the value and Switch Rest after it; an 18px Knob White thumb with a 3px Ember Coral ring. The value is read out to the right in Ember Coral with tabular figures ("100%").

### Navigation
- **Style:** a vertical list of 40px items, 8px radius, 12px gap between an 18px line icon and the label, Fog Text at rest.
- **Hover:** Nav Hover fill and Paper Text.
- **Selected:** Nav Selected fill, Paper Text at 600, and the icon turns Ember Coral. The selected item is marked as the current page for assistive tech.

### Event-Server Health Pill
Sits at the top of the sidebar. A 10px-radius pill on Charcoal Ground with a hairline border: an 8px status dot, the name "Event server" in Body Strong, and the status word right-aligned in Label Badge type. Running shows a Signal Green dot and "OK" in Fog Text; broken shows an Alarm Red dot, "Error" in Alarm Red, and a short message below the pill (the cause in Alarm Red, then one plain sentence on what to do).

### Theme Card
A 12px Raised Charcoal card with 14px padding: a 150px inset preview on Charcoal Ground showing sample pets, then the theme name in Title type with a badge, a Body Small sentence, and for the chosen theme an Ember Coral check with "Active". The active card's border turns Ember Coral. A pending theme replaces the preview with a dashed Hairline outline and one centred sentence.

### Pets (signature, placeholder)
The placeholder pet is a soft round blob, 64px at 100% size, scaled by the user's pet size setting (0.55 in the sidebar live row, 0.6 in theme previews). Body colour shows state: Idle Grey at rest, Working Blue with a gentle 0.6s bounce, Needs-You Amber with a 1s pulse, Done Green still; a finished pet fades to 45%. Under it, an optional name label in a dark translucent pill (white text on rgba(20, 22, 26, 0.8)), hidden in the sidebar and theme previews. In the sidebar live row each pet carries its agent ring. Every pet has an accessible label naming the agent and its state.

The real mascot is pending. Its art does not exist yet; when it lands it replaces the blob body only, and the state colours, agent rings, label pill and motion rules above stay the system until this file is updated.

### Motion
One house ease (cubic-bezier(0.22, 1, 0.36, 1)) for interface transitions: 0.15s for nav and buttons, 0.2s for switches. Pet colour changes over 0.3s and fades over 0.4s. All transitions and pet animations stop when the system asks for reduced motion.

## Do's and Don'ts

### Do:
- **Do** build every setting as a row in a grouped box: Body Strong title and one plain sentence on the left, the control on the right.
- **Do** apply every change the moment it is made; the panel has no Save button, and a failed save restores the control and says so in Alarm Red.
- **Do** keep Ember Coral to on-switches, the slider, the selected nav icon, primary actions and the active theme.
- **Do** show an agent's identity as its 10px dot and as the 2px ring around its live pet, and a pet's state as its body colour.
- **Do** pair every status colour with a word: a badge, the health status text, or the pet's accessible label.
- **Do** restyle native controls (checkbox as switch, range as slider) so keyboard and screen readers keep working, with the 2px Ember Coral focus outline.
- **Do** design every page for several agents at once, including the empty state ("Pets show up here when an agent starts working.").
- **Do** stop all transitions and pet animations under reduced motion.

### Don't:
- **Don't** use a top navigation bar, hero banner or icon-tile dashboard; navigation lives in the left sidebar.
- **Don't** use Ember Coral for headings, links, decoration or success and error states; status uses Signal Green and Alarm Red.
- **Don't** tint a pet's body by agent or colour its ring by state.
- **Don't** put an uppercase label above another heading as an eyebrow; group labels only head their box.
- **Don't** add drop shadows to boxes, cards or buttons; separate surfaces with tone and a 1px Hairline.
- **Don't** copy clawd-on-desk code, sprite files or its Clawd character; Clawd is Anthropic's mascot and this project's mascot must be original.
- **Don't** invent the mascot's look in a surface; use the placeholder blob until the mascot art is designed and recorded here.
