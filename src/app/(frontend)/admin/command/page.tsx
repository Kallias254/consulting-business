'use client';
import React from 'react';
import { 
  Container, 
  Stack, 
  Title, 
  Text, 
  Paper, 
  Group, 
  Table, 
  ActionIcon, 
  Tooltip, 
  Box, 
  Button, 
  Avatar, 
  SimpleGrid, 
  RingProgress,
  Divider,
  Progress
} from '@mantine/core';
import { 
  IconBolt, 
  IconCheck, 
  IconExternalLink,
  IconClock,
  IconMessageCircle,
  IconFileCertificate,
  IconArrowNarrowRight
} from '@tabler/icons-react';

export default function BlessingQueuePage() {
  return (
    <Container size="xl" fluid>
      <Stack gap={40}>
        {/* 1. Queue HUD */}
        <Box>
          <Group justify="space-between" align="flex-end">
            <Box>
              <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
                Approval <Text component="span" inherit c="burnished-gold.7">Desk</Text>
              </Title>
              <Text c="deep-green.3" size="sm" ff="var(--font-body)" mt={4}>
                Manuscripts Awaiting Executive Review // Principal Authorization Required
              </Text>
            </Box>
            <Group gap="xl">
              <Paper withBorder p="md" bg="black" style={{ border: '1px solid var(--mantine-color-burnished-gold-0)' }}>
                <Group gap="lg">
                  <Box>
                    <Text ff="var(--font-body)" size="7px" c="burnished-gold" style={{ letterSpacing: '1px' }}>PENDING_APPROVAL</Text>
                    <Text ff="var(--font-display)" size="xl" c="parchment">04</Text>
                  </Box>
                  <Divider orientation="vertical" h={30} color="deep-green.3" opacity={0.3} />
                  <Box>
                    <Text ff="var(--font-body)" size="7px" c="deep-green.3" style={{ letterSpacing: '1px' }}>AVG_WAIT_TIME</Text>
                    <Text ff="var(--font-display)" size="xl" c="parchment">1.2D</Text>
                  </Box>
                </Group>
              </Paper>
            </Group>
          </Group>
        </Box>

        {/* 2. Priority List */}
        <Paper withBorder radius={0} p={0} bg="transparent">
          <Box p="xl" style={{ borderBottom: '1px solid var(--mantine-color-deep-green-3)' }}>
            <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
              High-Priority Review List
            </Title>
          </Box>
          <Table verticalSpacing="lg" horizontalSpacing="xl" highlightOnHover>
            <Table.Thead bg="rgba(14, 29, 22, 0.4)">
              <Table.Tr>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">AUTHOR</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">PROJECT_IDENTIFIER</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">READY_SCORE</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">WAIT_TIME</Table.Th>
                <Table.Th ff="var(--font-body)" size="xs" c="deep-green.3">ACTIONS</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {[
                { author: 'Dr. Emily Chen', project: 'Social Dynamics in Digital Spaces', readiness: 94, wait: '14h', avatar: 'EC' },
                { author: 'Dr. Marcus Ross', project: 'Quantum Computing Fundamentals', readiness: 88, wait: '1.5d', avatar: 'MR' },
                { author: 'Prof. Sarah Miller', project: 'Urban Planning 2030', readiness: 91, wait: '6h', avatar: 'SM' },
                { author: 'Dr. James Wilson', project: 'Biological Signaling Pathways', readiness: 82, wait: '2.4d', avatar: 'JW' },
              ].map((item, i) => (
                <Table.Tr key={i}>
                  <Table.Td>
                    <Group gap="sm">
                      <Avatar size="sm" radius={0} color="deep-green">{item.author.split(' ').map(n => n[0]).join('')}</Avatar>
                      <Box>
                        <Text size="sm" fw={700} c="parchment">{item.author}</Text>
                        <Text size="xs" c="deep-green.3" ff="var(--font-body)">SENIOR_RESEARCHER</Text>
                      </Box>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Stack gap={0}>
                      <Text size="sm" c="parchment">{item.project}</Text>
                      <Text size="xs" c="dimmed" ff="var(--font-body)">ID: ALPHA_{i+100}</Text>
                    </Stack>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="sm">
                      <RingProgress
                        size={40}
                        thickness={4}
                        sections={[{ value: item.readiness, color: item.readiness > 90 ? 'sage' : 'burnished-gold' }]}
                        label={<Text size="7px" ta="center" ff="var(--font-body)" c="parchment">{item.readiness}%</Text>}
                      />
                      <Text size="xs" c={item.readiness > 90 ? 'sage' : 'burnished-gold'} ff="var(--font-body)">READY</Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <IconClock size={12} color="var(--mantine-color-deep-green-3)" />
                      <Text size="xs" ff="var(--font-body)" c="parchment">{item.wait}</Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Tooltip label="Open Proof">
                        <ActionIcon variant="subtle" color="deep-green.3"><IconExternalLink size={16} /></ActionIcon>
                      </Tooltip>
                      <Tooltip label="Quick Message">
                        <ActionIcon variant="subtle" color="deep-green.3"><IconMessageCircle size={16} /></ActionIcon>
                      </Tooltip>
                      <Button 
                        size="xs" 
                        variant="filled" 
                        color="burnished-gold" 
                        radius={0}
                        rightSection={<IconCheck size={14} />}
                        c="dark-forest"
                      >
                        AUTHORIZE
                      </Button>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>

        {/* 3. Operational Metadata */}
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
          <Paper withBorder p="xl" radius={0} bg="rgba(14, 29, 22, 0.2)">
            <Group justify="space-between" mb="md">
              <Text ff="var(--font-body)" size="xs" c="burnished-gold">SYSTEM_INTEGRITY</Text>
              <IconFileCertificate size={16} color="var(--mantine-color-burnished-gold-7)" />
            </Group>
            <Text size="xs" c="dimmed" mb="lg">All manuscripts currently in queue have passed the automated Prismer.AI validation suite.</Text>
            <Progress value={100} color="sage" size="xs" radius={0} />
          </Paper>
          
          <Paper withBorder p="xl" radius={0} bg="rgba(14, 29, 22, 0.2)">
            <Group justify="space-between" mb="md">
              <Text ff="var(--font-body)" size="xs" c="burnished-gold">LIAISON_WORKLOAD</Text>
              <IconBolt size={16} color="var(--mantine-color-burnished-gold-7)" />
            </Group>
            <Text size="xs" c="dimmed" mb="lg">Primary liaison active. Response times are within the established white-glove window.</Text>
            <Progress value={65} color="burnished-gold" size="xs" radius={0} />
          </Paper>

          <Paper withBorder p="xl" radius={0} bg="rgba(14, 29, 22, 0.2)">
            <Group justify="space-between" mb="md">
              <Text ff="var(--font-body)" size="xs" c="burnished-gold">FINANCIAL_PULSE</Text>
              <IconArrowNarrowRight size={16} color="var(--mantine-color-burnished-gold-7)" />
            </Group>
            <Text size="xs" c="dimmed" mb="lg">Projected completions for Q1 are tracking at 112% of baseline targets.</Text>
            <Progress value={88} color="sage" size="xs" radius={0} />
          </Paper>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
