'use client';
import React from 'react';
import { 
  Box, 
  Container, 
  Title, 
  Text, 
  Stack, 
  Group, 
  Badge, 
  SimpleGrid, 
  Card, 
  ThemeIcon,
  Divider,
  List,
  ThemeIcon as MantineThemeIcon
} from '@mantine/core';
import { 
  IconBinary, 
  IconServer, 
  IconCpu, 
  IconCode,
  IconArrowNarrowRight
} from '@tabler/icons-react';

export default function MethodologyPage() {
  return (
    <Box bg="dark-forest" mih="100vh">
      {/* 1. Technical Hero Section */}
      <Box 
        component="section" 
        pt={160} 
        pb={100} 
        pos="relative"
        style={{ borderBottom: '1px solid var(--mantine-color-deep-green-3)' }}
      >
        <Container size="xl">
          <Stack gap="xl" align="center" style={{ textAlign: 'center' }}>
            <Badge variant="outline" color="burnished-gold" radius={0} size="lg">Technical Briefing // 01-2026</Badge>
            <Title 
              order={1} 
              ff="var(--font-display)" 
              c="parchment" 
              style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', textTransform: 'uppercase', lineHeight: 0.9 }}
            >
              The Precision <br />
              <Text component="span" inherit c="burnished-gold">Engine Architecture</Text>
            </Title>
            <Text c="parchment" size="lg" maw={700} opacity={0.7} style={{ lineHeight: 1.6 }}>
              A deep-dive into the WASM-rendering, sovereign storage, and automated verification protocols that power the Agency OS.
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* 2. Three Pillars of the Lab */}
      <Box component="section" py={120}>
        <Container size="xl">
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing={40}>
            {/* Pillar 1: WASM Rendering */}
            <Card bg="transparent" p={40} radius={0} style={{ border: '1px solid var(--mantine-color-deep-green-3)' }}>
              <ThemeIcon color="burnished-gold" variant="outline" size={50} radius={0} mb="xl">
                <IconCpu size={30} />
              </ThemeIcon>
              <Title order={3} ff="var(--font-display)" c="parchment" mb="md" style={{ textTransform: 'uppercase' }}>
                WASM-Typesetting
              </Title>
              <Text c="parchment" size="sm" opacity={0.6} style={{ lineHeight: 1.8 }} mb="xl">
                We utilize WebAssembly to run the Typst typesetting engine directly in the browser. This ensures that what you see in the portal is bit-for-bit identical to the final journal submission.
              </Text>
              <List 
                spacing="xs" 
                size="xs" 
                center 
                c="parchment" 
                icon={<IconArrowNarrowRight size={14} color="var(--mantine-color-burnished-gold-7)" />}
              >
                <List.Item>Zero-Latency PDF Generation</List.Item>
                <List.Item>Automated Bibliography Sync</List.Item>
                <List.Item>High-Resolution Vector Graphics</List.Item>
              </List>
            </Card>

            {/* Pillar 2: Sovereign Infrastructure */}
            <Card bg="transparent" p={40} radius={0} style={{ border: '1px solid var(--mantine-color-deep-green-3)' }}>
              <ThemeIcon color="burnished-gold" variant="outline" size={50} radius={0} mb="xl">
                <IconServer size={30} />
              </ThemeIcon>
              <Title order={3} ff="var(--font-display)" c="parchment" mb="md" style={{ textTransform: 'uppercase' }}>
                Sovereign Storage
              </Title>
              <Text c="parchment" size="sm" opacity={0.6} style={{ lineHeight: 1.8 }} mb="xl">
                Your data never enters the public cloud. We utilize isolated, sovereign infrastructure with end-to-end encryption, ensuring institutional privacy protocols are met at every stage.
              </Text>
              <List 
                spacing="xs" 
                size="xs" 
                center 
                c="parchment" 
                icon={<IconArrowNarrowRight size={14} color="var(--mantine-color-burnished-gold-7)" />}
              >
                <List.Item>AES-256 Data At Rest</List.Item>
                <List.Item>Isolated Computing Clusters</List.Item>
                <List.Item>Full Audit Transparency</List.Item>
              </List>
            </Card>

            {/* Pillar 3: Automated Verification */}
            <Card bg="transparent" p={40} radius={0} style={{ border: '1px solid var(--mantine-color-deep-green-3)' }}>
              <ThemeIcon color="burnished-gold" variant="outline" size={50} radius={0} mb="xl">
                <IconBinary size={30} />
              </ThemeIcon>
              <Title order={3} ff="var(--font-display)" c="parchment" mb="md" style={{ textTransform: 'uppercase' }}>
                Integrity Protocols
              </Title>
              <Text c="parchment" size="sm" opacity={0.6} style={{ lineHeight: 1.8 }} mb="xl">
                Every statistical result is verified through our Prismer.AI validation suite. We run automated checks against your raw datasets to prevent &quot;Ghost Revisions&quot; and ensure reproducibility.
              </Text>
              <List 
                spacing="xs" 
                size="xs" 
                center 
                c="parchment" 
                icon={<IconArrowNarrowRight size={14} color="var(--mantine-color-burnished-gold-7)" />}
              >
                <List.Item>Reproducible R/Python Audits</List.Item>
                <List.Item>SHA-256 Hash Verification</List.Item>
                <List.Item>Bias & Outlier Detection</List.Item>
              </List>
            </Card>
          </SimpleGrid>
        </Container>
      </Box>

      {/* 3. The "Engine Room" Visualization */}
      <Box component="section" py={120} bg="deep-green.9">
        <Container size="xl">
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={80} align="center">
            <Stack gap="xl">
              <Badge color="burnished-gold" variant="filled" radius={0} size="sm">Technical Advantage</Badge>
              <Title order={2} ff="var(--font-display)" c="parchment" size="3rem" style={{ textTransform: 'uppercase' }}>
                Why Code-First?
              </Title>
              <Text c="parchment" size="md" opacity={0.7} style={{ lineHeight: 1.8 }}>
                The &quot;Editing Factories&quot; use Microsoft Word Track Changes—a 30-year-old technology built for business memos, not scientific discovery. <br /><br />
                We utilize a **Code-First Pipeline**. By treating your research as code, we can automate the validation, formatting, and submission processes, reducing the risk of human error by 94%.
              </Text>
              <Divider color="deep-green.7" opacity={0.4} />
              <Group>
                <MantineThemeIcon color="deep-green" variant="light" size={40} radius={0}>
                  <IconCode size={24} />
                </MantineThemeIcon>
                <Text ff="var(--font-body)" size="xs" c="parchment" opacity={0.5}>
                  $&gt; MANUSCRIPT // AS // SOFTWARE
                </Text>
              </Group>
            </Stack>

            <Box p="xl" style={{ border: '1px solid var(--mantine-color-burnished-gold-7)', background: 'black', position: 'relative' }}>
              <Text ff="var(--font-body)" size="xs" c="burnished-gold.7" mb="md" style={{ letterSpacing: '2px' }}>CORE_ENGINE_RUNTIME.log</Text>
              <Stack gap={4}>
                <Text ff="var(--font-body)" size="10px" c="deep-green.3">[09:12:01] INITIALIZING WASM CONTAINER...</Text>
                <Text ff="var(--font-body)" size="10px" c="deep-green.3">[09:12:02] LOADING TYPST TEMPLATE: NATURE_SCIENCE_v4</Text>
                <Text ff="var(--font-body)" size="10px" c="deep-green.3">[09:12:04] SYNCING BIBTEX REPOSITORY (342 ENTRIES)</Text>
                <Text ff="var(--font-body)" size="10px" c="burnished-gold.7">[09:12:05] VERIFYING SHA-256 HASH OF DATASET...</Text>
                <Text ff="var(--font-body)" size="10px" c="deep-green.3">[09:12:06] HASH MATCH: E3B0C442 (SECURE)</Text>
                <Text ff="var(--font-body)" size="10px" c="deep-green.3">[09:12:08] RENDERING VECTOR PLOTS (PLT_01, PLT_02)</Text>
                <Text ff="var(--font-body)" size="10px" c="burnished-gold.7">[09:12:10] COMPILE SUCCESSFUL: 2.4s</Text>
              </Stack>
              <Box pos="absolute" bottom={-10} right={-10} w={60} h={60} style={{ borderRight: '2px solid var(--mantine-color-burnished-gold-7)', borderBottom: '2px solid var(--mantine-color-burnished-gold-7)' }} />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* 4. Footer Placeholder Metadata */}
      <Box py="xl" style={{ borderTop: '1px solid var(--mantine-color-deep-green-3)' }}>
        <Container size="xl">
          <Group justify="space-between">
            <Text ff="var(--font-body)" size="xs" c="deep-green.3" style={{ letterSpacing: '2px' }}>
              SYSTEM_ID: METHODOLOGY_v1.0.4
            </Text>
            <Text ff="var(--font-body)" size="xs" c="deep-green.3" style={{ letterSpacing: '2px' }}>
              AES-256 ENCRYPTED CHANNEL
            </Text>
          </Group>
        </Container>
      </Box>
    </Box>
  );
}
