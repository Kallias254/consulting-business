# 21: UI/UX Design System - The "Scholarly" Interface

This document defines the visual language and user experience for the Agency OS. We bridge the gap between "Startup Modernity" and "Institutional Authority."

## 1. The Scholarly Palette (Academic Prestige)

We move away from generic "SaaS Blue" and adopt colors found in elite university libraries and prestige journals.

| Color | Hex | Role | Aesthetic Purpose |
| :--- | :--- | :--- | :--- |
| **Parchment** | `#F4F1EA` | Content Background | Reduces eye strain; mimics high-quality paper. |
| **Dark Forest**| `#0A140F` | Main Background | Provides depth and "Cinematic" contrast. |
| **Deep Green** | `#0E1D16` | Surface / Navbar | The primary branding color; feels institutional. |
| **Burnished Gold**| `#B08D57` | Primary Accent | Indicates "High Value" and "Principal Action." |
| **Sage / Moss** | `#A3AF9E` | Secondary / Success | Used for "Accepted" or "Verified" statuses. |

---

## 2. Layout Architecture (Mantine v7)

Our dashboard structure mimics the familiarity of **Taylor & Francis** and **Elsevier** but with a "White-Glove" upgrade.

### A. The "Command Center" (Principal/Admin View)
- **Theme:** Cinematic Dark.
- **Structure:**
    - **Header:** Global Sentiment Tracker (Red/Green light) and Project Switcher.
    - **Navbar (Left):** Hierarchy-based navigation (All Leads > Active Projects > Finance).
    - **Main Content:** High-density data tables and "The Blessing Queue."
    - **Aside (Right):** "Intelligence Feed" showing real-time email opens and file downloads.

### B. The "Scientist Portal" (Client View)
- **Theme:** Sophisticated Light (Parchment-based).
- **Structure:**
    - **The Stepper:** A clear "Submission Path" at the top (Intake > Internal QC > Executive Review > Submitted).
    - **The Timeline:** A vertical "Version Control" history. No folders; just a chronological success trail.
    - **The Vault:** A clean grid of cards for final deliverables with clear "Download" CTAs.

---

## 3. The "Familiarity" UX Patterns

To ensure professors feel "at home," we adopt these specific patterns from major publishers:

1.  **The "Gallery Proof" View:** Deliverables are presented in a PDF viewer that mimics a publisher's first-pass proof, with watermarks like "EXECUTIVE DRAFT - CONFIDENTIAL."
2.  **Breadcrumb Navigation:** `Projects > The Millennial Handbook > Chapter 1 > Revisions`. 
3.  **The "Liaison" Buffer:** A "Correspondence" tab that looks like a professional Outlook thread, but clearly labeled "Drafted for Your Approval."

---

## 4. Key Component Specs

### The "Sentiment" Tracker (Mantine Alert/Badge)
- **Logic:** Tracks days since last interaction.
- **Visual:** A pulsing indicator next to a project name.
    - **Green:** Interaction in < 24h.
    - **Yellow:** 48h - 72h.
    - **Red:** > 72h (Alerts Micah).

### The "Typeset" Preview (WASM Integration)
- **Visual:** A two-pane view (Internal only).
- **Behavior:** Real-time rendering of Typst code into the PDF preview. This "Engine Room" view is never seen by the client, preserving the "Magic" of the final delivery.

## 5. Typography
- **Display (Headers):** `Antonio` (Sans-serif, all caps for impact).
- **Body (Primary):** `Inter` (Clean, modern, readable).
- **Secondary (Accents):** `JetBrains Mono` (For technical metadata, IP addresses, and version numbers).
