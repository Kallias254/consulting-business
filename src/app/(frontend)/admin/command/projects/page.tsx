'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Container, 
  Stack, 
  Title, 
  Text, 
  Paper, 
  Group, 
  Badge, 
  Table, 
  ActionIcon, 
  Tooltip, 
  Box, 
  Button, 
  Avatar, 
  SimpleGrid, 
  Progress,
  TextInput,
  Select,
  Tabs,
  Divider
} from '@mantine/core';
import { 
  IconSearch, 
  IconExternalLink,
  IconClock,
  IconMessageCircle,
  IconCircleCheck,
  IconCalendarEvent,
  IconArchive,
  IconRocket
} from '@tabler/icons-react';

const activeProjects = [
  { 
    id: 'PRJ-7792', 
    name: 'Impact of Digital Spaces on Youth Development', 
    client: 'Dr. Emily Chen', 
    researcher: 'Sarah Miller', 
    niche: 'Social Sciences',
    status: 'Executive Review', 
    sentiment: 'Optimal',
    fridayPulse: 'Ready',
    readiness: 94
  },
  { 
    id: 'PRJ-8104', 
    name: 'Urban Sustainability 2030 Grant Proposal', 
    client: 'Prof. Marcus Ross', 
    researcher: 'Dr. James Wilson', 
    niche: 'Education',
    status: 'Production', 
    sentiment: 'Optimal',
    fridayPulse: 'Drafting',
    readiness: 45
  },
  { 
    id: 'PRJ-9021', 
    name: 'NSF Keynote Visualization Suite', 
    client: 'Dr. Linda Vo', 
    researcher: 'Micah S.', 
    niche: 'Bespoke',
    status: 'Internal QC', 
    sentiment: 'Attention',
    fridayPulse: 'Pending',
    readiness: 78
  },
];

const archivedProjects = [
  { 
    id: 'PRJ-6643', 
    name: 'Lab Legacy Archive: 2015-2025', 
    client: 'Prof. Arthur Dent', 
    researcher: 'Dr. Emily Chen', 
    niche: 'Institutional Archive',
    status: 'Legacy', 
    delivered: '12 Jan 2026',
    publisher: 'CRC Press'
  },
  { 
    id: 'PRJ-5521', 
    name: 'Quantum Cognitive Mapping', 
    client: 'Dr. Aris Noble', 
    researcher: 'Sarah Miller', 
    niche: 'Social Sciences',
    status: 'Legacy', 
    delivered: '05 Dec 2025',
    publisher: 'Nature'
  },
];

export default function ActiveProjectsPage() {
  const router = useRouter();

  const handleRowClick = (projectId: string) => {
    router.push(`/admin/command/projects/${projectId}`);
  };

  return (
    <Container size="xl" fluid>
      <Stack gap={40}>
        {/* 1. Page Header */}
        <Box>
          <Group justify="space-between" align="flex-end">
            <Box>
              <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
                Project <Text component="span" inherit c="burnished-gold.7">Registry</Text>
              </Title>
              <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
                Operational Matrix // Faculty-Led Portfolio Oversight // Institutional Archive
              </Text>
            </Box>
            <Button 
              leftSection={<IconCalendarEvent size={16} />} 
              color="burnished-gold" 
              c="dark-forest" 
              radius={0}
            >
              Bulk Friday Authorization
            </Button>
          </Group>
        </Box>

        <Tabs defaultValue="active" variant="default" radius={0} color="burnished-gold" styles={{ 
          tab: { 
            fontSize: '11px', 
            textTransform: 'uppercase', 
            letterSpacing: '1px', 
            fontWeight: 600,
            padding: '16px 32px',
            color: 'var(--mantine-color-gray-6)',
            '&[data-active]': { color: 'var(--mantine-color-burnished-gold-7)', borderColor: 'var(--mantine-color-burnished-gold-7)' }
          },
          panel: { paddingTop: '32px' }
        }}>
          <Tabs.List style={{ borderBottom: '1px solid #2A2D31' }}>
            <Tabs.Tab value="active" leftSection={<IconRocket size={14} />}>Active Projects</Tabs.Tab>
            <Tabs.Tab value="archive" leftSection={<IconArchive size={14} />}>Institutional Archive</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="active">
            <Stack gap="xl">
              {/* Filters */}
              <Paper withBorder p="md" bg="#0A0B0C" radius={0} style={{ borderColor: '#2A2D31' }}>
                <Group grow>
                  <TextInput placeholder="Search active..." leftSection={<IconSearch size={16} />} variant="unstyled" p="xs" style={{ borderBottom: '1px solid #2A2D31' }} />
                  <Select placeholder="Filter by Niche" data={['Social Sciences', 'Education', 'Bespoke']} variant="unstyled" p="xs" style={{ borderBottom: '1px solid #2A2D31' }} />
                </Group>
              </Paper>

              {/* Active Ledger */}
              <Paper withBorder radius={0} p={0} bg="transparent" style={{ borderColor: '#2A2D31' }}>
                <Table verticalSpacing="lg" horizontalSpacing="xl" highlightOnHover>
                  <Table.Thead bg="#0A0B0C">
                    <Table.Tr>
                      <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="dimmed">IDENTIFIER</Table.Th>
                      <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="dimmed">PROJECT_NAME</Table.Th>
                      <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="dimmed">CHAIN_STATUS</Table.Th>
                      <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="dimmed">HEALTH</Table.Th>
                      <Table.Th></Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {activeProjects.map((project) => (
                      <Table.Tr key={project.id} onClick={() => handleRowClick(project.id)} style={{ cursor: 'pointer', borderBottom: '1px solid #2A2D31' }}>
                        <Table.Td><Text size="xs" c="#E1E1E1">{project.id}</Text></Table.Td>
                        <Table.Td>
                          <Box>
                            <Text size="sm" fw={700} c="#E1E1E1">{project.name}</Text>
                            <Text size="xs" c="dimmed">{project.client} {'//'} {project.niche}</Text>
                          </Box>
                        </Table.Td>
                        <Table.Td><Badge variant="outline" color="burnished-gold" size="xs" radius={0}>{project.status.toUpperCase()}</Badge></Table.Td>
                        <Table.Td>
                          <Group gap="xs">
                            <Box w={8} h={8} bg={project.sentiment === 'Optimal' ? '#40C057' : 'orange'} style={{ borderRadius: '50%' }} />
                            <Text size="xs" c={project.sentiment === 'Optimal' ? '#40C057' : 'orange'}>{project.sentiment.toUpperCase()}</Text>
                          </Group>
                        </Table.Td>
                        <Table.Td><ActionIcon variant="subtle" color="gray.6"><IconExternalLink size={16} /></ActionIcon></Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Paper>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="archive">
            <Stack gap="xl">
              <Paper withBorder radius={0} p={0} bg="transparent" style={{ borderColor: '#2A2D31' }}>
                <Table verticalSpacing="lg" horizontalSpacing="xl">
                  <Table.Thead bg="#0A0B0C">
                    <Table.Tr>
                      <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="dimmed">IDENTIFIER</Table.Th>
                      <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="dimmed">LEGACY_RECORD</Table.Th>
                      <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="dimmed">DELIVERED_ON</Table.Th>
                      <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="dimmed">PUBLISHER</Table.Th>
                      <Table.Th></Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {archivedProjects.map((project) => (
                      <Table.Tr key={project.id} style={{ borderBottom: '1px solid #2A2D31' }}>
                        <Table.Td><Text size="xs" c="dimmed">{project.id}</Text></Table.Td>
                        <Table.Td>
                          <Box>
                            <Text size="sm" fw={700} c="dimmed">{project.name}</Text>
                            <Text size="xs" c="dimmed">{project.client} {'//'} {project.niche}</Text>
                          </Box>
                        </Table.Td>
                        <Table.Td><Text size="xs" c="dimmed">{project.delivered}</Text></Table.Td>
                        <Table.Td><Badge variant="dot" color="gray.6" size="xs" radius={0}>{project.publisher.toUpperCase()}</Badge></Table.Td>
                        <Table.Td>
                          <Tooltip label="View Full Record History">
                            <ActionIcon variant="subtle" color="gray.6" onClick={() => handleRowClick(project.id)}><IconArchive size={16} /></ActionIcon>
                          </Tooltip>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Paper>
            </Stack>
          </Tabs.Panel>
        </Tabs>

        {/* Strategic Allocation (Keep these as they are global intelligence) */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          <Paper withBorder p="xl" radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
            <Title order={5} ff="var(--font-display)" c="burnished-gold" mb="xl" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
              Workforce Allocation
            </Title>
            <Stack gap="md">
              {[
                { name: 'Sarah Miller', count: 12, capacity: 85 },
                { name: 'Dr. James Wilson', count: 8, capacity: 60 },
                { name: 'Dr. Emily Chen', count: 15, capacity: 95 },
              ].map((member, i) => (
                <Box key={i}>
                  <Group justify="space-between" mb={4}>
                    <Text size="xs" fw={700} c="#E1E1E1">{member.name}</Text>
                    <Text ff="var(--font-body)" size="9px" c="dimmed">{member.count} ACTIVE</Text>
                  </Group>
                  <Progress value={member.capacity} color={member.capacity > 90 ? 'orange' : 'gray.6'} size="xs" radius={0} />
                </Box>
              ))}
            </Stack>
          </Paper>

          <Paper withBorder p="xl" radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
            <Title order={5} ff="var(--font-display)" c="burnished-gold" mb="xl" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
              Niche Concentration
            </Title>
            <SimpleGrid cols={2} spacing="xl">
              {['SOCIAL_SCIENCES', 'EDUCATION', 'BESPOKE_SOLUTIONS', 'INSTITUTIONAL_ARCHIVE'].map((niche, i) => (
                <Stack key={i} gap="xs">
                  <Text size="9px" ff="var(--font-body)" c="dimmed" style={{ letterSpacing: '1px' }}>{niche}:</Text>
                  <Text ff="var(--font-display)" size="xl" c="#E1E1E1">{[45, 30, 15, 10][i]}%</Text>
                  <Progress value={[45, 30, 15, 10][i]} color={i < 2 ? 'sage' : 'burnished-gold'} size="xs" radius={0} />
                </Stack>
              ))}
            </SimpleGrid>
          </Paper>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
