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
  Select
} from '@mantine/core';
import { 
  IconSearch, 
  IconExternalLink,
  IconClock,
  IconMessageCircle,
  IconCircleCheck,
  IconCalendarEvent
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
  { 
    id: 'PRJ-6643', 
    name: 'Lab Legacy Archive: 2015-2025', 
    client: 'Prof. Arthur Dent', 
    researcher: 'Dr. Emily Chen', 
    niche: 'Institutional Archive',
    status: 'Production', 
    sentiment: 'Optimal',
    fridayPulse: 'Ready',
    readiness: 22
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
                Active <Text component="span" inherit c="burnished-gold.7">Projects</Text>
              </Title>
              <Text c="deep-green.3" size="sm" ff="var(--font-body)" mt={4}>
                Operational Matrix // Faculty-Led Portfolio Oversight
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

        {/* 2. Filters & Controls */}
        <Paper withBorder p="md" bg="rgba(14, 29, 22, 0.4)" radius={0} style={{ borderColor: 'var(--mantine-color-deep-green-8)' }}>
          <Group grow>
            <TextInput 
              placeholder="Search by project ID, title, or client..." 
              leftSection={<IconSearch size={16} />}
              variant="unstyled"
              p="xs"
              style={{ borderBottom: '1px solid var(--mantine-color-deep-green-7)' }}
            />
            <Select 
              placeholder="Filter by Niche" 
              data={['Social Sciences', 'Education', 'Bespoke', 'Institutional Archive']}
              variant="unstyled"
              p="xs"
              style={{ borderBottom: '1px solid var(--mantine-color-deep-green-7)' }}
            />
            <Select 
              placeholder="Filter by Status" 
              data={['Production', 'Internal QC', 'Executive Review', 'Delivered']}
              variant="unstyled"
              p="xs"
              style={{ borderBottom: '1px solid var(--mantine-color-deep-green-7)' }}
            />
          </Group>
        </Paper>

        {/* 3. Project Ledger */}
        <Paper withBorder radius={0} p={0} bg="transparent" style={{ borderColor: 'var(--mantine-color-deep-green-8)' }}>
          <Table verticalSpacing="lg" horizontalSpacing="xl" highlightOnHover>
            <Table.Thead bg="rgba(14, 29, 22, 0.6)">
              <Table.Tr>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">IDENTIFIER</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">PROJECT_NAME</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">ASSIGNED_TO</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">CHAIN_STATUS</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">FRIDAY_PULSE</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">HEALTH</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3"></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {activeProjects.map((project) => (
                <Table.Tr 
                  key={project.id} 
                  onClick={() => handleRowClick(project.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <Table.Td>
                    <Text ff="var(--font-body)" size="xs" c="parchment">{project.id}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Box maw={300}>
                      <Text size="sm" fw={700} c="parchment" truncate="end">{project.name}</Text>
                      <Text size="xs" c="dimmed">{project.client} {'//'} {project.niche}</Text>
                    </Box>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Avatar size="xs" radius={0} color="burnished-gold">{project.researcher[0]}</Avatar>
                      <Text size="xs" c="parchment">{project.researcher}</Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Badge 
                      variant="outline" 
                      color={project.status === 'Executive Review' ? 'burnished-gold' : 'deep-green.3'} 
                      size="xs"
                    >
                      {project.status.toUpperCase()}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap={6}>
                      {project.fridayPulse === 'Ready' ? (
                        <IconCircleCheck size={14} color="var(--mantine-color-sage-0)" />
                      ) : (
                        <IconClock size={14} color="var(--mantine-color-burnished-gold-7)" />
                      )}
                      <Text ff="var(--font-body)" size="xs" c={project.fridayPulse === 'Ready' ? 'sage' : 'burnished-gold'}>
                        {project.fridayPulse.toUpperCase()}
                      </Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Box 
                        w={8} h={8} 
                        bg={project.sentiment === 'Optimal' ? 'sage' : 'orange'} 
                        style={{ borderRadius: '50%' }} 
                      />
                      <Text ff="var(--font-body)" size="xs" c={project.sentiment === 'Optimal' ? 'sage' : 'orange'}>
                        {project.sentiment.toUpperCase()}
                      </Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <ActionIcon variant="subtle" color="deep-green.3"><IconExternalLink size={16} /></ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>

        {/* 4. Workforce Distribution */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          <Paper withBorder p="xl" radius={0} bg="rgba(14, 29, 22, 0.2)" style={{ borderColor: 'var(--mantine-color-deep-green-8)' }}>
            <Title order={5} ff="var(--font-display)" c="burnished-gold" mb="xl" style={{ textTransform: 'uppercase' }}>
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
                    <Text size="xs" fw={700}>{member.name}</Text>
                    <Text ff="var(--font-body)" size="xs" c="dimmed">{member.count} ACTIVE</Text>
                  </Group>
                  <Progress value={member.capacity} color={member.capacity > 90 ? 'orange' : 'deep-green.7'} size="xs" radius={0} />
                </Box>
              ))}
            </Stack>
          </Paper>

          <Paper withBorder p="xl" radius={0} bg="rgba(14, 29, 22, 0.2)" style={{ borderColor: 'var(--mantine-color-deep-green-8)' }}>
            <Title order={5} ff="var(--font-display)" c="burnished-gold" mb="xl" style={{ textTransform: 'uppercase' }}>
              Niche Concentration
            </Title>
            <SimpleGrid cols={2} spacing="xl">
              <Stack gap="xs">
                <Text size="xs" ff="var(--font-body)" c="dimmed">SOCIAL_SCIENCES:</Text>
                <Text ff="var(--font-display)" size="xl">45%</Text>
                <Progress value={45} color="sage" size="xs" radius={0} />
              </Stack>
              <Stack gap="xs">
                <Text size="xs" ff="var(--font-body)" c="dimmed">EDUCATION:</Text>
                <Text ff="var(--font-display)" size="xl">30%</Text>
                <Progress value={30} color="sage" size="xs" radius={0} />
              </Stack>
              <Stack gap="xs">
                <Text size="xs" ff="var(--font-body)" c="dimmed">BESPOKE_SOLUTIONS:</Text>
                <Text ff="var(--font-display)" size="xl">15%</Text>
                <Progress value={15} color="burnished-gold" size="xs" radius={0} />
              </Stack>
              <Stack gap="xs">
                <Text size="xs" ff="var(--font-body)" c="dimmed">INSTITUTIONAL_ARCHIVE:</Text>
                <Text ff="var(--font-display)" size="xl">10%</Text>
                <Progress value={10} color="burnished-gold" size="xs" radius={0} />
              </Stack>
            </SimpleGrid>
          </Paper>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
