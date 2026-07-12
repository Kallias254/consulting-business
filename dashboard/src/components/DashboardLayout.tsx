import { useState } from 'react'
import { Outlet, NavLink as RouterNavLink, useNavigate, useLocation } from 'react-router-dom'
import {
  AppShell, Group, Text, Box, NavLink, Stack, Divider,
  ScrollArea, ActionIcon, Tooltip, Burger, Badge,
} from '@mantine/core'
import { useDisclosure, useLocalStorage } from '@mantine/hooks'
import {
  IconLayoutDashboard, IconMail, IconShieldCheck,
  IconLogout, IconCompass, IconCircleFilled,
  IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand,
  IconUsers, IconClipboardList,
} from '@tabler/icons-react'
import { useAuth } from '@/hooks/useAuth'

interface NavItemProps {
  to: string
  label: string
  icon: React.ElementType
  collapsed: boolean
}

function NavItem({ to, label, icon: Icon, collapsed }: NavItemProps) {
  const location = useLocation()
  const active = location.pathname === to || location.pathname.startsWith(to + '/')

  return (
    <Tooltip label={label} position="right" disabled={!collapsed} offset={20}
      styles={{ tooltip: {
        background: '#FBFBF9', border: '1px solid #E0DBCC',
        color: '#B8873A', fontSize: '10px', textTransform: 'uppercase',
        letterSpacing: '1px', fontWeight: 700,
      }}}
    >
      <NavLink
        component={RouterNavLink}
        to={to}
        label={!collapsed ? label : null}
        leftSection={
          <Box style={{ width: 40, display: 'flex', justifyContent: 'center' }}>
            <Icon size={20} strokeWidth={1.5} />
          </Box>
        }
        active={active}
        color="yellow"
        variant="subtle"
        styles={{
          root: {
            height: 48,
            display: 'flex',
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? '0 20px' : '0 16px',
            marginBottom: 4,
            borderRadius: 0,
            color: active ? '#B8873A' : '#0A1A10',
            backgroundColor: active ? '#F4F1EA' : 'transparent',
          },
          label: {
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            fontWeight: active ? 700 : 600,
            letterSpacing: '0.5px',
          },
          section: { margin: 0 },
        }}
      />
    </Tooltip>
  )
}

export default function DashboardLayout() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false)
  const [collapsed, setCollapsed] = useLocalStorage({ key: 'sidebar-collapsed', defaultValue: false })

  const sidebarWidth = collapsed ? 80 : 280

  const roles: string[] = (user?.roles as string[]) ?? []
  const isAdmin = roles.includes('admin')
  const isResearcher = roles.includes('researcher') || roles.includes('lead_researcher')

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <AppShell
      header={{ height: 64 }}
      navbar={{ width: sidebarWidth, breakpoint: 'sm', collapsed: { mobile: !mobileOpened } }}
      padding={0}
      styles={{
        main: { background: '#F4F1EA', minHeight: '100vh' },
        header: { background: '#FBFBF9', borderBottom: '1px solid #E0DBCC' },
        navbar: { background: '#FBFBF9', borderRight: '1px solid #E0DBCC', transition: 'width 0.2s ease', overflow: 'hidden' },
      }}
    >
      {/* ── Header ── */}
      <AppShell.Header>
        <Group h="100%" px={0} gap={0}>
          {/* Logo */}
          <Box style={{
            width: sidebarWidth, display: 'flex', justifyContent: 'center',
            alignItems: 'center', padding: '0 16px', transition: 'width 0.2s ease',
          }}>
            <RouterNavLink to="/projects" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
              <Box style={{ position: 'relative', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconCircleFilled size={28} color="#B8873A" style={{ opacity: 0.1 }} />
                <IconCompass size={20} color="#B8873A" style={{ position: 'absolute' }} />
              </Box>
              {!collapsed && (
                <Text ff="serif" fw={500} size="md" c="dark"
                  style={{ whiteSpace: 'nowrap', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  Principia
                </Text>
              )}
            </RouterNavLink>
          </Box>

          <Divider orientation="vertical" h="100%" color="#E0DBCC" />

          <Group px={24} style={{ flex: 1 }} h="100%" align="center">
            <Group gap="xs">
              <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
              <ActionIcon variant="subtle" color="gray" onClick={() => setCollapsed(c => !c)} visibleFrom="sm">
                {collapsed ? <IconLayoutSidebarLeftExpand size={20} /> : <IconLayoutSidebarLeftCollapse size={20} />}
              </ActionIcon>
            </Group>

            <Group gap="md" ml="auto" align="center">
              {user && (
                <Badge
                  color="yellow" variant="light" size="sm"
                  style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '1px', textTransform: 'uppercase' }}
                >
                  {roles[0] ?? 'user'}
                </Badge>
              )}
              <Text size="xs" c="dimmed" visibleFrom="sm">
                {user?.email}
              </Text>
              <Divider orientation="vertical" h={24} color="#E0DBCC" visibleFrom="sm" />
              <ActionIcon variant="subtle" color="yellow" onClick={handleLogout} title="Sign out">
                <IconLogout size={18} />
              </ActionIcon>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      {/* ── Sidebar ── */}
      <AppShell.Navbar p="md">
        <ScrollArea flex={1} mx="-md" px="md">
          <Stack gap="xs" mt="md">
            {!collapsed && (
              <Text size="xs" c="dimmed" px="md" mb={4}
                style={{ letterSpacing: '2px', fontWeight: 500, fontSize: '9px', textTransform: 'uppercase' }}>
                Engagements
              </Text>
            )}
            <NavItem to="/projects" label="Projects" icon={IconLayoutDashboard} collapsed={collapsed} />

            {isResearcher && (
              <>
                <Divider my="sm" color="#E0DBCC" />
                {!collapsed && (
                  <Text size="xs" c="dimmed" px="md" mb={4}
                    style={{ letterSpacing: '2px', fontWeight: 500, fontSize: '9px', textTransform: 'uppercase' }}>
                    Researcher
                  </Text>
                )}
                <NavItem to="/researcher" label="My Tasks" icon={IconClipboardList} collapsed={collapsed} />
              </>
            )}

            {isAdmin && (
              <>
                <Divider my="sm" color="#E0DBCC" />
                {!collapsed && (
                  <Text size="xs" c="dimmed" px="md" mb={4}
                    style={{ letterSpacing: '2px', fontWeight: 500, fontSize: '9px', textTransform: 'uppercase' }}>
                    Admin
                  </Text>
                )}
                <NavItem to="/admin" label="Admin Workbench" icon={IconShieldCheck} collapsed={collapsed} />
              </>
            )}
          </Stack>
        </ScrollArea>
      </AppShell.Navbar>

      {/* ── Content ── */}
      <AppShell.Main>
        <Box p={{ base: 20, sm: 40, lg: 60 }}>
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  )
}
