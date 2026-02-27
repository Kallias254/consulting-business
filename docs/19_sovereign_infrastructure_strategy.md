# 19: Sovereign Infrastructure Strategy - The "Elite Command" Build

This document outlines our final foundational decision: moving away from third-party form builders and storage to a **Sovereign Infrastructure** model. We own the data, eliminate egress fees, and maintain total UX control.

## 1. The Three Pillars of the Engine

| Function | Tool | Implementation | Strategic Value |
| :--- | :--- | :--- | :--- |
| **Storage** | **Cloudflare R2** | S3-compatible via Payload Plugin | **Zero Egress Fees.** No "Success Taxes" on large archives. |
| **Forms** | **Payload Native** | `@payloadcms/plugin-form-builder` | **Data Sovereignty.** Researcher data stays in our DB. |
| **Comms** | **Resend BYOK** | Programmatic API + React Email | **Programmatic Voice.** Enables Micah's "Blessing" workflow. |
| **Machinery** | **Trigger.dev** | Next.js Background Tasks | **Reliability Layer.** Handles 48h waits and 14-day pulses. |

## 2. The "Researcher-First" Document Flow

We bridge the gap between **MS Word** (the researcher's home) and **Typst** (our superior output).

### The Pipeline:
1.  **Ingestion:** Client/Researcher uploads a `.docx` via our **Native Payload Form**.
2.  **Narrative Audit & Conversion:** Editors work in Word. The system uses **Pandoc** to convert the doc to Markdown/Typst programmatically.
3.  **Ongoing Validation (The Live Pulse):** The conversion triggers automated audit scripts:
    *   **Lookup Scripts:** Verify citations against the master BibTeX file.
    *   **Tree Checks:** Audit the heading hierarchy (H1 -> H2 -> H3) against publisher-specific JSON rules.
    *   **WASM Render:** The Typst engine attempts a render; any failures (missing figures, broken links) are captured as "Anomalies."
4.  **Client Insight:** The results are pushed to the **Technical Validation** page in the Portal, providing real-time "Scientific Certainty."
5.  **Executive Review:** Micah reviews the **Typeset PDF** (Typst) in the Command Center.
6.  **Sovereign Delivery:** Micah clicks "Approve." Payload triggers **Resend** to deliver an R2-hosted link to the client.
6.  **Automated Vigilance:** **Trigger.dev** monitors the delivery. If the client doesn't open the link in 48h, it drafts a follow-up for Micah.

## 3. Integration Architecture

### A. Payload Native Forms
Instead of an Iframe, we build custom React components for our forms that talk directly to the Payload Form Builder plugin. 
- **Benefit:** Instant creation of `leads` or `projects` records.
- **Benefit:** Conditional logic is handled in our code, allowing for "Academic Field" specific branching.

### B. Cloudflare R2 Project Vault
Every project gets a unique bucket prefix.
- **Security:** We use signed URLs for delivery, ensuring sensitive research never sits on a public link.
- **Cost:** $0 egress means we never have to delete old client files to save money.

### C. Resend BYOK (Bring Your Own Key) - The "No-List" Philosophy
Unlike Mailchimp or HubSpot, we do **not** maintain segments or subscriber lists inside Resend.
- **Payload as Source of Truth:** Our `Leads`, `Users`, and `Projects` collections *are* our segments. We query our own DB to determine recipients in real-time.
- **Programmatic Valves:** Resend acts as a purely functional "valve." We send it raw data + a React template, and it handles the delivery. 
- **Zero-Sync Overhead:** By eliminating third-party lists, we remove the risk of "data drift" (e.g., a lead who becomes a client but stays on the 'Prospect' list).
- **Email Design:** We use **React Email** components to ensure every "Progress Pulse" looks like high-end university stationery.
- **Analytics:** We track opens/clicks within the Payload **Dual-Audit Stream**, giving Micah real-time insight into "Client Anxiety" (e.g., "The client hasn't opened the final PDF yet").

## 4. Why This Wins
This setup makes us look like an **Institutional Entity** rather than a "Gig Agency." It provides the security of a university repository with the speed of a startup.
