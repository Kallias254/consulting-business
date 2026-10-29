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
  Group,
  rem,
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
  IconDownload,
  IconClock,
  IconFileText,
  IconPhoto,
  IconListCheck,
  IconSend,
  IconShieldCheck,
} from '@tabler/icons-react'
import { SECTION_SPACING, INNER_WIDTH } from '@/layout'

const faqs = [
  {
    q: "Isn't the index the same as the table of contents?",
    a: 'No. A table of contents lists sections in order. A back-of-book index is an alphabetical subject index linking readers to specific concepts, names, and terms — it is a separate, discipline-specific document required by most academic presses and graduate schools.',
  },
  {
    q: 'Can you work from a Word document?',
    a: 'For page proof review, we require a typeset PDF — the actual paginated file your press or institution will print from. Word documents reflect the pre-typeset state and cannot be proofread for typesetting errors. If you only have Word, contact us first.',
  },
  {
    q: 'How much does indexing cost for a 250-page book?',
    a: 'At $4–7 per typeset page, a 250-page book typically runs $1,000–$1,750 depending on subject density and the number of proper nouns, cross-references, and subentries required. We provide a fixed quote after reviewing your typeset files.',
  },
  {
    q: 'What are "copyeditor queries" and why do I need help with them?',
    a: "When a press copyedits your manuscript, they insert margin queries asking you to confirm changes or resolve unclear phrasing. These must be answered correctly before typesetting is finalised. Missing or poorly answered queries delay publication. We review all queries, flag those requiring your judgment, and handle the rest.",
  },
]

export default function IndexingProofsPage() {
  const theme = useMantineTheme()
  const active = theme.other
  const [opened, { open, close }] = useDisclosure(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleDownloadClick = () => {
    setSubmitted(false)
    open()
  }

  const handleSubmit = () => {
    if (email) setSubmitted(true)
  }

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* ── Hero ── */}
      <Box component="section" pt={rem(140)} pb={rem(100)} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(80)} style={{ alignItems: 'center' }}>
            <Stack gap="xl">
              <Stack gap="xs">
                <Text
                  size="xs"
                  fw={700}
                  style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                  c={active.accent}
                >
                  Post-Acceptance Production
                </Text>
                <Title
                  order={1}
                  style={{
                    fontSize: rem(58),
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: active.primary,
                    fontFamily: 'var(--font-serif)',
                  }}
                >
                  The last two things between your manuscript and the printer.
                </Title>
              </Stack>
              <Text size="lg" c="dimmed" lh={1.7} style={{ fontSize: rem(19) }}>
                After acceptance, the production stage moves fast. Indexes, page proofs, and figure
                files arrive with tight deadlines and zero margin for error. We handle both.
              </Text>
              <Group gap="md" wrap="wrap">
                <Link
                  href="/order?track=track_b"
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    size="lg"
                    variant="filled"
                    bg={active.primary}
                    radius={0}
                    className="impeccable-button"
                  >
                    ENQUIRE ABOUT THIS SERVICE
                  </Button>
                </Link>
                <Link href="/consultation" style={{ textDecoration: 'none' }}>
                  <Button
                    size="lg"
                    variant="outline"
                    radius={0}
                    style={{ borderColor: active.primary, color: active.primary }}
                  >
                    BOOK A PROJECT REVIEW
                  </Button>
                </Link>
              </Group>
            </Stack>

            {/* RHS Lead Magnet Card */}
            <Box>
              <Card
                p={rem(40)}
                radius={0}
                bg={active.surface}
                style={{
                  border: `1px solid ${active.primary}12`,
                  boxShadow: '0 8px 30px rgba(0,0,0,0.02)',
                }}
              >
                <Stack gap="xl">
                  <Badge
                    color="dark"
                    variant="light"
                    radius={0}
                    style={{ alignSelf: 'flex-start' }}
                    className="impeccable-eyebrow"
                  >
                    FREE GUIDE
                  </Badge>
                  <Stack gap="xs">
                    <Title
                      order={3}
                      style={{
                        fontSize: rem(24),
                        fontFamily: 'var(--font-serif)',
                        color: active.primary,
                      }}
                    >
                      What Happens After Acceptance
                    </Title>
                    <Text size="sm" c="dimmed" lh={1.6}>
                      A plain-language walkthrough of the post-acceptance production timeline —
                      indexing windows, page proof deadlines, figure specifications, and what your
                      press actually needs from you.
                    </Text>
                  </Stack>
                  <Button
                    variant="outline"
                    color={active.primary}
                    radius={0}
                    leftSection={<IconDownload size={16} />}
                    style={{ borderColor: active.primary }}
                    onClick={handleDownloadClick}
                  >
                    Download the Guide
                  </Button>
                </Stack>
              </Card>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* ── Two Core Services ── */}
      <Box py={SECTION_SPACING} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}08` }}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(60)}>
            <Stack gap="xs" style={{ textAlign: 'center' }}>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c={active.accent}
              >
                Two Services, One Production Window
              </Text>
              <Title
                order={2}
                style={{
                  fontSize: rem(44),
                  color: active.primary,
                  fontFamily: 'var(--font-serif)',
                  lineHeight: 1.15,
                }}
              >
                Choose one or both.
              </Title>
              <Text size="lg" c="dimmed" lh={1.7} style={{ maxWidth: 620, margin: '0 auto' }}>
                Both services are scoped to your typeset files. We work from the exact PDF your
                press will print from — not an earlier draft.
              </Text>
            </Stack>

            <SimpleGrid cols={{ base: 1, lg: 2 }} spacing={rem(32)}>
              {/* Back-of-Book Indexing */}
              <Card
                p={rem(40)}
                radius={0}
                bg={active.background}
                style={{ border: `1px solid ${active.primary}10` }}
              >
                <Stack gap="lg">
                  <Group gap="md">
                    <ThemeIcon size={48} radius={0} variant="light" color={active.accent}>
                      <IconListCheck size={24} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Title order={3} style={{ fontSize: rem(22), color: active.primary, fontFamily: 'var(--font-serif)' }}>
                        Back-of-Book Indexing
                      </Title>
                      <Badge variant="dot" color={active.accent} size="sm" style={{ paddingLeft: 0 }}>
                        $4–7 per typeset page
                      </Badge>
                    </Stack>
                  </Group>
                  <Text size="sm" c="dimmed" lh={1.7}>
                    A professionally prepared alphabetical index built from your final typeset
                    PDF. Compliant with Chicago Manual of Style indexing standards and press
                    specifications.
                  </Text>
                  <Stack gap="sm">
                    {[
                      'Main entries and nested subentries',
                      'Cross-references (see / see also)',
                      'Proper nouns, place names, key concepts',
                      'Page range compression',
                      'Built using professional indexing software (Cindex)',
                      'Delivered as RTF or embedded InDesign-ready file',
                    ].map((item, i) => (
                      <Group key={i} gap="sm" wrap="nowrap">
                        <ThemeIcon size={20} radius="xl" variant="light" color={active.accent}>
                          <IconCheck size={11} stroke={3} />
                        </ThemeIcon>
                        <Text size="sm" c={active.primary}>
                          {item}
                        </Text>
                      </Group>
                    ))}
                  </Stack>
                </Stack>
              </Card>

              {/* Page Proof Review */}
              <Card
                p={rem(40)}
                radius={0}
                bg={active.background}
                style={{ border: `1px solid ${active.primary}10` }}
              >
                <Stack gap="lg">
                  <Group gap="md">
                    <ThemeIcon size={48} radius={0} variant="light" color={active.accent}>
                      <IconFileText size={24} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Title order={3} style={{ fontSize: rem(22), color: active.primary, fontFamily: 'var(--font-serif)' }}>
                        Page Proof Review
                      </Title>
                      <Badge variant="dot" color={active.accent} size="sm" style={{ paddingLeft: 0 }}>
                        $3–5 per typeset page
                      </Badge>
                    </Stack>
                  </Group>
                  <Text size="sm" c="dimmed" lh={1.7}>
                    A thorough pass of your typeset proof before the book goes to print. We catch
                    what the typesetter introduced — not what was in your manuscript.
                  </Text>
                  <Stack gap="sm">
                    {[
                      'Typesetting errors and font inconsistencies',
                      'Widows, orphans, and awkward page breaks',
                      'Broken tables and figure placement errors',
                      'Caption numbering and figure-text alignment',
                      'Copyeditor query resolution',
                      'Running headers and TOC accuracy check',
                    ].map((item, i) => (
                      <Group key={i} gap="sm" wrap="nowrap">
                        <ThemeIcon size={20} radius="xl" variant="light" color={active.accent}>
                          <IconCheck size={11} stroke={3} />
                        </ThemeIcon>
                        <Text size="sm" c={active.primary}>
                          {item}
                        </Text>
                      </Group>
                    ))}
                  </Stack>
                </Stack>
              </Card>
            </SimpleGrid>

            {/* Add-on: Artwork & Figure Preparation */}
            <Card
              p={rem(40)}
              radius={0}
              bg={active.background}
              style={{
                border: `2px solid ${active.accent}40`,
              }}
            >
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(40)} style={{ alignItems: 'center' }}>
                <Stack gap="md">
                  <Group gap="md">
                    <ThemeIcon size={44} radius={0} variant="filled" color={active.accent}>
                      <IconPhoto size={22} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Badge color={active.accent} variant="filled" radius={0} size="sm" mb={4}>
                        ADD-ON SERVICE
                      </Badge>
                      <Title order={3} style={{ fontSize: rem(22), color: active.primary, fontFamily: 'var(--font-serif)' }}>
                        Artwork & Figure Preparation
                      </Title>
                    </Stack>
                  </Group>
                  <Text size="sm" c="dimmed" lh={1.7}>
                    Most presses require figures at 300–600 dpi, in .tif format, with specific
                    labelling and permissions documentation. We handle all of it so your production
                    editor does not send the files back.
                  </Text>
                  <Text size="xs" c={active.accent} fw={600}>
                    Custom scoped — quoted per figure count
                  </Text>
                </Stack>
                <Stack gap="sm">
                  {[
                    'Resolution check and upscaling/compression',
                    'File format conversion (.png, .jpg → .tif)',
                    'Figure numbering and caption formatting',
                    'Table reformatting to press specification',
                    'Permissions tracking log (reproduced figures)',
                  ].map((item, i) => (
                    <Group key={i} gap="sm" wrap="nowrap">
                      <ThemeIcon size={20} radius="xl" variant="light" color={active.accent}>
                        <IconCheck size={11} stroke={3} />
                      </ThemeIcon>
                      <Text size="sm" c={active.primary}>
                        {item}
                      </Text>
                    </Group>
                  ))}
                </Stack>
              </SimpleGrid>
            </Card>
          </Stack>
        </Container>
      </Box>

      {/* ── 3-Step Process ── */}
      <Box py={SECTION_SPACING} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(60)}>
            <Stack gap="xs" style={{ textAlign: 'center' }}>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c={active.accent}
              >
                How It Works
              </Text>
              <Title
                order={2}
                style={{
                  fontSize: rem(44),
                  color: active.primary,
                  fontFamily: 'var(--font-serif)',
                  lineHeight: 1.15,
                }}
              >
                Three steps to press-ready files.
              </Title>
            </Stack>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(32)}>
              {[
                {
                  step: '01',
                  title: 'Submit your typeset files',
                  body: 'Send your final typeset PDF along with your press style guide and any copyeditor queries. We confirm the scope and send a fixed quote within 24 hours.',
                },
                {
                  step: '02',
                  title: 'Indexing build or proof review',
                  body: 'We work through the document with professional indexing software or a structured proof-review checklist. Every item is flagged and documented.',
                },
                {
                  step: '03',
                  title: 'Annotated files returned',
                  body: 'You receive a complete index file or an annotated PDF with all corrections and query responses — ready to return directly to your press.',
                },
              ].map((s, i) => (
                <Card
                  key={i}
                  p={rem(36)}
                  radius={0}
                  bg={active.surface}
                  style={{ border: `1px solid ${active.primary}08` }}
                >
                  <Stack gap="md">
                    <Text
                      style={{
                        fontSize: rem(48),
                        fontWeight: 800,
                        color: `${active.primary}10`,
                        fontFamily: 'var(--font-serif)',
                        lineHeight: 1,
                      }}
                    >
                      {s.step}
                    </Text>
                    <Title order={4} style={{ fontSize: rem(18), color: active.primary }}>
                      {s.title}
                    </Title>
                    <Text size="sm" c="dimmed" lh={1.7}>
                      {s.body}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* ── Logistics Bar ── */}
      <Box py={rem(60)} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}08` }}>
        <Container size={INNER_WIDTH}>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(40)}>
            {[
              {
                icon: <IconClock size={24} />,
                label: 'Turnaround',
                value: '5–10 business days',
                note: 'Per 250 typeset pages. Rush available on request.',
              },
              {
                icon: <IconFileText size={24} />,
                label: 'Input Required',
                value: 'Final typeset PDF',
                note: 'Not a Word document — the paginated file from your typesetter.',
              },
              {
                icon: <IconShieldCheck size={24} />,
                label: 'Our Guarantee',
                value: 'Fixed scope, fixed fee',
                note: 'We quote from your files. No billable surprises after approval.',
              },
            ].map((item, i) => (
              <Group key={i} gap="md" wrap="nowrap" align="flex-start">
                <ThemeIcon size={44} radius={0} variant="light" color={active.accent}>
                  {item.icon}
                </ThemeIcon>
                <Stack gap={2}>
                  <Text size="xs" fw={700} style={{ textTransform: 'uppercase', letterSpacing: '0.12em' }} c={active.accent}>
                    {item.label}
                  </Text>
                  <Text fw={700} size="md" c={active.primary}>
                    {item.value}
                  </Text>
                  <Text size="xs" c="dimmed" lh={1.5}>
                    {item.note}
                  </Text>
                </Stack>
              </Group>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* ── FAQ ── */}
      <Box py={SECTION_SPACING} bg={active.background}>
        <Container size={800}>
          <Stack gap={rem(48)}>
            <Stack gap="xs" style={{ textAlign: 'center' }}>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c={active.accent}
              >
                Common Questions
              </Text>
              <Title
                order={2}
                style={{
                  fontSize: rem(44),
                  color: active.primary,
                  fontFamily: 'var(--font-serif)',
                  lineHeight: 1.15,
                }}
              >
                Answers before you ask.
              </Title>
            </Stack>
            <Accordion variant="separated" radius={0}>
              {faqs.map((faq, i) => (
                <Accordion.Item key={i} value={String(i)} style={{ border: `1px solid ${active.primary}10` }}>
                  <Accordion.Control>
                    <Text fw={600} c={active.primary}>
                      {faq.q}
                    </Text>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm" c="dimmed" lh={1.8}>
                      {faq.a}
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Stack>
        </Container>
      </Box>

      {/* ── CTA Bar ── */}
      <Box py={rem(100)} bg={active.primary}>
        <Container size={800}>
          <Stack gap="xl" align="center" style={{ textAlign: 'center' }}>
            <Title
              order={2}
              style={{
                fontSize: rem(44),
                color: active.background,
                fontFamily: 'var(--font-serif)',
                lineHeight: 1.15,
              }}
            >
              Ready to send your typeset files?
            </Title>
            <Text size="lg" lh={1.7} style={{ color: `${active.background}99`, maxWidth: 580 }}>
              Send us your production package. We will scope it, quote it, and return press-ready
              files before your deadline.
            </Text>
            <Group gap="md" wrap="wrap" justify="center">
              <Link
                href="/order?track=track_b"
                style={{ textDecoration: 'none' }}
              >
                <Button size="lg" variant="white" color={active.primary} radius={0}>
                  SUBMIT YOUR FILES
                </Button>
              </Link>
              <Link href="/consultation" style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  variant="outline"
                  radius={0}
                  style={{ borderColor: active.background, color: active.background }}
                >
                  BOOK A PROJECT REVIEW
                </Button>
              </Link>
            </Group>
          </Stack>
        </Container>
      </Box>

      {/* ── Download Modal ── */}
      <Modal
        opened={opened}
        onClose={close}
        title="Download: What Happens After Acceptance"
        centered
        size="md"
        radius={0}
      >
        {!submitted ? (
          <Stack gap="md">
            <Text size="sm" c="dimmed">
              Enter your email and we will send the guide directly to your inbox.
            </Text>
            <TextInput
              label="Email address"
              placeholder="you@institution.edu"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              radius={0}
            />
            <Button
              leftSection={<IconSend size={16} />}
              bg={active.primary}
              radius={0}
              onClick={handleSubmit}
              disabled={!email}
            >
              Send Me the Guide
            </Button>
          </Stack>
        ) : (
          <Stack gap="md" align="center" py="xl">
            <ThemeIcon size={56} radius="xl" variant="light" color="green">
              <IconCheck size={28} stroke={2.5} />
            </ThemeIcon>
            <Text fw={600} size="lg">
              Guide on its way!
            </Text>
            <Text size="sm" c="dimmed" style={{ textAlign: 'center' }}>
              Check your inbox for <em>What Happens After Acceptance</em>.
            </Text>
          </Stack>
        )}
      </Modal>

      <Footer />
    </Box>
  )
}
