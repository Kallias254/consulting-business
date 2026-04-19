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
  rem,
  Accordion,
  Group,
} from '@mantine/core'
import { Navbar } from '../../_components/Navbar'
import { Footer } from '../../_components/Footer'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const SECTION_SPACING = rem(120)
const INNER_WIDTH = 760

const serviceData: Record<string, any> = {
  'dissertation-coaching': {
    title: 'Dissertation Coaching',
    heroSubtitle: 'Strategic partnership for the long haul.',
    problem:
      'Dissertation writing is an inherently isolated process. Without structured feedback and strategic pacing, even the most brilliant projects can stall in the "all-but-dissertation" phase.',
    whoItIsFor: [
      'Doctoral candidates feeling "stuck" or overwhelmed by the scale of their project.',
      'Researchers struggling to balance writing with professional or personal obligations.',
      'Students looking for a rigorous, high-level advising relationship beyond what their committee can provide.',
    ],
    whatWeDo: [
      {
        title: 'Strategic Planning',
        desc: 'We help you break down your dissertation into manageable, high-impact milestones.',
      },
      {
        title: 'Conceptual Alignment',
        desc: 'Ensuring your research questions, methodology, and findings maintain rigorous internal logic.',
      },
      {
        title: 'Accountability Loops',
        desc: 'Regular check-ins and hard deadlines to maintain momentum and combat isolation.',
      },
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Initial Review',
        desc: 'We assess your current manuscript, committee feedback, and project timeline.',
      },
      {
        step: '02',
        title: 'Roadmap Development',
        desc: 'Creation of a customized pacing strategy with specific, achievable milestones.',
      },
      {
        step: '03',
        title: 'Iterative Coaching',
        desc: 'Weekly or bi-weekly deep-dive sessions to review progress and solve conceptual blocks.',
      },
    ],
    faqs: [
      {
        q: 'How often do we meet?',
        a: 'Typically weekly or bi-weekly, depending on your current phase and timeline.',
      },
      {
        q: 'Does this replace my committee?',
        a: 'No. Our role is to prepare you to defend your work more effectively before your committee.',
      },
    ],
  },
  'editing-proofreading': {
    title: 'Editing & Proofreading',
    heroSubtitle: 'Refining the architecture of your argument.',
    problem:
      'An academic manuscript is judged not just on its data, but on the clarity and rigor of its presentation. Structural inconsistencies can mask brilliant research.',
    whoItIsFor: [
      'Candidates preparing for final submission to their committee.',
      'Researchers looking to transform a draft into a publishable book or article.',
      'Non-native English speakers who need their complex ideas expressed with native-level precision.',
    ],
    whatWeDo: [
      {
        title: 'Developmental Editing',
        desc: 'Macro-level assessment of argument flow, chapter sequencing, and structural logic.',
      },
      {
        title: 'Stylistic Refinement',
        desc: 'Enhancing the clarity, tone, and professional weight of your academic prose.',
      },
      {
        title: 'Technical Precision',
        desc: 'Rigorous checking of citations, formatting, and disciplinary standards.',
      },
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Diagnostic Read',
        desc: 'We perform a macro-level review of your manuscript to identify structural needs.',
      },
      {
        step: '02',
        title: 'Collaborative Edit',
        desc: 'We apply structural and stylistic changes, providing detailed notes on logical flow.',
      },
      {
        step: '03',
        title: 'Final Polishing',
        desc: 'A rigorous technical check for citation accuracy and formatting compliance.',
      },
    ],
    faqs: [
      {
        q: 'What is your turnaround time?',
        a: 'Typically 2-4 weeks depending on the length and current state of the manuscript.',
      },
      {
        q: 'Do you use AI?',
        a: 'No. Every edit is performed by a PhD-level editor with experience in your field.',
      },
    ],
  },
}

export default function ServiceDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const data = serviceData[slug] || serviceData['dissertation-coaching']

  return (
    <Box bg="white" style={{ minHeight: '100vh', color: '#111' }}>
      <Navbar />

      {/* Hero Section */}
      <Box component="section" pt={rem(100)} pb={SECTION_SPACING}>
        <Container size={1100}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(80)}>
            <Stack gap="xl" justify="center">
              <Stack gap="xs">
                <Text
                  size="xs"
                  fw={700}
                  style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                  c="dimmed"
                >
                  {data.heroSubtitle}
                </Text>
                <Title
                  order={1}
                  style={{
                    fontSize: rem(56),
                    fontWeight: 400,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {data.title}
                </Title>
              </Stack>
              <Text size="lg" lh={1.7} c="dimmed" style={{ fontSize: rem(20) }}>
                {data.problem}
              </Text>
              <Link href="/scholarcrafted/consultation" style={{ textDecoration: 'none' }}>
                <Button size="lg" variant="filled" color="dark.9" radius={0}>
                  BOOK A CONSULTATION
                </Button>
              </Link>
            </Stack>
            <Box bg="#F9F8F6" p={rem(60)} style={{ border: '1px solid #eee' }}>
              <Stack gap="xl">
                <Title
                  order={3}
                  style={{ fontWeight: 400, fontSize: rem(28), fontFamily: 'var(--font-serif)' }}
                >
                  Who this is for
                </Title>
                <Stack gap="lg">
                  {data.whoItIsFor.map((item: string, i: number) => (
                    <Group key={i} align="flex-start" gap="md" wrap="nowrap">
                      <Box
                        w={6}
                        h={6}
                        mt={10}
                        bg="dark.2"
                        style={{ borderRadius: '50%', flexShrink: 0 }}
                      />
                      <Text size="sm" lh={1.6} fw={500}>
                        {item}
                      </Text>
                    </Group>
                  ))}
                </Stack>
              </Stack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* What we do */}
      <Box
        component="section"
        py={SECTION_SPACING}
        bg="#F9F8F6"
        style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}
      >
        <Container size={1100}>
          <Stack gap={rem(60)}>
            <Box>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c="dimmed"
              >
                What We Do
              </Text>
              <Title order={2} mt="md" style={{ fontSize: rem(42), fontWeight: 400 }}>
                Deliverables & Focus
              </Title>
            </Box>
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={rem(60)}>
              {data.whatWeDo.map((item: any, i: number) => (
                <Stack key={i} gap="md">
                  <Text
                    fw={700}
                    size="xs"
                    style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}
                  >
                    {item.title}
                  </Text>
                  <Text size="sm" lh={1.6} c="dimmed">
                    {item.desc}
                  </Text>
                </Stack>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* How it works */}
      <Box component="section" py={SECTION_SPACING}>
        <Container size={1100}>
          <SimpleGrid cols={{ base: 1, md: 4 }} spacing={rem(80)}>
            <Box>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c="dimmed"
              >
                How It Works
              </Text>
            </Box>
            <Box style={{ gridColumn: 'span 3' }}>
              <Stack gap={rem(60)}>
                <Title
                  order={2}
                  style={{ fontSize: rem(42), fontWeight: 400, letterSpacing: '-0.02em' }}
                >
                  A guided, iterative process toward submission.
                </Title>
                <Stack gap={0}>
                  {data.howItWorks.map((item: any, i: number) => (
                    <Box key={i} py="xl" style={{ borderTop: '1px solid #eee' }}>
                      <SimpleGrid cols={{ base: 1, sm: 2 }}>
                        <Group gap="xl">
                          <Text
                            style={{
                              fontFamily: 'var(--font-serif)',
                              fontSize: rem(24),
                              opacity: 0.3,
                            }}
                          >
                            {item.step}
                          </Text>
                          <Text fw={600} size="lg">
                            {item.title}
                          </Text>
                        </Group>
                        <Text size="sm" c="dimmed" lh={1.6}>
                          {item.desc}
                        </Text>
                      </SimpleGrid>
                    </Box>
                  ))}
                  <Divider />
                </Stack>
              </Stack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box component="section" py={SECTION_SPACING} bg="white">
        <Container size={INNER_WIDTH}>
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
              <Title order={2} mt="md" style={{ fontSize: rem(36), fontWeight: 400 }}>
                Common Concerns
              </Title>
            </Box>
            <Accordion
              variant="separated"
              radius={0}
              styles={{
                item: { border: '1px solid #eee', backgroundColor: 'white' },
                control: { padding: rem(24) },
                panel: { padding: rem(24), color: '#333' },
              }}
            >
              {data.faqs.map((faq: any, i: number) => (
                <Accordion.Item key={i} value={`faq-${i}`}>
                  <Accordion.Control style={{ fontWeight: 600, fontSize: rem(18) }}>
                    <Text fw={600} size="lg" c="dark.9">
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

      {/* Final CTA */}
      <Box
        component="section"
        py={SECTION_SPACING}
        bg="#F9F8F6"
        style={{ borderTop: '1px solid #eee' }}
      >
        <Container size={INNER_WIDTH}>
          <Stack align="center" style={{ textAlign: 'center' }} gap="xl">
            <Title order={2} style={{ fontSize: rem(48), fontWeight: 400 }}>
              Ready to begin?
            </Title>
            <Text size="lg" c="dimmed" lh={1.6}>
              We accept a limited number of projects per term to maintain the highest standard of
              individual oversight.
            </Text>
            <Link href="/scholarcrafted/consultation" style={{ textDecoration: 'none' }}>
              <Button size="xl" variant="filled" color="dark.9" radius={0} px={rem(60)}>
                BOOK A CONSULTATION
              </Button>
            </Link>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
