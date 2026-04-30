'use client'

import React, { useRef } from 'react'
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
import { Carousel } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'

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
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }))

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
            
            <Stack gap="xs" mt={rem(40)}>
              <Box>
                <Link href="/scholarcrafted/consultation?interest=coaching&metBefore=no" style={{ textDecoration: 'none' }}>
                  <Button size="xl" variant="filled" bg={active.primary} radius={0} px={rem(40)}>
                    FREE INTRODUCTORY CALL
                  </Button>
                </Link>
              </Box>
              <Text size="sm" c="dimmed">
                This 15-minute call is to get to know your needs, not a coaching session.{' '}
                <Link href="/scholarcrafted/consultation" style={{ color: active.primary, textDecoration: 'underline' }}>
                  Find out more here.
                </Link>
              </Text>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Pain Points Carousel */}
      <Box py={rem(100)} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}22` }}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(60)} align="center">

            <Title
              order={2}
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 400,
                fontSize: rem(48),
                textAlign: 'center',
                color: active.primary,
              }}
            >
              Are you in this position right now?
            </Title>

            <Box style={{ width: '100%' }}>
              <Carousel
                loop
                withControls={false}
                plugins={[autoplay.current]}
              >
                {[
                  "You've been 'almost done' for six months and you can't figure out why you're still stuck.",
                  "Your committee gave you contradictory feedback and you have no idea which direction to follow.",
                  "You understand the theory — you just can't get it to hold together coherently on the page.",
                  "Your Chair is barely available and you're making critical research decisions completely alone.",
                  "You have the data. You just don't know what it's telling you — or how to say it properly.",
                  "Every time you sit down to write, you spiral. You rewrite the same paragraph and move nothing forward.",
                ].map((pain, i) => (
                  <Carousel.Slide key={i}>
                    <Box
                      p={rem(48)}
                      bg={active.background}
                      style={{
                        minHeight: rem(120),
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Text size="lg" lh={1.8} c={active.primary} fw={500}>
                        &ldquo;{pain}&rdquo;
                      </Text>
                    </Box>
                  </Carousel.Slide>
                ))}
              </Carousel>
            </Box>

            <Text
              size="lg"
              c="dimmed"
              lh={1.7}
              style={{ textAlign: 'center', maxWidth: 600 }}
            >
              Coaching exists for moments exactly like these. It starts with one free conversation.
            </Text>

          </Stack>
        </Container>
      </Box>

      {/* How We Work (The Services) */}
      <Box component="section" py={SECTION_SPACING} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(60)}>
            <Box>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c={active.accent}
              >
                Inside a Session
              </Text>
              <Title order={2} mt="sm" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: rem(42), color: active.primary }}>
                What happens during your coaching hours?
              </Title>
              <Text size="lg" lh={1.7} c="dimmed" mt="md" style={{ maxWidth: 800 }}>
                Your retainer hours are completely flexible. Depending on where you are in the process, we use your sessions for any combination of the following:
              </Text>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(40)} mt="xl">
              <Stack gap="sm">
                <Text size="lg" fw={600} c={active.primary}>
                  Planning & Accountability
                </Text>
                <Text c="dimmed" lh={1.6}>
                  Together, we set long and short-term goals for your academic work. We meet regularly to review progress, troubleshoot challenges, and define exact next steps.
                </Text>
              </Stack>
              
              <Stack gap="sm">
                <Text size="lg" fw={600} c={active.primary}>
                  Problem Solving
                </Text>
                <Text c="dimmed" lh={1.6}>
                  Got a research or writing problem to solve? We work through puzzles like organizing your literature review, aligning your research questions and methods, or interpreting reviewer feedback.
                </Text>
              </Stack>

              <Stack gap="sm">
                <Text size="lg" fw={600} c={active.primary}>
                  Facilitated Work Sessions
                </Text>
                <Text c="dimmed" lh={1.6}>
                  Tried everything but just can’t get started drafting? Afraid to read your advisor’s comments? Do it with a coach right at your side to guide you through the anxiety and get the work done.
                </Text>
              </Stack>

              <Stack gap="sm">
                <Text size="lg" fw={600} c={active.primary}>
                  Feedback on Work-In-Progress
                </Text>
                <Text c="dimmed" lh={1.6}>
                  All writers need an outside perspective on their drafts. We provide robust, structural feedback you can actually use to move forward—without the judgment of a committee member.
                </Text>
              </Stack>
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* The Packages */}
      <Box component="section" py={SECTION_SPACING} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}22` }}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(60)}>
            <Box>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c={active.accent}
              >
                Coaching Packages
              </Text>
              <Title order={2} mt="sm" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: rem(42) }}>
                What's included in each package
              </Title>
              <Text size="lg" lh={1.7} c="dimmed" mt="md" style={{ maxWidth: 800 }}>
                All packages are activated following your free introductory call, where we assess your needs and confirm the right level of engagement for your research.
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


      {/* What You'll Gain — the outcome side */}
      <Box py={SECTION_SPACING} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(60)}>
            <Box style={{ maxWidth: 720 }}>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c={active.accent}
              >
                The Other Side
              </Text>
              <Title order={2} mt="sm" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: rem(42) }}>
                What you'll walk away with.
              </Title>
              <Text c="dimmed" mt="md" size="lg" lh={1.7}>
                The right coaching engagement can fundamentally shift the trajectory of your research. Here is what that looks like in practice.
              </Text>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(32)}>
              {[
                {
                  label: 'CLARITY',
                  title: 'A clear path forward',
                  desc: "You leave knowing exactly what to do next. No more circling the same paragraph. No more second-guessing every decision. Just a clear, concrete step you can take today.",
                },
                {
                  label: 'CONFIDENCE',
                  title: 'The researcher you already are',
                  desc: "Most candidates don't lack the ability — they lack the belief that their thinking is valid. A great coach doesn't give you answers. They help you trust the ones you already have.",
                },
                {
                  label: 'METHODOLOGY',
                  title: 'A framework you carry forward',
                  desc: "You don't just fix this chapter. You leave with a transferable way of thinking about research structure, argumentation, and analysis that applies to every project you take on from here.",
                },
              ].map((item, i) => (
                <Box
                  key={i}
                  p={rem(40)}
                  bg={active.surface}
                  style={{ border: `1px solid ${active.primary}22`, display: 'flex', flexDirection: 'column' }}
                >
                  <Stack gap="md">
                    <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.15em' }}>
                      {item.label}
                    </Text>
                    <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
                      {item.title}
                    </Title>
                    <Text size="sm" c="dimmed" lh={1.7}>
                      {item.desc}
                    </Text>
                  </Stack>
                </Box>
              ))}
            </SimpleGrid>
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
                Common Questions
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
