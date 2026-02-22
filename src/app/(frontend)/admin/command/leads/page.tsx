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
  Avatar, 
  SimpleGrid, 
  Progress,
  TextInput
} from '@mantine/core';
import { 
  IconSearch, 
  IconUserPlus, 
  IconCalendarStats,
  IconCircleCheck,
  IconMailForward,
  IconSchool
} from '@tabler/icons-react';

const leads = [
  { 
    id: 'L-1024', 
    name: 'Dr. Aris Noble', 
    institution: 'Yale University', 
    field: 'Behavioral Economics', 
    interest: 'Grant Rebuttal',
    source: 'Referral: Micah', 
    status: 'Discovery Sync', 
    value: 'Tier 3 ($12k)',
    priority: 'High'
  },
  { 
    id: 'L-1025', 
    name: 'Prof. Elena Sofia', 
    institution: 'Oxford', 
    field: 'Developmental Psych', 
    interest: 'Legacy Book Archive',
    source: 'Health Check Form', 
    status: 'Nurture (Insights)', 
    value: 'Tier 2 ($5k)',
    priority: 'Medium'
  },
  { 
    id: 'L-1026', 
    name: 'Dr. Kevin Zhang', 
    institution: 'MIT', 
    field: 'Human-AI Interaction', 
    interest: 'Manuscript Polish',
    source: 'Referral: Dr. Chen', 
    status: 'Awaiting Intake', 
    value: 'Tier 1 ($2k)',
    priority: 'Low'
  },
  { 
    id: 'L-1027', 
    name: 'Dr. Sarah Jenkins', 
    institution: 'Stanford', 
    field: 'Urban Planning', 
    interest: 'Simultaneous Submission',
    source: 'Outreach', 
    status: 'Proposal Sent', 
    value: 'Tier 3 ($15k)',
    priority: 'High'
  },
];

export default function LeadsPage() {
  return (
    <Container size="xl" fluid>
      <Stack gap={40}>
        {/* 1. Page Header */}
        <Box>
          <Group justify="space-between" align="flex-end">
            <Box>
              <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
                Opportunity <Text component="span" inherit c="burnished-gold.7">Pipeline</Text>
              </Title>
              <Text c="deep-green.3" size="sm" ff="var(--font-body)" mt={4}>
                Scholarly Triage // Discovery-to-Product Bridge // Global Intake HUD
              </Text>
            </Box>
            <Button 
              leftSection={<IconUserPlus size={16} />} 
              color="burnished-gold" 
              c="dark-forest" 
              radius={0}
            >
              Manual Ingestion
            </Button>
          </Group>
        </Box>

        {/* 2. Conversion HUD */}
        <SimpleGrid cols={{ base: 1, md: 4 }} spacing="xl">
          <Paper withBorder p="md" bg="black" style={{ border: '1px solid var(--mantine-color-deep-green-7)' }}>
            <Text ff="var(--font-body)" size="7px" c="deep-green.3" style={{ letterSpacing: '1px' }}>MONTHLY_INTAKE</Text>
            <Text ff="var(--font-display)" size="xl" c="parchment">14</Text>
            <Progress value={75} color="sage" size="xs" radius={0} mt="sm" />
          </Paper>
          <Paper withBorder p="md" bg="black" style={{ border: '1px solid var(--mantine-color-deep-green-7)' }}>
            <Text ff="var(--font-body)" size="7px" c="deep-green.3" style={{ letterSpacing: '1px' }}>DISCOVERY_SYNC_RATE</Text>
            <Text ff="var(--font-display)" size="xl" c="parchment">68%</Text>
            <Progress value={68} color="burnished-gold" size="xs" radius={0} mt="sm" />
          </Paper>
          <Paper withBorder p="md" bg="black" style={{ border: '1px solid var(--mantine-color-burnished-gold-0)' }}>
            <Text ff="var(--font-body)" size="7px" c="burnished-gold" style={{ letterSpacing: '1px' }}>PIPE_VALUATION</Text>
            <Text ff="var(--font-display)" size="xl" c="parchment">$42,500</Text>
            <Progress value={85} color="sage" size="xs" radius={0} mt="sm" />
          </Paper>
          <Paper withBorder p="md" bg="black" style={{ border: '1px solid var(--mantine-color-deep-green-7)' }}>
            <Text ff="var(--font-body)" size="7px" c="deep-green.3" style={{ letterSpacing: '1px' }}>NURTURE_POOL</Text>
            <Text ff="var(--font-display)" size="xl" c="parchment">32</Text>
            <Progress value={40} color="deep-green.3" size="xs" radius={0} mt="sm" />
          </Paper>
        </SimpleGrid>

        {/* 3. The Leads Ledger */}
        <Paper withBorder radius={0} p={0} bg="transparent">
          <Box p="xl" style={{ borderBottom: '1px solid var(--mantine-color-deep-green-3)' }}>
            <Group justify="space-between">
              <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                Scientific Triage Ledger
              </Title>
              <Group>
                <TextInput 
                  placeholder="Search scholars..." 
                  size="xs" 
                  leftSection={<IconSearch size={14} />} 
                  variant="unstyled"
                  style={{ borderBottom: '1px solid var(--mantine-color-deep-green-7)' }}
                />
              </Group>
            </Group>
          </Box>
          <Table verticalSpacing="lg" horizontalSpacing="xl" highlightOnHover>
            <Table.Thead bg="rgba(14, 29, 22, 0.6)">
              <Table.Tr>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">SCHOLAR</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">INSTITUTION_FIELD</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">PROJECT_INTEREST</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">TRIAGE_STATUS</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">EST_VALUE</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3"></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {leads.map((lead) => (
                <Table.Tr key={lead.id}>
                  <Table.Td>
                    <Group gap="sm">
                      <Avatar size="sm" radius={0} color={lead.priority === 'High' ? 'orange' : 'deep-green'}>
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Box>
                        <Text size="sm" fw={700} c="parchment">{lead.name}</Text>
                        <Text size="7px" c="deep-green.3" ff="var(--font-body)">ID: {lead.id}</Text>
                      </Box>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Stack gap={0}>
                      <Group gap={4}>
                        <IconSchool size={12} color="var(--mantine-color-deep-green-3)" />
                        <Text size="xs" c="parchment">{lead.institution}</Text>
                      </Group>
                      <Text size="xs" c="dimmed">{lead.field}</Text>
                    </Stack>
                  </Table.Td>
                  <Table.Td>
                    <Badge variant="outline" color="burnished-gold" size="xs">{lead.interest.toUpperCase()}</Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap={6}>
                      <Box 
                        w={6} h={6} 
                        bg={lead.status === 'Discovery Sync' ? 'sage' : 'deep-green.3'} 
                        style={{ borderRadius: '50%' }} 
                      />
                      <Text ff="var(--font-body)" size="xs" c="parchment">{lead.status.toUpperCase()}</Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Text ff="var(--font-body)" size="xs" c="burnished-gold">{lead.value}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Tooltip label="Schedule Sync">
                        <ActionIcon variant="subtle" color="deep-green.3"><IconCalendarStats size={16} /></ActionIcon>
                      </Tooltip>
                      <Tooltip label="Promote to Project">
                        <ActionIcon variant="subtle" color="sage"><IconCircleCheck size={16} /></ActionIcon>
                      </Tooltip>
                      <Tooltip label="Nurture Email">
                        <ActionIcon variant="subtle" color="deep-green.3"><IconMailForward size={16} /></ActionIcon>
                      </Tooltip>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>

        {/* 4. Strategic Ingestion Analytics */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          <Paper withBorder p="xl" radius={0} bg="rgba(14, 29, 22, 0.2)">
            <Title order={5} ff="var(--font-display)" c="burnished-gold" mb="xl" style={{ textTransform: 'uppercase' }}>
              Lead Sources
            </Title>
            <Stack gap="md">
              {[
                { name: 'Direct Referrals (Micah)', count: 18, value: 65 },
                { name: 'Scientific Health Check Form', count: 12, value: 40 },
                { name: 'Strategic Outreach', count: 5, value: 20 },
              ].map((source, i) => (
                <Box key={i}>
                  <Group justify="space-between" mb={4}>
                    <Text size="xs" fw={700}>{source.name}</Text>
                    <Text ff="var(--font-body)" size="xs" c="dimmed">{source.count} LEADS</Text>
                  </Group>
                  <Progress value={source.value} color="deep-green.7" size="xs" radius={0} />
                </Box>
              ))}
            </Stack>
          </Paper>

          <Paper withBorder p="xl" radius={0} bg="rgba(14, 29, 22, 0.2)">
            <Title order={5} ff="var(--font-display)" c="burnished-gold" mb="xl" style={{ textTransform: 'uppercase' }}>
              Pipeline Distribution
            </Title>
            <Group grow align="flex-end">
              <Stack gap="xs" align="center">
                <Text ff="var(--font-display)" size="xl">45%</Text>
                <Box w="100%" h={100} bg="deep-green.8" style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Box w="100%" h="45%" bg="sage" />
                </Box>
                <Text ff="var(--font-body)" size="7px" c="dimmed">GRANT_REBUTTALS</Text>
              </Stack>
              <Stack gap="xs" align="center">
                <Text ff="var(--font-display)" size="xl">25%</Text>
                <Box w="100%" h={100} bg="deep-green.8" style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Box w="100%" h="25%" bg="sage" />
                </Box>
                <Text ff="var(--font-body)" size="7px" c="dimmed">MANUSCRIPT_POLISH</Text>
              </Stack>
              <Stack gap="xs" align="center">
                <Text ff="var(--font-display)" size="xl">20%</Text>
                <Box w="100%" h={100} bg="deep-green.8" style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Box w="100%" h="20%" bg="burnished-gold" />
                </Box>
                <Text ff="var(--font-body)" size="7px" c="dimmed">BESPOKE_VISUALS</Text>
              </Stack>
              <Stack gap="xs" align="center">
                <Text ff="var(--font-display)" size="xl">10%</Text>
                <Box w="100%" h={100} bg="deep-green.8" style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Box w="100%" h="10%" bg="burnished-gold" />
                </Box>
                <Text ff="var(--font-body)" size="7px" c="dimmed">ARCHIVE_MGMT</Text>
              </Stack>
            </Group>
          </Paper>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
