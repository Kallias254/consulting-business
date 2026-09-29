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
  IconChevronUp,
  IconUserExclamation,
  IconScale,
  IconBooks,
  IconBrain,
  IconQuote,
  IconStarFilled,
  IconAlignJustified,
  IconMicroscope,
  IconBriefcase,
} from '@tabler/icons-react'
import { Carousel } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'

import { SECTION_SPACING, INNER_WIDTH, READING_WIDTH } from '@/layout'

const testimonials = [
  {
    quote:
      'Orchestrating a 22-author handbook for Routledge was an administrative nightmare. The Principia team handled all contributor compliance formatting and typeset the entire volume seamlessly. They saved our publication timeline.',
    author: 'DR. M. ROBERTS, ASSOCIATE PROFESSOR',
    institution: 'DEPARTMENT OF SOCIOLOGY (HANDBOOK EDITOR)',
  },
  {
    quote:
      'When my NSF grant was approved, I realized my lab lacked the data infrastructure to execute the quantitative tracking. Their custom database scripting and SPSS pipeline kept our milestones perfectly on track.',
    author: 'DR. S. PATEL, LAB DIRECTOR',
    institution: 'BEHAVIORAL SCIENCES RESEARCH LAB',
  },
  {
    quote:
      'The Correspondence Buffer is a game-changer. When the journal sent back major revisions, the team drafted the entire reply matrix and locked it to our submission draft. I approved it in 60 seconds.',
    author: 'DR. E. HAYES, TENURE-TRACK ASSISTANT PROFESSOR',
    institution: 'DEPARTMENT OF PUBLIC POLICY',
  },
]

const homeFaqs = [
  {
    q: 'How does the Correspondence Liaison Buffer work with journal portals?',
    a: 'We act as your editorial and administrative coordinators. We compile response tables, format drafts, and write responses. We load them into your dashboard for your 60-second review and final approval, keeping you in control of the submission portal without the inbox noise.',
  },
  {
    q: 'Is this service compliant with university research standards and journal policies?',
    a: 'Absolutely. We operate under a strict ethical framework. We do not write your content, fabricate data, or run original research for you. We provide structural formatting, methodological validation, and publication project management. You remain the sole author of your research.',
  },
  {
    q: 'Can you handle multi-contributor handbooks or edited volumes?',
    a: 'Yes. This is one of our primary services for Associate Professors and Editors. We ingest drafts from all your external contributors, standardise citation formats (APA/Chicago/MLA), and output a cohesive, publisher-compliant volume.',
  },
  {
    q: 'Can I use startup packages or institutional grants to pay for your services?',
    a: 'Yes. Most universities allow startup funds, departmental allocations, or external research grants to be used for external editorial support, data management, and publication design services.',
  },
]

const universities = [
  { name: 'Yale', logo: '/logos/Yale_University_logo.svg' },
  { name: 'Princeton', logo: '/logos/Princeton_University-Logo.wine.svg' },
  { name: 'Stanford', logo: '/logos/stanford-university-logo-svgrepo-com.svg' },
  { name: 'Oxford', logo: '/logos/university-of-oxford-logo-1.svg' },
  { name: 'Cambridge', logo: '/logos/University_of_Cambridge-Logo.wine.svg' },
  { name: 'MIT', logo: '/logos/Massachusetts_Institute_of_Technology-Logo.wine.svg' },
  { name: 'Columbia', logo: '/logos/cu-header.svg' },
  { name: 'Duke', logo: '/logos/duke-wordmark-white.svg' },
  { name: 'Michigan', logo: '/logos/University_of_Michigan-Logo.wine.svg' },
  { name: 'ANU', logo: '/logos/Australian_National_University-Logo.wine.svg' },
  { name: 'GCU', logo: '/logos/Grand_Canyon_University-Logo.wine.svg' },
  { name: 'K-State', logo: '/logos/Kansas_State_University-Logo.wine.svg' },
  { name: 'Harvard', logo: '/logos/Harvard_University_logo.svg' },
  { name: 'Johns Hopkins', logo: '/logos/Johns_Hopkins_University-Logo.wine.svg' },
  { name: 'NCSU', logo: '/logos/North_Carolina_State_University_Athletic_logo.svg' },
]

const LaurelBranch = ({ size = 56, color = 'currentColor', left = false }) => (
  <svg
    width={size / 2}
    height={size}
    viewBox="0 0 24 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: left ? 'scaleY(-1)' : 'scale(-1, -1)', display: 'block', opacity: 0.8 }}
  >
    <path d="M12 44C12 30 6 16 20 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 38C5 36 2 40 5 44C8 40 11 41 11 38Z" fill={color} />
    <path d="M9 28C3 26 0 30 3 34C6 30 9 31 9 28Z" fill={color} />
    <path d="M9 18C3 16 0 20 3 24C6 20 9 21 9 18Z" fill={color} />
    <path d="M13 32C19 30 22 34 19 38C16 34 13 35 13 32Z" fill={color} />
    <path d="M11 22C17 20 20 24 17 28C14 24 11 25 11 22Z" fill={color} />
    <path d="M11 12C17 10 20 14 17 18C14 14 11 15 11 12Z" fill={color} />
    <path d="M18 6C16 0 22 -2 24 4C21 6 18 6 18 6Z" fill={color} />
  </svg>
)

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
          `,
        }}
      />

      {/* Hero Section — responsive left-anchored editorial layout */}
      <Box
        component="section"
        style={{
          position: 'relative',
          minHeight: 'clamp(580px, 88vh, 840px)',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Background image — full bleed, right side breathes */}
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 25%',
            zIndex: 0,
          }}
        />
        {/* Directional gradient: solid dark behind text, transitions gracefully across viewport */}
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.92) 45%, rgba(10,10,10,0.70) 75%, rgba(10,10,10,0.30) 100%)',
            zIndex: 1,
          }}
        />
        {/* Bottom subtle blend */}
        <Box
          style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: rem(100),
            background: 'linear-gradient(to top, rgba(10,10,10,0.6), transparent)',
            zIndex: 1,
          }}
        />

        {/* Content — responsive container */}
        <Box style={{ position: 'relative', zIndex: 2, width: '100%', paddingTop: rem(120), paddingBottom: rem(80) }}>
          <Container size={1200} px={{ base: 'md', sm: 'xl' }}>
            <Box style={{ maxWidth: rem(640) }}>
              <Stack gap="xl" align="flex-start">

                <p style={{ margin: 0, fontSize: rem(11), fontWeight: 700, letterSpacing: '0.22em', color: active.accent, textTransform: 'uppercase' }}>
                  Academic Operations & Advisory
                </p>

                <Title
                  order={1}
                  style={{
                    fontSize: 'clamp(2.1rem, 5.2vw, 3.8rem)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: '#ffffff',
                    fontFamily: 'var(--font-serif)',
                  }}
                >
                  Your Research<br />Doesn&apos;t Stall Here.
                </Title>

                <p style={{ margin: 0, fontSize: 'clamp(1rem, 1.8vw, 1.125rem)', lineHeight: 1.7, color: 'rgba(255,255,255,0.80)', maxWidth: '48ch' }}>
                  Faculty-led academic operations. We handle the formatting, compliance, and correspondence pipelines so you can focus on the research.
                </p>

                {/* Buttons — responsive side-by-side or stack on small mobile */}
                <Group gap={rem(12)} wrap="wrap" style={{ width: '100%' }}>
                  <Link href="/scholarcrafted/request-review?service=editing" style={{ textDecoration: 'none', display: 'inline-block' }}>
                    <Button
                      size="lg"
                      radius={0}
                      style={{
                        backgroundColor: active.accent,
                        color: '#fff',
                        height: rem(52),
                        paddingLeft: rem(28),
                        paddingRight: rem(28),
                        border: 'none',
                        fontWeight: 600,
                        fontSize: rem(15),
                      }}
                    >
                      Get it off your plate
                    </Button>
                  </Link>
                  <Link href="/scholarcrafted/consultation" style={{ textDecoration: 'none', display: 'inline-block' }}>
                    <Button
                      size="lg"
                      radius={0}
                      style={{
                        borderColor: 'rgba(255,255,255,0.4)',
                        borderWidth: 1,
                        borderStyle: 'solid',
                        color: '#ffffff',
                        background: 'rgba(255,255,255,0.06)',
                        height: rem(52),
                        paddingLeft: rem(28),
                        paddingRight: rem(28),
                        fontSize: rem(15),
                      }}
                    >
                      Work through it with a coach
                    </Button>
                  </Link>
                </Group>

                {/* Responsive stats strip */}
                <Box style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: rem(24), width: '100%' }}>
                  <SimpleGrid cols={3} spacing={{ base: 'xs', sm: 'md' }}>
                    {[
                      { val: 'Est. 2012', label: 'Academic Advisory' },
                      { val: '4.9 / 5', label: 'Average Rating' },
                      { val: '500+', label: 'Scholars Guided' },
                    ].map((s, i) => (
                      <Box key={i}>
                        <p style={{ margin: 0, fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1 }}>{s.val}</p>
                        <p style={{ margin: 0, fontSize: rem(11), color: 'rgba(255,255,255,0.5)', marginTop: rem(4) }}>{s.label}</p>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Box>

              </Stack>
            </Box>
          </Container>
        </Box>
      </Box>


      {/* Why you're stuck — white bg, breaks dark-dark collision */}
      <Box component="section" py={{ base: rem(60), md: SECTION_SPACING }} bg={active.background}>
        <Container size={1100} px={{ base: "md", sm: "xl" }}>
          <Stack gap="xl">

            {/* GradCoach-style dual headline */}
            <Stack gap={rem(4)}>
              <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.18em' }}>
                WHY YOU&apos;RE STUCK
              </Text>
              <Title order={2} style={{ fontSize: "clamp(1.85rem, 4.2vw, 2.75rem)", color: active.primary, lineHeight: 1.15 }}>
                It&apos;s not a capability problem.
              </Title>
              <Title order={2} style={{ fontSize: "clamp(1.85rem, 4.2vw, 2.75rem)", color: `${active.primary}40`, lineHeight: 1.15, fontStyle: "italic" }}>
                It&apos;s a clarity problem.
              </Title>
            </Stack>

            {/* 4 clean cards on light bg */}
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={{ base: rem(12), sm: rem(16) }}>
              {[
                {
                  num: '01',
                  title: 'No clear direction',
                  desc: 'You know what the work is — but not what to do next. So you keep circling the same decisions.',
                },
                {
                  num: '02',
                  title: "Feedback you can't action",
                  desc: "Your advisor's comments are delayed, vague, or impossible to apply without a second conversation that never happens.",
                },
                {
                  num: '03',
                  title: 'Stuck in rewrite loops',
                  desc: "The same sections, again and again. Hard work that doesn't move the needle.",
                },
                {
                  num: '04',
                  title: 'Formatting and admin overhead',
                  desc: 'Citations, contributor chaos, journal style guides. Weeks that should go back into the research.',
                },
              ].map((item, i) => (
                <Box
                  key={i}
                  p={rem(32)}
                  style={{
                    backgroundColor: active.surface,
                    borderTop: `3px solid ${i % 2 === 0 ? active.accent : `${active.primary}18`}`,
                    transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s cubic-bezier(0.16,1,0.3,1), border-top-color 0.25s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(-5px)';
                    el.style.boxShadow = `0 12px 32px ${active.accent}18`;
                    el.style.borderTopColor = active.accent;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'none';
                    el.style.borderTopColor = i % 2 === 0 ? active.accent : `${active.primary}18`;
                  }}
                >
                  <Stack gap="sm">
                    <p style={{ margin: 0, fontSize: rem(11), fontWeight: 700, color: active.accent, letterSpacing: '0.12em' }}>{item.num}</p>
                    <p style={{ margin: 0, fontSize: rem(17), fontWeight: 700, color: active.primary, lineHeight: 1.3 }}>{item.title}</p>
                    <p style={{ margin: 0, fontSize: rem(14), color: '#666', lineHeight: 1.7 }}>{item.desc}</p>
                  </Stack>
                </Box>
              ))}
            </SimpleGrid>

            <p style={{ margin: 0, fontSize: rem(15), fontWeight: 500, color: `${active.primary}60`, borderTop: `1px solid ${active.primary}12`, paddingTop: rem(28) }}>
              That&apos;s exactly what we help with.
            </p>
          </Stack>
        </Container>
      </Box>

      {/* Meet Dr. Micah Dobson */}
      <Box component="section" style={{ backgroundColor: "#111111" }} py={{ base: rem(60), md: rem(100) }}>
        <Container size={1100} px={{ base: "md", sm: "xl" }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: rem(36), md: rem(80) }} style={{ alignItems: 'center' }}>
            {/* Headshot */}
            <Box style={{ position: "relative", height: "clamp(320px, 45vw, 540px)", overflow: "hidden" }}>
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=900"
                alt="Dr. Micah Dobson — ScholarCrafted"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  display: 'block',
                  filter: 'grayscale(15%)',
                }}
              />
              <Box
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  backgroundColor: active.accent,
                }}
              />
            </Box>

            {/* Copy */}
            <Stack gap={rem(36)}>
              <Stack gap="xs">
                <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.2em' }}>
                  WHO YOU&apos;RE WORKING WITH
                </Text>
                <Title
                  order={2}
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontFamily: "var(--font-serif)",
                    color: "white",
                    lineHeight: 1.1,
                  }}
                >
                  Dr. Micah Dobson
                </Title>
              </Stack>

              <Text size="md" lh={1.8} c="rgba(255,255,255,0.8)">
                Associate Professor at NC State. College Board AP Research Reader — which means he evaluates the same methodology standards your committee does. He&apos;s been on both sides of the table, and that&apos;s what makes the difference.
              </Text>

              <Stack gap="sm" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: rem(28) }}>
                {[
                  'Certified AP Capstone Research Evaluator',
                  'Active Publisher Liaison — Routledge, Palgrave',
                  'NSF & Fulbright Grant Project Director',
                ].map((cred, i) => (
                  <Group key={i} gap="sm" wrap="nowrap" align="flex-start">
                    <Box
                      style={{
                        width: rem(18),
                        height: rem(18),
                        backgroundColor: active.accent,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: rem(3),
                      }}
                    >
                      <IconCheck size={11} color="white" stroke={3} />
                    </Box>
                    <Text size="sm" c="rgba(255,255,255,0.85)" lh={1.5}>{cred}</Text>
                  </Group>
                ))}
              </Stack>

              <Box>
                <Link href="/scholarcrafted/consultation" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="outline"
                    color="white"
                    radius={0}
                    size="md"
                    style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}
                    className="impeccable-button"
                  >
                    Work through it with a coach →
                  </Button>
                </Link>
              </Box>
            </Stack>
          </SimpleGrid>
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
                HOW IT WORKS
              </Text>
              <Title
                order={2}
                mt="md"
                style={{ fontSize: rem(48), color: active.primary }}
              >
                Three steps. No friction.
              </Title>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={{ base: rem(16), md: rem(2) }}>
              {[
                { num: '01', label: 'Book', desc: "Pick a time on Dr. Dobson's calendar. 20 minutes, Zoom." },
                { num: '02', label: 'Talk', desc: 'Bring the project wherever it is. He comes prepared.' },
                { num: '03', label: 'We get to work', desc: "Proposal issued. Work begins as soon as you're ready." },
              ].map((step, i) => (
                <Box
                  key={i}
                  p={rem(40)}
                  bg={active.surface}
                  style={{
                    borderTop: `3px solid ${i === 0 ? active.accent : `${active.primary}20`}`,
                    transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s cubic-bezier(0.16,1,0.3,1), border-top-color 0.25s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(-5px)';
                    el.style.boxShadow = `0 12px 32px ${active.accent}18`;
                    el.style.borderTopColor = active.accent;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'none';
                    el.style.borderTopColor = i === 0 ? active.accent : `${active.primary}20`;
                  }}
                >
                  <Stack gap="sm">
                    <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.12em' }}>{step.num}</Text>
                    <Text fw={700} size="xl" c={active.primary}>{step.label}</Text>
                    <Text size="sm" c="dimmed" lh={1.6}>{step.desc}</Text>
                  </Stack>
                </Box>
              ))}
            </SimpleGrid>

            <Link href="/scholarcrafted/consultation" style={{ textDecoration: 'none', alignSelf: 'center' }}>
              <Button
                size="lg"
                radius={0}
                className="impeccable-button"
                style={{ backgroundColor: active.accent, color: '#fff', border: 'none', fontWeight: 600 }}
              >
                Work through it with a coach
              </Button>
            </Link>
          </Stack>
        </Container>
      </Box>


      {/* Our Core Services */}
      <Box component="section" className="academic-watermark" py={{ base: rem(60), md: SECTION_SPACING }} bg={active.surface}>
        <Container size={1100} px={{ base: "md", sm: "xl" }}>
          <Stack gap="xl">

            <Box style={{ borderBottom: `1px solid ${active.primary}12`, paddingBottom: rem(32) }}>
              <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.15em' }}>
                SERVICES
              </Text>
              <Title
                order={2}
                mt="sm"
                style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", color: active.primary, lineHeight: 1.15 }}>
                Three ways we work with you.
              </Title>
            </Box>

            <Stack gap={0}>
              {[
                {
                  num: '01',
                  title: 'Manuscript Editing & Evidence Grounding',
                  label: 'MANUSCRIPT COHERENCE',
                  desc: 'APA/MLA/Chicago formatting, reference database auditing, publisher layout compliance, citation reconstruction, and AI draft rescue. Priced per word — transparent, no surprises.',
                  link: '/scholarcrafted/services/editing-proofreading',
                  cta: 'Get an Editing Quote',
                  ctaVariant: 'filled' as const,
                },
                {
                  num: '02',
                  title: 'Research Support & Publishing Advisory',
                  label: 'METHODOLOGY & PUBLISHING',
                  desc: 'Thesis-to-journal conversion, book proposals for Routledge, Oxford, and Springer, systematic literature reviews, and statistical scripting (SPSS/R/Python). Requires a strategy session first.',
                  link: '/scholarcrafted/services/research-support',
                  cta: 'Talk with Dr. Dobson',
                  ctaVariant: 'outline' as const,
                },
                {
                  num: '03',
                  title: 'Doctoral & Faculty Career Coaching',
                  label: 'FACULTY MENTORSHIP',
                  desc: '1-on-1 mentorship with Dr. Micah Dobson — AP Research Reader and active faculty. Defense preparation, career trajectory planning, and committee navigation for PhD and post-doctoral researchers.',
                  link: '/scholarcrafted/services/private-coaching',
                  cta: 'Talk with Dr. Dobson',
                  ctaVariant: 'outline' as const,
                },
              ].map((service, i) => (
                <Box
                  key={i}
                  py={{ base: rem(28), sm: rem(36), md: rem(40) }}
                  px={{ base: rem(16), sm: rem(24), md: rem(28) }}
                  style={{
                    borderBottom: `1px solid ${active.primary}10`,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: rem(24),
                    alignItems: 'center',
                    transition: 'background-color 0.25s ease, transform 0.25s ease',
                    borderRadius: rem(4),
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = 'rgba(230, 92, 56, 0.03)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = 'transparent';
                  }}
                >
                  {/* Number */}
                  <Text
                    style={{
                      fontSize: rem(13),
                      fontWeight: 700,
                      color: `${active.primary}30`,
                      letterSpacing: '0.1em',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {service.num}
                  </Text>

                  {/* Label + Title + Desc */}
                  <Stack gap="sm">
                    <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.12em' }}>
                      {service.label}
                    </Text>
                    <Title order={3} style={{ fontSize: rem(22), color: active.primary, lineHeight: 1.25 }}>
                      {service.title}
                    </Title>
                    <Text size="sm" c="dimmed" lh={1.65} style={{ maxWidth: '62ch' }}>
                      {service.desc}
                    </Text>
                  </Stack>

                  {/* CTA */}
                  <Box style={{ flexShrink: 0 }}>
                    <Link href={service.link} style={{ textDecoration: 'none' }}>
                      <Button
                        variant={service.ctaVariant}
                        color={active.primary}
                        radius={0}
                        style={{
                          borderColor: active.primary,
                          whiteSpace: 'nowrap',
                          ...(service.ctaVariant === 'filled' ? { backgroundColor: active.primary } : {}),
                        }}
                        className="impeccable-button"
                      >
                        {service.cta}
                      </Button>
                    </Link>
                  </Box>
                </Box>
              ))}
            </Stack>

          </Stack>
        </Container>
      </Box>


      {/* Testimonials Carousel */}
      <Box component="section" py={{ base: rem(60), md: rem(100) }} bg={active.background}>
        <Container size={1100} px={{ base: "md", sm: "xl" }}>
          <Carousel
            withIndicators
            emblaOptions={{ loop: true }}
            withControls={false}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            styles={{
              root: { paddingBottom: rem(60) },
              indicators: { bottom: rem(-20) }
            }}
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
                        fontSize: "clamp(1.25rem, 2.5vw, 2.1rem)",
                        fontStyle: "italic",
                        lineHeight: 1.45,
                        letterSpacing: '-0.01em',
                        color: active.primary }}
                    >
                      {item.quote}
                    </Text>
                    <Stack gap="xs" align="center">
                     <Group gap={rem(4)}>
                       {[...Array(5)].map((_, i) => (
                         <IconStarFilled key={i} size={14} color="#FFD700" style={{ opacity: 0.85 }} />
                       ))}
                     </Group>
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
                    </Stack>                  </Stack>
                </Container>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Container>
      </Box>

      {/* University Logo Marquee */}
      <Box component="section" className="dark-scholar-section" py={rem(60)} bg={active.primary}>
        
        {/* Full-width marquee outside container */}
        <Box style={{ width: '100%', overflow: 'hidden' }}>
          <div className="marquee-container">
            <div className="marquee-content">
              {universities.map((uni, idx) => (
                <img
                  key={`uni-1-${idx}`}
                  src={uni.logo}
                  alt={uni.name}
                  className="university-logo-img"
                />
              ))}
              {/* Repeat for seamless loop */}
              {universities.map((uni, idx) => (
                <img
                  key={`uni-2-${idx}`}
                  src={uni.logo}
                  alt={uni.name}
                  className="university-logo-img"
                />
              ))}
            </div>
          </div>
        </Box>
      </Box>

      {/* Specialist Team on the Painful Parts */}
      <Box component="section" py={{ base: rem(60), md: SECTION_SPACING }} bg={active.background}>
        <Container size={1100} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap="xl">
            
            {/* Header + Intro */}
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: rem(24), md: rem(60) }} style={{ alignItems: 'flex-start' }}>
              <Stack gap="sm">
                <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.18em' }}>
                  SPECIALIST OPERATIONS
                </Text>
                <Title order={2} style={{ fontSize: 'clamp(2rem, 4vw, 2.85rem)', color: active.primary, fontFamily: 'var(--font-serif)', lineHeight: 1.15 }}>
                  A specialist team, on the painful parts.
                </Title>
              </Stack>

              <Stack gap="md">
                <Text size="md" c="dimmed" lh={1.75}>
                  Editing, citations, formatting, and journal compliance eat weeks you don&apos;t have &mdash; and none of it is the part that earns your degree or advances your tenure. Our specialist team handles it meticulously by hand, never automated or outsourced, so your research stays entirely your own.
                </Text>

                <Group gap="sm" wrap="wrap">
                  <Link href="/scholarcrafted/request-review?service=editing" style={{ textDecoration: 'none' }}>
                    <Button
                      size="md"
                      radius={0}
                      className="impeccable-button"
                      style={{ backgroundColor: active.accent, color: '#fff', border: 'none', fontWeight: 600 }}
                    >
                      Get an editing quote
                    </Button>
                  </Link>
                  <Link href="/scholarcrafted/services/editing-proofreading" style={{ textDecoration: 'none' }}>
                    <Button
                      size="md"
                      variant="outline"
                      color={active.primary}
                      radius={0}
                      style={{ borderColor: `${active.primary}30` }}
                    >
                      Explore the options
                    </Button>
                  </Link>
                </Group>
              </Stack>
            </SimpleGrid>

            {/* Specialist Specialists Cards */}
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={rem(16)}>
              {[
                {
                  name: 'Dr. Elena Rostova',
                  degree: 'PhD · Oxford',
                  role: 'Lead Manuscript & Developmental Editor',
                },
                {
                  name: 'Dr. Marcus Vance',
                  degree: 'EdD · Vanderbilt',
                  role: 'Style Guides & Publisher Compliance (APA/Chicago)',
                },
                {
                  name: 'Sarah Lin',
                  degree: 'MPhil · Cambridge',
                  role: 'Reference Archiving, CrossRef & BibTeX',
                },
                {
                  name: 'Dr. Tariq Al-Mansoor',
                  degree: 'PhD · Michigan',
                  role: 'Quantitative & Logic Structure Validation',
                },
              ].map((member, i) => (
                <Box
                  key={i}
                  p={{ base: rem(20), sm: rem(24) }}
                  bg={active.surface}
                  style={{
                    borderTop: `3px solid ${i === 0 ? active.accent : `${active.primary}18`}`,
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(-4px)';
                    el.style.boxShadow = `0 10px 24px ${active.accent}14`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  <Stack gap="xs">
                    <p style={{ margin: 0, fontSize: rem(16), fontWeight: 700, color: active.primary, lineHeight: 1.2 }}>
                      {member.name}
                    </p>
                    <p style={{ margin: 0, fontSize: rem(11), fontWeight: 700, color: active.accent, letterSpacing: '0.08em' }}>
                      {member.degree}
                    </p>
                    <p style={{ margin: 0, fontSize: rem(13), color: '#666', lineHeight: 1.5, marginTop: rem(4) }}>
                      {member.role}
                    </p>
                  </Stack>
                </Box>
              ))}
            </SimpleGrid>

            {/* Testimonial Quote Card */}
            <Box
              p={{ base: rem(24), md: rem(32) }}
              style={{
                backgroundColor: active.surface,
                borderLeft: `3px solid ${active.accent}`,
              }}
            >
              <Text size="md" fs="italic" c={active.primary} lh={1.7}>
                &ldquo;Working with the ScholarCrafted specialist team was the single best decision I made for my book volume. They caught structural citation anomalies three reviewers missed, and delivered a flawless volume ahead of deadline.&rdquo;
              </Text>
              <Group gap="xs" mt="sm">
                <Text size="xs" fw={700} c={active.accent}>
                  Dr. Claire Robinson
                </Text>
                <Text size="xs" c="dimmed">
                  &bull; Associate Professor &middot; United Kingdom
                </Text>
              </Group>
            </Box>

          </Stack>
        </Container>
      </Box>

      {/* Frequently Asked Questions */}
      <Box component="section" className="academic-watermark" py={{ base: rem(60), md: SECTION_SPACING }} bg={active.surface}>
        <Container size={850} px={{ base: "md", sm: "xl" }}>
          <Stack gap="xl">
            <Box style={{ textAlign: 'center' }}>
              <Text
                size="xs"
                
                c="dimmed"
              >
                FAQ & Integrity
              </Text>
              <Title order={2} mt="xs" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", color: active.primary }}>
                Common Concerns
              </Title>
              <Text size="lg" c="dimmed" mt="md">
                We understand the complexities of high-level research operations. Here is how we safeguard your publication track.
              </Text>
            </Box>

            <Accordion>
              {homeFaqs.map((faq, i) => (
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

      <style>{`
        /* Force perfectly circular indicators in all states */
        button.carousel-indicator {
          width: 8px !important;
          height: 8px !important;
          border-radius: 50% !important;
          background-color: oklch(0% 0 0 / 0.15) !important;
          transition: width 250ms ease, background-color 250ms ease !important;
        }
        button.carousel-indicator[data-active="true"] {
          width: 8px !important;
          height: 8px !important;
          background-color: ${active.primary} !important;
        }
      `}</style>
    </Box>
  )
}
