'use client'

import React, { useState, Suspense, useRef } from 'react'
import {
  Container,
  Title,
  Text,
  Box,
  Stack,
  Button,
  TextInput,
  Textarea,
  rem,
  Group,
  useMantineTheme,
  SimpleGrid,
  NumberInput,
  UnstyledButton,
  Select,
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useSearchParams } from 'next/navigation'
import {
  IconCheck,
  IconPencil,
  IconBook2,
  IconFileText,
  IconArrowRight,
  IconUpload,
  IconChevronLeft,
  IconChevronDown,
  IconReceipt,
  IconMailForward,
} from '@tabler/icons-react'
import Link from 'next/link'

// ─── Constants & Metadata ─────────────────────────────────────────────────────

const SALUTATIONS = ['Dr.', 'Prof.', 'Mr.', 'Ms.', 'Mx.', '—']

const DOCUMENT_TYPES = [
  'Journal Article',
  'Book Manuscript (Full)',
  'Book Chapter',
  'Thesis / Dissertation',
  'Research / Grant Proposal',
  'Conference Paper',
  'Review Article / Meta-Analysis',
  'Other Document',
]

const REFERRAL_SOURCES = [
  'Colleague / Peer Recommendation',
  'Google Search',
  'Academic Conference / Seminar',
  'Social Media (LinkedIn / Twitter)',
  'Journal Editorial Guidelines',
  'University Department Portal',
  'Other',
]

const EDITING_TIER_META: Record<string, { label: string; rate: number; priceStr: string; turnaround: string; desc: string }> = {
  advanced: {
    label: 'Advanced Editing',
    rate: 0.0425,
    priceStr: '$0.0425 / word',
    turnaround: '3–5 business days',
    desc: 'Line-by-line grammar, academic tone, syntax, phrasing, and style manual compliance.',
  },
  premium: {
    label: 'Premium Editing',
    rate: 0.065,
    priceStr: '$0.065 / word',
    turnaround: '5–7 business days',
    desc: 'Substantive structure, argument flow, cover letter creation, and 365-day re-editing.',
  },
  scientific: {
    label: 'Scientific Editing Pro',
    rate: 0.095,
    priceStr: '$0.095 / word',
    turnaround: '7–10 business days',
    desc: 'Dual-pass developmental critique by PhD peer-review discipline specialists.',
  },
}

const JOURNAL_TIER_META: Record<string, { label: string; flatPrice: number; priceStr: string; turnaround: string; desc: string }> = {
  essentials: {
    label: 'Journal Support — Essentials',
    flatPrice: 320,
    priceStr: '$320 flat fee',
    turnaround: '3–5 business days',
    desc: 'Target journal compliance, reference style formatting, artwork check, and manuscript checklist.',
  },
  pro: {
    label: 'Journal Support — Pro Pack',
    flatPrice: 560,
    priceStr: '$560 flat fee',
    turnaround: '5–7 business days',
    desc: 'Essentials + customized Editor cover letter, graphical abstract review, and portal submission guidance.',
  },
  full: {
    label: 'Journal Support — Full Pack',
    flatPrice: 900,
    priceStr: 'From $900',
    turnaround: 'Ongoing until acceptance',
    desc: 'Complete submission management, response letter drafting, proofing, and unlimited reformatting.',
  },
}

const BOOK_STAGES = [
  { id: '01', label: 'Stage 01 — Publisher Selection', price: '$280 flat fee' },
  { id: '02', label: 'Stage 02 — Book Proposal Creation', price: '$480 flat fee' },
  { id: '03', label: 'Stage 03 — Manuscript Editing', price: 'From $0.0425 / word' },
  { id: '04', label: 'Stage 04 — Galley Proof Review', price: 'Project-based rate' },
  { id: '05', label: 'Stage 05 — Back-of-Book Indexing', price: '$3 / typeset page' },
]

const BOOK_STAGE_META: Record<string, { label: string; priceStr: string; turnaround: string; desc: string }> = {
  '01': {
    label: 'Stage 01 — Publisher Selection',
    priceStr: '$280 flat fee',
    turnaround: '5–7 business days',
    desc: '3–5 ranked academic publishers matched to your monograph topic, series, and target readership.',
  },
  '02': {
    label: 'Stage 02 — Book Proposal Creation',
    priceStr: '$480 flat fee',
    turnaround: '7–10 business days',
    desc: 'Acquisition-ready prospectus tailored to press guidelines with chapter outlines and sample polish.',
  },
  '03': {
    label: 'Stage 03 — Manuscript Editing',
    priceStr: 'Per-word rate (from $0.0425/w)',
    turnaround: 'Scope-dependent',
    desc: 'Comprehensive monograph editing with cross-chapter structural consistency and style manual conformity.',
  },
  '04': {
    label: 'Stage 04 — Galley Proof Review',
    priceStr: 'Project-based rate',
    turnaround: '5–10 business days',
    desc: 'Detection of typesetting errors, font dropouts, table breaks, and copyeditor query resolution.',
  },
  '05': {
    label: 'Stage 05 — Back-of-Book Indexing',
    priceStr: '$3 / typeset page',
    turnaround: '10–14 business days',
    desc: 'Subject and author index delivered in press-ready format according to publisher specifications.',
  },
}

const AI_AUDIT_TIER_META: Record<string, { label: string; flatPrice: number; priceStr: string; turnaround: string; desc: string }> = {
  single: {
    label: 'AI Manuscript Audit — Single Review',
    flatPrice: 29,
    priceStr: '$29 flat fee',
    turnaround: '24–48 hours',
    desc: 'Complete section-by-section diagnostic breakdown against 200M+ research papers, hallucinated citation detection, and 1-Page Faculty Risk Memo with optional debrief call. 100% credited toward full editing.',
  },
  bundle: {
    label: 'AI Manuscript Audit — Revision Bundle (3 Reviews)',
    flatPrice: 69,
    priceStr: '$69 flat fee',
    turnaround: '24–48 hours per review',
    desc: '3 full manuscript audits across your project lifecycle (initial draft, advisor revision, and pre-submission check). Includes follow-up consultations with Micah Dobson. 100% credited toward editing.',
  },
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function RequestReviewPage() {
  return (
    <Suspense fallback={<Box style={{ minHeight: '100vh' }} />}>
      <RequestReviewContent />
    </Suspense>
  )
}

function RequestReviewContent() {
  const theme = useMantineTheme()
  const active = theme.other
  const searchParams = useSearchParams()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Query parameters
  const paramService  = searchParams.get('service') ?? 'editing'
  const paramSection  = searchParams.get('section') ?? ''
  const paramTier     = searchParams.get('tier') ?? (paramService === 'editing' ? 'premium' : paramService === 'ai-audit' ? 'single' : '')
  const paramStage    = searchParams.get('stage') ?? ''
  const paramPipeline = searchParams.get('pipeline') === 'full'
  const paramWords    = parseInt(searchParams.get('wordCount') ?? '0', 10)

  // Book stages selection
  const initialCheckedStages = paramPipeline
    ? BOOK_STAGES.map((s) => s.id)
    : paramStage ? [paramStage] : ['01']
  const [checkedStages, setCheckedStages] = useState<string[]>(initialCheckedStages)

  function toggleBookStage(id: string) {
    setCheckedStages((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  // Back link URL to order comparison page
  const backToOrderUrl = (() => {
    if (paramService === 'ai-audit') {
      return `/scholarcrafted/order?service=ai-audit`
    }
    if (paramService === 'publication' && paramSection === 'book') {
      return `/scholarcrafted/order?service=publication&section=book${paramStage ? `&stage=${paramStage}` : ''}`
    }
    if (paramService === 'publication' || paramSection === 'journal') {
      return `/scholarcrafted/order?service=publication&section=journal${paramTier ? `&tier=${paramTier}` : ''}`
    }
    return `/scholarcrafted/order?service=editing${paramTier ? `&tier=${paramTier}` : ''}`
  })()

  // Derive Plan Title for header
  const planTitle = (() => {
    if (paramService === 'ai-audit') {
      return AI_AUDIT_TIER_META[paramTier]?.label ?? 'AI Manuscript Audit'
    }
    if (paramService === 'editing') {
      return EDITING_TIER_META[paramTier]?.label ?? 'English Editing'
    }
    if (paramService === 'publication') {
      if (paramSection === 'journal' || paramTier) {
        return JOURNAL_TIER_META[paramTier]?.label ?? 'Journal Publication Support'
      }
      if (paramPipeline || checkedStages.length > 1) return 'Full Book Publication Pipeline'
      if (checkedStages.length === 1) return BOOK_STAGE_META[checkedStages[0]]?.label ?? `Book Publishing — Stage ${checkedStages[0]}`
      if (paramStage) return BOOK_STAGE_META[paramStage]?.label ?? `Book Publishing — Stage ${paramStage}`
      return 'Book Manuscript Publishing'
    }
    return 'ScholarCrafted Faculty Intake'
  })()

  // Form State
  const [wordCount, setWordCount]             = useState<number>(paramWords || 0)
  const [fileName, setFileName]               = useState('')
  const [editingScope, setEditingScope]       = useState<'entire' | 'exclude' | 'only'>('entire')
  const [scopeDetails, setScopeDetails]       = useState('')

  // Personal Information
  const [salutation, setSalutation]           = useState('Dr.')
  const [firstName, setFirstName]             = useState('')
  const [lastName, setLastName]               = useState('')
  const [email, setEmail]                     = useState('')
  const [phone, setPhone]                     = useState('')
  const [referralSource, setReferralSource]   = useState('Colleague / Peer Recommendation')

  // Document Preferences
  const [docType, setDocType]                 = useState<string>('Journal Article')
  const [journalName, setJournalName]         = useState('')
  const [languageStyle, setLanguageStyle]     = useState<'american' | 'british'>('american')
  const [subjectName, setSubjectName]         = useState('')
  const [deadline, setDeadline]               = useState<Date | null>(null)
  const [instructions, setInstructions]       = useState('')
  const [intent, setIntent]                   = useState<'quote' | 'start'>('quote')

  // Collapsible Accordion Step Management: 1 = Manuscript & Personal Info, 2 = Preferences & Scope
  const [activeStep, setActiveStep] = useState<1 | 2 | null>(1)
  const [step1Done, setStep1Done]   = useState(false)
  const [submitted, setSubmitted]   = useState(false)

  // File change handler
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      if (wordCount === 0) {
        setWordCount(4500)
      }
    }
  }

  // Cost calculation for sidebar
  const calculatedEstimate = (() => {
    if (paramService === 'ai-audit') {
      const meta = AI_AUDIT_TIER_META[paramTier] ?? AI_AUDIT_TIER_META.single
      return meta.flatPrice
    }
    if (paramService === 'editing') {
      const meta = EDITING_TIER_META[paramTier] ?? EDITING_TIER_META.premium
      if (wordCount > 0) return Math.round(wordCount * meta.rate)
      return null
    }
    if (paramService === 'publication' && paramSection === 'journal') {
      return JOURNAL_TIER_META[paramTier]?.flatPrice ?? 560
    }
    return null
  })()

  const isFormValid =
    firstName.trim() !== '' &&
    lastName.trim() !== '' &&
    email.trim() !== '' &&
    (wordCount > 0 || fileName !== '' || paramService === 'ai-audit' || paramSection === 'journal' || (paramService === 'publication' && paramSection === 'book'))

  function handleSubmit() {
    if (!isFormValid) return
    setSubmitted(true)
  }

  // ─── Success Confirmation Screen ──────────────────────────────────────────

  if (submitted) {
    return (
      <Box bg={active.background} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box py={rem(20)} style={{ borderBottom: `1px solid ${active.primary}10`, backgroundColor: active.background }}>
          <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
            <Link href="/scholarcrafted" style={{ textDecoration: 'none' }}>
              <Text fw={700} size="lg" c={active.primary} style={{ fontFamily: 'var(--font-serif)' }}>
                ScholarCrafted
              </Text>
            </Link>
          </Container>
        </Box>

        <Box style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }} py={rem(80)}>
          <Container size="sm">
            <Box p={{ base: rem(36), md: rem(54) }} bg={active.surface} style={{ border: `1px solid ${active.primary}12`, textAlign: 'center' }}>
              <Stack align="center" gap="lg">
                <Box
                  style={{
                    width: rem(64),
                    height: rem(64),
                    backgroundColor: `${active.accent}14`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconCheck size={32} color={active.accent} />
                </Box>
                <Title order={2} style={{ fontFamily: 'var(--font-serif)', fontSize: rem(28), color: active.primary }}>
                  {intent === 'start' ? 'Brief Received — Invoice Incoming' : 'Brief Received'}
                </Title>
                <Text size="md" c="dimmed" lh={1.7} style={{ maxWidth: '44ch' }}>
                  {intent === 'start' ? (
                    <>
                      Micah Dobson will review your manuscript and send a <strong style={{ color: active.primary }}>50% deposit invoice</strong> to <strong style={{ color: active.primary }}>{email}</strong> within 24 hours. Work commences upon receipt.
                    </>
                  ) : (
                    <>
                      Micah Dobson will review your project personally and send a scoped quote to <strong style={{ color: active.primary }}>{email}</strong> within 24 hours.
                    </>
                  )}
                </Text>
                <Text size="xs" c="dimmed" style={{ fontStyle: 'italic' }}>
                  Strict NDA · No AI models applied to your manuscript · Real scholar review
                </Text>
                <Link href="/scholarcrafted" style={{ textDecoration: 'none' }}>
                  <Button variant="outline" radius={0} mt="sm" style={{ borderColor: `${active.primary}30`, color: active.primary }}>
                    Return to ScholarCrafted Home
                  </Button>
                </Link>
              </Stack>
            </Box>
          </Container>
        </Box>
      </Box>
    )
  }

  // ─── Intake Form Layout ───────────────────────────────────────────────────

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary, display: 'flex', flexDirection: 'column' }}>

      {/* ── Top Bar with Caret + Plan Name ─────────────────────────────────── */}
      <Box
        py={rem(18)}
        style={{
          borderBottom: `1px solid ${active.primary}12`,
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: `${active.background}f5`,
          backdropFilter: 'blur(12px)',
        }}
      >
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Group justify="space-between" align="center">
            {/* Left: Caret "<" + Plan Name */}
            <Group gap={rem(14)} align="center">
              <Link
                href={backToOrderUrl}
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: active.primary,
                  padding: rem(4),
                }}
                title="Back to plan comparison"
              >
                <IconChevronLeft size={24} stroke={2.5} />
              </Link>
              <Title
                order={1}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)',
                  fontWeight: 600,
                  color: active.primary,
                  lineHeight: 1.2,
                }}
              >
                {planTitle}
              </Title>
            </Group>

            {/* Right: Brand link */}
            <Link href="/scholarcrafted" style={{ textDecoration: 'none' }}>
              <Text fw={700} size="sm" c={active.primary} style={{ fontFamily: 'var(--font-serif)', letterSpacing: '0.04em' }}>
                ScholarCrafted
              </Text>
            </Link>
          </Group>
        </Container>
      </Box>

      {/* ── Main Form + Sticky Order Summary Grid ───────────────────────────── */}
      <Box py={{ base: rem(32), md: rem(48) }} bg={active.surface} style={{ flex: 1 }}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Box
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr)',
              gap: rem(36),
            }}
          >
            <style>{`
              @media (min-width: 900px) {
                .sc-intake-grid {
                  grid-template-columns: minmax(0, 1fr) 360px !important;
                }
              }
            `}</style>

            <Box
              className="sc-intake-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr)',
                gap: rem(40),
                alignItems: 'start',
              }}
            >
              {/* ── Left Column: Streamlined Steps ─────────────────────────── */}
              <Stack gap={rem(20)}>

                {/* ── STEP 1: Manuscript, Word Count & Author Information ──── */}
                <StepSection
                  stepNum={1}
                  title="Manuscript & Personal Details"
                  subtitle="Word count, file upload, and author contact information"
                  isOpen={activeStep === 1}
                  isDone={step1Done || (firstName !== '' && email !== '' && activeStep !== 1)}
                  doneSummary={`${wordCount > 0 ? `${wordCount.toLocaleString()} words` : ''}${fileName ? ` · ${fileName}` : ''}${firstName ? ` · ${salutation} ${firstName} ${lastName}` : ''}`}
                  onToggle={() => setActiveStep((prev) => (prev === 1 ? null : 1))}
                  active={active}
                >
                  <Stack gap={rem(24)} pt={rem(20)}>

                    {/* Word count & Manuscript Section */}
                    <Box>
                      <Text size="xs" fw={700} mb={rem(6)} style={{ letterSpacing: '0.08em', color: active.primary }}>
                        ENTER THE NUMBER OF WORDS IN YOUR MANUSCRIPT *
                      </Text>
                      <Text size="xs" c="dimmed" mb={rem(10)}>
                        A word count helps us provide accurate pricing and delivery options (e.g. 8 500 words).
                      </Text>
                      <NumberInput
                        placeholder="e.g. 8 500"
                        radius={0}
                        size="md"
                        min={0}
                        value={wordCount || ''}
                        onChange={(val) => setWordCount(typeof val === 'number' ? val : 0)}
                        style={{ maxWidth: rem(280) }}
                      />
                      {calculatedEstimate !== null && wordCount > 0 && (
                        <Text size="xs" fw={700} mt={rem(8)} style={{ color: active.accent }}>
                          Estimated fee: ${calculatedEstimate.toLocaleString()} (calculated at {EDITING_TIER_META[paramTier]?.priceStr ?? '$0.065/w'})
                        </Text>
                      )}
                    </Box>

                    {/* Document upload box */}
                    <Box>
                      <Text size="xs" fw={700} mb={rem(6)} style={{ letterSpacing: '0.08em', color: active.primary }}>
                        UPLOAD DOCUMENT (OPTIONAL AT BRIEF STAGE)
                      </Text>
                      <Text size="xs" c="dimmed" mb={rem(10)}>
                        Reference files won't be worked upon or be included in pricing.
                      </Text>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".doc,.docx,.pdf,.txt,.rtf"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />
                      <UnstyledButton
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                          border: `2px dashed ${fileName ? active.accent : `${active.primary}25`}`,
                          backgroundColor: fileName ? `${active.accent}08` : '#ffffff',
                          padding: rem(28),
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: rem(8),
                          width: '100%',
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {fileName ? (
                          <>
                            <IconCheck size={26} color={active.accent} />
                            <Text size="sm" fw={700} c={active.primary}>{fileName}</Text>
                            <Text size="xs" c="dimmed">Click to replace file</Text>
                          </>
                        ) : (
                          <>
                            <IconUpload size={26} color="#888" />
                            <Text size="sm" fw={700} c={active.primary}>Click to upload your manuscript</Text>
                            <Text size="xs" c="dimmed">.docx, .pdf, .rtf — or reply to Micah's quote email to attach later</Text>
                          </>
                        )}
                      </UnstyledButton>
                    </Box>

                    {/* Book Stage Checkboxes (When Book Publishing service is active) */}
                    {(paramSection === 'book' || (paramService === 'publication' && !paramTier)) && (
                      <Box p={rem(18)} style={{ backgroundColor: `${active.accent}08`, border: `1px solid ${active.accent}30` }}>
                        <Text size="xs" fw={700} mb={rem(4)} style={{ letterSpacing: '0.12em', color: active.accent, textTransform: 'uppercase' }}>
                          WHICH STAGE(S) DO YOU NEED?
                        </Text>
                        <Text size="xs" c="dimmed" mb={rem(14)}>
                          Select all stages that apply to your monograph. Tick all five for the complete publication pipeline bundle.
                        </Text>
                        <Stack gap={rem(8)}>
                          {BOOK_STAGES.map((stg) => {
                            const isChecked = checkedStages.includes(stg.id)
                            return (
                              <UnstyledButton
                                key={stg.id}
                                onClick={() => toggleBookStage(stg.id)}
                                p={rem(12)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: rem(12),
                                  backgroundColor: isChecked ? '#ffffff' : 'transparent',
                                  border: `1px solid ${isChecked ? active.accent : `${active.primary}15`}`,
                                  cursor: 'pointer',
                                  transition: 'all 0.15s ease',
                                }}
                              >
                                <Box
                                  style={{
                                    width: rem(20),
                                    height: rem(20),
                                    border: `2px solid ${isChecked ? active.accent : `${active.primary}40`}`,
                                    backgroundColor: isChecked ? active.accent : '#ffffff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                  }}
                                >
                                  {isChecked && <IconCheck size={13} color="#ffffff" stroke={3} />}
                                </Box>
                                <Box style={{ flex: 1 }}>
                                  <Text size="sm" fw={600} c={active.primary}>{stg.label}</Text>
                                  <Text size="xs" c="dimmed">{stg.price}</Text>
                                </Box>
                              </UnstyledButton>
                            )
                          })}
                        </Stack>
                      </Box>
                    )}

                    {/* Personal Information Subsection */}
                    <Box pt={rem(8)} style={{ borderTop: `1px solid ${active.primary}12` }}>
                      <Stack gap={rem(16)}>
                        {/* Salutation + Name */}
                        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={rem(12)}>
                          <Select
                            label="Salutation"
                            placeholder="—"
                            radius={0}
                            data={SALUTATIONS}
                            value={salutation}
                            onChange={(v) => setSalutation(v ?? 'Dr.')}
                          />
                          <TextInput
                            label="First name *"
                            placeholder="Jane"
                            required
                            radius={0}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                          <TextInput
                            label="Last name *"
                            placeholder="Doe"
                            required
                            radius={0}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </SimpleGrid>

                        {/* Email & Phone */}
                        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={rem(16)}>
                          <TextInput
                            label="Primary email *"
                            placeholder="jane.doe@university.edu"
                            required
                            type="email"
                            radius={0}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            description="We recommend your academic email. Formal quote sent here."
                          />
                          <TextInput
                            label="Mobile / Phone number *"
                            placeholder="(+1) 555-0192"
                            radius={0}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            description="Used strictly for urgent manuscript inquiries"
                          />
                        </SimpleGrid>

                        {/* Referral source */}
                        <Select
                          label="How did you hear about us? *"
                          placeholder="Select option"
                          radius={0}
                          data={REFERRAL_SOURCES}
                          value={referralSource}
                          onChange={(v) => setReferralSource(v ?? REFERRAL_SOURCES[0])}
                        />
                      </Stack>
                    </Box>

                    {/* Single Next button bottom-right */}
                    <Group justify="flex-end" pt="sm">
                      <Button
                        size="md"
                        radius={0}
                        onClick={() => {
                          setStep1Done(true)
                          setActiveStep(2)
                        }}
                        style={{
                          backgroundColor: active.accent,
                          color: '#ffffff',
                          fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          paddingLeft: rem(28),
                          paddingRight: rem(28),
                        }}
                      >
                        Proceed to Document Details →
                      </Button>
                    </Group>
                  </Stack>
                </StepSection>

                {/* ── STEP 2: Document Details & Preferences ───────────────── */}
                <StepSection
                  stepNum={2}
                  title="Document Preferences & Scope"
                  subtitle="Editing sections, discipline area, target publisher, and turnaround"
                  isOpen={activeStep === 2}
                  isDone={false}
                  doneSummary={`${subjectName ? subjectName : 'Discipline pending'}${journalName ? ` · ${journalName}` : ''}${paramService === 'editing' ? ` · ${languageStyle === 'american' ? 'American English' : 'British English'}` : ''}`}
                  onToggle={() => setActiveStep((prev) => (prev === 2 ? null : 2))}
                  active={active}
                >
                  <Stack gap={rem(22)} pt={rem(20)}>

                    {/* Scope of editing: Specify sections (Editing only) */}
                    {paramService === 'editing' && (
                      <Box>
                        <Text size="xs" fw={700} mb={rem(4)} style={{ letterSpacing: '0.08em', color: active.primary }}>
                          DO YOU WANT TO SPECIFY SECTIONS THAT DO NOT REQUIRE EDITING?
                        </Text>
                        <Text size="xs" c="dimmed" mb={rem(10)}>
                          Exclude references, appendices, or equations to optimize editing fee.
                        </Text>
                        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={rem(8)}>
                          {[
                            { id: 'entire', label: 'Edit entire document' },
                            { id: 'exclude', label: 'Exclude specific sections' },
                            { id: 'only', label: 'Edit only specific sections' },
                          ].map((opt) => (
                            <UnstyledButton
                              key={opt.id}
                              onClick={() => setEditingScope(opt.id as any)}
                              px={rem(14)} py={rem(12)}
                              style={{
                                backgroundColor: editingScope === opt.id ? active.primary : '#ffffff',
                                color: editingScope === opt.id ? '#ffffff' : active.primary,
                                border: `1px solid ${editingScope === opt.id ? active.primary : `${active.primary}20`}`,
                                fontSize: rem(13),
                                fontWeight: editingScope === opt.id ? 700 : 500,
                                textAlign: 'center',
                                transition: 'all 0.15s ease',
                              }}
                            >
                              {opt.label}
                            </UnstyledButton>
                          ))}
                        </SimpleGrid>
                        {editingScope !== 'entire' && (
                          <TextInput
                            mt="xs"
                            placeholder="e.g. Exclude references & appendices; edit abstract, introduction, and results only"
                            radius={0}
                            value={scopeDetails}
                            onChange={(e) => setScopeDetails(e.target.value)}
                          />
                        )}
                      </Box>
                    )}

                    {/* Document type & Target */}
                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={rem(16)}>
                      <Select
                        label="Type of document *"
                        placeholder="Select document type"
                        radius={0}
                        data={DOCUMENT_TYPES}
                        value={docType}
                        onChange={(v) => setDocType(v ?? 'Journal Article')}
                      />
                      <TextInput
                        label="Target journal or publisher (if known)"
                        placeholder="e.g. Nature Medicine, Routledge, Oxford UP"
                        radius={0}
                        value={journalName}
                        onChange={(e) => setJournalName(e.target.value)}
                      />
                    </SimpleGrid>

                    {/* Academic discipline & specific sub-field */}
                    <TextInput
                      label="Academic Discipline & Specific Field *"
                      placeholder="e.g. Plant and Animal Science, Molecular Oncology, Epistemology, Econometrics..."
                      description="Our doctoral specialists span 1,300+ sub-disciplines. Enter your specific field so we match the right subject editor."
                      radius={0}
                      value={subjectName}
                      onChange={(e) => setSubjectName(e.target.value)}
                    />

                    {/* Language style (Editing only) */}
                    {paramService === 'editing' && (
                      <Box>
                        <Text size="xs" fw={700} mb={rem(8)} style={{ letterSpacing: '0.08em', color: active.primary }}>
                          LANGUAGE STYLE
                        </Text>
                        <Group gap={rem(6)}>
                          {[
                            { id: 'american', label: 'American English' },
                            { id: 'british', label: 'British English' },
                          ].map((opt) => (
                            <UnstyledButton
                              key={opt.id}
                              onClick={() => setLanguageStyle(opt.id as any)}
                              px={rem(16)} py={rem(10)}
                              style={{
                                backgroundColor: languageStyle === opt.id ? active.primary : '#ffffff',
                                color: languageStyle === opt.id ? '#ffffff' : active.primary,
                                border: `1px solid ${languageStyle === opt.id ? active.primary : `${active.primary}20`}`,
                                fontSize: rem(12),
                                fontWeight: languageStyle === opt.id ? 700 : 500,
                              }}
                            >
                              {opt.label}
                            </UnstyledButton>
                          ))}
                        </Group>
                      </Box>
                    )}

                    {/* Deadline picker */}
                    <DatePickerInput
                      label="Target delivery date"
                      description="Include a 24–48h buffer before your actual university or journal deadline"
                      placeholder="Select target date"
                      radius={0}
                      minDate={new Date()}
                      value={deadline}
                      onChange={(val) => setDeadline(val as Date | null)}
                    />

                    {/* Instructions / Abstract */}
                    <Textarea
                      label="Abstract or additional instructions for your editor (optional)"
                      placeholder="Paste your abstract or share specific referee feedback, style manual requirements, or focus areas..."
                      radius={0}
                      minRows={3}
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                    />

                    {/* Intent toggle: Share quote vs Start immediately (Services requiring quote/deposit) */}
                    {paramService !== 'ai-audit' && (
                      <Box pt={rem(8)}>
                        <Text size="xs" fw={700} mb={rem(10)} style={{ letterSpacing: '0.08em', color: active.primary }}>
                          CAN WE START WORK ON YOUR REQUEST IMMEDIATELY?
                        </Text>
                        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={rem(10)}>
                          <UnstyledButton
                            onClick={() => setIntent('quote')}
                            p={rem(18)}
                            style={{
                              border: `1px solid ${intent === 'quote' ? active.accent : `${active.primary}18`}`,
                              backgroundColor: intent === 'quote' ? `${active.accent}08` : '#ffffff',
                              color: active.primary,
                              transition: 'all 0.15s ease',
                            }}
                          >
                            <Group gap="xs" align="center" mb={rem(4)}>
                              <IconMailForward size={16} color={active.accent} />
                              <Text size="sm" fw={700} style={{ color: active.primary }}>
                                Share a quotation first
                              </Text>
                            </Group>
                            <Text size="xs" lh={1.5} style={{ color: '#666' }}>
                              We will email a firm quotation within 1 working hour. Pay nothing until approved.
                            </Text>
                          </UnstyledButton>

                          <UnstyledButton
                            onClick={() => setIntent('start')}
                            p={rem(18)}
                            style={{
                              border: `1px solid ${intent === 'start' ? active.accent : `${active.primary}18`}`,
                              backgroundColor: intent === 'start' ? `${active.accent}08` : '#ffffff',
                              color: active.primary,
                              transition: 'all 0.15s ease',
                            }}
                          >
                            <Group gap="xs" align="center" mb={rem(4)}>
                              <IconReceipt size={16} color={active.accent} />
                              <Text size="sm" fw={700} style={{ color: active.primary }}>
                                Start work immediately
                              </Text>
                            </Group>
                            <Text size="xs" lh={1.5} style={{ color: '#666' }}>
                              We will begin work on your manuscript. 50% deposit invoice sent upon scope confirmation.
                            </Text>
                          </UnstyledButton>
                        </SimpleGrid>
                      </Box>
                    )}

                    {/* Submit Button */}
                    <Box pt="sm">
                      <Button
                        size="lg"
                        radius={0}
                        fullWidth
                        disabled={!isFormValid}
                        onClick={handleSubmit}
                        rightSection={<IconArrowRight size={18} />}
                        style={{
                          backgroundColor: isFormValid ? active.accent : `${active.primary}20`,
                          color: '#ffffff',
                          fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          height: rem(54),
                          cursor: isFormValid ? 'pointer' : 'not-allowed',
                        }}
                      >
                        {paramService === 'ai-audit'
                          ? `SUBMIT FOR AI MANUSCRIPT AUDIT — $${calculatedEstimate ?? 29}`
                          : intent === 'start'
                          ? 'SUBMIT ORDER — INVOICE 50% DEPOSIT'
                          : 'SUBMIT BRIEF FOR FACULTY REVIEW'}
                      </Button>
                      <Text size="xs" c="dimmed" mt={rem(8)} ta="center">
                        By clicking 'Submit Order', you agree to pay for the order in full on or before the delivery date. Strict NDA applies.
                      </Text>
                    </Box>
                  </Stack>
                </StepSection>

              </Stack>

              {/* ── Right Column: Sticky Order Summary Card ──────────────── */}
              <Box
                p={rem(28)}
                bg="#ffffff"
                style={{
                  border: `1px solid ${active.primary}12`,
                  position: 'sticky',
                  top: rem(90),
                }}
              >
                <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: 'var(--font-heading-sans), var(--font-sans)', marginBottom: rem(12) }}>
                  ORDER SUMMARY
                </Text>

                <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontSize: rem(20), fontWeight: 600, color: active.primary, lineHeight: 1.25 }}>
                  {planTitle}
                </Title>

                {paramService === 'ai-audit' && (
                  <Box mt={rem(6)}>
                    <Text size="xs" c="dimmed">
                      Plan: {AI_AUDIT_TIER_META[paramTier]?.priceStr ?? '$29 flat fee'}
                    </Text>
                    <Box mt={rem(10)} p={rem(12)} style={{ backgroundColor: `${active.accent}12`, border: `1px solid ${active.accent}30` }}>
                      <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.04em' }}>
                        ★ 100% FEE CREDIT GUARANTEE
                      </Text>
                      <Text size="xs" c="dimmed" mt={rem(4)} lh={1.5}>
                        100% of your audit fee is credited toward any full editing package if you commission editing after reviewing your diagnostic report.
                      </Text>
                    </Box>
                  </Box>
                )}
                {paramService === 'editing' && (
                  <Text size="xs" c="dimmed" mt={rem(4)}>
                    Rate: {EDITING_TIER_META[paramTier]?.priceStr ?? '$0.065 / word'}
                  </Text>
                )}
                {paramService === 'publication' && paramSection === 'journal' && (
                  <Text size="xs" c="dimmed" mt={rem(4)}>
                    Package: {JOURNAL_TIER_META[paramTier]?.priceStr ?? '$560 flat fee'}
                  </Text>
                )}
                {paramService === 'publication' && paramSection === 'book' && (
                  <Text size="xs" c="dimmed" mt={rem(4)}>
                    {checkedStages.length} Book Stage{checkedStages.length > 1 ? 's' : ''} Selected
                  </Text>
                )}

                {/* Live calculated fee if available */}
                {calculatedEstimate !== null && (
                  <Box mt={rem(16)} p={rem(14)} style={{ backgroundColor: active.surface, border: `1px solid ${active.primary}08` }}>
                    <Group justify="space-between" align="baseline">
                      <Text size="xs" c="dimmed">
                        {paramService === 'ai-audit' ? 'Audit Fee' : wordCount > 0 ? `${wordCount.toLocaleString()} words` : 'Base Fee'}:
                      </Text>
                      <Text size="md" fw={700} c={active.primary}>
                        ${calculatedEstimate.toLocaleString()}
                      </Text>
                    </Group>
                    {paramService !== 'ai-audit' && (
                      <Group justify="space-between" align="baseline" mt={rem(6)}>
                        <Text size="xs" fw={600} c={active.accent}>
                          50% Deposit Due:
                        </Text>
                        <Text size="sm" fw={700} c={active.accent}>
                          ${Math.round(calculatedEstimate * 0.5).toLocaleString()}
                        </Text>
                      </Group>
                    )}
                  </Box>
                )}

                <Link href={backToOrderUrl} style={{ textDecoration: 'none' }}>
                  <Text size="xs" mt={rem(12)} style={{ color: active.accent, textDecoration: 'underline', cursor: 'pointer' }}>
                    Change plan or service ↗
                  </Text>
                </Link>

                <Box my={rem(18)} style={{ height: 1, backgroundColor: `${active.primary}10` }} />

                {/* Payment Schedule Policy */}
                <Text size="xs" fw={700} mb={rem(8)} style={{ letterSpacing: '0.08em', color: active.primary }}>
                  PAYMENT TERMS
                </Text>
                <Stack gap={rem(8)}>
                  <Group gap={rem(8)} align="flex-start" wrap="nowrap">
                    <Box px={rem(6)} py={rem(1)} style={{ backgroundColor: `${active.accent}15`, marginTop: rem(2) }}>
                      <Text size="xs" fw={800} c={active.accent}>1</Text>
                    </Box>
                    <Text size="xs" c="dimmed" lh={1.5}>
                      <strong style={{ color: active.primary }}>50% deposit</strong> invoiced upon formal quote approval.
                    </Text>
                  </Group>
                  <Group gap={rem(8)} align="flex-start" wrap="nowrap">
                    <Box px={rem(6)} py={rem(1)} style={{ backgroundColor: `${active.accent}15`, marginTop: rem(2) }}>
                      <Text size="xs" fw={800} c={active.accent}>2</Text>
                    </Box>
                    <Text size="xs" c="dimmed" lh={1.5}>
                      <strong style={{ color: active.primary }}>50% on delivery</strong> when completed deliverables are received.
                    </Text>
                  </Group>
                </Stack>

                <Box my={rem(18)} style={{ height: 1, backgroundColor: `${active.primary}10` }} />

                {/* Trust markers */}
                <Stack gap={rem(8)}>
                  {[
                    'Strict non-disclosure on all manuscripts',
                    'Zero generative AI used on your text',
                    '100% Track Changes delivery in Word',
                    'Personal scoping & review by Micah Dobson',
                  ].map((pt, i) => (
                    <Group key={i} gap={rem(8)} align="flex-start" wrap="nowrap">
                      <IconCheck size={13} color={active.accent} style={{ flexShrink: 0, marginTop: rem(2) }} />
                      <Text size="xs" c="dimmed" lh={1.4}>{pt}</Text>
                    </Group>
                  ))}
                </Stack>
              </Box>

            </Box>
          </Box>
        </Container>
      </Box>

    </Box>
  )
}

// ─── StepSection Collapsible Component ────────────────────────────────────────

function StepSection({
  stepNum,
  title,
  subtitle,
  isOpen,
  isDone,
  doneSummary,
  onToggle,
  children,
  active,
}: {
  stepNum: number
  title: string
  subtitle: string
  isOpen: boolean
  isDone: boolean
  doneSummary?: string
  onToggle: () => void
  children: React.ReactNode
  active: Record<string, string>
}) {
  return (
    <Box
      bg="#ffffff"
      style={{
        border: `1px solid ${isOpen ? active.accent : `${active.primary}18`}`,
        boxShadow: isOpen ? '0 4px 20px rgba(0,0,0,0.06)' : '0 2px 8px rgba(0,0,0,0.02)',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Header bar: Always crisp white matching the sidebar */}
      <UnstyledButton
        onClick={onToggle}
        px={rem(24)}
        py={rem(18)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          color: active.primary,
          borderBottom: isOpen ? `1px solid ${active.primary}10` : 'none',
          cursor: 'pointer',
          transition: 'background-color 0.15s ease',
        }}
      >
        <Group gap={rem(14)} align="center" style={{ flex: 1, minWidth: 0 }}>
          <Box
            style={{
              width: rem(32),
              height: rem(32),
              borderRadius: rem(16),
              backgroundColor: isDone && !isOpen ? active.accent : isOpen ? active.accent : `${active.primary}12`,
              color: isDone || isOpen ? '#ffffff' : active.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: rem(13),
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {isDone && !isOpen ? <IconCheck size={16} stroke={3} color="#ffffff" /> : stepNum}
          </Box>
          <Box style={{ flex: 1, minWidth: 0 }}>
            <Text fw={700} size="sm" style={{ color: active.primary }}>
              {title}
            </Text>
            {!isOpen && isDone && doneSummary && (
              <Text size="xs" truncate style={{ color: active.accent, fontWeight: 600, marginTop: rem(2) }}>
                {doneSummary}
              </Text>
            )}
            {!isOpen && (!isDone || !doneSummary) && (
              <Text size="xs" c="dimmed" truncate style={{ marginTop: rem(2) }}>
                {subtitle}
              </Text>
            )}
          </Box>
        </Group>

        <Group gap={rem(10)} align="center" style={{ flexShrink: 0, marginLeft: rem(12) }}>
          {isDone && !isOpen && (
            <Group gap={rem(4)} align="center" style={{ color: active.accent }}>
              <IconPencil size={13} />
              <Text size="xs" fw={700}>
                Edit
              </Text>
            </Group>
          )}
          <Box
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              color: isOpen ? active.accent : `${active.primary}60`,
            }}
          >
            <IconChevronDown size={18} />
          </Box>
        </Group>
      </UnstyledButton>

      {/* Expanded body */}
      {isOpen && (
        <Box px={rem(24)} pb={rem(24)}>
          {children}
        </Box>
      )}
    </Box>
  )
}
