'use client'

import React, { useState } from 'react'
import {
  Container,
  Title,
  Text,
  Box,
  SimpleGrid,
  Stack,
  Button,
  rem,
  Group,
  useMantineTheme,
  Accordion,
  ThemeIcon,
  Badge,
  Card,
  Modal,
  TextInput,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Navbar } from '../../_components/Navbar'
import { Footer } from '../../_components/Footer'
import Link from 'next/link'
import {
  IconCheck,
  IconArrowRight,
  IconDownload,
  IconClock,
  IconScale,
  IconShieldCheck,
  IconListCheck,
} from '@tabler/icons-react'
import { SECTION_SPACING, INNER_WIDTH, READING_WIDTH } from '@/layout'

const auditItems = [
  {
    title: 'Inline Citation Matching',
    desc: 'Every (Author, Year) or footnote in the body text matched to its reference list entry. Missing or mismatched entries flagged with annotation.',
  },
  {
    title: 'DOI Verification',
    desc: 'Every DOI clicked and confirmed live. Dead, incorrect, or missing DOIs replaced where possible and flagged for author action where not.',
  },
  {
    title: 'Reference List Formatting',
    desc: 'Every entry formatted precisely per the required style — APA 7th, Chicago 17th, MLA 9th, Harvard, or Turabian. Author names, italics, punctuation, publisher details all corrected.',
  },
  {
    title: 'Zotero & EndNote Cleanup',
    desc: 'Citation manager exports frequently produce corrupt or inconsistent entries. We repair the output before formatting begins so the result is clean.',
  },
  {
    title: 'Citation Style Conversion',
    desc: 'Manuscript uses footnotes but the journal wants author-date? We convert the entire document — inline citations, notes, and reference list — cleanly and completely.',
  },
  {
    title: 'Duplicate & Inconsistency Detection',
    desc: 'Same source cited two different ways across chapters. Same author name spelled differently. We find and standardise every instance.',
  },
]

const pricingCards = [
  {
    badge: 'PER CHAPTER',
    title: 'Chapter-by-Chapter Audit',
    desc: 'Ideal for dissertations and theses. We audit one chapter at a time — reference list, inline citations, DOIs — and return a corrected chapter with full change log.',
    price: 'From $120 / chapter',
    cta: 'Get a Chapter Quote',
    variant: 'filled' as const,
  },
  {
    badge: 'FULL MANUSCRIPT',
    title: 'Full Reference List Rebuild',
    desc: 'For manuscripts with a broken or inconsistent reference list across all chapters. We rebuild the entire list from scratch to the required style.',
    price: '$90 / hour',
    cta: 'Enquire',
    variant: 'outline' as const,
  },
  {
    badge: 'STYLE CONVERSION',
    title: 'Citation Style Conversion',
    desc: 'Converting from one citation style to another across a full manuscript — footnotes to author-date, APA to Chicago. Full document conversion, fully tracked.',
    price: 'Custom per manuscript',
    cta: 'Enquire',
    variant: 'outline' as const,
  },
]

const faqs = [
  {
    q: 'Do you check that the sources I cited actually exist?',
    a: 'Yes. For DOI-linked sources we verify the DOI resolves to the correct article. For books and book chapters we cross-check title, author, year, and publisher against available records. Anything we cannot verify is flagged for author confirmation.',
  },
  {
    q: 'Can you convert my entire dissertation from APA to Chicago?',
    a: 'Yes. Full citation style conversions are within scope. We convert inline citations, footnotes, and the reference list. The final document is returned in tracked-changes so you review every change before accepting.',
  },
  {
    q: 'My Zotero export has hundreds of formatting errors. Can you fix it?',
    a: 'Yes. This is one of the most common requests. We repair the exported file, apply the required style, and return a clean reference list ready for submission.',
  },
  {
    q: 'Do you find new sources to fill gaps in my literature?',
    a: 'No. We work exclusively with the sources you have provided. Sourcing new literature is research — outside the scope of this service and outside the ethical boundary of what we offer.',
  },
]

export default function CitationAuditsPage() {
  const theme = useMantineTheme()
  const active = theme.other
  const [opened, { open, close }] = useDisclosure(false)
  const [submitted, setSubmitted] = useState(false)

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* Hero */}
      <Box component="section" pt={rem(140)} pb={rem(100)} bg={active.background}>
        <Container size={1200}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(80)} style={{ alignItems: 'center' }}>
            <Stack gap="xl">
              <Stack gap="xs">
                <Text size="xs" fw={700} style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }} c={active.accent}>
                  Citation & Reference Audits
                </Text>
                <Title order={1} style={{ fontSize: rem(56), lineHeight: 1.1, letterSpacing: '-0.02em', color: active.primary, fontFamily: 'var(--font-serif)' }}>
                  References that actually hold up under scrutiny.
                </Title>
              </Stack>
              <Text size="lg" c="dimmed" lh={1.6} style={{ fontSize: rem(20) }}>
                Every inline citation cross-checked. Every DOI verified. Every reference list rebuilt to the exact style your institution or publisher requires.
              </Text>
              <Group gap="md">
                <Link href="/request-review?service=Citation%20Audit" style={{ textDecoration: 'none' }}>
                  <Button size="lg" variant="filled" bg={active.primary} radius={0} className="impeccable-button" rightSection={<IconArrowRight size={18} />}>
                    REQUEST A REFERENCE AUDIT
                  </Button>
                </Link>
              </Group>
            </Stack>

            <Box>
              <Card p={rem(40)} radius={0} bg={active.surface} style={{ border: `1px solid ${active.primary}12` }}>
                <Stack gap="xl">
                  <Badge color="dark" variant="light" radius={0} style={{ alignSelf: 'flex-start' }}>
                    AUDIT GUIDE
                  </Badge>
                  <Stack gap="xs">
                    <Title order={3} style={{ fontSize: rem(24), fontFamily: 'var(--font-serif)', color: active.primary }}>
                      The Citation Audit Checklist
                    </Title>
                    <Text size="sm" c="dimmed" lh={1.6}>
                      A step-by-step breakdown of what we check, fix, and flag — and exactly what we hand back to you at the end.
                    </Text>
                  </Stack>
                  <Button
                    variant="outline"
                    color={active.primary}
                    radius={0}
                    leftSection={<IconDownload size={16} />}
                    style={{ borderColor: active.primary }}
                    onClick={() => { setSubmitted(false); open() }}
                  >
                    Download Checklist
                  </Button>
                </Stack>
              </Card>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Full Audit Scope */}
      <Box py={SECTION_SPACING} className="academic-watermark" bg={active.surface} style={{ borderTop: `1px solid ${active.primary}08` }}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(56)}>
            <Box style={{ maxWidth: 720 }}>
              <Text size="xs" c={active.accent} fw={700} style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }} mb="sm">
                Full Audit Scope
              </Text>
              <Title order={2} style={{ fontSize: rem(42), color: active.primary, fontFamily: 'var(--font-serif)' }}>
                Every citation. Every reference. Every time.
              </Title>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(32)}>
              {auditItems.map((item, i) => (
                <Box key={i} p={rem(32)} bg={active.background} style={{ border: `1px solid ${active.primary}12` }}>
                  <Group gap="md" wrap="nowrap" align="flex-start" mb="md">
                    <ThemeIcon size={32} radius={0} variant="light" color={active.accent}>
                      <IconListCheck size={18} />
                    </ThemeIcon>
                    <Text fw={700} size="md" c={active.primary}>{item.title}</Text>
                  </Group>
                  <Text size="sm" c="dimmed" lh={1.65}>{item.desc}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* Pricing */}
      <Box py={SECTION_SPACING} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(56)}>
            <Box style={{ maxWidth: 720, textAlign: 'center', margin: '0 auto' }}>
              <Text size="xs" c={active.accent} fw={700} style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }} mb="sm">
                Audit Scope & Pricing
              </Text>
              <Title order={2} style={{ fontSize: rem(42), color: active.primary, fontFamily: 'var(--font-serif)' }}>
                Scoped to what your manuscript actually needs.
              </Title>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(24)}>
              {pricingCards.map((card, i) => (
                <Box
                  key={i}
                  p={rem(32)}
                  bg={i === 0 ? active.primary : active.surface}
                  style={{
                    border: i === 0 ? 'none' : `1px solid ${active.primary}12`,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Stack gap="lg" flex={1}>
                    <Badge radius={0} color={i === 0 ? 'white' : 'dark'} variant={i === 0 ? 'outline' : 'light'} style={{ alignSelf: 'flex-start' }}>
                      {card.badge}
                    </Badge>
                    <Stack gap="xs">
                      <Title order={3} style={{ fontSize: rem(22), fontFamily: 'var(--font-serif)', color: i === 0 ? '#fff' : active.primary }}>
                        {card.title}
                      </Title>
                      <Text size="sm" c={i === 0 ? 'rgba(255,255,255,0.75)' : 'dimmed'} lh={1.6}>
                        {card.desc}
                      </Text>
                    </Stack>
                    <Box mt="auto" pt="xl">
                      <Text fw={700} size="xl" c={i === 0 ? active.accent : active.primary} mb="md" style={{ fontFamily: 'var(--font-serif)' }}>
                        {card.price}
                      </Text>
                      <Link href="/request-review?service=Citation%20Audit" style={{ textDecoration: 'none' }}>
                        <Button
                          fullWidth
                          radius={0}
                          variant={i === 0 ? 'white' : 'outline'}
                          color={i === 0 ? 'dark' : active.primary}
                          style={i !== 0 ? { borderColor: active.primary } : {}}
                        >
                          {card.cta}
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

      {/* 3-Step Process */}
      <Box py={SECTION_SPACING} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}08` }}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(56)} align="center" style={{ textAlign: 'center' }}>
            <Box style={{ maxWidth: 640 }}>
              <Text size="xs" c={active.accent} fw={700} style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }} mb="sm">
                How It Works
              </Text>
              <Title order={2} style={{ fontSize: rem(42), color: active.primary, fontFamily: 'var(--font-serif)' }}>
                A clean, documented audit process.
              </Title>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(24)} style={{ width: '100%', textAlign: 'left' }}>
              {[
                {
                  num: 'STEP 01',
                  title: 'Submit Your Manuscript & Style Requirements',
                  body: 'Upload your document and specify the required citation style and any journal or university guidelines. We confirm scope and turnaround within 24 hours.',
                },
                {
                  num: 'STEP 02',
                  title: 'Line-by-Line Audit & Correction',
                  body: 'We work through every citation and reference entry. DOIs are verified. Formatting is applied. Inconsistencies are resolved. All changes are logged.',
                },
                {
                  num: 'STEP 03',
                  title: 'Corrected File & Change Log Returned',
                  body: 'You receive the corrected reference list and a written change log documenting every correction made and why — ready for your review.',
                },
              ].map((step, i) => (
                <Box key={i} p={rem(32)} bg={active.background} style={{ border: `1px solid ${active.primary}12` }}>
                  <Text fw={700} size="sm" c={active.accent} mb="xs">{step.num}</Text>
                  <Title order={3} mb="sm" style={{ fontSize: rem(20), fontFamily: 'var(--font-serif)' }}>{step.title}</Title>
                  <Text size="sm" c="dimmed" lh={1.6}>{step.body}</Text>
                </Box>
              ))}
            </SimpleGrid>

            <Link href="/request-review?service=Citation%20Audit" style={{ textDecoration: 'none' }}>
              <Button size="lg" radius={0} variant="filled" bg={active.primary} className="impeccable-button">
                REQUEST A REFERENCE AUDIT
              </Button>
            </Link>
          </Stack>
        </Container>
      </Box>

      {/* Logistics Bar */}
      <Box py={rem(80)} bg={active.background} style={{ borderTop: `1px solid ${active.primary}08` }}>
        <Container size={INNER_WIDTH}>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(60)}>
            {[
              { icon: IconClock, label: 'TURNAROUND', body: 'Typically 5–7 business days for full manuscripts. 2–3 days per individual chapter.' },
              { icon: IconScale, label: 'ETHICAL BOUNDARY', body: 'We correct and format existing references. We do not source new literature or suggest additional citations.' },
              { icon: IconShieldCheck, label: 'THE GUARANTEE', body: 'If your committee or publisher flags a reference error we were responsible for, we fix it at no additional cost.' },
            ].map((item, i) => (
              <Stack key={i} gap="md" align="center" style={{ textAlign: 'center' }}>
                <ThemeIcon size={48} radius="xl" variant="light" color={active.accent}>
                  <item.icon size={24} />
                </ThemeIcon>
                <Text fw={700} style={{ letterSpacing: '0.05em' }}>{item.label}</Text>
                <Text size="sm" c="dimmed" lh={1.6}>{item.body}</Text>
              </Stack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* FAQ */}
      <Box py={SECTION_SPACING} className="academic-watermark" bg={active.surface} style={{ borderTop: `1px solid ${active.primary}08` }}>
        <Container size={800}>
          <Stack gap="xl">
            <Box style={{ textAlign: 'center' }}>
              <Text size="xs" c={active.accent} fw={700} style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }} mb="md">FAQ</Text>
              <Title order={2} style={{ fontSize: rem(36), color: active.primary, fontFamily: 'var(--font-serif)' }}>
                Citation Audit Questions
              </Title>
            </Box>
            <Accordion variant="separated" radius={0}>
              {faqs.map((faq, i) => (
                <Accordion.Item key={i} value={`faq-${i}`} style={{ backgroundColor: active.background, border: `1px solid ${active.primary}10` }}>
                  <Accordion.Control><Text fw={600} size="md" c={active.primary}>{faq.q}</Text></Accordion.Control>
                  <Accordion.Panel><Text size="sm" lh={1.7} c="dimmed">{faq.a}</Text></Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Stack>
        </Container>
      </Box>

      {/* Download Modal */}
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton
        centered
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        styles={{
          content: { backgroundColor: active.surface, border: `1px solid #eee`, borderRadius: 0 },
          header: { backgroundColor: active.surface },
        }}
      >
        <Box p="md" style={{ textAlign: 'center' }}>
          <Title order={2} style={{ fontSize: rem(28), color: active.primary }} mb="xl">
            Secure Your Resource
          </Title>
          {!submitted ? (
            <Stack gap="xl">
              <Text size="sm" c="dimmed" lh={1.6}>
                Enter your email to receive <strong>The Citation Audit Checklist</strong>.
              </Text>
              <Stack gap="md">
                <TextInput placeholder="Your Email Address" radius={0} size="md" styles={{ input: { border: `1px solid #eee` } }} />
                <Button fullWidth size="md" radius={0} variant="filled" bg={active.primary} onClick={() => setSubmitted(true)}>
                  Send My Checklist
                </Button>
              </Stack>
              <Text size="xs" c="dimmed">We respect your privacy. Unsubscribe at any time.</Text>
            </Stack>
          ) : (
            <Stack gap="xl" align="center" py="xl">
              <ThemeIcon size={64} radius="xl" color="green" variant="light">
                <IconCheck size={32} />
              </ThemeIcon>
              <Box>
                <Title order={3}>Checklist Sent!</Title>
                <Text size="sm" c="dimmed" mt="sm">Check your inbox for The Citation Audit Checklist.</Text>
              </Box>
              <Button variant="outline" color={active.primary} radius={0} fullWidth onClick={close}>Close</Button>
            </Stack>
          )}
        </Box>
      </Modal>

      <Footer />
    </Box>
  )
}
