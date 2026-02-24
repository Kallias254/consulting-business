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
  Progress,
  ScrollArea
} from '@mantine/core';
import { 
  IconWorld, 
  IconExternalLink,
  IconMicrophone2,
  IconCloudUpload,
  IconDeviceDesktop,
  IconServer,
  IconActivity,
  IconRefresh,
  IconSettings,
  IconEye
} from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

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
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Container size="xl" fluid>
      <Stack gap={40}>
        {/* 1. Page Header */}
        <Box>
          <Group justify="space-between" align="flex-end" wrap="wrap">
            <Box>
              <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
                Impact <Text component="span" inherit c="burnished-gold.7">Portfolios</Text>
              </Title>
              <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
                Multi-Tenant Rendering // Self-Updating Academic Legacies // Domain Management
              </Text>
            </Box>
            <Button 
              leftSection={<IconWorld size={16} />} 
              color="burnished-gold" 
              c="dark-forest" 
              radius={0}
              w={{ base: '100%', sm: 'auto' }}
            >
              Deploy New Scholar Site
            </Button>
          </Group>
        </Box>

        {/* 2. Portfolio Stats HUD */}
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
          <Paper withBorder p="xl" radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
            <Group justify="space-between" align="flex-start" mb="xl">
              <Stack gap={0}>
                <Text ff="var(--font-display)" size="2.5rem" c="#E1E1E1" style={{ lineHeight: 1 }}>12.4K</Text>
                <Text size="9px" ff="var(--font-body)" c="burnished-gold" style={{ letterSpacing: '1px', textTransform: 'uppercase', marginTop: '8px' }}>Total Visits Q1</Text>
              </Stack>
              <IconEye size={20} color="var(--mantine-color-gray-6)" />
            </Group>
            <Progress value={75} color="sage" size="xs" radius={0} />
          </Paper>
          
          <Paper withBorder p="xl" radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
            <Group justify="space-between" align="flex-start" mb="xl">
              <Stack gap={0}>
                <Text ff="var(--font-display)" size="2.5rem" c="#E1E1E1" style={{ lineHeight: 1 }}>42</Text>
                <Text size="9px" ff="var(--font-body)" c="burnished-gold" style={{ letterSpacing: '1px', textTransform: 'uppercase', marginTop: '8px' }}>Active Engagements</Text>
              </Stack>
              <IconMicrophone2 size={20} color="var(--mantine-color-gray-6)" />
            </Group>
            <Progress value={60} color="burnished-gold" size="xs" radius={0} />
          </Paper>

          <Paper withBorder p="xl" radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
            <Group justify="space-between" align="flex-start" mb="xl">
              <Stack gap={0}>
                <Text ff="var(--font-display)" size="2.5rem" c="sage" style={{ lineHeight: 1 }}>100%</Text>
                <Text size="9px" ff="var(--font-body)" c="burnished-gold" style={{ letterSpacing: '1px', textTransform: 'uppercase', marginTop: '8px' }}>Edge Replication</Text>
              </Stack>
              <IconCloudUpload size={20} color="var(--mantine-color-gray-6)" />
            </Group>
            <Progress value={100} color="sage" size="xs" radius={0} />
          </Paper>
        </SimpleGrid>

        {/* 3. Portfolio Ledger */}
        <Paper withBorder radius={0} p={0} bg="transparent" style={{ borderColor: '#2A2D31', overflow: 'hidden' }}>
          <Box p="xl" bg="#0A0B0C" style={{ borderBottom: '1px solid #2A2D31' }}>
            <Group justify="space-between">
              <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                Scholar Site Ledger
              </Title>
              <Badge variant="outline" color="sage" radius={0} size="xs">ACTIVE_REPLICATION</Badge>
            </Group>
          </Box>
          <ScrollArea>
            <Table verticalSpacing="lg" horizontalSpacing="xl" highlightOnHover style={{ minWidth: 800 }}>
              <Table.Thead bg="#0A0B0C">
                <Table.Tr>
                  <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="dimmed">SCHOLAR_IDENTITY</Table.Th>
                  <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="dimmed" visibleFrom="sm">IMPACT_METRICS</Table.Th>
                  <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="dimmed">SITE_CONTROL</Table.Th>
                  <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="dimmed">ACTIONS</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {portfolioClients.map((client) => (
                  <Table.Tr key={client.id} style={{ borderBottom: '1px solid #2A2D31' }}>
                    <Table.Td>
                      <Group gap="sm" wrap="nowrap">
                        <Avatar size="sm" radius={0} color="dark" bg="#2A2D31">{client.name.split(' ').map(n => n[0]).join('')}</Avatar>
                        <Box>
                          <Text size="sm" fw={700} c="#E1E1E1" style={{ whiteSpace: 'nowrap' }}>{client.name}</Text>
                          <Group gap={6} mt={2}>
                            <Text size="9px" c="burnished-gold" ff="var(--font-body)" component="a" href={`https://${client.domain}`} target="_blank" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                              {client.domain.toUpperCase()}
                            </Text>
                            <IconExternalLink size={8} color="var(--mantine-color-gray-6)" />
                          </Group>
                        </Box>
                      </Group>
                    </Table.Td>
                    <Table.Td visibleFrom="sm">
                      <Stack gap={4}>
                        <Text size="xs" c="#E1E1E1">{client.projectsPublic} PROJECTS // {client.upcomingTalks} TALKS</Text>
                        <Progress value={(client.projectsPublic/5)*100} color="sage" size="xs" w={100} radius={0} visibleFrom="lg" />
                      </Stack>
                    </Table.Td>
                    <Table.Td>
                      <Group gap={isMobile ? 'xs' : 'md'} wrap="nowrap">
                        <Badge 
                          variant="outline" 
                          color={client.status === 'Active' ? 'sage' : client.status === 'Syncing' ? 'burnished-gold' : 'dimmed'} 
                          size="xs"
                          radius={0}
                        >
                          {client.status.toUpperCase()}
                        </Badge>
                        <Switch size="xs" color="sage" defaultChecked={client.status === 'Active'} />
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs" wrap="nowrap">
                        <Tooltip label="Force System Sync">
                          <ActionIcon variant="subtle" color="gray.6" size="sm" onClick={() => alert('SYNCHRONIZING WITH ORCID & GOOGLE SCHOLAR...')}><IconRefresh size={16} /></ActionIcon>
                        </Tooltip>
                        <Tooltip label="Configure Site Engine">
                          <ActionIcon variant="subtle" color="gray.6" size="sm"><IconSettings size={16} /></ActionIcon>
                        </Tooltip>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </Paper>

        {/* 4. Automated Sync Configuration & Infrastructure */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          <Paper withBorder p="xl" radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
            <Group justify="space-between" mb="xl">
              <Title order={5} ff="var(--font-display)" c="burnished-gold" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                Living Portfolio Logic
              </Title>
              <IconServer size={20} color="var(--mantine-color-gray-6)" />
            </Group>
            <Stack gap="md">
              <Text size="xs" c="dimmed" style={{ lineHeight: 1.8 }}>
                Our middleware automatically updates scholar sites when projects are toggled to &quot;Public&quot; in the Project Vault. BibTeX files and Google Scholar citations are refreshed every 24 hours via our WASM-rendering engine.
              </Text>
              <Divider color="#2A2D31" my="sm" />
              <Group gap="xl">
                <Box>
                  <Text ff="var(--font-body)" size="9px" c="dimmed" style={{ letterSpacing: '1px' }}>LAST_GLOBAL_SYNC:</Text>
                  <Text ff="var(--font-body)" size="xs" fw={700} c="#E1E1E1">05 FEB 2026 // 04:00 AM</Text>
                </Box>
                <Box>
                  <Text ff="var(--font-body)" size="9px" c="dimmed" style={{ letterSpacing: '1px' }}>ORCID_CONNECTED:</Text>
                  <Text ff="var(--font-body)" size="xs" fw={700} c="sage">SECURE_SYNC_ACTIVE</Text>
                </Box>
              </Group>
            </Stack>
          </Paper>

          <Paper withBorder p="xl" radius={0} bg="#0A0B0C" style={{ borderColor: 'var(--mantine-color-burnished-gold-7)', borderStyle: 'dashed' }}>
            <Group justify="space-between" mb="xl">
              <Box>
                <Title order={5} ff="var(--font-display)" c="burnished-gold" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Showcase Deployment
                </Title>
                <Text size="9px" c="dimmed" mt={4} style={{ letterSpacing: '1px' }}>PRINCIPAL_DEMO_ACTIVE</Text>
              </Box>
              <IconActivity size={20} color="var(--mantine-color-burnished-gold-7)" />
            </Group>
            <Text size="xs" c="dimmed" mb="xl" style={{ lineHeight: 1.8 }}>
              Micah&apos;s personal portfolio is currently configured as the &quot;Prime Implementation.&quot; Use this as the high-fidelity benchmark for new scholar onboarding.
            </Text>
            <Button 
              fullWidth 
              variant="outline" 
              color="burnished-gold" 
              radius={0} 
              size="xs" 
              leftSection={<IconDeviceDesktop size={14} />}
              styles={{ root: { border: '1px solid var(--mantine-color-burnished-gold-7)' } }}
            >
              Launch Principal Showcase
            </Button>
          </Paper>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
