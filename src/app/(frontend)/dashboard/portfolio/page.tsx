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
  ThemeIcon,
  Box,
  Divider,
  List
} from '@mantine/core';
import { 
  IconExternalLink,
  IconCircleCheck,
  IconDeviceDesktop
} from '@tabler/icons-react';

export default function LivingPortfolioPage() {
  return (
    <Container size="xl" fluid>
      <Stack gap={40}>
        {/* 1. Page Header */}
        <Box>
          <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
            Living <Text component="span" inherit c="burnished-gold.7">Portfolio</Text>
          </Title>
          <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
            Automated Academic Presence // Site Status: ONLINE // Last Sync: 2h ago
          </Text>
        </Box>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={40}>
          {/* 2. Site Preview Card */}
          <Paper withBorder radius={0} p={40} bg="white">
            <Stack gap="xl">
              <Group justify="space-between">
                <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase' }}>Current Deployment</Title>
                <Badge color="sage" variant="filled" radius={0}>LIVE_PROD</Badge>
              </Group>
              
              <Box style={{ border: '1px solid var(--mantine-color-parchment-2)', position: 'relative' }}>
                <Box p="xs" bg="parchment.0" style={{ borderBottom: '1px solid var(--mantine-color-parchment-2)' }}>
                  <Group gap={4}>
                    <Box w={8} h={8} bg="red" style={{ borderRadius: '50%' }} />
                    <Box w={8} h={8} bg="orange" style={{ borderRadius: '50%' }} />
                    <Box w={8} h={8} bg="sage" style={{ borderRadius: '50%' }} />
                    <Box bg="white" px={8} py={2} ml={8} style={{ border: '1px solid #e0ddd5', borderRadius: '4px', flex: 1 }}>
                      <Text size="7px" ff="var(--font-body)" c="dimmed">https://dr-emily-chen.scholar.com</Text>
                    </Box>
                  </Group>
                </Box>
                <Box h={200} bg="white" p="xl" style={{ overflow: 'hidden' }}>
                  <Stack gap="xs">
                    <Title order={5} ff="var(--font-display)" size="1rem">DR. EMILY CHEN</Title>
                    <Text size="7px" c="dimmed">ASSOCIATE PROFESSOR // BEHAVIORAL ECONOMICS</Text>
                    <Divider color="parchment.1" />
                    <Text size="8px" lineClamp={3}>My research explores the intersection of digital environments and human decision-making processes. Using a combination of qualitative and quantitative methodologies...</Text>
                    <Group gap="xs" mt="md">
                      <Box w={40} h={4} bg="deep-green.7" />
                      <Box w={30} h={4} bg="burnished-gold.7" />
                    </Group>
                  </Stack>
                </Box>
              </Box>

              <Group grow gap="md">
                <Button variant="outline" color="deep-green" radius={0} leftSection={<IconExternalLink size={16} />}>
                  View Public Site
                </Button>
                <Button color="deep-green" radius={0} leftSection={<IconDeviceDesktop size={16} />}>
                  Custom Domain
                </Button>
              </Group>
            </Stack>
          </Paper>

          {/* 3. Sync Controls & Assets */}
          <Stack gap="xl">
            <Paper withBorder radius={0} p={40} bg="white">
              <Title order={4} ff="var(--font-display)" mb="xl" style={{ textTransform: 'uppercase' }}>
                Automated Update Feed
              </Title>
              <List 
                spacing="md" 
                size="sm" 
                icon={
                  <ThemeIcon color="sage" size={20} radius={0} variant="light">
                    <IconCircleCheck size={14} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <Text size="sm">Project &quot;Digital Spaces&quot; toggled to <b>Public</b></Text>
                  <Text size="xs" c="dimmed">Synced to Portfolio // 2h ago</Text>
                </List.Item>
                <List.Item>
                  <Text size="sm">New Talk: <b>International Economics Forum</b></Text>
                  <Text size="xs" c="dimmed">Synced from project correspondence // 1d ago</Text>
                </List.Item>
                <List.Item>
                  <Text size="sm">Citations Updated: <b>+14 new mentions</b></Text>
                  <Text size="xs" c="dimmed">Crossref Sync // 3d ago</Text>
                </List.Item>
              </List>
            </Paper>

            <Paper withBorder radius={0} p="xl" bg="dark-forest">
              <Group justify="space-between" mb="xs">
                <Text ff="var(--font-body)" size="xs" c="burnished-gold">SCHOLARLY_SEO_STATUS</Text>
                <Badge color="sage" variant="outline" size="xs">OPTIMIZED</Badge>
              </Group>
              <Text size="xs" c="dimmed" style={{ lineHeight: 1.6 }}>
                Your research outputs are indexed daily for academic search engines (Google Scholar, ResearchGate). Metadata structure is currently following Nature/Science standard formats.
              </Text>
            </Paper>
          </Stack>
        </SimpleGrid>

        {/* 4. Momentum Toggles */}
        <Paper withBorder p={40} radius={0}>
          <Title order={4} ff="var(--font-display)" mb="xl" style={{ textTransform: 'uppercase' }}>Portfolio Configuration</Title>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
            <Card withBorder radius={0} p="md" bg="parchment.0">
              <Group justify="space-between" mb="md">
                <Text size="xs" fw={700}>Show &quot;In-Progress&quot;</Text>
                <Badge color="deep-green" size="xs">ON</Badge>
              </Group>
              <Text size="xs" c="dimmed">Displays your current working status for non-confidential projects to show momentum.</Text>
            </Card>
            <Card withBorder radius={0} p="md" bg="parchment.0">
              <Group justify="space-between" mb="md">
                <Text size="xs" fw={700}>Automated Bio-Sync</Text>
                <Badge color="deep-green" size="xs">ON</Badge>
              </Group>
              <Text size="xs" c="dimmed">Updates your site bio based on your latest published work and grant successes.</Text>
            </Card>
            <Card withBorder radius={0} p="md" bg="parchment.0">
              <Group justify="space-between" mb="md">
                <Text size="xs" fw={700}>Custom Bibliography</Text>
                <Badge color="gray" size="xs">OFF</Badge>
              </Group>
              <Text size="xs" c="dimmed">Allows manual override of your publication list (defaults to ORCID sync).</Text>
            </Card>
          </SimpleGrid>
        </Paper>
      </Stack>
    </Container>
  );
}
