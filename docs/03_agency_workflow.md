# 03: Agency Workflow - The "Blessing Chain" Protocol

This document outlines the internal communication flow. Our goal is to maximize Micah's authority while minimizing his manual workload. We use a "Draft-and-Bless" model.

---

## 1. The Email Identity Map
We use distinct email identities to manage client expectations and "signal noise."

| Alias | Sender Name | Use Case |
| :--- | :--- | :--- |
| **`micah@vance.lab`** | Micah [Lastname] | **Executive Blessings.** Deliverables, approvals, and high-level strategy. |
| **`office@vance.lab`** | The [Agency] Office | **Operations.** Invoices, Friday Pulses, and document requests. |
| **`insights@vance.lab`**| Vance Lab | **Nurture.** Educational content and automated lead follow-ups. |
| **`[client].office@...`**| [Client] Office | **Liaison.** Speaking to publishers *as* the client's staff. |

---

## 2. The "Blessing Chain" (Step-by-Step)
Internal researchers ("Doers") never communicate directly with the client. They use the **Correspondence Buffer** in Payload.

### Step 1: The Production (The Researcher)
- The researcher completes a task (e.g., Chapter 3 Audit).
- They upload the final PDF/DOCX to the **Project Vault**.
- They draft the delivery email in the **Correspondence Collection**.
- **Action:** Set status to `Pending_Approval`.

### Step 2: The Quality Control (Micah)
- Micah receives a notification. He opens the **Mantine Dashboard**.
- He reviews the technical work (via Typst preview) and the drafted email text.
- He can "One-Click Approve" or make a quick "Peer-to-Peer" edit to the text.
- **Action:** Micah clicks **[Approve & Send]**.

### Step 3: The Automated Delivery (The System)
- **Resend** fires the email from `micah@vance.lab`.
- The **Project Timeline** (Version Control) updates automatically.
- The **Sentiment Score** for the client is refreshed (Green).

---

## 3. The "Friday Pulse" Routine
Every Friday at 4:00 PM, the system (via **Trigger.dev**) prepares a **Friday Status Pulse** for every active project.

1.  **Drafting:** The system pulls the "Current Status" and "Next Milestone" from Payload.
2.  **Verification:** The Project Lead (Researcher) spends 5 mins ensuring the "Next Milestone" is accurate.
3.  **The Blessing:** Micah does a bulk approval of all Friday Pulses in one view.
4.  **The Result:** Every client enters the weekend feeling "held" and informed, with zero Sunday-night anxiety.

---

## 4. The Global Inbox & Triage
All incoming mail to any of our aliases lands in the **Payload Global Inbox**.

- **Admin Role (You):** You triage the incoming mail.
- **Action:** "Promote" an email to a specific **Project Vault**.
- **Outcome:** The Project Lead (Researcher) is notified of the new information (e.g., "The Publisher sent back revisions"). The researcher drafts a response for Micah to "Bless."
