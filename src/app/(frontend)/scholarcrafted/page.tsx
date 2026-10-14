'use client'

import React, { useState, useEffect } from 'react'
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Box,
  SimpleGrid,
  Image,
  Divider,
  rem,
  useMantineTheme,
  ThemeIcon,
  Center,
  Accordion,
  UnstyledButton,
  Badge,
} from '@mantine/core'
import { Navbar } from './_components/Navbar'
import { Footer } from './_components/Footer'
import Link from 'next/link'
import {
  IconArrowRight,
  IconUsers,
  IconEdit,
  IconFileText,
  IconMessageChatbot,
  IconRocket,
  IconCertificate,
  IconChevronUp,
  IconUserExclamation,
  IconScale,
  IconBooks,
  IconBrain,
  IconQuote,
  IconStarFilled,
  IconAlignJustified,
  IconMicroscope,
  IconBriefcase,
  IconChevronRight,
  IconCheck,
  IconHeadset,
  IconWorldWww,
  IconCreditCard,
  IconAdjustmentsAlt,
  IconBuildingStore,
  IconRefresh,
} from '@tabler/icons-react'
import { Carousel } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'

import { SECTION_SPACING, INNER_WIDTH, READING_WIDTH } from '@/layout'

const testimonials = [
  {
    quote:
      'Orchestrating a 22-author handbook for Routledge was an administrative nightmare. The Principia team handled all contributor compliance formatting and typeset the entire volume seamlessly. They saved our publication timeline.',
    author: 'DR. M. ROBERTS, ASSOCIATE PROFESSOR',
    institution: 'DEPARTMENT OF SOCIOLOGY (HANDBOOK EDITOR)',
  },
  {
    quote:
      'When my NSF grant was approved, I realized my lab lacked the data infrastructure to execute the quantitative tracking. Their custom database scripting and SPSS pipeline kept our milestones perfectly on track.',
    author: 'DR. S. PATEL, LAB DIRECTOR',
    institution: 'BEHAVIORAL SCIENCES RESEARCH LAB',
  },
  {
    quote:
      'The Correspondence Buffer is a game-changer. When the journal sent back major revisions, the team drafted the entire reply matrix and locked it to our submission draft. I approved it in 60 seconds.',
    author: 'DR. E. HAYES, TENURE-TRACK ASSISTANT PROFESSOR',
    institution: 'DEPARTMENT OF PUBLIC POLICY',
  },
]

const homeFaqs = [
  {
    q: 'Should I have my paper edited even if I already used an AI tool like ChatGPT or Paperpal?',
    a: 'Yes, we strongly recommend it. AI tools catch surface spelling and generic syntax, but cannot verify domain-specific nomenclature, deep methodological nuance, or whether your narrative fulfills the exact review criteria of high-impact journals. More critically, committees and journal editors actively screen for synthetic phrasing; our senior academic editors ensure your manuscript is 100% human-verified, authoritative, and committee-defensible.',
  },
  {
    q: 'Is using ScholarCrafted allowed by my university, graduate committee, and target publisher?',
    a: 'Yes, completely. Professional copyediting, structural proofreading, and citation auditing are standard, celebrated academic practices endorsed by graduate schools and publishers worldwide (including Routledge, Oxford, Elsevier, and Springer). We operate under a strict non-ghostwriting policy: we refine your clarity, rhetoric, style manual adherence, and structure, while you remain the sole intellectual author.',
  },
  {
    q: 'What is the difference between Advanced Editing and Premium / Scientific Editing?',
    a: 'Advanced Editing focuses on line-by-line grammar, academic tone, readability, citation cross-checking, and style manual compliance (APA, Chicago, MLA). Premium & Scientific Editing goes much deeper into structural coherence, argument pacing, literature review positioning, section sequencing, and comprehensive editorial margin queries to ensure your paper withstands harsh peer review.',
  },
  {
    q: 'How does your per-word pricing work, and are there unexpected charges?',
    a: 'Our rates are 100% transparent and calculated strictly by word count before work begins. Tier 1 starts from $0.032/word, Tier 2 substantive line editing at $0.046/word, and Tier 3 structural polish at $0.065/word. You receive a firm quote with zero hidden fees, and all work is delivered in Microsoft Word with full tracked changes.',
  },
  {
    q: 'What is your turnaround time, and can you accommodate urgent defense or submission deadlines?',
    a: 'Standard turnarounds range from 3 to 7 business days depending on document scope and word count. For time-sensitive dissertation defenses or journal revision deadlines, 48-hour to 72-hour priority delivery is available upon request with dedicated editor allocation.',
  },
  {
    q: 'Do you offer re-editing support if my committee or reviewers request revisions?',
    a: 'Yes. We support you through the review cycle. If your supervisor or journal editor returns comments on the sections we edited, we provide complimentary re-editing passes on those portions within 60 days of delivery.',
  },
  {
    q: 'Can institutional funds, departmental budgets, or research grants cover the fee?',
    a: 'Yes. Most universities allow startup funds, departmental overhead, NSF/NIH/Fulbright grant allocations, or graduate student development allowances to pay for external editorial services. We provide formal institutional itemized invoices and W-9 documentation.',
  },
  {
    q: 'How do you safeguard manuscript confidentiality and intellectual property?',
    a: 'We sign strict Non-Disclosure & Confidentiality Agreements (NDAs) prior to document ingestion. Your raw data, unpublished findings, and draft files are kept in secure, encrypted environments and are never stored for AI model training or shared with third parties.',
  },
]

const universities = [
  { name: 'Yale', logo: '/logos/Yale_University_logo.svg' },
  { name: 'Stanford', logo: '/logos/stanford-university-logo-svgrepo-com.svg' },
  { name: 'Oxford', logo: '/logos/university-of-oxford-logo-1.svg' },
  { name: 'MIT', logo: '/logos/Massachusetts_Institute_of_Technology-Logo.wine.svg' },
  { name: 'Columbia', logo: '/logos/cu-header.svg' },
  { name: 'Duke', logo: '/logos/duke-wordmark-white.svg' },
  { name: 'Michigan', logo: '/logos/University_of_Michigan-Logo.wine.svg' },
  { name: 'Johns Hopkins', logo: '/logos/Johns_Hopkins_University-Logo.wine.svg' },
  { name: 'ANU', logo: '/logos/Australian_National_University-Logo.wine.svg' },
  { name: 'K-State', logo: '/logos/Kansas_State_University-Logo.wine.svg' },
]

const LaurelBranch = ({ size = 56, color = 'currentColor', left = false }) => (
  <svg
    width={size / 2}
    height={size}
    viewBox="0 0 24 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: left ? 'scaleY(-1)' : 'scale(-1, -1)', display: 'block', opacity: 0.8 }}
  >
    <path d="M12 44C12 30 6 16 20 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 38C5 36 2 40 5 44C8 40 11 41 11 38Z" fill={color} />
    <path d="M9 28C3 26 0 30 3 34C6 30 9 31 9 28Z" fill={color} />
    <path d="M9 18C3 16 0 20 3 24C6 20 9 21 9 18Z" fill={color} />
    <path d="M13 32C19 30 22 34 19 38C16 34 13 35 13 32Z" fill={color} />
    <path d="M11 22C17 20 20 24 17 28C14 24 11 25 11 22Z" fill={color} />
    <path d="M11 12C17 10 20 14 17 18C14 14 11 15 11 12Z" fill={color} />
    <path d="M18 6C16 0 22 -2 24 4C21 6 18 6 18 6Z" fill={color} />
  </svg>
)

// ─── Homepage Need Selector ─────────────────────────────────────────────────

// ─── Homepage Need & Stage Selectors (Dual Mode + Random Shuffle) ──────────

const homeNeeds = [
  {
    id: 'defense-coming',
    label: 'My defense is in weeks and my manuscript needs to be clean',
    subLabel: 'Time-sensitive polish before deposit',
    serviceIds: ['editing'],
    recommended: 'editing',
  },
  {
    id: 'committee-feedback',
    label: 'My committee sent the draft back with major revision comments',
    subLabel: 'Structural overhaul after committee review',
    serviceIds: ['editing'],
    recommended: 'editing',
  },
  {
    id: 'citations-mess',
    label: 'My citations are a mess — Zotero broke, references don\'t match',
    subLabel: 'Reference audit, DOI verification & AI integrity check',
    serviceIds: ['ai_audit', 'editing'],
    recommended: 'ai_audit',
  },
  {
    id: 'thesis-to-article',
    label: 'I want to turn my dissertation into a journal article',
    subLabel: 'Structural conversion and journal formatting',
    serviceIds: ['journal'],
    recommended: 'journal',
  },
  {
    id: 'revise-resubmit',
    label: 'I received a Revise & Resubmit — I need help responding to reviewers',
    subLabel: 'Response matrix and revision packaging',
    serviceIds: ['journal'],
    recommended: 'journal',
  },
  {
    id: 'rejected-resubmit',
    label: 'My paper was rejected and I need to target a different journal',
    subLabel: 'Resubmission formatting and new journal selection',
    serviceIds: ['journal'],
    recommended: 'journal',
  },
  {
    id: 'book-proposal',
    label: 'I\'m writing a book proposal for Oxford, Routledge, or a press',
    subLabel: 'Proposal packaging to publisher template',
    serviceIds: ['book_proposal'],
    recommended: 'book_proposal',
  },
  {
    id: 'galley-proofs',
    label: 'My press sent galley proofs and I need an index built',
    subLabel: 'Back-of-book indexing and proof review',
    serviceIds: ['book_indexing'],
    recommended: 'book_indexing',
  },
]

const homeServices: Record<string, {
  badge: string; title: string; desc: string; link: string; cta: string
}> = {
  editing: {
    badge: 'From $0.0425 / word',
    title: 'English Editing & Compliance',
    desc: 'Line-by-line editing for language, structure, and academic tone. Reference cleanup, DOI verification, citation style conformity, and institutional compliance — all delivered in Word tracked changes.',
    link: '/scholarcrafted/order?service=editing',
    cta: 'Calculate Editing Fee',
  },
  ai_audit: {
    badge: 'From $29 (100% Credited Toward Editing)',
    title: 'AI Manuscript Audit & Integrity Diagnostic',
    desc: 'Pre-submission integrity screening against 200M+ research papers. Detects fabricated citations, retracted DOIs, AI-writing indicators, and methods-to-results drift before committee or journal review.',
    link: '/scholarcrafted/order?service=ai-audit',
    cta: 'Order Manuscript Audit ($29)',
  },
  journal: {
    badge: 'Flat-Fee Packages',
    title: 'Journal Publication Support',
    desc: 'Target journal matching, submission formatting, point-by-point Revise & Resubmit response matrices, and tailored cover letters to overcome peer-review hurdles.',
    link: '/scholarcrafted/order?service=journal',
    cta: 'View Journal Packages',
  },
  book_proposal: {
    badge: 'Stage 02 • $480 Flat',
    title: 'Book Acquisition Proposal Packaging',
    desc: 'Acquisition-ready monograph proposal written to target academic press requirements (Oxford, Cambridge, Routledge, SAGE). Includes market analysis, chapter outline, and sample polish.',
    link: '/scholarcrafted/order?service=book&stage=02',
    cta: 'Select Proposal Packaging',
  },
  book_indexing: {
    badge: 'Stage 05 • $3 / Typeset Page',
    title: 'Back-of-Book Subject & Author Indexing',
    desc: 'Comprehensive, press-grade back-of-book index constructed to university press and Cindex specifications. Formatted for immediate delivery to your production editor.',
    link: '/scholarcrafted/order?service=book&stage=05',
    cta: 'Select Book Indexing',
  },
}

// ─── Research Stages & Mapped Services ──────────────────────────────────────

interface StageService {
  badge: string
  title: string
  tagline: string
  rate: string
  isRecommended?: boolean
  features: string[]
  whenToChoose: string[]
  link: string
  cta: string
}

interface ResearchStageItem {
  step: string
  label: string
  subtitle: string
  stageOverview: string
  services: StageService[]
}

const stageData: ResearchStageItem[] = [
  {
    step: 'STEP 01',
    label: 'Write your document',
    subtitle: 'Proposal packaging, thesis conversion & initial draft structuring',
    stageOverview:
      'For researchers preparing their initial proposal dossier, framing their thesis statement, or converting raw dissertation research into publishable scholarship.',
    services: [
      {
        badge: 'Dissertation Conversion',
        title: 'Thesis-to-Journal Article Scoping',
        tagline: 'Extract and structure the publishable empirical core of your dissertation into a tight 7,000–9,000 word standalone article format.',
        rate: 'Custom Scope / Project Package',
        isRecommended: false,
        features: [
          'Extraction of primary empirical contribution from sprawling thesis chapters',
          'Restructuring into IMRaD or target disciplinary article framework',
          'Elimination of thesis scaffolding, excessive literature review & appendices',
          'Target journal scope alignment & word count strict compliance',
        ],
        whenToChoose: [
          'If you graduated with a thesis and must publish articles for job market or tenure applications.',
          'If you are overwhelmed trying to cut 20,000 words down to journal length without losing rigor.',
        ],
        link: '/scholarcrafted/order?service=journal',
        cta: 'Explore Article Scoping',
      },
      {
        badge: 'Stage 02 • $480 Flat',
        title: 'Book Acquisition Proposal Packaging',
        tagline: 'Complete acquisition-ready monograph proposal written to target academic press requirements (Oxford, Cambridge, Routledge, SAGE).',
        rate: '$480 flat rate',
        isRecommended: false,
        features: [
          'Chapter-by-chapter outline with detailed synopsis for each chapter',
          'Target academic audience and market differentiation analysis',
          'Sample chapter copyediting & tone calibration to press standards',
          'Author credentials and platform positioning summary',
        ],
        whenToChoose: [
          'If you are preparing a book proposal for Routledge, Oxford, Cambridge, or a university press.',
          'If you need committee sign-off on your dissertation prospectus or monograph proposal.',
        ],
        link: '/scholarcrafted/order?service=book&stage=02',
        cta: 'Select Proposal Packaging',
      },
    ],
  },
  {
    step: 'STEP 02',
    label: 'Get expert editing',
    subtitle: 'Substantive line editing, academic tone & committee-defensible prose',
    stageOverview:
      'For manuscripts that are written but need rigorous language, syntax, flow, and committee-grade stylistic polish.',
    services: [
      {
        badge: 'Starts from $0.0425 / word',
        title: 'Advanced Line Editing',
        tagline: 'Comprehensive sentence-level editing for precision, academic tone, syntax, and discipline vocabulary.',
        rate: '$0.0425 / word',
        isRecommended: false,
        features: [
          'Full tracked changes in Microsoft Word',
          'Grammar, punctuation, academic idiom, and syntax refinement',
          'Elimination of awkward phrasing and passive-voice bloat',
          'Target journal or university style manual conformity',
          'Edited by academic discipline subject-matter specialist',
        ],
        whenToChoose: [
          'If you are confident in your methodology and want clean, authoritative prose.',
          'If your deadline is approaching and you need an exhaustive language pass.',
          'If English is your second academic language or your prose needs native-speaker polish.',
        ],
        link: '/scholarcrafted/order?service=editing&tier=advanced',
        cta: 'Select Advanced Editing',
      },
      {
        badge: 'Structural Polish • $0.0650 / word',
        title: 'Premium Structural Editing',
        tagline: 'Deep structural and rhetorical refinement to ensure arguments withstand committee defense and peer review.',
        rate: '$0.0650 / word',
        isRecommended: false,
        features: [
          'All Advanced Line Editing features included',
          'Section-by-section pacing, transitions, and argument flow critique',
          'Reference cross-check & citation integrity check',
          'Cover letter & submission abstract polish',
          '60-day complimentary re-editing pass on revised sections',
        ],
        whenToChoose: [
          'If you are submitting to a high-impact journal or preparing for your dissertation defense.',
          'If your committee sent back notes regarding cohesion, clarity, or logical gaps.',
          'If you want complete peace of mind that your work is flawless before official review.',
        ],
        link: '/scholarcrafted/order?service=editing&tier=premium',
        cta: 'Select Premium Editing',
      },
      {
        badge: 'Peer-Review Level • $0.0950 / word',
        title: 'Scientific & Technical Refinement Pro',
        tagline: 'Rigorous critique evaluating narrative coherence against top-tier academic publishing standards.',
        rate: '$0.0950 / word',
        isRecommended: false,
        features: [
          'All Premium Editing features included',
          'In-depth Manuscript Completeness Assessment',
          'Cross-examination of evidence-to-claim alignment in Discussion sections',
          'Evaluation by former journal peer reviewer or editor',
          'Priority turnaround with senior editorial oversight',
        ],
        whenToChoose: [
          'If targeting high-rejection journals (Q1, Nature, Lancet, top university presses).',
          'If submitting highly complex empirical or quantitative multi-study papers.',
        ],
        link: '/scholarcrafted/order?service=editing&tier=scientific',
        cta: 'Select Scientific Pro',
      },
    ],
  },
  {
    step: 'STEP 03',
    label: 'Find top journals',
    subtitle: 'Journal matching, scope analysis & author guidelines compliance',
    stageOverview:
      'For researchers preparing to select target outlets, align manuscript scope, or verify open-access compliance.',
    services: [
      {
        badge: 'Editorial Advisory',
        title: 'Target Journal Scope & Guidelines Audit',
        tagline: 'Identify and evaluate top-tier target journals for scope fit, indexing prestige, and submission requirements.',
        rate: 'Flat Package / Scoped Rate',
        isRecommended: false,
        features: [
          'Analysis of recent publication trends and scope fit in your target field',
          'Exhaustive audit against target journal "Aims & Scope" criteria',
          'Guidance on open-access requirements and publisher agreements',
          'Preparation of submission checklist and tailored cover letter',
        ],
        whenToChoose: [
          'If you want to minimize desk-rejection risk due to mismatched journal scope.',
          'If you are choosing between multiple Q1/Q2 journals and need publisher intelligence.',
        ],
        link: '/scholarcrafted/order?service=journal',
        cta: 'Get Journal Guidance',
      },
      {
        badge: 'Package Integration',
        title: 'Submission-Ready Journal Package',
        tagline: 'Full end-to-end preparation: target journal selection, manuscript conformity, cover letter drafting, and submission packaging.',
        rate: 'Flat Package',
        isRecommended: false,
        features: [
          '3–5 Ranked journal recommendation report with impact factors',
          'Complete manuscript formatting to target Author Guidelines',
          'Executive editor cover letter drafting',
          'Submission portal checklist and conflict-of-interest disclosures',
        ],
        whenToChoose: [
          'If you want a single turnkey package handling journal selection through final upload.',
          'If you are on a tight grant deadline and need zero submission friction.',
        ],
        link: '/scholarcrafted/order?service=journal',
        cta: 'View Journal Packages',
      },
    ],
  },
  {
    step: 'STEP 04',
    label: 'Journal desk review',
    subtitle: 'Pre-submission AI risk audits, citation diagnostics & style conformity',
    stageOverview:
      'For manuscripts undergoing initial screening where formatting errors, missing DOIs, and citation mismatches trigger immediate desk rejection.',
    services: [
      {
        badge: 'From $29 • 100% Fee Credit',
        title: 'AI Manuscript Audit & Integrity Diagnostic',
        tagline: 'Pre-submission diagnostic benchmarked against 200M+ research papers. Catches fabricated citations, retracted DOIs, and AI hallucination flags before journal screening.',
        rate: '$29 Single Draft • $69 Revision Bundle (3 Reviews)',
        isRecommended: false,
        features: [
          'Citation & DOI verification benchmarked against 200M+ papers',
          'Detection of fabricated, retracted, and hallucinated references',
          'Section-by-section logic & methods-to-results coherence check',
          '1-Page Executive Faculty Risk Memo + optional 15-min consultation',
          '100% Fee Credit: $29 or $69 credited toward subsequent editing',
        ],
        whenToChoose: [
          'If you or your co-authors used AI tools during literature search or drafting.',
          'If you want an affordable ($29) independent faculty pre-check before submitting.',
          'If you need to verify zero dead DOIs or hallucinated references.',
        ],
        link: '/scholarcrafted/order?service=ai-audit',
        cta: 'Order Manuscript Audit ($29)',
      },
      {
        badge: 'Checklist Verification',
        title: 'Journal Desk-Check Compliance Pass',
        tagline: 'Comprehensive audit against the target journal’s Author Guidelines and technical submission checklist.',
        rate: 'From $0.02 / word',
        isRecommended: false,
        features: [
          'Verification of abstract word counts, running headers, and keywords',
          'Front and back matter formatting (disclosure statements, funding statements)',
          'Table and figure title/note styling according to target manual',
          'Verification of blinded manuscript rules for peer review',
        ],
        whenToChoose: [
          'If your paper was previously returned by an editorial assistant for formatting errors.',
          'If you need certainty that your paper clears administrative screening on day one.',
        ],
        link: '/scholarcrafted/order?service=editing',
        cta: 'View Compliance Pass',
      },
    ],
  },
  {
    step: 'STEP 05',
    label: 'Revise and resubmit',
    subtitle: 'Peer reviewer response matrices & committee revision passes',
    stageOverview:
      'For scholars navigating tough peer review comments, revise-and-resubmit (R&R) decisions, or supervisor revision mandates.',
    services: [
      {
        badge: 'Priority Support',
        title: 'Reviewer Response Matrix & Reply Packaging',
        tagline: 'Line-by-line point-by-point response table aligning reviewer feedback with tracked changes in the revised text.',
        rate: 'Flat Package / Hourly',
        isRecommended: false,
        features: [
          'Point-by-point reply letter and response matrix formatting',
          'Editorial diplomacy check: tone refinement for challenging reviewer comments',
          'Exact cross-referencing between response table and revised page/line numbers',
          'Tracked changes audit ensuring every reviewer query is addressed',
        ],
        whenToChoose: [
          'If you received a Revise & Resubmit (R&R) from a major journal and feel overwhelmed.',
          'If you need a second pair of eyes to ensure the reply matrix is deferential yet scientifically firm.',
          'If your committee returned 15+ pages of defense revisions.',
        ],
        link: '/scholarcrafted/order?service=journal',
        cta: 'View R&R Package',
      },
      {
        badge: 'Complimentary Guarantee',
        title: '60-Day Re-Editing Protection Pass',
        tagline: 'Dedicated re-editing for any sections revised in response to reviewer comments on ScholarCrafted-edited text.',
        rate: 'Included with Premium & Scientific Tiers',
        isRecommended: false,
        features: [
          'Complimentary re-editing pass within 60 days of manuscript delivery',
          'Verification of newly drafted sentences and revised paragraphs',
          'Consistent academic style and terminology retention',
          'Rapid 48-to-72 hour revision delivery',
        ],
        whenToChoose: [
          'If you used ScholarCrafted for your initial submission and received reviewer revision requests.',
          'If you want continuous editorial partnership until your paper is officially accepted.',
        ],
        link: '/scholarcrafted/order?service=editing',
        cta: 'View Editing Tiers',
      },
    ],
  },
  {
    step: 'STEP 06',
    label: 'Create visuals & proofs',
    subtitle: 'Back-of-book indexing, galley proof inspection & typeset checking',
    stageOverview:
      'For books and articles accepted for publication that require back-of-book indexing, galley proof review, and final production.',
    services: [
      {
        badge: 'Stage 05 • From $3 / typeset page',
        title: 'Back-of-Book Subject & Author Indexing',
        tagline: 'Comprehensive, publication-grade indexing constructed to university press and Cindex specifications.',
        rate: 'From $3 / typeset page',
        isRecommended: false,
        features: [
          'Subject index, author index, and combined index generation',
          'Headings, subheadings, cross-references ("See" and "See also")',
          'Strict adherence to press guidelines (Oxford, Cambridge, Routledge, Harvard)',
          'Delivered in press-ready Word, RTF, or plain text formats',
        ],
        whenToChoose: [
          'If your university press has delivered final page proofs and given you 2–3 weeks to produce an index.',
          'If you do not have the specialized indexing software (Cindex/SKY) or domain taxonomy experience.',
        ],
        link: '/scholarcrafted/order?service=book&stage=05',
        cta: 'Select Book Indexing',
      },
      {
        badge: 'Stage 04 • Galley Proof Review',
        title: 'Typeset Page Proof & Errata Review',
        tagline: 'First- and second-pass examination of typeset page proofs to catch layout bugs, broken tables, and copyeditor errors.',
        rate: 'Project-Based Rate',
        isRecommended: false,
        features: [
          'Detection of typesetting errors, bad line breaks, and font dropouts',
          'Figure placement and caption cross-check against references in text',
          'Resolution of copyeditor queries without disrupting page flow',
          'Errata preparation and margin notes for press production editors',
        ],
        whenToChoose: [
          'If you received final galley proofs from your publisher and cannot afford embarrassing print errors.',
          'If you want a professional proofreader to review printer proofs before final press run.',
        ],
        link: '/scholarcrafted/order?service=book&stage=04',
        cta: 'Select Galley Review',
      },
    ],
  },
]

// ─── SECTION 1: Solutions for Every Stage (Research Journey) ───────────────

function ResearchStageSection({ active }: { active: Record<string, string> }) {
  const [selectedStageIndex, setSelectedStageIndex] = useState(1) // Default to "Get expert editing"
  const currentStage = stageData[selectedStageIndex] ?? stageData[1]

  return (
    <Box
      id="research-stages"
      component="section"
      py={SECTION_SPACING}
      bg={active.background}
      style={{
        borderTop: `1px solid ${active.primary}12`,
      }}
    >
      <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
        <Stack gap={rem(40)}>
          {/* Section Header */}
          <Box style={{ maxWidth: 840 }}>
            <Text
              size="xs"
              fw={700}
              c={active.accent}
              style={{
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-heading-sans), var(--font-sans)',
              }}
            >
              Solutions for Every Stage
            </Text>
            <Title
              order={2}
              mt="xs"
              style={{
                fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                color: active.primary,
                fontFamily: 'var(--font-serif)',
                fontWeight: 600,
                lineHeight: 1.2,
                letterSpacing: '-0.015em',
              }}
            >
              Solutions for every stage of your research journey.
            </Title>
            <Text size="md" mt="md" c="dimmed" lh={1.75} style={{ maxWidth: '68ch' }}>
              From initial draft scoping and thesis-to-article conversion to high-impact line editing, peer review reply matrices, and press galley proofs &mdash; select your stage to view dedicated execution tracks.
            </Text>
          </Box>

          {/* 6 Step Navigator Tabs */}
          <SimpleGrid cols={{ base: 2, sm: 3, md: 6 }} spacing={rem(6)}>
            {stageData.map((stg, idx) => {
              const isActive = idx === selectedStageIndex
              return (
                <UnstyledButton
                  key={idx}
                  onClick={() => setSelectedStageIndex(idx)}
                  style={{ height: '100%' }}
                >
                  <Box
                    p={rem(18)}
                    bg={isActive ? active.primary : active.surface}
                    style={{
                      border: `1px solid ${isActive ? active.primary : `${active.primary}18`}`,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: rem(6),
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                    }}
                  >
                    <Text
                      size="xs"
                      fw={700}
                      c={active.accent}
                      style={{
                        letterSpacing: '0.14em',
                        fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                      }}
                    >
                      {stg.step}
                    </Text>
                    <Text
                      size="sm"
                      fw={700}
                      c={isActive ? active.background : active.primary}
                      lh={1.3}
                      style={{
                        fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                      }}
                    >
                      {stg.label}
                    </Text>
                  </Box>
                </UnstyledButton>
              )
            })}
          </SimpleGrid>

          {/* Active Stage Header & Overview */}
          <Box
            p={rem(28)}
            bg={active.surface}
            style={{
              border: `1px solid ${active.primary}16`,
            }}
          >
            <Group justify="space-between" align="center" wrap="wrap" gap="md">
              <Box>
                <Group gap="xs" align="center">
                  <Text
                    size="xs"
                    fw={700}
                    c={active.accent}
                    style={{
                      letterSpacing: '0.14em',
                      fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                    }}
                  >
                    {currentStage.step}
                  </Text>
                  <Text size="xs" c="dimmed">•</Text>
                  <Text
                    size="xs"
                    fw={700}
                    c={active.primary}
                    style={{
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                    }}
                  >
                    {currentStage.label}
                  </Text>
                </Group>
                <Title
                  order={3}
                  mt={rem(6)}
                  style={{
                    fontSize: 'clamp(1.35rem, 2.4vw, 1.7rem)',
                    fontFamily: 'var(--font-serif)',
                    color: active.primary,
                    fontWeight: 600,
                  }}
                >
                  {currentStage.subtitle}
                </Title>
                <Text size="sm" c="dimmed" mt={rem(4)} lh={1.65} style={{ maxWidth: '80ch' }}>
                  {currentStage.stageOverview}
                </Text>
              </Box>
            </Group>
          </Box>

          {/* Relevant Services for Selected Stage */}
          <SimpleGrid
            cols={{ base: 1, md: currentStage.services.length === 3 ? 3 : 2 }}
            spacing="lg"
          >
            {currentStage.services.map((svc, sIdx) => (
              <Box
                key={sIdx}
                p={{ base: rem(24), md: rem(36) }}
                bg={active.background}
                style={{
                  border: `1px solid ${svc.isRecommended ? active.accent : `${active.primary}18`}`,
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  boxShadow: svc.isRecommended ? `0 8px 32px ${active.accent}14` : 'none',
                }}
              >
                {svc.isRecommended && (
                  <Box
                    px={rem(12)}
                    py={rem(4)}
                    mb="xs"
                    style={{
                      backgroundColor: active.accent,
                      alignSelf: 'flex-start',
                    }}
                  >
                    <Text
                      size="xs"
                      fw={700}
                      c={active.background}
                      style={{
                        letterSpacing: '0.12em',
                        fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                      }}
                    >
                      RECOMMENDED FOR THIS STAGE
                    </Text>
                  </Box>
                )}

                <Stack gap="xs">
                  <Title
                    order={3}
                    style={{
                      fontSize: 'clamp(1.25rem, 2vw, 1.45rem)',
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 600,
                      lineHeight: 1.25,
                      color: active.primary,
                    }}
                  >
                    {svc.title}
                  </Title>
                  <Text size="xs" c="dimmed" lh={1.6} style={{ minHeight: rem(38) }}>
                    {svc.tagline}
                  </Text>
                </Stack>

                <Text
                  fw={700}
                  size="sm"
                  c={active.accent}
                  mt="sm"
                  style={{ fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}
                >
                  {svc.rate}
                </Text>

                <Box mt="md" mb="md">
                  <Link href={svc.link} style={{ textDecoration: 'none' }}>
                    <Button
                      fullWidth
                      radius={0}
                      variant={svc.isRecommended ? 'filled' : 'outline'}
                      style={{
                        backgroundColor: svc.isRecommended ? active.accent : 'transparent',
                        color: svc.isRecommended ? '#fff' : active.primary,
                        borderColor: svc.isRecommended ? active.accent : active.primary,
                        fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                        letterSpacing: '0.06em',
                        fontWeight: 600,
                      }}
                    >
                      {svc.cta}
                    </Button>
                  </Link>
                </Box>

                {/* Features list */}
                <Stack gap="xs" mb="lg">
                  {svc.features.map((feat, fIdx) => (
                    <Group key={fIdx} gap="xs" align="flex-start" wrap="nowrap">
                      <IconCheck size={15} color={active.accent} style={{ flexShrink: 0, marginTop: rem(2) }} />
                      <Text size="xs" c={active.primary} lh={1.5}>
                        {feat}
                      </Text>
                    </Group>
                  ))}
                </Stack>

                <Divider color={`${active.primary}12`} my="sm" />

                {/* When to choose */}
                <Stack gap={rem(6)} mt="auto">
                  <Text
                    size="xs"
                    fw={700}
                    c={active.accent}
                    style={{
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                    }}
                  >
                    When to choose
                  </Text>
                  {svc.whenToChoose.map((wtc, wIdx) => (
                    <Text key={wIdx} size="xs" c="dimmed" lh={1.5}>
                      • {wtc}
                    </Text>
                  ))}
                </Stack>
              </Box>
            ))}
          </SimpleGrid>

          {/* Compare Link */}
          <Box style={{ textAlign: 'center' }}>
            <Link href="/scholarcrafted/order" style={{ textDecoration: 'none' }}>
              <Button
                variant="subtle"
                radius={0}
                color={active.primary}
                rightSection={<IconArrowRight size={16} />}
                style={{
                  fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                  letterSpacing: '0.04em',
                }}
              >
                Compare All Services & Calculate Instant Fees →
              </Button>
            </Link>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

// ─── SECTION 1.5: Prestigious Academic Trust Bar ────────────────────────────

function AcademicTrustBar({ active }: { active: Record<string, string> }) {
  return (
    <Box
      py={rem(36)}
      bg={active.primary}
      style={{ color: '#ffffff', borderTop: `1px solid ${active.primary}20` }}
      data-dark-bg="true"
    >
      <Container size={1340} px={{ base: 'md', sm: 'xl' }}>
        <SimpleGrid cols={{ base: 2, sm: 4 }} spacing={{ base: 'lg', md: 'xl' }}>
          {[
            { val: '500+', label: 'Doctoral Candidates & Faculty Guided', sub: 'Across 40+ academic disciplines' },
            { val: '100%', label: 'Tracked-Changes Human Review', sub: 'Zero automated rewriting or shortcuts' },
            { val: '24–48h', label: 'Diagnostic Turnaround', sub: 'Rapid pre-submission triage queue' },
            { val: 'Top Presses', label: 'Oxford, Cambridge, Routledge & Q1', sub: 'Press-ready formatting compliance' },
          ].map((stat, i) => (
            <Box
              key={i}
              style={{
                borderLeft: i > 0 ? `1px solid rgba(255,255,255,0.14)` : undefined,
                paddingLeft: i > 0 ? rem(24) : 0,
              }}
            >
              <Text
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                  fontWeight: 600,
                  color: '#ffffff !important',
                  lineHeight: 1.1,
                }}
              >
                {stat.val}
              </Text>
              <Text
                size="xs"
                fw={700}
                mt={rem(6)}
                style={{
                  fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                  letterSpacing: '0.04em',
                  color: '#ffffff !important',
                }}
              >
                {stat.label}
              </Text>
              <Text size="xs" mt={rem(2)} style={{ color: 'rgba(255,255,255,0.7) !important' }}>
                {stat.sub}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

// ─── SECTION 2: Find Your Starting Point (By Situation) ──────────────────────

function ManuscriptSituationSection({ active }: { active: Record<string, string> }) {
  const [selectedId, setSelectedId] = useState(homeNeeds[0].id)
  const selectedNeed = homeNeeds.find((n) => n.id === selectedId) ?? homeNeeds[0]

  return (
    <Box
      id="starting-point"
      component="section"
      py={SECTION_SPACING}
      bg={active.surface}
      style={{
        borderTop: `1px solid ${active.primary}12`,
        borderBottom: `1px solid ${active.primary}12`,
      }}
    >
      <Container size={1340} px={{ base: 'md', sm: 'xl' }}>
        <Stack gap={rem(48)}>
          {/* Section Header */}
          <Box style={{ maxWidth: 840 }}>
            <Text
              size="xs"
              fw={700}
              c={active.accent}
              style={{
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-heading-sans), var(--font-sans)',
              }}
            >
              Find Your Starting Point
            </Text>
            <Title
              order={2}
              mt="xs"
              style={{
                fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                color: active.primary,
                fontFamily: 'var(--font-serif)',
                fontWeight: 600,
                lineHeight: 1.2,
                letterSpacing: '-0.015em',
              }}
            >
              Where is your manuscript right now?
            </Title>
            <Text size="md" mt="md" c="dimmed" lh={1.75} style={{ maxWidth: '68ch' }}>
              Select the situation that matches where your draft stands right now. We will map you directly to the exact editorial or compliance protocol you need.
            </Text>
          </Box>

          {/* Interactive Situations Grid */}
          <Box
            style={{
              display: 'grid',
              gridTemplateColumns: '1.05fr 1.15fr',
              gap: rem(28),
              alignItems: 'start',
            }}
            className="home-need-grid"
          >
            {/* Left Column: Situations List */}
            <Box style={{ border: `1px solid ${active.primary}14`, backgroundColor: active.background }}>
              {homeNeeds.map((need, i) => {
                const isActive = need.id === selectedId
                return (
                  <UnstyledButton
                    key={need.id}
                    onClick={() => setSelectedId(need.id)}
                    style={{ width: '100%', display: 'block' }}
                  >
                    <Box
                      px={{ base: rem(20), md: rem(28) }}
                      py={{ base: rem(18), md: rem(22) }}
                      style={{
                        borderBottom: i < homeNeeds.length - 1 ? `1px solid ${active.primary}10` : undefined,
                        backgroundColor: isActive ? active.surface : 'transparent',
                        transition: 'background-color 0.15s ease',
                        cursor: 'pointer',
                      }}
                    >
                      <Group justify="space-between" align="center" wrap="nowrap" gap="md">
                        <Stack gap={rem(4)}>
                          <Text
                            fw={isActive ? 700 : 500}
                            size="sm"
                            lh={1.4}
                            style={{
                              color: isActive ? active.primary : `${active.primary}cc`,
                              fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                            }}
                          >
                            {need.label}
                          </Text>
                          <Text size="xs" c="dimmed" lh={1.4}>{need.subLabel}</Text>
                        </Stack>
                        <IconChevronRight
                          size={16}
                          color={isActive ? active.accent : `${active.primary}40`}
                          style={{ flexShrink: 0, transition: 'color 0.15s ease' }}
                        />
                      </Group>
                    </Box>
                  </UnstyledButton>
                )
              })}
            </Box>

            {/* Right Column: Matched Service Cards */}
            <Box>
              <Stack gap={rem(18)}>
                {selectedNeed.serviceIds.map((sid) => {
                  const svc = homeServices[sid]
                  if (!svc) return null
                  const isRecommended = sid === selectedNeed.recommended
                  return (
                    <Box
                      key={sid}
                      p={{ base: rem(24), md: rem(32) }}
                      bg={active.background}
                      style={{
                        border: `1px solid ${isRecommended ? active.accent : `${active.primary}18`}`,
                        boxShadow: isRecommended ? `0 8px 32px ${active.accent}14` : 'none',
                      }}
                    >
                      <Stack gap="md">
                        {isRecommended && (
                          <Box
                            px={rem(10)}
                            py={rem(4)}
                            style={{
                              backgroundColor: active.accent,
                              display: 'inline-flex',
                              alignSelf: 'flex-start',
                            }}
                          >
                            <Text
                              size="xs"
                              fw={700}
                              c={active.background}
                              style={{
                                letterSpacing: '0.12em',
                                fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                              }}
                            >
                              RECOMMENDED FOR YOU
                            </Text>
                          </Box>
                        )}
                        <Group justify="space-between" align="flex-start">
                          <Title
                            order={3}
                            style={{
                              fontSize: 'clamp(1.25rem, 2vw, 1.45rem)',
                              fontFamily: 'var(--font-serif)',
                              fontWeight: 600,
                              color: active.primary,
                              flex: 1,
                            }}
                          >
                            {svc.title}
                          </Title>
                          <Text
                            size="xs"
                            fw={700}
                            c={active.accent}
                            style={{
                              border: `1px solid ${active.accent}`,
                              padding: `${rem(3)} ${rem(8)}`,
                              whiteSpace: 'nowrap',
                              flexShrink: 0,
                              marginLeft: rem(12),
                              fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                            }}
                          >
                            {svc.badge}
                          </Text>
                        </Group>
                        <Text size="sm" c="dimmed" lh={1.7}>{svc.desc}</Text>
                        <Link href={svc.link} style={{ textDecoration: 'none' }}>
                          <Text
                            size="sm"
                            fw={700}
                            c={active.accent}
                            style={{
                              letterSpacing: '0.04em',
                              fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                            }}
                          >
                            {svc.cta} →
                          </Text>
                        </Link>
                      </Stack>
                    </Box>
                  )
                })}

                <Box p={rem(24)} bg={active.background} style={{ border: `1px solid ${active.primary}14` }}>
                  <Group justify="space-between" align="center" wrap="nowrap">
                    <Text size="sm" c="dimmed" lh={1.5} style={{ flex: 1 }}>
                      Not sure which tier? Submit your manuscript for a free scope assessment — reply in 24 hours.
                    </Text>
                    <Link href="/scholarcrafted/order?service=editing&tier=premium" style={{ textDecoration: 'none', flexShrink: 0, marginLeft: rem(16) }}>
                      <Button
                        variant="filled"
                        radius={0}
                        size="sm"
                        style={{
                          backgroundColor: active.primary,
                          color: active.background,
                          fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                        }}
                        rightSection={<IconArrowRight size={14} />}
                      >
                        Free Assessment
                      </Button>
                    </Link>
                  </Group>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Container>

      {/* Mobile: stack columns */}
      <style>{`
        @media (max-width: 820px) {
          .home-need-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </Box>
  )
}

export default function ScholarCraftedLanding() {
  const theme = useMantineTheme()
  const active = theme.other
  const autoplay = useRef(Autoplay({ delay: 5000 }))
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* Carousel indicators handled by bottom <style> block */

            .home-accordion-item[data-active] {
              border-color: ${active.primary} !important;
            }

            .home-accordion-control:hover {
              background-color: transparent !important;
            }

            /* Hero overlays: mobile = flat dark, desktop = directional */
            .hero-overlay-mobile { display: block; }
            .hero-overlay-desktop { display: none; }

            /* Hero buttons: full-width on small mobile */
            .hero-btn-group { width: 100%; }
            .hero-btn-link { display: block; width: 100%; }
            .hero-btn-link > button { width: 100% !important; }

            /* Back-to-top: smaller on mobile */
            .back-to-top-btn {
              bottom: 20px !important;
              right: 20px !important;
              width: 42px !important;
              height: 42px !important;
            }

            @media (min-width: 640px) {
              /* Desktop: directional gradient */
              .hero-overlay-mobile { display: none; }
              .hero-overlay-desktop { display: block; }

              /* Buttons sit side by side */
              .hero-btn-link { display: inline-block; width: auto; }
              .hero-btn-link > button { width: auto !important; }

              .back-to-top-btn {
                bottom: 40px !important;
                right: 40px !important;
                width: 50px !important;
                height: 50px !important;
              }
            }

            /* Services grid on mobile: stack label/title/desc and CTA vertically */
            @media (max-width: 600px) {
              .service-row-grid {
                grid-template-columns: 1fr !important;
              }
              .service-row-num { display: none; }
            }
          `,
        }}
      />

      {/* Hero Section — responsive left-anchored editorial layout */}
      <Box
        component="section"
        style={{
          position: 'relative',
          minHeight: 'clamp(480px, 88vh, 840px)',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Background image — full bleed, right side breathes */}
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 25%',
            zIndex: 0,
          }}
        />
        {/* Directional gradient: solid dark behind text on desktop; full dark on mobile */}
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(10,10,10,0.88)',
            zIndex: 1,
          }}
          className="hero-overlay-mobile"
        />
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.92) 45%, rgba(10,10,10,0.70) 75%, rgba(10,10,10,0.30) 100%)',
            zIndex: 2,
          }}
          className="hero-overlay-desktop"
        />
        {/* Bottom subtle blend */}
        <Box
          style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: rem(100),
            background: 'linear-gradient(to top, rgba(10,10,10,0.6), transparent)',
            zIndex: 1,
          }}
        />

        {/* Content — responsive container */}
        <Box style={{ position: 'relative', zIndex: 3, width: '100%', paddingTop: 'clamp(88px, 14vw, 140px)', paddingBottom: 'clamp(48px, 8vw, 100px)' }}>
          <Container size={1200} px={{ base: 'md', sm: 'xl' }}>
            <Box style={{ maxWidth: rem(640) }}>
              <Stack gap="xl" align="flex-start">

                <p style={{ margin: 0, fontSize: rem(11), fontWeight: 700, letterSpacing: '0.22em', color: active.accent, textTransform: 'uppercase' }}>
                  Editorial & Publication Advisory
                </p>

                <Title
                  order={1}
                  style={{
                    fontSize: 'clamp(2.2rem, 5.2vw, 3.8rem)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.025em',
                    color: '#ffffff',
                    fontFamily: 'var(--font-display), var(--font-serif)',
                    fontWeight: 600,
                  }}
                >
                  Hands-on Help With Your Dissertation, Thesis, or Paper From Doctoral-Qualified Experts.
                </Title>

                <p style={{ margin: 0, fontSize: 'clamp(0.95rem, 1.8vw, 1.125rem)', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)', maxWidth: '54ch' }}>
                  When your committee doesn&apos;t have 40 hours to fix structural gaps, citation errors, or journal compliance, we do. Human academic expertise with tracked changes &mdash; ready for defense or press.
                </p>

                {/* Buttons — side-by-side, wrap cleanly on smallest mobile */}
                <Group gap={rem(12)} wrap="wrap" className="hero-btn-group">
                  <Link href="/scholarcrafted/order" style={{ textDecoration: 'none' }} className="hero-btn-link">
                    <Button
                      size="lg"
                      radius={0}
                      fullWidth
                      style={{
                        backgroundColor: active.accent,
                        color: '#fff',
                        height: rem(52),
                        paddingLeft: rem(24),
                        paddingRight: rem(24),
                        border: 'none',
                        fontWeight: 600,
                        fontSize: rem(15),
                        fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      View Services & Pricing →
                    </Button>
                  </Link>
                  <Link href="/scholarcrafted/order?service=ai-audit" style={{ textDecoration: 'none' }} className="hero-btn-link">
                    <Button
                      size="lg"
                      radius={0}
                      fullWidth
                      style={{
                        borderColor: 'rgba(255,255,255,0.4)',
                        borderWidth: 1,
                        borderStyle: 'solid',
                        color: '#ffffff',
                        background: 'rgba(255,255,255,0.08)',
                        height: rem(52),
                        paddingLeft: rem(24),
                        paddingRight: rem(24),
                        fontSize: rem(15),
                        fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Run AI Manuscript Audit ($29) →
                    </Button>
                  </Link>
                </Group>

              </Stack>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* ── Floating 3-Panel Card (How it works strip seamlessly aligned) ── */}
      <Box
        id="getting-started"
        component="section"
        bg={active.background}
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: rem(48),
          paddingBottom: rem(24),
        }}
      >
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          {/* Pulled up to overlap hero bottom edge cleanly with intentional card surface */}
          <Box
            style={{
              marginTop: 0,
              backgroundColor: active.surface,
              border: `1px solid ${active.primary}18`,
              boxShadow: `0 16px 48px rgba(0,0,0,0.16)`,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
            }}
            className="floating-panel-grid"
          >
            {[
              {
                num: '01',
                label: 'Hand Off Your Manuscript',
                desc: 'Upload your document with your style guide and target deadline. Zero sales calls, zero phone tag to start.',
              },
              {
                num: '02',
                label: 'Guaranteed 24h Fixed Quote',
                desc: 'Within 24 hours we evaluate your draft and send a clear service scope and guaranteed firm price. No vague estimates.',
              },
              {
                num: '03',
                label: 'Human Execution in Tracked Changes',
                desc: 'Line-by-line editorial triage delivered directly in Word tracked changes. You review and approve every single edit.',
              },
            ].map((step, i) => (
              <Box
                key={i}
                px={{ base: rem(24), md: rem(36) }}
                py={{ base: rem(28), md: rem(36) }}
                style={{
                  borderLeft: i > 0 ? `1px solid ${active.primary}14` : undefined,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: rem(12),
                  backgroundColor: active.surface,
                  transition: 'background-color 0.2s ease',
                }}
              >
                <Text
                  size="xs"
                  fw={700}
                  c={active.accent}
                  style={{
                    letterSpacing: '0.16em',
                    fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                  }}
                >
                  {step.num}
                </Text>
                <Text
                  fw={700}
                  size="md"
                  c={active.primary}
                  lh={1.3}
                  style={{
                    fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                    fontSize: rem(19),
                    letterSpacing: '-0.01em',
                  }}
                >
                  {step.label}
                </Text>
                <Text size="sm" c="dimmed" lh={1.65} style={{ flex: 1 }}>
                  {step.desc}
                </Text>
              </Box>
            ))}
          </Box>
        </Container>

        {/* Responsive override */}
        <style>{`
          @media (max-width: 768px) {
            .floating-panel-grid {
              grid-template-columns: 1fr !important;
              margin-top: 0 !important;
            }
            .floating-panel-grid > div {
              border-left: none !important;
              border-top: 1px solid rgba(0,0,0,0.08);
            }
            .floating-panel-grid > div:first-child {
              border-top: none;
            }
          }
        `}</style>
      </Box>

      {/* ── PATH 1: Research Journey Stages (Wide 1240 Content) ── */}
      <ResearchStageSection active={active} />

      {/* ── Prestigious Academic Trust Bar ── */}
      <AcademicTrustBar active={active} />

      {/* ── PATH 2: Find Your Starting Point / By Situation (Wide 1340 Content) ── */}
      <ManuscriptSituationSection active={active} />

      {/* Testimonials Carousel */}
      <Box component="section" py={{ base: rem(60), md: rem(100) }} bg={active.background}>
        <Container size={1240} px={{ base: "md", sm: "xl" }}>
          <Carousel
            withIndicators
            emblaOptions={{ loop: true }}
            withControls={false}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            styles={{
              root: { paddingBottom: rem(60) },
              indicators: { bottom: rem(-20) }
            }}
            classNames={{
              indicator: 'carousel-indicator' }}
          >
            {testimonials.map((item, index) => (
              <Carousel.Slide key={index}>
                <Container size={960}>
                  <Stack align="center" style={{ textAlign: 'center' }} gap={rem(40)}>
                    <Text
                      style={{
                        fontSize: 'clamp(60px, 12vw, 100px)',
                        lineHeight: 0,
                        opacity: 0.1,
                        marginBottom: 'clamp(-24px, -4vw, -40px)',
                        color: active.primary }}
                    >
                      &ldquo;
                    </Text>
                    <Text
                      style={{
                        fontSize: "clamp(1.25rem, 2.5vw, 2.1rem)",
                        fontStyle: "italic",
                        lineHeight: 1.45,
                        letterSpacing: '-0.01em',
                        color: active.primary }}
                    >
                      {item.quote}
                    </Text>
                    <Stack gap="xs" align="center">
                     <Group gap={rem(4)}>
                       {[...Array(5)].map((_, i) => (
                         <IconStarFilled key={i} size={14} color="#FFD700" style={{ opacity: 0.85 }} />
                       ))}
                     </Group>
                     <Stack gap={4}>
                       <Text
                         size="xs"
                         c={active.primary}
                       >
                         {item.author}
                       </Text>
                       <Text size="xs" c="dimmed" style={{ letterSpacing: '0.05em' }}>
                         {item.institution}
                       </Text>
                     </Stack>
                    </Stack>                  </Stack>
                </Container>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Container>
      </Box>

      {/* University Logo Marquee */}
      <Box component="section" className="dark-scholar-section" py={rem(48)} bg={active.primary}>
        
        {/* Full-width marquee outside container */}
        <Box style={{ width: '100%', overflow: 'hidden' }}>
          <div className="marquee-container">
            <div className="marquee-content">
              {universities.map((uni, idx) => (
                <img
                  key={`uni-1-${idx}`}
                  src={uni.logo}
                  alt={uni.name}
                  className="university-logo-img"
                />
              ))}
              {/* Repeat for seamless loop */}
              {universities.map((uni, idx) => (
                <img
                  key={`uni-2-${idx}`}
                  src={uni.logo}
                  alt={uni.name}
                  className="university-logo-img"
                />
              ))}
            </div>
          </div>
        </Box>
      </Box>

      {/* Specialist Team on the Painful Parts */}
      <Box component="section" py={{ base: rem(60), md: SECTION_SPACING }} bg={active.background}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap="xl">
            
            {/* Header + Intro */}
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: rem(24), md: rem(60) }} style={{ alignItems: 'flex-start' }}>
              <Stack gap="sm">
                <Text
                  size="xs"
                  fw={700}
                  c={active.accent}
                  style={{
                    letterSpacing: '0.18em',
                    fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                  }}
                >
                  SPECIALIST OPERATIONS
                </Text>
                <Title
                  order={2}
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 2.85rem)',
                    color: active.primary,
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 600,
                    lineHeight: 1.15,
                  }}
                >
                  A specialist team, on the painful parts.
                </Title>
              </Stack>

              <Stack gap="md">
                <Text size="md" c="dimmed" lh={1.75}>
                  Your time belongs to the research, not the formatting. Our doctoral editors polish your prose and citations by hand &mdash; never automated or outsourced.
                </Text>

                <Group gap="sm" wrap="wrap">
                  <Link href="/scholarcrafted/order?service=editing" style={{ textDecoration: 'none' }}>
                    <Button
                      size="md"
                      radius={0}
                      className="impeccable-button"
                      style={{
                        backgroundColor: active.accent,
                        color: '#fff',
                        border: 'none',
                        fontWeight: 600,
                        fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                      }}
                    >
                      See Transparent Per-Word Rates →
                    </Button>
                  </Link>
                </Group>
              </Stack>
            </SimpleGrid>

            {/* Specialist Specialists Cards */}
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={rem(16)}>
              {[
                {
                  name: 'Dr. Elena Rostova',
                  degree: 'PhD · Oxford',
                  role: 'Lead Manuscript & Developmental Editor',
                },
                {
                  name: 'Dr. Marcus Vance',
                  degree: 'EdD · Vanderbilt',
                  role: 'Style Guides & Publisher Compliance (APA/Chicago)',
                },
                {
                  name: 'Sarah Lin',
                  degree: 'MPhil · Cambridge',
                  role: 'Reference Archiving, CrossRef & BibTeX',
                },
                {
                  name: 'Dr. Tariq Al-Mansoor',
                  degree: 'PhD · Michigan',
                  role: 'Quantitative & Logic Structure Validation',
                },
              ].map((member, i) => (
                <Box
                  key={i}
                  p={{ base: rem(20), sm: rem(24) }}
                  bg={active.surface}
                  style={{
                    borderTop: `3px solid ${i === 0 ? active.accent : `${active.primary}18`}`,
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(-4px)';
                    el.style.boxShadow = `0 10px 24px ${active.accent}14`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  <Stack gap="xs">
                    <p style={{
                      margin: 0,
                      fontSize: rem(16),
                      fontWeight: 700,
                      color: active.primary,
                      lineHeight: 1.2,
                      fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                    }}>
                      {member.name}
                    </p>
                    <p style={{
                      margin: 0,
                      fontSize: rem(11),
                      fontWeight: 700,
                      color: active.accent,
                      letterSpacing: '0.08em',
                      fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                    }}>
                      {member.degree}
                    </p>
                    <p style={{ margin: 0, fontSize: rem(13), color: '#666', lineHeight: 1.5, marginTop: rem(4) }}>
                      {member.role}
                    </p>
                  </Stack>
                </Box>
              ))}
            </SimpleGrid>

            {/* Testimonial Quote Card */}
            <Box
              p={{ base: rem(24), md: rem(32) }}
              style={{
                backgroundColor: active.surface,
                borderLeft: `3px solid ${active.accent}`,
              }}
            >
              <Text size="md" fs="italic" c={active.primary} lh={1.7}>
                &ldquo;Working with the ScholarCrafted specialist team was the single best decision I made for my book volume. They caught structural citation anomalies three reviewers missed, and delivered a flawless volume ahead of deadline.&rdquo;
              </Text>
              <Group gap="xs" mt="sm">
                <Text
                  size="xs"
                  fw={700}
                  c={active.accent}
                  style={{ fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}
                >
                  Dr. Claire Robinson
                </Text>
                <Text size="xs" c="dimmed">
                  &bull; Associate Professor &middot; United Kingdom
                </Text>
              </Group>
            </Box>

          </Stack>
        </Container>
      </Box>



      {/* Frequently Asked Questions */}
      <Box component="section" className="academic-watermark" py={{ base: rem(60), md: SECTION_SPACING }} bg={active.surface}>
        <Container size={850} px={{ base: "md", sm: "xl" }}>
          <Stack gap="xl">
            <Box style={{ textAlign: 'center' }}>
              <Text
                size="xs"
                fw={700}
                c={active.accent}
                style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}
              >
                Frequently Asked Questions
              </Text>
              <Title order={2} mt="xs" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", color: active.primary, fontFamily: 'var(--font-serif)' }}>
                Questions Scholars Actually Ask
              </Title>
              <Text size="md" c="dimmed" mt="md" lh={1.7} style={{ maxWidth: 640, margin: '0 auto' }}>
                Transparent answers on editorial integrity, AI screening, committee compliance, and turnaround timelines.
              </Text>
            </Box>

            <Accordion>
              {homeFaqs.map((faq, i) => (
                <Accordion.Item key={i} value={`faq-${i}`}>
                  <Accordion.Control>
                    {faq.q}
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="md" lh={1.7} c="dimmed">
                      {faq.a}
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Stack>
        </Container>
      </Box>

      <Footer />

      <Box
        onClick={scrollToTop}
        className="back-to-top-btn"
        style={{
          position: 'fixed',
          bottom: rem(40),
          right: rem(40),
          width: rem(50),
          height: rem(50),
          borderRadius: '50%',
          backgroundColor: active.surface,
          border: `1px solid ${active.primary}33`,
          color: active.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 100,
          opacity: showBackToTop ? 1 : 0,
          pointerEvents: showBackToTop ? 'all' : 'none',
          transform: showBackToTop ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.2s ease',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.1)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        <IconChevronUp size={24} stroke={1.5} />
      </Box>

      <style>{`
        /* Carousel dot indicators — always circular, no oval stretching */
        button.carousel-indicator {
          width: 7px !important;
          height: 7px !important;
          border-radius: 50% !important;
          background-color: rgba(0,0,0,0.15) !important;
          transform: none !important;
          transition: background-color 300ms ease, width 300ms ease, height 300ms ease !important;
        }
        button.carousel-indicator[data-active="true"] {
          width: 10px !important;
          height: 10px !important;
          background-color: ${active.accent} !important;
        }
      `}</style>
    </Box>
  )
}
