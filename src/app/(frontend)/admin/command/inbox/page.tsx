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
  UnstyledButton
} from '@mantine/core';
import { 
  IconSearch, 
  IconArrowRight, 
  IconArchive, 
  IconTrash, 
  IconUserPlus,
  IconBriefcase
} from '@tabler/icons-react';

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

  return (
    <Container size="xl" fluid>
      <Stack gap="xl">
        {/* 1. Page Header */}
        <Box>
          <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
            Global <Text component="span" inherit c="burnished-gold.7">Inbox</Text>
          </Title>
          <Text c="deep-green.3" size="sm" ff="var(--font-body)" mt={4}>
            Central Triage // Institutional Correspondence // Alias Monitoring
          </Text>
        </Box>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" h={800}>
          {/* 2. Mail List Sidebar */}
          <Paper withBorder radius={0} bg="rgba(14, 29, 22, 0.2)" style={{ display: 'flex', flexDirection: 'column' }}>
            <Box p="md" style={{ borderBottom: '1px solid var(--mantine-color-deep-green-7)' }}>
              <TextInput 
                placeholder="Filter triage..." 
                leftSection={<IconSearch size={14} />} 
                variant="unstyled"
                size="xs"
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
                    borderBottom: '1px solid var(--mantine-color-deep-green-8)',
                    background: selectedMail.id === mail.id ? 'rgba(176, 141, 87, 0.05)' : 'transparent',
                    borderLeft: selectedMail.id === mail.id ? '2px solid var(--mantine-color-burnished-gold-7)' : 'none'
                  }}
                >
                  <Group justify="space-between" mb={4}>
                    <Text size="7px" ff="var(--font-body)" c="burnished-gold">{mail.alias.toUpperCase()}</Text>
                    <Text size="7px" ff="var(--font-body)" c="dimmed">{mail.time}</Text>
                  </Group>
                  <Text size="sm" fw={700} c="parchment" truncate>{mail.sender}</Text>
                  <Text size="xs" c="parchment" truncate mb={4}>{mail.subject}</Text>
                  <Text size="xs" c="dimmed" lineClamp={2}>{mail.preview}</Text>
                </UnstyledButton>
              ))}
            </ScrollArea>
          </Paper>

          {/* 3. Mail Content & Triage Actions */}
          <Box style={{ gridColumn: 'span 2' }}>
            <Paper withBorder radius={0} bg="rgba(14, 29, 22, 0.4)" h="100%" style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Message Header */}
              <Box p="xl" style={{ borderBottom: '1px solid var(--mantine-color-deep-green-7)' }}>
                <Group justify="space-between" align="flex-start">
                  <Stack gap={4}>
                    <Title order={3} ff="var(--font-display)" c="parchment" size="1.5rem">{selectedMail.subject}</Title>
                    <Group gap="xs">
                      <Avatar size="xs" radius={0} color="deep-green">{selectedMail.sender[0]}</Avatar>
                      <Text size="xs" fw={700} c="parchment">{selectedMail.sender}</Text>
                      <Text size="xs" c="dimmed" ff="var(--font-body)">&lt;{selectedMail.email}&gt;</Text>
                    </Group>
                  </Stack>
                  <Badge color="burnished-gold" variant="outline" radius={0}>{selectedMail.type.toUpperCase()}</Badge>
                </Group>
              </Box>

              {/* Triage Action Bar */}
              <Box p="md" bg="black" style={{ borderBottom: '1px solid var(--mantine-color-deep-green-7)' }}>
                <Group gap="md">
                  <Button 
                    size="xs" 
                    variant="filled" 
                    color="sage" 
                    radius={0}
                    leftSection={<IconBriefcase size={14} />}
                    c="dark-forest"
                  >
                    Promote to Project
                  </Button>
                  <Button 
                    size="xs" 
                    variant="outline" 
                    color="burnished-gold" 
                    radius={0}
                    leftSection={<IconUserPlus size={14} />}
                  >
                    Promote to Lead
                  </Button>
                  <Divider orientation="vertical" h={20} color="deep-green.7" />
                  <ActionIcon variant="subtle" color="deep-green.3"><IconArchive size={18} /></ActionIcon>
                  <ActionIcon variant="subtle" color="deep-green.3"><IconTrash size={18} /></ActionIcon>
                </Group>
              </Box>

              {/* Message Body */}
              <ScrollArea flex={1} p="xl">
                <Text size="sm" c="parchment" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                  {`Dear Micah,

${selectedMail.preview}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sincerely,
${selectedMail.sender}`}
                </Text>
              </ScrollArea>

              {/* Quick Response Buffer */}
              <Box p="xl" style={{ borderTop: '1px solid var(--mantine-color-deep-green-7)' }}>
                <Group gap="md">
                  <Button 
                    fullWidth 
                    variant="outline" 
                    color="deep-green.3" 
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
