# This file is an archive of the v1 business plan (single-person architect model).

---

# ARCHIVED: 02: Production Workflow - The WASM-Powered Pipeline

## The "Self-Correcting" Workflow
The old way relied on a "Submit and Hope" model where writers sent blind Markdown files. Our new workflow uses **Typst WASM** to make the writer responsible for visual validation.

| Feature | The Old Way (Server-Side) | The New Way (WASM Studio) |
| :--- | :--- | :--- |
| **Interface** | Blind Markdown Editor | **Two-Pane Studio** (MD | PDF) |
| **Validation** | You find errors after submission | **Writer fixes errors** live |
| **Feedback** | Slow back-and-forth loops | **Instant visual feedback** |

## The Partitioned Writer's Studio
Writers log into a specialized, low-distraction portal designed for high-caliber production.

### 1. Left Pane: The Manuscript Engine
- **Environment:** Monaco-based Markdown Editor.
- **Constraints:** Direct typing (no Google Docs conversions). 
- **Requirement:** Writers use standard headers and citation keys (`@smith2023`).

### 2. Right Pane: The Live "Finisher" (WASM)
- **Environment:** Live PDF Preview powered by the in-browser Typst engine.
- **The "Green Light" Rule:** Writers are forbidden from hitting "Submit for Review" unless the preview renders perfectly without errors.
- **Benefit:** This eliminates "broken citation" triage on your end.

## The Progressive Delivery Model
We treat manuscripts not as giant files, but as **Modular Units** (Payload Array Fields).

1. **Chapter-by-Chapter Sprints:** Writers work on one chapter at a time.
2. **Decoupled Review:** You can "Publish" Chapter 1 while the writer is still "Drafting" Chapter 2.
3. **The Floating ToC:** A polished, hover-triggered "Jump Menu" inside the PDF section allows for rapid navigation between these progressive units without cluttering the main UI.

## Reference Management: The "Zotero Bridge"
- **The Setup:** Delegatees use the **Better BibTeX** plugin in Zotero to maintain an auto-exported `.bib` file.
- **The Ingestion:** They upload the `.bib` to the **Project Vault**.
- **The WASM Sync:** The WASM engine pulls from this vault file to resolve citations instantly in the preview.

## Phase 4: The "Elite" Export
While the live work happens in Typst, we maintain **Pandoc** as our "Universal Translator" for legacy requirements:
- **To Word:** For journals requiring "Track Changes" review.
- **To LaTeX:** For publishers with legacy `.tex` submission systems.

---

# ARCHIVED: 03: Business Strategy - The "Double Stack" Retainer

## The Front-Facing "Product Menu"
The website will present three clear paths to solve specific academic "pain points."

### 1. The "Publication Sprint" (Entry Level)
- **Problem:** "My manuscript is a mess and the deadline is in 72 hours."
- **Service:** High-speed formatting, citation cleanup (Zotero/BibTeX), and CRC Press/Routledge compliance check.
- **Goal:** Get the paper submitted *now*.

### 2. The "Legacy Book" (Premium Project)
- **Problem:** "I have 20 years of research that needs to become a textbook."
- **Service:** Structural editing, figure enhancement, full Typst/LaTeX typesetting, and indexing.
- **Goal:** A world-class published volume.

### 3. The "Career Accelerator" (The Retainer)
- **Problem:** "I'm a great scientist, but I'm missing out on grants, scholarships, and collaboration calls because I'm too busy."
- **Service:** 
    - **Self-Updating Scholar Website:** Hosted on our platform.
    - **Scholarship & Grant Support:** Specialized drafting and formatting for elite apps like **Fulbright**, NSF, or NIH.
    - **Opportunity Scanning:** Monthly delivery of "Call for Chapters" and collaboration opportunities tailored to their niche.
- **Goal:** Increase citations, professional visibility, and secure career-defining funding.

### 4. Bespoke Scholarly Solutions (The "Flex" Tier)
- **Problem:** "I have a unique project (e.g., a keynote visualization, a complex grant rebuttal, or an unconventional review article) that doesn't fit a standard sprint."
- **Service:** High-level strategic support tailored to the specific academic challenge. We define the scope together.
- **Goal:** To ensure high-value clients are never turned away as long as the work is within our technical and scholarly expertise.

## Pricing Strategy
- **Sprint:** Fixed fee ($500 - $1,500).
- **Book:** Milestone-based ($5k - $15k).
- **Portfolio/Accelerator:** Monthly subscription ($250 - $1,000/mo).
- **Bespoke:** Custom quote based on complexity.

---

# ARCHIVED: 04: Operations & Delegation - Roles & Flow

## Roles & Responsibilities

### Micah (The Partner / Rainmaker)
- **Primary Tool:** Payload "Partner Dashboard."
- **Focus:** Relationship management and high-level project oversight.
- **Responsibility:** He is the "Academic Seal of Approval." He checks the project pipeline to ensure his colleagues are being served.

### You (The Architect / Admin)
- **Primary Tool:** VS Code (Typst) & Payload Admin.
- **Focus:** The "Finishing" Engine.
- **Responsibility:** 
    - Setting up the project infrastructure.
    - Converting writer Markdown into Typst PDFs.
    - Final Quality Control (QC) and delivery.

### The Delegatee (The Writer/Editor)
- **Primary Tool:** Obsidian / Markdown.
- **Focus:** Technical Content.
- **Responsibility:** Producing clean `.md` files with correct citations. They never touch the "styling" or "typesetting" code.

## The Clean Handoff Loop
1. **Onboarding:** Client signs; Project is created in Payload.
2. **Writing Phase:** Delegatee writes in Markdown. They upload files to the Payload Project record.
3. **The Pivot:** You download the `.md` files, pull them into your Typst environment, and "style" the manuscript.
4. **Validation:** You run automated citation checks.
5. **Micah's Review:** Micah views the generated PDF in the Payload Dashboard and approves it for the client.
6. **Delivery:** Client receives a notification that their "Elite Manuscript" is ready for download.

---

# ARCHIVED: 05: Marketing Roadmap - The US Academic Market

## The Onboarding Flow (The "Diagnostic Filter")

The website acts as a high-caliber "Front Desk" that extracts the most value from every visitor by moving them through a diagnostic path rather than a generic contact form.

### 1. The Entry Point: "The Scholar's Diagnostic"
Instead of "Buy Now," the primary CTA is **"Start Your Diagnostic."**
- **Goal:** Even if they don't know what they need, we gather their **Context**.
- **Data Captured:** 
    - *Niche:* "What is your primary field of research?"
    - *Urgency:* "Do you have a looming deadline (7 days, 30 days, 6 months)?"
    - *Goal:* "Are you looking for a Sprint (Formatting), a Legacy (Book), or a Retainer (Growth)?"
    - *Bespoke Option:* "None of the above—I have a unique scholarly challenge."

### 2. The "Aha!" Moment (Value Extraction)
- **Immediate Feedback:** Based on their niche (e.g., "Bio-Medical"), the site dynamically shows a relevant "Before & After" example of a Typeset paper or a successful Portfolio.
- **The Audit:** We offer an immediate upload of 2-3 pages for a **"Formatting Health Check."** This converts a casual visitor into a "Lead with a Manuscript."

### 3. The Bespoke Bridge
If the client selects "Unique Challenge":
- The form expands to ask: *"What is the specific obstacle between you and your goal (e.g., Figures, Co-author management, Rejection rebuttal)?"*
- This ensures that when Micah or you see the lead in Payload, you aren't starting from zero. You have the context of their field and their specific pain point.

### 4. Direct Onboarding (The Micah Handover)
- Micah sends a "Priority Link" (`/ref/micah`) which skips the generic landing and goes straight to a personalized "Micah's Colleagues" portal.
- **Account Creation:** The moment they finish the diagnostic, they are given a login to the **Mantine Dashboard**, making the relationship feel "Real" instantly.

---

# ARCHIVED: 14: Clientele & Onboarding - The Conversion Pipeline

To maintain a "High-Caliber" brand, we don't treat every lead the same. We use a gated conversion pipeline that moves prospects from the public website to our internal Consulting OS.

## 1. The Conversion Pipeline: From Web to Vault

### Step 1: The "Website Hook" (Inquiry)
When a PhD student or Professor fills out a contact form on your public site, the data is sent via Webhook to Payload 3.0. 
- **The Data:** Research area, university, current manuscript status, and "Pain Level."
- **The Result:** They land in the **Onboarding Queue** inside the Admin Command Center. They are NOT a client yet.

### Step 2: The Qualification (Rainmaking)
Micah reviews the Onboarding Queue. This is the "Rainmaking" phase. 
- **The Action:** Micah performs a "Manuscript Audit" or "Discovery Call."
- **The Triage:** If they aren't a fit, they are archived. If they are elite-tier, we move to Step 3.

### Step 3: The "Promote to Project" (One-Click Setup)
Once a deal is struck, you or Micah hit the **PROMOTE TO PROJECT** button in the dashboard. This triggers a series of automated hooks:
1. **Records:** Creates the Client & Project database entries.
2. **Infrastructure:** Initializes the **Project Vault** and the first **Manuscript Unit**.
3. **Communication:** Sends a professional "Welcome & Onboarding" email with secure upload instructions.
4. **Execution:** The project instantly appears in the **Flow Editor**, ready for the first writer assignment.

---

## 2. Clientele Brackets (The Value Proposition)

### Bracket A: The Rising Star (Junior Faculty / PhD)
- **Service:** Publication Sprints.
- **Hook:** "The Reviewer's Edge." Instant Typst/WASM previews show them exactly how their science will look to a committee.

### Bracket B: The Overburdened Researcher (Mid-Career / Lab Leads)
- **Service:** Retainer / Accelerator.
- **Hook:** "The Outsourced Finisher." We handle the co-author chaos and the technical formatting so they can focus on funding.

### Bracket C: The Legacy Scholar (Senior / Emeritus Faculty)
- **Service:** Legacy Book (High Ticket).
- **Hook:** "The Legacy Architect." Turning 30 years of notes into a CRC-ready masterpiece via our progressive chapter model.

---

## 3. Onboarding "Devices" (Conversion Strategy)

### Device 1: The "Manuscript Audit" (For New Market Leads)
Instead of a "Sales Call," we offer a free **Manuscript Audit**.
- **The Hook:** "Send us 3 pages of your draft. We will return a 'Typeset Preview' and a 'Citation Health Check'."
- **The Result:** They see their messy work transformed into elite Typst/LaTeX output instantly. This is the "Aha!" moment.

### Device 2: The "Micah Handover" (For High-Trust Leads)
- **The Hook:** A 15-minute "Scientific Strategy Session" with Micah.
- **The Flow:** Micah validates their research importance; you (the Architect) demonstrate the tech engine that will deliver the results. It’s "Peer-to-Peer" validation.

## 4. The "Calibre" Standard
- **No "Hustle" Language:** We never use words like "cheap," "fast," or "discount."
- **The Vocabulary:** We use words like **"Compliance," "Typesetting," "Citation Integrity," "Legacy,"** and **"Scholarly Impact."**
