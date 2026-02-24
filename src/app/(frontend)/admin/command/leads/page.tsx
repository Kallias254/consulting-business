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
  ActionIcon, 
  Tooltip, 
  Box, 
  Button, 
  Avatar, 
  SimpleGrid, 
  Progress,
  TextInput,
  Modal,
  Select,
  Divider,
  ThemeIcon,
  Textarea
} from '@mantine/core';
import { 
  IconSearch, 
  IconUserPlus, 
  IconCalendarStats,
  IconCircleCheck,
  IconMailForward,
  IconSchool,
  IconRocket,
  IconLayout2,
  IconShieldCheck,
  IconX
} from '@tabler/icons-react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { ScrollArea } from '@mantine/core';

const leads = [
  { 
    id: 'L-1024', 
    name: 'Dr. Aris Noble', 
    institution: 'Yale University', 
    field: 'Behavioral Economics', 
    interest: 'Grant Rebuttal',
    source: 'Referral: Micah', 
    status: 'Discovery Sync', 
    value: 'Tier 3 ($12k)',
    priority: 'High'
  },
  { 
    id: 'L-1025', 
    name: 'Prof. Elena Sofia', 
    institution: 'Oxford', 
    field: 'Developmental Psych', 
    interest: 'Legacy Book Archive',
    source: 'Health Check Form', 
    status: 'Nurture (Insights)', 
    value: 'Tier 2 ($5k)',
    priority: 'Medium'
  },
  { 
    id: 'L-1026', 
    name: 'Dr. Kevin Zhang', 
    institution: 'MIT', 
    field: 'Human-AI Interaction', 
    interest: 'Manuscript Polish',
    source: 'Referral: Dr. Chen', 
    status: 'Awaiting Intake', 
    value: 'Tier 1 ($2k)',
    priority: 'Low'
  },
  { 
    id: 'L-1027', 
    name: 'Dr. Sarah Jenkins', 
    institution: 'Stanford', 
    field: 'Urban Planning', 
    interest: 'Simultaneous Submission',
    source: 'Outreach', 
    status: 'Proposal Sent', 
    value: 'Tier 3 ($15k)',
    priority: 'High'
  },
];

const publisherTemplates = [
  { value: 'crc-press-book', label: 'CRC Press (Standard Book)', type: 'Book' },
  { value: 'nature-journal', label: 'Nature (Journal Article)', type: 'Journal' },
  { value: 'taylor-francis', label: 'Taylor & Francis (Social Sci)', type: 'Journal' },
  { value: 'nsf-grant', label: 'NSF Proposal (Standard)', type: 'Grant' },
  { value: 'bespoke-portfolio', label: 'Bespoke Scholar Portfolio', type: 'Portfolio' },
];

export default function LeadsPage() {
  const [promoteOpened, { open: openPromote, close: closePromote }] = useDisclosure(false);
  const [ingestOpened, { open: openIngest, close: closeIngest }] = useDisclosure(false);
  const [selectedLead, setSelectedLead] = React.useState<any>(null);
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handlePromoteClick = (lead: any) => {
    setSelectedLead(lead);
    openPromote();
  };

  return (
    <Container size="xl" fluid>
      {/* 1. Manual Ingestion Modal */}
      <Modal 
        opened={ingestOpened} 
        onClose={closeIngest} 
        title={<Text ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Manual Lead Ingestion</Text>}
        size={isMobile ? "100%" : "lg"} 
        radius={0}
        styles={{ 
          content: { background: '#121416', border: '1px solid #2A2D31' },
          header: { background: '#0A0B0C', borderBottom: '1px solid #2A2D31', color: '#E1E1E1' }
        }}
      >
        <Stack gap="md" p="md">
          <Group grow wrap={isMobile ? "wrap" : "nowrap"}>
            <TextInput label="Scholar Name" placeholder="Dr. First Last" variant="filled" styles={{ input: { background: '#0A0B0C', border: '1px solid #2A2D31', color: 'white' }, label: { color: 'var(--mantine-color-dimmed)', fontSize: '10px' } }} />
            <TextInput label="Institution" placeholder="University / Lab" variant="filled" styles={{ input: { background: '#0A0B0C', border: '1px solid #2A2D31', color: 'white' }, label: { color: 'var(--mantine-color-dimmed)', fontSize: '10px' } }} />
          </Group>
          <TextInput label="Email Address" placeholder="scholar@edu.com" variant="filled" styles={{ input: { background: '#0A0B0C', border: '1px solid #2A2D31', color: 'white' }, label: { color: 'var(--mantine-color-dimmed)', fontSize: '10px' } }} />
          <Select 
            label="Project Interest" 
            placeholder="Select service tier"
            data={['Grant Rebuttal', 'Manuscript Polish', 'Legacy Book Archive', 'Bespoke Visuals']}
            variant="filled"
            styles={{ input: { background: '#0A0B0C', border: '1px solid #2A2D31', color: 'white' }, label: { color: 'var(--mantine-color-dimmed)', fontSize: '10px' } }}
          />
          <Textarea 
            label="Context / Micah's Notes" 
            placeholder="Met at conference, needs fast-track for Nature submission..." 
            minRows={3}
            variant="filled"
            styles={{ input: { background: '#0A0B0C', border: '1px solid #2A2D31', color: 'white' }, label: { color: 'var(--mantine-color-dimmed)', fontSize: '10px' } }}
          />
          <Button 
            fullWidth 
            color="burnished-gold" 
            c="dark-forest" 
            radius={0} 
            mt="md"
            onClick={() => {
              alert('LEAD CAPTURED // TRIAGE SEQUENCE INITIALIZED');
              closeIngest();
            }}
          >
            CREATE LEAD RECORD
          </Button>
        </Stack>
      </Modal>

      {/* 2. Promotion Modal */}
      <Modal 
        opened={promoteOpened} 
        onClose={closePromote} 
        size={isMobile ? "100%" : "md"} 
        padding={0} 
        radius={0} 
        withCloseButton={false}
        styles={{ content: { background: '#121416', border: '1px solid #2A2D31' } }}
      >
        <Box p="xl" bg="#0A0B0C" style={{ borderBottom: '1px solid #2A2D31' }}>
          <Group justify="space-between" wrap="nowrap">
            <Group gap="md" wrap="nowrap">
              <ThemeIcon color="sage" variant="light" radius={0} size="xl">
                <IconRocket size={24} />
              </ThemeIcon>
              <Box>
                <Title order={3} ff="var(--font-display)" c="parchment" style={{ textTransform: 'uppercase' }} size={isMobile ? "1.2rem" : "1.5rem"}>
                  Promote to Project
                </Title>
                <Text size="xs" c="dimmed">Drafting Project Infrastructure for {selectedLead?.name}</Text>
              </Box>
            </Group>
            <ActionIcon variant="subtle" color="gray" onClick={closePromote}><IconX size={20} /></ActionIcon>
          </Group>
        </Box>

        <Stack p="xl" gap="xl">
          <Box>
            <Text ff="var(--font-body)" size="7px" c="burnished-gold" mb="xs" style={{ letterSpacing: '2px' }}>CORE_ASSIGNMENT</Text>
            <Stack gap="sm">
              <Select 
                label="Assign Lead Researcher" 
                placeholder="Select faculty or researcher"
                data={['Sarah Miller', 'Dr. James Wilson', 'Dr. Emily Chen', 'Micah S. (Principal)']}
                variant="unstyled"
                p="xs"
                bg="#0A0B0C"
                style={{ border: '1px solid #2A2D31' }}
                styles={{ label: { color: 'var(--mantine-color-dimmed)', fontSize: '10px', marginBottom: '4px' }, input: { color: 'white' } }}
              />
              <Select 
                label="Publisher Template (The 'Mold')" 
                placeholder="Select formatting & workflow engine"
                data={publisherTemplates}
                variant="unstyled"
                p="xs"
                bg="#0A0B0C"
                style={{ border: '1px solid #2A2D31' }}
                styles={{ label: { color: 'var(--mantine-color-dimmed)', fontSize: '10px', marginBottom: '4px' }, input: { color: 'white' } }}
              />
            </Stack>
          </Box>

          <Paper p="md" bg="#0A0B0C" style={{ border: '1px dashed #2A2D31' }}>
            <Text size="7px" c="dimmed" mb={8}>TEMPLATE_CAPABILITIES_LOADED:</Text>
            <Stack gap={4}>
              <Group gap="xs">
                <IconShieldCheck size={12} color="var(--mantine-color-sage-7)" />
                <Text size="xs" c="dimmed">Automated BibTeX Validation</Text>
              </Group>
              <Group gap="xs">
                <IconShieldCheck size={12} color="var(--mantine-color-sage-7)" />
                <Text size="xs" c="dimmed">WASM-Typst Environment Prep</Text>
              </Group>
              <Group gap="xs">
                <IconShieldCheck size={12} color="var(--mantine-color-sage-7)" />
                <Text size="xs" c="dimmed">Scientist Portal Activation</Text>
              </Group>
            </Stack>
          </Paper>

          <Button 
            fullWidth 
            color="burnished-gold" 
            c="dark-forest" 
            radius={0} 
            size="lg"
            h={50}
            leftSection={<IconRocket size={20} />}
            onClick={() => {
              alert('LEAD PROMOTED // INITIALIZING PROJECT ALPHA // REDIRECTING TO COMMAND LEDGER');
              router.push('/admin/command/projects/PRJ-7792');
              closePromote();
            }}
          >
            INITIALIZE PROJECT ENGINE
          </Button>
        </Stack>
      </Modal>

      <Stack gap={40}>
        {/* 1. Page Header */}
        <Box>
          <Group justify="space-between" align="flex-end" wrap="wrap">
            <Box>
              <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
                Opportunity <Text component="span" inherit c="burnished-gold.7">Pipeline</Text>
              </Title>
              <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
                Scholarly Triage // Discovery-to-Product Bridge // Global Intake HUD
              </Text>
            </Box>
            <Button 
              leftSection={<IconUserPlus size={16} />} 
              color="burnished-gold" 
              c="dark-forest" 
              radius={0}
              onClick={openIngest}
              fullWidth={isMobile}
            >
              Manual Ingestion
            </Button>
          </Group>
        </Box>

        {/* 2. Conversion HUD */}
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl">
          <Paper withBorder p="md" bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
            <Text ff="var(--font-body)" size="7px" c="dimmed" style={{ letterSpacing: '1px' }}>MONTHLY_INTAKE</Text>
            <Text ff="var(--font-display)" size="xl" c="#E1E1E1">14</Text>
            <Progress value={75} color="sage" size="xs" radius={0} mt="sm" />
          </Paper>
          <Paper withBorder p="md" bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
            <Text ff="var(--font-body)" size="7px" c="dimmed" style={{ letterSpacing: '1px' }}>DISCOVERY_SYNC_RATE</Text>
            <Text ff="var(--font-display)" size="xl" c="#E1E1E1">68%</Text>
            <Progress value={68} color="burnished-gold" size="xs" radius={0} mt="sm" />
          </Paper>
          <Paper withBorder p="md" bg="#0A0B0C" style={{ borderColor: 'var(--mantine-color-burnished-gold-7)' }}>
            <Text ff="var(--font-body)" size="7px" c="burnished-gold" style={{ letterSpacing: '1px' }}>PIPE_VALUATION</Text>
            <Text ff="var(--font-display)" size="xl" c="#E1E1E1">$42,500</Text>
            <Progress value={85} color="sage" size="xs" radius={0} mt="sm" />
          </Paper>
          <Paper withBorder p="md" bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
            <Text ff="var(--font-body)" size="7px" c="dimmed" style={{ letterSpacing: '1px' }}>NURTURE_POOL</Text>
            <Text ff="var(--font-display)" size="xl" c="#E1E1E1">32</Text>
            <Progress value={40} color="gray.6" size="xs" radius={0} mt="sm" />
          </Paper>
        </SimpleGrid>

        {/* 3. The Leads Ledger */}
        <Paper withBorder radius={0} p={0} bg="transparent" style={{ borderColor: '#2A2D31', overflow: 'hidden' }}>
          <Box p="xl" style={{ borderBottom: '1px solid #2A2D31' }}>
            <Group justify="space-between" wrap="wrap" gap="md">
              <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }} size={isMobile ? "1.1rem" : "1.25rem"}>
                Scientific Triage Ledger
              </Title>
              <Group grow={isMobile} style={{ width: isMobile ? '100%' : 'auto' }}>
                <TextInput 
                  placeholder="Search scholars..." 
                  size="xs" 
                  leftSection={<IconSearch size={14} />} 
                  variant="unstyled"
                  style={{ borderBottom: '1px solid #2A2D31' }}
                />
              </Group>
            </Group>
          </Box>
          <ScrollArea>
            <Table verticalSpacing="lg" horizontalSpacing="xl" highlightOnHover style={{ minWidth: 800 }}>
              <Table.Thead bg="#0A0B0C">
                <Table.Tr>
                  <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="dimmed">SCHOLAR</Table.Th>
                  <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="dimmed">INSTITUTION_FIELD</Table.Th>
                  <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="dimmed">PROJECT_INTEREST</Table.Th>
                  <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="dimmed">TRIAGE_STATUS</Table.Th>
                  <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="dimmed">EST_VALUE</Table.Th>
                  <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="dimmed"></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {leads.map((lead) => (
                  <Table.Tr key={lead.id} style={{ borderBottom: '1px solid #2A2D31' }}>
                    <Table.Td>
                      <Group gap="sm" wrap="nowrap">
                        <Avatar size="sm" radius={0} color="dark" bg="#2A2D31">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Box>
                          <Text size="sm" fw={700} c="#E1E1E1">{lead.name}</Text>
                          <Text size="7px" c="dimmed" ff="var(--font-body)">ID: {lead.id}</Text>
                        </Box>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Stack gap={0}>
                        <Group gap={4} wrap="nowrap">
                          <IconSchool size={12} color="var(--mantine-color-gray-6)" />
                          <Text size="xs" c="#E1E1E1">{lead.institution}</Text>
                        </Group>
                        <Text size="xs" c="dimmed">{lead.field}</Text>
                      </Stack>
                    </Table.Td>
                    <Table.Td>
                      <Badge variant="outline" color="burnished-gold">{lead.interest.toUpperCase()}</Badge>
                    </Table.Td>
                    <Table.Td>
                      <Group gap={6} wrap="nowrap">
                        <Box 
                          w={6} h={6} 
                          bg={lead.status === 'Discovery Sync' ? 'sage' : 'gray.6'} 
                          style={{ borderRadius: '50%' }} 
                        />
                        <Text ff="var(--font-body)" size="xs" c="#E1E1E1">{lead.status.toUpperCase()}</Text>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Text ff="var(--font-body)" size="xs" c="burnished-gold">{lead.value}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs" wrap="nowrap">
                        <Tooltip label="Initialize Discovery Sync">
                          <ActionIcon 
                            variant="subtle" 
                            color="gray.6" 
                            onClick={() => alert('DISCOVERY SYNC INVITE SENT // STATUS UPDATED')}
                          >
                            <IconCalendarStats size={16} />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Promote to Project">
                          <ActionIcon variant="subtle" color="sage" onClick={() => handlePromoteClick(lead)}><IconCircleCheck size={16} /></ActionIcon>
                        </Tooltip>
                        <Tooltip label="Start Nurture Sequence">
                          <ActionIcon 
                            variant="subtle" 
                            color="gray.6"
                            onClick={() => alert('INSIGHTS DRIP ACTIVATED // ADDED TO NURTURE POOL')}
                          >
                            <IconMailForward size={16} />
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </Paper>

        {/* 4. Strategic Ingestion Analytics */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          <Paper withBorder p="xl" radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
            <Title order={5} ff="var(--font-display)" c="burnished-gold" mb="xl" style={{ textTransform: 'uppercase' }}>
              Lead Sources
            </Title>
            <Stack gap="md">
              {[
                { name: 'Direct Referrals (Micah)', count: 18, value: 65 },
                { name: 'Scientific Health Check Form', count: 12, value: 40 },
                { name: 'Strategic Outreach', count: 5, value: 20 },
              ].map((source, i) => (
                <Box key={i}>
                  <Group justify="space-between" mb={4}>
                    <Text size="xs" fw={700} c="#E1E1E1">{source.name}</Text>
                    <Text ff="var(--font-body)" size="xs" c="dimmed">{source.count} LEADS</Text>
                  </Group>
                  <Progress value={source.value} color="gray.6" size="xs" radius={0} />
                </Box>
              ))}
            </Stack>
          </Paper>

          <Paper withBorder p="xl" radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
            <Title order={5} ff="var(--font-display)" c="burnished-gold" mb="xl" style={{ textTransform: 'uppercase' }}>
              Pipeline Distribution
            </Title>
            <Group grow align="flex-end">
              <Stack gap="xs" align="center">
                <Text ff="var(--font-display)" size="xl" c="#E1E1E1">45%</Text>
                <Box w="100%" h={100} bg="#121416" style={{ display: 'flex', alignItems: 'flex-end', border: '1px solid #2A2D31' }}>
                  <Box w="100%" h="45%" bg="sage" />
                </Box>
                <Text ff="var(--font-body)" size="7px" c="dimmed">GRANT_REBUTTALS</Text>
              </Stack>
              <Stack gap="xs" align="center">
                <Text ff="var(--font-display)" size="xl" c="#E1E1E1">25%</Text>
                <Box w="100%" h={100} bg="#121416" style={{ display: 'flex', alignItems: 'flex-end', border: '1px solid #2A2D31' }}>
                  <Box w="100%" h="25%" bg="sage" />
                </Box>
                <Text ff="var(--font-body)" size="7px" c="dimmed">MANUSCRIPT_POLISH</Text>
              </Stack>
              <Stack gap="xs" align="center">
                <Text ff="var(--font-display)" size="xl" c="#E1E1E1">20%</Text>
                <Box w="100%" h={100} bg="#121416" style={{ display: 'flex', alignItems: 'flex-end', border: '1px solid #2A2D31' }}>
                  <Box w="100%" h="20%" bg="burnished-gold" />
                </Box>
                <Text ff="var(--font-body)" size="7px" c="dimmed">BESPOKE_VISUALS</Text>
              </Stack>
              <Stack gap="xs" align="center">
                <Text ff="var(--font-display)" size="xl" c="#E1E1E1">10%</Text>
                <Box w="100%" h={100} bg="#121416" style={{ display: 'flex', alignItems: 'flex-end', border: '1px solid #2A2D31' }}>
                  <Box w="100%" h="10%" bg="burnished-gold" />
                </Box>
                <Text ff="var(--font-body)" size="7px" c="dimmed">ARCHIVE_MGMT</Text>
              </Stack>
            </Group>
          </Paper>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
