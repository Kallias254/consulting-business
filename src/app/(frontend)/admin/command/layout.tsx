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
  IconActivity,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand
} from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useDisclosure, useHotkeys } from '@mantine/hooks';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [spotlightOpened, { open: openSpotlight, close: closeSpotlight, toggle: toggleSpotlight }] = useDisclosure(false);
  const [auditOpened, { open: openAudit, close: closeAudit }] = useDisclosure(false);
  const [navbarOpened, { toggle: toggleNavbar }] = useDisclosure(true);
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
    ['mod+B', () => toggleNavbar()],
  ]);

  const handleLogout = async () => {
    await fetch('/api/users/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  // Helper for consistent NavLinks with Tooltips
  const NavItem = ({ href, label, icon: Icon, active }: any) => (
    <Tooltip 
      label={label} 
      position="right" 
      disabled={navbarOpened} 
      offset={20}
      radius={0}
      styles={{ 
        tooltip: { 
          background: '#0A0B0C', 
          border: '1px solid #2A2D31', 
          color: 'var(--mantine-color-burnished-gold-7)', // Fixed black text issue
          fontSize: '10px', 
          textTransform: 'uppercase', 
          letterSpacing: '1px',
          fontWeight: 700,
          boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
        } 
      }}
    >
      <NavLink
        component={Link}
        href={href}
        label={navbarOpened ? label : null}
        leftSection={
          <Box style={{ width: 40, display: 'flex', justifyContent: 'center' }}>
            <Icon size={20} stroke={1.5} />
          </Box>
        }
        active={active}
        color="burnished-gold"
        variant="subtle"
        styles={{ 
          root: { 
            height: '48px', 
            display: 'flex', 
            justifyContent: navbarOpened ? 'flex-start' : 'center',
            padding: navbarOpened ? '0 16px' : '0 20px', // Extra padding to ensure centering in 80px track
            transition: 'all 0.2s ease',
            marginBottom: '4px',
            '&[data-active]': {
              backgroundColor: 'rgba(176, 141, 87, 0.1)',
              borderRight: navbarOpened ? 'none' : '2px solid var(--mantine-color-burnished-gold-7)'
            }
          },
          label: { 
            fontFamily: 'var(--font-body)', 
            fontSize: '0.75rem', 
            textTransform: 'uppercase', 
            fontWeight: 500, 
            letterSpacing: '0.5px',
            opacity: navbarOpened ? 1 : 0,
            transition: 'opacity 0.1s ease',
            marginLeft: '4px'
          },
          section: {
            margin: 0 // Managed by Box width now
          }
        }}
      />
    </Tooltip>
  );

  return (
    <AppShell
      header={{ height: 64 }}
      navbar={{ 
        width: navbarOpened ? 280 : 80, 
        breakpoint: 'sm'
      }}
      padding={0} // Controlled internally for precision
      styles={{
        main: { 
          background: '#121416', 
          color: '#E1E1E1', 
          transition: 'margin-left 0.2s ease',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        },
        header: { background: '#121416', borderBottom: '1px solid rgba(255,255,255,0.05)', zIndex: 101 },
        navbar: { 
          background: '#121416', 
          borderRight: '1px solid rgba(255,255,255,0.05)', 
          transition: 'width 0.2s ease', 
          overflow: 'hidden',
          zIndex: 102
        }
      }}
    >
      {/* Search Modal */}
      <Modal opened={spotlightOpened} onClose={closeSpotlight} size="lg" padding={0} radius={0} withCloseButton={false} styles={{ content: { background: '#0A0B0C', border: '1px solid #2A2D31' } }}>
        <Box p="md">
          <TextInput placeholder="Type a command..." size="lg" variant="unstyled" leftSection={<IconSearch size={20} color="var(--mantine-color-burnished-gold-7)" />} styles={{ input: { color: 'white', paddingLeft: '40px' } }} autoFocus />
        </Box>
        <Divider color="#2A2D31" />
        <ScrollArea h={400} p="md">
          <Stack gap={4}>
            <Text ff="var(--font-body)" size="10px" fw={600} c="dimmed" mb={8} px="md" style={{ letterSpacing: '2px' }}>QUICK_DIRECTIVES</Text>
            {spotlightActions.map((action, i) => (
              <UnstyledButton key={i} p="md" onClick={() => { router.push(action.href); closeSpotlight(); }} style={{ width: '100%', background: activeIndex === i ? 'rgba(255,255,255,0.05)' : 'transparent', borderLeft: activeIndex === i ? '2px solid var(--mantine-color-burnished-gold-7)' : '2px solid transparent' }}>
                <Group justify="space-between">
                  <Group gap="md">
                    <ThemeIcon variant="subtle" color={activeIndex === i ? 'burnished-gold' : 'gray.6'} size="sm">{action.icon}</ThemeIcon>
                    <Text size="sm" c={activeIndex === i ? 'white' : '#E1E1E1'}>{action.label}</Text>
                  </Group>
                  <Badge variant="outline" color="burnished-gold" size="sm" radius={0} styles={{ label: { fontSize: '9px', fontWeight: 700 } }}>{action.shortcut}</Badge>
                </Group>
              </UnstyledButton>
            ))}
          </Stack>
        </ScrollArea>
      </Modal>

      {/* Audit Drawer */}
      <Drawer opened={auditOpened} onClose={closeAudit} position="right" size="360px" title={<Text ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>System Audit Trail</Text>} styles={{ content: { background: '#0A0B0C', borderLeft: '1px solid #2A2D31' }, header: { background: '#0A0B0C', color: 'var(--mantine-color-burnished-gold-7)', borderBottom: '1px solid #2A2D31' } }}>
        <Stack gap="xl" h="100%" p="md">
          <ScrollArea h="calc(100vh - 120px)" offsetScrollbars mx="-md" px="md">
            <Timeline active={-1} bulletSize={8} lineWidth={1} color="#2A2D31">
              {[ { time: '09:12', user: 'DR_CHEN', action: 'REVISION_REQUEST', item: 'Manuscript_v4.pdf', color: 'orange' }, { time: '08:45', user: 'PRINCIPAL', action: 'MEMO_SENT', item: 'Auth_Protocol_Update', color: 'sage' } ].map((log, i) => (
                <Timeline.Item key={i} bullet={<Box w={4} h={4} bg={log.color || '#4A4D51'} style={{ borderRadius: '100%' }} />}>
                  <Box px="xs" py={4} className="hover:bg-white/5 group">
                    <Group justify="space-between" mb={4} align="flex-start">
                      <Stack gap={0}><Text size="xs" fw={700} c="#E1E1E1">{log.user}</Text><Badge variant="outline" color={log.color || '#4A4D51'} size="xs" radius={0} styles={{ label: { fontSize: '7px' } }}>{log.action}</Badge></Stack>
                      <Text size="7px" c="dimmed">{log.time}</Text>
                    </Group>
                    <Text size="xs" c="dimmed" style={{ fontSize: '10px' }}>{log.item}</Text>
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
              <Group gap="md">
                <ActionIcon variant="subtle" color="gray.6" onClick={toggleNavbar} title={navbarOpened ? "Collapse Sidebar" : "Expand Sidebar"}>
                  {navbarOpened ? <IconLayoutSidebarLeftCollapse size={20} /> : <IconLayoutSidebarLeftExpand size={20} />}
                </ActionIcon>
                <Link href="/" style={{ textDecoration: 'none' }}>
                  <Group gap="xs">
                    <span style={{ color: 'var(--mantine-color-burnished-gold-7)', fontSize: '1.5rem' }}>◈</span>
                    {navbarOpened && (
                      <Title order={4} ff="var(--font-display)" c="#E1E1E1" style={{ letterSpacing: '-0.5px', textTransform: 'uppercase' }}>
                        Command / <Text component="span" inherit c="burnished-gold.7">Center</Text>
                      </Title>
                    )}
                  </Group>
                </Link>
              </Group>
              <Divider orientation="vertical" h={24} color="#2A2D31" />
              <Group bg="#0A0B0C" p="xs" px="md" style={{ border: '1px solid #2A2D31', cursor: 'pointer' }} onClick={openSpotlight}>
                <Group gap="md">
                  <IconSearch size={14} color="var(--mantine-color-gray-6)" />
                  {navbarOpened && <Text size="xs" c="dimmed" fw={500}>Search directives...</Text>}
                  <Group gap={4}><Kbd size="xs" style={{ background: '#121416', color: 'gray', border: '1px solid #2A2D31' }}>⌘K</Kbd></Group>
                </Group>
              </Group>
            </Group>

            <Group gap="lg">
              <Tooltip label="Live Audit Log (⌘+L)"><ActionIcon variant="subtle" color="gray.6" size="lg" onClick={openAudit}><IconActivity size={20} /></ActionIcon></Tooltip>
              <Divider orientation="vertical" h={24} color="#2A2D31" />
              <Group gap="md" visibleFrom="lg">
                <Text ff="var(--font-body)" size="7px" c="dimmed" style={{ letterSpacing: '2px' }}>GLOBAL_SENTIMENT:</Text>
                <Group gap={6}><Box w={4} h={4} bg="sage" style={{ borderRadius: '100%' }} /><Text size="xs" c="sage" fw={700}>STABLE_OPTIMAL</Text></Group>
              </Group>
              <Divider orientation="vertical" h={24} color="#2A2D31" />
              <ActionIcon variant="subtle" color="burnished-gold" onClick={handleLogout} title="Logout"><IconLogout size={18} /></ActionIcon>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <ScrollArea flex={1} mx="-md" px="md">
          <Stack gap="xs" mt="md">
            {navbarOpened && <Text ff="var(--font-body)" size="7px" c="dimmed" px="md" mb={4} style={{ letterSpacing: '2px' }}>OVERSIGHT</Text>}
            <NavItem href="/admin/command" label="Approval Desk" icon={IconBolt} active={pathname === '/admin/command'} />
            <NavItem href="/admin/command/projects" label="Active Projects" icon={IconBriefcase} active={pathname === '/admin/command/projects'} />
            <NavItem href="/admin/command/leads" label="All Leads" icon={IconUsers} active={pathname === '/admin/command/leads'} />
            <NavItem href="/admin/command/inbox" label="Global Inbox" icon={IconMail} active={pathname === '/admin/command/inbox'} />

            <Divider my="md" color="#2A2D31" />

            {navbarOpened && <Text ff="var(--font-body)" size="7px" c="dimmed" px="md" mb={4} style={{ letterSpacing: '2px' }}>AUTHORIZATION_LOOPS</Text>}
            <NavItem href="/admin/command/liaison" label="Liaison Buffer" icon={IconShieldCheck} active={pathname === '/admin/command/liaison'} />
            <NavItem href="/admin/command/pulses" label="Friday Pulse Desk" icon={IconCalendarEvent} active={pathname === '/admin/command/pulses'} />

            <Divider my="md" color="#2A2D31" />

            {navbarOpened && <Text ff="var(--font-body)" size="7px" c="dimmed" px="md" mb={4} style={{ letterSpacing: '2px' }}>RETAINER_MANAGEMENT</Text>}
            <NavItem href="/admin/command/portfolios" label="Impact Portfolios" icon={IconWorld} active={pathname === '/admin/command/portfolios'} />
            <NavItem href="/admin/command/opportunities" label="Opportunity Curator" icon={IconTarget} active={pathname === '/admin/command/opportunities'} />

            <Divider my="md" color="#2A2D31" />

            {navbarOpened && <Text ff="var(--font-body)" size="7px" c="dimmed" px="md" mb={4} style={{ letterSpacing: '2px' }}>OPERATIONS</Text>}
            <NavItem href="/admin/command/financials" label="Financials" icon={IconCoin} active={pathname === '/admin/command/financials'} />
            <NavItem href="/admin/command/production" label="Production Engine" icon={IconTerminal2} active={pathname === '/admin/command/production'} />
          </Stack>
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main>
        <Box p={60} style={{ flex: 1 }}>
          {children}
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
