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
  ScrollArea,
  Box,
  ActionIcon,
  Tooltip,
  Burger,
  Kbd
} from '@mantine/core';
import {
  IconLayoutDashboard,
  IconHistory,
  IconMail,
  IconCertificate,
  IconShieldCheck,
  IconWorld,
  IconTarget,
  IconLogout,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconCompass,
  IconCircleFilled
} from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useDisclosure, useMediaQuery, useLocalStorage, useHotkeys } from '@mantine/hooks';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  const [navbarOpened, setNavbarOpened] = useLocalStorage({
    key: 'dashboard-sidebar-opened',
    defaultValue: true,
  });
  const [mobileNavbarOpened, { toggle: toggleMobileNavbar }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleNavbar = () => setNavbarOpened((prev) => !prev);

  useHotkeys([
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
          background: '#FBFBF9', 
          border: '1px solid #E0DBCC', 
          color: 'var(--mantine-color-burnished-gold-7)', 
          fontSize: '10px', 
          textTransform: 'uppercase', 
          letterSpacing: '1px',
          fontWeight: 700,
          boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
        } 
      }}
    >
      <NavLink
        component={Link}
        href={href}
        label={(navbarOpened || isMobile) ? label : null}
        leftSection={
          <Box style={{ width: 40, display: 'flex', justifyContent: 'center' }}>
            <Icon 
              size={20} 
              stroke={1.5} 
            />
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
            marginBottom: '4px',
            borderRadius: 0,
            backgroundColor: 'transparent',
            color: active ? 'var(--mantine-color-burnished-gold-7)' : '#0A140F',
            // Tailwind-like hover logic
            '&:hover': {
              backgroundColor: '#F4F1EA !important',
              color: 'var(--mantine-color-burnished-gold-7) !important',
            },
          },
          label: { 
            fontFamily: 'var(--font-body)', 
            fontSize: '0.75rem', 
            textTransform: 'uppercase', 
            fontWeight: active ? 700 : 500, 
            letterSpacing: '0.5px',
            opacity: (navbarOpened || isMobile) ? 1 : 0,
            color: 'inherit',
            marginLeft: '4px'
          },
          section: {
            margin: 0,
            color: 'inherit'
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
          background: '#F4F1EA', 
          color: '#0A140F', 
          transition: mounted ? 'all 0.2s ease' : 'none',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        },
        header: { background: '#FBFBF9', borderBottom: '1px solid #E0DBCC', zIndex: 101 },
        navbar: { 
          background: '#FBFBF9', 
          borderRight: '1px solid #E0DBCC', 
          transition: mounted ? 'width 0.2s ease' : 'none', 
          overflow: 'hidden',
          zIndex: 102
        }
      }}
    >
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
            <Link href="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Box style={{ position: 'relative', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconCircleFilled size={28} color="var(--mantine-color-burnished-gold-7)" style={{ opacity: 0.1 }} />
                <IconCompass 
                  size={20} 
                  color="var(--mantine-color-burnished-gold-7)" 
                  stroke={2} 
                  style={{ position: 'absolute' }} 
                />
              </Box>
              {navbarOpened && !isMobile && (
                <Text ff="serif" fw={500} size="md" c="deep-green.9" style={{ whiteSpace: 'nowrap', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  Principia
                </Text>
              )}
            </Link>
          </Box>

          <Divider orientation="vertical" h="100%" color="#E0DBCC" />

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

            {/* Center: Context */}
            {!isMobile && (
              <Box style={{ 
                position: 'absolute', 
                left: '50%', 
                transform: 'translateX(-50%)',
                zIndex: 1 
              }}>
                <Group gap="md">
                  <Text ff="var(--font-body)" size="9px" c="#4A4D51" style={{ letterSpacing: '2px', fontWeight: 700 }}>PROJECT_LIFECYCLE:</Text>
                  <Group gap={6}>
                    <Box w={4} h={4} bg="sage" style={{ borderRadius: '100%' }} />
                    <Text ff="var(--font-body)" size="xs" fw={700} c="deep-green.9">MS-7792-ALPHA</Text>
                  </Group>
                </Group>
              </Box>
            )}

            {/* Right: Global Actions */}
            <Group gap="md" ml="auto">
              <Group gap="xs" visibleFrom="md">
                <Badge variant="outline" color="sage" radius={0} size="xs" style={{ letterSpacing: '1px' }}>SECURE_PORTAL</Badge>
              </Group>
              <Divider orientation="vertical" h={24} color="#E0DBCC" visibleFrom="sm" />
              <ActionIcon variant="subtle" color="burnished-gold" onClick={handleLogout} title="Logout"><IconLogout size={18} /></ActionIcon>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <ScrollArea flex={1} mx="-md" px="md">
          <Stack gap="xs" mt="md">
            {(navbarOpened || isMobile) && <Text ff="var(--font-body)" size="9px" c="#4A4D51" px="md" mb={4} style={{ letterSpacing: '2px', fontWeight: 700 }}>RESEARCH_REPOSITORY</Text>}
            <NavItem href="/dashboard" label="Project Overview" icon={IconLayoutDashboard} active={pathname === '/dashboard'} />
            <NavItem href="/dashboard/history" label="Manuscript History" icon={IconHistory} active={pathname === '/dashboard/history'} />
            <NavItem href="/dashboard/opportunities" label="Academic Intelligence" icon={IconTarget} active={pathname === '/dashboard/opportunities'} />
            
            <Divider my="md" color="#E0DBCC" />

            {(navbarOpened || isMobile) && <Text ff="var(--font-body)" size="9px" c="#4A4D51" px="md" mb={4} style={{ letterSpacing: '2px', fontWeight: 700 }}>CORRESPONDENCE</Text>}
            <NavItem href="/dashboard/correspondence" label="Liaison Record" icon={IconMail} active={pathname === '/dashboard/correspondence'} />
            <NavItem href="/dashboard/portfolio" label="Living Portfolio" icon={IconWorld} active={pathname === '/dashboard/portfolio'} />

            <Divider my="md" color="#E0DBCC" />

            {(navbarOpened || isMobile) && <Text ff="var(--font-body)" size="9px" c="#4A4D51" px="md" mb={4} style={{ letterSpacing: '2px', fontWeight: 700 }}>FINAL_DELIVERABLES</Text>}
            <NavItem href="/dashboard/vault" label="Publication Vault" icon={IconCertificate} active={pathname === '/dashboard/vault'} />
            <NavItem href="/dashboard/validation" label="Technical Reports" icon={IconShieldCheck} active={pathname === '/dashboard/validation'} />
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
