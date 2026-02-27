# 12: Indexing Strategy - Citations vs. Subject Indexing

## 1. Defining "Indexing"
In the academic world, "indexing" refers to two different tasks. We need to handle both efficiently.

### A. Citation Indexing (The Bibliography)
- **The Task:** Linking `@Smith2023` to the list of references at the end.
- **The Tool:** **BibTeX** (via Zotero/Better BibTeX).
- **The Workflow:** **Standalone.** The writer uses Zotero to manage their library and exports a `.bib` file to the project. This is the "Lean" way—you don't need to rebuild Zotero inside your app.

### B. Subject Indexing (The Index at the end of the book)
- **The Task:** Creating the "A-Z" list of keywords and page numbers.
- **The Tool:** **Typst native indexing** or a lean open-source tool like **Index-Engine**.
- **The Workflow:** **Integrated.** As the editor, you tag keywords in the Typst file (e.g., `#index("Quantum Mechanics")`). Typst automatically generates the index with correct page numbers.

## 2. Integrated vs. Standalone: The Verdict

| Feature | Standalone (Zotero) | Integrated (Payload Collection) |
| :--- | :--- | :--- |
| **Effort** | Low (Use existing tools) | High (Build a citation manager) |
| **Writer Comfort** | High (They already use Zotero) | Low (New UI to learn) |
| **Our Recommendation** | **Use Standalone for Citations.** | **Build "Metadata Tracking" in Payload.** |

### The "Hybrid" Lean Approach:
1.  **Writers** use Zotero/JabRef (Standalone Open Source).
2.  **Payload** tracks the *location* of the `.bib` file and the *number* of citations (Metadata).
3.  **The Engine (Typst)** merges them during the render.

## 3. Lean Open Source Indexing Tools
If you want to offer "Index Generation" as a premium service:
- **JabRef:** The best lean, open-source BibTeX manager for those who find Zotero too "heavy."
- **Citation.js:** A library we can add to Payload later if we want to display the bibliography directly in the "Scientist Portal."
