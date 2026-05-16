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
  rem,
  useMantineTheme,
  Group,
  ThemeIcon,
  Modal,
  TextInput,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'
import Link from 'next/link'
import { IconDownload, IconArrowRight, IconFileText, IconCheck } from '@tabler/icons-react'
import { SECTION_SPACING, INNER_WIDTH, READING_WIDTH } from '@/layout'

const blueprints = [
  {
    title: 'The Chapter 1 Proposal Framework',
    desc: 'A comprehensive, fill-in-the-blank structure for writing a proposal that aligns your problem statement, purpose, and research questions flawlessly.',
    category: 'TEMPLATE',
  },
  {
    title: 'The Literature Review Synthesis Matrix',
    desc: 'Stop summarizing and start synthesizing. This Excel matrix helps you organize hundreds of sources by theme, methodology, and theoretical gap.',
    category: 'TOOL',
  },
  {
    title: 'The Qualitative Codebook Template',
    desc: 'A foundational structure for establishing a priori codes and documenting emergent themes during your qualitative data analysis phase.',
    category: 'BLUEPRINT',
  },
]

const articles = [
  {
    title: 'What to do when your Dissertation Chair ghosts you.',
    slug: 'dissertation-chair-ghosting',
    category: 'COMMITTEE POLITICS',
    readTime: '6 min read',
  },
  {
    title: 'Why your qualitative thematic analysis was rejected (and how to fix it).',
    slug: 'qualitative-thematic-analysis-rejected',
    category: 'METHODOLOGY',
    readTime: '8 min read',
  },
  {
    title: "The 'ABD' Trap: How to restart your research after a 6-month break.",
    slug: 'abd-trap-restart-research',
    category: 'STRATEGY',
    readTime: '5 min read',
  },
  {
    title: 'How to properly align your Research Questions with your Paradigm.',
    slug: 'research-questions-paradigm-alignment',
    category: 'METHODOLOGY',
    readTime: '10 min read',
  },
]

export default function ResourcesPage() {
  const theme = useMantineTheme()
  const active = theme.other
  const [opened, { open, close }] = useDisclosure(false)
  const [selectedBlueprint, setSelectedBlueprint] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleDownloadClick = (title: string) => {
    setSelectedBlueprint(title)
    setSubmitted(false)
    open()
  }

  return (
      <Box bg={active.surface} style={{ minHeight: '100vh', color: active.primary }}>
        <Navbar />

        {/* Hero Section */}
        <Box component="section" pt={rem(140)} pb={rem(80)} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <Box style={{ maxWidth: 800 }}>
            <Text
              size="xs"
              fw={700}
              style={{ letterSpacing: '0.15em' }}
              c={active.accent}
            >
              ACADEMIC BLUEPRINTS
            </Text>
            <Title
              order={1}
              mt="md"
              style={{
                fontSize: rem(56),
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: active.primary }}
            >
              Structured frameworks for <br />
              independent researchers.
            </Title>
            <Text size="lg" mt="xl" c="dimmed" lh={1.6} style={{ fontSize: rem(20) }}>
              Actionable templates, matrices, and tools designed specifically to help you 
              overcome your toughest academic roadblocks and accelerate your writing.
            </Text>
          </Box>
        </Container>
      </Box>

      {/* Blueprints Section */}
      <Box
        component="section"
        py={SECTION_SPACING}
        bg={active.surface}
        style={{ borderTop: `1px solid ${active.primary}12` }}
      >
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(80)}>
            <Box style={{ maxWidth: 800 }}>
              <Text
                size="xs"
                
                c={active.accent}
              >
                Lead Magnets
              </Text>
              <Title
                order={2}
                mt="md"
                style={{
                  fontSize: rem(48),
                  color: active.primary }}
              >
                Downloadable Blueprints
              </Title>
              <Text size="lg" c="dimmed" mt="md">
                Proprietary templates and matrices we use internally to structure our clients&apos;
                research. Available for instant download.
              </Text>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
              {blueprints.map((item, i) => (
                <Box
                  key={i}
                  p={rem(40)}
                  bg={active.background}
                  style={{
                    border: `1px solid ${active.primary}12`,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%' }}
                >
                  <Stack gap="xl" flex={1}>
                    <Stack gap="xs">
                      <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.1em' }}>
                        {item.category}
                      </Text>
                      <Title order={3} >
                        {item.title}
                      </Title>
                    </Stack>
                    <Text size="sm" c="dimmed" lh={1.6}>
                      {item.desc}
                    </Text>
                    <Box mt="auto" pt="xl">
                      <Button
                        variant="outline"
                        color={active.primary}
                        fullWidth
                        radius={0}
                        leftSection={<IconDownload size={16} />}
                        style={{ borderColor: active.primary }}
                        onClick={() => handleDownloadClick(item.title)}
                      >
                        Download Free
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* Visit the Library CTA */}
      <Box
        component="section"
        py={SECTION_SPACING}
        bg={active.background}
        style={{ borderTop: `1px solid ${active.primary}12` }}
      >
        <Container size={INNER_WIDTH}>
          <Box p={rem(80)} bg={active.surface} style={{ border: `1px solid #eee`, textAlign: 'center' }}>
            <Stack gap="xl" align="center">
              <Text
                size="xs"
                
                c={active.accent}
              >
                The Library
              </Text>
              <Title
                order={2}
                style={{
                  fontSize: rem(42),
                  color: active.primary }}
              >
                Strategic Insights Archive
              </Title>
              <Text size="lg" c="dimmed" lh={1.6} style={{ maxWidth: 600 }}>
                Deep dives into methodology, academic writing, and navigating committee politics. 
                Our full archive of strategic insights is now hosted in the Library.
              </Text>
              <Link href="/scholarcrafted/blog" style={{ textDecoration: 'none' }}>
                <Button size="lg" variant="outline" color={active.primary} radius={0} px={rem(40)} style={{ borderColor: active.primary }}>
                  VISIT THE LIBRARY
                </Button>
              </Link>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Bottom CTA */}
      <Box py={SECTION_SPACING} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}12` }}>
        <Container size={760}>
          <Stack gap="xl" align="center" style={{ textAlign: 'center' }}>
            <Title order={2} style={{ fontSize: rem(42), color: active.primary }}>
              Still stuck? We can help.
            </Title>
            <Text size="lg" c="dimmed" lh={1.6}>
              Reading articles will only get you so far. If you need a structural intervention or strategic 
              direction for your specific research, book a quick call with our faculty.
            </Text>
            <Group gap="md">
              <Link href="/scholarcrafted/consultation?interest=other&metBefore=no" style={{ textDecoration: 'none' }}>
                <Button size="lg" variant="filled" bg={active.primary} radius={0}>
                  FREE INTRODUCTORY CALL
                </Button>
              </Link>
            </Group>
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
          <Stack gap="xs" mb="xl">

            <Title
              order={2}
              style={{
                fontSize: rem(32),
                color: active.primary }}
            >
              Secure Your Blueprint
            </Title>
          </Stack>

          {!submitted ? (
            <Stack gap="xl">
              <Text size="sm" c="dimmed" lh={1.6}>
                You are about to download <strong>{selectedBlueprint}</strong>. Please enter your preferred email address to receive your secure download link and our latest academic strategies.
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
                  Send My Blueprint
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
                  Blueprint Sent!
                </Title>
                <Text size="sm" c="dimmed" mt="sm">
                  Check your inbox. We&apos;ve sent <strong>{selectedBlueprint}</strong> directly to you.
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
      
      <style jsx global>{`
        .article-card {
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .article-card:hover {
          transform: translateY(-4px);
          border-color: ${active.action} !important;
        }
      `}</style>
    </Box>
  )
}
