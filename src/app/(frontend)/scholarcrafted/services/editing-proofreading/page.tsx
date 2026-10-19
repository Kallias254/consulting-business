'use client'

import React, { useState } from 'react'
import {
  Container,
  Title,
  Text,
  Box,
  SimpleGrid,
  Stack,
  Button,
  Divider,
  rem,
  Group,
  useMantineTheme,
  Accordion,
  Badge,
  Slider,
  NumberInput,
  UnstyledButton,
  Table,
} from '@mantine/core'
import { Navbar } from '../../_components/Navbar'
import { Footer } from '../../_components/Footer'
import Link from 'next/link'
import {
  IconCheck,
  IconX,
  IconArrowRight,
  IconClock,
  IconShieldCheck,
  IconFileCertificate,
  IconMessageChatbot,
  IconRefresh,
  IconFileText,
  IconSparkles,
  IconAlertTriangle,
} from '@tabler/icons-react'
import { SECTION_SPACING } from '@/layout'

// ─── 3 EDITING TIERS DEFINITION ─────────────────────────────────────────────

interface EditingTier {
  id: string
  name: string
  badge: string
  isPopular?: boolean
  tagline: string
  ratePerWord: number
  standardDays: string
  priorityDays: string
  targetAudience: string
  description: string
  features: string[]
  whenToChoose: string[]
  deliverables: string[]
}

const editingTiers: EditingTier[] = [
  {
    id: 'advanced',
    name: 'Advanced Editing',
    badge: 'ACCURATE & FAST ON BUDGET',
    isPopular: false,
    tagline: 'Precision grammar, syntax, academic tone & full style manual compliance.',
    ratePerWord: 0.0425,
    standardDays: '3–5 days',
    priorityDays: '48 hours',
    targetAudience: 'Scholars with well-structured drafts seeking native-level polish, mechanical accuracy, and formatting compliance before deposit or submission.',
    description:
      'A dedicated subject-matter editor improves the flow, sentence-level syntax, and readability of your manuscript. Ensures your writing is articulate, free of grammatical errors, and fully formatted to APA, Chicago, MLA, or target journal specifications.',
    features: [
      'Line-by-line grammar, punctuation, and syntax correction',
      'Discipline-specific terminology and phrasing verification',
      'Target journal or university template formatting (APA, Chicago, MLA, IEEE)',
      'Delivered in Microsoft Word with 100% Track Changes',
      'One round of journal style & template formatting',
      'Direct margin queries with your senior discipline editor',
      'Official Editorial Compliance & Language Certificate',
    ],
    whenToChoose: [
      'Your methodology and structural logic are already sound.',
      'You are facing a fast-approaching defense or submission deadline.',
      'English is your second academic language or prose requires native clarity.',
      'You want mechanical perfection without extensive argument restructuring.',
    ],
    deliverables: [
      'Tracked Changes document (.docx)',
      'Clean submission-ready document (.docx)',
      'Editorial Certificate of English Editing',
      'Style manual compliance checklist',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Editing',
    badge: 'MOST REQUESTED • COMPREHENSIVE',
    isPopular: true,
    tagline: 'Substantive line editing, argument flow, cadence & 365-day re-editing support.',
    ratePerWord: 0.065,
    standardDays: '5–7 days',
    priorityDays: '72 hours',
    targetAudience: 'Doctoral candidates preparing dissertations and scholars targeting high-ranking peer-reviewed journals who anticipate revision rounds.',
    description:
      'Our flagship editorial track. A senior discipline specialist performs substantial paragraph- and sentence-level overhauls, correcting argument progression, structural flow, transitions, and rhetoric. Includes complimentary re-editing passes for up to 365 days after delivery.',
    features: [
      'All Advanced Editing features included',
      'Substantive paragraph reorganization and logical pacing polish',
      'Elimination of discursive drift and rhetorical redundancy',
      'Reference cross-check: inline citations verified against bibliography',
      'Target journal scope & author guidelines audit',
      'Submission cover letter & abstract packaging',
      'Unconditional complimentary re-editing support for 365 days',
      'Detailed Editor Advisory Memorandum on thesis defensibility',
      'Two independent editorial passes (specialist + managing editor)',
    ],
    whenToChoose: [
      'Targeting top-tier peer-reviewed journals (SCI, SSCI, Scopus Q1/Q2).',
      'Preparing a multi-chapter dissertation for committee defense.',
      'You expect supervisor, co-author, or reviewer revision requests.',
      'You want extensive margin feedback on narrative clarity and academic strength.',
    ],
    deliverables: [
      'Tracked Changes document with extensive margin commentary',
      'Clean publication-ready document formatted to target press',
      'Target Journal Scope & Guidelines Audit report',
      'Target Journal Cover Letter',
      'Citation & Bibliography cross-audit memo',
      'Editorial Rigor Certificate + 365-day re-editing guarantee',
    ],
  },
  {
    id: 'scientific',
    name: 'Scientific Editing Pro',
    badge: 'HIGH-IMPACT FACTOR JOURNALS',
    isPopular: false,
    tagline: 'Dual-pass developmental critique by former journal peer reviewers and senior editors.',
    ratePerWord: 0.095,
    standardDays: '7–10 days',
    priorityDays: '4–5 days',
    targetAudience: 'Authors submitting to top university presses (Oxford, Cambridge, Routledge) or high-rejection journals (Nature, Lancet, Elsevier Q1).',
    description:
      'A superior developmental editor and a journal peer reviewer team up to evaluate your manuscript against top-journal acceptance criteria. Identifies critical methodological communication gaps, tests evidence-to-claim alignment in Discussion sections, and prepares response letters.',
    features: [
      'All Premium Editing features included',
      'Comprehensive Manuscript Scientific Completeness Assessment',
      'Deep analysis of narrative coherence, experimental framing, and literature synthesis',
      'Reviewer Response Matrix & rebuttal letter cross-check for resubmissions',
      'Direct peer reviewer commentary mimicking actual journal review committees',
      'Unlimited rounds of re-editing and re-formatting for 365 days',
      'Priority delivery turnaround with executive managing editor oversight',
    ],
    whenToChoose: [
      'Targeting premier high-impact journals with >80% desk-rejection rates.',
      'You received a harsh "Revise & Resubmit" decision and need response strategy.',
      'Converting complex empirical multi-study data into cohesive prose.',
      'You seek deep academic critique to reinforce your manuscript before initial submission.',
    ],
    deliverables: [
      'Tracked Changes substantive edit',
      'Comprehensive Scientific Review Report (strengths, gaps, review readiness)',
      'Journal Rebuttal / Revision Response Matrix',
      'Cover Letter + Target Journal Submission Checklist',
      'Executive Editorial Certificate + Priority 365-day re-editing',
    ],
  },
]

// ─── COMPARISON MATRIX ROWS ─────────────────────────────────────────────────

const comparisonMatrix = [
  { feature: 'Grammar, punctuation & syntax correction', advanced: true, premium: true, scientific: true },
  { feature: 'Academic tone & terminology accuracy', advanced: true, premium: true, scientific: true },
  { feature: '100% Track Changes delivery in Word', advanced: true, premium: true, scientific: true },
  { feature: 'Target journal style & handbook formatting', advanced: true, premium: true, scientific: true },
  { feature: 'Target journal scope & guidelines audit', advanced: false, premium: true, scientific: true },
  { feature: 'Editorial Certificate of English Editing', advanced: true, premium: true, scientific: true },
  { feature: 'Sentence rhythm, flow & transitions polish', advanced: 'Basic', premium: 'Substantive', scientific: 'In-Depth' },
  { feature: 'Paragraph restructuring & logical pacing', advanced: false, premium: true, scientific: true },
  { feature: 'Inline citation to bibliography cross-check', advanced: false, premium: true, scientific: true },
  { feature: 'Target Journal Cover Letter creation', advanced: false, premium: true, scientific: true },
  { feature: 'Editor Advisory Memorandum on arguments', advanced: false, premium: true, scientific: true },
  { feature: 'Dual-pass review by 2 independent academic editors', advanced: false, premium: true, scientific: true },
  { feature: 'Scientific Completeness & Peer Review Assessment', advanced: false, premium: false, scientific: true },
  { feature: 'Reviewer Response Matrix & Rebuttal letter check', advanced: false, premium: false, scientific: true },
  { feature: 'Complimentary Re-editing Guarantee', advanced: '1 round (30 days)', premium: 'Unlimited (365 days)', scientific: 'Unlimited (365 days)' },
]

// ─── FAQS ───────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'How do I choose between Advanced, Premium, and Scientific Editing Pro?',
    a: 'If your manuscript is well-organized and needs line-by-line grammar, academic tone polish, and strict target journal formatting, choose Advanced Editing. If you want structural reorganization, argument flow refinement, citation verification, and peace of mind with 365 days of free re-editing, choose Premium Editing (our most requested service). If you are targeting high-rejection Q1 journals or responding to tough reviewer critiques, choose Scientific Editing Pro for peer-reviewer developmental assessment.',
  },
  {
    q: 'Can I upload my file and start immediately without scheduling a sales call?',
    a: 'Yes, absolutely. Our pipeline is 100% asynchronous and designed for busy scholars. You can enter your word count, upload your manuscript (.docx), select your deadline, and receive your confirmed quote and start notification within 24 hours.',
  },
  {
    q: 'What is your policy on ghostwriting and AI-generated text?',
    a: 'We operate under a strict zero-ghostwriting policy. We do not generate text, write unoriginal prose, or falsify data. We polish, structure, audit, and refine your authentic intellectual work in Microsoft Word Track Changes so you retain 100% intellectual authorship and defense defensibility.',
  },
  {
    q: 'What does the 365-Day Free Re-editing guarantee include?',
    a: 'Under Premium Editing and Scientific Editing Pro, you can submit revised drafts of your edited manuscript within 365 days of initial delivery at zero additional charge. This covers revisions made in response to supervisor comments, committee feedback, or journal peer reviewers.',
  },
  {
    q: 'Can university grants, departmental research budgets, or startup funds pay for this?',
    a: 'Yes. Most universities, labs, and fellowship programs (NSF, NIH, Fulbright, university graduate research allowances) cover professional editorial services. We provide itemized institutional invoices and W-9 documentation.',
  },
  {
    q: 'Which style manuals and academic disciplines do you support?',
    a: 'We edit across all disciplines (humanities, social sciences, medicine, STEM, law, education) and configure documents to APA 7th, Chicago/Turabian (Notes & Bibliography or Author-Date), MLA 9th, IEEE, Harvard, AMA, and individual publisher author guidelines.',
  },
]

export default function EditingProofreadingPage() {
  const theme = useMantineTheme()
  const active = theme.other

  // Live Pricing State
  const [wordCount, setWordCount] = useState<number>(8000)
  const [selectedTierId, setSelectedTierId] = useState<string>('premium')

  const selectedTier = editingTiers.find((t) => t.id === selectedTierId) ?? editingTiers[1]
  const estimatedPrice = (wordCount * selectedTier.ratePerWord).toFixed(2)

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* ── HERO SECTION ───────────────────────────────────────────────── */}
      <Box
        component="section"
        pt={{ base: rem(120), md: rem(150) }}
        pb={{ base: rem(60), md: rem(90) }}
        bg={active.background}
        style={{ borderBottom: `1px solid ${active.primary}12` }}
      >
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap="xl" style={{ maxWidth: 860 }}>
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
                Manuscript Refinement & Production
              </Text>
              <Title
                order={1}
                mt="xs"
                style={{
                  fontSize: 'clamp(2.4rem, 5.2vw, 3.8rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.025em',
                  color: active.primary,
                  fontFamily: 'var(--font-display), var(--font-serif)',
                  fontWeight: 600,
                }}
              >
                English Editing Services by Academic Subject Specialists.
              </Title>
            </Box>

            <Text size="lg" c="dimmed" lh={1.75} style={{ fontSize: rem(19), maxWidth: '64ch' }}>
              Whether you need rapid line-by-line grammar polish or substantive structural overhaul with 365 days of free re-editing &mdash; our senior PhD editors ensure your manuscript is authoritative, style-compliant, and committee-ready.
            </Text>

            {/* Quick Stats Bar */}
            <Group gap="xl" wrap="wrap" pt="sm">
              <Group gap="xs" align="center">
                <IconCheck size={18} color={active.accent} />
                <Text size="sm" fw={600} c={active.primary}>100% Track Changes Delivery</Text>
              </Group>
              <Group gap="xs" align="center">
                <IconCheck size={18} color={active.accent} />
                <Text size="sm" fw={600} c={active.primary}>Strict Zero Ghostwriting Guarantee</Text>
              </Group>
              <Group gap="xs" align="center">
                <IconCheck size={18} color={active.accent} />
                <Text size="sm" fw={600} c={active.primary}>Subject-Matched PhD Editors</Text>
              </Group>
            </Group>

            <Group gap="md" pt="xs" wrap="wrap">
              <Link href="#pricing-calculator" style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  radius={0}
                  style={{
                    backgroundColor: active.accent,
                    color: '#fff',
                    fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    height: rem(52),
                    paddingLeft: rem(28),
                    paddingRight: rem(28),
                  }}
                >
                  Calculate Your Fee
                </Button>
              </Link>
              <Link href="/order?service=editing" style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  variant="outline"
                  radius={0}
                  style={{
                    borderColor: active.primary,
                    color: active.primary,
                    fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                    letterSpacing: '0.04em',
                    height: rem(52),
                    paddingLeft: rem(28),
                    paddingRight: rem(28),
                  }}
                >
                  Upload Manuscript Now
                </Button>
              </Link>
            </Group>
          </Stack>
        </Container>
      </Box>

      {/* ── 3-TIER COMPARISON CARDS ────────────────────────────────────── */}
      <Box component="section" py={SECTION_SPACING} bg={active.surface}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap={rem(48)}>
            <Box style={{ maxWidth: 800 }}>
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
                Editing Plans
              </Text>
              <Title
                order={2}
                mt="xs"
                style={{
                  fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                  color: active.primary,
                  fontFamily: 'var(--font-display), var(--font-serif)',
                  fontWeight: 600,
                }}
              >
                Three depths of editorial intervention.
              </Title>
              <Text size="md" c="dimmed" mt="sm" lh={1.7}>
                Choose the level of rigor that matches where your manuscript stands today. Every tier is executed by human discipline specialists in Microsoft Word Track Changes.
              </Text>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
              {editingTiers.map((tier) => {
                const isSelected = tier.id === selectedTierId
                return (
                  <Box
                    key={tier.id}
                    p={{ base: rem(28), md: rem(36) }}
                    bg={active.background}
                    style={{
                      border: `1px solid ${tier.isPopular ? active.accent : `${active.primary}18`}`,
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      boxShadow: tier.isPopular ? `0 12px 40px ${active.accent}18` : 'none',
                    }}
                  >
                    {tier.isPopular && (
                      <Box
                        px={rem(12)}
                        py={rem(4)}
                        mb="xs"
                        style={{
                          backgroundColor: active.accent,
                          alignSelf: 'flex-start',
                        }}
                      >
                        <Text
                          size="xs"
                          fw={700}
                          c={active.background}
                          style={{
                            letterSpacing: '0.12em',
                            fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                          }}
                        >
                          MOST POPULAR
                        </Text>
                      </Box>
                    )}

                    <Text
                      size="xs"
                      fw={700}
                      c={active.accent}
                      style={{
                        letterSpacing: '0.12em',
                        fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                      }}
                    >
                      {tier.badge}
                    </Text>

                    <Title
                      order={3}
                      mt="xs"
                      style={{
                        fontSize: rem(24),
                        fontFamily: 'var(--font-display), var(--font-serif)',
                        fontWeight: 600,
                        color: active.primary,
                      }}
                    >
                      {tier.name}
                    </Title>

                    <Text size="xs" c="dimmed" mt="xs" lh={1.6} style={{ minHeight: rem(42) }}>
                      {tier.tagline}
                    </Text>

                    <Box my="md">
                      <Text
                        size="xs"
                        fw={700}
                        c="dimmed"
                        style={{ letterSpacing: '0.08em', textTransform: 'uppercase' }}
                      >
                        Rate per word
                      </Text>
                      <Text
                        fw={700}
                        style={{
                          fontSize: rem(26),
                          fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                          color: active.primary,
                          lineHeight: 1.1,
                          marginTop: rem(4),
                        }}
                      >
                        ${tier.ratePerWord.toFixed(4)} <span style={{ fontSize: rem(14), fontWeight: 500, color: '#888' }}>/ word</span>
                      </Text>
                    </Box>

                    <Button
                      fullWidth
                      radius={0}
                      variant={tier.isPopular ? 'filled' : 'outline'}
                      style={{
                        backgroundColor: tier.isPopular ? active.accent : 'transparent',
                        color: tier.isPopular ? '#fff' : active.primary,
                        borderColor: tier.isPopular ? active.accent : active.primary,
                        fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                        letterSpacing: '0.04em',
                        fontWeight: 600,
                        marginBottom: rem(24),
                      }}
                      onClick={() => {
                        setSelectedTierId(tier.id)
                        document.getElementById('pricing-calculator')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      Select Plan & Calculate Fee
                    </Button>

                    <Stack gap="xs" mb="lg">
                      {tier.features.map((feat, fIdx) => (
                        <Group key={fIdx} gap="xs" align="flex-start" wrap="nowrap">
                          <IconCheck size={15} color={active.accent} style={{ flexShrink: 0, marginTop: rem(2) }} />
                          <Text size="xs" c={active.primary} lh={1.4}>
                            {feat}
                          </Text>
                        </Group>
                      ))}
                    </Stack>

                    <Divider color={`${active.primary}12`} my="sm" />

                    <Stack gap={rem(6)} mt="auto">
                      <Text
                        size="xs"
                        fw={700}
                        c={active.accent}
                        style={{
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                        }}
                      >
                        When to choose
                      </Text>
                      {tier.whenToChoose.map((wtc, wIdx) => (
                        <Text key={wIdx} size="xs" c="dimmed" lh={1.45}>
                          • {wtc}
                        </Text>
                      ))}
                    </Stack>
                  </Box>
                )
              })}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* ── LIVE INTERACTIVE WORD-COUNT CALCULATOR ──────────────────────── */}
      <Box
        id="pricing-calculator"
        component="section"
        py={SECTION_SPACING}
        bg={active.background}
        style={{ borderTop: `1px solid ${active.primary}12`, borderBottom: `1px solid ${active.primary}12` }}
      >
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: rem(40), md: rem(80) }} style={{ alignItems: 'center' }}>
            <Stack gap="xl">
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
                  Instant Fee Calculator
                </Text>
                <Title
                  order={2}
                  mt="xs"
                  style={{
                    fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                    color: active.primary,
                    fontFamily: 'var(--font-display), var(--font-serif)',
                    fontWeight: 600,
                  }}
                >
                  Transparent, per-word pricing. Zero hidden fees.
                </Title>
                <Text size="md" c="dimmed" mt="sm" lh={1.7}>
                  Adjust your word count to view the exact fee for each editorial tier. Submit your document directly online without mandatory sales calls.
                </Text>
              </Box>

              {/* Tier Selection Buttons */}
              <Box>
                <Text size="xs" fw={700} c="dimmed" mb="xs" style={{ letterSpacing: '0.08em' }}>
                  CHOOSE YOUR EDITING PLAN:
                </Text>
                <SimpleGrid cols={3} spacing={rem(8)}>
                  {editingTiers.map((t) => (
                    <UnstyledButton
                      key={t.id}
                      onClick={() => setSelectedTierId(t.id)}
                      data-dark-bg={selectedTierId === t.id ? 'true' : undefined}
                      style={{
                        padding: `${rem(12)} ${rem(14)}`,
                        border: `1px solid ${selectedTierId === t.id ? active.primary : `${active.primary}20`}`,
                        backgroundColor: selectedTierId === t.id ? active.primary : active.surface,
                        color: selectedTierId === t.id ? '#ffffff' : active.primary,
                        textAlign: 'center',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <Text
                        size="xs"
                        fw={700}
                        c={selectedTierId === t.id ? '#ffffff' : active.primary}
                        style={{ fontFamily: 'var(--font-heading-sans), var(--font-sans)', color: selectedTierId === t.id ? '#ffffff !important' : active.primary }}
                      >
                        {t.name}
                      </Text>
                      <Text size="xs" c={selectedTierId === t.id ? active.accent : 'dimmed'} data-accent={selectedTierId === t.id ? 'true' : undefined} mt={2}>
                        ${t.ratePerWord.toFixed(4)}/wd
                      </Text>
                    </UnstyledButton>
                  ))}
                </SimpleGrid>
              </Box>

              {/* Word Count Slider & Input */}
              <Box>
                <Group justify="space-between" mb="xs">
                  <Text size="xs" fw={700} c="dimmed" style={{ letterSpacing: '0.08em' }}>
                    ENTER MANUSCRIPT WORD COUNT:
                  </Text>
                  <Text
                    size="sm"
                    fw={700}
                    c={active.accent}
                    style={{ fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}
                  >
                    {wordCount.toLocaleString()} words
                  </Text>
                </Group>

                <Slider
                  value={wordCount}
                  onChange={setWordCount}
                  min={1000}
                  max={80000}
                  step={500}
                  color={active.accent}
                  radius={0}
                  size="md"
                  thumbSize={18}
                  styles={{
                    track: { backgroundColor: `${active.primary}14` },
                  }}
                />

                <Group gap="xs" mt="sm">
                  {[3000, 7000, 15000, 30000, 60000].map((preset) => (
                    <Button
                      key={preset}
                      size="xs"
                      variant="subtle"
                      radius={0}
                      color={active.primary}
                      onClick={() => setWordCount(preset)}
                      style={{ border: `1px solid ${active.primary}18`, padding: `${rem(2)} ${rem(8)}` }}
                    >
                      {preset >= 1000 ? `${preset / 1000}k words` : `${preset} words`}
                    </Button>
                  ))}
                </Group>
              </Box>
            </Stack>

            {/* Calculated Quote Box */}
            <Box
              p={{ base: rem(32), md: rem(48) }}
              bg={active.surface}
              style={{
                border: `1px solid ${active.primary}18`,
                boxShadow: `0 16px 48px rgba(0,0,0,0.06)`,
              }}
            >
              <Stack gap="lg">
                <Box>
                  <Group justify="space-between" align="center">
                    <Badge radius={0} variant="filled" style={{ backgroundColor: active.accent, color: '#fff' }}>
                      {selectedTier.badge}
                    </Badge>
                    <Text size="xs" c="dimmed">
                      {wordCount.toLocaleString()} Words
                    </Text>
                  </Group>
                  <Title
                    order={3}
                    mt="xs"
                    style={{
                      fontSize: rem(26),
                      fontFamily: 'var(--font-display), var(--font-serif)',
                      fontWeight: 600,
                    }}
                  >
                    {selectedTier.name}
                  </Title>
                  <Text size="xs" c="dimmed" mt={4}>
                    {selectedTier.targetAudience}
                  </Text>
                </Box>

                <Divider color={`${active.primary}12`} />

                <Box>
                  <Text size="xs" fw={700} c="dimmed" style={{ letterSpacing: '0.08em' }}>
                    ESTIMATED TOTAL INVESTMENT
                  </Text>
                  <Text
                    fw={700}
                    style={{
                      fontSize: 'clamp(2.5rem, 4.5vw, 3.4rem)',
                      fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                      color: active.primary,
                      lineHeight: 1.1,
                      marginTop: rem(4),
                    }}
                  >
                    ${Number(estimatedPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </Text>
                  <Text size="xs" c="dimmed" mt={4}>
                    Calculated at ${selectedTier.ratePerWord.toFixed(4)} per word. Official itemized invoice provided.
                  </Text>
                </Box>

                <SimpleGrid cols={2} spacing="md">
                  <Box p={rem(14)} bg={active.background} style={{ border: `1px solid ${active.primary}12` }}>
                    <Text size="xs" fw={700} c={active.accent}>STANDARD DELIVERY</Text>
                    <Text size="sm" fw={700} c={active.primary} mt={2}>{selectedTier.standardDays}</Text>
                  </Box>
                  <Box p={rem(14)} bg={active.background} style={{ border: `1px solid ${active.primary}12` }}>
                    <Text size="xs" fw={700} c={active.accent}>PRIORITY DELIVERY</Text>
                    <Text size="sm" fw={700} c={active.primary} mt={2}>{selectedTier.priorityDays}</Text>
                  </Box>
                </SimpleGrid>

                <Link
                  href={`/order?service=editing&tier=${selectedTier.id}&wordCount=${wordCount}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    fullWidth
                    size="lg"
                    radius={0}
                    style={{
                      backgroundColor: active.primary,
                      color: active.background,
                      fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                      letterSpacing: '0.06em',
                      fontWeight: 600,
                      height: rem(52),
                    }}
                    rightSection={<IconArrowRight size={16} />}
                  >
                    Proceed with {selectedTier.name}
                  </Button>
                </Link>

                <Text size="xs" c="dimmed" style={{ textAlign: 'center' }}>
                  Upload .docx draft &bull; Firm 24h assessment &bull; Zero sales calls required
                </Text>
              </Stack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* ── WHAT SCHOLARCRAFTED DELIVERS THAT AI CANNOT ────────────────── */}
      <Box component="section" py={SECTION_SPACING} bg={active.surface}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap={rem(48)}>
            <Box style={{ maxWidth: 840, margin: '0 auto', textAlign: 'center' }}>
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
                Human Academic Intelligence
              </Text>
              <Title
                order={2}
                mt="xs"
                style={{
                  fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                  color: active.primary,
                  fontFamily: 'var(--font-display), var(--font-serif)',
                  fontWeight: 600,
                }}
              >
                What ScholarCrafted delivers that AI tools cannot.
              </Title>
              <Text size="md" c="dimmed" mt="sm" lh={1.75}>
                Large language models catch surface typos, but fail on methodological nuance, discipline epistemology, and citation veracity. Here is why human academic review remains essential before peer review.
              </Text>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
              {/* Box 1: Why AI is Risky */}
              <Box
                p={{ base: rem(28), md: rem(36) }}
                bg={active.background}
                style={{ border: `1px solid ${active.primary}18` }}
              >
                <Group gap="xs" align="center" mb="md">
                  <IconAlertTriangle size={20} color="#e03131" />
                  <Text size="sm" fw={700} c="#e03131" style={{ letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Risks of Relying Exclusively on AI
                  </Text>
                </Group>
                <Stack gap="md">
                  {[
                    {
                      title: 'Hallucinated & Broken Citations',
                      desc: 'AI synthesizes plausible-sounding journal titles and DOI links that do not exist, triggering immediate desk rejection.',
                    },
                    {
                      title: 'Formulaic, Repetitive Phrasing',
                      desc: 'LLMs rely on stereotypical syntactic habits that journal reviewers and automated screening systems easily identify.',
                    },
                    {
                      title: 'Disregard for Theoretical Context',
                      desc: 'Generic models do not understand the subtle epistemological debates between competing theoretical schools in your discipline.',
                    },
                    {
                      title: 'Zero Accountability to Your Committee',
                      desc: 'An AI cannot explain why a change was made or defend section pacing during an oral dissertation defense.',
                    },
                  ].map((item, idx) => (
                    <Box key={idx} pl="md" style={{ borderLeft: `2px solid #e0313133` }}>
                      <Text size="sm" fw={700} c={active.primary}>{item.title}</Text>
                      <Text size="xs" c="dimmed" mt={2} lh={1.5}>{item.desc}</Text>
                    </Box>
                  ))}
                </Stack>
              </Box>

              {/* Box 2: What ScholarCrafted Human Review Adds */}
              <Box
                p={{ base: rem(28), md: rem(36) }}
                bg={active.background}
                style={{ border: `1px solid ${active.accent}` }}
              >
                <Group gap="xs" align="center" mb="md">
                  <IconSparkles size={20} color={active.accent} />
                  <Text size="sm" fw={700} c={active.accent} style={{ letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    What Senior Human Specialists Provide
                  </Text>
                </Group>
                <Stack gap="md">
                  {[
                    {
                      title: '100% Verified Citation Integrity',
                      desc: 'Our editors manually cross-check inline citations against reference entries and CrossRef DOIs.',
                    },
                    {
                      title: 'Authentic Scholarly Voice & Cadence',
                      desc: 'We preserve your unique intellectual voice while eliminating clumsy phrasing and academic jargon bloat.',
                    },
                    {
                      title: 'Domain Epistemology & Methodological Rigor',
                      desc: 'Edited by scholars with doctorates in your field who know what top peer reviewers expect to see.',
                    },
                    {
                      title: '365-Day Defense & Re-editing Guarantee',
                      desc: 'If your committee or target journal requests modifications to edited text, we support you through publication.',
                    },
                  ].map((item, idx) => (
                    <Box key={idx} pl="md" style={{ borderLeft: `2px solid ${active.accent}` }}>
                      <Text size="sm" fw={700} c={active.primary}>{item.title}</Text>
                      <Text size="xs" c="dimmed" mt={2} lh={1.5}>{item.desc}</Text>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* ── FULL FEATURE COMPARISON TABLE ──────────────────────────────── */}
      <Box component="section" py={SECTION_SPACING} bg={active.background}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap={rem(40)}>
            <Box style={{ maxWidth: 800 }}>
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
                Detailed Breakdown
              </Text>
              <Title
                order={2}
                mt="xs"
                style={{
                  fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                  color: active.primary,
                  fontFamily: 'var(--font-display), var(--font-serif)',
                  fontWeight: 600,
                }}
              >
                Side-by-side feature comparison.
              </Title>
              <Text size="md" c="dimmed" mt="sm" lh={1.7}>
                Compare the exact deliverables, revision passes, and diagnostic reports across each editing plan.
              </Text>
            </Box>

            <Box style={{ overflowX: 'auto', border: `1px solid ${active.primary}18` }}>
              <Table verticalSpacing="md" horizontalSpacing="lg" highlightOnHover>
                <Table.Thead bg={active.surface}>
                  <Table.Tr>
                    <Table.Th style={{ width: '40%', fontSize: rem(13), fontFamily: 'var(--font-heading-sans)' }}>
                      FEATURE & DELIVERABLE
                    </Table.Th>
                    <Table.Th style={{ width: '20%', textAlign: 'center', fontSize: rem(13), fontFamily: 'var(--font-heading-sans)' }}>
                      ADVANCED ($0.0425/wd)
                    </Table.Th>
                    <Table.Th style={{ width: '20%', textAlign: 'center', fontSize: rem(13), fontFamily: 'var(--font-heading-sans)', color: active.accent }}>
                      PREMIUM ($0.065/wd) ★
                    </Table.Th>
                    <Table.Th style={{ width: '20%', textAlign: 'center', fontSize: rem(13), fontFamily: 'var(--font-heading-sans)' }}>
                      SCIENTIFIC PRO ($0.095/wd)
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {comparisonMatrix.map((row, rIdx) => (
                    <Table.Tr key={rIdx}>
                      <Table.Td style={{ fontWeight: 500, fontSize: rem(14), color: active.primary }}>
                        {row.feature}
                      </Table.Td>
                      <Table.Td style={{ textAlign: 'center' }}>
                        {typeof row.advanced === 'boolean' ? (
                          row.advanced ? <IconCheck size={18} color={active.accent} /> : <IconX size={16} color="#bbb" />
                        ) : (
                          <Text size="xs" fw={600} c={active.primary}>{row.advanced}</Text>
                        )}
                      </Table.Td>
                      <Table.Td style={{ textAlign: 'center', backgroundColor: `${active.accent}08` }}>
                        {typeof row.premium === 'boolean' ? (
                          row.premium ? <IconCheck size={18} color={active.accent} /> : <IconX size={16} color="#bbb" />
                        ) : (
                          <Text size="xs" fw={700} c={active.accent}>{row.premium}</Text>
                        )}
                      </Table.Td>
                      <Table.Td style={{ textAlign: 'center' }}>
                        {typeof row.scientific === 'boolean' ? (
                          row.scientific ? <IconCheck size={18} color={active.accent} /> : <IconX size={16} color="#bbb" />
                        ) : (
                          <Text size="xs" fw={600} c={active.primary}>{row.scientific}</Text>
                        )}
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* ── ASYNCHRONOUS 3-STEP WORKFLOW ─────────────────────────────────── */}
      <Box component="section" py={SECTION_SPACING} bg={active.surface}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap={rem(48)}>
            <Box style={{ maxWidth: 740, margin: '0 auto', textAlign: 'center' }}>
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
                Asynchronous Workflow
              </Text>
              <Title
                order={2}
                mt="xs"
                style={{
                  fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                  color: active.primary,
                  fontFamily: 'var(--font-display), var(--font-serif)',
                  fontWeight: 600,
                }}
              >
                How our editorial execution works.
              </Title>
              <Text size="md" c="dimmed" mt="sm" lh={1.7}>
                No mandatory discovery calls or scheduling friction. We work directly with your manuscript and target style guidelines.
              </Text>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
              {[
                {
                  step: '01',
                  title: 'Upload Manuscript & Guidelines',
                  desc: 'Submit your document (.docx) and specify your target journal or style manual (APA, Chicago, MLA). We confirm word count and delivery schedule in 24 hours.',
                },
                {
                  step: '02',
                  title: 'Discipline-Specific Human Editing',
                  desc: 'A doctoral editor from your subject area completes substantive revisions in Word Track Changes, leaving marginal queries for ambiguities.',
                },
                {
                  step: '03',
                  title: 'Tracked Delivery & 365-Day Guarantee',
                  desc: 'Receive your clean and tracked copies plus Editorial Certificate. If your committee or journal requests modifications, enjoy free re-editing.',
                },
              ].map((st, i) => (
                <Box
                  key={i}
                  p={{ base: rem(28), md: rem(36) }}
                  bg={active.background}
                  style={{ border: `1px solid ${active.primary}18` }}
                >
                  <Text
                    size="xs"
                    fw={700}
                    c={active.accent}
                    style={{ letterSpacing: '0.15em', fontFamily: 'var(--font-heading-sans)' }}
                  >
                    STEP {st.step}
                  </Text>
                  <Title
                    order={3}
                    mt="xs"
                    style={{
                      fontSize: rem(20),
                      fontFamily: 'var(--font-display), var(--font-serif)',
                      fontWeight: 600,
                      color: active.primary,
                    }}
                  >
                    {st.title}
                  </Title>
                  <Text size="sm" c="dimmed" mt="sm" lh={1.65}>
                    {st.desc}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* ── FAQ SECTION ─────────────────────────────────────────────────── */}
      <Box component="section" py={SECTION_SPACING} bg={active.background}>
        <Container size={900} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap="xl">
            <Box style={{ textAlign: 'center' }}>
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
                Editorial Logistics & Standards
              </Text>
              <Title
                order={2}
                mt="xs"
                style={{
                  fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                  color: active.primary,
                  fontFamily: 'var(--font-display), var(--font-serif)',
                  fontWeight: 600,
                }}
              >
                Frequently Asked Questions
              </Title>
            </Box>

            <Accordion variant="separated" radius={0}>
              {faqs.map((faq, i) => (
                <Accordion.Item
                  key={i}
                  value={`faq-${i}`}
                  style={{ backgroundColor: active.surface, border: `1px solid ${active.primary}12` }}
                >
                  <Accordion.Control
                    style={{
                      fontWeight: 600,
                      color: active.primary,
                      fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                    }}
                  >
                    {faq.q}
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm" lh={1.75} c="dimmed">
                      {faq.a}
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>

            {/* Bottom CTA Box */}
            <Box
              p={{ base: rem(28), md: rem(40) }}
              bg={active.surface}
              style={{
                border: `1px solid ${active.accent}`,
                textAlign: 'center',
                marginTop: rem(24),
              }}
            >
              <Title
                order={3}
                style={{
                  fontSize: rem(24),
                  fontFamily: 'var(--font-display), var(--font-serif)',
                  fontWeight: 600,
                  color: active.primary,
                }}
              >
                Ready to submit your manuscript for review?
              </Title>
              <Text size="sm" c="dimmed" mt="xs" style={{ maxWidth: '60ch', margin: '8px auto 24px' }}>
                Upload your document to receive a formal assessment and firm fee quote within 24 hours.
              </Text>
              <Link href="/order?service=editing" style={{ textDecoration: 'none' }}>
                <Button
                  size="md"
                  radius={0}
                  style={{
                    backgroundColor: active.accent,
                    color: '#fff',
                    fontFamily: 'var(--font-heading-sans)',
                    letterSpacing: '0.04em',
                    fontWeight: 600,
                  }}
                  rightSection={<IconArrowRight size={16} />}
                >
                  Submit Your Draft Online
                </Button>
              </Link>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
