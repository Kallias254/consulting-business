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
} from '@mantine/core'
import { useDisclosure, useWindowScroll } from '@mantine/hooks'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  IconPencil,
  IconBook2,
  IconCompass,
  IconChevronDown,
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
                  GET STARTED
                </Button>
              </Link>
            </Group>

            <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" color={active.primary} />
          </Group>
        </Container>

        {/* Mobile Drawer — full-screen slide-in */}
        <Drawer
          opened={opened}
          onClose={close}
          size="100%"
          padding={0}
          hiddenFrom="md"
          zIndex={1000000}
          transitionProps={{ transition: 'slide-right', duration: 280 }}
          withCloseButton={false}
          styles={{
            content: {
              backgroundColor: active.background,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            },
            body: {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
              overflowY: 'auto',
            },
          }}
        >
          {/* Drawer header — logo + close */}
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: `${rem(16)} ${rem(20)}`,
              borderBottom: `1px solid ${active.primary}10`,
              flexShrink: 0,
            }}
          >
            <Link href="/scholarcrafted" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }} onClick={close}>
              <Logo height={28} boxColor={active.accent} textColor={active.primary} />
            </Link>
            {/* Close button — always visible */}
            <Box
              onClick={close}
              style={{
                width: rem(40),
                height: rem(40),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                borderRadius: rem(4),
                border: `1px solid ${active.primary}14`,
                color: active.primary,
                fontSize: rem(20),
                fontWeight: 300,
                lineHeight: 1,
                userSelect: 'none',
              }}
              aria-label="Close menu"
            >
              ✕
            </Box>
          </Box>

          {/* Nav links — scrollable middle */}
          <Box style={{ flex: 1, overflowY: 'auto', padding: `${rem(8)} ${rem(20)}` }}>

            {/* Services */}
            <Box style={{ padding: `${rem(20)} 0 ${rem(8)} 0` }}>
              <Text size="xs" fw={700} c={active.accent} mb={rem(12)} style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Services
              </Text>
              <Stack gap={0}>
                {[
                  { href: '/scholarcrafted/services/editing-proofreading', label: 'Manuscript Editing & Evidence Grounding' },
                  { href: '/scholarcrafted/services/research-support', label: 'Research & Publishing Advisory' },
                  { href: '/scholarcrafted/services/private-coaching', label: 'Doctoral & Faculty Coaching' },
                ].map((item) => (
                  <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }} onClick={close}>
                    <Box
                      py={rem(14)}
                      style={{
                        borderBottom: `1px solid ${active.primary}08`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text fw={600} size="sm" c={active.primary}>{item.label}</Text>
                      <Text fw={700} c={active.accent} size="sm">→</Text>
                    </Box>
                  </Link>
                ))}
              </Stack>
            </Box>

            {/* About Us */}
            <Link href="/scholarcrafted/about" style={{ textDecoration: 'none' }} onClick={close}>
              <Box
                py={rem(16)}
                style={{
                  borderBottom: `1px solid ${active.primary}10`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text fw={600} size="md" c={active.primary}>About Us</Text>
                <Text fw={700} c={active.accent} size="sm">→</Text>
              </Box>
            </Link>

            {/* FAQ & Policies */}
            <Link href="/scholarcrafted/faq" style={{ textDecoration: 'none' }} onClick={close}>
              <Box
                py={rem(16)}
                style={{
                  borderBottom: `1px solid ${active.primary}10`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text fw={600} size="md" c={active.primary}>FAQ & Policies</Text>
                <Text fw={700} c={active.accent} size="sm">→</Text>
              </Box>
            </Link>

          </Box>

          {/* CTA — pinned to bottom, never scrolls away */}
          <Box
            style={{
              flexShrink: 0,
              padding: `${rem(16)} ${rem(20)} ${rem(32)} ${rem(20)}`,
              borderTop: `1px solid ${active.primary}10`,
              backgroundColor: active.background,
            }}
          >
            <Link href="/scholarcrafted/request-review" style={{ textDecoration: 'none' }} onClick={close}>
              <Button
                variant="filled"
                fullWidth
                size="lg"
                radius={0}
                style={{ backgroundColor: active.accent, color: '#fff', fontWeight: 700, border: 'none' }}
              >
                GET STARTED
              </Button>
            </Link>
            <Text size="xs" c="dimmed" mt={rem(10)} style={{ textAlign: 'center', letterSpacing: '0.04em' }}>
              Strictly Confidential Faculty Advisory
            </Text>
          </Box>
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
