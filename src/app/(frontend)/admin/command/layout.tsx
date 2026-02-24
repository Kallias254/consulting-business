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
  Drawer,
  Burger
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
  IconLayoutSidebarLeftExpand,
  IconLayoutSidebar,
  IconCompass,
  IconCircleFilled
} from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useDisclosure, useHotkeys, useMediaQuery, useLocalStorage } from '@mantine/hooks';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  const [spotlightOpened, { open: openSpotlight, close: closeSpotlight, toggle: toggleSpotlight }] = useDisclosure(false);
  const [auditOpened, { open: openAudit, close: closeAudit }] = useDisclosure(false);
  const [navbarOpened, setNavbarOpened] = useLocalStorage({
    key: 'admin-sidebar-opened',
    defaultValue: true,
  });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleNavbar = () => setNavbarOpened((prev) => !prev);
  const [mobileNavbarOpened, { toggle: toggleMobileNavbar }] = useDisclosure(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');

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

  const sidebarWidth = navbarOpened ? 280 : 80;

  // Helper for consistent NavLinks with Tooltips
  const NavItem = ({ href, label, icon: Icon, active }: any) => (
    <Tooltip 
      label={label} 
      position="right" 
      disabled={navbarOpened || isMobile} 
      offset={20}
      radius={0}
      styles={{ 
        tooltip: { 
          background: '#0A0B0C', 
          border: '1px solid #2A2D31', 
          color: 'var(--mantine-color-burnished-gold-7)', 
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
        label={(navbarOpened || isMobile) ? label : null}
        leftSection={
          <Box style={{ width: 40, display: 'flex', justifyContent: 'center' }}>
            <Icon size={20} stroke={1.5} />
          </Box>
        }
        active={active}
        color="burnished-gold"
        variant="subtle"
        onClick={() => isMobile && toggleMobileNavbar()}
        styles={{ 
          root: { 
            height: '48px', 
            display: 'flex', 
            justifyContent: (navbarOpened || isMobile) ? 'flex-start' : 'center',
            padding: (navbarOpened || isMobile) ? '0 16px' : '0 20px',
            transition: mounted ? 'all 0.2s ease' : 'none',
            marginBottom: '4px'
          },
          label: { 
            fontFamily: 'var(--font-body)', 
            fontSize: '0.75rem', 
            textTransform: 'uppercase', 
            fontWeight: 500, 
            letterSpacing: '0.5px',
            opacity: (navbarOpened || isMobile) ? 1 : 0,
            transition: mounted ? 'opacity 0.1s ease' : 'none',
            marginLeft: '4px'
          },
          section: {
            margin: 0
          }
        }}
      />
    </Tooltip>
  );

  return (
    <AppShell
      header={{ height: 64 }}
      navbar={{ 
        width: sidebarWidth, 
        breakpoint: 'sm',
        collapsed: { mobile: !mobileNavbarOpened }
      }}
      padding={0}
      styles={{
        main: { 
          background: '#121416', 
          color: '#E1E1E1', 
          transition: mounted ? 'all 0.2s ease' : 'none',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        },
        header: { background: '#121416', borderBottom: '1px solid rgba(255,255,255,0.05)', zIndex: 101 },
        navbar: { 
          background: '#121416', 
          borderRight: '1px solid rgba(255,255,255,0.05)', 
          transition: mounted ? 'width 0.2s ease' : 'none', 
          overflow: 'hidden',
          zIndex: 102
        }
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
            rightSection={<Group gap={4} visibleFrom="sm"><Kbd size="xs">ESC</Kbd></Group>}
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
                    visibleFrom="sm"
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
          </Stack>
        </ScrollArea>
      </Modal>

      {/* 0. Audit Trail Drawer */}
      <Drawer
        opened={auditOpened}
        onClose={closeAudit}
        position="right"
        size={isMobile ? "100%" : "360px"}
        title={<Text ff="var(--font-display)" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>System Audit Trail</Text>}
        styles={{ 
          content: { background: '#0A0B0C', borderLeft: '1px solid #2A2D31' },
          header: { background: '#0A0B0C', color: 'var(--mantine-color-burnished-gold-7)', borderBottom: '1px solid #2A2D31' }
        }}
      >
        <Stack gap="xl" h="100%" p="md">
          <ScrollArea h="calc(100vh - 120px)" offsetScrollbars mx="-md" px="md">
            <Timeline active={-1} bulletSize={8} lineWidth={1} color="#2A2D31">
              {[ { time: '09:12', user: 'DR_CHEN', action: 'REVISION_REQUEST', item: 'Manuscript_v4.pdf', color: 'orange' }, { time: '08:45', user: 'PRINCIPAL', action: 'MEMO_SENT', item: 'Auth_Protocol_Update', color: 'sage' } ].map((log, i) => (
                <Timeline.Item key={i} bullet={<Box w={4} h={4} bg={log.color || '#4A4D51'} style={{ borderRadius: '100%' }} />}>
                  <Box px="xs" py={4} style={{ cursor: 'pointer', transition: 'all 0.15s ease', marginTop: '-4px' }} className="hover:bg-white/5 group">
                    <Group justify="space-between" mb={4} align="flex-start">
                      <Stack gap={0}><Text size="xs" fw={700} c="#E1E1E1">{log.user}</Text><Badge variant="outline" color={log.color || '#4A4D51'} size="xs" radius={0} mt={4} styles={{ root: { height: '12px', border: 'none', padding: 0 }, label: { fontSize: '7px' } }}>{log.action}</Badge></Stack>
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
        <Group h="100%" px={0} gap={0}>
          {/* Section 1: Identity (Logo) */}
          <Box style={{ 
            width: isMobile ? 64 : sidebarWidth, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            transition: mounted ? 'width 0.2s ease' : 'none',
            overflow: 'hidden',
            padding: '0 16px'
          }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Box style={{ position: 'relative', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconCircleFilled size={28} color="var(--mantine-color-burnished-gold-7)" style={{ opacity: 0.15 }} />
                <IconCompass 
                  size={20} 
                  color="var(--mantine-color-burnished-gold-7)" 
                  stroke={2} 
                  style={{ position: 'absolute' }} 
                />
              </Box>
              {navbarOpened && !isMobile && (
                <Text ff="serif" fw={500} size="md" c="parchment" style={{ whiteSpace: 'nowrap', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  Principia Group
                </Text>
              )}
            </Link>
          </Box>

          {/* Section 2: Symmetry Divider (Aligned with Sidebar) */}
          <Divider orientation="vertical" h="100%" color="rgba(255,255,255,0.05)" />

          {/* Section 3: Navigation & Global Actions */}
          <Group px={{ base: 16, sm: 24 }} style={{ flex: 1, position: 'relative' }} h="100%" align="center">
            {/* Left: Toggles */}
            <Group gap="xs">
              <Burger
                opened={mobileNavbarOpened}
                onClick={toggleMobileNavbar}
                hiddenFrom="sm"
                size="sm"
                color="gray.6"
              />
              <ActionIcon variant="subtle" color="gray.6" onClick={toggleNavbar} size="lg" visibleFrom="sm">
                {navbarOpened ? <IconLayoutSidebarLeftCollapse size={20} /> : <IconLayoutSidebarLeftExpand size={20} />}
              </ActionIcon>
            </Group>

            {/* Center: Command Search */}
            {!isMobile && (
              <Box style={{ 
                position: 'absolute', 
                left: '50%', 
                transform: 'translateX(-50%)',
                zIndex: 1 
              }}>
                <Group 
                  bg="#0A0B0C" 
                  p="xs" 
                  px="xl" 
                  style={{ border: '1px solid #2A2D31', cursor: 'pointer', borderRadius: 0, minWidth: '400px' }}
                  onClick={openSpotlight}
                >
                  <Group justify="space-between" style={{ width: '100%' }}>
                    <Group gap="md">
                      <IconSearch size={14} color="var(--mantine-color-gray-6)" />
                      <Text size="xs" c="dimmed" fw={500}>Search directives...</Text>
                    </Group>
                    <Kbd size="xs" style={{ background: '#121416', color: 'gray', border: '1px solid #2A2D31' }} visibleFrom="md">⌘K</Kbd>
                  </Group>
                </Group>
              </Box>
            )}

            {/* Right: Global Actions */}
            <Group gap="md" ml="auto">
              <Tooltip label="Live Audit Log (⌘+L)"><ActionIcon variant="subtle" color="gray.6" size="lg" onClick={openAudit}><IconActivity size={20} /></ActionIcon></Tooltip>
              <Divider orientation="vertical" h={24} color="#2A2D31" visibleFrom="sm" />
              <Group gap="md" visibleFrom="lg">
                <Text ff="var(--font-body)" size="7px" c="dimmed" style={{ letterSpacing: '2px' }}>GLOBAL_SENTIMENT:</Text>
                <Group gap={6}><Box w={4} h={4} bg="sage" style={{ borderRadius: '100%' }} /><Text size="xs" c="sage" fw={700}>STABLE_OPTIMAL</Text></Group>
              </Group>
              <Divider orientation="vertical" h={24} color="#2A2D31" visibleFrom="sm" />
              <ActionIcon variant="subtle" color="burnished-gold" onClick={handleLogout} title="Logout"><IconLogout size={18} /></ActionIcon>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <ScrollArea flex={1} mx="-md" px="md">
          <Stack gap="xs" mt="md">
            {(navbarOpened || isMobile) && <Text ff="var(--font-body)" size="7px" c="dimmed" px="md" mb={4} style={{ letterSpacing: '2px' }}>OVERSIGHT</Text>}
            <NavItem href="/admin/command" label="Approval Desk" icon={IconBolt} active={pathname === '/admin/command'} />
            <NavItem href="/admin/command/projects" label="Active Projects" icon={IconBriefcase} active={pathname === '/admin/command/projects'} />
            <NavItem href="/admin/command/leads" label="All Leads" icon={IconUsers} active={pathname === '/admin/command/leads'} />
            <NavItem href="/admin/command/inbox" label="Global Inbox" icon={IconMail} active={pathname === '/admin/command/inbox'} />

            <Divider my="md" color="#2A2D31" />

            {(navbarOpened || isMobile) && <Text ff="var(--font-body)" size="7px" c="dimmed" px="md" mb={4} style={{ letterSpacing: '2px' }}>AUTHORIZATION_LOOPS</Text>}
            <NavItem href="/admin/command/liaison" label="Liaison Buffer" icon={IconShieldCheck} active={pathname === '/admin/command/liaison'} />
            <NavItem href="/admin/command/pulses" label="Executive Pulse Desk" icon={IconCalendarEvent} active={pathname === '/admin/command/pulses'} />

            <Divider my="md" color="#2A2D31" />

            {(navbarOpened || isMobile) && <Text ff="var(--font-body)" size="7px" c="dimmed" px="md" mb={4} style={{ letterSpacing: '2px' }}>RETAINER_MANAGEMENT</Text>}
            <NavItem href="/admin/command/portfolios" label="Impact Portfolios" icon={IconWorld} active={pathname === '/admin/command/portfolios'} />
            <NavItem href="/admin/command/opportunities" label="Opportunity Curator" icon={IconTarget} active={pathname === '/admin/command/opportunities'} />

            <Divider my="md" color="#2A2D31" />

            {(navbarOpened || isMobile) && <Text ff="var(--font-body)" size="7px" c="dimmed" px="md" mb={4} style={{ letterSpacing: '2px' }}>OPERATIONS</Text>}
            <NavItem href="/admin/command/financials" label="Financials" icon={IconCoin} active={pathname === '/admin/command/financials'} />
            <NavItem href="/admin/command/production" label="Production Engine" icon={IconTerminal2} active={pathname === '/admin/command/production'} />
          </Stack>
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main>
        <Box p={{ base: 20, sm: 40, lg: 60 }} style={{ flex: 1 }}>
          {children}
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}

