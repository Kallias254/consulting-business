'use client'

import React from 'react'
import {
  Container,
  Title,
  Text,
  Box,
  Stack,
  rem,
  useMantineTheme,
  Accordion,
  Button,
  Group,
  Divider,
} from '@mantine/core'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'
import { READING_WIDTH } from '@/layout'
import Link from 'next/link'

export default function FAQPage() {
  const theme = useMantineTheme()
  const active = theme.other

  const serviceFaqs = [
    {
      q: 'How do I know if I need Editing or Consulting?',
      a: "Choose Editing if your draft is fully written and you need mechanical polish, university style-guide compliance (APA, MLA, Chicago), citation auditing, or ProQuest submission prep. Choose Private Coaching (Consulting) if you are stuck outline-wise, struggling to formulate your research design, hitting intense writer's block, or need real-time strategy to respond to complex chair/committee revisions."
    },
    {
      q: 'Can you format to my specific university template?',
      a: 'Yes, absolutely. Our Dissertation & Thesis Formatting service is specifically customized to align perfectly with your department’s exact layout guidelines, margin specs, hierarchical headings, and ProQuest publication rules. We take over the painful work of pagination, Table of Contents alignment, and lists of figures.'
    },
    {
      q: 'How much does Private Coaching cost?',
      a: "Because every doctoral student’s hurdles, research stage, and committee requirements are fully unique, we do not offer rigid pricing for coaching. During your free 15-minute introductory call, we map out your exact needs to build a custom, scoped proposal. This ensures you only pay for the specific guidance structure that will get you to graduation."
    }
  ]

  const integrityFaqs = [
    {
      q: 'Is this service allowed by universities?',
      a: 'Yes. Seeking external expert review, professional editing, formatting, and high-level structural advisory is fully encouraged by graduate chairs. We function as a responsive, faculty-level sounding board—the kind of intensive mentoring that overloaded university committees rarely have the bandwidth to provide. We do not do your work; we guide and refine it.'
    },
    {
      q: 'What is your policy on ghostwriting? / Can you write my dissertation for me?',
      a: 'Under no circumstances do we ghostwrite, draft content, execute statistical analysis, or fabricate original text. We operate under a strict, high-integrity ethical framework. Our role is strictly instructional advisory and editorial refinement. You remain the sole author of your research, thoughts, and findings.'
    },
    {
      q: 'Will my work be treated confidentially?',
      a: 'Yes, without exception. We sign a formal Non-Disclosure & Confidentiality Agreement before you upload a single document or draft. Your research, raw data, personal credentials, and institutional association are strictly protected and never shared, sold, or publicized.'
    }
  ]

  const logisticsFaqs = [
    {
      q: 'Is the consultation really free?',
      a: 'Yes, completely free. The 15-minute introductory call is a confidential strategy session to understand your current research status, pinpoint your committee roadblocks, and determine if our editorial or consulting tracks are a good fit. There is absolutely zero obligation.'
    },
    {
      q: 'I still have questions…',
      a: 'We are fully committed to complete transparency. If you have any remaining logistical or policy questions, please book a free intro call, or reach out directly to us—we will gladly walk you through our entire academic advisory process.'
    }
  ]

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* Hero Section */}
      <Box component="section" pt={rem(100)} pb={rem(80)} bg={active.background}>
        <Container size={READING_WIDTH}>
          <Stack gap="md" style={{ textAlign: 'center' }}>
            <Text
              size="xs"
              fw={700}
              style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}
              c={active.accent}
            >
              FAQ & Policies
            </Text>
            <Title
              order={1}
              style={{
                fontSize: rem(56),
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: active.primary
              }}
            >
              Logistics & Policies
            </Title>
            <Text size="lg" c="dimmed" lh={1.6} style={{ maxWidth: 600, margin: '0 auto' }}>
              Complete clarity on how we protect your academic integrity, structure our services, and guide you to graduation.
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* Accordion Sections */}
      <Box
        component="section"
        py={rem(80)}
        bg={active.surface}
        style={{ borderTop: `1px solid ${active.primary}12` }}
      >
        <Container size={READING_WIDTH}>
          <Stack gap={rem(64)}>
            
            {/* Category 1: Services & Choice */}
            <Box>
              <Title order={2} mb="xl" style={{ fontSize: rem(28), color: active.primary }}>
                Service Clarity & Fit
              </Title>
              <Accordion variant="separated" radius={0}>
                {serviceFaqs.map((faq, i) => (
                  <Accordion.Item
                    key={i}
                    value={`service-faq-${i}`}
                    style={{
                      backgroundColor: active.background,
                      borderColor: 'rgba(0,0,0,0.06)',
                      marginBottom: rem(12)
                    }}
                  >
                    <Accordion.Control style={{ fontWeight: 600, color: active.primary, padding: rem(16) }}>
                      {faq.q}
                    </Accordion.Control>
                    <Accordion.Panel style={{ padding: rem(16) }}>
                      <Text size="md" lh={1.8} c="dimmed">
                        {faq.a}
                      </Text>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Box>

            {/* Category 2: Academic Integrity & Confidentiality */}
            <Box>
              <Title order={2} mb="xl" style={{ fontSize: rem(28), color: active.primary }}>
                Academic Integrity & Privacy
              </Title>
              <Accordion variant="separated" radius={0}>
                {integrityFaqs.map((faq, i) => (
                  <Accordion.Item
                    key={i}
                    value={`integrity-faq-${i}`}
                    style={{
                      backgroundColor: active.background,
                      borderColor: 'rgba(0,0,0,0.06)',
                      marginBottom: rem(12)
                    }}
                  >
                    <Accordion.Control style={{ fontWeight: 600, color: active.primary, padding: rem(16) }}>
                      {faq.q}
                    </Accordion.Control>
                    <Accordion.Panel style={{ padding: rem(16) }}>
                      <Text size="md" lh={1.8} c="dimmed">
                        {faq.a}
                      </Text>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Box>

            {/* Category 3: Logistics & Next Steps */}
            <Box>
              <Title order={2} mb="xl" style={{ fontSize: rem(28), color: active.primary }}>
                Logistics & Booking
              </Title>
              <Accordion variant="separated" radius={0}>
                {logisticsFaqs.map((faq, i) => (
                  <Accordion.Item
                    key={i}
                    value={`logistics-faq-${i}`}
                    style={{
                      backgroundColor: active.background,
                      borderColor: 'rgba(0,0,0,0.06)',
                      marginBottom: rem(12)
                    }}
                  >
                    <Accordion.Control style={{ fontWeight: 600, color: active.primary, padding: rem(16) }}>
                      {faq.q}
                    </Accordion.Control>
                    <Accordion.Panel style={{ padding: rem(16) }}>
                      <Text size="md" lh={1.8} c="dimmed">
                        {faq.a}
                      </Text>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Box>

            <Divider color={`${active.primary}12`} />

            {/* Symmetrical CTA Box */}
            <Stack align="center" gap="lg" style={{ textAlign: 'center' }} py="md">
              <Title order={3} style={{ fontSize: rem(24), color: active.primary }}>
                Ready to un-stall your research?
              </Title>
              <Text size="md" c="dimmed" style={{ maxWidth: 500 }}>
                Book your free 15-minute consultation with Micah, PhD, and map your path directly to graduation.
              </Text>
              <Group gap="md" style={{ width: '100%', maxWidth: rem(450) }} justify="center">
                <Link href="/scholarcrafted/consultation?interest=other&metBefore=no" style={{ textDecoration: 'none', width: '100%' }}>
                  <Button size="lg" bg={active.primary} radius={0} className="impeccable-button" fullWidth>
                    BOOK FREE INTRO CALL
                  </Button>
                </Link>
              </Group>
            </Stack>

          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
