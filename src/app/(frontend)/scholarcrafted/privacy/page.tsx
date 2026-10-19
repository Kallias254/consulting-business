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
import { SECTION_SPACING, INNER_WIDTH, READING_WIDTH } from '@/layout'

export default function PrivacyPage() {
  const theme = useMantineTheme()
  const active = theme.other

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* Hero */}
      <Box component="section" pt={rem(100)} pb={rem(80)} bg={active.background}>
        <Container size={READING_WIDTH}>
          <Stack gap="md">
            <Text
              size="xs"
              
              c="dimmed"
            >
              Legal &amp; Policies
            </Text>
            <Title
              order={1}
              style={{
                fontSize: rem(56),
                lineHeight: 1.1,
                color: active.primary }}
            >
              Privacy &amp; Ethics
            </Title>
            <Text size="lg" c="dimmed" lh={1.6}>
              How we protect your research, your data, and the integrity of your work.
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* Content */}
      <Box
        component="section"
        py={rem(80)}
        bg={active.surface}
        style={{ borderTop: `1px solid ${active.primary}12` }}
      >
        <Container size={READING_WIDTH}>
          <Stack gap={rem(48)}>

            <Box>
              <Title order={2} mb="md" style={{ color: active.primary }}>
                1. Data We Collect
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  When you engage ScholarCrafted, we collect only what is necessary to deliver our services: your name, email address, institutional affiliation (if provided), project briefs, and manuscript files submitted for editing or review.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  We do not use tracking cookies, behavioral analytics, or any form of passive data collection on our website. Your browsing activity is not monitored or stored.
                </Text>
              </Stack>
            </Box>

            <Box>
              <Title order={2} mb="md" style={{ color: active.primary }}>
                2. How We Use Your Data
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  All personal information and manuscript files are used solely for the purpose of delivering the services you have requested. Your data is never repurposed for marketing, research, or any secondary use.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  Manuscripts are accessed only by the editor(s) assigned to your project and, where applicable, the project coordinator overseeing quality assurance. No other team members or external parties have access.
                </Text>
              </Stack>
            </Box>

            <Box>
              <Title order={2} mb="md" style={{ color: active.primary }}>
                3. Manuscript Security
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  All manuscript files are stored in encrypted, access-controlled systems. Files are transferred via secure channels and are never stored on personal devices or unprotected servers.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  We do not share your manuscripts or any associated data with third parties under any circumstances. Your intellectual property remains yours at all times.
                </Text>
              </Stack>
            </Box>

            <Box>
              <Title order={2} mb="md" style={{ color: active.primary }}>
                4. Data Retention &amp; Deletion
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  Manuscripts and working files are retained for 90 days following delivery of the final edited version. This retention period allows us to accommodate revision requests and address any follow-up questions.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  After 90 days, all project files are permanently deleted from our systems. If you require earlier deletion, you may request immediate removal at any time by contacting contact@scholarcrafted.com.
                </Text>
              </Stack>
            </Box>

            <Box>
              <Title order={2} mb="md" style={{ color: active.primary }}>
                5. Third-Party Services
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  We use Stripe for payment processing. Stripe handles your payment information directly and is PCI-DSS compliant. ScholarCrafted does not store credit card numbers or financial details on our own servers.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  File transfers may utilize secure cloud infrastructure for delivery. We do not sell, license, or otherwise distribute your data to any third party for any purpose.
                </Text>
              </Stack>
            </Box>

            <Box>
              <Title order={2} mb="md" style={{ color: active.primary }}>
                6. Your Rights
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  You have the right to request a copy of all personal data we hold about you, to correct inaccurate information, or to request complete deletion of your data at any time.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  To exercise any of these rights, contact us at contact@scholarcrafted.com. We will respond to all data requests within 14 business days.
                </Text>
              </Stack>
            </Box>

            <Box>
              <Title order={2} mb="md" style={{ color: active.primary }}>
                7. Ethical Standards
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  ScholarCrafted is committed to upholding the highest standards of academic integrity. We are guided by the principles outlined by the Committee on Publication Ethics (COPE) and adhere to responsible editing practices at every stage of engagement.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  We do not engage in ghostwriting, data fabrication, data falsification, or any practice that compromises the integrity of scholarly research. Our editors provide language, structural, and technical guidance — the intellectual contribution and authorial decisions always remain with the researcher.
                </Text>
              </Stack>
            </Box>

            <Box>
              <Title order={2} mb="md" style={{ color: active.primary }}>
                8. Updates to This Policy
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  We may update this Privacy &amp; Ethics policy from time to time to reflect changes in our practices or applicable regulations. For any material changes, we will notify affected clients via email prior to the changes taking effect.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  Continued use of our services following a policy update constitutes acceptance of the revised terms. We encourage you to review this page periodically.
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
