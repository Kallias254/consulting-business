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

export default function ConfidentialityPage() {
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
              Strictly Confidential
            </Title>
            <Text size="lg" c="dimmed" lh={1.6}>
              Your research is safe with us. Every project is handled under strict confidentiality protocols.
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
                1. Our Confidentiality Promise
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  Every manuscript submitted to ScholarCrafted is treated as strictly confidential. From the moment you share your work with us to the moment it is returned, your research is protected by rigorous confidentiality protocols.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  We operate under an implicit non-disclosure agreement for all engagements. This means that confidentiality is not an add-on — it is the default standard for every project we undertake, regardless of scope or subject matter.
                </Text>
              </Stack>
            </Box>

            <Box>
              <Title order={2} mb="md" style={{ color: active.primary }}>
                2. Who Sees Your Manuscript
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  Access to your manuscript is strictly limited to the editor(s) assigned to your project and, where applicable, the project coordinator responsible for quality assurance. No other team members, external contractors, or third parties have access to your files.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  Your content is never shared with other clients, used in marketing materials, published in any form, or used for training or development purposes — including AI model training.
                </Text>
              </Stack>
            </Box>

            <Box>
              <Title order={2} mb="md" style={{ color: active.primary }}>
                3. Non-Disclosure Agreement
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  While all projects are handled under our implicit confidentiality standards, we understand that some research requires formal documentation. A signed non-disclosure agreement (NDA) is available upon request for institutional clients, industry-sponsored research, or particularly sensitive projects.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  To request a formal NDA, contact us at contact@scholarcrafted.com. We will provide a tailored agreement within two business days.
                </Text>
              </Stack>
            </Box>

            <Box>
              <Title order={2} mb="md" style={{ color: active.primary }}>
                4. Secure Handling
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  All files are transferred via encrypted channels and stored on access-controlled, encrypted systems. We do not use consumer-grade file sharing platforms or store manuscripts on personal devices.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  Access to project files is restricted to assigned team members only, and permissions are revoked immediately upon project completion. No local copies are retained on personal devices at any stage of the engagement.
                </Text>
              </Stack>
            </Box>

            <Box>
              <Title order={2} mb="md" style={{ color: active.primary }}>
                5. Data Deletion Timeline
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  All working files — including manuscript drafts, editor notes, and correspondence — are permanently deleted within 90 days of project completion. This retention window exists solely to support revision requests and follow-up questions.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  If you require earlier deletion, you may request immediate removal of all project files at any time by contacting contact@scholarcrafted.com. We will confirm deletion within two business days.
                </Text>
              </Stack>
            </Box>

            <Box>
              <Title order={2} mb="md" style={{ color: active.primary }}>
                6. Intellectual Property
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  All intellectual property rights in your manuscript, research data, figures, and supplementary materials remain exclusively with you, the author. ScholarCrafted claims no ownership, license, or derivative rights over any content submitted to us.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  Our role is limited to providing editorial and publication support services. The work is yours before, during, and after our engagement.
                </Text>
              </Stack>
            </Box>

            <Box>
              <Title order={2} mb="md" style={{ color: active.primary }}>
                7. Breach Protocol
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  In the unlikely event of a security incident involving your data, ScholarCrafted is committed to full transparency. Affected clients will be notified within 48 hours of the discovery of any breach.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  Our notification will include a full disclosure of the breach scope, the specific data affected, the steps taken to contain the incident, and the remediation measures being implemented to prevent recurrence.
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
