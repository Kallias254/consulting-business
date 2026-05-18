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
  Divider,
  Center,
  rem,
  Group,
  useMantineTheme,
  Accordion,
  ThemeIcon,
  Badge,
} from '@mantine/core'
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
  IconScale
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

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* Hero Section */}
      <Box component="section" pt={rem(140)} pb={rem(100)} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <Box style={{ maxWidth: 850 }}>
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
              mt="md"
              style={{
                fontSize: rem(64),
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: active.primary,
                fontFamily: 'var(--font-serif)'
              }}
            >
              Precision structural editing <br />
              for doctoral scholars.
            </Title>
            <Text size="lg" mt="xl" c="dimmed" lh={1.6} style={{ fontSize: rem(22), maxWidth: 700 }}>
              Move from a working draft to a submission-ready manuscript with the clarity, 
              tone, and authority required by your committee.
            </Text>
            
            <Group gap="md" mt={rem(50)}>
              <Link href="/scholarcrafted/request-review?service=Structural%20Editing%20%26%20Proofreading" style={{ textDecoration: 'none' }}>
                <Button size="xl" variant="filled" bg={active.primary} radius={0} style={{ paddingLeft: rem(40), paddingRight: rem(40) }}>
                  GET A FREE QUOTE
                </Button>
              </Link>
              <Button 
                size="xl" 
                variant="outline" 
                color={active.primary} 
                radius={0} 
                leftSection={<IconDownload size={20} />}
                onClick={() => window.open('/docs/editing_services_guide.md', '_blank')}
                style={{ borderColor: active.primary }}
              >
                DOWNLOAD SERVICES GUIDE
              </Button>
            </Group>
          </Box>
        </Container>
      </Box>

      {/* The Scholar's Standard (Trust Section) */}
      <Box py={rem(100)} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}08` }}>
        <Container size={INNER_WIDTH}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(80)} align="center">
            <Stack gap="xl">
              <Box>
                <Text size="xs" c={active.accent} fw={700} style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }} mb="sm">
                  The Quality Guarantee
                </Text>
                <Title order={2} style={{ fontSize: rem(48), color: active.primary, fontFamily: 'var(--font-serif)' }}>
                  A higher standard of <br />academic rigor.
                </Title>
              </Box>
              <Text size="lg" c="dimmed" lh={1.7}>
                Our editors are not just "proofreaders"—they are PhD-level academics who understand the 
                nuance of your discipline. We don&apos;t just check for typos; we ensure your argument carries 
                the authoritative voice expected by senior faculty.
              </Text>
              <Stack gap="md">
                {[
                  'PhD-level subject matter expertise',
                  'Strict adherence to institutional guidelines',
                  'No-risk satisfaction guarantee on revisions',
                  'Asynchronous, secure manuscript handling'
                ].map((item, i) => (
                  <Group key={i} gap="sm">
                    <IconCheck size={18} color={active.accent} stroke={3} />
                    <Text fw={600} size="sm" c={active.primary}>{item}</Text>
                  </Group>
                ))}
              </Stack>
            </Stack>
            <Box p={rem(60)} bg="white" style={{ border: `1px solid oklch(0% 0 0 / 0.08)`, boxShadow: '0 4px 24px oklch(0% 0 0 / 0.02)' }}>
              <Stack gap="md" align="center" style={{ textAlign: 'center' }}>
                <ThemeIcon size={64} radius="xl" variant="light" color={active.accent}>
                  <IconShieldCheck size={32} />
                </ThemeIcon>
                <Title order={3} style={{ fontSize: rem(28) }}>The Guarantee</Title>
                <Text size="sm" c="dimmed" lh={1.7}>
                  If your committee requests revisions related specifically to the editing we performed, 
                  we will undertake those revisions at no additional cost. We stand by our rigor.
                </Text>
              </Stack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Levels of Service (Simplified) */}
      <Box py={SECTION_SPACING} bg={active.background}>
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

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(32)}>
              <Box p={rem(48)} bg={active.surface} style={{ border: `1px solid oklch(0% 0 0 / 0.08)` }}>
                <Stack gap="xl">
                  <Box>
                    <Badge radius={0} color={active.primary} mb="md">MOST POPULAR</Badge>
                    <Title order={3} style={{ fontSize: rem(32) }}>Dissertation & Thesis Formatting</Title>
                    <Text size="md" c="dimmed" mt="sm">The gold standard for final-stage manuscripts.</Text>
                  </Box>
                  <Stack gap="sm">
                    {['APA, MLA, Chicago Compliance', 'Mechanical & Grammatical Polish', 'Reference & Citation Audit', 'Table of Contents & Pagination'].map((item, i) => (
                      <Group key={i} gap="xs">
                        <IconCheck size={16} color={active.accent} stroke={3} />
                        <Text size="sm" fw={600}>{item}</Text>
                      </Group>
                    ))}
                  </Stack>
                  <Divider color="oklch(0% 0 0 / 0.05)" />
                  <Group justify="space-between">
                    <Text fw={700} size="lg">$0.044 / word</Text>
                    <Link href="/scholarcrafted/request-review" style={{ textDecoration: 'none' }}>
                      <Button variant="filled" bg={active.primary} radius={0}>Get Quote</Button>
                    </Link>
                  </Group>
                </Stack>
              </Box>

              <Box p={rem(48)} bg={active.surface} style={{ border: `1px solid oklch(0% 0 0 / 0.08)` }}>
                <Stack gap="xl">
                  <Box>
                    <Badge radius={0} variant="outline" color={active.primary} mb="md">TECHNICAL</Badge>
                    <Title order={3} style={{ fontSize: rem(32) }}>Targeted Technical Support</Title>
                    <Text size="md" c="dimmed" mt="sm">Hourly assistance for specific technical hurdles.</Text>
                  </Box>
                  <Stack gap="sm">
                    {['Reference List Reconstruction', 'Citation Cross-checking', 'ProQuest Compliance', 'Complex Table/Figure Assembly'].map((item, i) => (
                      <Group key={i} gap="xs">
                        <IconCheck size={16} color={active.accent} stroke={3} />
                        <Text size="sm" fw={600}>{item}</Text>
                      </Group>
                    ))}
                  </Stack>
                  <Divider color="oklch(0% 0 0 / 0.05)" />
                  <Group justify="space-between">
                    <Text fw={700} size="lg">$90 / hour</Text>
                    <Link href="/scholarcrafted/request-review" style={{ textDecoration: 'none' }}>
                      <Button variant="outline" color={active.primary} radius={0} style={{ borderColor: active.primary }}>Enquire</Button>
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
                <IconDownload size={24} />
              </ThemeIcon>
              <Text fw={700} style={{ letterSpacing: '0.05em' }}>FULL DETAILS</Text>
              <Text size="sm" c="dimmed" lh={1.6}>Download our Services Guide for complete checklists and post-editing advice.</Text>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box component="section" py={SECTION_SPACING} bg={active.background} style={{ borderTop: `1px solid ${active.primary}08` }}>
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

      <Footer />
    </Box>
  )
}
