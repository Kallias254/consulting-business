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
  Divider,
  Center,
  rem,
  Group,
  useMantineTheme,
  Accordion,
  ThemeIcon,
  Badge,
  Slider,
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
  IconMessageChatbot, 
  IconRocket, 
  IconFileCheck, 
  IconShieldCheck, 
  IconSearch, 
  IconDownload,
  IconSend,
  IconClock,
  IconScale,
  IconPencil
} from '@tabler/icons-react'
import { SECTION_SPACING, INNER_WIDTH, READING_WIDTH } from '@/layout'

const faqs = [
  {
    q: 'How do I know if I need Editing or Consulting?',
    a: "Editing is for manuscripts that are already written and need polishing. Consulting (Coaching) is for when you are stuck in the writing process itself. Our full Services Guide contains a detailed breakdown of this distinction.",
  },
  {
    q: 'What is your policy on ghostwriting?',
    a: "We maintain absolute ethical standards. We do not provide ghostwriting services under any circumstances. We refine your voice; we do not replace it.",
  },
  {
    q: 'Can you format to my specific university template?',
    a: "Yes. While we default to APA, MLA, or Chicago, we can adapt to any specific institutional guidelines you provide during the intake process.",
  },
]

export default function EditingProofreadingPage() {
  const theme = useMantineTheme()
  const active = theme.other
  const [wordCount, setWordCount] = useState(30000)
  const [hours, setHours] = useState(10)
  const [opened, { open, close }] = useDisclosure(false)
  const [selectedResource, setSelectedResource] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleDownloadClick = (title: string) => {
    setSelectedResource(title)
    setSubmitted(false)
    open()
  }

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* Hero Section */}
      <Box component="section" pt={rem(140)} pb={rem(100)} bg={active.background}>
        <Container size={1200}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(80)} style={{ alignItems: 'center' }}>
            <Stack gap="xl">
              <Stack gap="xs">
                <Text
                  size="xs"
                  fw={700}
                  style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                  c={active.accent}
                >
                  Manuscript Refinement
                </Text>
                <Title
                  order={1}
                  style={{
                    fontSize: rem(64),
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: active.primary,
                    fontFamily: 'var(--font-serif)'
                  }}
                >
                  Precision editing <br />
                  for scholars.
                </Title>
              </Stack>
              <Text size="lg" c="dimmed" lh={1.6} style={{ fontSize: rem(20) }}>
                Move from a working draft to a submission-ready manuscript with the clarity, 
                tone, and authority required by your committee.
              </Text>
              
              <Group gap="md">
                <Link href="/scholarcrafted/request-review?service=Structural%20Editing%20%26%20Proofreading" style={{ textDecoration: 'none' }}>
                  <Button size="lg" variant="filled" bg={active.primary} radius={0} className="impeccable-button">
                    GET A FREE QUOTE
                  </Button>
                </Link>
              </Group>
            </Stack>

            {/* RHS Card: High-value Template Lead Magnet */}
            <Box>
              <Card 
                p={rem(40)} 
                radius={0} 
                bg={active.surface} 
                style={{ 
                  border: `1px solid ${active.primary}12`,
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.02)'
                }}
              >
                <Stack gap="xl">
                  <Badge color="dark" variant="light" radius={0} style={{ alignSelf: 'flex-start' }} className="impeccable-eyebrow">
                    SERVICES GUIDE
                  </Badge>
                  <Stack gap="xs">
                    <Title order={3} style={{ fontSize: rem(24), fontFamily: 'var(--font-serif)', color: active.primary }}>
                      The Manuscript Refinement Guide
                    </Title>
                    <Text size="sm" c="dimmed" lh={1.6}>
                      A comprehensive, step-by-step overview of our doctoral-level copyediting, formatting rules, compliance checks, and pricing tiers.
                    </Text>
                  </Stack>
                  <Button
                    variant="outline"
                    color={active.primary}
                    radius={0}
                    leftSection={<IconDownload size={16} />}
                    style={{ borderColor: active.primary }}
                    onClick={() => handleDownloadClick('The Manuscript Refinement Guide')}
                  >
                    Download Services Guide
                  </Button>
                </Stack>
              </Card>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* The Scholar's Standard (Trust Section) */}
      <Box py={0} className="academic-watermark" bg={active.surface} style={{ borderTop: `1px solid ${active.primary}08` }}>
        <Container size={800} py={rem(100)}>
          <Stack gap={rem(48)} align="center" style={{ textAlign: 'center' }}>
            <Box style={{ maxWidth: 700 }}>
              <Text size="xs" c={active.accent} fw={700} style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }} mb="sm">
                The Quality Guarantee
              </Text>
              <Title order={2} style={{ fontSize: rem(48), color: active.primary, fontFamily: 'var(--font-serif)', lineHeight: 1.15 }}>
                A higher standard of <br />academic rigor.
              </Title>
            </Box>

            <Box style={{ maxWidth: 750 }}>
              <Text size="lg" c="dimmed" lh={1.8} style={{ fontSize: rem(20) }}>
                Our editors are not just &ldquo;proofreaders&rdquo;—they are PhD-level academics who understand the 
                nuance of your discipline. We don&apos;t just check for typos; we ensure your argument carries 
                the authoritative voice expected by senior faculty.
              </Text>
            </Box>

            <Stack gap="md" style={{ width: '100%', maxWidth: 500, textAlign: 'left' }} mt="md">
              {[
                'PhD-level subject matter expertise',
                'Strict adherence to institutional guidelines',
                'No-risk satisfaction guarantee on revisions',
                'Asynchronous, secure manuscript handling'
              ].map((item, i) => (
                <Group key={i} gap="md" wrap="nowrap" align="center">
                  <ThemeIcon size={28} radius="xl" variant="light" color={active.accent}>
                    <IconCheck size={16} stroke={3} />
                  </ThemeIcon>
                  <Text fw={600} size="md" c={active.primary}>{item}</Text>
                </Group>
              ))}
            </Stack>
          </Stack>
        </Container>

        {/* Infinite Scrolling Ribbon */}
        <Box
          style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            backgroundColor: active.primary,
            color: '#FFFFFF',
            padding: '16px 0',
            borderTop: `1px solid ${active.accent}33`,
            borderBottom: `1px solid ${active.accent}33`,
            position: 'relative',
          }}
        >
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes marquee {
              0% { transform: translate3d(0, 0, 0); }
              100% { transform: translate3d(-33.3333%, 0, 0); }
            }
            .marquee-wrapper {
              display: flex;
              overflow: hidden;
              width: 100%;
            }
            .marquee-content {
              display: flex;
              animation: marquee 40s linear infinite;
              white-space: nowrap;
            }
            .marquee-content span {
              display: inline-block;
              padding-right: 64px;
              font-family: var(--font-sans);
              font-size: 11px;
              font-weight: 600;
              letter-spacing: 0.18em;
              color: rgba(255, 255, 255, 0.9);
            }
            .marquee-content strong {
              color: ${active.accent};
              font-weight: 700;
            }
          ` }} />
          <div className="marquee-wrapper">
            <div className="marquee-content">
              <span>✦ <strong>THE GUARANTEE:</strong> IF YOUR COMMITTEE REQUESTS REVISIONS RELATED SPECIFICALLY TO THE EDITING WE PERFORMED, WE WILL UNDERTAKE THOSE REVISIONS AT NO ADDITIONAL COST. WE STAND BY OUR RIGOR.</span>
              <span>✦ <strong>THE GUARANTEE:</strong> IF YOUR COMMITTEE REQUESTS REVISIONS RELATED SPECIFICALLY TO THE EDITING WE PERFORMED, WE WILL UNDERTAKE THOSE REVISIONS AT NO ADDITIONAL COST. WE STAND BY OUR RIGOR.</span>
              <span>✦ <strong>THE GUARANTEE:</strong> IF YOUR COMMITTEE REQUESTS REVISIONS RELATED SPECIFICALLY TO THE EDITING WE PERFORMED, WE WILL UNDERTAKE THOSE REVISIONS AT NO ADDITIONAL COST. WE STAND BY OUR RIGOR.</span>
            </div>
          </div>
        </Box>
      </Box>

      {/* The 3-Step Client Workflow */}
      <Box component="section" py={SECTION_SPACING} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(60)}>
            <Box style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto' }}>
              <Text size="xs" c={active.accent} fw={700} style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }} mb="sm">
                How It Works
              </Text>
              <Title order={2} style={{ fontSize: rem(42), color: active.primary, fontFamily: 'var(--font-serif)' }}>
                A Simple, Predictable Editorial Process.
              </Title>
              <Text size="lg" c="dimmed" lh={1.7} mt="md">
                No complex portals or endless back-and-forth. We work directly with your Word documents and university formatting manual.
              </Text>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(36)}>
              <Box p={rem(32)} bg={active.surface} style={{ border: `1px solid ${active.primary}12` }}>
                <Text fw={700} size="sm" c={active.accent} mb="xs">STEP 01</Text>
                <Title order={3} mb="sm" style={{ fontSize: rem(20), fontFamily: 'var(--font-serif)' }}>
                  Upload Manuscript & Style Guide
                </Title>
                <Text size="sm" c="dimmed" lh={1.6}>
                  Submit your draft (.docx) along with your university or journal guidelines. We confirm your word count and provide an exact turnaround date within 24 hours.
                </Text>
              </Box>

              <Box p={rem(32)} bg={active.surface} style={{ border: `1px solid ${active.primary}12` }}>
                <Text fw={700} size="sm" c={active.accent} mb="xs">STEP 02</Text>
                <Title order={3} mb="sm" style={{ fontSize: rem(20), fontFamily: 'var(--font-serif)' }}>
                  Faculty Edit & Citation Audit
                </Title>
                <Text size="sm" c="dimmed" lh={1.6}>
                  Our PhD editors refine your syntax, tone, and transitions, while our research engine checks inline citations against primary literature and DOIs.
                </Text>
              </Box>

              <Box p={rem(32)} bg={active.surface} style={{ border: `1px solid ${active.primary}12` }}>
                <Text fw={700} size="sm" c={active.accent} mb="xs">STEP 03</Text>
                <Title order={3} mb="sm" style={{ fontSize: rem(20), fontFamily: 'var(--font-serif)' }}>
                  Defense-Ready Galley & Guarantee
                </Title>
                <Text size="sm" c="dimmed" lh={1.6}>
                  Receive a fully tracked manuscript with margin annotations. If your committee requests revisions related specifically to our editing, we perform them at no cost.
                </Text>
              </Box>
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* Levels of Service (Simplified) */}
      <Box py={SECTION_SPACING} className="academic-watermark" bg={active.background}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(60)}>
            <Box style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
              <Text size="xs" c={active.accent} fw={700} style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }} mb="sm">
                Our Services
              </Text>
              <Title order={2} style={{ fontSize: rem(48), color: active.primary, fontFamily: 'var(--font-serif)' }}>
                Comprehensive Refinement.
              </Title>
              <Text size="lg" c="dimmed" lh={1.7} mt="md">
                We provide a tiered approach to manuscript editing, from light proofreading to deep 
                structural analysis and technical formatting.
              </Text>
            </Box>

            <SimpleGrid cols={{ base: 1, lg: 3 }} spacing={rem(24)}>
              {/* Card 1: Dissertation & Thesis Formatting */}
              <Box p={{ base: rem(24), md: rem(30) }} bg={active.surface} style={{ border: `1px solid oklch(0% 0 0 / 0.08)`, display: 'flex', flexDirection: 'column' }}>
                <Stack gap="xl" flex={1}>
                  <Box>
                    <Badge radius={0} color={active.primary} mb="md">TIER 1 — FLAT RATE</Badge>
                    <Title order={3} style={{ fontSize: rem(26), fontFamily: 'var(--font-serif)' }}>Dissertation & Thesis Formatting</Title>
                    <Text size="sm" c="dimmed" mt="xs">The gold standard for Master's theses and doctoral dissertations.</Text>
                  </Box>
                  
                  <Stack gap="sm">
                    {['APA, MLA, Chicago Compliance', 'Mechanical & Grammatical Polish', 'Passage-Grounded Citation Audit', 'Table of Contents & ProQuest Layout'].map((item, i) => (
                      <Group key={i} gap="xs" align="flex-start">
                        <IconCheck size={16} color={active.accent} stroke={3} style={{ marginTop: rem(2) }} />
                        <Text size="sm" fw={600}>{item}</Text>
                      </Group>
                    ))}
                  </Stack>

                  <Divider color="oklch(0% 0 0 / 0.05)" />

                  <Box>
                    <Group justify="space-between" mb="xs">
                      <Text size="xs" fw={700} c="dimmed" style={{ letterSpacing: '0.05em' }}>WORD COUNT</Text>
                      <Text size="sm" fw={700} c={active.primary}>{wordCount.toLocaleString()} words</Text>
                    </Group>
                    <Slider
                      value={wordCount}
                      onChange={setWordCount}
                      min={5000}
                      max={120000}
                      step={5000}
                      label={(val) => `${val.toLocaleString()} words`}
                      color={active.primary}
                      radius={0}
                      size="sm"
                      thumbSize={16}
                      styles={{
                        track: { backgroundColor: 'oklch(0% 0 0 / 0.05)' },
                      }}
                    />
                  </Box>

                  <Divider color="oklch(0% 0 0 / 0.05)" />

                  <Group justify="space-between" align="flex-end" mt="auto">
                    <Stack gap={2}>
                      <Text size="xs" c="dimmed" fw={600} style={{ letterSpacing: '0.05em' }}>ESTIMATED FEE</Text>
                      <Text fw={700} size="xl" style={{ fontSize: rem(24), fontFamily: 'var(--font-serif)', color: active.primary, lineHeight: 1.1 }}>
                        ${(wordCount * 0.044).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Text>
                      <Text size="xs" c="dimmed" style={{ fontSize: rem(10) }}>$0.044 / word rate</Text>
                    </Stack>
                    <Link href={`/scholarcrafted/request-review?service=Formatting&wordCount=${wordCount}`} style={{ textDecoration: 'none' }}>
                      <Button size="sm" variant="filled" bg={active.primary} radius={0} className="impeccable-button">
                        Get Quote
                      </Button>
                    </Link>
                  </Group>
                </Stack>
              </Box>

              {/* Card 2: Targeted Technical Support */}
              <Box p={{ base: rem(24), md: rem(30) }} bg={active.surface} style={{ border: `1px solid oklch(0% 0 0 / 0.08)`, display: 'flex', flexDirection: 'column' }}>
                <Stack gap="xl" flex={1}>
                  <Box>
                    <Badge radius={0} variant="outline" color={active.primary} mb="md">HOURLY MILESTONES</Badge>
                    <Title order={3} style={{ fontSize: rem(26), fontFamily: 'var(--font-serif)' }}>Technical Reference Support</Title>
                    <Text size="sm" c="dimmed" mt="xs">Targeted assistance for bibliographies, tables, and ProQuest.</Text>
                  </Box>

                  <Stack gap="sm">
                    {['Reference List Reconstruction', 'Citation Cross-checking', 'ProQuest Compliance', 'Complex Table/Figure Assembly'].map((item, i) => (
                      <Group key={i} gap="xs" align="flex-start">
                        <IconCheck size={16} color={active.accent} stroke={3} style={{ marginTop: rem(2) }} />
                        <Text size="sm" fw={600}>{item}</Text>
                      </Group>
                    ))}
                  </Stack>

                  <Divider color="oklch(0% 0 0 / 0.05)" />

                  <Box>
                    <Group justify="space-between" mb="xs">
                      <Text size="xs" fw={700} c="dimmed" style={{ letterSpacing: '0.05em' }}>ESTIMATED HOURS</Text>
                      <Text size="sm" fw={700} c={active.primary}>{hours} hours</Text>
                    </Group>
                    <Slider
                      value={hours}
                      onChange={setHours}
                      min={2}
                      max={40}
                      step={1}
                      label={(val) => `${val} hours`}
                      color={active.primary}
                      radius={0}
                      size="sm"
                      thumbSize={16}
                      styles={{
                        track: { backgroundColor: 'oklch(0% 0 0 / 0.05)' },
                      }}
                    />
                  </Box>

                  <Divider color="oklch(0% 0 0 / 0.05)" />

                  <Group justify="space-between" align="flex-end" mt="auto">
                    <Stack gap={2}>
                      <Text size="xs" c="dimmed" fw={600} style={{ letterSpacing: '0.05em' }}>ESTIMATED FEE</Text>
                      <Text fw={700} size="xl" style={{ fontSize: rem(24), fontFamily: 'var(--font-serif)', color: active.primary, lineHeight: 1.1 }}>
                        ${(hours * 90).toLocaleString()}
                      </Text>
                      <Text size="xs" c="dimmed" style={{ fontSize: rem(10) }}>$90 / hour rate</Text>
                    </Stack>
                    <Link href={`/scholarcrafted/request-review?service=TechnicalSupport&hours=${hours}`} style={{ textDecoration: 'none' }}>
                      <Button size="sm" variant="outline" color={active.primary} radius={0} className="impeccable-button" style={{ borderColor: active.primary }}>
                        Enquire
                      </Button>
                    </Link>
                  </Group>
                </Stack>
              </Box>

              {/* Card 3: Evidence Reconstruction & Grounding (AI Draft Rescue) */}
              <Box p={{ base: rem(24), md: rem(30) }} bg={active.surface} style={{ border: `2px solid ${active.accent}`, display: 'flex', flexDirection: 'column' }}>
                <Stack gap="xl" flex={1}>
                  <Box>
                    <Badge radius={0} color={active.accent} mb="md">SPECIALIZED — PROTOTYPE RESCUE</Badge>
                    <Title order={3} style={{ fontSize: rem(26), fontFamily: 'var(--font-serif)' }}>Evidence Reconstruction</Title>
                    <Text size="sm" c="dimmed" mt="xs">Transform exploratory or AI-assisted drafts into authentic, verified scholarship.</Text>
                  </Box>

                  <Stack gap="sm">
                    {['Passage-Grounded Citation Audit', 'Replace & Repair Hallucinated Sources', '100% Human-Authored Prose Rewrite', 'Zero AI-Detection & Complete Integrity'].map((item, i) => (
                      <Group key={i} gap="xs" align="flex-start">
                        <IconCheck size={16} color={active.accent} stroke={3} style={{ marginTop: rem(2) }} />
                        <Text size="sm" fw={600}>{item}</Text>
                      </Group>
                    ))}
                  </Stack>

                  <Divider color="oklch(0% 0 0 / 0.05)" />

                  <Box>
                    <Group justify="space-between" mb="xs">
                      <Text size="xs" fw={700} c="dimmed" style={{ letterSpacing: '0.05em' }}>WORD COUNT</Text>
                      <Text size="sm" fw={700} c={active.primary}>{wordCount.toLocaleString()} words</Text>
                    </Group>
                    <Slider
                      value={wordCount}
                      onChange={setWordCount}
                      min={5000}
                      max={120000}
                      step={5000}
                      label={(val) => `${val.toLocaleString()} words`}
                      color={active.accent}
                      radius={0}
                      size="sm"
                      thumbSize={16}
                      styles={{
                        track: { backgroundColor: 'oklch(0% 0 0 / 0.05)' },
                      }}
                    />
                  </Box>

                  <Divider color="oklch(0% 0 0 / 0.05)" />

                  <Group justify="space-between" align="flex-end" mt="auto">
                    <Stack gap={2}>
                      <Text size="xs" c="dimmed" fw={600} style={{ letterSpacing: '0.05em' }}>ESTIMATED FEE</Text>
                      <Text fw={700} size="xl" style={{ fontSize: rem(24), fontFamily: 'var(--font-serif)', color: active.accent, lineHeight: 1.1 }}>
                        ${(wordCount * 0.07).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Text>
                      <Text size="xs" c="dimmed" style={{ fontSize: rem(10) }}>$0.07 / word rate · Full Audit & Grounding</Text>
                    </Stack>
                    <Link href={`/scholarcrafted/request-review?service=EvidenceReconstruction&wordCount=${wordCount}`} style={{ textDecoration: 'none' }}>
                      <Button size="sm" variant="filled" bg={active.accent} radius={0} className="impeccable-button" style={{ color: '#fff' }}>
                        Rescue Draft
                      </Button>
                    </Link>
                  </Group>
                </Stack>
              </Box>
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* The Logistics (Simplified) */}
      <Box py={rem(100)} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}08` }}>
        <Container size={INNER_WIDTH}>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(60)}>
            <Stack gap="md" align="center" style={{ textAlign: 'center' }}>
              <ThemeIcon size={48} radius="xl" variant="light" color={active.accent}>
                <IconClock size={24} />
              </ThemeIcon>
              <Text fw={700} style={{ letterSpacing: '0.05em' }}>TURNAROUND</Text>
              <Text size="sm" c="dimmed" lh={1.6}>Typically 10-14 business days for full manuscripts. 7-10 days for proposals.</Text>
            </Stack>
            <Stack gap="md" align="center" style={{ textAlign: 'center' }}>
              <ThemeIcon size={48} radius="xl" variant="light" color={active.accent}>
                <IconScale size={24} />
              </ThemeIcon>
              <Text fw={700} style={{ letterSpacing: '0.05em' }}>ETHICAL BOUNDARY</Text>
              <Text size="sm" c="dimmed" lh={1.6}>Strict adherence to academic integrity. No ghostwriting or original data analysis.</Text>
            </Stack>
            <Stack gap="md" align="center" style={{ textAlign: 'center' }}>
              <ThemeIcon size={48} radius="xl" variant="light" color={active.accent}>
                <IconShieldCheck size={24} />
              </ThemeIcon>
              <Text fw={700} style={{ letterSpacing: '0.05em' }}>THE GUARANTEE</Text>
              <Text size="sm" c="dimmed" lh={1.6}>Committee-ready assurance. If revisions are requested for our editing, we perform them at no cost.</Text>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box component="section" className="academic-watermark" py={SECTION_SPACING} bg={active.background} style={{ borderTop: `1px solid ${active.primary}08` }}>
        <Container size={800}>
          <Stack gap="xl">
            <Box style={{ textAlign: 'center' }}>
              <Text size="xs" c="dimmed" fw={700} style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>FAQ</Text>
              <Title order={2} mt="md" style={{ fontSize: rem(36), color: active.primary, fontFamily: 'var(--font-serif)' }}>Logistics & Policies</Title>
            </Box>
            <Accordion variant="separated">
              {faqs.map((faq: any, i: number) => (
                <Accordion.Item key={i} value={`faq-${i}`} style={{ backgroundColor: active.surface, border: '1px solid #eee' }}>
                  <Accordion.Control style={{ fontWeight: 600, color: active.primary }}>{faq.q}</Accordion.Control>
                  <Accordion.Panel>
                    <Text size="md" lh={1.7} c="dimmed">{faq.a}</Text>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Stack>
        </Container>
      </Box>

      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={true}
        centered
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        styles={{
          content: {
            backgroundColor: active.surface,
            border: `1px solid #eee`,
            borderRadius: 0,
          },
          header: {
            backgroundColor: active.surface,
          } }}
      >
        <Box p="md" style={{ textAlign: 'center' }}>
          <Title
            order={2}
            style={{
              fontSize: rem(32),
              color: active.primary }}
            mb="xl"
          >
            Secure Your Resource
          </Title>

          {!submitted ? (
            <Stack gap="xl">
              <Text size="sm" c="dimmed" lh={1.6}>
                You are about to download <strong>{selectedResource}</strong>. Please enter your preferred email address to receive your secure download link.
              </Text>
              <Stack gap="md">
                <TextInput
                  placeholder="Your Email Address"
                  radius={0}
                  size="md"
                  styles={{
                    input: {
                      border: `1px solid #eee`,
                      '&:focus': {
                        borderColor: active.primary,
                      },
                    } }}
                />
                <Button
                  fullWidth
                  size="md"
                  radius={0}
                  variant="filled"
                  bg={active.primary}
                  onClick={() => setSubmitted(true)}
                >
                  Send My Download
                </Button>
              </Stack>
              <Text size="xs" c="dimmed" style={{ textAlign: 'center' }}>
                We respect your privacy. Unsubscribe at any time.
              </Text>
            </Stack>
          ) : (
            <Stack gap="xl" align="center" style={{ textAlign: 'center' }} py="xl">
              <ThemeIcon size={64} radius="xl" color="green" variant="light">
                <IconCheck size={32} />
              </ThemeIcon>
              <Box>
                <Title order={3} >
                  Download Sent!
                </Title>
                <Text size="sm" c="dimmed" mt="sm">
                  Check your inbox. We&apos;ve sent <strong>{selectedResource}</strong> directly to you.
                </Text>
              </Box>
              <Button variant="outline" color={active.primary} radius={0} fullWidth onClick={close}>
                Close
              </Button>
            </Stack>
          )}
        </Box>
      </Modal>

      <Footer />
    </Box>
  )
}
