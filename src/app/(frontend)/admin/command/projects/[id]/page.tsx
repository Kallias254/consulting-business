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
  ActionIcon, 
  Tooltip, 
  Box, 
  Button,
  Divider,
  SimpleGrid,
  Timeline,
  Table,
  RingProgress
} from '@mantine/core';
import { 
  IconArrowLeft,
  IconCircleCheck,
  IconClock,
  IconLock,
  IconFileCheck,
  IconVersions,
  IconHistory,
  IconMessageCircle,
  IconCoin,
  IconUser,
  IconUsers
} from '@tabler/icons-react';
import Link from 'next/link';

// Mock data - in a real app, this would be fetched based on the [id] param
const project = { 
  id: 'PRJ-7792', 
  name: 'Impact of Digital Spaces on Youth Development', 
  client: 'Dr. Emily Chen', 
  researcher: 'Sarah Miller', 
  niche: 'Social Sciences',
  status: 'Executive Review', 
  sentiment: 'Optimal',
  fridayPulse: 'Ready',
  readiness: 94,
  financials: {
    gross: '22,500.00',
    net: '21,825.00',
    researcher: '16,368.75',
    agency: '5,456.25'
  }
};

export default function SingleProjectPage({ params }: { params: { id: string } }) {
  return (
    <Container size="xl" fluid>
      <Stack gap={40}>
        {/* 1. Page Header */}
        <Box>
          <Button 
            component={Link} 
            href="/admin/command/projects" 
            variant="subtle" 
            color="deep-green.3" 
            leftSection={<IconArrowLeft size={16} />} 
            p={0} 
            mb="md"
          >
            Back to All Projects
          </Button>
          <Group justify="space-between" align="flex-end">
            <Box>
              <Title order={2} ff="var(--font-display)" size="2.5rem" c="parchment" style={{ textTransform: 'uppercase' }}>
                {project.name}
              </Title>
              <Text c="deep-green.3" size="sm" ff="var(--font-body)" mt={4}>
                Project Ledger // ID: {params.id}
              </Text>
            </Box>
            <Group gap="md">
              <Button variant="outline" color="burnished-gold" radius={0} leftSection={<IconMessageCircle size={16} />}>
                Liaison Comms
              </Button>
              <Button color="burnished-gold" c="dark-forest" radius={0}>
                Advance Phase
              </Button>
            </Group>
          </Group>
        </Box>

        {/* 2. Project Vitals */}
        <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} spacing="xl">
          <Paper withBorder p="xl" radius={0} bg="rgba(14, 29, 22, 0.4)" style={{ borderColor: 'var(--mantine-color-deep-green-8)' }}>
            <Group justify="space-between" mb="xs">
              <Text size="xs" c="deep-green.3">CLIENT</Text>
              <IconUser size={16} color="var(--mantine-color-deep-green-5)" />
            </Group>
            <Text ff="var(--font-display)" size="xl" c="parchment">{project.client}</Text>
          </Paper>
          <Paper withBorder p="xl" radius={0} bg="rgba(14, 29, 22, 0.4)" style={{ borderColor: 'var(--mantine-color-deep-green-8)' }}>
            <Group justify="space-between" mb="xs">
              <Text size="xs" c="deep-green.3">ASSIGNED</Text>
              <IconUsers size={16} color="var(--mantine-color-deep-green-5)" />
            </Group>
            <Text ff="var(--font-display)" size="xl" c="parchment">{project.researcher}</Text>
          </Paper>
          <Paper withBorder p="xl" radius={0} bg="rgba(14, 29, 22, 0.4)" style={{ borderColor: 'var(--mantine-color-deep-green-8)' }}>
            <Group justify="space-between" mb="xs">
              <Text size="xs" c="deep-green.3">STATUS</Text>
              <IconClock size={16} color="var(--mantine-color-deep-green-5)" />
            </Group>
            <Badge variant="filled" color="burnished-gold" size="lg" radius={0}>
              {project.status.toUpperCase()}
            </Badge>
          </Paper>
          <Paper withBorder p={40} radius={0} bg="rgba(14, 29, 22, 0.8)" style={{ borderColor: 'var(--mantine-color-deep-green-8)' }}>
            <Stack align="center" gap="md">
              <RingProgress
                size={120}
                thickness={8}
                roundCaps
                label={<Text size="xl" fw={700} ta="center" ff="var(--font-display)" c="parchment">{project.readiness}%</Text>}
                sections={[{ value: project.readiness, color: 'sage' }]}
              />
              <Text ff="var(--font-display)" size="sm" c="sage" style={{ textTransform: 'uppercase' }}>Submission Readiness</Text>
            </Stack>
          </Paper>
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, lg: 3 }} spacing={40}>
          {/* 3. Detailed Audit Trail */}
          <Box style={{ gridColumn: 'span 2' }}>
            <Paper withBorder radius={0} p={0} bg="transparent" style={{ borderColor: 'var(--mantine-color-deep-green-8)' }}>
              <Box p="xl" bg="rgba(14, 29, 22, 0.6)" style={{ borderBottom: '1px solid var(--mantine-color-deep-green-8)' }}>
                <Title order={4} ff="var(--font-display)" c="burnished-gold" style={{ letterSpacing: '1px' }}>
                  <IconHistory size={20} style={{ marginBottom: -4, marginRight: 8 }} />
                  Success Trail & Ledger
                </Title>
              </Box>
              <Box p="xl">
                <Timeline active={3} bulletSize={24} lineWidth={1} color="sage">
                  <Timeline.Item bullet={<IconFileCheck size={14} />} title="Intake Form Validated">
                    <Text size="xs" c="deep-green.3">Session Start // 01 Feb 2026</Text>
                  </Timeline.Item>
                  <Timeline.Item bullet={<IconVersions size={14} />} title="Initial Typeset Draft">
                    <Text size="xs" c="deep-green.3">First Proof Generated</Text>
                  </Timeline.Item>
                  <Timeline.Item bullet={<IconCircleCheck size={14} />} title="Technical Validation">
                    <Text size="xs" c="deep-green.3">Methodology Audit Pass</Text>
                  </Timeline.Item>
                  <Timeline.Item bullet={<IconClock size={14} />} title="Executive Review">
                    <Text size="xs" fw={700} c="sage">Final Pass Active</Text>
                  </Timeline.Item>
                  <Timeline.Item bullet={<IconLock size={14} />} title="Journal Submission" bulletSize={16}>
                    <Text size="xs" c="deep-green.3">Phase 5: Pending</Text>
                  </Timeline.Item>
                </Timeline>
              </Box>
            </Paper>
          </Box>

          {/* 4. Financials */}
          <Box>
            <Paper withBorder radius={0} p={40} bg="rgba(14, 29, 22, 0.6)" style={{ borderColor: 'var(--mantine-color-deep-green-8)' }}>
              <Title order={5} ff="var(--font-display)" c="burnished-gold" mb="xl" style={{ letterSpacing: '1px' }}>
                <IconCoin size={20} style={{ marginBottom: -4, marginRight: 8 }} />
                Financial Ledger
              </Title>
              <Stack gap="lg">
                <Box>
                  <Text size="xs" c="deep-green.3">Gross Fee</Text>
                  <Text size="lg" ff="var(--font-display)" c="parchment">${project.financials.gross}</Text>
                </Box>
                <Divider color="deep-green.8" />
                <Group justify="space-between">
                  <Text size="xs" c="deep-green.3">Researcher Payout (75%)</Text>
                  <Text size="md" ff="var(--font-display)" c="sage">${project.financials.researcher}</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="xs" c="deep-green.3">Agency Margin (25%)</Text>
                  <Text size="md" ff="var(--font-display)" c="burnished-gold">${project.financials.agency}</Text>
                </Group>
                <Divider color="deep-green.8" />
                <Button variant="outline" color="deep-green.3" radius={0} size="xs">
                  View Full Financials
                </Button>
              </Stack>
            </Paper>
          </Box>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
