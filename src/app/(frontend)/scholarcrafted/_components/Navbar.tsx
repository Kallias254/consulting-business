'use client'

import React, { useState, useEffect } from 'react'
import { Container, Group, Text, Stack, Button, rem, Box, useMantineTheme, HoverCard, SimpleGrid, ThemeIcon, Center, Burger, Drawer, Divider } from '@mantine/core'
import { useDisclosure, useWindowScroll } from '@mantine/hooks'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconBook, IconPencil, IconMicroscope, IconFileText, IconArticle, IconChevronDown, IconPhone } from '@tabler/icons-react'

export function Navbar() {
  const theme = useMantineTheme()
  const active = theme.other
  const pathname = usePathname()
  const [opened, { toggle, close }] = useDisclosure(false)
  const [scroll] = useWindowScroll()
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [servicesOpened, setServicesOpened] = useState(false)
  const [resourcesOpened, setResourcesOpened] = useState(false)

  useEffect(() => {
    const currentScrollY = scroll.y
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setVisible(false) // Scrolling down
    } else {
      setVisible(true)  // Scrolling up or near top
    }
    setLastScrollY(currentScrollY)
  }, [scroll.y])

  const isActive = (path: string) => {
    if (path === '/scholarcrafted') return pathname === path
    return pathname?.startsWith(path)
  }

  return (
    <Box
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Topbar */}
      <Box style={{ backgroundColor: `color-mix(in srgb, ${active.primary}, black 25%)` }} py={rem(6)}>
        <Container size={1200}>
          <Group justify="space-between" align="center">
            <Group gap={rem(6)}>
              <IconPhone size={12} color="rgba(255,255,255,0.7)" />
              <Text size="xs" c="rgba(255,255,255,0.7)" fw={500} style={{ letterSpacing: '0.05em' }}>
                Academic Emergency? Call: +1 (800) 555-0199
              </Text>
            </Group>
            <Group gap="md" visibleFrom="sm">
              <Link href="/scholarcrafted/faq" style={{ textDecoration: 'none' }}>
                <Text size="xs" c="rgba(255,255,255,0.7)" fw={500} style={{ letterSpacing: '0.05em' }} className="topbar-link">
                  FAQ
                </Text>
              </Link>
              <Text size="xs" c="rgba(255,255,255,0.3)">|</Text>

              <Link href="/scholarcrafted/login" style={{ textDecoration: 'none' }}>
                <Text size="xs" c="rgba(255,255,255,0.7)" fw={500} style={{ letterSpacing: '0.05em' }} className="topbar-link">
                  Login
                </Text>
              </Link>
            </Group>
          </Group>
        </Container>
      </Box>

      {/* Main Navbar */}
      <Box
        component="nav"
        py={rem(24)}
        style={{
          backgroundColor: active.primary,
          borderTop: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        <Container size={1200}>
        <Group justify="space-between" align="center">
          <Link href="/scholarcrafted" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Stack gap={0}>
              <Text
                fw={700}
                c="white"
                style={{
                  fontSize: rem(22),
                  lineHeight: 1,
                  letterSpacing: '-0.02em' }}
              >
                SCHOLARCRAFTED
              </Text>
              <Text
                size="xs"
                c="rgba(255,255,255,0.7)"
                fw={500}
                style={{ fontSize: rem(9), letterSpacing: '0.15em', textTransform: 'uppercase' }}
              >
                Academic Consultancy
              </Text>
            </Stack>
          </Link>

          <Group gap="xl" visibleFrom="sm" align="center" style={{ gap: '1.25rem' }}>
            <HoverCard 
              width={600} 
              position="bottom" 
              radius={0} 
              shadow="xl" 
              withinPortal 
              offset={20} 
              transitionProps={{ transition: 'pop-top-left' }}
              onOpen={() => setServicesOpened(true)}
              onClose={() => setServicesOpened(false)}
            >
              <HoverCard.Target>
                <Box className={`nav-link-wrapper ${isActive('/scholarcrafted/services') ? 'active' : ''}`} style={{ cursor: 'pointer' }}>
                  <Center inline>
                    <Text
                      fw={600}
                      size="xs"
                      className="nav-link"
                      c="rgba(255,255,255,0.85)"
                      style={{
                        color: 'rgba(255,255,255,0.85)',
                        letterSpacing: '0.1em'
                      }}
                    >
                      SERVICES 
                      <IconChevronDown 
                        size={14} 
                        style={{ 
                          marginLeft: rem(6), 
                          opacity: 0.6,
                          transform: servicesOpened ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease',
                          display: 'inline-block',
                          verticalAlign: 'middle',
                          flexShrink: 0
                        }} 
                      />
                    </Text>
                  </Center>
                </Box>
              </HoverCard.Target>
              <HoverCard.Dropdown className="mega-menu-dropdown" style={{ overflow: 'hidden', padding: 0 }}>
                <SimpleGrid cols={2} spacing={0}>
                  <Link href="/scholarcrafted/services/private-coaching" className="mega-link">
                    <Group wrap="nowrap" align="center" p="lg">
                      <ThemeIcon size={40} variant="filled" bg="rgba(0,0,0,0.2)" color="white" radius={0}>
                        <IconBook size={24} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={600} c="white">Private Coaching</Text>
                        <Text size="xs" c="rgba(255,255,255,0.7)" style={{ lineHeight: 1.4 }}>1-on-1 strategic dissertation guidance.</Text>
                      </div>
                    </Group>
                  </Link>
                  <Link href="/scholarcrafted/services/editing-proofreading" className="mega-link">
                    <Group wrap="nowrap" align="center" p="lg">
                      <ThemeIcon size={40} variant="filled" bg="rgba(0,0,0,0.2)" color="white" radius={0}>
                        <IconPencil size={24} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={600} c="white">Editing & Proofreading</Text>
                        <Text size="xs" c="rgba(255,255,255,0.7)" style={{ lineHeight: 1.4 }}>Professional academic review and copyediting.</Text>
                      </div>
                    </Group>
                  </Link>
                  <Link href="/scholarcrafted/services/research-support" className="mega-link">
                    <Group wrap="nowrap" align="center" p="lg">
                      <ThemeIcon size={40} variant="filled" bg="rgba(0,0,0,0.2)" color="white" radius={0}>
                        <IconMicroscope size={24} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={600} c="white">Research Support</Text>
                        <Text size="xs" c="rgba(255,255,255,0.7)" style={{ lineHeight: 1.4 }}>Methodology and data analysis consulting.</Text>
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
              <Box className={`nav-link-wrapper ${isActive('/scholarcrafted/how-it-works') ? 'active' : ''}`} style={{ cursor: 'pointer' }}>
                <Center inline>
                  <Text
                    fw={600}
                    size="xs"
                    className="nav-link"
                    c="rgba(255,255,255,0.85)"
                    style={{
                      color: 'rgba(255,255,255,0.85)',
                      letterSpacing: '0.1em'
                    }}
                  >
                    OUR APPROACH
                  </Text>
                </Center>
              </Box>
            </Link>

            <HoverCard 
              width={320} 
              position="bottom" 
              radius={0} 
              shadow="xl" 
              withinPortal 
              offset={20} 
              transitionProps={{ transition: 'pop-top-left' }}
              onOpen={() => setResourcesOpened(true)}
              onClose={() => setResourcesOpened(false)}
            >
              <HoverCard.Target>
                <Box className={`nav-link-wrapper ${isActive('/scholarcrafted/resources') ? 'active' : ''}`} style={{ cursor: 'pointer' }}>
                  <Center inline>
                    <Text
                      fw={600}
                      size="xs"
                      className="nav-link"
                      c="rgba(255,255,255,0.85)"
                      style={{
                        color: 'rgba(255,255,255,0.85)',
                        letterSpacing: '0.1em'
                      }}
                    >
                      RESOURCES 
                      <IconChevronDown 
                        size={14} 
                        style={{ 
                          marginLeft: rem(6), 
                          opacity: 0.6,
                          transform: resourcesOpened ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease',
                          display: 'inline-block',
                          verticalAlign: 'middle',
                          flexShrink: 0
                        }} 
                      />
                    </Text>
                  </Center>
                </Box>
              </HoverCard.Target>
              <HoverCard.Dropdown className="mega-menu-dropdown" style={{ overflow: 'hidden', padding: 0 }}>
                <SimpleGrid cols={1} spacing={0}>
                  <Link href="/scholarcrafted/resources" className="mega-link">
                    <Group wrap="nowrap" align="center" p="lg">
                      <ThemeIcon size={40} variant="filled" bg="rgba(0,0,0,0.2)" color="white" radius={0}>
                        <IconFileText size={24} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={600} c="white">Academic Blueprints</Text>
                        <Text size="xs" c="rgba(255,255,255,0.7)" style={{ lineHeight: 1.4 }}>Curated dissertation templates and literature matrices.</Text>
                      </div>
                    </Group>
                  </Link>
                  <Link href="/scholarcrafted/resources/articles" className="mega-link">
                    <Group wrap="nowrap" align="center" p="lg">
                      <ThemeIcon size={40} variant="filled" bg="rgba(0,0,0,0.2)" color="white" radius={0}>
                        <IconArticle size={24} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={600} c="white">Articles & Guides</Text>
                        <Text size="xs" c="rgba(255,255,255,0.7)" style={{ lineHeight: 1.4 }}>Expert strategies for research design and defense.</Text>
                      </div>
                    </Group>
                  </Link>
                </SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>

            <Link href="/scholarcrafted/about" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box className={`nav-link-wrapper ${isActive('/scholarcrafted/about') ? 'active' : ''}`} style={{ cursor: 'pointer' }}>
                <Center inline>
                  <Text
                    fw={600}
                    size="xs"
                    className="nav-link"
                    c="rgba(255,255,255,0.85)"
                    style={{
                      color: 'rgba(255,255,255,0.85)',
                      letterSpacing: '0.1em'
                    }}
                  >
                    ABOUT
                  </Text>
                </Center>
              </Box>
            </Link>

            <Link href="/scholarcrafted/consultation?interest=other&metBefore=no" style={{ textDecoration: 'none' }}>
              <Button
                variant="filled"
                bg="white"
                c={active.primary}
                size="md"
                radius={0}
                className="impeccable-button"
              >
                BOOK INTRO CALL
              </Button>
            </Link>
          </Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color="white" />
        </Group>
      </Container>
      
      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="xl"
        bg={active.background}
        title={
          <Stack gap={0}>
            <Text fw={700} c={active.primary} style={{ fontSize: rem(20), lineHeight: 1, letterSpacing: '-0.02em' }}>
              SCHOLARCRAFTED
            </Text>
            <Text size="xs" c="dimmed" fw={500} style={{ fontSize: rem(9), letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Academic Consultancy
            </Text>
          </Stack>
        }
        hiddenFrom="sm"
        zIndex={1000000}
        transitionProps={{ transition: 'fade', duration: 300 }}
      >
        <Stack gap="xl" mt="xl">
          <Box>
            <Text size="xs" fw={700} c="dimmed" mb="md" style={{ letterSpacing: '0.1em' }}>SERVICES</Text>
            <Stack gap="sm">
              <Link href="/scholarcrafted/services/private-coaching" style={{ textDecoration: 'none' }} onClick={close}>
                <Text fw={500} c="dark.8" size="md" className="mobile-nav-link">Private Coaching</Text>
              </Link>
              <Link href="/scholarcrafted/services/editing-proofreading" style={{ textDecoration: 'none' }} onClick={close}>
                <Text fw={500} c="dark.8" size="md" className="mobile-nav-link">Editing & Proofreading</Text>
              </Link>
              <Link href="/scholarcrafted/services/research-support" style={{ textDecoration: 'none' }} onClick={close}>
                <Text fw={500} c="dark.8" size="md" className="mobile-nav-link">Research Support</Text>
              </Link>
            </Stack>
          </Box>

          <Divider color={`${active.primary}15`} />

          <Box>
            <Text size="xs" fw={700} c="dimmed" style={{ letterSpacing: '0.1em' }} mt="md">
              THE METHODOLOGY
            </Text>
            <Divider color="gray.2" />
            <Link href="/scholarcrafted/how-it-works" style={{ textDecoration: 'none' }} onClick={close}>
              <Text fw={500} c="dark.8" size="md" className="mobile-nav-link">Our Approach</Text>
            </Link>
          </Box>

          <Divider color={`${active.primary}15`} />

          <Box>
            <Text size="xs" fw={700} c="dimmed" mb="md" style={{ letterSpacing: '0.1em' }}>RESOURCES</Text>
            <Stack gap="sm">
              <Link href="/scholarcrafted/resources" style={{ textDecoration: 'none' }} onClick={close}>
                <Text fw={500} c="dark.8" size="md" className="mobile-nav-link">Academic Blueprints</Text>
              </Link>
              <Link href="/scholarcrafted/resources/articles" style={{ textDecoration: 'none' }} onClick={close}>
                <Text fw={500} c="dark.8" size="md" className="mobile-nav-link">Articles & Guides</Text>
              </Link>
            </Stack>
          </Box>

          <Divider color={`${active.primary}15`} />

          <Link href="/scholarcrafted/about" style={{ textDecoration: 'none' }} onClick={close}>
            <Text fw={500} c="dark.8" size="md" className="mobile-nav-link">About</Text>
          </Link>

          <Box mt="xl">
            <Link href="/scholarcrafted/consultation?interest=other&metBefore=no" style={{ textDecoration: 'none' }} onClick={close}>
              <Button variant="filled" bg={active.primary} fullWidth size="lg" radius={0} className="impeccable-button">
                BOOK INTRO CALL
              </Button>
            </Link>
          </Box>
        </Stack>
      </Drawer>

      <style jsx global>{`
        :root {
          --nav-hover-bg: color-mix(in srgb, ${active.primary}, black 20%);
        }
        .topbar-link {
          transition: color 0.2s ease;
        }
        .topbar-link:hover {
          color: #ffffff !important;
        }
        .nav-link-wrapper {
          padding: 8px 16px;
          border-radius: 4px;
          transition: background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-link-wrapper:hover {
          background-color: var(--nav-hover-bg);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .nav-link-wrapper.active {
          background-color: var(--nav-hover-bg);
        }
        .nav-link-wrapper:active {
          transform: translateY(0);
        }
        .nav-link {
          color: rgba(255,255,255,0.85) !important;
          transition: color 0.2s ease, opacity 0.2s ease;
          position: relative;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          vertical-align: middle;
        }
        .nav-link-wrapper:hover .nav-link, .nav-link-wrapper.active .nav-link {
          color: #fff !important;
          opacity: 1;
        }
        .mega-menu-dropdown {
          background-color: var(--nav-hover-bg) !important;
          border: 1px solid rgba(255,255,255,0.05) !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2) !important;
        }
        .mega-link {
          text-decoration: none;
          color: inherit;
          display: block;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .mega-link:hover {
          background-color: rgba(255,255,255,0.08);
        }
        .mobile-nav-link {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: inline-block;
        }
        .mobile-nav-link:active, .mobile-nav-link:hover {
          color: ${active.primary} !important;
          transform: translateX(8px);
        }
      `}</style>
      </Box>
    </Box>
  )
}
