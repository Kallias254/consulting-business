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
  Box,
  Divider,
  Progress,
  RingProgress,
  SimpleGrid
} from '@mantine/core';
import { 
  IconShieldCheck, 
  IconCircleCheck,
  IconFingerprint,
  IconBook,
  IconSearch,
  IconFileCertificate,
  IconHistory,
  IconCode
} from '@tabler/icons-react';

export default function ProjectValidationPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = React.use(params);
  const projectIdFormatted = projectId.replace(/-/g, ' ').toUpperCase();
  
  // Map validation views to your existing mock projects
  const isTechnicalProject = projectId.includes('stats') || 
                             projectId.includes('quantum-gravity') || 
                             projectId.includes('validation');

  return (
    <Container size="xl" fluid>
      <Stack gap="xl">
        {/* 1. Page Header */}
        <Box>
          <Group justify="space-between" align="flex-end">
            <Box>
              <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
                Technical <Text component="span" inherit c="burnished-gold.7">Validation</Text>
              </Title>
              <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
                Project: {projectIdFormatted} // {isTechnicalProject ? 'Methodological Rigor' : 'Manuscript Integrity'} Audit // {isTechnicalProject ? 'Statistical' : 'Publisher'} Compliance Ledger
              </Text>
            </Box>
            <Badge color="sage.7" variant="light" radius={0} size="lg" p="md" leftSection={<IconShieldCheck size={16} />}>
              {isTechnicalProject ? 'RIGOR_AUDIT_ACTIVE' : 'COMPLIANCE_AUDIT_ACTIVE'}
            </Badge>
          </Group>
        </Box>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
          {/* 2. Main Integrity Score */}
          <Paper withBorder p={40} radius={0} bg="white" style={{ borderColor: '#E0DBCC' }}>
            <Stack align="center" gap="md">
              <Text ff="var(--font-display)" size="9px" fw={700} c="dimmed" style={{ textTransform: 'uppercase', letterSpacing: '2px' }}>
                {isTechnicalProject ? 'INTEGRITY_SCORE' : 'COMPLIANCE_SCORE'}
              </Text>
              <RingProgress
                size={180}
                thickness={14}
                roundCaps
                label={
                  <Stack gap={0} align="center">
                    <Text size="2rem" fw={900} ta="center" ff="var(--font-display)" c="deep-green.9">{isTechnicalProject ? '99.4%' : '98.4%'}</Text>
                    <Text size="8px" fw={700} c="dimmed">{isTechnicalProject ? 'STATISTICALLY_SOUND' : 'READY_FOR_PI_REVIEW'}</Text>
                  </Stack>
                }
                sections={[
                  { value: isTechnicalProject ? 99.4 : 98.4, color: 'sage.7' },
                ]}
              />
              <Badge color="sage.7" variant="filled" radius={0}>
                {isTechnicalProject ? 'P-VALUE_THRESHOLD_PASS' : 'SCHOLARLY_THRESHOLD_PASS'}
              </Badge>
              <Text size="xs" c="dimmed" ta="center" ff="var(--font-body)" mt="sm" style={{ lineHeight: 1.6 }}>
                {isTechnicalProject ? (
                  <>Algorithm: <b>T-TEST / ANOVA</b> <br /> Confidence: 95%</>
                ) : (
                  <>Target Publisher: <b>CRC Press Monograph</b> <br /> Last Auto-Audit: 14m ago</>
                )}
              </Text>
            </Stack>
          </Paper>

          {/* 3. The Core Ledger (Technical or Structural) */}
          <Box style={{ gridColumn: 'span 2' }}>
            <Paper withBorder radius={0} p={0} bg="white" style={{ borderColor: '#E0DBCC' }}>
              <Box p="xl" bg="#FDFDFB" style={{ borderBottom: '1px solid #E0DBCC' }}>
                <Group justify="space-between">
                  <Title order={5} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {isTechnicalProject ? 'Dataset Verification Ledger' : 'Manuscript Structural Integrity'}
                  </Title>
                  <ThemeIcon variant="subtle" color="dimmed">
                    <IconFingerprint size={18} />
                  </ThemeIcon>
                </Group>
              </Box>
              <Table verticalSpacing="md" horizontalSpacing="xl">
                <Table.Thead bg="#F4F1EA">
                  <Table.Tr>
                    <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="#4A4D51">{isTechnicalProject ? 'VARIABLE' : 'AUDIT_VECTOR'}</Table.Th>
                    <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="#4A4D51">{isTechnicalProject ? 'N / DISTRIBUTION' : 'COMPLIANCE'}</Table.Th>
                    <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="#4A4D51">{isTechnicalProject ? 'P-VALUE' : 'IDENTIFIED_ANOMALIES'}</Table.Th>
                    <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="#4A4D51">STATUS</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {isTechnicalProject ? (
                    <>
                      <Table.Tr style={{ borderBottom: '1px solid #F4F1EA' }}>
                        <Table.Td><Text size="xs" ff="var(--font-body)" fw={700}>DEMO_AGE</Text></Table.Td>
                        <Table.Td><Progress value={85} size="xs" color="sage.7" radius={0} /></Table.Td>
                        <Table.Td><Text size="xs">{"<"} 0.001</Text></Table.Td>
                        <Table.Td><IconCircleCheck size={16} color="var(--mantine-color-sage-7)" /></Table.Td>
                      </Table.Tr>
                      <Table.Tr style={{ borderBottom: '1px solid #F4F1EA' }}>
                        <Table.Td><Text size="xs" ff="var(--font-body)" fw={700}>ANOVA_RES</Text></Table.Td>
                        <Table.Td><Progress value={92} size="xs" color="sage.7" radius={0} /></Table.Td>
                        <Table.Td><Text size="xs">{"<"} 0.005</Text></Table.Td>
                        <Table.Td><IconCircleCheck size={16} color="var(--mantine-color-sage-7)" /></Table.Td>
                      </Table.Tr>
                    </>
                  ) : (
                    <>
                      <Table.Tr style={{ borderBottom: '1px solid #F4F1EA' }}>
                        <Table.Td><Text size="xs" ff="var(--font-body)" fw={700}>BIBLIOGRAPHIC_HEALTH</Text></Table.Td>
                        <Table.Td><Progress value={95} size="xs" color="sage.7" radius={0} /></Table.Td>
                        <Table.Td><Text size="xs">320/322 Ref Validated</Text></Table.Td>
                        <Table.Td><IconCircleCheck size={16} color="var(--mantine-color-sage-7)" /></Table.Td>
                      </Table.Tr>
                      <Table.Tr style={{ borderBottom: '1px solid #F4F1EA' }}>
                        <Table.Td><Text size="xs" ff="var(--font-body)" fw={700}>HEADING_HIERARCHY</Text></Table.Td>
                        <Table.Td><Progress value={100} size="xs" color="sage.7" radius={0} /></Table.Td>
                        <Table.Td><Text size="xs">None</Text></Table.Td>
                        <Table.Td><IconCircleCheck size={16} color="var(--mantine-color-sage-7)" /></Table.Td>
                      </Table.Tr>
                    </>
                  )}
                </Table.Tbody>
              </Table>
            </Paper>
          </Box>
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          {/* 4. Secondary Audit (Code Environment or Template Match) */}
          <Paper withBorder p={40} radius={0} bg="white" style={{ borderColor: '#E0DBCC' }}>
            <Title order={4} ff="var(--font-display)" mb="xl" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
              {isTechnicalProject ? <IconCode size={20} style={{ marginBottom: -4, marginRight: 8, color: 'var(--mantine-color-burnished-gold-7)' }} /> : <IconBook size={20} style={{ marginBottom: -4, marginRight: 8, color: 'var(--mantine-color-burnished-gold-7)' }} />}
              {isTechnicalProject ? 'Environment Integrity' : 'Publisher Template Match'}
            </Title>
            <Stack gap="md">
              <Group justify="space-between">
                <Text size="sm">{isTechnicalProject ? 'R-Script Replication' : 'Base Font: Palatino (11pt)'}</Text>
                <Badge variant="outline" color="sage.7" radius={0}>VERIFIED</Badge>
              </Group>
              <Divider color="#F4F1EA" />
              <Group justify="space-between">
                <Text size="sm">{isTechnicalProject ? 'Python/Pandas Data Clean' : 'Line Spacing: 1.2pt'}</Text>
                <Badge variant="outline" color="sage.7" radius={0}>VERIFIED</Badge>
              </Group>
            </Stack>
          </Paper>

          {/* 5. Human Review Benchmarks & Ethics */}
          <Paper withBorder p={40} radius={0} bg="white" style={{ borderColor: '#E0DBCC' }}>
            <Title order={4} ff="var(--font-display)" mb="xl" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
              <IconFileCertificate size={20} style={{ marginBottom: -4, marginRight: 8, color: 'var(--mantine-color-deep-green-7)' }} />
              Validation Benchmarks
            </Title>
            
            <Stack gap="xl">
              <Box>
                <Text size="9px" fw={700} c="dimmed" mb={8} style={{ letterSpacing: '1px' }}>ETHICS_&_HUMAN_SUBJECTS</Text>
                <Group justify="space-between" p="sm" bg="sage.0" style={{ border: '1px solid var(--mantine-color-sage-2)' }}>
                  <Group gap="xs">
                    <IconShieldCheck size={16} color="var(--mantine-color-sage-7)" />
                    <Text size="xs" fw={700}>IRB Approval Verified</Text>
                  </Group>
                  <Badge color="sage.7" variant="filled" radius={0} size="xs">0xEthics_Pass</Badge>
                </Group>
                <Text size="xs" c="dimmed" mt={4}>Institutional Review Board certificate #IRB-2025-004 validated against University records.</Text>
              </Box>

              <Divider color="#F4F1EA" />

              <Box>
                <Text size="9px" fw={700} c="dimmed" mb={8} style={{ letterSpacing: '1px' }}>RESEARCHER_OATHS</Text>
                <Stack gap="xs">
                  <Group gap="xs">
                    <IconCircleCheck size={14} color="var(--mantine-color-sage-7)" />
                    <Text size="xs" ff="var(--font-body)" fw={700}>
                      {isTechnicalProject ? 'Independent replication of raw dataset results.' : 'All block quotes verified for length/indent.'}
                    </Text>
                  </Group>
                  <Group gap="xs">
                    <IconCircleCheck size={14} color="var(--mantine-color-sage-7)" />
                    <Text size="xs" ff="var(--font-body)" fw={700}>
                      {isTechnicalProject ? 'Bias-neutralization audit on outliers.' : 'Chapter-level footnotes numbered sequentially.'}
                    </Text>
                  </Group>
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </SimpleGrid>

        {/* Principal Certification */}
        <Paper withBorder p={40} radius={0} bg="#FDFDFB" style={{ border: '1px solid var(--mantine-color-deep-green-3)' }}>
          <Group justify="space-between" align="center">
            <Stack gap={4}>
              <Title order={5} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Principal Investigator Certification</Title>
              <Text size="xs" c="dimmed" ff="var(--font-body)">This manuscript has been audited against publisher guidelines and is cleared for Final Executive Review.</Text>
            </Stack>
            <Group gap="xl">
              <Box style={{ textAlign: 'right' }}>
                <Text ff="var(--font-body)" size="7px" c="dimmed" style={{ letterSpacing: '2.5px' }}>PI_ID_HASH:</Text>
                <Text ff="var(--font-body)" size="xs" fw={700} c="deep-green.9">M_S_PRINCIPAL_88</Text>
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
