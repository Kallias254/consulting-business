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
} from '@mantine/core'
import { Navbar } from '../../_components/Navbar'
import { Footer } from '../../_components/Footer'
import Link from 'next/link'
import {
  IconCheck,
  IconArrowRight,
  IconFileText,
  IconBooks,
  IconMailForward,
  IconReplace,
  IconAward,
  IconList,
} from '@tabler/icons-react'
import { SECTION_SPACING } from '@/layout'

// ─── PALETTE ─────────────────────────────────────────────────────────────────

const active = {
  primary: '#1a1a1a',
  accent: '#E65C38',
  surface: '#F5F5F5',
  background: '#FFFFFF',
}

// ─── JOURNAL TIERS ───────────────────────────────────────────────────────────

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

// ─── BOOK STAGES ─────────────────────────────────────────────────────────────

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
    price: 'Per word — see Editing & Compliance',
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

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'Do I need editing before using Publication Support?',
    a: 'For Journal Articles — yes, ideally. Journals reject for language as well as scope. We recommend completing Editing & Compliance first so your submission package represents your best work. For Book Manuscripts — publisher selection and proposal can happen before editing, since the proposal is the first submission, not the full manuscript.',
  },
  {
    q: 'What is the difference between Journal Articles and Book Manuscripts support?',
    a: 'Journal Articles support is about getting a peer-reviewed article accepted at a journal — selection, formatting, cover letter, response letters. Book Manuscripts support is the publishing pipeline for monographs and edited volumes — finding the right press, writing the proposal, preparing proofs, and indexing. Both live under Publication Support but serve different goals and timelines.',
  },
  {
    q: 'How long does journal selection take?',
    a: 'We deliver a ranked journal recommendation report within 5 to 7 days. The report includes scope fit analysis, impact factor, typical turnaround, rejection rate, and open-access requirements for each recommended journal.',
  },
  {
    q: 'What if my paper is rejected a second time?',
    a: 'Under the Pro tier, resubmission formatting for a second journal is included. Under Full, resubmission formatting is unlimited across as many target journals as needed. We stay with the paper until it finds its home.',
  },
  {
    q: 'Do you handle the submission to the journal on my behalf?',
    a: 'Yes — under the Full tier, we handle portal upload and form completion on your behalf. Under Essentials and Pro, we prepare everything and you make the final submission. We can advise on any submission portal if you hit friction.',
  },
  {
    q: 'How is book proposal support different from manuscript editing?',
    a: 'A book proposal is a pitch document sent to an acquisition editor before the full manuscript is written or contracted. It is a strategic and persuasive document — market analysis, chapter outline, author credentials. Manuscript editing is the full line-level editorial work on the complete text. Both are stages in the Book Manuscripts path, but they serve completely different purposes.',
  },
  {
    q: 'Is my manuscript kept confidential?',
    a: 'Yes. All manuscripts and research materials are handled under strict NDA. No content is shared beyond the editorial team assigned to your project, and no AI tools are used on your manuscript at any stage.',
  },
]

// ─── PAGE COMPONENT ──────────────────────────────────────────────────────────

function PublicationSupportPageInner() {
  const searchParams = useSearchParams()
  const [activeSection, setActiveSection] = useState<'journal' | 'book'>(() => {
    const tab = searchParams.get('tab')
    return tab === 'book' ? 'book' : 'journal'
  })
  const [activeJournalTier, setActiveJournalTier] = useState<string>('pro')
  const [activeBookStage, setActiveBookStage] = useState<number>(0)

  const selectedTier = journalTiers.find(t => t.id === activeJournalTier) ?? journalTiers[1]
  const selectedStage = bookStages[activeBookStage] ?? bookStages[0]

  return (
    <>
      <Navbar />

      {/* ── PAGE HEADER ──────────────────────────────────────────── */}
      <Box
        component="section"
        pt={{ base: rem(120), md: rem(150) }}
        pb={{ base: rem(60), md: rem(90) }}
        bg={active.background}
        style={{ borderBottom: `1px solid ${active.primary}12` }}
      >
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap="xl" style={{ maxWidth: 860 }}>
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
                  fontSize: 'clamp(2.4rem, 5.2vw, 3.8rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.025em',
                  color: active.primary,
                  fontFamily: 'var(--font-display), var(--font-serif)',
                  fontWeight: 600,
                }}
              >
                From submission to acceptance. We stay with you.
              </Title>
            </Box>

            <Text size="lg" c="dimmed" lh={1.75} style={{ fontSize: rem(19), maxWidth: '64ch' }}>
              Journal selection, cover letters, and response matrices for peer-reviewed articles.
              Publisher selection, book proposals, galley proofs, and indexing for book manuscripts.
              Two distinct pipelines — one team.
            </Text>

            {/* Quick stats */}
            <Group gap="xl" wrap="wrap" pt="sm">
              {[
                'No call required to start',
                'Firm price within 24 hours',
                'Strict NDA on all manuscripts',
              ].map(stat => (
                <Group key={stat} gap="xs" align="center">
                  <IconCheck size={18} color={active.accent} />
                  <Text size="sm" fw={600} c={active.primary}>{stat}</Text>
                </Group>
              ))}
            </Group>
          </Stack>
        </Container>
      </Box>

      {/* ── TOP-LEVEL SECTION TABS ────────────────────────────────── */}
      <Box
        style={{ borderBottom: `2px solid ${active.primary}10`, backgroundColor: active.background }}
        py={0}
      >
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Group gap={0}>
            {([
              { id: 'journal' as const, label: 'Journal Articles', icon: <IconFileText size={16} /> },
              { id: 'book' as const, label: 'Book Manuscripts', icon: <IconBooks size={16} /> },
            ]).map(tab => (
              <UnstyledButton
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                px={rem(32)}
                py={rem(20)}
                style={{
                  borderBottom: activeSection === tab.id
                    ? `2px solid ${active.accent}`
                    : '2px solid transparent',
                  marginBottom: rem(-2),
                  display: 'flex',
                  alignItems: 'center',
                  gap: rem(8),
                }}
              >
                <Box style={{ color: activeSection === tab.id ? active.accent : '#aaa', display: 'flex', alignItems: 'center' }}>
                  {tab.icon}
                </Box>
                <Text
                  fw={activeSection === tab.id ? 700 : 500}
                  size="sm"
                  style={{
                    color: activeSection === tab.id ? active.primary : '#888',
                    fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                    letterSpacing: '0.03em',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {tab.label}
                </Text>
              </UnstyledButton>
            ))}
          </Group>
        </Container>
      </Box>

      {/* ── JOURNAL ARTICLES SECTION ──────────────────────────────── */}
      {activeSection === 'journal' && (
        <Box component="section" py={SECTION_SPACING} bg={active.background}>
          <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
            <Stack gap={rem(64)}>

              {/* Section header */}
              <Box>
                <Text
                  size="xs"
                  fw={700}
                  mb="xs"
                  style={{
                    letterSpacing: '0.16em',
                    color: active.accent,
                    fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                  }}
                >
                  FOR JOURNAL ARTICLES
                </Text>
                <Title
                  order={2}
                  style={{
                    fontSize: 'clamp(1.9rem, 3.6vw, 2.6rem)',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 600,
                    lineHeight: 1.15,
                    color: active.primary,
                    letterSpacing: '-0.015em',
                    maxWidth: '22ch',
                  }}
                >
                  Get your paper in front of the right editors.
                </Title>
                <Text size="md" c="dimmed" mt="md" lh={1.75} style={{ maxWidth: '62ch' }}>
                  Most desk rejections have nothing to do with the quality of your research.
                  Wrong journal, missing disclosures, weak cover letter, formatting errors — these are fixable.
                  We fix them before your manuscript reaches an editor.
                </Text>
              </Box>

              {/* Tier selector tabs */}
              <Box>
                <Group gap={0} style={{ borderBottom: `2px solid ${active.primary}10` }}>
                  {journalTiers.map(tier => (
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
                    backgroundColor: active.surface,
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
                          {selectedTier.badge}
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
                          {selectedTier.tagline}
                        </Title>
                      </Box>

                      <SimpleGrid cols={2} spacing={rem(16)}>
                        {[
                          { label: 'Starting from', val: selectedTier.price },
                          { label: 'Turnaround', val: selectedTier.turnaround },
                        ].map(s => (
                          <Box key={s.label} p={rem(16)} bg={active.background} style={{ border: `1px solid ${active.primary}10` }}>
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
                          {selectedTier.bestFor}
                        </Text>
                      </Box>

                      <Box>
                        <Text size="xs" fw={700} mb={rem(10)} style={{ letterSpacing: '0.1em', color: '#888', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                          DELIVERABLES
                        </Text>
                        <Stack gap={rem(6)}>
                          {selectedTier.deliverables.map((d, i) => (
                            <Group key={i} gap={rem(8)} align="flex-start" wrap="nowrap">
                              <IconCheck size={14} color={active.accent} style={{ flexShrink: 0, marginTop: rem(3) }} />
                              <Text size="sm" c="dimmed" lh={1.6}>{d}</Text>
                            </Group>
                          ))}
                        </Stack>
                      </Box>

                      <Link href={`/scholarcrafted/order?service=publication&section=journal&tier=${selectedTier.id}`} style={{ textDecoration: 'none' }}>
                        <Button
                          size="md"
                          radius={0}
                          rightSection={<IconArrowRight size={16} />}
                          style={{
                            backgroundColor: active.accent,
                            fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                            letterSpacing: '0.04em',
                          }}
                        >
                          Enquire About {selectedTier.name}
                        </Button>
                      </Link>
                    </Stack>

                    {/* Right col — features */}
                    <Stack gap={rem(8)}>
                      <Text size="xs" fw={700} mb={rem(4)} style={{ letterSpacing: '0.1em', color: '#888', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                        WHAT&apos;S INCLUDED
                      </Text>
                      {selectedTier.features.map((f, i) => (
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

      {/* ── BOOK MANUSCRIPTS SECTION ──────────────────────────────── */}
      {activeSection === 'book' && (
        <Box component="section" py={SECTION_SPACING} bg={active.surface}>
          <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
            <Stack gap={rem(56)}>

              {/* Section header */}
              <Box>
                <Text
                  size="xs"
                  fw={700}
                  mb="xs"
                  style={{
                    letterSpacing: '0.16em',
                    color: active.accent,
                    fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                  }}
                >
                  FOR BOOK MANUSCRIPTS
                </Text>
                <Title
                  order={2}
                  style={{
                    fontSize: 'clamp(1.9rem, 3.6vw, 2.6rem)',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 600,
                    lineHeight: 1.15,
                    color: active.primary,
                    letterSpacing: '-0.015em',
                    maxWidth: '24ch',
                  }}
                >
                  From proposal to press. One team, every stage.
                </Title>
                <Text size="md" c="dimmed" mt="md" lh={1.75} style={{ maxWidth: '62ch' }}>
                  Book publication moves in stages, not in one submission. Pick the stage you need now.
                  We work with major academic presses — Routledge, Oxford, SAGE, Cambridge, Michigan, Cornell —
                  and know exactly what each press expects at each stage.
                </Text>
              </Box>

              {/* Stage tab buttons — horizontal row */}
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
                      ].map(s => (
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

                    <Link href={`/scholarcrafted/request-review?service=publication&section=book&stage=${selectedStage.step}`} style={{ textDecoration: 'none' }}>
                      <Button
                        size="md"
                        radius={0}
                        rightSection={<IconArrowRight size={16} />}
                        style={{
                          backgroundColor: active.accent,
                          fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                          letterSpacing: '0.04em',
                        }}
                      >
                        Enquire About Stage {selectedStage.step}
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

      <Divider color={`${active.primary}08`} />

      {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
      <Box component="section" py={SECTION_SPACING} bg={activeSection === 'book' ? active.background : active.surface}>
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
              }}
            >
              HOW IT WORKS
            </Text>
            <Title
              order={2}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.7rem, 3.2vw, 2.3rem)',
                fontWeight: 600,
                color: active.primary,
                lineHeight: 1.2,
                letterSpacing: '-0.015em',
              }}
            >
              Simple from the first message.
            </Title>
          </Box>

          <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(2)}>
            {[
              {
                num: '01',
                title: 'Submit your manuscript and brief',
                desc: 'Upload your document. Tell us where you are in the process — submission ready, post-rejection, awaiting proofs — and what you need. No call required.',
              },
              {
                num: '02',
                title: 'Receive a clear scope and price',
                desc: 'Within 24 hours we confirm the right tier or stage for your situation and give you a firm price. No vague estimates, no scope creep.',
              },
              {
                num: '03',
                title: 'We execute. You review.',
                desc: 'Work begins. Every deliverable — reformatted manuscript, cover letter, response letter, proof mark-up — is delivered for your review and sign-off before anything is submitted on your behalf.',
              },
            ].map((step, i) => (
              <Box
                key={i}
                p={{ base: rem(28), md: rem(36) }}
                bg={active.background}
                style={{ borderLeft: i > 0 ? `1px solid ${active.primary}08` : undefined }}
              >
                <Text
                  fw={700}
                  mb={rem(16)}
                  style={{
                    fontSize: rem(36),
                    color: `${active.primary}12`,
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

      <Divider color={`${active.primary}08`} />

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <Box component="section" py={SECTION_SPACING} bg={active.background}>
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
              }}
            >
              FREQUENTLY ASKED
            </Text>
            <Title
              order={2}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.7rem, 3.2vw, 2.3rem)',
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
                marginBottom: rem(4),
                backgroundColor: active.surface,
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

      <Divider color={`${active.primary}08`} />

      {/* ── BOTTOM CTA ───────────────────────────────────────────── */}
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
                Tell us where your manuscript is right now. We will confirm the right service,
                give you a firm price, and begin within 24 hours.
              </Text>
            </Stack>
            <Group gap={rem(12)} wrap="wrap">
              <Link href="/order?service=publication" style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  radius={0}
                  style={{
                    backgroundColor: active.accent,
                    fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                    letterSpacing: '0.04em',
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
    </>
  )
}

export default function PublicationSupportPage() {
  return (
    <Suspense fallback={<Box style={{ minHeight: '100vh' }} />}>
      <PublicationSupportPageInner />
    </Suspense>
  )
}
