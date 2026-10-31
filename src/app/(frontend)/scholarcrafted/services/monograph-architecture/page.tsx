'use client'

import React from 'react'
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
  Anchor,
} from '@mantine/core'
import { Navbar } from '../../_components/Navbar'
import { Footer } from '../../_components/Footer'
import Link from 'next/link'
import {
  IconCheck,
  IconArrowRight,
  IconBook2,
  IconShieldCheck,
  IconCertificate,
  IconFileText,
  IconMessages,
  IconScale,
  IconStar,
  IconLock,
  IconRefresh,
} from '@tabler/icons-react'
import { SECTION_SPACING } from '@/layout'

const trackBFaqs = [
  {
    q: 'How does dissertation-to-monograph conversion differ from standard editing?',
    a: 'A dissertation is written for a committee of four experts who are obligated to read your work; an academic book is written for busy colleagues, graduate students, and press peer reviewers who must choose to read it. Monograph conversion eliminates thesis defensiveness, builds cumulative multi-chapter narrative momentum, and frames your findings within major disciplinary debates.',
  },
  {
    q: 'Do you help write book proposals for university presses like Oxford or Routledge?',
    a: 'Yes. We craft comprehensive Acquisition Book Proposal Packages formatted to specific press submission guidelines, including the book pitch, target audience breakdown, chapter-by-chapter summaries, competitive title matrix, and pedagogical market positioning.',
  },
  {
    q: 'Can you handle back-of-book indexing and galley proof review?',
    a: 'Yes. Through Stage 4 and Stage 5 of our book production pipeline, our professional indexers create press-compliant subject and name indexes using Cindex and SKY Index, while our proofreaders inspect typeset printer galleys for bad breaks, orphan lines, and cross-reference errors.',
  },
  {
    q: 'How are payments structured for long-form book projects?',
    a: 'We operate on transparent milestone terms: 50% deposit upon project commencement and 50% upon final delivery of your publication-ready manuscript files. For multi-stage book production, milestones can also be phased chapter-by-chapter.',
  },
  {
    q: 'Will institutional grants or faculty startup funds cover this fee?',
    a: 'Yes. Most universities allow book subventions, faculty startup funds, departmental research budgets, or humanities grants to cover external developmental editing and indexing. We provide official itemized institutional invoices and W-9 forms.',
  },
]

export default function MonographArchitecturePage() {
  const theme = useMantineTheme()
  const active = theme.other

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* ── Hero Section ── */}
      <Box
        component="section"
        py={{ base: rem(60), md: rem(96) }}
        bg={active.surface}
        style={{
          borderBottom: `1px solid ${active.primary}12`,
          position: 'relative',
        }}
      >
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap="xl" style={{ maxWidth: 880 }}>
            <Badge
              size="sm"
              radius={0}
              variant="filled"
              style={{
                backgroundColor: active.accent,
                color: '#ffffff',
                letterSpacing: '0.14em',
                fontWeight: 700,
                alignSelf: 'flex-start',
                fontSize: rem(10),
              }}
            >
              ACADEMIC BOOK &amp; UNIVERSITY PRESS
            </Badge>

            <Title
              order={1}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.3rem, 4.8vw, 3.8rem)',
                fontWeight: 600,
                lineHeight: 1.12,
                color: active.primary,
                letterSpacing: '-0.02em',
              }}
            >
              From Stalled Dissertation Chapters to Contracted Academic Books.
            </Title>

            <Text size="lg" c="dimmed" lh={1.75} style={{ maxWidth: '64ch' }}>
              Multi-chapter developmental architecture, acquisition press proposals, and 5-stage production support for junior and senior faculty targeting top university presses (Oxford, Cambridge, Routledge, Harvard).
            </Text>

            <Group gap="md" wrap="wrap" pt="sm">
              <Link href="/order?track=b" style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  radius={0}
                  rightSection={<IconArrowRight size={18} />}
                  style={{
                    backgroundColor: active.accent,
                    color: '#ffffff',
                    fontWeight: 700,
                    fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                    letterSpacing: '0.04em',
                    height: rem(52),
                    paddingLeft: rem(28),
                    paddingRight: rem(28),
                  }}
                >
                  Request Monograph Project Scope
                </Button>
              </Link>
              <Anchor
                href="https://calendly.com/misedajoseph-30-minutes-call/discovery-session"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Button
                  size="lg"
                  radius={0}
                  variant="outline"
                  style={{
                    borderColor: `${active.primary}35`,
                    color: active.primary,
                    fontWeight: 600,
                    fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                    height: rem(52),
                    paddingLeft: rem(24),
                    paddingRight: rem(24),
                  }}
                >
                  Book 15-Min Book Scoping Call
                </Button>
              </Anchor>
            </Group>

            {/* Quality Badges */}
            <Box pt="md" style={{ borderTop: `1px solid ${active.primary}12` }}>
              <Text size="xs" c="dimmed" style={{ letterSpacing: '0.04em' }}>
                Press Proposals &bull; Multi-Chapter Developmental Continuity &bull; Back-of-Book Indexing &bull; 100% Track Changes
              </Text>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* ── The 5 Stages of Book Production ── */}
      <Box component="section" py={SECTION_SPACING} bg={active.background}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap={rem(48)}>
            <Box style={{ maxWidth: 780 }}>
              <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                END-TO-END PUBLICATION PIPELINE
              </Text>
              <Title order={2} mt="xs" style={{ fontFamily: 'var(--font-serif)', fontSize: rem(32), color: active.primary, fontWeight: 600 }}>
                The 5 Stages of Academic Book Production
              </Title>
              <Text size="md" c="dimmed" mt="md" lh={1.7}>
                From initial manuscript structural reorganization to printed book delivery, we provide specialized support across every stage required by university presses.
              </Text>
            </Box>

            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing={rem(16)}>
              {[
                {
                  stage: 'STAGE 01',
                  title: 'Developmental Architecture',
                  desc: 'Cumulative chapter mapping, eliminating dissertation bloat, and structuring cross-chapter argumentative momentum.',
                },
                {
                  stage: 'STAGE 02',
                  title: 'Substantive Line Editing',
                  desc: 'Line-by-line prose polish, scholarly tone calibration, and voice continuity across all 6–10 volume chapters.',
                },
                {
                  stage: 'STAGE 03',
                  title: 'Press Acquisition Proposal',
                  desc: 'Crafting the acquisition proposal package: market positioning, chapter outlines, and competitive title analysis.',
                },
                {
                  stage: 'STAGE 04',
                  title: 'Back-of-Book Indexing',
                  desc: 'Professional Cindex/SKY Index creation with 2-level hierarchical subject, name, and conceptual cross-references.',
                },
                {
                  stage: 'STAGE 05',
                  title: 'Galley Proof Review',
                  desc: 'Final inspection of typeset publisher PDF proofs for bad line breaks, missing symbols, and cross-reference fidelity.',
                },
              ].map((stg, i) => (
                <Box
                  key={i}
                  p={{ base: rem(20), md: rem(24) }}
                  bg={active.surface}
                  style={{
                    border: `1px solid ${active.primary}14`,
                    borderTop: `3px solid ${i === 0 ? active.accent : `${active.primary}25`}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: rem(10),
                  }}
                >
                  <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.14em' }}>
                    {stg.stage}
                  </Text>
                  <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontSize: rem(18), color: active.primary, fontWeight: 600, lineHeight: 1.3 }}>
                    {stg.title}
                  </Title>
                  <Text size="xs" c="dimmed" lh={1.6} style={{ flex: 1 }}>
                    {stg.desc}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* ── Standard Quality Commitments ── */}
      <Box component="section" py={SECTION_SPACING} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}12` }}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap={rem(40)}>
            <Box style={{ maxWidth: 760 }}>
              <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                FACULTY PARTNERSHIP ASSURANCES
              </Text>
              <Title order={2} mt="xs" style={{ fontFamily: 'var(--font-serif)', fontSize: rem(30), color: active.primary, fontWeight: 600 }}>
                Every monograph &amp; press engagement includes:
              </Title>
            </Box>

            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={rem(20)}>
              {[
                {
                  icon: <IconBook2 size={22} color={active.accent} />,
                  title: 'Multi-Chapter Continuity',
                  desc: 'Ensures terminology, citation conventions, and rhetorical register remain seamless across 80,000+ words.',
                },
                {
                  icon: <IconFileText size={22} color={active.accent} />,
                  title: '100% Track Changes',
                  desc: 'All revisions provided in Microsoft Word Track Changes. You review and retain absolute final control.',
                },
                {
                  icon: <IconShieldCheck size={22} color={active.accent} />,
                  title: 'Strict Non-Disclosure',
                  desc: 'Unpublished book manuscripts and primary archival findings are secured under binding legal NDAs.',
                },
                {
                  icon: <IconRefresh size={22} color={active.accent} />,
                  title: '365-Day Revision Support',
                  desc: 'Secondary revision passes included when press peer reviewers or acquisition editors issue revision memos.',
                },
              ].map((feat, i) => (
                <Box
                  key={i}
                  p={rem(24)}
                  bg={active.background}
                  style={{ border: `1px solid ${active.primary}12` }}
                >
                  <Box mb="md">{feat.icon}</Box>
                  <Text fw={700} size="sm" c={active.primary} mb={rem(6)}>
                    {feat.title}
                  </Text>
                  <Text size="xs" c="dimmed" lh={1.6}>
                    {feat.desc}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* ── Transparent Milestone Pricing ── */}
      <Box component="section" py={SECTION_SPACING} bg={active.background} style={{ borderTop: `1px solid ${active.primary}12` }}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Box
            p={{ base: rem(28), sm: rem(36), md: rem(48) }}
            bg={active.surface}
            style={{
              border: `1px solid ${active.primary}15`,
              borderLeft: `5px solid ${active.primary}`,
            }}
          >
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: rem(24), md: rem(48) }} style={{ alignItems: 'center' }}>
              <Stack gap="md">
                <Badge
                  size="sm"
                  radius={0}
                  variant="filled"
                  style={{ backgroundColor: active.primary, color: '#ffffff', fontWeight: 700 }}
                >
                  CONSULTATIVE MILESTONE SCOPE
                </Badge>
                <Title order={2} style={{ fontFamily: 'var(--font-serif)', fontSize: rem(28), color: active.primary, fontWeight: 600 }}>
                  Single Fixed Milestone Proposals
                </Title>
                <Text size="sm" c="dimmed" lh={1.7}>
                  We structure academic book engagements through clear milestone proposals ($1,500–$3,500+) with transparent 50% deposit and 50% upon final delivery terms.
                </Text>
                <Stack gap={rem(8)}>
                  {[
                    '50% deposit upon kickoff / 50% upon final delivery of publication files',
                    'Full dissertation-to-monograph structural chapter conversion',
                    'University press acquisition proposal package and pitch letter',
                    '365 days of press revision memo coverage included at zero extra charge',
                    'Institutional invoicing compatible with startup funds, subventions, and grants',
                  ].map((item, idx) => (
                    <Group key={idx} gap="xs" align="flex-start" wrap="nowrap">
                      <IconCheck size={15} color={active.accent} style={{ flexShrink: 0, marginTop: rem(2) }} />
                      <Text size="xs" c={active.primary} lh={1.5}>
                        {item}
                      </Text>
                    </Group>
                  ))}
                </Stack>
              </Stack>

              <Box
                p={{ base: rem(24), sm: rem(32) }}
                bg={active.background}
                style={{
                  border: `1px solid ${active.primary}12`,
                  textAlign: 'center',
                }}
              >
                <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  READY TO ELEVATE YOUR BOOK?
                </Text>
                <Text mt="xs" style={{ fontFamily: 'var(--font-serif)', fontSize: rem(24), fontWeight: 600, color: active.primary }}>
                  Request Monograph Scope
                </Text>
                <Text size="xs" c="dimmed" mt={rem(8)} mb="lg" lh={1.6}>
                  Receive an itemized milestone proposal and confirmed publication schedule within 24 hours.
                </Text>

                <Stack gap="sm">
                  <Link href="/order?track=b" style={{ textDecoration: 'none' }}>
                    <Button
                      fullWidth
                      size="md"
                      radius={0}
                      rightSection={<IconArrowRight size={16} />}
                      style={{
                        backgroundColor: active.accent,
                        color: '#ffffff',
                        fontWeight: 700,
                        height: rem(48),
                      }}
                    >
                      Request Project Scope
                    </Button>
                  </Link>
                  <Anchor
                    href="https://calendly.com/misedajoseph-30-minutes-call/discovery-session"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    <Button
                      fullWidth
                      size="md"
                      radius={0}
                      variant="outline"
                      style={{
                        borderColor: `${active.primary}30`,
                        color: active.primary,
                        fontWeight: 600,
                        height: rem(48),
                      }}
                    >
                      Book 15-Min Scoping Call
                    </Button>
                  </Anchor>
                </Stack>
              </Box>
            </SimpleGrid>
          </Box>
        </Container>
      </Box>

      {/* ── FAQ ── */}
      <Box component="section" py={SECTION_SPACING} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}12` }}>
        <Container size={840} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap="xl">
            <Box style={{ textAlign: 'center' }}>
              <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                FREQUENTLY ASKED QUESTIONS
              </Text>
              <Title order={2} mt="xs" style={{ fontFamily: 'var(--font-serif)', fontSize: rem(28), color: active.primary, fontWeight: 600 }}>
                Monograph &amp; Book Proposal FAQs
              </Title>
            </Box>

            <Accordion>
              {trackBFaqs.map((faq, i) => (
                <Accordion.Item key={i} value={`track-b-faq-${i}`}>
                  <Accordion.Control style={{ fontFamily: 'var(--font-heading-sans), var(--font-sans)', fontWeight: 600 }}>
                    {faq.q}
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm" lh={1.7} c="dimmed">
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
    </Box>
  )
}
