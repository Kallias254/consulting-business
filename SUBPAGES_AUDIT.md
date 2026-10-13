# 📋 Full ScholarCrafted Sub-Pages Audit
## Current State vs. Proposed Changes — All Routes Under `/scholarcrafted/`

> **Ground Rule:** No page gets touched until reviewed here first.
> Reference the main audit: [website_copy_audit.md](./docs/23_website_copy_audit.md)

---

## 🗺️ Complete Route Map

```
/scholarcrafted                            ← Main landing (audited separately)
/scholarcrafted/about                      ← Team & credentials page
/scholarcrafted/how-it-works               ← 2-path process (coaching vs editing)
/scholarcrafted/services                   ← Services hub/index
/scholarcrafted/services/private-coaching  ← Live coaching packages
/scholarcrafted/services/editing-proofreading ← Editing + pricing sliders
/scholarcrafted/services/research-support  ← Stats, SPSS, qualitative
/scholarcrafted/consultation               ← 8-step booking wizard
/scholarcrafted/request-review             ← 6-step quote wizard
/scholarcrafted/resources                  ← Downloadable blueprints hub
/scholarcrafted/resources/articles         ← Article archive (duplicate of blog)
/scholarcrafted/resources/articles/[slug]  ← Individual article
/scholarcrafted/blog                       ← Article archive (duplicate of resources/articles)
/scholarcrafted/blog/[slug]               ← Individual article (dynamic)
/scholarcrafted/faq                        ← FAQ & policies accordion
/scholarcrafted/terms                      ← Terms and conditions
/scholarcrafted/routledge-handbook         ← Micah's CFC page (GOLD — keep & fix)
/scholarcrafted/hero-concepts              ← Internal staging (3 hero A/B variants)
```

---

## PAGE 1: `/scholarcrafted/about`

### Current State
- H1: "Scholarly rigor. Human guidance."
- 10 team members with Unsplash placeholder photos (Micah PhD listed as "Faculty Lead & Founder" + 9 others: Dr. Al-Saraf, Dr. Haining, Dr. Warren, Dr. Lehan, Dr. Simmons, Dr. Jansen, Dr. Moore, Dr. Phair, Dr. Rautenbach)
- Track record: Trustpilot #1, Business Excellence Awards, TITAN Gold, "10,000+ students"
- University marquee: Yale, Oxford, Stanford etc. (same as homepage)
- CTA button "CHAT WITH A FACULTY COACH" has **no href** (broken)
- **Typo line 295:** "we do everything ethically can to help you" (missing "we")

### What to Scrap
- All 9 fake team members (Dr. Al-Saraf, Dr. Haining etc.) — they are fictional with stock photos
- All fake award badges (Trustpilot #1, Business Excellence, TITAN Gold — unverifiable)
- "10,000+ students" claim
- The second university marquee (already used on homepage — double-claiming)

### What Must Be There Instead
- **Micah featured prominently at top** — real photo, full name, faculty title, NCSU affiliation, link to actual NCSU faculty page. This is the page where institutional authority is fully established.
- **Real team structure** — use actual role descriptions even if team members are anonymous for now (e.g., "Lead Research Analyst", "Statistical Support Specialist") without fake names and photos.
- **Honest track record** — feature Micah's actual publications, grants, and institutional positions instead of fabricated awards. Real credentials > fake trophies.
- Fix the typo ("we can do everything we ethically can to help you")
- Fix the CTA href

### Strategy Alignment
> **Keep but restructure.** This is the right page for Micah's authority. It just needs real content instead of fabricated credibility signals.

---

## PAGE 2: `/scholarcrafted/how-it-works`

### Current State
- H1: "A guided path from stalled draft to submission."
- Two-path toggle: "Private Advisory Pathway" (coaching) vs "Project-Based Pathway" (editing)
- Each path has a 4-phase timeline (Diagnostic → Milestones → Execution → Defense Readiness)
- CTA: "GET A QUOTE" → `/request-review` and "LEARN ABOUT THE TEAM" → `/about`

### What to Scrap
- The "Defense Readiness" phase language on the coaching path — assumes client is a PhD student defending a dissertation. Our actual Tier 2/3 clients are post-PhD professors.
- "A guided path from stalled draft to **submission**" — again, PhD student framing.

### What Must Be There Instead
- Rename/reframe the two paths to match our actual service tiers:
  - Path A: "The Finisher" (editing, formatting, compliance) — keep most of this content
  - Path B: "The Scholar/Professional" (full-cycle: submission + correspondence + opportunity engine)
- Add a **3rd path** for the new audience: "The Correspondence Liaison" — what happens when publisher revisions land (the chaos we solve)
- Change CTAs from "GET A QUOTE" to "Apply to Work With Us" (for Tier 2/3) and "Request a Proposal" (for Tier 1)

### Strategy Alignment
> **Keep but add the Tier 3 path.** The two-path toggle is smart UX. Just needs a 3rd path added and PhD-student language removed.

---

## PAGE 3: `/scholarcrafted/services` (hub)

### Current State
- H1: "Rigorous support for the academic journey."
- 3 services: Live Academic Coaching / Structural Editing & Proofreading / Custom Research & Data Support
- Section labels: "1-on-1 Guidance" and "Asynchronous Support"

### What to Scrap
- "Designed for doctoral candidates" framing in the coaching section
- The current 3-service menu maps 1:1 with the OLD structure (pre-strategy pivot)

### What Must Be There Instead
Restructure to match the actual 3-tier pricing strategy:
- **The Finisher** → `/services/editing-proofreading` (keep existing page content, update framing)
- **The Scholar** → `/services/research-support` (keep, update framing + add stats/methodology for professors not just PhD students)
- **The Professional** → new page or redirect to `/request-review` with "Apply to Work With Us" CTA
- Remove "Live Academic Coaching" as a top-level service — shift to async consulting model per strategy

### Strategy Alignment
> **Keep structure, update content.** The hub page logic is sound. The services listed need to match the 3-tier pricing model from `docs/02_services_and_pricing.md`.

---

## PAGE 4: `/scholarcrafted/services/private-coaching`

### Current State
- H1: "Live Academic Coaching"
- Pricing: $750 (5hr) / $1,400 (10hr) / $2,600 (20hr)
- 6 "Common Roadblocks": vague feedback, structural paralysis, literature sinkhole, imposter syndrome, methodology gridlock, life balance
- All framed entirely for PhD students

### What to Scrap
- The "ABD stage" and "doctoral candidates" framing throughout
- "Defense Readiness" (dissertation defense) as a target outcome
- Imposter syndrome and work-life balance as roadblocks — not relevant for funded professors

### What Must Be There Instead
Strategy explicitly decided: **move away from live coaching toward asynchronous consulting**. Two options:
1. **Pivot this page** to "Asynchronous Strategic Consulting" — Loom video reviews, secure dashboard messaging, async document deep-dives priced by milestone rather than hourly retainer
2. **Keep the live coaching page** but add a new audience: professors (not PhD students) who want faculty-peer strategic sessions

The pricing is actually appropriate for the right audience. $750-$2,600 is solid for professors with startup funds. The problem is the targeting, not the price.

### Strategy Alignment
> **Major rewrite needed.** Either pivot the entire page to async consulting or dual-audience it (keep for PhD students as Tier 1, add professor-focused framing as Tier 2). Decide which before touching.

---

## PAGE 5: `/scholarcrafted/services/editing-proofreading`

### Current State
- H1: "Precision editing for scholars."
- Pricing slider: $0.044/word for formatting / $90/hour for technical
- Quality Guarantee with scrolling marquee ribbon
- Lead magnet: "The Manuscript Refinement Guide" (email modal)
- 4-phase editorial process (Forensic Review → Precision Edit → Formatting → Verification)

### What to Keep — This Page is Strong
- The pricing slider UX is excellent
- The "Quality Guarantee" section is compelling and differentiating
- The 4-phase process is clear
- The $0.044/word rate aligns exactly with strategy docs

### What to Update
- Re-target the hero copy from "doctoral candidates" to include "researchers and faculty"
- Wire the lead magnet email to actually save to PocketBase (currently unknown if it does)
- Update the CTA "GET A FREE QUOTE" to align with pricing tier framing

### Strategy Alignment
> **Minimal changes needed.** This is the most production-ready page. Just update the audience framing. **Do not break this page.**

---

## PAGE 6: `/scholarcrafted/services/research-support`

### Current State
- H1: "Methodological design and custom data support."
- Services: Qualitative Coding (NVivo/ATLAS.ti) / Quantitative (SPSS/R/STATA)
- Clear distinction between "Custom Data Support" (async) vs "Live Consulting" (real-time)

### What to Keep
- The "Crucial Distinction" section is excellent — async vs live is exactly the framing the strategy calls for
- The technical deliverables (SPSS, R, NVivo) are exactly what goes on the Upwork profile
- The 3-step process is clean

### What to Update
- Re-target the hero to include funded lab directors managing large datasets, not just PhD methodology chapters
- Add explicit mention: these are the same technical services available via Upwork for smaller/immediate tasks
- Cross-sell link to the "Opportunity Engine" for Tier 3 clients

### Strategy Alignment
> **Minor updates only.** Good foundation. Broaden the audience framing.

---

## PAGE 7: `/scholarcrafted/consultation` (8-step wizard)

### Current State
- 8-step booking wizard with Calendly iframe integration
- Coaches listed: Brandon, Denise, Ethar, Kerryn, Lani, Matthew, Nichole, Suzanne, Tara
- **BUG:** Selecting a coach redirects to `/admin/login` — placeholder bug
- Interest options: Live Academic Coaching / Custom Research & Data Support / Structural Editing & Proofreading / Not Sure Yet
- Audience: entirely PhD student focused (stalled momentum, committee friction, ABD)

### What to Scrap
- All fake coach names (Brandon, Denise, Ethar etc.) — if these aren't real team members, remove
- PhD student specific step language ("Where are you in the process?" → "Proposal Phase / Data Collection / Drafting Chapters")
- The `/admin/login` redirect bug

### What Must Be There Instead
- Simplify to the actual real team: Micah as Principal + Admin (you) as Managing Coordinator
- New interest options to reflect actual Tier model: The Finisher / The Scholar / The Professional / Not Sure
- Stage options must reflect the professor audience: "Have a funded grant, need project management" / "Editing a multi-contributor handbook" / "Publisher revision response needed" / "Need help with CFC submission"
- Wire the Calendly to Micah's actual calendar

### Strategy Alignment
> **Significant rewrite needed, but keep the wizard UX.** The multi-step wizard itself is great interaction design. The content filling it is wrong.

---

## PAGE 8: `/scholarcrafted/request-review` (6-step quote wizard)

### Current State
- 6-step quote request
- Step 5 success: "Thank you, [name]. We have securely received your details. A faculty coordinator will review your submission and issue a formal quote to [email] within 24 hours."
- Academic levels: Undergraduate / Master's / Doctoral / Professional / Post-Doc

### What to Keep
- The wizard UX is solid
- The 24-hour quote promise is a strong conversion element
- The email confirmation success state is good

### What to Update
- Add "Faculty / Researcher" as an academic level option (currently tops out at Post-Doc)
- Wire form submission to PocketBase `leads` collection (critical — currently unknown if wired)
- Rename Step 0 service options to match new tier names

### Strategy Alignment
> **Minor updates.** Add researcher audience, wire to PocketBase, update service names.

---

## PAGE 9: `/scholarcrafted/resources`

### Current State
- 3 downloadable blueprints: Chapter 1 Proposal Framework / Literature Review Synthesis Matrix / Qualitative Codebook Template
- All gated behind email modal (lead magnet)
- Links to blog/articles archive

### What to Keep
- Lead magnet strategy is solid — aligns with "BibTeX Health Monitor" and "Permanent Utility Hook" from strategy docs
- The 3 templates are genuinely useful for the PhD audience

### What to Update
- Add resources targeted at the professor audience: e.g., "The CFC Submission Framework" / "The Multi-Contributor Handbook Intake Template"
- Wire email submissions to PocketBase (currently unknown)

### Strategy Alignment
> **Add new resources for professor audience. Keep existing student resources.**

---

## PAGE 10: `/scholarcrafted/resources/articles` + `/scholarcrafted/blog`

### Current State
- **DUPLICATE CONTENT** — two routes (`/resources/articles` and `/blog`) show identical 4 articles with slightly different card styling
- Articles are all PhD-student focused: "When your Dissertation Chair ghosts you", "ABD Trap: How to restart after 6-month break"
- Both link to "GET A QUOTE" → `/request-review` at the bottom

### What to Scrap
- One of the two duplicate routes — consolidate to `/blog` and have `/resources/articles` redirect there (or vice versa)

### What to Add
- New articles targeting the professor audience: "Managing 20+ Academic Contributors: A Publisher Compliance Guide" / "What to Do When a Journal Sends Major Revisions" / "How to Respond to Routledge Without Losing the Deal"

### Strategy Alignment
> **Consolidate duplicates. Add professor-targeted articles. PhD articles can stay as they attract PhD leads who may later become researchers under Micah.**

---

## PAGE 11: `/scholarcrafted/faq`

### Current State
- 3 groups: Service Clarity / Academic Integrity / Logistics
- Covers: editing vs consulting, confidentiality, ghostwriting policy, consultation booking

### What to Keep — Almost Everything
- The academic integrity section is important and well written
- The ghostwriting policy is legally necessary
- The consultation logistics are accurate

### What to Update
- Add FAQ entry: "What happens when I receive publisher revisions?" → "We intercept and manage the entire revision correspondence..."
- Add FAQ entry: "Can you manage a multi-contributor handbook?" → yes, this is the Associate Professor target
- Add FAQ entry: "How is this different from Wordvice or AJE?" → The Micah Difference

### Strategy Alignment
> **Add 3 new FAQ entries for the professor audience. Keep existing student content.**

---

## PAGE 12: `/scholarcrafted/terms`

### Current State
- 6 sections covering booking, cancellations, confidentiality, dispute resolution
- States: "Client data is securely stored on Google Drive"

### What to Update
- Replace "Google Drive" with "our sovereign, encrypted file vault" — referencing Google Drive in legal terms feels amateurish for a premium agency positioning
- Review once DIG LLC is formally registered — these terms should carry the entity name

### Strategy Alignment
> **Minor language cleanup only. Do not change substance.**

---

## PAGE 13: `/scholarcrafted/routledge-handbook` ⭐ GOLD

### Current State
- **This is Micah's actual live Call for Chapters for "The Routledge Handbook of Hip Hop and Sport"**
- Editor profile shows Micah as Editor-in-Chief at NC State / JCSU
- $20,000 institutional research funding badge
- 11 chapters confirmed, 7 vacancies open
- All CTAs broken (no hrefs): "SUBMIT ABSTRACT", "DOWNLOAD PROSPECTUS", "VIEW FULL SUBMISSION GUIDELINES"

### Why This Page Matters Enormously
This is the most important page on the entire site from a marketing perspective. It:
1. **Proves Micah is a real, active academic** editing a major Routledge handbook
2. **Demonstrates exactly the "Multi-Author Nightmare" pain point** we are solving — 30 contributors, publisher compliance, strict timelines
3. **Is a live client acquisition page** for researchers who want to contribute to the handbook

### What Must Be Fixed
- Wire all 3 CTAs (Submit Abstract, Download Prospectus, View Submission Guidelines)
- The abstract submission should POST to PocketBase `leads` collection — every abstract submitter is a warm prospect
- Add a subtle note: "Supported by the Principia/ScholarCrafted infrastructure" to tie the agency brand to the project
- Make the "Submission Guidelines" downloadable PDF actually downloadable

### Strategy Alignment
> **Fix the CTAs immediately. This page generates real leads and proves real authority. It is your best marketing asset right now.**

---

## PAGE 14: `/scholarcrafted/hero-concepts`

### Current State
- Internal staging page showing 3 hero variant designs (A: "Rigor and Insight, On Demand" / B: Abstract quote / C: "The End of Academic Drift")
- All CTAs have no hrefs (expected — staging page)

### What to Do
- **Keep as-is for internal review.** This is your A/B testing sandbox.
- Once the homepage hero is rewritten (per the main audit), come back here to stage the new hero variants before replacing the live one.
- Add the new proposed hero copy to this page as Variation D before going live.

### Strategy Alignment
> **Perfect use case. Do not expose this route publicly — add `noindex` meta tag.**

---

## 🚨 Critical Bugs to Fix Before Any Outbound

| Bug | Page | Impact |
| :--- | :--- | :--- |
| Selecting a coach → redirects to `/admin/login` | `/consultation` | Real prospects hit a login wall |
| "CHAT WITH A FACULTY COACH" has no href | `/about` | Broken CTA |
| All Routledge Handbook CTAs have no href | `/routledge-handbook` | Dead leads from real academic traffic |
| "SUBMIT ABSTRACT" goes nowhere | `/routledge-handbook` | Lost warm prospects |
| Blog and articles/resources are duplicate routes | `/blog` + `/resources/articles` | SEO duplicate content penalty |
| "Google Drive" in Terms of Service | `/terms` | Undermines premium positioning |
| Fake coach names in consultation wizard | `/consultation` | Credibility risk if discovered |

---

## 📊 Page-by-Page Priority Decision Table

| Page | Status | Action |
| :--- | :---: | :--- |
| `/about` | ⚠️ Needs rewrite | Replace fake team/awards with Micah real credentials |
| `/how-it-works` | 🟡 Minor updates | Add Tier 3 path; remove PhD defense framing |
| `/services` | 🟡 Restructure | Remap to 3-tier model (Finisher/Scholar/Professional) |
| `/services/private-coaching` | 🔴 Major rewrite | Pivot to async consulting OR dual-audience |
| `/services/editing-proofreading` | 🟢 Mostly good | Update audience framing only — **do not break** |
| `/services/research-support` | 🟢 Mostly good | Broaden to professor audience |
| `/consultation` | 🔴 Major rewrite | Fix coach bug; update audience; wire to real calendar |
| `/request-review` | 🟡 Minor updates | Add researcher level; wire to PocketBase |
| `/resources` | 🟡 Add content | Add professor-targeted resources |
| `/resources/articles` | 🔴 Consolidate | Merge with /blog; keep one route |
| `/blog` | 🟡 Add articles | Add professor-targeted posts |
| `/faq` | 🟢 Mostly good | Add 3 new professor-audience Q&As |
| `/terms` | 🟢 Minor cleanup | Replace "Google Drive"; add DIG LLC name post-incorporation |
| `/routledge-handbook` | 🔴 Fix CTAs NOW | Wire all 3 CTAs; connect to PocketBase leads |
| `/hero-concepts` | 🟢 Keep as staging | Add noindex meta; use for new hero A/B |
