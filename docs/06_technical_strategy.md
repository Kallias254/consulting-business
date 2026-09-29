# 06: Technical Strategy - The Agency OS

The shift to an agency model requires an evolution of our technical strategy. The goal is no longer to build a "self-correcting" tool for a single writer, but to create an **Agency Operating System (OS)** for managing a team, projects, and clients efficiently.

Our core technologies (PocketBase, Next.js/Vite, Typst, Pandoc) are still ideal, but they will be repurposed to serve this new mission.

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

### Academic Outreach & Intel Gathering (The Developer Edge)
To hunt "Whales" (Deans, lab directors), we bypass generic cold emails by using open-source programmatic recon:
- **`zotero-cli` (Reconnaissance Engine):** We use Zotero's web API and CLI tools to programmatically scrape a target professor’s full publication history and abstracts. This feeds our LLMs the exact context needed for a hyper-targeted outreach email.
- **`mitmproxy` (Directory Scraping):** When targeting university directories without public APIs, we boot up `mitmproxy` in the terminal to intercept the HTTP traffic. We capture the exact API endpoints and headers the directory uses, and replicate that payload in a lean Go script to pull clean department contact lists instantly.
- **Mermaid.js (Architecture Proving):** Instead of a wall of text, we script clean system architecture diagrams of our SaaS projects using Mermaid markdown. We render them as SVGs and attach them to departmental emails to instantly prove our engineering depth.

### Lead Generation Micro-Tools
To support the "Small Favor" marketing strategy, the Agency OS provides automated utility endpoints:
- **Niche Grant Pulse (ICS Engine):** A Go service that queries the `Opportunities` collection and generates dynamic `.ics` calendar files based on research niche tags.
- **BibTeX Auditor:** A Python/Pandas script that parses uploaded bibliography files, cross-references Crossref/DOI databases, and returns a JSON report of metadata anomalies.
- **Abstract Matcher:** A lightweight NLP script that compares user-provided abstracts against our internal "Publisher Persona" database to suggest target presses.

### PocketBase Core: The Single Source of Truth
We have fully migrated away from Payload CMS. PocketBase (Go/SQLite) is our high-performance backend. It stores:
- **Collections:** Clients, Projects, Researchers, Tasks, Invoices, and **Audit Logs**.
- **The Correspondence Buffer:** Where internal teams draft emails for Micah to approve and send.
- **NocoDB (The Collaborator View):** Instead of building custom admin dashboards for non-technical RAs, we self-host NocoDB connected directly to a read-only staging schema of our PocketBase data. RAs get a smart, collaborative spreadsheet interface to filter and manage research rosters securely while keeping our core Go architecture lean.

### Typst & Pandoc: The "Word-to-Typst" Bridge
We bridge the gap between researcher habits (MS Word) and elite output (Typst, LaTeX, PDF) using **Pandoc** (The Universal Document Converter).
- **The Workflow (AST Transformation):** Researchers write in MS Word using standard styles. Upon upload, our Go server invokes Pandoc directly via the `os/exec` package. Pandoc flawlessly handles the complex AST (Abstract Syntax Tree) transformations, feeding it into a custom reference template to output perfectly structured documents every single time.
- **The "Reference Integrity" Auditor:** Since we avoid the third-party `typst.app` Zotero sync to maintain sovereignty, we use a local auditor script:
    - **How it works:** The script parses the **converted Typst/Markdown text** for citation keys (e.g., `[@smith2024]`) and cross-references them against the **uploaded `.bib` file** from the project vault.
    - **Validation Logic:** It checks for: 
        1. **Missing Entries:** Citations in the text that don't exist in the `.bib` file.
        2. **Metadata Gaps:** Entries in the `.bib` file missing required fields (e.g., a DOI or a Page Number).
        3. **Style Compliance:** Ensuring the BibTeX format matches the target publisher's specific requirements (e.g., APA vs. Chicago).
    - **Client Value:** Instead of "Syncing," we are **"Auditing."** The client sees a "Reference Health" score in their portal, which provides much higher psychological security than a simple sync.
- **Value:** This removes the "formatting month" for the client and ensures 100% technical compliance throughout the project lifecycle. Every save by the researcher updates the client's **Technical Validation** score.
