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
  IconArrowRight,
  IconShieldCheck,
  IconFileText,
  IconClock,
  IconReceipt,
  IconScale,
  IconAlertCircle,
  IconBooks,
} from '@tabler/icons-react'
import { SECTION_SPACING, INNER_WIDTH } from '@/layout'

const auditLayers = [
  {
    num: '01',
    title: '200M+ Academic Graph Verification',
    desc: 'Every cited reference cross-matched against live academic graphs (OpenAlex, Crossref, Semantic Scholar) to verify existence, authors, publication year, and source credibility.',
  },
  {
    num: '02',
    title: 'Hallucinated & Retracted Citation Detection',
    desc: 'AI text generators frequently fabricate plausible-sounding DOIs or misattribute claims to papers that conclude the opposite. We flag every phantom, misattributed, or retracted citation.',
  },
  {
    num: '03',
    title: 'Cross-Section Argument & Logic Coherence',
    desc: 'Audit whether your empirical results actually support the conclusions drafted in the discussion, and verify that the theoretical framework introduced in Section 1 is fulfilled in Section 4.',
  },
  {
    num: '04',
    title: 'Methods-to-Results Alignment Check',
    desc: 'Detect subtle discrepancies where AI-generated prose overstates sample sizes, misinterprets statistical significance, or introduces claims unsupported by your data tables.',
  },
  {
    num: '05',
    title: 'Target Journal Scope & Rejection Risk',
    desc: 'Topical matching against target journal editorial scopes with risk assessment for desk-rejection triggers, reference style conformity, and required AI-disclosure compliance statements.',
  },
  {
    num: '06',
    title: '1-Page Executive Faculty Risk Memo',
    desc: 'A prioritized summary detailing the 3 critical vulnerabilities peer reviewers will attack, accompanied by an optional complimentary 15-minute debrief call with Dr. Micah Dobson.',
  },
]

const pricingTiers = [
  {
    id: 'single',
    badge: 'ACCESSIBLE ENTRY',
    name: 'Single Manuscript Audit',
    price: '$29',
    priceNum: 29,
    turnaround: '24–48 hours',
    isPopular: true,
    tagline: 'Ideal for a completed draft before initial journal submission or committee deposit.',
    features: [
      'Complete section-by-section diagnostic report (Abstract to Conclusion)',
      'Citation verification & gap analysis benchmarked against 200M+ research papers',
      'Fabricated, misattributed & hallucinated reference detection',
      'Structural consistency & argument alignment audit',
      'Target journal scope matching & rejection risk screening',
      '1-Page Executive Faculty Risk Memo identifying critical vulnerabilities',
      'Optional 15-minute debrief consultation with Dr. Micah Dobson',
      '★ 100% Fee Credit: $29 credited toward full editing if scoped',
    ],
    href: '/request-review?service=ai-audit&tier=single',
  },
  {
    id: 'bundle',
    badge: 'BEST VALUE FOR REVISIONS',
    name: 'Revision Bundle (3 Reviews)',
    price: '$69',
    priceNum: 69,
    turnaround: '24–48 hours / review',
    isPopular: false,
    tagline: 'Three full manuscript audits across your project lifecycle: draft, revision, and pre-deposit.',
    features: [
      '3 complete manuscript audits across your project lifecycle:',
      '• Review 1: Initial pre-submission AI & citation screening',
      '• Review 2: Post-advisor or committee revision verification',
      '• Review 3: Final pre-submission / camera-ready proof check',
      'Everything in Single Audit included for all 3 drafts',
      'Priority 24-hour diagnostic turnaround queue',
      'Direct follow-up consultation with Dr. Micah Dobson after each review',
      '★ 100% Fee Credit: $69 credited toward full developmental editing',
    ],
    href: '/request-review?service=ai-audit&tier=bundle',
  },
]

const faqs = [
  {
    q: 'Why should I audit my manuscript before submitting to a journal?',
    a: 'Major publishers (Elsevier, Springer Nature, Wiley, Taylor & Francis) now screen submissions with automated integrity and plagiarism systems. Even inadvertent AI hallucinations—such as a fabricated citation, a misquoted statistic, or ungrounded claims—can lead to immediate desk rejection or academic integrity inquiries. An independent pre-submission audit gives you certainty before editors and external reviewers see your text.',
  },
  {
    q: 'Does the AI Manuscript Audit include direct line-by-line editing?',
    a: 'No. The Audit is a diagnostic assessment: it provides a detailed 15-page diagnostic report, citation graph checks, and an Executive Faculty Risk Memo pinpointing exactly where your manuscript is vulnerable. However, 100% of your audit fee ($29 or $69) is credited toward our full Editing & Compliance track if you decide to have our faculty team resolve the issues directly in Word with Track Changes.',
  },
  {
    q: 'How does the 15-minute debrief call work?',
    a: 'Once your diagnostic report is delivered to your email, you will receive an invitation link to book a complimentary 15-minute consultation with Dr. Micah Dobson. On the call, we walk through the top 3 structural or citation vulnerabilities surfaced in your report and answer your specific submission questions.',
  },
  {
    q: 'Will my manuscript be kept confidential?',
    a: 'Yes, absolutely. We operate under strict academic non-disclosure agreements. Your manuscript is never shared, never uploaded to public AI training repositories, and handled exclusively by our verified editorial desk.',
  },
  {
    q: 'How does the 100% Fee Credit guarantee work?',
    a: 'If your audit reveals structural gaps, citation errors, or language issues that you would prefer our faculty team to fix in Word, we will deduct the full price of your audit ($29 or $69) directly from your editing invoice.',
  },
]

export default function AiManuscriptAuditPage() {
  const theme = useMantineTheme()
  const active = theme.other

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* ── Hero Section ───────────────────────────────────────────────────────── */}
      <Box pt={{ base: rem(100), md: rem(130) }} pb={{ base: rem(60), md: rem(80) }} bg={active.surface} style={{ borderBottom: `1px solid ${active.primary}12` }}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap="xl" style={{ maxWidth: 840 }}>
            <Box>
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
                SERVICE 03 — PRE-SUBMISSION INTEGRITY & SCIENTIFIC AUDIT
              </Text>
              <Title
                order={1}
                mt="xs"
                style={{
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                  fontFamily: 'var(--font-display), var(--font-serif)',
                  fontWeight: 600,
                  color: active.primary,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                }}
              >
                AI helped draft your paper. Now audit what it may have missed.
              </Title>
              <Text size="lg" c="dimmed" mt="md" lh={1.75} style={{ maxWidth: '64ch' }}>
                Get your AI-assisted manuscript independently screened against 200M+ research papers. Surface hallucinated citations, missing literature, and logical gaps before journal editors and external reviewers see them.
              </Text>
            </Box>

            <Group gap="md" wrap="wrap">
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
                    paddingLeft: rem(32),
                    paddingRight: rem(32),
                  }}
                >
                  Order Single Audit — $29
                </Button>
              </Link>
              <Link href="#pricing" style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  variant="outline"
                  radius={0}
                  color={active.primary}
                  style={{
                    borderColor: `${active.primary}30`,
                    color: active.primary,
                    fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                    fontWeight: 600,
                  }}
                >
                  Compare Audit Options
                </Button>
              </Link>
            </Group>

            {/* Quick trust bar */}
            <Group gap="xl" mt="sm" wrap="wrap">
              {[
                { icon: <IconClock size={16} color={active.accent} />, label: 'Delivered in 24–48 Hours' },
                { icon: <IconReceipt size={16} color={active.accent} />, label: '100% Fee Credited Toward Full Editing' },
                { icon: <IconShieldCheck size={16} color={active.accent} />, label: '1-Page Memo + Optional 15-Min Call' },
              ].map((b, i) => (
                <Group key={i} gap="xs" align="center">
                  {b.icon}
                  <Text size="xs" fw={600} c={active.primary}>{b.label}</Text>
                </Group>
              ))}
            </Group>
          </Stack>
        </Container>
      </Box>

      {/* ── 6-Layer Diagnostic Matrix ────────────────────────────────────────── */}
      <Box py={SECTION_SPACING} bg={active.background}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Box mb={rem(48)} style={{ maxWidth: 740 }}>
            <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              SYSTEMATIC RISK SCREENING
            </Text>
            <Title order={2} mt={rem(6)} style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.9rem, 3.4vw, 2.6rem)', color: active.primary }}>
              One assessment. Multiple layers of submission risk checking.
            </Title>
            <Text size="md" c="dimmed" mt={rem(8)} lh={1.7}>
              Our audit pairs deep academic graph matching with faculty peer-review scrutiny to uncover vulnerabilities before you submit.
            </Text>
          </Box>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={rem(24)}>
            {auditLayers.map((layer) => (
              <Box
                key={layer.num}
                p={rem(32)}
                bg={active.surface}
                style={{
                  border: `1px solid ${active.primary}12`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: rem(12),
                }}
              >
                <Text size="xs" fw={800} c={active.accent} style={{ letterSpacing: '0.12em' }}>
                  {layer.num}
                </Text>
                <Text fw={700} size="md" c={active.primary} style={{ fontFamily: 'var(--font-heading-sans), var(--font-sans)', lineHeight: 1.3 }}>
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

      {/* ── The 100% Fee Credit Bridge ───────────────────────────────────────── */}
      <Box py={rem(64)} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}12`, borderBottom: `1px solid ${active.primary}12` }}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(48)} style={{ alignItems: 'center' }}>
            <Stack gap="md">
              <Badge radius={0} variant="filled" style={{ backgroundColor: active.accent, color: '#ffffff', width: 'fit-content' }}>
                ZERO-RISK DIAGNOSTIC
              </Badge>
              <Title order={2} style={{ fontFamily: 'var(--font-serif)', fontSize: rem(26), color: active.primary, lineHeight: 1.25 }}>
                Diagnosis is cheap. If you need surgery, the diagnostic is free.
              </Title>
              <Text size="sm" c="dimmed" lh={1.7}>
                You wouldn’t commit to major surgery without seeing your lab results first. In the same way, you shouldn’t pay $500+ for developmental editing without knowing exactly where your paper is vulnerable.
              </Text>
              <Text size="sm" c="dimmed" lh={1.7}>
                Take the <strong style={{ color: active.primary }}>$29 AI Manuscript Audit</strong>. If you decide to fix the issues yourself, you keep the full diagnostic report. If you want our faculty team to resolve them in Word Track Changes, <strong style={{ color: active.primary }}>100% of your audit fee will be credited</strong> toward your editing package.
              </Text>
            </Stack>

            <Box p={rem(36)} bg={active.background} style={{ border: `1px solid ${active.primary}14` }}>
              <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                THE AUDIT-TO-EDITING WORKFLOW
              </Text>
              <Stack gap="md" mt="md">
                {[
                  { step: '1', title: 'Submit Draft ($29)', desc: 'Upload your AI-assisted manuscript. We scan against 200M+ research papers in 24–48 hours.' },
                  { step: '2', title: 'Review Diagnostic & Memo', desc: 'Receive your 15-page diagnostic report and 1-page Faculty Risk Memo highlighting peer-review vulnerabilities.' },
                  { step: '3', title: 'Optional 15-Min Debrief', desc: 'Discuss the findings directly with Dr. Micah Dobson to understand what needs repair before submission.' },
                  { step: '4', title: '100% Fee Credit Applied', desc: 'Choose to execute revisions yourself or apply your full $29 fee toward full Word Track-Changes editing.' },
                ].map((s) => (
                  <Group key={s.step} gap="md" align="flex-start" wrap="nowrap">
                    <Box
                      style={{
                        width: rem(28),
                        height: rem(28),
                        backgroundColor: `${active.accent}15`,
                        color: active.accent,
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
                      <Text size="xs" c="dimmed" mt={rem(2)}>{s.desc}</Text>
                    </Box>
                  </Group>
                ))}
              </Stack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* ── Pricing Section ──────────────────────────────────────────────────── */}
      <Box id="pricing" py={SECTION_SPACING} bg={active.background}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Box mb={rem(48)} style={{ maxWidth: 740 }}>
            <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              TRANSPARENT PRICING
            </Text>
            <Title order={2} mt={rem(6)} style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.9rem, 3.4vw, 2.6rem)', color: active.primary }}>
              Select your AI Manuscript Audit plan
            </Title>
            <Text size="md" c="dimmed" mt={rem(8)} lh={1.7}>
              One-time investment. No recurring software subscriptions. 100% credited toward full editing.
            </Text>
          </Box>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(28)} style={{ maxWidth: 960 }}>
            {pricingTiers.map((tier) => (
              <Box
                key={tier.id}
                p={{ base: rem(28), md: rem(36) }}
                bg={active.surface}
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

      {/* ── FAQ Section ──────────────────────────────────────────────────────── */}
      <Box py={SECTION_SPACING} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}12` }}>
        <Container size={850} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap="xl">
            <Box style={{ textAlign: 'center' }}>
              <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                FREQUENTLY ASKED QUESTIONS
              </Text>
              <Title order={2} mt="xs" style={{ fontSize: 'clamp(2rem, 3.8vw, 2.6rem)', color: active.primary, fontFamily: 'var(--font-serif)' }}>
                Questions About AI Manuscript Audits
              </Title>
            </Box>

            <Accordion>
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

      <Footer />
    </Box>
  )
}
