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
  FileButton
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
  IconCloudDownload,
  IconCircleCheck
} from '@tabler/icons-react';
import Link from 'next/link';

const cvTemplates = [
  { id: 'ivy', name: 'The Ivy Ledger', accent: 'deep-green.7' },
  { id: 'modern', name: 'Modern Scholar', accent: 'burnished-gold.7' },
  { id: 'technical', name: 'Technical Fellow', accent: 'gray.8' },
];

export default function CVArchitectPage() {
  const [selectedTemplate, setSelectedTemplate] = React.useState('ivy');
  const [file, setFile] = React.useState<File | null>(null);

  return (
    <Container size="xl" fluid>
      <Stack gap={40}>
        {/* 1. Page Header */}
        <Box>
          <Group justify="space-between" align="flex-end">
            <Box>
              <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
                CV <Text component="span" inherit c="burnished-gold.7">Architect</Text>
              </Title>
              <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
                White-Glove Typesetting // Concierge Career Records // CV Engine: ACTIVE
              </Text>
            </Box>
            <Button 
              variant="filled" 
              color="burnished-gold.7" 
              c="dark-forest"
              radius={0} 
              size="md" 
              leftSection={<IconSparkles size={18} />}
              component={Link}
              href="/dashboard/correspondence"
            >
              Order Professional Career Audit
            </Button>
          </Group>
        </Box>

        <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="xl">
          {/* 2. Rapid Ingestion Zone */}
          <Paper withBorder radius={0} p={40} bg="white" style={{ borderColor: '#E0DBCC', gridColumn: 'span 2' }}>
            <Stack gap="xl">
              <Group justify="space-between">
                <Box>
                  <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Evidence Dropzone
                  </Title>
                  <Text size="xs" c="dimmed" ff="var(--font-body)">Zero-friction career updates. Just dump your data; Micah handles the rest.</Text>
                </Box>
                <Badge color="burnished-gold.7" variant="filled" radius={0}>CONCIERGE_ACTIVE</Badge>
              </Group>

              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                <Stack gap="xs">
                  <Text ff="var(--font-body)" size="9px" fw={700} c="dimmed" style={{ letterSpacing: '1px' }}>PASTE_MESSY_NOTES_OR_LINKS:</Text>
                  <Textarea 
                    placeholder="e.g. 'Just won the NSF grant for $500k'..." 
                    minRows={6}
                    variant="unstyled"
                    p="md"
                    bg="#FDFDFB"
                    style={{ border: '1px solid #E0DBCC', fontSize: '13px' }}
                  />
                  <Button color="deep-green.7" radius={0} size="sm" leftSection={<IconNotes size={16} />}>
                    Send to Liaison
                  </Button>
                </Stack>

                <Stack gap="xs">
                  <Text ff="var(--font-body)" size="9px" fw={700} c="dimmed" style={{ letterSpacing: '1px' }}>UPLOAD_RAW_CV_OR_ARTIFACTS:</Text>
                  <Box style={{ border: '1px dashed #E0DBCC', height: '145px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FDFDFB' }}>
                    <FileButton onChange={setFile} accept="image/png,image/jpeg,application/pdf">
                      {(props) => (
                        <UnstyledButton {...props}>
                          <Stack align="center" gap={4}>
                            <IconUpload size={30} color="var(--mantine-color-gray-4)" />
                            <Text size="xs" c="dimmed">Drag or Click to Upload</Text>
                          </Stack>
                        </UnstyledButton>
                      )}
                    </FileButton>
                  </Box>
                  <Text size="xs" c="dimmed" italic>{file ? file.name : 'No file selected'}</Text>
                </Stack>
              </SimpleGrid>
            </Stack>
          </Paper>

          {/* 3. Typesetting Picker */}
          <Paper withBorder radius={0} p={40} bg="white" style={{ borderColor: '#E0DBCC' }}>
            <Stack gap="xl">
              <Box>
                <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>CV Typesetting</Title>
                <Text size="xs" c="dimmed" ff="var(--font-body)">Select aesthetic for your next run.</Text>
              </Box>

              <Stack gap="xs">
                {cvTemplates.map((template) => (
                  <UnstyledButton 
                    key={template.id} 
                    onClick={() => setSelectedTemplate(template.id)}
                    style={{ 
                      border: `1px solid ${selectedTemplate === template.id ? 'var(--mantine-color-burnished-gold-7)' : '#E0DBCC'}`,
                      padding: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      background: selectedTemplate === template.id ? '#FDFDFB' : 'transparent'
                    }}
                  >
                    <ThemeIcon variant="light" color={template.id === selectedTemplate ? 'burnished-gold' : 'gray'} radius={0}>
                      <IconLayoutGrid size={16} />
                    </ThemeIcon>
                    <Text size="xs" fw={700} ff="var(--font-body)" c={selectedTemplate === template.id ? 'dark' : 'dimmed'}>{template.name.toUpperCase()}</Text>
                  </UnstyledButton>
                ))}
              </Stack>

              <Stack gap="xs" mt="md">
                <Button color="burnished-gold.7" c="dark-forest" radius={0} fullWidth size="md" leftSection={<IconSparkles size={18} />}>
                  Request Professional Run
                </Button>
                <Button variant="subtle" color="deep-green.7" radius={0} fullWidth size="xs" leftSection={<IconDownload size={14} />}>
                  Download Last (12 Feb)
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </SimpleGrid>

        {/* 4. Verified Academic Record (The Dossier) */}
        <Paper withBorder radius={0} p={0} bg="white" style={{ borderColor: '#E0DBCC' }}>
          <Box p="xl" bg="#FDFDFB" style={{ borderBottom: '1px solid #E0DBCC' }}>
            <Group justify="space-between">
              <Box>
                <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Verified Academic Dossier</Title>
                <Text size="xs" c="dimmed" ff="var(--font-body)">Permanent Career Record // Managed by Principia</Text>
              </Box>
              <ThemeIcon variant="subtle" color="deep-green.7" size="xl">
                <IconShieldCheck size={24} />
              </ThemeIcon>
            </Group>
          </Box>

          <Tabs defaultValue="bio" radius={0}>
            <Tabs.List bg="#F4F1EA">
              <Tabs.Tab value="bio" leftSection={<IconUserCircle size={14} />}>Current Bio</Tabs.Tab>
              <Tabs.Tab value="appointments" leftSection={<IconBriefcase size={14} />}>Appointments</Tabs.Tab>
              <Tabs.Tab value="education" leftSection={<IconSchool size={14} />}>Education</Tabs.Tab>
              <Tabs.Tab value="grants" leftSection={<IconTrophy size={14} />}>Grants & Awards</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="bio" p={40}>
              <Text size="sm" style={{ lineHeight: 1.8, maxWidth: '800px', fontStyle: 'italic', color: '#4A4D51' }}>
                &quot;My research explores the intersection of digital environments and human decision-making processes...&quot;
              </Text>
              <Divider mt="xl" mb="sm" color="#F4F1EA" />
              <Text size="xs" c="dimmed" ff="var(--font-body)">VERIFIED_BY: MICAH S. // TIMESTAMP: 2026-02-12</Text>
            </Tabs.Panel>

            <Tabs.Panel value="appointments" p={40}>
              <Stack gap="md">
                {[
                  { role: 'Associate Professor', institution: 'University of Behavioral Sciences', period: '2022 - Present' },
                ].map((item, i) => (
                  <Paper key={i} withBorder p="md" radius={0} bg="#FDFDFB" style={{ borderColor: '#E0DBCC' }}>
                    <Group justify="space-between">
                      <Box>
                        <Text size="sm" fw={700}>{item.role}</Text>
                        <Text size="xs" c="dimmed" ff="var(--font-body)">{item.institution.toUpperCase()} // {item.period}</Text>
                      </Box>
                      <IconCircleCheck size={16} color="var(--mantine-color-sage-7)" />
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
