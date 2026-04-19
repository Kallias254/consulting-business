'use client'

import React from 'react'
import {
  Container,
  Title,
  Text,
  Box,
  SimpleGrid,
  Stack,
  Image,
  Divider,
  rem,
  Group,
  Button,
} from '@mantine/core'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'
import Link from 'next/link'

const SECTION_SPACING = rem(120)
const INNER_WIDTH = 760

export default function AboutPage() {
  return (
    <Box bg="white" style={{ minHeight: '100vh', color: '#111' }}>
      <Navbar />

      <Box component="section" pt={rem(100)} pb={SECTION_SPACING}>
        <Container size={1100}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(80)}>
            <Stack gap="xl" justify="center">
              <Box>
                <Text
                  size="xs"
                  fw={700}
                  style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                  c="dimmed"
                >
                  Our Philosophy
                </Text>
                <Title
                  order={1}
                  mt="md"
                  style={{
                    fontSize: rem(56),
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                  }}
                >
                  Guidance born from experience.
                </Title>
              </Box>
              <Text size="lg" lh={1.7} c="dimmed" style={{ fontSize: rem(20) }}>
                ScholarCrafted was founded on a simple realization: the most difficult part of the
                dissertation process is not the research itself, but the management of its
                complexity and the isolation of its execution.
              </Text>
            </Stack>
            <Box bg="#F9F8F6" p={rem(60)} style={{ border: '1px solid #eee' }}>
              <Stack gap="xl">
                <Title
                  order={3}
                  style={{ fontWeight: 400, fontSize: rem(28), fontFamily: 'var(--font-serif)' }}
                >
                  The Firm
                </Title>
                <Text size="sm" lh={1.8} c="dimmed">
                  We operate as a high-end academic consultancy, not a freelance marketplace. Every
                  project is handled under rigorous faculty oversight to ensure the highest
                  standards of scholarship and integrity.
                </Text>
              </Stack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* The Faculty Lead */}
      <Box
        component="section"
        py={SECTION_SPACING}
        bg="#F9F8F6"
        style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}
      >
        <Container size={1100}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(80)}>
            <Box>
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000"
                alt="Micah, PhD"
                radius={0}
                style={{ filter: 'grayscale(0.2)' }}
              />
            </Box>
            <Stack gap="xl" justify="center">
              <Box>
                <Text
                  size="xs"
                  fw={700}
                  style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                  c="dimmed"
                >
                  Faculty Lead
                </Text>
                <Title order={2} mt="md" style={{ fontSize: rem(42), fontWeight: 400 }}>
                  Micah, PhD
                </Title>
              </Box>
              <Text size="lg" lh={1.7} c="dimmed">
                With over a decade of experience in academic advising and manuscript development,
                Micah has guided hundreds of researchers through the complexities of the doctoral
                process.
              </Text>
              <Text size="md" lh={1.7} c="dimmed">
                His approach combines rigorous conceptual logic with empathetic, strategic
                support—ensuring that candidates not only finish their work but do so with absolute
                authority over their subject matter.
              </Text>
              <Divider style={{ width: rem(80) }} color="dark.2" />
              <Stack gap={4}>
                <Text size="xs" fw={700} style={{ letterSpacing: '0.1em' }}>
                  EXPERTISE
                </Text>
                <Text size="xs" c="dimmed">
                  QUALITATIVE METHODOLOGY &bull; STRUCTURAL EDITING &bull; DEFENSE STRATEGY
                </Text>
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>

      <Box component="section" py={SECTION_SPACING}>
        <Container size={INNER_WIDTH}>
          <Stack gap="xl" align="center" style={{ textAlign: 'center' }}>
            <Title order={2} style={{ fontSize: rem(42), fontWeight: 400 }}>
              Integrity & Oversight
            </Title>
            <Text size="lg" c="dimmed" lh={1.7}>
              Our team consists exclusively of PhD-level academics who understand the rigorous
              demands of the committee process. We do not write for you; we provide the scaffolding
              and strategic review required for you to successfully produce and defend your own
              original research.
            </Text>
            <Link href="/scholarcrafted/consultation" style={{ textDecoration: 'none' }}>
              <Button size="lg" variant="filled" color="dark.9" mt="xl" radius={0}>
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
