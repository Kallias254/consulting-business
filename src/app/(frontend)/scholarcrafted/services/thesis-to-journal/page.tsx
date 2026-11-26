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
import { EditorialCard, EditorialReveal, ReadingProgressBar } from '../../_components/EditorialPrimitives'
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
    a: 'Rather than charging unpredictable micro-fees by word count, we deliver a single integrated milestone proposal tailored to your manuscript. Engagements are structured with a 50% deposit upon project initiation and 50% upon final delivery of submission-ready files. Within 24 hours of receiving your project brief, Dr. Micah Dobson personally assesses your draft and delivers an itemized milestone roadmap with guaranteed delivery dates.',
  },
]

export default function ThesisToJournalPage() {
  const theme = useMantineTheme()
  const active = theme.other

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <ReadingProgressBar />
      <Navbar />

      {/* ── Hero Section ── */}
      <Box
        component="section"
        pt={{ base: rem(76), md: rem(112) }}
        pb={{ base: rem(64), md: rem(88) }}
        bg={active.surface}
        style={{
          borderBottom: `1px solid ${active.primary}12`,
          position: 'relative',
        }}
      >
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap="lg" style={{ maxWidth: 880 }}>
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
              JOURNAL ARTICLES &amp; R&amp;R STRATEGY
            </Badge>

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
              Get Past the Editorial Desk &amp; Survive Peer Review.
            </Title>

            <Text size="lg" c="dimmed" lh={1.75} style={{ maxWidth: '64ch' }}>
              Most manuscripts aren&rsquo;t desk-rejected for grammar—they fail because dissertation framing obscures the core contribution, or Revise &amp; Resubmit memos go unanswered. ScholarCrafted architects journal-ready manuscripts, R&amp;R response matrices, and full submission compliance for Q1/Q2 targets.
            </Text>
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
                  title: 'Contribution Framing & Extraction',
                  desc: 'Dissertation chapters prove exhaustive reading; journal articles advance one sharp claim. We strip committee scaffolding and re-architect 18k–25k words into a tight 7k–9k word argument.',
                  bullets: [
                    'Theoretical hook & editorial-board fit',
                    'Literature review reframed from survey to live debate',
                    'Thesis-to-article structural blueprint',
                  ],
                },
                {
                  phase: 'PHASE 02',
                  title: 'Peer-Review Proofing & R&R Strategy',
                  desc: 'We stress-test your evidence-to-claim logic against typical Reviewer 1/2 objections—or build a complete point-by-point Revise & Resubmit response matrix.',
                  bullets: [
                    'Point-by-point R&R Reviewer Response Matrix',
                    'Diplomatic editor cover memo & revision alignment',
                    'Methodological & disciplinary register calibration',
                  ],
                },
                {
                  phase: 'PHASE 03',
                  title: 'Submission Compliance & Forensics',
                  desc: 'Eliminate technical desk rejections with house-style conversion (APA, Chicago, IEEE), LaTeX/Typst engineering, blind-review scrubbing, and verified DOIs.',
                  bullets: [
                    'Citation & DOI cross-audit against published records',
                    'Blind-review anonymization & cover letter package',
                    'Official Editorial Compliance Certificate',
                  ],
                },
              ].map((card, i) => (
                <EditorialReveal key={i} delay={i * 70}>
                  <EditorialCard
                    p={{ base: rem(24), md: rem(32) }}
                    bg={active.surface}
                    featured={i === 0}
                    style={{ height: '100%' }}
                  >
                    <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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

                      <Stack gap={rem(8)} mt="auto">
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
                  title: 'R&R Response Matrices',
                  desc: 'Structured point-by-point reviewer rebuttals synchronized directly to your revised manuscript.',
                },
                {
                  icon: <IconScale size={22} color={active.accent} />,
                  title: 'Zero Ghostwriting Pledge',
                  desc: 'COPE-compliant editorial architecture. You retain 100% intellectual ownership over your scholarship.',
                },
                {
                  icon: <IconRefresh size={22} color={active.accent} />,
                  title: '365-Day Reviewer Coverage',
                  desc: 'When your journal reviewers or committee issue revision memos, secondary passes are included at zero extra charge.',
                },
                {
                  icon: <IconCertificate size={22} color={active.accent} />,
                  title: 'Compliance Certificate',
                  desc: 'Official documentation certifying style manual conformity and submission readiness.',
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
                  Scoped to Your Manuscript. Built Around Your Deadline.
                </Title>
                <Text size="sm" c="dimmed" lh={1.7}>
                  Every submission has its own theoretical demands, journal house style, and timeline. Within 24 hours of receiving your brief, we return an itemized milestone roadmap with clear deliverables and fixed terms.
                </Text>
                <Stack gap={rem(8)}>
                  {[
                    'Contribution framing & structural extraction tailored to your target journal',
                    'Point-by-point R&R Reviewer Response Matrix & editor cover memo',
                    'House-style compliance, blind-review scrubbing & DOI verification',
                    '365-day secondary revision coverage for subsequent reviewer rounds',
                    'Official Editorial Compliance Certificate issued upon completion',
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

              <Stack gap="md" pl={{ md: rem(24) }}>
                <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontSize: rem(24), fontWeight: 600, color: active.primary, lineHeight: 1.25 }}>
                  Ready to move forward?
                </Title>
                <Text size="sm" c="dimmed" lh={1.65}>
                  Share your draft or reviewer memo and receive a clear project plan and timeline within 24 hours.
                </Text>

                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm" mt={rem(4)}>
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
                      Prepare Submission
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
                      Book a Call
                    </Button>
                  </a>
                </SimpleGrid>
              </Stack>
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
