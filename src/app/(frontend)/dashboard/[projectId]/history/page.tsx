'use client';
import React, { useState } from 'react';
import { 
  Container, 
  Stack, 
  Title, 
  Text, 
  Paper, 
  Group, 
  Badge, 
  Table, 
  ThemeIcon, 
  Timeline, 
  Box,
  ActionIcon,
  Tooltip,
  Divider,
  SimpleGrid,
  Accordion,
  Button
} from '@mantine/core';
import { 
  IconHistory, 
  IconFileCheck, 
  IconDownload, 
  IconVersions, 
  IconCircleCheck, 
  IconClock, 
  IconFingerprint,
  IconArrowRight,
  IconFileText,
  IconShieldCheck,
  IconCalendarEvent
} from '@tabler/icons-react';
import Link from 'next/link';

export default function ProjectHistoryPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = React.use(params);
  const projectIdFormatted = projectId.replace(/-/g, ' ').toUpperCase();

  // Mock Units & Versions representing the "Modular History"
  const modularUnits = [
    {
      id: 'UNIT_01',
      title: '01: Introduction & Scope',
      status: 'validated',
      versions: [
        { id: 'v2.1', date: '15 Feb 2026', type: 'Final Approved', sha: 'e3b0c4...8fc1', status: 'validated' },
        { id: 'v2.0', date: '12 Feb 2026', type: 'Scholar Review', sha: 'f82d1c...2a1b', status: 'superseded' },
        { id: 'v1.0', date: '05 Feb 2026', type: 'Initial Draft', sha: 'a7c4b2...11d0', status: 'superseded' },
      ]
    },
    {
      id: 'UNIT_02',
      title: '02: Literature Review',
      status: 'scholar_review',
      versions: [
        { id: 'v3.2', date: '25 Feb 2026', type: 'Current Draft', sha: 'b1d9e8...77a4', status: 'active' },
        { id: 'v3.1', date: '20 Feb 2026', type: 'Scholar Review', sha: 'c2f3a1...99b2', status: 'superseded' },
      ]
    },
    {
      id: 'UNIT_03',
      title: '03: Methodology (Audit)',
      status: 'draft',
      versions: [
        { id: 'v1.0', date: '24 Feb 2026', type: 'Internal Draft', sha: 'd4e5f6...33c1', status: 'draft' },
      ]
    }
  ];

  return (
    <Container size="xl">
      <Stack gap="xl">
        {/* 1. Page Header */}
        <Box>
          <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase', lineHeight: 1.1 }}>
            Production <Text component="span" inherit c="burnished-gold.7">Trail</Text>
          </Title>
          <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
            Scientific Lineage // Project: {projectIdFormatted} // Version Audit Trail
          </Text>
        </Box>

        <SimpleGrid cols={{ base: 1, lg: 3 }} spacing={60} align="flex-start">
          {/* 1. Modular Audit Ledger (Grouped by Unit) */}
          <Box style={{ gridColumn: 'span 2' }}>
            <Stack gap="md">
              <Group justify="space-between" mb={4}>
                <Text size="10px" fw={800} c="#62666B" style={{ letterSpacing: '2px' }}>MODULAR_REVISION_LEDGER</Text>
                <Tooltip label="All revisions are cryptographically signed" radius={0}>
                  <Group gap={6}>
                    <IconFingerprint size={14} color="var(--mantine-color-sage-7)" />
                    <Text size="10px" fw={800} c="sage.8" style={{ letterSpacing: '1px' }}>SOVEREIGN_PROOF_ACTIVE</Text>
                  </Group>
                </Tooltip>
              </Group>

              <Accordion 
                variant="separated" 
                defaultValue="UNIT_01" 
                radius={0}
                styles={{
                  item: { border: '1px solid #E0DBCC', backgroundColor: 'white', marginBottom: '12px' },
                  control: { padding: '24px' },
                  label: { fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '1.1rem' },
                  content: { padding: 0 }
                }}
              >
                {modularUnits.map((unit) => (
                  <Accordion.Item key={unit.id} value={unit.id}>
                    <Accordion.Control>
                      <Group justify="space-between">
                        <Group gap="sm">
                          {unit.status === 'validated' && (
                            <IconCircleCheck size={20} color="var(--mantine-color-sage-7)" />
                          )}
                          <Text fw={700} c="deep-green.9">{unit.title}</Text>
                        </Group>
                        <Badge 
                          variant={unit.status === 'validated' ? 'filled' : 'outline'} 
                          color={unit.status === 'validated' ? 'sage.7' : 'burnished-gold.7'}
                          size="md"
                          radius={0}
                          px="xl"
                          styles={{ 
                            root: { 
                              border: unit.status === 'validated' ? 'none' : '1.5px solid currentColor', 
                              fontWeight: 800,
                              textTransform: 'uppercase',
                              letterSpacing: '1px'
                            } 
                          }}
                        >
                          {unit.status === 'validated' ? 'validated' : unit.status.replace('_', ' ')}
                        </Badge>
                      </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Table verticalSpacing="md" horizontalSpacing="xl" withRowBorders>
                        <Table.Thead bg="parchment.0">
                          <Table.Tr style={{ borderBottom: '1px solid #E0DBCC' }}>
                            <Table.Th size="xs" ff="var(--font-body)" c="#62666B" style={{ fontSize: '9px', letterSpacing: '1px' }}>REV_ID</Table.Th>
                            <Table.Th size="xs" ff="var(--font-body)" c="#62666B" style={{ fontSize: '9px', letterSpacing: '1px' }}>DESCRIPTION</Table.Th>
                            <Table.Th size="xs" ff="var(--font-body)" c="#62666B" style={{ fontSize: '9px', letterSpacing: '1px' }}>DATE</Table.Th>
                            <Table.Th size="xs" ff="var(--font-body)" c="#62666B" style={{ fontSize: '9px', letterSpacing: '1px' }}>STATUS</Table.Th>
                            <Table.Th></Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {unit.versions.map((rev) => (
                            <Table.Tr key={rev.id}>
                              <Table.Td><Text size="xs" fw={800} c="#62666B">{rev.id}</Text></Table.Td>
                              <Table.Td>
                                <Stack gap={2}>
                                  <Text size="sm" fw={700} c="deep-green.9">{rev.type}</Text>
                                  <Text size="10px" c="#62666B" ff="mono">SHA: {rev.sha}</Text>
                                </Stack>
                              </Table.Td>
                              <Table.Td><Text size="sm" fw={500} c="deep-green.9">{rev.date}</Text></Table.Td>
                              <Table.Td>
                                <Badge size="xs" variant="dot" color={rev.status === 'validated' || rev.status === 'active' ? 'sage.7' : 'gray.6'} radius={0} styles={{ root: { fontWeight: 600 } }}>
                                  {rev.status}
                                </Badge>
                              </Table.Td>
                              <Table.Td>
                                <ActionIcon variant="subtle" color="deep-green.7" component={Link} href={`/dashboard/${projectId}/proofs`}>
                                  <IconDownload size={18} stroke={1.5} />
                                </ActionIcon>
                              </Table.Td>
                            </Table.Tr>
                          ))}
                        </Table.Tbody>
                      </Table>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Stack>
          </Box>

          {/* 2. Success Trail Sidebar */}
          <Stack gap="xl">
            <Paper withBorder radius={0} p={40} bg="white" style={{ borderColor: '#E0DBCC' }}>
              <Title order={4} ff="var(--font-display)" mb="xl" style={{ textTransform: 'uppercase', letterSpacing: '1.5px', color: '#0A140F' }}>
                <IconHistory size={20} style={{ marginBottom: -4, marginRight: 10, color: 'var(--mantine-color-burnished-gold-7)' }} />
                Major Milestones
              </Title>
              <Timeline active={3} bulletSize={24} lineWidth={1.5} color="burnished-gold.7">
                <Timeline.Item bullet={<IconCircleCheck size={14} />} title={<Text size="xs" fw={800} c="deep-green.9" style={{ letterSpacing: '1px' }}>PROJECT_INGESTION</Text>}>
                  <Text size="sm" c="#62666B" mt={4} style={{ lineHeight: 1.4 }}>Initial Manuscript Audio & Word-to-Typst mapping complete.</Text>
                  <Text size="10px" mt={6} fw={700} c="#62666B">01 FEB 2026</Text>
                </Timeline.Item>
                
                <Timeline.Item bullet={<IconCircleCheck size={14} />} title={<Text size="xs" fw={800} c="deep-green.9" style={{ letterSpacing: '1px' }}>INTRODUCTION_AND_SCOPE_VALIDATED</Text>}>
                  <Text size="sm" c="#62666B" mt={4} style={{ lineHeight: 1.4 }}>Final institutional approval for Unit 01 (Introduction & Scope).</Text>
                  <Text size="10px" mt={6} fw={700} c="#62666B">15 FEB 2026</Text>
                </Timeline.Item>

                <Timeline.Item bullet={<IconShieldCheck size={14} />} title={<Text size="xs" fw={800} c="deep-green.9" style={{ letterSpacing: '1px' }}>METHODOLOGY_AUDIT</Text>}>
                  <Text size="sm" c="#62666B" mt={4} style={{ lineHeight: 1.4 }}>Chapter 1-3 statistical validation and BibTeX integrity pass.</Text>
                  <Text size="10px" mt={6} fw={700} c="#62666B">14 FEB 2026</Text>
                </Timeline.Item>

                <Timeline.Item bullet={<IconClock size={14} />} title={<Text size="xs" fw={800} c="burnished-gold.8" style={{ letterSpacing: '1px' }}>SCHOLAR_REVIEW_ACTIVE</Text>}>
                  <Text size="sm" c="deep-green.9" mt={4} fw={500}>Current Unit: Literature Review undergoing final executive proofing.</Text>
                  <Text size="10px" mt={6} fw={900} c="burnished-gold.8" style={{ textTransform: 'uppercase' }}>In Progress</Text>
                </Timeline.Item>
                
                <Timeline.Item bullet={<IconFileCheck size={14} />} title={<Text size="xs" fw={800} c="gray.5" style={{ letterSpacing: '1px' }}>FINAL_LIAISON_HANDOFF</Text>}>
                  <Text size="sm" c="gray.5" mt={4}>Promotion to Asset Vault & Publisher Submission.</Text>
                  <Text size="10px" mt={6} fw={700} c="gray.4">EST: 15 MAR 2026</Text>
                </Timeline.Item>
              </Timeline>

              <Divider my="xl" label="Institutional Clearance" labelPosition="center" color="#F4F1EA" styles={{ label: { fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: '#62666B', fontWeight: 700 } }} />
              
              <Group justify="center" p="md" bg="parchment.0" style={{ border: '1px solid #E0DBCC' }}>
                <Stack gap={2} align="center">
                  <Text ff="var(--font-body)" size="9px" fw={800} c="#62666B" style={{ letterSpacing: '2px' }}>OVERSIGHT_BY:</Text>
                  <Text ff="var(--font-display)" size="lg" fw={800} c="deep-green.9">PRINCIPAL MICAH S.</Text>
                </Stack>
              </Group>
            </Paper>

            <Button 
              component={Link} 
              href={`/dashboard/${projectId}/proofs`} 
              fullWidth 
              color="deep-green.7" 
              radius={0} 
              size="lg"
              leftSection={<IconFileText size={20} />}
              styles={{ root: { textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, height: '54px' } }}
            >
              Enter Gallery Proof
            </Button>
          </Stack>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
