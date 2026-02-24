'use client';
import React from 'react';
import { 
  Container, 
  Stack, 
  Title, 
  Text, 
  Paper, 
  Group, 
  Table, 
  ActionIcon, 
  Tooltip, 
  Box, 
  Button, 
  Avatar, 
  SimpleGrid, 
  RingProgress, 
  Divider, 
  Progress,
  ThemeIcon,
  Modal,
  Textarea,
  Popover,
  Badge,
  ScrollArea
} from '@mantine/core';
import { 
  IconBolt, 
  IconCheck, 
  IconExternalLink,
  IconClock,
  IconMessageCircle,
  IconFileCertificate,
  IconArrowNarrowRight,
  IconShieldCheck,
  IconFileSearch,
  IconX,
  IconSend
} from '@tabler/icons-react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';

export default function BlessingQueuePage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedProject, setSelectedProject] = React.useState<any>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleAuthorizeClick = (project: any) => {
    setSelectedProject(project);
    open();
  };

  return (
    <Container size="xl" fluid>
      <Modal 
        opened={opened} 
        onClose={close} 
        size={isMobile ? "100%" : "85%"} 
        padding={0} 
        radius={0} 
        withCloseButton={false}
        styles={{ content: { background: '#121416', border: '1px solid #2A2D31' } }}
      >
        <Box p="xl" bg="#0A0B0C" style={{ borderBottom: '1px solid #2A2D31' }}>
          <Group justify="space-between">
            <Group gap="md">
              <ThemeIcon color="burnished-gold" variant="light" radius={0} size="xl">
                <IconShieldCheck size={24} />
              </ThemeIcon>
              <Box>
                <Title order={3} ff="var(--font-display)" c="parchment" style={{ textTransform: 'uppercase' }} size={isMobile ? "1.2rem" : "1.5rem"}>
                  Executive Proof Review
                </Title>
                <Text size="xs" c="dimmed" visibleFrom="xs">Author: {selectedProject?.author} // MS-ID: {selectedProject?.project.split(' ').map((n: string) => n[0]).join('')}-2026</Text>
              </Box>
            </Group>
            <ActionIcon variant="subtle" color="gray" onClick={close}><IconX size={20} /></ActionIcon>
          </Group>
        </Box>

        <SimpleGrid cols={{ base: 1, lg: 2 }} spacing={0}>
          {/* Left Side: The "Gallery Proof" View (Prestige Reader) */}
          <Box p={{ base: 20, sm: 40 }} bg="black" style={{ borderRight: isMobile ? 'none' : '1px solid #2A2D31', borderBottom: isMobile ? '1px solid #2A2D31' : 'none', height: isMobile ? 'auto' : '75vh', overflowY: 'auto' }}>
            <Paper 
              radius={0} 
              p={{ base: 30, sm: 60, md: 80 }} 
              bg="white" 
              mih={isMobile ? 'auto' : 900} 
              style={{ position: 'relative', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.8)' }}
            >
              {/* Institutional Watermark */}
              <Box 
                pos="absolute" 
                top={0} 
                left={0} 
                right={0} 
                bottom={0} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  pointerEvents: 'none',
                  zIndex: 1,
                  opacity: 0.04,
                  transform: 'rotate(-35deg)'
                }}
              >
                <Title ff="var(--font-display)" size={isMobile ? "4rem" : "6rem"} c="black" style={{ whiteSpace: 'nowrap' }}>
                  PRINCIPAL REVIEW
                </Title>
              </Box>

              <Stack gap={{ base: 30, sm: 60 }} style={{ position: 'relative', zIndex: 2 }}>
                <Box ta="center">
                  <Text ff="var(--font-body)" size="7px" c="dimmed" mb="xl" style={{ letterSpacing: '3px' }}>
                    FACULTY_LED_INFRASTRUCTURE // MS-ID: ALPHA-2026
                  </Text>
                  <Title order={1} ff="serif" style={{ fontSize: isMobile ? '1.5rem' : '2rem', color: 'black', fontWeight: 400 }}>
                    {selectedProject?.project || 'Manuscript Title'}
                  </Title>
                  <Text ff="serif" italic size="sm" mt="md" c="dark">
                    Draft prepared for executive authorization prior to journal submission.
                  </Text>
                </Box>
                
                <Divider color="gray.1" />
                
                <Box>
                  <Title order={3} size="xs" mb="lg" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Abstract</Title>
                  <Text size="xs" c="dark" style={{ lineHeight: 2, textAlign: 'justify' }}>
                    This research investigates the intersection of digital space architecture and cognitive development in adolescent populations. By leveraging our proprietary WASM-rendering engine, we have achieved a 99% accuracy rate in typesetting complex methodological formulas that traditional Word-based processors fail to align...
                  </Text>
                </Box>

                <Box p="xl" style={{ border: '1px solid #eee' }}>
                  <Text size="7px" c="dimmed" mb="xs">FIGURE 1.1: SOCIO-TECHNICAL_FLUX_MAP</Text>
                  <Box h={120} bg="gray.0" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ThemeIcon variant="subtle" color="gray.3" size={40}>
                      <IconFileSearch size={30} />
                    </ThemeIcon>
                  </Box>
                </Box>
              </Stack>
            </Paper>
          </Box>

          {/* Right Side: The Oversight Panel */}
          <Stack p={{ base: 20, sm: 40 }} gap={40} bg="#121416" justify="space-between" style={{ height: isMobile ? 'auto' : '75vh', overflowY: 'auto' }}>
            <Stack gap="xl">
              <Box>
                <Group gap="xs" mb="md">
                  <Text ff="var(--font-body)" size="7px" c="burnished-gold" style={{ letterSpacing: '2px' }}>VERIFICATION_CHECKLIST</Text>
                  <Badge variant="dot" color="sage">PASSED</Badge>
                </Group>
                
                <Stack gap="sm">
                  {[
                    { label: 'Bibliography Syntax (BibTeX)', status: 'PASS' },
                    { label: 'Figures (600dpi)', status: 'PASS' },
                    { label: 'Institutional Compliance', status: 'PASS' },
                    { label: 'Rendering Integrity', status: 'PASS' }
                  ].map((item, i) => (
                    <Group key={i} justify="space-between" p="xs" style={{ borderBottom: '1px solid #2A2D31' }}>
                      <Text size="xs" c="#E1E1E1">{item.label}</Text>
                      <IconCheck size={14} color="var(--mantine-color-sage-7)" />
                    </Group>
                  ))}
                </Stack>
              </Box>

              <Box>
                <Text ff="var(--font-body)" size="7px" c="burnished-gold" mb="xs" style={{ letterSpacing: '2px' }}>OVERSIGHT_MEMO</Text>
                <Textarea 
                  placeholder="Note for the Friday Pulse (Visible to client)..." 
                  variant="unstyled"
                  p="md"
                  bg="#0A0B0C"
                  styles={{ input: { color: '#E1E1E1', fontSize: '12px' } }}
                  style={{ border: '1px solid #2A2D31' }}
                  minRows={4}
                />
              </Box>
            </Stack>

            <Stack gap="md">
              <Paper p="md" bg="#0A0B0C" style={{ border: '1px dashed #2A2D31' }}>
                <Group gap="md">
                  <IconShieldCheck size={20} color="var(--mantine-color-burnished-gold-7)" />
                  <Box>
                    <Text size="7px" c="dimmed">CRYPTOGRAPHIC_AUTH_ID</Text>
                    <Text ff="var(--font-body)" size="xs" c="parchment" fw={700}>SECURE_HASH: 0x7E3B...C442</Text>
                  </Box>
                </Group>
              </Paper>

              <Button 
                fullWidth 
                color="burnished-gold" 
                c="dark-forest" 
                radius={0} 
                size="lg" 
                h={60}
                leftSection={<IconShieldCheck size={24} />}
                styles={{ label: { fontFamily: 'var(--font-display)', letterSpacing: '2px' } }}
                onClick={() => {
                  alert('MANUSCRIPT AUTHORIZED // SEAL APPLIED // CLIENT NOTIFIED');
                  close();
                }}
              >
                APPLY INSTITUTIONAL SEAL
              </Button>
              <Button variant="subtle" color="gray" radius={0} size="xs" onClick={close}>
                Abort and Return to Queue
              </Button>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Modal>

      <Stack gap={40}>
        {/* 1. Queue HUD */}
        <Box>
          <Group justify="space-between" align="flex-end" wrap="wrap">
            <Box>
              <Title order={2} ff="var(--font-display)" size="2.5rem" style={{ textTransform: 'uppercase' }}>
                Approval <Text component="span" inherit c="burnished-gold.7">Desk</Text>
              </Title>
              <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
                Manuscripts Awaiting Executive Review // Principal Authorization Required
              </Text>
            </Box>
          </Group>
        </Box>

        {/* 2. Priority List */}
        <Paper withBorder radius={0} p={0} bg="transparent" style={{ borderColor: '#2A2D31', overflow: 'hidden' }}>
          <Box p="xl" style={{ borderBottom: '1px solid #2A2D31' }}>
            <Title order={4} ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
              High-Priority Review List
            </Title>
          </Box>
          <ScrollArea>
            <Table verticalSpacing="lg" horizontalSpacing="xl" highlightOnHover style={{ minWidth: 800 }}>
              <Table.Thead bg="#0A0B0C">
                <Table.Tr>
                  <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="dimmed">AUTHOR</Table.Th>
                  <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="dimmed">PROJECT_IDENTIFIER</Table.Th>
                  <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="dimmed">READY_SCORE</Table.Th>
                  <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="dimmed">WAIT_TIME</Table.Th>
                  <Table.Th ff="var(--font-body)" style={{ fontSize: "var(--mantine-font-size-xs)" }} c="dimmed">ACTIONS</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {[
                  { author: 'Dr. Emily Chen', project: 'Social Dynamics in Digital Spaces', readiness: 94, wait: '14h', avatar: 'EC' },
                  { author: 'Dr. Marcus Ross', project: 'Quantum Computing Fundamentals', readiness: 88, wait: '1.5d', avatar: 'MR' },
                  { author: 'Prof. Sarah Miller', project: 'Urban Planning 2030', readiness: 91, wait: '6h', avatar: 'SM' },
                  { author: 'Dr. James Wilson', project: 'Biological Signaling Pathways', readiness: 82, wait: '2.4d', avatar: 'JW' },
                ].map((item, i) => (
                  <Table.Tr key={i} style={{ borderBottom: '1px solid #2A2D31' }}>
                    <Table.Td>
                      <Group gap="sm">
                        <Avatar size="sm" radius={0} color="dark" bg="#2A2D31">{item.author.split(' ').map(n => n[0]).join('')}</Avatar>
                        <Box>
                          <Text size="sm" fw={700} c="#E1E1E1">{item.author}</Text>
                          <Text size="xs" c="dimmed" ff="var(--font-body)">SENIOR_RESEARCHER</Text>
                        </Box>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Stack gap={0}>
                        <Text size="sm" c="#E1E1E1">{item.project}</Text>
                        <Text size="xs" c="dimmed" ff="var(--font-body)">ID: ALPHA_{i+100}</Text>
                      </Stack>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="sm">
                        <RingProgress
                          size={40}
                          thickness={4}
                          sections={[{ value: item.readiness, color: item.readiness > 90 ? 'sage' : 'burnished-gold' }]}
                          label={<Text size="7px" ta="center" ff="var(--font-body)" c="#E1E1E1">{item.readiness}%</Text>}
                        />
                        <Text size="xs" c={item.readiness > 90 ? 'sage' : 'burnished-gold'} ff="var(--font-body)">READY</Text>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <IconClock size={12} color="var(--mantine-color-gray-6)" />
                        <Text size="xs" ff="var(--font-body)" c="#E1E1E1">{item.wait}</Text>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <Tooltip label="Open Production Engine">
                          <ActionIcon 
                            component={Link} 
                            href="/admin/command/production" 
                            variant="subtle" 
                            color="gray.6"
                          >
                            <IconExternalLink size={16} />
                          </ActionIcon>
                        </Tooltip>
                        <Popover width={300} position="bottom-end" withArrow shadow="md" radius={0} styles={{ dropdown: { background: '#0A0B0C', border: '1px solid #2A2D31' } }}>
                          <Popover.Target>
                            <Tooltip label="Liaison Directive">
                              <ActionIcon variant="subtle" color="gray.6">
                                <IconMessageCircle size={16} />
                              </ActionIcon>
                            </Tooltip>
                          </Popover.Target>
                          <Popover.Dropdown>
                          <Stack gap="xs">
                            <Text ff="var(--font-body)" size="7px" c="burnished-gold" style={{ letterSpacing: '1px' }}>QUICK_DIRECTIVE // TO: RESEARCHER</Text>
                            <Textarea 
                              placeholder="e.g. Please re-run the WASM compile for figure 2..." 
                              size="xs"
                              variant="unstyled"
                              p="xs"
                              bg="black"
                              style={{ border: '1px solid #2A2D31', color: '#E1E1E1' }}
                              minRows={3}
                            />
                            <Button 
                              size="xs" 
                              variant="filled" 
                              color="burnished-gold" 
                              c="dark-forest" 
                              radius={0}
                              leftSection={<IconSend size={14} />}
                            >
                              Send Directive
                            </Button>
                          </Stack>
                        </Popover.Dropdown>
                      </Popover>
                      <Button 
                        size="xs" 
                        variant="filled" 
                        color="burnished-gold" 
                        radius={0}
                        rightSection={<IconCheck size={14} />}
                        c="dark-forest"
                        onClick={() => handleAuthorizeClick(item)}
                      >
                        AUTHORIZE
                      </Button>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Paper>

      {/* 3. Operational Metadata */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
        <Paper withBorder p="xl" radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
          <Group justify="space-between" mb="md">
            <Text ff="var(--font-body)" size="xs" c="burnished-gold">SYSTEM_INTEGRITY</Text>
            <IconFileCertificate size={16} color="var(--mantine-color-burnished-gold-7)" />
          </Group>
          <Text size="xs" c="dimmed" mb="lg">All manuscripts currently in queue have passed the automated Prismer.AI validation suite.</Text>
          <Progress value={100} color="sage" size="xs" radius={0} />
        </Paper>
        
        <Paper withBorder p="xl" radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
          <Group justify="space-between" mb="md">
            <Text ff="var(--font-body)" size="xs" c="burnished-gold">LIAISON_WORKLOAD</Text>
            <IconBolt size={16} color="var(--mantine-color-burnished-gold-7)" />
          </Group>
          <Text size="xs" c="dimmed" mb="lg">Primary liaison active. Response times are within the established white-glove window.</Text>
          <Progress value={65} color="burnished-gold" size="xs" radius={0} />
        </Paper>

        <Paper withBorder p="xl" radius={0} bg="#0A0B0C" style={{ borderColor: '#2A2D31' }}>
          <Group justify="space-between" mb="md">
            <Text ff="var(--font-body)" size="xs" c="burnished-gold">FINANCIAL_PULSE</Text>
            <IconArrowNarrowRight size={16} color="var(--mantine-color-burnished-gold-7)" />
          </Group>
          <Text size="xs" c="dimmed" mb="lg">Projected completions for Q1 are tracking at 112% of baseline targets.</Text>
          <Progress value={88} color="sage" size="xs" radius={0} />
        </Paper>
      </SimpleGrid>
    </Stack>
  </Container>
);
}
