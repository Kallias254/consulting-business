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
  IconVideo, 
  IconListCheck, 
  IconUserCheck,
  IconArrowRight,
  IconRocket
} from '@tabler/icons-react'

const SECTION_SPACING = rem(120)
const INNER_WIDTH = 1100

const faqs = [
  {
    q: 'How is coaching different from your other services?',
    a: 'Coaching is a live, collaborative video session designed to help you solve complex academic challenges. We do not write or edit your dissertation for you; instead, we provide actionable strategies and guidance so you can move forward confidently.',
  },
  {
    q: 'Should I book 30 minutes or 60 minutes?',
    a: 'We recommend the 60-minute deep dive if you have multiple challenges, need help restructuring a large chapter, or want comprehensive methodology support. The 30-minute session is perfect for targeted, specific questions.',
  },
  {
    q: 'Can I send my materials before the call?',
    a: 'Yes, once you book your session, you will receive a secure link to upload your manuscript, methodology, or notes so your coach can review them prior to your call.',
  },
  {
    q: 'Do you support professional doctorates like EdD or DBA?',
    a: 'Absolutely. We regularly support candidates across PhD, EdD, DBA, DNP, MSc, and MBA programs, tailoring our approach to the specific requirements of your discipline.',
  },
]

export default function PrivateCoachingPage() {
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
              1-ON-1 GUIDANCE
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
                fontFamily: 'var(--font-serif)',
              }}
            >
              Personalized Guidance for Your Dissertation or Thesis
            </Title>
            <Text size="lg" mt="xl" c="dimmed" lh={1.6} style={{ fontSize: rem(20) }}>
              Overwhelmed by your academic research? Struggling with a complex structural or methodological issue? Let’s solve it together with in-depth, personalised academic coaching.
            </Text>
            
            <Link href="/scholarcrafted/consultation?interest=coaching&metBefore=no" style={{ textDecoration: 'none' }}>
              <Button size="xl" variant="filled" bg={active.primary} radius={0} mt={rem(40)} px={rem(40)}>
                FREE INTRODUCTORY CALL
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>

      {/* Why Choose Coaching */}
      <Box py={rem(80)} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}22` }}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(40)}>
            <Box>
              <Title order={2} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
                Why Choose a Coaching Call?
              </Title>
              <Text c="dimmed" mt="md" size="lg" lh={1.7} style={{ maxWidth: 800 }}>
                Sometimes, you just need an expert sounding board to untangle your logic. Our coaching sessions are tailored to your unique research needs and goals.
              </Text>
            </Box>
            <Stack gap="lg">
              {[
                { title: 'Comprehensive Guidance', desc: 'Perfect for exploring complex or multifaceted challenges in your research.' },
                { title: 'Personalised Strategies', desc: 'Each session is tailored to your unique research needs and academic goals.' },
                { title: 'Actionable Advice', desc: 'We dive deep into your manuscript to ensure you are on the right track and meeting committee expectations.' },
                { title: 'Confidence Boost', desc: 'Leave the call with clear, immediate steps and renewed motivation to progress.' },
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

      {/* The Packages */}
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
                Targeted Interventions
              </Text>
              <Title order={3} mt="sm" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: rem(36) }}>
                Choose Your Session
              </Title>
              <Text size="lg" lh={1.7} c="dimmed" mt="md" style={{ maxWidth: 800 }}>
                Select the coaching duration that best matches the complexity of your current academic challenges.
              </Text>
            </Box>
            
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(40)}>
              {/* Option A: 5 Hours */}
              <Box p={rem(40)} bg={active.surface} style={{ border: `1px solid ${active.primary}22`, display: 'flex', flexDirection: 'column' }}>
                <Stack gap="xl" flex={1}>
                  <Stack gap="xs">
                    <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.1em' }}>
                      THE STRATEGIC SPRINT
                    </Text>
                    <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
                      5-Hour Retainer
                    </Title>
                    <Text fw={600} size="xl" c={active.primary}>$750 USD</Text>
                  </Stack>
                  <Text size="sm" c="dimmed" lh={1.6}>
                    Ideal for overcoming a specific roadblock, restructuring a single chapter, or preparing for an upcoming committee meeting. Use these hours flexibly across live video calls and offline document review.
                  </Text>
                </Stack>
                <Box mt={rem(40)}>
                  <Link href="/scholarcrafted/consultation?interest=coaching&metBefore=no" style={{ textDecoration: 'none' }}>
                    <Button variant="outline" color={active.primary} radius={0} fullWidth style={{ borderColor: active.primary }}>
                      Free Introductory Call
                    </Button>
                  </Link>
                </Box>
              </Box>

              {/* Option B: 10 Hours */}
              <Box p={rem(40)} bg={active.background} style={{ border: `2px solid ${active.primary}`, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <Box style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: active.primary, color: '#fff', padding: '4px 16px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em' }}>
                  MOST POPULAR
                </Box>
                <Stack gap="xl" flex={1}>
                  <Stack gap="xs">
                    <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.1em' }}>
                      THE SEMESTER PARTNERSHIP
                    </Text>
                    <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
                      10-Hour Retainer
                    </Title>
                    <Text fw={600} size="xl" c={active.primary}>$1,400 USD</Text>
                  </Stack>
                  <Text size="sm" c="dimmed" lh={1.6}>
                    Perfect for navigating a major academic milestone, such as defending your proposal or analyzing complex data. Includes priority access to our schedule and comprehensive offline review cycles.
                  </Text>
                </Stack>
                <Box mt={rem(40)}>
                  <Link href="/scholarcrafted/consultation?interest=coaching&metBefore=no" style={{ textDecoration: 'none' }}>
                    <Button variant="filled" bg={active.primary} radius={0} fullWidth>
                      Free Introductory Call
                    </Button>
                  </Link>
                </Box>
              </Box>

              {/* Option C: 20 Hours */}
              <Box p={rem(40)} bg={active.surface} style={{ border: `1px solid ${active.primary}22`, display: 'flex', flexDirection: 'column' }}>
                <Stack gap="xl" flex={1}>
                  <Stack gap="xs">
                    <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.1em' }}>
                      THE FULL-CYCLE JOURNEY
                    </Text>
                    <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
                      20-Hour Retainer
                    </Title>
                    <Text fw={600} size="xl" c={active.primary}>$2,600 USD</Text>
                  </Stack>
                  <Text size="sm" c="dimmed" lh={1.6}>
                    Complete, high-touch support from stalled draft to final committee submission. We hold your hand through the entire process, providing an expert sounding board and rigorous accountability every step of the way.
                  </Text>
                </Stack>
                <Box mt={rem(40)}>
                  <Link href="/scholarcrafted/consultation?interest=coaching&metBefore=no" style={{ textDecoration: 'none' }}>
                    <Button variant="outline" color={active.primary} radius={0} fullWidth style={{ borderColor: active.primary }}>
                      Free Introductory Call
                    </Button>
                  </Link>
                </Box>
              </Box>
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* How It Works - DEDICATED SECTION */}
      <Box py={SECTION_SPACING} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}22` }}>
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
                A seamless, professional workflow designed to maximize your time with our academic experts.
              </Text>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(60)} mt="lg" style={{ textAlign: 'left' }}>
              <Stack align="center" gap="md" style={{ textAlign: 'center' }}>
                <ThemeIcon size={64} radius="xl" variant="light" color="dark">
                  <IconListCheck size={32} stroke={1.5} />
                </ThemeIcon>
                <Text fw={700} size="lg">
                  01. Prepare Your Focus
                </Text>
                <Text size="sm" c="dimmed" lh={1.6}>
                  Identify key challenges or questions you’d like to address before the call to ensure we use every minute effectively.
                </Text>
              </Stack>
              <Stack align="center" gap="md" style={{ textAlign: 'center' }}>
                <ThemeIcon size={64} radius="xl" variant="light" color="dark">
                  <IconVideo size={32} stroke={1.5} />
                </ThemeIcon>
                <Text fw={700} size="lg">
                  02. Collaborative Coaching
                </Text>
                <Text size="sm" c="dimmed" lh={1.6}>
                  Meet with your expert coach via video call. We’ll work together to identify solutions, structure arguments, and break methodological gridlock.
                </Text>
              </Stack>
              <Stack align="center" gap="md" style={{ textAlign: 'center' }}>
                <ThemeIcon size={64} radius="xl" variant="light" color="dark">
                  <IconRocket size={32} stroke={1.5} />
                </ThemeIcon>
                <Text fw={700} size="lg">
                  03. Take Action
                </Text>
                <Text size="sm" c="dimmed" lh={1.6}>
                  Leave the session with practical strategies and renewed focus. Apply our insights immediately to move your dissertation forward.
                </Text>
              </Stack>
            </SimpleGrid>

            <Center mt={rem(40)}>
              <Link
                href="/scholarcrafted/consultation?interest=coaching&metBefore=no"
                style={{ textDecoration: 'none' }}
              >
                <Button size="xl" variant="filled" bg={active.primary} radius={0} px={rem(40)}>
                  FREE INTRODUCTORY CALL
                </Button>
              </Link>
            </Center>
          </Stack>
        </Container>
      </Box>

      {/* What You'll Gain & Is This Right For You */}
      <Box py={SECTION_SPACING} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(80)}>
            <Stack gap="xl">
              <Title order={2} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
                What You&rsquo;ll Gain
              </Title>
              <Stack gap="md">
                <Group align="flex-start" wrap="nowrap" gap="md">
                  <IconCheck size={20} color={active.accent} style={{ marginTop: rem(2) }} />
                  <Text size="md" c="dimmed" lh={1.6}>
                    A clear understanding of how to resolve complex challenges.
                  </Text>
                </Group>
                <Group align="flex-start" wrap="nowrap" gap="md">
                  <IconCheck size={20} color={active.accent} style={{ marginTop: rem(2) }} />
                  <Text size="md" c="dimmed" lh={1.6}>
                    Practical strategies to improve your research, writing, or overall organisation.
                  </Text>
                </Group>
                <Group align="flex-start" wrap="nowrap" gap="md">
                  <IconCheck size={20} color={active.accent} style={{ marginTop: rem(2) }} />
                  <Text size="md" c="dimmed" lh={1.6}>
                    Renewed focus and confidence in your ability to meet academic expectations.
                  </Text>
                </Group>
              </Stack>
            </Stack>

            <Stack gap="xl">
              <Title order={2} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
                Is This Right for You?
              </Title>
              <Text size="md" c="dimmed" mb="sm">This service is highly recommended if you:</Text>
              <Stack gap="md">
                <Group align="flex-start" wrap="nowrap" gap="md">
                  <IconUserCheck size={20} color={active.primary} style={{ marginTop: rem(2) }} />
                  <Text size="md" c="dimmed" lh={1.6}>
                    Are tackling a major issue or challenge in your dissertation or thesis.
                  </Text>
                </Group>
                <Group align="flex-start" wrap="nowrap" gap="md">
                  <IconUserCheck size={20} color={active.primary} style={{ marginTop: rem(2) }} />
                  <Text size="md" c="dimmed" lh={1.6}>
                    Need help structuring a chapter or tackling your data analysis (qualitative or quantitative).
                  </Text>
                </Group>
                <Group align="flex-start" wrap="nowrap" gap="md">
                  <IconUserCheck size={20} color={active.primary} style={{ marginTop: rem(2) }} />
                  <Text size="md" c="dimmed" lh={1.6}>
                    Want expert guidance without committing to a full structural edit right now.
                  </Text>
                </Group>
              </Stack>
            </Stack>
          </SimpleGrid>
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
                Common Questions
              </Title>
            </Box>
            <Accordion
              variant="separated"
              radius={0}
              styles={{
                item: { border: `1px solid ${active.primary}22`, backgroundColor: active.background },
                control: { padding: rem(24) },
                panel: { padding: rem(24) },
              }}
            >
              {faqs.map((faq: any, i: number) => (
                <Accordion.Item key={i} value={`faq-${i}`}>
                  <Accordion.Control style={{ fontWeight: 600, fontSize: rem(18) }}>
                    <Text fw={600} size="lg" c={active.primary}>
                      {faq.q}
                    </Text>
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

      {/* Explore Other Services */}
      <Box py={SECTION_SPACING} bg={active.background}>
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
              <Box p={rem(40)} bg={active.surface} style={{ border: `1px solid ${active.primary}22`, display: 'flex', flexDirection: 'column' }}>
                <Stack gap="xl" flex={1}>
                  <Stack gap="xs">
                    <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.1em' }}>
                      MANUSCRIPT REFINEMENT
                    </Text>
                    <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
                      Structural Editing & Proofreading
                    </Title>
                  </Stack>
                  <Text size="sm" c="dimmed" lh={1.6}>
                    From macro-level argument flow to micro-level prose precision, we ensure your research is presented with the clarity, tone, and authority expected by your committee.
                  </Text>
                </Stack>
                <Box mt={rem(40)}>
                  <Link href="/scholarcrafted/services/editing-proofreading" style={{ textDecoration: 'none' }}>
                    <Button variant="outline" color={active.primary} radius={0} fullWidth style={{ borderColor: active.primary }}>
                      View Editing Services
                    </Button>
                  </Link>
                </Box>
              </Box>

              <Box p={rem(40)} bg={active.surface} style={{ border: `1px solid ${active.primary}22`, display: 'flex', flexDirection: 'column' }}>
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
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
