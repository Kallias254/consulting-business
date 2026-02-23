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
  ActionIcon, // Added ActionIcon import
  Box,
  ScrollArea
} from '@mantine/core';
import {
  IconClipboardList,
  IconTerminal2,
  IconSend,
  IconFileUpload,
  IconLogout, // Added IconLogout import
  IconLayoutDashboard
} from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation'; // Added useRouter import

export default function ResearcherLayout({ children }: { children: React.ReactNode }) {
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
      data-mantine-color-scheme="light"
      data-theme="light"
      styles={{
        main: { background: '#F9F8F6', color: 'var(--mantine-color-deep-green-9)' },
        header: { background: '#FFFFFF', borderBottom: '1px solid #E0DBCC', zIndex: 101 },
        navbar: { background: 'white', borderRight: '1px solid #E0DBCC' }
      }}
    >
      {/* 1. Standardized Operational Header */}
      <AppShell.Header>
        <Container size="xl" h="100%" fluid>
          <Group h="100%" justify="space-between">
            <Group gap="xl">
              <Link href="/" style={{ textDecoration: 'none' }}>
                <Group gap="xs">
                  <span style={{ color: 'var(--mantine-color-burnished-gold-7)', fontSize: '1.5rem' }}>◈</span>
                  <Title order={4} ff="var(--font-display)" c="var(--mantine-color-deep-green-9)" style={{ letterSpacing: '-0.5px', textTransform: 'uppercase' }}>
                    Researcher / <Text component="span" inherit c="sage">Portal</Text>
                  </Title>
                </Group>
              </Link>

              <Divider orientation="vertical" h={24} color="#E0DBCC" />

              <Group gap="md" visibleFrom="lg">
                <Text ff="var(--font-body)" size="7px" c="var(--mantine-color-gray-6)" style={{ letterSpacing: '2px' }}>UNIT_IDENTIFIER:</Text>
                <Group gap={6}>
                  <Box w={4} h={4} bg="sage" style={{ borderRadius: '100%' }} />
                  <Text ff="var(--font-body)" size="xs" c="var(--mantine-color-deep-green-9)" fw={700}>RES_SARAH_M</Text>
                </Group>
              </Group>
            </Group>

            <Group gap="lg">
              <Group gap="xs" visibleFrom="md">
                <Text ff="var(--font-body)" size="7px" c="var(--mantine-color-gray-6)" style={{ letterSpacing: '2px' }}>ENV_STATUS:</Text>
                <Badge variant="outline" color="sage" size="xs" radius={0} ff="var(--font-body)">PRODUCTION_V4</Badge>
              </Group>
              <Divider orientation="vertical" h={24} color="#E0DBCC" />
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

      {/* 2. Standardized Tactical Navigation */}
      <AppShell.Navbar p="md">
        <ScrollArea flex={1} mx="-md" px="md">
          <Stack gap="xs" mt="md">
            <Text ff="var(--font-body)" size="7px" c="dimmed" px="md" mb={4} style={{ letterSpacing: '2px' }}>ASSIGNMENTS</Text>
            <NavLink
              component={Link}
              href="/researcher"
              label="Workload Overview"
              leftSection={<IconLayoutDashboard size={18} stroke={1.5} />}
              active={pathname === '/researcher'}
              color="deep-green"
              styles={{ label: { fontFamily: 'var(--font-body)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.5px' } }}
            />
            <NavLink
              component={Link}
              href="/researcher/tasks"
              label="Micro-Task Ledger"
              leftSection={<IconClipboardList size={18} stroke={1.5} />}
              active={pathname === '/researcher/tasks'}
              color="deep-green"
              styles={{ label: { fontFamily: 'var(--font-body)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.5px' } }}
            />

            <Divider my="md" color="parchment.2" />

            <Text ff="var(--font-body)" size="7px" c="dimmed" px="md" mb={4} style={{ letterSpacing: '2px' }}>PRODUCTION</Text>
            <NavLink
              component={Link}
              href="/admin/command/production"
              label="Markdown Engine"
              leftSection={<IconTerminal2 size={18} stroke={1.5} />}
              color="deep-green"
              styles={{ label: { fontFamily: 'var(--font-body)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.5px' } }}
            />
            <NavLink
              component={Link}
              href="/researcher/drafts"
              label="Memo Drafting"
              leftSection={<IconSend size={18} stroke={1.5} />}
              active={pathname === '/researcher/drafts'}
              color="deep-green"
              styles={{ label: { fontFamily: 'var(--font-body)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.5px' } }}
            />
            <NavLink
              component={Link}
              href="/dashboard/vault"
              label="Vault Commit"
              leftSection={<IconFileUpload size={18} stroke={1.5} />}
              active={pathname === '/dashboard/vault'}
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

