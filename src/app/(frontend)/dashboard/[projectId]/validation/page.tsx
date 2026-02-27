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
  SimpleGrid, 
  Table, 
  ThemeIcon, 
  Box,
  Divider,
  Progress,
  RingProgress,
  Breadcrumbs,
  Anchor
} from '@mantine/core';
import { 
  IconCode, 
  IconCircleCheck,
  IconScale,
  IconFingerprint,
  IconShieldCheck
} from '@tabler/icons-react';
import Link from 'next/link';

export default function ProjectValidationPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = React.use(params);
  const projectIdFormatted = projectId.replace(/-/g, ' ').toUpperCase();

  return (
    <Container size="xl" my="xl">
      <Stack gap="lg">
        <Box mt="md">
          <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
            Technical <Text component="span" inherit c="burnished-gold.7">Reports</Text>
          </Title>
          <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
            Project: {projectIdFormatted} // Methodological Integrity // Statistical Verification
          </Text>
        </Box>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
          <Paper withBorder p={40} radius={0} bg="white" style={{ borderColor: '#E0DBCC' }}>
            <Stack align="center" gap="md">
              <Text ff="var(--font-display)" size="1rem" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                Integrity Score
              </Text>
              <RingProgress
                size={180}
                thickness={16}
                roundCaps
                label={
                  <Text size="xl" fw={700} ta="center" ff="var(--font-display)">99.4%</Text>
                }
                sections={[
                  { value: 99.4, color: 'deep-green.7' },
                ]}
              />
              <Badge color="deep-green.7" variant="light" radius={0}>STATISTICALLY_SOUND</Badge>
              <Text size="xs" c="dimmed" ta="center" ff="var(--font-body)" mt="sm">
                ALGORITHM: T-TEST / ANOVA <br />
                CONFIDENCE: 95%
              </Text>
            </Stack>
          </Paper>

          <Box style={{ gridColumn: 'span 2' }}>
            <Paper withBorder radius={0} p={0} bg="white" style={{ borderColor: '#E0DBCC' }}>
              <Box p="xl" bg="#FDFDFB" style={{ borderBottom: '1px solid #E0DBCC' }}>
                <Title order={5} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Dataset verification ledger
                </Title>
              </Box>
              <Table verticalSpacing="md" horizontalSpacing="xl">
                <Table.Thead bg="#F4F1EA">
                  <Table.Tr>
                    <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="#4A4D51">VARIABLE</Table.Th>
                    <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="#4A4D51">N</Table.Th>
                    <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="#4A4D51">DISTRIBUTION</Table.Th>
                    <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="#4A4D51">STATUS</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  <Table.Tr style={{ borderBottom: '1px solid #F4F1EA' }}>
                    <Table.Td><Text size="xs" ff="var(--font-body)" fw={700}>DEMO_AGE</Text></Table.Td>
                    <Table.Td><Text size="xs">1,240</Text></Table.Td>
                    <Table.Td>
                      <Progress value={85} size="xs" color="deep-green.7" radius={0} />
                    </Table.Td>
                    <Table.Td><IconCircleCheck size={16} color="var(--mantine-color-sage-7)" /></Table.Td>
                  </Table.Tr>
                  <Table.Tr style={{ borderBottom: '1px solid #F4F1EA' }}>
                    <Table.Td><Text size="xs" ff="var(--font-body)" fw={700}>SES_VAR</Text></Table.Td>
                    <Table.Td><Text size="xs">1,240</Text></Table.Td>
                    <Table.Td>
                      <Progress value={72} size="xs" color="deep-green.7" radius={0} />
                    </Table.Td>
                    <Table.Td><IconCircleCheck size={16} color="var(--mantine-color-sage-7)" /></Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </Paper>
          </Box>
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          <Paper withBorder p={40} radius={0} bg="white" style={{ borderColor: '#E0DBCC' }}>
            <Title order={4} ff="var(--font-display)" mb="xl" style={{ textTransform: 'uppercase' }}>
              <IconCode size={20} style={{ marginBottom: -4, marginRight: 8 }} />
              Code-Audit verification
            </Title>
            <Stack gap="md">
              <Group justify="space-between">
                <Text size="sm">R-Script Environment Integrity</Text>
                <Badge variant="outline" color="deep-green.7" radius={0}>VERIFIED</Badge>
              </Group>
              <Divider color="#F4F1EA" />
              <Group justify="space-between">
                <Text size="sm">Python/Pandas Data Cleaning</Text>
                <Badge variant="outline" color="deep-green.7" radius={0}>VERIFIED</Badge>
              </Group>
              <Divider color="#F4F1EA" />
              <Group justify="space-between">
                <Text size="sm">SPSS Syntax Replication</Text>
                <Badge variant="outline" color="deep-green.7" radius={0}>VERIFIED</Badge>
              </Group>
            </Stack>
          </Paper>

          <Paper withBorder p={40} radius={0} bg="white" style={{ borderColor: '#E0DBCC' }}>
            <Title order={4} ff="var(--font-display)" mb="xl" style={{ textTransform: 'uppercase' }}>
              <IconScale size={20} style={{ marginBottom: -4, marginRight: 8 }} />
              Institutional Bias Check
            </Title>
            <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }} mb="xl">
              Our automated audits scan for potential distribution anomalies and outliers that could compromise peer-review results. All datasets have passed the &quot;Scholarly Threshold.&quot;
            </Text>
            <Group grow>
              <Box style={{ border: '1px solid #E0DBCC', padding: '16px', textAlign: 'center' }}>
                <Text ff="var(--font-body)" size="7px" c="dimmed" style={{ letterSpacing: '2px' }}>P-VALUE:</Text>
                <Text ff="var(--font-body)" size="xs" fw={700}>&lt; 0.005</Text>
              </Box>
              <Box style={{ border: '1px solid #E0DBCC', padding: '16px', textAlign: 'center' }}>
                <Text ff="var(--font-body)" size="7px" c="dimmed" style={{ letterSpacing: '2px' }}>Z-SCORE:</Text>
                <Text ff="var(--font-body)" size="xs" fw={700}>2.58</Text>
              </Box>
            </Group>
          </Paper>
        </SimpleGrid>

        <Paper withBorder p={40} radius={0} bg="#FDFDFB" style={{ border: '1px solid var(--mantine-color-deep-green-3)' }}>
          <Group justify="space-between" align="center">
            <Stack gap={4}>
              <Title order={5} ff="var(--font-display)" style={{ textTransform: 'uppercase' }}>Verified by Principal Investigator</Title>
              <Text size="xs" c="dimmed">This dataset and methodology has been manually audited and is cleared for Final Executive Review.</Text>
            </Stack>
            <Group gap="xl">
              <Box style={{ textAlign: 'right' }}>
                <Text ff="var(--font-body)" size="7px" c="dimmed" style={{ letterSpacing: '1.5px' }}>PRINCIPAL_ID:</Text>
                <Text ff="var(--font-body)" size="xs" fw={700}>MICAH_S_PI_77</Text>
              </Box>
              <ThemeIcon color="deep-green.7" size={60} radius={0}>
                <IconFingerprint size={40} />
              </ThemeIcon>
            </Group>
          </Group>
        </Paper>
      </Stack>
    </Container>
  );
}
