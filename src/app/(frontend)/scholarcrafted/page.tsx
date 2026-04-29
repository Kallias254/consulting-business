'use client'

import React from 'react'
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Box,
  SimpleGrid,
  Image,
  Divider,
  rem,
  useMantineTheme,
  ThemeIcon,
} from '@mantine/core'
import { Navbar } from './_components/Navbar'
import { Footer } from './_components/Footer'
import Link from 'next/link'
import {
  IconArrowRight,
  IconUsers,
  IconEdit,
  IconFileText,
  IconCheck,
  IconMessageChatbot,
  IconRocket,
  IconCertificate,
} from '@tabler/icons-react'
import { Carousel } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'

const SECTION_SPACING = rem(140)
const INNER_WIDTH = 760

const testimonials = [
  {
    quote:
      'ScholarCrafted did not just edit my dissertation; they re-engineered how I conceptualized my own argument. Their intervention was the difference between stalling in year five and defending in year six.',
    author: 'DR. E. HAYES, PH.D.',
    institution: 'HISTORY, COLUMBIA UNIVERSITY',
  },
  {
    quote:
      'The structural logic Micah brought to my qualitative methodology was transformative. I moved from a chaotic set of codes to a defensible, elegant framework in weeks.',
    author: 'DR. L. CHEN, PH.D.',
    institution: 'SOCIOLOGY, OXFORD UNIVERSITY',
  },
  {
    quote:
      'Expert, rigorous, and deeply empathetic. They understand the psychological toll of the ABD phase and provide the scaffolding needed to reach the finish line.',
    author: 'DR. M. ROBERTS, PH.D.',
    institution: 'PSYCHOLOGY, STANFORD UNIVERSITY',
  },
  {
    quote:
      "I was paralyzed by the sheer volume of qualitative data I had collected. The technical support team didn't just help me code my NVivo transcripts—they taught me how to extract the core narrative. I finally felt in control of my research.",
    author: 'DR. S. PATEL, PH.D.',
    institution: 'EDUCATION, HARVARD UNIVERSITY',
  },
  {
    quote:
      'The feedback I received on my methodology chapter was incredibly precise. They caught structural gaps that my committee missed, saving me months of potential revisions during my final defense.',
    author: 'DR. J. CARTER, PH.D.',
    institution: 'PUBLIC HEALTH, JOHNS HOPKINS UNIVERSITY',
  },
]

export default function ScholarCraftedLanding() {
  const theme = useMantineTheme()
  const active = theme.other
  const autoplay = useRef(Autoplay({ delay: 5000 }))

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .carousel-indicator[data-active] {
          width: ${rem(24)} !important;
          background-color: ${active.primary} !important;
        }

        .hero-primary-container {
          min-width: 280px;
        }

        @media (max-width: 768px) {
          .hero-primary-container {
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `,
        }}
      />

      {/* Hero Section */}
      <Box component="section" pt={rem(140)} pb={SECTION_SPACING}>
        <Container size={1100}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(80)} verticalSpacing="xl">
            <Stack gap={rem(40)} justify="center">
              <Stack gap="xl">
                <Stack gap="xs">
                  <Text
                    size="xs"
                    fw={700}
                    style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                    c="dimmed"
                  >
                    Academic Advisory Services
                  </Text>
                  <Title
                    order={1}
                    style={{
                      fontSize: rem(64),
                      fontWeight: 400,
                      lineHeight: 1.1,
                      letterSpacing: '-0.03em',
                      color: active.primary,
                    }}
                  >
                    From Stall to Submission.
                  </Title>
                </Stack>
                <Box style={{ maxWidth: 480 }}>
                  <Text size="xl" lh={1.6} c="dimmed" style={{ fontSize: rem(20) }}>
                    We provide the rigorous, faculty-led oversight to finish your dissertation
                    faster, with less stress.
                  </Text>
                </Box>
              </Stack>

              <Stack gap="xl">
                <Box className="hero-primary-container">
                  <Link href="/scholarcrafted/consultation" style={{ textDecoration: 'none' }}>
                    <Button size="xl" variant="filled" bg={active.primary} fullWidth radius={0}>
                      BOOK MY FREE CONSULTATION
                    </Button>
                  </Link>
                </Box>

                <Box
                  mt="md"
                  style={{
                    paddingTop: rem(32),
                    maxWidth: 550,
                  }}
                >
                  <SimpleGrid cols={3} spacing="xl">
                    <Stack gap={0}>
                      <Text
                        fw={700}
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: rem(28),
                          color: active.primary,
                          lineHeight: 1,
                        }}
                      >
                        98%
                      </Text>
                      <Text
                        size="xs"
                        fw={600}
                        c="dimmed"
                        mt={4}
                        style={{
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          lineHeight: 1.2,
                        }}
                      >
                        Completion
                        <br />
                        Rate
                      </Text>
                    </Stack>
                    <Stack gap={0}>
                      <Text
                        fw={700}
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: rem(28),
                          color: active.primary,
                          lineHeight: 1,
                        }}
                      >
                        4.9/5
                      </Text>
                      <Text
                        size="xs"
                        fw={600}
                        c="dimmed"
                        mt={4}
                        style={{
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          lineHeight: 1.2,
                        }}
                      >
                        Average
                        <br />
                        Rating
                      </Text>
                    </Stack>
                    <Stack gap={0}>
                      <Text
                        fw={700}
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: rem(28),
                          color: active.primary,
                          lineHeight: 1,
                        }}
                      >
                        500+
                      </Text>
                      <Text
                        size="xs"
                        fw={600}
                        c="dimmed"
                        mt={4}
                        style={{
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          lineHeight: 1.2,
                        }}
                      >
                        Scholars
                        <br />
                        Guided
                      </Text>
                    </Stack>
                  </SimpleGrid>
                </Box>
              </Stack>
            </Stack>
            <Box>
              <Image
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200"
                alt="Graduate student focused on research"
                radius={0}
                h={700}
                fallbackSrc="https://placehold.co/600x800?text=Scholar+Portrait"
                style={{
                  filter: 'grayscale(0.15)',
                  opacity: 0.9,
                  objectPosition: 'center top',
                }}
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Resonance Section (The Pain Points) */}
      <Box component="section" py={SECTION_SPACING} bg={active.surface}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(80)}>
            <Box style={{ textAlign: 'center' }}>
              <Title
                order={2}
                style={{
                  fontSize: rem(48),
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: active.primary,
                  fontFamily: 'var(--font-serif)',
                }}
              >
                Your research journey is unique. <br />
                Your challenges are not.
              </Title>
            </Box>

            <Stack gap={0}>
              {[
                {
                  title: 'Supervisor In-congruence',
                  desc: 'You feel your feedback is infrequent, misaligned, or insufficient to move the work forward.',
                },
                {
                  title: 'The Weight of Isolation',
                  desc: 'You are struggling to balance the competing demands of research, work, and family life in a vacuum.',
                },
                {
                  title: 'Structural Paralysis',
                  desc: 'You are overwhelmed by the sheer scope of the literature, the data, and the path to a finished manuscript.',
                },
                {
                  title: 'Perfectionism & Gridlock',
                  desc: 'You are crippled by the fear of producing imperfect work, leading to an inability to produce any work at all.',
                },
              ].map((item, i) => (
                <Box
                  key={i}
                  style={{
                    borderBottom: `1px solid ${active.primary}22`,
                    padding: `${rem(32)} 0`,
                  }}
                >
                  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                    <Text
                      size="lg"
                      fw={600}
                      c={active.primary}
                    >
                      {item.title}
                    </Text>
                    <Text c="dimmed" lh={1.6}>
                      {item.desc}
                    </Text>
                  </SimpleGrid>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* The 3-Step Process */}
      <Box component="section" py={SECTION_SPACING} bg={active.background}>
        <Container size={1100}>
          <Stack gap={rem(80)} align="center" style={{ textAlign: 'center' }}>
            <Box style={{ maxWidth: 700 }}>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c="dimmed"
              >
                The Path to Completion
              </Text>
              <Title
                order={2}
                mt="md"
                style={{ fontSize: rem(48), fontWeight: 400, color: active.primary }}
              >
                A clear, structured process <br /> from start to finish.
              </Title>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(60)}>
              <Stack align="center" gap="md">
                <ThemeIcon size={64} radius="xl" variant="light" color="dark">
                  <IconMessageChatbot size={32} stroke={1.5} />
                </ThemeIcon>
                <Text fw={700} size="lg">
                  01. Strategic Review
                </Text>
                <Text size="sm" c="dimmed" lh={1.6}>
                  A deep-dive consultation to understand your project, identify roadblocks, and map
                  a clear path forward.
                </Text>
              </Stack>
              <Stack align="center" gap="md">
                <ThemeIcon size={64} radius="xl" variant="light" color="dark">
                  <IconRocket size={32} stroke={1.5} />
                </ThemeIcon>
                <Text fw={700} size="lg">
                  02. Guided Implementation
                </Text>
                <Text size="sm" c="dimmed" lh={1.6}>
                  Work directly with a PhD-level specialist to execute the plan with regular
                  check-ins and structured feedback.
                </Text>
              </Stack>
              <Stack align="center" gap="md">
                <ThemeIcon size={64} radius="xl" variant="light" color="dark">
                  <IconCheck size={32} stroke={1.5} />
                </ThemeIcon>
                <Text fw={700} size="lg">
                  03. Final Submission
                </Text>
                <Text size="sm" c="dimmed" lh={1.6}>
                  Finalize your manuscript with confidence, knowing it has been rigorously reviewed
                  for clarity, structure, and impact.
                </Text>
              </Stack>
            </SimpleGrid>

            <Link href="/scholarcrafted/consultation" style={{ textDecoration: 'none' }}>
              <Button size="xl" variant="filled" bg={active.primary} radius={0} px={rem(60)}>
                SCHEDULE YOUR REVIEW
              </Button>
            </Link>
          </Stack>
        </Container>
      </Box>

      {/* Our Core Services */}
      <Box component="section" py={SECTION_SPACING} bg={active.surface}>
        <Container size={1100}>
          <Stack gap={rem(80)}>
            <Box>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c="dimmed"
              >
                Our Core Services
              </Text>
              <Title
                order={2}
                mt="md"
                style={{ fontSize: rem(48), fontWeight: 400, color: active.primary }}
              >
                Find the right support for your stage.
              </Title>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
              {[
                {
                  title: 'Live Academic Coaching',
                  label: '1-ON-1 GUIDANCE',
                  desc: 'A strategic partnership to help you overcome roadblocks, manage your project, and finish with confidence.',
                  link: '/scholarcrafted/consultation',
                  cta: 'Book a Consultation',
                },
                {
                  title: 'Structural Editing & Proofreading',
                  label: 'MANUSCRIPT REFINEMENT',
                  desc: 'From macro-level argument flow to micro-level prose precision, we ensure your research is presented with the clarity, tone, and authority expected by your committee.',
                  link: '/scholarcrafted/services/editing-proofreading',
                  cta: 'View Editing Services',
                },
                {
                  title: 'Custom Research & Data Support',
                  label: 'TECHNICAL ASSISTANCE',
                  desc: 'Prearranged offline support tailored to your exact needs, including literature mapping, survey construction, qualitative coding, and statistical analysis.',
                  link: '/scholarcrafted/services/research-support',
                  cta: 'Get Research Support',
                },
              ].map((service, i) => (
                <Box
                  key={i}
                  p={rem(40)}
                  bg="white"
                  style={{
                    border: '1px solid #eee',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <Stack gap="xl" flex={1}>
                    <Stack gap="xs">
                      <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.1em' }}>
                        {service.label}
                      </Text>
                      <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
                        {service.title}
                      </Title>
                    </Stack>
                    <Text size="sm" c="dimmed" lh={1.6}>
                      {service.desc}
                    </Text>
                    <Box mt="auto" pt="xl">
                      <Link href={service.link} style={{ textDecoration: 'none' }}>
                        <Group gap="xs" style={{ cursor: 'pointer' }}>
                          <Text
                            fw={600}
                            size="sm"
                            c={active.action}
                            style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
                          >
                            {service.cta}
                          </Text>
                          <IconArrowRight size={16} color={active.action} />
                        </Group>
                      </Link>
                    </Box>
                  </Stack>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* Testimonials Carousel */}
      <Box component="section" py={rem(180)} bg={active.background}>
        <Container size={1100}>
          <Carousel
            withIndicators
            loop
            withControls={false}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            styles={{
              root: { paddingBottom: rem(60) },
              indicators: { bottom: rem(-20) },
              indicator: {
                width: rem(8),
                height: rem(8),
                transition: 'width 250ms ease',
                backgroundColor: '#ccc',
              },
            }}
            classNames={{
              indicator: 'carousel-indicator',
            }}
          >
            {testimonials.map((item, index) => (
              <Carousel.Slide key={index}>
                <Container size={960}>
                  <Stack align="center" style={{ textAlign: 'center' }} gap={rem(40)}>
                    <Text
                      style={{
                        fontSize: rem(100),
                        fontFamily: 'var(--font-serif)',
                        lineHeight: 0,
                        opacity: 0.1,
                        marginBottom: rem(-40),
                        color: active.primary,
                      }}
                    >
                      &ldquo;
                    </Text>
                    <Text
                      style={{
                        fontSize: rem(36),
                        fontStyle: 'italic',
                        lineHeight: 1.4,
                        letterSpacing: '-0.01em',
                        color: active.primary,
                      }}
                    >
                      {item.quote}
                    </Text>
                    <Stack gap={4}>
                      <Text
                        fw={700}
                        size="xs"
                        c={active.primary}
                        style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                      >
                        {item.author}
                      </Text>
                      <Text size="xs" c="dimmed" style={{ letterSpacing: '0.05em' }}>
                        {item.institution}
                      </Text>
                    </Stack>
                  </Stack>
                </Container>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
