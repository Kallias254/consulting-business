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
  UnstyledButton,
} from '@mantine/core'
import { Navbar } from './_components/Navbar'
import { Footer } from './_components/Footer'
import Link from 'next/link'
import {
  IconArrowRight,
  IconUsers,
  IconEdit,
  IconFileText,
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
  IconChevronRight,
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
  { name: 'Stanford', logo: '/logos/stanford-university-logo-svgrepo-com.svg' },
  { name: 'Oxford', logo: '/logos/university-of-oxford-logo-1.svg' },
  { name: 'MIT', logo: '/logos/Massachusetts_Institute_of_Technology-Logo.wine.svg' },
  { name: 'Columbia', logo: '/logos/cu-header.svg' },
  { name: 'Duke', logo: '/logos/duke-wordmark-white.svg' },
  { name: 'Michigan', logo: '/logos/University_of_Michigan-Logo.wine.svg' },
  { name: 'Johns Hopkins', logo: '/logos/Johns_Hopkins_University-Logo.wine.svg' },
  { name: 'ANU', logo: '/logos/Australian_National_University-Logo.wine.svg' },
  { name: 'K-State', logo: '/logos/Kansas_State_University-Logo.wine.svg' },
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

// ─── Homepage Need Selector ─────────────────────────────────────────────────

const homeNeeds = [
  {
    id: 'defense-coming',
    label: 'My defense is in weeks and my manuscript needs to be clean',
    subLabel: 'Time-sensitive polish before deposit',
    serviceIds: ['editing', 'citations'],
    recommended: 'editing',
  },
  {
    id: 'committee-feedback',
    label: 'My committee sent the draft back with major revision comments',
    subLabel: 'Structural overhaul after committee review',
    serviceIds: ['editing'],
    recommended: 'editing',
  },
  {
    id: 'citations-mess',
    label: 'My citations are a mess — Zotero broke, references don\'t match',
    subLabel: 'Reference audit and reconstruction',
    serviceIds: ['citations'],
    recommended: 'citations',
  },
  {
    id: 'thesis-to-article',
    label: 'I want to turn my dissertation into a journal article',
    subLabel: 'Structural conversion and journal formatting',
    serviceIds: ['preparation'],
    recommended: 'preparation',
  },
  {
    id: 'book-proposal',
    label: 'I\'m writing a book proposal for Oxford, Routledge, or a press',
    subLabel: 'Proposal packaging to publisher template',
    serviceIds: ['preparation'],
    recommended: 'preparation',
  },
  {
    id: 'galley-proofs',
    label: 'My press sent galley proofs and I need an index built',
    subLabel: 'Back-of-book indexing and proof review',
    serviceIds: ['indexing'],
    recommended: 'indexing',
  },
]

const homeServices: Record<string, {
  badge: string; title: string; desc: string; link: string; cta: string
}> = {
  editing: {
    badge: '$0.032–$0.065 / word',
    title: 'Manuscript Editing & Compliance',
    desc: 'Line-by-line editing across three tiers. APA, Chicago, MLA, Harvard, Turabian. Every edit in tracked changes.',
    link: '/scholarcrafted/services/editing-proofreading',
    cta: 'View Editing Tiers',
  },
  citations: {
    badge: '$90 / hour',
    title: 'Citation & Reference Audits',
    desc: 'Every inline citation matched to its reference entry. DOI verification, Zotero repair, full style conversion.',
    link: '/scholarcrafted/services/citation-audits',
    cta: 'Enquire About an Audit',
  },
  preparation: {
    badge: 'Flat Project Rate',
    title: 'Book & Journal Preparation',
    desc: 'Thesis-to-article conversion, book proposal packaging for Routledge/Oxford/SAGE, journal submission formatting.',
    link: '/scholarcrafted/services/manuscript-preparation',
    cta: 'Explore Preparation Tracks',
  },
  indexing: {
    badge: 'From $3 / page',
    title: 'Book Indexing & Page Proofs',
    desc: 'Professional back-of-book indexing to press spec. First- and second-pass galley proof review.',
    link: '/scholarcrafted/services/indexing-proofs',
    cta: 'Enquire About Indexing',
  },
}

function HomepageNeedSelector({ active }: { active: Record<string, string> }) {
  const [selectedId, setSelectedId] = useState(homeNeeds[0].id)
  const selected = homeNeeds.find((n) => n.id === selectedId) ?? homeNeeds[0]

  return (
    <Box
      component="section"
      py={SECTION_SPACING}
      bg={active.surface}
      style={{ borderTop: `1px solid ${active.primary}12` }}
    >
      <Container size={INNER_WIDTH} px={{ base: 'md', sm: 'xl' }}>
        <Stack gap={rem(48)}>

          {/* Section header */}
          <Box style={{ maxWidth: 700 }}>
            <Text
              size="xs"
              fw={700}
              c={active.accent}
              style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}
            >
              Find Your Starting Point
            </Text>
            <Title
              order={2}
              mt="xs"
              style={{
                fontSize: rem(38),
                color: active.primary,
                fontFamily: 'var(--font-serif)',
                lineHeight: 1.2,
              }}
            >
              Where is your manuscript right now?
            </Title>
            <Text size="md" mt="md" c="dimmed" lh={1.7}>
              Select the situation that matches yours. We&apos;ll show you exactly what to do next.
            </Text>
          </Box>

          {/* Two-column selector */}
          <Box
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: rem(2),
              alignItems: 'start',
            }}
            className="home-need-grid"
          >
            {/* Left: Need options */}
            <Box style={{ border: `1px solid ${active.primary}14`, backgroundColor: active.background }}>
              {homeNeeds.map((need, i) => {
                const isActive = need.id === selectedId
                return (
                  <UnstyledButton
                    key={need.id}
                    onClick={() => setSelectedId(need.id)}
                    style={{ width: '100%', display: 'block' }}
                  >
                    <Box
                      px={rem(28)}
                      py={rem(22)}
                      style={{
                        borderBottom: i < homeNeeds.length - 1 ? `1px solid ${active.primary}10` : undefined,
                        borderLeft: isActive ? `3px solid ${active.accent}` : `3px solid transparent`,
                        backgroundColor: isActive ? active.surface : 'transparent',
                        transition: 'background-color 0.15s ease, border-color 0.15s ease',
                        cursor: 'pointer',
                      }}
                    >
                      <Group justify="space-between" align="center" wrap="nowrap" gap="md">
                        <Stack gap={rem(4)}>
                          <Text
                            fw={isActive ? 700 : 500}
                            size="sm"
                            lh={1.4}
                            style={{ color: isActive ? active.primary : `${active.primary}cc` }}
                          >
                            {need.label}
                          </Text>
                          <Text size="xs" c="dimmed" lh={1.4}>{need.subLabel}</Text>
                        </Stack>
                        <IconChevronRight
                          size={16}
                          color={isActive ? active.accent : `${active.primary}40`}
                          style={{ flexShrink: 0, transition: 'color 0.15s ease' }}
                        />
                      </Group>
                    </Box>
                  </UnstyledButton>
                )
              })}
            </Box>

            {/* Right: Recommended service cards */}
            <Box>
              <Stack gap={rem(12)}>
                {selected.serviceIds.map((sid) => {
                  const svc = homeServices[sid]
                  if (!svc) return null
                  const isRecommended = sid === selected.recommended
                  return (
                    <Box
                      key={sid}
                      p={rem(28)}
                      bg={active.background}
                      style={{ border: `1px solid ${isRecommended ? active.accent : `${active.primary}18`}` }}
                    >
                      <Stack gap="md">
                        {isRecommended && (
                          <Box
                            px={rem(10)}
                            py={rem(4)}
                            style={{
                              backgroundColor: active.accent,
                              display: 'inline-flex',
                              alignSelf: 'flex-start',
                            }}
                          >
                            <Text size="xs" fw={700} c={active.background} style={{ letterSpacing: '0.1em' }}>
                              RECOMMENDED
                            </Text>
                          </Box>
                        )}
                        <Group justify="space-between" align="flex-start">
                          <Title
                            order={3}
                            style={{ fontSize: rem(19), fontFamily: 'var(--font-serif)', flex: 1 }}
                          >
                            {svc.title}
                          </Title>
                          <Text
                            size="xs"
                            fw={700}
                            c={active.accent}
                            style={{
                              border: `1px solid ${active.accent}`,
                              padding: `${rem(3)} ${rem(8)}`,
                              whiteSpace: 'nowrap',
                              flexShrink: 0,
                              marginLeft: rem(12),
                            }}
                          >
                            {svc.badge}
                          </Text>
                        </Group>
                        <Text size="sm" c="dimmed" lh={1.65}>{svc.desc}</Text>
                        <Link href={svc.link} style={{ textDecoration: 'none' }}>
                          <Text size="sm" fw={700} c={active.accent} style={{ letterSpacing: '0.04em' }}>
                            {svc.cta} →
                          </Text>
                        </Link>
                      </Stack>
                    </Box>
                  )
                })}

                {/* Bottom CTA */}
                <Box p={rem(24)} bg={active.background} style={{ border: `1px solid ${active.primary}14` }}>
                  <Group justify="space-between" align="center" wrap="nowrap">
                    <Text size="sm" c="dimmed" lh={1.5} style={{ flex: 1 }}>
                      Not sure? Submit your manuscript for a free scope assessment — we respond in 24 hours.
                    </Text>
                    <Link href="/scholarcrafted/request-review" style={{ textDecoration: 'none', flexShrink: 0, marginLeft: rem(16) }}>
                      <Button
                        variant="filled"
                        radius={0}
                        size="sm"
                        style={{ backgroundColor: active.primary, color: active.background }}
                        rightSection={<IconArrowRight size={14} />}
                      >
                        Get Free Assessment
                      </Button>
                    </Link>
                  </Group>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Container>

      {/* Mobile: stack columns */}
      <style>{`
        @media (max-width: 768px) {
          .home-need-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </Box>
  )
}

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
            /* Carousel indicators handled by bottom <style> block */

            .home-accordion-item[data-active] {
              border-color: ${active.primary} !important;
            }

            .home-accordion-control:hover {
              background-color: transparent !important;
            }

            /* Hero overlays: mobile = flat dark, desktop = directional */
            .hero-overlay-mobile { display: block; }
            .hero-overlay-desktop { display: none; }

            /* Hero buttons: full-width on small mobile */
            .hero-btn-group { width: 100%; }
            .hero-btn-link { display: block; width: 100%; }
            .hero-btn-link > button { width: 100% !important; }

            /* Back-to-top: smaller on mobile */
            .back-to-top-btn {
              bottom: 20px !important;
              right: 20px !important;
              width: 42px !important;
              height: 42px !important;
            }

            @media (min-width: 640px) {
              /* Desktop: directional gradient */
              .hero-overlay-mobile { display: none; }
              .hero-overlay-desktop { display: block; }

              /* Buttons sit side by side */
              .hero-btn-link { display: inline-block; width: auto; }
              .hero-btn-link > button { width: auto !important; }

              .back-to-top-btn {
                bottom: 40px !important;
                right: 40px !important;
                width: 50px !important;
                height: 50px !important;
              }
            }

            /* Services grid on mobile: stack label/title/desc and CTA vertically */
            @media (max-width: 600px) {
              .service-row-grid {
                grid-template-columns: 1fr !important;
              }
              .service-row-num { display: none; }
            }
          `,
        }}
      />

      {/* Hero Section — responsive left-anchored editorial layout */}
      <Box
        component="section"
        style={{
          position: 'relative',
          minHeight: 'clamp(480px, 88vh, 840px)',
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
        {/* Directional gradient: solid dark behind text on desktop; full dark on mobile */}
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(10,10,10,0.88)',
            zIndex: 1,
          }}
          className="hero-overlay-mobile"
        />
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.92) 45%, rgba(10,10,10,0.70) 75%, rgba(10,10,10,0.30) 100%)',
            zIndex: 2,
          }}
          className="hero-overlay-desktop"
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
        <Box style={{ position: 'relative', zIndex: 3, width: '100%', paddingTop: 'clamp(88px, 14vw, 140px)', paddingBottom: 'clamp(48px, 8vw, 100px)' }}>
          <Container size={1200} px={{ base: 'md', sm: 'xl' }}>
            <Box style={{ maxWidth: rem(640) }}>
              <Stack gap="xl" align="flex-start">

                <p style={{ margin: 0, fontSize: rem(11), fontWeight: 700, letterSpacing: '0.22em', color: active.accent, textTransform: 'uppercase' }}>
                  Post-Draft Execution
                </p>

                <Title
                  order={1}
                  style={{
                    fontSize: 'clamp(2rem, 5.2vw, 3.8rem)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: '#ffffff',
                    fontFamily: 'var(--font-serif)',
                  }}
                >
                  Your Manuscript<br />Doesn&apos;t End at Done.
                </Title>

                <p style={{ margin: 0, fontSize: 'clamp(0.95rem, 1.8vw, 1.125rem)', lineHeight: 1.7, color: 'rgba(255,255,255,0.80)', maxWidth: '48ch' }}>
                  Faculty-led post-draft execution. Formatting, indexing, citation audits, and publisher preparation — handled precisely so your work reaches publication on schedule.
                </p>

                {/* Buttons — side-by-side, wrap cleanly on smallest mobile */}
                <Group gap={rem(12)} wrap="wrap" className="hero-btn-group">
                  <Link href="/scholarcrafted/request-review" style={{ textDecoration: 'none' }} className="hero-btn-link">
                    <Button
                      size="lg"
                      radius={0}
                      fullWidth
                      style={{
                        backgroundColor: active.accent,
                        color: '#fff',
                        height: rem(52),
                        paddingLeft: rem(24),
                        paddingRight: rem(24),
                        border: 'none',
                        fontWeight: 600,
                        fontSize: rem(15),
                      }}
                    >
                      Get It Off Your Plate
                    </Button>
                  </Link>
                  <Link href="/scholarcrafted/consultation" style={{ textDecoration: 'none' }} className="hero-btn-link">
                    <Button
                      size="lg"
                      radius={0}
                      fullWidth
                      style={{
                        borderColor: 'rgba(255,255,255,0.4)',
                        borderWidth: 1,
                        borderStyle: 'solid',
                        color: '#ffffff',
                        background: 'rgba(255,255,255,0.06)',
                        height: rem(52),
                        paddingLeft: rem(24),
                        paddingRight: rem(24),
                        fontSize: rem(15),
                      }}
                    >
                      Book a Project Review
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




      {/* ── Floating 3-Panel Card (Editage-style "How it works" strip) ── */}
      <Box
        id="getting-started"
        component="section"
        bg={active.background}
        style={{ position: 'relative', zIndex: 10 }}
      >
        <Container size={INNER_WIDTH} px={{ base: 'md', sm: 'xl' }}>
          {/* Pulled up to overlap the hero bottom edge */}
          <Box
            style={{
              marginTop: rem(-48),
              backgroundColor: active.background,
              border: `1px solid ${active.primary}16`,
              boxShadow: `0 8px 40px rgba(0,0,0,0.18)`,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
            }}
            className="floating-panel-grid"
          >
            {[
              {
                num: '01',
                label: 'Submit Your Manuscript',
                desc: 'Upload your document and describe the deadline, style guide, and scope. No call required to start.',
                link: '/scholarcrafted/request-review',
                cta: 'Submit Now →',
              },
              {
                num: '02',
                label: 'Receive Your Scope Assessment',
                desc: 'Within 24 hours we send a clear service recommendation and a firm price. No vague estimates.',
                link: '/scholarcrafted/services',
                cta: 'See Services →',
              },
              {
                num: '03',
                label: 'We Execute',
                desc: 'Editing, auditing, or formatting begins. Delivery in tracked changes. You review and approve every edit.',
                link: '/scholarcrafted/how-it-works',
                cta: 'How It Works →',
              },
            ].map((step, i) => (
              <Box
                key={i}
                px={rem(32)}
                py={rem(36)}
                style={{
                  borderLeft: i > 0 ? `1px solid ${active.primary}12` : undefined,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: rem(12),
                }}
              >
                <Text
                  size="xs"
                  fw={700}
                  c={active.accent}
                  style={{ letterSpacing: '0.15em' }}
                >
                  {step.num}
                </Text>
                <Text
                  fw={700}
                  size="md"
                  c={active.primary}
                  lh={1.35}
                  style={{ fontFamily: 'var(--font-serif)', fontSize: rem(18) }}
                >
                  {step.label}
                </Text>
                <Text size="sm" c="dimmed" lh={1.65} style={{ flex: 1 }}>
                  {step.desc}
                </Text>
                <Link href={step.link} style={{ textDecoration: 'none' }}>
                  <Text
                    size="sm"
                    fw={700}
                    c={active.accent}
                    style={{ letterSpacing: '0.04em' }}
                  >
                    {step.cta}
                  </Text>
                </Link>
              </Box>
            ))}
          </Box>
        </Container>

        {/* Responsive override */}
        <style>{`
          @media (max-width: 768px) {
            .floating-panel-grid {
              grid-template-columns: 1fr !important;
              margin-top: 0 !important;
            }
            .floating-panel-grid > div {
              border-left: none !important;
              border-top: 1px solid rgba(0,0,0,0.07);
            }
            .floating-panel-grid > div:first-child {
              border-top: none;
            }
          }
        `}</style>
      </Box>

      {/* ── SELECT YOUR NEED — Vertical Tabs ────────────────────────── */}
      <HomepageNeedSelector active={active} />


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
                Four execution services. One clear pipeline.
              </Title>
            </Box>

            <Stack gap={0}>
              {[
                {
                  num: '01',
                  title: 'Manuscript Editing & Compliance',
                  label: 'MANUSCRIPT EDITING & COMPLIANCE',
                  desc: 'Line-by-line copyediting, style conformity (APA, Chicago, MLA, Harvard), front and back matter formatting, ProQuest deposit compliance, and institutional guideline alignment. Priced per word — transparent, no surprises.',
                  link: '/scholarcrafted/services/editing-proofreading',
                  cta: 'Get an Editing Quote',
                  ctaVariant: 'filled' as const,
                },
                {
                  num: '02',
                  title: 'Citation & Reference Audits',
                  label: 'CITATION & REFERENCE AUDITS',
                  desc: 'Every inline citation cross-checked against its reference entry. DOI verification, dead link repair, Zotero and EndNote export cleanup, full reference list reformatting, and citation style conversion.',
                  link: '/scholarcrafted/services/citation-audits',
                  cta: 'Get a Reference Audit',
                  ctaVariant: 'outline' as const,
                },
                {
                  num: '03',
                  title: 'Book & Journal Preparation',
                  label: 'BOOK & JOURNAL PREPARATION',
                  desc: 'Thesis-to-journal article conversion, publisher proposal packaging for major academic presses (Routledge, Oxford, SAGE, Cambridge), and journal submission formatting to exact target journal guidelines.',
                  link: '/scholarcrafted/services/manuscript-preparation',
                  cta: 'Explore Preparation',
                  ctaVariant: 'outline' as const,
                },
                {
                  num: '04',
                  title: 'Book Indexing & Page Proofs',
                  label: 'BOOK INDEXING & PAGE PROOFS',
                  desc: 'Professional back-of-book subject and author indexing. Galley proof review — typesetting errors, broken tables, figure placement, copyeditor queries. Artwork and figure preparation available as an add-on.',
                  link: '/scholarcrafted/services/indexing-proofs',
                  cta: 'Enquire About Indexing',
                  ctaVariant: 'outline' as const,
                },
              ].map((service, i) => (
                <Box
                  key={i}
                  py={{ base: rem(28), sm: rem(36), md: rem(40) }}
                  px={{ base: rem(16), sm: rem(24), md: rem(28) }}
                  className="service-row-grid"
                  style={{
                    borderBottom: `1px solid ${active.primary}10`,
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr auto',
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
                    className="service-row-num"
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
                        fontSize: 'clamp(60px, 12vw, 100px)',
                        lineHeight: 0,
                        opacity: 0.1,
                        marginBottom: 'clamp(-24px, -4vw, -40px)',
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
      <Box component="section" className="dark-scholar-section" py={rem(48)} bg={active.primary}>
        
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
        className="back-to-top-btn"
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
        /* Carousel dot indicators — always circular, no oval stretching */
        button.carousel-indicator {
          width: 7px !important;
          height: 7px !important;
          border-radius: 50% !important;
          background-color: rgba(0,0,0,0.15) !important;
          transform: none !important;
          transition: background-color 300ms ease, width 300ms ease, height 300ms ease !important;
        }
        button.carousel-indicator[data-active="true"] {
          width: 10px !important;
          height: 10px !important;
          background-color: ${active.accent} !important;
        }
      `}</style>
    </Box>
  )
}
