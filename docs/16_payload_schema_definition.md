# 16: Payload Schema Definition - The Technical "Bones"

This schema defines the "Consulting OS" structure, optimized for AI code generation and lean operations.

## 1. Onboarding Leads (Collection: `leads`)
- **Name:** `text` (Required)
- **Email:** `email` (Required)
- **University:** `text`
- **Document_Type:** `select` (Dissertation, Journal_Article, Book_Manuscript, Grant_Proposal)
- **Project_Status:** `select` (Drafting, Completed, Under_Revision_by_Press)
- **Target_Publisher:** `text` (e.g., "CRC Press")
- **Primary_Pain_Point:** `textarea` (e.g., "Reference management is broken")
- **Diagnostic_File:** `upload` (to `media`, Initial sample for audit)
- **Lead_Source:** `relationship` (to `users`, e.g., "Micah's Priority Link")
- **Status:** `select` (New, Auditing, Discovery, Archived, Promoted)

## 2. Clients (Collection: `clients`)
- **Name:** `text` (Required)
- **Email:** `email` (Required, Unique)
- **Academic_Niche:** `select`
- **Status:** `select` (Active, Retainer, Legacy)
- **Sentiment_Score:** `number` (Updated by Lifecycle Feed AI)

## 3. Projects (Collection: `projects`)
- **Title:** `text` (Required)
- **Client:** `relationship` (to `clients`, Required)
- **Publisher:** `text` (e.g., CRC Press)
- **Manuscript_Units:** `array` (Progressive Chapters)
    - **Unit_Title:** `text`
    - **Markdown_File:** `upload` (to `media`)
    - **Status:** `select` (Draft, Review, Published)
- **Global_BibTeX:** `upload` (to `media`)
- **Project_Vault:** `hasMany` (relationship to `media`)

## 4. Global Inbox (Collection: `inbox`)
- **From:** `text`
- **Subject:** `text`
- **Attachments:** `upload` (to `media`, multiple)
- **Project_Allocation:** `relationship` (to `projects`, optional)
- **Triage_Status:** `select` (Unprocessed, Allocated, General_Archive)

## 5. Dual-Audit Streams (Collection: `audit-logs`)
- **Project:** `relationship` (to `projects`)
- **Stream:** `select` (Technical, Lifecycle)
- **Event_Type:** `select` (WASM_Render, Email_In, Git_Sync, Sentiment_Alert)
- **Payload:** `json` (Detailed logs)
- **Importance:** `select` (Low, Medium, High)

## 6. Media (Collection: `media`)
- **File:** `upload`
- **Version:** `number`
- **Type:** `select` (Guideline, Artwork, Bibliography, Output_PDF)
- **Source:** `select` (Upload, Email_Ingestion, System_Render)

## 7. Correspondence (Collection: `correspondence`)
*This is where researchers draft emails for Principals to approve and send.*
- **Project:** `relationship` (to `projects`, Required)
- **Author:** `relationship` (to `users`, The Researcher/Lead)
- **Target:** `select` (Client, Publisher, Other)
- **Recipient_Email:** `text`
- **Subject:** `text`
- **Content:** `textarea` (Markdown supported)
- **Status:** `select` (Draft, Pending_Approval, Approved, Sent)
- **Approver:** `relationship` (to `users`, The Principal)
- **Sent_At:** `date`

## 8. Media (Collection: `media`)
