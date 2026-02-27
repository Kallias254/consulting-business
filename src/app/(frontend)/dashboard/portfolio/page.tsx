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
  List,
  Center
} from '@mantine/core';
import { 
  IconExternalLink,
  IconCircleCheck,
  IconDeviceDesktop,
  IconHistory,
  IconWorld,
  IconChartBar,
  IconArrowRight,
  IconCheck,
  IconFingerprint,
  IconRocket
} from '@tabler/icons-react';
import Link from 'next/link';

export default function ImpactPortfolioPage() {
  const [hasStarted, setHasStarted] = React.useState(false);

  // 1. Splash / Invitation View (Locked/Inactive State)
  if (!hasStarted) {
    return (
      <Container size="md" py={120}>
        <Center>
          <Stack align="center" gap={40} style={{ textAlign: 'center' }}>
            <Box style={{ position: 'relative' }}>
              <IconWorld size={80} color="var(--mantine-color-burnished-gold-7)" stroke={1} />
            </Box>
            
            <Stack gap="sm">
              <Title ff="var(--font-display)" size="3.5rem" style={{ textTransform: 'uppercase', letterSpacing: '2px', lineHeight: 1.1 }}>
                Impact <Text component="span" inherit c="burnished-gold.7">Portfolio</Text>
              </Title>
              <Text c="dimmed" ff="var(--font-body)" size="lg" style={{ maxWidth: 600 }}>
                Your Digital Flagship. A prestige professional presence that syncs with your career momentum.
              </Text>
            </Stack>

            <Divider w={100} color="burnished-gold.7" size="md" />

            <Paper p={50} withBorder radius={0} bg="white" style={{ borderColor: '#E0DBCC', boxShadow: '0 20px 40px rgba(0,0,0,0.03)' }}>
              <Stack gap="xl">
                <Text size="md" ff="var(--font-body)" fw={600} c="deep-green.9" italic>
                  &quot;We don't just build a website; we architect a professional presence that ensures your work is seen by the right peers.&quot;
                </Text>
                
                <Stack gap="md" align="flex-start" mb="md">
                  <Group gap="sm" align="flex-start" wrap="nowrap">
                    <ThemeIcon color="burnished-gold.7" variant="light" radius="xl" size="sm" mt={4}><IconFingerprint size={12} /></ThemeIcon>
                    <Box style={{ textAlign: 'left' }}>
                      <Text fw={700} size="sm" ff="var(--font-body)">SOVEREIGN HOSTING</Text>
                      <Text size="xs" c="dimmed">You own your domain and your data. No third-party platform lock-in or &quot;Success Taxes&quot; on your records.</Text>
                    </Box>
                  </Group>
                  <Group gap="sm" align="flex-start" wrap="nowrap">
                    <ThemeIcon color="burnished-gold.7" variant="light" radius="xl" size="sm" mt={4}><IconRocket size={12} /></ThemeIcon>
                    <Box style={{ textAlign: 'left' }}>
                      <Text fw={700} size="sm" ff="var(--font-body)">ZERO-FRICTION SYNC</Text>
                      <Text size="xs" c="dimmed">Updates to your Academic Dossier broadcast to your public site automatically. Forward an email; your site updates.</Text>
                    </Box>
                  </Group>
                  <Group gap="sm" align="flex-start" wrap="nowrap">
                    <ThemeIcon color="burnished-gold.7" variant="light" radius="xl" size="sm" mt={4}><IconWorld size={12} /></ThemeIcon>
                    <Box style={{ textAlign: 'left' }}>
                      <Text fw={700} size="sm" ff="var(--font-body)">SCHOLAR-FIRST SEO</Text>
                      <Text size="xs" c="dimmed">Built for Google Scholar and ResearchGate, ensuring your research is discoverable by hiring and grant committees.</Text>
                    </Box>
                  </Group>
                </Stack>

                <Button 
                  size="xl" 
                  radius={0} 
                  color="burnished-gold.7" 
                  c="dark-forest"
                  fullWidth
                  rightSection={<IconArrowRight size={20} />}
                  onClick={() => setHasStarted(true)}
                  styles={{ root: { height: 64, fontSize: '1.1rem', letterSpacing: '1px' }}}
                >
                  Deploy Impact Portfolio
                </Button>
                <Text size="xs" c="dimmed">REQUIRES ACTIVE CAREER INFRASTRUCTURE RETAINER</Text>
              </Stack>
            </Paper>
          </Stack>
        </Center>
      </Container>
    );
  }

  // 2. Active View (The Portfolio Dashboard)
  return (
    <Container size="xl" fluid>
      <Stack gap={40}>
        {/* 1. Page Header */}
        <Box>
          <Group justify="space-between" align="flex-end">
            <Box>
              <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
                Impact <Text component="span" inherit c="burnished-gold.7">Portfolio</Text>
              </Title>
              <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
                Automated Academic Presence // Public Site Status: ONLINE // Last Global Sync: 2h ago
              </Text>
            </Box>
            <Badge color="sage.7" variant="light" radius={0} size="lg" p="md" leftSection={<IconWorld size={16} />}>
              DEPLOYMENT_LIVE
            </Badge>
          </Group>
        </Box>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={40}>
          {/* 2. Site Preview Card */}
          <Paper withBorder radius={0} p={40} bg="white" style={{ borderColor: '#E0DBCC' }}>
            <Stack gap="xl">
              <Group justify="space-between">
                <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Current Deployment</Title>
                <Badge color="sage.7" variant="filled" radius={0}>LIVE_PROD</Badge>
              </Group>
              
              <Box style={{ border: '1px solid #E0DBCC', position: 'relative' }}>
                <Box p="xs" bg="#F4F1EA" style={{ borderBottom: '1px solid #E0DBCC' }}>
                  <Group gap={4}>
                    <Box w={8} h={8} bg="#E57373" style={{ borderRadius: '50%' }} />
                    <Box w={8} h={8} bg="#FFB74D" style={{ borderRadius: '50%' }} />
                    <Box w={8} h={8} bg="#81C784" style={{ borderRadius: '50%' }} />
                    <Box bg="white" px={8} py={2} ml={8} style={{ border: '1px solid #E0DBCC', borderRadius: '4px', flex: 1 }}>
                      <Text size="7px" ff="var(--font-body)" c="dimmed">https://dr-emily-chen.scholar.com</Text>
                    </Box>
                  </Group>
                </Box>
                <Box h={200} bg="white" p="xl" style={{ overflow: 'hidden' }}>
                  <Stack gap="xs">
                    <Title order={5} ff="var(--font-display)" size="1rem">DR. EMILY CHEN</Title>
                    <Text size="7px" c="dimmed" ff="var(--font-body)">ASSOCIATE PROFESSOR // BEHAVIORAL ECONOMICS</Text>
                    <Divider color="#F4F1EA" />
                    <Text size="8px" lineClamp={3} style={{ lineHeight: 1.6, fontFamily: 'serif' }}>My research explores the intersection of digital environments and human decision-making processes. Using a combination of qualitative and quantitative methodologies, I map the linguistic patterns of authority...</Text>
                    <Group gap={4} mt="md">
                      <Box w={40} h={4} bg="deep-green.7" />
                      <Box w={30} h={4} bg="burnished-gold.7" />
                    </Group>
                  </Stack>
                </Box>
              </Box>

              <Group grow gap="md">
                <Button variant="outline" color="deep-green.7" radius={0} size="md" leftSection={<IconExternalLink size={16} />}>
                  View Public Site
                </Button>
                <Button color="deep-green.7" radius={0} size="md" leftSection={<IconDeviceDesktop size={16} />}>
                  Manage Domain
                </Button>
              </Group>
            </Stack>
          </Paper>

          {/* 3. SEO & Sync Stats */}
          <Stack gap="xl">
            <Paper withBorder radius={0} p={40} bg="white" style={{ borderColor: '#E0DBCC' }}>
              <Title order={4} ff="var(--font-display)" mb="xl" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                Automated Update Feed
              </Title>
              <List 
                spacing="md" 
                size="sm" 
                icon={
                  <ThemeIcon color="sage.7" size={20} radius={0} variant="light">
                    <IconCircleCheck size={14} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <Text size="sm" fw={700}>Project &quot;Digital Spaces&quot; toggled to PUBLIC</Text>
                  <Text size="xs" c="dimmed" ff="var(--font-body)">Synced to Portfolio // 2h ago</Text>
                </List.Item>
                <List.Item>
                  <Text size="sm" fw={700}>New Event: International Economics Forum</Text>
                  <Text size="xs" c="dimmed" ff="var(--font-body)">Synced from Dossier records // 1d ago</Text>
                </List.Item>
                <List.Item>
                  <Text size="sm" fw={700}>Citation Audit: +14 new mentions</Text>
                  <Text size="xs" c="dimmed" ff="var(--font-body)">Crossref & Scholar Sync // 3d ago</Text>
                </List.Item>
              </List>
            </Paper>

            <Paper withBorder radius={0} p="xl" bg="dark-forest">
              <Group justify="space-between" mb="xs">
                <Text ff="var(--font-body)" size="9px" c="burnished-gold.7" fw={700} style={{ letterSpacing: '2px' }}>SEO_INTEGRITY</Text>
                <Badge color="sage.7" variant="outline" size="xs" radius={0}>OPTIMIZED</Badge>
              </Group>
              <Text size="xs" c="dimmed" style={{ lineHeight: 1.6 }} ff="var(--font-body)">
                Your research outputs are indexed daily for academic search engines (Google Scholar, ResearchGate). Metadata structure is currently following Nature/Science standard formats.
              </Text>
            </Paper>
          </Stack>
        </SimpleGrid>

        {/* 4. Sync Configuration */}
        <Paper withBorder p={40} radius={0} bg="white" style={{ borderColor: '#E0DBCC' }}>
          <Title order={4} ff="var(--font-display)" mb="xl" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Portfolio Governance</Title>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
            <Card withBorder radius={0} p="md" bg="#FDFDFB" style={{ borderColor: '#E0DBCC' }}>
              <Group justify="space-between" mb="md">
                <Text size="xs" fw={700} ff="var(--font-body)">SHOW_IN_PROGRESS</Text>
                <Badge color="deep-green.7" size="xs" radius={0}>ACTIVE</Badge>
              </Group>
              <Text size="xs" c="dimmed">Displays your current working status for non-confidential projects to demonstrate momentum to peers.</Text>
            </Card>
            <Card withBorder radius={0} p="md" bg="#FDFDFB" style={{ borderColor: '#E0DBCC' }}>
              <Group justify="space-between" mb="md">
                <Text size="xs" fw={700} ff="var(--font-body)">BIO_SYNC_ACTIVE</Text>
                <Badge color="deep-green.7" size="xs" radius={0}>ACTIVE</Badge>
              </Group>
              <Text size="xs" c="dimmed">Automatically updates your public site bio based on your latest Dossier records and grant successes.</Text>
            </Card>
            <Card withBorder radius={0} p="md" bg="#FDFDFB" style={{ borderColor: '#E0DBCC' }}>
              <Group justify="space-between" mb="md">
                <Text size="xs" fw={700} ff="var(--font-body)">INDEXING_LATENCY</Text>
                <Badge color="sage.7" size="xs" radius={0}>0ms</Badge>
              </Group>
              <Text size="xs" c="dimmed">Maintains your profile indexing across academic networks with real-time metadata broadcasting.</Text>
            </Card>
          </SimpleGrid>
        </Paper>
      </Stack>
    </Container>
  );
}
