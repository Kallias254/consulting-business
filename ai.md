# SYSTEM SPECIFICATION: Multi-Agent Academic Publishing Pipeline

## 1. System Overview & Core Goal
Build a type-safe, multi-agent academic drafting and editorial engine designed to write press-ready long-form publications (doctoral dissertations, monographs, IMRaD peer-reviewed journal articles, systematic reviews, and handbook entries).

The core engine relies on a **5-Agent Production Assembly Line** orchestrated via a Python state machine using `pydantic-graph` and Pydantic validation schemas.

---

## 2. Technical Stack Requirements
* **Methodological & AI-Level Framework:** Governed by [docs/25_scholarly_research_architecture_and_ai_levels.md](file:///home/miseda/Documents/projects/consulting-business/docs/25_scholarly_research_architecture_and_ai_levels.md).
* **Orchestration Control Plane:** `pydantic-graph` (State Machine Engine enforcing typed node transitions and state updates).
* **Memory & Knowledge Graph:** 3-Tier Memory Architecture (Project Memory, Section Memory, Cross-Section Knowledge Graph) with Global Research Architect.
* **Data Schemas & Contracts:** Pydantic `BaseModel` for all inter-agent inputs, outputs, section briefs, and critique payloads.
* **Horizontal Drafter Engine:** Gemini Deep Research Agent (invoked via the Google GenAI / Interactions API).
* **Execution Constraint & Hierarchy:** Tiered Evidence Hierarchy (Tier 1: Local primary PDFs; Tier 2: Discovered peer-reviewed literature via academic search; Tier 3: Supplementary web context with strict passage-grounding).
* **Agent System Prompts:** Externalized `.md` prompt files loaded into individual agent configurations.

---

## 3. Academic Deliverable Template Taxonomy (Document Blueprints)

The orchestrator must support a schema library of deliverable blueprints to enforce word budgets and rhetorical structures:

1. **Empirical Journal Article (IMRaD)**
   * *Length:* 6,000–10,000 words.
   * *Allocation:* Abstract (3%), Intro (15%), Lit Review (20%), Methods (20%), Results (22%), Discussion (20%).
2. **Monograph Book / Chapter**
   * *Length:* 7,000–12,000 words per chapter (60,000–100,000 total).
   * *Allocation:* Sustained narrative argument, theoretical framework grounding, micro-sections with 1,500+ word depth budgets.
3. **Article-Based (3-Paper) Dissertation**
   * *Length:* 45,000–70,000 words.
   * *Allocation:* Intro Synthesis $\rightarrow$ Paper 1 (IMRaD) $\rightarrow$ Paper 2 (IMRaD) $\rightarrow$ Paper 3 (IMRaD) $\rightarrow$ Integrated Discussion.
4. **Systematic Review / PRISMA Meta-Analysis**
   * *Length:* 8,000–12,000 words.
   * *Allocation:* Zero speculation; strict reporting protocol mapping, inclusion/exclusion matrices, bias assessment tables.
5. **Academic Handbook Chapter**
   * *Length:* 8,000–12,000 words.
   * *Allocation:* State of the field, theoretical debate mapping, future research agendas; highly neutral, authoritative voice.

---

## 4. The 5-Agent Functional Roles

### Agent 1: Orchestrator (Managing Editor)
* **Function:** Ingests the Master Thesis, Outline, Target Blueprint Schema, and PDF File Handles.
* **Output:** Generates a strongly-typed `SectionBrief` contract containing target word counts, exact subheadings, core arguments, and assigned PDF IDs.

### Agent 2: Deep Research Agent (Horizontal Drafter)
* **Function:** Ingests `SectionBrief` + assigned PDF handles. Runs asynchronously without web access.
* **Output:** Generates dense, exhaustive draft text hitting the requested word budget based purely on the PDF corpus.

### Agent 3: Evidence & Citation Auditor (Indexer & Fact-Checker)
* **Function:** Inspects the raw draft against source PDFs. Confirms inline quotes and page markers, strips uncited assertions, and formats references to target citation style (APA 7th, Chicago, IEEE).
* **Output:** An `AuditedDraft` with citation verification flags.

### Agent 4: Thesis & Quality Guardian (Reviewer 2 / Peer Critic)
* **Function:** Evaluates `AuditedDraft` against the `master_thesis` and `SectionBrief` core argument.
* **Output:** `GuardianEvaluation` containing a boolean `approved: bool`, score (0–100), and a structured `critique_directives` list if rejected.

### Agent 5: Publisher Compliance & Copyeditor (Production Director)
* **Function:** Converts approved drafts into final press-ready Markdown/LaTeX, normalizing heading hierarchies, blockquotes, and tables.

---

## 5. Pydantic Data Contracts & State Schemas

```python
from typing import List, Optional
from pydantic import BaseModel, Field

class ProjectMetadata(BaseModel):
    project_title: str
    deliverable_type: str # e.g., "Monograph_Chapter", "IMRaD_Article"
    citation_style: str   # e.g., "Chicago_17th_Author_Date"
    master_thesis: str

class SectionBrief(BaseModel):
    section_id: str
    section_title: str
    target_word_count: int
    required_subheadings: List[str]
    core_argument: str
    pdf_file_ids: List[str]
    revision_critique: Optional[str] = None

class AuditedDraft(BaseModel):
    section_id: str
    raw_text: str
    verified_citations_count: int
    unsupported_claims_flagged: List[str]

class GuardianEvaluation(BaseModel):
    approved: bool
    quality_score: int
    thesis_alignment_score: int
    critique_directives: Optional[List[str]] = None
