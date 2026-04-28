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
} from '@mantine/core'
import { Navbar } from '../../_components/Navbar'
import { Footer } from '../../_components/Footer'
import Link from 'next/link'
import { IconCheck } from '@tabler/icons-react'

const SECTION_SPACING = rem(120)
const INNER_WIDTH = 1100

const faqs = [
  {
    q: 'What is the turnaround time?',
    a: "Typically 2-4 weeks, depending on the manuscript's length and complexity.",
  },
  {
    q: 'Do you offer citation management?',
    a: 'Yes, we can format your citations to any major style (APA, MLA, Chicago, etc.).',
  },
  {
    q: 'Is this service confidential?',
    a: 'Absolutely. All manuscripts are handled with the strictest academic confidentiality.',
  },
]

export default function EditingProofreadingPage() {
  const theme = useMantineTheme()
  const active = theme.other

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* Hero Section */}
      <Box component="section" pt={rem(100)} pb={rem(80)} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <Box style={{ maxWidth: 800 }}>
            <Text
              size="xs"
              fw={700}
              style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
              c="dimmed"
            >
              Manuscript Refinement
            </Text>
            <Title
              order={1}
              mt="md"
              style={{
                fontSize: rem(56),
                fontWeight: 400,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: active.primary,
              }}
            >
              Structural Editing & Proofreading
            </Title>
            <Text size="lg" mt="xl" c="dimmed" lh={1.6} style={{ fontSize: rem(20) }}>
              From macro-level argument flow to micro-level prose precision, we ensure your research
              is presented with the clarity and authority it deserves.
            </Text>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Box
        component="section"
        py={SECTION_SPACING}
        bg={active.surface}
        style={{ borderTop: `1px solid ${active.primary}22` }}
      >
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(80)}>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(80)}>
              <Stack gap="xl">
                <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
                  The Foundation of a Defensible Thesis
                </Title>
                <Text size="lg" lh={1.7} c="dimmed">
                  Brilliant research can be undermined by a disjointed narrative. Our structural
                  editing service focuses on the architectural integrity of your manuscript,
                  ensuring a logical, coherent, and powerful argument from start to finish.
                </Text>
              </Stack>
              <Stack gap="xl">
                <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
                  Core Editorial Deliverables
                </Title>
                <Stack gap="lg">
                  {[
                    'Argument & Narrative Arc Review',
                    'Chapter Sequencing & Logical Flow Analysis',
                    'Tone & Voice Consistency Check',
                    'Final Proofread for Grammar & Style',
                  ].map((item, i) => (
                    <Group key={i} align="center" gap="md" wrap="nowrap">
                      <IconCheck size={18} color={active.accent} />
                      <Text size="md" fw={500} c="dimmed">
                        {item}
                      </Text>
                    </Group>
                  ))}
                </Stack>
              </Stack>
            </SimpleGrid>

            <Center>
              <Link
                href="/scholarcrafted/request-review?service=Structural%20Editing"
                style={{ textDecoration: 'none' }}
              >
                <Button size="lg" variant="filled" bg={active.primary} radius={0}>
                  GET A QUOTE & SUBMIT YOUR MANUSCRIPT
                </Button>
              </Link>
            </Center>
          </Stack>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box component="section" py={SECTION_SPACING} bg={active.background}>
        <Container size={800}>
          <Stack gap="xl">
            <Box style={{ textAlign: 'center' }}>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c="dimmed"
              >
                FAQ
              </Text>
              <Title
                order={2}
                mt="md"
                style={{ fontSize: rem(36), fontWeight: 400, color: active.primary }}
              >
                Common Questions
              </Title>
            </Box>
            <Accordion
              variant="separated"
              radius={0}
              styles={{
                item: { border: '1px solid #eee', backgroundColor: active.background },
                control: { padding: rem(24) },
                panel: { padding: rem(24), color: '#333' },
              }}
            >
              {faqs.map((faq: any, i: number) => (
                <Accordion.Item key={i} value={`faq-${i}`}>
                  <Accordion.Control style={{ fontWeight: 600, fontSize: rem(18) }}>
                    <Text fw={600} size="lg" c={active.primary}>
                      {faq.q}
                    </Text>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="md" lh={1.7} c="dark.7">
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
    </Box>
  )
}
