'use client';
import React from 'react';
import { 
  Box, 
  Container, 
  Title, 
  Text, 
  Stack, 
  Group, 
  Badge, 
  Timeline, 
  SimpleGrid, 
  Card, 
  Button, 
  ActionIcon,
  RingProgress,
  Table,
  ThemeIcon
} from '@mantine/core';
import { 
  IconFileDescription, 
  IconDownload, 
  IconCircleCheck, 
  IconClock, 
  IconArrowRight
} from '@tabler/icons-react';

export default function ScientistPortalOverview() {
  return (
    <Container size="xl" fluid>
      <Stack gap={40}>
        {/* 1. Publication Readiness HUD */}
        <Card withBorder p={40} radius={0}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={60}>
            <Stack justify="center" gap="xs">
              <Badge variant="filled" color="burnished-gold" size="xs" radius={0}>Active Review Phase</Badge>
              <Title order={1} ff="var(--font-display)" size="3rem" style={{ textTransform: 'uppercase', lineHeight: 1.1 }}>
                The Millennial Handbook: <br />
                <Text component="span" inherit c="dimmed">Final Scholarly Review</Text>
              </Title>
              <Text mt="md" size="sm" c="dimmed" maw={480}>
                Your manuscript has been through our internal technical QC. It is currently under the final oversight of our Principal Investigator before submission to Taylor & Francis.
              </Text>
              <Group mt="xl" gap="md">
                <Button color="deep-green" radius={0} rightSection={<IconArrowRight size={16} />}>Review Final Proofs</Button>
                <Button variant="outline" color="deep-green" radius={0}>Contact Liaison</Button>
              </Group>
            </Stack>

            <Group justify="center">
              <RingProgress
                size={240}
                thickness={20}
                roundCaps
                label={
                  <Stack gap={0} align="center">
                    <Text ff="var(--font-display)" size="2.5rem" fw={700} style={{ lineHeight: 1 }}>92%</Text>
                    <Text size="xs" c="dimmed" ff="var(--font-body)" style={{ textTransform: 'uppercase' }}>Readiness</Text>
                  </Stack>
                }
                sections={[
                  { value: 92, color: 'deep-green.7' },
                ]}
              />
            </Group>
          </SimpleGrid>
        </Card>

        <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="xl" align="start">
          {/* 2. The Manuscript Ledger (Table based, high density) */}
          <Box span={{ lg: 2 }} style={{ gridColumn: 'span 2' }}>
            <Card withBorder p={0} radius={0}>
              <Box p="xl" style={{ borderBottom: '1px solid var(--mantine-color-deep-green-1)' }}>
                <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Manuscript Ledger
                </Title>
              </Box>
              <Table verticalSpacing="md" horizontalSpacing="xl" highlightOnHover>
                <Table.Thead bg="parchment.0">
                  <Table.Tr>
                    <Table.Th ff="var(--font-body)" size="xs" c="dimmed">VERSION</Table.Th>
                    <Table.Th ff="var(--font-body)" size="xs" c="dimmed">STATUS</Table.Th>
                    <Table.Th ff="var(--font-body)" size="xs" c="dimmed">LAST ACTION</Table.Th>
                    <Table.Th ff="var(--font-body)" size="xs" c="dimmed"></Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td>
                      <Group gap="sm">
                        <ThemeIcon variant="light" color="deep-green" radius={0} size="sm">
                          <IconFileDescription size={14} />
                        </ThemeIcon>
                        <Text size="sm" fw={600}>Manuscript_v4_Final.pdf</Text>
                      </Group>
                    </Table.Td>
                    <Table.Td><Badge color="deep-green" size="xs">Ready</Badge></Table.Td>
                    <Table.Td><Text size="xs" c="dimmed">Typeset complete</Text></Table.Td>
                    <Table.Td>
                      <ActionIcon variant="subtle" color="deep-green"><IconDownload size={16} /></ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                  {/* ... other rows ... */}
                </Table.Tbody>
              </Table>
            </Card>
          </Box>

          {/* 3. Project Milestones (Timeline) */}
          <Box>
            <Card withBorder p={40} radius={0}>
              <Title order={4} ff="var(--font-display)" mb="xl" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                Critical milestones
              </Title>
              
              <Timeline active={2} bulletSize={20} lineWidth={1} color="deep-green">
                <Timeline.Item bullet={<IconCircleCheck size={12} />} title="Intake complete">
                  <Text size="xs" c="dimmed">02 Feb 2026</Text>
                </Timeline.Item>

                <Timeline.Item bullet={<IconCircleCheck size={12} />} title="Technical Validation">
                  <Text size="xs" c="dimmed">05 Feb 2026</Text>
                </Timeline.Item>

                <Timeline.Item bullet={<IconClock size={12} />} title="Executive Review">
                  <Text size="xs" fw={700}>In progress</Text>
                </Timeline.Item>

                <Timeline.Item title="Journal Submission" bulletSize={12}>
                  <Text size="xs" c="dimmed">Estimated: 48h</Text>
                </Timeline.Item>
              </Timeline>
            </Card>
          </Box>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
