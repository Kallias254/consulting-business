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
  rem,
  Badge,
  Group,
  useMantineTheme,
} from '@mantine/core'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'
import Link from 'next/link'
import { IconFileCheck, IconBook2, IconCompass, IconArrowRight, IconShieldCheck } from '@tabler/icons-react'
import { SECTION_SPACING, INNER_WIDTH } from '@/layout'

const coreServices = [
  {
    title: 'Manuscript Editing & Production Support',
    label: 'PILLAR 1: NO-CALL ASYNCHRONOUS REFINEMENT',
    badge: '$0.044 / word',
    icon: IconFileCheck,
    desc: 'Exhaustive copyediting, APA/Chicago/ProQuest styling, and passage-grounded reference verification for Master’s theses, doctoral dissertations, and journal manuscripts. Includes specialized Evidence Reconstruction for client-brought exploratory AI drafts.',
    features: [
      'Line-by-line grammar, flow, and scholarly syntax',
      'Passage-grounded citation and DOI audit',
      'ProQuest & university guideline alignment',
      'Exploratory AI draft de-fusing & grounding',
    ],
    link: '/scholarcrafted/services/editing-proofreading',
    cta: 'View Editing & Rate Calculator',
  },
  {
    title: 'Research Support & Publishing Advisory',
    label: 'PILLAR 2: STRATEGIC PUBLICATION CONSULTING',
    badge: 'Milestone / Retainer',
    icon: IconBook2,
    desc: 'Transforming completed Master’s theses and doctoral dissertations into peer-reviewed journal articles, developing press-ready academic book proposals (Routledge, Oxford), and structuring complex literature reviews.',
    features: [
      'Thesis-to-journal article conversion sprints',
      'Academic press proposal development & publisher pitches',
      'Systematic literature review synthesis',
      'Methodological design & qualitative/quantitative audit',
    ],
    link: '/scholarcrafted/services/research-support',
    cta: 'Explore Publishing & Research',
  },
  {
    title: 'Doctoral & Academic Career Coaching',
    label: 'PILLAR 3: 1-ON-1 FACULTY MENTORSHIP',
    badge: 'Strategy Sessions',
    icon: IconCompass,
    desc: 'Direct advisory partnership led by Dr. Micah Dobson (Certified College Board AP Research Reader). Strategic guidance for overcoming committee gridlock, stalled writing milestones, defense preparation, and early-career tenure navigation.',
    features: [
      'Defense preparation & committee feedback triage',
      'Chapter-by-chapter accountability sprints',
      'Tenure-track publication pipeline planning',
      'Senior faculty-to-peer advisory sounding board',
    ],
    link: '/scholarcrafted/services/private-coaching',
    cta: 'Explore Coaching Packages',
  },
]

export default function ServicesPage() {
  const theme = useMantineTheme()
  const active = theme.other

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* Hero Section */}
      <Box component="section" pt={rem(140)} pb={rem(80)} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <Box style={{ maxWidth: 840 }}>
            <Text
              size="xs"
              fw={700}
              c={active.accent}
              style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}
            >
              Our Three Service Pillars
            </Text>
            <Title
              order={1}
              mt="md"
              style={{
                fontSize: rem(56),
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: active.primary,
                fontFamily: 'var(--font-serif)',
              }}
            >
              Faculty-level consulting, editorial polish, and scholarly publication.
            </Title>
            <Text size="lg" mt="xl" c="dimmed" lh={1.7} style={{ fontSize: rem(20) }}>
              Whether you need rapid line-by-line dissertation compliance without a meeting, strategic guidance to convert your thesis into tier-1 journal articles, or 1-on-1 defense coaching from a certified evaluator of research design.
            </Text>
          </Box>
        </Container>
      </Box>

      {/* 3 Pillars Grid */}
      <Box
        component="section"
        className="academic-watermark"
        py={SECTION_SPACING}
        bg={active.surface}
        style={{ borderTop: `1px solid ${active.primary}12` }}
      >
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(60)}>
            <Box style={{ maxWidth: 800 }}>
              <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Structured Academic Solutions
              </Text>
              <Title order={2} mt="xs" style={{ fontSize: rem(40), color: active.primary, fontFamily: 'var(--font-serif)' }}>
                Select the engagement model built for your current milestone.
              </Title>
            </Box>

            <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="xl">
              {coreServices.map((service, i) => {
                const Icon = service.icon
                return (
                  <Box
                    key={i}
                    p={rem(36)}
                    bg={active.background}
                    style={{
                      border: `1px solid ${active.primary}18`,
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                    }}
                  >
                    <Stack gap="lg" flex={1}>
                      <Group justify="space-between" align="center">
                        <Box
                          p={rem(10)}
                          style={{
                            border: `1px solid ${active.primary}20`,
                            backgroundColor: `${active.surface}`,
                          }}
                        >
                          <Icon size={24} color={active.primary} stroke={1.5} />
                        </Box>
                        <Badge variant="outline" color="dark" radius={0} size="sm">
                          {service.badge}
                        </Badge>
                      </Group>

                      <Stack gap={rem(6)}>
                        <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.08em' }}>
                          {service.label}
                        </Text>
                        <Title order={3} style={{ fontSize: rem(22), fontFamily: 'var(--font-serif)' }}>
                          {service.title}
                        </Title>
                      </Stack>

                      <Text size="sm" c="dimmed" lh={1.6}>
                        {service.desc}
                      </Text>

                      <Stack gap="xs" mt="sm">
                        {service.features.map((feat, idx) => (
                          <Group key={idx} gap="xs" align="flex-start" wrap="nowrap">
                            <Text size="xs" c={active.accent} fw={700} mt={rem(1)}>
                              —
                            </Text>
                            <Text size="xs" c="dimmed" lh={1.5}>
                              {feat}
                            </Text>
                          </Group>
                        ))}
                      </Stack>

                      <Box mt="auto" pt="xl">
                        <Link href={service.link} style={{ textDecoration: 'none' }}>
                          <Button
                            variant="outline"
                            color={active.primary}
                            fullWidth
                            radius={0}
                            style={{ borderColor: active.primary }}
                            rightSection={<IconArrowRight size={16} />}
                          >
                            {service.cta}
                          </Button>
                        </Link>
                      </Box>
                    </Stack>
                  </Box>
                )
              })}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* Trust & Moat Banner */}
      <Box py={rem(60)} bg={active.background} style={{ borderTop: `1px solid ${active.primary}12` }}>
        <Container size={INNER_WIDTH}>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
            <Group align="flex-start" gap="md">
              <IconShieldCheck size={28} color={active.accent} stroke={1.5} />
              <Stack gap={rem(4)}>
                <Text fw={700} size="sm">Passage-Grounded Verification</Text>
                <Text size="xs" c="dimmed">Unlike standard proofreading, our research harness audits inline citations directly against primary literature and DOIs.</Text>
              </Stack>
            </Group>
            <Group align="flex-start" gap="md">
              <IconCompass size={28} color={active.accent} stroke={1.5} />
              <Stack gap={rem(4)}>
                <Text fw={700} size="sm">Certified Research Evaluator</Text>
                <Text size="xs" c="dimmed">Led by Dr. Micah Dobson, College Board AP Research Reader evaluating high-stakes academic research design.</Text>
              </Stack>
            </Group>
            <Group align="flex-start" gap="md">
              <IconBook2 size={28} color={active.accent} stroke={1.5} />
              <Stack gap={rem(4)}>
                <Text fw={700} size="sm">Zero Ghostwriting Guarantee</Text>
                <Text size="xs" c="dimmed">We honor university ethics and publisher guidelines. We refine and reconstruct your voice without compromising your authorship.</Text>
              </Stack>
            </Group>
          </SimpleGrid>
        </Container>
      </Box>

      <Footer bg={active.surface} />
    </Box>
  )
}
