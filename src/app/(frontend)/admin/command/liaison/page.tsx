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
  ThemeIcon
} from '@mantine/core';
import { 
  IconShieldCheck, 
  IconSend, 
  IconEdit
} from '@tabler/icons-react';

const draftMemos = [
  { 
    id: 'MEMO-772', 
    project: 'Digital Spaces Study', 
    target: 'Client (Dr. Chen)',
    author: 'Sarah Miller (Lead Researcher)',
    subject: 'Follow-up on Methodology Variance',
    preview: 'I have attached the updated variance plots for Figure 1.1...',
    time: '2h ago',
    status: 'Pending Approval'
  },
  { 
    id: 'MEMO-814', 
    project: 'Urban Sustainability', 
    target: 'Publisher (CRC Press)',
    author: 'Dr. James Wilson',
    subject: 'Inquiry: Chapter 3 Typeset Status',
    preview: 'We are following up on the status of the typeset proofs sent on Jan 15...',
    time: '4h ago',
    status: 'Pending Approval'
  },
];

export default function LiaisonBufferPage() {
  const [selectedMemo, setSelectedMemo] = React.useState(draftMemos[0]);

  return (
    <Container size="xl" fluid>
      <Stack gap={40}>
        {/* 1. Page Header */}
        <Box>
          <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
            Authorization <Text component="span" inherit c="burnished-gold.7">Buffer</Text>
          </Title>
          <Text c="deep-green.3" size="sm" ff="var(--font-body)" mt={4}>
            The Liaison Shield // Internal Draft Triage // Principal Approval Loop
          </Text>
        </Box>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" h={700}>
          {/* 2. Draft List */}
          <Paper withBorder radius={0} bg="rgba(14, 29, 22, 0.2)" style={{ display: 'flex', flexDirection: 'column' }}>
            <Box p="md" style={{ borderBottom: '1px solid var(--mantine-color-deep-green-7)' }}>
              <Text ff="var(--font-body)" size="7px" c="burnished-gold" style={{ letterSpacing: '1px' }}>PENDING_BLESSING</Text>
            </Box>
            <ScrollArea flex={1}>
              {draftMemos.map((memo) => (
                <Box 
                  key={memo.id} 
                  p="md" 
                  onClick={() => setSelectedMemo(memo)}
                  style={{ 
                    cursor: 'pointer',
                    borderBottom: '1px solid var(--mantine-color-deep-green-8)',
                    background: selectedMemo.id === memo.id ? 'rgba(176, 141, 87, 0.05)' : 'transparent',
                    borderLeft: selectedMemo.id === memo.id ? '2px solid var(--mantine-color-burnished-gold-7)' : 'none'
                  }}
                >
                  <Group justify="space-between" mb={4}>
                    <Text size="7px" ff="var(--font-body)" c="deep-green.3">{memo.time}</Text>
                    <Badge size="xs" color="burnished-gold" radius={0} variant="outline">DRAFT</Badge>
                  </Group>
                  <Text size="sm" fw={700} c="parchment" truncate>{memo.subject}</Text>
                  <Text size="xs" c="dimmed" truncate>{memo.project}</Text>
                </Box>
              ))}
            </ScrollArea>
          </Paper>

          {/* 3. Review & Edit Console */}
          <Box style={{ gridColumn: 'span 2' }}>
            <Paper withBorder radius={0} bg="rgba(14, 29, 22, 0.4)" h="100%" style={{ display: 'flex', flexDirection: 'column' }}>
              <Box p="xl" style={{ borderBottom: '1px solid var(--mantine-color-deep-green-7)' }}>
                <Group justify="space-between" align="center">
                  <Stack gap={4}>
                    <Text size="xs" ff="var(--font-body)" c="burnished-gold">DRAFTED_BY: {selectedMemo.author.toUpperCase()}</Text>
                    <Title order={3} ff="var(--font-display)" c="parchment" size="1.5rem">{selectedMemo.subject}</Title>
                    <Group gap="xs">
                      <Text size="xs" c="dimmed">TARGET:</Text>
                      <Badge size="xs" radius={0} color="deep-green">{selectedMemo.target}</Badge>
                    </Group>
                  </Stack>
                  <ThemeIcon color="deep-green" size="xl" radius={0} variant="light">
                    <IconShieldCheck size={24} />
                  </ThemeIcon>
                </Group>
              </Box>

              <ScrollArea flex={1} p="xl">
                <Stack gap="md">
                  <Text size="xs" ff="var(--font-body)" c="dimmed">PRINCIPAL_PEER_REVIEW_MODE:</Text>
                  <Textarea 
                    variant="unstyled"
                    size="sm"
                    p="xl"
                    bg="black"
                    minRows={12}
                    value={`Dear Colleague,

I have completed the second pass of the "Millennial Handbook" manuscript. The technical sections regarding the Typst engine integration are now robust. 

I've noted a small discrepancy in the methodology section—please review the latest proof in the repository and confirm if the statistical weights align with your original hypothesis.

Once confirmed, we will move to the Final Executive Review.

Sincerely,
Micah S.
Principal Investigator`}
                    styles={{
                      input: { color: 'var(--mantine-color-parchment-0)', lineHeight: 1.8, fontFamily: 'var(--font-body)' }
                    }}
                  />
                </Stack>
              </ScrollArea>

              <Box p="xl" bg="black" style={{ borderTop: '1px solid var(--mantine-color-deep-green-7)' }}>
                <Group justify="space-between">
                  <Group gap="md">
                    <Button variant="outline" color="deep-green.3" radius={0} leftSection={<IconEdit size={16} />}>
                      Request Revision
                    </Button>
                    <Button variant="outline" color="red" radius={0}>
                      Reject Memo
                    </Button>
                  </Group>
                  <Button color="sage" radius={0} c="dark-forest" rightSection={<IconSend size={18} />}>
                    Approve & Send
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
