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
                    borderTop: `1px solid ${active.primary}22`,
                    paddingTop: rem(32),
                    maxWidth: 550,
                  }}
                >
                  <Stack gap="md">
                    <Text
                      size="xs"
                      fw={700}
                      c="dimmed"
                      style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                    >
                      Institutional Record &bull; Est. 2016
                    </Text>
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
                  </Stack>
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
          <Stack gap={rem(60)} align="flex-start">
            <Box>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c="dimmed"
              >
                The Challenge
              </Text>
              <Title
                order={2}
                mt="md"
                style={{
                  fontSize: rem(48),
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: active.primary,
                }}
              >
                Academic research can be <br />a lonely journey.
              </Title>
            </Box>

            <Stack gap="xl">
              {[
                'You’re not getting meaningful support from your advisor.',
                'You’re struggling to balance work, family and study.',
                'You’re overwhelmed by the sheer scope of it all.',
                'You’re crippled by perfectionism.',
                'You’re wasting time.',
              ].map((pain, i) => (
                <Group key={i} gap="md" wrap="nowrap" align="flex-start">
                  <Box
                    w={8}
                    h={8}
                    mt={10}
                    bg={active.accent}
                    style={{ borderRadius: '50%', flexShrink: 0 }}
                  />
                  <Text size="xl" fw={400} c={active.primary}>
                    {pain}
                  </Text>
                </Group>
              ))}
            </Stack>

            <Text
              size="lg"
              lh={1.7}
              c="dimmed"
              mt="xl"
              style={{
                fontWeight: 400,
                fontSize: rem(22),
                borderTop: `2px solid ${active.accent}`,
                paddingTop: rem(40),
              }}
            >
              We provide the scaffolding required to move forward with absolute authority.
            </Text>
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
                <Text fw={700} size="lg" style={{ fontFamily: 'var(--font-serif)' }}>
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
                <Text fw={700} size="lg" style={{ fontFamily: 'var(--font-serif)' }}>
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
                <Text fw={700} size="lg" style={{ fontFamily: 'var(--font-serif)' }}>
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
                  title: 'Dissertation Coaching',
                  label: '1-ON-1 GUIDANCE',
                  desc: 'A strategic partnership to help you overcome roadblocks, manage your project, and finish with confidence.',
                  link: '/scholarcrafted/services/dissertation-coaching',
                  cta: 'Explore Coaching',
                },
                {
                  title: 'Editing & Review',
                  label: 'MANUSCRIPT REFINEMENT',
                  desc: 'From structural logic to final proofreading, we ensure your argument is presented with clarity and authority.',
                  link: '/scholarcrafted/services/editing-proofreading',
                  cta: 'View Editing Services',
                },
                {
                  title: 'Technical Support',
                  label: 'METHODOLOGY & DATA',
                  desc: 'Expert assistance with research design, qualitative coding, statistical analysis, and more.',
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
                <Container size={INNER_WIDTH}>
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
                        fontFamily: 'var(--font-serif)',
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
