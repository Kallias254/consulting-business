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
  Switch,
  Divider,
  Progress
} from '@mantine/core';
import { 
  IconWorld, 
  IconExternalLink,
  IconMicrophone2,
  IconEdit,
  IconEye,
  IconCloudUpload,
  IconDeviceDesktop
} from '@tabler/icons-react';

const portfolioClients = [
  { 
    id: 'P-001', 
    name: 'Dr. Emily Chen', 
    domain: 'emilychen.edu', 
    status: 'Active', 
    lastUpdate: '2h ago',
    projectsPublic: 3,
    upcomingTalks: 2,
    health: 98
  },
  { 
    id: 'P-002', 
    name: 'Prof. Marcus Ross', 
    domain: 'marcusross.scholar.com', 
    status: 'Syncing', 
    lastUpdate: '14h ago',
    projectsPublic: 5,
    upcomingTalks: 0,
    health: 85
  },
  { 
    id: 'P-003', 
    name: 'Dr. Linda Vo', 
    domain: 'lindavo.ac.nz', 
    status: 'Paused', 
    lastUpdate: '3d ago',
    projectsPublic: 1,
    upcomingTalks: 1,
    health: 40
  },
];

export default function PortfolioManagerPage() {
  return (
    <Container size="xl" fluid>
      <Stack gap={40}>
        {/* 1. Page Header */}
        <Box>
          <Group justify="space-between" align="flex-end">
            <Box>
              <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
                Impact <Text component="span" inherit c="burnished-gold.7">Portfolios</Text>
              </Title>
              <Text c="deep-green.3" size="sm" ff="var(--font-body)" mt={4}>
                Multi-Tenant Rendering // Self-Updating Academic Legacies // Domain Management
              </Text>
            </Box>
            <Button 
              leftSection={<IconWorld size={16} />} 
              color="burnished-gold" 
              c="dark-forest" 
              radius={0}
            >
              Deploy New Scholar Site
            </Button>
          </Group>
        </Box>

        {/* 2. Portfolio Stats */}
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
          <Paper withBorder p="xl" radius={0} bg="rgba(14, 29, 22, 0.2)">
            <Group justify="space-between" mb="xs">
              <Text ff="var(--font-body)" size="xs" c="burnished-gold">NETWORK_VISIBILITY</Text>
              <IconEye size={16} color="var(--mantine-color-burnished-gold-7)" />
            </Group>
            <Text ff="var(--font-display)" size="xl">12.4K</Text>
            <Text size="7px" ff="var(--font-body)" c="dimmed">TOTAL_VISITS_Q1</Text>
          </Paper>
          
          <Paper withBorder p="xl" radius={0} bg="rgba(14, 29, 22, 0.2)">
            <Group justify="space-between" mb="xs">
              <Text ff="var(--font-body)" size="xs" c="burnished-gold">TALKS_SYNCED</Text>
              <IconMicrophone2 size={16} color="var(--mantine-color-burnished-gold-7)" />
            </Group>
            <Text ff="var(--font-display)" size="xl">42</Text>
            <Text size="7px" ff="var(--font-body)" c="dimmed">ACTIVE_ENGAGEMENTS</Text>
          </Paper>

          <Paper withBorder p="xl" radius={0} bg="rgba(14, 29, 22, 0.2)">
            <Group justify="space-between" mb="xs">
              <Text ff="var(--font-body)" size="xs" c="burnished-gold">SYSTEM_HEALTH</Text>
              <IconCloudUpload size={16} color="var(--mantine-color-sage-0)" />
            </Group>
            <Text ff="var(--font-display)" size="xl">100%</Text>
            <Text size="7px" ff="var(--font-body)" c="dimmed">EDGE_REPLICATION_ACTIVE</Text>
          </Paper>
        </SimpleGrid>

        {/* 3. Portfolio Ledger */}
        <Paper withBorder radius={0} p={0} bg="transparent">
          <Box p="xl" style={{ borderBottom: '1px solid var(--mantine-color-deep-green-3)' }}>
            <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
              Scholar Site Ledger
            </Title>
          </Box>
          <Table verticalSpacing="lg" horizontalSpacing="xl" highlightOnHover>
            <Table.Thead bg="rgba(14, 29, 22, 0.6)">
              <Table.Tr>
                <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="deep-green.3">SCHOLAR</Table.Th>
                <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="deep-green.3">DOMAIN_ENDPOINT</Table.Th>
                <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="deep-green.3">PUBLIC_PROJECTS</Table.Th>
                <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="deep-green.3">SYNC_STATUS</Table.Th>
                <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="deep-green.3">ACTIONS</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {portfolioClients.map((client) => (
                <Table.Tr key={client.id}>
                  <Table.Td>
                    <Group gap="sm">
                      <Avatar size="sm" radius={0} color="deep-green">{client.name.split(' ').map(n => n[0]).join('')}</Avatar>
                      <Box>
                        <Text size="sm" fw={700} c="parchment">{client.name}</Text>
                        <Text size="7px" c="deep-green.3" ff="var(--font-body)">ID: {client.id}</Text>
                      </Box>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Text size="xs" ff="var(--font-body)" c="burnished-gold">{client.domain}</Text>
                      <ActionIcon size="xs" variant="subtle" color="deep-green.3"><IconExternalLink size={12} /></ActionIcon>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="sm">
                      <Text size="xs" c="parchment">{client.projectsPublic} ACTIVE</Text>
                      <Progress value={(client.projectsPublic/5)*100} color="sage" size="xs" w={60} radius={0} />
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Badge 
                      variant="outline" 
                      color={client.status === 'Active' ? 'sage' : client.status === 'Syncing' ? 'burnished-gold' : 'dimmed'} 
                      size="xs"
                    >
                      {client.status.toUpperCase()}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Tooltip label="Edit Content">
                        <ActionIcon variant="subtle" color="deep-green.3"><IconEdit size={16} /></ActionIcon>
                      </Tooltip>
                      <Tooltip label="Live Preview">
                        <ActionIcon variant="subtle" color="deep-green.3"><IconEye size={16} /></ActionIcon>
                      </Tooltip>
                      <Divider orientation="vertical" h={16} color="deep-green.7" />
                      <Switch size="xs" color="sage" defaultChecked={client.status === 'Active'} />
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>

        {/* 4. Automated Sync Configuration */}
        <Paper withBorder p={40} radius={0} bg="rgba(14, 29, 22, 0.2)">
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={60}>
            <Stack gap="md">
              <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase' }}>
                Living Portfolio Logic
              </Title>
              <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
                Our middleware automatically updates scholar sites when projects are toggled to &quot;Public&quot; in the Project Vault. BibTeX files and Google Scholar citations are refreshed every 24 hours.
              </Text>
              <Group gap="xl" mt="md">
                <Box>
                  <Text ff="var(--font-body)" size="7px" c="dimmed">LAST_GLOBAL_SYNC:</Text>
                  <Text ff="var(--font-body)" size="xs" fw={700}>05 FEB 2026 // 04:00 AM</Text>
                </Box>
                <Box>
                  <Text ff="var(--font-body)" size="7px" c="dimmed">ORCID_CONNECTED:</Text>
                  <Text ff="var(--font-body)" size="xs" fw={700} c="sage">YES</Text>
                </Box>
              </Group>
            </Stack>
            <Box style={{ border: '1px solid var(--mantine-color-deep-green-7)', padding: '24px' }}>
              <Group justify="space-between" mb="md">
                <Text ff="var(--font-body)" size="xs" c="burnished-gold">MICAH_SHOWCASE_STATUS</Text>
                <Badge color="sage" radius={0}>GOLD_STANDARD</Badge>
              </Group>
              <Text size="xs" c="dimmed" mb="lg">Micah&apos;s personal portfolio is currently being used as the &quot;Prime Implementation&quot; for outreach demonstrations.</Text>
              <Button fullWidth variant="outline" color="burnished-gold" radius={0} size="xs" leftSection={<IconDeviceDesktop size={14} />}>
                Launch Micah&apos;s Showcase
              </Button>
            </Box>
          </SimpleGrid>
        </Paper>
      </Stack>
    </Container>
  );
}
