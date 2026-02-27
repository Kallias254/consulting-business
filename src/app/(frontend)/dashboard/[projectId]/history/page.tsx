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
  SimpleGrid,
  Breadcrumbs,
  Anchor
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
import Link from 'next/link';

export default function ProjectHistoryPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = React.use(params);
  const projectIdFormatted = projectId.replace(/-/g, ' ').toUpperCase();

  return (
    <Container size="xl" my="xl">
      <Stack gap="lg">
        <Box mt="md">
          <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
            Manuscript <Text component="span" inherit c="burnished-gold.7">History</Text>
          </Title>
          <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
            Project: {projectIdFormatted} // Version Audit Trail // Secure Hash Verification
          </Text>
        </Box>

        <SimpleGrid cols={{ base: 1, lg: 3 }} spacing={40}>
          <Box style={{ gridColumn: 'span 2' }}>
            <Paper withBorder radius={0} p={0} bg="white" style={{ borderColor: '#E0DBCC' }}>
              <Box p="xl" bg="#FDFDFB" style={{ borderBottom: '1px solid #E0DBCC' }}>
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
                <Table.Thead bg="#F4F1EA">
                  <Table.Tr>
                    <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="#4A4D51">REV_ID</Table.Th>
                    <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="#4A4D51">IDENTIFIER</Table.Th>
                    <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="#4A4D51">DATE</Table.Th>
                    <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="#4A4D51">STATUS</Table.Th>
                    <Table.Th></Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  <Table.Tr style={{ borderBottom: '1px solid #F4F1EA' }}>
                    <Table.Td><Text size="xs" ff="var(--font-body)" c="dimmed">04</Text></Table.Td>
                    <Table.Td>
                      <Stack gap={0}>
                        <Text size="sm" fw={700}>Manuscript_v4_Final_Typeset.pdf</Text>
                        <Text size="9px" c="dimmed" ff="var(--font-body)">SHA: e3b0c442...8fc1</Text>
                      </Stack>
                    </Table.Td>
                    <Table.Td><Text size="xs">15 Feb 2026</Text></Table.Td>
                    <Table.Td><Badge color="deep-green.7" size="xs" radius={0}>Validated</Badge></Table.Td>
                    <Table.Td>
                      <ActionIcon variant="subtle" color="deep-green.7"><IconDownload size={16} /></ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr style={{ borderBottom: '1px solid #F4F1EA' }}>
                    <Table.Td><Text size="xs" ff="var(--font-body)" c="dimmed">03</Text></Table.Td>
                    <Table.Td>
                      <Stack gap={0}>
                        <Text size="sm">Draft_v3_InternalQC_Pass.pdf</Text>
                        <Text size="9px" c="dimmed" ff="var(--font-body)">SHA: f82d1c9...2a1b</Text>
                      </Stack>
                    </Table.Td>
                    <Table.Td><Text size="xs">05 Feb 2026</Text></Table.Td>
                    <Table.Td><Badge color="gray" variant="outline" size="xs" radius={0}>Superseded</Badge></Table.Td>
                    <Table.Td>
                      <ActionIcon variant="subtle" color="dimmed"><IconDownload size={16} /></ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </Paper>
          </Box>

          <Box>
            <Paper withBorder radius={0} p={40} bg="white" style={{ borderColor: '#E0DBCC' }}>
              <Title order={4} ff="var(--font-display)" mb="xl" style={{ textTransform: 'uppercase', letterSpacing: '1px', color: '#0A140F' }}>
                <IconHistory size={20} style={{ marginBottom: -4, marginRight: 8 }} />
                The Success Trail
              </Title>
              <Timeline active={3} bulletSize={20} lineWidth={1} color="deep-green.7">
                <Timeline.Item bullet={<IconCircleCheck size={12} />} title={<Text size="sm" fw={700} c="#0A140F">Intake Form Validated</Text>}>
                  <Text size="xs" c="#4A4D51">01 Feb 2026</Text>
                </Timeline.Item>
                <Timeline.Item bullet={<IconVersions size={12} />} title={<Text size="sm" fw={700} c="#0A140F">Initial Typeset Draft</Text>}>
                  <Text size="xs" c="#4A4D51">First Proof Generated</Text>
                </Timeline.Item>
                <Timeline.Item bullet={<IconCircleCheck size={12} />} title={<Text size="sm" fw={700} c="#0A140F">Technical Validation</Text>}>
                  <Text size="xs" c="#4A4D51">Methodology Audit Pass</Text>
                </Timeline.Item>
                <Timeline.Item bullet={<IconClock size={12} />} title={<Text size="sm" fw={700} c="deep-green.7">Executive Review</Text>}>
                  <Text size="xs" fw={700} c="deep-green.7">Final Pass Active</Text>
                </Timeline.Item>
              </Timeline>
            </Paper>
          </Box>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
