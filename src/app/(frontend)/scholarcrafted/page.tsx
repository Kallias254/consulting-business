'use client'

import React, { useState, useEffect } from 'react'
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
  Center,
  Accordion,
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
  IconChevronDown,
  IconChevronUp,
  IconUserExclamation,
  IconScale,
  IconBooks,
  IconBrain,
  IconQuote,
} from '@tabler/icons-react'
import { Carousel } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'

import { SECTION_SPACING, INNER_WIDTH, READING_WIDTH } from '@/layout'

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

const homeFaqs = [
  {
    q: 'What if my committee disagrees with the structural changes we make?',
    a: "We don't replace your committee; we decode them. Every strategy we provide is designed to explicitly address your committee's feedback, helping you defend your choices academically. If there is a conflict, we coach you on exactly how to communicate with your chair to resolve it.",
  },
  {
    q: 'Is getting external help considered academic misconduct?',
    a: 'Absolutely not. We operate under a strict ethical framework. We do not write your content, run your statistical analysis, or do your research for you. We provide the high-level structural oversight and methodological coaching that your university is failing to provide. You remain the sole author of your work.',
  },
  {
    q: "I haven't written a single word in 6 months. Is my project dead?",
    a: "Writer's block at the ABD level is rarely about laziness; it's about structural paralysis. When the scope of your literature or data becomes too overwhelming, your brain shuts down. We help you break the project into hyper-specific, manageable pieces so you can start moving forward today.",
  },
  {
    q: "I'm terrified my research isn't 'original' or 'good enough'.",
    a: 'Imposter syndrome is the most common affliction among doctoral candidates. A completed dissertation does not need to redefine your entire field—it just needs to be methodologically sound, clearly argued, and finished. We help you dial down the perfectionism and focus on what actually matters: getting it approved.',
  },
]

export default function ScholarCraftedLanding() {
  const theme = useMantineTheme()
  const active = theme.other
  const autoplay = useRef(Autoplay({ delay: 5000 }))
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .carousel-indicator {
          transform-origin: left;
        }
        .carousel-indicator[data-active] {
          transform: scaleX(3) !important;
          background-color: ${active.primary} !important;
        }

        .hero-primary-container {
          min-width: 280px;
        }

        .home-accordion-item[data-active] {
          border-color: ${active.primary} !important;
        }

        .home-accordion-control:hover {
          background-color: transparent !important;
        }

        @media (max-width: 768px) {
          .hero-primary-container {
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      ` }}
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
                    
                    c="dimmed"
                  >
                    Academic Advisory Services
                  </Text>
                  <Title
                    order={1}
                    style={{
                      fontSize: rem(64),
                      lineHeight: 1.1,
                      letterSpacing: '-0.03em',
                      color: active.primary }}
                  >
                    From Stall to Submission.
                  </Title>
                </Stack>
                <Box style={{ maxWidth: 480 }}>
                  <Text size="xl" lh={1.6} c="dimmed" style={{ fontSize: rem(20) }}>
                    We provide the rigorous, faculty-level guidance and structural accountability you need to break through ABD paralysis and defend your dissertation with confidence.
                  </Text>
                </Box>
              </Stack>

              <Stack gap="xl">
                <Box className="hero-primary-container">
                  <Stack gap="xs">
                    <Link href="/scholarcrafted/consultation?interest=other&metBefore=no" style={{ textDecoration: 'none' }}>
                      <Button size="xl" variant="filled" bg={active.primary} fullWidth radius={0} className="impeccable-button">
                        FREE INTRODUCTORY CALL
                      </Button>
                    </Link>
                    <Text size="sm" c="dimmed" lh={1.4}>
                      A zero-pressure discovery call to discuss your current roadblocks and determine the ideal path forward. No commitment required.
                    </Text>
                  </Stack>
                </Box>

                <Box
                  mt="md"
                  style={{
                    paddingTop: rem(32),
                    maxWidth: 550 }}
                >
                  <SimpleGrid cols={3} spacing="xl">
                    <Stack gap={0}>
                      <Text
                        fw={700}
                        style={{
                          fontSize: rem(28),
                          color: active.primary,
                          lineHeight: 1 }}
                      >
                        98%
                      </Text>
                      <Text
                        size="xs"
                        c="dimmed"
                        mt={4}
                        style={{
                          lineHeight: 1.2 }}
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
                          fontSize: rem(28),
                          color: active.primary,
                          lineHeight: 1 }}
                      >
                        4.9/5
                      </Text>
                      <Text
                        size="xs"
                        c="dimmed"
                        mt={4}
                        style={{
                          lineHeight: 1.2 }}
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
                          fontSize: rem(28),
                          color: active.primary,
                          lineHeight: 1 }}
                      >
                        500+
                      </Text>
                      <Text
                        size="xs"
                        c="dimmed"
                        mt={4}
                        style={{
                          lineHeight: 1.2 }}
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
                  objectPosition: 'center top' }}
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Resonance Section (The Pain Points) */}
      <Box component="section" py={SECTION_SPACING} bg={active.surface}>
        <Container size={1100}>
          <Stack gap={rem(80)}>
            <Box style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
              <Text
                size="xs"
                fw={700}
                c={active.accent}
                style={{ letterSpacing: '0.15em' }}
              >
                YOU ARE NOT ALONE
              </Text>
              <Title
                order={2}
                mt="md"
                style={{
                  fontSize: rem(48),
                  color: active.primary,
                  lineHeight: 1.1,
                }}
              >
                Your research journey is unique. <br />
                Your challenges are not.
              </Title>
              <Text size="lg" c="dimmed" lh={1.7} mt="md">
                Every year, thousands of brilliant doctoral candidates stall at the ABD stage. It isn&apos;t a lack of capability—it&apos;s a lack of structural support.
              </Text>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(40)}>
              {[
                {
                  tag: 'ADVISORY SILENCE',
                  icon: IconUserExclamation,
                  complaint: 'I submitted my draft three months ago. My chair just got back to me with two vague sentences that contradict what my second reader asked for. I have no idea what they actually want me to do.',
                  desc: 'Navigating contradictory feedback or months of silence leaves you guessing at what your committee actually wants to see.',
                },
                {
                  tag: 'LIFE ALIGNMENT',
                  icon: IconScale,
                  complaint: 'After working a full day and putting the kids to bed, I stare at my laptop at 10 PM completely exhausted. Weeks go by without me writing a single page, and the guilt is crushing.',
                  desc: 'Without external accountability and structured milestones, dissertation writing easily slips to the bottom of your daily priorities.',
                },
                {
                  tag: 'SYNTHESIS COLLAPSE',
                  icon: IconBooks,
                  complaint: 'I used AI to summarize 100 articles and generate literature matrices, but now I’m drowning in thousands of disconnected bullet points. My chair says my draft reads like a generic summary and lacks my own critical voice.',
                  desc: 'AI tools can churn out endless summaries, but they cannot provide the deep theoretical synthesis and authentic scholar’s voice your committee demands.',
                },
                {
                  tag: 'DEFENSE ANXIETY',
                  icon: IconBrain,
                  complaint: 'I keep tweaking AI prompts trying to make my methodology sound ‘smart’ enough, but I’m terrified my committee will ask me to defend a theoretical connection I didn’t actually conceptualize myself.',
                  desc: 'Relying on generative tools creates imposter syndrome and defense anxiety. We provide the human expert sounding board to ensure your research design is robust, defensible, and entirely your own.',
                },
              ].map((item, i) => (
                <Box
                  key={i}
                  p={rem(40)}
                  bg={active.background}
                  style={{
                    borderRadius: rem(16),
                    border: `1px solid ${active.primary}20`,
                    boxShadow: `0 4px 24px ${active.primary}05`,
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = `0 16px 40px ${active.primary}12`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 4px 24px ${active.primary}05`;
                  }}
                >
                  {/* The Student Complaint (The Resonance) */}
                  <Box mb="sm">
                    <Group gap="xs" mb="md">
                      <IconQuote size={20} style={{ opacity: 0.4 }} />
                      <Text size="xs" fw={700} c="dimmed" style={{ letterSpacing: '0.15em' }}>
                        THE COMPLAINT
                      </Text>
                    </Group>
                    <Text
                      size="lg"
                      style={{
                        fontStyle: 'italic',
                        lineHeight: 1.7,
                        color: active.primary,
                      }}
                    >
                      &ldquo;{item.complaint}&rdquo;
                    </Text>
                  </Box>

                  <Divider mt="auto" mb="lg" style={{ borderColor: `${active.primary}15` }} />

                  {/* The Structural Reality (The Diagnosis) */}
                  <Stack gap="sm">
                    <Group gap="sm" align="center">
                      <ThemeIcon size={32} radius="md" variant="light" color={active.accent}>
                        <item.icon size={18} stroke={1.5} />
                      </ThemeIcon>
                      <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.15em' }}>
                        {item.tag}
                      </Text>
                    </Group>
                    <Text size="sm" c="dimmed" lh={1.6}>
                      {item.desc}
                    </Text>
                  </Stack>
                </Box>
              ))}
            </SimpleGrid>
            
            <Center mt={rem(40)}>
              <Box
                onClick={() => scrollToSection('getting-started')}
                style={{ 
                  padding: rem(16), 
                  borderRadius: '50%', 
                  backgroundColor: active.background,
                  border: `1px solid ${active.primary}20`,
                  boxShadow: `0 4px 12px ${active.primary}05`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: active.primary,
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(4px)';
                  e.currentTarget.style.boxShadow = `0 6px 20px ${active.primary}15`;
                  e.currentTarget.style.borderColor = active.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 4px 12px ${active.primary}05`;
                  e.currentTarget.style.borderColor = `${active.primary}20`;
                }}
              >
                <IconChevronDown size={24} stroke={1.5} />
              </Box>
            </Center>
          </Stack>
        </Container>
      </Box>

      {/* The 3-Step Process */}
      <Box id="getting-started" component="section" py={SECTION_SPACING} bg={active.background}>
        <Container size={1100}>
          <Stack gap={rem(80)} align="center" style={{ textAlign: 'center' }}>
            <Box style={{ maxWidth: 700 }}>
              <Text
                size="xs"
                
                c="dimmed"
              >
                Getting Started is Simple
              </Text>
              <Title
                order={2}
                mt="md"
                style={{ fontSize: rem(48), color: active.primary }}
              >
                A clear path forward, <br /> tailored to your research.
              </Title>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(60)}>
              <Stack align="center" gap="md">
                <ThemeIcon size={64} radius="xl" variant="light" color="dark">
                  <IconMessageChatbot size={32} stroke={1.5} />
                </ThemeIcon>
                <Text fw={700} size="lg">
                  01. Book Your 15-Minute Discovery Call
                </Text>
                <Text size="sm" c="dimmed" lh={1.6}>
                  No lengthy intake forms or high-pressure sales pitches. Just a focused, informal conversation to connect and discuss where your dissertation is currently stalled.
                </Text>
              </Stack>
              <Stack align="center" gap="md">
                <ThemeIcon size={64} radius="xl" variant="light" color="dark">
                  <IconRocket size={32} stroke={1.5} />
                </ThemeIcon>
                <Text fw={700} size="lg">
                  02. Diagnostic Problem-Solving (During Call)
                </Text>
                <Text size="sm" c="dimmed" lh={1.6}>
                  We dive into your specific committee feedback, methodological hurdles, and timeline constraints to diagnose exactly what is blocking your academic progress.
                </Text>
              </Stack>
              <Stack align="center" gap="md">
                <ThemeIcon size={64} radius="xl" variant="light" color="dark">
                  <IconCheck size={32} stroke={1.5} />
                </ThemeIcon>
                <Text fw={700} size="lg">
                  03. Your Tailored Service Roadmap (After Call)
                </Text>
                <Text size="sm" c="dimmed" lh={1.6}>
                  Following our discussion, we follow up with a customized proposal recommending the exact service—whether live coaching, structural editing, or custom data support—designed to get you to submission.
                </Text>
              </Stack>
            </SimpleGrid>

            <Link href="/scholarcrafted/consultation?interest=other&metBefore=no" style={{ textDecoration: 'none' }}>
              <Button size="xl" variant="filled" bg={active.primary} radius={0} px={rem(60)} className="impeccable-button">
                FREE INTRODUCTORY CALL
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
                
                c="dimmed"
              >
                Our Core Services
              </Text>
              <Title
                order={2}
                mt="md"
                style={{ fontSize: rem(48), color: active.primary }}
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
                  link: '/scholarcrafted/services/private-coaching',
                  cta: 'Explore Coaching',
                },
                {
                  title: 'Structural Editing & Proofreading',
                  label: 'MANUSCRIPT REFINEMENT',
                  desc: 'From macro-level argument flow to micro-level prose precision, we ensure your research is presented with the clarity, tone, and authority expected by your committee.',
                  link: '/scholarcrafted/services/editing-proofreading',
                  cta: 'Explore Editing',
                },
                {
                  title: 'Custom Research & Data Support',
                  label: 'TECHNICAL ASSISTANCE',
                  desc: 'Prearranged offline support tailored to your exact needs, including literature mapping, survey construction, qualitative coding, and statistical analysis.',
                  link: '/scholarcrafted/services/research-support',
                  cta: 'Explore Support',
                },
              ].map((service, i) => (
                <Box
                  key={i}
                  p={rem(40)}
                  bg="white"
                  className="impeccable-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%' }}
                >
                  <Stack gap="xl" flex={1}>
                    <Stack gap="xs">
                      <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.1em' }}>
                        {service.label}
                      </Text>
                      <Title order={3} >
                        {service.title}
                      </Title>
                    </Stack>
                    <Text size="sm" c="dimmed" lh={1.6}>
                      {service.desc}
                    </Text>
                    <Box mt="auto" pt="xl">
                      <Link href={service.link} style={{ textDecoration: 'none' }}>
                        <Button variant="outline" color={active.primary} radius={0} fullWidth style={{ borderColor: active.primary }} className="impeccable-button">
                          {service.cta}
                        </Button>
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
            emblaOptions={{ loop: true }}
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
                transition: 'transform 250ms ease, background-color 250ms ease',
                backgroundColor: '#eee',
              } }}
            classNames={{
              indicator: 'carousel-indicator' }}
          >
            {testimonials.map((item, index) => (
              <Carousel.Slide key={index}>
                <Container size={960}>
                  <Stack align="center" style={{ textAlign: 'center' }} gap={rem(40)}>
                    <Text
                      style={{
                        fontSize: rem(100),
                        lineHeight: 0,
                        opacity: 0.1,
                        marginBottom: rem(-40),
                        color: active.primary }}
                    >
                      &ldquo;
                    </Text>
                    <Text
                      style={{
                        fontSize: rem(36),
                        fontStyle: 'italic',
                        lineHeight: 1.4,
                        letterSpacing: '-0.01em',
                        color: active.primary }}
                    >
                      {item.quote}
                    </Text>
                    <Stack gap={4}>
                      <Text
                        size="xs"
                        c={active.primary}
                        
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

      {/* Frequently Asked Questions */}
      <Box component="section" py={SECTION_SPACING} bg={active.surface}>
        <Container size={800}>
          <Stack gap={rem(60)}>
            <Box style={{ textAlign: 'center' }}>
              <Text
                size="xs"
                
                c="dimmed"
              >
                FAQ & Integrity
              </Text>
              <Title order={2} mt="xs" style={{ fontSize: rem(48), color: active.primary }}>
                Common Concerns
              </Title>
              <Text size="lg" c="dimmed" mt="md">
                We understand the anxieties of doctoral research. You are not the first to feel this way.
              </Text>
            </Box>

            <Accordion>
              {homeFaqs.map((faq, i) => (
                <Accordion.Item key={i} value={`faq-${i}`}>
                  <Accordion.Control>
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

      <Footer />

      <Box
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: rem(40),
          right: rem(40),
          width: rem(50),
          height: rem(50),
          borderRadius: '50%',
          backgroundColor: active.surface,
          border: `1px solid ${active.primary}33`,
          color: active.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 100,
          opacity: showBackToTop ? 1 : 0,
          pointerEvents: showBackToTop ? 'all' : 'none',
          transform: showBackToTop ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.2s ease',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.1)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        <IconChevronUp size={24} stroke={1.5} />
      </Box>
    </Box>
  )
}
