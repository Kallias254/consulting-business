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
  rem,
  Group,
  useMantineTheme,
  Accordion,
  ThemeIcon,
  Badge,
  Divider,
} from '@mantine/core'
import { Navbar } from '../../_components/Navbar'
import { Footer } from '../../_components/Footer'
import Link from 'next/link'
import {
  IconCheck,
  IconArrowRight,
  IconQuote,
  IconCompass,
  IconTarget,
  IconMessageCircle,
  IconCertificate,
  IconAlertCircle,
} from '@tabler/icons-react'
import { SECTION_SPACING, INNER_WIDTH, READING_WIDTH } from '@/layout'

const faqs = [
  {
    q: 'Is the introductory consultation really free?',
    a: 'Yes. We offer a 15-minute introductory call at no cost. This is a diagnostic conversation to understand your specific challenges and determine if our advisory approach is the right fit for your project.',
  },
  {
    q: 'Is this service allowed by my university?',
    a: 'Absolutely. Our coaching is strictly instructional and developmental. We provide the same type of high-level advisory support that a faculty mentor or committee member provides—just with more frequency and accessibility. We do not do the work for you.',
  },
  {
    q: 'Will my research be treated confidentially?',
    a: 'Confidentiality is a pillar of our firm. All manuscripts, data, and discussions are handled with strict privacy protocols. We are happy to provide a formal Non-Disclosure Agreement (NDA) prior to beginning our work together.',
  },
  {
    q: 'Can you write my dissertation or thesis for me?',
    a: 'No. We maintain strict academic and ethical standards. We never ghostwrite, conduct original research, or run primary data analysis on your behalf. Our role is to provide the structural scaffolding and expert guidance so you can produce your own defensible work.',
  },
  {
    q: 'How much does Private Coaching cost?',
    a: 'We operate on a flexible retainer basis. Our standard packages include the 5-hour Strategic Sprint ($750), the 10-hour Milestone Partnership ($1,400), and the 20-hour Full-Cycle Journey ($2,600).',
  },
  {
    q: 'How is coaching different from your editing services?',
    a: 'Coaching is a live, collaborative video session designed to help you solve complex academic puzzles in real-time. Editing is an asynchronous service where we polish a manuscript you have already written.',
  },
  {
    q: 'Should I book 30 minutes or 60 minutes?',
    a: 'We generally recommend the 60-minute deep dive for complex methodology support or chapter restructuring. The 30-minute session is ideal for targeted feedback on a specific committee comment.',
  },
  {
    q: 'I still have questions…',
    a: "We are here to help. If your specific concern isn't addressed here, please book a free introductory call or email our advisory team at support@scholarcrafted.com.",
  },
]

export default function PrivateCoachingPage() {
  const theme = useMantineTheme()
  const active = theme.other

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* High-Impact Hero with Side-Box */}
      <Box component="section" pt={rem(140)} pb={rem(100)} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(80)}>
            <Stack gap="xl" justify="center">
              <Stack gap="xs">
                <Text
                  size="xs"
                  fw={700}
                  style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                  c={active.accent}
                >
                  1-ON-1 ADVISORY
                </Text>
                <Title
                  order={1}
                  mt="md"
                  style={{
                    fontSize: rem(64),
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: active.primary,
                    fontFamily: 'var(--font-serif)'
                  }}
                >
                  Strategic help for <br />
                  stalled researchers.
                </Title>
              </Stack>
              <Text size="lg" lh={1.6} c="dimmed" style={{ fontSize: rem(20) }}>
                Overcome structural roadblocks, contradictory feedback, and methodological anxiety with 
                intensive, personalized coaching from our faculty-level academic advisors.
              </Text>
              
              <Group gap="md">
                <Link href="/scholarcrafted/consultation?interest=coaching&metBefore=no" style={{ textDecoration: 'none' }}>
                  <Button size="lg" variant="filled" bg={active.primary} radius={0} className="impeccable-button">
                    BOOK INTRODUCTORY CALL
                  </Button>
                </Link>
                <Box>
                  <Text size="xs" fw={700} c={active.primary} style={{ letterSpacing: '0.05em' }}>NEXT AVAILABILITY</Text>
                  <Text size="sm" c="dimmed">Within 48 Hours</Text>
                </Box>
              </Group>
            </Stack>

            {/* Who this is for (Side-Box Style) */}
            <Box bg={active.surface} p={rem(40)} style={{ border: `1px solid oklch(0% 0 0 / 0.08)`, boxShadow: '0 4px 24px oklch(0% 0 0 / 0.02)' }}>
              <Stack gap="lg">
                <Title order={3} style={{ fontSize: rem(28), color: active.primary, fontFamily: 'var(--font-serif)' }}>
                  Who this is for
                </Title>
                <Stack gap="md">
                  {[
                    'Scholars stuck at the ABD stage for 6+ months.',
                    'Researchers navigating contradictory or vague feedback.',
                    'Non-traditional or first-gen students needing structural oversight.',
                    'Professionals balancing intensive careers with doctoral work.',
                  ].map((item, i) => (
                    <Group key={i} align="flex-start" gap="sm" wrap="nowrap">
                      <Box
                        w={6}
                        h={6}
                        mt={8}
                        bg={active.accent}
                        style={{ borderRadius: '50%', flexShrink: 0 }}
                      />
                      <Text size="sm" lh={1.5} fw={500} c={active.primary}>
                        {item}
                      </Text>
                    </Group>
                  ))}
                </Stack>
                <Divider color="oklch(0% 0 0 / 0.1)" mt="sm" />
                <Text size="xs" c="dimmed" style={{ fontStyle: 'italic' }}>
                  Coaching is a partnership. We provide the structural scaffolding while you maintain the authorial voice.
                </Text>
              </Stack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Common Challenges (The Empathy Section) */}
      <Box py={rem(100)} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}08` }}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(60)}>
            <Box>
              <Text size="xs" c={active.accent} fw={700} style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }} mb="sm">
                Common Roadblocks
              </Text>
              <Title order={2} style={{ fontSize: rem(48), color: active.primary, fontFamily: 'var(--font-serif)' }}>
                Recognize these challenges?
              </Title>
              <Text size="lg" c="dimmed" lh={1.7} mt="md" style={{ maxWidth: 800 }}>
                Most doctoral stalls aren&apos;t a lack of ability—they are a lack of structural clarity. 
                Our coaching is designed specifically to dismantle these hurdles.
              </Text>
            </Box>

            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={rem(32)}>
              {[
                {
                  title: 'The "Vague Feedback" Loop',
                  desc: 'Your chair gives you two vague sentences after three months of waiting. You don\'t know how to respond or what to change.',
                },
                {
                  title: 'Structural Paralysis',
                  desc: 'You have your data, but you can\'t figure out how to organize it into a coherent argument that flows across chapters.',
                },
                {
                  title: 'The Literature Sinkhole',
                  desc: 'You keep reading "just one more article" to feel ready, but your own draft remains unwritten and stalled.',
                },
                {
                  title: 'Isolation & Imposter Syndrome',
                  desc: 'Working entirely alone makes every decision feel heavy. You start to doubt if your research is even valid.',
                },
                {
                  title: 'Methodology Gridlock',
                  desc: 'You are terrified your research design won\'t hold up to committee scrutiny or during your final defense.',
                },
                {
                  title: 'Balancing Life & Research',
                  desc: 'Work and family take priority, and you lack the structured accountability to make consistent progress every week.',
                }
              ].map((challenge, i) => (
                <Box
                  key={i}
                  p={rem(40)}
                  bg="white"
                  style={{
                    border: `1px solid oklch(0% 0 0 / 0.08)`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: rem(12),
                  }}
                >
                  <ThemeIcon variant="light" color="red" radius="xl">
                    <IconAlertCircle size={18} />
                  </ThemeIcon>
                  <Title order={4} style={{ fontSize: rem(20), color: active.primary }}>{challenge.title}</Title>
                  <Text size="sm" lh={1.7} c="dimmed">{challenge.desc}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* How Coaching Supports You (The Roadmap) */}
      <Box component="section" py={SECTION_SPACING} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(80)}>
            <Box style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
              <Text size="xs" c={active.accent} fw={700} style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }} mb="sm">
                The Partnership
              </Text>
              <Title order={2} style={{ fontSize: rem(48), color: active.primary, fontFamily: 'var(--font-serif)' }}>
                How we walk with you.
              </Title>
              <Text size="lg" c="dimmed" lh={1.7} mt="md">
                We provide a rigorous, faculty-led partnership that takes you from 
                structural confusion to a defensible, finished manuscript.
              </Text>
            </Box>

            <Stack gap={rem(100)} mt="xl">
              {[
                {
                  step: '01',
                  title: 'The Diagnostic Phase',
                  subtitle: 'Untangling the Roadmap',
                  desc: 'We start by auditing your current progress, your committee feedback, and your research design. We identify exactly where the stall is happening and why.',
                  icon: IconCompass,
                  tasks: ['Audit of current drafts', 'De-coding committee feedback', 'Identifying structural gaps']
                },
                {
                  step: '02',
                  title: 'Strategic Milestones',
                  subtitle: 'Building the Schedule',
                  desc: 'We move from "hoping to finish" to a concrete calendar. We break your dissertation into manageable pieces with hyper-specific deliverables for each week.',
                  icon: IconTarget,
                  tasks: ['Custom writing schedules', 'Conceptual alignment checks', 'Chapter-level roadmaps']
                },
                {
                  step: '03',
                  title: 'Iterative Refinement',
                  subtitle: 'Execution & Feedback',
                  desc: 'This is where the work happens. We meet via video to solve methodological puzzles, review new drafts, and sharpen your authentic academic voice.',
                  icon: IconMessageCircle,
                  tasks: ['1-on-1 video deep dives', 'Structural draft reviews', 'Accountability check-ins']
                },
                {
                  step: '04',
                  title: 'Defense Readiness',
                  subtitle: 'Final Validation',
                  desc: 'As you approach submission, we pivot to defense coaching. We help you conceptualize your arguments so you can stand before your committee with absolute authority.',
                  icon: IconCertificate,
                  tasks: ['Mock defense sessions', 'Argument synthesis', 'Pre-submission audit']
                }
              ].map((phase, i) => (
                <Group key={i} align="flex-start" wrap="nowrap" gap={rem(60)}>
                  <Box style={{ flex: '0 0 120px' }} visibleFrom="md">
                    <Text fw={700} style={{ fontSize: rem(80), color: active.primary, opacity: 0.1, lineHeight: 1 }}>{phase.step}</Text>
                  </Box>
                  <Box style={{ flex: 1 }}>
                    <Group gap="sm" mb="xs">
                      <ThemeIcon size={32} radius="xl" variant="light" color={active.accent}>
                        <phase.icon size={18} />
                      </ThemeIcon>
                      <Text size="sm" fw={700} c={active.accent} style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>{phase.subtitle}</Text>
                    </Group>
                    <Title order={3} style={{ fontSize: rem(32), color: active.primary, marginBottom: rem(16) }}>{phase.title}</Title>
                    <Text size="md" lh={1.7} c="dimmed" mb="xl" style={{ maxWidth: 700 }}>{phase.desc}</Text>
                    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
                      {phase.tasks.map((task, j) => (
                        <Group key={j} gap="xs">
                          <IconCheck size={16} color={active.accent} stroke={3} />
                          <Text size="xs" fw={700} c={active.primary}>{task}</Text>
                        </Group>
                      ))}
                    </SimpleGrid>
                  </Box>
                </Group>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* The Packages */}
      <Box component="section" py={SECTION_SPACING} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}08` }}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(60)}>
            <Box style={{ textAlign: 'center' }}>
              <Text
                size="xs"
                fw={700}
                c={active.accent}
                style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}
                mb="sm"
              >
                Engagement Levels
              </Text>
              <Title order={2} style={{ fontSize: rem(48), color: active.primary, fontFamily: 'var(--font-serif)' }}>
                Advisory Retainers.
              </Title>
              <Text size="lg" lh={1.7} c="dimmed" mt="md" style={{ maxWidth: 700, margin: '0 auto' }}>
                All packages are activated following your free introductory call, where we assess your 
                needs and confirm the right level of engagement.
              </Text>
            </Box>
            
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(32)}>
              {/* Option A: 5 Hours */}
              <Box p={rem(40)} bg="white" style={{ border: `1px solid oklch(0% 0 0 / 0.08)`, display: 'flex', flexDirection: 'column' }}>
                <Stack gap="xl" flex={1}>
                  <Stack gap="xs">
                    <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      THE STRATEGIC SPRINT
                    </Text>
                    <Title order={3} style={{ fontSize: rem(28) }}>
                      5-Hour Retainer
                    </Title>
                    <Text fw={700} size="xl" c={active.primary}>$750 USD</Text>
                  </Stack>
                  <Text size="sm" c="dimmed" lh={1.6}>
                    Ideal for overcoming a specific roadblock, restructuring a single chapter, or preparing for an upcoming committee meeting.
                  </Text>
                  <Divider color="oklch(0% 0 0 / 0.05)" />
                  <Stack gap="xs">
                    <Group gap="xs">
                      <IconCheck size={14} color={active.accent} />
                      <Text size="xs">1-on-1 Video Advisory</Text>
                    </Group>
                    <Group gap="xs">
                      <IconCheck size={14} color={active.accent} />
                      <Text size="xs">Offline Document Review</Text>
                    </Group>
                  </Stack>
                </Stack>
                <Box mt={rem(40)}>
                  <Link href="/scholarcrafted/consultation" style={{ textDecoration: 'none' }}>
                    <Button variant="outline" color={active.primary} radius={0} fullWidth style={{ borderColor: active.primary }}>
                      Book Intro Call
                    </Button>
                  </Link>
                </Box>
              </Box>

              {/* Option B: 10 Hours */}
              <Box p={rem(40)} bg="white" style={{ border: `2px solid ${active.primary}`, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <Badge 
                  style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', borderRadius: 0, height: rem(28) }} 
                  color={active.primary} 
                  variant="filled"
                >
                  MOST POPULAR
                </Badge>
                <Stack gap="xl" flex={1}>
                  <Stack gap="xs">
                    <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      THE MILESTONE PARTNERSHIP
                    </Text>
                    <Title order={3} style={{ fontSize: rem(28) }}>
                      10-Hour Retainer
                    </Title>
                    <Text fw={700} size="xl" c={active.primary}>$1,400 USD</Text>
                  </Stack>
                  <Text size="sm" c="dimmed" lh={1.6}>
                    Perfect for navigating a major academic milestone, such as defending your proposal or analyzing complex data sets.
                  </Text>
                  <Divider color="oklch(0% 0 0 / 0.05)" />
                  <Stack gap="xs">
                    <Group gap="xs">
                      <IconCheck size={14} color={active.accent} />
                      <Text size="xs">Priority Scheduling</Text>
                    </Group>
                    <Group gap="xs">
                      <IconCheck size={14} color={active.accent} />
                      <Text size="xs">Full Structural Feedback</Text>
                    </Group>
                  </Stack>
                </Stack>
                <Box mt={rem(40)}>
                  <Link href="/scholarcrafted/consultation" style={{ textDecoration: 'none' }}>
                    <Button variant="filled" bg={active.primary} radius={0} fullWidth>
                      Book Intro Call
                    </Button>
                  </Link>
                </Box>
              </Box>

              {/* Option C: 20 Hours */}
              <Box p={rem(40)} bg="white" style={{ border: `1px solid oklch(0% 0 0 / 0.08)`, display: 'flex', flexDirection: 'column' }}>
                <Stack gap="xl" flex={1}>
                  <Stack gap="xs">
                    <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      THE FULL-CYCLE JOURNEY
                    </Text>
                    <Title order={3} style={{ fontSize: rem(28) }}>
                      20-Hour Retainer
                    </Title>
                    <Text fw={700} size="xl" c={active.primary}>$2,600 USD</Text>
                  </Stack>
                  <Text size="sm" c="dimmed" lh={1.6}>
                    Complete, high-touch support from stalled draft to final submission. We provide an expert sounding board and rigorous accountability.
                  </Text>
                  <Divider color="oklch(0% 0 0 / 0.05)" />
                  <Stack gap="xs">
                    <Group gap="xs">
                      <IconCheck size={14} color={active.accent} />
                      <Text size="xs">Strategic Oversight</Text>
                    </Group>
                    <Group gap="xs">
                      <IconCheck size={14} color={active.accent} />
                      <Text size="xs">Unlimited Document Access</Text>
                    </Group>
                  </Stack>
                </Stack>
                <Box mt={rem(40)}>
                  <Link href="/scholarcrafted/consultation" style={{ textDecoration: 'none' }}>
                    <Button variant="outline" color={active.primary} radius={0} fullWidth style={{ borderColor: active.primary }}>
                      Book Intro Call
                    </Button>
                  </Link>
                </Box>
              </Box>
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box component="section" py={SECTION_SPACING} bg={active.background} style={{ borderTop: `1px solid ${active.primary}08` }}>
        <Container size={800}>
          <Stack gap="xl">
            <Box style={{ textAlign: 'center' }}>
              <Text size="xs" c="dimmed" fw={700} style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                FAQ
              </Text>
              <Title order={2} mt="md" style={{ fontSize: rem(36), color: active.primary, fontFamily: 'var(--font-serif)' }}>
                Common Concerns
              </Title>
            </Box>
            <Accordion variant="separated">
              {faqs.map((faq: any, i: number) => (
                <Accordion.Item key={i} value={`faq-${i}`} style={{ backgroundColor: active.surface, border: '1px solid #eee' }}>
                  <Accordion.Control style={{ fontWeight: 600, color: active.primary }}>
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
    </Box>
  )
}
