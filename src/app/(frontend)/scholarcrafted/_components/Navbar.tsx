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
  IconShieldCheck,
  IconChevronDown,
  IconArrowRight,
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

  const services = [
    {
      href: '/services/ai-manuscript-audit',
      icon: <IconShieldCheck size={20} />,
      label: 'AI Manuscript Audit',
      desc: 'Audit your AI-assisted research before journal submission. Citation gaps, risk analysis & debrief.',
    },
    {
      href: '/services/editing-proofreading',
      icon: <IconPencil size={20} />,
      label: 'Editing & Compliance',
      desc: 'Line editing, academic tone, style conformity & editorial certificate. Priced per word.',
    },
    {
      href: '/services/publication-support',
      icon: <IconBook2 size={20} />,
      label: 'Publication Support',
      desc: 'Journal selection, cover letters, book proposals, galley proofs & indexing.',
    },
  ]

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
        <Container size={1340}>
          <Group justify="space-between" align="center" wrap="nowrap">
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
              <Logo height={38} boxColor={active.accent} textColor={active.primary} />
            </Link>

            {/* Desktop nav */}
            <Group gap="lg" visibleFrom="md" align="center" style={{ gap: '1.25rem' }} wrap="nowrap">

              {/* Services — word is clickable link, hover opens dropdown */}
              <HoverCard
                width={440}
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
                  {/* Wrap in Link so clicking the word navigates to /services */}
                  <Link href="/services" style={{ textDecoration: 'none' }}>
                    <Box
                      className={`nav-link-wrapper ${isActive('/services') ? 'active' : ''}`}
                      style={{ cursor: 'pointer' }}
                    >
                      <Center inline>
                        <Text
                          fw={600}
                          size="xs"
                          className="nav-link"
                          style={{ letterSpacing: '0.1em', whiteSpace: 'nowrap' }}
                        >
                          SERVICES
                          <IconChevronDown
                            size={14}
                            style={{
                              marginLeft: rem(6),
                              opacity: 0.55,
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
                  </Link>
                </HoverCard.Target>

                <HoverCard.Dropdown className="mega-menu-dropdown" style={{ overflow: 'hidden', padding: 0 }}>
                  {services.map((svc, i) => (
                    <Link key={svc.href} href={svc.href} className="mega-link">
                      <Group
                        wrap="nowrap"
                        align="center"
                        p="lg"
                        gap="md"
                        style={i > 0 ? { borderTop: '1px solid rgba(0,0,0,0.05)' } : undefined}
                      >
                        {/* Accent-tinted icon box */}
                        <Box
                          style={{
                            width: rem(44),
                            height: rem(44),
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: `${active.accent}14`,
                            color: active.accent,
                          }}
                        >
                          {svc.icon}
                        </Box>
                        <div>
                          <Text size="sm" fw={600} c={active.primary}>{svc.label}</Text>
                          <Text size="xs" c="dimmed" style={{ lineHeight: 1.5, marginTop: rem(2) }}>
                            {svc.desc}
                          </Text>
                        </div>
                      </Group>
                    </Link>
                  ))}
                </HoverCard.Dropdown>
              </HoverCard>

              {/* About */}
              <Link href="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box className={`nav-link-wrapper ${isActive('/about') ? 'active' : ''}`} style={{ cursor: 'pointer' }}>
                  <Center inline>
                    <Text
                      fw={600}
                      size="xs"
                      className="nav-link"
                      c={active.primary}
                      style={{ letterSpacing: '0.1em', whiteSpace: 'nowrap' }}
                    >
                      ABOUT
                    </Text>
                  </Center>
                </Box>
              </Link>

              {/* CTA */}
              <Link href="/order?service=editing&tier=premium" style={{ textDecoration: 'none' }}>
                <Button
                  variant="filled"
                  size="sm"
                  radius={0}
                  className="impeccable-button"
                  style={{ backgroundColor: active.accent, color: '#ffffff', whiteSpace: 'nowrap', fontWeight: 600, border: 'none' }}
                >
                  SUBMIT A PROJECT
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
          {/* Drawer header */}
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
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }} onClick={close}>
              <Logo height={28} boxColor={active.accent} textColor={active.primary} />
            </Link>
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

          {/* Nav links */}
          <Box style={{ flex: 1, overflowY: 'auto', padding: `${rem(8)} ${rem(20)}` }}>

            {/* Services */}
            <Box style={{ padding: `${rem(20)} 0 ${rem(8)} 0` }}>
              <Text size="xs" fw={700} c={active.accent} mb={rem(12)} style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Services
              </Text>
              <Stack gap={0}>
                {services.map((svc) => (
                  <Link key={svc.href} href={svc.href} style={{ textDecoration: 'none' }} onClick={close}>
                    <Box
                      py={rem(16)}
                      style={{
                        borderBottom: `1px solid ${active.primary}08`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: rem(12),
                      }}
                    >
                      <Group gap={rem(12)} wrap="nowrap" align="center">
                        <Box
                          style={{
                            width: rem(36),
                            height: rem(36),
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: `${active.accent}10`,
                            color: active.accent,
                          }}
                        >
                          {svc.icon}
                        </Box>
                        <Text fw={600} size="sm" c={active.primary}>{svc.label}</Text>
                      </Group>
                      <IconArrowRight size={16} color={active.accent} />
                    </Box>
                  </Link>
                ))}
              </Stack>
            </Box>

            {/* About */}
            <Link href="/about" style={{ textDecoration: 'none' }} onClick={close}>
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
                <IconArrowRight size={16} color={active.accent} />
              </Box>
            </Link>

            {/* FAQ */}
            <Link href="/faq" style={{ textDecoration: 'none' }} onClick={close}>
              <Box
                py={rem(16)}
                style={{
                  borderBottom: `1px solid ${active.primary}10`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text fw={600} size="md" c={active.primary}>FAQ &amp; Policies</Text>
                <IconArrowRight size={16} color={active.accent} />
              </Box>
            </Link>
          </Box>

          {/* Mobile CTA — pinned bottom */}
          <Box
            style={{
              flexShrink: 0,
              padding: `${rem(16)} ${rem(20)} ${rem(32)} ${rem(20)}`,
              borderTop: `1px solid ${active.primary}10`,
              backgroundColor: active.background,
            }}
          >
            <Link href="/order?service=editing&tier=premium" style={{ textDecoration: 'none' }} onClick={close}>
              <Button
                variant="filled"
                fullWidth
                size="lg"
                radius={0}
                style={{ backgroundColor: active.accent, color: '#fff', fontWeight: 700, border: 'none' }}
              >
                SUBMIT A PROJECT
              </Button>
            </Link>
            <Text size="xs" c="dimmed" mt={rem(10)} style={{ textAlign: 'center', letterSpacing: '0.04em' }}>
              100% Confidential · Faculty-Led Production
            </Text>
          </Box>
        </Drawer>

        <style jsx global>{`
          :root {
            --nav-hover-bg: rgba(0, 0, 0, 0.04);
          }
          .nav-link-wrapper {
            padding: 8px 12px;
            border-radius: 4px;
            transition: background-color 0.2s ease;
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
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
            font-weight: 600;
          }
          .nav-link-wrapper:hover .nav-link,
          .nav-link-wrapper.active .nav-link {
            color: ${active.accent} !important;
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
            transition: background-color 0.2s ease;
          }
          .mega-link:hover {
            background-color: rgba(230, 92, 56, 0.04);
          }
          .mega-link:hover .mantine-Text-root[data-weight="600"] {
            color: ${active.accent};
          }
        `}</style>
      </Box>
    </Box>
  )
}
