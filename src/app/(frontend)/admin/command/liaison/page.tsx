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
  Box, 
  Button, 
  SimpleGrid, 
  ScrollArea,
  Textarea,
  ThemeIcon,
  Divider,
  Modal,
  Select,
  TextInput,
  Avatar
} from '@mantine/core';
import { 
  IconShieldCheck, 
  IconSend, 
  IconEdit,
  IconX,
  IconUser
} from '@tabler/icons-react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

const draftMemos = [
  { 
    id: 'MEMO-772', 
    project: 'Digital Spaces Study', 
    target: 'Dr. Emily Chen (Client)',
    author: 'Sarah Miller',
    authorEmail: 's.miller@vance.lab',
    subject: 'Follow-up on Methodology Variance',
    preview: 'I have attached the updated variance plots for Figure 1.1...',
    time: '2h ago',
    status: 'Pending Authorization'
  },
  { 
    id: 'MEMO-814', 
    project: 'Urban Sustainability', 
    target: 'CRC Press Editorial (Publisher)',
    author: 'Dr. James Wilson',
    authorEmail: 'j.wilson@vance.lab',
    subject: 'Inquiry: Chapter 3 Typeset Status',
    preview: 'We are following up on the status of the typeset proofs sent on Jan 15...',
    time: '4h ago',
    status: 'Pending Authorization'
  },
];

export default function LiaisonBufferPage() {
  const [selectedMemo, setSelectedMemo] = React.useState(draftMemos[0]);
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Container size="xl" fluid>
      <Modal 
        opened={opened} 
        onClose={close} 
        title={<Text ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>New Executive Memo</Text>}
        size="lg" 
        radius={0}
        styles={{ 
          content: { background: '#121416', border: '1px solid #2A2D31' },
          header: { background: '#0A0B0C', borderBottom: '1px solid #2A2D31', color: '#E1E1E1' }
        }}
      >
        <Stack gap="md" p="md">
          <Select 
            label="Target Project / Client" 
            placeholder="Search active registries..."
            data={['Digital Spaces (Dr. Chen)', 'Urban Sustain (Prof. Ross)', 'General Outreach']}
            variant="filled"
            styles={{ input: { background: '#0A0B0C', border: '1px solid #2A2D31', color: 'white' }, label: { color: 'dimmed', fontSize: '10px' } }}
          />
          <TextInput 
            label="Subject Line" 
            placeholder="e.g. Strategic Update regarding your manuscript..." 
            variant="filled" 
            styles={{ input: { background: '#0A0B0C', border: '1px solid #2A2D31', color: 'white' }, label: { color: 'dimmed', fontSize: '10px' } }} 
          />
          <Textarea 
            label="Memo Content" 
            placeholder="Draft your executive directive here..." 
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
              alert('EXECUTIVE MEMO DISPATCHED // LOGGED TO PROJECT LEDGER');
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
          <Group justify="space-between" align="flex-end" wrap="wrap">
            <Box>
              <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
                Liaison <Text component="span" inherit c="burnished-gold.7">Buffer</Text>
              </Title>
              <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
                Executive Correspondence Clearance // Technical Draft Review // Principal Sign-Off Loop
              </Text>
            </Box>
            <Button 
              color="burnished-gold" 
              c="dark-forest" 
              radius={0} 
              leftSection={<IconEdit size={18} />}
              onClick={open}
              fullWidth={isMobile}
            >
              Initiate Executive Memo
            </Button>
          </Group>
        </Box>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
          {/* 2. Draft List (Synchronized with Global Inbox Style) */}
          <Paper withBorder radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31', display: 'flex', flexDirection: 'column', height: '100%', minHeight: isMobile ? '300px' : '600px' }}>
            <Box p="md" style={{ borderBottom: '1px solid #2A2D31' }}>
              <Text ff="var(--font-body)" size="9px" fw={600} c="burnished-gold" style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>PENDING_AUTHORIZATION</Text>
            </Box>
            <ScrollArea h={isMobile ? 300 : 600}>
              {draftMemos.map((memo) => (
                <Box 
                  key={memo.id} 
                  p="md" 
                  onClick={() => setSelectedMemo(memo)}
                  style={{ 
                    cursor: 'pointer',
                    borderBottom: '1px solid #2A2D31',
                    background: selectedMemo.id === memo.id ? '#121416' : 'transparent',
                    borderLeft: selectedMemo.id === memo.id ? '2px solid var(--mantine-color-burnished-gold-7)' : 'none'
                  }}
                >
                  <Group justify="space-between" mb={4}>
                    <Text size="7px" ff="var(--font-body)" c="dimmed">{memo.time}</Text>
                    <Badge variant="outline" color="burnished-gold">DRAFT</Badge>
                  </Group>
                  <Text size="sm" fw={700} c="#E1E1E1" truncate>{memo.author}</Text>
                  <Text size="xs" c="#E1E1E1" truncate mb={4}>{memo.subject}</Text>
                  <Text size="xs" c="dimmed" truncate>{memo.project}</Text>
                </Box>
              ))}
            </ScrollArea>
          </Paper>

          {/* 3. Review & Edit Console */}
          <Box style={{ gridColumn: isMobile ? 'span 1' : 'span 2' }}>
            <Paper withBorder radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Box p={{ base: 'md', sm: 'xl' }} style={{ borderBottom: '1px solid #2A2D31' }}>
                <Group justify="space-between" align="center" wrap="nowrap">
                  <Stack gap={4}>
                    <Group gap="xs">
                      <Avatar size="xs" radius={0} bg="#2A2D31" color="white">{selectedMemo.author[0]}</Avatar>
                      <Box>
                        <Text size="xs" ff="var(--font-body)" c="burnished-gold" fw={700}>DRAFTED_BY: {selectedMemo.author.toUpperCase()}</Text>
                        <Text size="xs" c="dimmed" ff="var(--font-body)" visibleFrom="xs">&lt;{selectedMemo.authorEmail}&gt;</Text>
                      </Box>
                    </Group>
                    <Title order={3} ff="var(--font-display)" c="#E1E1E1" size={isMobile ? "1.2rem" : "1.5rem"} mt="md">{selectedMemo.subject}</Title>
                    <Group gap="xs">
                      <Text size="xs" c="dimmed" fw={700} visibleFrom="xs">RECIPIENT:</Text>
                      <Badge variant="outline" color="gray.6">{selectedMemo.target.toUpperCase()}</Badge>
                    </Group>
                  </Stack>
                  <ThemeIcon color="sage" size="xl" radius={0} variant="light" visibleFrom="xs">
                    <IconShieldCheck size={24} />
                  </ThemeIcon>
                </Group>
              </Box>

              <Box p={{ base: 'md', sm: 'xl' }}>
                <Stack gap="md">
                  <Text size="xs" ff="var(--font-body)" c="dimmed">PRINCIPAL_PEER_REVIEW_MODE:</Text>
                  <Textarea 
                    variant="unstyled"
                    size="sm"
                    p={{ base: 'md', sm: 'xl' }}
                    bg="black"
                    styles={{
                      input: { 
                        color: '#E1E1E1', 
                        lineHeight: 1.8, 
                        fontFamily: 'var(--font-body)', 
                        fontSize: '13px',
                        minHeight: isMobile ? '250px' : '350px'
                      }
                    }}
                    defaultValue={`Dear Colleague,

I have completed the second pass of the "Millennial Handbook" manuscript. The technical sections regarding the Typst engine integration are now robust. 

I've noted a small discrepancy in the methodology section—please review the latest proof in the repository and confirm if the statistical weights align with your original hypothesis.

Once confirmed, we will move to the Final Executive Review.

Sincerely,
Micah S.
Principal Investigator`}
                    style={{ border: '1px solid #2A2D31' }}
                  />
                </Stack>
              </Box>

              <Box p={{ base: 'md', sm: 'xl' }} bg="black" style={{ borderTop: '1px solid #2A2D31' }}>
                <Group justify="space-between" py="xs" wrap="wrap" gap="md">
                  <Group gap="sm" grow={isMobile}>
                    <Button 
                      variant="outline" 
                      color="gray.6" 
                      radius={0} 
                      size="xs" 
                      leftSection={<IconEdit size={14} />}
                      styles={{ root: { border: '1px solid #2A2D31' } }}
                    >
                      Revision
                    </Button>
                    <Button 
                      variant="subtle" 
                      color="red.8" 
                      radius={0} 
                      size="xs" 
                      leftSection={<IconX size={14} />}
                    >
                      Reject
                    </Button>
                  </Group>
                  <Button 
                    color="burnished-gold" 
                    radius={0} 
                    c="dark-forest" 
                    size="sm" 
                    rightSection={<IconSend size={18} />}
                    fullWidth={isMobile}
                  >
                    Authorize & Dispatch
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
