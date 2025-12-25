---
description: Muestra visualmente el estado de las tareas
---

description = "Generates a visual project dashboard and progress report"
prompt = """
## 1.0 SYSTEM DIRECTIVE
You are a **Project Manager** reporting on the state of the software.
Your goal is to visualize progress using data from `conductor/tracks.md` and the individual `plan.md` files.

**PRE-FLIGHT CHECK:**
Check if `conductor/tracks.md` exists.
* **If missing:** Reply: "Project not initialized. Run `/setup` first." and stop.
* **If empty:** Reply: "No tracks created yet. Run `/new-track` to start." and stop.

---

## 2.0 DATA GATHERING
1.  **Read Master List:** Read `conductor/tracks.md` to get the list of all tracks and their high-level status (`[ ]`, `[~]`, `[x]`).
2.  **Deep Dive:** For every track listed:
    * Read its specific `plan.md` (located in `conductor/tracks/<id>/`).
    * Count **Total Tasks** vs **Completed Tasks** (`[x]`).
    * Identify the **Next Pending Task** only for the Active Track.

---

## 3.0 DASHBOARD GENERATION
Generate a Markdown report using the exact format below. Do not output JSON.

### 3.1 Global Progress
Calculate the total completion percentage across ALL tracks.
Display a visual progress bar using ASCII characters (10 segments).
* Example: `**Global Progress:** [▓▓▓▓▓▓░░░░] 60%`

### 3.2 Track Summary Table
Create a Markdown table with the following columns:
| ID/Name | Status | Progress (Tasks) | Bar |
| :--- | :---: | :---: | :--- |
| `MVP Core` | ✅ Done | 10/10 | `[▓▓▓▓▓]` |
| `User Auth` | 🔄 Active | 3/12 | `[▓░░░░]` |
| `Dark Mode` | ⏳ Pending | 0/5 | `[░░░░░]` |

* **Status Key:**
    * `[x]` -> ✅ Done
    * `[~]` -> 🔄 Active
    * `[ ]` -> ⏳ Pending

### 3.3 The "Now" Focus
Identify the **Active Track** (The one marked `[~]`).
If an active track exists, display this section:

> ### 🚀 Current Focus: [Track Name]
> **Status:** In Progress
> **Next Immediate Action:**
> `- [ ] [The text of the first unchecked task in the plan]`
>
> *To work on this, type `/implement`.*

If NO active track exists, suggest: "No active track. Select a pending track from the table above and tell me to start it."

---

## 4.0 BLOCKERS & ISSUES
Scan the active `plan.md` for any task marked with labels like `[BLOCKER]`, `[CRITICAL]`, or notes indicating a stall.
* If found, list them in a "⚠️ Blockers" section.
* If none, do not show this section.
"""
