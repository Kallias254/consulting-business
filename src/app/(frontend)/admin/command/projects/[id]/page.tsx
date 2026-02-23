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
  Select
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
import { useDisclosure } from '@mantine/hooks';

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
  const [opened, { open, close }] = useDisclosure(false);
  const [phaseOpened, { open: openPhase, close: closePhase }] = useDisclosure(false);
  const [viewMemoOpened, { open: openViewMemo, close: closeViewMemo }] = useDisclosure(false);
  const [selectedMemo, setSelectedMemo] = React.useState<any>(null);

  const handleMemoClick = (memo: any) => {
    if (memo.status === 'Draft') {
      // Logic would navigate to buffer
      window.location.href = '/admin/command/liaison';
    } else {
      setSelectedMemo(memo);
      openViewMemo();
    }
  };

  return (
    <Container size="xl" fluid>
      {/* 1. Archive Message Modal */}
      <Modal 
        opened={viewMemoOpened} 
        onClose={closeViewMemo} 
        size="lg" 
        padding={0} 
        radius={0} 
        withCloseButton={false}
        styles={{ content: { background: '#121416', border: '1px solid #2A2D31' } }}
      >
        <Box p="xl" bg="#0A0B0C" style={{ borderBottom: '1px solid #2A2D31' }}>
          <Group justify="space-between">
            <Box>
              <Text size="7px" c="burnished-gold" mb={4} style={{ letterSpacing: '2px' }}>ARCHIVED_CORRESPONDENCE</Text>
              <Title order={3} ff="var(--font-display)" c="white" style={{ textTransform: 'uppercase' }}>
                {selectedMemo?.type.replace('_', ' ')}
              </Title>
            </Box>
            <ActionIcon variant="subtle" color="gray" onClick={closeViewMemo}><IconX size={20} /></ActionIcon>
          </Group>
        </Box>
        <Box p={40} bg="black" style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Institutional Watermark */}
          <Text pos="absolute" top="20%" left="10%" size="5rem" fw={900} c="white" opacity={0.02} style={{ transform: 'rotate(-20deg)', pointerEvents: 'none' }}>VANCE_LAB_ARCHIVE</Text>
          
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
            <Text size="7px" c="dimmed">DIGITAL_FINGERPRINT: 0x8F...2A1B</Text>
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
          header: { background: '#0A0B0C', borderBottom: '1px solid #2A2D31', color: '#E1E1E1' }
        }}
      >
        <Stack gap="md" p="md">
          <Box>
            <Text size="7px" c="dimmed" mb={4}>CURRENT_PHASE:</Text>
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
            styles={{ input: { background: '#0A0B0C', border: '1px solid #2A2D31', color: 'white' }, label: { color: 'dimmed', fontSize: '10px' } }}
          />
          <Textarea 
            label="Transition Memo (Internal)" 
            placeholder="Reason for advancement or technical notes..." 
            minRows={3}
            variant="filled"
            styles={{ input: { background: '#0A0B0C', border: '1px solid #2A2D31', color: 'white' }, label: { color: 'dimmed', fontSize: '10px' } }}
          />
          <Button 
            fullWidth 
            color="sage" 
            c="dark-forest" 
            radius={0} 
            mt="md"
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
          header: { background: '#0A0B0C', borderBottom: '1px solid #2A2D31', color: '#E1E1E1' }
        }}
      >
        <Stack gap="md" p="md">
          <Box>
            <Text size="7px" c="burnished-gold" mb={4}>PROJECT_CONTEXT</Text>
            <Text size="sm" fw={700} c="white">{project.name}</Text>
            <Text size="xs" c="dimmed">Client: {project.client}</Text>
          </Box>
          <TextInput 
            label="Subject" 
            placeholder="e.g. Strategic recommendation for your manuscript..." 
            variant="filled" 
            styles={{ input: { background: '#0A0B0C', border: '1px solid #2A2D31', color: 'white' }, label: { color: 'dimmed', fontSize: '10px' } }} 
          />
          <Textarea 
            label="Message Content" 
            placeholder="Draft your executive message here..." 
            minRows={8}
            variant="filled"
            styles={{ input: { background: '#0A0B0C', border: '1px solid #2A2D31', color: 'white' }, label: { color: 'dimmed', fontSize: '10px' } }}
          />
          <Button 
            fullWidth 
            color="burnished-gold" 
            c="dark-forest" 
            radius={0} 
            mt="md"
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
        {/* 1. Page Header */}
        <Box>
          <Button 
            component={Link} 
            href="/admin/command/projects" 
            variant="subtle" 
            color="gray.6" 
            leftSection={<IconArrowLeft size={16} />} 
            p={0} 
            mb="md"
          >
            Back to All Projects
          </Button>
          <Group justify="space-between" align="flex-end">
            <Box>
              <Title order={2} ff="var(--font-display)" size="2.5rem" c="#E1E1E1" style={{ textTransform: 'uppercase' }}>
                {project.name}
              </Title>
              <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
                Project Ledger // ID: {id}
              </Text>
            </Box>
            <Group gap="md">
              <Button 
                variant="outline" 
                color="burnished-gold" 
                radius={0} 
                leftSection={<IconMessageCircle size={16} />}
                onClick={open}
              >
                Liaison Comms
              </Button>
              <Button 
                color="burnished-gold" 
                c="dark-forest" 
                radius={0}
                onClick={openPhase}
              >
                Advance Phase
              </Button>
            </Group>
          </Group>
        </Box>

        {/* 2. Project Vitals */}
        <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} spacing="xl">
          <Paper withBorder p="xl" radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
            <Group justify="space-between" mb="xs">
              <Text size="xs" c="dimmed">CLIENT</Text>
              <IconUser size={16} color="var(--mantine-color-gray-6)" />
            </Group>
            <Text ff="var(--font-display)" size="xl" c="#E1E1E1">{project.client}</Text>
          </Paper>
          <Paper withBorder p="xl" radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
            <Group justify="space-between" mb="xs">
              <Text size="xs" c="dimmed">ASSIGNED</Text>
              <IconUsers size={16} color="var(--mantine-color-gray-6)" />
            </Group>
            <Text ff="var(--font-display)" size="xl" c="#E1E1E1">{project.researcher}</Text>
          </Paper>
          <Paper withBorder p="xl" radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
            <Group justify="space-between" mb="xs">
              <Text size="xs" c="dimmed">STATUS</Text>
              <IconClock size={16} color="var(--mantine-color-gray-6)" />
            </Group>
            <Badge variant="filled" color="burnished-gold" size="lg" radius={0} c="dark-forest">
              {project.status.toUpperCase()}
            </Badge>
          </Paper>
          <Paper withBorder p={40} radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
            <Stack align="center" gap="md">
              <RingProgress
                size={120}
                thickness={8}
                roundCaps
                label={<Text size="xl" fw={700} ta="center" ff="var(--font-display)" c="#E1E1E1">{project.readiness}%</Text>}
                sections={[{ value: project.readiness, color: 'sage' }]}
              />
              <Text ff="var(--font-display)" size="sm" c="sage" style={{ textTransform: 'uppercase' }}>Submission Readiness</Text>
            </Stack>
          </Paper>
        </SimpleGrid>

        <Stack gap="xl">
          {/* 3. The Institutional Project Record (Tabbed Ledger) */}
          <Paper withBorder radius={0} p={0} bg="transparent" style={{ borderColor: '#2A2D31' }}>
            <Box p="xl" bg="#0A0B0C" style={{ borderBottom: '1px solid #2A2D31' }}>
              <Group justify="space-between">
                <Title order={4} ff="var(--font-display)" c="burnished-gold" style={{ letterSpacing: '1px' }}>
                  Institutional Project Record
                </Title>
                <Badge variant="outline" color="sage" radius={0} size="xs">SECURE_LEDGER_v4</Badge>
              </Group>
            </Box>

            <Tabs defaultValue="milestones" variant="default" radius={0} styles={{ 
              root: { background: 'transparent' },
              tab: { 
                fontSize: '11px', 
                fontFamily: 'var(--font-body)', 
                textTransform: 'uppercase', 
                letterSpacing: '1.5px', 
                fontWeight: 600,
                padding: '16px 32px',
                color: 'var(--mantine-color-gray-6)',
                borderBottom: '2px solid transparent',
                backgroundColor: 'transparent',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: '#2A2D31' },
                '&[data-active]': { color: 'var(--mantine-color-burnished-gold-7)', borderColor: 'var(--mantine-color-burnished-gold-7)' }
              },
              tabsList: { borderBottom: '1px solid #2A2D31' },
              panel: { padding: '48px' }
            }}>
              <Tabs.List>
                <Tabs.Tab value="milestones" leftSection={<IconHistory size={14} />}>Success Trail</Tabs.Tab>
                <Tabs.Tab value="comms" leftSection={<IconMessageCircle size={14} />}>Liaison Record</Tabs.Tab>
                <Tabs.Tab value="technical" leftSection={<IconTerminal2 size={14} />}>Technical Log</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="milestones">
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing={100}>
                  <Box>
                    <Text ff="var(--font-body)" size="9px" fw={600} c="dimmed" mb="xl" style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>CLIENT_VISIBLE_MILESTONES</Text>
                    <Timeline active={3} bulletSize={32} lineWidth={1} color="sage" styles={{ itemBullet: { backgroundColor: '#0A0B0C', border: '1px solid #2A2D31' }, item: { paddingBottom: '48px' } }}>
                      <Timeline.Item bullet={<IconFileCheck size={18} stroke={1.5} color="#40C057" />} title={<Text size="sm" c="#E1E1E1" fw={700}>Project Inception</Text>}>
                        <Text size="xs" c="dimmed">Diagnostic Audit Passed // 01 Feb 2026</Text>
                      </Timeline.Item>
                      <Timeline.Item bullet={<IconVersions size={18} stroke={1.5} color="#40C057" />} title={<Text size="sm" c="#E1E1E1" fw={700}>Technical Setup</Text>}>
                        <Text size="xs" c="dimmed">WASM Environment Initialized // 02 Feb 2026</Text>
                      </Timeline.Item>
                      <Timeline.Item bullet={<IconCircleCheck size={18} stroke={1.5} color="#40C057" />} title={<Text size="sm" c="#E1E1E1" fw={700}>Methodology Audit</Text>}>
                        <Text size="xs" c="dimmed">BibTeX & Figure Integrity Verified // 05 Feb 2026</Text>
                      </Timeline.Item>
                      <Timeline.Item bullet={<IconClock size={18} stroke={1.5} color="#FAB005" />} title={<Text size="sm" c="sage" fw={700}>Executive Clearance</Text>}>
                        <Text size="sm" fw={700} c="sage">Principal Review in Progress</Text>
                      </Timeline.Item>
                    </Timeline>
                  </Box>
                  <Box>
                    <Paper p="xl" bg="#0A0B0C" style={{ border: '1px dashed #2A2D31' }}>
                      <Text size="9px" fw={600} c="burnished-gold" mb="md" style={{ letterSpacing: '1px', textTransform: 'uppercase' }}>NEXT_ACTION_DIRECTIVE</Text>
                      <Text size="xs" c="#E1E1E1" style={{ lineHeight: 1.8 }}>
                        Awaiting final authorization from Principal Micah S. before journal hand-off. Internal technical QC has reached 100% compliance.
                      </Text>
                    </Paper>
                  </Box>
                </SimpleGrid>
              </Tabs.Panel>

              <Tabs.Panel value="comms">
                <Stack gap="xl">
                  <Group justify="space-between" align="flex-end">
                    <Box>
                      <Text ff="var(--font-body)" size="9px" fw={600} c="dimmed" mb={4} style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>FORMAL_CORRESPONDENCE_HISTORY</Text>
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

                  <Stack gap="md">
                    {[
                      { date: '10 Feb 2026', type: 'PUBLISHER_LIAISON', target: 'Routledge Editorial', subject: 'Technical Query: Equation Alignment', status: 'Delivered', sender: 'dr.chen.office@vance.lab' },
                      { date: '05 Feb 2026', type: 'EXECUTIVE_MEMO', target: 'Dr. Emily Chen', subject: 'Methodology Discrepancy Found', status: 'Sent', sender: 'micah@vance.lab' },
                      { date: '01 Feb 2026', type: 'AUTOMATED_PULSE', target: 'Dr. Emily Chen', subject: 'Project Initialized', status: 'Delivered', sender: 'system@vance.lab' }
                    ].map((memo, i) => (
                      <Box 
                        key={i} 
                        p="md"
                        onClick={() => handleMemoClick(memo)}
                        style={{ 
                          borderLeft: '1px solid #2A2D31', 
                          paddingLeft: '24px',
                          cursor: 'pointer',
                          transition: 'background 0.2s ease'
                        }}
                        className="hover:bg-white/5 group"
                      >
                        <Group justify="space-between" mb={4}>
                          <Group gap="xs">
                            <Text size="9px" fw={600} c="burnished-gold" style={{ letterSpacing: '1px' }}>{memo.type}</Text>
                            <Divider orientation="vertical" h={8} color="#2A2D31" />
                            <Text size="9px" fw={600} c="dimmed">{memo.target.toUpperCase()}</Text>
                          </Group>
                          <Group gap="md">
                            <Text size="9px" fw={600} c="dimmed">{memo.date}</Text>
                            <IconFileSearch size={14} color="var(--mantine-color-gray-7)" className="group-hover:color-white" />
                          </Group>
                        </Group>
                        <Text size="sm" fw={700} c="#E1E1E1">{memo.subject}</Text>
                        <Text size="xs" c="dimmed">Dispatch Alias: {memo.sender} // Status: {memo.status}</Text>
                      </Box>
                    ))}
                  </Stack>
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="technical">
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing={60}>
                  <ScrollArea h={350} offsetScrollbars>
                    <Stack gap="xl" pr="md">
                      <Text ff="var(--font-body)" size="9px" fw={600} c="dimmed" mb="xs" style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>INTERNAL_TECHNICAL_LOG</Text>
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
            {/* 4. Publisher Liaison (The "Ghost Phase") */}
            <Paper withBorder p="xl" radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
              <Title order={5} ff="var(--font-display)" c="burnished-gold" mb="xl" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                Publisher Liaison
              </Title>
              <Stack gap="md">
                <Box p="md" style={{ border: '1px solid #2A2D31' }}>
                  <Group justify="space-between" mb="xs">
                    <Text size="xs" fw={700} c="#E1E1E1">CRC Press Editorial</Text>
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
                    <Text size="xs" c="dimmed">Gross Fee</Text>
                    <Text size="lg" ff="var(--font-display)" c="#E1E1E1">${project.financials.gross}</Text>
                  </Box>
                  <Badge color="sage" variant="filled" radius={0} c="dark-forest">PAID_IN_FULL</Badge>
                </Group>
                <Divider color="#2A2D31" />
                <Group justify="space-between">
                  <Text size="xs" c="dimmed">Researcher Payout (75%)</Text>
                  <Text size="md" ff="var(--font-display)" c="sage">${project.financials.researcher}</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="xs" c="dimmed">Agency Margin (25%)</Text>
                  <Text size="md" ff="var(--font-display)" c="burnished-gold">${project.financials.agency}</Text>
                </Group>
              </Stack>
            </Paper>
          </SimpleGrid>
        </Stack>
      </Stack>
    </Container>
  );
}
