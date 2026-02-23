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
  Center 
} from '@mantine/core';
import { 
  IconCode, 
  IconEye, 
  IconDeviceFloppy, 
  IconFileExport, 
  IconTerminal2 
} from '@tabler/icons-react';

export default function ProductionEnginePage() {
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
      <Paper withBorder p="md" radius={0} bg="black" mb="xs" style={{ border: '1px solid #2A2D31' }}>
        <Group justify="space-between">
          <Group gap="xl">
            <Group gap="xs">
              <IconTerminal2 size={18} color="var(--mantine-color-burnished-gold-7)" />
              <Text ff="var(--font-body)" size="xs" fw={700} c="#E1E1E1">ENGINE_STATUS: OPERATIONAL</Text>
            </Group>
            <Divider orientation="vertical" h={20} color="#2A2D31" />
            <Group gap="md">
              <Text ff="var(--font-body)" size="xs" c="dimmed">PROJECT_ID:</Text>
              <Text ff="var(--font-body)" size="xs" c="#E1E1E1">PRJ-7792-ALPHA</Text>
            </Group>
          </Group>

          <Group gap="md">
            <Badge variant="dot" color="sage" radius={0} size="xs">WASM_READY</Badge>
            <Group gap="xs">
              <Tooltip label="Sync to Vault">
                <ActionIcon variant="subtle" color="burnished-gold.7"><IconDeviceFloppy size={18} /></ActionIcon>
              </Tooltip>
              <Tooltip label="Export Proof">
                <ActionIcon variant="subtle" color="burnished-gold.7"><IconFileExport size={18} /></ActionIcon>
              </Tooltip>
            </Group>
          </Group>
        </Group>
      </Paper>

      {/* 2. Dual-Pane Editor Workspace */}
      <Box style={{ flex: 1, display: 'flex', gap: '1px', background: '#2A2D31', overflow: 'hidden', border: '1px solid #2A2D31' }}>
        {/* Left Pane: Editor */}
        <Box style={{ flex: 1, background: '#050A08', display: 'flex', flexDirection: 'column' }}>
          <Box p="xs" bg="#0A0B0C" style={{ borderBottom: '1px solid #2A2D31' }}>
            <Group justify="space-between">
              <Group gap="xs">
                <IconCode size={14} color="var(--mantine-color-gray-6)" />
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
                color: '#E1E1E1',
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
        <Box style={{ flex: 1, background: '#1a1a1a', display: 'flex', flexDirection: 'column' }}>
          <Box p="xs" bg="#0A0B0C" style={{ borderBottom: '1px solid #2A2D31' }}>
            <Group justify="space-between">
              <Group gap="xs">
                <IconEye size={14} color="var(--mantine-color-burnished-gold-7)" />
                <Text ff="var(--font-body)" size="7px" c="dimmed" style={{ letterSpacing: '1px' }}>TYPST_PREVIEW (INSTANT_RENDER)</Text>
              </Group>
              <Badge size="xs" radius={0} variant="outline" color="burnished-gold">NATURE_MS_v4</Badge>
            </Group>
          </Box>
          
          <ScrollArea flex={1} p={40} bg="rgba(0,0,0,0.5)">
            <Center>
              <Paper 
                shadow="xl" 
                radius={0} 
                p={60} 
                w="100%" 
                maw={600}
                mih={800} 
                bg="white" 
                style={{ 
                  position: 'relative',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.8)'
                }}
              >
                {/* Watermark */}
                <Text 
                  pos="absolute" 
                  top="50%" 
                  left="50%" 
                  size="3.5rem" 
                  fw={900} 
                  c="rgba(14, 29, 22, 0.03)" 
                  style={{ transform: 'translate(-50%, -50%) rotate(-45deg)', whiteSpace: 'nowrap', pointerEvents: 'none' }}
                >
                  EXECUTIVE PROOF
                </Text>

                <Stack gap="xl">
                  <Box ta="center">
                    <Title order={1} style={{ fontSize: '1.5rem', color: 'black' }}>
                      Impact of Digital Spaces on Youth Development
                    </Title>
                    <Text size="7px" ff="var(--font-body)" mt="xs">VERSION: 4.0.2 // HASH: E3B0C442</Text>
                  </Box>
                  
                  <Divider color="gray.1" />
                  
                  <Title order={3} size="1rem" style={{ color: 'black' }}>Abstract</Title>
                  <Text size="xs" style={{ color: '#333', lineHeight: 1.8 }}>
                    The rapid expansion of digital environments has fundamentally altered the social landscape for youth. This paper examines the longitudinal effects of high-immersion digital interactions...
                  </Text>

                  <Box p="md" bg="#fafafa" style={{ border: '1px solid #eee' }}>
                    <Box h={60} bg="deep-green.0" style={{ display: 'flex', alignItems: 'flex-end', gap: 4, padding: 8 }}>
                      <Box w="10%" h="40%" bg="deep-green.7" />
                      <Box w="10%" h="90%" bg="burnished-gold.7" />
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
