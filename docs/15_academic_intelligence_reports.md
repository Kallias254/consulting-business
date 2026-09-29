# 15: Academic Intelligence Reports - Justifying the Retainer

To maintain a high-value monthly retainer, we provide "Academic Intelligence" that a client cannot get from a generic VA or AI. This is delivered via the **Mantine Dashboard**.

## 1. The "Opportunity Matcher"
Instead of the client checking Twitter or mailing lists, we do the scanning.
- **The Input:** We use the client's "Keywords" and "Research Interests" stored in Payload.
- **The Engine:** Automated scans (using your Hub's scraping/RSS logic) for:
    - **Call for Chapters (CFCs):** Relevant to their field (e.g., a new CRC Press handbook).
    - **Collaboration Calls:** High-impact researchers looking for co-authors.
    - **Funding Alerts:** Upcoming deadlines for Fulbright, DAAD, or specific US Grant cycles.
- **The Delivery:** A "Recommended for You" section in their Portal.

## 2. The "Monthly Scholarly Report"
A high-end PDF (rendered via Typst) sent on the 1st of every month.
- **Citation Impact:** A summary of new citations their work has received (Scraped via Google Scholar/Crossref).
- **Portfolio Health:** Analytics on who is visiting their "Impact Portfolio" site (e.g., "3 visits from US University IPs").
- **Pipeline Review:** A summary of their active manuscripts and where they are in the Publication Cycle.
- **Strategic Recommendation:** One "Next Step" advice from Micah (e.g., "This new CFC in [Field] is perfect for your Chapter 4 work").

## 3. High-Stakes Application Support
We provide specialized "Finishing" for elite applications:
- **Fulbright / Prestigious Fellowships:** We don't just "edit"; we format the application to be typographically superior, ensuring it stands out to the selection committee.
- **Narrative Alignment:** Ensuring their "Impact Portfolio" supports the claims they are making in their application.

## 4. Deep Research & Terminal-Native AI Pipelines (The Agentic Strategy)
We have officially deprecated heavy, bloated frameworks like LangGraph and PydanticAI in favor of a lean, terminal-native AI strategy. Google’s proprietary "Deep Research" (from the Gemini web UI) runs complex autonomous loops, but we can replicate this power directly in our backend infrastructure.

### The Developer Route (Custom Go Scripts)
Instead of relying on LangChain/LangGraph, we build lightweight, custom Go scripts using the Gemini API (with Function Calling).
- **The Loop**: We pass a brief to Gemini. The model outputs structured JSON to execute a search.
- **The Execution**: Our Go server (PocketBase extension) catches the JSON, fires a live web search (via Serper.dev or custom scraper), and feeds raw text back.
- **The Synthesis**: The model synthesizes the raw data and dumps a pristine `.md` file straight into the client’s File Vault for Pandoc to compile.

### Fast Pipelines with `mods` & Fabric
For immediate, macro-level intelligence gathering without writing full autonomous loops, we integrate CLI-native AI tools directly into our data streams:
- **`mods` (by Charm)**: We pipe scraped academic portals or grant databases directly into Gemini using `mods`. Example: `curl -s [university-portal] | mods --model gemini-1.5-pro "Summarize active grants" > report.md`.
- **Fabric**: An open-source framework we use to leverage crowdsourced AI prompt "Patterns" (e.g., literature reviews, academic synthesis) mapped to our Gemini API key, executed directly from the shell.

**The Strategy:** Use the web browser for initial, macro-level discovery, but execute targeted deep research (scraping university portals, parsing CFPs) via our lean, custom Go/Gemini scripts. This keeps our operation fast, predictable, and tightly integrated into our PocketBase/Next.js architecture without the overhead of massive Python graph frameworks.

## 5. Value Justification
By providing these reports and AI-driven insights, we move from being an "Expense" to being an **"Investment in Career Growth."**
- If we find *one* chapter invitation or *one* citation they missed, the retainer pays for itself for the entire year.
