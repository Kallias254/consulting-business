'use client';
import React from 'react';
import { 
  Container, 
  Stack, 
  Title, 
  Text, 
  Paper, 
  Group, 
  Avatar, 
  Badge, 
  Divider, 
  Textarea, 
  Button, 
  Box,
  ScrollArea,
  SimpleGrid,
  ThemeIcon,
  ActionIcon,
  Tooltip
} from '@mantine/core';
import { 
  IconSend, 
  IconPaperclip, 
  IconFileDescription, 
  IconHistory, 
  IconShieldCheck,
  IconClock,
  IconArchive,
  IconFingerprint
} from '@tabler/icons-react';

export default function CorrespondencePage() {
  return (
    <Container size="xl" fluid>
      <Stack gap="xl">
        {/* 1. Page Header: High Technical Authority */}
        <Box>
          <Group justify="space-between" align="flex-end" mb="md">
            <Box>
              <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
                Liaison <Text component="span" inherit c="burnished-gold.7">Record</Text>
              </Title>
              <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
                Secure Correspondence Log // Scientific Oversight // Permanent Audit Trail
              </Text>
            </Box>
            <Group gap="xs">
              <Badge variant="outline" color="deep-green" size="xs" radius={0}>ENCRYPTION: AES-256</Badge>
              <Badge variant="outline" color="sage" size="xs" radius={0}>OVERSIGHT: ACTIVE</Badge>
            </Group>
          </Group>
        </Box>

        <SimpleGrid cols={{ base: 1, md: 4 }} spacing="xl">
          {/* 2. Communication Stream */}
          <Stack gap="xl" style={{ gridColumn: 'span 3' }}>
            {/* Thread Navigation / Status */}
            <Box bg="white" p="xs" style={{ border: '1px solid #E0DBCC' }}>
              <Group gap="sm" px="md">
                <IconHistory size={14} color="var(--mantine-color-gray-6)" />
                <Text size="9px" fw={700} c="dimmed" style={{ letterSpacing: '1px' }}>THREAD_CONTEXT:</Text>
                <Group gap={8}>
                  <Badge variant="dot" color="burnished-gold" size="xs">05 FEB: EXECUTIVE_MEMO_SENT</Badge>
                  <IconShieldCheck size={10} color="gray" />
                  <Badge variant="dot" color="sage" size="xs">TODAY: CLIENT_REPLY_RCVD</Badge>
                </Group>
              </Group>
            </Box>

            <ScrollArea h={600} offsetScrollbars>
              <Stack gap={40}>
                {/* Formal Message: From Principal */}
                <Paper withBorder p={0} radius={0} bg="white" style={{ borderColor: '#E0DBCC' }}>
                  <Box p="xl" bg="#FDFDFB" style={{ borderBottom: '1px solid #E0DBCC' }}>
                    <Group justify="space-between">
                      <Group gap="md">
                        <ThemeIcon variant="light" color="burnished-gold" radius={0} size="lg">
                          <IconShieldCheck size={20} />
                        </ThemeIcon>
                        <Box>
                          <Text fw={700} size="sm" c="dark-forest">EXECUTIVE MEMO // MICAH S.</Text>
                          <Text size="xs" c="dimmed" ff="var(--font-body)">05 Feb 2026 // 09:12 // REF: MEMO-772</Text>
                        </Box>
                      </Group>
                      <Tooltip label="All correspondence is cryptographically signed">
                        <ActionIcon variant="subtle" color="dimmed"><IconFingerprint size={16} /></ActionIcon>
                      </Tooltip>
                    </Group>
                  </Box>
                  <Box p={40}>
                    <Text size="sm" style={{ lineHeight: 1.8, fontFamily: 'serif' }}>
                      Dear Colleague, <br /><br />
                      I have completed the second pass of the &quot;Millennial Handbook&quot; manuscript. The technical sections regarding the Typst engine integration are now robust. I&apos;ve noted a small discrepancy in the methodology section—please review the latest proof in the repository and confirm if the statistical weights align with your original hypothesis. <br /><br />
                      Once confirmed, we will move to the Final Executive Review. <br /><br />
                      Sincerely, <br />
                      <b>Micah S.</b> <br />
                      Principal Investigator
                    </Text>
                  </Box>
                </Paper>

                {/* Client Response: Captured from Email */}
                <Paper withBorder p={0} radius={0} bg="white" style={{ borderColor: '#E0DBCC', alignSelf: 'flex-end', maxWidth: '90%' }}>
                  <Box p="md" bg="#F4F1EA" style={{ borderBottom: '1px solid #E0DBCC' }}>
                    <Group justify="space-between">
                      <Group gap="sm">
                        <IconClock size={14} color="var(--mantine-color-gray-6)" />
                        <Text size="xs" fw={700} c="dimmed">INCOMING_REPLY // CAPTURED_VIA_ALIAS</Text>
                      </Group>
                      <Text size="xs" c="dimmed" ff="var(--font-body)">05 Feb 2026 // 11:45</Text>
                    </Group>
                  </Box>
                  <Box p="xl">
                    <Text size="sm" style={{ lineHeight: 1.8 }}>
                      The weights in the latest proof look correct. The adjustment to the variance matches our raw dataset. I have also uploaded the missing bibliography file to the repository. Looking forward to the submission.
                    </Text>
                  </Box>
                </Paper>
              </Stack>
            </ScrollArea>

            {/* Secure Portal Reply (Direct) */}
            <Paper withBorder p="xl" radius={0} bg="white" style={{ borderColor: '#E0DBCC' }}>
              <Stack gap="md">
                <Text ff="var(--font-body)" size="9px" fw={700} c="dimmed" style={{ letterSpacing: '1px' }}>INITIALIZE_SECURE_REPLY:</Text>
                <Textarea 
                  placeholder="Draft your correspondence here. Your message will be logged to the project ledger and forwarded to Micah S." 
                  minRows={4} 
                  variant="unstyled"
                  p="md"
                  bg="#FDFDFB"
                  style={{ border: '1px solid #E0DBCC' }}
                />
                <Group justify="space-between">
                  <Button variant="subtle" color="dimmed" radius={0} leftSection={<IconPaperclip size={18} />}>
                    Attach Scientific Data
                  </Button>
                  <Button color="deep-green.7" radius={0} rightSection={<IconSend size={18} />}>
                    Dispatch to Principal
                  </Button>
                </Group>
              </Stack>
            </Paper>
          </Stack>

          {/* 3. Communication Metadata Sidebar */}
          <Stack gap="xl">
            <Paper withBorder p="xl" radius={0} bg="white" style={{ borderColor: '#E0DBCC' }}>
              <Title order={5} ff="var(--font-display)" mb="md" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Channel Status</Title>
              <Stack gap="xs">
                <Group justify="space-between">
                  <Text size="xs" ff="var(--font-body)" c="dimmed">LAST_SYNC:</Text>
                  <Text size="xs" ff="var(--font-body)" fw={700}>2M AGO</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="xs" ff="var(--font-body)" c="dimmed">METHOD:</Text>
                  <Text size="xs" ff="var(--font-body)" fw={700}>ALIAS_ROUTING</Text>
                </Group>
                <Divider my="xs" color="#F4F1EA" />
                <Button fullWidth variant="light" color="deep-green.7" radius={0} size="xs" leftSection={<IconArchive size={14} />}>
                  Download Archive (.EML)
                </Button>
              </Stack>
            </Paper>

            <Paper withBorder p="xl" radius={0} bg="white" style={{ borderColor: '#E0DBCC' }}>
              <Title order={5} ff="var(--font-display)" mb="md" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Linked project</Title>
              <Text size="xs" fw={700} c="deep-green.9" mb={4}>PRJ-7792-ALPHA</Text>
              <Text size="xs" c="dimmed" mb="md">The Millennial Handbook: Final Scholarly Review</Text>
              <Button fullWidth variant="outline" color="gray.6" radius={0} size="xs">
                Switch Project Context
              </Button>
            </Paper>
          </Stack>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
