'use client'

import React from 'react'
import {
  Container,
  Title,
  Text,
  Box,
  SimpleGrid,
  Stack,
  Divider,
  rem,
  Group,
  Button,
  useMantineTheme,
  Avatar,
  Center,
} from '@mantine/core'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'
import { EditorialCard, EditorialReveal, ReadingProgressBar } from '../_components/EditorialPrimitives'
import Link from 'next/link'
import { IconCheck, IconX, IconArrowRight, IconShieldCheck } from '@tabler/icons-react'
import { SECTION_SPACING, INNER_WIDTH, READING_WIDTH } from '@/layout'

const leadership = [
  {
    initials: 'MD',
    name: 'Dr. Micah J. Dobson, Ph.D.',
    role: 'Principal Academic Advisor & Faculty Lead',
    affiliations: 'Assistant Professor, Johnson C. Smith University · Lecturer, NC State University',
    image: '/images/drmicah.png',
    bio: 'Published Routledge textbook author, co-editor of The Routledge Handbook of Hip Hop and Sport, Culture, and Activism, Cognella textbook author, and UNCF Henry C. McBay Faculty Research Fellow. Dr. Dobson sets the scholarly standards, publisher acquisition alignment, and peer-review expectations across every engagement.',
  },
  {
    initials: 'JM',
    name: 'Joseph Miseda',
    role: 'Managing Partner, Editorial & Technical Operations',
    affiliations: 'Production Architecture · Multi-Contributor Volumes · LaTeX & Publisher Compliance',
    image: '/images/joseph-miseda.jpg',
    bio: 'Directs manuscript production pipelines from rough concept and raw drafts to contract-ready proposals and press-compliant volumes. Specializes in multi-author handbook coordination, structural narrative architecture, citation forensics, and back-of-book indexing.',
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

const standards = [
  'Aligned with COPE (Committee on Publication Ethics) guidelines',
  'Press-ready architecture for Routledge, Cognella, Oxford & Cambridge',
  'Full multi-contributor handbook coordination (15–25+ authors)',
  'Professional Cindex & SKY Index back-of-book indexing',
  'Strict institutional NDA protection for unpublished research',
  'Itemized invoicing compatible with faculty startup & grant budgets',
]

export default function AboutPage() {
  const theme = useMantineTheme()
  const active = theme.other

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <ReadingProgressBar />
      <Navbar />

      {/* Hero: Philosophy */}
      <Box component="section" pt={{ base: rem(100), md: rem(132) }} pb={{ base: rem(56), md: rem(80) }} bg={active.background}>
        <Container size={INNER_WIDTH} px={{ base: 'md', sm: 'xl' }}>
          <Box style={{ maxWidth: 820 }}>
            <Text
              size="xs"
              fw={700}
              style={{ letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}
              c={active.accent}
            >
              ABOUT SCHOLARCRAFTED
            </Text>
            <Title
              order={1}
              mt="sm"
              style={{
                fontSize: 'clamp(2.2rem, 4.8vw, 3.6rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: active.primary,
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
              }}
            >
              Faculty-directed scholarly production. Built for the finish line.
            </Title>
            <Text size="lg" mt="xl" c="dimmed" lh={1.75} style={{ maxWidth: '62ch' }}>
              Algorithms can tidy a sentence, but they cannot structure a university press prospectus, herd twenty handbook contributors to a deadline, or navigate a hostile peer-review memo. ScholarCrafted exists to take high-stakes academic work from rough draft to signed contract and published volume.
            </Text>
          </Box>
        </Container>
      </Box>

      {/* Leadership */}
      <Box
        component="section"
        py={SECTION_SPACING}
        bg={active.surface}
        style={{ borderTop: `1px solid ${active.primary}10` }}
      >
        <Container size={INNER_WIDTH} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap={rem(40)}>
            <Box style={{ maxWidth: 700 }}>
              <Text
                size="xs"
                fw={700}
                c={active.accent}
                style={{ letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}
              >
                LEADERSHIP &amp; STANDARDS
              </Text>
              <Title order={2} mt="xs" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)', color: active.primary, fontWeight: 600 }}>
                Led by published faculty and dedicated production operators.
              </Title>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(24)}>
              {leadership.map((leader, idx) => (
                <EditorialReveal key={leader.name} delay={idx * 80}>
                  <EditorialCard
                    p={{ base: rem(28), md: rem(36) }}
                    bg={active.background}
                    style={{ height: '100%' }}
                  >
                    <Stack gap="lg" style={{ height: '100%' }}>
                      <Group gap="lg" align="center" wrap="nowrap">
                        <Avatar
                          src={leader.image}
                          alt={leader.name}
                          size={76}
                          radius={0}
                          style={{
                            border: `1px solid ${active.primary}18`,
                            backgroundColor: active.surface,
                            color: active.primary,
                            fontFamily: 'var(--font-serif)',
                            fontWeight: 700,
                            fontSize: rem(20),
                            flexShrink: 0,
                          }}
                        >
                          {leader.initials}
                        </Avatar>
                        <Box>
                          <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontSize: rem(21), fontWeight: 600, color: active.primary }}>
                            {leader.name}
                          </Title>
                          <Text size="xs" fw={700} c={active.accent} mt={rem(2)} style={{ letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                            {leader.role}
                          </Text>
                          <Text size="xs" c="dimmed" mt={rem(4)}>
                            {leader.affiliations}
                          </Text>
                        </Box>
                      </Group>

                      <Divider color={`${active.primary}10`} />

                      <Text size="sm" c="dimmed" lh={1.75}>
                        {leader.bio}
                      </Text>
                    </Stack>
                  </EditorialCard>
                </EditorialReveal>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* The Production Journey */}
      <Box component="section" py={SECTION_SPACING} bg={active.background} style={{ borderTop: `1px solid ${active.primary}10` }}>
        <Container size={INNER_WIDTH} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap={rem(48)}>
            <Box style={{ maxWidth: 700 }}>
              <Text
                size="xs"
                fw={700}
                c={active.accent}
                style={{ letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}
              >
                HOW WE WORK
              </Text>
              <Title
                order={2}
                mt="xs"
                style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)', color: active.primary, fontFamily: 'var(--font-serif)', fontWeight: 600 }}
              >
                A clear, milestone-driven process from brief to press.
              </Title>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(24)}>
              {[
                {
                  num: '01',
                  title: 'Diagnostic & Scoping (24h)',
                  desc: 'We review your draft, target press or journal guidelines, and timeline—then return an itemized milestone roadmap within 24 hours.',
                },
                {
                  num: '02',
                  title: 'Architecture & Production',
                  desc: 'Whether extracting a journal argument, building a press prospectus, or coordinating 20 handbook authors, every deliverable moves on a fixed schedule.',
                },
                {
                  num: '03',
                  title: 'Compliance & Revision Coverage',
                  desc: 'Files arrive press-ready with an Editorial Compliance Certificate—backed by 365 days of secondary passes for reviewer or committee memos.',
                },
              ].map((step, i) => (
                <EditorialReveal key={step.num} delay={i * 70}>
                  <EditorialCard p={{ base: rem(28), md: rem(32) }} bg={active.surface} style={{ height: '100%' }}>
                    <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.14em' }}>
                      {step.num}
                    </Text>
                    <Title order={3} mt={rem(8)} mb={rem(10)} style={{ fontFamily: 'var(--font-serif)', fontSize: rem(20), color: active.primary, fontWeight: 600 }}>
                      {step.title}
                    </Title>
                    <Text size="sm" c="dimmed" lh={1.7}>
                      {step.desc}
                    </Text>
                  </EditorialCard>
                </EditorialReveal>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* What we do / don't do */}
      <Box
        component="section"
        py={SECTION_SPACING}
        bg={active.surface}
        style={{ borderTop: `1px solid ${active.primary}10`, borderBottom: `1px solid ${active.primary}10` }}
      >
        <Container size={INNER_WIDTH} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap={rem(40)}>
            <Box style={{ maxWidth: 700 }}>
              <Text
                size="xs"
                fw={700}
                c={active.accent}
                style={{ letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}
              >
                PUBLICATION ETHICS
              </Text>
              <Title order={2} mt="xs" style={{ color: active.primary, fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)', fontWeight: 600 }}>
                Ethical boundaries that protect your career and reputation.
              </Title>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(24)}>
              <EditorialReveal delay={0}>
                <EditorialCard p={{ base: rem(28), md: rem(36) }} bg={active.background} style={{ height: '100%' }}>
                  <Group gap="sm" mb="md">
                    <IconCheck size={20} color={active.accent} stroke={2.5} />
                    <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: rem(21), color: active.primary }}>
                      What we do
                    </Title>
                  </Group>
                  <Text size="sm" c="dimmed" lh={1.75}>
                    We provide developmental manuscript architecture, university press proposal structuring, multi-contributor handbook coordination, R&amp;R response matrices, citation forensics, and press-compliant formatting—always transparent and aligned with university and publisher guidelines.
                  </Text>
                </EditorialCard>
              </EditorialReveal>

              <EditorialReveal delay={80}>
                <EditorialCard p={{ base: rem(28), md: rem(36) }} bg={active.background} style={{ height: '100%' }}>
                  <Group gap="sm" mb="md">
                    <IconX size={20} color={active.primary} stroke={2.5} />
                    <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: rem(21), color: active.primary }}>
                      What we never do
                    </Title>
                  </Group>
                  <Text size="sm" c="dimmed" lh={1.75}>
                    We never ghostwrite original research, fabricate data, invent citations, or compromise authorship integrity. We operate strictly within COPE (Committee on Publication Ethics) standards so your scholarship remains 100% yours and defensible before any committee or press.
                  </Text>
                </EditorialCard>
              </EditorialReveal>
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* Institutional & Publisher Standards */}
      <Box component="section" py={SECTION_SPACING} bg={active.background}>
        <Container size={READING_WIDTH} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap="xl">
            <Box style={{ textAlign: 'center' }}>
              <Text
                size="xs"
                fw={700}
                c={active.accent}
                style={{ letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}
              >
                INSTITUTIONAL READINESS
              </Text>
              <Title
                order={2}
                mt="xs"
                style={{
                  fontSize: 'clamp(1.75rem, 3.2vw, 2.3rem)',
                  color: active.primary,
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 600,
                }}
              >
                Built for university presses, grants, and tenure clocks.
              </Title>
            </Box>

            <EditorialCard p={{ base: rem(28), md: rem(40) }} bg={active.surface} interactive={false}>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                {standards.map((item, i) => (
                  <Group key={i} gap="sm" wrap="nowrap" align="flex-start">
                    <IconShieldCheck size={16} color={active.accent} style={{ flexShrink: 0, marginTop: rem(3) }} />
                    <Text size="sm" c={active.primary} lh={1.55}>
                      {item}
                    </Text>
                  </Group>
                ))}
              </SimpleGrid>
            </EditorialCard>

            <Center mt="sm">
              <Group gap="md" wrap="wrap">
                <Link href="/order" style={{ textDecoration: 'none' }}>
                  <Button
                    size="md"
                    radius={0}
                    rightSection={<IconArrowRight size={16} />}
                    style={{ backgroundColor: active.accent, color: '#ffffff', fontWeight: 700, height: rem(48), paddingLeft: rem(28), paddingRight: rem(28) }}
                  >
                    Start a Project
                  </Button>
                </Link>
                <a
                  href="https://calendly.com/misedajoseph-30-minutes-call/discovery-session"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    size="md"
                    variant="outline"
                    color={active.primary}
                    radius={0}
                    style={{ borderColor: `${active.primary}35`, color: active.primary, fontWeight: 600, height: rem(48) }}
                  >
                    Book a Scoping Call
                  </Button>
                </a>
              </Group>
            </Center>
          </Stack>
        </Container>
      </Box>

      {/* University Logo Marquee */}
      <Box component="section" className="dark-scholar-section" py={rem(88)} bg={active.primary}>
        <Container size={1200}>
          <Stack gap="xl" align="center" mb="xl">
            <Box style={{ textAlign: 'center' }}>
              <Title order={3} style={{ fontSize: rem(26), color: active.background, fontFamily: 'var(--font-serif)' }}>
                Trusted by Scholars &amp; Faculty Across Leading Institutions
              </Title>
            </Box>
          </Stack>
        </Container>

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

      <Footer />
    </Box>
  )
}
