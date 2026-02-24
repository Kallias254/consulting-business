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
  ScrollArea,
  Progress
} from '@mantine/core';
import { 
  IconPlus, 
  IconTarget,
  IconTrophy,
  IconBook,
  IconExternalLink,
  IconSend,
  IconUsers,
  IconActivity
} from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

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
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Container size="xl" fluid>
      <Stack gap={40}>
        {/* 1. Page Header */}
        <Box>
          <Group justify="space-between" align="flex-end" wrap="wrap">
            <Box>
              <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
                Opportunity <Text component="span" inherit c="burnished-gold.7">Curator</Text>
              </Title>
              <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
                Scholarly Intelligence // Strategic Matching // Retainer Value Creation
              </Text>
            </Box>
            <Button 
              leftSection={<IconPlus size={16} />} 
              color="burnished-gold" 
              c="dark-forest" 
              radius={0}
              w={{ base: '100%', sm: 'auto' }}
            >
              Curate New Entry
            </Button>
          </Group>
        </Box>

        {/* 2. Scanning HUD */}
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
          <Paper withBorder p="xl" radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
            <Group justify="space-between" mb="md">
              <Text ff="var(--font-body)" size="xs" c="burnished-gold" style={{ letterSpacing: '1px' }}>ENGINE_SCAN_STATUS</Text>
              <IconTarget size={18} color="var(--mantine-color-burnished-gold-7)" />
            </Group>
            <Stack gap={4}>
              <Text ff="var(--font-display)" size="2.5rem" c="sage" style={{ lineHeight: 1 }}>ACTIVE</Text>
              <Text size="9px" ff="var(--font-body)" c="dimmed" style={{ letterSpacing: '1px' }}>MONITORING: GOOGLE_SCHOLAR, CROSSREF</Text>
            </Stack>
            <Progress value={100} color="sage" size="xs" radius={0} mt="xl" />
          </Paper>
          
          <Paper withBorder p="xl" radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
            <Group justify="space-between" mb="md">
              <Text ff="var(--font-body)" size="xs" c="burnished-gold" style={{ letterSpacing: '1px' }}>POTENTIAL_MATCHES</Text>
              <IconUsers size={18} color="var(--mantine-color-burnished-gold-7)" />
            </Group>
            <Stack gap={4}>
              <Text ff="var(--font-display)" size="2.5rem" c="#E1E1E1" style={{ lineHeight: 1 }}>12</Text>
              <Text size="9px" ff="var(--font-body)" c="dimmed" style={{ letterSpacing: '1px' }}>SCHOLARS AWAITING RECOMMENDATION</Text>
            </Stack>
            <Progress value={65} color="burnished-gold" size="xs" radius={0} mt="xl" />
          </Paper>

          <Paper withBorder p="xl" radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
            <Group justify="space-between" mb="md">
              <Text ff="var(--font-body)" size="xs" c="burnished-gold" style={{ letterSpacing: '1px' }}>CONVERSION_VALUE</Text>
              <IconTrophy size={18} color="var(--mantine-color-burnished-gold-7)" />
            </Group>
            <Stack gap={4}>
              <Text ff="var(--font-display)" size="2.5rem" c="#E1E1E1" style={{ lineHeight: 1 }}>$8.5K</Text>
              <Text size="9px" ff="var(--font-body)" c="dimmed" style={{ letterSpacing: '1px' }}>PROJECTED UPSIDE FROM CURATED CFCs</Text>
            </Stack>
            <Progress value={40} color="gray.6" size="xs" radius={0} mt="xl" />
          </Paper>
        </SimpleGrid>

        {/* 3. Curator Ledger */}
        <Paper withBorder radius={0} p={0} bg="transparent" style={{ borderColor: '#2A2D31', overflow: 'hidden' }}>
          <Box p="xl" bg="#0A0B0C" style={{ borderBottom: '1px solid #2A2D31' }}>
            <Group justify="space-between">
              <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                Academic Intelligence Ledger
              </Title>
              <Badge variant="outline" color="sage" radius={0} size="xs">SECURE_SYNC_v2</Badge>
            </Group>
          </Box>
          <ScrollArea>
            <Table verticalSpacing="lg" horizontalSpacing="xl" highlightOnHover style={{ minWidth: 800 }}>
              <Table.Thead bg="#0A0B0C">
                <Table.Tr>
                  <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="dimmed">OPP_ID</Table.Th>
                  <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="dimmed">OPPORTUNITY_TITLE</Table.Th>
                  <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="dimmed">TARGET_SCHOLARS</Table.Th>
                  <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="dimmed">DEADLINE</Table.Th>
                  <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="dimmed">STATUS</Table.Th>
                  <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="dimmed"></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {opportunities.map((opp) => (
                  <Table.Tr key={opp.id} style={{ borderBottom: '1px solid #2A2D31' }}>
                    <Table.Td>
                      <Text ff="var(--font-body)" size="9px" c="dimmed">{opp.id}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Stack gap={0}>
                        <Text size="sm" fw={700} c="#E1E1E1">{opp.title}</Text>
                        <Group gap={4}>
                          {opp.type === 'Call for Chapters' ? <IconBook size={10} color="var(--mantine-color-burnished-gold-7)" /> : <IconTrophy size={10} color="var(--mantine-color-burnished-gold-7)" />}
                          <Text size="9px" c="burnished-gold" ff="var(--font-body)" style={{ letterSpacing: '0.5px' }}>{opp.type.toUpperCase()}</Text>
                        </Group>
                      </Stack>
                    </Table.Td>
                    <Table.Td>
                      <Avatar.Group spacing="sm">
                        {opp.matches.map((name, i) => (
                          <Tooltip key={i} label={name}>
                            <Avatar size="xs" radius={0} color="dark" bg="#2A2D31">{name[0]}</Avatar>
                          </Tooltip>
                        ))}
                      </Avatar.Group>
                    </Table.Td>
                    <Table.Td>
                      <Text size="xs" c={opp.deadline === 'Rolling' ? 'sage' : '#E1E1E1'}>{opp.deadline}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge variant="outline" color={opp.status === 'Curated' ? 'sage' : 'burnished-gold'} size="xs" radius={0}>
                        {opp.status.toUpperCase()}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <Tooltip label="Push to Portal">
                          <ActionIcon variant="subtle" color="gray.6"><IconSend size={16} /></ActionIcon>
                        </Tooltip>
                        <Tooltip label="External Link">
                          <ActionIcon variant="subtle" color="gray.6"><IconExternalLink size={16} /></ActionIcon>
                        </Tooltip>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </Paper>
      </Stack>
    </Container>
  );
}
