'use client'

import React from 'react'
import {
  Container,
  Title,
  Text,
  Box,
  Stack,
  Table,
  rem,
  useMantineTheme,
} from '@mantine/core'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'
import { SECTION_SPACING, INNER_WIDTH, READING_WIDTH } from '@/layout'

const ethicsData = [
  {
    service: 'English Editing',
    compliant: 'Yes',
    note: 'We improve clarity, flow, and structure but never alter findings or their interpretation.',
  },
  {
    service: 'Scientific Editing',
    compliant: 'Yes',
    note: 'We review technical content for accuracy and consistency but never alter findings. We recommend acknowledgement of editorial assistance.',
  },
  {
    service: 'AI Manuscript Audit',
    compliant: 'Yes',
    note: 'We identify AI-generated content risks and flag passages for author review but never alter research or conclusions.',
  },
  {
    service: 'Journal Selection',
    compliant: 'Yes',
    note: 'We provide unbiased, data-informed journal recommendations. No attribution required.',
  },
  {
    service: 'Journal Submission',
    compliant: 'Yes',
    note: 'We assist with submission logistics but never submit without explicit author approval and review.',
  },
  {
    service: 'Formatting & Compliance',
    compliant: 'Yes',
    note: 'We format manuscripts to journal specifications. No attribution required.',
  },
]

export default function PublicationEthicsPage() {
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
              Ethical Standards
            </Text>
            <Title
              order={1}
              style={{
                fontSize: rem(56),
                lineHeight: 1.1,
                color: active.primary }}
            >
              Publication Ethics
            </Title>
            <Text size="lg" c="dimmed" lh={1.6}>
              Our policies and practices for ethical publication support, aligned with COPE, ICMJE, and EASE.
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
                1. Our Commitment
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  ScholarCrafted is committed to upholding the highest standards of publication ethics across every service we offer. As a faculty-led post-draft execution firm, we understand the weight of scholarly publishing and the responsibility that comes with supporting researchers through the publication process.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  We align our practices with the guidelines set forth by the Committee on Publication Ethics (COPE), the International Committee of Medical Journal Editors (ICMJE), and the European Association of Science Editors (EASE). These frameworks inform every editorial decision we make.
                </Text>
              </Stack>
            </Box>

            <Box>
              <Title order={2} mb="md" style={{ color: active.primary }}>
                2. Authorship &amp; Writing Support
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  We believe that authorship must reflect genuine intellectual contribution. ScholarCrafted editors provide recommendations on structure, language, flow, and presentation — but every decision regarding content, conclusions, and argumentation remains with the author.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  We do not write, rewrite, or draft original content on behalf of authors. Authorship determinations should follow ICMJE and COPE criteria, and we encourage all clients to ensure their author lists accurately reflect contributions.
                </Text>
              </Stack>
            </Box>

            <Box>
              <Title order={2} mb="md" style={{ color: active.primary }}>
                3. Originality &amp; Plagiarism
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  ScholarCrafted works exclusively with original manuscripts. We expect all submitted work to represent the author&apos;s own research, analysis, and writing. If our editors identify text that appears to be directly copied from published sources without proper attribution, we flag it immediately and provide guidance on correction.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  We will not knowingly edit, polish, or rewrite plagiarized content. Manuscripts containing directly copied passages are returned to the author for resolution before editing begins.
                </Text>
              </Stack>
            </Box>

            <Box>
              <Title order={2} mb="md" style={{ color: active.primary }}>
                4. Data Integrity
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  Research integrity begins with data. ScholarCrafted never fabricates, falsifies, or manipulates research data in any form. Our editors may suggest improvements to how data is presented — through clearer tables, figures, or statistical reporting — but the underlying data and its interpretation are never altered.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  We advise all authors to maintain access to their raw data and be prepared to provide it upon request from journal editors or reviewers, as required by most publishing standards.
                </Text>
              </Stack>
            </Box>

            <Box>
              <Title order={2} mb="md" style={{ color: active.primary }}>
                5. Duplicate &amp; Concurrent Submissions
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  ScholarCrafted does not support the simultaneous submission of the same manuscript to multiple journals. Duplicate publication undermines the integrity of the scholarly record and violates the policies of virtually all peer-reviewed journals.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  If we become aware that a client is pursuing concurrent submissions of identical work, we will pause our services and advise the author on proper submission practices.
                </Text>
              </Stack>
            </Box>

            <Box>
              <Title order={2} mb="md" style={{ color: active.primary }}>
                6. Acknowledgement of Services
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  Per ICMJE, COPE, and EASE guidelines, authors should acknowledge professional editorial assistance in their published work. This transparency strengthens trust in the publication process and is a recognized best practice across disciplines.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  ScholarCrafted provides standard acknowledgement statements with all deliverables. Authors are free to include these in their manuscripts and are encouraged to do so when the level of editorial support warrants it.
                </Text>
              </Stack>
            </Box>

            <Box>
              <Title order={2} mb="md" style={{ color: active.primary }}>
                7. Disclosure &amp; Conflicts of Interest
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  We advise all authors to disclose any financial relationships, institutional affiliations, or personal connections that could be perceived as a conflict of interest in relation to their published research.
                </Text>
                <Text size="lg" lh={1.8} c="dimmed">
                  ScholarCrafted operates independently and does not maintain financial or editorial relationships with any journal, publisher, or funding body. Our recommendations — including journal selection — are based solely on fit, scope, and quality, never on commercial incentives.
                </Text>
              </Stack>
            </Box>

            <Box>
              <Title order={2} mb="md" style={{ color: active.primary }}>
                8. Service-by-Service Ethics Summary
              </Title>
              <Stack gap="sm">
                <Text size="lg" lh={1.8} c="dimmed">
                  The table below outlines how each of our core services aligns with established publication ethics standards.
                </Text>
                <Box style={{ overflowX: 'auto', maxWidth: '100%', WebkitOverflowScrolling: 'touch' }}>
                  <Table
                    withTableBorder
                    withColumnBorders
                    verticalSpacing="sm"
                    horizontalSpacing="md"
                    style={{ borderColor: `${active.primary}12`, minWidth: 540 }}
                  >
                    <Table.Thead>
                      <Table.Tr style={{ borderColor: `${active.primary}12` }}>
                        <Table.Th style={{ color: active.primary, borderColor: `${active.primary}12` }}>Service</Table.Th>
                        <Table.Th style={{ color: active.primary, borderColor: `${active.primary}12` }}>Compliant</Table.Th>
                        <Table.Th style={{ color: active.primary, borderColor: `${active.primary}12` }}>Details</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {ethicsData.map((row) => (
                        <Table.Tr key={row.service} style={{ borderColor: `${active.primary}12` }}>
                          <Table.Td style={{ fontWeight: 600, color: active.primary, borderColor: `${active.primary}12` }}>
                            {row.service}
                          </Table.Td>
                          <Table.Td style={{ color: active.accent, fontWeight: 600, borderColor: `${active.primary}12` }}>
                            {row.compliant}
                          </Table.Td>
                          <Table.Td c="dimmed" style={{ borderColor: `${active.primary}12` }}>
                            {row.note}
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </Box>
              </Stack>
            </Box>

          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
