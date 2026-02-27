# 07: Communication Logging - The Dual-Audit Stream

## The "Dual-Audit" Architecture
To maintain an elite consulting standard, we separate our logs into two parallel streams. This ensures technical precision while protecting Micah's time with high-level business intelligence.

### 1. The Technical Log (The "Production Line")
- **Focus:** System health and file integrity.
- **Data Points:**
    - FileSystem Syncs (Markdown uploads).
    - Zotero `.bib` exports/updates.
    - Typst WASM render performance and errors.
- **Why?** It provides total transparency. You and Micah can see if the "factory" is running without opening a single document.

### 2. The Lifecycle Feed (The "Emotional Brain")
- **Focus:** Human communication, context, and sentiment.
- **Data Points:**
    - **Email Ingestion:** Emails from clients and publishers.
    - **WhatsApp Forwarding:** Strategic messages from clients.
    - **Internal Metadata:** Notes from you or Micah about the client's state.
- **Strategic AI (Phase 2):** The system "chews" on this feed to detect **Client Anxiety** (e.g., submission deadlines) and suggests professional, calming response drafts for Micah.

---

## Global Ingestion & Triage
We eliminate "Frankenstein" folder structures by using a centralized intake method.

### 1. The Global Inbox
All incoming emails to the business (via Postmark or Mailgun) land in a **Global Triage Queue**. This keeps the individual Project Vaults clean.

### 2. The "Promotion" (Triage) Step
You (the Admin) or Micah spend 30 seconds performing "Triage":
- **Identify:** See a new guideline PDF from Micah.
- **Allocate:** Use a dropdown to assign it to the "CRC Book" project.
- **Clean Core:** Once allocated, the item moves out of the Global Inbox and into the specific **Project Vault**.

### 3. Bi-directional Monitoring
The system doesn't just watch incoming mail; it monitors your **Sent Folder**. 
- **Action:** When you email a finalized Figure 1.1 to Micah, the system detects the attachment.
- **Audit:** It automatically logs an "Outgoing Deliverable" in the Project Vault: `Figure_1.1_Final.png | Sent to Client | v3`.
- **Value:** You never have to "upload" a file twice. Emailing *is* logging.

## The "Concierge" Experience
This UI is strictly internal. The client experiences the "goodness" through Micah’s high-touch, informed responses. Micah looks like a hero because he has a system that tells him *exactly* what just happened, what was sent, and how the client is feeling.
