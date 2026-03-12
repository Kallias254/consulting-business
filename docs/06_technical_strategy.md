# 06: Technical Strategy - The Agency OS

The shift to an agency model requires an evolution of our technical strategy. The goal is no longer to build a "self-correcting" tool for a single writer, but to create an **Agency Operating System (OS)** for managing a team, projects, and clients efficiently.

Our core technologies (Payload, Mantine, Typst) are still ideal, but they will be repurposed to serve this new mission.

## The Vision: A Centralized Project Management Dashboard

The Mantine frontend will become the central hub for the entire agency workflow. This dashboard will provide different views and capabilities based on the user's role.

### 1. The Principal View (For You & Micah)
- **Dashboard:** A high-level overview of all active projects, their current status (e.g., "In Execution," "In QC"), upcoming deadlines, and financial summaries.
- **Project Management:** Ability to create new projects, assign a **Lead Researcher**, and view all project files and communications.
- **Quality Control:** A dedicated "QC" view to review work submitted by Lead Researchers, add comments, and give the final approval for client delivery.
- **Client Management:** A CRM-like view of all clients and their project history.
- **The Sentiment Tracker:** A "Red/Green" status indicator for every client. If a client hasn't opened an email or logged in for 72 hours, it flags Micah to perform a "Personal Outreach."

### 2. The Internal Production View (Writer/Editor)
- **Tooling:** A focused, two-pane partitioned view (**Markdown Editor | Typst WASM Preview**). This is the "Engine Room" where the technical work happens.
- **Task Management:** The ability to break down a project into specific tasks (e.g., "Literature Review," "Format Chapter 3") and assign them to **Research Assistants**.
- **Internal QC:** Stage for Lead Researchers to review work and consolidate versions before submitting them for the Principal's "White Glove" approval.

### 3. The "Scientist Portal" (Client View)
- **The "Staple" Timeline:** A clean, visual version history (Version Control) of every PDF and DOCX deliverable. Clients see their progress as a "Success Trail."
- **The Result View:** Clients see the beautiful, typeset PDF results. They do **NOT** see the Markdown/Code layer.
- **Secure File Exchange:** A high-end "Vault" powered by Cloudflare R2 ($0 egress downloads).
- **The Liaison Buffer:** For Tier 3, this is where the "Office Of" communications are managed, shielding the client from administrative noise.
- **Invoice & Payment:** Integration with Stripe and Wise for viewing invoices and making payments.

## Backend and "Finishing" Technology

### Lead Generation Micro-Tools
To support the "Small Favor" marketing strategy, the Agency OS provides automated utility endpoints:
- **Niche Grant Pulse (ICS Engine):** A Node.js service that queries the `Opportunities` collection and generates dynamic `.ics` calendar files based on research niche tags.
- **BibTeX Auditor:** A Python/Pandas script that parses uploaded bibliography files, cross-references Crossref/DOI databases, and returns a JSON report of metadata anomalies.
- **Abstract Matcher:** A lightweight NLP script that compares user-provided abstracts against our internal "Publisher Persona" database to suggest target presses.

### Payload CMS: The Single Source of Truth
Payload remains the perfect backend for the Agency OS. It will store:
- **Collections:** Clients, Projects, Researchers, Tasks, Invoices, and **Audit Logs**.
- **The Correspondence Buffer:** Where internal teams draft emails for Micah to approve and send via Resend.
- **File Storage:** The "Project Vault" linked to Cloudflare R2.

### Typst & Pandoc: The "Word-to-Typst" Bridge
We bridge the gap between researcher habits (MS Word) and elite output (Typst) using **Pandoc**.
- **The Workflow:** Researchers write in MS Word using standard styles. Upon upload, the Agency OS uses Pandoc to convert the `.docx` into structured Markdown/Typst code.
- **The "Reference Integrity" Auditor:** Since we avoid the third-party `typst.app` Zotero sync to maintain sovereignty, we use a local auditor script:
    - **How it works:** The script parses the **converted Typst/Markdown text** for citation keys (e.g., `[@smith2024]`) and cross-references them against the **uploaded `.bib` file** from the project vault.
    - **Validation Logic:** It checks for: 
        1. **Missing Entries:** Citations in the text that don't exist in the `.bib` file.
        2. **Metadata Gaps:** Entries in the `.bib` file missing required fields (e.g., a DOI or a Page Number).
        3. **Style Compliance:** Ensuring the BibTeX format matches the target publisher's specific requirements (e.g., APA vs. Chicago).
    - **Client Value:** Instead of "Syncing," we are **"Auditing."** The client sees a "Reference Health" score in their portal, which provides much higher psychological security than a simple sync.
- **Value:** This removes the "formatting month" for the client and ensures 100% technical compliance throughout the project lifecycle. Every save by the researcher updates the client's **Technical Validation** score.
