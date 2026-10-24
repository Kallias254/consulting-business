'use client'

import React, { useState, Suspense } from 'react'
import {
  Container,
  Title,
  Text,
  Box,
  SimpleGrid,
  Stack,
  Button,
  Divider,
  rem,
  Group,
  useMantineTheme,
  Accordion,
  Badge,
  Slider,
  UnstyledButton,
  Table,
  Anchor,
} from '@mantine/core'
import { Navbar } from '../../_components/Navbar'
import { Footer } from '../../_components/Footer'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  IconCheck,
  IconX,
  IconArrowRight,
  IconClock,
  IconShieldCheck,
  IconFileCertificate,
  IconMessageChatbot,
  IconRefresh,
  IconFileText,
  IconSparkles,
  IconAlertTriangle,
  IconBook2,
  IconAward,
  IconStar,
  IconLayersLinked,
  IconSearch,
  IconCircleCheck,
} from '@tabler/icons-react'
import { SECTION_SPACING } from '@/layout'

// ─── 3 EDITING TIERS DEFINITION ─────────────────────────────────────────────

interface EditingTier {
  id: string
  name: string
  badge: string
  isPopular?: boolean
  tagline: string
  ratePerWord: number
  standardDays: string
  priorityDays: string
  targetAudience: string
  description: string
  features: string[]
  whenToChoose: string[]
  deliverables: string[]
  deepPillars: Array<{ title: string; desc: string }>
}

const editingTiers: EditingTier[] = [
  {
    id: 'advanced',
    name: 'Advanced Editing',
    badge: 'ACCURATE & FAST ON BUDGET',
    isPopular: false,
    tagline: 'Precision grammar, syntax, academic tone & full style manual compliance.',
    ratePerWord: 0.0425,
    standardDays: '3–5 days',
    priorityDays: '48 hours',
    targetAudience:
      'Scholars with well-structured drafts seeking native-level polish, mechanical accuracy, and formatting compliance before deposit or submission.',
    description:
      'A dedicated subject-matter editor improves sentence-level syntax, vocabulary precision, and readability. We verify discipline-specific phrasing, fix dangling modifiers, untangle passive syntax, and format to APA, Chicago, MLA, or target journal requirements.',
    features: [
      'Line-by-line grammar, punctuation, and syntax correction',
      'Discipline-specific terminology and phrasing verification',
      'Target journal or university template formatting (APA, Chicago, MLA, IEEE)',
      'Delivered in Microsoft Word with 100% Track Changes',
      'One round of journal style & template formatting',
      'Direct margin queries with your senior discipline editor',
      'Official Editorial Compliance & Language Certificate',
      'Free word count reduction up to 10%',
    ],
    whenToChoose: [
      'Your methodology and structural logic are already sound.',
      'You are facing a fast-approaching defense or submission deadline.',
      'English is your second academic language or prose requires native clarity.',
      'You want mechanical perfection without extensive argument restructuring.',
    ],
    deliverables: [
      'Tracked Changes document (.docx)',
      'Clean submission-ready document (.docx)',
      'Editorial Certificate of English Editing',
      'Style manual compliance checklist',
    ],
    deepPillars: [
      {
        title: '01 · Sentence-Level Syntax & Academic Cadence',
        desc: 'Untangling convoluted phrasing, eliminating grammatical friction, and elevating tone to meet international scholarly publication standards without altering your core meaning.',
      },
      {
        title: '02 · Terminology & Disciplinary Precision',
        desc: 'Edited by doctoral specialists in your field who understand precise sub-discipline jargon, preventing awkward misnomers or generic rewordings that alienate peer reviewers.',
      },
      {
        title: '03 · Style Manual & Journal Formatting',
        desc: 'Exacting formatting of running heads, section hierarchies, tables, captions, and reference lists according to APA 7th, Chicago 17th, IEEE, MLA 9th, or publisher author guidelines.',
      },
      {
        title: '04 · Direct Margin Inquiries & Certificate',
        desc: 'Receive helpful margin notes where statements are ambiguous, accompanied by an official Editorial Certificate to submit to your graduate school or journal editorial board.',
      },
    ],
  },
  {
    id: 'premium',
    name: 'Premium Editing',
    badge: 'MOST REQUESTED • COMPREHENSIVE',
    isPopular: true,
    tagline: 'Substantive line editing, argument flow, cadence & 365-day re-editing support.',
    ratePerWord: 0.065,
    standardDays: '5–7 days',
    priorityDays: '72 hours',
    targetAudience:
      'Doctoral candidates preparing dissertations and scholars targeting high-ranking peer-reviewed journals who anticipate revision rounds.',
    description:
      'Our flagship editorial track. A senior discipline specialist performs substantial paragraph- and sentence-level overhauls, correcting argument progression, structural flow, transitions, and rhetoric. Includes complimentary re-editing passes for up to 365 days after delivery.',
    features: [
      'All Advanced Editing features included',
      'Substantive paragraph reorganization and logical pacing polish',
      'Elimination of discursive drift and rhetorical redundancy',
      'Reference cross-check: inline citations verified against bibliography',
      'Target journal scope & author guidelines audit',
      'Submission cover letter & abstract packaging',
      'Unconditional complimentary re-editing support for 365 days',
      'Detailed Editor Advisory Memorandum on thesis defensibility',
      'Two independent editorial passes (specialist + managing editor)',
      'Free word count reduction up to 20%',
    ],
    whenToChoose: [
      'Targeting top-tier peer-reviewed journals (SCI, SSCI, Scopus Q1/Q2).',
      'Preparing a multi-chapter dissertation for committee defense.',
      'You expect supervisor, co-author, or reviewer revision requests.',
      'You want extensive margin feedback on narrative clarity and academic strength.',
    ],
    deliverables: [
      'Tracked Changes document with extensive margin commentary',
      'Clean publication-ready document formatted to target press',
      'Target Journal Scope & Guidelines Audit report',
      'Target Journal Cover Letter',
      'Citation & Bibliography cross-audit memo',
      'Editorial Rigor Certificate + 365-day re-editing guarantee',
    ],
    deepPillars: [
      {
        title: '01 · Substantive Structural & Argument Flow',
        desc: 'Restructuring disjointed paragraphs, strengthening claim-to-evidence transitions, and ensuring the reader is guided through your theoretical framework with effortless momentum.',
      },
      {
        title: '02 · Comprehensive Citation Cross-Check',
        desc: 'Every inline citation is cross-verified against your bibliography. We catch missing entries, duplicate references, broken DOIs, and formatting inconsistencies across chapters.',
      },
      {
        title: '03 · Target Journal Cover Letter & Desk-Check',
        desc: 'We draft a persuasive, editor-ready cover letter highlighting your study’s novelty and fit for the journal’s aims and scope, eliminating desk-rejection triggers before review.',
      },
      {
        title: '04 · 365-Day Unlimited Free Re-Editing',
        desc: 'When your committee, supervisor, or journal reviewers request revisions, submit your updated draft. We re-edit modified text at zero additional charge for up to one full year.',
      },
    ],
  },
  {
    id: 'scientific',
    name: 'Scientific Editing Pro',
    badge: 'HIGH-IMPACT FACTOR JOURNALS',
    isPopular: false,
    tagline: 'Dual-pass developmental critique by former journal peer reviewers and senior editors.',
    ratePerWord: 0.095,
    standardDays: '7–10 days',
    priorityDays: '4–5 days',
    targetAudience:
      'Authors submitting to top university presses (Oxford, Cambridge, Routledge) or high-rejection journals (Nature, Lancet, Elsevier Q1).',
    description:
      'A superior developmental editor and a journal peer reviewer team up to evaluate your manuscript against top-journal acceptance criteria. Identifies critical methodological communication gaps, tests evidence-to-claim alignment in Discussion sections, and prepares response letters.',
    features: [
      'All Premium Editing features included',
      'Comprehensive Manuscript Scientific Completeness Assessment',
      'Deep analysis of narrative coherence, experimental framing, and literature synthesis',
      'Reviewer Response Matrix & rebuttal letter cross-check for resubmissions',
      'Direct peer reviewer commentary mimicking actual journal review committees',
      'Unlimited rounds of re-editing and re-formatting for 365 days',
      'Priority delivery turnaround with executive managing editor oversight',
      'Substantive word count reduction without losing scientific substance',
    ],
    whenToChoose: [
      'Targeting premier high-impact journals with >80% desk-rejection rates.',
      'You received a harsh "Revise & Resubmit" decision and need response strategy.',
      'Converting complex empirical multi-study data into cohesive prose.',
      'You seek deep academic critique to reinforce your manuscript before initial submission.',
    ],
    deliverables: [
      'Tracked Changes substantive edit',
      'Comprehensive Scientific Review Report (strengths, gaps, review readiness)',
      'Journal Rebuttal / Revision Response Matrix',
      'Cover Letter + Target Journal Submission Checklist',
      'Executive Editorial Certificate + Priority 365-day re-editing',
    ],
    deepPillars: [
      {
        title: '01 · Rigorous Peer Reviewer Diagnostic',
        desc: 'Evaluated by a doctoral specialist who serves on peer review panels in your exact field. Gaps in experimental explanation, study limitations, and data claims are caught and rectified.',
      },
      {
        title: '02 · Scientific Completeness & Logic Audit',
        desc: 'In-depth assessment of the narrative spine: does the Introduction justify the research question? Does the Discussion contextualize findings against recent 2024–2026 literature?',
      },
      {
        title: '03 · Reviewer Response Matrix & Rebuttal Memo',
        desc: 'For resubmissions (R&R), we construct a point-by-point rebuttal matrix and review your response letter to ensure tone is respectful, defensible, and thoroughly persuasive.',
      },
      {
        title: '04 · Executive Managing Editor Priority Support',
        desc: 'Direct priority oversight by Dr. Micah Dobson and the senior editorial team with fast-tracked turnaround and unlimited re-editing passes across multiple journal targets.',
      },
    ],
  },
]

// ─── 6 OTHER SPECIALIZED SERVICES ───────────────────────────────────────────

const otherServices = [
  {
    id: 'thesis-dissertation',
    title: 'Thesis & Dissertation Defense Editing',
    kicker: 'GRADUATE SCHOOL CLEARANCE',
    desc: 'Specialized multi-chapter editing configured to your university’s exact dissertation handbook. Resolves advisor critique, formats front matter, and verifies committee compliance.',
    turnaround: '5–10 business days',
    rate: 'From $0.0425 / word',
    ctaText: 'Review Thesis Editing Options',
    link: '/order?service=editing&focus=thesis',
    highlights: [
      '100% Word Track Changes for committee transparency',
      'University template compliance (APA, Chicago, Harvard)',
      '365-day free re-editing for post-defense modifications',
      'Official Editorial Compliance Certificate for graduate school',
    ],
  },
  {
    id: 'journal-fast-track',
    title: 'Journal Article Fast-Track Prep',
    kicker: 'RAPID DESK-CHECK COMPLIANCE',
    desc: 'Accelerated submission preparation for time-sensitive manuscripts. Full author guidelines audit, blinded peer review verification, and title/abstract optimization.',
    turnaround: '48 hours to 4 days',
    rate: 'From $0.0425 / word',
    ctaText: 'Explore Journal Packages',
    link: '/order?service=journal&focus=journal-article',
    highlights: [
      'Target journal author guidelines audit',
      'Blinded manuscript compliance (anonymized review files)',
      'Word count trimming to exact journal length caps',
      'Persuasive Editor-in-Chief cover letter creation',
    ],
  },
  {
    id: 'ai-citation-audit',
    title: 'English Language & Citation Integrity Audit',
    kicker: 'PRE-SUBMISSION SCREENING',
    desc: 'Diagnostic audit benchmarked against 200M+ research papers. Detects fabricated references, hallucinated DOIs, retracted citations, and syntax flags before journal screening.',
    turnaround: '24 to 48 hours',
    rate: '$29 Single / $69 Bundle',
    ctaText: 'Order Integrity Audit',
    link: '/order?service=ai-audit',
    highlights: [
      'CrossRef & DOI verification across 200M+ papers',
      'Identification of retracted or fabricated literature entries',
      '1-Page Executive Faculty Risk Memo',
      '100% fee credited toward full Word Track-Changes editing',
    ],
  },
  {
    id: 'academic-copyediting',
    title: 'Academic Copyediting & Monograph Styling',
    kicker: 'PUBLISHER-READY CAMERA COPY',
    desc: 'Exacting line-by-line copyediting and typesetting preparation for academic monographs, book chapters, and university press submissions (Oxford, Cambridge, Routledge).',
    turnaround: '7–14 business days',
    rate: 'Scoped per project or $0.0425/wd',
    ctaText: 'View Academic Book Services',
    link: '/order?service=book',
    highlights: [
      'Full monograph chapter harmonization and cross-referencing',
      'Style handbook adherence (Chicago Notes & Bib, Hart’s Rules)',
      'Publisher proposal & prospectus packaging support',
      'Back-of-book indexing & permissions compliance',
    ],
  },
  {
    id: 'reviewer-rebuttal',
    title: 'Reviewer Rebuttal & R&R Resubmission Support',
    kicker: 'POST-REVIEW CRISIS MANAGEMENT',
    desc: 'Comprehensive revision support when journals issue Revise & Resubmit decisions. We build a point-by-point response matrix and edit altered manuscript sections.',
    turnaround: '4–7 business days',
    rate: 'Included in Scientific Pro or scoped',
    ctaText: 'Resubmission Support',
    link: '/order?service=editing&focus=resubmission',
    highlights: [
      'Point-by-point Reviewer Response Matrix formulation',
      'Diplomatic scholarly framing for contentious feedback',
      'Track Changes alignment between response and manuscript',
      'Secondary pass before re-upload to journal submission portal',
    ],
  },
  {
    id: 'conference-abstract',
    title: 'Conference Abstract & Executive Polish',
    kicker: 'HIGH-DENSITY SHORT-FORM POLISH',
    desc: 'Line-by-line rhetoric polish for 200–500 word abstracts and executive summaries under strict submission character limits for international symposiums.',
    turnaround: '24 hours',
    rate: 'Flat rate $49 / draft',
    ctaText: 'Polish Abstract Now',
    link: '/order?service=editing&focus=abstract',
    highlights: [
      'Maximum impact within strict word / character ceilings',
      'Sharpening problem statement, methodology, and findings',
      'Elimination of vague rhetorical filler',
      'Same-day priority turnaround',
    ],
  },
]

// ─── COMPARISON MATRIX ROWS ─────────────────────────────────────────────────

const comparisonMatrix = [
  { feature: 'Grammar, punctuation & syntax correction', advanced: true, premium: true, scientific: true },
  { feature: 'Academic tone & discipline terminology accuracy', advanced: true, premium: true, scientific: true },
  { feature: '100% Microsoft Word Track Changes delivery', advanced: true, premium: true, scientific: true },
  { feature: 'Style manual & journal template formatting (APA, Chicago, IEEE)', advanced: true, premium: true, scientific: true },
  { feature: 'Official Editorial Certificate of English Editing', advanced: true, premium: true, scientific: true },
  { feature: 'Free word count reduction', advanced: 'Up to 10%', premium: 'Up to 20%', scientific: 'Substantive' },
  { feature: 'Sentence rhythm, flow & logical transitions polish', advanced: 'Basic', premium: 'Substantive', scientific: 'In-Depth' },
  { feature: 'Paragraph restructuring & argument pacing', advanced: false, premium: true, scientific: true },
  { feature: 'Inline citation to bibliography cross-check', advanced: false, premium: true, scientific: true },
  { feature: 'Target Journal Cover Letter creation', advanced: false, premium: true, scientific: true },
  { feature: 'Target journal scope & author guidelines audit', advanced: false, premium: true, scientific: true },
  { feature: 'Editor Advisory Memorandum on thesis defensibility', advanced: false, premium: true, scientific: true },
  { feature: 'Dual-pass review (Subject Specialist + Managing Editor)', advanced: false, premium: true, scientific: true },
  { feature: 'Scientific Completeness & Peer Review Assessment', advanced: false, premium: false, scientific: true },
  { feature: 'Reviewer Response Matrix & Rebuttal letter check (R&R)', advanced: false, premium: false, scientific: true },
  { feature: 'Complimentary Re-editing Guarantee', advanced: '1 round (30 days)', premium: 'Unlimited (365 days)', scientific: 'Unlimited (365 days)' },
  { feature: 'Direct Zoom consultation with Dr. Micah Dobson', advanced: 'Optional', premium: 'Included (20 min)', scientific: 'Included (45 min)' },
]

// ─── FAQS ───────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'How do I choose between Advanced, Premium, and Scientific Editing Pro?',
    a: 'If your manuscript is already logically structured and needs line-by-line grammar, academic tone polish, and strict target journal formatting, choose Advanced Editing. If you want substantive structural reorganization, argument flow refinement, citation verification, and peace of mind with 365 days of free re-editing, choose Premium Editing (our most requested service). If you are targeting high-rejection Q1 journals (Nature, Lancet, Elsevier) or responding to tough reviewer critiques, choose Scientific Editing Pro for peer-reviewer developmental assessment.',
  },
  {
    q: 'Can I upload my file and start immediately without scheduling a sales call?',
    a: 'Yes, absolutely. Our pipeline is 100% asynchronous and designed for busy scholars. You can enter your word count, upload your manuscript (.docx), select your deadline, and receive your confirmed quote and start notification within 24 hours.',
  },
  {
    q: 'What is your policy on ghostwriting and AI-generated text?',
    a: 'We operate under a strict zero-ghostwriting policy. We do not generate text, write unoriginal prose, or falsify data. We polish, structure, audit, and refine your authentic intellectual work in Microsoft Word Track Changes so you retain 100% intellectual authorship and defense defensibility.',
  },
  {
    q: 'What does the 365-Day Free Re-editing guarantee include?',
    a: 'Under Premium Editing and Scientific Editing Pro, you can submit revised drafts of your edited manuscript within 365 days of initial delivery at zero additional charge. This covers revisions made in response to supervisor comments, committee feedback, or journal peer reviewers.',
  },
  {
    q: 'Can university grants, departmental research budgets, or startup funds pay for this?',
    a: 'Yes. Most universities, labs, and fellowship programs (NSF, NIH, Fulbright, university graduate research allowances) cover professional editorial services. We provide itemized institutional invoices and W-9 documentation.',
  },
  {
    q: 'Which style manuals and academic disciplines do you support?',
    a: 'We edit across all disciplines (humanities, social sciences, medicine, STEM, law, education) and configure documents to APA 7th, Chicago/Turabian (Notes & Bibliography or Author-Date), MLA 9th, IEEE, Harvard, AMA, and individual publisher author guidelines.',
  },
]

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

function EditingServicesContent() {
  const theme = useMantineTheme()
  const active = theme.other
  const searchParams = useSearchParams()

  const initialTab = searchParams.get('tab') || searchParams.get('plan') || 'overview'
  const validTabs = ['overview', 'advanced', 'premium', 'scientific', 'compare', 'other']
  const [currentTab, setCurrentTab] = useState<string>(validTabs.includes(initialTab) ? initialTab : 'overview')

  // Live Pricing State
  const [wordCount, setWordCount] = useState<number>(8000)
  const [selectedCalcTier, setSelectedCalcTier] = useState<string>('premium')

  const calcTier = editingTiers.find((t) => t.id === selectedCalcTier) ?? editingTiers[1]
  const estimatedPrice = (wordCount * calcTier.ratePerWord).toFixed(2)

  const TABS_CONFIG = [
    { id: 'overview', label: 'Overview & Plans' },
    { id: 'advanced', label: 'Advanced Line Editing' },
    { id: 'premium', label: 'Premium Structural' },
    { id: 'scientific', label: 'Scientific Pro' },
    { id: 'compare', label: 'Compare All Plans' },
    { id: 'other', label: 'Other Specialized Services', badge: '6 Services' },
  ]

  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.searchParams.set('tab', tabId)
      window.history.replaceState({}, '', url.toString())
    }
  }

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* ── HERO SECTION ───────────────────────────────────────────────── */}
      <Box
        component="section"
        pt={{ base: rem(120), md: rem(150) }}
        pb={{ base: rem(40), md: rem(60) }}
        bg={active.background}
        style={{ borderBottom: `1px solid ${active.primary}12` }}
      >
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap="lg" style={{ maxWidth: 860 }}>
            <Box>
              <Text
                size="xs"
                fw={700}
                c={active.accent}
                style={{
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                }}
              >
                Manuscript Refinement & Publication Support
              </Text>
              <Title
                order={1}
                mt="xs"
                style={{
                  fontSize: 'clamp(2.3rem, 5vw, 3.6rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.025em',
                  color: active.primary,
                  fontFamily: 'var(--font-display), var(--font-serif)',
                  fontWeight: 600,
                }}
              >
                English Editing Services Tailored to Your Publication Stage.
              </Title>
            </Box>

            <Text size="lg" c="dimmed" lh={1.75} style={{ fontSize: rem(18), maxWidth: '64ch' }}>
              Whether you need rapid line-by-line grammar polish or substantive structural overhaul with 365 days of free re-editing &mdash; every manuscript is paired with a doctoral specialist in your discipline and overseen personally by Dr. Micah Dobson.
            </Text>

            {/* Quick Guarantees Bar */}
            <Group gap="xl" wrap="wrap" pt="xs">
              <Group gap="xs" align="center">
                <IconCheck size={18} color={active.accent} />
                <Text size="sm" fw={600} c={active.primary}>100% Track Changes Delivery</Text>
              </Group>
              <Group gap="xs" align="center">
                <IconCheck size={18} color={active.accent} />
                <Text size="sm" fw={600} c={active.primary}>Strict Zero Ghostwriting Pledge</Text>
              </Group>
              <Group gap="xs" align="center">
                <IconCheck size={18} color={active.accent} />
                <Text size="sm" fw={600} c={active.primary}>365-Day Committee Re-editing</Text>
              </Group>
            </Group>
          </Stack>
        </Container>
      </Box>

      {/* ── STICKY / INTERACTIVE TAB BAR ───────────────────────────────── */}
      <Box
        bg={active.surface}
        style={{
          borderBottom: `1px solid ${active.primary}15`,
          position: 'sticky',
          top: 0,
          zIndex: 90,
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        }}
      >
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Box
            style={{
              display: 'flex',
              gap: rem(8),
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              paddingTop: rem(10),
              paddingBottom: rem(10),
            }}
          >
            {TABS_CONFIG.map((tab) => {
              const isActive = currentTab === tab.id
              const isOther = tab.id === 'other'
              return (
                <UnstyledButton
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  style={{
                    padding: `${rem(10)} ${rem(18)}`,
                    backgroundColor: isActive
                      ? active.primary
                      : isOther
                      ? `${active.accent}10`
                      : 'transparent',
                    color: isActive ? '#ffffff' : isOther ? active.accent : active.primary,
                    border: `1px solid ${
                      isActive
                        ? active.primary
                        : isOther
                        ? `${active.accent}40`
                        : `${active.primary}18`
                    }`,
                    fontWeight: isActive || isOther ? 700 : 500,
                    fontSize: rem(13),
                    fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: rem(8),
                    transition: 'all 0.15s ease',
                    flexShrink: 0,
                  }}
                >
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <Badge
                      size="xs"
                      radius={0}
                      variant={isActive ? 'outline' : 'filled'}
                      style={{
                        backgroundColor: isActive ? 'transparent' : active.accent,
                        color: '#ffffff',
                        borderColor: '#ffffff',
                        fontSize: rem(9),
                        letterSpacing: '0.05em',
                      }}
                    >
                      {tab.badge}
                    </Badge>
                  )}
                </UnstyledButton>
              )
            })}
          </Box>
        </Container>
      </Box>

      {/* ── TAB CONTENT ────────────────────────────────────────────────── */}

      {/* ── TAB 1: OVERVIEW & ALL PLANS ── */}
      {currentTab === 'overview' && (
        <Box>
          {/* 3-Tier Comparison Cards */}
          <Box component="section" py={SECTION_SPACING} bg={active.surface}>
            <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
              <Stack gap={rem(48)}>
                <Box style={{ maxWidth: 800 }}>
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
                    Editing Plans Overview
                  </Text>
                  <Title
                    order={2}
                    mt="xs"
                    style={{
                      fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                      color: active.primary,
                      fontFamily: 'var(--font-display), var(--font-serif)',
                      fontWeight: 600,
                    }}
                  >
                    Three depths of editorial intervention.
                  </Title>
                  <Text size="md" c="dimmed" mt="sm" lh={1.7}>
                    Select any tier below to view exact deliverables, or click a dedicated tab above to read the complete breakdown.
                  </Text>
                </Box>

                <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
                  {editingTiers.map((tier) => (
                    <Box
                      key={tier.id}
                      p={{ base: rem(24), md: rem(32) }}
                      bg={active.background}
                      style={{
                        border: `1px solid ${tier.isPopular ? active.accent : `${active.primary}18`}`,
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        boxShadow: tier.isPopular ? `0 12px 40px ${active.accent}14` : 'none',
                      }}
                    >
                      {tier.isPopular && (
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
                            c="#ffffff"
                            style={{
                              letterSpacing: '0.12em',
                              fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                            }}
                          >
                            MOST POPULAR
                          </Text>
                        </Box>
                      )}

                      <Text
                        size="xs"
                        fw={700}
                        c={active.accent}
                        style={{
                          letterSpacing: '0.12em',
                          fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                        }}
                      >
                        {tier.badge}
                      </Text>

                      <Title
                        order={3}
                        mt="xs"
                        style={{
                          fontSize: rem(24),
                          fontFamily: 'var(--font-display), var(--font-serif)',
                          fontWeight: 600,
                          color: active.primary,
                        }}
                      >
                        {tier.name}
                      </Title>

                      <Text size="xs" c="dimmed" mt="xs" lh={1.6} style={{ minHeight: rem(42) }}>
                        {tier.tagline}
                      </Text>

                      <Box my="md">
                        <Text
                          size="xs"
                          fw={700}
                          c="dimmed"
                          style={{ letterSpacing: '0.08em', textTransform: 'uppercase' }}
                        >
                          Rate per word
                        </Text>
                        <Text
                          fw={700}
                          style={{
                            fontSize: rem(26),
                            fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                            color: active.primary,
                            lineHeight: 1.1,
                            marginTop: rem(4),
                          }}
                        >
                          ${tier.ratePerWord.toFixed(4)}{' '}
                          <span style={{ fontSize: rem(14), fontWeight: 500, color: '#888' }}>
                            / word
                          </span>
                        </Text>
                      </Box>

                      <Group gap="xs" mb="lg">
                        <Button
                          flex={1}
                          radius={0}
                          style={{
                            backgroundColor: tier.isPopular ? active.accent : active.primary,
                            color: '#ffffff',
                            fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                            letterSpacing: '0.04em',
                            fontWeight: 600,
                            height: rem(42),
                          }}
                          onClick={() => {
                            setSelectedCalcTier(tier.id)
                            document.getElementById('pricing-calculator')?.scrollIntoView({ behavior: 'smooth' })
                          }}
                        >
                          Calculate Fee
                        </Button>
                        <Button
                          variant="outline"
                          radius={0}
                          style={{
                            borderColor: `${active.primary}30`,
                            color: active.primary,
                            fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                            letterSpacing: '0.04em',
                            fontWeight: 600,
                            height: rem(42),
                          }}
                          onClick={() => handleTabChange(tier.id)}
                        >
                          Learn More →
                        </Button>
                      </Group>

                      <Stack gap="xs" mb="lg" flex={1}>
                        {tier.features.slice(0, 6).map((feat, fIdx) => (
                          <Group key={fIdx} gap="xs" align="flex-start" wrap="nowrap">
                            <IconCheck size={14} color={active.accent} style={{ flexShrink: 0, marginTop: rem(3) }} />
                            <Text size="xs" c={active.primary} lh={1.4}>
                              {feat}
                            </Text>
                          </Group>
                        ))}
                      </Stack>

                      <Divider color={`${active.primary}12`} my="sm" />

                      <Box>
                        <Text size="xs" fw={700} c={active.accent} mb={rem(4)} style={{ letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                          Standard Turnaround
                        </Text>
                        <Text size="xs" c="dimmed">
                          {tier.standardDays} (Priority: {tier.priorityDays})
                        </Text>
                      </Box>
                    </Box>
                  ))}
                </SimpleGrid>

                {/* Compare Link */}
                <Box style={{ textAlign: 'center' }}>
                  <UnstyledButton
                    onClick={() => handleTabChange('compare')}
                    style={{
                      color: active.accent,
                      fontSize: rem(14),
                      fontWeight: 700,
                      fontFamily: 'var(--font-heading-sans)',
                      letterSpacing: '0.08em',
                      textDecoration: 'underline',
                    }}
                  >
                    View Side-by-Side Detailed Feature Comparison Matrix ↓
                  </UnstyledButton>
                </Box>
              </Stack>
            </Container>
          </Box>

          {/* Interactive Calculator Section */}
          <Box
            id="pricing-calculator"
            component="section"
            py={SECTION_SPACING}
            bg={active.background}
            style={{ borderTop: `1px solid ${active.primary}12`, borderBottom: `1px solid ${active.primary}12` }}
          >
            <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: rem(40), md: rem(80) }} style={{ alignItems: 'center' }}>
                <Stack gap="xl">
                  <Box>
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
                      Instant Fee Calculator
                    </Text>
                    <Title
                      order={2}
                      mt="xs"
                      style={{
                        fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                        color: active.primary,
                        fontFamily: 'var(--font-display), var(--font-serif)',
                        fontWeight: 600,
                      }}
                    >
                      Transparent, per-word pricing. Zero hidden fees.
                    </Title>
                    <Text size="md" c="dimmed" mt="sm" lh={1.7}>
                      Adjust your word count to view the exact fee for each editorial tier. Submit your document directly online without mandatory sales calls.
                    </Text>
                  </Box>

                  {/* Tier Selection Buttons */}
                  <Box>
                    <Text size="xs" fw={700} c="dimmed" mb="xs" style={{ letterSpacing: '0.08em' }}>
                      CHOOSE YOUR EDITING PLAN:
                    </Text>
                    <SimpleGrid cols={3} spacing={rem(8)}>
                      {editingTiers.map((t) => (
                        <UnstyledButton
                          key={t.id}
                          onClick={() => setSelectedCalcTier(t.id)}
                          style={{
                            padding: `${rem(12)} ${rem(14)}`,
                            border: `1px solid ${selectedCalcTier === t.id ? active.primary : `${active.primary}20`}`,
                            backgroundColor: selectedCalcTier === t.id ? active.primary : active.surface,
                            color: selectedCalcTier === t.id ? '#ffffff' : active.primary,
                            textAlign: 'center',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <Text
                            size="xs"
                            fw={700}
                            style={{
                              fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                              color: selectedCalcTier === t.id ? '#ffffff' : active.primary,
                            }}
                          >
                            {t.name}
                          </Text>
                          <Text
                            size="xs"
                            style={{
                              color: selectedCalcTier === t.id ? active.accent : '#888',
                              marginTop: 2,
                            }}
                          >
                            ${t.ratePerWord.toFixed(4)}/wd
                          </Text>
                        </UnstyledButton>
                      ))}
                    </SimpleGrid>
                  </Box>

                  {/* Word Count Slider & Presets */}
                  <Box>
                    <Group justify="space-between" mb="xs">
                      <Text size="xs" fw={700} c="dimmed" style={{ letterSpacing: '0.08em' }}>
                        ENTER MANUSCRIPT WORD COUNT:
                      </Text>
                      <Text
                        size="sm"
                        fw={700}
                        c={active.accent}
                        style={{ fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}
                      >
                        {wordCount.toLocaleString()} words
                      </Text>
                    </Group>

                    <Slider
                      value={wordCount}
                      onChange={setWordCount}
                      min={1000}
                      max={80000}
                      step={500}
                      color={active.accent}
                      radius={0}
                      size="md"
                      thumbSize={18}
                      styles={{
                        track: { backgroundColor: `${active.primary}14` },
                      }}
                    />

                    <Group gap="xs" mt="sm">
                      {[3000, 7000, 15000, 30000, 60000].map((preset) => (
                        <Button
                          key={preset}
                          size="xs"
                          variant="subtle"
                          radius={0}
                          color={active.primary}
                          onClick={() => setWordCount(preset)}
                          style={{ border: `1px solid ${active.primary}18`, padding: `${rem(2)} ${rem(8)}` }}
                        >
                          {preset >= 1000 ? `${preset / 1000}k words` : `${preset} words`}
                        </Button>
                      ))}
                    </Group>
                  </Box>
                </Stack>

                {/* Calculated Quote Box */}
                <Box
                  p={{ base: rem(28), md: rem(40) }}
                  bg={active.surface}
                  style={{
                    border: `1px solid ${active.primary}18`,
                    boxShadow: `0 16px 48px rgba(0,0,0,0.06)`,
                  }}
                >
                  <Stack gap="lg">
                    <Box>
                      <Group justify="space-between" align="center">
                        <Badge radius={0} variant="filled" style={{ backgroundColor: active.accent, color: '#fff' }}>
                          {calcTier.badge}
                        </Badge>
                        <Text size="xs" c="dimmed">
                          {wordCount.toLocaleString()} Words
                        </Text>
                      </Group>
                      <Title
                        order={3}
                        mt="xs"
                        style={{
                          fontSize: rem(24),
                          fontFamily: 'var(--font-display), var(--font-serif)',
                          fontWeight: 600,
                        }}
                      >
                        {calcTier.name}
                      </Title>
                      <Text size="xs" c="dimmed" mt={4}>
                        {calcTier.targetAudience}
                      </Text>
                    </Box>

                    <Divider color={`${active.primary}12`} />

                    <Box>
                      <Text size="xs" fw={700} c="dimmed" style={{ letterSpacing: '0.08em' }}>
                        ESTIMATED TOTAL INVESTMENT
                      </Text>
                      <Text
                        fw={700}
                        style={{
                          fontSize: 'clamp(2.4rem, 4.2vw, 3.2rem)',
                          fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                          color: active.primary,
                          lineHeight: 1.1,
                          marginTop: rem(4),
                        }}
                      >
                        ${Number(estimatedPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Text>
                      <Text size="xs" c="dimmed" mt={4}>
                        Calculated at ${calcTier.ratePerWord.toFixed(4)} per word. Official itemized invoice provided.
                      </Text>
                    </Box>

                    <SimpleGrid cols={2} spacing="md">
                      <Box p={rem(14)} bg={active.background} style={{ border: `1px solid ${active.primary}12` }}>
                        <Text size="xs" fw={700} c={active.accent}>STANDARD DELIVERY</Text>
                        <Text size="sm" fw={700} c={active.primary} mt={2}>{calcTier.standardDays}</Text>
                      </Box>
                      <Box p={rem(14)} bg={active.background} style={{ border: `1px solid ${active.primary}12` }}>
                        <Text size="xs" fw={700} c={active.accent}>PRIORITY DELIVERY</Text>
                        <Text size="sm" fw={700} c={active.primary} mt={2}>{calcTier.priorityDays}</Text>
                      </Box>
                    </SimpleGrid>

                    <Link
                      href={`/order?service=editing&tier=${calcTier.id}&wordCount=${wordCount}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        fullWidth
                        size="lg"
                        radius={0}
                        style={{
                          backgroundColor: active.primary,
                          color: '#ffffff',
                          fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                          letterSpacing: '0.06em',
                          fontWeight: 600,
                          height: rem(50),
                        }}
                        rightSection={<IconArrowRight size={16} />}
                      >
                        Select {calcTier.name.includes('Scientific') ? 'Scientific Pro' : calcTier.name}
                      </Button>
                    </Link>

                    <Text size="xs" c="dimmed" style={{ textAlign: 'center' }}>
                      Upload .docx draft &bull; Firm 24h assessment &bull; Zero sales calls required
                    </Text>
                  </Stack>
                </Box>
              </SimpleGrid>
            </Container>
          </Box>

          {/* Academic Rigor: Why Human Mentorship Matters */}
          <Box component="section" py={SECTION_SPACING} bg={active.surface}>
            <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
              <Stack gap={rem(48)}>
                <Box style={{ maxWidth: 840, margin: '0 auto', textAlign: 'center' }}>
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
                    Faculty Collaboration & Editorial Rigor
                  </Text>
                  <Title
                    order={2}
                    mt="xs"
                    style={{
                      fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                      color: active.primary,
                      fontFamily: 'var(--font-display), var(--font-serif)',
                      fontWeight: 600,
                    }}
                  >
                    Why Human Mentorship Matters for High-Stakes Research.
                  </Title>
                  <Text size="md" c="dimmed" mt="sm" lh={1.75}>
                    Automated software handles basic spelling, but peer-reviewed publishing requires rigorous argument flow, discipline-specific accuracy, and accountability. Here is how our doctoral editors support your scholarship.
                  </Text>
                </Box>

                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                  {/* The Limits of Automated Checking */}
                  <Box
                    p={{ base: rem(28), md: rem(36) }}
                    bg={active.background}
                    style={{ border: `1px solid ${active.primary}18` }}
                  >
                    <Group gap="xs" align="center" mb="md">
                      <IconAlertTriangle size={20} color={active.accent} />
                      <Text size="sm" fw={700} c={active.primary} style={{ letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        The Limits of Automated Tools
                      </Text>
                    </Group>
                    <Stack gap="md">
                      {[
                        {
                          title: 'Surface Grammar vs. Intellectual Logic',
                          desc: 'Automated tools identify typos, but cannot assess whether your research questions, empirical findings, and discussions align logically.',
                        },
                        {
                          title: 'Generic Phrasing & Loss of Authorial Voice',
                          desc: 'Generic algorithmic recommendations often substitute formulaic sentence templates that flatten your personal scholarly style.',
                        },
                        {
                          title: 'Unchecked Bibliographic Accuracy',
                          desc: 'Automated checkers cannot verify whether your cited references match target journal indexing standards or actual published sources.',
                        },
                        {
                          title: 'Absence of Defense Preparation',
                          desc: 'Software cannot explain why a phrasing decision was made, nor can it prepare you to answer critical questions during a committee review.',
                        },
                      ].map((item, idx) => (
                        <Box key={idx} pl="md" style={{ borderLeft: `2px solid ${active.primary}20` }}>
                          <Text size="sm" fw={700} c={active.primary}>{item.title}</Text>
                          <Text size="xs" c="dimmed" mt={2} lh={1.5}>{item.desc}</Text>
                        </Box>
                      ))}
                    </Stack>
                  </Box>

                  {/* What Doctoral Specialists Provide */}
                  <Box
                    p={{ base: rem(28), md: rem(36) }}
                    bg={active.background}
                    style={{ border: `1px solid ${active.accent}` }}
                  >
                    <Group gap="xs" align="center" mb="md">
                      <IconSparkles size={20} color={active.accent} />
                      <Text size="sm" fw={700} c={active.accent} style={{ letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        What Doctoral Specialists Provide
                      </Text>
                    </Group>
                    <Stack gap="md">
                      {[
                        {
                          title: 'Discipline-Specific Scholarly Voice',
                          desc: 'We polish clarity and remove academic clutter while protecting your distinct scholarly perspective and subject terminology.',
                        },
                        {
                          title: 'Rigorous Argument Defensibility',
                          desc: 'A doctoral peer reviews claims, transitions, and framing to ensure your work stands up under the scrutiny of top reviewers.',
                        },
                        {
                          title: 'Manual Citation & Style Integrity',
                          desc: 'Every in-text citation is cross-checked against your bibliography and verified against style guides (APA, Chicago, IEEE).',
                        },
                        {
                          title: 'Author Sovereignty & Ongoing Support',
                          desc: 'Delivered in Microsoft Word Track Changes with margin commentary, backed by our 365-day re-editing guarantee for revision rounds.',
                        },
                      ].map((item, idx) => (
                        <Box key={idx} pl="md" style={{ borderLeft: `2px solid ${active.accent}` }}>
                          <Text size="sm" fw={700} c={active.primary}>{item.title}</Text>
                          <Text size="xs" c="dimmed" mt={2} lh={1.5}>{item.desc}</Text>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </SimpleGrid>
              </Stack>
            </Container>
          </Box>
        </Box>
      )}

      {/* ── TAB 2, 3, 4: DEDICATED TIER SPOTLIGHT TABS ── */}
      {(currentTab === 'advanced' || currentTab === 'premium' || currentTab === 'scientific') && (() => {
        const tier = editingTiers.find((t) => t.id === currentTab) ?? editingTiers[1]
        const tierPrice = (wordCount * tier.ratePerWord).toFixed(2)

        return (
          <Box py={SECTION_SPACING} bg={active.surface}>
            <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
              <Stack gap={rem(48)}>
                {/* Header Banner */}
                <Box>
                  <Badge radius={0} variant="filled" style={{ backgroundColor: active.accent, color: '#ffffff', marginBottom: rem(12) }}>
                    {tier.badge}
                  </Badge>
                  <Title
                    order={2}
                    style={{
                      fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)',
                      color: active.primary,
                      fontFamily: 'var(--font-display), var(--font-serif)',
                      fontWeight: 600,
                    }}
                  >
                    {tier.name}
                  </Title>
                  <Text size="lg" c="dimmed" mt="xs" lh={1.7} style={{ maxWidth: '68ch' }}>
                    {tier.description}
                  </Text>
                </Box>

                {/* Key Pillars Grid */}
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                  {tier.deepPillars.map((pillar, pIdx) => (
                    <Box
                      key={pIdx}
                      p={{ base: rem(24), md: rem(32) }}
                      bg={active.background}
                      style={{
                        border: `1px solid ${active.primary}15`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: rem(8),
                      }}
                    >
                      <Text
                        size="xs"
                        fw={700}
                        c={active.accent}
                        style={{ letterSpacing: '0.12em', fontFamily: 'var(--font-heading-sans)' }}
                      >
                        {pillar.title}
                      </Text>
                      <Text size="sm" c="dimmed" lh={1.7}>
                        {pillar.desc}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>

                {/* What is Included & When to Choose */}
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                  {/* Full Deliverables */}
                  <Box
                    p={{ base: rem(28), md: rem(36) }}
                    bg={active.background}
                    style={{ border: `1px solid ${active.primary}18` }}
                  >
                    <Text
                      size="xs"
                      fw={700}
                      c={active.accent}
                      mb="md"
                      style={{ letterSpacing: '0.14em', textTransform: 'uppercase' }}
                    >
                      Complete Deliverables Included
                    </Text>
                    <Stack gap="xs">
                      {tier.features.map((feat, fIdx) => (
                        <Group key={fIdx} gap="xs" align="flex-start" wrap="nowrap">
                          <IconCircleCheck size={16} color={active.accent} style={{ flexShrink: 0, marginTop: rem(2) }} />
                          <Text size="sm" c={active.primary} lh={1.5}>
                            {feat}
                          </Text>
                        </Group>
                      ))}
                    </Stack>
                  </Box>

                  {/* Calculator & Direct Order */}
                  <Box
                    p={{ base: rem(28), md: rem(36) }}
                    bg={active.background}
                    style={{
                      border: `2px solid ${active.accent}`,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Stack gap="md">
                      <Box>
                        <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                          Live Fee Estimate
                        </Text>
                        <Text
                          fw={700}
                          style={{
                            fontSize: rem(36),
                            fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                            color: active.primary,
                            marginTop: rem(4),
                            lineHeight: 1,
                          }}
                        >
                          ${Number(tierPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </Text>
                        <Text size="xs" c="dimmed" mt={4}>
                          Based on {wordCount.toLocaleString()} words at ${tier.ratePerWord.toFixed(4)}/word.
                        </Text>
                      </Box>

                      {/* Quick Word Slider */}
                      <Box>
                        <Group justify="space-between" mb={4}>
                          <Text size="xs" fw={600} c="dimmed">Adjust Word Count:</Text>
                          <Text size="xs" fw={700} c={active.primary}>{wordCount.toLocaleString()} wds</Text>
                        </Group>
                        <Slider
                          value={wordCount}
                          onChange={setWordCount}
                          min={1000}
                          max={80000}
                          step={500}
                          color={active.accent}
                          radius={0}
                        />
                      </Box>

                      <SimpleGrid cols={2} spacing="xs" pt="xs">
                        <Box p="xs" bg={active.surface} style={{ border: `1px solid ${active.primary}10` }}>
                          <Text size="xs" fw={700} c={active.accent}>STANDARD</Text>
                          <Text size="xs" fw={600} c={active.primary}>{tier.standardDays}</Text>
                        </Box>
                        <Box p="xs" bg={active.surface} style={{ border: `1px solid ${active.primary}10` }}>
                          <Text size="xs" fw={700} c={active.accent}>PRIORITY</Text>
                          <Text size="xs" fw={600} c={active.primary}>{tier.priorityDays}</Text>
                        </Box>
                      </SimpleGrid>
                    </Stack>

                    <Box mt="xl">
                      <Link
                        href={`/order?service=editing&tier=${tier.id}&wordCount=${wordCount}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <Button
                          fullWidth
                          size="lg"
                          radius={0}
                          style={{
                            backgroundColor: active.accent,
                            color: '#ffffff',
                            fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                            letterSpacing: '0.06em',
                            fontWeight: 700,
                            height: rem(52),
                          }}
                          rightSection={<IconArrowRight size={16} />}
                        >
                          Proceed with {tier.name}
                        </Button>
                      </Link>
                      <Text size="xs" c="dimmed" mt="xs" style={{ textAlign: 'center' }}>
                        100% Track Changes &bull; Free Re-editing &bull; Firm 24h Confirmation
                      </Text>
                    </Box>
                  </Box>
                </SimpleGrid>
              </Stack>
            </Container>
          </Box>
        )
      })()}

      {/* ── TAB 5: SIDE-BY-SIDE FEATURE MATRIX TABLE ── */}
      {currentTab === 'compare' && (
        <Box component="section" py={SECTION_SPACING} bg={active.background}>
          <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
            <Stack gap={rem(40)}>
              <Box style={{ maxWidth: 800 }}>
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
                  Feature-by-Feature Matrix
                </Text>
                <Title
                  order={2}
                  mt="xs"
                  style={{
                    fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                    color: active.primary,
                    fontFamily: 'var(--font-display), var(--font-serif)',
                    fontWeight: 600,
                  }}
                >
                  Side-by-side comparison of all three plans.
                </Title>
                <Text size="md" c="dimmed" mt="sm" lh={1.7}>
                  Detailed breakdown of editorial depth, revision passes, guarantees, and deliverables.
                </Text>
              </Box>

              <Box style={{ overflowX: 'auto', maxWidth: '100%', WebkitOverflowScrolling: 'touch', border: `1px solid ${active.primary}18` }}>
                <Table verticalSpacing="md" horizontalSpacing="lg" highlightOnHover style={{ minWidth: 720 }}>
                  <Table.Thead bg={active.surface}>
                    <Table.Tr>
                      <Table.Th style={{ width: '38%', fontSize: rem(13), fontFamily: 'var(--font-heading-sans)', color: active.primary }}>
                        EDITORIAL FEATURE & DELIVERABLE
                      </Table.Th>
                      <Table.Th style={{ width: '20%', textAlign: 'center', fontSize: rem(13), fontFamily: 'var(--font-heading-sans)', color: active.primary }}>
                        ADVANCED<br /><span style={{ fontSize: rem(11), color: '#888' }}>$0.0425 / word</span>
                      </Table.Th>
                      <Table.Th style={{ width: '22%', textAlign: 'center', fontSize: rem(13), fontFamily: 'var(--font-heading-sans)', color: active.accent, backgroundColor: `${active.accent}08` }}>
                        PREMIUM ★<br /><span style={{ fontSize: rem(11), color: active.accent }}>$0.0650 / word</span>
                      </Table.Th>
                      <Table.Th style={{ width: '20%', textAlign: 'center', fontSize: rem(13), fontFamily: 'var(--font-heading-sans)', color: active.primary }}>
                        SCIENTIFIC PRO<br /><span style={{ fontSize: rem(11), color: '#888' }}>$0.0950 / word</span>
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {comparisonMatrix.map((row, rIdx) => (
                      <Table.Tr key={rIdx}>
                        <Table.Td style={{ fontWeight: 500, fontSize: rem(13), color: active.primary }}>
                          {row.feature}
                        </Table.Td>
                        <Table.Td style={{ textAlign: 'center' }}>
                          {typeof row.advanced === 'boolean' ? (
                            row.advanced ? <IconCheck size={18} color={active.accent} /> : <IconX size={16} color="#bbb" />
                          ) : (
                            <Text size="xs" fw={600} c={active.primary}>{row.advanced}</Text>
                          )}
                        </Table.Td>
                        <Table.Td style={{ textAlign: 'center', backgroundColor: `${active.accent}04` }}>
                          {typeof row.premium === 'boolean' ? (
                            row.premium ? <IconCheck size={18} color={active.accent} /> : <IconX size={16} color="#bbb" />
                          ) : (
                            <Text size="xs" fw={700} c={active.accent}>{row.premium}</Text>
                          )}
                        </Table.Td>
                        <Table.Td style={{ textAlign: 'center' }}>
                          {typeof row.scientific === 'boolean' ? (
                            row.scientific ? <IconCheck size={18} color={active.accent} /> : <IconX size={16} color="#bbb" />
                          ) : (
                            <Text size="xs" fw={600} c={active.primary}>{row.scientific}</Text>
                          )}
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Box>

              {/* Bottom Quick Action Bar */}
              <Group justify="center" gap="md" wrap="wrap" pt="md">
                <Link href="/order?service=editing&tier=advanced" style={{ textDecoration: 'none' }}>
                  <Button variant="outline" radius={0} style={{ borderColor: active.primary, color: active.primary, height: rem(46) }}>
                    Select Advanced ($0.0425/wd)
                  </Button>
                </Link>
                <Link href="/order?service=editing&tier=premium" style={{ textDecoration: 'none' }}>
                  <Button radius={0} style={{ backgroundColor: active.accent, color: '#fff', height: rem(46), fontWeight: 700 }}>
                    Select Premium ($0.0650/wd) ★
                  </Button>
                </Link>
                <Link href="/order?service=editing&tier=scientific" style={{ textDecoration: 'none' }}>
                  <Button variant="outline" radius={0} style={{ borderColor: active.primary, color: active.primary, height: rem(46) }}>
                    Select Scientific Pro ($0.0950/wd)
                  </Button>
                </Link>
              </Group>
            </Stack>
          </Container>
        </Box>
      )}

      {/* ── TAB 6: OTHER SPECIALIZED SERVICES ── */}
      {currentTab === 'other' && (
        <Box component="section" py={SECTION_SPACING} bg={active.surface}>
          <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
            <Stack gap={rem(48)}>
              <Box style={{ maxWidth: 840 }}>
                <Badge radius={0} variant="filled" style={{ backgroundColor: active.accent, color: '#ffffff', marginBottom: rem(12) }}>
                  SPECIALIZED DOCUMENT TRACKS
                </Badge>
                <Title
                  order={2}
                  style={{
                    fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                    color: active.primary,
                    fontFamily: 'var(--font-display), var(--font-serif)',
                    fontWeight: 600,
                  }}
                >
                  Targeted editorial services for specific academic milestones.
                </Title>
                <Text size="md" c="dimmed" mt="sm" lh={1.7}>
                  Beyond standard line editing, ScholarCrafted provides end-to-end editorial execution across theses, journal desk audits, monographs, and reviewer response matrices.
                </Text>
              </Box>

              <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg">
                {otherServices.map((srv) => (
                  <Box
                    key={srv.id}
                    p={{ base: rem(24), md: rem(30) }}
                    bg={active.background}
                    style={{
                      border: `1px solid ${active.primary}18`,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative',
                      transition: 'border-color 0.2s ease',
                    }}
                  >
                    <Box>
                      <Text
                        size="xs"
                        fw={700}
                        c={active.accent}
                        style={{
                          letterSpacing: '0.12em',
                          fontFamily: 'var(--font-heading-sans)',
                          textTransform: 'uppercase',
                        }}
                      >
                        {srv.kicker}
                      </Text>

                      <Title
                        order={3}
                        mt="xs"
                        style={{
                          fontSize: rem(20),
                          fontFamily: 'var(--font-display), var(--font-serif)',
                          fontWeight: 600,
                          color: active.primary,
                          lineHeight: 1.25,
                        }}
                      >
                        {srv.title}
                      </Title>

                      <Text size="xs" c="dimmed" mt="sm" lh={1.6}>
                        {srv.desc}
                      </Text>

                      <Divider color={`${active.primary}10`} my="md" />

                      <Stack gap={rem(8)} mb="md">
                        {srv.highlights.map((hl, hIdx) => (
                          <Group key={hIdx} gap="xs" align="flex-start" wrap="nowrap">
                            <IconCheck size={14} color={active.accent} style={{ flexShrink: 0, marginTop: rem(2) }} />
                            <Text size="xs" c={active.primary} lh={1.4}>
                              {hl}
                            </Text>
                          </Group>
                        ))}
                      </Stack>
                    </Box>

                    <Box pt="sm">
                      <Group justify="space-between" align="center" mb="sm">
                        <Text size="xs" fw={700} c={active.accent}>
                          {srv.rate}
                        </Text>
                        <Text size="xs" c="dimmed">
                          {srv.turnaround}
                        </Text>
                      </Group>
                      <Link href={srv.link} style={{ textDecoration: 'none' }}>
                        <Button
                          fullWidth
                          radius={0}
                          style={{
                            backgroundColor: active.primary,
                            color: '#ffffff',
                            fontFamily: 'var(--font-heading-sans)',
                            letterSpacing: '0.04em',
                            fontWeight: 600,
                            height: rem(42),
                          }}
                          rightSection={<IconArrowRight size={14} />}
                        >
                          {srv.ctaText}
                        </Button>
                      </Link>
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            </Stack>
          </Container>
        </Box>
      )}

      {/* ── SHARED ASYNCHRONOUS 3-STEP WORKFLOW ─────────────────────────── */}
      <Box component="section" py={SECTION_SPACING} bg={active.background}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap={rem(48)}>
            <Box style={{ maxWidth: 740, margin: '0 auto', textAlign: 'center' }}>
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
                Asynchronous Workflow
              </Text>
              <Title
                order={2}
                mt="xs"
                style={{
                  fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                  color: active.primary,
                  fontFamily: 'var(--font-display), var(--font-serif)',
                  fontWeight: 600,
                }}
              >
                How our editorial execution works.
              </Title>
              <Text size="md" c="dimmed" mt="sm" lh={1.7}>
                No mandatory discovery calls or scheduling friction. We work directly with your manuscript and target style guidelines.
              </Text>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
              {[
                {
                  step: '01',
                  title: 'Upload Manuscript & Guidelines',
                  desc: 'Submit your document (.docx) and specify your target journal or style manual (APA, Chicago, MLA). We confirm word count and delivery schedule within 24 hours.',
                },
                {
                  step: '02',
                  title: 'Discipline-Specific Human Editing',
                  desc: 'A doctoral editor from your subject area completes substantive revisions in Word Track Changes, leaving marginal queries for ambiguities.',
                },
                {
                  step: '03',
                  title: 'Tracked Delivery & 365-Day Guarantee',
                  desc: 'Receive your clean and tracked copies plus Editorial Certificate. If your committee or journal requests modifications, enjoy free re-editing.',
                },
              ].map((st, i) => (
                <Box
                  key={i}
                  p={{ base: rem(28), md: rem(36) }}
                  bg={active.surface}
                  style={{ border: `1px solid ${active.primary}18` }}
                >
                  <Text
                    size="xs"
                    fw={700}
                    c={active.accent}
                    style={{ letterSpacing: '0.15em', fontFamily: 'var(--font-heading-sans)' }}
                  >
                    STEP {st.step}
                  </Text>
                  <Title
                    order={3}
                    mt="xs"
                    style={{
                      fontSize: rem(20),
                      fontFamily: 'var(--font-display), var(--font-serif)',
                      fontWeight: 600,
                      color: active.primary,
                    }}
                  >
                    {st.title}
                  </Title>
                  <Text size="sm" c="dimmed" mt="sm" lh={1.65}>
                    {st.desc}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* ── SHARED FAQ SECTION ─────────────────────────────────────────── */}
      <Box component="section" py={SECTION_SPACING} bg={active.surface}>
        <Container size={900} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap="xl">
            <Box style={{ textAlign: 'center' }}>
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
                Editorial Logistics & Standards
              </Text>
              <Title
                order={2}
                mt="xs"
                style={{
                  fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                  color: active.primary,
                  fontFamily: 'var(--font-display), var(--font-serif)',
                  fontWeight: 600,
                }}
              >
                Frequently Asked Questions
              </Title>
            </Box>

            <Accordion variant="separated" radius={0}>
              {faqs.map((faq, i) => (
                <Accordion.Item
                  key={i}
                  value={`faq-${i}`}
                  style={{ backgroundColor: active.background, border: `1px solid ${active.primary}12` }}
                >
                  <Accordion.Control
                    style={{
                      fontWeight: 600,
                      color: active.primary,
                      fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                    }}
                  >
                    {faq.q}
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm" lh={1.75} c="dimmed">
                      {faq.a}
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>

            {/* Bottom CTA Box */}
            <Box
              p={{ base: rem(28), md: rem(40) }}
              bg={active.background}
              style={{
                border: `1px solid ${active.accent}`,
                textAlign: 'center',
                marginTop: rem(24),
              }}
            >
              <Title
                order={3}
                style={{
                  fontSize: rem(24),
                  fontFamily: 'var(--font-display), var(--font-serif)',
                  fontWeight: 600,
                  color: active.primary,
                }}
              >
                Ready to submit your manuscript for review?
              </Title>
              <Text size="sm" c="dimmed" mt="xs" style={{ maxWidth: '60ch', margin: '8px auto 24px' }}>
                Upload your document to receive a formal assessment and firm fee quote within 24 hours.
              </Text>
              <Link href="/order?service=editing" style={{ textDecoration: 'none' }}>
                <Button
                  size="md"
                  radius={0}
                  style={{
                    backgroundColor: active.accent,
                    color: '#fff',
                    fontFamily: 'var(--font-heading-sans)',
                    letterSpacing: '0.04em',
                    fontWeight: 600,
                  }}
                  rightSection={<IconArrowRight size={16} />}
                >
                  Submit Your Draft Online
                </Button>
              </Link>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}

export default function EditingProofreadingPage() {
  return (
    <Suspense fallback={<Box style={{ minHeight: '100vh' }} />}>
      <EditingServicesContent />
    </Suspense>
  )
}
