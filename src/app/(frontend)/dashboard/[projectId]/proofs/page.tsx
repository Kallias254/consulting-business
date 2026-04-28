'use client'
import React, { useState } from 'react'
import {
  Container,
  Stack,
  Title,
  Text,
  Paper,
  Group,
  ActionIcon,
  Box,
  Button,
  ScrollArea,
  Divider,
  Center,
  NavLink,
  Badge,
  Modal,
  Textarea,
  TextInput,
  Tooltip,
} from '@mantine/core'
import {
  IconDownload,
  IconPrinter,
  IconMessageCircle,
  IconArrowLeft,
  IconZoomIn,
  IconZoomOut,
  IconLayoutColumns,
  IconCertificate,
  IconAlertCircle,
  IconLayoutSidebarLeftCollapse,
  IconMaximize,
  IconAdjustmentsHorizontal,
} from '@tabler/icons-react'
import Link from 'next/link'

export default function ProjectGalleryProofPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = React.use(params)

  // 30yr Dev Note: Standardizing ID display to the user's requested string for this session
  const projectTitle = 'QUANTUM GRAVITY REVISITED'
  const projectIdFormatted = projectId.toUpperCase()

  const [activeUnit, setActiveUnit] = useState('UNIT_02')
  const [feedbackOpened, setFeedbackOpened] = useState(false)

  // Mock Units representing the "Modular Manuscript Assembly"
  const manuscriptUnits = [
    { id: 'UNIT_01', title: '01: Introduction & Scope', status: 'validated', page: 1 },
    { id: 'UNIT_02', title: '02: Literature Review', status: 'scholar_review', page: 12 },
    { id: 'UNIT_03', title: '03: Methodology (Audit)', status: 'scholar_review', page: 24 },
    { id: 'UNIT_04', title: '04: Results & Data Ingestion', status: 'draft', page: 32 },
    { id: 'UNIT_05', title: '05: Discussion & Impact', status: 'draft', page: 40 },
  ]

  const currentUnit = manuscriptUnits.find((u) => u.id === activeUnit)

  return (
    <Container
      size="xl"
      fluid
      p={0}
      style={{
        height: 'calc(100vh - 250px)',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Group
        align="stretch"
        gap={0}
        style={{ flex: 1, overflow: 'hidden', border: '1px solid #E0DBCC' }}
      >
        {/* 1. Technical Sidebar (Structure) */}
        <Box
          w={320}
          bg="white"
          style={{
            borderRight: '1px solid #E0DBCC',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {/* Sidebar Header */}
          <Box p="xl" style={{ borderBottom: '1px solid #F4F1EA' }}>
            <Text size="9px" fw={700} c="dimmed" style={{ letterSpacing: '2px' }} mb={8}>
              MANUSCRIPT_STRUCTURE
            </Text>
            <Title
              order={4}
              ff="var(--font-display)"
              style={{ textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.2 }}
            >
              {projectTitle}
            </Title>
            <Text size="10px" ff="var(--font-body)" c="burnished-gold.8" mt={4} fw={700}>
              ID: {projectIdFormatted}
            </Text>
          </Box>

          <ScrollArea style={{ flex: 1 }} p="md">
            <Stack gap={4}>
              {manuscriptUnits.map((unit) => (
                <NavLink
                  key={unit.id}
                  active={activeUnit === unit.id}
                  label={unit.title}
                  description={`Page ${unit.page}`}
                  onClick={() => setActiveUnit(unit.id)}
                  rightSection={
                    <Badge
                      variant={unit.status === 'validated' ? 'filled' : 'outline'}
                      color={unit.status === 'validated' ? 'sage.7' : 'burnished-gold.7'}
                      size="sm"
                      radius={0}
                      px="xs"
                      styles={{
                        root: {
                          border: unit.status === 'validated' ? 'none' : '1px solid currentColor',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          fontSize: '8px',
                          height: '18px',
                        },
                      }}
                    >
                      {unit.status.replace('_', ' ')}
                    </Badge>
                  }
                  styles={{
                    root: {
                      padding: '12px 16px',
                      backgroundColor:
                        activeUnit === unit.id ? 'var(--mantine-color-parchment-0)' : 'transparent',
                      borderLeft:
                        activeUnit === unit.id
                          ? '3px solid var(--mantine-color-burnished-gold-7)'
                          : '3px solid transparent',
                      transition: 'all 0.15s ease',
                    },
                    label: {
                      fontFamily: 'var(--font-body)',
                      fontWeight: activeUnit === unit.id ? 700 : 500,
                      fontSize: 'xs',
                      color:
                        activeUnit === unit.id ? 'var(--mantine-color-deep-green-9)' : 'inherit',
                    },
                    description: { fontSize: '9px', letterSpacing: '0.5px' },
                  }}
                />
              ))}
            </Stack>
          </ScrollArea>

          {/* Sidebar Footer: Guidance */}
          <Box p="xl" bg="parchment.0" style={{ borderTop: '1px solid #E0DBCC' }}>
            <Group gap="xs" mb={8}>
              <IconAlertCircle size={14} color="var(--mantine-color-burnished-gold-8)" />
              <Text size="xs" fw={700} style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                Peer Review Protocol
              </Text>
            </Group>
            <Text size="10px" c="dimmed" style={{ lineHeight: 1.6 }}>
              Select a section to begin review. Feedback is anchored to the active unit. Reference
              specific paragraphs in your notes for precision.
            </Text>
          </Box>
        </Box>

        {/* 2. Precision Work Area */}
        <Stack gap={0} style={{ flexGrow: 1, height: '100%', overflow: 'hidden' }} bg="#FDFDFB">
          {/* Engineering-Grade Toolbar */}
          <Paper
            p="md"
            radius={0}
            style={{
              borderBottom: '1px solid #E0DBCC',
              zIndex: 10,
            }}
            bg="white"
          >
            <Group justify="space-between">
              {/* Left: Metadata Context */}
              <Group gap="xl">
                <Box>
                  <Text size="8px" fw={800} c="dimmed" style={{ letterSpacing: '2px' }}>
                    VIEWING_SECTION
                  </Text>
                  <Title
                    order={5}
                    ff="var(--font-display)"
                    style={{ textTransform: 'uppercase', letterSpacing: '1px' }}
                  >
                    {currentUnit?.title}
                  </Title>
                </Box>
                <Divider orientation="vertical" h={30} />
                <Group gap="xs">
                  <Tooltip label="Zoom In" radius={0} size="xs">
                    <ActionIcon variant="subtle" color="deep-green">
                      <IconZoomIn size={18} />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="Zoom Out" radius={0} size="xs">
                    <ActionIcon variant="subtle" color="deep-green">
                      <IconZoomOut size={18} />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="Full Screen" radius={0} size="xs">
                    <ActionIcon variant="subtle" color="deep-green">
                      <IconMaximize size={18} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Group>

              {/* Right: Actions */}
              <Group gap="md">
                <Button
                  variant="outline"
                  color="burnished-gold.7"
                  radius={0}
                  size="sm"
                  leftSection={<IconMessageCircle size={18} />}
                  onClick={() => setFeedbackOpened(true)}
                  styles={{ root: { borderWidth: '1px' } }}
                >
                  Request Revision
                </Button>
                <Button
                  color="deep-green"
                  radius={0}
                  size="sm"
                  leftSection={<IconCertificate size={18} />}
                  styles={{ root: { textTransform: 'uppercase', letterSpacing: '1px' } }}
                >
                  Approve Section
                </Button>
              </Group>
            </Group>
          </Paper>

          {/* The Proof Canvas: High-Resolution Display */}
          <ScrollArea style={{ flex: 1 }} p={80} scrollbars="y" type="hover" bg="#F4F1EA">
            <Center pb={100}>
              <Paper
                shadow="0 50px 100px -20px rgba(0,0,0,0.12), 0 30px 60px -30px rgba(0,0,0,0.15)"
                radius={0}
                p={100}
                w={850}
                mih={1200}
                bg="white"
                style={{ position: 'relative', border: '1px solid #E0DBCC' }}
              >
                {/* Academic Header Line */}
                <Box pos="absolute" top={40} left={100} right={100}>
                  <Group
                    justify="space-between"
                    style={{ borderBottom: '0.5px solid #EEE', paddingBottom: '10px' }}
                  >
                    <Text
                      size="8px"
                      ff="var(--font-body)"
                      c="dimmed"
                      style={{ letterSpacing: '2px' }}
                    >
                      PROOFS // DO NOT DISTRIBUTE
                    </Text>
                    <Text
                      size="8px"
                      ff="var(--font-body)"
                      c="dimmed"
                      style={{ letterSpacing: '2px' }}
                    >
                      REF: {projectIdFormatted}_{currentUnit?.id}
                    </Text>
                  </Group>
                </Box>

                {/* Institutional Watermark: Subtle & Professional */}
                <Box
                  pos="absolute"
                  top="50%"
                  left="50%"
                  style={{
                    transform: 'translate(-50%, -50%) rotate(-45deg)',
                    opacity: 0.02,
                    pointerEvents: 'none',
                  }}
                >
                  <Title ff="var(--font-display)" size="8rem" c="deep-green.9">
                    CONFIDENTIAL
                  </Title>
                </Box>

                <Stack gap={40}>
                  <Box mt={60}>
                    <Text
                      size="xs"
                      fw={700}
                      c="burnished-gold.8"
                      mb={4}
                      style={{ letterSpacing: '1px' }}
                    >
                      SECTION_{currentUnit?.id}
                    </Text>
                    <Title
                      order={1}
                      ff="serif"
                      style={{
                        fontSize: '2.4rem',
                        fontStyle: 'italic',
                        fontWeight: 500,
                        color: '#1A1A1A',
                      }}
                    >
                      {currentUnit?.title.split(': ')[1]}
                    </Title>
                  </Box>

                  <Text
                    size="md"
                    style={{
                      color: '#2C2C2C',
                      lineHeight: 2.4,
                      textAlign: 'justify',
                      fontFamily: 'serif',
                      fontSize: '1.05rem',
                    }}
                  >
                    The relationship between macroscopic gravitational effects and quantum-scale
                    fluctuations remains the primary hurdle in contemporary theoretical physics. In
                    this section, we expand upon the 2024 longitudinal data ingestion protocols to
                    account for the variance observed in the most recent simulations. By treating
                    the manuscript generation as a code-first pipeline, we ensure that the
                    methodological integrity remains intact from data collection to typeset output.
                  </Text>

                  <Text
                    size="md"
                    style={{
                      color: '#2C2C2C',
                      lineHeight: 2.4,
                      textAlign: 'justify',
                      fontFamily: 'serif',
                      fontSize: '1.05rem',
                    }}
                  >
                    Traditional sociological models of youth interaction often fail to account for
                    the velocity and scale of digital-native social architectures. Our research
                    bridges the gap between classic longitudinal study designs and the modern
                    requirement for real-time data ingestion. By treating the manuscript generation
                    as a code-first pipeline, we ensure that the methodological integrity remains
                    intact from data collection to typeset output.
                  </Text>

                  {/* Contextual Researcher Intervention */}
                  <Box
                    p="xl"
                    mt="xl"
                    bg="parchment.0"
                    style={{
                      border: '1px solid #EAE6DB',
                      borderLeft: '4px solid var(--mantine-color-burnished-gold-7)',
                    }}
                  >
                    <Group gap="xs" mb="sm">
                      <IconAdjustmentsHorizontal
                        size={14}
                        color="var(--mantine-color-deep-green-7)"
                      />
                      <Text size="xs" fw={800} style={{ letterSpacing: '1px' }}>
                        PRINCIPAL_CLEARANCE_NOTE [MICAH S.]
                      </Text>
                    </Group>
                    <Text size="xs" style={{ lineHeight: 1.6, color: '#4A4D51' }}>
                      &quot;The technical audit for this section is 100% compliant with the Taylor
                      &amp; Francis LaTeX standards. Sarah has manually verified the bibliography.
                      Your review should focus purely on the narrative flow of the discussion.&quot;
                    </Text>
                  </Box>
                </Stack>

                {/* Footer Metadata */}
                <Box pos="absolute" bottom={40} left={100} right={100}>
                  <Group
                    justify="space-between"
                    style={{ borderTop: '0.5px solid #EEE', paddingTop: '10px' }}
                  >
                    <Text
                      size="7px"
                      ff="var(--font-body)"
                      c="dimmed"
                      style={{ letterSpacing: '1px' }}
                    >
                      VERIFIED_BY_VANCE_LAB // SYSTEM_ID: V4.0.2
                    </Text>
                    <Text
                      size="7px"
                      ff="var(--font-body)"
                      c="dimmed"
                      style={{ letterSpacing: '1px' }}
                    >
                      PAGE_{currentUnit?.page}_OF_60
                    </Text>
                  </Group>
                </Box>
              </Paper>
            </Center>
          </ScrollArea>
        </Stack>
      </Group>

      {/* Revision Request: Contextual Modal */}
      <Modal
        opened={feedbackOpened}
        onClose={() => setFeedbackOpened(false)}
        title={
          <Text
            ff="var(--font-display)"
            fw={700}
            style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '1.1rem' }}
          >
            Revision Request
          </Text>
        }
        size="lg"
        radius={0}
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <Stack gap="md">
          <Paper p="md" bg="parchment.0" withBorder radius={0} style={{ borderColor: '#EAE6DB' }}>
            <Text size="8px" fw={800} c="dimmed" style={{ letterSpacing: '1px' }}>
              TARGET_SECTION:
            </Text>
            <Text size="sm" fw={700} c="deep-green.9">
              {currentUnit?.title}
            </Text>
          </Paper>

          <TextInput
            label="Specific Location"
            placeholder="e.g. Page 12, Paragraph 3"
            radius={0}
            styles={{
              label: {
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '4px',
              },
            }}
          />

          <Textarea
            label="Revision Instructions"
            placeholder="Provide detailed feedback for the researcher..."
            minRows={6}
            radius={0}
            required
            styles={{
              label: {
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '4px',
              },
            }}
          />

          <Group grow mt="md">
            <Button
              variant="subtle"
              color="gray"
              radius={0}
              onClick={() => setFeedbackOpened(false)}
            >
              Cancel
            </Button>
            <Button
              color="burnished-gold.7"
              c="dark-forest"
              radius={0}
              onClick={() => setFeedbackOpened(false)}
            >
              Submit to Production
            </Button>
          </Group>
          <Text size="9px" c="dimmed" ta="center" mt="sm" style={{ fontStyle: 'italic' }}>
            This request will be automatically promoted to a Priority Task in the researcher&apos;s
            queue.
          </Text>
        </Stack>
      </Modal>
    </Container>
  )
}
