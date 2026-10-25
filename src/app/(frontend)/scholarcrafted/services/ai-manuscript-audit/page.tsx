'use client'

import React from 'react'
import {
  Container,
  Title,
  Text,
  Box,
  SimpleGrid,
  Stack,
  Button,
  rem,
  Group,
  useMantineTheme,
  Accordion,
  Badge,
  Divider,
  Table,
} from '@mantine/core'
import { Navbar } from '../../_components/Navbar'
import { Footer } from '../../_components/Footer'
import Link from 'next/link'
import {
  IconCheck,
  IconX,
  IconArrowRight,
  IconShieldCheck,
  IconFileText,
  IconClock,
  IconReceipt,
  IconScale,
  IconSparkles,
  IconBooks,
} from '@tabler/icons-react'
import { SECTION_SPACING } from '@/layout'

const auditLayers = [
  {
    num: '01',
    title: 'Crossref & Academic Registry Verification',
    desc: 'Every cited reference is cross-matched against official scholarly registries (Crossref, PubMed, Web of Science) to verify authorship, title accuracy, publication year, and active DOI resolution.',
  },
  {
    num: '02',
    title: 'Retracted & Misattributed Citation Detection',
    desc: 'Drafting tools or rushed literature reviews frequently introduce phantom citations, misattribute findings, or cite retracted papers. We identify every vulnerable, disputed, or retracted reference.',
  },
  {
    num: '03',
    title: 'Claim-to-Evidence Logic Alignment',
    desc: 'We evaluate whether your empirical data, statistical findings, and tables logically substantiate the conclusions in your Discussion, preventing overclaimed interpretations.',
  },
  {
    num: '04',
    title: 'Methods & Experimental Consistency',
    desc: 'We verify that sample sizes, variable nomenclature, control descriptions, and analytical methods remain cohesive and unbroken from Introduction through Conclusion.',
  },
  {
    num: '05',
    title: 'Target Journal Scope & Desk-Check',
    desc: 'Screening against your target journal’s editorial aims, reference style conventions (APA, Chicago, IEEE, Vancouver), and required author disclosure statements.',
  },
  {
    num: '06',
    title: '1-Page Executive Faculty Risk Memo',
    desc: 'A concise briefing outlining the top 3 vulnerabilities peer reviewers will challenge, accompanied by an optional complimentary 15-minute consultation with Dr. Micah Dobson.',
  },
]

const pricingTiers = [
  {
    id: 'single',
    badge: 'ACCESSIBLE ENTRY',
    name: 'Single Manuscript Diagnostic',
    price: '$29',
    priceNum: 29,
    turnaround: '24–48 hours',
    isPopular: true,
    tagline: 'Ideal for a completed manuscript before initial journal submission or committee deposit.',
    features: [
      'Comprehensive section-by-section diagnostic report (Abstract to Conclusion)',
      'Reference & DOI verification cross-matched against official scholarly registries',
      'Detection of retracted, fabricated, or misattributed literature entries',
      'Structural consistency & argument alignment audit',
      'Target journal scope matching & desk-rejection risk screening',
      '1-Page Executive Faculty Risk Memo identifying critical vulnerabilities',
      'Optional 15-minute debrief consultation with Dr. Micah Dobson',
      '★ 100% Fee Credit: $29 credited toward full Word Track-Changes editing',
    ],
    href: '/order?service=ai-audit&tier=single',
  },
  {
    id: 'bundle',
    badge: 'BEST VALUE FOR REVISIONS',
    name: 'Revision Diagnostic Bundle (3 Reviews)',
    price: '$69',
    priceNum: 69,
    turnaround: '24–48 hours / review',
    isPopular: false,
    tagline: 'Three complete manuscript screenings across your submission and revision lifecycle.',
    features: [
      '3 complete manuscript audits across your project lifecycle:',
      '• Review 1: Initial pre-submission citation & logic screening',
      '• Review 2: Post-advisor or committee revision verification',
      '• Review 3: Final pre-submission / camera-ready proof check',
      'Everything in Single Audit included for all 3 drafts',
      'Priority 24-hour diagnostic turnaround queue',
      'Direct follow-up consultation with Dr. Micah Dobson after each review',
      '★ 100% Fee Credit: $69 credited toward full Word Track-Changes editing',
    ],
    href: '/order?service=ai-audit&tier=bundle',
  },
]

const auditComparison = [
  { feature: 'Reference & DOI Registry Cross-Matching', single: true, bundle: true },
  { feature: 'Retracted, Disputed & Misattributed Reference Audit', single: true, bundle: true },
  { feature: 'Section-by-Section Argument & Logic Coherence', single: true, bundle: true },
  { feature: 'Methods-to-Results Alignment Check', single: true, bundle: true },
  { feature: 'Target Journal Fit & Desk-Rejection Screening', single: true, bundle: true },
  { feature: '1-Page Executive Faculty Risk Memo', single: true, bundle: true },
  { feature: 'Optional 15-Minute Zoom Debrief with Dr. Micah Dobson', single: true, bundle: true },
  { feature: '100% Fee Credit Toward Full Word Track-Changes Editing', single: '$29 Credit', bundle: '$69 Credit' },
  { feature: 'Number of Full Manuscript Screenings Included', single: '1 Draft', bundle: '3 Drafts' },
  { feature: 'Post-Revision & Camera-Ready Re-audit', single: false, bundle: true },
]

const faqs = [
  {
    q: 'Why should I conduct a diagnostic audit before submitting to a journal?',
    a: 'Major publishers (Elsevier, Springer Nature, Wiley, Taylor & Francis) now screen submissions with automated integrity and indexing filters. Even unintentional reference discrepancies—such as an invalid DOI, an inaccurate citation year, or misattributed findings—can trigger immediate desk rejection or administrative queries. An independent pre-submission diagnostic gives you certainty before journal editors and external reviewers inspect your text.',
  },
  {
    q: 'Does the Diagnostic Audit include direct line-by-line editing?',
    a: 'No. The Audit is an evaluative diagnostic: it delivers a comprehensive diagnostic assessment, reference verification audit, and an Executive Faculty Risk Memo pinpointing exactly where your draft is vulnerable. However, 100% of your audit fee ($29 or $69) is credited toward our full Editing & Compliance track if you decide to have our doctoral team resolve the issues in Word Track Changes.',
  },
  {
    q: 'How does the 15-minute debrief call work?',
    a: 'Once your diagnostic report is delivered to your email, you will receive an invitation link to schedule an optional 15-minute consultation with Dr. Micah Dobson. On the call, we walk through the top structural or citation vulnerabilities surfaced in your report and answer your specific submission questions.',
  },
  {
    q: 'Will my manuscript be kept confidential?',
    a: 'Yes, absolutely. All manuscripts are handled under strict academic Non-Disclosure Agreements. Your text is never shared, never uploaded to public generative AI repositories, and reviewed exclusively by verified doctoral specialists.',
  },
  {
    q: 'How does the 100% Fee Credit guarantee work?',
    a: 'If your audit reveals citation issues, structural gaps, or language friction that you would prefer our doctoral team to resolve in Microsoft Word Track Changes, we deduct the full price of your audit ($29 or $69) directly from your editing invoice.',
  },
]

export default function AiManuscriptAuditPage() {
  const theme = useMantineTheme()
  const active = {
    primary: theme.other.primary || '#1a1a1a',
    accent: theme.other.accent || '#E65C38',
    surface: theme.other.surface || '#F5F5F5',
    background: theme.other.background || '#FFFFFF',
  }

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* ── HERO SECTION ───────────────────────────────────────────────── */}
      <Box
        component="section"
        pt={{ base: rem(120), md: rem(150) }}
        pb={{ base: rem(50), md: rem(70) }}
        bg={active.background}
        style={{ borderBottom: `1px solid ${active.primary}12` }}
      >
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap="lg" style={{ maxWidth: 860 }}>
            <Box>
              <Text
                size="xs"
                fw={700}
                c={active.accent}
                style={{
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                }}
              >
                Pre-Submission Integrity &amp; Citation Diagnostic
              </Text>
              <Title
                order={1}
                mt="xs"
                style={{
                  fontSize: 'clamp(2.3rem, 5vw, 3.6rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.025em',
                  color: active.primary,
                  fontFamily: 'var(--font-display), var(--font-serif)',
                  fontWeight: 600,
                }}
              >
                Pre-Submission Citation Integrity &amp; Logic Screening.
              </Title>
            </Box>

            <Text size="lg" c="dimmed" lh={1.75} style={{ fontSize: rem(18), maxWidth: '64ch' }}>
              Independent verification of references, active DOIs, retracted publications, and empirical argument coherence before journal editors and external reviewers screen your manuscript. 100% of your fee is credited toward full editing.
            </Text>

            {/* Quick Guarantees Bar */}
            <Group gap="xl" wrap="wrap" pt="xs">
              <Group gap="xs" align="center">
                <IconClock size={18} color={active.accent} />
                <Text size="sm" fw={600} c={active.primary}>Delivered in 24–48 Hours</Text>
              </Group>
              <Group gap="xs" align="center">
                <IconReceipt size={18} color={active.accent} />
                <Text size="sm" fw={600} c={active.primary}>100% Fee Credited Toward Full Editing</Text>
              </Group>
              <Group gap="xs" align="center">
                <IconShieldCheck size={18} color={active.accent} />
                <Text size="sm" fw={600} c={active.primary}>1-Page Risk Memo + Optional Debrief</Text>
              </Group>
            </Group>

            <Group gap="md" pt="sm" wrap="wrap">
              <Link href="/order?service=ai-audit" style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  radius={0}
                  rightSection={<IconArrowRight size={18} />}
                  style={{
                    backgroundColor: active.accent,
                    color: '#ffffff',
                    fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    height: rem(52),
                    paddingLeft: rem(28),
                    paddingRight: rem(28),
                  }}
                >
                  Order Diagnostic — $29
                </Button>
              </Link>
              <Link href="#pricing" style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  variant="outline"
                  radius={0}
                  style={{
                    borderColor: active.primary,
                    color: active.primary,
                    fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    height: rem(52),
                    paddingLeft: rem(28),
                    paddingRight: rem(28),
                  }}
                >
                  Compare Options
                </Button>
              </Link>
            </Group>
          </Stack>
        </Container>
      </Box>

      {/* ── 6-LAYER SYSTEMATIC VERIFICATION MATRIX ──────────────────────── */}
      <Box py={SECTION_SPACING} bg={active.surface}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Box mb={rem(48)} style={{ maxWidth: 780 }}>
            <Text
              size="xs"
              fw={700}
              c={active.accent}
              style={{
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-heading-sans), var(--font-sans)',
              }}
            >
              Systematic Risk Screening
            </Text>
            <Title
              order={2}
              mt={rem(6)}
              style={{
                fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                color: active.primary,
                fontFamily: 'var(--font-display), var(--font-serif)',
                fontWeight: 600,
              }}
            >
              Six layers of pre-submission integrity verification.
            </Title>
            <Text size="md" c="dimmed" mt={rem(8)} lh={1.7}>
              Our diagnostic pairs official academic registry cross-checks with doctoral peer-review scrutiny to uncover vulnerabilities before journal submission.
            </Text>
          </Box>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={rem(24)}>
            {auditLayers.map((layer) => (
              <Box
                key={layer.num}
                p={rem(32)}
                bg={active.background}
                style={{
                  border: `1px solid ${active.primary}12`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: rem(12),
                }}
              >
                <Text size="xs" fw={800} c={active.accent} style={{ letterSpacing: '0.12em' }}>
                  LAYER {layer.num}
                </Text>
                <Text
                  fw={700}
                  size="md"
                  c={active.primary}
                  style={{
                    fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                    lineHeight: 1.3,
                  }}
                >
                  {layer.title}
                </Text>
                <Text size="sm" c="dimmed" lh={1.65}>
                  {layer.desc}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* ── 100% FEE CREDIT BRIDGE & WORKFLOW ──────────────────────────── */}
      <Box
        py={SECTION_SPACING}
        bg={active.background}
        style={{
          borderTop: `1px solid ${active.primary}12`,
          borderBottom: `1px solid ${active.primary}12`,
        }}
      >
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: rem(40), md: rem(60) }} style={{ alignItems: 'center' }}>
            <Stack gap="md">
              <Badge
                radius={0}
                variant="filled"
                style={{
                  backgroundColor: active.accent,
                  color: '#ffffff',
                  width: 'fit-content',
                  letterSpacing: '0.1em',
                }}
              >
                100% FEE CREDIT ASSURANCE
              </Badge>
              <Title
                order={2}
                style={{
                  fontSize: 'clamp(1.9rem, 3.6vw, 2.5rem)',
                  fontFamily: 'var(--font-display), var(--font-serif)',
                  fontWeight: 600,
                  color: active.primary,
                  lineHeight: 1.25,
                }}
              >
                Clear diagnostics before comprehensive editing.
              </Title>
              <Text size="sm" c="dimmed" lh={1.75}>
                Before investing in full developmental editing, understand with precision where your manuscript is structurally or bibliographically vulnerable. Our pre-submission screening evaluates reference validity, logical flow, and journal alignment.
              </Text>
              <Text size="sm" c="dimmed" lh={1.75}>
                When your diagnostic report and Faculty Risk Memo arrive, you can implement the recommendations yourself—or choose to have our doctoral editors execute all revisions in Microsoft Word Track Changes. If you proceed with editing, <strong style={{ color: active.primary }}>100% of your diagnostic fee ($29 or $69)</strong> is credited directly toward your editing invoice.
              </Text>
            </Stack>

            <Box p={{ base: rem(28), md: rem(36) }} bg={active.surface} style={{ border: `1px solid ${active.primary}14` }}>
              <Text
                size="xs"
                fw={700}
                c={active.accent}
                style={{ letterSpacing: '0.14em', textTransform: 'uppercase' }}
              >
                THE DIAGNOSTIC-TO-EDITING WORKFLOW
              </Text>
              <Stack gap="md" mt="md">
                {[
                  {
                    step: '1',
                    title: 'Submit Draft ($29)',
                    desc: 'Upload your manuscript (.docx). Our doctoral review desk initiates comprehensive reference and logic verification.',
                  },
                  {
                    step: '2',
                    title: 'Receive Diagnostic & Faculty Memo',
                    desc: 'Delivered in 24–48 hours: an evaluative diagnostic report and a 1-page Faculty Risk Memo highlighting peer-review vulnerabilities.',
                  },
                  {
                    step: '3',
                    title: 'Optional 15-Min Faculty Debrief',
                    desc: 'Schedule an optional 1-on-1 consultation with Dr. Micah Dobson to discuss findings and plan your revision strategy.',
                  },
                  {
                    step: '4',
                    title: '100% Fee Credit Applied',
                    desc: 'Execute revisions independently, or apply your full fee toward Word Track-Changes editing with our doctoral specialists.',
                  },
                ].map((s) => (
                  <Group key={s.step} gap="md" align="flex-start" wrap="nowrap">
                    <Box
                      style={{
                        width: rem(28),
                        height: rem(28),
                        backgroundColor: active.primary,
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: rem(12),
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      {s.step}
                    </Box>
                    <Box>
                      <Text size="sm" fw={700} c={active.primary}>{s.title}</Text>
                      <Text size="xs" c="dimmed" mt={rem(2)} lh={1.5}>{s.desc}</Text>
                    </Box>
                  </Group>
                ))}
              </Stack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* ── PRICING SECTION ────────────────────────────────────────────── */}
      <Box id="pricing" py={SECTION_SPACING} bg={active.surface}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Box mb={rem(48)} style={{ maxWidth: 740 }}>
            <Text
              size="xs"
              fw={700}
              c={active.accent}
              style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}
            >
              TRANSPARENT PRICING
            </Text>
            <Title
              order={2}
              mt={rem(6)}
              style={{
                fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                fontFamily: 'var(--font-display), var(--font-serif)',
                fontWeight: 600,
                color: active.primary,
              }}
            >
              Select your diagnostic screening package
            </Title>
            <Text size="md" c="dimmed" mt={rem(8)} lh={1.7}>
              One-time investment. Zero recurring software fees. 100% credited toward full Word Track-Changes editing.
            </Text>
          </Box>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(28)} style={{ maxWidth: 960 }}>
            {pricingTiers.map((tier) => (
              <Box
                key={tier.id}
                p={{ base: rem(28), md: rem(36) }}
                bg={active.background}
                style={{
                  border: `1px solid ${tier.isPopular ? active.accent : `${active.primary}14`}`,
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  boxShadow: tier.isPopular ? `0 8px 32px ${active.accent}14` : 'none',
                }}
              >
                {tier.isPopular && (
                  <Box px={rem(10)} py={rem(4)} mb="md" style={{ backgroundColor: active.accent, alignSelf: 'flex-start' }}>
                    <Text size="xs" fw={700} c="#ffffff" style={{ letterSpacing: '0.1em' }}>
                      RECOMMENDED ENTRY POINT
                    </Text>
                  </Box>
                )}

                <Stack gap="md" flex={1}>
                  <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.12em' }}>{tier.badge}</Text>
                  <Box>
                    <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontSize: rem(22), fontWeight: 600, color: active.primary, lineHeight: 1.2 }}>
                      {tier.name}
                    </Title>
                    <Text size="xs" c="dimmed" mt={rem(4)} lh={1.5}>
                      {tier.tagline}
                    </Text>
                  </Box>

                  <Box my="xs">
                    <Text style={{ fontSize: rem(34), fontFamily: 'var(--font-serif)', fontWeight: 600, color: active.primary, lineHeight: 1 }}>
                      {tier.price}
                    </Text>
                    <Text size="xs" c="dimmed" mt={rem(4)}>Turnaround: {tier.turnaround}</Text>
                  </Box>

                  <Divider color={`${active.primary}10`} />

                  <Stack gap={rem(8)} flex={1}>
                    {tier.features.map((f, i) => (
                      <Group key={i} gap={rem(8)} align="flex-start" wrap="nowrap">
                        <IconCheck size={13} color={active.accent} style={{ flexShrink: 0, marginTop: rem(3) }} />
                        <Text size="xs" c="dimmed" lh={1.5}>{f}</Text>
                      </Group>
                    ))}
                  </Stack>

                  <Link href={tier.href} style={{ textDecoration: 'none' }}>
                    <Button
                      fullWidth
                      size="md"
                      radius={0}
                      rightSection={<IconArrowRight size={16} />}
                      style={{
                        backgroundColor: tier.isPopular ? active.accent : active.primary,
                        color: '#ffffff',
                        fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        height: rem(48),
                      }}
                    >
                      Order {tier.name}
                    </Button>
                  </Link>
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* ── DETAILED COMPARISON MATRIX TABLE ───────────────────────────── */}
      <Box py={SECTION_SPACING} bg={active.background}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Box mb={rem(32)} style={{ maxWidth: 740 }}>
            <Text
              size="xs"
              fw={700}
              c={active.accent}
              style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}
            >
              FEATURE BREAKDOWN
            </Text>
            <Title
              order={2}
              mt={rem(6)}
              style={{
                fontSize: 'clamp(1.9rem, 3.4vw, 2.5rem)',
                fontFamily: 'var(--font-display), var(--font-serif)',
                fontWeight: 600,
                color: active.primary,
              }}
            >
              Side-by-side diagnostic capabilities.
            </Title>
            <Text size="md" c="dimmed" mt={rem(6)} lh={1.6}>
              Compare deliverables across single draft screening and the 3-draft revision bundle.
            </Text>
          </Box>

          <Box style={{ overflowX: 'auto', maxWidth: '100%', WebkitOverflowScrolling: 'touch', border: `1px solid ${active.primary}18` }}>
            <Table verticalSpacing="md" horizontalSpacing="lg" highlightOnHover style={{ minWidth: 640 }}>
              <Table.Thead bg={active.surface}>
                <Table.Tr>
                  <Table.Th style={{ width: '50%', fontSize: rem(13), fontFamily: 'var(--font-heading-sans)', color: active.primary }}>
                    DIAGNOSTIC CAPABILITY &amp; DELIVERABLE
                  </Table.Th>
                  <Table.Th style={{ width: '25%', textAlign: 'center', fontSize: rem(13), fontFamily: 'var(--font-heading-sans)', color: active.primary }}>
                    SINGLE AUDIT ($29)
                  </Table.Th>
                  <Table.Th style={{ width: '25%', textAlign: 'center', fontSize: rem(13), fontFamily: 'var(--font-heading-sans)', color: active.accent, backgroundColor: `${active.accent}08` }}>
                    REVISION BUNDLE ($69) ★
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {auditComparison.map((row, i) => (
                  <Table.Tr key={i}>
                    <Table.Td style={{ fontWeight: 500, fontSize: rem(13), color: active.primary }}>
                      {row.feature}
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'center' }}>
                      {typeof row.single === 'boolean' ? (
                        row.single ? <IconCheck size={18} color={active.accent} /> : <IconX size={16} color="#bbb" />
                      ) : (
                        <Text size="xs" fw={600} c={active.primary}>{row.single}</Text>
                      )}
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'center', backgroundColor: `${active.accent}04` }}>
                      {typeof row.bundle === 'boolean' ? (
                        row.bundle ? <IconCheck size={18} color={active.accent} /> : <IconX size={16} color="#bbb" />
                      ) : (
                        <Text size="xs" fw={700} c={active.accent}>{row.bundle}</Text>
                      )}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Box>
        </Container>
      </Box>

      {/* ── FAQ SECTION ────────────────────────────────────────────────── */}
      <Box py={SECTION_SPACING} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}12` }}>
        <Container size={850} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap="xl">
            <Box style={{ textAlign: 'center' }}>
              <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                FREQUENTLY ASKED QUESTIONS
              </Text>
              <Title order={2} mt="xs" style={{ fontSize: 'clamp(2rem, 3.8vw, 2.6rem)', color: active.primary, fontFamily: 'var(--font-serif)' }}>
                Questions About Pre-Submission Diagnostics
              </Title>
            </Box>

            <Accordion
              variant="separated"
              radius={0}
              styles={{
                item: {
                  border: `1px solid ${active.primary}10`,
                  marginBottom: rem(6),
                  backgroundColor: active.background,
                },
                control: {
                  paddingTop: rem(18),
                  paddingBottom: rem(18),
                },
                label: {
                  fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                  fontWeight: 600,
                  color: active.primary,
                  fontSize: rem(15),
                },
                panel: {
                  paddingBottom: rem(20),
                },
              }}
            >
              {faqs.map((faq, i) => (
                <Accordion.Item key={i} value={`faq-${i}`}>
                  <Accordion.Control>
                    <Text size="sm" fw={600} c={active.primary}>{faq.q}</Text>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm" lh={1.7} c="dimmed">
                      {faq.a}
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Stack>
        </Container>
      </Box>

      {/* ── BOTTOM CTA ─────────────────────────────────────────────────── */}
      <Box
        component="section"
        py={rem(80)}
        className="dark-scholar-section"
        data-dark-bg="true"
        style={{ backgroundColor: active.primary }}
      >
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(60)} style={{ alignItems: 'center' }}>
            <Stack gap={rem(16)}>
              <Title
                order={2}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.8rem, 3.4vw, 2.4rem)',
                  color: '#ffffff',
                  fontWeight: 600,
                  lineHeight: 1.2,
                  letterSpacing: '-0.015em',
                }}
              >
                Screen your manuscript before journal editors review it.
              </Title>
              <Text size="md" lh={1.7} style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '48ch' }}>
                Upload your document to receive your complete diagnostic assessment and 1-Page Faculty Risk Memo within 24–48 hours.
              </Text>
            </Stack>
            <Group gap={rem(12)} wrap="wrap">
              <Link href="/order?service=ai-audit" style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  radius={0}
                  w={{ base: '100%', sm: 'auto' }}
                  style={{
                    backgroundColor: active.accent,
                    fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                    letterSpacing: '0.04em',
                    fontWeight: 700,
                  }}
                >
                  Order Single Audit ($29)
                </Button>
              </Link>
              <Link href="/services/editing-proofreading" style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  radius={0}
                  variant="outline"
                  w={{ base: '100%', sm: 'auto' }}
                  style={{
                    borderColor: 'rgba(255,255,255,0.25)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                    letterSpacing: '0.04em',
                  }}
                >
                  Explore Full Line Editing
                </Button>
              </Link>
            </Group>
          </SimpleGrid>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
