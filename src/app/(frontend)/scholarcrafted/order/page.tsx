'use client'

import React, { useState, Suspense } from 'react'
import {
  Container, Title, Text, Box, SimpleGrid, Stack,
  Button, rem, Group, useMantineTheme, UnstyledButton,
  Divider, Table, NumberInput, Accordion, Badge,
} from '@mantine/core'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  IconCheck, IconX, IconArrowLeft, IconArrowRight,
  IconShieldCheck, IconMinus,
  IconPencil, IconFileText, IconBook2, IconQuestionMark,
  IconStar, IconCurrencyDollar,
} from '@tabler/icons-react'
import { Navbar } from '../_components/Navbar'
import { SECTION_SPACING } from '@/layout'

// ─── Editing data ─────────────────────────────────────────────────────────────

const editingTiers = [
  {
    id: 'advanced',
    name: 'Advanced Editing',
    badge: 'ACCURATE & FAST',
    isPopular: false,
    tagline: 'Precision grammar, syntax, academic tone & full style manual compliance.',
    rateNum: 0.0425,
    rate: '$0.0425 / word',
    turnaround: '3–5 days',
    features: [
      'Line-by-line grammar, punctuation & syntax correction',
      'Discipline-specific terminology verification',
      'Target journal / university template formatting',
      '100% Track Changes delivery in Word',
      'Editorial Compliance Certificate',
    ],
    deliverables: [
      'Tracked Changes document (.docx)',
      'Clean submission-ready document (.docx)',
      'Editorial Certificate of English Editing',
      'Style manual compliance checklist',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Editing',
    badge: 'MOST REQUESTED',
    isPopular: true,
    tagline: 'Substantive line editing, argument flow & 365-day re-editing support.',
    rateNum: 0.065,
    rate: '$0.065 / word',
    turnaround: '5–7 days',
    features: [
      'All Advanced Editing features included',
      'Substantive paragraph reorganisation & logical pacing',
      'Reference cross-check: citations vs bibliography',
      'Target journal scope & author guidelines audit',
      'Submission cover letter & abstract packaging',
      'Unlimited complimentary re-editing for 365 days',
      'Editor Advisory Memorandum on thesis defensibility',
    ],
    deliverables: [
      'Tracked Changes document with margin commentary',
      'Publication-ready document formatted to target press',
      'Target Journal Scope & Guidelines Audit memo',
      'Target Journal Cover Letter',
      'Citation & Bibliography cross-audit memo',
      'Editorial Rigor Certificate + 365-day re-editing',
    ],
  },
  {
    id: 'scientific',
    name: 'Scientific Editing Pro',
    badge: 'HIGH-IMPACT JOURNALS',
    isPopular: false,
    tagline: 'Dual-pass developmental critique by former journal peer reviewers.',
    rateNum: 0.095,
    rate: '$0.095 / word',
    turnaround: '7–10 days',
    features: [
      'All Premium Editing features included',
      'Scientific Completeness Assessment',
      'Peer reviewer commentary (Nature, Lancet, NEJM calibre)',
      'Reviewer Response Matrix & rebuttal crosscheck',
      'Unlimited re-editing & re-formatting for 365 days',
    ],
    deliverables: [
      'Tracked Changes substantive edit',
      'Comprehensive Scientific Review Report',
      'Journal Rebuttal / Revision Response Matrix',
      'Cover Letter + Submission Checklist',
      'Executive Certificate + Priority 365-day re-editing',
    ],
  },
]

const editingMatrix = [
  { feature: 'Grammar, punctuation & syntax correction', advanced: true, premium: true, scientific: true },
  { feature: 'Discipline-specific terminology accuracy', advanced: true, premium: true, scientific: true },
  { feature: '100% Track Changes delivery in Word', advanced: true, premium: true, scientific: true },
  { feature: 'Target journal style & handbook formatting', advanced: true, premium: true, scientific: true },
  { feature: 'Target journal scope & guidelines audit', advanced: false, premium: true, scientific: true },
  { feature: 'Editorial Certificate of English Editing', advanced: true, premium: true, scientific: true },
  { feature: 'Substantive paragraph reorganisation & flow', advanced: false, premium: true, scientific: true },
  { feature: 'Reference cross-audit (citations vs bibliography)', advanced: false, premium: true, scientific: true },
  { feature: 'Custom journal cover letter creation', advanced: false, premium: true, scientific: true },
  { feature: 'Unlimited complimentary re-editing', advanced: false, premium: '365 days', scientific: '365 days' },
  { feature: 'Editor Advisory Memorandum', advanced: false, premium: true, scientific: true },
  { feature: 'Scientific completeness & logic review', advanced: false, premium: false, scientific: true },
  { feature: 'Peer reviewer critical commentary report', advanced: false, premium: false, scientific: true },
  { feature: 'Reviewer response matrix / rebuttal crosscheck', advanced: false, premium: false, scientific: true },
]

const editingFAQ = [
  { q: 'What does "Track Changes" mean?', a: 'Every edit we make is visible as a tracked change in Microsoft Word. You can accept or reject each edit individually, so you retain complete control over the final text.' },
  { q: 'How do I choose between Advanced and Premium?', a: 'Advanced is ideal for manuscripts with strong structure that need language polish. Premium adds substantive restructuring, reference auditing, and 365-day re-editing — best for dissertations, R&R responses, or manuscripts that need deeper work.' },
  { q: 'Can I upgrade from Advanced to Premium later?', a: 'Yes. You only pay the per-word difference between tiers. We apply your Advanced fee as credit toward Premium.' },
  { q: 'Do you edit LaTeX manuscripts?', a: 'We edit in Word with Track Changes. If your manuscript is in LaTeX, we can edit the exported PDF or Word conversion and return the tracked changes for you to apply.' },
  { q: 'What is the 365-day re-editing guarantee?', a: 'With Premium and Scientific Pro, you can resubmit your manuscript for additional editing passes at no charge for a full year. Ideal for committee revisions, R&R rounds, or journal changes.' },
]

// ─── Journal data ─────────────────────────────────────────────────────────────

const journalTiers = [
  {
    id: 'essentials',
    name: 'Essentials',
    badge: 'SUBMISSION-READY',
    isPopular: false,
    tagline: 'Technical conformity & compliance before your paper reaches an editor.',
    price: '$320',
    turnaround: '3–5 days',
    features: [
      'Target journal guidelines compliance audit',
      'Layout, margin, font & line-number formatting',
      'Reference style conversion (APA, Chicago, Vancouver, etc.)',
      'Figure & table caption placement and formatting',
      'Submission checklist verification',
    ],
    deliverables: ['Formatted manuscript (.docx / LaTeX)', 'Compliance report', 'Submission checklist sign-off'],
  },
  {
    id: 'pro',
    name: 'Pro',
    badge: 'MOST POPULAR',
    isPopular: true,
    tagline: 'End-to-end submission packaging with custom cover letter & graphical abstract review.',
    price: '$560',
    turnaround: '5–7 days',
    features: [
      'All Essentials features included',
      'Custom journal cover letter tailored to Editor-in-Chief',
      'Graphical abstract technical formatting & check',
      'Submission portal preparation (keywords, metadata, declarations)',
      '1 complimentary re-formatting if target journal changes',
    ],
    deliverables: ['All Essentials deliverables', 'Custom Cover Letter (.docx)', 'Submission Metadata Dossier', '1 Free Re-format pass'],
  },
  {
    id: 'full',
    name: 'Full',
    badge: 'END-TO-END',
    isPopular: false,
    tagline: 'Unlimited submission rounds until your paper finds its journal.',
    price: 'From $900',
    turnaround: 'Ongoing',
    features: [
      'All Pro features included',
      'Unlimited reformatting across multiple journals',
      'Unlimited response letter rounds',
      'Revision editing included',
      'Submission handled on your behalf (portal upload)',
      'Dedicated editorial contact for the full cycle',
    ],
    deliverables: ['All Pro deliverables', 'Ongoing reformatted manuscripts (unlimited)', 'Ongoing response letters (unlimited)', 'Submission confirmation with portal reference'],
  },
]

const journalMatrix = [
  { feature: 'Target journal guidelines compliance audit', essentials: true, pro: true, full: true },
  { feature: 'Layout, margin, font & line-number formatting', essentials: true, pro: true, full: true },
  { feature: 'Reference style conversion (APA / Chicago / Vancouver)', essentials: true, pro: true, full: true },
  { feature: 'Figure & table caption formatting', essentials: true, pro: true, full: true },
  { feature: 'Submission checklist verification', essentials: true, pro: true, full: true },
  { feature: 'Custom cover letter to Editor-in-Chief', essentials: false, pro: true, full: true },
  { feature: 'Graphical abstract formatting & check', essentials: false, pro: true, full: true },
  { feature: 'Submission portal preparation (metadata, keywords)', essentials: false, pro: true, full: true },
  { feature: 'Re-formatting if target journal changes', essentials: false, pro: '1 round', full: 'Unlimited' },
  { feature: 'Response letter drafting & rebuttal crosscheck', essentials: false, pro: false, full: 'Unlimited' },
  { feature: 'Revision editing included', essentials: false, pro: false, full: true },
  { feature: 'Portal upload handled on your behalf', essentials: false, pro: false, full: true },
  { feature: 'Dedicated editorial contact for full cycle', essentials: false, pro: false, full: true },
]

const journalFAQ = [
  { q: 'Does this include editing?', a: 'Journal Publication Support focuses on formatting, compliance, and submission packaging. Language editing is a separate service. Many clients pair Essentials with Advanced Editing for a complete package.' },
  { q: 'What if my target journal changes after formatting?', a: 'With Pro, you receive 1 free re-formatting pass. With Full, you get unlimited reformatting for any journal change throughout your submission journey.' },
  { q: 'Can you submit the manuscript for me?', a: 'Yes — with the Full package, we handle the complete portal submission on your behalf, including uploading files, filling in metadata, and verifying submission confirmation.' },
  { q: 'Do you write the cover letter from scratch?', a: 'Yes. Pro and Full packages include a custom cover letter written specifically for your target journal\'s Editor-in-Chief, tailored to the journal\'s scope and your manuscript\'s contribution.' },
]

// ─── Book data ────────────────────────────────────────────────────────────────

const bookStages = [
  {
    step: '01', title: 'Publisher Selection',
    subtitle: 'Find the right press before you write a word of your proposal.',
    desc: 'Identify the right academic press for your book — before writing a single line of your proposal.',
    price: '$280 flat', turnaround: '5–7 days',
    includes: [
      '3–5 ranked publishers matched to your subject area and audience',
      'Analysis of acquisition focus, series fit, submission requirements',
      'Routledge, Oxford, SAGE, Cambridge, Michigan, Cornell & field-specific presses',
      'Guidance on open-access and hybrid publishing options',
    ],
  },
  {
    step: '02', title: 'Book Proposal',
    subtitle: 'The document that gets your book commissioned.',
    desc: 'A complete acquisition-ready proposal written to the publisher\'s template.',
    price: '$480 flat', turnaround: '7–10 days',
    includes: [
      'Chapter-by-chapter outline with synopsis for each chapter',
      'Market and audience analysis',
      'Competing titles section with clear differentiation statement',
      'Author credentials and platform summary',
      'Sample chapter editing and polish',
      'Formatted to target publisher\'s proposal requirements',
    ],
  },
  {
    step: '03', title: 'Manuscript Editing',
    subtitle: 'Full book-length editing to academic press standards.',
    desc: 'Same rigour as our Editing & Compliance service, scaled to book scope.',
    price: 'Per word (from $0.0425/w)', turnaround: 'Project-dependent',
    includes: [
      'Line-by-line language editing across the full manuscript',
      'Structural consistency across chapters',
      'Style manual conformity (Chicago, APA, or press-specific)',
      'Reference list audit and DOI verification',
      'Front and back matter formatting',
    ],
  },
  {
    step: '04', title: 'Galley Proof Review',
    subtitle: 'Catch every error before the final press run.',
    desc: 'First- and second-pass review of typeset page proofs.',
    price: 'Project-based rate', turnaround: '5–10 days',
    includes: [
      'Detection of typesetting errors, bad line breaks & font dropouts',
      'Figure placement & caption cross-check',
      'Resolution of copyeditor queries without disrupting page flow',
      'Table integrity and heading hierarchy verification',
      'Errata preparation and margin notes for press production editors',
    ],
  },
  {
    step: '05', title: 'Back-of-Book Indexing',
    subtitle: 'Professional index delivered press-ready.',
    desc: 'Professional subject and author index built to press specification.',
    price: '$3 / typeset page', turnaround: '10–14 days',
    includes: [
      'Subject index, author index, and combined index options',
      'Headings, subheadings, cross-references (See / See also)',
      'Adherence to press guidelines (Oxford, Cambridge, Routledge, Michigan)',
      'Delivered in press-ready Word, RTF, or plain text format',
      'Built using professional indexing software (Cindex / SKY Index)',
    ],
  },
  {
    step: 'FULL', title: 'Full 5-Stage Pipeline',
    subtitle: 'From publisher selection to printed book — coordinated by Dr. Micah Dobson.',
    desc: 'Complete end-to-end monograph publishing: publisher ranking, acquisition proposal, manuscript editing, galley proof review, and back-of-book indexing. One point of contact from contract to press.',
    price: 'Custom Scoped Bundle', turnaround: 'Contract to Press',
    isPipeline: true,
    includes: [
      'Publisher ranking report (3–5 matched academic presses)',
      'Acquisition-ready book proposal formatted to target press requirements',
      'Full manuscript line editing to academic press standards',
      'First- and second-pass galley proof review',
      'Professional subject & author index (press-spec delivery)',
      'Coordinated by Dr. Micah Dobson — single point of contact throughout',
      'Milestone schedule aligned to press submission deadlines',
      '50% deposit on contract, 50% on final delivery',
    ],
  },
]

const bookMatrix = [
  { row: 'Publisher ranking report (3–5 presses)', s01: true, s02: false, s03: false, s04: false, s05: false, sFULL: true },
  { row: 'Acquisition-ready book proposal', s01: false, s02: true, s03: false, s04: false, s05: false, sFULL: true },
  { row: 'Line editing (full manuscript, tracked changes)', s01: false, s02: false, s03: true, s04: false, s05: false, sFULL: true },
  { row: 'Style manual conformity (Chicago / APA / press-specific)', s01: false, s02: false, s03: true, s04: false, s05: false, sFULL: true },
  { row: 'Reference list audit & DOI verification', s01: false, s02: false, s03: true, s04: false, s05: false, sFULL: true },
  { row: 'Typesetting error detection & galley mark-up', s01: false, s02: false, s03: false, s04: true, s05: false, sFULL: true },
  { row: 'Copyeditor query resolution', s01: false, s02: false, s03: false, s04: true, s05: false, sFULL: true },
  { row: 'Subject & author index (press-spec)', s01: false, s02: false, s03: false, s04: false, s05: true, sFULL: true },
  { row: 'Press-ready delivery (Word / RTF / plain text)', s01: false, s02: false, s03: false, s04: false, s05: true, sFULL: true },
]

const bookFAQ = [
  { q: 'Can I start at any stage?', a: 'Yes. Each stage is independently priced and can be ordered on its own. Many authors come to us at Stage 03 (editing) or Stage 05 (indexing) because their publisher requires it before press.' },
  { q: 'What publishers do you work with?', a: 'We specialise in academic monograph presses: Oxford, Cambridge, Routledge, SAGE, Michigan, Cornell, and field-specific presses. Not trade publishers — academic ones.' },
  { q: 'How does the Full Pipeline pricing work?', a: 'The Full Pipeline is a custom-scoped bundle. We assess your manuscript stage, target press, and timeline, then provide a single all-inclusive quote. Payment is 50% on contract, 50% on final delivery.' },
]

// ─── AI Audit data ────────────────────────────────────────────────────────────

const aiAuditTiers = [
  {
    id: 'single',
    name: 'Single Manuscript Audit',
    badge: 'ACCESSIBLE ENTRY',
    price: '$29',
    priceNum: 29,
    turnaround: '24–48 hours',
    isPopular: true,
    tagline: 'Audit your AI-assisted research before journal submission — citation accuracy, literature gaps & peer-review risks.',
    features: [
      'Complete section-by-section diagnostic breakdown (Abstract to Conclusion)',
      'Citation verification & gap analysis benchmarked against 200M+ research papers',
      'Detection of fabricated, misattributed or hallucinated references',
      'Structural consistency & argument alignment audit across all sections',
      'Target journal scope matching & rejection risk assessment',
      '1-Page Executive Faculty Risk Memo identifying critical vulnerabilities',
      'Optional 15-minute debrief consultation with Dr. Micah Dobson',
      '100% Fee Credit: $29 credited toward full editing if scoped',
    ],
  },
  {
    id: 'bundle',
    name: 'Revision Bundle (3 Reviews)',
    badge: 'BEST VALUE FOR REVISIONS',
    price: '$69',
    priceNum: 69,
    turnaround: '24–48 hours / review',
    isPopular: false,
    tagline: 'Three full manuscript audits across your project lifecycle: draft, revision, and pre-deposit.',
    features: [
      '3 complete manuscript audits across your project lifecycle:',
      '• Review 1: Initial pre-submission AI & citation screening',
      '• Review 2: Post-advisor or committee revision verification',
      '• Review 3: Final pre-submission / camera-ready proof check',
      'Everything in Single Audit included for all 3 drafts',
      'Priority 24-hour diagnostic turnaround queue',
      'Direct follow-up consultation with Dr. Micah Dobson after each review',
      '100% Fee Credit: $69 credited toward full developmental editing',
    ],
  },
]

const aiAuditComparison = [
  { feature: 'Citation & DOI Verification (200M+ papers)', single: true, bundle: true },
  { feature: 'Hallucinated, Retracted & Misattributed Reference Detection', single: true, bundle: true },
  { feature: 'Section-by-Section Argument & Logic Coherence', single: true, bundle: true },
  { feature: 'Methods-to-Results Alignment Check', single: true, bundle: true },
  { feature: 'Target Journal Fit & Rejection Risk Screening', single: true, bundle: true },
  { feature: '1-Page Executive Faculty Risk Memo', single: true, bundle: true },
  { feature: 'Optional 15-Minute Zoom Debrief with Dr. Micah Dobson', single: true, bundle: true },
  { feature: '100% Fee Credit Toward Full Word Track-Changes Editing', single: '$29 Credit', bundle: '$69 Credit' },
  { feature: 'Number of Full Manuscript Audits Included', single: '1 Draft', bundle: '3 Drafts' },
  { feature: 'Post-Revision & Camera-Ready Re-audit', single: false, bundle: true },
]

const aiAuditFAQ = [
  { q: 'What AI tools does the audit detect?', a: 'Our audit checks for outputs from ChatGPT, Claude, Gemini, Copilot, and other LLMs. We identify hallucinated citations, fabricated references, and structural patterns consistent with AI-generated text.' },
  { q: 'Is my manuscript safe? Who sees it?', a: 'Only Dr. Micah Dobson reviews your manuscript. We sign a non-disclosure agreement before document review, and files are deleted from our systems upon project completion.' },
  { q: 'What happens after the audit?', a: 'You receive a diagnostic report with actionable recommendations. Your audit fee ($29 or $69) is credited 100% toward full editing if you proceed — making the audit effectively free.' },
  { q: 'Can I use the audit for a thesis, not a journal article?', a: 'Absolutely. The audit works for dissertations, theses, journal manuscripts, book proposals, and any academic document that may have used AI assistance during drafting.' },
]

// ─── Testimonials data ────────────────────────────────────────────────────────

const testimonials: Record<string, Array<{ quote: string; name: string; affiliation: string }>> = {
  editing: [
    { quote: 'The tracked changes were meticulous. My supervisor said the revised chapter read like a different thesis entirely.', name: 'Dr. A. Mensah', affiliation: 'University of Cape Town' },
    { quote: 'I received Premium Editing and the cover letter alone was worth the fee. Accepted on first submission.', name: 'K. Rajendran', affiliation: 'NUS, Singapore' },
  ],
  journal: [
    { quote: 'They reformatted my manuscript to three different journal specs when my first two submissions were rejected. The Full package saved my timeline.', name: 'Dr. F. Okonkwo', affiliation: 'University of Lagos' },
    { quote: 'The cover letter was tailored perfectly. The editor responded within a week.', name: 'M. Petrov', affiliation: 'ETH Zürich' },
  ],
  book: [
    { quote: 'My book proposal was accepted by Routledge within three weeks. The publisher selection report identified a series I hadn\'t even considered.', name: 'Prof. L. Andersson', affiliation: 'Lund University' },
    { quote: 'The indexing was delivered press-ready. Cambridge had zero corrections. That never happens.', name: 'Dr. H. Yamamoto', affiliation: 'Kyoto University' },
  ],
  'ai-audit': [
    { quote: 'The audit caught 4 hallucinated citations I would never have found. $29 well spent — then I upgraded to editing.', name: 'R. Aziz', affiliation: 'King Abdulaziz University' },
    { quote: "I used the Revision Bundle across my thesis, my committee revision, and the final deposit version. Dr. Dobson's debrief call after each round was invaluable.", name: 'S. Torres', affiliation: 'Columbia University' },
  ],
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function MatrixCell({ val }: { val?: boolean | string }) {
  const theme = useMantineTheme()
  const active = theme.other
  if (val === true) return <IconCheck size={16} color={active.accent} />
  if (val === false || val === undefined) return <IconMinus size={14} color="#ccc" />
  return <Text size="xs" c="dimmed" style={{ fontStyle: 'italic' }}>{val as string}</Text>
}

/** Inline testimonials — used inside each tab body */
function InlineTestimonials({ active, tabId }: { active: Record<string, string>; tabId: string }) {
  const items = testimonials[tabId] ?? []
  if (!items.length) return null
  return (
    <Box py={rem(40)} bg={active.surface}>
      <Container size={1340} px={{ base: 'md', sm: 'xl' }}>
        <Text size="xs" fw={700} c={active.accent} mb={rem(20)} style={{ letterSpacing: '0.14em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
          WHAT RESEARCHERS SAY
        </Text>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(20)}>
          {items.map((t, i) => (
            <Box key={i} p={rem(28)} bg={active.background} style={{ border: `1px solid ${active.primary}08` }}>
              <Group gap={rem(6)} mb={rem(12)}>
                {[...Array(5)].map((_, si) => (
                  <IconStar key={si} size={13} color={active.accent} fill={active.accent} />
                ))}
              </Group>
              <Text size="sm" c={active.primary} lh={1.7} mb={rem(16)} style={{ fontStyle: 'italic' }}>
                &ldquo;{t.quote}&rdquo;
              </Text>
              <Text size="xs" fw={700} c={active.primary}>{t.name}</Text>
              <Text size="xs" c="dimmed">{t.affiliation}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

/** FAQ Accordion — used inside each tab body */
function InlineFAQ({ active, items }: { active: Record<string, string>; items: Array<{ q: string; a: string }> }) {
  if (!items.length) return null
  return (
    <Box py={rem(48)} bg={active.background}>
      <Container size={1340} px={{ base: 'md', sm: 'xl' }}>
        <Text size="xs" fw={700} c={active.accent} mb={rem(6)} style={{ letterSpacing: '0.14em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
          FREQUENTLY ASKED QUESTIONS
        </Text>
        <Title order={3} mb={rem(24)} style={{ fontFamily: 'var(--font-serif)', fontSize: rem(20), fontWeight: 600, color: active.primary }}>
          Common questions about this service
        </Title>
        <Accordion
          variant="separated"
          radius={0}
          styles={{
            item: { backgroundColor: active.surface, border: `1px solid ${active.primary}08`, '&[data-active]': { backgroundColor: active.surface } },
            control: { padding: `${rem(16)} ${rem(20)}` },
            label: { fontSize: rem(14), fontWeight: 600, color: active.primary, fontFamily: 'var(--font-heading-sans), var(--font-sans)' },
            panel: { padding: `0 ${rem(20)} ${rem(16)}` },
          }}
        >
          {items.map((item, i) => (
            <Accordion.Item key={i} value={`faq-${i}`}>
              <Accordion.Control>{item.q}</Accordion.Control>
              <Accordion.Panel>
                <Text size="sm" c="dimmed" lh={1.7}>{item.a}</Text>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </Box>
  )
}

// ─── Hero title map per tab ───────────────────────────────────────────────────

const TAB_HEROES: Record<string, { kicker: string; title: string; desc: string }> = {
  'ai-audit': {
    kicker: 'PRE-SUBMISSION INTEGRITY AUDIT',
    title: 'Compare AI Manuscript Audit Options',
    desc: 'Audit what your AI missed before journal editors see it. 100% of your audit fee is credited toward full editing.',
  },
  editing: {
    kicker: 'COMPARE & SELECT AN EDITING SERVICE',
    title: 'Compare English Editing & Compliance Tiers',
    desc: 'All editing is performed by human discipline specialists in Microsoft Word Track Changes. Choose a tier to see pricing and deliverables.',
  },
  journal: {
    kicker: 'COMPARE & SELECT A PUBLICATION PACKAGE',
    title: 'Compare Journal Publication Support Packages',
    desc: 'Formatting, cover letters, submission portal preparation, and unlimited re-formatting. Choose the package that matches your submission stage.',
  },
  book: {
    kicker: 'ACADEMIC MONOGRAPH PUBLISHING',
    title: 'Book Manuscript Publishing — 5 Stages',
    desc: 'From publisher selection to back-of-book indexing. Choose individual stages or the full pipeline with a single point of contact.',
  },
}

// ─── Human Editorial Narrative Block ─────────────────────────────────────────

function HumanMentorshipNarrative({
  active,
  focus,
}: {
  active: Record<string, string>
  focus?: string | null
}) {
  const isThesis = focus === 'thesis' || focus === 'dissertation'
  const isJournal = focus === 'journal-article' || focus === 'resubmission'

  return (
    <Box py={SECTION_SPACING} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}10`, borderBottom: `1px solid ${active.primary}10` }}>
      <Container size={1200} px={{ base: 'md', sm: 'xl' }}>
        <Stack gap={rem(48)}>
          {/* Header */}
          <Box style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center' }}>
            <Text
              size="xs"
              fw={700}
              c={active.accent}
              style={{ letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: rem(8) }}
            >
              Academic Collaboration & Faculty Oversight
            </Text>
            <Title
              order={2}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)',
                color: active.primary,
                lineHeight: 1.2,
                fontWeight: 500,
              }}
            >
              Thoughtful, rigorous editorial support tailored to your research milestones.
            </Title>
            <Text size="md" c="dimmed" mt="md" lh={1.8}>
              Every manuscript at ScholarCrafted is paired directly with a doctoral specialist in your discipline and overseen personally by Dr. Micah Dobson. We read your scholarship with care, precision, and an appreciation for the intellectual dedication behind your work.
            </Text>
          </Box>

          {/* 3 Practical Anxieties Answered in Plain English */}
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing={{ base: rem(24), md: rem(32) }}>
            <Box
              p={{ base: rem(24), md: rem(32) }}
              bg={active.background}
              style={{
                border: `1px solid ${active.primary}12`,
                display: 'flex',
                flexDirection: 'column',
                gap: rem(12),
              }}
            >
              <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.12em' }}>
                01 · ETHICAL RIGOR
              </Text>
              <Text fw={700} size="md" c={active.primary} style={{ fontFamily: 'var(--font-serif)', fontSize: rem(20) }}>
                {isThesis ? 'Will my committee allow an editor?' : 'Does journal policy permit editing?'}
              </Text>
              <Text size="sm" c="dimmed" lh={1.7}>
                Yes. Graduate schools and major publishers (Elsevier, Springer, Wiley) explicitly encourage professional language and formatting review. We deliver 100% Microsoft Word Track Changes: you see every correction, accept or decline suggestions, and remain the sole intellectual author of your work.
              </Text>
            </Box>

            <Box
              p={{ base: rem(24), md: rem(32) }}
              bg={active.background}
              style={{
                border: `1px solid ${active.primary}12`,
                display: 'flex',
                flexDirection: 'column',
                gap: rem(12),
              }}
            >
              <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.12em' }}>
                02 · RE-EDITING PROTECTION
              </Text>
              <Text fw={700} size="md" c={active.primary} style={{ fontFamily: 'var(--font-serif)', fontSize: rem(20) }}>
                {isThesis ? 'What if my advisor requests changes?' : 'What if reviewers issue an R&R?'}
              </Text>
              <Text size="sm" c="dimmed" lh={1.7}>
                You do not pay twice. Under our 365-Day Re-Editing Guarantee, when committee revisions or peer-reviewer critique arrives, upload your modified chapters to your private client vault. We perform secondary editorial passes on altered text at zero additional charge.
              </Text>
            </Box>

            <Box
              p={{ base: rem(24), md: rem(32) }}
              bg={active.background}
              style={{
                border: `1px solid ${active.primary}12`,
                display: 'flex',
                flexDirection: 'column',
                gap: rem(12),
              }}
            >
              <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.12em' }}>
                03 · DIRECT FACULTY DEBRIEF
              </Text>
              <Text fw={700} size="md" c={active.primary} style={{ fontFamily: 'var(--font-serif)', fontSize: rem(20) }}>
                Can I talk through the edits with a human?
              </Text>
              <Text size="sm" c="dimmed" lh={1.7}>
                Yes. We do not disappear behind an automated file download. Every deliverable includes an optional 1-on-1 Zoom debrief consultation with Dr. Micah Dobson to review structural notes, discuss citation flags, and ensure you feel confident defending your document.
              </Text>
            </Box>
          </SimpleGrid>

          {/* What We Do vs What We Will Never Do (Ethical Clarity Grid) */}
          <Box
            p={{ base: rem(28), md: rem(40) }}
            bg={active.background}
            style={{ border: `1px solid ${active.primary}14` }}
          >
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: rem(28), md: rem(48) }}>
              <Stack gap="md">
                <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  What Our Doctoral Specialists Do
                </Text>
                <Stack gap="sm">
                  {[
                    'Untangle convoluted syntax and passive phrasing to make arguments clear and defensible.',
                    'Audit inline citations against reference entries, hunting down broken DOIs and formatting discrepancies.',
                    'Flag methodological and logical gaps that peer reviewers or committee members routinely attack.',
                    'Ensure exact conformity with target style manuals: APA 7, Chicago Notes & Bibliography, Harvard, or journal guidelines.',
                    'Deliver clean submission files alongside your tracked version and an official Editorial Compliance Certificate.',
                  ].map((item, idx) => (
                    <Group key={idx} align="flex-start" gap="xs" wrap="nowrap">
                      <IconCheck size={16} color={active.accent} style={{ flexShrink: 0, marginTop: rem(4) }} />
                      <Text size="sm" c={active.primary} lh={1.6}>{item}</Text>
                    </Group>
                  ))}
                </Stack>
              </Stack>

              <Stack gap="md" style={{ borderLeft: `1px solid ${active.primary}10`, paddingLeft: rem(24) }}>
                <Text size="xs" fw={700} c="dimmed" style={{ letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  What We Will Never Do (Our Ethical Pledge)
                </Text>
                <Stack gap="sm">
                  {[
                    'We will never ghostwrite or author original scholarly research. Your intellectual discoveries remain 100% your own.',
                    'We will never apply automated generative AI rewriting models to your confidential manuscript.',
                    'We will never fabricate or alter primary data, statistical findings, or research conclusions.',
                    'We will never share, publish, or disclose your draft: all work takes place under strict Non-Disclosure.',
                    'We will never route your project through anonymous support tickets: you communicate with Dr. Micah Dobson directly.',
                  ].map((item, idx) => (
                    <Group key={idx} align="flex-start" gap="xs" wrap="nowrap">
                      <IconMinus size={16} color="#888" style={{ flexShrink: 0, marginTop: rem(4) }} />
                      <Text size="sm" c="dimmed" lh={1.6}>{item}</Text>
                    </Group>
                  ))}
                </Stack>
              </Stack>
            </SimpleGrid>
          </Box>

          {/* Editage-Style Core Value Props: Benefits Grid */}
          <Box pt="md">
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={rem(20)}>
              {[
                {
                  title: 'Editorial Compliance Certificate',
                  desc: 'Issued upon project completion for graduate school clearance or journal submission, certifying full language and academic style verification.',
                },
                {
                  title: 'Up to 10% Word Reduction',
                  desc: 'Precision trimming of excess word count without sacrificing nuance, ensuring your thesis or paper fits strict departmental or journal length limits.',
                },
                {
                  title: 'Unlimited Editor Inquiries',
                  desc: 'Direct collaborative dialogue. Ask Dr. Dobson and your editor clarifying questions regarding margin notes until you are 100% defense-ready.',
                },
                {
                  title: '365-Day Committee Re-editing',
                  desc: 'When your advisor, thesis committee, or journal reviewer issues revisions, submit your updated sections for secondary passes at zero extra charge.',
                },
              ].map((benefit, bIdx) => (
                <Box
                  key={bIdx}
                  p="lg"
                  bg={active.background}
                  style={{
                    border: `1px solid ${active.primary}12`,
                    borderTop: `3px solid ${active.accent}`,
                  }}
                >
                  <Text fw={700} size="sm" c={active.primary} mb={rem(6)} style={{ fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                    {benefit.title}
                  </Text>
                  <Text size="xs" c="dimmed" lh={1.6}>
                    {benefit.desc}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          {/* Common Challenges We Solve (Empathetic Narrative) */}
          <Box
            p={{ base: rem(24), md: rem(36) }}
            bg={active.background}
            style={{
              border: `1px solid ${active.primary}12`,
            }}
          >
            <Text
              size="xs"
              fw={700}
              c={active.accent}
              mb="md"
              style={{ letterSpacing: '0.14em', textTransform: 'uppercase' }}
            >
              Common Research Milestones We Support
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
              <div>
                <Text fw={700} size="sm" c={active.primary} mb={rem(4)}>
                  Revising After Committee Feedback
                </Text>
                <Text size="xs" c="dimmed" lh={1.6}>
                  Restructuring literature reviews and discussions to resolve conflicting advisor suggestions with clarity and scholarly poise.
                </Text>
              </div>
              <div>
                <Text fw={700} size="sm" c={active.primary} mb={rem(4)}>
                  Responding to Peer Reviewers (R&R)
                </Text>
                <Text size="xs" c="dimmed" lh={1.6}>
                  Crafting structured rebuttal responses and aligning manuscript revisions to satisfy reviewer critiques constructively.
                </Text>
              </div>
              <div>
                <Text fw={700} size="sm" c={active.primary} mb={rem(4)}>
                  Reconciling Citations & Data Tables
                </Text>
                <Text size="xs" c="dimmed" lh={1.6}>
                  Repairing broken bibliographies, missing DOIs, and formatting inconsistencies across hundreds of cross-chapter references.
                </Text>
              </div>
              <div>
                <Text fw={700} size="sm" c={active.primary} mb={rem(4)}>
                  Final Defense & Submission Polish
                </Text>
                <Text size="xs" c="dimmed" lh={1.6}>
                  Ensuring flawless academic tone, university template compliance, and formatting accuracy for institutional clearance.
                </Text>
              </div>
            </SimpleGrid>
          </Box>

          {/* Academic Disciplines Supported */}
          <Box
            p={{ base: rem(24), md: rem(32) }}
            bg={active.background}
            style={{ border: `1px solid ${active.primary}12` }}
          >
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
              <div>
                <Text size="xs" fw={700} c={active.accent} mb={rem(4)} style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Biomedical & Clinical Sciences
                </Text>
                <Text size="xs" c="dimmed" lh={1.6}>
                  Medicine, nursing, public health, pharmacology. Strict compliance with ICMJE, CARE guidelines, and biomedical nomenclature.
                </Text>
              </div>
              <div>
                <Text size="xs" fw={700} c={active.accent} mb={rem(4)} style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Engineering, Math & STEM
                </Text>
                <Text size="xs" c="dimmed" lh={1.6}>
                  Computer science, physics, chemical and civil engineering. Exact mathematical terminology, equation review, and IEEE/ACM style adherence.
                </Text>
              </div>
              <div>
                <Text size="xs" fw={700} c={active.accent} mb={rem(4)} style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Humanities, Social Sciences & Law
                </Text>
                <Text size="xs" c="dimmed" lh={1.6}>
                  Education, sociology, literature, economics, and law. Rigorous APA 7th, Chicago Notes & Bibliography, and Harvard citation audits.
                </Text>
              </div>
            </SimpleGrid>
          </Box>

          {/* Quick Action Footer */}
          <Group justify="center" gap="md" wrap="wrap">
            <Link href="/request-review" style={{ textDecoration: 'none' }}>
              <Button
                size="md"
                radius={0}
                style={{
                  backgroundColor: active.accent,
                  color: '#ffffff',
                  fontWeight: 600,
                  height: rem(48),
                  paddingLeft: rem(24),
                  paddingRight: rem(24),
                }}
                rightSection={<IconArrowRight size={16} />}
              >
                Request a 24h Project Review
              </Button>
            </Link>
            <a
              href="https://calendly.com/misedajoseph-30-minutes-call/discovery-session"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Button
                variant="outline"
                size="md"
                radius={0}
                style={{
                  borderColor: `${active.primary}30`,
                  color: active.primary,
                  height: rem(48),
                  fontWeight: 600,
                }}
              >
                Schedule a 20-Min Conversation with Dr. Dobson
              </Button>
            </a>
          </Group>
        </Stack>
      </Container>
    </Box>
  )
}

// ─── Focus presets for campaigns & flyers ─────────────────────────────────────

interface FocusPreset {
  service: 'editing' | 'journal' | 'book' | 'ai-audit'
  kicker: string
  title: string
  desc: string
  allowedTiers?: string[]
  defaultTier?: string
  hideTabs?: boolean
}

const FOCUS_PRESETS: Record<string, FocusPreset> = {
  abstract: {
    service: 'editing',
    kicker: 'SHORT-FORM EDITORIAL POLISH',
    title: 'Abstract & Executive Summary Polish',
    desc: 'Line-by-line editorial polish, academic phrasing, and character-limit compliance for conference and journal abstracts.',
    allowedTiers: ['advanced', 'premium'],
    defaultTier: 'advanced',
    hideTabs: true,
  },
  dissertation: {
    service: 'editing',
    kicker: 'COMMITTEE DEFENSE & GRADUATION',
    title: 'Dissertation & Thesis Committee Polish',
    desc: 'Line-by-line editorial polish, style manual compliance (APA 7, Chicago, Harvard), reference cross-checking, and 365-day re-editing for committee revisions.',
    allowedTiers: ['advanced', 'premium'],
    defaultTier: 'premium',
    hideTabs: true,
  },
  thesis: {
    service: 'editing',
    kicker: 'COMMITTEE DEFENSE & GRADUATION',
    title: 'Master’s & Doctoral Thesis Polish',
    desc: 'Substantive structure, citation reconciliation, and formatting for graduation and defense clearance.',
    allowedTiers: ['advanced', 'premium'],
    defaultTier: 'premium',
    hideTabs: true,
  },
  resubmission: {
    service: 'editing',
    kicker: 'JOURNAL REVISE & RESUBMIT (R&R)',
    title: 'Journal Resubmission & Peer-Reviewer Response',
    desc: 'Substantive developmental revisions, reviewer commentary alignment, and rebuttal letter cross-checks for high-impact journal re-review.',
    allowedTiers: ['premium', 'scientific'],
    defaultTier: 'scientific',
    hideTabs: true,
  },
  'ai-audit': {
    service: 'ai-audit',
    kicker: 'PRE-SUBMISSION INTEGRITY AUDIT',
    title: 'AI Manuscript & Citation Risk Audit',
    desc: 'Audit hallucinated references and AI-generated phrasing before journal editors or Turnitin screen your manuscript. 100% credited toward full editing.',
    defaultTier: 'single',
    hideTabs: true,
  },
  'journal-formatting': {
    service: 'journal',
    kicker: 'TARGET JOURNAL SUBMISSION',
    title: 'Journal Guidelines & Publisher Formatting',
    desc: 'Layout, typography, reference formatting, and author guidelines compliance delivered ready for submission.',
    allowedTiers: ['essentials', 'pro'],
    defaultTier: 'essentials',
    hideTabs: true,
  },
  'journal-article': {
    service: 'editing',
    kicker: 'PEER-REVIEWED JOURNAL PUBLISHING',
    title: 'Journal Article & Empirical Paper Polish',
    desc: 'Line-by-line editorial polish, argument coherence, and target journal compliance delivered in Microsoft Word Track Changes.',
    allowedTiers: ['advanced', 'premium', 'scientific'],
    defaultTier: 'premium',
    hideTabs: true,
  },
  'case-report': {
    service: 'editing',
    kicker: 'CLINICAL & BIOMEDICAL PUBLISHING',
    title: 'Case Report & Clinical Manuscript Polish',
    desc: 'CARE guideline compliance, clinical terminology verification, and publication-ready language polish.',
    allowedTiers: ['advanced', 'premium'],
    defaultTier: 'advanced',
    hideTabs: true,
  },
  'systematic-review': {
    service: 'editing',
    kicker: 'EVIDENCE SYNTHESIS & PRISMA',
    title: 'Systematic Review & Meta-Analysis Polish',
    desc: 'PRISMA compliance, methodological terminology accuracy, and rigorous line-by-line editorial polish.',
    allowedTiers: ['premium', 'scientific'],
    defaultTier: 'premium',
    hideTabs: true,
  },
}

// ─── Page wrapper ─────────────────────────────────────────────────────────────

export default function OrderPage() {
  return (
    <Suspense fallback={<Box style={{ minHeight: '100vh' }} />}>
      <OrderContent />
    </Suspense>
  )
}

function OrderContent() {
  const theme = useMantineTheme()
  const active = theme.other
  const searchParams = useSearchParams()

  const rawService     = searchParams.get('service') ?? ''
  const initialSection = searchParams.get('section') ?? ''
  const focusParam     = searchParams.get('focus') ?? ''
  const singleParam    = searchParams.get('single') ?? searchParams.get('hideTabs') ?? ''
  const rawPlans       = searchParams.get('plans') ?? searchParams.get('tiers') ?? ''
  const urlTier        = searchParams.get('tier') ?? ''
  const hlStage        = searchParams.get('stage') ?? ''

  const preset = focusParam && FOCUS_PRESETS[focusParam] ? FOCUS_PRESETS[focusParam] : null
  const initialService = rawService || preset?.service || ''
  const hlTier         = urlTier || preset?.defaultTier || ''
  const isTabsHidden   = Boolean(singleParam === 'true' || singleParam === '1' || preset?.hideTabs)

  const allowedTiers: string[] | undefined = rawPlans
    ? rawPlans.split(',').map((p) => p.trim())
    : preset?.allowedTiers

  const resolveTab = React.useCallback((): 'editing' | 'journal' | 'book' | 'ai-audit' => {
    if (initialService === 'editing') return 'editing'
    if (initialService === 'journal') return 'journal'
    if (initialService === 'book') return 'book'
    if (initialService === 'ai-audit') return 'ai-audit'
    if (initialService === 'publication') {
      return initialSection === 'book' ? 'book' : 'journal'
    }
    if (initialSection === 'book') return 'book'
    if (initialSection === 'journal') return 'journal'
    return 'ai-audit'
  }, [initialService, initialSection])

  const [activeTab, setActiveTab] = useState<'editing' | 'journal' | 'book' | 'ai-audit'>(resolveTab)

  React.useEffect(() => {
    setActiveTab(resolveTab())
  }, [resolveTab])

  const [calcWords, setCalcWords] = useState<number>(5000)

  const TABS = [
    {
      id: 'ai-audit' as const,
      label: 'AI Manuscript Audit',
      shortLabel: 'AI Audit',
      icon: <IconShieldCheck size={18} />,
      badge: 'From $29',
      sub: 'Pre-submission risk audit',
    },
    {
      id: 'editing' as const,
      label: 'English Editing & Compliance',
      shortLabel: 'Editing',
      icon: <IconPencil size={18} />,
      badge: '3 Tiers',
      sub: 'Per-word pricing',
    },
    {
      id: 'journal' as const,
      label: 'Journal Publication Support',
      shortLabel: 'Journal',
      icon: <IconFileText size={18} />,
      badge: '3 Packages',
      sub: 'Flat-fee packages',
    },
    {
      id: 'book' as const,
      label: 'Book Manuscript Publishing',
      shortLabel: 'Book',
      icon: <IconBook2 size={18} />,
      badge: '5 Stages',
      sub: 'Per-stage or pipeline',
    },
  ]

  const defaultHero = TAB_HEROES[activeTab]
  const hero = preset && activeTab === preset.service
    ? { kicker: preset.kicker, title: preset.title, desc: preset.desc }
    : defaultHero

  return (
    <Box bg={active.background} style={{ minHeight: '100vh' }}>
      <Navbar />

      {/* Hero Header with Dynamic Title & Service Tabs */}
      <Box pt={{ base: rem(100), md: rem(130) }} pb={rem(32)} bg={active.background}>
        <Container size={1340} px={{ base: 'md', sm: 'xl' }}>
          <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.2em', fontFamily: 'var(--font-heading-sans), var(--font-sans)', marginBottom: rem(8) }}>
            {hero.kicker}
          </Text>
          <Title order={1} style={{ fontSize: 'clamp(1.8rem, 3.6vw, 2.8rem)', fontFamily: 'var(--font-display), var(--font-serif)', fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.02em', color: active.primary }}>
            {hero.title}
          </Title>
          <Text size="md" c="dimmed" mt="xs" mb={isTabsHidden ? rem(16) : rem(32)} lh={1.7} style={{ maxWidth: '64ch' }}>
            {hero.desc}
          </Text>

          {/* ── Responsive Service Tabs Grid (Only shown when not hidden) ───── */}
          {!isTabsHidden && (
            <SimpleGrid cols={{ base: 2, md: 4 }} spacing={rem(8)}>
              {TABS.map((tab) => {
                const isCurrent = activeTab === tab.id
                return (
                  <UnstyledButton
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    px={rem(14)}
                    py={rem(12)}
                    data-dark-bg={isCurrent ? 'true' : undefined}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: rem(8),
                      backgroundColor: isCurrent ? active.primary : active.surface,
                      color: isCurrent ? '#ffffff' : active.primary,
                      border: `1px solid ${isCurrent ? active.primary : `${active.primary}18`}`,
                      borderRadius: 0,
                      fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                      fontWeight: isCurrent ? 700 : 600,
                      fontSize: rem(13),
                      transition: 'all 0.18s ease',
                      boxShadow: isCurrent ? `0 6px 20px ${active.primary}18` : 'none',
                      cursor: 'pointer',
                      width: '100%',
                    }}
                  >
                    <Group gap={rem(8)} wrap="nowrap" align="center" style={{ minWidth: 0, flex: 1 }}>
                      <Box style={{ color: active.accent, display: 'flex', flexShrink: 0 }}>
                        {tab.icon}
                      </Box>
                      <Box style={{ minWidth: 0, flex: 1 }}>
                        <Text
                          size="sm"
                          fw={isCurrent ? 700 : 600}
                          c={isCurrent ? '#ffffff' : active.primary}
                          style={{ color: isCurrent ? '#ffffff !important' : active.primary, lineHeight: 1.2 }}
                          truncate
                        >
                          {tab.label}
                        </Text>
                        <Text size="xs" c={isCurrent ? 'rgba(255,255,255,0.85)' : '#888'} truncate style={{ color: isCurrent ? 'rgba(255,255,255,0.85) !important' : '#888', marginTop: rem(2) }}>
                          {tab.sub}
                        </Text>
                      </Box>
                    </Group>
                    <Box
                      px={rem(6)}
                      py={rem(2)}
                      style={{
                        backgroundColor: isCurrent ? 'rgba(255,255,255,0.22)' : `${active.primary}08`,
                        fontSize: rem(10),
                        fontWeight: 700,
                        color: isCurrent ? '#ffffff' : '#666',
                        flexShrink: 0,
                      }}
                    >
                      <Text size="xs" fw={700} c={isCurrent ? '#ffffff' : '#666'} style={{ color: isCurrent ? '#ffffff !important' : '#666' }}>
                        {tab.badge}
                      </Text>
                    </Box>
                  </UnstyledButton>
                )
              })}
            </SimpleGrid>
          )}
        </Container>
      </Box>

      {/* ── Active Tab View ──────────────────────────────────────────────────── */}
      {activeTab === 'editing' && (
        <EditingTabBody
          active={active}
          hlTier={hlTier}
          calcWords={calcWords}
          setCalcWords={setCalcWords}
          allowedTiers={allowedTiers}
          focus={focusParam}
        />
      )}

      {activeTab === 'journal' && (
        <JournalTabBody
          active={active}
          hlTier={hlTier}
          allowedTiers={allowedTiers}
          focus={focusParam}
        />
      )}

      {activeTab === 'book' && (
        <BookTabBody
          active={active}
          hlStage={hlStage}
          focus={focusParam}
        />
      )}

      {activeTab === 'ai-audit' && (
        <AiAuditTabBody
          active={active}
          hlTier={hlTier}
          focus={focusParam}
        />
      )}
    </Box>
  )
}

// ─── EDITING TAB BODY ─────────────────────────────────────────────────────────

function EditingTabBody({
  active, hlTier, calcWords, setCalcWords, allowedTiers, focus,
}: {
  active: Record<string, string>
  hlTier: string
  calcWords: number
  setCalcWords: (n: number) => void
  allowedTiers?: string[]
  focus?: string | null
}) {
  const visibleTiers = allowedTiers && allowedTiers.length > 0
    ? editingTiers.filter((tier) => allowedTiers.includes(tier.id))
    : editingTiers

  const showAdvanced = visibleTiers.some((t) => t.id === 'advanced')
  const showPremium = visibleTiers.some((t) => t.id === 'premium')
  const showScientific = visibleTiers.some((t) => t.id === 'scientific')

  return (
    <Box>
      {/* Intro banner with live word-count estimator */}
      <Box py={rem(28)} bg={active.background} style={{ borderBottom: `1px solid ${active.primary}08` }}>
        <Container size={1340} px={{ base: 'md', sm: 'xl' }}>
          <Group justify="space-between" align="center" wrap="wrap" gap="md">
            <Box style={{ maxWidth: 640 }}>
              <Text size="sm" c="dimmed" lh={1.6}>
                All editing is performed by human discipline specialists in Microsoft Word Track Changes.
                Enter your approximate word count to preview fees live across all tiers:
              </Text>
            </Box>
            <Group gap="xs" align="center">
              <Text size="xs" fw={700} style={{ letterSpacing: '0.08em', color: '#888', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                MANUSCRIPT WORD COUNT:
              </Text>
              <NumberInput
                size="sm"
                radius={0}
                min={500}
                max={200000}
                step={500}
                value={calcWords}
                onChange={(val) => setCalcWords(typeof val === 'number' ? val : 5000)}
                style={{ width: rem(130) }}
              />
            </Group>
          </Group>
        </Container>
      </Box>

      {/* Tier cards */}
      <Box py={SECTION_SPACING} bg={active.surface}>
        <Container size={1340} px={{ base: 'md', sm: 'xl' }}>
          <SimpleGrid
            cols={{ base: 1, md: visibleTiers.length >= 3 ? 3 : visibleTiers.length }}
            spacing={rem(2)}
            style={
              visibleTiers.length === 2
                ? { maxWidth: 960, margin: '0 auto' }
                : visibleTiers.length === 1
                ? { maxWidth: 520, margin: '0 auto' }
                : undefined
            }
          >
            {visibleTiers.map((tier) => {
              const isHighlighted = hlTier === tier.id || (!hlTier && tier.isPopular)
              const estTotal = Math.round(calcWords * tier.rateNum)
              return (
                <Box
                  key={tier.id}
                  p={rem(36)}
                  bg={active.background}
                  style={{
                    border: `1px solid ${isHighlighted ? active.accent : `${active.primary}12`}`,
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: isHighlighted ? `0 8px 32px ${active.accent}14` : 'none',
                    position: 'relative',
                  }}
                >
                  {isHighlighted && (
                    <Box px={rem(10)} py={rem(4)} mb="md" style={{ backgroundColor: active.accent, alignSelf: 'flex-start' }}>
                      <Text size="xs" fw={700} c="#fff" style={{ letterSpacing: '0.1em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                        {hlTier ? 'YOUR SELECTION' : 'RECOMMENDED'}
                      </Text>
                    </Box>
                  )}
                  <Stack gap="md" flex={1}>
                    <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.12em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>{tier.badge}</Text>
                    <Box>
                      <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontSize: rem(22), fontWeight: 600, color: active.primary, lineHeight: 1.2 }}>{tier.name}</Title>
                      <Text size="xs" c="dimmed" mt={rem(4)} lh={1.5}>{tier.tagline}</Text>
                    </Box>
                    <Box my="xs">
                      <Group gap="xs" align="baseline">
                        <Text style={{ fontSize: rem(28), fontFamily: 'var(--font-serif)', fontWeight: 600, color: active.primary, lineHeight: 1 }}>{tier.rate}</Text>
                      </Group>
                      {calcWords > 0 && (
                        <Text size="xs" fw={600} mt={rem(4)} style={{ color: active.accent }}>
                          Estimated: ${estTotal.toLocaleString()} for {calcWords.toLocaleString()} words
                        </Text>
                      )}
                      <Text size="xs" c="dimmed" mt={rem(2)}>Turnaround: {tier.turnaround}</Text>
                    </Box>
                    <Divider color={`${active.primary}10`} />
                    <Stack gap={rem(8)} flex={1}>
                      {tier.features.map((f, i) => (
                        <Group key={i} gap={rem(8)} align="flex-start" wrap="nowrap">
                          <IconCheck size={13} color={active.accent} style={{ flexShrink: 0, marginTop: rem(3) }} />
                          <Text size="xs" c="dimmed" lh={1.5}>{f}</Text>
                        </Group>
                      ))}
                    </Stack>
                    <Link
                      href={`/request-review?service=editing&tier=${tier.id}&wordCount=${calcWords}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button fullWidth radius={0} rightSection={<IconArrowRight size={16} />}
                        style={{
                          backgroundColor: isHighlighted ? active.accent : active.primary,
                          color: '#fff',
                          fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          height: rem(48),
                        }}>
                        Select {tier.name}
                      </Button>
                    </Link>
                  </Stack>
                </Box>
              )
            })}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Human Editorial Narrative & Mentorship Framework */}
      <HumanMentorshipNarrative active={active} focus={focus} />

      {/* Feature matrix */}
      <Box py={SECTION_SPACING} bg={active.background}>
        <Container size={1340} px={{ base: 'md', sm: 'xl' }}>
          <Text size="xs" fw={700} mb={rem(28)} c={active.accent} style={{ letterSpacing: '0.18em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>FEATURE COMPARISON</Text>
          <Box style={{ overflowX: 'auto' }}>
            <Table withColumnBorders style={{ minWidth: 640, borderCollapse: 'collapse' }}>
              <Table.Thead>
                <Table.Tr style={{ backgroundColor: active.surface }}>
                  <Table.Th style={{ width: '40%', padding: `${rem(14)} ${rem(20)}`, fontFamily: 'var(--font-heading-sans), var(--font-sans)', fontSize: rem(12), letterSpacing: '0.08em', color: '#888', borderColor: `${active.primary}10` }}>FEATURE</Table.Th>
                  {showAdvanced && (
                    <Table.Th style={{ textAlign: 'center', padding: `${rem(14)} ${rem(16)}`, fontFamily: 'var(--font-heading-sans), var(--font-sans)', fontSize: rem(12), letterSpacing: '0.06em', color: active.primary, borderColor: `${active.primary}10` }}>Advanced</Table.Th>
                  )}
                  {showPremium && (
                    <Table.Th style={{ textAlign: 'center', padding: `${rem(14)} ${rem(16)}`, fontFamily: 'var(--font-heading-sans), var(--font-sans)', fontSize: rem(12), letterSpacing: '0.06em', color: active.accent, borderColor: `${active.primary}10` }}>Premium ★</Table.Th>
                  )}
                  {showScientific && (
                    <Table.Th style={{ textAlign: 'center', padding: `${rem(14)} ${rem(16)}`, fontFamily: 'var(--font-heading-sans), var(--font-sans)', fontSize: rem(12), letterSpacing: '0.06em', color: active.primary, borderColor: `${active.primary}10` }}>Scientific Pro</Table.Th>
                  )}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {editingMatrix.map((row, i) => (
                  <Table.Tr key={i} style={{ backgroundColor: i % 2 === 0 ? active.background : active.surface }}>
                    <Table.Td style={{ padding: `${rem(12)} ${rem(20)}`, fontSize: rem(13), color: active.primary, lineHeight: 1.4, borderColor: `${active.primary}08` }}>{row.feature}</Table.Td>
                    {showAdvanced && (
                      <Table.Td style={{ textAlign: 'center', padding: `${rem(12)} ${rem(16)}`, borderColor: `${active.primary}08` }}>
                        <Box style={{ display: 'flex', justifyContent: 'center' }}>
                          <MatrixCell val={row.advanced} />
                        </Box>
                      </Table.Td>
                    )}
                    {showPremium && (
                      <Table.Td style={{ textAlign: 'center', padding: `${rem(12)} ${rem(16)}`, borderColor: `${active.primary}08`, backgroundColor: `${active.accent}04` }}>
                        <Box style={{ display: 'flex', justifyContent: 'center' }}>
                          <MatrixCell val={row.premium} />
                        </Box>
                      </Table.Td>
                    )}
                    {showScientific && (
                      <Table.Td style={{ textAlign: 'center', padding: `${rem(12)} ${rem(16)}`, borderColor: `${active.primary}08` }}>
                        <Box style={{ display: 'flex', justifyContent: 'center' }}>
                          <MatrixCell val={row.scientific} />
                        </Box>
                      </Table.Td>
                    )}
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Box>
        </Container>
      </Box>

      {/* Testimonials */}
      <InlineTestimonials active={active} tabId="editing" />

      {/* FAQ */}
      <InlineFAQ active={active} items={editingFAQ} />
    </Box>
  )
}

// ─── JOURNAL TAB BODY ─────────────────────────────────────────────────────────

function JournalTabBody({
  active, hlTier, allowedTiers, focus,
}: {
  active: Record<string, string>
  hlTier: string
  allowedTiers?: string[]
  focus?: string | null
}) {
  const visibleTiers = allowedTiers && allowedTiers.length > 0
    ? journalTiers.filter((tier) => allowedTiers.includes(tier.id))
    : journalTiers

  const showEssentials = visibleTiers.some((t) => t.id === 'essentials')
  const showPro = visibleTiers.some((t) => t.id === 'pro')
  const showFull = visibleTiers.some((t) => t.id === 'full')

  return (
    <Box>
      <Box py={SECTION_SPACING} bg={active.surface}>
        <Container size={1340} px={{ base: 'md', sm: 'xl' }}>
          <SimpleGrid
            cols={{ base: 1, md: visibleTiers.length >= 3 ? 3 : visibleTiers.length }}
            spacing={rem(2)}
            style={
              visibleTiers.length === 2
                ? { maxWidth: 960, margin: '0 auto' }
                : visibleTiers.length === 1
                ? { maxWidth: 520, margin: '0 auto' }
                : undefined
            }
          >
            {visibleTiers.map((tier) => {
              const isHighlighted = hlTier === tier.id || (!hlTier && tier.isPopular)
              return (
                <Box
                  key={tier.id}
                  p={rem(36)}
                  bg={active.background}
                  style={{
                    border: `1px solid ${isHighlighted ? active.accent : `${active.primary}12`}`,
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: isHighlighted ? `0 8px 32px ${active.accent}14` : 'none',
                    position: 'relative',
                  }}
                >
                  {isHighlighted && (
                    <Box px={rem(10)} py={rem(4)} mb="md" style={{ backgroundColor: active.accent, alignSelf: 'flex-start' }}>
                      <Text size="xs" fw={700} c="#fff" style={{ letterSpacing: '0.1em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                        {hlTier ? 'YOUR SELECTION' : 'RECOMMENDED'}
                      </Text>
                    </Box>
                  )}
                  <Stack gap="md" flex={1}>
                    <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.12em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>{tier.badge}</Text>
                    <Box>
                      <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontSize: rem(22), fontWeight: 600, color: active.primary, lineHeight: 1.2 }}>{tier.name}</Title>
                      <Text size="xs" c="dimmed" mt={rem(4)} lh={1.5}>{tier.tagline}</Text>
                    </Box>
                    <Box my="xs">
                      <Text style={{ fontSize: rem(28), fontFamily: 'var(--font-serif)', fontWeight: 600, color: active.primary, lineHeight: 1 }}>{tier.price}</Text>
                      <Text size="xs" c="dimmed" mt={rem(4)}>Turnaround: {tier.turnaround}</Text>
                    </Box>
                    <Divider color={`${active.primary}10`} />
                    <Stack gap={rem(8)} flex={1}>
                      {tier.features.map((f, i) => (
                        <Group key={i} gap={rem(8)} align="flex-start" wrap="nowrap">
                          <IconCheck size={13} color={active.accent} style={{ flexShrink: 0, marginTop: rem(3) }} />
                          <Text size="xs" c="dimmed" lh={1.5}>{f}</Text>
                        </Group>
                      ))}
                    </Stack>
                    <Link
                      href={`/request-review?service=publication&section=journal&tier=${tier.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button fullWidth radius={0} rightSection={<IconArrowRight size={16} />}
                        style={{
                          backgroundColor: isHighlighted ? active.accent : active.primary,
                          color: '#fff',
                          fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          height: rem(48),
                        }}>
                        Select {tier.name}
                      </Button>
                    </Link>
                  </Stack>
                </Box>
              )
            })}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Human Editorial Narrative & Mentorship Framework */}
      <HumanMentorshipNarrative active={active} focus={focus} />

      {/* Journal Feature Matrix */}
      <Box py={SECTION_SPACING} bg={active.background}>
        <Container size={1340} px={{ base: 'md', sm: 'xl' }}>
          <Text size="xs" fw={700} mb={rem(28)} c={active.accent} style={{ letterSpacing: '0.18em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>FEATURE COMPARISON</Text>
          <Box style={{ overflowX: 'auto' }}>
            <Table withColumnBorders style={{ minWidth: 640, borderCollapse: 'collapse' }}>
              <Table.Thead>
                <Table.Tr style={{ backgroundColor: active.surface }}>
                  <Table.Th style={{ width: '40%', padding: `${rem(14)} ${rem(20)}`, fontFamily: 'var(--font-heading-sans), var(--font-sans)', fontSize: rem(12), letterSpacing: '0.08em', color: '#888', borderColor: `${active.primary}10` }}>FEATURE</Table.Th>
                  {showEssentials && (
                    <Table.Th style={{ textAlign: 'center', padding: `${rem(14)} ${rem(16)}`, fontFamily: 'var(--font-heading-sans), var(--font-sans)', fontSize: rem(12), letterSpacing: '0.06em', color: active.primary, borderColor: `${active.primary}10` }}>Essentials</Table.Th>
                  )}
                  {showPro && (
                    <Table.Th style={{ textAlign: 'center', padding: `${rem(14)} ${rem(16)}`, fontFamily: 'var(--font-heading-sans), var(--font-sans)', fontSize: rem(12), letterSpacing: '0.06em', color: active.accent, borderColor: `${active.primary}10` }}>Pro ★</Table.Th>
                  )}
                  {showFull && (
                    <Table.Th style={{ textAlign: 'center', padding: `${rem(14)} ${rem(16)}`, fontFamily: 'var(--font-heading-sans), var(--font-sans)', fontSize: rem(12), letterSpacing: '0.06em', color: active.primary, borderColor: `${active.primary}10` }}>Full</Table.Th>
                  )}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {journalMatrix.map((row, i) => (
                  <Table.Tr key={i} style={{ backgroundColor: i % 2 === 0 ? active.background : active.surface }}>
                    <Table.Td style={{ padding: `${rem(12)} ${rem(20)}`, fontSize: rem(13), color: active.primary, lineHeight: 1.4, borderColor: `${active.primary}08` }}>{row.feature}</Table.Td>
                    {showEssentials && (
                      <Table.Td style={{ textAlign: 'center', padding: `${rem(12)} ${rem(16)}`, borderColor: `${active.primary}08` }}>
                        <Box style={{ display: 'flex', justifyContent: 'center' }}>
                          <MatrixCell val={row.essentials} />
                        </Box>
                      </Table.Td>
                    )}
                    {showPro && (
                      <Table.Td style={{ textAlign: 'center', padding: `${rem(12)} ${rem(16)}`, borderColor: `${active.primary}08`, backgroundColor: `${active.accent}04` }}>
                        <Box style={{ display: 'flex', justifyContent: 'center' }}>
                          <MatrixCell val={row.pro} />
                        </Box>
                      </Table.Td>
                    )}
                    {showFull && (
                      <Table.Td style={{ textAlign: 'center', padding: `${rem(12)} ${rem(16)}`, borderColor: `${active.primary}08` }}>
                        <Box style={{ display: 'flex', justifyContent: 'center' }}>
                          <MatrixCell val={row.full} />
                        </Box>
                      </Table.Td>
                    )}
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Box>
        </Container>
      </Box>

      {/* Testimonials */}
      <InlineTestimonials active={active} tabId="journal" />

      {/* FAQ */}
      <InlineFAQ active={active} items={journalFAQ} />
    </Box>
  )
}

// ─── BOOK TAB BODY ────────────────────────────────────────────────────────────

function BookTabBody({ active, hlStage, focus }: { active: Record<string, string>; hlStage: string; focus?: string | null }) {
  const [activeIdx, setActiveIdx] = useState(() => {
    const found = bookStages.findIndex(s => s.step === hlStage)
    return found >= 0 ? found : 0
  })

  React.useEffect(() => {
    if (hlStage) {
      const found = bookStages.findIndex(s => s.step === hlStage)
      if (found >= 0) setActiveIdx(found)
    }
  }, [hlStage])

  const selected = bookStages[activeIdx]
  const isPipeline = (selected as typeof bookStages[0] & { isPipeline?: boolean }).isPipeline === true

  return (
    <Box>
      {/* Horizontal stage selector — 5 individual stages + Full Pipeline tab */}
      <Box py={rem(24)} bg={active.surface} style={{ borderBottom: `1px solid ${active.primary}12` }}>
        <Container size={1340} px={{ base: 'md', sm: 'xl' }}>
          <Group gap={rem(4)} wrap="nowrap" style={{ overflowX: 'auto', paddingBottom: rem(4) }}>
            {bookStages.map((s, i) => {
              const isFull = (s as typeof s & { isPipeline?: boolean }).isPipeline === true
              const isActive = i === activeIdx
              return (
                <UnstyledButton
                  key={s.step}
                  onClick={() => setActiveIdx(i)}
                  px={rem(isFull ? 22 : 18)} py={rem(12)}
                  data-dark-bg={isActive ? 'true' : undefined}
                  style={{
                    backgroundColor: isActive
                      ? (isFull ? active.accent : active.primary)
                      : active.background,
                    color: isActive ? '#ffffff' : active.primary,
                    border: `1px solid ${isActive ? (isFull ? active.accent : active.primary) : `${active.primary}14`}`,
                    flexShrink: 0,
                    transition: 'all 0.15s ease',
                    cursor: 'pointer',
                  }}
                >
                  <Text
                    size="xs"
                    fw={700}
                    data-accent={isActive && !isFull ? 'true' : undefined}
                    style={{ letterSpacing: '0.08em' }}
                  >
                    {isFull ? '★' : s.step}
                  </Text>
                  <Text
                    size="xs"
                    fw={isActive ? 700 : 500}
                    mt={rem(2)}
                    style={{ color: isActive ? undefined : active.primary }}
                  >
                    {s.title}
                  </Text>
                </UnstyledButton>
              )
            })}
          </Group>
        </Container>
      </Box>

      {/* Stage detail panel */}
      <Box py={SECTION_SPACING} bg={active.background}>
        <Container size={1340} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap={rem(32)}>
            <Box
              p={{ base: rem(28), md: rem(40) }}
              bg={active.surface}
              style={{
                border: `1px solid ${isPipeline ? active.accent + '40' : `${active.primary}12`}`,
                position: 'relative',
              }}
            >
              {isPipeline && (
                <Box
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: rem(3),
                    backgroundColor: active.accent,
                  }}
                />
              )}
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(40)}>
                <Stack gap="md">
                  {hlStage === selected.step && (
                    <Box px={rem(10)} py={rem(4)} style={{ backgroundColor: active.accent, alignSelf: 'flex-start' }}>
                      <Text size="xs" fw={700} c="#fff" style={{ letterSpacing: '0.1em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                        YOUR SELECTION
                      </Text>
                    </Box>
                  )}
                  <Text size="xs" fw={700} style={{ letterSpacing: '0.14em', color: active.accent, fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                    {isPipeline ? 'END-TO-END PIPELINE' : `STAGE ${selected.step}`}
                  </Text>
                  <Title order={2} style={{ fontFamily: 'var(--font-serif)', fontSize: rem(24), fontWeight: 600, color: active.primary, lineHeight: 1.2 }}>
                    {selected.title}
                  </Title>
                  <Text size="sm" c="dimmed" lh={1.7}>{selected.subtitle}</Text>
                  <Text size="sm" lh={1.7} style={{ color: active.primary }}>{selected.desc}</Text>
                  <Box my="xs">
                    <Text style={{ fontSize: rem(24), fontFamily: 'var(--font-serif)', fontWeight: 600, color: active.primary }}>
                      {selected.price}
                    </Text>
                    <Text size="xs" c="dimmed" mt={rem(4)}>Turnaround: {selected.turnaround}</Text>
                  </Box>
                  {isPipeline ? (
                    <Link href="/request-review?service=publication&section=book&pipeline=full" style={{ textDecoration: 'none' }}>
                      <Button radius={0} size="md" rightSection={<IconArrowRight size={16} />}
                        style={{ backgroundColor: active.accent, color: '#fff', fontFamily: 'var(--font-heading-sans), var(--font-sans)', fontWeight: 700, letterSpacing: '0.06em', width: 'fit-content' }}>
                        Enquire Full 5-Stage Pipeline
                      </Button>
                    </Link>
                  ) : (
                    <Link href={`/request-review?service=publication&section=book&stage=${selected.step}`} style={{ textDecoration: 'none' }}>
                      <Button radius={0} size="md" rightSection={<IconArrowRight size={16} />}
                        style={{ backgroundColor: active.accent, color: '#fff', fontFamily: 'var(--font-heading-sans), var(--font-sans)', fontWeight: 700, letterSpacing: '0.06em', width: 'fit-content' }}>
                        Select Stage {selected.step} ({selected.title})
                      </Button>
                    </Link>
                  )}
                </Stack>
                <Stack gap="md">
                  <Text size="xs" fw={700} style={{ letterSpacing: '0.12em', color: active.primary, fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                    {isPipeline ? 'EVERYTHING IN THE BUNDLE' : 'WHAT IS INCLUDED'}
                  </Text>
                  {selected.includes.map((inc, i) => (
                    <Group key={i} gap={rem(10)} align="flex-start" wrap="nowrap">
                      <IconCheck size={14} color={active.accent} style={{ flexShrink: 0, marginTop: rem(3) }} />
                      <Text size="xs" c="dimmed" lh={1.6}>{inc}</Text>
                    </Group>
                  ))}
                </Stack>
              </SimpleGrid>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Book feature matrix */}
      <Box py={SECTION_SPACING} bg={active.surface}>
        <Container size={1340} px={{ base: 'md', sm: 'xl' }}>
          <Text size="xs" fw={700} mb={rem(28)} c={active.accent} style={{ letterSpacing: '0.18em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>WHAT YOU GET AT EACH STAGE</Text>
          <Box style={{ overflowX: 'auto' }}>
            <Table withColumnBorders style={{ minWidth: 780, borderCollapse: 'collapse' }}>
              <Table.Thead>
                <Table.Tr style={{ backgroundColor: active.background }}>
                  <Table.Th style={{ width: '34%', padding: `${rem(14)} ${rem(20)}`, fontFamily: 'var(--font-heading-sans), var(--font-sans)', fontSize: rem(12), letterSpacing: '0.08em', color: '#888', borderColor: `${active.primary}10` }}>DELIVERABLE</Table.Th>
                  {bookStages.map(s => {
                    const isFull = (s as typeof s & { isPipeline?: boolean }).isPipeline === true
                    return (
                      <Table.Th key={s.step} style={{ textAlign: 'center', padding: `${rem(12)} ${rem(10)}`, fontFamily: 'var(--font-heading-sans), var(--font-sans)', fontSize: rem(11), letterSpacing: '0.04em', color: isFull ? active.accent : active.primary, borderColor: `${active.primary}10`, lineHeight: 1.3, backgroundColor: isFull ? `${active.accent}08` : undefined }}>
                        {isFull ? '★' : s.step}<br /><span style={{ fontWeight: isFull ? 700 : 400, color: isFull ? active.accent : '#888' }}>{s.title}</span>
                      </Table.Th>
                    )
                  })}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {bookMatrix.map((row, i) => (
                  <Table.Tr key={i} style={{ backgroundColor: i % 2 === 0 ? active.background : active.surface }}>
                    <Table.Td style={{ padding: `${rem(12)} ${rem(20)}`, fontSize: rem(13), color: active.primary, lineHeight: 1.4, borderColor: `${active.primary}08` }}>{row.row}</Table.Td>
                    {(['s01', 's02', 's03', 's04', 's05', 'sFULL'] as const).map(col => (
                      <Table.Td key={col} style={{ textAlign: 'center', padding: `${rem(12)} ${rem(10)}`, borderColor: `${active.primary}08`, backgroundColor: col === 'sFULL' ? `${active.accent}06` : undefined }}>
                        <Box style={{ display: 'flex', justifyContent: 'center' }}>
                          <MatrixCell val={row[col]} />
                        </Box>
                      </Table.Td>
                    ))}
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Box>
        </Container>
      </Box>

      {/* Testimonials */}
      <InlineTestimonials active={active} tabId="book" />

      {/* FAQ */}
      <InlineFAQ active={active} items={bookFAQ} />
    </Box>
  )

}

// ─── AI MANUSCRIPT AUDIT TAB BODY ─────────────────────────────────────────────

function AiAuditTabBody({ active, hlTier, focus }: { active: Record<string, string>; hlTier: string; focus?: string | null }) {
  return (
    <Box>
      {/* Cards section */}
      <Box py={SECTION_SPACING} bg={active.surface}>
        <Container size={1340} px={{ base: 'md', sm: 'xl' }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(24)} style={{ maxWidth: 960 }}>
            {aiAuditTiers.map((tier) => {
              const isHighlighted = hlTier === tier.id || (!hlTier && tier.isPopular)
              return (
                <Box
                  key={tier.id}
                  p={rem(36)}
                  bg={active.background}
                  style={{
                    border: `1px solid ${isHighlighted ? active.accent : `${active.primary}12`}`,
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: isHighlighted ? `0 8px 32px ${active.accent}14` : 'none',
                    position: 'relative',
                  }}
                >
                  {isHighlighted && (
                    <Box px={rem(10)} py={rem(4)} mb="md" style={{ backgroundColor: active.accent, alignSelf: 'flex-start' }}>
                      <Text size="xs" fw={700} c="#fff" style={{ letterSpacing: '0.1em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                        {hlTier ? 'YOUR SELECTION' : 'RECOMMENDED'}
                      </Text>
                    </Box>
                  )}
                  <Stack gap="md" flex={1}>
                    <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.12em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>{tier.badge}</Text>
                    <Box>
                      <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontSize: rem(22), fontWeight: 600, color: active.primary, lineHeight: 1.2 }}>{tier.name}</Title>
                      <Text size="xs" c="dimmed" mt={rem(4)} lh={1.5}>{tier.tagline}</Text>
                    </Box>
                    <Box my="xs">
                      <Text style={{ fontSize: rem(34), fontFamily: 'var(--font-serif)', fontWeight: 600, color: active.primary, lineHeight: 1 }}>{tier.price}</Text>
                      <Text size="xs" c="dimmed" mt={rem(4)}>Turnaround: {tier.turnaround}</Text>
                    </Box>
                    <Divider color={`${active.primary}10`} />
                    <Stack gap={rem(8)} flex={1}>
                      {tier.features.map((f, i) => (
                        <Group key={i} gap={rem(8)} align="flex-start" wrap="nowrap">
                          <IconCheck size={13} color={active.accent} style={{ flexShrink: 0, marginTop: rem(3) }} />
                          <Text size="xs" c="dimmed" lh={1.5}>{f}</Text>
                        </Group>
                      ))}
                    </Stack>
                    <Link
                      href={`/request-review?service=ai-audit&tier=${tier.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button fullWidth radius={0} rightSection={<IconArrowRight size={16} />}
                        style={{
                          backgroundColor: isHighlighted ? active.accent : active.primary,
                          color: '#fff',
                          fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          height: rem(48),
                        }}>
                        Order {tier.name}
                      </Button>
                    </Link>
                  </Stack>
                </Box>
              )
            })}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Audit Matrix Table */}
      <Box py={rem(48)} bg={active.background} style={{ borderTop: `1px solid ${active.primary}10` }}>
        <Container size={1340} px={{ base: 'md', sm: 'xl' }}>
          <Box mb={rem(24)}>
            <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.14em', fontFamily: 'var(--font-heading-sans), var(--font-sans)', textTransform: 'uppercase' }}>
              FEATURE BREAKDOWN
            </Text>
            <Title order={3} mt={rem(4)} style={{ fontFamily: 'var(--font-serif)', fontSize: rem(20), fontWeight: 600, color: active.primary }}>
              Compare AI Manuscript Audit Options
            </Title>
          </Box>

          <Box style={{ overflowX: 'auto' }}>
            <Table withRowBorders={false} style={{ minWidth: 680 }}>
              <Table.Thead>
                <Table.Tr style={{ borderBottom: `2px solid ${active.primary}20` }}>
                  <Table.Th style={{ width: '50%', padding: `${rem(14)} ${rem(20)}`, fontFamily: 'var(--font-heading-sans), var(--font-sans)', fontSize: rem(12), letterSpacing: '0.08em', color: '#888', borderColor: `${active.primary}10` }}>AUDIT CAPABILITY</Table.Th>
                  <Table.Th style={{ textAlign: 'center', padding: `${rem(14)} ${rem(16)}`, fontFamily: 'var(--font-heading-sans), var(--font-sans)', fontSize: rem(12), letterSpacing: '0.06em', color: active.primary, borderColor: `${active.primary}10` }}>Single Audit ($29)</Table.Th>
                  <Table.Th style={{ textAlign: 'center', padding: `${rem(14)} ${rem(16)}`, fontFamily: 'var(--font-heading-sans), var(--font-sans)', fontSize: rem(12), letterSpacing: '0.06em', color: active.accent, borderColor: `${active.primary}10` }}>Revision Bundle ($69) ★</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {aiAuditComparison.map((row, i) => (
                  <Table.Tr key={i} style={{ borderBottom: `1px solid ${active.primary}08`, backgroundColor: i % 2 === 0 ? 'transparent' : `${active.primary}02` }}>
                    <Table.Td style={{ padding: `${rem(12)} ${rem(20)}`, fontSize: rem(13), color: active.primary, lineHeight: 1.4, borderColor: `${active.primary}08` }}>{row.feature}</Table.Td>
                    <Table.Td style={{ textAlign: 'center', padding: `${rem(12)} ${rem(16)}`, borderColor: `${active.primary}08` }}>
                      <Box style={{ display: 'flex', justifyContent: 'center' }}>
                        <MatrixCell val={row.single} />
                      </Box>
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'center', padding: `${rem(12)} ${rem(16)}`, borderColor: `${active.primary}08`, backgroundColor: `${active.accent}04` }}>
                      <Box style={{ display: 'flex', justifyContent: 'center' }}>
                        <MatrixCell val={row.bundle} />
                      </Box>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Box>
        </Container>
      </Box>

      {/* Testimonials */}
      <InlineTestimonials active={active} tabId="ai-audit" />

      {/* FAQ */}
      <InlineFAQ active={active} items={aiAuditFAQ} />
    </Box>
  )
}
