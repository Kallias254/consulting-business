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
  SimpleGrid, 
  Card, 
  Button, 
  ActionIcon,
  ThemeIcon,
  Box, 
  Divider,
  Menu,
  Breadcrumbs,
  Anchor
} from '@mantine/core';
import { 
  IconFileCertificate, 
  IconDownload, 
  IconDotsVertical, 
  IconShare, 
  IconHistory, 
  IconShieldCheck,
  IconFingerprint,
  IconChartBar,
  IconBook
} from '@tabler/icons-react';
import Link from 'next/link';

export default function ProjectVaultPage({ params }: { params: { projectId: string } }) {
  const projectIdFormatted = params.projectId.replace(/-/g, ' ').toUpperCase();

  return (
    <Container size="xl" my="xl">
      <Stack gap="lg">
        <Box mt="md">
          <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
            Publication <Text component="span" inherit c="burnished-gold.7">Vault</Text>
          </Title>
          <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
            Project: {projectIdFormatted} // Validated Artifacts // Final Publication Outputs
          </Text>
        </Box>

        <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="xl">
          <Card withBorder p={0} radius={0} style={{ display: 'flex', flexDirection: 'column' }}>
            <Box p="xl" bg="#FDFDFB" style={{ borderBottom: '1px solid #E0DBCC', flexGrow: 1 }}>
              <Group justify="space-between" mb="xl">
                <ThemeIcon color="deep-green.7" variant="outline" size="xl" radius={0}>
                  <IconBook size={24} />
                </ThemeIcon>
                <Badge color="deep-green.7" variant="filled" radius={0} size="sm">FINAL_PROOF</Badge>
              </Group>
              <Stack gap="xs">
                <Title order={4} ff="var(--font-display)" size="1.25rem" style={{ textTransform: 'uppercase' }}>
                  {projectIdFormatted}: <br />
                  Final Typeset Manuscript
                </Title>
                <Text size="xs" c="dimmed" ff="var(--font-body)">FILE_ID: {params.projectId.toUpperCase()}-FINAL.PDF</Text>
              </Stack>
            </Box>
            <Box p="md">
              <Group justify="space-between">
                <Button color="deep-green.7" variant="subtle" radius={0} size="xs" leftSection={<IconDownload size={14} />}>
                  Download PDF
                </Button>
                <Menu position="bottom-end" withinPortal radius={0}>
                  <Menu.Target>
                    <ActionIcon variant="subtle" color="dimmed">
                      <IconDotsVertical size={16} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item leftSection={<IconShare size={14} />}>Share via Secure Link</Menu.Item>
                    <Menu.Item leftSection={<IconFingerprint size={14} />}>Verify SHA-256 Hash</Menu.Item>
                    <Menu.Item leftSection={<IconHistory size={14} />}>Version History</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Box>
          </Card>

          <Card withBorder p={0} radius={0} style={{ display: 'flex', flexDirection: 'column' }}>
            <Box p="xl" bg="white" style={{ borderBottom: '1px solid #E0DBCC', flexGrow: 1 }}>
              <Group justify="space-between" mb="xl">
                <ThemeIcon color="burnished-gold.7" variant="outline" size="xl" radius={0}>
                  <IconChartBar size={24} />
                </ThemeIcon>
                <Badge color="burnished-gold.7" variant="outline" radius={0} size="sm">VALIDATION_REPORT</Badge>
              </Group>
              <Stack gap="xs">
                <Title order={4} ff="var(--font-display)" size="1.25rem" style={{ textTransform: 'uppercase' }}>
                  Methodology & Statistical <br />
                  Validation Report
                </Title>
                <Text size="xs" c="dimmed" ff="var(--font-body)">FILE_ID: {params.projectId.toUpperCase()}-STATS.PDF</Text>
              </Stack>
            </Box>
            <Box p="md">
              <Group justify="space-between">
                <Button color="deep-green.7" variant="subtle" radius={0} size="xs" leftSection={<IconDownload size={14} />}>
                  Download Report
                </Button>
                <ActionIcon variant="subtle" color="dimmed">
                  <IconDotsVertical size={16} />
                </ActionIcon>
              </Group>
            </Box>
          </Card>
        </SimpleGrid>

        <Paper withBorder p={40} radius={0} mt="xl" bg="white" style={{ borderColor: '#E0DBCC' }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={60}>
            <Stack gap="md">
              <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                <IconShieldCheck size={20} style={{ marginBottom: -4, marginRight: 8, color: 'var(--mantine-color-deep-green-7)' }} />
                Artifact Verification
              </Title>
              <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
                Every deliverable within this vault is cryptographically signed by our Principal Investigator. This ensures that the version you submit to your publisher is the exact, validated output of our scientific process. 
              </Text>
              <Divider my="sm" color="#E0DBCC" />
              <Group gap="xl">
                <Box>
                  <Text ff="var(--font-body)" size="7px" c="dimmed" style={{ letterSpacing: '2px' }}>VERIFICATION_STATUS:</Text>
                  <Text ff="var(--font-body)" size="xs" fw={700} c="deep-green.9">SECURE_PASS</Text>
                </Box>
                <Box>
                  <Text ff="var(--font-body)" size="7px" c="dimmed" style={{ letterSpacing: '2px' }}>OVERSIGHT_BY:</Text>
                  <Text ff="var(--font-body)" size="xs" fw={700}>MICAH S.</Text>
                </Box>
              </Group>
            </Stack>

            <Box style={{ border: '1px dashed #E0DBCC', padding: '24px', textAlign: 'center' }}>
              <ThemeIcon variant="light" color="deep-green.7" size={60} radius={0} mb="md">
                <IconFingerprint size={40} />
              </ThemeIcon>
              <Text ff="var(--font-body)" size="7px" c="dimmed" style={{ letterSpacing: '2px' }} mb={8}>DIGITAL_FINGERPRINT_ACTIVE</Text>
              <Text size="xs" c="dimmed">Drag any file here to verify its scientific integrity against our master record.</Text>
            </Box>
          </SimpleGrid>
        </Paper>
      </Stack>
    </Container>
  );
}
