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
  SimpleGrid
} from '@mantine/core';
import { 
  IconPlus, 
  IconTarget,
  IconTrophy,
  IconBook,
  IconExternalLink,
  IconSend,
  IconUsers
} from '@tabler/icons-react';

const opportunities = [
  { 
    id: 'OPP-442', 
    title: 'CFC: Routledge Handbook of Digital Sociology', 
    type: 'Call for Chapters', 
    deadline: '15 Mar 2026', 
    matches: ['Dr. Emily Chen', 'Dr. Kevin Zhang'],
    impact: 'High',
    status: 'Curated'
  },
  { 
    id: 'OPP-443', 
    title: 'Fulbright US Scholar Program (Q3 Cycle)', 
    type: 'Fellowship', 
    deadline: '01 Jun 2026', 
    matches: ['Prof. Marcus Ross'],
    impact: 'Elite',
    status: 'Curated'
  },
  { 
    id: 'OPP-444', 
    title: 'CRC Press: Social Networks & AI Monograph', 
    type: 'Book Proposal', 
    deadline: 'Rolling', 
    matches: ['Dr. Linda Vo'],
    impact: 'Medium',
    status: 'Proposed'
  },
];

export default function OpportunityCuratorPage() {
  return (
    <Container size="xl" fluid>
      <Stack gap={40}>
        {/* 1. Page Header */}
        <Box>
          <Group justify="space-between" align="flex-end">
            <Box>
              <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
                Opportunity <Text component="span" inherit c="burnished-gold.7">Curator</Text>
              </Title>
              <Text c="deep-green.3" size="sm" ff="var(--font-body)" mt={4}>
                Scholarly Intelligence // Strategic Matching // Retainer Value Creation
              </Text>
            </Box>
            <Button 
              leftSection={<IconPlus size={16} />} 
              color="burnished-gold" 
              c="dark-forest" 
              radius={0}
            >
              Curate New Entry
            </Button>
          </Group>
        </Box>

        {/* 2. Scanning HUD */}
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
          <Paper withBorder p="xl" radius={0} bg="black" style={{ border: '1px solid var(--mantine-color-deep-green-7)' }}>
            <Group justify="space-between" mb="xs">
              <Text ff="var(--font-body)" size="xs" c="burnished-gold">ENGINE_SCAN_STATUS</Text>
              <IconTarget size={16} color="var(--mantine-color-burnished-gold-7)" />
            </Group>
            <Text ff="var(--font-display)" size="xl">ACTIVE</Text>
            <Text size="7px" ff="var(--font-body)" c="sage">MONITORING: GOOGLE_SCHOLAR, CROSSREF, CRC_PRESS</Text>
          </Paper>
          
          <Paper withBorder p="xl" radius={0} bg="black" style={{ border: '1px solid var(--mantine-color-deep-green-7)' }}>
            <Group justify="space-between" mb="xs">
              <Text ff="var(--font-body)" size="xs" c="burnished-gold">POTENTIAL_MATCHES</Text>
              <IconUsers size={16} color="var(--mantine-color-burnished-gold-7)" />
            </Group>
            <Text ff="var(--font-display)" size="xl">12</Text>
            <Text size="7px" ff="var(--font-body)" c="dimmed">SCHOLARS AWAITING RECOMMENDATION</Text>
          </Paper>

          <Paper withBorder p="xl" radius={0} bg="black" style={{ border: '1px solid var(--mantine-color-burnished-gold-0)' }}>
            <Group justify="space-between" mb="xs">
              <Text ff="var(--font-body)" size="xs" c="burnished-gold">CONVERSION_VALUE</Text>
              <IconTrophy size={16} color="var(--mantine-color-burnished-gold-7)" />
            </Group>
            <Text ff="var(--font-display)" size="xl">$8.5K</Text>
            <Text size="7px" ff="var(--font-body)" c="dimmed">PROJECTED UPSIDE FROM CURATED CFCs</Text>
          </Paper>
        </SimpleGrid>

        {/* 3. Curator Ledger */}
        <Paper withBorder radius={0} p={0} bg="transparent">
          <Box p="xl" style={{ borderBottom: '1px solid var(--mantine-color-deep-green-3)' }}>
            <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
              Academic Intelligence Ledger
            </Title>
          </Box>
          <Table verticalSpacing="lg" horizontalSpacing="xl" highlightOnHover>
            <Table.Thead bg="rgba(14, 29, 22, 0.6)">
              <Table.Tr>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">OPP_ID</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">OPPORTUNITY_TITLE</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">TARGET_SCHOLARS</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">DEADLINE</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">STATUS</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3"></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {opportunities.map((opp) => (
                <Table.Tr key={opp.id}>
                  <Table.Td>
                    <Text ff="var(--font-body)" size="xs" c="dimmed">{opp.id}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Stack gap={0}>
                      <Text size="sm" fw={700} c="parchment">{opp.title}</Text>
                      <Group gap={4}>
                        {opp.type === 'Call for Chapters' ? <IconBook size={10} color="var(--mantine-color-burnished-gold-7)" /> : <IconTrophy size={10} color="var(--mantine-color-burnished-gold-7)" />}
                        <Text size="7px" c="burnished-gold" ff="var(--font-body)">{opp.type.toUpperCase()}</Text>
                      </Group>
                    </Stack>
                  </Table.Td>
                  <Table.Td>
                    <Avatar.Group spacing="sm">
                      {opp.matches.map((name, i) => (
                        <Tooltip key={i} label={name}>
                          <Avatar size="xs" radius={0} color="deep-green">{name[0]}</Avatar>
                        </Tooltip>
                      ))}
                    </Avatar.Group>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs" c={opp.deadline === 'Rolling' ? 'sage' : 'parchment'}>{opp.deadline}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Badge variant="outline" color={opp.status === 'Curated' ? 'sage' : 'burnished-gold'} size="xs">
                      {opp.status.toUpperCase()}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Tooltip label="Push to Portal">
                        <ActionIcon variant="subtle" color="sage"><IconSend size={16} /></ActionIcon>
                      </Tooltip>
                      <Tooltip label="External Link">
                        <ActionIcon variant="subtle" color="deep-green.3"><IconExternalLink size={16} /></ActionIcon>
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
