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
  IconUserCheck
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

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
  { 
    id: 'MSG-003', 
    sender: 'Nature Editorial', 
    email: 'editors@nature.com',
    alias: 'office@vance.lab',
    subject: 'Decision: MS-7792-ALPHA',
    preview: 'We are pleased to inform you that your manuscript has been accepted...',
    time: 'Yesterday',
    type: 'Publisher'
  },
  { 
    id: 'MSG-004', 
    sender: 'Dr. Linda Vo', 
    email: 'vo.l@mit.edu',
    alias: 'insights@vance.lab',
    subject: 'Re: Q1 Research Opportunities',
    preview: 'Thank you for the newsletter. I would like to discuss the grant scanning...',
    time: 'Yesterday',
    type: 'Nurture Response'
  },
];

export default function GlobalInboxPage() {
  const [selectedMail, setSelectedMail] = React.useState(incomingMail[0]);
  const [projectOpened, { open: openProject, close: closeProject }] = useDisclosure(false);
  const [leadOpened, { open: openLead, close: closeLead }] = useDisclosure(false);

  return (
    <Container size="xl" fluid>
      {/* 1. Allocate to Project Modal */}
      <Modal 
        opened={projectOpened} 
        onClose={closeProject} 
        size="md" 
        padding={0} 
        radius={0} 
        withCloseButton={false}
        styles={{ content: { background: '#121416', border: '1px solid #2A2D31' } }}
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
        <Stack p="xl" gap="md">
          <Select 
            label="Select Project Registry" 
            placeholder="Search active projects..."
            data={['PRJ-7792: Digital Spaces', 'PRJ-8104: Urban Sustain', 'PRJ-9021: NSF Keynote']}
            variant="filled"
            styles={{ input: { background: '#0A0B0C', border: '1px solid #2A2D31', color: 'white' }, label: { color: 'var(--mantine-color-dimmed)', fontSize: '10px' } }}
          />
          <Text size="xs" c="dimmed" italic>This will move all attachments to the Project Vault and notify the lead researcher.</Text>
          <Button fullWidth color="sage" c="dark-forest" radius={0} onClick={() => { alert('COMMUNICATION ALLOCATED // PROJECT LEDGER UPDATED'); closeProject(); }}>
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
          <TextInput label="Scholar Name" value={selectedMail.sender} variant="filled" styles={{ input: { background: '#0A0B0C', border: '1px solid #2A2D31', color: 'white' }, label: { color: 'var(--mantine-color-dimmed)', fontSize: '10px' } }} />
          <TextInput label="Email Address" value={selectedMail.email} variant="filled" styles={{ input: { background: '#0A0B0C', border: '1px solid #2A2D31', color: 'white' }, label: { color: 'var(--mantine-color-dimmed)', fontSize: '10px' } }} />
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

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" h={800}>
          {/* 4. Mail List Sidebar */}
          <Paper withBorder radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31', display: 'flex', flexDirection: 'column' }}>
            <Box p="md" style={{ borderBottom: '1px solid #2A2D31' }}>
              <TextInput 
                placeholder="Filter triage..." 
                leftSection={<IconSearch size={14} />} 
                variant="unstyled"
                size="xs"
                styles={{ input: { color: 'white' } }}
              />
            </Box>
            <ScrollArea flex={1}>
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
          <Box style={{ gridColumn: 'span 2' }}>
            <Paper withBorder radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }} h="100%" style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Message Header */}
              <Box p="xl" style={{ borderBottom: '1px solid #2A2D31' }}>
                <Group justify="space-between" align="flex-start">
                  <Stack gap={4}>
                    <Title order={3} ff="var(--font-display)" c="parchment" size="1.5rem">{selectedMail.subject}</Title>
                    <Group gap="xs">
                      <Avatar size="xs" radius={0} color="dark" bg="#2A2D31">{selectedMail.sender[0]}</Avatar>
                      <Text size="xs" fw={700} c="#E1E1E1">{selectedMail.sender}</Text>
                      <Text size="xs" c="dimmed" ff="var(--font-body)">&lt;{selectedMail.email}&gt;</Text>
                    </Group>
                  </Stack>
                  <Badge color="burnished-gold" variant="outline" radius={0} size="xs">{selectedMail.type.toUpperCase()}</Badge>
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
                    Promote to Project
                  </Button>
                  <Button 
                    size="xs" 
                    variant="outline" 
                    color="gray.6" 
                    radius={0}
                    leftSection={<IconUserPlus size={14} />}
                    onClick={openLead}
                  >
                    Promote to Lead
                  </Button>
                  <Divider orientation="vertical" h={20} color="#2A2D31" />
                  <ActionIcon variant="subtle" color="gray.6"><IconArchive size={18} /></ActionIcon>
                  <ActionIcon variant="subtle" color="gray.6"><IconTrash size={18} /></ActionIcon>
                </Group>
              </Box>

              {/* Message Body */}
              <ScrollArea flex={1} p="xl">
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
              <Box p="xl" style={{ borderTop: '1px solid #2A2D31' }}>
                <Group gap="md">
                  <Button 
                    fullWidth 
                    variant="outline" 
                    color="gray.6" 
                    radius={0}
                    rightSection={<IconArrowRight size={16} />}
                  >
                    Open Correspondence Buffer
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
