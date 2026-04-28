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
  Image,
  rem,
  useMantineTheme,
  Group,
} from '@mantine/core'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'
import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'

const SECTION_SPACING = rem(140)

// --- Hero Variations ---

const DeanWelcomeHero = () => {
  const { other: active } = useMantineTheme()
  return (
    <Box component="section" pt={rem(140)} pb={SECTION_SPACING}>
      <Container size={1100}>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(80)} verticalSpacing="xl">
          <Stack gap={rem(40)} justify="center">
            <Stack gap="xl">
              <Stack gap="xs">
                <Text
                  size="xs"
                  fw={700}
                  style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                  c="dimmed"
                >
                  SCHOLARCRAFTED ADVISORY
                </Text>
                <Title
                  order={1}
                  style={{
                    fontSize: rem(64),
                    fontWeight: 400,
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                    color: active.primary,
                    fontFamily: 'var(--font-serif)',
                  }}
                >
                  Rigor and Insight, <br />
                  On Demand.
                </Title>
              </Stack>
              <Box style={{ maxWidth: 480 }}>
                <Text size="xl" lh={1.7} c="dimmed">
                  We provide PhD-level oversight to help doctoral candidates navigate the
                  complexities of independent research and produce work of the highest academic
                  standard.
                </Text>
              </Box>
            </Stack>
            <Button
              size="xl"
              variant="filled"
              bg={active.primary}
              radius={0}
              fullWidth
              style={{ maxWidth: 350 }}
            >
              REQUEST A CONSULTATION
            </Button>
          </Stack>
          <Box>
            <Image
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200"
              alt="Academic team collaborating"
              radius={0}
              h={600}
              fit="cover"
              style={{ filter: 'grayscale(0.1)', objectPosition: 'top' }}
            />
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

const ResearchAbstractHero = () => {
  const { other: active } = useMantineTheme()
  return (
    <Box component="section" py={SECTION_SPACING} bg={active.surface}>
      <Container size={900}>
        <Stack gap="xl" align="center" style={{ textAlign: 'center' }}>
          <Title
            order={1}
            style={{
              fontSize: rem(52),
              fontWeight: 400,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: active.primary,
              fontFamily: 'var(--font-serif)',
            }}
          >
            &ldquo;The goal is to transform data into information, and information into
            insight.&rdquo;
          </Title>
          <Text size="lg" lh={1.7} c="dimmed" style={{ maxWidth: 650 }}>
            We provide the critical partnership needed to bridge the gap between raw research and a
            defensible, elegant dissertation. Our faculty-led process ensures your work achieves its
            full intellectual potential.
          </Text>
          <Group mt="md" gap="xl">
            <Button size="lg" variant="filled" bg={active.primary} radius={0}>
              BEGIN DIAGNOSTIC
            </Button>
            <Button
              size="lg"
              variant="subtle"
              color={active.primary}
              rightSection={<IconArrowRight size={18} />}
            >
              EXPLORE OUR METHODOLOGY
            </Button>
          </Group>
        </Stack>
      </Container>
    </Box>
  )
}

const ModernInstituteHero = () => {
  const { other: active } = useMantineTheme()
  return (
    <Box component="section" py={SECTION_SPACING * 1.5}>
      <Container size={1100}>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(40)}>
          <Image
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200"
            alt="Modern research collaboration"
            radius={0}
            h={500}
            fit="cover"
            style={{ filter: 'grayscale(0.5)', opacity: 0.9 }}
          />
          <Stack gap={rem(32)} justify="center" p="xl">
            <Stack gap="md">
              <Title
                order={1}
                style={{
                  fontSize: rem(48),
                  fontWeight: 500,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: active.primary,
                  fontFamily: 'var(--font-serif)',
                }}
              >
                The End of Academic Drift.
              </Title>
              <Text size="lg" lh={1.6} c="dimmed">
                Our structured oversight provides the momentum and clarity required to move from
                research gridlock to a finished, defensible manuscript.
              </Text>
            </Stack>
            <Button
              size="lg"
              variant="outline"
              color={active.primary}
              radius={0}
              style={{ borderColor: active.primary, maxWidth: 300 }}
            >
              INITIATE REVIEW
            </Button>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default function HeroConceptsPage() {
  const { other: active } = useMantineTheme()

  return (
    <Box bg={active.background}>
      <Navbar />

      <Box bg={active.surface} py="md" style={{ borderBottom: '1px solid #eee' }}>
        <Container>
          <Text size="sm" c="dimmed" style={{ textAlign: 'center' }}>
            Showing 3 Hero Section variations for review.
          </Text>
        </Container>
      </Box>

      <DeanWelcomeHero />
      <ResearchAbstractHero />
      <ModernInstituteHero />

      <Footer />
    </Box>
  )
}
