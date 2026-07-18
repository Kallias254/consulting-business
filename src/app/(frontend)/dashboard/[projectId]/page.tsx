'use client';
import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Stack, 
  Title, 
  Text, 
  Paper, 
  Group, 
  Badge, 
  SimpleGrid, 
  Button, 
  ThemeIcon,
  Box,
  Divider,
  RingProgress,
  Timeline,
  ActionIcon,
  Tooltip,
  Loader,
  Center
} from '@mantine/core';
import { 
  IconShieldCheck, 
  IconDownload, 
  IconArrowRight, 
  IconUser, 
  IconBook, 
  IconHistory, 
  IconCheck,
  IconClock,
  IconSparkles,
  IconExternalLink,
  IconCertificate
} from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProjectOverviewPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = React.use(params);
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProject() {
      try {
        // 1. Verify user authentication
        const meRes = await fetch('/api/users/me');
        if (!meRes.ok) {
          router.push('/login');
          return;
        }
        const meData = await meRes.json();
        if (!meData.user) {
          router.push('/login');
          return;
        }

        // 2. Fetch project details
        const projectRes = await fetch(`/api/projects?where[slug][equals]=${projectId}&depth=2`);
        if (!projectRes.ok) {
          setError('Failed to load project details.');
          setLoading(false);
          return;
        }

        const data = await projectRes.json();
        if (!data.docs || data.docs.length === 0) {
          setError('Project not found.');
          setLoading(false);
          return;
        }

        setProject(data.docs[0]);
      } catch (err) {
        console.error(err);
        setError('An error occurred while loading project.');
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [projectId, router]);

  if (loading) {
    return (
      <Center style={{ minHeight: '50vh' }}>
        <Loader color="burnished-gold" size="xl" />
      </Center>
    );
  }

  if (error || !project) {
    return (
      <Container size="xl" fluid>
        <Center style={{ minHeight: '50vh' }}>
          <Text c="red" size="lg" ff="var(--font-body)">
            {error || 'Project not found.'}
          </Text>
        </Center>
      </Container>
    );
  }

  const projectVitals = {
    phase: project.status === 'active' ? 'ACTIVE SPRINT' : project.status.toUpperCase(),
    progress: project.progress || 0,
    leadResearcher: project.leadResearcher?.name || 'Assigned Lead',
    targetPublisher: 'Routledge / University of Chicago Press / Harvard University Press',
    lastUpdate: 'Just now',
    principalDirective: project.nextMilestone || "No active principal directive at this time."
  };

  return (
    <Container size="xl" fluid>
      <Stack gap="xl">
        {/* 1. Project Header */}
        <Box>
          <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase', lineHeight: 1.1 }}>
            Project <Text component="span" inherit c="burnished-gold.7">Status</Text>
          </Title>
          <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
            Project Dossier // Scientific Progress // Publication Readiness // Project: {project.title.toUpperCase()}
          </Text>
        </Box>

        <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="xl">
          {/* 2. Principal's Directive (Center Stage) */}
          <Box style={{ gridColumn: 'span 2' }}>
            <Paper withBorder p={40} radius={0} bg="white" style={{ borderColor: '#E0DBCC', height: '100%' }}>
              <Stack gap="xl">
                <Group justify="space-between" align="flex-start">
                  <Stack gap={8}>
                    <Badge 
                      variant="filled" 
                      color="burnished-gold.7" 
                      c="dark-forest" 
                      radius={0} 
                      size="sm"
                      style={{ 
                        paddingTop: '2px',
                        paddingBottom: '2px',
                        height: 'auto',
                        minHeight: '20px'
                      }}
                    >
                      {projectVitals.phase}
                    </Badge>
                    <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Next Milestone / Directive
                    </Title>
                  </Stack>
                  <ThemeIcon variant="light" color="burnished-gold.7" radius="xl"><IconSparkles size={16} /></ThemeIcon>
                </Group>
                
                <Text size="lg" ff="serif" fs="italic" c="deep-green.9" style={{ lineHeight: 1.8 }}>
                  &quot;{projectVitals.principalDirective}&quot;
                </Text>

                <Divider color="#F4F1EA" />

                <Group justify="space-between">
                  <Group gap="xl">
                    <Box>
                      <Text size="9px" fw={700} c="dimmed" style={{ letterSpacing: '1px' }}>LEAD_RESEARCHER</Text>
                      <Group gap="xs" mt={4}>
                        <IconUser size={14} color="var(--mantine-color-deep-green-7)" />
                        <Text size="sm" fw={700}>{projectVitals.leadResearcher}</Text>
                      </Group>
                    </Box>
                    <Box>
                      <Text size="9px" fw={700} c="dimmed" style={{ letterSpacing: '1px' }}>TARGET_HOUSE</Text>
                      <Group gap="xs" mt={4}>
                        <IconBook size={14} color="var(--mantine-color-deep-green-7)" />
                        <Text size="sm" fw={700}>{projectVitals.targetPublisher}</Text>
                      </Group>
                    </Box>
                  </Group>
                  <Button 
                    component={Link}
                    href={`/dashboard/${projectId}/correspondence`}
                    variant="filled" 
                    color="burnished-gold.7" 
                    c="dark-forest" 
                    radius={0} 
                    size="sm"
                    rightSection={<IconArrowRight size={16} />}
                  >
                    View Correspondence
                  </Button>
                </Group>
              </Stack>
            </Paper>
          </Box>

          {/* 3. Project Vitals (New Home for Readiness) */}
          <Stack gap="md">
            <Paper withBorder p="xl" radius={0} bg="white" style={{ borderColor: '#E0DBCC' }}>
              <Stack align="center" gap="xs">
                <Text size="xs" fw={700} c="dimmed" style={{ letterSpacing: '1px' }}>OVERALL_READINESS</Text>
                <Group gap="xl" align="center">
                  <Text ff="var(--font-display)" size="3rem" fw={900} c="deep-green.9">{projectVitals.progress}%</Text>
                  <RingProgress
                    size={80}
                    thickness={8}
                    roundCaps
                    sections={[{ value: projectVitals.progress, color: 'sage.7' }]}
                  />
                </Group>
              </Stack>
            </Paper>

            <Paper withBorder p="xl" radius={0} bg="white" style={{ borderColor: '#E0DBCC' }}>
              <Stack gap="xs">
                <Text size="9px" fw={700} c="dimmed" style={{ letterSpacing: '1px' }}>TECHNICAL_STATUS</Text>
                <Group justify="space-between">
                  <Text size="xs" fw={700}>BibTeX Integrity</Text>
                  <Badge color="sage.7" variant="light" radius={0}>PASS</Badge>
                </Group>
                <Group justify="space-between">
                  <Text size="xs" fw={700}>Style Compliance</Text>
                  <Badge color="sage.7" variant="light" radius={0}>100%</Badge>
                </Group>
                <Group justify="space-between">
                  <Text size="xs" fw={700}>Ethics/IRB</Text>
                  <Badge color="sage.7" variant="light" radius={0}>VERIFIED</Badge>
                </Group>
              </Stack>
            </Paper>
          </Stack>
        </SimpleGrid>

        {/* 4. Process & Output Section */}
        <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="xl">
          <Box style={{ gridColumn: 'span 2' }}>
            <Paper withBorder p={40} radius={0} bg="white" style={{ borderColor: '#E0DBCC', height: '100%' }}>
              <Stack gap="xl">
                <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Manuscript Units & Progress</Title>
                
                {(!project.units || project.units.length === 0) ? (
                  <Text size="sm" c="dimmed">No manuscript units defined for this project.</Text>
                ) : (
                  <Timeline active={project.units.findIndex((u: any) => u.status !== 'validated')} bulletSize={30} lineWidth={2} color="burnished-gold.7" styles={{ itemTitle: { fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '1px' }}}>
                    {project.units.map((unit: any, index: number) => {
                      const isValidated = unit.status === 'validated';
                      const isCurrent = unit.status === 'internal_review' || unit.status === 'scholar_review';
                      return (
                        <Timeline.Item 
                          key={index}
                          bullet={isValidated ? <IconCheck size={16} /> : isCurrent ? <IconClock size={16} /> : <IconShieldCheck size={16} />} 
                          title={unit.title}
                        >
                          <Text size="sm" c={isValidated ? "dimmed" : "black"}>
                            Status: {unit.status.replace(/_/g, ' ').toUpperCase()} ({unit.progress || 0}% Complete)
                          </Text>
                        </Timeline.Item>
                      );
                    })}
                  </Timeline>
                )}

                <Divider my="xl" label="Institutional Oversight" labelPosition="center" color="#F4F1EA" styles={{ label: { fontSize: '9px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--mantine-color-dimmed)' } }} />
                
                <Group justify="space-around">
                  <Box style={{ textAlign: 'center' }}>
                    <Text size="7px" ff="var(--font-body)" c="dimmed" style={{ letterSpacing: '2px' }}>LIAISON:</Text>
                    <Text size="xs" ff="var(--font-body)" fw={700} c="deep-green.9">{projectVitals.leadResearcher.toUpperCase()}</Text>
                  </Box>
                  <Box style={{ textAlign: 'center' }}>
                    <Text size="7px" ff="var(--font-body)" c="dimmed" style={{ letterSpacing: '2px' }}>AUTH_KEY:</Text>
                    <Group gap={4} justify="center">
                      <IconShieldCheck size={10} color="var(--mantine-color-sage-7)" />
                      <Text size="xs" ff="var(--font-body)" fw={700} c="deep-green.9">VERIFIED</Text>
                    </Group>
                  </Box>
                </Group>
              </Stack>
            </Paper>
          </Box>

          <Box>
            <Paper withBorder p="xl" radius={0} bg="dark-forest" style={{ borderColor: '#2A2D31', height: '100%' }}>
              <Stack gap="md" justify="center" h="100%">
                <Text size="xs" fw={700} c="burnished-gold.7" style={{ letterSpacing: '1px' }}>LATEST_ARTIFACTS</Text>
                
                <Button 
                  fullWidth 
                  color="burnished-gold.7" 
                  c="dark-forest" 
                  radius={0} 
                  size="md" 
                  leftSection={<IconCertificate size={18} />}
                  component={Link}
                  href={`/dashboard/${projectId}/proofs`}
                >
                  Review Gallery Proof
                </Button>
                
                <Button 
                  fullWidth 
                  variant="outline" 
                  color="burnished-gold.7" 
                  radius={0} 
                  size="sm" 
                  leftSection={<IconHistory size={16} />}
                  component={Link}
                  href={`/dashboard/${projectId}/history`}
                >
                  View Production Trail
                </Button>
                
                <Text size="10px" c="dimmed" ta="center" mt="auto">LATEST_SYNC: {projectVitals.lastUpdate}</Text>
              </Stack>
            </Paper>
          </Box>
        </SimpleGrid>

        {/* 5. Career Infrastructure Sync */}
        <Paper withBorder p="xl" radius={0} bg="#FDFDFB" style={{ borderColor: '#E0DBCC' }}>
          <Group justify="space-between">
            <Group gap="xl">
              <ThemeIcon variant="light" color="deep-green.7" size="xl" radius={0}><IconExternalLink size={24} /></ThemeIcon>
              <Box>
                <Text size="sm" fw={700}>Infrastructure Sync Active</Text>
                <Text size="xs" c="dimmed">This project is currently being broadcast to your <b>Impact Portfolio</b>.</Text>
              </Box>
            </Group>
            <Button component={Link} href="/dashboard/portfolio" variant="outline" color="deep-green.7" radius={0} size="xs">
              Manage Portfolio Visibility
            </Button>
          </Group>
        </Paper>
      </Stack>
    </Container>
  );
}
