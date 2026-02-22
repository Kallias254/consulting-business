'use client';
import React from 'react';
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
  SimpleGrid, 
  Progress
} from '@mantine/core';
import { 
  IconClipboardList, 
  IconClock, 
  IconMessageCircle, 
  IconTerminal2, 
  IconCircleCheck
} from '@tabler/icons-react';
import Link from 'next/link';

const assignments = [
  { 
    id: 'UNIT-7792-A', 
    project: 'Digital Spaces Study', 
    task: 'Audit Chapter 3 Methodology', 
    due: 'Today', 
    priority: 'High',
    progress: 85
  },
  { 
    id: 'UNIT-8104-B', 
    project: 'Urban Sustainability', 
    task: 'Refactor Figure 2.1 (Python)', 
    due: '24h', 
    priority: 'Medium',
    progress: 40
  },
  { 
    id: 'UNIT-6643-C', 
    project: 'Lab Legacy Archive', 
    task: 'Final PDF Typeset Pass', 
    due: '48h', 
    priority: 'Low',
    progress: 10
  },
];

export default function ResearcherDashboardPage() {
  return (
    <Container size="xl" fluid>
      <Stack gap={40}>
        {/* 1. Researcher Header */}
        <Box>
          <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
            Workload <Text component="span" inherit c="sage">Overview</Text>
          </Title>
          <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
            Operational Queue // Tactical Execution // Current Assigned Units
          </Text>
        </Box>

        {/* 2. Tactical HUD */}
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
          <Paper withBorder p="xl" radius={0} bg="white">
            <Group justify="space-between" mb="xs">
              <Text ff="var(--font-body)" size="xs" c="dimmed">ACTIVE_ASSIGNMENTS</Text>
              <IconClipboardList size={16} color="var(--mantine-color-sage-0)" />
            </Group>
            <Text ff="var(--font-display)" size="xl">03</Text>
            <Progress value={100} color="sage" size="xs" radius={0} mt="sm" />
          </Paper>
          
          <Paper withBorder p="xl" radius={0} bg="white">
            <Group justify="space-between" mb="xs">
              <Text ff="var(--font-body)" size="xs" c="dimmed">UPCOMING_DEADLINES</Text>
              <IconClock size={16} color="var(--mantine-color-orange-6)" />
            </Group>
            <Text ff="var(--font-display)" size="xl">01</Text>
            <Text size="7px" ff="var(--font-body)" c="orange" mt={4}>URGENT: UNIT-7792-A DUE_16:00</Text>
          </Paper>

          <Paper withBorder p="xl" radius={0} bg="white">
            <Group justify="space-between" mb="xs">
              <Text ff="var(--font-body)" size="xs" c="dimmed">INTERNAL_QC_STATUS</Text>
              <IconCircleCheck size={16} color="var(--mantine-color-sage-0)" />
            </Group>
            <Text ff="var(--font-display)" size="xl">OPTIMAL</Text>
            <Text size="7px" ff="var(--font-body)" c="dimmed" mt={4}>ZERO REJECTIONS IN LAST 7 DAYS</Text>
          </Paper>
        </SimpleGrid>

        {/* 3. Assignment Ledger */}
        <Paper withBorder radius={0} p={0} bg="white">
          <Box p="xl" style={{ borderBottom: '1px solid var(--mantine-color-parchment-2)' }}>
            <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
              Current Assigned Units
            </Title>
          </Box>
          <Table verticalSpacing="lg" horizontalSpacing="xl" highlightOnHover>
            <Table.Thead bg="parchment.0">
              <Table.Tr>
                <Table.Th ff="var(--font-body)" size="xs" c="dimmed">UNIT_ID</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="dimmed">PROJECT / TASK</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="dimmed">PRIORITY</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="dimmed">PROGRESS</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="dimmed">ACTIONS</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {assignments.map((unit) => (
                <Table.Tr key={unit.id}>
                  <Table.Td>
                    <Text ff="var(--font-body)" size="xs" fw={700}>{unit.id}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Stack gap={0}>
                      <Text size="sm" fw={700}>{unit.project}</Text>
                      <Text size="xs" c="dimmed">{unit.task}</Text>
                    </Stack>
                  </Table.Td>
                  <Table.Td>
                    <Badge 
                      variant="outline" 
                      color={unit.priority === 'High' ? 'red' : unit.priority === 'Medium' ? 'orange' : 'dimmed'} 
                      size="xs"
                      radius={0}
                    >
                      {unit.priority.toUpperCase()}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="sm">
                      <Progress value={unit.progress} color="deep-green" size="xs" w={100} radius={0} />
                      <Text size="xs" ff="var(--font-body)">{unit.progress}%</Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Tooltip label="Open Production Engine">
                        <ActionIcon 
                          component={Link} 
                          href="/researcher/production" 
                          variant="subtle" 
                          color="deep-green"
                        >
                          <IconTerminal2 size={18} />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Submit for QC">
                        <ActionIcon variant="subtle" color="sage"><IconCircleCheck size={18} /></ActionIcon>
                      </Tooltip>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>

        {/* 4. Researcher Guidance Section */}
        <Paper withBorder p={40} radius={0} bg="deep-green.9">
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={60}>
            <Stack gap="md">
              <Title order={4} ff="var(--font-display)" c="parchment" style={{ textTransform: 'uppercase' }}>
                Principal Guidance
              </Title>
              <Text size="sm" c="parchment" opacity={0.7} style={{ lineHeight: 1.6 }}>
                &quot;Team, focus on the methodology refactor for PRJ-8104 this week. Micah is looking for perfectly typeset R-plots before the Friday pulse. Maintain SHA-256 integrity on all uploads.&quot;
              </Text>
              <Group mt="md">
                <Button variant="outline" color="burnished-gold" radius={0} size="xs" leftSection={<IconMessageCircle size={14} />}>
                  Reply to Principal
                </Button>
              </Group>
            </Stack>
            <Box style={{ border: '1px solid var(--mantine-color-deep-green-7)', padding: '24px' }}>
              <Group justify="space-between" mb="md">
                <Text ff="var(--font-body)" size="xs" c="burnished-gold">PRODUCTION_METRICS</Text>
                <Badge color="sage" radius={0} size="xs">ACTIVE</Badge>
              </Group>
              <Stack gap="xs">
                <Group justify="space-between">
                  <Text size="xs" c="dimmed">Avg. Typeset Velocity:</Text>
                  <Text size="xs" ff="var(--font-body)" c="parchment">2.4s</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="xs" c="dimmed">Commit Success Rate:</Text>
                  <Text size="xs" ff="var(--font-body)" c="parchment">100%</Text>
                </Group>
              </Stack>
            </Box>
          </SimpleGrid>
        </Paper>
      </Stack>
    </Container>
  );
}
