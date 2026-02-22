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
  TextInput,
  Textarea,
  Divider,
  Select
} from '@mantine/core';
import { 
  IconSend, 
  IconDeviceFloppy
} from '@tabler/icons-react';

export default function ResearcherDraftingDesk() {
  return (
    <Container size="xl" fluid>
      <Stack gap={40}>
        {/* 1. Drafting Header */}
        <Box>
          <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
            Memo <Text component="span" inherit c="sage">Drafting</Text> Desk
          </Title>
          <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
            Liaison Correspondence // Authoritative Tone Calibration // Pending Principal Review
          </Text>
        </Box>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
          {/* 2. Draft Configuration Pane */}
          <Paper withBorder p="xl" radius={0} bg="white">
            <Stack gap="lg">
              <Title order={5} ff="var(--font-display)" style={{ textTransform: 'uppercase' }}>Memo Parameters</Title>
              <Select 
                label="Target Project" 
                placeholder="Select active project" 
                data={['Digital Spaces Study', 'Urban Sustainability', 'Lab Legacy Archive']}
                radius={0}
              />
              <Select 
                label="Recipient Category" 
                placeholder="Select target" 
                data={['The Client (Scholar)', 'The Publisher (Journal Editor)', 'Internal Principal']}
                radius={0}
              />
              <TextInput 
                label="Subject Line" 
                placeholder="e.g. Formal Follow-up regarding..." 
                radius={0}
              />
              <Divider my="sm" />
              <Box>
                <Text size="xs" fw={700} mb={4}>Guidance Status:</Text>
                <Badge fullWidth color="sage" radius={0} variant="light">ALIGNED WITH MICAH_VOICE_v2</Badge>
              </Box>
            </Stack>
          </Paper>

          {/* 3. Editor Pane */}
          <Box style={{ gridColumn: 'span 2' }}>
            <Paper withBorder radius={0} p={0} bg="white" style={{ display: 'flex', flexDirection: 'column', height: 600 }}>
              <Box p="md" bg="parchment.0" style={{ borderBottom: '1px solid var(--mantine-color-parchment-2)' }}>
                <Group justify="space-between">
                  <Text ff="var(--font-body)" size="7px" c="dimmed">BUFFER_DRAFT_MODE</Text>
                  <Group gap="xs">
                    <Text ff="var(--font-body)" size="7px" c="dimmed">LAST_SAVED: 2M AGO</Text>
                    <IconDeviceFloppy size={12} color="var(--mantine-color-deep-green-3)" />
                  </Group>
                </Group>
              </Box>
              
              <Box flex={1} p="xl">
                <Textarea 
                  variant="unstyled"
                  placeholder="Dear [Scholar Name], I have completed the..."
                  minRows={15}
                  styles={{
                    input: { lineHeight: 1.8, fontSize: '0.9rem', color: '#333' }
                  }}
                />
              </Box>

              <Box p="xl" bg="parchment.0" style={{ borderTop: '1px solid var(--mantine-color-parchment-2)' }}>
                <Group justify="space-between">
                  <Button variant="subtle" color="dimmed" radius={0}>
                    Discard Draft
                  </Button>
                  <Group gap="md">
                    <Button variant="outline" color="deep-green" radius={0}>
                      Save for Later
                    </Button>
                    <Button color="deep-green" radius={0} rightSection={<IconSend size={18} />}>
                      Submit for Principal Blessing
                    </Button>
                  </Group>
                </Group>
              </Box>
            </Paper>
          </Box>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
