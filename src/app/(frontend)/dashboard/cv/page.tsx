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
  Button, 
  ThemeIcon,
  Box,
  Divider,
  ActionIcon,
  Tooltip,
  UnstyledButton,
  Tabs,
  Textarea,
  FileButton,
  Center,
  Stepper
} from '@mantine/core';
import { 
  IconDownload, 
  IconLayoutGrid, 
  IconRefresh, 
  IconSparkles, 
  IconUserCircle, 
  IconSchool, 
  IconTrophy, 
  IconBriefcase, 
  IconShieldCheck, 
  IconUpload, 
  IconNotes,
  IconCircleCheck,
  IconArrowRight,
  IconCheck,
  IconCircleX
} from '@tabler/icons-react';
import Link from 'next/link';

const cvTemplates = [
  { id: 'ivy', name: 'The Ivy Ledger', accent: 'deep-green.7' },
  { id: 'modern', name: 'Modern Scholar', accent: 'burnished-gold.7' },
  { id: 'technical', name: 'Technical Fellow', accent: 'gray.8' },
];

export default function AcademicDossierPage() {
  const [hasStarted, setHasStarted] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedTemplate, setSelectedTemplate] = React.useState('ivy');
  const [file, setFile] = React.useState<File | null>(null);
  const [isDossierReady, setIsDossierReady] = React.useState(false);

  // 1. Splash / Invitation View
  if (!hasStarted && !isDossierReady) {
    return (
      <Container size="md" py={120}>
        <Center>
          <Stack align="center" gap={40} style={{ textAlign: 'center' }}>
            <Box style={{ position: 'relative' }}>
              <IconShieldCheck size={80} color="var(--mantine-color-burnished-gold-7)" stroke={1} />
            </Box>
            
            <Stack gap="sm">
              <Title ff="var(--font-display)" size="3.5rem" style={{ textTransform: 'uppercase', letterSpacing: '2px', lineHeight: 1.1 }}>
                The Academic <Text component="span" inherit c="burnished-gold.7">Dossier</Text>
              </Title>
              <Text c="dimmed" ff="var(--font-body)" size="lg" style={{ maxWidth: 600 }}>
                A sovereign, typeset record of your professional impact. Essential for Grant Submissions, Tenure Reviews, and Prestige Book Proposals.
              </Text>
            </Stack>

            <Divider w={100} color="burnished-gold.7" size="md" />

            <Paper p={50} withBorder radius={0} bg="white" style={{ borderColor: '#E0DBCC', boxShadow: '0 20px 40px rgba(0,0,0,0.03)' }}>
              <Stack gap="xl">
                <Text size="md" ff="var(--font-body)" fw={600} c="deep-green.9" fs="italic">
                  &quot;Micah has recommended you for a complimentary Dossier Architecture session. My team will manually architect your records for you.&quot;
                </Text>
                
                <Stack gap="md" align="flex-start" mb="md">
                  <Group gap="sm" align="flex-start" wrap="nowrap">
                    <ThemeIcon color="burnished-gold.7" variant="light" radius="xl" size="sm" mt={4}><IconCheck size={12} /></ThemeIcon>
                    <Box style={{ textAlign: 'left' }}>
                      <Text fw={700} size="sm" ff="var(--font-body)">SOVEREIGN DATA OWNERSHIP</Text>
                      <Text size="xs" c="dimmed">Your career records are stored in a structured database you control, not a static document.</Text>
                    </Box>
                  </Group>
                  <Group gap="sm" align="flex-start" wrap="nowrap">
                    <ThemeIcon color="burnished-gold.7" variant="light" radius="xl" size="sm" mt={4}><IconCheck size={12} /></ThemeIcon>
                    <Box style={{ textAlign: 'left' }}>
                      <Text fw={700} size="sm" ff="var(--font-body)">PRESTIGE TYPESETTING</Text>
                      <Text size="xs" c="dimmed">Generate industry-standard, committee-ready PDF outputs that command immediate authority.</Text>
                    </Box>
                  </Group>
                  <Group gap="sm" align="flex-start" wrap="nowrap">
                    <ThemeIcon color="burnished-gold.7" variant="light" radius="xl" size="sm" mt={4}><IconCheck size={12} /></ThemeIcon>
                    <Box style={{ textAlign: 'left' }}>
                      <Text fw={700} size="sm" ff="var(--font-body)">CONCIERGE MANAGEMENT</Text>
                      <Text size="xs" c="dimmed">Never edit a CV again. Forward your talk invitations and grant awards to us; we handle the rest.</Text>
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
                  Begin Record Ingestion
                </Button>
                <Group justify="center" gap="xl">
                  <Group gap={6}>
                    <IconCheck size={14} color="var(--mantine-color-sage-7)" />
                    <Text size="9px" fw={700} c="dimmed" style={{ letterSpacing: '1px' }}>FREE_FOR_PEERS</Text>
                  </Group>
                  <Group gap={6}>
                    <IconCheck size={14} color="var(--mantine-color-sage-7)" />
                    <Text size="9px" fw={700} c="dimmed" style={{ letterSpacing: '1px' }}>ZERO_MANUAL_TYPING</Text>
                  </Group>
                </Group>
              </Stack>
            </Paper>
          </Stack>
        </Center>
      </Container>
    );
  }

  // 2. Multi-step Ingestion Flow
  if (hasStarted && !isDossierReady) {
    return (
      <Container size="sm" py={100}>
        <Stack gap={60}>
          <Stack gap="xs">
            <Group justify="space-between" align="center">
              <Text ff="var(--font-body)" size="9px" fw={700} c="burnished-gold.7" style={{ letterSpacing: '2px' }}>
                INGESTION_PHASE: {activeStep === 0 ? '01_SOURCE_UPLOAD' : '02_CONTEXT_CAPTURE'}
              </Text>
              <ActionIcon variant="subtle" color="gray" onClick={() => setHasStarted(false)}><IconCircleX size={20} /></ActionIcon>
            </Group>
            <Stepper active={activeStep} onStepClick={setActiveStep} color="burnished-gold" size="xs" styles={{ separator: { backgroundColor: '#E0DBCC' } }}>
              <Stepper.Step label="Upload Records" />
              <Stepper.Step label="Strategic Context" />
            </Stepper>
          </Stack>

          {activeStep === 0 && (
            <Paper withBorder radius={0} p={50} bg="white" style={{ borderColor: '#E0DBCC' }}>
              <Stack gap="xl" align="center">
                <Box ta="center">
                  <Title order={3} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Upload Current Records</Title>
                  <Text size="sm" c="dimmed" mt="xs">Drop your most recent CV or bio. Our team will manually architect the data into your sovereign dossier.</Text>
                </Box>
                
                <Box style={{ width: '100%' }}>
                  <FileButton onChange={(f) => { setFile(f); setActiveStep(1); }} accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
                    {(props) => (
                      <UnstyledButton 
                        {...props}
                        style={{ 
                          width: '100%', 
                          height: 240, 
                          border: '2px dashed #E0DBCC', 
                          display: 'flex', 
                          flexDirection: 'column',
                          alignItems: 'center', 
                          justifyContent: 'center',
                          backgroundColor: '#FDFDFB',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <IconUpload size={48} stroke={1} color="var(--mantine-color-burnished-gold-7)" />
                        <Text mt="md" size="md" fw={700} ff="var(--font-body)">DRAG OR CLICK TO UPLOAD</Text>
                        <Text size="xs" c="dimmed" mt={4}>PDF, DOCX, OR RTF (MAX 20MB)</Text>
                      </UnstyledButton>
                    )}
                  </FileButton>
                </Box>
                <Button variant="subtle" color="gray" size="xs" onClick={() => setActiveStep(1)}>Skip to context notes</Button>
              </Stack>
            </Paper>
          )}

          {activeStep === 1 && (
            <Paper withBorder radius={0} p={50} bg="white" style={{ borderColor: '#E0DBCC' }}>
              <Stack gap="xl">
                <Box>
                  <Title order={3} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Strategic Context</Title>
                  <Text size="sm" c="dimmed" mt="xs">Any recent awards, pending publications, or specific framing instructions for Micah and the team?</Text>
                </Box>
                
                <Textarea 
                  placeholder="e.g. 'I just received a keynote invitation for Berlin next year. Please emphasize my qualitative methodology expertise for the upcoming Routledge proposal...'"
                  minRows={10}
                  variant="unstyled"
                  p="xl"
                  bg="#FDFDFB"
                  style={{ border: '1px solid #E0DBCC', fontSize: '15px', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}
                />

                <Button 
                  color="burnished-gold.7" 
                  c="dark-forest" 
                  radius={0} 
                  size="xl"
                  onClick={() => setIsDossierReady(true)}
                  rightSection={<IconSparkles size={18} />}
                >
                  Finalize for Principal Review
                </Button>
              </Stack>
            </Paper>
          )}
        </Stack>
      </Container>
    );
  }

  // 3. Managed Dossier Dashboard (The Result)
  return (
    <Container size="xl" fluid>
      <Stack gap={40}>
        {/* Page Header */}
        <Box>
          <Group justify="space-between" align="flex-end">
            <Box>
              <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
                Academic <Text component="span" inherit c="burnished-gold.7">Dossier</Text>
              </Title>
              <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
                Foundational Career Record // Free Ingestion: ACTIVE // Record State: VERIFIED
              </Text>
            </Box>
            <Group>
              <Badge color="sage.7" variant="light" radius={0} size="lg" p="md" leftSection={<IconShieldCheck size={16} />}>
                RECORD_VERIFIED
              </Badge>
              <Button 
                variant="outline" 
                color="burnished-gold.7" 
                radius={0} 
                leftSection={<IconRefresh size={18} />}
                onClick={() => { setHasStarted(true); setActiveStep(0); setIsDossierReady(false); }}
              >
                Update Records
              </Button>
            </Group>
          </Group>
        </Box>

        <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="xl">
          {/* Status Board */}
          <Paper withBorder radius={0} p={40} bg="white" style={{ borderColor: '#E0DBCC', gridColumn: 'span 2' }}>
            <Stack gap="xl">
              <Group justify="space-between">
                <Box>
                  <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Dossier Lifecycle</Title>
                  <Text size="xs" c="dimmed" ff="var(--font-body)">Tracking your record from ingestion to prestige render.</Text>
                </Box>
                <Badge variant="outline" color="gray" radius={0}>ID: SEC_9921_X</Badge>
              </Group>

              <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
                <Paper p="xl" bg="#FDFDFB" withBorder radius={0} style={{ borderLeft: '4px solid var(--mantine-color-sage-7)' }}>
                  <Stack gap={6}>
                    <Text size="9px" fw={700} c="dimmed" style={{ letterSpacing: '1px' }}>DATA_INGESTION</Text>
                    <Group gap={6}>
                      <IconCheck size={16} color="var(--mantine-color-sage-7)" />
                      <Text size="xs" fw={700}>COMPLETE</Text>
                    </Group>
                  </Stack>
                </Paper>
                <Paper p="xl" bg="#FDFDFB" withBorder radius={0} style={{ borderLeft: '4px solid var(--mantine-color-burnished-gold-7)' }}>
                  <Stack gap={6}>
                    <Text size="9px" fw={700} c="dimmed" style={{ letterSpacing: '1px' }}>PRINCIPAL_REVIEW</Text>
                    <Group gap={6}>
                      <IconRefresh size={16} color="var(--mantine-color-burnished-gold-7)" className="animate-spin-slow" />
                      <Text size="xs" fw={700}>IN PROGRESS</Text>
                    </Group>
                  </Stack>
                </Paper>
                <Paper p="xl" bg="#FDFDFB" withBorder radius={0} style={{ borderLeft: '4px solid #E0DBCC' }}>
                  <Stack gap={6}>
                    <Text size="9px" fw={700} c="dimmed" style={{ letterSpacing: '1px' }}>TYPESET_READY</Text>
                    <Group gap={6}>
                      <IconCircleCheck size={16} color="var(--mantine-color-gray-4)" />
                      <Text size="xs" fw={700} c="dimmed">PENDING</Text>
                    </Group>
                  </Stack>
                </Paper>
              </SimpleGrid>

              <Divider color="#F4F1EA" label="CONCIERGE_FEED" labelPosition="center" />
              
              <Paper p="xl" bg="parchment.1" radius={0}>
                <Stack gap="md">
                  <Text size="sm" c="deep-green.9" style={{ fontStyle: 'italic', lineHeight: 1.6 }}>
                    &quot;The team is currently architecting your new NSF grant and the keynote invitation into the Ivy Ledger format. Micah will provide the final strategic review by Friday to ensure the framing matches your Routledge proposal strategy.&quot;
                  </Text>
                  <Group gap="xs">
                    <ThemeIcon size="xs" radius="xl" color="burnished-gold.7"><IconSparkles size={10} /></ThemeIcon>
                    <Text size="xs" fw={700} c="burnished-gold.8">STRATEGIC_PULSE_SENT // 27_FEB_2026</Text>
                  </Group>
                </Stack>
              </Paper>
            </Stack>
          </Paper>

          {/* Typesetting Picker */}
          <Paper withBorder radius={0} p={40} bg="white" style={{ borderColor: '#E0DBCC' }}>
            <Stack gap="xl">
              <Box>
                <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Dossier Typesetting</Title>
                <Text size="xs" c="dimmed" ff="var(--font-body)">Select aesthetic for your next run.</Text>
              </Box>

              <Stack gap="xs">
                {cvTemplates.map((template) => (
                  <UnstyledButton 
                    key={template.id} 
                    onClick={() => setSelectedTemplate(template.id)}
                    style={{ 
                      border: `1px solid ${selectedTemplate === template.id ? 'var(--mantine-color-burnished-gold-7)' : '#E0DBCC'}`,
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      background: selectedTemplate === template.id ? '#FDFDFB' : 'transparent',
                      transition: 'all 0.1s ease'
                    }}
                  >
                    <ThemeIcon variant="light" color={template.id === selectedTemplate ? 'burnished-gold' : 'gray'} radius={0}>
                      <IconLayoutGrid size={16} />
                    </ThemeIcon>
                    <Text size="xs" fw={700} ff="var(--font-body)" c={selectedTemplate === template.id ? 'dark.9' : 'dimmed'}>{template.name.toUpperCase()}</Text>
                  </UnstyledButton>
                ))}
              </Stack>

              <Stack gap="xs" mt="md">
                <Button 
                  color="burnished-gold.7" 
                  c="dark-forest" 
                  radius={0} 
                  fullWidth 
                  size="lg" 
                  leftSection={<IconSparkles size={18} />}
                  styles={{ root: { letterSpacing: '1px' }}}
                >
                  Request Prestige Run
                </Button>
                <Button variant="subtle" color="deep-green.7" radius={0} fullWidth size="xs" leftSection={<IconDownload size={14} />}>
                  Download Last (12 Feb)
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </SimpleGrid>

        {/* The Verified Record Tabs */}
        <Paper withBorder radius={0} p={0} bg="white" style={{ borderColor: '#E0DBCC' }}>
          <Box p="xl" bg="#FDFDFB" style={{ borderBottom: '1px solid #E0DBCC' }}>
            <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Verified Academic Dossier</Title>
          </Box>

          <Tabs defaultValue="bio" radius={0}>
            <Tabs.List bg="#F4F1EA">
              <Tabs.Tab value="bio" leftSection={<IconUserCircle size={14} />}>Current Bio</Tabs.Tab>
              <Tabs.Tab value="appointments" leftSection={<IconBriefcase size={14} />}>Appointments</Tabs.Tab>
              <Tabs.Tab value="education" leftSection={<IconSchool size={14} />}>Education</Tabs.Tab>
              <Tabs.Tab value="grants" leftSection={<IconTrophy size={14} />}>Grants & Awards</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="bio" p={50}>
              <Stack gap="xl">
                <Text size="md" style={{ lineHeight: 1.8, maxWidth: '800px', fontStyle: 'italic', color: '#4A4D51', fontFamily: 'serif' }}>
                  &quot;My research explores the intersection of digital environments and human decision-making processes. By mapping the linguistic patterns of authority in peer-reviewed contexts, I develop frameworks for quantifying professional impact in the social sciences.&quot;
                </Text>
                <Divider color="#F4F1EA" />
                <Group justify="space-between">
                  <Text size="9px" fw={700} c="dimmed" ff="var(--font-body)" style={{ letterSpacing: '1px' }}>VERIFIED_BY: MICAH S. // TIMESTAMP: 2026-02-12</Text>
                  <Button variant="subtle" size="xs" color="burnished-gold.7">Request Edit</Button>
                </Group>
              </Stack>
            </Tabs.Panel>
            
            <Tabs.Panel value="appointments" p={50}>
              <Stack gap="md">
                {[
                  { role: 'Associate Professor', institution: 'University of Behavioral Sciences', period: '2022 - Present' },
                  { role: 'Senior Research Fellow', institution: 'Global Policy Institute', period: '2018 - 2022' },
                ].map((item, i) => (
                  <Paper key={i} withBorder p="xl" radius={0} bg="#FDFDFB" style={{ borderColor: '#E0DBCC' }}>
                    <Group justify="space-between">
                      <Box>
                        <Text size="md" fw={700} ff="var(--font-body)">{item.role}</Text>
                        <Text size="xs" c="dimmed" ff="var(--font-body)" style={{ letterSpacing: '0.5px' }}>{item.institution.toUpperCase()} // {item.period}</Text>
                      </Box>
                      <IconCircleCheck size={20} color="var(--mantine-color-sage-7)" />
                    </Group>
                  </Paper>
                ))}
              </Stack>
            </Tabs.Panel>
          </Tabs>
        </Paper>
      </Stack>
    </Container>
  );
}
