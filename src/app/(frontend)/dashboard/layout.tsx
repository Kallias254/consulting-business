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
  ActionIcon // Added ActionIcon import
} from '@mantine/core';
import {
  IconLayoutDashboard,
  IconHistory,
  IconMail,
  IconCertificate,
  IconShieldCheck,
  IconWorld,
  IconTarget,
  IconLogout // Added IconLogout import
} from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation'; // Added useRouter import

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter(); // Initialize useRouter

  const handleLogout = async () => {
    // Payload logout usually clears the cookie
    await fetch('/api/users/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <AppShell
      header={{ height: 64 }}
      navbar={{ width: 280, breakpoint: 'sm' }}
      padding="xl"
      styles={{
        main: { background: 'var(--mantine-color-parchment-0)', color: 'var(--mantine-color-dark-forest-0)' },
        header: { background: 'white', borderBottom: '1px solid #E0DBCC', zIndex: 101 },
        navbar: { background: 'white', borderRight: '1px solid #E0DBCC' }
      }}
    >
      {/* 1. Harmonized Institutional Header */}
      <AppShell.Header>
        <Container size="xl" h="100%" fluid>
          <Group h="100%" justify="space-between">
            <Group gap="xl">
              <Link href="/" style={{ textDecoration: 'none' }}>
                <Group gap="xs">
                  <span style={{ color: 'var(--mantine-color-deep-green-7)', fontSize: '1.5rem' }}>◈</span>
                  <Title order={4} ff="var(--font-display)" c="deep-green.9" style={{ letterSpacing: '-0.5px', textTransform: 'uppercase' }}>
                    Scientist / <Text component="span" inherit c="burnished-gold.7">Portal</Text>
                  </Title>
                </Group>
              </Link>

              <Divider orientation="vertical" h={24} color="parchment.2" />

              <Group gap="md" visibleFrom="lg">
                <Text ff="var(--font-body)" size="7px" c="dimmed" style={{ letterSpacing: '2px' }}>PROJECT_IDENTIFIER:</Text>
                <Group gap={6}>
                  <Box w={4} h={4} bg="sage" style={{ borderRadius: '100%' }} />
                  <Text ff="var(--font-body)" size="xs" fw={700}>MS-7792-ALPHA</Text>
                </Group>
              </Group>
            </Group>

            <Group gap="lg">
              <Group gap="xs" visibleFrom="md">
                <Text ff="var(--font-body)" size="7px" c="dimmed" style={{ letterSpacing: '2px' }}>PORTAL_GATE:</Text>
                <Badge variant="outline" color="deep-green" radius={0} ff="var(--font-body)" size="xs">
                  SECURE_SESSION
                </Badge>
              </Group>
              <Divider orientation="vertical" h={24} color="parchment.2" />
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
        </Container>
      </AppShell.Header>

      {/* 2. Harmonized Sidebar Navigation */}
      <AppShell.Navbar p="md">
        <ScrollArea flex={1} mx="-md" px="md">
          <Stack gap="xs" mt="md">
            <Text ff="var(--font-body)" size="7px" c="dimmed" px="md" mb={4} style={{ letterSpacing: '2px' }}>RESEARCH REPOSITORY</Text>
            <NavLink
              component={Link}
              href="/dashboard"
              label="Project Overview"
              leftSection={<IconLayoutDashboard size={18} stroke={1.5} />}
              active={pathname === '/dashboard'}
              color="deep-green"
              styles={{ label: { fontFamily: 'var(--font-body)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.5px' } }}
            />
            <NavLink
              component={Link}
              href="/dashboard/history"
              label="Manuscript History"
              leftSection={<IconHistory size={18} stroke={1.5} />}
              active={pathname === '/dashboard/history'}
              color="deep-green"
              styles={{ label: { fontFamily: 'var(--font-body)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.5px' } }}
            />
            <NavLink
              component={Link}
              href="/dashboard/opportunities"
              label="Academic Intelligence"
              leftSection={<IconTarget size={18} stroke={1.5} />}
              active={pathname === '/dashboard/opportunities'}
              color="deep-green"
              styles={{ label: { fontFamily: 'var(--font-body)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.5px' } }}
            />
            <NavLink
              component={Link}
              href="/dashboard/correspondence"
              label="Liaison Correspondence"
              leftSection={<IconMail size={18} stroke={1.5} />}
              active={pathname === '/dashboard/correspondence'}
              color="deep-green"
              styles={{ label: { fontFamily: 'var(--font-body)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.5px' } }}
            />
            <NavLink
              component={Link}
              href="/dashboard/portfolio"
              label="Living Portfolio"
              leftSection={<IconWorld size={18} stroke={1.5} />}
              active={pathname === '/dashboard/portfolio'}
              color="deep-green"
              styles={{ label: { fontFamily: 'var(--font-body)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.5px' } }}
            />

            <Divider my="md" color="parchment.2" />

            <Text ff="var(--font-body)" size="7px" c="dimmed" px="md" mb={4} style={{ letterSpacing: '2px' }}>DELIVERABLES</Text>
            <NavLink
              component={Link}
              href="/dashboard/vault"
              label="Final Publication proofs"
              leftSection={<IconCertificate size={18} stroke={1.5} />}
              active={pathname === '/dashboard/vault'}
              color="deep-green"
              styles={{ label: { fontFamily: 'var(--font-body)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.5px' } }}
            />
            <NavLink
              component={Link}
              href="/dashboard/validation"
              label="Data validation reports"
              leftSection={<IconShieldCheck size={18} stroke={1.5} />}
              active={pathname === '/dashboard/validation'}
              color="deep-green"
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
