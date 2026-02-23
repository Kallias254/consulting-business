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
  Checkbox,
  SimpleGrid,
  Progress
} from '@mantine/core';
import { 
  IconCircleCheck, 
  IconSend, 
  IconAlertCircle,
  IconClock,
  IconFingerprint,
  IconEdit
} from '@tabler/icons-react';

const pulseDrafts = [
  { 
    id: 'PULSE-7792', 
    client: 'Dr. Emily Chen', 
    project: 'Digital Spaces Study',
    status: 'Ready',
    phase: 'Executive Review',
    message: 'We are currently in Phase 3. No action required from you.',
    anxietyLevel: 'Low'
  },
  { 
    id: 'PULSE-8104', 
    client: 'Prof. Marcus Ross', 
    project: 'Urban Sustainability',
    status: 'Drafting',
    phase: 'Production',
    message: 'Chapter 2 methodology is being finalized by Dr. Wilson.',
    anxietyLevel: 'Medium'
  },
  { 
    id: 'PULSE-9021', 
    client: 'Dr. Linda Vo', 
    project: 'NSF Keynote Suite',
    status: 'Ready',
    phase: 'Internal QC',
    message: 'Visualizations are being polished for the Friday delivery.',
    anxietyLevel: 'High'
  },
];

export default function FridayPulsePage() {
  return (
    <Container size="xl" fluid>
      <Stack gap={40}>
        {/* 1. Page Header */}
        <Box>
          <Group justify="space-between" align="flex-end">
            <Box>
              <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
                Friday <Text component="span" inherit c="burnished-gold.7">Pulse</Text> Desk
              </Title>
              <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
                Automated Status Management // Bulk Executive Authorization // Weekend Peace of Mind
              </Text>
            </Box>
            <Button 
              leftSection={<IconSend size={16} />} 
              color="burnished-gold" 
              c="dark-forest" 
              radius={0}
              size="sm"
              onClick={() => alert('ALL PULSES DISPATCHED // CLIENT ANXIETY NEUTRALIZED')}
            >
              Authorize & Fire All Pulses
            </Button>
          </Group>
        </Box>

        {/* 2. Pulse Scheduler Status */}
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
          <Paper withBorder p="xl" radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
            <Group justify="space-between" mb="xs">
              <Text ff="var(--font-body)" size="xs" c="burnished-gold">SCHEDULER_STATUS</Text>
              <IconClock size={16} color="var(--mantine-color-burnished-gold-7)" />
            </Group>
            <Text ff="var(--font-display)" size="xl" c="#E1E1E1">T-04:12:45</Text>
            <Text size="7px" ff="var(--font-body)" c="dimmed">UNTIL FRIDAY 16:00 RELEASE</Text>
          </Paper>
          
          <Paper withBorder p="xl" radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
            <Group justify="space-between" mb="xs">
              <Text ff="var(--font-body)" size="xs" c="burnished-gold">DRAFTS_COMPLETED</Text>
              <IconCircleCheck size={16} color="var(--mantine-color-sage-7)" />
            </Group>
            <Text ff="var(--font-display)" size="xl" c="#E1E1E1">12 / 14</Text>
            <Progress value={85} color="sage" size="xs" radius={0} mt="sm" />
          </Paper>

          <Paper withBorder p="xl" radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
            <Group justify="space-between" mb="xs">
              <Text ff="var(--font-body)" size="xs" c="burnished-gold">ANXIETY_FLAG_COUNT</Text>
              <IconAlertCircle size={16} color="var(--mantine-color-orange-7)" />
            </Group>
            <Text ff="var(--font-display)" size="xl" c="#E1E1E1">02</Text>
            <Text size="7px" ff="var(--font-body)" c="dimmed">REQUIRES PERSONAL MICAH VOICE</Text>
          </Paper>
        </SimpleGrid>

        {/* 3. Pulse Approval Ledger */}
        <Paper withBorder radius={0} p={0} bg="transparent" style={{ borderColor: '#2A2D31' }}>
          <Box p="xl" style={{ borderBottom: '1px solid #2A2D31' }}>
            <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
              Weekend Status Drafts
            </Title>
          </Box>
          <Table verticalSpacing="lg" horizontalSpacing="xl" highlightOnHover>
            <Table.Thead bg="#0A0B0C">
              <Table.Tr>
                <Table.Th w={40}><Checkbox radius={0} color="sage" /></Table.Th>
                <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="dimmed">CLIENT_PROJECT</Table.Th>
                <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="dimmed">CURRENT_PHASE</Table.Th>
                <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="dimmed">PULSE_MESSAGE</Table.Th>
                <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="dimmed">STATUS</Table.Th>
                <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="dimmed"></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {pulseDrafts.map((pulse) => (
                <Table.Tr key={pulse.id} style={{ borderBottom: '1px solid #2A2D31' }}>
                  <Table.Td><Checkbox radius={0} color="sage" defaultChecked={pulse.status === 'Ready'} /></Table.Td>
                  <Table.Td>
                    <Stack gap={0}>
                      <Text size="sm" fw={700} c="#E1E1E1">{pulse.client}</Text>
                      <Text size="xs" c="dimmed">{pulse.project}</Text>
                    </Stack>
                  </Table.Td>
                  <Table.Td>
                    <Badge variant="outline" color="gray.6" size="xs" radius={0}>{pulse.phase.toUpperCase()}</Badge>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs" c="#E1E1E1" fs="italic">&quot;{pulse.message}&quot;</Text>
                  </Table.Td>
                  <Table.Td>
                    <Badge 
                      variant="filled" 
                      color={pulse.status === 'Ready' ? 'sage' : 'burnished-gold'} 
                      size="xs"
                      c="dark-forest"
                      radius={0}
                    >
                      {pulse.status.toUpperCase()}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <ActionIcon variant="subtle" color="gray.6"><IconEdit size={16} /></ActionIcon>
                      <Tooltip label="Verify Fingerprint">
                        <ActionIcon variant="subtle" color="gray.6"><IconFingerprint size={16} /></ActionIcon>
                      </Tooltip>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </Stack>
    </Container>
  );
}
