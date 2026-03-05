'use client';
import React from 'react';
import {
  Container,
  Stack,
  Title,
  Text,
  Paper,
  Group,
  Box,
  SimpleGrid,
  ThemeIcon,
  Divider,
  Stepper,
  Badge,
  Timeline
} from '@mantine/core';
import {
  IconCrown,
  IconShieldCheck,
  IconUsers,
  IconMicroscope,
  IconArrowRight,
  IconMailForward,
  IconEyeCheck,
  IconSettings
} from '@tabler/icons-react';

export default function OrgStructurePage() {
  return (
    <Container size="xl" fluid>
      <Stack gap={50}>
        {/* Header */}
        <Box>
          <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
            Command & <Text component="span" inherit c="sage">Control</Text>
          </Title>
          <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
            The Clearance Chain // Operational Hierarchy // Structural Integrity
          </Text>
        </Box>

        {/* 1. The Executive Clearance Chain (Micah's View) */}
        <Paper withBorder p={40} radius={0} bg="white">
          <Stack gap="xl">
            <Group gap="xs">
              <IconCrown size={20} color="var(--mantine-color-burnished-gold-7)" />
              <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                The Clearance Chain
              </Title>
            </Group>
            <Text size="sm" c="dimmed" maw={600}>
              This is the linear flow of information. Micah (Principal) sits at the final gate, ensuring the "Executive Clearance" is the last thing a client or publisher receives.
            </Text>

            <Stepper active={3} breakpoint="sm" color="burnished-gold" iconSize={42}>
              <Stepper.Step
                label="Production"
                description="Researchers"
                icon={<IconMicroscope size={20} />}
              />
              <Stepper.Step
                label="QC & Triage"
                description="Lead Researcher"
                icon={<IconEyeCheck size={20} />}
              />
              <Stepper.Step
                label="Infrastructure"
                description="Admin (You)"
                icon={<IconSettings size={20} />}
              />
              <Stepper.Step
                label="Executive Clearance"
                description="Micah (Principal)"
                icon={<IconCrown size={20} />}
              />
            </Stepper>
          </Stack>
        </Paper>

        {/* 2. The Squad Tree (Scaling Model) */}
        <SimpleGrid cols={{ base: 1, lg: 2 }} spacing={40}>
          <Paper withBorder p="xl" radius={0} bg="parchment.0">
            <Stack gap="lg">
              <Group gap="xs">
                <IconUsers size={20} color="var(--mantine-color-deep-green-9)" />
                <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase' }}>
                  The Squad Model (1:5 Scaling)
                </Title>
              </Group>
              <Text size="xs" c="deep-green.7" style={{ lineHeight: 1.6 }}>
                To scale without noise, we use the "Squad Leader" approach. One Lead Researcher manages up to 5 projects, acting as the technical filter for the Principals.
              </Text>

              <Box style={{ border: '1px solid var(--mantine-color-parchment-2)', padding: '20px' }} bg="white">
                <Timeline active={1} bulletSize={24} lineWidth={2} color="sage">
                  <Timeline.Item bullet={<IconCrown size={12} />} title="Principals">
                    <Text c="dimmed" size="xs">Micah (Strategic) & You (Ops)</Text>
                  </Timeline.Item>

                  <Timeline.Item bullet={<IconShieldCheck size={12} />} title="Lead Researcher (Squad Leader)">
                    <Text size="xs" fw={700} c="deep-green.9">Manages Projects A, B, C, D, E</Text>
                    <Text c="dimmed" size="xs" mt={4}>Drafts all "Clearances" for Micah</Text>
                  </Timeline.Item>

                  <Timeline.Item bullet={<IconMicroscope size={12} />} title="Standard Researchers (The Doers)">
                    <Text c="dimmed" size="xs">Execute specific "Units" assigned by Lead</Text>
                  </Timeline.Item>
                </Timeline>
              </Box>
            </Stack>
          </Paper>

          <Paper withBorder p="xl" radius={0} bg="deep-green.9" c="white">
            <Stack gap="lg">
              <Group gap="xs">
                <IconMailForward size={20} color="var(--mantine-color-burnished-gold-4)" />
                <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase' }} c="burnished-gold.4">
                  Information Source Flow
                </Title>
              </Group>
              
              <Stack gap="md">
                <Box>
                  <Group justify="space-between" mb={4}>
                    <Text size="xs" ff="var(--font-body)" fw={700}>GLOBAL_TRIAGE (INCOMING)</Text>
                    <Badge variant="filled" color="burnished-gold" size="xs" radius={0}>INPUT</Badge>
                  </Group>
                  <Text size="xs" c="parchment.2">Emails from publishers/clients hit the Payload Inbox. You promote them to Project Vaults.</Text>
                </Box>

                <Divider color="deep-green.7" />

                <Box>
                  <Group justify="space-between" mb={4}>
                    <Text size="xs" ff="var(--font-body)" fw={700}>PROJECT_VAULT (INTERNAL)</Text>
                    <Badge variant="outline" color="sage" size="xs" radius={0}>PROCESS</Badge>
                  </Group>
                  <Text size="xs" c="parchment.2">Lead Researchers pull files, assign tasks to Researchers. Work happens in Markdown.</Text>
                </Box>

                <Divider color="deep-green.7" />

                <Box>
                  <Group justify="space-between" mb={4}>
                    <Text size="xs" ff="var(--font-body)" fw={700}>CORRESPONDENCE (OUTGOING)</Text>
                    <Badge variant="filled" color="sage" size="xs" radius={0}>OUTPUT</Badge>
                  </Group>
                  <Text size="xs" c="parchment.2">Lead drafts the response. Micah clicks "Authorize". Resend fires the email from Micah's alias.</Text>
                </Box>
              </Stack>
            </Stack>
          </Paper>
        </SimpleGrid>

        {/* 3. Role Definition Matrix */}
        <Paper withBorder radius={0} p={0} bg="white">
          <Box p="xl" style={{ borderBottom: '1px solid var(--mantine-color-parchment-2)' }}>
            <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
              Role Accountability Matrix
            </Title>
          </Box>
          <Box p="xl">
            <SimpleGrid cols={{ base: 1, md: 4 }} spacing="xl">
              <Stack gap="xs">
                <Text ff="var(--font-body)" size="xs" fw={700} c="burnished-gold.8">PRINCIPAL (MICAH)</Text>
                <Text size="xs" c="dimmed">Final Quality Control, Executive Authorization, High-Level Strategy.</Text>
              </Stack>
              <Stack gap="xs">
                <Text ff="var(--font-body)" size="xs" fw={700} c="sage">ADMIN (YOU)</Text>
                <Text size="xs" c="dimmed">Infrastructure, Financials, Hiring/Paying Squads, Operational Triage.</Text>
              </Stack>
              <Stack gap="xs">
                <Text ff="var(--font-body)" size="xs" fw={700} c="deep-green.9">LEAD RESEARCHER</Text>
                <Text size="xs" c="dimmed">Technical Account Management, Friday Pulse Prep, Drafting Clearances.</Text>
              </Stack>
              <Stack gap="xs">
                <Text ff="var(--font-body)" size="xs" fw={700} c="deep-green.7">RESEARCHER</Text>
                <Text size="xs" c="dimmed">Execution of specific Units (Audits, Typesetting, Formatting).</Text>
              </Stack>
            </SimpleGrid>
          </Box>
        </Paper>
      </Stack>
    </Container>
  );
}
