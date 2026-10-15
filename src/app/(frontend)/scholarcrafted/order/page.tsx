'use client'

import React, { useState, Suspense } from 'react'
import {
  Container, Title, Text, Box, SimpleGrid, Stack,
  Button, rem, Group, useMantineTheme, UnstyledButton,
  Divider, Table, NumberInput,
} from '@mantine/core'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  IconCheck, IconX, IconArrowLeft, IconArrowRight,
  IconShieldCheck, IconClock, IconFileCheck, IconMinus,
  IconPencil, IconFileText, IconBook2,
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
      'Submission cover letter & abstract packaging',
      'Unlimited complimentary re-editing for 365 days',
      'Editor Advisory Memorandum on thesis defensibility',
    ],
    deliverables: [
      'Tracked Changes document with margin commentary',
      'Publication-ready document formatted to target press',
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
  { feature: 'Editorial Certificate of English Editing', advanced: true, premium: true, scientific: true },
  { feature: 'Substantive paragraph reorganisation & flow', advanced: false, premium: true, scientific: true },
  { feature: 'Reference cross-audit (citations vs bibliography)', advanced: false, premium: true, scientific: true },
  { feature: 'Custom journal cover letter creation', advanced: false, premium: true, scientific: true },
  { feature: 'Unlimited complimentary re-editing', advanced: false, premium: '365 days', scientific: '365 days' },
  { feature: 'Editor Advisory Memorandum', advanced: false, premium: true, scientific: true },
  { feature: 'Scientific completeness & logic review', advanced: false, false: false, scientific: true },
  { feature: 'Peer reviewer critical commentary report', advanced: false, false: false, scientific: true },
  { feature: 'Reviewer response matrix / rebuttal crosscheck', advanced: false, false: false, scientific: true },
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
    subtitle: 'From publisher selection to printed book — coordinated by Micah Dobson.',
    desc: 'Complete end-to-end monograph publishing: publisher ranking, acquisition proposal, manuscript editing, galley proof review, and back-of-book indexing. One point of contact from contract to press.',
    price: 'Custom Scoped Bundle', turnaround: 'Contract to Press',
    isPipeline: true,
    includes: [
      'Publisher ranking report (3–5 matched academic presses)',
      'Acquisition-ready book proposal formatted to target press requirements',
      'Full manuscript line editing to academic press standards',
      'First- and second-pass galley proof review',
      'Professional subject & author index (press-spec delivery)',
      'Coordinated by Micah Dobson — single point of contact throughout',
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function MatrixCell({ val }: { val?: boolean | string }) {
  const theme = useMantineTheme()
  const active = theme.other
  if (val === true) return <IconCheck size={16} color={active.accent} />
  if (val === false || val === undefined) return <IconMinus size={14} color="#ccc" />
  return <Text size="xs" c="dimmed" style={{ fontStyle: 'italic' }}>{val as string}</Text>
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

  const initialService = searchParams.get('service') ?? ''
  const initialSection = searchParams.get('section') ?? ''
  const hlTier         = searchParams.get('tier') ?? ''
  const hlStage        = searchParams.get('stage') ?? ''

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
      shortLabel: 'English Editing',
      icon: <IconPencil size={18} />,
      badge: '3 Tiers',
      sub: 'Per-word pricing',
    },
    {
      id: 'journal' as const,
      label: 'Journal Publication Support',
      shortLabel: 'Journal Support',
      icon: <IconFileText size={18} />,
      badge: '3 Packages',
      sub: 'Flat-fee packages',
    },
    {
      id: 'book' as const,
      label: 'Book Manuscript Publishing',
      shortLabel: 'Book Publishing',
      icon: <IconBook2 size={18} />,
      badge: '5 Stages',
      sub: 'Per-stage or pipeline',
    },
  ]

  return (
    <Box bg={active.background} style={{ minHeight: '100vh' }}>
      <Navbar />

      {/* Hero Header with Service Tabs (inspired by Editage compare screen) */}
      <Box pt={{ base: rem(100), md: rem(130) }} pb={rem(40)} bg={active.background} style={{ borderBottom: `1px solid ${active.primary}10` }}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.2em', fontFamily: 'var(--font-heading-sans), var(--font-sans)', marginBottom: rem(8) }}>
            COMPARE & SELECT A SERVICE
          </Text>
          <Title order={1} style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontFamily: 'var(--font-display), var(--font-serif)', fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.02em', color: active.primary }}>
            Compare and select your editorial service
          </Title>
          <Text size="md" c="dimmed" mt="xs" mb={rem(32)} lh={1.7} style={{ maxWidth: '64ch' }}>
            Choose a service track below to compare plans, turnarounds, and deliverables. Select any plan to proceed directly to instant document upload.
          </Text>

          {/* ── Single-Line Horizontal Service Tabs ───────────────────────────── */}
          <Box
            style={{
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              paddingBottom: rem(6),
            }}
          >
            <Group gap={rem(10)} wrap="nowrap" style={{ minWidth: 'max-content' }}>
              {TABS.map((tab) => {
                const isCurrent = activeTab === tab.id
                return (
                  <UnstyledButton
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    px={rem(20)}
                    py={rem(13)}
                    data-dark-bg={isCurrent ? 'true' : undefined}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: rem(12),
                      backgroundColor: isCurrent ? active.primary : active.surface,
                      color: isCurrent ? '#ffffff' : active.primary,
                      border: `1px solid ${isCurrent ? active.primary : `${active.primary}18`}`,
                      borderRadius: 0,
                      fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                      fontWeight: isCurrent ? 700 : 600,
                      fontSize: rem(14),
                      transition: 'all 0.18s ease',
                      boxShadow: isCurrent ? `0 6px 20px ${active.primary}18` : 'none',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  >
                    <Box style={{ color: isCurrent ? active.accent : active.accent, display: 'flex' }}>
                      {tab.icon}
                    </Box>
                    <Box>
                      <Text size="sm" fw={isCurrent ? 700 : 600} c={isCurrent ? '#ffffff' : active.primary} style={{ color: isCurrent ? '#ffffff !important' : active.primary, lineHeight: 1.2 }}>
                        {tab.label}
                      </Text>
                      <Text size="xs" c={isCurrent ? 'rgba(255,255,255,0.85)' : '#888'} style={{ color: isCurrent ? 'rgba(255,255,255,0.85) !important' : '#888', marginTop: rem(2) }}>
                        {tab.sub}
                      </Text>
                    </Box>
                    <Box
                      px={rem(8)}
                      py={rem(3)}
                      style={{
                        backgroundColor: isCurrent ? 'rgba(255,255,255,0.22)' : `${active.primary}08`,
                        fontSize: rem(11),
                        fontWeight: 700,
                        color: isCurrent ? '#ffffff' : '#666',
                        marginLeft: rem(4),
                      }}
                    >
                      <Text size="xs" fw={700} c={isCurrent ? '#ffffff' : '#666'} style={{ color: isCurrent ? '#ffffff !important' : '#666' }}>
                        {tab.badge}
                      </Text>
                    </Box>
                  </UnstyledButton>
                )
              })}
            </Group>
          </Box>
        </Container>
      </Box>

      {/* ── Active Tab View ──────────────────────────────────────────────────── */}
      {activeTab === 'editing' && (
        <EditingTabBody
          active={active}
          hlTier={hlTier}
          calcWords={calcWords}
          setCalcWords={setCalcWords}
        />
      )}

      {activeTab === 'journal' && (
        <JournalTabBody
          active={active}
          hlTier={hlTier}
        />
      )}

      {activeTab === 'book' && (
        <BookTabBody
          active={active}
          hlStage={hlStage}
        />
      )}

      {activeTab === 'ai-audit' && (
        <AiAuditTabBody
          active={active}
          hlTier={hlTier}
        />
      )}

      {/* ── Shared Payment Terms & Trust ─────────────────────────────────────── */}
      <Box py={SECTION_SPACING} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}10` }}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(2)}>
            <PaymentTerms active={active} />
            <TrustRow active={active} />
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  )
}

// ─── EDITING TAB BODY ─────────────────────────────────────────────────────────

function EditingTabBody({
  active, hlTier, calcWords, setCalcWords,
}: {
  active: Record<string, string>
  hlTier: string
  calcWords: number
  setCalcWords: (n: number) => void
}) {
  return (
    <Box>
      {/* Intro banner with live word-count estimator */}
      <Box py={rem(28)} bg={active.background} style={{ borderBottom: `1px solid ${active.primary}08` }}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Group justify="space-between" align="center" wrap="wrap" gap="md">
            <Box style={{ maxWidth: 640 }}>
              <Text size="sm" c="dimmed" lh={1.6}>
                All editing is performed by human discipline specialists in Microsoft Word Track Changes.
                Enter your approximate word count to preview fees live across all three tiers:
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
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(2)}>
            {editingTiers.map((tier) => {
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
                      href={`/scholarcrafted/request-review?service=editing&tier=${tier.id}&wordCount=${calcWords}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button fullWidth radius={0} rightSection={<IconArrowRight size={15} />}
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

      {/* Feature matrix */}
      <Box py={SECTION_SPACING} bg={active.background}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Text size="xs" fw={700} mb={rem(28)} c={active.accent} style={{ letterSpacing: '0.18em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>FEATURE COMPARISON</Text>
          <Box style={{ overflowX: 'auto' }}>
            <Table withColumnBorders style={{ minWidth: 640, borderCollapse: 'collapse' }}>
              <Table.Thead>
                <Table.Tr style={{ backgroundColor: active.surface }}>
                  <Table.Th style={{ width: '40%', padding: `${rem(14)} ${rem(20)}`, fontFamily: 'var(--font-heading-sans), var(--font-sans)', fontSize: rem(12), letterSpacing: '0.08em', color: '#888', borderColor: `${active.primary}10` }}>FEATURE</Table.Th>
                  <Table.Th style={{ textAlign: 'center', padding: `${rem(14)} ${rem(16)}`, fontFamily: 'var(--font-heading-sans), var(--font-sans)', fontSize: rem(12), letterSpacing: '0.06em', color: active.primary, borderColor: `${active.primary}10` }}>Advanced</Table.Th>
                  <Table.Th style={{ textAlign: 'center', padding: `${rem(14)} ${rem(16)}`, fontFamily: 'var(--font-heading-sans), var(--font-sans)', fontSize: rem(12), letterSpacing: '0.06em', color: active.accent, borderColor: `${active.primary}10` }}>Premium ★</Table.Th>
                  <Table.Th style={{ textAlign: 'center', padding: `${rem(14)} ${rem(16)}`, fontFamily: 'var(--font-heading-sans), var(--font-sans)', fontSize: rem(12), letterSpacing: '0.06em', color: active.primary, borderColor: `${active.primary}10` }}>Scientific Pro</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {editingMatrix.map((row, i) => (
                  <Table.Tr key={i} style={{ backgroundColor: i % 2 === 0 ? active.background : active.surface }}>
                    <Table.Td style={{ padding: `${rem(12)} ${rem(20)}`, fontSize: rem(13), color: active.primary, lineHeight: 1.4, borderColor: `${active.primary}08` }}>{row.feature}</Table.Td>
                    <Table.Td style={{ textAlign: 'center', padding: `${rem(12)} ${rem(16)}`, borderColor: `${active.primary}08` }}>
                      <Box style={{ display: 'flex', justifyContent: 'center' }}>
                        <MatrixCell val={row.advanced} />
                      </Box>
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'center', padding: `${rem(12)} ${rem(16)}`, borderColor: `${active.primary}08`, backgroundColor: `${active.accent}04` }}>
                      <Box style={{ display: 'flex', justifyContent: 'center' }}>
                        <MatrixCell val={row.premium} />
                      </Box>
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'center', padding: `${rem(12)} ${rem(16)}`, borderColor: `${active.primary}08` }}>
                      <Box style={{ display: 'flex', justifyContent: 'center' }}>
                        <MatrixCell val={row.scientific} />
                      </Box>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

// ─── JOURNAL TAB BODY ─────────────────────────────────────────────────────────

function JournalTabBody({ active, hlTier }: { active: Record<string, string>; hlTier: string }) {
  return (
    <Box>
      <Box py={SECTION_SPACING} bg={active.surface}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(2)}>
            {journalTiers.map((tier) => {
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
                      href={`/scholarcrafted/request-review?service=publication&section=journal&tier=${tier.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button fullWidth radius={0} rightSection={<IconArrowRight size={15} />}
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
    </Box>
  )
}

// ─── BOOK TAB BODY ────────────────────────────────────────────────────────────

function BookTabBody({ active, hlStage }: { active: Record<string, string>; hlStage: string }) {
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
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
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
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
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
                    <Link href="/scholarcrafted/request-review?service=publication&section=book&pipeline=full" style={{ textDecoration: 'none' }}>
                      <Button radius={0} size="md" rightSection={<IconArrowRight size={15} />}
                        style={{ backgroundColor: active.accent, color: '#fff', fontFamily: 'var(--font-heading-sans), var(--font-sans)', fontWeight: 700, letterSpacing: '0.06em', width: 'fit-content' }}>
                        Enquire Full 5-Stage Pipeline →
                      </Button>
                    </Link>
                  ) : (
                    <Link href={`/scholarcrafted/request-review?service=publication&section=book&stage=${selected.step}`} style={{ textDecoration: 'none' }}>
                      <Button radius={0} size="md" rightSection={<IconArrowRight size={15} />}
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
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
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
    </Box>
  )

}

// ─── AI MANUSCRIPT AUDIT TAB BODY ─────────────────────────────────────────────

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
      'Optional 15-minute debrief consultation with Micah Dobson',
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
      'Direct follow-up consultation with Micah Dobson after each review',
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
  { feature: 'Optional 15-Minute Zoom Debrief with Micah Dobson', single: true, bundle: true },
  { feature: '100% Fee Credit Toward Full Word Track-Changes Editing', single: '$29 Credit', bundle: '$69 Credit' },
  { feature: 'Number of Full Manuscript Audits Included', single: '1 Draft', bundle: '3 Drafts' },
  { feature: 'Post-Revision & Camera-Ready Re-audit', single: false, bundle: true },
]

function AiAuditTabBody({ active, hlTier }: { active: Record<string, string>; hlTier: string }) {
  return (
    <Box>
      {/* Cards section */}
      <Box py={SECTION_SPACING} bg={active.surface}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Box mb={rem(40)} style={{ maxWidth: 740 }}>
            <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.18em', fontFamily: 'var(--font-heading-sans), var(--font-sans)', textTransform: 'uppercase' }}>
              PRE-SUBMISSION INTEGRITY & SCIENTIFIC AUDIT
            </Text>
            <Title order={2} mt={rem(6)} style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', color: active.primary, lineHeight: 1.2 }}>
              Audit what your AI missed before journal editors see it
            </Title>
            <Text size="sm" c="dimmed" mt={rem(8)} lh={1.7}>
              AI helped you write your draft. Now get it independently audited against 200M+ research papers to surface hallucinated citations, missing literature, and logical gaps. Delivered in 24–48 hours with 100% fee credit toward full editing.
            </Text>
          </Box>

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
                      href={`/scholarcrafted/request-review?service=ai-audit&tier=${tier.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button fullWidth radius={0} rightSection={<IconArrowRight size={15} />}
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
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
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
    </Box>
  )
}

// ─── Payment Terms & Trust ────────────────────────────────────────────────────

function PaymentTerms({ active }: { active: Record<string, string> }) {
  return (
    <Box p={rem(36)} bg={active.background} style={{ border: `1px solid ${active.primary}10` }}>
      <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.14em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>HOW PAYMENT WORKS</Text>
      <Title order={3} mt="xs" mb="md" style={{ fontFamily: 'var(--font-serif)', fontSize: rem(20), fontWeight: 600, color: active.primary }}>Invoice-Based: 50% Deposit, 50% On Delivery</Title>
      <Stack gap="sm">
        <Group gap="sm" align="flex-start" wrap="nowrap">
          <Box px={rem(8)} py={rem(2)} style={{ backgroundColor: `${active.accent}15`, flexShrink: 0, marginTop: rem(2) }}>
            <Text size="xs" fw={800} c={active.accent}>1</Text>
          </Box>
          <Text size="xs" c="dimmed" lh={1.6}>
            <strong style={{ color: active.primary }}>50% deposit invoice</strong> issued on quote approval. Work begins upon deposit receipt.
          </Text>
        </Group>
        <Group gap="sm" align="flex-start" wrap="nowrap">
          <Box px={rem(8)} py={rem(2)} style={{ backgroundColor: `${active.accent}15`, flexShrink: 0, marginTop: rem(2) }}>
            <Text size="xs" fw={800} c={active.accent}>2</Text>
          </Box>
          <Text size="xs" c="dimmed" lh={1.6}>
            <strong style={{ color: active.primary }}>50% final balance</strong> invoiced upon delivery of all deliverables. Paid by bank transfer or card.
          </Text>
        </Group>
      </Stack>
    </Box>
  )
}

function TrustRow({ active }: { active: Record<string, string> }) {
  const points = [
    { icon: <IconShieldCheck size={18} color={active.accent} />, label: 'Strict NDA on every project — your scholarship is safe' },
    { icon: <IconFileCheck size={18} color={active.accent} />, label: '100% Track Changes delivery in Word' },
    { icon: <IconClock size={18} color={active.accent} />, label: 'Firm scoped quote within 24 hours of brief submission' },
  ]
  return (
    <Box p={rem(36)} bg={active.background} style={{ border: `1px solid ${active.primary}10` }}>
      <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.14em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>THE SCHOLARCRAFTED PROMISE</Text>
      <Title order={3} mt="xs" mb="md" style={{ fontFamily: 'var(--font-serif)', fontSize: rem(20), fontWeight: 600, color: active.primary }}>No AI. Real Specialists. Full Privacy.</Title>
      <Stack gap="sm">
        {points.map((pt, i) => (
          <Group key={i} gap="sm" align="flex-start" wrap="nowrap">
            <Box style={{ flexShrink: 0, marginTop: rem(2) }}>{pt.icon}</Box>
            <Text size="xs" c="dimmed" lh={1.6}>{pt.label}</Text>
          </Group>
        ))}
      </Stack>
    </Box>
  )
}
