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
} from '@mantine/core'
import { Navbar } from '../../_components/Navbar'
import { Footer } from '../../_components/Footer'
import Link from 'next/link'
import { 
  IconCheck, 
  IconArrowRight, 
  IconMessageChatbot, 
  IconShieldCheck, 
  IconRocket, 
  IconBook2, 
  IconFileText, 
  IconCompass, 
  IconDatabase 
} from '@tabler/icons-react'
import { SECTION_SPACING, INNER_WIDTH } from '@/layout'

const faqs = [
  {
    q: 'Can you help convert a Master’s thesis or PhD dissertation into journal articles?',
    a: 'Yes. This is one of our most requested services. We help graduate scholars decompose a 100+ page dissertation into one or more tightly scoped, 6,000–8,000 word peer-reviewed manuscripts aligned with specific tier-1 journal guidelines.',
  },
  {
    q: 'How do you assist with academic book proposals?',
    a: 'We evaluate your manuscript or dissertation core, identify target presses (e.g., Routledge, Oxford, Palgrave, Cambridge), and help craft the market justification, chapter summaries, prospectus, and sample chapters required by acquisition editors.',
  },
  {
    q: 'Do you provide qualitative and statistical methodology support?',
    a: 'Yes. We support survey validation, quantitative statistical models (SPSS, R, STATA), and qualitative coding schemes (NVivo, ATLAS.ti) to ensure your methodology chapter is bulletproof before defense or peer review.',
  },
  {
    q: 'Will you write my paper or methodology chapter for me?',
    a: 'No. ScholarCrafted upholds absolute academic integrity. We structure frameworks, verify research design, and organize empirical evidence, but you remain the sole author. We do not provide ghostwriting.',
  },
]

export default function ResearchSupportPage() {
  const theme = useMantineTheme()
  const active = theme.other

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* Hero Section */}
      <Box component="section" pt={rem(140)} pb={rem(90)} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <Box style={{ maxWidth: 860 }}>
            <Badge variant="outline" color="dark" radius={0} size="sm" mb="sm">
              PILLAR 2: STRATEGIC PUBLICATION & RESEARCH
            </Badge>
            <Title
              order={1}
              mt="xs"
              style={{
                fontSize: rem(56),
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: active.primary,
                fontFamily: 'var(--font-serif)',
              }}
            >
              Academic Publishing Advisory & Research Design.
            </Title>
            <Text size="lg" mt="xl" c="dimmed" lh={1.7} style={{ fontSize: rem(20) }}>
              From transforming Master’s theses and doctoral dissertations into peer-reviewed journal articles, to structuring major university press book proposals and defending complex empirical methodologies.
            </Text>
            
            <Box mt={rem(40)}>
              <Link href="/scholarcrafted/consultation?service=Publishing%20%26%20Research%20Advisory" style={{ textDecoration: 'none' }}>
                <Button size="lg" variant="filled" bg={active.primary} radius={0} rightSection={<IconArrowRight size={18} />}>
                  BOOK STRATEGY CALL WITH DR. DOBSON
                </Button>
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* 3 Core Publishing Tracks */}
      <Box py={SECTION_SPACING} className="academic-watermark" bg={active.surface} style={{ borderTop: `1px solid ${active.primary}12` }}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(60)}>
            <Box style={{ maxWidth: 800 }}>
              <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Core Publishing Tracks
              </Text>
              <Title order={2} mt="xs" style={{ fontSize: rem(40), color: active.primary, fontFamily: 'var(--font-serif)' }}>
                Move beyond the dissertation into press-ready publication.
              </Title>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
              <Box p={rem(36)} bg={active.background} style={{ border: `1px solid ${active.primary}18` }}>
                <Stack gap="md">
                  <IconFileText size={32} color={active.accent} stroke={1.5} />
                  <Title order={3} style={{ fontSize: rem(22), fontFamily: 'var(--font-serif)' }}>
                    Thesis & Dissertation to Journal Conversion
                  </Title>
                  <Text size="sm" c="dimmed" lh={1.6}>
                    Turn your defense into publication equity. We help you extract standalone empirical papers from your Master’s thesis or doctoral monograph, reframing the literature review and discussion for target peer-reviewed journals.
                  </Text>
                  <Stack gap="xs" mt="xs">
                    {['6,000–8,000 word scoping', 'Journal aim & scope alignment', 'IMRaD synthesis', 'Reviewer response strategy'].map((item, i) => (
                      <Group key={i} gap="xs" align="center">
                        <IconCheck size={14} color={active.accent} />
                        <Text size="xs" c="dimmed">{item}</Text>
                      </Group>
                    ))}
                  </Stack>
                </Stack>
              </Box>

              <Box p={rem(36)} bg={active.background} style={{ border: `1px solid ${active.primary}18` }}>
                <Stack gap="md">
                  <IconBook2 size={32} color={active.accent} stroke={1.5} />
                  <Title order={3} style={{ fontSize: rem(22), fontFamily: 'var(--font-serif)' }}>
                    Book Proposals & Press Acquisition
                  </Title>
                  <Text size="sm" c="dimmed" lh={1.6}>
                    Secure acquisition interest with leading academic publishers (Routledge, Oxford, Palgrave, Cambridge). We assist in prospectus drafting, market positioning, chapter outlines, and sample chapter refinement.
                  </Text>
                  <Stack gap="xs" mt="xs">
                    {['Prospectus development', 'Market & peer review analysis', 'Handbook & edited volume strategy', 'Acquisitions editor alignment'].map((item, i) => (
                      <Group key={i} gap="xs" align="center">
                        <IconCheck size={14} color={active.accent} />
                        <Text size="xs" c="dimmed">{item}</Text>
                      </Group>
                    ))}
                  </Stack>
                </Stack>
              </Box>

              <Box p={rem(36)} bg={active.background} style={{ border: `1px solid ${active.primary}18` }}>
                <Stack gap="md">
                  <IconDatabase size={32} color={active.accent} stroke={1.5} />
                  <Title order={3} style={{ fontSize: rem(22), fontFamily: 'var(--font-serif)' }}>
                    Methodology Design & Systematic Reviews
                  </Title>
                  <Text size="sm" c="dimmed" lh={1.6}>
                    Bulletproof your research design. We audit qualitative codebooks, validate quantitative instruments (SPSS/R), and structure systematic PRISMA literature review evidence matrices.
                  </Text>
                  <Stack gap="xs" mt="xs">
                    {['Qualitative thematic extraction', 'Survey construct validation', '10-year intellectual genealogy', 'PRISMA / Systematic protocols'].map((item, i) => (
                      <Group key={i} gap="xs" align="center">
                        <IconCheck size={14} color={active.accent} />
                        <Text size="xs" c="dimmed">{item}</Text>
                      </Group>
                    ))}
                  </Stack>
                </Stack>
              </Box>
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* The 3-Step Engagement Workflow */}
      <Box py={SECTION_SPACING} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(60)} align="center" style={{ textAlign: 'center' }}>
            <Box style={{ maxWidth: 740 }}>
              <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                How We Collaborate
              </Text>
              <Title order={2} mt="sm" style={{ fontSize: rem(40), color: active.primary, fontFamily: 'var(--font-serif)' }}>
                A structured, milestone-driven publication sprint.
              </Title>
              <Text c="dimmed" mt="md" size="lg" lh={1.7}>
                We partner as your academic research and editorial liaison, removing publication bottlenecks without taking away your scholarly ownership.
              </Text>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(48)} mt="lg" style={{ textAlign: 'left' }}>
              <Box p={rem(32)} bg={active.surface} style={{ border: `1px solid ${active.primary}12` }}>
                <Text fw={700} size="sm" c={active.accent} mb="xs">PHASE 01</Text>
                <Title order={4} mb="sm" style={{ fontSize: rem(20), fontFamily: 'var(--font-serif)' }}>
                  Diagnostic Consultation
                </Title>
                <Text size="sm" c="dimmed" lh={1.6}>
                  We review your thesis, dissertation, or manuscript draft to determine the highest-leverage target journals or presses.
                </Text>
              </Box>

              <Box p={rem(32)} bg={active.surface} style={{ border: `1px solid ${active.primary}12` }}>
                <Text fw={700} size="sm" c={active.accent} mb="xs">PHASE 02</Text>
                <Title order={4} mb="sm" style={{ fontSize: rem(20), fontFamily: 'var(--font-serif)' }}>
                  Structural Sprint & Synthesis
                </Title>
                <Text size="sm" c="dimmed" lh={1.6}>
                  We decompose the research into modular milestones—rebuilding the theoretical framing, mapping evidence, and verifying citations.
                </Text>
              </Box>

              <Box p={rem(32)} bg={active.surface} style={{ border: `1px solid ${active.primary}12` }}>
                <Text fw={700} size="sm" c={active.accent} mb="xs">PHASE 03</Text>
                <Title order={4} mb="sm" style={{ fontSize: rem(20), fontFamily: 'var(--font-serif)' }}>
                  Press-Ready Delivery
                </Title>
                <Text size="sm" c="dimmed" lh={1.6}>
                  You receive an exhaustively polished, formatted, and defense-ready deliverable ready for immediate journal submission or publisher review.
                </Text>
              </Box>
            </SimpleGrid>

            <Box mt={rem(30)}>
              <Link href="/scholarcrafted/consultation?service=Publishing%20%26%20Research%20Advisory" style={{ textDecoration: 'none' }}>
                <Button size="lg" variant="filled" bg={active.primary} radius={0}>
                  START YOUR PUBLISHING SPRINT
                </Button>
              </Link>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box component="section" py={SECTION_SPACING} className="academic-watermark" bg={active.surface} style={{ borderTop: `1px solid ${active.primary}12` }}>
        <Container size={800}>
          <Stack gap="xl">
            <Box style={{ textAlign: 'center' }}>
              <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Frequently Asked Questions
              </Text>
              <Title order={2} mt="xs" style={{ fontSize: rem(36), color: active.primary, fontFamily: 'var(--font-serif)' }}>
                Publishing & Research Inquiries
              </Title>
            </Box>
            <Accordion variant="separated" radius={0}>
              {faqs.map((faq, i) => (
                <Accordion.Item key={i} value={`faq-${i}`} style={{ backgroundColor: active.background }}>
                  <Accordion.Control>
                    <Text fw={600} size="md">{faq.q}</Text>
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
