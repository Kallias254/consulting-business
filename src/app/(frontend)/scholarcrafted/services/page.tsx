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
  Group,
  useMantineTheme,
} from '@mantine/core'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'
import { IconArrowRight, IconUsers, IconEdit, IconMicroscope } from '@tabler/icons-react'
import Link from 'next/link'

const SECTION_SPACING = rem(120)

const services = [
  {
    title: 'Dissertation Coaching',
    slug: 'dissertation-coaching',
    icon: <IconUsers size={32} stroke={1.5} />,
    description:
      'One-on-one guidance through every stage of your dissertation journey. From proposal development to final revisions, we help you clarify your thinking and move forward with confidence.',
    features: [
      'Weekly coaching sessions',
      'Feedback on drafts',
      'Milestone planning',
      'Structure guidance',
    ],
  },
  {
    title: 'Editing & Proofreading',
    slug: 'editing-proofreading',
    icon: <IconEdit size={32} stroke={1.5} />,
    description:
      'Specialized academic editing that goes beyond grammar. We focus on structural integrity, argument flow, and adherence to rigorous disciplinary standards.',
    features: [
      'Structural Refinement',
      'Narrative Logic',
      'Citation Precision',
      'Style Compliance',
    ],
  },
  {
    title: 'Research Support',
    slug: 'research-support',
    icon: <IconMicroscope size={32} stroke={1.5} />,
    description:
      'Expert technical assistance for complex research phases, including methodology design, data coding strategies, and software-assisted analysis.',
    features: [
      'Methodology Design',
      'Qualitative Coding',
      'Systematic Review',
      'Analysis Strategy',
    ],
  },
]

export default function ServicesPage() {
  const theme = useMantineTheme()
  const active = theme.other

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* Top section with white background for consistency */}
      <Box component="section" pt={rem(100)} pb={SECTION_SPACING} bg={active.background}>
        <Container size={1100}>
          <Stack gap="xl">
            <Box style={{ maxWidth: 800 }}>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c="dimmed"
              >
                Our Services
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
                Rigorous support for <br />
                the academic journey.
              </Title>
              <Text size="lg" mt="xl" c="dimmed" lh={1.6} style={{ fontSize: rem(20) }}>
                ScholarCrafted provides a range of specialized advisory services designed to help
                researchers navigate the most challenging phases of the dissertation process.
              </Text>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Services List with subtle gray background */}
      <Box
        component="section"
        py={SECTION_SPACING}
        bg={active.surface}
        style={{ borderTop: '1px solid #eee' }}
      >
        <Container size={1100}>
          <Stack gap={rem(120)}>
            {services.map((service, index) => (
              <Box key={service.slug}>
                <Stack gap="xl" style={{ maxWidth: 850 }}>
                  <Stack gap="md">
                    <Group gap="lg" align="center">
                      <Box c={active.accent} style={{ display: 'flex', alignItems: 'center' }}>
                        {service.icon}
                      </Box>
                      <Title
                        order={2}
                        style={{
                          fontSize: rem(42),
                          fontWeight: 400,
                          fontFamily: 'var(--font-serif)',
                          color: active.primary,
                        }}
                      >
                        {service.title}
                      </Title>
                    </Group>
                    <Text size="lg" lh={1.6} fw={400} c={active.primary} style={{ opacity: 0.8 }}>
                      {service.description}
                    </Text>
                  </Stack>

                  {/* Features list under description */}
                  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                    {service.features.map((feature) => (
                      <Group key={feature} gap="md" wrap="nowrap">
                        <Box
                          w={6}
                          h={6}
                          bg={active.accent}
                          style={{ borderRadius: '50%', flexShrink: 0 }}
                        />
                        <Text size="md" fw={500} c="dimmed">
                          {feature}
                        </Text>
                      </Group>
                    ))}
                  </SimpleGrid>

                  <Link
                    href={`/scholarcrafted/services/${service.slug}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Group gap="xs" style={{ cursor: 'pointer' }} mt="md">
                      <Text
                        fw={600}
                        size="md"
                        c={active.action}
                        style={{ letterSpacing: '0.02em' }}
                      >
                        Learn more
                      </Text>
                      <IconArrowRight size={18} color={active.action} />
                    </Group>
                  </Link>
                </Stack>
                {index !== services.length - 1 && (
                  <Divider mt={rem(100)} style={{ opacity: 0.5 }} />
                )}
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Bottom CTA section */}
      <Box
        component="section"
        py={SECTION_SPACING}
        bg={active.background}
        style={{ borderTop: '1px solid #eee' }}
      >
        <Container size={760}>
          <Stack align="center" style={{ textAlign: 'center' }} gap="xl">
            <Title order={2} style={{ fontSize: rem(42), fontWeight: 400, color: active.primary }}>
              Not sure which service you need?
            </Title>
            <Text size="lg" c="dimmed" lh={1.6}>
              Book a brief introductory review to discuss your current project stage and identify
              the most effective path forward.
            </Text>
            <Link href="/scholarcrafted/consultation" style={{ textDecoration: 'none' }}>
              <Button
                size="lg"
                variant="filled"
                bg={active.primary}
                mt="md"
                radius={0}
                px={rem(40)}
              >
                BOOK A STRATEGIC REVIEW
              </Button>
            </Link>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
