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
  Center
} from '@mantine/core';
import { 
  IconTrophy, 
  IconBook, 
  IconCircleCheck, 
  IconArrowNarrowRight,
  IconChartBar,
  IconTarget,
  IconArrowRight,
  IconCheck,
  IconSearch,
  IconClock,
  IconSparkles
} from '@tabler/icons-react';
import Link from 'next/link';

export default function OpportunityEnginePage() {
  const [hasStarted, setHasStarted] = React.useState(false);

  // 1. Splash / Invitation View (Locked/Inactive State)
  if (!hasStarted) {
    return (
      <Container size="md" py={120}>
        <Center>
          <Stack align="center" gap={40} style={{ textAlign: 'center' }}>
            <Box style={{ position: 'relative' }}>
              <IconTarget size={80} color="var(--mantine-color-burnished-gold-7)" stroke={1} />
            </Box>
            
            <Stack gap="sm">
              <Title ff="var(--font-display)" size="3.5rem" style={{ textTransform: 'uppercase', letterSpacing: '2px', lineHeight: 1.1 }}>
                Opportunity <Text component="span" inherit c="burnished-gold.7">Engine</Text>
              </Title>
              <Text c="dimmed" ff="var(--font-body)" size="lg" style={{ maxWidth: 600 }}>
                Automated career vigilance for the elite scholar. Never miss a $100k grant or a prestige publishing call.
              </Text>
            </Stack>

            <Divider w={100} color="burnished-gold.7" size="md" />

            <Paper p={50} withBorder radius={0} bg="white" style={{ borderColor: '#E0DBCC', boxShadow: '0 20px 40px rgba(0,0,0,0.03)' }}>
              <Stack gap="xl">
                <Text size="md" ff="var(--font-body)" fw={600} c="deep-green.9" italic>
                  &quot;This engine scans global funding bodies and prestigious presses specifically for your research niche.&quot;
                </Text>
                
                <Stack gap="md" align="flex-start" mb="md">
                  <Group gap="sm" align="flex-start" wrap="nowrap">
                    <ThemeIcon color="burnished-gold.7" variant="light" radius="xl" size="sm" mt={4}><IconSearch size={12} /></ThemeIcon>
                    <Box style={{ textAlign: 'left' }}>
                      <Text fw={700} size="sm" ff="var(--font-body)">STRATEGIC MATCHMAKING</Text>
                      <Text size="xs" c="dimmed">Our team scans for grants and fellowships that align perfectly with your career roadmap.</Text>
                    </Box>
                  </Group>
                  <Group gap="sm" align="flex-start" wrap="nowrap">
                    <ThemeIcon color="burnished-gold.7" variant="light" radius="xl" size="sm" mt={4}><IconClock size={12} /></ThemeIcon>
                    <Box style={{ textAlign: 'left' }}>
                      <Text fw={700} size="sm" ff="var(--font-body)">TIMELINE VIGILANCE</Text>
                      <Text size="xs" c="dimmed">Receive strategic alerts 90 days before high-stakes deadlines, giving you a competitive head start.</Text>
                    </Box>
                  </Group>
                  <Group gap="sm" align="flex-start" wrap="nowrap">
                    <ThemeIcon color="burnished-gold.7" variant="light" radius="xl" size="sm" mt={4}><IconBook size={12} /></ThemeIcon>
                    <Box style={{ textAlign: 'left' }}>
                      <Text fw={700} size="sm" ff="var(--font-body)">CFP & HANDBOOK SCANNING</Text>
                      <Text size="xs" c="dimmed">Automated monitoring of Routledge, CRC Press, and Elsevier for special issues and handbook chapters.</Text>
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
                  Activate Intelligence Feed
                </Button>
                <Text size="xs" c="dimmed">REQUIRES ACTIVE CAREER INFRASTRUCTURE RETAINER</Text>
              </Stack>
            </Paper>
          </Stack>
        </Center>
      </Container>
    );
  }

  // 2. Active View (The Engine Dashboard)
  return (
    <Container size="xl" fluid>
      <Stack gap={40}>
        {/* 1. Page Header */}
        <Box>
          <Group justify="space-between" align="flex-end">
            <Box>
              <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
                Opportunity <Text component="span" inherit c="burnished-gold.7">Engine</Text>
              </Title>
              <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
                Curated Opportunities // Peer-Review Scanning // Funding Alerts: ACTIVE
              </Text>
            </Box>
            <Badge color="sage.7" variant="light" radius={0} size="lg" p="md" leftSection={<IconTarget size={16} />}>
              SCANNING_LIVE
            </Badge>
          </Group>
        </Box>

        {/* 2. Top Pick: Strategic Recommendation from Micah */}
        <Paper withBorder p={40} radius={0} bg="white" style={{ borderColor: '#E0DBCC' }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={60}>
            <Stack gap="xl">
              <Badge color="burnished-gold" variant="filled" radius={0}>Principal&apos;s Top Match</Badge>
              <Title order={3} ff="var(--font-display)" size="2rem" style={{ textTransform: 'uppercase', lineHeight: 1.1 }}>
                CFC: Routledge Handbook of <br /> Digital Sociology
              </Title>
              <Text size="sm" c="deep-green.9" style={{ lineHeight: 1.8, fontStyle: 'italic' }}>
                &quot;Dr. Chen, your current work on Chapter 4 regarding digital environments aligns perfectly with Section 3 of this handbook. Contributing here would significantly boost your citation velocity within the social sciences beachhead.&quot; 
                <br /><br />
                <b>— Micah S., Principal Investigator</b>
              </Text>
              <Group>
                <Button color="burnished-gold.7" c="dark-forest" radius={0} leftSection={<IconSparkles size={16} />}>Request Pitch Draft</Button>
                <Button variant="outline" color="deep-green.7" radius={0}>View Call Details</Button>
              </Group>
            </Stack>

            <Box style={{ borderLeft: '1px solid #F4F1EA', paddingLeft: '40px' }}>
              <Title order={5} ff="var(--font-display)" mb="xl" style={{ textTransform: 'uppercase', letterSpacing: '2px' }}>Opportunity Impact</Title>
              <Stack gap="md">
                <Group justify="space-between">
                  <Text size="xs" fw={700} ff="var(--font-body)">PROJECTED CITATIONS</Text>
                  <Text ff="var(--font-body)" size="xs" fw={700} c="sage.7">+15-20 (EST.)</Text>
                </Group>
                <Divider color="#F4F1EA" />
                <Group justify="space-between">
                  <Text size="xs" fw={700} ff="var(--font-body)">INSTITUTIONAL PRESTIGE</Text>
                  <Text ff="var(--font-body)" size="xs" fw={700} c="burnished-gold.7">TOP 5%</Text>
                </Group>
                <Divider color="#F4F1EA" />
                <Group justify="space-between">
                  <Text size="xs" fw={700} ff="var(--font-body)">SUBMISSION COMPLEXITY</Text>
                  <Text ff="var(--font-body)" size="xs" fw={700} c="dimmed">MODERATE</Text>
                </Group>
              </Stack>
            </Box>
          </SimpleGrid>
        </Paper>

        <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="xl">
          {/* 3. The Opportunity Feed */}
          <Box style={{ gridColumn: 'span 2' }}>
            <Title order={4} ff="var(--font-display)" mb="xl" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
              Strategic Feed
            </Title>
            <Stack gap="md">
              <Card withBorder radius={0} p="xl" bg="white" style={{ borderColor: '#E0DBCC' }}>
                <Group justify="space-between" mb="md">
                  <Group gap="sm">
                    <ThemeIcon color="burnished-gold" variant="light" radius={0}><IconTrophy size={18} /></ThemeIcon>
                    <Text fw={700} ff="var(--font-body)">NSF Grant: Future of Social Dynamics</Text>
                  </Group>
                  <Badge color="orange" radius={0} size="xs" variant="filled">DEADLINE: 45D</Badge>
                </Group>
                <Text size="xs" c="dimmed" ff="var(--font-body)" mb="lg">Funding for multi-year studies focusing on digital interaction patterns. Fits your 2026 research roadmap.</Text>
                <Button variant="subtle" color="deep-green" size="xs" p={0} rightSection={<IconArrowNarrowRight size={14} />}>Analyze Fit</Button>
              </Card>

              <Card withBorder radius={0} p="xl" bg="white" style={{ borderColor: '#E0DBCC' }}>
                <Group justify="space-between" mb="md">
                  <Group gap="sm">
                    <ThemeIcon color="deep-green" variant="light" radius={0}><IconBook size={18} /></ThemeIcon>
                    <Text fw={700} ff="var(--font-body)">Special Issue: AI & Society</Text>
                  </Group>
                  <Badge color="gray" radius={0} size="xs" variant="outline">ROLLING</Badge>
                </Group>
                <Text size="xs" c="dimmed" ff="var(--font-body)" mb="lg">High-impact journal seeking qualitative data on AI adoption in education. Strong match for your dataset.</Text>
                <Button variant="subtle" color="deep-green" size="xs" p={0} rightSection={<IconArrowNarrowRight size={14} />}>Review Scope</Button>
              </Card>
            </Stack>
          </Box>

          {/* 4. Citation Impact Sidebar */}
          <Box>
            <Title order={4} ff="var(--font-display)" mb="xl" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
              Metric Tracking
            </Title>
            <Paper withBorder radius={0} p="xl" bg="white" style={{ borderColor: '#E0DBCC' }}>
              <Stack gap="xl">
                <Box>
                  <Group justify="space-between" mb={4}>
                    <Text size="xs" fw={700} ff="var(--font-body)">GOOGLE SCHOLAR SYNC</Text>
                    <IconCircleCheck size={14} color="var(--mantine-color-sage-7)" />
                  </Group>
                  <Text ff="var(--font-body)" size="xl" fw={700} c="deep-green.9">1,422</Text>
                  <Text size="xs" ff="var(--font-body)" c="sage.7" fw={700}>+12 THIS WEEK</Text>
                </Box>
                <Divider color="#F4F1EA" />
                <Box>
                  <Text size="xs" fw={700} ff="var(--font-body)">H-INDEX VERIFICATION</Text>
                  <Text ff="var(--font-body)" size="xl" fw={700} c="deep-green.9">24</Text>
                  <Text size="xs" ff="var(--font-body)" c="dimmed" fw={700}>LAST_AUDIT: 24H AGO</Text>
                </Box>
                <Button fullWidth color="deep-green.7" radius={0} size="md" leftSection={<IconChartBar size={14} />}>
                  Export Impact Report
                </Button>
              </Stack>
            </Paper>
          </Box>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
