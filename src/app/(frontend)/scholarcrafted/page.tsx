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
} from '@mantine/core'
import { Navbar } from './_components/Navbar'
import { Footer } from './_components/Footer'
import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'
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
  const autoplay = useRef(Autoplay({ delay: 5000 }))

  return (
    <Box bg="white" style={{ minHeight: '100vh', color: '#111' }}>
      <Navbar />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .carousel-indicator[data-active] {
          width: ${rem(24)} !important;
          background-color: #111 !important;
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
                      lineHeight: 1.05,
                      letterSpacing: '-0.03em',
                    }}
                  >
                    Finish with Clarity. <br />
                    Submit with Confidence.
                  </Title>
                </Stack>
                <Box style={{ maxWidth: 480 }}>
                  <Text size="lg" lh={1.6} c="dimmed" style={{ fontSize: rem(19) }}>
                    From structural refinement to final-stage strategy, we help doctoral candidates
                    and researchers move from stalled drafts to submission-ready work.
                  </Text>
                </Box>
              </Stack>

              <SimpleGrid cols={3} spacing="lg" style={{ maxWidth: 500 }}>
                <Stack gap={4}>
                  <Text
                    fw={700}
                    size="xl"
                    style={{ fontFamily: 'var(--font-serif)', lineHeight: 1 }}
                  >
                    98%
                  </Text>
                  <Text
                    size="xs"
                    fw={600}
                    c="dimmed"
                    style={{ letterSpacing: '0.05em', textTransform: 'uppercase' }}
                  >
                    Completion
                    <br />
                    Rate
                  </Text>
                </Stack>
                <Stack gap={4}>
                  <Text
                    fw={700}
                    size="xl"
                    style={{ fontFamily: 'var(--font-serif)', lineHeight: 1 }}
                  >
                    4.9/5
                  </Text>
                  <Text
                    size="xs"
                    fw={600}
                    c="dimmed"
                    style={{ letterSpacing: '0.05em', textTransform: 'uppercase' }}
                  >
                    Average
                    <br />
                    Rating
                  </Text>
                </Stack>
                <Stack gap={4}>
                  <Text
                    fw={700}
                    size="xl"
                    style={{ fontFamily: 'var(--font-serif)', lineHeight: 1 }}
                  >
                    10y+
                  </Text>
                  <Text
                    size="xs"
                    fw={600}
                    c="dimmed"
                    style={{ letterSpacing: '0.05em', textTransform: 'uppercase' }}
                  >
                    Faculty
                    <br />
                    Expertise
                  </Text>
                </Stack>
              </SimpleGrid>

              <Stack gap="md">
                <Group gap="md">
                  <Link href="/scholarcrafted/consultation" style={{ textDecoration: 'none' }}>
                    <Button
                      size="lg"
                      variant="filled"
                      color="dark.9"
                      rightSection={<IconArrowRight size={16} />}
                    >
                      SCHEDULE CONSULTATION
                    </Button>
                  </Link>
                  <Link href="/scholarcrafted/how-it-works" style={{ textDecoration: 'none' }}>
                    <Button size="lg" variant="outline" color="dark.9">
                      LEARN OUR PROCESS
                    </Button>
                  </Link>
                </Group>
                <Text size="xs" fw={600} c="dark.3" style={{ letterSpacing: '0.05em' }}>
                  Trusted by 500+ graduate students worldwide.
                </Text>
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

      {/* The Challenge (Problem) */}
      <Box component="section" py={SECTION_SPACING} bg="#F9F8F6">
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
                style={{ fontSize: rem(48), fontWeight: 400, letterSpacing: '-0.02em' }}
              >
                The Isolation of the Archive
              </Title>
            </Box>

            <Text size="xl" lh={1.7} style={{ fontWeight: 400, fontSize: rem(22) }}>
              Brilliant research often stalls not from a lack of ideas, but from a collapse of
              structure. The transition from coursework to independent research leaves many doctoral
              candidates adrift—overwhelmed by vast amounts of data, literature, and isolated
              thought.
            </Text>

            <Divider style={{ width: rem(80) }} color="dark.2" />

            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={rem(60)} style={{ width: '100%' }}>
              <Stack gap="xs">
                <Text style={{ fontSize: rem(42), fontFamily: 'var(--font-serif)', lineHeight: 1 }}>
                  50%
                </Text>
                <Text size="xs" fw={500} c="dimmed" lh={1.4} style={{ letterSpacing: '0.02em' }}>
                  of doctoral students do not complete their degree.
                </Text>
              </Stack>
              <Stack gap="xs">
                <Text style={{ fontSize: rem(42), fontFamily: 'var(--font-serif)', lineHeight: 1 }}>
                  8.2y
                </Text>
                <Text size="xs" fw={500} c="dimmed" lh={1.4} style={{ letterSpacing: '0.02em' }}>
                  average time to completion in humanities.
                </Text>
              </Stack>
              <Stack gap="xs">
                <Text style={{ fontSize: rem(42), fontFamily: 'var(--font-serif)', lineHeight: 1 }}>
                  73%
                </Text>
                <Text size="xs" fw={500} c="dimmed" lh={1.4} style={{ letterSpacing: '0.02em' }}>
                  report feeling unsupported by their institution.
                </Text>
              </Stack>
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* Our Approach */}
      <Box component="section" py={SECTION_SPACING}>
        <Container size={1100}>
          <SimpleGrid cols={{ base: 1, md: 4 }} spacing={rem(80)}>
            <Box>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c="dimmed"
              >
                Our Approach
              </Text>
            </Box>
            <Box style={{ gridColumn: 'span 3' }}>
              <Stack gap="xl">
                <Title
                  order={2}
                  style={{
                    fontSize: rem(48),
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    maxWidth: 800,
                  }}
                >
                  Structured guidance for the independent scholar.
                </Title>
                <Text size="lg" lh={1.7} c="dimmed" style={{ maxWidth: 720, fontSize: rem(20) }}>
                  We provide the scaffolding required to turn an unwieldy manuscript into a
                  defensible, elegant dissertation. Our interventions are discrete, structural, and
                  deeply tailored to your discipline.
                </Text>

                <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={rem(40)} mt={rem(40)}>
                  <Stack gap="md">
                    <Text
                      fw={700}
                      size="xs"
                      style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}
                    >
                      Clarity
                    </Text>
                    <Text size="sm" lh={1.6} c="dimmed">
                      Untangle complex arguments and establish clear narrative arcs across chapters.
                    </Text>
                  </Stack>
                  <Stack gap="md">
                    <Text
                      fw={700}
                      size="xs"
                      style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}
                    >
                      Momentum
                    </Text>
                    <Text size="sm" lh={1.6} c="dimmed">
                      Structured milestones with weekly accountability to maintain rigorous
                      progress.
                    </Text>
                  </Stack>
                  <Stack gap="md">
                    <Text
                      fw={700}
                      size="xs"
                      style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}
                    >
                      Authority
                    </Text>
                    <Text size="sm" lh={1.6} c="dimmed">
                      Rigorous preparation for defense and final submission to the committee.
                    </Text>
                  </Stack>
                </SimpleGrid>
              </Stack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Methodology */}
      <Box component="section" py={SECTION_SPACING} bg="#111" c="white">
        <Container size={1100}>
          <SimpleGrid cols={{ base: 1, md: 4 }} spacing={rem(80)}>
            <Box>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c="gray.6"
              >
                Methodology
              </Text>
            </Box>
            <Box style={{ gridColumn: 'span 3' }}>
              <Stack gap={rem(80)}>
                <Title
                  order={2}
                  c="white"
                  style={{
                    fontSize: rem(48),
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    maxWidth: 800,
                  }}
                >
                  Our interventions are discrete, structural, and deeply tailored to the discipline.
                </Title>

                <Stack gap={0}>
                  {[
                    {
                      title: 'Developmental Editing',
                      desc: 'Macro-level restructuring of arguments, chapter sequencing, and narrative arc. We map the logic of your entire manuscript before addressing the prose.',
                    },
                    {
                      title: 'Pacing & Accountability',
                      desc: 'Structured milestones mimicking a rigorous advising relationship. Weekly check-ins, hard deadlines, and continuous feedback loops.',
                    },
                    {
                      title: 'Defense Preparation',
                      desc: 'Mock defenses, anticipated questioning, and presentation refinement aimed at projecting absolute authority over your subject matter.',
                    },
                  ].map((item, i) => (
                    <Box
                      key={i}
                      style={{
                        borderTop: '1px solid #333',
                        paddingBottom: rem(56),
                        paddingTop: rem(56),
                      }}
                    >
                      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
                        <Box>
                          <Text
                            c="white"
                            style={{
                              fontSize: rem(32),
                              fontFamily: 'var(--font-serif)',
                              fontWeight: 500,
                              lineHeight: 1.2,
                            }}
                          >
                            {item.title}
                          </Text>
                        </Box>
                        <Box>
                          <Text
                            size="lg"
                            lh={1.8}
                            c="gray.3"
                            style={{
                              fontWeight: 400,
                            }}
                          >
                            {item.desc}
                          </Text>
                        </Box>
                      </SimpleGrid>
                    </Box>
                  ))}
                  <Divider style={{ borderColor: '#333' }} />
                </Stack>
              </Stack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Testimonials Carousel */}
      <Box component="section" py={rem(180)} bg="white">
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
                      }}
                    >
                      {item.quote}
                    </Text>
                    <Stack gap={4}>
                      <Text
                        fw={700}
                        size="xs"
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
      {/* Final CTA */}
      <Box
        component="section"
        py={SECTION_SPACING}
        bg="#F9F8F6"
        style={{ borderTop: '1px solid #eee' }}
      >
        <Container size={INNER_WIDTH}>
          <Stack align="center" style={{ textAlign: 'center' }} gap="xl">
            <Title
              order={2}
              style={{ fontSize: rem(56), fontWeight: 400, letterSpacing: '-0.02em' }}
            >
              Secure your completion.
            </Title>
            <Text size="lg" c="dimmed" style={{ maxWidth: 600, fontSize: rem(20) }} lh={1.6}>
              We accept a limited number of candidates per academic quarter to ensure rigorous,
              undivided attention to your manuscript.
            </Text>
            <Link href="/scholarcrafted/consultation" style={{ textDecoration: 'none' }}>
              <Button size="xl" variant="filled" color="dark.9" mt="xl" radius={0} px={rem(60)}>
                SUBMIT INQUIRY
              </Button>
            </Link>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
