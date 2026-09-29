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
    q: 'Is this service allowed by my university?',
    a: 'Absolutely. Our advisory is strictly instructional and developmental. We provide the same type of high-level advisory support that a faculty mentor or senior research director provides—just with more frequency and accessibility. We do not do the work for you.',
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
        <Container size={1200}>
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
                  Strategic Advisory & Academic Counsel
                </Title>
              </Stack>
              <Text size="lg" lh={1.6} c="dimmed" style={{ fontSize: rem(20) }}>
                Defend your Master's thesis or doctoral dissertation, dismantle advisor roadblocks, and navigate early-career tenure with 1-on-1 counsel led by Dr. Micah Dobson—College Board AP Research Reader and faculty peer.
              </Text>
              
              <Group gap="md">
                <Link href="/scholarcrafted/consultation?interest=coaching" style={{ textDecoration: 'none' }}>
                  <Button size="lg" variant="filled" bg={active.primary} radius={0} className="impeccable-button">
                    BOOK ADVISORY SESSION
                  </Button>
                </Link>
                <Box>
                  <Text size="xs" fw={700} c={active.primary} style={{ letterSpacing: '0.05em' }}>NEXT AVAILABILITY</Text>
                  <Text size="sm" c="dimmed">Within 48 Hours</Text>
                </Box>
              </Group>
            </Stack>

            {/* Who this is for (Side-Box Style) */}
            <Box 
              bg={active.surface} 
              p={rem(40)} 
              style={{ 
                border: `1px solid oklch(0% 0 0 / 0.08)`, 
                boxShadow: '0 4px 24px oklch(0% 0 0 / 0.02)',
                alignSelf: 'flex-start'
              }}
            >
              <Stack gap="md">
                <Badge variant="outline" color="dark" radius={0} size="sm" style={{ alignSelf: 'flex-start' }}>
                  CERTIFIED EVALUATION
                </Badge>
                <Title order={3} style={{ fontSize: rem(26), color: active.primary, fontFamily: 'var(--font-serif)' }}>
                  Who this is for
                </Title>
                <Text size="sm" lh={1.7} c={active.primary} style={{ fontSize: rem(15) }}>
                  Designed for{' '}
                  <span className="text-hover-underline">
                    Master's and doctoral scholars preparing for proposal or final defense
                  </span>
                  ,{' '}
                  <span className="text-hover-underline">
                    candidates stalled by contradictory committee feedback
                  </span>
                  , and{' '}
                  <span className="text-hover-underline">
                    tenure-track faculty orchestrating publication pipelines
                  </span>
                  —providing the{' '}
                  <span className="text-hover-underline">
                    rigorous research design evaluation and momentum
                  </span>{' '}
                  needed to finish with complete confidence.
                </Text>
                <Divider color="oklch(0% 0 0 / 0.06)" />
                <Text size="xs" c="dimmed" style={{ fontStyle: 'italic', lineHeight: 1.4 }}>
                  Led by an AP Research Reader for the College Board, evaluating high-stakes academic research design.
                </Text>
              </Stack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Common Challenges (The Empathy Section) */}
      <Box py={rem(100)} className="academic-watermark" bg={active.surface} style={{ borderTop: `1px solid ${active.primary}08` }}>
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
                  title: 'The Peer-Review Deadlock',
                  desc: 'A journal reviewer sends a list of structural objections. You need a strategic response matrix to defend your design choices without provoking rejection.',
                },
                {
                  title: 'Structural Narrative Flow',
                  desc: 'You have generated substantial findings, but are struggling to frame the macro-level argument and logical transitions across chapters.',
                },
                {
                  title: 'Grant Narrative Strain',
                  desc: 'Your NSF, NIH, or fellowship proposals are getting rejected because the methodology isn\'t aligned with the funding agency\'s priorities.',
                },
                {
                  title: 'Contributor Logistical Friction',
                  desc: 'You are editing a handbook or volume and need to manage multiple external authors, all submitting inconsistent layouts and citations.',
                },
                {
                  title: 'Methodological Defensibility',
                  desc: 'Ensuring your R, SPSS, or qualitative thematic codebooks hold up to rigorous auditor scrutiny and reviewer methodologies.',
                },
                {
                  title: 'Version & Revision Control Chaos',
                  desc: 'Managing revisions across multiple co-authors, lost email threads, and mismatched draft versions.',
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
                We provide a rigorous, faculty-led operations pipeline that moves your draft from raw text to publication compliance.
              </Text>
            </Box>
 
            <Box style={{ position: 'relative', marginTop: rem(40) }}>
              {/* Vertical Timeline Connection Line */}
              <Box 
                style={{ 
                  position: 'absolute', 
                  left: rem(24), 
                  top: rem(24), 
                  bottom: rem(24), 
                  width: '2px', 
                  backgroundColor: `${active.accent}20`,
                  zIndex: 0
                }}
                visibleFrom="sm"
              />
 
              <Stack gap={rem(80)}>
                {[
                  {
                    step: '01',
                    title: 'The Pipeline Audit',
                    subtitle: 'Diagnostic Phase',
                    desc: 'We start by auditing your current progress, your reviewer comments, and your research outline. We identify exactly where the structural stall is happening.',
                    icon: IconCompass,
                    tasks: [
                      'Detailed audit of your draft manuscripts',
                      'Direct de-coding of reviewer feedback',
                      'Identifying and mapping structural gaps',
                      'Locating logic or references bottlenecks'
                    ]
                  },
                  {
                    step: '02',
                    title: 'The Milestone Map',
                    subtitle: 'Building the Schedule',
                    desc: 'We establish a clear schedule mapped to target journal submission cycles. We break the manuscript into scoped, logical writing deliverables.',
                    icon: IconTarget,
                    tasks: [
                      'Custom manuscript writing schedules',
                      'Regular conceptual alignment checks',
                      'Detailed milestone roadmaps per chapter',
                      'Setting realistic journal submission goals'
                    ]
                  },
                  {
                    step: '03',
                    title: 'Iterative Async Refinement',
                    subtitle: 'Execution & Loom Reviews',
                    desc: 'This is where the heavy lifting happens. We conduct deep-dive audits of your drafts asynchronously, sending high-impact Loom feedback videos and PDF markups.',
                    icon: IconMessageCircle,
                    tasks: [
                      'Asynchronous structural manuscript audits',
                      'Detailed, marginal PDF feedback commentary',
                      'Loom video walkthroughs of logic edits',
                      'Step-by-step drafting and layout counsel'
                    ]
                  },
                  {
                    step: '04',
                    title: 'Publisher Clearance',
                    subtitle: 'Final Validation',
                    desc: 'As you approach submission, we verify layout compliance, bibliography integrity, and the formatting of your Response to Reviewers matrix.',
                    icon: IconCertificate,
                    tasks: [
                      'Strict publisher style-guide audits',
                      'Verification of Response to Reviewers matrices',
                      'Technical pre-submission BibTeX auditing',
                      'Liaison support for editorial queries'
                    ]
                  }
                ].map((phase, i) => (
                  <Group key={i} align="flex-start" wrap="nowrap" gap="xl" style={{ position: 'relative', zIndex: 1 }}>
                    {/* Timeline Node Badge */}
                    <Box 
                      style={{ 
                        flex: '0 0 50px', 
                        height: '50px', 
                        borderRadius: '50%', 
                        backgroundColor: active.background,
                        border: `2px solid ${active.accent}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 0 0 4px ${active.background}`,
                      }}
                      visibleFrom="sm"
                    >
                      <Text fw={700} style={{ fontSize: rem(18), color: active.accent, fontFamily: 'var(--font-serif)' }}>{phase.step}</Text>
                    </Box>

                    <Box style={{ flex: 1, paddingLeft: rem(10) }}>
                      <Group gap="sm" mb="xs">
                        <ThemeIcon size={24} radius="xl" variant="light" color={active.accent} style={{ display: 'inline-flex' }}>
                          <phase.icon size={14} />
                        </ThemeIcon>
                        <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}>{phase.subtitle}</Text>
                      </Group>
                      
                      <Title order={3} style={{ fontSize: rem(28), color: active.primary, marginBottom: rem(12), fontFamily: 'var(--font-serif)' }}>
                        {phase.title}
                      </Title>
                      
                      <Text size="md" lh={1.7} c="dimmed" mb="lg" style={{ maxWidth: 700 }}>
                        {phase.desc}
                      </Text>
                      
                      {/* Vertical Bullets List instead of horizontal grid */}
                      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" style={{ maxWidth: 700 }}>
                        {phase.tasks.map((task, j) => (
                          <Group key={j} gap="sm" wrap="nowrap" align="flex-start">
                            <IconCheck size={16} color={active.accent} stroke={3} style={{ marginTop: rem(2) }} />
                            <Text size="sm" c={active.primary} lh={1.4}>{task}</Text>
                          </Group>
                        ))}
                      </SimpleGrid>
                    </Box>
                  </Group>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* The Packages */}
      <Box component="section" className="academic-watermark" py={SECTION_SPACING} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}08` }}>
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
              <Text size="lg" lh={1.7} c="dimmed" style={{ 
                maxWidth: 700, 
                marginLeft: 'auto', 
                marginRight: 'auto',
                marginTop: 'var(--mantine-spacing-md)',
                marginBottom: 0
              }}>
                All packages are activated following your free introductory call, where we assess your
                needs and confirm the right level of engagement.
              </Text>            </Box>
                 <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(32)}>
              {/* Option A: 5 Hours */}
              <Box p={rem(40)} bg="white" style={{ border: `1px solid oklch(0% 0 0 / 0.08)`, display: 'flex', flexDirection: 'column' }}>
                <Stack gap="xl" flex={1}>
                  <Stack gap="xs">
                    <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      THE STRATEGIC SPRINT
                    </Text>
                    <Title order={3} style={{ fontSize: rem(28) }}>
                      Advisory Sprint
                    </Title>
                    <Text fw={700} size="xl" c={active.primary}>$750 USD</Text>
                  </Stack>
                  <Text size="sm" c="dimmed" lh={1.6}>
                    Ideal for overcoming a specific reviewer deadlock, restructuring a single chapter, or preparing a grant brief.
                  </Text>
                  <Divider color="oklch(0% 0 0 / 0.05)" />
                  <Stack gap="xs">
                    <Group gap="xs">
                      <IconCheck size={14} color={active.accent} />
                      <Text size="xs">1 Structural Manuscript Audit</Text>
                    </Group>
                    <Group gap="xs">
                      <IconCheck size={14} color={active.accent} />
                      <Text size="xs">1 Loom Video Walkthrough</Text>
                    </Group>
                    <Group gap="xs">
                      <IconCheck size={14} color={active.accent} />
                      <Text size="xs">Dashboard Q&A Access</Text>
                    </Group>
                  </Stack>
                </Stack>
                <Box mt={rem(40)}>
                  <Link href="/scholarcrafted/consultation?interest=coaching" style={{ textDecoration: 'none' }}>
                    <Button variant="outline" color={active.primary} radius={0} fullWidth style={{ borderColor: active.primary }}>
                      Request Advisory Sprint
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
                      Milestone Retainer
                    </Title>
                    <Text fw={700} size="xl" c={active.primary}>$1,400 USD</Text>
                  </Stack>
                  <Text size="sm" c="dimmed" lh={1.6}>
                    Perfect for major milestones: book proposals, full grant cycles, or response to journal revision requests.
                  </Text>
                  <Divider color="oklch(0% 0 0 / 0.05)" />
                  <Stack gap="xs">
                    <Group gap="xs">
                      <IconCheck size={14} color={active.accent} />
                      <Text size="xs">2 Detailed Manuscript Audits</Text>
                    </Group>
                    <Group gap="xs">
                      <IconCheck size={14} color={active.accent} />
                      <Text size="xs">2 Loom Feedback Walkthroughs</Text>
                    </Group>
                    <Group gap="xs">
                      <IconCheck size={14} color={active.accent} />
                      <Text size="xs">1 Strategic Alignment Call (30 min)</Text>
                    </Group>
                  </Stack>
                </Stack>
                <Box mt={rem(40)}>
                  <Link href="/scholarcrafted/consultation?interest=coaching" style={{ textDecoration: 'none' }}>
                    <Button variant="filled" bg={active.primary} radius={0} fullWidth>
                      Request Milestone Retainer
                    </Button>
                  </Link>
                </Box>
              </Box>
 
              {/* Option C: 20 Hours */}
              <Box p={rem(40)} bg="white" style={{ border: `1px solid oklch(0% 0 0 / 0.08)`, display: 'flex', flexDirection: 'column' }}>
                <Stack gap="xl" flex={1}>
                  <Stack gap="xs">
                    <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      THE PIPELINE RETINER
                    </Text>
                    <Title order={3} style={{ fontSize: rem(28) }}>
                      Full Pipeline Retainer
                    </Title>
                    <Text fw={700} size="xl" c={active.primary}>$2,600 USD</Text>
                  </Stack>
                  <Text size="sm" c="dimmed" lh={1.6}>
                    Continuous monthly async support for your active lab team, grant submissions, and publisher correspondence loops.
                  </Text>
                  <Divider color="oklch(0% 0 0 / 0.05)" />
                  <Stack gap="xs">
                    <Group gap="xs">
                      <IconCheck size={14} color={active.accent} />
                      <Text size="xs">Continuous Async Document Audits</Text>
                    </Group>
                    <Group gap="xs">
                      <IconCheck size={14} color={active.accent} />
                      <Text size="xs">Unlimited Loom Feedback Walkthroughs</Text>
                    </Group>
                    <Group gap="xs">
                      <IconCheck size={14} color={active.accent} />
                      <Text size="xs">2 Priority Alignment Syncs</Text>
                    </Group>
                  </Stack>
                </Stack>
                <Box mt={rem(40)}>
                  <Link href="/scholarcrafted/consultation?interest=coaching" style={{ textDecoration: 'none' }}>
                    <Button variant="outline" color={active.primary} radius={0} fullWidth style={{ borderColor: active.primary }}>
                      Request Pipeline Retainer
                    </Button>
                  </Link>
                </Box>
              </Box>
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box component="section" className="academic-watermark" py={SECTION_SPACING} bg={active.background} style={{ borderTop: `1px solid ${active.primary}08` }}>
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

      <style jsx global>{`
        .text-hover-underline {
          position: relative;
          text-decoration: none !important;
          display: inline;
          cursor: pointer;
        }
        .text-hover-underline::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1.5px;
          bottom: -1px;
          left: 0;
          background-color: ${active.primary};
          transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .text-hover-underline:hover::after {
          width: 100%;
        }
      `}</style>
    </Box>
  )
}
