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
} from '@mantine/core'
import { Navbar } from '../../_components/Navbar'
import { Footer } from '../../_components/Footer'
import { EditorialCard, EditorialReveal, ReadingProgressBar } from '../../_components/EditorialPrimitives'
import Link from 'next/link'
import {
  IconCheck,
  IconArrowRight,
  IconShieldCheck,
  IconFileText,
  IconScale,
  IconRefresh,
} from '@tabler/icons-react'
import { SECTION_SPACING } from '@/layout'

const grantFaqs = [
  {
    q: 'What types of grants and fellowships do you support?',
    a: 'We support faculty and Principal Investigators preparing federal, institutional, and foundation applications—including NSF, NIH, NEH, Fulbright Scholar awards, UNCF/Henry C. McBay fellowships, and university internal seed grants.',
  },
  {
    q: 'Do you write the research agenda or scientific claims?',
    a: 'No. In strict alignment with COPE and federal funding ethics, you own the scientific questions, preliminary data, and intellectual direction. We structure the narrative architecture, align deliverables to reviewer scoring rubrics, synchronize multi-PI sections, and ensure zero formatting or compliance defects.',
  },
  {
    q: 'Can our grant or departmental startup funds cover your fee?',
    a: 'Yes. Many faculty startup packages, departmental research budgets, and fellowship allocations include line items for editorial and publication production support. We issue clean, itemized institutional invoices and W-9 documentation.',
  },
  {
    q: 'How quickly can you turn around an urgent grant deadline?',
    a: 'Standard grant and fellowship production engagements run 5–10 business days depending on page count and multi-investigator complexity. Expedited timelines for imminent submission windows are confirmed within 24 hours of your brief.',
  },
]

export default function GrantFellowshipProductionPage() {
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
              Reviewer-Ready Grant &amp; Fellowship Production.
            </Title>

            <Text size="lg" c="dimmed" lh={1.75} style={{ maxWidth: '64ch' }}>
              Designed for individual fellows and collaborative research teams working against hard institutional cutoffs. We architect persuasive grant narratives, unify multi-author sections, and lock in agency compliance.
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* ── The 3-Phase Grant Production Process ── */}
      <Box component="section" py={SECTION_SPACING} bg={active.background}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap={rem(48)}>
            <Box style={{ maxWidth: 760 }}>
              <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                THE PRODUCTION METHODOLOGY
              </Text>
              <Title order={2} mt="xs" style={{ fontFamily: 'var(--font-serif)', fontSize: rem(32), color: active.primary, fontWeight: 600 }}>
                How we turn research agendas into fundable grant packets.
              </Title>
              <Text size="md" c="dimmed" mt="md" lh={1.7}>
                Strong ideas lose funding when significance is buried, co-PI sections clash, or agency formatting rules are missed. We handle the structural and technical load.
              </Text>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(24)}>
              {[
                {
                  phase: 'PHASE 01',
                  title: 'Narrative & Rubric Alignment',
                  desc: 'We map your project aims, broader impacts, and significance directly against the funding agency’s reviewer scoring criteria.',
                  bullets: [
                    'Specific Aims & executive summary sharpening',
                    'Review-panel logic & clarity audit',
                    'Timeline & milestone feasibility framing',
                  ],
                },
                {
                  phase: 'PHASE 02',
                  title: 'Co-Author & Technical Synchronization',
                  desc: 'Whether an individual fellowship or a multi-institution grant, we unify voice, terminology, and formatting across all narrative sections, biosketches, and supporting letters.',
                  bullets: [
                    'Individual or co-investigator section harmonization',
                    'LaTeX, Typst & BibTeX document engineering',
                    'Reference & citation forensics',
                  ],
                },
                {
                  phase: 'PHASE 03',
                  title: 'Agency Compliance & Submission Pack',
                  desc: 'Final pre-submission audit covering page limits, margin/font specs, budget justification clarity, and clean institutional invoicing.',
                  bullets: [
                    'Strict NSF/NIH/Foundation spec verification',
                    'Biosketch & facilities statement polish',
                    'W-9 & grant-compatible itemized invoicing',
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

      {/* ── Quality Commitments ── */}
      <Box component="section" py={SECTION_SPACING} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}12` }}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap={rem(40)}>
            <Box style={{ maxWidth: 760 }}>
              <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                INSTITUTIONAL ASSURANCES
              </Text>
              <Title order={2} mt="xs" style={{ fontFamily: 'var(--font-serif)', fontSize: rem(30), color: active.primary, fontWeight: 600 }}>
                Built for funded researchers and tight submission windows:
              </Title>
            </Box>

            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={rem(20)}>
              {[
                {
                  icon: <IconFileText size={22} color={active.accent} />,
                  title: 'LaTeX & Agency Specs',
                  desc: 'Precision formatting across NSF, NIH, NEH, Fulbright, and foundation templates without layout breaks.',
                },
                {
                  icon: <IconScale size={22} color={active.accent} />,
                  title: 'Strict Authorship Ethics',
                  desc: 'Your hypotheses, data, and intellectual claims remain 100% yours under COPE and federal standards.',
                },
                {
                  icon: <IconShieldCheck size={22} color={active.accent} />,
                  title: 'Enforceable NDA',
                  desc: 'Unpublished preliminary findings and grant concepts remain protected under strict non-disclosure.',
                },
                {
                  icon: <IconRefresh size={22} color={active.accent} />,
                  title: 'Resubmission Coverage',
                  desc: '365-day support for panel feedback revisions and secondary fellowship cycles at zero extra charge.',
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

      {/* ── Milestone Scoping CTA (Single Winning CTA) ── */}
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
                  Scoped for Grants, Fellowships &amp; Research Budgets.
                </Title>
                <Text size="sm" c="dimmed" lh={1.7}>
                  Share your funding call, page requirements, and submission deadline. Within 24 hours, we deliver an itemized milestone schedule aligned to your institutional timeline.
                </Text>
                <Stack gap={rem(8)}>
                  {[
                    'Fixed milestone roadmap built around your agency submission cutoff',
                    'Multi-investigator coordination & biosketch/reference synchronization',
                    'Clean itemized invoicing compatible with startup & grant funds',
                    '365 days of panel-feedback resubmission coverage included',
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
                  Request Grant Project Scope
                </Text>
                <Text size="xs" c="dimmed" mt={rem(8)} mb="lg" lh={1.6}>
                  Receive an itemized milestone roadmap and confirmed delivery schedule within 24 hours.
                </Text>

                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                  <Link href="/order?type=grant" style={{ textDecoration: 'none' }}>
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
                      Plan Grant Packet
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
                Grant &amp; Fellowship Production FAQs
              </Title>
            </Box>

            <Accordion>
              {grantFaqs.map((faq, i) => (
                <Accordion.Item key={i} value={`grant-faq-${i}`}>
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
