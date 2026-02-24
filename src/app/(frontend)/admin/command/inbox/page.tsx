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
  Box, 
  Button, 
  Avatar, 
  SimpleGrid, 
  Divider,
  ScrollArea,
  TextInput,
  UnstyledButton,
  Modal,
  Select,
  ThemeIcon,
  Textarea
} from '@mantine/core';
import { 
  IconSearch, 
  IconArrowRight, 
  IconArchive, 
  IconTrash, 
  IconUserPlus,
  IconBriefcase,
  IconX,
  IconRocket,
  IconUserCheck,
  IconHistory,
  IconShieldCheck
} from '@tabler/icons-react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';

const incomingMail = [
  { 
    id: 'MSG-001', 
    sender: 'Dr. Emily Chen', 
    email: 'e.chen@university.edu',
    alias: 'micah@vance.lab',
    subject: 'Revision: Social Dynamics Manuscript',
    preview: 'I have attached the updated methodology section as requested...',
    time: '10:45 AM',
    type: 'Project Comms'
  },
  { 
    id: 'MSG-002', 
    sender: 'Prof. Arthur Dent', 
    email: 'adent@oxford.ac.uk',
    alias: 'office@vance.lab',
    subject: 'Inquiry: Legacy Book Archive',
    preview: 'I am interested in your bespoke institutional archive services for my lab...',
    time: '09:30 AM',
    type: 'Lead Inquiry'
  },
];

export default function GlobalInboxPage() {
  const [selectedMail, setSelectedMail] = React.useState(incomingMail[0]);
  const [projectOpened, { open: openProject, close: closeProject }] = useDisclosure(false);
  const [leadOpened, { open: openLead, close: closeLead }] = useDisclosure(false);
  const [originalOpened, { open: openOriginal, close: closeOriginal }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Container size="xl" fluid>
      {/* UNIFIED ARCHIVE MESSAGE MODAL (Matches Project View) */}
      <Modal 
        opened={originalOpened} 
        onClose={closeOriginal} 
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
                EXECUTIVE MEMO
              </Title>
            </Box>
            <ActionIcon variant="subtle" color="gray" onClick={closeOriginal}><IconX size={20} /></ActionIcon>
          </Group>
        </Box>
        <Box p={40} bg="black" style={{ position: 'relative', overflow: 'hidden' }}>
          <Text pos="absolute" top="20%" left="10%" size="5rem" fw={900} c="white" opacity={0.02} style={{ transform: 'rotate(-20deg)', pointerEvents: 'none' }}>VANCE_LAB_ARCHIVE</Text>
          <Paper p="xl" radius={0} bg="white" style={{ position: 'relative', zIndex: 2 }}>
            <Stack gap="lg">
              <Box style={{ borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                <Group justify="space-between" mb="xs">
                  <Text size="xs" fw={700} c="dark">FROM: Micah S.</Text>
                  <Text size="xs" c="dimmed">05 Feb 2026</Text>
                </Group>
                <Text size="xs" fw={700} c="dark">TO: {selectedMail.sender}</Text>
                <Text size="sm" fw={800} mt="md" c="black">SUBJECT: Technical Audit Results</Text>
              </Box>
              <Text size="xs" c="dark" style={{ lineHeight: 1.8, whiteSpace: 'pre-wrap', fontFamily: 'serif' }}>
                {`Dear Colleague,\n\nI have completed the second pass of your manuscript. Our WASM-rendering engine has confirmed that all methodological parameters meet the target house's high-fidelity requirements.\n\nPlease review the figures and confirm alignment.\n\nSincerely,\nMicah S.\nPrincipal Investigator`}
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

      {/* 1. Allocate to Project Modal */}
      <Modal 
        opened={projectOpened} 
        onClose={closeProject} 
        size="md" 
        padding={0} 
        radius={0} 
        withCloseButton={false}
        styles={{ 
          content: { background: '#0A0B0C', border: '1px solid #2A2D31' },
          overlay: { backdropFilter: 'blur(4px)' }
        }}
      >
        <Box p="xl" bg="#0A0B0C" style={{ borderBottom: '1px solid #2A2D31' }}>
          <Group justify="space-between">
            <Group gap="md">
              <ThemeIcon color="sage" variant="light" radius={0} size="xl">
                <IconBriefcase size={24} />
              </ThemeIcon>
              <Box>
                <Title order={3} ff="var(--font-display)" c="parchment" style={{ textTransform: 'uppercase' }}>
                  Allocate to Project
                </Title>
                <Text size="xs" c="dimmed">Attach this correspondence to an active ledger.</Text>
              </Box>
            </Group>
            <ActionIcon variant="subtle" color="gray" onClick={closeProject}><IconX size={20} /></ActionIcon>
          </Group>
        </Box>
        <Stack p="xl" gap="md" bg="#0A0B0C">
          <Select 
            label="Select Project Registry" 
            placeholder="Search active projects..."
            data={['PRJ-7792: Digital Spaces', 'PRJ-8104: Urban Sustain', 'PRJ-9021: NSF Keynote']}
            variant="filled"
            styles={{ 
              input: { background: '#121416', border: '1px solid #2A2D31', color: 'white' }, 
              label: { color: 'var(--mantine-color-dimmed)', fontSize: '10px', marginBottom: '4px' } 
            }}
          />
          <Text size="xs" c="dimmed" italic>This will move all attachments to the Project Vault and notify the lead researcher.</Text>
          <Button 
            fullWidth 
            color="sage" 
            c="dark-forest" 
            radius={0} 
            size="md"
            onClick={() => { alert('COMMUNICATION ALLOCATED // PROJECT LEDGER UPDATED'); closeProject(); }}
          >
            SYNC WITH PROJECT VAULT
          </Button>
        </Stack>
      </Modal>

      {/* 2. Promote to Lead Modal */}
      <Modal 
        opened={leadOpened} 
        onClose={closeLead} 
        size="md" 
        padding={0} 
        radius={0} 
        withCloseButton={false}
        styles={{ content: { background: '#121416', border: '1px solid #2A2D31' } }}
      >
        <Box p="xl" bg="#0A0B0C" style={{ borderBottom: '1px solid #2A2D31' }}>
          <Group justify="space-between">
            <Group gap="md">
              <ThemeIcon color="burnished-gold" variant="light" radius={0} size="xl">
                <IconUserPlus size={24} />
              </ThemeIcon>
              <Box>
                <Title order={3} ff="var(--font-display)" c="parchment" style={{ textTransform: 'uppercase' }}>
                  Promote to Lead
                </Title>
                <Text size="xs" c="dimmed">Initialize Discovery Sequence for this scholar.</Text>
              </Box>
            </Group>
            <ActionIcon variant="subtle" color="gray" onClick={closeLead}><IconX size={20} /></ActionIcon>
          </Group>
        </Box>
        <Stack p="xl" gap="md">
          <TextInput label="Scholar Name" value={selectedMail.sender} variant="filled" styles={{ input: { background: '#0A0B0C', border: '1px solid #2A2D31', color: 'white' }, label: { color: 'dimmed', fontSize: '10px' } }} />
          <TextInput label="Email Address" value={selectedMail.email} variant="filled" styles={{ input: { background: '#0A0B0C', border: '1px solid #2A2D31', color: 'white' }, label: { color: 'dimmed', fontSize: '10px' } }} />
          <Button fullWidth color="burnished-gold" c="dark-forest" radius={0} onClick={() => { alert('PROMOTED TO PIPELINE // LEAD RECORD CREATED'); closeLead(); }}>
            INITIALIZE LEAD TRIAGE
          </Button>
        </Stack>
      </Modal>

      <Stack gap="xl">
        {/* 3. Page Header */}
        <Box>
          <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
            Global <Text component="span" inherit c="burnished-gold.7">Inbox</Text>
          </Title>
          <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
            Central Triage // Institutional Correspondence // Alias Monitoring
          </Text>
        </Box>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
          {/* 4. Mail List Sidebar */}
          <Paper withBorder radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '400px' }}>
            <Box p="md" style={{ borderBottom: '1px solid #2A2D31' }}>
              <TextInput 
                placeholder="Filter triage..." 
                leftSection={<IconSearch size={14} />} 
                variant="unstyled"
                size="xs"
                styles={{ input: { color: 'white' } }}
              />
            </Box>
            <ScrollArea h={{ base: 300, md: 700 }}>
              {incomingMail.map((mail) => (
                <UnstyledButton 
                  key={mail.id} 
                  p="md" 
                  onClick={() => setSelectedMail(mail)}
                  style={{ 
                    width: '100%',
                    borderBottom: '1px solid #2A2D31',
                    background: selectedMail.id === mail.id ? '#121416' : 'transparent',
                    borderLeft: selectedMail.id === mail.id ? '2px solid var(--mantine-color-burnished-gold-7)' : 'none'
                  }}
                >
                  <Group justify="space-between" mb={4}>
                    <Text size="7px" ff="var(--font-body)" c="burnished-gold">{mail.alias.toUpperCase()}</Text>
                    <Text size="7px" ff="var(--font-body)" c="dimmed">{mail.time}</Text>
                  </Group>
                  <Text size="sm" fw={700} c="#E1E1E1" truncate>{mail.sender}</Text>
                  <Text size="xs" c="#E1E1E1" truncate mb={4}>{mail.subject}</Text>
                  <Text size="xs" c="dimmed" lineClamp={2}>{mail.preview}</Text>
                </UnstyledButton>
              ))}
            </ScrollArea>
          </Paper>

          {/* 5. Mail Content & Triage Actions */}
          <Box style={{ gridColumn: isMobile ? 'span 1' : 'span 2' }}>
            <Paper withBorder radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31', display: 'flex', flexDirection: 'column', height: '100%' }}>
                            {/* Message Header */}
                            <Box p={{ base: 'md', sm: 'xl' }} style={{ borderBottom: '1px solid #2A2D31' }}>
                              <Group justify="space-between" align="flex-start" wrap="nowrap">
                                <Stack gap={4}>
                                  <Title order={3} ff="var(--font-display)" c="parchment" size={isMobile ? "1.2rem" : "1.5rem"}>{selectedMail.subject}</Title>
                                  <Group gap="xs">
                                    <Avatar size="xs" radius={0} color="dark" bg="#2A2D31">{selectedMail.sender[0]}</Avatar>
                                    <Text size="xs" fw={700} c="#E1E1E1">{selectedMail.sender}</Text>
                                    <Text size="xs" c="dimmed" ff="var(--font-body)" visibleFrom="sm">&lt;{selectedMail.email}&gt;</Text>
                                  </Group>
                                </Stack>
                                <Badge color="burnished-gold" visibleFrom="xs">{selectedMail.type.toUpperCase()}</Badge>
                              </Group>
                            </Box>
              
                            {/* Conversation Context Thread */}
                            <Box bg="#050A08" py="xs" style={{ borderBottom: '1px solid #2A2D31' }}>
                              <Group gap="sm" px="md" wrap="nowrap" style={{ overflowX: 'auto' }}>
                                <Group gap={6} style={{ flexShrink: 0 }}>
                                  <IconHistory size={14} color="var(--mantine-color-gray-6)" />
                                  <Text size="9px" fw={700} c="dimmed" style={{ letterSpacing: '1px' }} visibleFrom="xs">THREAD_CONTEXT:</Text>
                                </Group>
                                <Group gap={8} wrap="nowrap">
                                  <UnstyledButton onClick={openOriginal} style={{ flexShrink: 0 }}>
                                    <Badge 
                                      variant="dot" 
                                      color="burnished-gold" 
                                      styles={{ 
                                        root: { cursor: 'pointer', '&:hover': { background: 'rgba(255,255,255,0.05)' } }
                                      }}
                                    >
                                      05 FEB: EXECUTIVE_MEMO_SENT
                                    </Badge>
                                  </UnstyledButton>
                                  <IconArrowRight size={12} color="gray" style={{ flexShrink: 0 }} />
                                  <Badge variant="dot" color="sage" style={{ flexShrink: 0 }}>TODAY: CLIENT_REPLY_RCVD</Badge>
                                </Group>
                              </Group>
                            </Box>

              {/* Triage Action Bar */}
              <Box p="md" bg="black" style={{ borderBottom: '1px solid #2A2D31' }}>
                <Group gap="md">
                  <Button 
                    size="xs" 
                    variant="filled" 
                    color="burnished-gold" 
                    radius={0}
                    leftSection={<IconBriefcase size={14} />}
                    c="dark-forest"
                    onClick={openProject}
                  >
                    {isMobile ? 'Project' : 'Promote to Project'}
                  </Button>
                  <Button 
                    size="xs" 
                    variant="outline" 
                    color="gray.6" 
                    radius={0}
                    leftSection={<IconUserPlus size={14} />}
                    onClick={openLead}
                  >
                    {isMobile ? 'Lead' : 'Promote to Lead'}
                  </Button>
                  <Divider orientation="vertical" h={20} color="#2A2D31" visibleFrom="sm" />
                  <ActionIcon variant="subtle" color="gray.6"><IconArchive size={18} /></ActionIcon>
                  <ActionIcon variant="subtle" color="gray.6"><IconTrash size={18} /></ActionIcon>
                </Group>
              </Box>

              {/* Message Body */}
              <ScrollArea h={{ base: 400, md: 500 }} p={{ base: 'md', sm: 'xl' }}>
                <Text size="sm" c="#E1E1E1" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                  {`Dear Micah,

${selectedMail.preview}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sincerely,
${selectedMail.sender}`}
                </Text>
              </ScrollArea>

              {/* Quick Response Buffer */}
              <Box p={{ base: 'md', sm: 'xl' }} style={{ borderTop: '1px solid #2A2D31' }}>
                <Group gap="md">
                  <Button 
                    fullWidth 
                    variant="outline" 
                    color="gray.6" 
                    radius={0}
                    rightSection={<IconArrowRight size={16} />}
                    component={Link}
                    href="/admin/command/liaison"
                  >
                    {isMobile ? 'Open Buffer' : 'Open Correspondence Buffer'}
                  </Button>
                </Group>
              </Box>
            </Paper>
          </Box>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
