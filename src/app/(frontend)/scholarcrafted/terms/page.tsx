'use client'

import React from 'react'
import {
  Container,
  Title,
  Text,
  Box,
  Stack,
  rem,
  useMantineTheme,
} from '@mantine/core'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'

const INNER_WIDTH = 800 // Kept slightly narrower for comfortable reading

export default function TermsPage() {
  const theme = useMantineTheme()
  const active = theme.other

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* Hero */}
      <Box component="section" pt={rem(100)} pb={rem(80)} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <Stack gap="md">
            <Text
              size="xs"
              fw={700}
              style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
              c="dimmed"
            >
              Legal & Policies
            </Text>
            <Title
              order={1}
              style={{
                fontSize: rem(56),
                fontWeight: 400,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: active.primary,
                fontFamily: 'var(--font-serif)',
              }}
            >
              Terms and Conditions
            </Title>
            <Text size="lg" c="dimmed" lh={1.6}>
              Please read these terms carefully before engaging with ScholarCrafted coaching or advisory services.
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* Content */}
      <Box
        component="section"
        py={rem(80)}
        bg={active.surface}
        style={{ borderTop: `1px solid ${active.primary}22` }}
      >
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(48)}>
            
            <Box>
              <Title order={2} mb="md" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, color: active.primary }}>
                1. Booking & Payments
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  All bookings must be paid in full at the time of scheduling through the designated booking system, unless prearranged via email.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  Sessions are only confirmed once payment has been received.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  All services take place strictly within the booked time slots, unless prearranged via email.
                </Text>
              </Stack>
            </Box>

            <Box>
              <Title order={2} mb="md" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, color: active.primary }}>
                2. Rescheduling & Cancellations
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  Clients may reschedule their sessions at least 24 hours in advance via the booking system.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  No refunds will be provided for any booked sessions, including missed or unused appointments.
                </Text>
              </Stack>
            </Box>

            <Box>
              <Title order={2} mb="md" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, color: active.primary }}>
                3. Unused Time Policy
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  If a live session ends early and more than 30 minutes remain, the unused time can be applied toward a future content review service.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  This applies to all live coaching sessions.
                </Text>
              </Stack>
            </Box>

            <Box>
              <Title order={2} mb="md" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, color: active.primary }}>
                4. Confidentiality & Data Protection
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  Client data is securely stored on Google Drive until graduation, after which it is permanently deleted.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  All shared resources (e.g., templates, guides) are strictly for personal use and may not be distributed or shared with others.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  Clients may record sessions for personal use but may not distribute or publish recordings without explicit permission.
                </Text>
              </Stack>
            </Box>

            <Box>
              <Title order={2} mb="md" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, color: active.primary }}>
                5. Dispute Resolution
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  Any concerns or disputes should be addressed via email for resolution.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  The goal is to resolve all issues amicably and fairly.
                </Text>
              </Stack>
            </Box>

            <Box>
              <Title order={2} mb="md" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, color: active.primary }}>
                6. Amendments to Terms
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  These Terms & Conditions may be updated from time to time. Any changes will apply to both new and existing bookings.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  By booking a session, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.
                </Text>
              </Stack>
            </Box>

          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
