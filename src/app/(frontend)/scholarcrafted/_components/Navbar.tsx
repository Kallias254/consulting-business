'use client'

import React from 'react'
import { Container, Group, Text, Stack, Button, rem, Box, useMantineTheme, HoverCard, SimpleGrid, ThemeIcon, Center } from '@mantine/core'
import Link from 'next/link'
import { IconBook, IconPencil, IconMicroscope, IconFileText, IconArticle, IconChevronDown } from '@tabler/icons-react'

export function Navbar() {
  const theme = useMantineTheme()
  const active = theme.other

  return (
    <Box
      component="nav"
      py="md"
      style={{
        borderBottom: `1px solid ${active.primary}12`,
        backgroundColor: `${active.background}f2`,
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      <Container size={1100}>
        <Group justify="space-between" align="center">
          <Link href="/scholarcrafted" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Stack gap={0}>
              <Text
                fw={700}
                style={{
                  fontSize: rem(22),
                  lineHeight: 1,
                  color: active.primary,
                  letterSpacing: '-0.02em' }}
              >
                SCHOLARCRAFTED
              </Text>
              <Text
                size="xs"
                c="dimmed"
                fw={500}
                style={{ fontSize: rem(9), letterSpacing: '0.05em', textTransform: 'uppercase' }}
              >
                Academic Consultancy
              </Text>
            </Stack>
          </Link>

          <Group gap="xl" visibleFrom="sm" align="center">
            <HoverCard width={600} position="bottom" radius={0} shadow="xl" withinPortal offset={20} transitionProps={{ transition: 'pop-top-left' }}>
              <HoverCard.Target>
                <Box style={{ cursor: 'pointer' }}>
                  <Center inline>
                    <Text
                      fw={600}
                      size="xs"
                      className="nav-link"
                      style={{ letterSpacing: '0.1em', display: 'flex', alignItems: 'center' }}
                    >
                      SERVICES <IconChevronDown size={14} style={{ marginLeft: rem(6), opacity: 0.6 }} />
                    </Text>
                  </Center>
                </Box>
              </HoverCard.Target>
              <HoverCard.Dropdown style={{ overflow: 'hidden', padding: 0, border: `1px solid ${active.primary}15` }}>
                <SimpleGrid cols={2} spacing={0}>
                  <Link href="/scholarcrafted/services/private-coaching" className="mega-link">
                    <Group wrap="nowrap" align="center" p="lg">
                      <ThemeIcon size={40} variant="light" color={active.primary} radius={0}>
                        <IconBook size={24} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={600} c="dark.9">Private Coaching</Text>
                        <Text size="xs" c="dimmed" style={{ lineHeight: 1.4 }}>1-on-1 strategic dissertation guidance.</Text>
                      </div>
                    </Group>
                  </Link>
                  <Link href="/scholarcrafted/services/editing-proofreading" className="mega-link">
                    <Group wrap="nowrap" align="center" p="lg">
                      <ThemeIcon size={40} variant="light" color={active.primary} radius={0}>
                        <IconPencil size={24} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={600} c="dark.9">Editing & Proofreading</Text>
                        <Text size="xs" c="dimmed" style={{ lineHeight: 1.4 }}>Professional academic review and copyediting.</Text>
                      </div>
                    </Group>
                  </Link>
                  <Link href="/scholarcrafted/services/research-support" className="mega-link">
                    <Group wrap="nowrap" align="center" p="lg">
                      <ThemeIcon size={40} variant="light" color={active.primary} radius={0}>
                        <IconMicroscope size={24} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={600} c="dark.9">Research Support</Text>
                        <Text size="xs" c="dimmed" style={{ lineHeight: 1.4 }}>Methodology and data analysis consulting.</Text>
                      </div>
                    </Group>
                  </Link>
                </SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>

            <Link
              href="/scholarcrafted/how-it-works"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Box style={{ cursor: 'pointer' }}>
                <Center inline>
                  <Text
                    fw={600}
                    size="xs"
                    className="nav-link"
                    style={{ letterSpacing: '0.1em', display: 'flex', alignItems: 'center', minHeight: rem(14) }}
                  >
                    HOW IT WORKS
                  </Text>
                </Center>
              </Box>
            </Link>

            <HoverCard width={320} position="bottom" radius={0} shadow="xl" withinPortal offset={20} transitionProps={{ transition: 'pop-top-left' }}>
              <HoverCard.Target>
                <Box style={{ cursor: 'pointer' }}>
                  <Center inline>
                    <Text
                      fw={600}
                      size="xs"
                      className="nav-link"
                      style={{ letterSpacing: '0.1em', display: 'flex', alignItems: 'center' }}
                    >
                      RESOURCES <IconChevronDown size={14} style={{ marginLeft: rem(6), opacity: 0.6 }} />
                    </Text>
                  </Center>
                </Box>
              </HoverCard.Target>
              <HoverCard.Dropdown style={{ overflow: 'hidden', padding: 0, border: `1px solid ${active.primary}15` }}>
                <SimpleGrid cols={1} spacing={0}>
                  <Link href="/scholarcrafted/resources" className="mega-link">
                    <Group wrap="nowrap" align="center" p="lg">
                      <ThemeIcon size={40} variant="light" color={active.primary} radius={0}>
                        <IconFileText size={24} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={600} c="dark.9">Academic Blueprints</Text>
                        <Text size="xs" c="dimmed" style={{ lineHeight: 1.4 }}>Curated dissertation templates and literature matrices.</Text>
                      </div>
                    </Group>
                  </Link>
                  <Link href="/scholarcrafted/resources/articles" className="mega-link">
                    <Group wrap="nowrap" align="center" p="lg">
                      <ThemeIcon size={40} variant="light" color={active.primary} radius={0}>
                        <IconArticle size={24} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={600} c="dark.9">Articles & Guides</Text>
                        <Text size="xs" c="dimmed" style={{ lineHeight: 1.4 }}>Expert strategies for research design and defense.</Text>
                      </div>
                    </Group>
                  </Link>
                </SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>

            <Link href="/scholarcrafted/about" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Text
                fw={600}
                size="xs"
                className="nav-link"
                style={{ cursor: 'pointer', letterSpacing: '0.1em' }}
              >
                ABOUT
              </Text>
            </Link>

            <Link href="/scholarcrafted/consultation?interest=other&metBefore=no" style={{ textDecoration: 'none' }}>
              <Button
                variant="outline"
                color={active.primary}
                size="sm"
                radius={0}
                fw={700}
                style={{
                  fontSize: rem(10),
                  letterSpacing: '0.15em',
                  paddingLeft: rem(20),
                  paddingRight: rem(20),
                  height: rem(40),
                  borderColor: `${active.primary}40`,
                  borderWidth: rem(1) }}
              >
                FREE CONSULTATION
              </Button>
            </Link>
          </Group>
        </Group>
      </Container>
      <style jsx global>{`
        .nav-link {
          color: #444;
          transition: all 0.2s ease;
        }
        .nav-link:hover {
          color: ${active.primary} !important;
          opacity: 0.8;
        }
        .mega-link {
          text-decoration: none;
          color: inherit;
          display: block;
          transition: background-color 0.2s ease;
        }
        .mega-link:hover {
          background-color: ${active.primary}05;
        }
      `}</style>
    </Box>
  )
}
