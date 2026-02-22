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
  ScrollArea
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
  IconCalendarEvent
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LogoutButton } from '@/components/ui/LogoutButton';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AppShell
      header={{ height: 64 }}
      navbar={{ width: 280, breakpoint: 'sm' }}
      aside={{ width: 300, breakpoint: 'md' }}
      padding="xl"
      styles={{
        main: { background: 'var(--mantine-color-deep-green-9)', color: 'var(--mantine-color-parchment-0)' },
        header: { background: 'var(--mantine-color-deep-green-9)', borderBottom: '1px solid rgba(255,255,255,0.05)', zIndex: 101 },
        navbar: { background: 'var(--mantine-color-deep-green-9)', borderRight: '1px solid rgba(255,255,255,0.05)' },
        aside: { background: 'var(--mantine-color-deep-green-9)', borderLeft: '1px solid rgba(255,255,255,0.05)' }
      }}
    >
      {/* 1. Global Command Header */}
      <AppShell.Header>
        <Container size="xl" h="100%" fluid>
          <Group h="100%" justify="space-between">
            <Group gap="xl">
              <Group gap="xs" component={Link} href="/" style={{ textDecoration: 'none' }}>
                <span style={{ color: 'var(--mantine-color-burnished-gold-7)', fontSize: '1.5rem' }}>◈</span>
                <Title order={4} ff="var(--font-display)" c="parchment" style={{ letterSpacing: '-0.5px', textTransform: 'uppercase' }}>
                  Command / <Text component="span" inherit c="burnished-gold.7">Center</Text>
                </Title>
              </Group>
              
              <Divider orientation="vertical" h={24} color="deep-green.8" />
              
              <Group gap="md" visibleFrom="lg">
                <Text ff="var(--font-body)" size="7px" c="deep-green.3" tracking="2px">GLOBAL_SENTIMENT:</Text>
                <Group gap={6}>
                  <Box w={4} h={4} bg="sage" radius="full" />
                  <Text ff="var(--font-body)" size="xs" c="sage" fw={700}>STABLE_OPTIMAL</Text>
                </Group>
              </Group>
            </Group>

            <Group gap="lg">
              <Group gap="xs" visibleFrom="md">
                <Text ff="var(--font-body)" size="7px" c="deep-green.3" tracking="2px">ACCESS_LEVEL:</Text>
                <Text ff="var(--font-body)" size="xs" fw={700} c="burnished-gold.7">PRINCIPAL_ROOT</Text>
              </Group>
              <Divider orientation="vertical" h={24} color="deep-green.8" />
              <Group gap="sm">
                <Text ff="var(--font-body)" size="xs" c="parchment">MICAH_S</Text>
                <LogoutButton />
              </Group>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      {/* 2. Admin Navigation: Strategic Hierarchy */}
      <AppShell.Navbar p="md">
        <ScrollArea flex={1} mx="-md" px="md">
          <Stack gap="xs" mt="md">
            <Text ff="var(--font-body)" size="7px" c="deep-green.3" px="md" mb={4} style={{ letterSpacing: '2px' }}>OVERSIGHT</Text>
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
            
            <Divider my="md" color="deep-green.8" />
            
            <Text ff="var(--font-body)" size="7px" c="deep-green.3" px="md" mb={4} style={{ letterSpacing: '2px' }}>AUTHORIZATION_LOOPS</Text>
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

            <Divider my="md" color="deep-green.8" />
            
            <Text ff="var(--font-body)" size="7px" c="deep-green.3" px="md" mb={4} style={{ letterSpacing: '2px' }}>RETAINER_MANAGEMENT</Text>
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

            <Divider my="md" color="deep-green.8" />
            
            <Text ff="var(--font-body)" size="7px" c="deep-green.3" px="md" mb={4} style={{ letterSpacing: '2px' }}>OPERATIONS</Text>
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

      {/* 3. Intelligence Feed (Right Aside) */}
      <AppShell.Aside p="md">
        <Stack gap="xl" h="100%">
          <Box>
            <Title order={5} ff="var(--font-display)" c="burnished-gold" mb="md" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
              Intelligence Feed
            </Title>
            <Box h={1} bg="deep-green.8" mb="xl" />
            
            <ScrollArea h="calc(100vh - 200px)" offsetScrollbars mx="-md" px="md">
              <Stack gap="lg">
                {[
                  { time: '09:12', user: 'DR_CHEN', action: 'DOC_DOWNLOAD', item: 'Manuscript_v4.pdf' },
                  { time: '08:45', user: 'PRINCIPAL', action: 'MEMO_SENT', item: 'Revision_Request' },
                  { time: '08:30', user: 'SYSTEM', action: 'WASM_COMPILE', item: 'SUCCESS_2.4s' },
                  { time: 'Yesterday', user: 'DR_CHEN', action: 'PORTAL_LOGIN', item: 'IP_192.168.1.45' },
                  { time: 'Yesterday', user: 'DR_ROSS', action: 'NEW_SUBMISSION', item: 'Project_Alpha' },
                ].map((log, i) => (
                  <Box key={i} style={{ borderLeft: '1px solid var(--mantine-color-deep-green-8)', paddingLeft: '16px' }}>
                    <Group justify="space-between" mb={4}>
                      <Text ff="var(--font-body)" size="7px" c="burnished-gold">{log.time}</Text>
                      <Text ff="var(--font-body)" size="7px" c="deep-green.3">{log.action}</Text>
                    </Group>
                    <Text ff="var(--font-body)" size="xs" fw={700} c="parchment">{log.user}</Text>
                    <Text size="xs" c="dimmed" mt={2}>{log.item}</Text>
                  </Box>
                ))}
              </Stack>
            </ScrollArea>
          </Box>
          
          <Box mt="auto" p="md" bg="black" style={{ border: '1px solid var(--mantine-color-deep-green-8)' }}>
            <Group justify="space-between">
              <Text ff="var(--font-body)" size="7px" c="deep-green.3">DB_CONNECTION:</Text>
              <Text ff="var(--font-body)" size="7px" c="sage">ACTIVE</Text>
            </Group>
          </Box>
        </Stack>
      </AppShell.Aside>
    </AppShell>
  );
}
