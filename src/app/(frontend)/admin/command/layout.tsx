'use client';
import React from 'react';
import {
  AppShell,
  Container,
  Group,
  Title,
  Text,
  Badge,
  Stack,
  NavLink,
  Divider,
  ActionIcon,
  Tooltip,
  Box,
  ScrollArea,
  Timeline,
  Modal,
  TextInput,
  Kbd,
  UnstyledButton,
  ThemeIcon,
  Avatar,
  Drawer
} from '@mantine/core';
import {
  IconUsers,
  IconBriefcase,
  IconCoin,
  IconBolt,
  IconBell,
  IconSearch,
  IconLogout,
  IconMail,
  IconWorld,
  IconTarget,
  IconTerminal2,
  IconShieldCheck,
  IconCalendarEvent,
  IconCommand,
  IconArrowRight,
  IconPlus,
  IconX,
  IconActivity
} from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useDisclosure, useHotkeys } from '@mantine/hooks';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [spotlightOpened, { open: openSpotlight, close: closeSpotlight, toggle: toggleSpotlight }] = useDisclosure(false);
  const [auditOpened, { open: openAudit, close: closeAudit }] = useDisclosure(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const spotlightActions = [
    { icon: <IconBolt size={16} />, label: 'Jump to Approval Desk', shortcut: '> Pulse', href: '/admin/command' },
    { icon: <IconBriefcase size={16} />, label: 'Search Active Projects', shortcut: '> Projects', href: '/admin/command/projects' },
    { icon: <IconTarget size={16} />, label: 'Triage Opportunity Pipeline', shortcut: '> Leads', href: '/admin/command/leads' },
    { icon: <IconPlus size={16} />, label: 'New Lead Ingestion', shortcut: '> New', href: '/admin/command/leads' },
  ];

  useHotkeys([
    ['mod+K', () => toggleSpotlight()],
    ['mod+L', () => openAudit()],
  ]);

  const handleLogout = async () => {
    await fetch('/api/users/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <AppShell
      header={{ height: 64 }}
      navbar={{ width: 280, breakpoint: 'sm' }}
      padding={60} // Solid uniform padding for breathing room
      styles={{
        main: { background: '#121416', color: '#E1E1E1' },
        header: { background: '#121416', borderBottom: '1px solid rgba(255,255,255,0.05)', zIndex: 101 },
        navbar: { background: '#121416', borderRight: '1px solid rgba(255,255,255,0.05)' }
      }}
    >
      {/* 0. Command Spotlight Modal */}
      <Modal
        opened={spotlightOpened}
        onClose={closeSpotlight}
        size="lg"
        padding={0}
        radius={0}
        withCloseButton={false}
        styles={{ 
          content: { background: '#0A0B0C', border: '1px solid #2A2D31', boxShadow: '0 30px 60px rgba(0,0,0,0.8)' },
          overlay: { backdropFilter: 'blur(4px)' }
        }}
      >
        <Box p="md">
          <TextInput
            placeholder="Type a command or search..."
            size="lg"
            variant="unstyled"
            leftSection={<IconSearch size={20} color="var(--mantine-color-burnished-gold-7)" />}
            rightSection={<Group gap={4}><Kbd size="xs">ESC</Kbd></Group>}
            styles={{ input: { color: 'white', fontSize: '1.2rem', paddingLeft: '40px' } }}
            autoFocus
          />
        </Box>
        <Divider color="#2A2D31" />
        <ScrollArea h={400} p="md">
          <Stack gap={4}>
            <Text ff="var(--font-body)" size="10px" fw={600} c="dimmed" mb={8} style={{ letterSpacing: '2px', paddingLeft: '12px', textTransform: 'uppercase' }}>QUICK_DIRECTIVES</Text>
            {spotlightActions.map((action, i) => (
              <UnstyledButton 
                key={i} 
                p="md" 
                onClick={() => { router.push(action.href); closeSpotlight(); }}
                style={{ 
                  borderRadius: 0, 
                  transition: 'background 0.2s ease',
                  width: '100%',
                  background: activeIndex === i ? 'rgba(255,255,255,0.05)' : 'transparent',
                  borderLeft: activeIndex === i ? '2px solid var(--mantine-color-burnished-gold-7)' : '2px solid transparent'
                }}
              >
                <Group justify="space-between">
                  <Group gap="md">
                    <ThemeIcon variant="subtle" color={activeIndex === i ? 'burnished-gold' : 'gray.6'} size="sm">{action.icon}</ThemeIcon>
                    <Text size="sm" fw={500} c={activeIndex === i ? 'white' : '#E1E1E1'}>{action.label}</Text>
                  </Group>
                  <Badge 
                    variant="outline" 
                    color="burnished-gold" 
                    size="sm" 
                    radius={0} 
                    styles={{ 
                      root: { border: '1px solid currentColor', height: '18px' },
                      label: { fontSize: '9px', fontWeight: 700, fontFamily: 'var(--font-body)', letterSpacing: '0.5px' } 
                    }}
                  >
                    {action.shortcut}
                  </Badge>
                </Group>
              </UnstyledButton>
            ))}
            
            <Divider my="lg" color="#2A2D31" label="RECENT_PROJECTS" labelPosition="left" styles={{ label: { fontSize: '10px', fontWeight: 600, color: 'var(--mantine-color-dimmed)', letterSpacing: '1px' } }} />
            
            <UnstyledButton p="md" style={{ width: '100%', borderRadius: 0 }} className="hover:bg-white/5">
              <Group gap="md">
                <Avatar size="sm" radius={0} bg="#2A2D31" color="white">EC</Avatar>
                <Box>
                  <Text size="sm" fw={600} c="#E1E1E1">Impact of Digital Spaces</Text>
                  <Text size="xs" c="dimmed">Dr. Emily Chen // Project ALPHA</Text>
                </Box>
              </Group>
            </UnstyledButton>
          </Stack>
        </ScrollArea>
        <Box p="sm" bg="black" style={{ borderTop: '1px solid #2A2D31' }}>
          <Group justify="center" gap="xl">
            <Group gap={6}><Text size="9px" fw={600} c="dimmed" style={{ letterSpacing: '1px' }}>↑↓ TO NAVIGATE</Text></Group>
            <Group gap={6}><Text size="9px" fw={600} c="dimmed" style={{ letterSpacing: '1px' }}>ENTER TO SELECT</Text></Group>
          </Group>
        </Box>
      </Modal>

      {/* 0. Audit Trail Drawer */}
      <Drawer
        opened={auditOpened}
        onClose={closeAudit}
        position="right"
        size="360px"
        title={<Text ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>System Audit Trail</Text>}
        styles={{ 
          content: { background: '#0A0B0C', borderLeft: '1px solid #2A2D31' },
          header: { background: '#0A0B0C', color: 'var(--mantine-color-burnished-gold-7)', borderBottom: '1px solid #2A2D31' }
        }}
      >
        <Stack gap="xl" h="100%" p="md">
          <ScrollArea h="calc(100vh - 120px)" offsetScrollbars mx="-md" px="md">
            <Timeline 
              active={-1} 
              bulletSize={8} 
              lineWidth={1} 
              color="#2A2D31"
              styles={{
                item: { paddingBottom: '24px' },
                itemBullet: { marginTop: '4px', backgroundColor: '#121416', border: '1px solid #2A2D31' }
              }}
            >
              {[
                { time: '09:12', user: 'DR_CHEN', action: 'REVISION_REQUEST', item: 'Manuscript_v4.pdf', color: 'orange' },
                { time: '08:45', user: 'PRINCIPAL', action: 'MEMO_SENT', item: 'Auth_Protocol_Update', color: 'sage' },
                { time: '08:30', user: 'SYSTEM', action: 'WASM_COMPILE', item: 'SUCCESS_2.4s', color: '#4A4D51' },
                { time: '07:15', user: 'SARAH_M', action: 'VAULT_COMMIT', item: 'Methodology_Pass', color: 'burnished-gold' },
                { time: 'Yesterday', user: 'DR_CHEN', action: 'PORTAL_LOGIN', item: 'IP_192.168.1.45', color: '#4A4D51' },
                { time: 'Yesterday', user: 'DR_ROSS', action: 'NEW_SUBMISSION', item: 'Project_Alpha', color: 'sage' },
              ].map((log, i) => (
                <Timeline.Item key={i} bullet={<Box w={4} h={4} bg={log.color || '#4A4D51'} style={{ borderRadius: '100%' }} />}>
                  <Box px="xs" py={4} style={{ cursor: 'pointer', transition: 'all 0.15s ease', marginTop: '-4px' }} className="hover:bg-white/5 group">
                    <Group justify="space-between" mb={4} align="flex-start">
                      <Stack gap={0}>
                        <Text ff="var(--font-body)" size="xs" fw={700} c="#E1E1E1" style={{ lineHeight: 1.2 }}>{log.user}</Text>
                        <Badge variant="outline" color={log.color || '#4A4D51'} size="xs" radius={0} mt={4} styles={{ root: { height: '12px', border: 'none', padding: 0 }, label: { fontSize: '7px', fontWeight: 800, fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '1px' } }}>{log.action}</Badge>
                      </Stack>
                      <Text ff="var(--font-body)" size="7px" c="dimmed" fw={500}>{log.time}</Text>
                    </Group>
                    <Text size="xs" c="dimmed" style={{ fontSize: '10px', opacity: 0.6 }} className="group-hover:opacity-100 transition-opacity">{log.item}</Text>
                  </Box>
                </Timeline.Item>
              ))}
            </Timeline>
          </ScrollArea>
        </Stack>
      </Drawer>

      <AppShell.Header>
        <Container size="xl" h="100%" fluid>
          <Group h="100%" justify="space-between">
            <Group gap="xl">
              <Link href="/" style={{ textDecoration: 'none' }}>
                <Group gap="xs">
                  <span style={{ color: 'var(--mantine-color-burnished-gold-7)', fontSize: '1.5rem' }}>◈</span>
                  <Title order={4} ff="var(--font-display)" c="#E1E1E1" style={{ letterSpacing: '-0.5px', textTransform: 'uppercase' }}>
                    Command / <Text component="span" inherit c="burnished-gold.7">Center</Text>
                  </Title>
                </Group>
              </Link>

              <Divider orientation="vertical" h={24} color="#2A2D31" />

              <Group 
                bg="#0A0B0C" 
                p="xs" 
                px="md" 
                style={{ border: '1px solid #2A2D31', cursor: 'pointer' }}
                onClick={openSpotlight}
              >
                <Group gap="md">
                  <IconSearch size={14} color="var(--mantine-color-gray-6)" />
                  <Text size="xs" c="dimmed" fw={500}>Search directives...</Text>
                  <Group gap={4}>
                    <Kbd size="xs" style={{ background: '#121416', color: 'gray', border: '1px solid #2A2D31' }}>⌘</Kbd>
                    <Kbd size="xs" style={{ background: '#121416', color: 'gray', border: '1px solid #2A2D31' }}>K</Kbd>
                  </Group>
                </Group>
              </Group>
            </Group>

            <Group gap="lg">
              <Tooltip label="Live Audit Log (⌘+L)">
                <ActionIcon variant="subtle" color="gray.6" size="lg" onClick={openAudit}>
                  <IconActivity size={20} />
                </ActionIcon>
              </Tooltip>
              <Divider orientation="vertical" h={24} color="#2A2D31" />
              <Group gap="md" visibleFrom="lg">
                <Text ff="var(--font-body)" size="7px" c="dimmed" style={{ letterSpacing: '2px' }}>GLOBAL_SENTIMENT:</Text>
                <Group gap={6}>
                  <Box w={4} h={4} bg="sage" style={{ borderRadius: '100%' }} />
                  <Text ff="var(--font-body)" size="xs" c="sage" fw={700}>STABLE_OPTIMAL</Text>
                </Group>
              </Group>
              <Divider orientation="vertical" h={24} color="#2A2D31" />
              <Group gap="sm">
                <Text ff="var(--font-body)" size="xs" c="#E1E1E1">MICAH_S</Text>
                <ActionIcon
                  variant="subtle"
                  color="burnished-gold"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <IconLogout size={18} />
                </ActionIcon>
              </Group>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <ScrollArea flex={1} mx="-md" px="md">
          <Stack gap="xs" mt="md">
            <Text ff="var(--font-body)" size="7px" c="dimmed" px="md" mb={4} style={{ letterSpacing: '2px' }}>OVERSIGHT</Text>
            <NavLink
              component={Link}
              href="/admin/command"
              label="Approval Desk"
              leftSection={<IconBolt size={20} stroke={1.5} />}
              active={pathname === '/admin/command'}
              color="burnished-gold"
              styles={{ label: { fontFamily: 'var(--font-body)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.5px' } }}
            />
            <NavLink
              component={Link}
              href="/admin/command/projects"
              label="Active Projects"
              leftSection={<IconBriefcase size={20} stroke={1.5} />}
              active={pathname === '/admin/command/projects'}
              color="burnished-gold"
              styles={{ label: { fontFamily: 'var(--font-body)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.5px' } }}
            />
            <NavLink
              component={Link}
              href="/admin/command/leads"
              label="All Leads"
              leftSection={<IconUsers size={20} stroke={1.5} />}
              active={pathname === '/admin/command/leads'}
              color="burnished-gold"
              styles={{ label: { fontFamily: 'var(--font-body)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.5px' } }}
            />
            <NavLink
              component={Link}
              href="/admin/command/inbox"
              label="Global Inbox"
              leftSection={<IconMail size={20} stroke={1.5} />}
              active={pathname === '/admin/command/inbox'}
              color="burnished-gold"
              styles={{ label: { fontFamily: 'var(--font-body)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.5px' } }}
            />

            <Divider my="md" color="#2A2D31" />

            <Text ff="var(--font-body)" size="7px" c="dimmed" px="md" mb={4} style={{ letterSpacing: '2px' }}>AUTHORIZATION_LOOPS</Text>
            <NavLink
              component={Link}
              href="/admin/command/liaison"
              label="Liaison Buffer"
              leftSection={<IconShieldCheck size={20} stroke={1.5} />}
              active={pathname === '/admin/command/liaison'}
              color="burnished-gold"
              styles={{ label: { fontFamily: 'var(--font-body)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.5px' } }}
            />
            <NavLink
              component={Link}
              href="/admin/command/pulses"
              label="Friday Pulse Desk"
              leftSection={<IconCalendarEvent size={20} stroke={1.5} />}
              active={pathname === '/admin/command/pulses'}
              color="burnished-gold"
              styles={{ label: { fontFamily: 'var(--font-body)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.5px' } }}
            />

            <Divider my="md" color="#2A2D31" />

            <Text ff="var(--font-body)" size="7px" c="dimmed" px="md" mb={4} style={{ letterSpacing: '2px' }}>RETAINER_MANAGEMENT</Text>
            <NavLink
              component={Link}
              href="/admin/command/portfolios"
              label="Impact Portfolios"
              leftSection={<IconWorld size={20} stroke={1.5} />}
              active={pathname === '/admin/command/portfolios'}
              color="burnished-gold"
              styles={{ label: { fontFamily: 'var(--font-body)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.5px' } }}
            />
            <NavLink
              component={Link}
              href="/admin/command/opportunities"
              label="Opportunity Curator"
              leftSection={<IconTarget size={20} stroke={1.5} />}
              active={pathname === '/admin/command/opportunities'}
              color="burnished-gold"
              styles={{ label: { fontFamily: 'var(--font-body)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.5px' } }}
            />

            <Divider my="md" color="#2A2D31" />

            <Text ff="var(--font-body)" size="7px" c="dimmed" px="md" mb={4} style={{ letterSpacing: '2px' }}>OPERATIONS</Text>
            <NavLink
              component={Link}
              href="/admin/command/financials"
              label="Financials"
              leftSection={<IconCoin size={20} stroke={1.5} />}
              active={pathname === '/admin/command/financials'}
              color="burnished-gold"
              styles={{ label: { fontFamily: 'var(--font-body)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.5px' } }}
            />
            <NavLink
              component={Link}
              href="/admin/command/production"
              label="Production Engine"
              leftSection={<IconTerminal2 size={20} stroke={1.5} />}
              active={pathname === '/admin/command/production'}
              color="burnished-gold"
              styles={{ label: { fontFamily: 'var(--font-body)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.5px' } }}
            />
          </Stack>
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
