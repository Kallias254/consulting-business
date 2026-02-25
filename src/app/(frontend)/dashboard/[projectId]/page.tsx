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
  ThemeIcon,
  Tooltip,
  Divider,
  ScrollArea,
  Anchor
} from '@mantine/core';
import { 
  IconFileDescription, 
  IconDownload, 
  IconCircleCheck, 
  IconClock, 
  IconArrowRight,
  IconFingerprint,
  IconShieldCheck,
  IconHistory
} from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';

// In a real app, you would fetch project data based on the `params.projectId`
// For now, the data remains static as in the original design.
export default function ProjectDetailPage({ params }: { params: { projectId: string } }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // You can use the projectId to fetch project-specific data
  // console.log(params.projectId);


  return (
    <Container size="xl" my="xl">
      <Stack gap="lg">
        {/* 1. Publication Readiness HUD */}
        <Card 
          withBorder 
          p={{ base: 'xl', md: 40 }} 
          radius={0} 
          bg="white" 
          style={{ borderColor: '#E0DBCC', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}
        >
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={60}>
            <Stack justify="center" gap="md">
              <Badge variant="filled" color="burnished-gold" size="xs" radius={0}>Active Review Phase</Badge>
              <Title order={1} ff="var(--font-display)" size="3rem" style={{ textTransform: 'uppercase', lineHeight: 1.1, color: '#0A140F' }}>
                {params.projectId.replace(/-/g, ' ').toUpperCase()}: <br />
                <Text component="span" inherit c="#4A4D51">Final Scholarly Review</Text>
              </Title>
              <Text mt="md" size="sm" c="#4A4D51" maw={480} style={{ lineHeight: 1.8 }}>
                Your manuscript has been through our internal technical QC. It is currently under the final oversight of our Principal Investigator before submission to Taylor & Francis.
              </Text>
              <Group mt="xl" gap="md" wrap="wrap">
                <Button 
                  component={Link} 
                  href={`/dashboard/${params.projectId}/vault`} 
                  color="deep-green.7" 
                  radius={0} 
                  rightSection={<IconArrowRight size={16} />} 
                  size="md"
                >
                  Review Final Proofs
                </Button>
                <Button variant="outline" color="deep-green.7" radius={0} size="md" styles={{ root: { borderColor: '#E0DBCC' } }}>Contact Liaison</Button>
              </Group>
            </Stack>

            <Group justify="center">
              <Box style={{ position: 'relative' }}>
                <RingProgress
                  size={isMobile ? 200 : 260}
                  thickness={18}
                  roundCaps
                  label={
                    <Stack gap={0} align="center">
                      <Text ff="var(--font-display)" size="2.5rem" fw={700} style={{ lineHeight: 1, color: '#0A140F' }}>92%</Text>
                      <Text size="xs" c="#4A4D51" ff="var(--font-body)" style={{ textTransform: 'uppercase', letterSpacing: '2px' }}>Readiness</Text>
                    </Stack>
                  }
                  sections={[
                    { value: 92, color: 'deep-green.7' },
                  ]}
                />
                <ThemeIcon 
                  pos="absolute" 
                  bottom={20} 
                  right={20} 
                  size="xl" 
                  radius="xl" 
                  color="sage" 
                  variant="light"
                  style={{ boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
                >
                  <IconShieldCheck size={24} />
                </ThemeIcon>
              </Box>
            </Group>
          </SimpleGrid>
        </Card>

        <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="xl" >
          {/* 2. The Manuscript Ledger (Table based, high density) */}
          <Box style={{ gridColumn: 'span 2' }}>
            <Card withBorder p={0} radius={0} bg="white" style={{ borderColor: '#E0DBCC' }}>
              <Box p="xl" bg="#FDFDFB" style={{ borderBottom: '1px solid #E0DBCC' }}>
                <Group justify="space-between">
                  <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1.5px', color: '#0A140F' }}>
                    Manuscript Ledger
                  </Title>
                  <Anchor component={Link} href={`/dashboard/${params.projectId}/history`} size="xs" fw={700} c="deep-green.7" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Full Audit History →
                  </Anchor>
                </Group>
              </Box>
              <ScrollArea>
                <Table verticalSpacing="md" horizontalSpacing="xl" highlightOnHover>
                  <Table.Thead bg="#F4F1EA">
                    <Table.Tr>
                      <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="#4A4D51">VERSION</Table.Th>
                      <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="#4A4D51">STATUS</Table.Th>
                      <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="#4A4D51">LAST ACTION</Table.Th>
                      <Table.Th></Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {[
                      { file: 'Manuscript_v4_Final.pdf', date: 'Today', status: 'Approved', qc: 'PASS', size: '2.4MB' },
                      { file: 'Methodology_Draft_v3.pdf', date: '05 Feb', status: 'Archived', qc: 'PASS', size: '1.8MB' },
                      { file: 'Data_Validation_v2.pdf', date: '01 Feb', status: 'Archived', qc: 'WARN', size: '4.2MB' },
                    ].map((row, i) => (
                      <Table.Tr key={i} style={{ borderBottom: '1px solid #F4F1EA' }}>
                        <Table.Td>
                          <Group gap="sm">
                            <ThemeIcon variant="light" color="deep-green.7" radius={0} size="md">
                              <IconFileDescription size={16} />
                            </ThemeIcon>
                            <Box>
                              <Text size="sm" fw={700} c="#0A140F">{row.file}</Text>
                              <Text size="9px" c="#868E96" ff="var(--font-body)" fw={500}>PUSHED: {row.date.toUpperCase()} // {row.size}</Text>
                            </Box>
                          </Group>
                        </Table.Td>
                        <Table.Td><Badge color="deep-green.7" size="xs" radius={0}>{row.status.toUpperCase()}</Badge></Table.Td>
                        <Table.Td>
                          <Group gap={6}>
                            <Box w={6} h={6} bg={row.qc === 'PASS' ? 'sage' : 'orange'} style={{ borderRadius: '50%' }} />
                            <Text size="9px" fw={700} c="#4A4D51" ff="var(--font-body)">{row.qc}_SECURE</Text>
                          </Group>
                        </Table.Td>
                        <Table.Td>
                          <Tooltip label="Download Proof">
                            <ActionIcon variant="subtle" color="deep-green.7"><IconDownload size={18} /></ActionIcon>
                          </Tooltip>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </ScrollArea>
            </Card>
          </Box>

          {/* 3. Project Milestones (Timeline) */}
          <Box>
            <Card withBorder p={40} radius={0} bg="white" style={{ borderColor: '#E0DBCC' }}>
              <Title order={4} ff="var(--font-display)" mb="xl" style={{ textTransform: 'uppercase', letterSpacing: '1px', color: '#0A140F' }}>
                Critical milestones
              </Title>
              
              <Timeline active={2} bulletSize={20} lineWidth={1} color="deep-green.7">
                <Timeline.Item bullet={<IconCircleCheck size={12} />} title={<Text size="sm" fw={700} c="#0A140F">Intake complete</Text>}>
                  <Text size="xs" c="#4A4D51">02 Feb 2026</Text>
                </Timeline.Item>

                <Timeline.Item bullet={<IconCircleCheck size={12} />} title={<Text size="sm" fw={700} c="#0A140F">Technical Validation</Text>}>
                  <Text size="xs" c="#4A4D51">05 Feb 2026</Text>
                </Timeline.Item>

                <Timeline.Item bullet={<IconClock size={12} />} title={<Text size="sm" fw={700} c="deep-green.7">Executive Review</Text>}>
                  <Text size="xs" fw={700} c="deep-green.7">In progress</Text>
                </Timeline.Item>

                <Timeline.Item title={<Text size="sm" fw={700} c="#ADB5BD">Journal Submission</Text>}>
                  <Text size="xs" c="#ADB5BD">Estimated: 48h</Text>
                </Timeline.Item>
              </Timeline>
            </Card>
          </Box>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
