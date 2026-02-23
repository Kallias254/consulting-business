'use client';
import React from 'react';
import { 
  Container, 
  Stack, 
  Title, 
  Text, 
  Paper, 
  Badge, 
  Table, 
  Box, 
  Checkbox,
  SimpleGrid,
  Progress
} from '@mantine/core';

const microTasks = [
  { id: 'TSK-001', project: 'PRJ-7792', task: 'Sanitize BibTeX keys', status: 'Pending', type: 'Bibliography' },
  { id: 'TSK-002', project: 'PRJ-7792', task: 'Verify Equation 4.2 in Typst', status: 'Complete', type: 'Typeset' },
  { id: 'TSK-003', project: 'PRJ-8104', task: 'Export Figure 2.1 as high-res PNG', status: 'Pending', type: 'Artwork' },
  { id: 'TSK-004', project: 'PRJ-8104', task: 'Cross-check Z-scores with raw CSV', status: 'Blocked', type: 'Stats' },
  { id: 'TSK-005', project: 'PRJ-6643', task: 'Apply Routledge Academic Mold', status: 'Pending', type: 'Typeset' },
];

export default function MicroTaskLedgerPage() {
  return (
    <Container size="xl" fluid>
      <Stack gap={40}>
        {/* 1. Task Header */}
        <Box>
          <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
            Micro-Task <Text component="span" inherit c="sage">Ledger</Text>
          </Title>
          <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
            Granular Unit Tracking // Technical Checklists // Production Pipeline
          </Text>
        </Box>

        <SimpleGrid cols={{ base: 1, md: 4 }} spacing="xl">
          <Paper withBorder p="md" radius={0} bg="white">
            <Text ff="var(--font-body)" size="7px" c="dimmed">COMPLETED_RATIO</Text>
            <Text ff="var(--font-display)" size="xl">14 / 20</Text>
            <Progress value={70} color="sage" size="xs" radius={0} mt="sm" />
          </Paper>
          <Paper withBorder p="md" radius={0} bg="white">
            <Text ff="var(--font-body)" size="7px" c="dimmed">BLOCKED_UNITS</Text>
            <Text ff="var(--font-display)" size="xl" c="red">01</Text>
            <Text size="7px" ff="var(--font-body)" c="dimmed" mt={4}>REQUIRES_PRINCIPAL_INPUT</Text>
          </Paper>
        </SimpleGrid>

        {/* 2. The Ledger */}
        <Paper withBorder radius={0} p={0} bg="white">
          <Table verticalSpacing="md" horizontalSpacing="xl" highlightOnHover>
            <Table.Thead bg="parchment.0">
              <Table.Tr>
                <Table.Th w={40}><Checkbox radius={0} color="sage" /></Table.Th>
                <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="dimmed">TASK_ID</Table.Th>
                <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="dimmed">TYPE</Table.Th>
                <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="dimmed">OBJECTIVE</Table.Th>
                <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="dimmed">PROJECT</Table.Th>
                <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="dimmed">STATUS</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {microTasks.map((task) => (
                <Table.Tr key={task.id}>
                  <Table.Td><Checkbox radius={0} color="sage" defaultChecked={task.status === 'Complete'} /></Table.Td>
                  <Table.Td><Text ff="var(--font-body)" size="xs">{task.id}</Text></Table.Td>
                  <Table.Td>
                    <Badge variant="light" color="deep-green" size="xs" radius={0}>{task.type.toUpperCase()}</Badge>
                  </Table.Td>
                  <Table.Td><Text size="sm">{task.task}</Text></Table.Td>
                  <Table.Td><Text size="xs" ff="var(--font-body)" c="dimmed">{task.project}</Text></Table.Td>
                  <Table.Td>
                    <Badge 
                      color={task.status === 'Complete' ? 'sage' : task.status === 'Blocked' ? 'red' : 'orange'} 
                      variant="outline" 
                      radius={0} 
                      size="xs"
                    >
                      {task.status.toUpperCase()}
                    </Badge>
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
