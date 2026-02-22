'use client';
import React, { useState } from 'react';
import { 
  Box, 
  Title, 
  Text, 
  Stack, 
  Group, 
  Badge, 
  Textarea, 
  Paper, 
  Divider, 
  ActionIcon, 
  Tooltip, 
  ScrollArea, 
  Center,
  Button
} from '@mantine/core';
import { 
  IconCode, 
  IconEye, 
  IconDeviceFloppy, 
  IconFileExport, 
  IconTerminal2,
  IconArrowLeft
} from '@tabler/icons-react';
import Link from 'next/link';

export default function ResearcherProductionPage() {
  const [markdown, setMarkdown] = useState(`# Impact of Digital Spaces on Youth Development

## Introduction
The rapid expansion of digital environments has fundamentally altered the social landscape for youth...

### Methodology
We utilized a combination of qualitative and quantitative measures to track decision-making processes across a 12-month longitudinal study.

## Results
Preliminary data suggests a significant correlation between...`);

  return (
    <Box style={{ height: 'calc(100vh - 160px)', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Technical Sub-Header */}
      <Paper withBorder p="md" radius={0} bg="white" mb="xs" style={{ border: '1px solid var(--mantine-color-deep-green-1)' }}>
        <Group justify="space-between">
          <Group gap="xl">
            <Button 
              component={Link} 
              href="/researcher" 
              variant="subtle" 
              color="dimmed" 
              size="xs" 
              leftSection={<IconArrowLeft size={14} />}
              p={0}
            >
              Back to Workload
            </Button>
            <Divider orientation="vertical" h={20} color="deep-green.1" />
            <Group gap="xs">
              <IconTerminal2 size={18} color="var(--mantine-color-deep-green-7)" />
              <Text ff="var(--font-body)" size="xs" fw={700}>UNIT_EDITOR: MS-7792-A</Text>
            </Group>
          </Group>

          <Group gap="md">
            <Badge variant="dot" color="sage" radius={0} size="xs">WASM_ACTIVE</Badge>
            <Group gap="xs">
              <Tooltip label="Save Draft">
                <ActionIcon variant="subtle" color="deep-green"><IconDeviceFloppy size={18} /></ActionIcon>
              </Tooltip>
              <Tooltip label="Request Principal Review">
                <ActionIcon variant="subtle" color="deep-green"><IconFileExport size={18} /></ActionIcon>
              </Tooltip>
            </Group>
          </Group>
        </Group>
      </Paper>

      {/* 2. Dual-Pane Editor Workspace */}
      <Box style={{ flex: 1, display: 'flex', gap: '1px', background: 'var(--mantine-color-deep-green-1)', overflow: 'hidden', border: '1px solid var(--mantine-color-deep-green-1)' }}>
        {/* Left Pane: Editor */}
        <Box style={{ flex: 1, background: 'white', display: 'flex', flexDirection: 'column' }}>
          <Box p="xs" bg="parchment.0" style={{ borderBottom: '1px solid var(--mantine-color-parchment-2)' }}>
            <Group justify="space-between">
              <Group gap="xs">
                <IconCode size={14} color="var(--mantine-color-deep-green-3)" />
                <Text ff="var(--font-body)" size="7px" c="dimmed" style={{ letterSpacing: '1px' }}>SOURCE_EDITOR (MARKDOWN)</Text>
              </Group>
            </Group>
          </Box>
          <Textarea 
            value={markdown}
            onChange={(e) => setMarkdown(e.currentTarget.value)}
            variant="unstyled"
            styles={{
              root: { flex: 1, display: 'flex', flexDirection: 'column' },
              wrapper: { flex: 1, display: 'flex', flexDirection: 'column' },
              input: {
                flex: 1,
                padding: '30px',
                color: 'var(--mantine-color-dark-forest-0)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                lineHeight: 1.8,
                backgroundColor: 'transparent',
                resize: 'none',
                overflowY: 'auto'
              }
            }}
          />
        </Box>

        {/* Right Pane: Preview */}
        <Box style={{ flex: 1, background: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
          <Box p="xs" bg="parchment.0" style={{ borderBottom: '1px solid var(--mantine-color-parchment-2)' }}>
            <Group justify="space-between">
              <Group gap="xs">
                <IconEye size={14} color="var(--mantine-color-deep-green-7)" />
                <Text ff="var(--font-body)" size="7px" c="dimmed" style={{ letterSpacing: '1px' }}>TYPST_PREVIEW (PRESTIGE_RENDER)</Text>
              </Group>
              <Badge size="xs" radius={0} variant="outline" color="deep-green">NATURE_MS_v4</Badge>
            </Group>
          </Box>
          
          <ScrollArea flex={1} p={40} bg="rgba(0,0,0,0.02)">
            <Center>
              <Paper 
                shadow="md" 
                radius={0} 
                p={60} 
                w="100%" 
                maw={600}
                mih={800} 
                bg="white" 
                style={{ 
                  position: 'relative',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                }}
              >
                <Stack gap="xl">
                  <Box ta="center">
                    <Title order={1} style={{ fontSize: '1.5rem', color: 'black' }}>
                      Impact of Digital Spaces on Youth Development
                    </Title>
                    <Text size="7px" ff="var(--font-body)" mt="xs">WORKING_DRAFT // HASH: E3B0C442</Text>
                  </Box>
                  
                  <Divider color="gray.1" />
                  
                  <Title order={3} size="1rem" style={{ color: 'black' }}>Abstract</Title>
                  <Text size="xs" style={{ color: '#333', lineHeight: 1.8 }}>
                    The rapid expansion of digital environments has fundamentally altered the social landscape for youth. This paper examines the longitudinal effects of high-immersion digital interactions...
                  </Text>

                  <Box p="md" bg="#fafafa" style={{ border: '1px solid #eee' }}>
                    <Box h={60} bg="deep-green.0" style={{ display: 'flex', alignItems: 'flex-end', gap: 4, padding: 8 }}>
                      <Box w="10%" h="40%" bg="deep-green.7" />
                      <Box w="10%" h="90%" bg="sage" />
                      <Box w="10%" h="60%" bg="deep-green.7" />
                    </Box>
                  </Box>
                </Stack>
              </Paper>
            </Center>
          </ScrollArea>
        </Box>
      </Box>
    </Box>
  );
}
