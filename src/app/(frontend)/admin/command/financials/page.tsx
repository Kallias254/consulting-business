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
  Box, 
  Button, 
  SimpleGrid, 
  Progress,
  RingProgress
} from '@mantine/core';
import { 
  IconCoin, 
  IconArrowUpRight, 
  IconWallet, 
  IconBuildingBank,
  IconChartPie,
  IconFileInvoice
} from '@tabler/icons-react';

const financialData = [
  { 
    id: 'INV-7792', 
    project: 'Digital Spaces Study', 
    client: 'Dr. Emily Chen', 
    gross: 12000, 
    fees: 360, // 3%
    net: 11640,
    researcher: 'Sarah Miller',
    payout: 8730, // 75% of net
    agency: 2910, // 25% of net
    status: 'Paid'
  },
  { 
    id: 'INV-8104', 
    project: 'Urban Sustainability', 
    client: 'Prof. Marcus Ross', 
    gross: 5000, 
    fees: 150,
    net: 4850,
    researcher: 'Dr. James Wilson',
    payout: 3637.50,
    agency: 1212.50,
    status: 'Pending'
  },
  { 
    id: 'INV-9021', 
    project: 'NSF Keynote Suite', 
    client: 'Dr. Linda Vo', 
    gross: 2500, 
    fees: 75,
    net: 2425,
    researcher: 'Micah S.',
    payout: 1818.75,
    agency: 606.25,
    status: 'Invoiced'
  },
];

export default function FinancialsPage() {
  return (
    <Container size="xl" fluid>
      <Stack gap={40}>
        {/* 1. Page Header */}
        <Box>
          <Group justify="space-between" align="flex-end">
            <Box>
              <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
                Financial <Text component="span" inherit c="burnished-gold.7">Operations</Text>
              </Title>
              <Text c="deep-green.3" size="sm" ff="var(--font-body)" mt={4}>
                75/25 Split Ledger // Margin Integrity // Institutional Payouts
              </Text>
            </Box>
            <Button 
              leftSection={<IconFileInvoice size={16} />} 
              color="burnished-gold" 
              c="dark-forest" 
              radius={0}
            >
              Generate Payout Report
            </Button>
          </Group>
        </Box>

        {/* 2. Financial HUD */}
        <SimpleGrid cols={{ base: 1, md: 4 }} spacing="xl">
          <Paper withBorder p="md" bg="black" style={{ border: '1px solid var(--mantine-color-deep-green-7)' }}>
            <Group justify="space-between" mb="xs">
              <Text ff="var(--font-body)" size="7px" c="deep-green.3" style={{ letterSpacing: '1px' }}>GROSS_REVENUE_Q1</Text>
              <IconCoin size={14} color="var(--mantine-color-sage-0)" />
            </Group>
            <Text ff="var(--font-display)" size="xl" c="parchment">$19,500.00</Text>
            <Group gap={4} mt={4}>
              <IconArrowUpRight size={10} color="var(--mantine-color-sage-0)" />
              <Text size="7px" ff="var(--font-body)" c="sage">+12.4% VS LAST_MONTH</Text>
            </Group>
          </Paper>

          <Paper withBorder p="md" bg="black" style={{ border: '1px solid var(--mantine-color-deep-green-7)' }}>
            <Group justify="space-between" mb="xs">
              <Text ff="var(--font-body)" size="7px" c="deep-green.3" style={{ letterSpacing: '1px' }}>RESEARCHER_PAYOUTS</Text>
              <IconWallet size={14} color="var(--mantine-color-burnished-gold-7)" />
            </Group>
            <Text ff="var(--font-display)" size="xl" c="parchment">$14,186.25</Text>
            <Text size="7px" ff="var(--font-body)" c="dimmed" mt={4}>75.0% OF TOTAL_NET</Text>
          </Paper>

          <Paper withBorder p="md" bg="black" style={{ border: '1px solid var(--mantine-color-burnished-gold-0)' }}>
            <Group justify="space-between" mb="xs">
              <Text ff="var(--font-body)" size="7px" c="burnished-gold" style={{ letterSpacing: '1px' }}>AGENCY_MARGIN</Text>
              <IconBuildingBank size={14} color="var(--mantine-color-burnished-gold-7)" />
            </Group>
            <Text ff="var(--font-display)" size="xl" c="parchment">$4,728.75</Text>
            <Text size="7px" ff="var(--font-body)" c="dimmed" mt={4}>25.0% OF TOTAL_NET</Text>
          </Paper>

          <Paper withBorder p="md" bg="black" style={{ border: '1px solid var(--mantine-color-deep-green-7)' }}>
            <Group justify="space-between" mb="xs">
              <Text ff="var(--font-body)" size="7px" c="deep-green.3" style={{ letterSpacing: '1px' }}>INFRA_FUND (5%)</Text>
              <IconChartPie size={14} color="var(--mantine-color-deep-green-3)" />
            </Group>
            <Text ff="var(--font-display)" size="xl" c="parchment">$236.44</Text>
            <Progress value={100} color="sage" size="xs" radius={0} mt="sm" />
          </Paper>
        </SimpleGrid>

        {/* 3. The Payout Ledger */}
        <Paper withBorder radius={0} p={0} bg="transparent">
          <Box p="xl" style={{ borderBottom: '1px solid var(--mantine-color-deep-green-3)' }}>
            <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
              Split-Model Transaction Ledger
            </Title>
          </Box>
          <Table verticalSpacing="lg" horizontalSpacing="xl" highlightOnHover>
            <Table.Thead bg="rgba(14, 29, 22, 0.6)">
              <Table.Tr>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">INV_ID</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">PROJECT_CLIENT</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">GROSS_FEE</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">NET_FEE_3%</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">RESEARCHER_75%</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">AGENCY_25%</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">STATUS</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {financialData.map((row) => (
                <Table.Tr key={row.id}>
                  <Table.Td>
                    <Text ff="var(--font-body)" size="xs" c="dimmed">{row.id}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Stack gap={0}>
                      <Text size="sm" fw={700} c="parchment">{row.project}</Text>
                      <Text size="xs" c="dimmed">{row.client}</Text>
                    </Stack>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" c="parchment">${row.gross.toLocaleString()}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" c="dimmed">${row.net.toLocaleString()}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Stack gap={0}>
                      <Text size="sm" fw={700} c="sage">${row.payout.toLocaleString()}</Text>
                      <Text size="7px" ff="var(--font-body)" c="dimmed">TO: {row.researcher.toUpperCase()}</Text>
                    </Stack>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" fw={700} c="burnished-gold">${row.agency.toLocaleString()}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Badge 
                      color={row.status === 'Paid' ? 'sage' : row.status === 'Pending' ? 'orange' : 'blue'} 
                      variant="outline" 
                      radius={0} 
                      size="xs"
                    >
                      {row.status.toUpperCase()}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>

        {/* 4. Margin Distribution Analytics */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          <Paper withBorder p="xl" radius={0} bg="rgba(14, 29, 22, 0.2)">
            <Title order={5} ff="var(--font-display)" c="burnished-gold" mb="xl" style={{ textTransform: 'uppercase' }}>
              Institutional Split Distribution
            </Title>
            <Stack gap="xl">
              <Box>
                <Group justify="space-between" mb={8}>
                  <Text size="xs" fw={700}>Researcher Network (75%)</Text>
                  <Text ff="var(--font-body)" size="xs" c="sage">$14,186.25</Text>
                </Group>
                <Progress value={75} color="sage" size="md" radius={0} />
              </Box>
              <Box>
                <Group justify="space-between" mb={8}>
                  <Text size="xs" fw={700}>Principal/Agency (20%)</Text>
                  <Text ff="var(--font-body)" size="xs" c="burnished-gold">$3,783.00</Text>
                </Group>
                <Progress value={20} color="burnished-gold" size="md" radius={0} />
              </Box>
              <Box>
                <Group justify="space-between" mb={8}>
                  <Text size="xs" fw={700}>Infrastructure & Platform (5%)</Text>
                  <Text ff="var(--font-body)" size="xs" c="deep-green.3">$945.75</Text>
                </Group>
                <Progress value={5} color="deep-green.7" size="md" radius={0} />
              </Box>
            </Stack>
          </Paper>

          <Paper withBorder p="xl" radius={0} bg="rgba(14, 29, 22, 0.2)">
            <Title order={5} ff="var(--font-display)" c="burnished-gold" mb="xl" style={{ textTransform: 'uppercase' }}>
              Q1 Growth Trajectory
            </Title>
            <Stack gap="md" align="center" justify="center" h="100%">
              <RingProgress
                size={160}
                thickness={16}
                roundCaps
                label={
                  <Stack gap={0} align="center">
                    <Text ff="var(--font-display)" size="xl" fw={700} style={{ lineHeight: 1 }}>112%</Text>
                    <Text size="7px" c="dimmed" ff="var(--font-body)" style={{ textTransform: 'uppercase' }}>Target</Text>
                  </Stack>
                }
                sections={[
                  { value: 100, color: 'sage' },
                  { value: 12, color: 'burnished-gold' },
                ]}
              />
              <Text size="xs" c="dimmed" ta="center" maw={300}>
                Agency margin is tracking 12% above projected baseline for the &quot;Beachhead&quot; phase.
              </Text>
            </Stack>
          </Paper>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
