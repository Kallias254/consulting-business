'use client'

import React, { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
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
  Accordion,
  Badge,
  UnstyledButton,
  Table,
  useMantineTheme,
} from '@mantine/core'
import { Navbar } from '../../_components/Navbar'
import { Footer } from '../../_components/Footer'
import Link from 'next/link'
import {
  IconCheck,
  IconX,
  IconArrowRight,
  IconFileText,
  IconBooks,
  IconSparkles,
  IconAlertTriangle,
  IconCircleCheck,
  IconShieldCheck,
  IconClock,
  IconAward,
  IconLayersLinked,
  IconStar,
} from '@tabler/icons-react'
import { SECTION_SPACING } from '@/layout'

// ─── JOURNAL TIERS DEFINITION ───────────────────────────────────────────────

interface JournalTier {
  id: string
  name: string
  badge: string
  isPopular?: boolean
  tagline: string
  price: string
  turnaround: string
  bestFor: string
  features: string[]
  deliverables: string[]
}

const journalTiers: JournalTier[] = [
  {
    id: 'essentials',
    name: 'Essentials',
    badge: 'SUBMISSION READY',
    isPopular: false,
    tagline: 'Everything you need to submit with confidence to the right journal.',
    price: 'From $320',
    turnaround: '5–7 days',
    bestFor: 'Researchers with an edited manuscript who need a clear submission target and a complete submission package.',
    features: [
      'Journal selection — 3 to 5 ranked options with scope, impact factor, and rejection rate analysis',
      'Reformatting to exact target journal Author Guidelines',
      'Abstract, keywords, and word count compliance check',
      'Cover letter written to journal scope and paper contribution',
      'Front and back matter verification (declarations, funding, conflicts)',
      'Submission checklist delivered with every package',
    ],
    deliverables: [
      'Ranked journal recommendation report',
      'Reformatted manuscript (.docx)',
      'Submission-ready cover letter',
      'Submission checklist',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    badge: 'MOST REQUESTED',
    isPopular: true,
    tagline: 'Full submission support plus the tools to navigate rejection and revision without losing momentum.',
    price: 'From $560',
    turnaround: '7–10 days',
    bestFor: 'Scholars who want support beyond first submission — including response to peer reviewers or reformatting for a second journal.',
    features: [
      'All Essentials features included',
      'Resubmission formatting to a second target journal if rejected',
      'Response letter — point-by-point reply to every reviewer comment',
      'Response-to-revision crosscheck (response table verified against revised manuscript)',
      'Editorial diplomacy check — tone review for challenging reviewer comments',
      'Priority turnaround available',
    ],
    deliverables: [
      'All Essentials deliverables',
      'Formatted response letter (.docx)',
      'Resubmission-ready manuscript for second journal',
      'Response-revision crosscheck report',
    ],
  },
  {
    id: 'full',
    name: 'Full',
    badge: 'END-TO-END',
    isPopular: false,
    tagline: 'Unlimited submission rounds and revision support until your paper finds its journal.',
    price: 'From $900',
    turnaround: 'Ongoing',
    bestFor: 'Researchers targeting competitive Q1/Q2 journals who anticipate multiple revision or resubmission rounds, or those who want complete editorial cover.',
    features: [
      'All Pro features included',
      'Unlimited reformatting rounds across multiple target journals',
      'Unlimited response letter rounds for any reviewer feedback received',
      'Revision editing included — revised sections re-edited at no extra cost',
      'Submission handled on your behalf (portal upload, form completion)',
      'Dedicated editorial contact for the full publication cycle',
    ],
    deliverables: [
      'All Pro deliverables',
      'Ongoing reformatted manuscripts (unlimited journals)',
      'Ongoing response letters (unlimited revision rounds)',
      'Confirmation of submission with portal reference number',
    ],
  },
]

// ─── BOOK STAGES DEFINITION ─────────────────────────────────────────────────

interface BookStage {
  step: string
  title: string
  subtitle: string
  desc: string
  price: string
  turnaround: string
  includes: string[]
}

const bookStages: BookStage[] = [
  {
    step: '01',
    title: 'Publisher Selection',
    subtitle: 'Find the right press before you write a word of your proposal.',
    desc: 'Identify the right academic press for your book before you write a single line of your proposal.',
    price: 'From $280',
    turnaround: '5–7 days',
    includes: [
      '3 to 5 ranked publishers matched to your subject area and audience',
      'Analysis of each press: acquisition focus, series fit, submission requirements',
      'Routledge, Oxford, SAGE, Cambridge, Michigan, Cornell, and field-specific presses',
      'Guidance on open-access and hybrid publishing options',
    ],
  },
  {
    step: '02',
    title: 'Book Proposal',
    subtitle: 'The document that gets your book commissioned.',
    desc: 'A complete acquisition-ready proposal written to the publisher\'s template.',
    price: 'From $480',
    turnaround: '7–10 days',
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
    step: '03',
    title: 'Manuscript Editing',
    subtitle: 'Full book-length editing to academic press standards.',
    desc: 'Same rigour as our Editing & Compliance service, scaled to book scope.',
    price: 'From $0.0425 / word',
    turnaround: 'Project-dependent',
    includes: [
      'Line-by-line language editing across the full manuscript',
      'Structural consistency across chapters',
      'Style manual conformity (Chicago, APA, or press-specific)',
      'Reference list audit and DOI verification',
      'Front and back matter formatting',
    ],
  },
  {
    step: '04',
    title: 'Galley Proof Review',
    subtitle: 'Catch errors before the final press run.',
    desc: 'First- and second-pass review of typeset page proofs before final press run.',
    price: 'Project-based',
    turnaround: '5–10 days',
    includes: [
      'Detection of typesetting errors, bad line breaks, and font dropouts',
      'Figure placement and caption cross-check against in-text references',
      'Resolution of copyeditor queries without disrupting page flow',
      'Table integrity and heading hierarchy verification',
      'Errata preparation and margin notes for press production editors',
    ],
  },
  {
    step: '05',
    title: 'Back-of-Book Indexing',
    subtitle: 'Professional index delivered press-ready.',
    desc: 'Professional subject and author index built to press specification.',
    price: 'From $3 / typeset page',
    turnaround: '10–14 days',
    includes: [
      'Subject index, author index, and combined index options',
      'Headings, subheadings, cross-references (See / See also)',
      'Adherence to press guidelines (Oxford, Cambridge, Routledge, Michigan)',
      'Delivered in press-ready Word, RTF, or plain text format',
      'Built using professional indexing software (Cindex / SKY Index)',
    ],
  },
]

// ─── JOURNAL COMPARISON MATRIX ──────────────────────────────────────────────

const journalComparisonMatrix = [
  { feature: 'Target Journal Selection (3–5 ranked options with impact factor & rejection rate analysis)', essentials: true, pro: true, full: true },
  { feature: 'Reformatting to Target Journal Author Guidelines (margins, fonts, headings, citations)', essentials: true, pro: true, full: true },
  { feature: 'Abstract, Running Headers & Word Count Verification', essentials: true, pro: true, full: true },
  { feature: 'Tailored Cover Letter for Target Journal Editor-in-Chief', essentials: true, pro: true, full: true },
  { feature: 'Front & Back Matter Compliance Check (declarations, funding, ethics statements)', essentials: true, pro: true, full: true },
  { feature: 'Submission-Readiness Checklist Memo', essentials: true, pro: true, full: true },
  { feature: 'Reformatting for a Second Target Journal (if first choice rejects)', essentials: false, pro: true, full: true },
  { feature: 'Point-by-Point Reviewer Response Letter Drafting', essentials: false, pro: true, full: true },
  { feature: 'Response-to-Revision Crosscheck (response table verified against revised manuscript)', essentials: false, pro: true, full: true },
  { feature: 'Editorial Diplomacy Check for Contentious Reviewer Comments', essentials: false, pro: true, full: true },
  { feature: 'Unlimited Reformatting Rounds Across Multiple Journals', essentials: false, pro: false, full: true },
  { feature: 'Unlimited Response Letter Rounds for All Revision Iterations', essentials: false, pro: false, full: true },
  { feature: 'Revised Section Editing Included (no secondary fees)', essentials: false, pro: false, full: true },
  { feature: 'Submission Handled on Your Behalf (portal upload & form filling)', essentials: false, pro: false, full: true },
  { feature: 'Dedicated Editorial Contact for Full Publication Cycle', essentials: false, pro: false, full: true },
]

// ─── SPECIALIZED SUBMISSION SERVICES ────────────────────────────────────────

const specializedServices = [
  {
    id: 'desk-check',
    title: 'Journal Desk-Check Compliance Pass',
    kicker: 'AUTHOR GUIDELINES AUDIT',
    desc: 'Comprehensive pre-submission audit against the target journal’s Author Guidelines, checklist, and blinded peer review criteria to eliminate desk rejection.',
    turnaround: '48 hours',
    price: 'From $180',
    link: '/order?service=journal&focus=journal-article',
    features: [
      'Word count, running headers, keywords & abstract limits check',
      'Front and back matter formatting (disclosures, funding statements)',
      'Blinded manuscript compliance verification for peer review',
      'Detailed Desk-Check Clearance Memo',
    ],
  },
  {
    id: 'rebuttal-matrix',
    title: 'Reviewer Rebuttal & R&R Response Matrix',
    kicker: 'REVISE & RESUBMIT CRISIS SUPPORT',
    desc: 'Strategic response formulation when journal editors issue a Revise & Resubmit decision. We draft the response table and cross-verify tracked manuscript changes.',
    turnaround: '5–7 business days',
    price: 'Included in Pro/Full or Scoped',
    link: '/order?service=editing&focus=resubmission',
    features: [
      'Point-by-point response table aligned to reviewer critiques',
      'Diplomatic scholarly framing for conflicting reviewer demands',
      'Cross-check of manuscript line numbers against response memo',
      'Secondary review before re-upload to editorial portal',
    ],
  },
  {
    id: 'book-proposal',
    title: 'Acquisition-Ready Book Proposal',
    kicker: 'ACADEMIC MONOGRAPH COMMISSIONING',
    desc: 'A complete publisher prospectus written to target university press specifications (Routledge, Oxford, Cambridge, Harvard) to secure publication contracts.',
    turnaround: '7–10 business days',
    price: 'From $480',
    link: '/order?service=book',
    features: [
      'Chapter-by-chapter outline and theoretical synopsis',
      'Market & target audience differentiation analysis',
      'Author credentials & platform positioning',
      'Sample chapter line-editing and polish',
    ],
  },
  {
    id: 'galley-proofs',
    title: 'Galley Proof Review & Errata Check',
    kicker: 'FINAL TYPESET INTEGRITY',
    desc: 'First- and second-pass review of typeset publisher page proofs before the final print and electronic release, ensuring zero production errors.',
    turnaround: '5–10 business days',
    price: 'Project-based',
    link: '/order?service=book',
    features: [
      'Detection of typesetting errors, font glitches, and bad line breaks',
      'Figure placement and caption cross-check against references',
      'Resolution of copyeditor queries without disrupting page geometry',
      'Formal errata memo for university press production editors',
    ],
  },
  {
    id: 'back-of-book-index',
    title: 'Back-of-Book Subject & Author Indexing',
    kicker: 'PRESS-READY CINDEX/SKY DELIVERY',
    desc: 'Professional multi-level index built in specialized indexing software according to academic press guidelines (Oxford, Cambridge, Routledge).',
    turnaround: '10–14 business days',
    price: 'From $3 / typeset page',
    link: '/order?service=book',
    features: [
      'Subject index, author index, or combined thematic index',
      'Complex sub-entries and cross-references (See / See also)',
      'Adherence to publisher style guides and space allocations',
      'Delivered in press-ready Word, RTF, or plain text format',
    ],
  },
  {
    id: 'integrity-audit',
    title: 'Pre-Submission AI & Citation Audit',
    kicker: '200M+ PAPER INTEGRITY SCAN',
    desc: 'Comprehensive reference integrity audit benchmarked against 200M+ academic papers. Catches hallucinated DOIs, retracted citations, and formatting discrepancies.',
    turnaround: '24–48 hours',
    price: '$29 Single / $69 Bundle',
    link: '/order?service=ai-audit',
    features: [
      'Verification of inline citations against CrossRef records',
      'Detection of retracted or fabricated literature entries',
      '1-Page Executive Faculty Risk Memo',
      '100% fee credited toward full Word Track-Changes editing',
    ],
  },
]

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'Do I need editing before using Publication Support?',
    a: 'For Journal Articles — yes, ideally. Journals reject for language and structure as well as scope. We recommend completing our Editing & Compliance service first so your submission package represents your best scholarly work. For Book Manuscripts — publisher selection and proposal can happen before full manuscript editing, since the proposal is what gets the book commissioned.',
  },
  {
    q: 'What is the difference between Journal Articles and Book Manuscripts support?',
    a: 'Journal Articles support is focused on peer-reviewed journal acceptance — selection, formatting, cover letters, and reviewer rebuttal matrices. Book Manuscripts support covers the monograph pipeline — finding the right academic press, writing the proposal, reviewing galley proofs, and indexing. Both live under Publication Support with a single point of contact.',
  },
  {
    q: 'How long does journal selection take?',
    a: 'We deliver a ranked journal recommendation report within 5 to 7 days. The report includes scope fit analysis, impact factor, typical review turnaround, rejection rates, and open-access requirements for each recommended journal.',
  },
  {
    q: 'What happens if my paper is rejected a second time?',
    a: 'Under the Pro tier, resubmission formatting for a second journal is included. Under Full, resubmission formatting is unlimited across as many target journals as needed until your paper finds its home.',
  },
  {
    q: 'Do you handle the submission to the journal on my behalf?',
    a: 'Yes — under the Full tier, we handle portal upload and form completion on your behalf. Under Essentials and Pro, we prepare the complete submission-ready package and you make the final upload.',
  },
  {
    q: 'Is my manuscript kept confidential?',
    a: 'Yes. All manuscripts and research materials are handled under strict NDA. No content is shared beyond the doctoral team assigned to your project, and no generative AI rewriting tools are used on your manuscript.',
  },
]

// ─── PAGE COMPONENT ──────────────────────────────────────────────────────────

function PublicationSupportPageInner() {
  const theme = useMantineTheme()
  const active = {
    primary: theme.other.primary || '#1a1a1a',
    accent: theme.other.accent || '#E65C38',
    surface: theme.other.surface || '#F5F5F5',
    background: theme.other.background || '#FFFFFF',
  }

  const searchParams = useSearchParams()
  const initialTab = searchParams.get('tab') || searchParams.get('section') || 'overview'
  const validTabs = ['overview', 'journal', 'book', 'compare', 'specialized']
  const [currentTab, setCurrentTab] = useState<string>(validTabs.includes(initialTab) ? initialTab : 'overview')

  const [activeJournalTier, setActiveJournalTier] = useState<string>('pro')
  const [activeBookStage, setActiveBookStage] = useState<number>(0)

  const selectedJournalTier = journalTiers.find((t) => t.id === activeJournalTier) ?? journalTiers[1]
  const selectedStage = bookStages[activeBookStage] ?? bookStages[0]

  const TABS_CONFIG = [
    { id: 'overview', label: 'Overview & Packages' },
    { id: 'journal', label: 'Journal Articles' },
    { id: 'book', label: 'Book Manuscripts (5 Stages)' },
    { id: 'compare', label: 'Compare Journal Packages' },
    { id: 'specialized', label: 'Specialized Submission Tracks', badge: '6 Services' },
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
                Submission &amp; Publication Pipeline
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
                From Submission to Acceptance. We Stay With You.
              </Title>
            </Box>

            <Text size="lg" c="dimmed" lh={1.75} style={{ fontSize: rem(18), maxWidth: '64ch' }}>
              Target journal selection, Author Guidelines formatting, cover letters, and rebuttal matrices for peer-reviewed articles. Publisher selection, book proposals, galley proofs, and indexing for academic monographs.
            </Text>

            {/* Quick Guarantees Bar */}
            <Group gap="xl" wrap="wrap" pt="xs">
              <Group gap="xs" align="center">
                <IconCheck size={18} color={active.accent} />
                <Text size="sm" fw={600} c={active.primary}>Firm Price Within 24h</Text>
              </Group>
              <Group gap="xs" align="center">
                <IconCheck size={18} color={active.accent} />
                <Text size="sm" fw={600} c={active.primary}>Strict NDA &amp; Data Security</Text>
              </Group>
              <Group gap="xs" align="center">
                <IconCheck size={18} color={active.accent} />
                <Text size="sm" fw={600} c={active.primary}>Direct Faculty Debrief Available</Text>
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
              const isSpecial = tab.id === 'specialized'
              return (
                <UnstyledButton
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  style={{
                    padding: `${rem(10)} ${rem(18)}`,
                    backgroundColor: isActive
                      ? active.primary
                      : isSpecial
                      ? `${active.accent}10`
                      : 'transparent',
                    color: isActive ? '#ffffff' : isSpecial ? active.accent : active.primary,
                    border: `1px solid ${
                      isActive
                        ? active.primary
                        : isSpecial
                        ? `${active.accent}40`
                        : `${active.primary}18`
                    }`,
                    fontWeight: isActive || isSpecial ? 700 : 500,
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

      {/* ── TAB 1: OVERVIEW & PACKAGES ── */}
      {currentTab === 'overview' && (
        <Box>
          {/* Dual Publication Pathways */}
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
                    Publication Pipelines
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
                    Two distinct publication tracks. One dedicated team.
                  </Title>
                  <Text size="md" c="dimmed" mt="sm" lh={1.7}>
                    Select your publication format below to explore tiered packages, stage deliverables, or jump directly to comparison.
                  </Text>
                </Box>

                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                  {/* Track 1: Journal Articles */}
                  <Box
                    p={{ base: rem(28), md: rem(40) }}
                    bg={active.background}
                    style={{
                      border: `1px solid ${active.primary}18`,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
                    }}
                  >
                    <Box>
                      <Group gap="xs" align="center" mb="xs">
                        <IconFileText size={20} color={active.accent} />
                        <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                          Peer-Reviewed Journals
                        </Text>
                      </Group>
                      <Title
                        order={3}
                        style={{
                          fontSize: rem(24),
                          fontFamily: 'var(--font-display), var(--font-serif)',
                          fontWeight: 600,
                          color: active.primary,
                        }}
                      >
                        Journal Article Support Packages
                      </Title>
                      <Text size="sm" c="dimmed" mt="xs" lh={1.65}>
                        Comprehensive submission readiness: target journal selection, author guidelines formatting, cover letters, and unlimited reviewer response matrices.
                      </Text>

                      <Divider color={`${active.primary}10`} my="md" />

                      <Stack gap={rem(10)}>
                        <Text size="xs" fw={700} c={active.primary} style={{ letterSpacing: '0.08em' }}>
                          AVAILABLE TIERS:
                        </Text>
                        {journalTiers.map((tier) => (
                          <Group key={tier.id} justify="space-between" align="center" p={rem(10)} bg={active.surface} style={{ border: `1px solid ${active.primary}08` }}>
                            <Box>
                              <Group gap="xs">
                                <Text size="sm" fw={700} c={active.primary}>{tier.name}</Text>
                                {tier.isPopular && <Badge size="xs" radius={0} color="orange">POPULAR</Badge>}
                              </Group>
                              <Text size="xs" c="dimmed">{tier.tagline}</Text>
                            </Box>
                            <Text size="xs" fw={700} c={active.accent}>{tier.price}</Text>
                          </Group>
                        ))}
                      </Stack>
                    </Box>

                    <Box pt="xl">
                      <Button
                        fullWidth
                        radius={0}
                        style={{
                          backgroundColor: active.primary,
                          color: '#ffffff',
                          fontFamily: 'var(--font-heading-sans)',
                          letterSpacing: '0.04em',
                          fontWeight: 600,
                          height: rem(46),
                        }}
                        rightSection={<IconArrowRight size={16} />}
                        onClick={() => handleTabChange('journal')}
                      >
                        Explore Journal Packages →
                      </Button>
                    </Box>
                  </Box>

                  {/* Track 2: Book Manuscripts */}
                  <Box
                    p={{ base: rem(28), md: rem(40) }}
                    bg={active.background}
                    style={{
                      border: `1px solid ${active.primary}18`,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
                    }}
                  >
                    <Box>
                      <Group gap="xs" align="center" mb="xs">
                        <IconBooks size={20} color={active.accent} />
                        <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                          University Press Books
                        </Text>
                      </Group>
                      <Title
                        order={3}
                        style={{
                          fontSize: rem(24),
                          fontFamily: 'var(--font-display), var(--font-serif)',
                          fontWeight: 600,
                          color: active.primary,
                        }}
                      >
                        Academic Book Publishing (5 Stages)
                      </Title>
                      <Text size="sm" c="dimmed" mt="xs" lh={1.65}>
                        From acquisition proposal to back-of-book indexing. Tailored for monographs submitted to Routledge, Oxford, Cambridge, and leading university presses.
                      </Text>

                      <Divider color={`${active.primary}10`} my="md" />

                      <Stack gap={rem(8)}>
                        <Text size="xs" fw={700} c={active.primary} style={{ letterSpacing: '0.08em' }}>
                          THE 5 STAGES OF BOOK PUBLISHING:
                        </Text>
                        {bookStages.map((stage) => (
                          <Group key={stage.step} justify="space-between" align="center" p={rem(8)} bg={active.surface} style={{ border: `1px solid ${active.primary}08` }}>
                            <Group gap="xs">
                              <Text size="xs" fw={700} c={active.accent}>STAGE {stage.step}</Text>
                              <Text size="xs" fw={600} c={active.primary}>{stage.title}</Text>
                            </Group>
                            <Text size="xs" c="dimmed">{stage.price}</Text>
                          </Group>
                        ))}
                      </Stack>
                    </Box>

                    <Box pt="xl">
                      <Button
                        fullWidth
                        radius={0}
                        style={{
                          backgroundColor: active.accent,
                          color: '#ffffff',
                          fontFamily: 'var(--font-heading-sans)',
                          letterSpacing: '0.04em',
                          fontWeight: 600,
                          height: rem(46),
                        }}
                        rightSection={<IconArrowRight size={16} />}
                        onClick={() => handleTabChange('book')}
                      >
                        Explore Book Publishing Stages →
                      </Button>
                    </Box>
                  </Box>
                </SimpleGrid>
              </Stack>
            </Container>
          </Box>

          {/* Academic Rigor & Faculty Mentorship Reassurance */}
          <Box component="section" py={SECTION_SPACING} bg={active.background}>
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
                    Faculty Collaboration &amp; Submission Rigor
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
                    Why Human Editorial Guidance Drives Publication Success.
                  </Title>
                  <Text size="md" c="dimmed" mt="sm" lh={1.75}>
                    Automated templates can check margins, but getting published requires strategic journal positioning, persuasive cover letters, and constructive rebuttal diplomacy.
                  </Text>
                </Box>

                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                  {/* Column 1: Submission Roadblocks We Solve */}
                  <Box
                    p={{ base: rem(28), md: rem(36) }}
                    bg={active.surface}
                    style={{ border: `1px solid ${active.primary}18` }}
                  >
                    <Group gap="xs" align="center" mb="md">
                      <IconAlertTriangle size={20} color={active.accent} />
                      <Text size="sm" fw={700} c={active.primary} style={{ letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        Common Submission Roadblocks We Solve
                      </Text>
                    </Group>
                    <Stack gap="md">
                      {[
                        {
                          title: 'Desk Rejections from Aims & Scope Mismatch',
                          desc: 'Over 60% of rejections occur before peer review because papers are sent to journals whose editorial priorities do not align with the study.',
                        },
                        {
                          title: 'Incomplete Author Guidelines Compliance',
                          desc: 'Disclosures, blinded manuscript criteria, word limits, and front-matter requirements that cause immediate administrative return.',
                        },
                        {
                          title: 'Reactive or Contentious Reviewer Rebuttals',
                          desc: 'Anxious responses to peer critique that create friction with editors instead of systematically demonstrating how revisions satisfy their concerns.',
                        },
                        {
                          title: 'Unstandardized Book Monograph Proposals',
                          desc: 'Submitting chapter drafts instead of the commercial, audience-focused prospectus required by university press acquisition editors.',
                        },
                      ].map((item, idx) => (
                        <Box key={idx} pl="md" style={{ borderLeft: `2px solid ${active.primary}20` }}>
                          <Text size="sm" fw={700} c={active.primary}>{item.title}</Text>
                          <Text size="xs" c="dimmed" mt={2} lh={1.5}>{item.desc}</Text>
                        </Box>
                      ))}
                    </Stack>
                  </Box>

                  {/* Column 2: What Our Senior Specialists Deliver */}
                  <Box
                    p={{ base: rem(28), md: rem(36) }}
                    bg={active.surface}
                    style={{ border: `1px solid ${active.accent}` }}
                  >
                    <Group gap="xs" align="center" mb="md">
                      <IconSparkles size={20} color={active.accent} />
                      <Text size="sm" fw={700} c={active.accent} style={{ letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        What Our Senior Specialists Deliver
                      </Text>
                    </Group>
                    <Stack gap="md">
                      {[
                        {
                          title: 'Ranked Target Journal Strategy',
                          desc: 'Curated 3 to 5 ranked journals evaluated for scope match, impact factor, turnaround velocity, and acceptance criteria.',
                        },
                        {
                          title: 'Author Guidelines & Blinded Review Compliance',
                          desc: 'Exacting formatting of headings, citations, tables, and front-matter statements to satisfy submission portal requirements.',
                        },
                        {
                          title: 'Diplomatic Reviewer Response Matrices',
                          desc: 'Point-by-point rebuttal tables that respectfully address reviewer comments with precise manuscript cross-references.',
                        },
                        {
                          title: 'Ongoing Support Across Revision Iterations',
                          desc: 'We stay with you through rejection and resubmission, reformatting and updating responses until your research finds its home.',
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

      {/* ── TAB 2: JOURNAL ARTICLES ── */}
      {currentTab === 'journal' && (
        <Box component="section" py={SECTION_SPACING} bg={active.surface}>
          <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
            <Stack gap={rem(48)}>
              <Box>
                <Text
                  size="xs"
                  fw={700}
                  c={active.accent}
                  style={{
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                  }}
                >
                  FOR JOURNAL ARTICLES
                </Text>
                <Title
                  order={2}
                  style={{
                    fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 600,
                    lineHeight: 1.15,
                    color: active.primary,
                    letterSpacing: '-0.015em',
                  }}
                >
                  Get your paper in front of the right editors.
                </Title>
                <Text size="md" c="dimmed" mt="md" lh={1.75} style={{ maxWidth: '62ch' }}>
                  Most desk rejections have nothing to do with research quality. Wrong journal, missing disclosures, weak cover letters, formatting errors &mdash; we eliminate these administrative hurdles before your manuscript reaches an editor.
                </Text>
              </Box>

              {/* Tier selector tabs */}
              <Box>
                <Group gap={0} style={{ borderBottom: `2px solid ${active.primary}10` }}>
                  {journalTiers.map((tier) => (
                    <Box
                      key={tier.id}
                      onClick={() => setActiveJournalTier(tier.id)}
                      px={rem(28)}
                      py={rem(16)}
                      style={{
                        cursor: 'pointer',
                        borderBottom: activeJournalTier === tier.id
                          ? `2px solid ${active.accent}`
                          : '2px solid transparent',
                        marginBottom: rem(-2),
                        position: 'relative',
                      }}
                    >
                      <Group gap={rem(8)} align="center">
                        <Text
                          fw={activeJournalTier === tier.id ? 700 : 500}
                          size="sm"
                          style={{
                            color: activeJournalTier === tier.id ? active.primary : '#888',
                            fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                            letterSpacing: '0.02em',
                            transition: 'color 0.2s ease',
                          }}
                        >
                          {tier.name}
                        </Text>
                        {tier.isPopular && (
                          <Badge
                            size="xs"
                            radius={0}
                            style={{
                              backgroundColor: active.accent,
                              color: '#fff',
                              fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                              letterSpacing: '0.08em',
                            }}
                          >
                            POPULAR
                          </Badge>
                        )}
                      </Group>
                    </Box>
                  ))}
                </Group>

                {/* Tier detail panel */}
                <Box
                  p={{ base: rem(28), md: rem(44) }}
                  style={{
                    border: `1px solid ${active.primary}12`,
                    borderTop: 'none',
                    backgroundColor: active.background,
                  }}
                >
                  <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(48)}>
                    {/* Left col */}
                    <Stack gap={rem(24)}>
                      <Box>
                        <Text
                          size="xs"
                          fw={700}
                          mb={rem(6)}
                          style={{
                            letterSpacing: '0.12em',
                            color: active.accent,
                            fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                          }}
                        >
                          {selectedJournalTier.badge}
                        </Text>
                        <Title
                          order={3}
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'clamp(1.4rem, 2.4vw, 1.75rem)',
                            fontWeight: 600,
                            color: active.primary,
                            lineHeight: 1.2,
                          }}
                        >
                          {selectedJournalTier.tagline}
                        </Title>
                      </Box>

                      <SimpleGrid cols={2} spacing={rem(16)}>
                        {[
                          { label: 'Starting from', val: selectedJournalTier.price },
                          { label: 'Turnaround', val: selectedJournalTier.turnaround },
                        ].map((s) => (
                          <Box key={s.label} p={rem(16)} bg={active.surface} style={{ border: `1px solid ${active.primary}10` }}>
                            <Text size="xs" c="dimmed" mb={rem(4)} style={{ fontFamily: 'var(--font-heading-sans), var(--font-sans)', letterSpacing: '0.08em' }}>
                              {s.label}
                            </Text>
                            <Text fw={700} size="lg" c={active.primary} style={{ fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                              {s.val}
                            </Text>
                          </Box>
                        ))}
                      </SimpleGrid>

                      <Box>
                        <Text size="xs" fw={700} mb={rem(8)} style={{ letterSpacing: '0.1em', color: '#888', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                          BEST FOR
                        </Text>
                        <Text size="sm" c="dimmed" lh={1.7}>
                          {selectedJournalTier.bestFor}
                        </Text>
                      </Box>

                      <Box>
                        <Text size="xs" fw={700} mb={rem(10)} style={{ letterSpacing: '0.1em', color: '#888', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                          DELIVERABLES
                        </Text>
                        <Stack gap={rem(6)}>
                          {selectedJournalTier.deliverables.map((d, i) => (
                            <Group key={i} gap={rem(8)} align="flex-start" wrap="nowrap">
                              <IconCheck size={14} color={active.accent} style={{ flexShrink: 0, marginTop: rem(3) }} />
                              <Text size="sm" c="dimmed" lh={1.6}>{d}</Text>
                            </Group>
                          ))}
                        </Stack>
                      </Box>

                      <Link href={`/order?service=publication&section=journal&tier=${selectedJournalTier.id}`} style={{ textDecoration: 'none' }}>
                        <Button
                          size="md"
                          radius={0}
                          rightSection={<IconArrowRight size={16} />}
                          style={{
                            backgroundColor: active.accent,
                            fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                            letterSpacing: '0.04em',
                            maxWidth: '100%',
                            height: rem(48),
                            fontWeight: 700,
                          }}
                        >
                          Select {selectedJournalTier.name}
                        </Button>
                      </Link>
                    </Stack>

                    {/* Right col — features */}
                    <Stack gap={rem(8)}>
                      <Text size="xs" fw={700} mb={rem(4)} style={{ letterSpacing: '0.1em', color: '#888', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                        WHAT&apos;S INCLUDED
                      </Text>
                      {selectedJournalTier.features.map((f, i) => (
                        <Group key={i} gap={rem(12)} align="flex-start" wrap="nowrap" py={rem(10)} style={{ borderBottom: `1px solid ${active.primary}08` }}>
                          <IconCheck size={15} color={active.accent} style={{ flexShrink: 0, marginTop: rem(2) }} />
                          <Text size="sm" lh={1.65} c={active.primary}>{f}</Text>
                        </Group>
                      ))}
                    </Stack>
                  </SimpleGrid>
                </Box>
              </Box>
            </Stack>
          </Container>
        </Box>
      )}

      {/* ── TAB 3: BOOK MANUSCRIPTS ── */}
      {currentTab === 'book' && (
        <Box component="section" py={SECTION_SPACING} bg={active.surface}>
          <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
            <Stack gap={rem(56)}>
              <Box>
                <Text
                  size="xs"
                  fw={700}
                  c={active.accent}
                  style={{
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                  }}
                >
                  FOR BOOK MANUSCRIPTS
                </Text>
                <Title
                  order={2}
                  style={{
                    fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 600,
                    lineHeight: 1.15,
                    color: active.primary,
                    letterSpacing: '-0.015em',
                  }}
                >
                  From proposal to press. One team, every stage.
                </Title>
                <Text size="md" c="dimmed" mt="md" lh={1.75} style={{ maxWidth: '62ch' }}>
                  Book publication moves in distinct stages, not a single upload. Pick the stage you need now. We work directly with major academic presses — Routledge, Oxford, SAGE, Cambridge, Michigan, Cornell.
                </Text>
              </Box>

              {/* Stage tab buttons */}
              <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }} spacing={rem(2)}>
                {bookStages.map((stage, i) => (
                  <UnstyledButton
                    key={i}
                    onClick={() => setActiveBookStage(i)}
                    p={rem(20)}
                    style={{
                      backgroundColor: activeBookStage === i ? active.background : 'transparent',
                      borderBottom: activeBookStage === i
                        ? `3px solid ${active.accent}`
                        : `3px solid transparent`,
                      borderTop: `1px solid ${active.primary}10`,
                      borderLeft: `1px solid ${active.primary}10`,
                      borderRight: `1px solid ${active.primary}10`,
                      transition: 'background-color 0.2s ease',
                      textAlign: 'left',
                    }}
                  >
                    <Text
                      size="xs"
                      fw={700}
                      mb={rem(4)}
                      style={{
                        color: activeBookStage === i ? active.accent : '#aaa',
                        letterSpacing: '0.12em',
                        fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {stage.step}
                    </Text>
                    <Text
                      size="sm"
                      fw={activeBookStage === i ? 700 : 500}
                      style={{
                        color: activeBookStage === i ? active.primary : '#666',
                        fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                        lineHeight: 1.35,
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {stage.title}
                    </Text>
                  </UnstyledButton>
                ))}
              </SimpleGrid>

              {/* Stage detail panel */}
              <Box
                p={{ base: rem(28), md: rem(44) }}
                bg={active.background}
                style={{ border: `1px solid ${active.primary}10` }}
              >
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(56)}>
                  {/* Left col */}
                  <Stack gap={rem(28)}>
                    <Box>
                      <Text
                        size="xs"
                        fw={700}
                        mb={rem(6)}
                        style={{
                          color: active.accent,
                          letterSpacing: '0.12em',
                          fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                        }}
                      >
                        STAGE {selectedStage.step}
                      </Text>
                      <Title
                        order={3}
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
                          fontWeight: 600,
                          color: active.primary,
                          lineHeight: 1.2,
                        }}
                      >
                        {selectedStage.title}
                      </Title>
                      <Text size="md" c="dimmed" mt={rem(8)} lh={1.7}>
                        {selectedStage.desc}
                      </Text>
                    </Box>

                    <SimpleGrid cols={2} spacing={rem(16)}>
                      {[
                        { label: 'Pricing', val: selectedStage.price },
                        { label: 'Turnaround', val: selectedStage.turnaround },
                      ].map((s) => (
                        <Box key={s.label} p={rem(16)} bg={active.surface} style={{ border: `1px solid ${active.primary}08` }}>
                          <Text size="xs" c="dimmed" mb={rem(4)} style={{ fontFamily: 'var(--font-heading-sans), var(--font-sans)', letterSpacing: '0.08em' }}>
                            {s.label}
                          </Text>
                          <Text fw={700} size="md" c={active.primary} style={{ fontFamily: 'var(--font-heading-sans), var(--font-sans)', lineHeight: 1.3 }}>
                            {s.val}
                          </Text>
                        </Box>
                      ))}
                    </SimpleGrid>

                    <Link href={`/order?service=publication&section=book&stage=${selectedStage.step}`} style={{ textDecoration: 'none' }}>
                      <Button
                        size="md"
                        radius={0}
                        rightSection={<IconArrowRight size={16} />}
                        style={{
                          backgroundColor: active.accent,
                          fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                          letterSpacing: '0.04em',
                          maxWidth: '100%',
                          height: rem(48),
                          fontWeight: 700,
                        }}
                      >
                        Select Stage {selectedStage.step}
                      </Button>
                    </Link>
                  </Stack>

                  {/* Right col — includes */}
                  <Stack gap={rem(8)}>
                    <Text size="xs" fw={700} mb={rem(4)} style={{ letterSpacing: '0.1em', color: '#888', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                      WHAT&apos;S INCLUDED
                    </Text>
                    {selectedStage.includes.map((item, i) => (
                      <Group key={i} gap={rem(12)} align="flex-start" wrap="nowrap" py={rem(10)} style={{ borderBottom: `1px solid ${active.primary}08` }}>
                        <IconCheck size={15} color={active.accent} style={{ flexShrink: 0, marginTop: rem(2) }} />
                        <Text size="sm" lh={1.65} c={active.primary}>{item}</Text>
                      </Group>
                    ))}

                    {/* Stage navigation hint */}
                    <Group gap={rem(8)} mt={rem(16)} wrap="nowrap">
                      {activeBookStage > 0 && (
                        <UnstyledButton
                          onClick={() => setActiveBookStage(activeBookStage - 1)}
                          style={{
                            fontSize: rem(13),
                            color: '#888',
                            fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                            letterSpacing: '0.04em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: rem(4),
                          }}
                        >
                          ← Stage {bookStages[activeBookStage - 1]?.step}
                        </UnstyledButton>
                      )}
                      {activeBookStage < bookStages.length - 1 && (
                        <UnstyledButton
                          onClick={() => setActiveBookStage(activeBookStage + 1)}
                          style={{
                            fontSize: rem(13),
                            color: active.accent,
                            fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                            letterSpacing: '0.04em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: rem(4),
                            marginLeft: 'auto',
                          }}
                        >
                          Stage {bookStages[activeBookStage + 1]?.step}
                          <IconArrowRight size={14} />
                        </UnstyledButton>
                      )}
                    </Group>
                  </Stack>
                </SimpleGrid>
              </Box>
            </Stack>
          </Container>
        </Box>
      )}

      {/* ── TAB 4: COMPARE JOURNAL PACKAGES ── */}
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
                  Side-by-side comparison of journal publication packages.
                </Title>
                <Text size="md" c="dimmed" mt="sm" lh={1.7}>
                  Detailed breakdown of deliverables, revision rounds, journal selection, and portal submission support.
                </Text>
              </Box>

              <Box style={{ overflowX: 'auto', maxWidth: '100%', WebkitOverflowScrolling: 'touch', border: `1px solid ${active.primary}18` }}>
                <Table verticalSpacing="md" horizontalSpacing="lg" highlightOnHover style={{ minWidth: 720 }}>
                  <Table.Thead bg={active.surface}>
                    <Table.Tr>
                      <Table.Th style={{ width: '40%', fontSize: rem(13), fontFamily: 'var(--font-heading-sans)', color: active.primary }}>
                        PUBLICATION SERVICE &amp; DELIVERABLE
                      </Table.Th>
                      <Table.Th style={{ width: '20%', textAlign: 'center', fontSize: rem(13), fontFamily: 'var(--font-heading-sans)', color: active.primary }}>
                        ESSENTIALS<br /><span style={{ fontSize: rem(11), color: '#888' }}>From $320</span>
                      </Table.Th>
                      <Table.Th style={{ width: '20%', textAlign: 'center', fontSize: rem(13), fontFamily: 'var(--font-heading-sans)', color: active.accent, backgroundColor: `${active.accent}08` }}>
                        PRO ★<br /><span style={{ fontSize: rem(11), color: active.accent }}>From $560</span>
                      </Table.Th>
                      <Table.Th style={{ width: '20%', textAlign: 'center', fontSize: rem(13), fontFamily: 'var(--font-heading-sans)', color: active.primary }}>
                        FULL<br /><span style={{ fontSize: rem(11), color: '#888' }}>From $900</span>
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {journalComparisonMatrix.map((row, rIdx) => (
                      <Table.Tr key={rIdx}>
                        <Table.Td style={{ fontWeight: 500, fontSize: rem(13), color: active.primary }}>
                          {row.feature}
                        </Table.Td>
                        <Table.Td style={{ textAlign: 'center' }}>
                          {row.essentials ? <IconCheck size={18} color={active.accent} /> : <IconX size={16} color="#bbb" />}
                        </Table.Td>
                        <Table.Td style={{ textAlign: 'center', backgroundColor: `${active.accent}04` }}>
                          {row.pro ? <IconCheck size={18} color={active.accent} /> : <IconX size={16} color="#bbb" />}
                        </Table.Td>
                        <Table.Td style={{ textAlign: 'center' }}>
                          {row.full ? <IconCheck size={18} color={active.accent} /> : <IconX size={16} color="#bbb" />}
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Box>

              {/* Bottom Quick Action Bar */}
              <Group justify="center" gap="md" wrap="wrap" pt="md">
                <Link href="/order?service=publication&section=journal&tier=essentials" style={{ textDecoration: 'none' }}>
                  <Button variant="outline" radius={0} style={{ borderColor: active.primary, color: active.primary, height: rem(46) }}>
                    Select Essentials ($320)
                  </Button>
                </Link>
                <Link href="/order?service=publication&section=journal&tier=pro" style={{ textDecoration: 'none' }}>
                  <Button radius={0} style={{ backgroundColor: active.accent, color: '#fff', height: rem(46), fontWeight: 700 }}>
                    Select Pro ($560) ★
                  </Button>
                </Link>
                <Link href="/order?service=publication&section=journal&tier=full" style={{ textDecoration: 'none' }}>
                  <Button variant="outline" radius={0} style={{ borderColor: active.primary, color: active.primary, height: rem(46) }}>
                    Select Full ($900)
                  </Button>
                </Link>
              </Group>
            </Stack>
          </Container>
        </Box>
      )}

      {/* ── TAB 5: SPECIALIZED SUBMISSION TRACKS ── */}
      {currentTab === 'specialized' && (
        <Box component="section" py={SECTION_SPACING} bg={active.surface}>
          <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
            <Stack gap={rem(48)}>
              <Box style={{ maxWidth: 840 }}>
                <Badge radius={0} variant="filled" style={{ backgroundColor: active.accent, color: '#ffffff', marginBottom: rem(12) }}>
                  SPECIALIZED SUBMISSION TRACKS
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
                  Targeted publication interventions for specific submission milestones.
                </Title>
                <Text size="md" c="dimmed" mt="sm" lh={1.7}>
                  Modular publication support for scholars with specific technical hurdles — from Author Guidelines desk compliance to galley proofs and peer reviewer rebuttal matrices.
                </Text>
              </Box>

              <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg">
                {specializedServices.map((srv) => (
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
                        {srv.features.map((feat, fIdx) => (
                          <Group key={fIdx} gap="xs" align="flex-start" wrap="nowrap">
                            <IconCheck size={14} color={active.accent} style={{ flexShrink: 0, marginTop: rem(2) }} />
                            <Text size="xs" c={active.primary} lh={1.4}>
                              {feat}
                            </Text>
                          </Group>
                        ))}
                      </Stack>
                    </Box>

                    <Box pt="sm">
                      <Group justify="space-between" align="center" mb="sm">
                        <Text size="xs" fw={700} c={active.accent}>
                          {srv.price}
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
                          Select Service
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
          <Box mb={rem(52)}>
            <Text
              size="xs"
              fw={700}
              mb="xs"
              style={{
                letterSpacing: '0.16em',
                color: active.accent,
                fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                textTransform: 'uppercase',
              }}
            >
              HOW IT WORKS
            </Text>
            <Title
              order={2}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.8rem, 3.4vw, 2.4rem)',
                fontWeight: 600,
                color: active.primary,
                lineHeight: 1.2,
                letterSpacing: '-0.015em',
              }}
            >
              Simple and transparent from submission to acceptance.
            </Title>
          </Box>

          <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(2)}>
            {[
              {
                num: '01',
                title: 'Share your draft and target press',
                desc: 'Upload your manuscript (.docx). Specify your stage — journal selection, author guidelines reformatting, or response to reviewers. No discovery call required.',
              },
              {
                num: '02',
                title: 'Clear scope and fixed 24h quote',
                desc: 'Within 24 hours, our managing editors evaluate your submission requirements and return a firm quote and delivery schedule. No hidden fees.',
              },
              {
                num: '03',
                title: 'Tracked delivery and revision cover',
                desc: 'Receive your reformatted manuscript, cover letter, and response matrices. Under Pro and Full, we stay with your paper through reviewer revision rounds.',
              },
            ].map((step, i) => (
              <Box
                key={i}
                p={{ base: rem(28), md: rem(36) }}
                bg={active.surface}
                style={{ borderLeft: i > 0 ? `1px solid ${active.primary}10` : undefined }}
              >
                <Text
                  fw={700}
                  mb={rem(16)}
                  style={{
                    fontSize: rem(36),
                    color: `${active.primary}15`,
                    fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                    lineHeight: 1,
                  }}
                >
                  {step.num}
                </Text>
                <Title
                  order={3}
                  mb={rem(10)}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: rem(19),
                    fontWeight: 600,
                    color: active.primary,
                    lineHeight: 1.25,
                  }}
                >
                  {step.title}
                </Title>
                <Text size="sm" c="dimmed" lh={1.7}>
                  {step.desc}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* ── SHARED FAQ ─────────────────────────────────────────────────── */}
      <Box component="section" py={SECTION_SPACING} bg={active.surface}>
        <Container size={800} px={{ base: 'md', sm: 'xl' }}>
          <Box mb={rem(52)} ta="center">
            <Text
              size="xs"
              fw={700}
              mb="xs"
              style={{
                letterSpacing: '0.16em',
                color: active.accent,
                fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                textTransform: 'uppercase',
              }}
            >
              FREQUENTLY ASKED
            </Text>
            <Title
              order={2}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.8rem, 3.4vw, 2.4rem)',
                fontWeight: 600,
                color: active.primary,
                lineHeight: 1.2,
                letterSpacing: '-0.015em',
              }}
            >
              Questions about Publication Support
            </Title>
          </Box>

          <Accordion
            variant="separated"
            radius={0}
            styles={{
              item: {
                border: `1px solid ${active.primary}10`,
                marginBottom: rem(6),
                backgroundColor: active.background,
              },
              control: {
                paddingTop: rem(18),
                paddingBottom: rem(18),
              },
              label: {
                fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                fontWeight: 600,
                color: active.primary,
                fontSize: rem(15),
              },
              panel: {
                paddingBottom: rem(20),
              },
            }}
          >
            {faqs.map((faq, i) => (
              <Accordion.Item key={i} value={`faq-${i}`}>
                <Accordion.Control>{faq.q}</Accordion.Control>
                <Accordion.Panel>
                  <Text size="sm" c="dimmed" lh={1.75}>
                    {faq.a}
                  </Text>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Container>
      </Box>

      {/* ── BOTTOM CTA ─────────────────────────────────────────────────── */}
      <Box
        component="section"
        py={rem(80)}
        className="dark-scholar-section"
        data-dark-bg="true"
        style={{ backgroundColor: active.primary }}
      >
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(60)} style={{ alignItems: 'center' }}>
            <Stack gap={rem(16)}>
              <Title
                order={2}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.8rem, 3.4vw, 2.4rem)',
                  color: '#ffffff',
                  fontWeight: 600,
                  lineHeight: 1.2,
                  letterSpacing: '-0.015em',
                }}
              >
                Ready to move your manuscript forward?
              </Title>
              <Text size="md" lh={1.7} style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '48ch' }}>
                Upload your document to receive an exact evaluation, confirmed scope, and firm price within 24 hours.
              </Text>
            </Stack>
            <Group gap={rem(12)} wrap="wrap">
              <Link href="/order?service=publication" style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  radius={0}
                  w={{ base: '100%', sm: 'auto' }}
                  style={{
                    backgroundColor: active.accent,
                    fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                    letterSpacing: '0.04em',
                    fontWeight: 700,
                  }}
                >
                  Submit Your Manuscript
                </Button>
              </Link>
              <Link href="/services/editing-proofreading" style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  radius={0}
                  variant="outline"
                  w={{ base: '100%', sm: 'auto' }}
                  style={{
                    borderColor: 'rgba(255,255,255,0.25)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                    letterSpacing: '0.04em',
                  }}
                >
                  View Editing &amp; Compliance
                </Button>
              </Link>
            </Group>
          </SimpleGrid>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}

export default function PublicationSupportPage() {
  return (
    <Suspense fallback={<Box style={{ minHeight: '100vh' }} />}>
      <PublicationSupportPageInner />
    </Suspense>
  )
}
