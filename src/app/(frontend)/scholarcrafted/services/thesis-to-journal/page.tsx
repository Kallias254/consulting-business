'use client'

import React, { useState } from 'react'
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
  IconClock,
  IconShieldCheck,
  IconCertificate,
  IconFileText,
  IconMessages,
  IconScale,
  IconStar,
  IconChevronRight,
  IconLock,
  IconCpu,
  IconRefresh,
} from '@tabler/icons-react'
import { SECTION_SPACING } from '@/layout'

const trackAFaqs = [
  {
    q: 'How do you extract a journal article from a 25,000-word dissertation chapter?',
    a: 'Dissertation chapters are written to prove exhaustive competence to a committee; journal articles are written to advance a concise empirical or theoretical claim. Our doctoral specialists isolate your primary contribution, trim administrative dissertation scaffolding, and reorganize your argument into the standard 7,000–9,000 word architecture expected by top peer-reviewed journals.',
  },
  {
    q: 'Can you help with a Revise & Resubmit (R&R) decision from a journal?',
    a: 'Yes. Responding to reviewers is one of our core competencies. We construct a structured Reviewer Response Matrix, align your manuscript changes with tracked edits, and ensure every concern raised by Reviewer 1 and Reviewer 2 is diplomatically and thoroughly satisfied before resubmission.',
  },
  {
    q: 'What is your turnaround time for an article conversion?',
    a: 'Standard article conversions typically range between 5 and 10 business days depending on word count and structural complexity. If you have an urgent R&R window or tenure dossier deadline, expedited turnaround is available upon request.',
  },
  {
    q: 'Do you work in LaTeX and BibTeX?',
    a: 'Yes. We frequently edit in LaTeX, Typst, and Markdown, cross-checking BibTeX references and resolving layout or template formatting issues. We return tracked changes either directly in source code or through commented PDF/Word files.',
  },
  {
    q: 'How does your milestone pricing work?',
    a: 'Rather than charging unpredictable micro-fees by word count, we deliver a single integrated milestone proposal (typically $600–$1,800). Terms are structured with 50% upfront deposit and 50% upon final delivery. Within 24 hours of receiving your project brief, Dr. Micah Dobson delivers an itemized milestone proposal outlining exact deliverables, schedule, and pricing.',
  },
]

export default function ThesisToJournalPage() {
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
              PEER-REVIEWED JOURNAL PIPELINE
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
              Turn Your Dissertation Chapters into Peer-Reviewed Journal Articles.
            </Title>

            <Text size="lg" c="dimmed" lh={1.75} style={{ maxWidth: '64ch' }}>
              Stop getting desk-rejected for structural bloat. ScholarCrafted provides structural chapter extraction, substantive developmental line editing, and complete target journal compliance—delivered with 100% Track Changes by doctoral specialists.
            </Text>

            <Group gap="md" wrap="wrap" pt="sm">
              <Link href="/order?track=a" style={{ textDecoration: 'none' }}>
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
                  Request Article Project Scope
                </Button>
              </Link>
              <a
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
                  Book 15-Min Scoping Call
                </Button>
              </a>
            </Group>

            {/* Quality Badges */}
            <Box pt="md" style={{ borderTop: `1px solid ${active.primary}12` }}>
              <Text size="xs" c="dimmed" style={{ letterSpacing: '0.04em' }}>
                100% Human Doctoral Review &bull; Non-STEM &amp; Humanities Specialists &bull; Zero Ghostwriting &bull; Official Compliance Certificate
              </Text>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* ── The 3-Phase Conversion Process ── */}
      <Box component="section" py={SECTION_SPACING} bg={active.background}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap={rem(48)}>
            <Box style={{ maxWidth: 760 }}>
              <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                THE CONVERSION METHODOLOGY
              </Text>
              <Title order={2} mt="xs" style={{ fontFamily: 'var(--font-serif)', fontSize: rem(32), color: active.primary, fontWeight: 600 }}>
                How your dissertation chapter becomes an accepted journal article.
              </Title>
              <Text size="md" c="dimmed" mt="md" lh={1.7}>
                A dissertation chapter cannot simply be trimmed; it must be architecturally reconceived for a journal editorial board.
              </Text>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(24)}>
              {[
                {
                  phase: 'PHASE 01',
                  title: 'Structural Extraction & Mapping',
                  desc: 'We isolate your central empirical contribution, remove pedagogical dissertation throat-clearing, and condense 18k–25k words into a defensible 7k–9k word narrative.',
                  bullets: [
                    'Theoretical hook & novelty audit',
                    'Thesis condensation & narrative scoping',
                    'Literature review reframing (from survey to debate)',
                  ],
                },
                {
                  phase: 'PHASE 02',
                  title: 'Substantive Line Refinement',
                  desc: 'Line-by-line prose polish, passive syntax untangling, paragraph pacing, and academic register elevation delivered with 100% Word Track Changes.',
                  bullets: [
                    'Discipline-specific terminology verification',
                    'Evidence-to-claim alignment',
                    'Margin queries from senior doctoral editors',
                  ],
                },
                {
                  phase: 'PHASE 03',
                  title: 'Technical & Press Compliance',
                  desc: 'Complete formatting to target journal author guidelines (APA, Chicago, IEEE), LaTeX/Typst document engineering, and cover letter creation.',
                  bullets: [
                    'Reference & DOI cross-audit against 200M+ papers',
                    'Target journal submission cover letter',
                    'Official Editorial Compliance Certificate',
                  ],
                },
              ].map((card, i) => (
                <Box
                  key={i}
                  p={{ base: rem(24), md: rem(32) }}
                  bg={active.surface}
                  style={{
                    border: `1px solid ${active.primary}15`,
                    borderTop: `4px solid ${i === 0 ? active.accent : active.primary}`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.14em' }}>
                      {card.phase}
                    </Text>
                    <Title order={3} mt={rem(6)} style={{ fontFamily: 'var(--font-serif)', fontSize: rem(20), color: active.primary, fontWeight: 600 }}>
                      {card.title}
                    </Title>
                    <Text size="xs" c="dimmed" mt={rem(10)} lh={1.65}>
                      {card.desc}
                    </Text>

                    <Divider color={`${active.primary}10`} my={rem(18)} />

                    <Stack gap={rem(8)}>
                      {card.bullets.map((b, bi) => (
                        <Group key={bi} gap="xs" align="flex-start" wrap="nowrap">
                          <IconCheck size={14} color={active.accent} style={{ flexShrink: 0, marginTop: rem(3) }} />
                          <Text size="xs" c={active.primary} lh={1.5}>
                            {b}
                          </Text>
                        </Group>
                      ))}
                    </Stack>
                  </Box>
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
                STANDARD QUALITY COMMITMENTS
              </Text>
              <Title order={2} mt="xs" style={{ fontFamily: 'var(--font-serif)', fontSize: rem(30), color: active.primary, fontWeight: 600 }}>
                Every journal conversion engagement automatically includes:
              </Title>
            </Box>

            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={rem(20)}>
              {[
                {
                  icon: <IconFileText size={22} color={active.accent} />,
                  title: '100% Track Changes',
                  desc: 'Every syntactic adjustment, transition, and word replacement is visibly logged in Microsoft Word.',
                },
                {
                  icon: <IconScale size={22} color={active.accent} />,
                  title: 'Zero Ghostwriting Pledge',
                  desc: 'We never author original research. You retain 100% intellectual ownership over your findings.',
                },
                {
                  icon: <IconRefresh size={22} color={active.accent} />,
                  title: '365-Day Re-Editing',
                  desc: 'When your committee or journal reviewers request revisions, submit your draft for secondary passes at zero extra charge.',
                },
                {
                  icon: <IconCertificate size={22} color={active.accent} />,
                  title: 'Editorial Certificate',
                  desc: 'Official document certifying native academic English and publisher style manual conformity.',
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
              borderLeft: `5px solid ${active.accent}`,
            }}
          >
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: rem(24), md: rem(48) }} style={{ alignItems: 'center' }}>
              <Stack gap="md">
                <Badge
                  size="sm"
                  radius={0}
                  variant="filled"
                  style={{ backgroundColor: active.accent, color: '#ffffff', fontWeight: 700 }}
                >
                  TRANSPARENT 50/50 MILESTONES
                </Badge>
                <Title order={2} style={{ fontFamily: 'var(--font-serif)', fontSize: rem(28), color: active.primary, fontWeight: 600 }}>
                  Single Fixed Milestone Proposals
                </Title>
                <Text size="sm" c="dimmed" lh={1.7}>
                  Instead of calculating micro-fees on confusing per-word sliders, we deliver a comprehensive project proposal ($600–$1,800 depending on word count and developmental depth).
                </Text>
                <Stack gap={rem(8)}>
                  {[
                    '50% deposit upfront / 50% upon final delivery of submission-ready files',
                    'Full developmental line editing and structural argument restructuring included',
                    'Target journal guidelines compliance audit & cover letter included',
                    '365 days of complimentary committee/reviewer revision coverage included',
                    'Official Editorial Compliance Certificate issued upon final completion',
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
                  READY TO BEGIN?
                </Text>
                <Text mt="xs" style={{ fontFamily: 'var(--font-serif)', fontSize: rem(24), fontWeight: 600, color: active.primary }}>
                  Request Journal Article Scope
                </Text>
                <Text size="xs" c="dimmed" mt={rem(8)} mb="lg" lh={1.6}>
                  Receive your itemized milestone proposal and confirmed delivery timeline within 24 hours.
                </Text>

                <Stack gap="sm">
                  <Link href="/order?track=a" style={{ textDecoration: 'none' }}>
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
                  <a
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
                  </a>
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
                Journal Submission &amp; Article Conversion FAQs
              </Title>
            </Box>

            <Accordion>
              {trackAFaqs.map((faq, i) => (
                <Accordion.Item key={i} value={`track-a-faq-${i}`}>
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
