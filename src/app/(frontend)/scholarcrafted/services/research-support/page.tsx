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
} from '@mantine/core'
import { Navbar } from '../../_components/Navbar'
import { Footer } from '../../_components/Footer'
import Link from 'next/link'
import { IconCheck, IconArrowRight, IconMessageChatbot, IconShieldCheck, IconRocket } from '@tabler/icons-react'

const SECTION_SPACING = rem(120)
const INNER_WIDTH = 1100

const faqs = [
  {
    q: 'What software do you support?',
    a: 'We have specialists in SPSS, R, STATA, NVivo, ATLAS.ti, MAXQDA, and more. Please specify your needs in your inquiry.',
  },
  {
    q: 'Can you help with survey design?',
    a: 'Yes, we can provide expert guidance on constructing methodologically sound surveys for quantitative or qualitative research, including validity and reliability testing.',
  },
  {
    q: 'Is this service confidential?',
    a: 'Absolutely. All data and research materials are handled with the strictest academic confidentiality. We are happy to sign an NDA upon request.',
  },
  {
    q: 'Will you write my methodology chapter?',
    a: 'No. We provide the technical support, analysis outputs, and coding structures, but you remain the sole author of your manuscript. We do not provide ghostwriting services.',
  },
]

export default function ResearchSupportPage() {
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
              Technical Assistance
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
                fontFamily: 'var(--font-serif)',
              }}
            >
              Custom Research & Data Support
            </Title>
            <Text size="lg" mt="xl" c="dimmed" lh={1.6} style={{ fontSize: rem(20) }}>
              Prearranged offline support tailored to your exact needs, including literature mapping, survey construction, qualitative coding, and statistical analysis.
            </Text>
            
            <Link href="/scholarcrafted/consultation?interest=data_support&metBefore=no" style={{ textDecoration: 'none' }}>
              <Button size="xl" variant="filled" bg={active.primary} radius={0} mt={rem(40)} px={rem(40)}>
                FREE INTRODUCTORY CALL
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>

      {/* Why Choose Custom Research Support */}
      <Box py={rem(80)} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}22` }}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(40)}>
            <Box>
              <Title order={2} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
                Why Choose Custom Research Support?
              </Title>
              <Text c="dimmed" mt="md" size="lg" lh={1.7} style={{ maxWidth: 800 }}>
                Quantitative and qualitative methodologies require extreme precision. A single flaw in your survey instrument or statistical model can derail your entire findings chapter.
              </Text>
            </Box>
            <Stack gap="lg">
              {[
                { title: 'Methodological Defensibility', desc: 'Ensure your research design stands up to the most rigorous committee scrutiny.' },
                { title: 'Accelerated Timelines', desc: 'Stop struggling with SPSS, R, or NVivo. Let our specialists handle the technical heavy lifting so you can focus on writing.' },
                { title: 'Data Integrity', desc: 'Eliminate errors in your dataset, coding scheme, or statistical outputs before they become major revisions.' },
              ].map((item, i) => (
                <Group key={i} align="flex-start" wrap="nowrap" gap="md">
                  <ThemeIcon size={24} radius="xl" variant="light" color="dark" style={{ marginTop: rem(4) }}>
                    <IconCheck size={14} stroke={2} />
                  </ThemeIcon>
                  <Box>
                    <Text fw={700} size="md" c={active.primary}>{item.title}</Text>
                    <Text size="sm" c="dimmed" lh={1.6}>{item.desc}</Text>
                  </Box>
                </Group>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Core Technical Deliverables */}
      <Box py={SECTION_SPACING} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(60)}>
            <Box>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c={active.accent}
              >
                The Analytical Framework
              </Text>
              <Title order={3} mt="sm" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: rem(36) }}>
                Core Technical Deliverables
              </Title>
              <Text size="lg" lh={1.7} c="dimmed" mt="md" style={{ maxWidth: 800 }}>
                We provide comprehensive technical support for both qualitative and quantitative research designs, ensuring your methodology is bulletproof.
              </Text>
            </Box>
            
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(60)}>
              <Box>
                <Text fw={700} style={{ letterSpacing: '0.1em', textTransform: 'uppercase', color: active.primary }} size="sm" mb="md">
                  1. Qualitative Coding & Analysis
                </Text>
                <Text c="dimmed" lh={1.6} mb="lg">
                  Rigorous thematic extraction and qualitative framework development. We ensure your qualitative data is systematic, transparent, and reproducible.
                </Text>
                <SimpleGrid cols={2} spacing="sm">
                  {['NVivo / ATLAS.ti', 'Codebook Development', 'Thematic Extraction', 'Interview Protocol Review'].map((item, i) => (
                    <Group key={i} align="center" gap="sm" wrap="nowrap">
                      <IconCheck size={18} color={active.accent || active.primary} />
                      <Text size="sm" fw={500} c="dimmed">{item}</Text>
                    </Group>
                  ))}
                </SimpleGrid>
              </Box>

              <Box>
                <Text fw={700} style={{ letterSpacing: '0.1em', textTransform: 'uppercase', color: active.primary }} size="sm" mb="md">
                  2. Quantitative & Statistical Support
                </Text>
                <Text c="dimmed" lh={1.6} mb="lg">
                  Advanced statistical modeling and survey instrument validation. We provide clean, organized outputs ready for your interpretation.
                </Text>
                <SimpleGrid cols={2} spacing="sm">
                  {['SPSS / R / STATA', 'Descriptive Statistics', 'Inferential Statistics', 'Survey Construction & Validation'].map((item, i) => (
                    <Group key={i} align="center" gap="sm" wrap="nowrap">
                      <IconCheck size={18} color={active.accent || active.primary} />
                      <Text size="sm" fw={500} c="dimmed">{item}</Text>
                    </Group>
                  ))}
                </SimpleGrid>
              </Box>
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* What You'll Gain */}
      <Box py={SECTION_SPACING} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}22` }}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(60)} align="center" style={{ textAlign: 'center' }}>
            <Box style={{ maxWidth: 700 }}>
              <Title order={2} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: rem(42) }}>
                What You&rsquo;ll Gain
              </Title>
              <Text c="dimmed" mt="md" size="lg">
                Beyond raw data processing, our support provides a comprehensive elevation of your entire methodology chapter.
              </Text>
            </Box>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl" style={{ textAlign: 'left' }}>
              <Box p={rem(32)} bg={active.background} style={{ border: `1px solid ${active.primary}22` }}>
                <Text fw={700} size="lg" mb="sm">Institutional Alignment</Text>
                <Text size="sm" c="dimmed" lh={1.6}>We ensure your methodological approach strictly adheres to your university&rsquo;s specific guidelines, removing a major hurdle to final defense approval.</Text>
              </Box>
              <Box p={rem(32)} bg={active.background} style={{ border: `1px solid ${active.primary}22` }}>
                <Text fw={700} size="lg" mb="sm">Elevated Analysis</Text>
                <Text size="sm" c="dimmed" lh={1.6}>We don&rsquo;t just run the numbers or extract themes; we help organize the outputs so you can easily interpret them in the context of your core research questions.</Text>
              </Box>
              <Box p={rem(32)} bg={active.background} style={{ border: `1px solid ${active.primary}22` }}>
                <Text fw={700} size="lg" mb="sm">Structural Integrity</Text>
                <Text size="sm" c="dimmed" lh={1.6}>We validate your instruments to ensure they accurately measure exactly what they claim to measure, preventing critical flaws in your findings.</Text>
              </Box>
              <Box p={rem(32)} bg={active.background} style={{ border: `1px solid ${active.primary}22` }}>
                <Text fw={700} size="lg" mb="sm">Peace of Mind</Text>
                <Text size="sm" c="dimmed" lh={1.6}>Handing the raw data processing over to a specialist allows you to step away and return refreshed for the critical interpretation and discussion phase.</Text>
              </Box>
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* Editing vs Consulting - DEDICATED SECTION */}
      <Box py={SECTION_SPACING} bg={active.background}>
        <Container size={800}>
          <Stack gap="xl" align="center" style={{ textAlign: 'center' }}>
            <Text
              size="xs"
              fw={700}
              style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
              c={active.accent}
            >
              Crucial Distinction
            </Text>
            <Title order={2} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: rem(36) }}>
              Technical Support vs. Consulting
            </Title>
            <Text size="lg" c="dimmed" lh={1.7}>
              It is important to differentiate between our asynchronous technical support and our live coaching.
            </Text>
            
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl" mt="md" style={{ textAlign: 'left', width: '100%' }}>
              <Box p={rem(32)} bg={active.surface} style={{ borderLeft: `4px solid ${active.primary}` }}>
                <Text fw={700} size="lg" mb="xs">Custom Data Support</Text>
                <Text size="sm" c="dimmed" lh={1.6}>
                  An asynchronous service where you hand over raw data or instruments. We process the technical aspects (coding, statistics) offline and return organized outputs.
                </Text>
              </Box>
              <Box p={rem(32)} bg={active.surface} style={{ borderLeft: `4px solid ${active.accent}` }}>
                <Text fw={700} size="lg" mb="xs">Live Consulting</Text>
                <Text size="sm" c="dimmed" lh={1.6}>
                  A real-time instructional opportunity (1-on-1 coaching) meant to teach you <i>how</i> to conduct the research yourself, overcome roadblocks, or prepare for defense.
                </Text>
              </Box>
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* How It Works - DEDICATED SECTION */}
      <Box py={SECTION_SPACING} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}22` }}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(60)} align="center" style={{ textAlign: 'center' }}>
            <Box style={{ maxWidth: 700 }}>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c="dimmed"
              >
                The Process
              </Text>
              <Title order={2} mt="sm" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: rem(42) }}>
                How It Works
              </Title>
              <Text c="dimmed" mt="md" size="lg">
                A seamless, professional workflow designed to align your data with rigorous methodological standards.
              </Text>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(60)} mt="lg">
              <Stack align="center" gap="md">
                <ThemeIcon size={64} radius="xl" variant="light" color="dark">
                  <IconMessageChatbot size={32} stroke={1.5} />
                </ThemeIcon>
                <Text fw={700} size="lg">
                  01. Initial Assessment
                </Text>
                <Text size="sm" c="dimmed" lh={1.6}>
                  Book a free introductory call to discuss your specific data needs, software requirements, and methodological approach.
                </Text>
              </Stack>
              <Stack align="center" gap="md">
                <ThemeIcon size={64} radius="xl" variant="light" color="dark">
                  <IconShieldCheck size={32} stroke={1.5} />
                </ThemeIcon>
                <Text fw={700} size="lg">
                  02. Scope & Secure Transfer
                </Text>
                <Text size="sm" c="dimmed" lh={1.6}>
                  We provide a precise quote and timeline. Upon agreement, you securely transfer your raw data, codebooks, or instruments to our specialists.
                </Text>
              </Stack>
              <Stack align="center" gap="md">
                <ThemeIcon size={64} radius="xl" variant="light" color="dark">
                  <IconRocket size={32} stroke={1.5} />
                </ThemeIcon>
                <Text fw={700} size="lg">
                  03. Execution & Delivery
                </Text>
                <Text size="sm" c="dimmed" lh={1.6}>
                  We perform the rigorous technical analysis and deliver clean, organized outputs ready for you to interpret and write into your final manuscript.
                </Text>
              </Stack>
            </SimpleGrid>

            <Center mt={rem(40)}>
              <Link
                href="/scholarcrafted/consultation?interest=data_support&metBefore=no"
                style={{ textDecoration: 'none' }}
              >
                <Button size="xl" variant="filled" bg={active.primary} radius={0} px={rem(40)}>
                  FREE INTRODUCTORY CALL
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
                style={{ fontSize: rem(36), fontWeight: 400, color: active.primary, fontFamily: 'var(--font-serif)' }}
              >
                Common Questions
              </Title>
            </Box>
            <Accordion
              variant="separated"
              radius={0}
              styles={{
                item: { border: `1px solid ${active.primary}22`, backgroundColor: active.surface },
                control: { padding: rem(24) },
                panel: { padding: rem(24) },
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
                    <Text size="md" lh={1.7} c="dimmed">
                      {faq.a}
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Stack>
        </Container>
      </Box>

      {/* Explore Other Services */}
      <Box py={SECTION_SPACING} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}22` }}>
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(60)}>
            <Box style={{ textAlign: 'center' }}>
              <Title order={2} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: rem(36) }}>
                Explore Other Services
              </Title>
              <Text size="lg" c="dimmed" mt="md">
                Need a different type of support? We have you covered.
              </Text>
            </Box>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
              <Box p={rem(40)} bg={active.background} style={{ border: `1px solid ${active.primary}22`, display: 'flex', flexDirection: 'column' }}>
                <Stack gap="xl" flex={1}>
                  <Stack gap="xs">
                    <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.1em' }}>
                      MANUSCRIPT REFINEMENT
                    </Text>
                    <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
                      Structural Editing & Proofreading
                    </Title>
                  </Stack>
                  <Text size="sm" c="dimmed" lh={1.6}>
                    From macro-level argument flow to micro-level prose precision, we ensure your research is presented with the clarity, tone, and authority expected by your committee.
                  </Text>
                </Stack>
                <Box mt={rem(40)}>
                  <Link href="/scholarcrafted/services/editing-proofreading" style={{ textDecoration: 'none' }}>
                    <Button variant="outline" color={active.primary} radius={0} fullWidth style={{ borderColor: active.primary }}>
                      View Editing Services
                    </Button>
                  </Link>
                </Box>
              </Box>

              <Box p={rem(40)} bg={active.background} style={{ border: `1px solid ${active.primary}22`, display: 'flex', flexDirection: 'column' }}>
                <Stack gap="xl" flex={1}>
                  <Stack gap="xs">
                    <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.1em' }}>
                      1-ON-1 GUIDANCE
                    </Text>
                    <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
                      Live Academic Coaching
                    </Title>
                  </Stack>
                  <Text size="sm" c="dimmed" lh={1.6}>
                    A strategic partnership to help you overcome roadblocks, manage your project, and finish with confidence. Perfect for when you are stuck and need real-time instructional support.
                  </Text>
                </Stack>
                <Box mt={rem(40)}>
                  <Link href="/scholarcrafted/services/private-coaching" style={{ textDecoration: 'none' }}>
                    <Button variant="outline" color={active.primary} radius={0} fullWidth style={{ borderColor: active.primary }}>
                      View Coaching Services
                    </Button>
                  </Link>
                </Box>
              </Box>
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
