'use client'

import React, { useState, useEffect } from 'react'
import {
  Container,
  Group,
  Text,
  Stack,
  Button,
  rem,
  Box,
  useMantineTheme,
  HoverCard,
  SimpleGrid,
  ThemeIcon,
  Center,
  Burger,
  Drawer,
  Divider,
} from '@mantine/core'
import { useDisclosure, useWindowScroll } from '@mantine/hooks'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  IconPencil,
  IconBook2,
  IconCompass,
  IconChevronDown,
  IconMail,
  IconBrandLinkedin,
  IconShieldCheck,
} from '@tabler/icons-react'

import { Logo } from './Logo'

export function Navbar() {
  const theme = useMantineTheme()
  const active = theme.other
  const pathname = usePathname()
  const [opened, { toggle, close }] = useDisclosure(false)
  const [scroll] = useWindowScroll()
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [servicesOpened, setServicesOpened] = useState(false)

  useEffect(() => {
    const currentScrollY = scroll.y
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setVisible(false) // Scrolling down
    } else {
      setVisible(true) // Scrolling up or near top
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
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Main Navbar only — no secondary strip */}
      {/* Main Navbar */}
      <Box
        component="nav"
        py={rem(16)}
        style={{
          backgroundColor: 'rgba(255,255,255,0.94)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <Container size={1200}>
          <Group justify="space-between" align="center" wrap="nowrap">
            <Link href="/scholarcrafted" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
              <Logo height={32} boxColor={active.accent} textColor={active.primary} />
            </Link>

            <Group gap="lg" visibleFrom="md" align="center" style={{ gap: '1.25rem' }} wrap="nowrap">
              {/* Services Dropdown */}
              <HoverCard
                width={620}
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
                        c={active.primary}
                        style={{
                          color: active.primary,
                          letterSpacing: '0.1em',
                          whiteSpace: 'nowrap',
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
                            flexShrink: 0,
                          }}
                        />
                      </Text>
                    </Center>
                  </Box>
                </HoverCard.Target>
                <HoverCard.Dropdown className="mega-menu-dropdown" style={{ overflow: 'hidden', padding: 0 }}>
                  <SimpleGrid cols={1} spacing={0}>
                    <Link href="/scholarcrafted/services/editing-proofreading" className="mega-link">
                      <Group wrap="nowrap" align="center" p="lg">
                        <ThemeIcon size={40} variant="filled" bg="rgba(0,0,0,0.2)" color="white" radius={0}>
                          <IconPencil size={22} />
                        </ThemeIcon>
                        <div>
                          <Text size="sm" fw={600} c={active.primary}>Manuscript Editing & Evidence Grounding</Text>
                          <Text size="xs" c="dimmed" style={{ lineHeight: 1.4 }}>
                            $0.044/word. Formatting, citation audits & exploratory AI draft reconstruction.
                          </Text>
                        </div>
                      </Group>
                    </Link>

                    <Link href="/scholarcrafted/services/research-support" className="mega-link">
                      <Group wrap="nowrap" align="center" p="lg">
                        <ThemeIcon size={40} variant="filled" bg="rgba(0,0,0,0.2)" color="white" radius={0}>
                          <IconBook2 size={22} />
                        </ThemeIcon>
                        <div>
                          <Text size="sm" fw={600} c={active.primary}>Research Support & Publishing Advisory</Text>
                          <Text size="xs" c="dimmed" style={{ lineHeight: 1.4 }}>
                            Thesis-to-journal conversion, Routledge/Oxford book proposals & literature reviews.
                          </Text>
                        </div>
                      </Group>
                    </Link>

                    <Link href="/scholarcrafted/services/private-coaching" className="mega-link">
                      <Group wrap="nowrap" align="center" p="lg">
                        <ThemeIcon size={40} variant="filled" bg="rgba(0,0,0,0.2)" color="white" radius={0}>
                          <IconCompass size={22} />
                        </ThemeIcon>
                        <div>
                          <Text size="sm" fw={600} c={active.primary}>Doctoral & Faculty Career Coaching</Text>
                          <Text size="xs" c="dimmed" style={{ lineHeight: 1.4 }}>
                            1-on-1 mentorship with Dr. Micah Dobson (College Board AP Research Reader).
                          </Text>
                        </div>
                      </Group>
                    </Link>
                  </SimpleGrid>
                </HoverCard.Dropdown>
              </HoverCard>

              {/* About Link */}
              <Link href="/scholarcrafted/about" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box className={`nav-link-wrapper ${isActive('/scholarcrafted/about') ? 'active' : ''}`} style={{ cursor: 'pointer' }}>
                  <Center inline>
                    <Text
                      fw={600}
                      size="xs"
                      className="nav-link"
                      c={active.primary}
                      style={{
                        color: active.primary,
                        letterSpacing: '0.1em',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      ABOUT
                    </Text>
                  </Center>
                </Box>
              </Link>

              {/* Primary Single CTA Button */}
              <Link href="/scholarcrafted/request-review" style={{ textDecoration: 'none' }}>
                <Button
                  variant="filled"
                  size="sm"
                  radius={0}
                  className="impeccable-button"
                  style={{ backgroundColor: active.accent, color: '#ffffff', whiteSpace: 'nowrap', fontWeight: 600, border: 'none' }}
                >
                  APPLY TO WORK WITH US
                </Button>
              </Link>
            </Group>

            <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" color={active.primary} />
          </Group>
        </Container>

        {/* Mobile Drawer */}
        <Drawer
          opened={opened}
          onClose={close}
          size="100%"
          padding="xl"
          hiddenFrom="md"
          zIndex={1000000}
          transitionProps={{ transition: 'fade', duration: 300 }}
          withCloseButton={true}
          styles={{
            header: {
              backgroundColor: active.background,
              borderBottom: `1px solid ${active.primary}12`,
              paddingBottom: rem(16),
              paddingTop: rem(16),
            },
            content: {
              backgroundColor: active.background,
            },
          }}
          title={
            <Link href="/scholarcrafted" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }} onClick={close}>
              <Logo height={28} boxColor={active.accent} textColor={active.primary} />
            </Link>
          }
        >
          <Stack gap="xl" mt="lg">
            <Box>
              <Text size="xs" fw={700} c={active.accent} mb="md" style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Our Services
              </Text>
              <Stack gap="xs">
                <Link href="/scholarcrafted/services/editing-proofreading" style={{ textDecoration: 'none' }} onClick={close}>
                  <Group wrap="nowrap" p="md" style={{ backgroundColor: `${active.primary}04`, border: `1px solid ${active.primary}08` }}>
                    <ThemeIcon size={36} radius="xl" variant="light" color={active.accent}>
                      <IconPencil size={18} />
                    </ThemeIcon>
                    <Box style={{ flex: 1 }}>
                      <Text fw={600} size="sm" c={active.primary}>Editing & Evidence Grounding</Text>
                      <Text size="xs" c="dimmed">Dissertations, formatting, citations & AI draft rescue</Text>
                    </Box>
                  </Group>
                </Link>

                <Link href="/scholarcrafted/services/research-support" style={{ textDecoration: 'none' }} onClick={close}>
                  <Group wrap="nowrap" p="md" style={{ backgroundColor: `${active.primary}04`, border: `1px solid ${active.primary}08` }}>
                    <ThemeIcon size={36} radius="xl" variant="light" color={active.accent}>
                      <IconBook2 size={18} />
                    </ThemeIcon>
                    <Box style={{ flex: 1 }}>
                      <Text fw={600} size="sm" c={active.primary}>Research & Publishing Advisory</Text>
                      <Text size="xs" c="dimmed">Thesis-to-journal conversion & book proposals</Text>
                    </Box>
                  </Group>
                </Link>

                <Link href="/scholarcrafted/services/private-coaching" style={{ textDecoration: 'none' }} onClick={close}>
                  <Group wrap="nowrap" p="md" style={{ backgroundColor: `${active.primary}04`, border: `1px solid ${active.primary}08` }}>
                    <ThemeIcon size={36} radius="xl" variant="light" color={active.accent}>
                      <IconCompass size={18} />
                    </ThemeIcon>
                    <Box style={{ flex: 1 }}>
                      <Text fw={600} size="sm" c={active.primary}>Doctoral & Faculty Coaching</Text>
                      <Text size="xs" c="dimmed">1-on-1 mentorship with Dr. Micah Dobson</Text>
                    </Box>
                  </Group>
                </Link>
              </Stack>
            </Box>

            <Link href="/scholarcrafted/about" style={{ textDecoration: 'none' }} onClick={close}>
              <Group wrap="nowrap" justify="space-between" p="md" style={{ borderBottom: `1px solid ${active.primary}12` }}>
                <Text fw={600} size="md" c={active.primary}>About Dr. Micah Dobson & Team</Text>
                <Text fw={700} c={active.accent} size="sm">&rarr;</Text>
              </Group>
            </Link>

            <Link href="/scholarcrafted/faq" style={{ textDecoration: 'none' }} onClick={close}>
              <Group wrap="nowrap" justify="space-between" p="md" style={{ borderBottom: `1px solid ${active.primary}12` }}>
                <Text fw={600} size="md" c={active.primary}>FAQ & Policies</Text>
                <Text fw={700} c={active.accent} size="sm">&rarr;</Text>
              </Group>
            </Link>

            <Stack gap="md" mt="auto" pt="xl">
              <Link href="/scholarcrafted/request-review" style={{ textDecoration: 'none' }} onClick={close}>
                <Button variant="filled" bg={active.primary} fullWidth size="lg" radius={0}>
                  APPLY TO WORK WITH US
                </Button>
              </Link>
              <Text size="xs" c="dimmed" style={{ textAlign: 'center' }}>
                Strictly Confidential Faculty Advisory
              </Text>
            </Stack>
          </Stack>
        </Drawer>

        <style jsx global>{`
          :root {
            --nav-hover-bg: rgba(0, 0, 0, 0.04);
          }
          .topbar-link {
            transition: color 0.2s ease;
          }
          .topbar-link:hover {
            color: ${active.accent} !important;
          }
          .nav-link-wrapper {
            padding: 8px 12px;
            border-radius: 4px;
            transition: background-color 0.2s ease, transform 0.2s ease;
          }
          .nav-link-wrapper:hover {
            background-color: var(--nav-hover-bg);
          }
          .nav-link-wrapper.active {
            background-color: var(--nav-hover-bg);
          }
          .nav-link {
            color: ${active.primary} !important;
            transition: color 0.2s ease, opacity 0.2s ease;
            position: relative;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
            font-weight: 600;
          }
          .nav-link-wrapper:hover .nav-link, .nav-link-wrapper.active .nav-link {
            color: ${active.accent} !important;
            opacity: 1;
          }
          .mega-menu-dropdown {
            background-color: #ffffff !important;
            border: 1px solid rgba(0,0,0,0.08) !important;
            box-shadow: 0 16px 40px rgba(0,0,0,0.12) !important;
          }
          .mega-link {
            text-decoration: none;
            color: inherit;
            display: block;
            transition: all 0.2s ease;
          }
          .mega-link:hover {
            background-color: rgba(230, 92, 56, 0.04);
          }
        `}</style>
      </Box>
    </Box>
  )
}
