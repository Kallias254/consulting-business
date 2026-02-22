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
  Divider
} from '@mantine/core';
import { 
  IconTrophy, 
  IconBook, 
  IconCircleCheck, 
  IconArrowNarrowRight,
  IconChartBar
} from '@tabler/icons-react';

export default function RecommendedOpportunitiesPage() {
  return (
    <Container size="xl" fluid>
      <Stack gap={40}>
        {/* 1. Page Header */}
        <Box>
          <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
            Academic <Text component="span" inherit c="burnished-gold.7">Intelligence</Text>
          </Title>
          <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
            Curated Opportunities // Peer-Review Scanning // Funding Alerts
          </Text>
        </Box>

        {/* 2. Top Pick: Strategic Recommendation from Micah */}
        <Paper withBorder p={40} radius={0} bg="white">
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={60}>
            <Stack gap="xl">
              <Badge color="burnished-gold" variant="filled" radius={0}>Principal&apos;s Top Match</Badge>
              <Title order={3} ff="var(--font-display)" size="2rem" style={{ textTransform: 'uppercase' }}>
                CFC: Routledge Handbook of <br /> Digital Sociology
              </Title>
              <Text size="sm" c="dimmed" style={{ lineHeight: 1.8 }}>
                &quot;Dr. Chen, your current work on Chapter 4 regarding digital environments aligns perfectly with Section 3 of this handbook. Contributing here would significantly boost your citation velocity within the social sciences beachhead.&quot; 
                <br /><br />
                <b>— Micah S., Principal Investigator</b>
              </Text>
              <Group>
                <Button color="deep-green" radius={0}>Request Pitch Draft</Button>
                <Button variant="outline" color="deep-green" radius={0}>View Call Details</Button>
              </Group>
            </Stack>

            <Box style={{ borderLeft: '1px solid var(--mantine-color-parchment-2)', paddingLeft: '40px' }}>
              <Title order={5} ff="var(--font-display)" mb="xl" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Opportunity Impact</Title>
              <Stack gap="md">
                <Group justify="space-between">
                  <Text size="xs" fw={700}>Projected Citations</Text>
                  <Text ff="var(--font-body)" size="xs" c="sage">+15-20 (Est.)</Text>
                </Group>
                <Divider color="parchment.1" />
                <Group justify="space-between">
                  <Text size="xs" fw={700}>Institutional Prestige</Text>
                  <Text ff="var(--font-body)" size="xs" c="burnished-gold">Top 5%</Text>
                </Group>
                <Divider color="parchment.1" />
                <Group justify="space-between">
                  <Text size="xs" fw={700}>Submission Complexity</Text>
                  <Text ff="var(--font-body)" size="xs" c="dimmed">Medium</Text>
                </Group>
              </Stack>
            </Box>
          </SimpleGrid>
        </Paper>

        <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="xl">
          {/* 3. The Opportunity Feed */}
          <Box style={{ gridColumn: 'span 2' }}>
            <Title order={4} ff="var(--font-display)" mb="xl" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
              Recommended Feed
            </Title>
            <Stack gap="md">
              <Card withBorder radius={0} p="xl">
                <Group justify="space-between" mb="md">
                  <Group gap="sm">
                    <ThemeIcon color="burnished-gold" variant="light" radius={0}><IconTrophy size={18} /></ThemeIcon>
                    <Text fw={700}>NSF Grant: Future of Social Dynamics</Text>
                  </Group>
                  <Badge color="orange" radius={0} size="xs">DEADLINE: 45D</Badge>
                </Group>
                <Text size="xs" c="dimmed" mb="lg">Funding for multi-year studies focusing on digital interaction patterns. Fits your 2026 research roadmap.</Text>
                <Button variant="subtle" color="deep-green" size="xs" p={0} rightSection={<IconArrowNarrowRight size={14} />}>Analyze Fit</Button>
              </Card>

              <Card withBorder radius={0} p="xl">
                <Group justify="space-between" mb="md">
                  <Group gap="sm">
                    <ThemeIcon color="deep-green" variant="light" radius={0}><IconBook size={18} /></ThemeIcon>
                    <Text fw={700}>Special Issue: AI & Society</Text>
                  </Group>
                  <Badge color="dimmed" radius={0} size="xs">ROLLING</Badge>
                </Group>
                <Text size="xs" c="dimmed" mb="lg">High-impact journal seeking qualitative data on AI adoption in education. Strong match for your dataset.</Text>
                <Button variant="subtle" color="deep-green" size="xs" p={0} rightSection={<IconArrowNarrowRight size={14} />}>Review Scope</Button>
              </Card>
            </Stack>
          </Box>

          {/* 4. Citation Impact Sidebar */}
          <Box>
            <Title order={4} ff="var(--font-display)" mb="xl" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
              Citation Impact
            </Title>
            <Paper withBorder radius={0} p="xl" bg="parchment.0">
              <Stack gap="xl">
                <Box>
                  <Group justify="space-between" mb={4}>
                    <Text size="xs" fw={700}>Google Scholar Sync</Text>
                    <IconCircleCheck size={14} color="var(--mantine-color-sage-0)" />
                  </Group>
                  <Text ff="var(--font-body)" size="xl" fw={700}>1,422</Text>
                  <Text size="7px" ff="var(--font-body)" c="sage">+12 THIS WEEK</Text>
                </Box>
                <Divider color="white" />
                <Box>
                  <Text size="xs" fw={700}>H-Index Verification</Text>
                  <Text ff="var(--font-body)" size="xl" fw={700}>24</Text>
                  <Text size="7px" ff="var(--font-body)" c="dimmed">LAST_AUDIT: 24H AGO</Text>
                </Box>
                <Button fullWidth color="deep-green" radius={0} size="xs" leftSection={<IconChartBar size={14} />}>
                  Download Scholarly Report
                </Button>
              </Stack>
            </Paper>
          </Box>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
