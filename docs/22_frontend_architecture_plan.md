# 22: Frontend Architecture Plan - "The Precision Lab"

This document outlines the structure and design principles for the Agency OS public frontend.

## 1. Design Principles (The Sharp Edge)
- **Sharp Corners:** `radius: 0` for all components (Trust & Precision).
- **Institutional Palette:** Dark Forest Green, Burnished Gold, and Parchment.
- **Cinematic Contrast:** Using fine 1px borders instead of shadows.
- **Technical Metadata:** Visible version numbers and latencies (The "Lab" Vibe).

## 2. Core Page Map

### A. Home (/) - The Authority
- **Hero:** "PUBLICATION SUCCESS" (Antonio font, All-caps).
- **The Engine Section:** Visualizing the Word-to-Typst pipeline.
- **The Tiers:** Finisher, Scholar, Pro.
- **The Ingestion Point:** The "Scientific Health Check" native form.

### B. Priority Access (/go/micah) - The Referral
- **Persona-Based Header:** Fast-track landing page for Micah's direct referrals.
- **Goal:** Minimize friction; prioritize the "Initial File Upload."

### C. Methodology (/methodology) - The Tech
- **Deep Dive:** Explaining WASM-Rendering, Sovereign Storage, and Data Privacy.
- **The Goal:** Build technical authority to justify high-value consulting rates.

### D. The Portal Entry (/login) - The Gateway
- **Aesthetic:** "Secure Terminal" vibe.
- **Function:** Entry point for active Researchers and Clients.

## 3. Technology Stack Integration
- **Framework:** Next.js 15 (App Router).
- **UI Kit:** Mantine v7 (Configured for sharp corners and scholarly theme).
- **Forms:** Payload Native (Direct-to-DB ingestion).
- **Components:** Reusable Mantine blocks for Cards, Timelines, and Steppers.
