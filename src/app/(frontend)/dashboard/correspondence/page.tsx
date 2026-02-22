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
  SimpleGrid
} from '@mantine/core';
import { IconSend, IconPaperclip, IconFileDescription } from '@tabler/icons-react';

export default function CorrespondencePage() {
  return (
    <Container size="xl" fluid>
      <Stack gap="xl">
        {/* Page Header */}
        <Group justify="space-between" align="flex-end" mb="md">
          <Box>
            <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
              Liaison <Text component="span" inherit c="burnished-gold.7">Correspondence</Text>
            </Title>
            <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
              Direct communication with the Principal Investigator // Secure Channel
            </Text>
          </Box>
          <Badge variant="filled" color="deep-green" size="lg" radius={0}>
            Last Activity: 2h ago
          </Badge>
        </Group>

        <SimpleGrid cols={{ base: 1, md: 4 }} spacing="xl">
          {/* Main Conversation Thread */}
          <Stack gap="xl" style={{ gridColumn: 'span 3' }}>
            <ScrollArea h={600} offsetScrollbars p="md">
              <Stack gap={40}>
                {/* Message 1: From Principal */}
                <Paper withBorder p={40} radius={0} bg="white">
                  <Group justify="space-between" mb="lg">
                    <Group gap="md">
                      <Avatar color="deep-green" radius={0}>PI</Avatar>
                      <Box>
                        <Text fw={700} size="sm">Principal Investigator</Text>
                        <Text size="xs" c="dimmed" ff="var(--font-body)">Micah S. // 05 Feb 2026 // 09:12</Text>
                      </Box>
                    </Group>
                    <Badge color="burnished-gold" radius={0}>OFFICIAL_MEMO</Badge>
                  </Group>
                  <Divider mb="xl" color="parchment.1" />
                  <Text size="sm" style={{ lineHeight: 1.8 }}>
                    Dear Colleague, <br /><br />
                    I have completed the second pass of the &quot;Millennial Handbook&quot; manuscript. The technical sections regarding the Typst engine integration are now robust. I&apos;ve noted a small discrepancy in the methodology section—please review the latest proof in the repository and confirm if the statistical weights align with your original hypothesis. <br /><br />
                    Once confirmed, we will move to the Final Executive Review.
                  </Text>
                </Paper>

                {/* Message 2: From Scientist (Client) */}
                <Paper withBorder p={40} radius={0} bg="parchment.0" style={{ alignSelf: 'flex-end', maxWidth: '90%' }}>
                  <Group justify="space-between" mb="lg">
                    <Group gap="md">
                      <Avatar color="gray" radius={0}>DR</Avatar>
                      <Box>
                        <Text fw={700} size="sm">Dr. Researcher</Text>
                        <Text size="xs" c="dimmed" ff="var(--font-body)">Author // 05 Feb 2026 // 11:45</Text>
                      </Box>
                    </Group>
                  </Group>
                  <Divider mb="xl" color="white" />
                  <Text size="sm" style={{ lineHeight: 1.8 }}>
                    The weights in the latest proof look correct. The adjustment to the variance matches our raw dataset. I have also uploaded the missing bibliography file to the repository. Looking forward to the submission.
                  </Text>
                </Paper>
              </Stack>
            </ScrollArea>

            {/* Reply Input Area */}
            <Paper withBorder p="xl" radius={0}>
              <Stack gap="md">
                <Textarea 
                  placeholder="Draft your correspondence here..." 
                  minRows={4} 
                  variant="unstyled"
                  p="md"
                  bg="parchment.0"
                  style={{ border: '1px solid var(--mantine-color-parchment-3)' }}
                />
                <Group justify="space-between">
                  <Button variant="subtle" color="dimmed" radius={0} leftSection={<IconPaperclip size={18} />}>
                    Attach Scientific Data
                  </Button>
                  <Button color="deep-green" radius={0} rightSection={<IconSend size={18} />}>
                    Send to Principal
                  </Button>
                </Group>
              </Stack>
            </Paper>
          </Stack>

          {/* Sidebar Stats/Status */}
          <Stack gap="xl">
            <Paper withBorder p="xl" radius={0}>
              <Title order={5} ff="var(--font-display)" mb="md" style={{ textTransform: 'uppercase' }}>Channel Status</Title>
              <Stack gap="xs">
                <Group justify="space-between">
                  <Text size="xs" ff="var(--font-body)" c="dimmed">PROTOCOL:</Text>
                  <Text size="xs" ff="var(--font-body)" fw={700}>AES-256-BIT</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="xs" ff="var(--font-body)" c="dimmed">RECORDS:</Text>
                  <Text size="xs" ff="var(--font-body)" fw={700}>PERMANENT</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="xs" ff="var(--font-body)" c="dimmed">OVERSIGHT:</Text>
                  <Text size="xs" ff="var(--font-body)" fw={700} c="deep-green">ACTIVE</Text>
                </Group>
              </Stack>
            </Paper>

            <Paper withBorder p="xl" radius={0}>
              <Title order={5} ff="var(--font-display)" mb="md" style={{ textTransform: 'uppercase' }}>Recent Files</Title>
              <Stack gap="xs">
                <Button variant="subtle" color="deep-green" radius={0} size="xs" justify="flex-start" leftSection={<IconFileDescription size={14} />}>
                  bib_revised.bib
                </Button>
                <Button variant="subtle" color="deep-green" radius={0} size="xs" justify="flex-start" leftSection={<IconFileDescription size={14} />}>
                  data_weights.csv
                </Button>
              </Stack>
            </Paper>
          </Stack>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
