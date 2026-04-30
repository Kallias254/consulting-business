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
  Center,
  rem,
  Group,
  useMantineTheme,
  Accordion,
  ThemeIcon,
} from '@mantine/core'
import { Navbar } from '../../_components/Navbar'
import { Footer } from '../../_components/Footer'
import Link from 'next/link'
import { 
  IconCheck, 
  IconMessageChatbot, 
  IconRocket, 
  IconFileCheck, 
  IconShieldCheck, 
  IconSearch, 
  IconWriting, 
  IconSend 
} from '@tabler/icons-react'

const SECTION_SPACING = rem(120)
const INNER_WIDTH = 1100

const faqs = [
  {
    q: 'When should I hire an editor?',
    a: "We recommend reaching out when your proposal or dissertation is in its final stages or has been initially approved by your committee. To avoid paying for multiple rounds of editing, wait until the core content is locked in.",
  },
  {
    q: 'What is the standard turnaround time?',
    a: "We typically require 7-10 business days for proposals and 10-14 business days for full dissertations, depending on word count. We recommend reserving an additional 2-7 days in your personal timeline to address the editor's comments.",
  },
  {
    q: 'Do you offer citation management or reference checking?',
    a: "While our editors flag references and in-text citations that are incomplete or mismatched, editing does not include researching and verifying references for accuracy from scratch. We format to strict academic styles (APA, MLA, Chicago), but the underlying accuracy remains the scholar's responsibility.",
  },
  {
    q: 'Is this service confidential and ethical?',
    a: 'Absolutely. We are guided by strict academic ethics. We do not provide ghostwriting services under any circumstances. All manuscripts are handled with complete confidentiality.',
  },
]

export default function EditingProofreadingPage() {
  const theme = useMantineTheme()
  const active = theme.other

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* Hero Section */}
      <Box component="section" pt={rem(100)} pb={rem(80)} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <Box style={{ maxWidth: 800 }}>
            <Text
              size="xs"
              fw={700}
              style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
              c="dimmed"
            >
              Manuscript Refinement
            </Text>
            <Title
              order={1}
              mt="md"
              style={{
                fontSize: rem(56),
                fontWeight: 400,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: active.primary,
              }}
            >
              Structural Editing & Proofreading
            </Title>
            <Text size="lg" mt="xl" c="dimmed" lh={1.6} style={{ fontSize: rem(20) }}>
              From macro-level argument flow to micro-level prose precision, we ensure your research
              is presented with the clarity, tone, and authority expected by your committee.
            </Text>
            
            <Link href="/scholarcrafted/request-review?service=Structural%20Editing%20%26%20Proofreading" style={{ textDecoration: 'none' }}>
              <Button size="xl" variant="filled" bg={active.primary} radius={0} mt={rem(40)} px={rem(40)}>
                GET A FREE QUOTE
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>

      {/* Why Choose a Professional Review */}
      <Box py={rem(80)} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}22` }}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(40)}>
            <Box>
              <Title order={2} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
                Why Choose a Professional Review?
              </Title>
              <Text c="dimmed" mt="md" size="lg" lh={1.7} style={{ maxWidth: 800 }}>
                Your dissertation represents years of grueling research. Our objective is to ensure that your final submission is flawless, allowing your argument to shine without distraction.
              </Text>
            </Box>
            <Stack gap="lg">
              {[
                { title: 'Detailed Feedback', desc: 'Improve structure, narrative coherence, and logical flow across chapters.' },
                { title: 'Clarity & Precision', desc: 'Enhance academic tone, eliminate typographical errors, and align formatting.' },
                { title: 'Submission Confidence', desc: 'Ensure your dissertation or thesis meets the rigorous expectations of review boards.' },
              ].map((item, i) => (
                <Group key={i} align="flex-start" wrap="nowrap" gap="md">
                  <ThemeIcon size={24} radius="xl" variant="light" color="dark" style={{ marginTop: rem(4) }}>
                    <IconCheck size={14} stroke={2} />
                  </ThemeIcon>
                  <Box>
                    <Text fw={700} size="md" c={active.primary}>{item.title}</Text>
                    <Text size="sm" c="dimmed" lh={1.6}>{item.desc}</Text>
                  </Box>
                </Group>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Levels of Editing */}
      <Box py={SECTION_SPACING} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(60)}>
            <Box>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c={active.accent}
              >
                The Dual-Layer Approach
              </Text>
              <Title order={3} mt="sm" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: rem(36) }}>
                Levels of Editing
              </Title>
              <Text size="lg" lh={1.7} c="dimmed" mt="md" style={{ maxWidth: 800 }}>
                We perform a comprehensive, dual-layered review to ensure both the architectural integrity and the surface-level polish of your manuscript.
              </Text>
            </Box>
            
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(60)}>
              <Box>
                <Text fw={700} style={{ letterSpacing: '0.1em', textTransform: 'uppercase', color: active.primary }} size="sm" mb="md">
                  1. Structural & Developmental Editing
                </Text>
                <Text c="dimmed" lh={1.6}>
                  A critical analysis of content and organization. We focus on the logical progression of your argument, chapter sequencing, transitions, and overarching narrative coherence.
                </Text>
              </Box>

              <Box>
                <Text fw={700} style={{ letterSpacing: '0.1em', textTransform: 'uppercase', color: active.primary }} size="sm" mb="md">
                  2. Formatting & Proofreading
                </Text>
                <Text c="dimmed" lh={1.6} mb="lg">
                  A meticulous review of the final proof. We ensure absolute accuracy and consistency in:
                </Text>
                <SimpleGrid cols={2} spacing="sm">
                  {['Grammar & Syntax', 'Spelling & Typos', 'Punctuation', 'Academic Tone', 'Headings & Spacing', 'Table & Figure Alignment', 'In-text Citations', 'Reference Lists'].map((item, i) => (
                    <Group key={i} align="center" gap="sm" wrap="nowrap">
                      <IconCheck size={18} color={active.accent || active.primary} />
                      <Text size="sm" fw={500} c="dimmed">{item}</Text>
                    </Group>
                  ))}
                </SimpleGrid>
              </Box>
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* What You'll Gain */}
      <Box py={SECTION_SPACING} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}22` }}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(60)} align="center" style={{ textAlign: 'center' }}>
            <Box style={{ maxWidth: 700 }}>
              <Title order={2} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: rem(42) }}>
                What You&rsquo;ll Gain
              </Title>
              <Text c="dimmed" mt="md" size="lg">
                Beyond mere typo correction, our review provides a comprehensive elevation of your entire manuscript.
              </Text>
            </Box>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl" style={{ textAlign: 'left' }}>
              <Box p={rem(32)} bg={active.background} style={{ border: `1px solid ${active.primary}22` }}>
                <Text fw={700} size="lg" mb="sm">Institutional Alignment</Text>
                <Text size="sm" c="dimmed" lh={1.6}>We ensure your formatting strictly adheres to your university&rsquo;s specific guidelines (APA, MLA, Chicago, etc.), removing a major hurdle to final approval.</Text>
              </Box>
              <Box p={rem(32)} bg={active.background} style={{ border: `1px solid ${active.primary}22` }}>
                <Text fw={700} size="lg" mb="sm">Elevated Academic Voice</Text>
                <Text size="sm" c="dimmed" lh={1.6}>We refine your prose to ensure it carries the objective, authoritative tone expected by senior academics and journal reviewers.</Text>
              </Box>
              <Box p={rem(32)} bg={active.background} style={{ border: `1px solid ${active.primary}22` }}>
                <Text fw={700} size="lg" mb="sm">Structural Integrity</Text>
                <Text size="sm" c="dimmed" lh={1.6}>We identify weak transitions and logical gaps, ensuring your core argument is easily traceable from your introduction to your conclusion.</Text>
              </Box>
              <Box p={rem(32)} bg={active.background} style={{ border: `1px solid ${active.primary}22` }}>
                <Text fw={700} size="lg" mb="sm">Peace of Mind</Text>
                <Text size="sm" c="dimmed" lh={1.6}>Handing your manuscript over to an expert pair of eyes allows you to step away and return refreshed for your final defense preparation.</Text>
              </Box>
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>



      {/* Editing vs Consulting - DEDICATED SECTION */}
      <Box py={SECTION_SPACING} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}22` }}>
        <Container size={800}>
          <Stack gap="xl" align="center" style={{ textAlign: 'center' }}>
            <Text
              size="xs"
              fw={700}
              style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
              c={active.accent}
            >
              Crucial Distinction
            </Text>
            <Title order={2} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: rem(42) }}>
              Editing vs. Consulting
            </Title>
            <Text size="lg" lh={1.7} c="dimmed">
              It can be challenging to differentiate between the support received from editors and coaches. To ensure you get exactly what you need, it is important to understand the boundary.
            </Text>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl" mt="xl" style={{ textAlign: 'left' }}>
              <Box p={rem(32)} bg={active.background} style={{ border: `1px solid ${active.primary}22` }}>
                <Title order={4} mb="md">
                  Editing (Asynchronous)
                </Title>
                <Text size="sm" c="dimmed" lh={1.6}>
                  Editing is reserved for manuscripts that have <strong>already been written</strong>. The purpose of editing is not to instruct but to review and polish your manuscript. The editor focuses on correcting flow, grammar, syntax, style, and formatting.
                </Text>
              </Box>

              <Box p={rem(32)} bg={active.background} style={{ border: `1px solid ${active.primary}22` }}>
                <Title order={4} mb="md">
                  Consulting (Live Coaching)
                </Title>
                <Text size="sm" c="dimmed" lh={1.6}>
                  Consulting is a <strong>real-time instructional opportunity</strong> meant to help you learn how to plan, conduct, and report your research. No writing or editing occurs during live coaching.
                </Text>
              </Box>
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* How It Works - DEDICATED SECTION */}
      <Box py={SECTION_SPACING} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(60)} align="center" style={{ textAlign: 'center' }}>
            <Box style={{ maxWidth: 700 }}>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c="dimmed"
              >
                The Process
              </Text>
              <Title order={2} mt="sm" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: rem(42) }}>
                How It Works
              </Title>
              <Text c="dimmed" mt="md" size="lg">
                A seamless, professional workflow designed to take your manuscript from a working draft to a polished, submission-ready document.
              </Text>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(60)} mt="lg">
              <Stack align="center" gap="md">
                <ThemeIcon size={64} radius="xl" variant="light" color="dark">
                  <IconSend size={32} stroke={1.5} />
                </ThemeIcon>
                <Text fw={700} size="lg">
                  01. Submit for Quote
                </Text>
                <Text size="sm" c="dimmed" lh={1.6}>
                  Send us your final draft along with your word count and institutional formatting guidelines to receive an exact quote and timeline.
                </Text>
              </Stack>
              <Stack align="center" gap="md">
                <ThemeIcon size={64} radius="xl" variant="light" color="dark">
                  <IconSearch size={32} stroke={1.5} />
                </ThemeIcon>
                <Text fw={700} size="lg">
                  02. Comprehensive Review
                </Text>
                <Text size="sm" c="dimmed" lh={1.6}>
                  Our PhD-level editors conduct a dual-layer review, returning your document with detailed track-changes, structural comments, and polished formatting.
                </Text>
              </Stack>
              <Stack align="center" gap="md">
                <ThemeIcon size={64} radius="xl" variant="light" color="dark">
                  <IconRocket size={32} stroke={1.5} />
                </ThemeIcon>
                <Text fw={700} size="lg">
                  03. Refine & Submit
                </Text>
                <Text size="sm" c="dimmed" lh={1.6}>
                  You apply the actionable feedback to your final draft. You can now submit your work to your committee with absolute confidence.
                </Text>
              </Stack>
            </SimpleGrid>

            <Center mt={rem(40)}>
              <Link
                href="/scholarcrafted/request-review?service=Structural%20Editing%20%26%20Proofreading"
                style={{ textDecoration: 'none' }}
              >
                <Button size="xl" variant="filled" bg={active.primary} radius={0} px={rem(40)}>
                  GET A FREE QUOTE
                </Button>
              </Link>
            </Center>
          </Stack>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box component="section" py={SECTION_SPACING} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}22` }}>
        <Container size={800}>
          <Stack gap="xl">
            <Box style={{ textAlign: 'center' }}>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c="dimmed"
              >
                FAQ
              </Text>
              <Title
                order={2}
                mt="md"
                style={{ fontSize: rem(36), fontWeight: 400, color: active.primary, fontFamily: 'var(--font-serif)' }}
              >
                Logistics & Policies
              </Title>
            </Box>
            <Accordion
              variant="separated"
              radius={0}
              styles={{
                item: { border: `1px solid ${active.primary}22`, backgroundColor: active.background },
                control: { padding: rem(24), fontWeight: 600, fontSize: rem(18), color: active.primary },
                content: { padding: rem(24), paddingTop: 0 },
              }}
            >
              {faqs.map((faq: any, i: number) => (
                <Accordion.Item key={i} value={`faq-${i}`}>
                  <Accordion.Control>
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

      {/* Explore Other Services */}
      <Box py={SECTION_SPACING} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}22` }}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(60)}>
            <Box style={{ textAlign: 'center' }}>
              <Title order={2} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: rem(36) }}>
                Explore Other Services
              </Title>
              <Text size="lg" c="dimmed" mt="md">
                Need a different type of support? We have you covered.
              </Text>
            </Box>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
              <Box p={rem(40)} bg={active.background} style={{ border: `1px solid ${active.primary}22`, display: 'flex', flexDirection: 'column' }}>
                <Stack gap="xl" flex={1}>
                  <Stack gap="xs">
                    <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.1em' }}>
                      TECHNICAL ASSISTANCE
                    </Text>
                    <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
                      Custom Research & Data Support
                    </Title>
                  </Stack>
                  <Text size="sm" c="dimmed" lh={1.6}>
                    Prearranged offline support tailored to your exact needs, including literature mapping, survey construction, qualitative coding, and statistical analysis.
                  </Text>
                </Stack>
                <Box mt={rem(40)}>
                  <Link href="/scholarcrafted/services/research-support" style={{ textDecoration: 'none' }}>
                    <Button variant="outline" color={active.primary} radius={0} fullWidth style={{ borderColor: active.primary }}>
                      Get Research Support
                    </Button>
                  </Link>
                </Box>
              </Box>

              <Box p={rem(40)} bg={active.background} style={{ border: `1px solid ${active.primary}22`, display: 'flex', flexDirection: 'column' }}>
                <Stack gap="xl" flex={1}>
                  <Stack gap="xs">
                    <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.1em' }}>
                      1-ON-1 GUIDANCE
                    </Text>
                    <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
                      Live Academic Coaching
                    </Title>
                  </Stack>
                  <Text size="sm" c="dimmed" lh={1.6}>
                    A strategic partnership to help you overcome roadblocks, manage your project, and finish with confidence. Perfect for when you are stuck and need real-time instructional support.
                  </Text>
                </Stack>
                <Box mt={rem(40)}>
                  <Link href="/scholarcrafted/services/private-coaching" style={{ textDecoration: 'none' }}>
                    <Button variant="outline" color={active.primary} radius={0} fullWidth style={{ borderColor: active.primary }}>
                      View Coaching Services
                    </Button>
                  </Link>
                </Box>
              </Box>
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
