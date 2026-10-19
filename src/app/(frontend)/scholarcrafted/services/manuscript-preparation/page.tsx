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
  IconShieldCheck,
  IconSend,
  IconRoute,
  IconBook,
  IconFileDescription,
  IconAlertCircle,
} from '@tabler/icons-react'
import { SECTION_SPACING, INNER_WIDTH } from '@/layout'

const faqs = [
  {
    q: 'Does this service include writing any new content?',
    a: 'No. We do not write any portion of your manuscript. Manuscript Preparation is purely execution — formatting, restructuring for word-count compliance, and style conversion. All intellectual content remains entirely yours.',
  },
  {
    q: 'Can you prepare for any journal or publisher?',
    a: 'Yes. We work with Routledge, Oxford University Press, Sage, Cambridge, Elsevier, Taylor & Francis, and discipline-specific journals. You provide the style guide; we match your manuscript to it exactly.',
  },
  {
    q: 'My thesis is 90,000 words. What does Track 1 actually do?',
    a: 'A journal article from a thesis typically runs 7,000–10,000 words. Track 1 involves scope reduction (identifying the tightest publishable argument), abstract rewriting, style conversion (from institutional to journal tone), and blind-review anonymisation. We do not summarise or paraphrase — we restructure what is already written.',
  },
  {
    q: 'What is the Section-by-Section Advisory and is it coaching?',
    a: 'No — it is a written diagnostic memo, not a coaching session. You submit one section; we return a structured written memo outlining formatting gaps, style mismatches, and submission errors. One section, one fee, one deliverable. No meetings, no ongoing relationship required.',
  },
]

const tracks = [
  {
    icon: <IconRoute size={26} />,
    label: 'Track 1',
    title: 'Thesis-to-Journal Article Conversion',
    body: 'Converts a doctoral thesis into a publication-ready journal submission. Focused on scope reduction, not summarisation.',
    items: [
      'Argument scoping — isolating the publishable core',
      'Abstract rewrite for journal submission format',
      'Style conversion (institutional → journal tone)',
      'Section restructuring to meet word limits',
      'Anonymous (blind review) formatting',
      'In-text citation conversion to target journal style',
    ],
  },
  {
    icon: <IconBook size={26} />,
    label: 'Track 2',
    title: 'Book Proposal Packaging',
    body: 'Full proposal packages for Routledge, Oxford, SAGE, Cambridge, and university presses — built from your completed manuscript.',
    items: [
      'Book overview and market positioning statement',
      'Chapter-by-chapter summaries',
      'Competitive title analysis and market section',
      'Author biography and credentials summary',
      'Sample chapter formatting and style compliance',
      'Press-specific submission requirements applied',
    ],
  },
  {
    icon: <IconFileDescription size={26} />,
    label: 'Track 3',
    title: 'Journal Submission Formatting',
    body: 'Formats your finished manuscript to the exact requirements of your target journal — before submission.',
    items: [
      'Word count compliance and section trimming',
      'Anonymous formatting (author identification removed)',
      'Required sections verified (abstract, keywords, disclosures)',
      'Figure and table specification compliance',
      'Reference list style conversion',
      'Cover letter formatting',
    ],
  },
]

export default function ManuscriptPreparationPage() {
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
                  Publication Preparation
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
                  Your finished manuscript deserves a press-ready submission.
                </Title>
              </Stack>
              <Text size="lg" c="dimmed" lh={1.7} style={{ fontSize: rem(19) }}>
                A completed manuscript is not a submitted one. Journal formatting, book proposals,
                and thesis-to-article conversion require a different kind of discipline — one that
                leaves the intellectual work entirely intact.
              </Text>
              <Group gap="md" wrap="wrap">
                <Link
                  href="/request-review?service=Manuscript%20Preparation"
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    size="lg"
                    variant="filled"
                    bg={active.primary}
                    radius={0}
                    className="impeccable-button"
                  >
                    SUBMIT YOUR MANUSCRIPT
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
                    FREE RESOURCE
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
                      The Publisher Submission Checklist
                    </Title>
                    <Text size="sm" c="dimmed" lh={1.6}>
                      A press-agnostic checklist covering journal formatting, book proposal
                      structure, blind-review requirements, figure specifications, and the ten
                      most common submission errors that result in desk rejection.
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
                    Download the Checklist
                  </Button>
                </Stack>
              </Card>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* ── Ethical Boundary Statement ── */}
      <Box py={rem(60)} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}08` }}>
        <Container size={800}>
          <Group gap="lg" wrap="nowrap" align="flex-start">
            <ThemeIcon size={40} radius={0} variant="light" color={active.accent} style={{ flexShrink: 0 }}>
              <IconAlertCircle size={22} />
            </ThemeIcon>
            <Stack gap="xs">
              <Text fw={700} size="md" c={active.primary}>
                Our firm ethical boundary: we format, restructure, and convert. We do not write.
              </Text>
              <Text size="sm" c="dimmed" lh={1.7}>
                Every track in this service operates on your existing content. We reduce scope,
                convert style, and meet submission requirements — but no new paragraphs, arguments,
                or sentences are added to your manuscript. If you need new content, that is
                ghostwriting, and we do not offer it.
              </Text>
            </Stack>
          </Group>
        </Container>
      </Box>

      {/* ── Three Tracks ── */}
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
                Three Preparation Tracks
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
                Where is your manuscript going?
              </Title>
              <Text size="lg" c="dimmed" lh={1.7} style={{ maxWidth: 620, margin: '0 auto' }}>
                Select the track that matches your publication goal. All three begin with a
                complete draft — we take it from there.
              </Text>
            </Stack>

            <Stack gap={rem(24)}>
              {tracks.map((track, i) => (
                <Card
                  key={i}
                  p={rem(40)}
                  radius={0}
                  bg={active.surface}
                  style={{ border: `1px solid ${active.primary}10` }}
                >
                  <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(48)} style={{ alignItems: 'flex-start' }}>
                    <Stack gap="md">
                      <Group gap="md">
                        <ThemeIcon size={48} radius={0} variant="light" color={active.accent}>
                          {track.icon}
                        </ThemeIcon>
                        <Stack gap={2}>
                          <Badge color={active.accent} variant="dot" size="sm" style={{ paddingLeft: 0 }}>
                            {track.label}
                          </Badge>
                          <Title order={3} style={{ fontSize: rem(22), color: active.primary, fontFamily: 'var(--font-serif)' }}>
                            {track.title}
                          </Title>
                        </Stack>
                      </Group>
                      <Text size="sm" c="dimmed" lh={1.7}>
                        {track.body}
                      </Text>
                    </Stack>
                    <Stack gap="sm">
                      {track.items.map((item, j) => (
                        <Group key={j} gap="sm" wrap="nowrap">
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
              ))}
            </Stack>

            {/* Advisory Add-On */}
            <Card
              p={rem(40)}
              radius={0}
              bg={active.background}
              style={{ border: `2px solid ${active.accent}40` }}
            >
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(40)} style={{ alignItems: 'center' }}>
                <Stack gap="md">
                  <Badge color={active.accent} variant="filled" radius={0} size="sm" style={{ alignSelf: 'flex-start' }}>
                    ADD-ON
                  </Badge>
                  <Title order={3} style={{ fontSize: rem(22), color: active.primary, fontFamily: 'var(--font-serif)' }}>
                    Section-by-Section Manuscript Advisory
                  </Title>
                  <Text size="sm" c="dimmed" lh={1.7}>
                    Not ready for full preparation? Submit one section and receive a structured
                    written diagnostic memo — formatting gaps, style mismatches, and submission
                    errors flagged with specific corrections. One section, one fee, one
                    deliverable. No meetings required.
                  </Text>
                  <Text size="xs" fw={600} c={active.accent}>
                    This is a written memo — not coaching. No new content is written for you.
                  </Text>
                </Stack>
                <Stack gap="sm">
                  {[
                    'Submitted as a PDF or Word document',
                    'Returned as a structured written memo',
                    'Specific corrections, not general feedback',
                    'Covers formatting, style, and submission compliance',
                    'Fixed fee per section — no hourly billing',
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
                The Process
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
                Submit. We prepare. You submit to the press.
              </Title>
            </Stack>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(32)}>
              {[
                {
                  step: '01',
                  title: 'Submit manuscript & target',
                  body: 'Send your completed manuscript and identify the target journal, publisher, or press. Include their author guidelines or style guide. We confirm your track and provide a fixed quote within 24 hours.',
                },
                {
                  step: '02',
                  title: 'Preparation & formatting execution',
                  body: 'We apply your selected track — scope restructuring, style conversion, or proposal packaging — working entirely within your existing content. All changes are delivered in track-changes mode so you see every decision.',
                },
                {
                  step: '03',
                  title: 'Press-ready files returned',
                  body: 'You receive a submission-ready manuscript formatted to the exact requirements of your target press, with a brief delivery memo explaining what was changed and why.',
                },
              ].map((s, i) => (
                <Card
                  key={i}
                  p={rem(36)}
                  radius={0}
                  bg={active.background}
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
      <Box py={rem(60)} bg={active.background} style={{ borderTop: `1px solid ${active.primary}08` }}>
        <Container size={INNER_WIDTH}>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(40)}>
            {[
              {
                icon: <IconClock size={24} />,
                label: 'Turnaround',
                value: '5–14 business days',
                note: 'Varies by track. Track 2 (book proposal) takes 10–14 days.',
              },
              {
                icon: <IconShieldCheck size={24} />,
                label: 'Ethical Boundary',
                value: 'No new content — ever',
                note: 'We format and restructure what you have written. Nothing is ghostwritten.',
              },
              {
                icon: <IconCheck size={24} />,
                label: 'Both Intake Paths',
                value: 'Submit or talk first',
                note: 'You can submit directly or book a project review. Both paths work.',
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
      <Box py={SECTION_SPACING} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}08` }}>
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
                Answered plainly.
              </Title>
            </Stack>
            <Accordion variant="separated" radius={0}>
              {faqs.map((faq, i) => (
                <Accordion.Item
                  key={i}
                  value={String(i)}
                  style={{ border: `1px solid ${active.primary}10` }}
                >
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
              Your manuscript is finished. Let&apos;s make it submittable.
            </Title>
            <Text size="lg" lh={1.7} style={{ color: `${active.background}99`, maxWidth: 580 }}>
              Submit your manuscript and tell us where it&apos;s going. We will match it to every
              requirement of your target press.
            </Text>
            <Group gap="md" wrap="wrap" justify="center">
              <Link
                href="/request-review?service=Manuscript%20Preparation"
                style={{ textDecoration: 'none' }}
              >
                <Button size="lg" variant="white" color={active.primary} radius={0}>
                  SUBMIT YOUR MANUSCRIPT
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
        title="Download: The Publisher Submission Checklist"
        centered
        size="md"
        radius={0}
      >
        {!submitted ? (
          <Stack gap="md">
            <Text size="sm" c="dimmed">
              Enter your email and we will send the checklist directly to your inbox.
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
              Send Me the Checklist
            </Button>
          </Stack>
        ) : (
          <Stack gap="md" align="center" py="xl">
            <ThemeIcon size={56} radius="xl" variant="light" color="green">
              <IconCheck size={28} stroke={2.5} />
            </ThemeIcon>
            <Text fw={600} size="lg">
              Checklist on its way!
            </Text>
            <Text size="sm" c="dimmed" style={{ textAlign: 'center' }}>
              Check your inbox for <em>The Publisher Submission Checklist</em>.
            </Text>
          </Stack>
        )}
      </Modal>

      <Footer />
    </Box>
  )
}
