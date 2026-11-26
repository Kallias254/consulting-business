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
  IconFileText,
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
      href: '/services/thesis-to-journal',
      icon: <IconFileText size={20} />,
      label: 'Journal Articles & R&R Strategy',
      desc: 'Contribution framing, desk-rejection proofing, R&R response matrices & journal compliance.',
    },
    {
      href: '/services/monograph-architecture',
      icon: <IconBook2 size={20} />,
      label: 'Books, Press Proposals & Edited Handbooks',
      desc: 'Acquisition prospectuses, multi-contributor volume coordination, indexing & 5-stage production.',
    },
    {
      href: '/services/grant-fellowship-production',
      icon: <IconShieldCheck size={20} />,
      label: 'Grant & Fellowship Production',
      desc: 'Individual fellowships & collaborative grants: narrative structure, agency specs & institutional invoicing.',
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
        py={rem(14)}
        style={{
          backgroundColor: active.accent,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: 'none',
        }}
      >
        <Container size={1340}>
          <Group justify="space-between" align="center" wrap="nowrap">
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
              <Logo height={34} boxColor="#ffffff" textColor="#ffffff" />
            </Link>

            {/* Desktop nav */}
            <Group gap="lg" visibleFrom="md" align="center" style={{ gap: '1.25rem' }} wrap="nowrap">

              {/* Services — hover/click opens dropdown (no /services index route) */}
              <HoverCard
                width={460}
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
                  <Box
                    className={`nav-link-wrapper ${isActive('/services') ? 'active' : ''}`}
                    style={{ cursor: 'pointer' }}
                  >
                    <Center inline>
                      <Text
                        fw={600}
                        size="xs"
                        className="nav-link"
                        style={{ letterSpacing: '0.1em', whiteSpace: 'nowrap', color: '#ffffff !important' }}
                      >
                        SERVICES
                        <IconChevronDown
                          size={14}
                          style={{
                            marginLeft: rem(6),
                            opacity: 0.7,
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
                      style={{ letterSpacing: '0.1em', whiteSpace: 'nowrap', color: '#ffffff !important' }}
                    >
                      ABOUT
                    </Text>
                  </Center>
                </Box>
              </Link>

              {/* FAQ */}
              <Link href="/faq" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box className={`nav-link-wrapper ${isActive('/faq') ? 'active' : ''}`} style={{ cursor: 'pointer' }}>
                  <Center inline>
                    <Text
                      fw={600}
                      size="xs"
                      className="nav-link"
                      style={{ letterSpacing: '0.1em', whiteSpace: 'nowrap', color: '#ffffff !important' }}
                    >
                      FAQ
                    </Text>
                  </Center>
                </Box>
              </Link>

              {/* CTA */}
              <Link href="/order" style={{ textDecoration: 'none' }}>
                <Button
                  variant="filled"
                  size="sm"
                  radius={0}
                  className="impeccable-button"
                  style={{ backgroundColor: '#ffffff', color: active.accent, whiteSpace: 'nowrap', fontWeight: 700, border: 'none' }}
                >
                  START A PROJECT
                </Button>
              </Link>
            </Group>

            <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" color="#ffffff" />
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
          {/* Drawer header — exact match to main orange navbar */}
          <Box
            py={rem(14)}
            style={{
              backgroundColor: active.accent,
              flexShrink: 0,
            }}
          >
            <Container size={1340}>
              <Group justify="space-between" align="center" wrap="nowrap">
                <Link href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }} onClick={close}>
                  <Logo height={34} boxColor="#ffffff" textColor="#ffffff" />
                </Link>
                <Box
                  onClick={close}
                  style={{
                    width: rem(34),
                    height: rem(34),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#ffffff',
                    fontSize: rem(20),
                    fontWeight: 400,
                    lineHeight: 1,
                    userSelect: 'none',
                  }}
                  aria-label="Close menu"
                >
                  ✕
                </Box>
              </Group>
            </Container>
          </Box>

          {/* Nav links — clean, unified editorial list */}
          <Box style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: `${rem(12)} ${rem(20)}` }}>
            <Box pt={rem(12)} pb={rem(4)}>
              <Text
                size="xs"
                fw={700}
                c={active.accent}
                mb={rem(4)}
                style={{
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                }}
              >
                Services
              </Text>
              {services.map((svc) => (
                <Link key={svc.href} href={svc.href} style={{ textDecoration: 'none' }} onClick={close}>
                  <Box
                    py={rem(15)}
                    style={{
                      borderBottom: `1px solid ${active.primary}10`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: rem(12),
                    }}
                  >
                    <Text
                      fw={500}
                      size="sm"
                      c={active.primary}
                      style={{ fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}
                    >
                      {svc.label}
                    </Text>
                    <IconArrowRight size={15} color={active.accent} style={{ flexShrink: 0 }} />
                  </Box>
                </Link>
              ))}
            </Box>

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
                <Text fw={600} size="sm" c={active.primary} style={{ letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                  About
                </Text>
                <IconArrowRight size={15} color={active.accent} style={{ flexShrink: 0 }} />
              </Box>
            </Link>

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
                <Text fw={600} size="sm" c={active.primary} style={{ letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                  FAQ
                </Text>
                <IconArrowRight size={15} color={active.accent} style={{ flexShrink: 0 }} />
              </Box>
            </Link>
          </Box>

          {/* Mobile CTA — pinned bottom, zero overflow */}
          <Box
            style={{
              flexShrink: 0,
              padding: `${rem(16)} ${rem(20)} ${rem(28)} ${rem(20)}`,
              borderTop: `1px solid ${active.primary}10`,
              backgroundColor: active.background,
              overflowX: 'hidden',
            }}
          >
            <SimpleGrid cols={2} spacing="xs">
              <Link href="/order" style={{ textDecoration: 'none', minWidth: 0 }} onClick={close}>
                <Button
                  variant="filled"
                  fullWidth
                  size="sm"
                  radius={0}
                  style={{
                    backgroundColor: active.accent,
                    color: '#ffffff',
                    fontWeight: 700,
                    border: 'none',
                    height: rem(44),
                    paddingLeft: rem(10),
                    paddingRight: rem(10),
                    fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                  }}
                >
                  Start a Project
                </Button>
              </Link>
              <a
                href="https://calendly.com/misedajoseph-30-minutes-call/discovery-session"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', minWidth: 0 }}
                onClick={close}
              >
                <Button
                  variant="outline"
                  fullWidth
                  size="sm"
                  radius={0}
                  style={{
                    borderColor: `${active.primary}30`,
                    color: active.primary,
                    fontWeight: 600,
                    height: rem(44),
                    paddingLeft: rem(10),
                    paddingRight: rem(10),
                    fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                  }}
                >
                  Book a Call
                </Button>
              </a>
            </SimpleGrid>
            <Text size="xs" c="dimmed" mt={rem(12)} style={{ textAlign: 'center', letterSpacing: '0.03em' }}>
              Mon–Fri, 9:00 AM–6:00 PM EST &bull; Strict NDA
            </Text>
          </Box>
        </Drawer>

        <style jsx global>{`
          :root {
            --nav-hover-bg: rgba(0, 0, 0, 0.04);
          }
          .nav-link-wrapper {
            padding: 6px 10px;
            border-radius: 4px;
            transition: background-color 0.15s ease;
          }
          .nav-link-wrapper:hover {
            background-color: rgba(255, 255, 255, 0.15);
          }
          .nav-link-wrapper.active {
            background-color: rgba(255, 255, 255, 0.15);
          }
          .nav-link {
            color: #ffffff !important;
            transition: color 0.15s ease, opacity 0.15s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
            font-weight: 600;
            font-family: var(--font-heading-sans), var(--font-sans);
          }
          .nav-link-wrapper:hover .nav-link,
          .nav-link-wrapper.active .nav-link {
            color: #ffffff !important;
            opacity: 0.9;
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
            transition: background-color 0.15s ease;
          }
          .mega-link:hover {
            background-color: ${active.accent}0a;
          }
          .mega-link:hover .mantine-Text-root[data-weight="600"] {
            color: ${active.accent};
          }
        `}</style>
      </Box>
    </Box>
  )
}
