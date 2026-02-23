'use client';
import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Title, 
  Text, 
  Stack, 
  Group, 
  Badge, 
  Stepper, 
  TextInput, 
  Select, 
  NumberInput, 
  Button, 
  Paper, 
  ThemeIcon,
  SimpleGrid,
  Textarea,
  Loader,
  Center
} from '@mantine/core';
import { 
  IconUser, 
  IconFileText, 
  IconSettings, 
  IconCheck, 
  IconFingerprint,
  IconArrowRight
} from '@tabler/icons-react';

export default function ScientificAuditPage() {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const nextStep = () => {
    if (active === 2) {
      handleFinalize();
    } else {
      setActive((current) => (current < 3 ? current + 1 : current));
    }
  };
  
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const handleFinalize = () => {
    setLoading(true);
    // Mock diagnostic "processing"
    setTimeout(() => {
      setLoading(false);
      setCompleted(true);
      setActive(3);
    }, 2500);
  };

  return (
    <Box bg="dark-forest" mih="100vh" pt={120} pb={100}>
      <Container size="md">
        <Stack gap="xl" mb={60} align="center" ta="center">
          <Badge variant="outline" color="burnished-gold" radius={0} size="lg">Instrument: AID-99-B</Badge>
          <Title 
            order={1} 
            ff="var(--font-display)" 
            c="parchment" 
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', textTransform: 'uppercase' }}
          >
            Publication <Text component="span" inherit c="burnished-gold">Health Check</Text>
          </Title>
          <Text c="parchment" size="md" opacity={0.7} maw={600}>
            Our proprietary diagnostic instrument analyzes your manuscript&apos;s technical metadata to determine its path to publication success.
          </Text>
        </Stack>

        <Paper withBorder p={0} radius={0} bg="white">
          <Box p="xl" bg="parchment.0" style={{ borderBottom: '1px solid var(--mantine-color-parchment-2)' }}>
            <Stepper 
              active={active} 
              onStepClick={setActive} 
              color="deep-green" 
              size="sm"
              allowNextStepsSelect={false}
              styles={{
                stepIcon: { borderRadius: 0 },
                stepLabel: { fontFamily: 'var(--font-sans)', fontSize: '0.7rem', textTransform: 'uppercase' }
              }}
            >
              <Stepper.Step label="Identity" icon={<IconUser size={18} />} />
              <Stepper.Step label="Metadata" icon={<IconFileText size={18} />} />
              <Stepper.Step label="Technical" icon={<IconSettings size={18} />} />
              <Stepper.Completed>Diagnostic complete</Stepper.Completed>
            </Stepper>
          </Box>

          <Box p={40}>
            {loading ? (
              <Center mih={300}>
                <Stack align="center" gap="md">
                  <Loader color="burnished-gold" size="lg" type="bars" />
                  <Text ff="var(--font-body)" size="xs" c="deep-green.7" style={{ letterSpacing: '2px' }}>
                    RUNNING_DIAGNOSTIC_SUITE...
                  </Text>
                </Stack>
              </Center>
            ) : completed ? (
              <Stack gap="xl">
                <Box ta="center">
                  <ThemeIcon size={60} radius={0} color="sage" mb="md">
                    <IconCheck size={40} />
                  </ThemeIcon>
                  <Title order={2} ff="var(--font-display)" style={{ textTransform: 'uppercase' }}>Diagnostic Complete</Title>
                  <Text size="sm" c="dimmed" mt={4}>REPORT_ID: {Math.random().toString(36).substring(7).toUpperCase()}</Text>
                </Box>

                <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
                  <Paper withBorder p="md" radius={0} bg="parchment.0">
                    <Text ff="var(--font-body)" size="7px" c="dimmed">DIAGNOSTIC_RESULT</Text>
                    <Title order={4} ff="var(--font-display)" c="burnished-gold">FEASIBILITY_HIGH</Title>
                  </Paper>
                  <Paper withBorder p="md" radius={0} bg="parchment.0">
                    <Text ff="var(--font-body)" size="7px" c="dimmed">SCHOLARLY_ALIGNMENT</Text>
                    <Title order={4} ff="var(--font-display)" c="deep-green.7">SOCIAL_SCIENCES</Title>
                  </Paper>
                  <Paper withBorder p="md" radius={0} bg="parchment.0">
                    <Text ff="var(--font-body)" size="7px" c="dimmed">OVERSIGHT_REQUIREMENT</Text>
                    <Title order={4} ff="var(--font-display)" c="deep-green.7">PRINCIPAL_LEVEL</Title>
                  </Paper>
                </SimpleGrid>

                <Paper withBorder p="xl" radius={0} bg="dark-forest">
                  <Group justify="space-between" mb="md">
                    <Title order={5} ff="var(--font-display)" c="parchment">Institutional Review Outcome: PRE-APPROVED</Title>
                    <Badge color="sage">READY_FOR_SYNC</Badge>
                  </Group>
                  <Text size="sm" c="parchment" opacity={0.7} style={{ lineHeight: 1.6 }}>
                    Your manuscript meets the technical complexity thresholds for our Faculty-Led pipeline. Based on your current &quot;Peer Review Revision&quot; stage, we recommend an immediate Discovery Sync to align our typesetting engine with your publisher&apos;s specific requirements.
                  </Text>
                </Paper>

                <Button fullWidth size="lg" color="burnished-gold" c="dark-forest" radius={0} rightSection={<IconArrowRight size={18} />}>
                  Schedule Discovery Sync with Principal
                </Button>
              </Stack>
            ) : (
              <>
                {active === 0 && (
                  <Stack gap="lg">
                    <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase' }}>Researcher Identity</Title>
                    <SimpleGrid cols={2}>
                      <TextInput label="Full Name" placeholder="Dr. LastName" radius={0} />
                      <TextInput label="Institution" placeholder="University / Lab" radius={0} />
                    </SimpleGrid>
                    <Select 
                      label="Academic Field" 
                      placeholder="Select your discipline" 
                      data={['Social Sciences', 'Humanities', 'STEM', 'Education', 'Bespoke']} 
                      radius={0} 
                    />
                  </Stack>
                )}

                {active === 1 && (
                  <Stack gap="lg">
                    <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase' }}>Manuscript Metadata</Title>
                    <SimpleGrid cols={2}>
                      <Select 
                        label="Document Type" 
                        placeholder="e.g. Journal Paper" 
                        data={['Journal Article', 'Book Chapter', 'Grant Proposal', 'Dissertation']} 
                        radius={0} 
                      />
                      <Select 
                        label="Current Stage" 
                        placeholder="Select stage" 
                        data={['Drafting', 'Internal Review', 'Peer Review Revisions', 'Final Polish']} 
                        radius={0} 
                      />
                    </SimpleGrid>
                    <NumberInput label="Approx. Word Count" placeholder="e.g. 8000" radius={0} hideControls />
                  </Stack>
                )}

                {active === 2 && (
                  <Stack gap="lg">
                    <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase' }}>Technical Requirements</Title>
                    <Select 
                      label="Citation Standard" 
                      placeholder="e.g. APA 7" 
                      data={['APA 7', 'MLA 9', 'Chicago/Turabian', 'BibTeX/LaTeX', 'Custom House Style']} 
                      radius={0} 
                    />
                    <Textarea 
                      label="Methodological Notes" 
                      placeholder="Describe any complex data, figures, or equations..." 
                      minRows={4} 
                      radius={0} 
                    />
                  </Stack>
                )}

                <Group justify="flex-end" mt="xl">
                  {active !== 0 && (
                    <Button variant="subtle" color="dimmed" onClick={prevStep} radius={0}>
                      Back
                    </Button>
                  )}
                  <Button color="deep-green" onClick={nextStep} radius={0}>
                    {active === 2 ? 'Run Diagnostic' : 'Next Protocol'}
                  </Button>
                </Group>
              </>
            )}
          </Box>
        </Paper>

        {/* Technical Footer */}
        <Group justify="space-between" mt="xl">
          <Group gap={4}>
            <IconFingerprint size={14} color="var(--mantine-color-deep-green-3)" />
            <Text ff="var(--font-body)" size="xs" c="deep-green.3" style={{ letterSpacing: '1px' }}>
              ENCRYPTED_INGESTION_v1.0
            </Text>
          </Group>
          <Text ff="var(--font-body)" size="xs" c="deep-green.3">
            STATUS: READY_FOR_SCAN
          </Text>
        </Group>
      </Container>
    </Box>
  );
}
