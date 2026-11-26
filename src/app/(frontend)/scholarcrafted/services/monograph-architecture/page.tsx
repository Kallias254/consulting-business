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
import { EditorialCard, EditorialReveal, ReadingProgressBar } from '../../_components/EditorialPrimitives'
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
      <ReadingProgressBar />
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
            <Title
              order={1}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.3rem, 4.8vw, 3.6rem)',
                fontWeight: 600,
                lineHeight: 1.12,
                color: active.primary,
                letterSpacing: '-0.02em',
              }}
            >
              From Concept &amp; Chapters to Contracted Books &amp; Edited Handbooks.
            </Title>

            <Text size="lg" c="dimmed" lh={1.75} style={{ maxWidth: '64ch' }}>
              Acquisition press proposals, multi-contributor handbook management, and 5-stage book production for faculty and volume editors targeting Routledge, Cognella, Oxford, and Cambridge.
            </Text>

            {/* Quality Specs */}
            <Box pt="md" style={{ borderTop: `1px solid ${active.primary}12` }}>
              <Text size="xs" c="dimmed" style={{ letterSpacing: '0.04em' }}>
                Acquisition Proposals &bull; Multi-Contributor Handbooks &bull; Cindex/SKY Indexing &bull; Press-Ready Compliance
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

            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={rem(20)}>
              {[
                {
                  stage: 'STAGE 01',
                  title: 'Book & Handbook Architecture',
                  desc: 'Cumulative chapter mapping, de-dissertationizing voice, or structuring 15–25 contributor chapters into one cohesive volume.',
                },
                {
                  stage: 'STAGE 02',
                  title: 'Contributor & Chapter Production',
                  desc: 'Managing multi-author submissions, enforcing uniform style & citations across chapters, and maintaining scholarly voice continuity.',
                },
                {
                  stage: 'STAGE 03',
                  title: 'Press Acquisition Proposal',
                  desc: 'Crafting the acquisition prospectus: market positioning, competitive title matrix, chapter outlines, and sample chapters.',
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
                <EditorialReveal key={i} delay={i * 60}>
                  <EditorialCard
                    p={{ base: rem(24), md: rem(28) }}
                    bg={active.surface}
                    featured={i === 0}
                    style={{ height: '100%' }}
                  >
                    <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.14em' }}>
                      {stg.stage}
                    </Text>
                    <Title order={3} mt={rem(8)} mb={rem(10)} style={{ fontFamily: 'var(--font-serif)', fontSize: rem(19), color: active.primary, fontWeight: 600, lineHeight: 1.3 }}>
                      {stg.title}
                    </Title>
                    <Text size="xs" c="dimmed" lh={1.65}>
                      {stg.desc}
                    </Text>
                  </EditorialCard>
                </EditorialReveal>
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
                  title: 'Multi-Author Volume Sync',
                  desc: 'Keep terminology, citation conventions, and structural pacing unified across 15–25+ handbook contributors.',
                },
                {
                  icon: <IconFileText size={22} color={active.accent} />,
                  title: 'Acquisition-Ready Proposals',
                  desc: 'Formatted to Routledge, Cognella, Oxford, and Cambridge prospectus guidelines—from pitch to competitor matrix.',
                },
                {
                  icon: <IconShieldCheck size={22} color={active.accent} />,
                  title: 'Strict Non-Disclosure',
                  desc: 'Unpublished book manuscripts and primary archival findings are secured under binding legal NDAs.',
                },
                {
                  icon: <IconRefresh size={22} color={active.accent} />,
                  title: '365-Day Press Coverage',
                  desc: 'Secondary revision passes included when press peer reviewers or acquisition editors issue revision memos.',
                },
              ].map((feat, i) => (
                <EditorialReveal key={i} delay={i * 60}>
                  <EditorialCard p={{ base: rem(24), md: rem(28) }} bg={active.background} style={{ height: '100%' }}>
                    <Box mb="md">{feat.icon}</Box>
                    <Text fw={700} size="sm" c={active.primary} mb={rem(6)}>
                      {feat.title}
                    </Text>
                    <Text size="xs" c="dimmed" lh={1.65}>
                      {feat.desc}
                    </Text>
                  </EditorialCard>
                </EditorialReveal>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* ── Transparent Milestone Pricing ── */}
      <Box component="section" py={SECTION_SPACING} bg={active.background} style={{ borderTop: `1px solid ${active.primary}12` }}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <EditorialCard
            p={{ base: rem(28), sm: rem(36), md: rem(48) }}
            bg={active.surface}
            interactive={false}
          >
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: rem(24), md: rem(48) }} style={{ alignItems: 'center' }}>
              <Stack gap="md">
                <Title order={2} style={{ fontFamily: 'var(--font-serif)', fontSize: rem(28), color: active.primary, fontWeight: 600 }}>
                  Scoped for Books, Handbooks &amp; Institutional Budgets.
                </Title>
                <Text size="sm" c="dimmed" lh={1.7}>
                  Whether you are pitching a single-author textbook or coordinating 20 handbook contributors under a Routledge deadline, we structure each engagement around clear production milestones and institutional invoicing.
                </Text>
                <Stack gap={rem(8)}>
                  {[
                    'Chapter-by-chapter or stage-based milestone schedule tailored to your press timeline',
                    'Acquisition prospectus, competitive title matrix & sample chapter packaging',
                    'Multi-contributor coordination, style enforcement & Cindex/SKY indexing',
                    '365 days of press revision memo coverage included at zero extra charge',
                    'Itemized institutional invoicing compatible with startup funds, subventions & grants',
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
                <Text mt="xs" style={{ fontFamily: 'var(--font-serif)', fontSize: rem(24), fontWeight: 600, color: active.primary }}>
                  Request Monograph Scope
                </Text>
                <Text size="xs" c="dimmed" mt={rem(8)} mb="lg" lh={1.6}>
                  Receive an itemized milestone proposal and confirmed publication schedule within 24 hours.
                </Text>

                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
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
                      Plan Book Project
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
                      Book a Call
                    </Button>
                  </Anchor>
                </SimpleGrid>
              </Box>
            </SimpleGrid>
          </EditorialCard>
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
