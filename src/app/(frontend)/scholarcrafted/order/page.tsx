'use client'

import React, { useState, Suspense } from 'react'
import {
  Container, Title, Text, Box, SimpleGrid, Stack,
  Button, rem, Group, useMantineTheme, UnstyledButton,
  Divider, Table,
} from '@mantine/core'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  IconCheck, IconX, IconArrowLeft, IconArrowRight,
  IconShieldCheck, IconClock, IconFileCheck, IconMinus,
} from '@tabler/icons-react'
import { Navbar } from '../_components/Navbar'
import { SECTION_SPACING } from '@/layout'

// ─── Palette ─────────────────────────────────────────────────────────────────

const SALUTATIONS = ['Dr.', 'Prof.', 'Mr.', 'Ms.', 'Mx.', '—']

// ─── Editing data ─────────────────────────────────────────────────────────────

const editingTiers = [
  {
    id: 'advanced',
    name: 'Advanced Editing',
    badge: 'ACCURATE & FAST',
    isPopular: false,
    tagline: 'Precision grammar, syntax, academic tone & full style manual compliance.',
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
  { feature: 'Paragraph restructuring & logical pacing', advanced: false, premium: true, scientific: true },
  { feature: 'Inline citation to bibliography cross-check', advanced: false, premium: true, scientific: true },
  { feature: 'Target Journal Cover Letter', advanced: false, premium: true, scientific: true },
  { feature: 'Editor Advisory Memorandum', advanced: false, premium: true, scientific: true },
  { feature: 'Scientific Completeness Assessment', advanced: false, premium: false, scientific: true },
  { feature: 'Peer reviewer commentary (journal-grade)', advanced: false, premium: false, scientific: true },
  { feature: 'Reviewer Response Matrix', advanced: false, premium: false, scientific: true },
  { feature: 'Complimentary re-editing guarantee', advanced: '1 round (30 days)', premium: 'Unlimited (365 days)', scientific: 'Unlimited (365 days)' },
]

// ─── Journal data ─────────────────────────────────────────────────────────────

const journalTiers = [
  {
    id: 'essentials',
    name: 'Essentials',
    badge: 'SUBMISSION READY',
    isPopular: false,
    tagline: 'Everything you need to submit with confidence to the right journal.',
    price: 'From $320',
    turnaround: '5–7 days',
    features: [
      'Journal selection — 3–5 ranked options with scope & rejection rate analysis',
      'Reformatting to exact Author Guidelines',
      'Abstract, keywords & word count compliance',
      'Cover letter written to journal scope & contribution',
      'Front & back matter verification',
      'Submission checklist',
    ],
    deliverables: ['Ranked journal report', 'Reformatted manuscript (.docx)', 'Submission-ready cover letter', 'Submission checklist'],
  },
  {
    id: 'pro',
    name: 'Pro',
    badge: 'MOST REQUESTED',
    isPopular: true,
    tagline: 'Full submission support plus tools to navigate rejection without losing momentum.',
    price: 'From $560',
    turnaround: '7–10 days',
    features: [
      'All Essentials features included',
      'Resubmission formatting to a second journal if rejected',
      'Response letter — point-by-point reply to every reviewer',
      'Response-to-revision crosscheck',
      'Editorial diplomacy check',
      'Priority turnaround available',
    ],
    deliverables: ['All Essentials deliverables', 'Formatted response letter (.docx)', 'Resubmission-ready manuscript', 'Response-revision crosscheck report'],
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
    price: 'From $280', turnaround: '5–7 days',
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
    price: 'From $480', turnaround: '7–10 days',
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
    price: 'Per word — see Editing & Compliance', turnaround: 'Project-dependent',
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
    price: 'Project-based', turnaround: '5–10 days',
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
    price: 'From $3 / typeset page', turnaround: '10–14 days',
    includes: [
      'Subject index, author index, and combined index options',
      'Headings, subheadings, cross-references (See / See also)',
      'Adherence to press guidelines (Oxford, Cambridge, Routledge, Michigan)',
      'Delivered in press-ready Word, RTF, or plain text format',
      'Built using professional indexing software (Cindex / SKY Index)',
    ],
  },
]

const bookMatrix = [
  { row: 'Publisher ranking report (3–5 presses)', s01: true, s02: false, s03: false, s04: false, s05: false },
  { row: 'Acquisition-ready book proposal', s01: false, s02: true, s03: false, s04: false, s05: false },
  { row: 'Line editing (full manuscript, tracked changes)', s01: false, s02: false, s03: true, s04: false, s05: false },
  { row: 'Style manual conformity (Chicago / APA / press-specific)', s01: false, s02: false, s03: true, s04: false, s05: false },
  { row: 'Reference list audit & DOI verification', s01: false, s02: false, s03: true, s04: false, s05: false },
  { row: 'Typesetting error detection & galley mark-up', s01: false, s02: false, s03: false, s04: true, s05: false },
  { row: 'Copyeditor query resolution', s01: false, s02: false, s03: false, s04: true, s05: false },
  { row: 'Subject & author index (press-spec)', s01: false, s02: false, s03: false, s04: false, s05: true },
  { row: 'Press-ready delivery (Word / RTF / plain text)', s01: false, s02: false, s03: false, s04: false, s05: true },
]

// ─── Shared components ────────────────────────────────────────────────────────

function PaymentTerms({ active }: { active: Record<string, string> }) {
  return (
    <Box p={rem(28)} bg={active.surface} style={{ border: `1px solid ${active.primary}10` }}>
      <Text size="xs" fw={700} mb={rem(12)} style={{ letterSpacing: '0.14em', color: '#888', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
        PAYMENT TERMS
      </Text>
      <Stack gap={rem(8)}>
        {[
          '50% deposit invoice sent on quote approval',
          '50% balance due on delivery',
          'No credit card stored on this site',
          'Institutional invoices available on request',
        ].map((t, i) => (
          <Group key={i} gap={rem(8)} align="flex-start" wrap="nowrap">
            <IconCheck size={13} color={active.accent} style={{ flexShrink: 0, marginTop: rem(2) }} />
            <Text size="sm" c="dimmed" lh={1.5}>{t}</Text>
          </Group>
        ))}
      </Stack>
    </Box>
  )
}

function TrustRow({ active }: { active: Record<string, string> }) {
  return (
    <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(2)}>
      {[
        { icon: <IconShieldCheck size={18} color={active.accent} />, label: 'Strict NDA on every project' },
        { icon: <IconFileCheck size={18} color={active.accent} />, label: '100% Track Changes delivery' },
        { icon: <IconClock size={18} color={active.accent} />, label: 'Scoped quote within 24 hours' },
      ].map((t, i) => (
        <Group key={i} gap={rem(8)} align="center" p={rem(16)} bg={active.surface} style={{ border: `1px solid ${active.primary}08` }}>
          {t.icon}
          <Text size="sm" fw={600} c={active.primary}>{t.label}</Text>
        </Group>
      ))}
    </SimpleGrid>
  )
}

function MatrixCell({ val }: { val: boolean | string }) {
  const theme = useMantineTheme()
  const active = theme.other
  if (val === true) return <IconCheck size={16} color={active.accent} />
  if (val === false) return <IconMinus size={14} color="#ccc" />
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
  const service  = searchParams.get('service') ?? 'editing'
  const section  = searchParams.get('section') ?? ''
  const hlTier   = searchParams.get('tier') ?? ''
  const hlStage  = searchParams.get('stage') ?? ''

  if (service === 'publication' && section === 'journal') {
    return <JournalOrderSection active={active} hlTier={hlTier} />
  }
  if (service === 'publication' && section === 'book') {
    return <BookOrderSection active={active} hlStage={hlStage} />
  }
  return <EditingOrderSection active={active} hlTier={hlTier} />
}

// ─── EDITING ORDER SECTION ────────────────────────────────────────────────────

function EditingOrderSection({ active, hlTier }: { active: Record<string, string>; hlTier: string }) {
  return (
    <Box bg={active.background} style={{ minHeight: '100vh' }}>
      <Navbar />

      <Box pt={{ base: rem(100), md: rem(130) }} pb={rem(56)} bg={active.background} style={{ borderBottom: `1px solid ${active.primary}10` }}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Group gap="sm" align="center" mb={rem(14)} wrap="wrap">
            <Link
              href="/scholarcrafted/services/editing-proofreading"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: rem(6),
                color: active.accent,
              }}
            >
              <IconArrowLeft size={14} />
              <Text size="xs" fw={700} style={{ letterSpacing: '0.06em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                Back to Editing & Compliance
              </Text>
            </Link>
            <Box style={{ width: 1, height: rem(12), backgroundColor: `${active.primary}25` }} />
            <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.2em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
              EDITING & COMPLIANCE
            </Text>
          </Group>
          <Title order={1} mt="xs" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-display), var(--font-serif)', fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.02em', color: active.primary }}>
            Choose your editing tier.
          </Title>
          <Text size="md" c="dimmed" mt="md" lh={1.7} style={{ maxWidth: '58ch' }}>
            All tiers are executed by human discipline specialists in Microsoft Word Track Changes.
            Select below to proceed to the intake form — or use the calculator on the editing page to get an estimate first.
          </Text>
        </Container>
      </Box>

      {/* Tier cards */}
      <Box py={SECTION_SPACING} bg={active.surface}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(2)}>
            {editingTiers.map((tier) => {
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
                        {hlTier ? 'YOUR SELECTION' : 'MOST POPULAR'}
                      </Text>
                    </Box>
                  )}
                  <Stack gap="md" flex={1}>
                    <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.12em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>{tier.badge}</Text>
                    <Box>
                      <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontSize: rem(22), fontWeight: 600, color: active.primary, lineHeight: 1.2 }}>{tier.name}</Title>
                      <Text size="sm" c="dimmed" mt={rem(6)} lh={1.6}>{tier.tagline}</Text>
                    </Box>
                    <Text fw={700} size="lg" c={active.primary} style={{ fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>{tier.rate}</Text>
                    <Text size="xs" c="dimmed" style={{ fontFamily: 'var(--font-heading-sans), var(--font-sans)', letterSpacing: '0.06em' }}>Standard: {tier.turnaround}</Text>
                    <Divider color={`${active.primary}08`} />
                    <Stack gap={rem(8)} flex={1}>
                      {tier.features.map((f, i) => (
                        <Group key={i} gap={rem(8)} align="flex-start" wrap="nowrap">
                          <IconCheck size={13} color={active.accent} style={{ flexShrink: 0, marginTop: rem(3) }} />
                          <Text size="sm" c="dimmed" lh={1.55}>{f}</Text>
                        </Group>
                      ))}
                    </Stack>
                    <Box mt="auto" pt="lg">
                      <Link href={`/scholarcrafted/request-review?service=editing&tier=${tier.id}`} style={{ textDecoration: 'none' }}>
                        <Button fullWidth radius={0} rightSection={<IconArrowRight size={15} />}
                          style={{ backgroundColor: isHighlighted ? active.accent : active.primary, color: '#fff', fontFamily: 'var(--font-heading-sans), var(--font-sans)', letterSpacing: '0.04em', fontWeight: 600 }}>
                          Select {tier.name}
                        </Button>
                      </Link>
                    </Box>
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
          <Text size="xs" fw={700} mb={rem(28)} c={active.accent} style={{ letterSpacing: '0.18em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
            COMPARE ALL FEATURES
          </Text>
          <Box style={{ overflowX: 'auto' }}>
            <Table withColumnBorders style={{ minWidth: 680, borderCollapse: 'collapse' }}>
              <Table.Thead>
                <Table.Tr style={{ backgroundColor: active.surface }}>
                  <Table.Th style={{ width: '44%', padding: `${rem(14)} ${rem(20)}`, fontFamily: 'var(--font-heading-sans), var(--font-sans)', fontSize: rem(12), letterSpacing: '0.08em', color: '#888', borderColor: `${active.primary}10` }}>FEATURE</Table.Th>
                  {editingTiers.map(t => (
                    <Table.Th key={t.id} style={{ textAlign: 'center', padding: `${rem(14)} ${rem(20)}`, fontFamily: 'var(--font-heading-sans), var(--font-sans)', fontSize: rem(12), letterSpacing: '0.06em', color: active.primary, borderColor: `${active.primary}10` }}>
                      {t.name}
                    </Table.Th>
                  ))}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {editingMatrix.map((row, i) => (
                  <Table.Tr key={i} style={{ backgroundColor: i % 2 === 0 ? active.background : active.surface }}>
                    <Table.Td style={{ padding: `${rem(12)} ${rem(20)}`, fontSize: rem(13), color: active.primary, lineHeight: 1.4, borderColor: `${active.primary}08` }}>{row.feature}</Table.Td>
                    {(['advanced', 'premium', 'scientific'] as const).map(col => (
                      <Table.Td key={col} style={{ textAlign: 'center', padding: `${rem(12)} ${rem(16)}`, borderColor: `${active.primary}08` }}>
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

      <Box py={SECTION_SPACING} bg={active.surface}>
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

// ─── JOURNAL ORDER SECTION ────────────────────────────────────────────────────

function JournalOrderSection({ active, hlTier }: { active: Record<string, string>; hlTier: string }) {
  return (
    <Box bg={active.background} style={{ minHeight: '100vh' }}>
      <Navbar />
      <Box pt={{ base: rem(100), md: rem(130) }} pb={rem(56)} bg={active.background} style={{ borderBottom: `1px solid ${active.primary}10` }}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Group gap="sm" align="center" mb={rem(14)} wrap="wrap">
            <Link
              href="/scholarcrafted/services/publication-support?tab=journal"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: rem(6),
                color: active.accent,
              }}
            >
              <IconArrowLeft size={14} />
              <Text size="xs" fw={700} style={{ letterSpacing: '0.06em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                Back to Publication Support
              </Text>
            </Link>
            <Box style={{ width: 1, height: rem(12), backgroundColor: `${active.primary}25` }} />
            <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.2em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
              PUBLICATION SUPPORT — JOURNAL ARTICLES
            </Text>
          </Group>
          <Title order={1} mt="xs" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-display), var(--font-serif)', fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.02em', color: active.primary }}>
            Choose your submission package.
          </Title>
          <Text size="md" c="dimmed" mt="md" lh={1.7} style={{ maxWidth: '56ch' }}>
            All packages include journal selection and cover letter. Choose based on how many rounds of revision and resubmission you expect.
          </Text>
        </Container>
      </Box>

      <Box py={SECTION_SPACING} bg={active.surface}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(2)}>
            {journalTiers.map((tier) => {
              const isHighlighted = hlTier === tier.id || (!hlTier && tier.isPopular)
              return (
                <Box key={tier.id} p={rem(36)} bg={active.background}
                  style={{ border: `1px solid ${isHighlighted ? active.accent : `${active.primary}12`}`, display: 'flex', flexDirection: 'column', boxShadow: isHighlighted ? `0 8px 32px ${active.accent}14` : 'none' }}>
                  {isHighlighted && (
                    <Box px={rem(10)} py={rem(4)} mb="md" style={{ backgroundColor: active.accent, alignSelf: 'flex-start' }}>
                      <Text size="xs" fw={700} c="#fff" style={{ letterSpacing: '0.1em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                        {hlTier ? 'YOUR SELECTION' : 'MOST REQUESTED'}
                      </Text>
                    </Box>
                  )}
                  <Stack gap="md" flex={1}>
                    <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.12em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>{tier.badge}</Text>
                    <Box>
                      <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontSize: rem(22), fontWeight: 600, color: active.primary, lineHeight: 1.2 }}>{tier.name}</Title>
                      <Text size="sm" c="dimmed" mt={rem(6)} lh={1.6}>{tier.tagline}</Text>
                    </Box>
                    <Text fw={700} size="lg" c={active.primary} style={{ fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>{tier.price}</Text>
                    <Text size="xs" c="dimmed" style={{ fontFamily: 'var(--font-heading-sans), var(--font-sans)', letterSpacing: '0.06em' }}>Turnaround: {tier.turnaround}</Text>
                    <Divider color={`${active.primary}08`} />
                    <Stack gap={rem(8)} flex={1}>
                      {tier.features.map((f, i) => (
                        <Group key={i} gap={rem(8)} align="flex-start" wrap="nowrap">
                          <IconCheck size={13} color={active.accent} style={{ flexShrink: 0, marginTop: rem(3) }} />
                          <Text size="sm" c="dimmed" lh={1.55}>{f}</Text>
                        </Group>
                      ))}
                    </Stack>
                    <Box mt="auto" pt="lg">
                      <Link href={`/scholarcrafted/request-review?service=publication&section=journal&tier=${tier.id}`} style={{ textDecoration: 'none' }}>
                        <Button fullWidth radius={0} rightSection={<IconArrowRight size={15} />}
                          style={{ backgroundColor: isHighlighted ? active.accent : active.primary, color: '#fff', fontFamily: 'var(--font-heading-sans), var(--font-sans)', letterSpacing: '0.04em', fontWeight: 600 }}>
                          Select {tier.name}
                        </Button>
                      </Link>
                    </Box>
                  </Stack>
                </Box>
              )
            })}
          </SimpleGrid>
        </Container>
      </Box>

      <Box py={SECTION_SPACING} bg={active.background}>
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

// ─── BOOK ORDER SECTION ───────────────────────────────────────────────────────

function BookOrderSection({ active, hlStage }: { active: Record<string, string>; hlStage: string }) {
  const [activeIdx, setActiveIdx] = useState(() => {
    const found = bookStages.findIndex(s => s.step === hlStage)
    return found >= 0 ? found : 0
  })
  const selected = bookStages[activeIdx]

  return (
    <Box bg={active.background} style={{ minHeight: '100vh' }}>
      <Navbar />

      <Box pt={{ base: rem(100), md: rem(130) }} pb={rem(56)} bg={active.background} style={{ borderBottom: `1px solid ${active.primary}10` }}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Group gap="sm" align="center" mb={rem(14)} wrap="wrap">
            <Link
              href="/scholarcrafted/services/publication-support?tab=book"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: rem(6),
                color: active.accent,
              }}
            >
              <IconArrowLeft size={14} />
              <Text size="xs" fw={700} style={{ letterSpacing: '0.06em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                Back to Book Manuscripts
              </Text>
            </Link>
            <Box style={{ width: 1, height: rem(12), backgroundColor: `${active.primary}25` }} />
            <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.2em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
              PUBLICATION SUPPORT — BOOK MANUSCRIPTS
            </Text>
          </Group>
          <Title order={1} mt="xs" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-display), var(--font-serif)', fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.02em', color: active.primary }}>
            From proposal to press.
          </Title>
          <Text size="md" c="dimmed" mt="md" lh={1.7} style={{ maxWidth: '56ch' }}>
            Pick the stage you need now — or enquire about the full pipeline. Each stage is independently priced and managed.
          </Text>
        </Container>
      </Box>

      {/* Full Pipeline CTA */}
      <Box py={rem(40)} bg={active.primary}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Group justify="space-between" align="center" wrap="wrap" gap="xl">
            <Stack gap={rem(6)}>
              <Text size="xs" fw={700} style={{ letterSpacing: '0.18em', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>FULL BOOK PIPELINE</Text>
              <Title order={2} style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', color: '#fff', fontWeight: 600, lineHeight: 1.2 }}>
                One team. Every stage. Publisher Selection → Indexing.
              </Title>
              <Text size="sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Enquire about the complete pipeline — we scope all stages and manage the full project.
              </Text>
            </Stack>
            <Link href="/scholarcrafted/request-review?service=publication&section=book&pipeline=full" style={{ textDecoration: 'none', flexShrink: 0 }}>
              <Button size="lg" radius={0} rightSection={<IconArrowRight size={16} />}
                style={{ backgroundColor: active.accent, color: '#fff', fontFamily: 'var(--font-heading-sans), var(--font-sans)', letterSpacing: '0.04em', fontWeight: 700 }}>
                Enquire About Full Pipeline
              </Button>
            </Link>
          </Group>
        </Container>
      </Box>

      {/* Stage tabs */}
      <Box py={SECTION_SPACING} bg={active.surface}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap={rem(40)}>
            <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.18em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>OR SELECT AN INDIVIDUAL STAGE</Text>

            <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }} spacing={rem(2)}>
              {bookStages.map((stage, i) => (
                <UnstyledButton key={i} onClick={() => setActiveIdx(i)} p={rem(20)}
                  style={{
                    backgroundColor: activeIdx === i ? active.background : 'transparent',
                    borderBottom: activeIdx === i ? `3px solid ${active.accent}` : '3px solid transparent',
                    borderTop: `1px solid ${active.primary}10`,
                    borderLeft: `1px solid ${active.primary}10`,
                    borderRight: `1px solid ${active.primary}10`,
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                  }}
                >
                  <Text size="xs" fw={700} mb={rem(4)} style={{ color: activeIdx === i ? active.accent : '#aaa', letterSpacing: '0.12em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>{stage.step}</Text>
                  <Text size="sm" fw={activeIdx === i ? 700 : 500} style={{ color: activeIdx === i ? active.primary : '#666', fontFamily: 'var(--font-heading-sans), var(--font-sans)', lineHeight: 1.35 }}>{stage.title}</Text>
                </UnstyledButton>
              ))}
            </SimpleGrid>

            {/* Stage detail panel */}
            <Box p={{ base: rem(28), md: rem(44) }} bg={active.background} style={{ border: `1px solid ${active.accent}` }}>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(48)}>
                <Stack gap={rem(24)}>
                  <Box>
                    <Text size="xs" fw={700} mb={rem(6)} style={{ color: active.accent, letterSpacing: '0.12em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>STAGE {selected.step}</Text>
                    <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)', fontWeight: 600, color: active.primary, lineHeight: 1.2 }}>{selected.title}</Title>
                    <Text size="md" c="dimmed" mt={rem(8)} lh={1.7}>{selected.desc}</Text>
                  </Box>
                  <SimpleGrid cols={2} spacing={rem(12)}>
                    {[{ label: 'Pricing', val: selected.price }, { label: 'Turnaround', val: selected.turnaround }].map(s => (
                      <Box key={s.label} p={rem(14)} bg={active.surface} style={{ border: `1px solid ${active.primary}08` }}>
                        <Text size="xs" c="dimmed" mb={rem(4)} style={{ fontFamily: 'var(--font-heading-sans), var(--font-sans)', letterSpacing: '0.08em' }}>{s.label}</Text>
                        <Text fw={700} size="sm" c={active.primary} style={{ fontFamily: 'var(--font-heading-sans), var(--font-sans)', lineHeight: 1.3 }}>{s.val}</Text>
                      </Box>
                    ))}
                  </SimpleGrid>
                  <Link href={`/scholarcrafted/request-review?service=publication&section=book&stage=${selected.step}`} style={{ textDecoration: 'none' }}>
                    <Button size="md" radius={0} fullWidth rightSection={<IconArrowRight size={16} />}
                      style={{ backgroundColor: active.accent, color: '#fff', fontFamily: 'var(--font-heading-sans), var(--font-sans)', letterSpacing: '0.04em', fontWeight: 700 }}>
                      Select Stage {selected.step}
                    </Button>
                  </Link>
                </Stack>
                <Stack gap={rem(8)}>
                  <Text size="xs" fw={700} mb={rem(4)} style={{ letterSpacing: '0.1em', color: '#888', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>WHAT'S INCLUDED</Text>
                  {selected.includes.map((item, i) => (
                    <Group key={i} gap={rem(10)} align="flex-start" wrap="nowrap" py={rem(10)} style={{ borderBottom: `1px solid ${active.primary}08` }}>
                      <IconCheck size={14} color={active.accent} style={{ flexShrink: 0, marginTop: rem(2) }} />
                      <Text size="sm" lh={1.65} c={active.primary}>{item}</Text>
                    </Group>
                  ))}
                </Stack>
              </SimpleGrid>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Book feature matrix */}
      <Box py={SECTION_SPACING} bg={active.background}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Text size="xs" fw={700} mb={rem(28)} c={active.accent} style={{ letterSpacing: '0.18em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>WHAT YOU GET AT EACH STAGE</Text>
          <Box style={{ overflowX: 'auto' }}>
            <Table withColumnBorders style={{ minWidth: 700, borderCollapse: 'collapse' }}>
              <Table.Thead>
                <Table.Tr style={{ backgroundColor: active.surface }}>
                  <Table.Th style={{ width: '38%', padding: `${rem(14)} ${rem(20)}`, fontFamily: 'var(--font-heading-sans), var(--font-sans)', fontSize: rem(12), letterSpacing: '0.08em', color: '#888', borderColor: `${active.primary}10` }}>DELIVERABLE</Table.Th>
                  {bookStages.map(s => (
                    <Table.Th key={s.step} style={{ textAlign: 'center', padding: `${rem(12)} ${rem(10)}`, fontFamily: 'var(--font-heading-sans), var(--font-sans)', fontSize: rem(11), letterSpacing: '0.04em', color: active.primary, borderColor: `${active.primary}10`, lineHeight: 1.3 }}>
                      {s.step}<br /><span style={{ fontWeight: 400, color: '#888' }}>{s.title}</span>
                    </Table.Th>
                  ))}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {bookMatrix.map((row, i) => (
                  <Table.Tr key={i} style={{ backgroundColor: i % 2 === 0 ? active.background : active.surface }}>
                    <Table.Td style={{ padding: `${rem(12)} ${rem(20)}`, fontSize: rem(13), color: active.primary, lineHeight: 1.4, borderColor: `${active.primary}08` }}>{row.row}</Table.Td>
                    {(['s01', 's02', 's03', 's04', 's05'] as const).map(col => (
                      <Table.Td key={col} style={{ textAlign: 'center', padding: `${rem(12)} ${rem(10)}`, borderColor: `${active.primary}08` }}>
                        <Box style={{ display: 'flex', justifyContent: 'center' }}>
                          <MatrixCell val={row[col]} />
                        </Box>
                      </Table.Td>
                    ))}
                  </Table.Tr>
                ))}
                {/* Pricing row */}
                <Table.Tr style={{ backgroundColor: active.surface }}>
                  <Table.Td style={{ padding: `${rem(12)} ${rem(20)}`, fontSize: rem(12), fontWeight: 700, color: '#888', letterSpacing: '0.08em', fontFamily: 'var(--font-heading-sans), var(--font-sans)', borderColor: `${active.primary}08` }}>PRICING</Table.Td>
                  {bookStages.map(s => (
                    <Table.Td key={s.step} style={{ textAlign: 'center', padding: `${rem(12)} ${rem(10)}`, fontSize: rem(12), fontWeight: 700, color: active.primary, fontFamily: 'var(--font-heading-sans), var(--font-sans)', borderColor: `${active.primary}08`, lineHeight: 1.4 }}>
                      {s.price}
                    </Table.Td>
                  ))}
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Box>
        </Container>
      </Box>

      <Box py={SECTION_SPACING} bg={active.surface}>
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
