# 06: Client Experience - The Mantine "Scientist Portal"

## The Hybrid Frontend
By using the **Payload Next.js Website Template**, we get the best of both worlds:
- **Public Site:** Clean, fast SEO-optimized landing pages for your "Scientist-as-a-Service" pitch.
- **Private Dashboard:** A dedicated `/dashboard` directory in the Next.js App Router, using **Mantine v7** for the complex project tracking UI.

## Core Mantine Components
### 1. The Project Stepper
- **Component:** `<Stepper />`
- **Use Case:** Visualizes the manuscript's journey from "Intake" to "Final PDF Render." It reduces anxiety by showing exactly which stage the paper is in.

### 2. The Deliverables Vault
- **Component:** `<Table />` or `<Card />` grid.
- **Use Case:** A "Vault" where they can see and download versions of their PDF. Includes metadata like "Typeset for CRC Press" and "Word Export for Co-authors."

### 3. The Activity Feed
- **Component:** `<Timeline />`
- **Use Case:** A vertical feed of all "Professional Events" (e.g., "Editor reviewed Chapter 2," "Figure 4 enhanced to 600dpi").

### 4. Financial Dashboard
- **Component:** Mantine Modals & Progress Bars.
- **Use Case:** Paying for "Sprints" or viewing Retainer status via Stripe integration.

## The UX Flow
1. **Login:** Simple, secure Auth via Payload's `users` collection.
2. **Dashboard:** A bird's-eye view of all active papers.
3. **Deep Dive:** Clicking a project opens the Stepper and Activity Feed.
4. **Action:** A big primary button: "Upload New Revision" or "Approve for Submission."

## Why this works
- **Professionalism:** Instead of sharing Google Drive folders, you give them a dedicated "Scientist Portal."
- **Clarity:** The client knows exactly where their paper stands in the queue.
- **Micah's Ease:** Micah can log in as a "Super Admin" to see all client portals at once, ensuring no one is being ignored.
