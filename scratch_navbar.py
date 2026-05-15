import os

navbar_code = """'use client'

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
        borderBottom: `1px solid var(--color-border)`,
        backgroundColor: `${active.background}ee`,
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease' }}
    >
      <Container size={1100}>
        <Group justify="space-between">
          <Link href="/scholarcrafted" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Stack gap={0}>
              <Text
                fw={700}
                style={{
                  fontSize: rem(22),
                  lineHeight: 1,
                  color: active.primary }}
              >
                SCHOLARCRAFTED
              </Text>
              <Text
                size="xs"
                c="dimmed"
                style={{ fontSize: rem(9) }}
              >
                Academic Consultancy
              </Text>
            </Stack>
          </Link>
          <Group gap="xl" visibleFrom="sm">
            <HoverCard width={600} position="bottom" radius={0} shadow="md" withinPortal offset={10}>
              <HoverCard.Target>
                <Link
                  href="/scholarcrafted/services"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Center inline>
                    <Text
                      fw={500}
                      size="xs"
                      className="nav-link"
                      style={{ cursor: 'pointer', letterSpacing: '0.1em' }}
                    >
                      SERVICES <IconChevronDown size={14} style={{ marginLeft: rem(4) }} />
                    </Text>
                  </Center>
                </Link>
              </HoverCard.Target>
              <HoverCard.Dropdown style={{ overflow: 'hidden', padding: 0 }} radius={0} bg="white">
                <SimpleGrid cols={2} spacing={0}>
                  <Link href="/scholarcrafted/services/private-coaching" className="mega-link">
                    <Group wrap="nowrap" align="flex-start" p="md">
                      <ThemeIcon size={34} variant="light" color={active.primary} radius={0}>
                        <IconBook size={22} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={600} c="dark.9">Private Coaching</Text>
                        <Text size="xs" c="dimmed">1-on-1 strategic dissertation guidance.</Text>
                      </div>
                    </Group>
                  </Link>
                  <Link href="/scholarcrafted/services/editing-proofreading" className="mega-link">
                    <Group wrap="nowrap" align="flex-start" p="md">
                      <ThemeIcon size={34} variant="light" color={active.primary} radius={0}>
                        <IconPencil size={22} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={600} c="dark.9">Editing & Proofreading</Text>
                        <Text size="xs" c="dimmed">Professional academic review and copyediting.</Text>
                      </div>
                    </Group>
                  </Link>
                  <Link href="/scholarcrafted/services/research-support" className="mega-link">
                    <Group wrap="nowrap" align="flex-start" p="md">
                      <ThemeIcon size={34} variant="light" color={active.primary} radius={0}>
                        <IconMicroscope size={22} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={600} c="dark.9">Research Support</Text>
                        <Text size="xs" c="dimmed">Methodology and data analysis consulting.</Text>
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
              <Text
                fw={500}
                size="xs"
                className="nav-link"
                style={{ cursor: 'pointer', letterSpacing: '0.1em' }}
              >
                HOW IT WORKS
              </Text>
            </Link>

            <HoverCard width={300} position="bottom" radius={0} shadow="md" withinPortal offset={10}>
              <HoverCard.Target>
                <Link
                  href="/scholarcrafted/resources"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Center inline>
                    <Text
                      fw={500}
                      size="xs"
                      className="nav-link"
                      style={{ cursor: 'pointer', letterSpacing: '0.1em' }}
                    >
                      BLUEPRINTS <IconChevronDown size={14} style={{ marginLeft: rem(4) }} />
                    </Text>
                  </Center>
                </Link>
              </HoverCard.Target>
              <HoverCard.Dropdown style={{ overflow: 'hidden', padding: 0 }} radius={0} bg="white">
                <SimpleGrid cols={1} spacing={0}>
                  <Link href="/scholarcrafted/resources" className="mega-link">
                    <Group wrap="nowrap" align="flex-start" p="md">
                      <ThemeIcon size={34} variant="light" color={active.primary} radius={0}>
                        <IconFileText size={22} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={600} c="dark.9">All Blueprints</Text>
                        <Text size="xs" c="dimmed">Browse the full collection of templates.</Text>
                      </div>
                    </Group>
                  </Link>
                  <Link href="/scholarcrafted/resources/articles" className="mega-link">
                    <Group wrap="nowrap" align="flex-start" p="md">
                      <ThemeIcon size={34} variant="light" color={active.primary} radius={0}>
                        <IconArticle size={22} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={600} c="dark.9">Articles & Guides</Text>
                        <Text size="xs" c="dimmed">Read our latest academic strategies.</Text>
                      </div>
                    </Group>
                  </Link>
                </SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>

            <Link href="/scholarcrafted/about" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Text
                fw={500}
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
                size="md"
                radius={0}
                fw={600}
                style={{
                  letterSpacing: '0.1em',
                  paddingLeft: rem(24),
                  paddingRight: rem(24),
                  borderColor: active.primary }}
              >
                FREE INTRODUCTORY CALL
              </Button>
            </Link>
          </Group>
        </Group>
      </Container>
      <style jsx global>{`
        .nav-link {
          color: #666;
          transition: color 0.2s ease;
        }
        .nav-link:hover {
          color: ${active.primary} !important;
          text-decoration: underline !important;
        }
        .mega-link {
          text-decoration: none;
          color: inherit;
          transition: background-color 0.2s ease;
        }
        .mega-link:hover {
          background-color: var(--color-border);
        }
      `}</style>
    </Box>
  )
}
"""

with open('/home/miseda/Documents/projects/consulting-business/src/app/(frontend)/scholarcrafted/_components/Navbar.tsx', 'w', encoding='utf-8') as f:
    f.write(navbar_code)

print("Navbar updated successfully")
