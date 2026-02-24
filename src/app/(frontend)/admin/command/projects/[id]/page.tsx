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
  ActionIcon, 
  Tooltip, 
  Box, 
  Button,
  Divider,
  SimpleGrid,
  Timeline,
  Table,
  RingProgress,
  Textarea,
  ThemeIcon,
  ScrollArea,
  TextInput,
  Modal,
  Tabs,
  Select,
  Progress
} from '@mantine/core';
import { 
  IconArrowLeft,
  IconCircleCheck,
  IconClock,
  IconLock,
  IconFileCheck,
  IconVersions,
  IconHistory,
  IconMessageCircle,
  IconCoin,
  IconUser,
  IconUsers,
  IconTerminal2,
  IconFileSearch,
  IconSend,
  IconX
} from '@tabler/icons-react';
import Link from 'next/link';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

// Mock data - in a real app, this would be fetched based on the [id] param
const project = { 
  id: 'PRJ-7792', 
  name: 'Impact of Digital Spaces on Youth Development', 
  client: 'Dr. Emily Chen', 
  researcher: 'Sarah Miller', 
  niche: 'Social Sciences',
  status: 'Executive Review', 
  sentiment: 'Optimal',
  fridayPulse: 'Ready',
  readiness: 94,
  financials: {
    gross: '22,500.00',
    net: '21,825.00',
    researcher: '16,368.75',
    agency: '5,456.25'
  }
};

interface PageParams {
  id: string;
}

interface SingleProjectPageProps {
  params: Promise<PageParams>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function SingleProjectPage({ params }: SingleProjectPageProps) {
  const { id } = React.use(params);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const [phaseOpened, { open: openPhase, close: closePhase }] = useDisclosure(false);
  const [viewMemoOpened, { open: openViewMemo, close: closeViewMemo }] = useDisclosure(false);
  const [selectedMemo, setSelectedMemo] = React.useState<any>(null);

  const handleMemoClick = (memo: any) => {
    if (memo.status === 'Draft') {
      window.location.href = '/admin/command/liaison';
    } else {
      setSelectedMemo(memo);
      openViewMemo();
    }
  };

  return (
    <Container size="xl" py="xl">
      {/* 1. Archive Message Modal */}
      <Modal 
        opened={viewMemoOpened} 
        onClose={closeViewMemo} 
        size="lg" 
        padding={0} 
        radius={0} 
        withCloseButton={false}
        styles={{ 
          content: { background: '#121416', border: '1px solid #2A2D31' },
          overlay: { backdropFilter: 'blur(4px)' }
        }}
      >
        <Box p="xl" bg="#0A0B0C" style={{ borderBottom: '1px solid #2A2D31' }}>
          <Group justify="space-between">
            <Box>
              <Text size="9px" c="burnished-gold" mb={4} style={{ letterSpacing: '2px' }}>ARCHIVED_CORRESPONDENCE</Text>
              <Title order={3} ff="var(--font-display)" c="white" style={{ textTransform: 'uppercase' }}>
                {selectedMemo?.type.replace('_', ' ')}
              </Title>
            </Box>
            <ActionIcon variant="subtle" color="gray" onClick={closeViewMemo}><IconX size={20} /></ActionIcon>
          </Group>
        </Box>
        <Box p={40} bg="black" style={{ position: 'relative', overflow: 'hidden' }}>
          <Text pos="absolute" top="20%" left="10%" size="5rem" fw={900} c="white" opacity={0.02} style={{ transform: 'rotate(-20deg)', pointerEvents: 'none' }}>PRINCIPIA_ARCHIVE</Text>
          <Paper p="xl" radius={0} bg="white" style={{ position: 'relative', zIndex: 2 }}>
            <Stack gap="lg">
              <Box style={{ borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                <Group justify="space-between" mb="xs">
                  <Text size="xs" fw={700} c="dark">FROM: {selectedMemo?.sender}</Text>
                  <Text size="xs" c="dimmed">{selectedMemo?.date}</Text>
                </Group>
                <Text size="xs" fw={700} c="dark">TO: {selectedMemo?.target}</Text>
                <Text size="sm" fw={800} mt="md" c="black">SUBJECT: {selectedMemo?.subject}</Text>
              </Box>
              <Text size="xs" c="dark" style={{ lineHeight: 1.8, whiteSpace: 'pre-wrap', fontFamily: 'serif' }}>
                {`Dear Colleague,\n\nThis message serves as formal verification of the technical audit performed on the ${project.name} manuscript.\n\nOur WASM-rendering engine has confirmed that all methodological parameters meet the target house's high-fidelity requirements.\n\nSincerely,\nMicah S.\nPrincipal Investigator`}
              </Text>
            </Stack>
          </Paper>
        </Box>
        <Box p="md" bg="#0A0B0C" style={{ borderTop: '1px solid #2A2D31' }}>
          <Group justify="space-between">
            <Text size="9px" c="dimmed">DIGITAL_FINGERPRINT: 0x8F...2A1B</Text>
            <Badge size="xs" color="sage" variant="outline" radius={0}>IMMUTABLE_RECORD</Badge>
          </Group>
        </Box>
      </Modal>

      {/* 2. Phase Transition Modal */}
      <Modal 
        opened={phaseOpened} 
        onClose={closePhase} 
        title={<Text ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Advance Project Phase</Text>}
        size="md" 
        radius={0}
        styles={{ 
          content: { background: '#121416', border: '1px solid #2A2D31' },
          header: { background: '#0A0B0C', borderBottom: '1px solid #2A2D31', color: '#E1E1E1' },
          overlay: { backdropFilter: 'blur(4px)' }
        }}
      >
        <Stack gap="md" p="xl">
          <Box>
            <Text size="9px" c="dimmed" mb={4}>CURRENT_PHASE:</Text>
            <Badge variant="outline" color="burnished-gold" radius={0}>{project.status.toUpperCase()}</Badge>
          </Box>
          <Select 
            label="Target Phase" 
            placeholder="Select the next lifecycle stage"
            data={[
              'Intake', 'Assessment', 'Drafting/Editing', 
              'The Pivot (Formatting)', 'Internal QC', 
              'Client Review', 'Publication Cycle', 'Final Delivery'
            ]}
            variant="filled"
            styles={{ 
              input: { background: '#0A0B0C', border: '1px solid #2A2D31', color: 'white' }, 
              label: { color: 'var(--mantine-color-dimmed)', fontSize: '10px', marginBottom: '4px' } 
            }}
          />
          <Textarea 
            label="Transition Memo (Internal)" 
            placeholder="Reason for advancement or technical notes..." 
            minRows={3}
            variant="filled"
            styles={{ 
              input: { background: '#0A0B0C', border: '1px solid #2A2D31', color: 'white' }, 
              label: { color: 'var(--mantine-color-dimmed)', fontSize: '10px', marginBottom: '4px' } 
            }}
          />
          <Button 
            fullWidth 
            color="burnished-gold" 
            c="dark-forest" 
            radius={0} 
            mt="md"
            size="md"
            onClick={() => {
              alert('PROJECT PHASE ADVANCED // SUCCESS TRAIL UPDATED // RESEARCHER NOTIFIED');
              closePhase();
            }}
          >
            AUTHORIZE ADVANCEMENT
          </Button>
        </Stack>
      </Modal>

      {/* Strategic Memo Modal */}
      <Modal 
        opened={opened} 
        onClose={close} 
        title={<Text ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>New Strategic Memo</Text>}
        size="lg" 
        radius={0}
        styles={{ 
          content: { background: '#121416', border: '1px solid #2A2D31' },
          header: { background: '#0A0B0C', borderBottom: '1px solid #2A2D31', color: '#E1E1E1' },
          overlay: { backdropFilter: 'blur(4px)' }
        }}
      >
        <Stack gap="md" p="xl">
          <Box>
            <Text size="9px" c="burnished-gold" mb={4}>PROJECT_CONTEXT</Text>
            <Text size="sm" fw={700} c="white">{project.name}</Text>
            <Text size="xs" c="dimmed">Client: {project.client}</Text>
          </Box>
          <TextInput 
            label="Subject" 
            placeholder="e.g. Strategic recommendation for your manuscript..." 
            variant="filled" 
            styles={{ 
              input: { background: '#0A0B0C', border: '1px solid #2A2D31', color: 'white' }, 
              label: { color: 'var(--mantine-color-dimmed)', fontSize: '10px', marginBottom: '4px' } 
            }} 
          />
          <Textarea 
            label="Message Content" 
            placeholder="Draft your executive message here..." 
            minRows={8}
            variant="filled"
            styles={{ 
              input: { background: '#0A0B0C', border: '1px solid #2A2D31', color: 'white' }, 
              label: { color: 'var(--mantine-color-dimmed)', fontSize: '10px', marginBottom: '4px' } 
            }} 
          />
          <Button 
            fullWidth 
            color="burnished-gold" 
            c="dark-forest" 
            radius={0} 
            mt="md"
            size="md"
            leftSection={<IconSend size={18} />}
            onClick={() => {
              alert('STRATEGIC MEMO DISPATCHED // LOGGED TO PROJECT LEDGER');
              close();
            }}
          >
            AUTHORIZE & DISPATCH
          </Button>
        </Stack>
      </Modal>

      <Stack gap={40}>
        {/* 1. Technical Breadcrumb & Header */}
        <Box>
          <Group gap={8} mb="xs">
            <Text 
              component={Link} 
              href="/admin/command/projects" 
              size="9px" 
              ff="var(--font-body)" 
              c="dimmed" 
              style={{ textTransform: 'uppercase', letterSpacing: '2px', textDecoration: 'none' }}
              className="hover:text-burnished-gold transition-colors"
            >
              Project Registry
            </Text>
            <Text size="9px" c="dimmed">//</Text>
            <Text size="9px" ff="var(--font-body)" c="burnished-gold" style={{ textTransform: 'uppercase', letterSpacing: '2px' }}>
              {id}
            </Text>
          </Group>
          
          <Group justify="space-between" align="flex-end" wrap="wrap" gap="lg">
            <Box style={{ flex: 1, minWidth: isMobile ? '100%' : '300px' }}>
              <Title order={2} ff="var(--font-display)" size="clamp(1.5rem, 4vw, 2.5rem)" c="#E1E1E1" style={{ textTransform: 'uppercase', lineHeight: 1.1 }}>
                {project.name}
              </Title>
              <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
                Project Ledger // MS-ID: {id}
              </Text>
            </Box>
            <Group gap="sm" style={{ flexShrink: 0, width: isMobile ? '100%' : 'auto' }} grow={isMobile}>
              <Button 
                variant="outline" 
                color="burnished-gold" 
                radius={0} 
                size="sm"
                leftSection={<IconMessageCircle size={16} />}
                onClick={open}
              >
                Liaison Comms
              </Button>
              <Button 
                color="burnished-gold" 
                c="dark-forest" 
                radius={0}
                size="sm"
                onClick={openPhase}
              >
                Advance Phase
              </Button>
            </Group>
          </Group>
        </Box>

        {/* 2. Project Vitals (Dossier Header) */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
          <Paper withBorder p="md" radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
            <Text size="9px" c="burnished-gold" mb={4} style={{ letterSpacing: '1px' }}>CLIENT_ENTITY</Text>
            <Text ff="var(--font-display)" size="md" c="#E1E1E1">{project.client}</Text>
          </Paper>
          <Paper withBorder p="md" radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
            <Text size="9px" c="burnished-gold" mb={4} style={{ letterSpacing: '1px' }}>LEAD_RESEARCHER</Text>
            <Text ff="var(--font-display)" size="md" c="#E1E1E1">{project.researcher}</Text>
          </Paper>
          <Paper withBorder p="md" radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
            <Text size="9px" c="burnished-gold" mb={4} style={{ letterSpacing: '1px' }}>CURRENT_LIFECYCLE</Text>
            <Badge variant="filled" color="burnished-gold" size="xs" radius={0} c="dark-forest" w="100%">
              {project.status.toUpperCase()}
            </Badge>
          </Paper>
          <Paper withBorder p="md" radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
            <Group justify="space-between" align="center" wrap="nowrap">
              <Box>
                <Text size="9px" c="sage" mb={2} style={{ letterSpacing: '1px' }}>READINESS</Text>
                <Text ff="var(--font-display)" size="lg" c="#E1E1E1">{project.readiness}%</Text>
              </Box>
              <RingProgress
                size={48}
                thickness={4}
                roundCaps
                sections={[{ value: project.readiness, color: 'sage' }]}
              />
            </Group>
          </Paper>
        </SimpleGrid>

        <Stack gap="xl">
          {/* 3. The Institutional Project Record (Tabbed Ledger) */}
          <Paper withBorder radius={0} p={0} bg="transparent" style={{ borderColor: '#2A2D31', overflow: 'hidden' }}>
            <Box p="xl" bg="#0A0B0C" style={{ borderBottom: '1px solid #2A2D31' }}>
              <Group justify="space-between">
                <Title order={4} ff="var(--font-display)" c="burnished-gold" style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>
                  Project Record
                </Title>
              </Group>
            </Box>

            <Tabs defaultValue="milestones" variant="default" radius={0} color="burnished-gold" styles={{ 
              tab: { 
                fontSize: '11px', 
                textTransform: 'uppercase', 
                letterSpacing: '1px', 
                fontWeight: 600,
                padding: '16px 24px',
                color: 'var(--mantine-color-gray-6)'
              },
              panel: { paddingTop: '0px' }
            }}>
              <Tabs.List style={{ borderBottom: '1px solid #2A2D31' }}>
                <Tabs.Tab value="milestones" leftSection={<IconHistory size={14} />}>Success Trail</Tabs.Tab>
                <Tabs.Tab value="comms" leftSection={<IconMessageCircle size={14} />}>Liaison Record</Tabs.Tab>
                <Tabs.Tab value="technical" leftSection={<IconTerminal2 size={14} />}>Internal Log</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="milestones" p="xl">
                <Stack gap="xl">
                  <Box>
                    <Timeline active={3} bulletSize={32} lineWidth={1} color="sage" styles={{ 
                      itemBullet: { backgroundColor: '#0A0B0C', border: '1px solid #2A2D31' }, 
                      item: { paddingBottom: '24px' } 
                    }}>
                      <Timeline.Item bullet={<IconFileCheck size={18} stroke={1.5} color="var(--mantine-color-burnished-gold-7)" />} title={<Text size="sm" c="#E1E1E1" fw={700}>Project Inception</Text>}>
                        <Text size="xs" c="dimmed">Diagnostic Audit Passed // 01 Feb 2026</Text>
                      </Timeline.Item>
                      <Timeline.Item bullet={<IconVersions size={18} stroke={1.5} color="var(--mantine-color-burnished-gold-7)" />} title={<Text size="sm" c="#E1E1E1" fw={700}>Technical Setup</Text>}>
                        <Text size="xs" c="dimmed">WASM Environment Initialized // 02 Feb 2026</Text>
                      </Timeline.Item>
                      <Timeline.Item bullet={<IconCircleCheck size={18} stroke={1.5} color="var(--mantine-color-burnished-gold-7)" />} title={<Text size="sm" c="#E1E1E1" fw={700}>Methodology Audit</Text>}>
                        <Text size="xs" c="dimmed">BibTeX & Figure Integrity Verified // 05 Feb 2026</Text>
                      </Timeline.Item>
                      <Timeline.Item bullet={<IconClock size={18} stroke={1.5} color="var(--mantine-color-sage-7)" />} title={<Text size="sm" c="sage" fw={700}>Executive Clearance</Text>}>
                        <Text size="xs" c="dimmed">Principal Review in Progress</Text>
                      </Timeline.Item>
                      <Timeline.Item bullet={<IconSend size={18} stroke={1.5} color="var(--mantine-color-gray-8)" />} title={<Text size="sm" c="gray.8" fw={700}>Final Journal Submission</Text>}>
                        <Text size="xs" c="gray.9">Pending Authorization</Text>
                      </Timeline.Item>
                    </Timeline>
                  </Box>
                  
                  <Paper p="xl" bg="#0A0B0C" style={{ border: '1px dashed #2A2D31' }}>
                    <Text size="9px" fw={600} c="burnished-gold" mb="md" style={{ letterSpacing: '1px', textTransform: 'uppercase' }}>NEXT_ACTION_DIRECTIVE</Text>
                    <Text size="xs" c="#E1E1E1" style={{ lineHeight: 1.8 }}>
                      Awaiting final authorization from Principal Micah S. before journal hand-off. Internal technical QC has reached 100% compliance.
                    </Text>
                  </Paper>
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="comms">
                <Box p="xl" bg="#0A0B0C">
                  <Group justify="space-between" align="flex-end">
                    <Box>
                      <Badge variant="outline" color="sage" size="xs" radius={0}>ADMIN_PROXY_ACTIVE</Badge>
                    </Box>
                    <Group gap="xs">
                      <Select 
                        size="xs" 
                        placeholder="Thread Filter"
                        data={['Routledge (Primary)', 'Taylor & Francis', 'Direct to Client']}
                        defaultValue="Routledge (Primary)"
                        variant="filled"
                        styles={{ input: { background: '#0A0B0C', border: '1px solid #2A2D31', color: 'white', fontSize: '10px' } }}
                      />
                    </Group>
                  </Group>
                </Box>

                <ScrollArea>
                  <Table verticalSpacing="md" horizontalSpacing="xl" highlightOnHover>
                    <Table.Thead bg="#0A0B0C">
                      <Table.Tr>
                        <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="dimmed">DATE</Table.Th>
                        <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="dimmed">RECORD_TYPE</Table.Th>
                        <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="dimmed">SUBJECT_LINE</Table.Th>
                        <Table.Th ff="var(--font-body)" style={{ fontSize: "9px" }} c="dimmed">STATUS</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {[
                        { date: '10 Feb 2026', type: 'PUBLISHER_LIAISON', target: 'Routledge Editorial', subject: 'Technical Query: Equation Alignment', status: 'Delivered', sender: 'dr.chen.office@vance.lab' },
                        { date: '05 Feb 2026', type: 'EXECUTIVE_MEMO', target: 'Dr. Emily Chen', subject: 'Methodology Discrepancy Found', status: 'Sent', sender: 'micah@vance.lab' },
                        { date: '01 Feb 2026', type: 'AUTOMATED_PULSE', target: 'Dr. Emily Chen', subject: 'Project Initialized', status: 'Delivered', sender: 'system@vance.lab' }
                      ].map((memo, i) => (
                        <Table.Tr key={i} onClick={() => handleMemoClick(memo)} style={{ cursor: 'pointer', borderBottom: '1px solid #2A2D31' }}>
                          <Table.Td><Text size="xs" c="dimmed">{memo.date}</Text></Table.Td>
                          <Table.Td>
                            <Badge variant="dot" color="burnished-gold" size="xs">{memo.type}</Badge>
                          </Table.Td>
                          <Table.Td>
                            <Box>
                              <Text size="sm" fw={700} c="#E1E1E1">{memo.subject}</Text>
                              <Text size="9px" c="dimmed">{memo.target.toUpperCase()}</Text>
                            </Box>
                          </Table.Td>
                          <Table.Td>
                            <Text size="9px" ff="var(--font-body)" c="sage">{memo.status.toUpperCase()}</Text>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </ScrollArea>
              </Tabs.Panel>

              <Tabs.Panel value="technical" p="xl">
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing={60}>
                  <ScrollArea h={350} offsetScrollbars>
                    <Stack gap="xl" pr="md">
                      <Box style={{ borderLeft: '1px solid #2A2D31', paddingLeft: '20px' }}>
                        <Text size="xs" c="dimmed" mb={4}>SARAH_M // 05 Feb // 14:20</Text>
                        <Text size="xs" c="#E1E1E1" style={{ lineHeight: 1.6 }}>
                          Roadblock: The bibliography file Dr. Chen uploaded uses a non-standard BibTeX schema for the law journals.
                        </Text>
                      </Box>
                      <Box style={{ borderLeft: '1px solid var(--mantine-color-burnished-gold-7)', paddingLeft: '20px' }}>
                        <Text size="xs" c="burnished-gold" mb={4}>ARCHITECT // 05 Feb // 14:45</Text>
                        <Text size="xs" c="#E1E1E1" style={{ lineHeight: 1.6 }}>
                          Confirmed. I'll alert Micah to wait for the next WASM compile before he starts the Executive Review.
                        </Text>
                      </Box>
                    </Stack>
                  </ScrollArea>
                  <Box>
                    <Textarea placeholder="Add technical addendum to project record..." variant="unstyled" p="md" bg="#0A0B0C" styles={{ input: { color: 'white', fontSize: '12px' } }} style={{ border: '1px solid #2A2D31' }} minRows={5} />
                    <Group justify="flex-end" mt="md">
                      <Button size="xs" variant="subtle" color="red" radius={0}>Flag Blocked</Button>
                      <Button size="xs" color="burnished-gold" c="dark-forest" radius={0}>Post to Ledger</Button>
                    </Group>
                  </Box>
                </SimpleGrid>
              </Tabs.Panel>
            </Tabs>
          </Paper>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            {/* 4. Publisher Liaison */}
            <Paper withBorder p="xl" radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
              <Title order={5} ff="var(--font-display)" c="burnished-gold" mb="xl" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                Publisher Liaison
              </Title>
              <Stack gap="md">
                <Box p="md" style={{ border: '1px solid #2A2D31' }}>
                  <Group justify="space-between" mb="xs">
                    <Text size="sm" fw={700} c="#E1E1E1">CRC Press Editorial</Text>
                    <Badge size="xs" color="orange" variant="outline" radius={0}>WAITING_ON_THEM</Badge>
                  </Group>
                  <Text size="xs" c="dimmed">Last Status: Proofs sent to publisher via liaison alias on 10 Feb.</Text>
                </Box>
                <Button fullWidth variant="outline" color="gray.6" radius={0} size="xs">
                  Request Publisher Status Update
                </Button>
              </Stack>
            </Paper>

            {/* 5. Financial Ledger */}
            <Paper withBorder radius={0} p="xl" bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
              <Title order={5} ff="var(--font-display)" c="burnished-gold" mb="xl" style={{ letterSpacing: '1px' }}>
                <IconCoin size={20} style={{ marginBottom: -4, marginRight: 8 }} />
                Financial Ledger
              </Title>
              <Stack gap="lg">
                <Group justify="space-between">
                  <Box>
                    <Text size="9px" c="burnished-gold" mb={4} style={{ letterSpacing: '1px' }}>GROSS_FEE</Text>
                    <Text size="lg" ff="var(--font-display)" c="#E1E1E1">${project.financials.gross}</Text>
                  </Box>
                  <Badge color="sage" variant="filled" radius={0} c="dark-forest">PAID_IN_FULL</Badge>
                </Group>
                <Divider color="#2A2D31" />
                <Group justify="space-between">
                  <Box>
                    <Text size="9px" c="burnished-gold" mb={4} style={{ letterSpacing: '1px' }}>RESEARCHER_PAYOUT (75%)</Text>
                    <Text size="md" ff="var(--font-display)" c="sage">${project.financials.researcher}</Text>
                  </Box>
                  <Box ta="right">
                    <Text size="9px" c="burnished-gold" mb={4} style={{ letterSpacing: '1px' }}>AGENCY_MARGIN</Text>
                    <Text size="md" ff="var(--font-display)" c="parchment">${project.financials.agency}</Text>
                  </Box>
                </Group>
              </Stack>
            </Paper>
          </SimpleGrid>
        </Stack>
      </Stack>
    </Container>
  );
}
