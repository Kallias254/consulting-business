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
  ThemeIcon, 
  Timeline, 
  Box,
  ActionIcon,
  Tooltip,
  Divider,
  SimpleGrid
} from '@mantine/core';
import { 
  IconHistory, 
  IconFileCheck, 
  IconDownload, 
  IconVersions, 
  IconCircleCheck, 
  IconClock, 
  IconLock,
  IconFingerprint
} from '@tabler/icons-react';

export default function ManuscriptHistoryPage() {
  return (
    <Container size="xl" fluid>
      <Stack gap={40}>
        {/* Page Header */}
        <Box>
          <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
            Manuscript <Text component="span" inherit c="burnished-gold.7">History</Text>
          </Title>
          <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
            Scientific Lineage // Version Audit Trail // Secure Hash Verification
          </Text>
        </Box>

        <SimpleGrid cols={{ base: 1, lg: 3 }} spacing={40}>
          {/* Detailed Audit Table */}
          <Box style={{ gridColumn: 'span 2' }}>
            <Paper withBorder radius={0} p={0}>
              <Box p="xl" style={{ borderBottom: '1px solid var(--mantine-color-parchment-2)' }}>
                <Group justify="space-between">
                  <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Version Audit Ledger
                  </Title>
                  <Tooltip label="All files are verified via SHA-256">
                    <ThemeIcon variant="subtle" color="deep-green">
                      <IconFingerprint size={18} />
                    </ThemeIcon>
                  </Tooltip>
                </Group>
              </Box>
              <Table verticalSpacing="md" horizontalSpacing="xl" highlightOnHover>
                <Table.Thead bg="parchment.0">
                  <Table.Tr>
                    <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="dimmed">REV_ID</Table.Th>
                    <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="dimmed">IDENTIFIER</Table.Th>
                    <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="dimmed">DATE</Table.Th>
                    <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="dimmed">STATUS</Table.Th>
                    <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="dimmed"></Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td><Text size="xs" ff="var(--font-body)" c="dimmed">04</Text></Table.Td>
                    <Table.Td>
                      <Stack gap={0}>
                        <Text size="sm" fw={700}>Manuscript_v4_Final_Typeset.pdf</Text>
                        <Text size="xs" c="dimmed" ff="var(--font-body)">SHA: e3b0c442...8fc1</Text>
                      </Stack>
                    </Table.Td>
                    <Table.Td><Text size="xs">15 Feb 2026</Text></Table.Td>
                    <Table.Td><Badge color="deep-green" size="xs">Validated</Badge></Table.Td>
                    <Table.Td>
                      <ActionIcon variant="subtle" color="deep-green"><IconDownload size={16} /></ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td><Text size="xs" ff="var(--font-body)" c="dimmed">03</Text></Table.Td>
                    <Table.Td>
                      <Stack gap={0}>
                        <Text size="sm">Draft_v3_InternalQC_Pass.pdf</Text>
                        <Text size="xs" c="dimmed" ff="var(--font-body)">SHA: f82d1c9...2a1b</Text>
                      </Stack>
                    </Table.Td>
                    <Table.Td><Text size="xs">05 Feb 2026</Text></Table.Td>
                    <Table.Td><Badge color="dimmed" variant="outline" size="xs">Superseded</Badge></Table.Td>
                    <Table.Td>
                      <ActionIcon variant="subtle" color="dimmed"><IconDownload size={16} /></ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td><Text size="xs" ff="var(--font-body)" c="dimmed">02</Text></Table.Td>
                    <Table.Td>
                      <Stack gap={0}>
                        <Text size="sm">Draft_v2_Revision_Micah.docx</Text>
                        <Text size="xs" c="dimmed" ff="var(--font-body)">SHA: 9a2f3c...44d1</Text>
                      </Stack>
                    </Table.Td>
                    <Table.Td><Text size="xs">02 Feb 2026</Text></Table.Td>
                    <Table.Td><Badge color="dimmed" variant="outline" size="xs">Archived</Badge></Table.Td>
                    <Table.Td>
                      <ActionIcon variant="subtle" color="dimmed"><IconDownload size={16} /></ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </Paper>
          </Box>

          {/* Success Trail Timeline */}
          <Box>
            <Paper withBorder radius={0} p={40}>
              <Title order={5} ff="var(--font-display)" mb="xl" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                <IconHistory size={20} style={{ marginBottom: -4, marginRight: 8 }} />
                The Success Trail
              </Title>
              <Timeline active={3} bulletSize={24} lineWidth={1} color="deep-green">
                <Timeline.Item bullet={<IconFileCheck size={14} />} title="Intake Form Validated">
                  <Text size="xs" c="dimmed">Session Start // 01 Feb 2026</Text>
                </Timeline.Item>

                <Timeline.Item bullet={<IconVersions size={14} />} title="Initial Typeset Draft">
                  <Text size="xs" c="dimmed">First Proof Generated</Text>
                </Timeline.Item>

                <Timeline.Item bullet={<IconCircleCheck size={14} />} title="Technical Validation">
                  <Text size="xs" c="dimmed">Methodology Audit Pass</Text>
                </Timeline.Item>

                <Timeline.Item bullet={<IconClock size={14} />} title="Executive Review">
                  <Text size="xs" fw={700} c="deep-green">Final Pass Active</Text>
                </Timeline.Item>

                <Timeline.Item bullet={<IconLock size={14} />} title="Journal Submission" >
                  <Text size="xs" c="dimmed">Phase 5: Pending</Text>
                </Timeline.Item>
              </Timeline>

              <Divider my="xl" label="Institutional Oversight" labelPosition="center" />
              
              <Stack gap="xs">
                <Group justify="space-between">
                  <Text size="xs" ff="var(--font-body)" c="dimmed">LIAISON:</Text>
                  <Text size="xs" ff="var(--font-body)" fw={700}>MICAH S.</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="xs" ff="var(--font-body)" c="dimmed">AUTH_KEY:</Text>
                  <Text size="xs" ff="var(--font-body)" fw={700}>VERIFIED</Text>
                </Group>
              </Stack>
            </Paper>
          </Box>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
