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
import { IconFileCheck, IconBook2, IconListCheck, IconFileText, IconArrowRight, IconShieldCheck } from '@tabler/icons-react'
import { SECTION_SPACING, INNER_WIDTH } from '@/layout'

const coreServices = [
  {
    title: 'Manuscript Editing & Compliance',
    label: 'PILLAR 1 — PER WORD FLAT RATE',
    badge: '$0.044 / word',
    icon: IconFileCheck,
    desc: 'Line-by-line copyediting, style conformity, front and back matter layout, ProQuest deposit alignment, and institutional guideline compliance for Master\'s theses, doctoral dissertations, and journal manuscripts.',
    features: [
      'Line-by-line grammar, flow & scholarly syntax',
      'APA, Chicago, MLA, Harvard & Turabian compliance',
      'Front matter, back matter & TOC formatting',
      'ProQuest & institutional deposit guidelines',
    ],
    link: '/scholarcrafted/services/editing-proofreading',
    cta: 'View Editing & Rate Calculator',
  },
  {
    title: 'Citation & Reference Audits',
    label: 'PILLAR 2 — HOURLY / PER CHAPTER',
    badge: '$90 / hour',
    icon: IconListCheck,
    desc: 'Systematic cross-checking of every inline citation against its reference entry. DOI verification, Zotero and EndNote export repair, reference list reconstruction, and full style conversion when needed.',
    features: [
      'Inline citation-to-reference matching',
      'DOI verification & dead link repair',
      'Zotero / EndNote export cleanup',
      'Reference list rebuilt to required style',
    ],
    link: '/scholarcrafted/services/citation-audits',
    cta: 'Enquire About an Audit',
  },
  {
    title: 'Book & Journal Preparation',
    label: 'PILLAR 3 — FLAT PER PROJECT',
    badge: 'Custom Scope',
    icon: IconFileText,
    desc: 'Thesis-to-journal article structural conversion, publisher proposal packaging to press templates (Routledge, Oxford, SAGE, Cambridge), and journal submission formatting to exact target journal guidelines.',
    features: [
      'Thesis-to-article structural conversion',
      'Publisher proposal & prospectus packaging',
      'Journal submission formatting & word count compliance',
      'Section-by-section advisory memo (add-on)',
    ],
    link: '/scholarcrafted/services/manuscript-preparation',
    cta: 'Explore Preparation Services',
  },
  {
    title: 'Book Indexing & Page Proofs',
    label: 'PILLAR 4 — PER TYPESET PAGE',
    badge: 'From $3 / page',
    icon: IconBook2,
    desc: 'Professional back-of-book subject and author indexing to press specification. First-pass and second-pass galley proof review, typesetting error correction, and publisher copyeditor query resolution.',
    features: [
      'Subject & author index construction (Cindex spec)',
      'Galley proof review — all typesetting error types',
      'Publisher copyeditor query responses',
      'Artwork & figure preparation (add-on)',
    ],
    link: '/scholarcrafted/services/indexing-proofs',
    cta: 'Enquire About Indexing',
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
              Post-Draft Execution Services
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
              From finished draft to published work — executed with precision.
            </Title>
            <Text size="lg" mt="xl" c="dimmed" lh={1.7} style={{ fontSize: rem(20) }}>
              ScholarCrafted handles the technical production work that stands between your completed manuscript and publication. No coaching. No scope creep. Defined deliverables, transparent pricing, faculty-level execution.
            </Text>
          </Box>
        </Container>
      </Box>

      {/* 4 Service Cards Grid */}
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
                Select the service that matches where your manuscript is right now.
              </Title>
            </Box>

            <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="xl">
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

      {/* Trust Bar */}
      <Box py={rem(60)} bg={active.background} style={{ borderTop: `1px solid ${active.primary}12` }}>
        <Container size={INNER_WIDTH}>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
            <Group align="flex-start" gap="md">
              <IconShieldCheck size={28} color={active.accent} stroke={1.5} />
              <Stack gap={rem(4)}>
                <Text fw={700} size="sm">Zero Ghostwriting Guarantee</Text>
                <Text size="xs" c="dimmed">We refine, format, and structure your own manuscript. Your intellectual content is always yours.</Text>
              </Stack>
            </Group>
            <Group align="flex-start" gap="md">
              <IconFileCheck size={28} color={active.accent} stroke={1.5} />
              <Stack gap={rem(4)}>
                <Text fw={700} size="sm">Track-Changes Delivery</Text>
                <Text size="xs" c="dimmed">Every edit delivered in tracked-changes mode. You approve or reject each change. Nothing is silent.</Text>
              </Stack>
            </Group>
            <Group align="flex-start" gap="md">
              <IconBook2 size={28} color={active.accent} stroke={1.5} />
              <Stack gap={rem(4)}>
                <Text fw={700} size="sm">Certified Academic Faculty</Text>
                <Text size="xs" c="dimmed">Led by a College Board AP Research Reader. We understand what your press and committee expect.</Text>
              </Stack>
            </Group>
          </SimpleGrid>
        </Container>
      </Box>

      <Footer bg={active.surface} />
    </Box>
  )
}
