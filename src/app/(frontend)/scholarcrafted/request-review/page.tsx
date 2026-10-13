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
  Checkbox,
  Select,
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'
import { useSearchParams } from 'next/navigation'
import {
  IconCheck,
  IconX,
  IconPencil,
  IconBook2,
  IconFileText,
  IconArrowRight,
  IconUpload,
  IconArrowLeft,
  IconReceipt,
  IconMailForward,
} from '@tabler/icons-react'
import Link from 'next/link'

// ─── Label maps ───────────────────────────────────────────────────────────────

const SALUTATIONS = ['Dr.', 'Prof.', 'Mr.', 'Ms.', 'Mx.', '—']

const SERVICE_LABELS: Record<string, string> = {
  editing: 'Editing & Compliance',
  publication: 'Publication Support',
}

const EDITING_TIER_LABELS: Record<string, { label: string; price: string }> = {
  advanced: { label: 'Advanced Editing', price: 'from $0.0425/word' },
  premium:  { label: 'Premium Editing',  price: 'from $0.065/word' },
  scientific:{ label: 'Scientific Editing Pro', price: 'from $0.095/word' },
}

const JOURNAL_TIER_LABELS: Record<string, { label: string; price: string }> = {
  essentials: { label: 'Essentials', price: '$320 flat' },
  pro:        { label: 'Pro',        price: '$560 flat' },
  full:       { label: 'Full',       price: '$900 flat' },
}

const BOOK_STAGES: Array<{ id: string; label: string; price: string }> = [
  { id: '01', label: 'Stage 01 — Publisher Selection',   price: '$280 flat' },
  { id: '02', label: 'Stage 02 — Book Proposal',         price: '$480 flat' },
  { id: '03', label: 'Stage 03 — Manuscript Editing',    price: 'per word' },
  { id: '04', label: 'Stage 04 — Galley Proof Review',   price: 'project rate' },
  { id: '05', label: 'Stage 05 — Back-of-Book Indexing', price: '$3/page' },
]

// ─── Page wrapper ─────────────────────────────────────────────────────────────

export default function RequestReviewPage() {
  return (
    <Suspense fallback={<Box style={{ minHeight: '100vh' }} />}>
      <RequestReviewContent />
    </Suspense>
  )
}

// ─── Back URL builder ─────────────────────────────────────────────────────────

function buildBackUrl(service: string, section: string, tier: string, stage: string) {
  if (!service) return '/scholarcrafted/services'
  if (service === 'editing') {
    return tier
      ? `/scholarcrafted/order?service=editing&tier=${tier}`
      : '/scholarcrafted/order?service=editing'
  }
  if (service === 'publication') {
    if (section === 'journal') {
      return tier
        ? `/scholarcrafted/order?service=publication&section=journal&tier=${tier}`
        : '/scholarcrafted/order?service=publication&section=journal'
    }
    if (section === 'book') {
      return stage
        ? `/scholarcrafted/order?service=publication&section=book&stage=${stage}`
        : '/scholarcrafted/order?service=publication&section=book'
    }
    return '/scholarcrafted/order?service=publication'
  }
  return '/scholarcrafted/order'
}

// ─── Sidebar order summary ────────────────────────────────────────────────────

function OrderSidebar({
  service, section, tier, stage, pipeline, checkedStages, accent, primary, surface, background,
}: {
  service: string; section: string; tier: string; stage: string; pipeline: boolean
  checkedStages: string[]; accent: string; primary: string; surface: string; background: string
}) {
  let planName = ''
  let planDetail = ''
  let changePath = ''

  if (service === 'editing') {
    const t = EDITING_TIER_LABELS[tier]
    planName = t ? t.label : 'Editing & Compliance'
    planDetail = t ? t.price : 'Priced per word'
    changePath = `/scholarcrafted/order?service=editing`
  } else if (service === 'publication' && section === 'journal') {
    const t = JOURNAL_TIER_LABELS[tier]
    planName = t ? `Journal Articles — ${t.label}` : 'Journal Articles'
    planDetail = t ? t.price : ''
    changePath = `/scholarcrafted/order?service=publication&section=journal`
  } else if (service === 'publication' && section === 'book') {
    if (pipeline || checkedStages.length > 1) {
      planName = 'Full Book Pipeline'
      planDetail = 'All 5 stages — enquire for bundle pricing'
    } else if (checkedStages.length === 1) {
      const s = BOOK_STAGES.find(b => b.id === checkedStages[0])
      planName = s ? s.label : `Stage ${checkedStages[0]}`
      planDetail = s ? s.price : ''
    } else {
      planName = 'Book Manuscripts'
      planDetail = 'Select stage(s) below'
    }
    changePath = `/scholarcrafted/order?service=publication&section=book`
  }

  if (!service) return null

  return (
    <Box
      p={rem(28)}
      style={{
        backgroundColor: surface,
        border: `1px solid ${primary}12`,
        position: 'sticky',
        top: rem(100),
      }}
    >
      <Stack gap={rem(20)}>
        {/* Header */}
        <Box>
          <Text
            size="xs"
            fw={700}
            style={{
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: accent,
              fontFamily: 'var(--font-heading-sans), var(--font-sans)',
              marginBottom: rem(8),
            }}
          >
            Your Selection
          </Text>
          <Text fw={700} size="md" c={primary} lh={1.4}>
            {planName || '—'}
          </Text>
          {planDetail && (
            <Text size="sm" c="dimmed" mt={rem(4)}>
              {planDetail}
            </Text>
          )}
          {changePath && (
            <Link href={changePath} style={{ textDecoration: 'none' }}>
              <Text size="xs" mt={rem(8)} style={{ color: accent, textDecoration: 'underline', cursor: 'pointer' }}>
                Change plan
              </Text>
            </Link>
          )}
        </Box>

        {/* Divider */}
        <Box style={{ height: 1, backgroundColor: `${primary}10` }} />

        {/* Payment terms */}
        <Stack gap={rem(12)}>
          <Text
            size="xs"
            fw={700}
            style={{
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: primary,
              fontFamily: 'var(--font-heading-sans), var(--font-sans)',
            }}
          >
            Payment Terms
          </Text>
          <Stack gap={rem(8)}>
            <Group gap={rem(8)} align="flex-start" wrap="nowrap">
              <Box
                style={{
                  width: rem(20),
                  height: rem(20),
                  backgroundColor: `${accent}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: rem(1),
                }}
              >
                <Text size="xs" fw={800} c={accent}>1</Text>
              </Box>
              <Text size="xs" c="dimmed" lh={1.5}>
                <strong style={{ color: primary }}>50% deposit invoice</strong> sent on quote approval. No payment until you're satisfied with the scope.
              </Text>
            </Group>
            <Group gap={rem(8)} align="flex-start" wrap="nowrap">
              <Box
                style={{
                  width: rem(20),
                  height: rem(20),
                  backgroundColor: `${accent}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: rem(1),
                }}
              >
                <Text size="xs" fw={800} c={accent}>2</Text>
              </Box>
              <Text size="xs" c="dimmed" lh={1.5}>
                <strong style={{ color: primary }}>50% on delivery</strong> — due only after you receive the completed work.
              </Text>
            </Group>
          </Stack>
        </Stack>

        {/* Divider */}
        <Box style={{ height: 1, backgroundColor: `${primary}10` }} />

        {/* Trust signals */}
        <Stack gap={rem(10)}>
          {[
            'Strict NDA — your manuscript stays private',
            'No AI tools applied to your work',
            'Scoped quote within 24 hours',
          ].map((line) => (
            <Group key={line} gap={rem(8)} align="flex-start" wrap="nowrap">
              <IconCheck size={13} color={accent} style={{ flexShrink: 0, marginTop: rem(2) }} />
              <Text size="xs" c="dimmed" lh={1.4}>{line}</Text>
            </Group>
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}

// ─── Main content ─────────────────────────────────────────────────────────────

function RequestReviewContent() {
  const theme = useMantineTheme()
  const active = theme.other
  const searchParams = useSearchParams()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Read URL params for pre-selection
  const paramService  = searchParams.get('service') ?? ''
  const paramSection  = searchParams.get('section') ?? ''
  const paramTier     = searchParams.get('tier') ?? ''
  const paramStage    = searchParams.get('stage') ?? ''
  const paramPipeline = searchParams.get('pipeline') === 'full'
  const paramWords    = parseInt(searchParams.get('wordCount') ?? '0', 10)

  const hasPreSelection = !!paramService

  // Build back URL
  const backUrl = buildBackUrl(paramService, paramSection, paramTier, paramStage)

  // Derive human-readable pre-selection label
  function getPreSelectionLabel() {
    if (!paramService) return ''
    const svcLabel = SERVICE_LABELS[paramService] ?? paramService
    if (paramService === 'editing' && paramTier) {
      return `${svcLabel} — ${EDITING_TIER_LABELS[paramTier]?.label ?? paramTier}`
    }
    if (paramService === 'publication') {
      if (paramSection === 'journal' && paramTier) {
        return `${svcLabel} — Journal Articles — ${JOURNAL_TIER_LABELS[paramTier]?.label ?? paramTier}`
      }
      if (paramSection === 'book' && paramPipeline) {
        return `${svcLabel} — Full Book Pipeline`
      }
      if (paramSection === 'book' && paramStage) {
        const s = BOOK_STAGES.find(b => b.id === paramStage)
        return `${svcLabel} — Book Manuscripts — ${s?.label ?? `Stage ${paramStage}`}`
      }
      if (paramSection === 'journal') return `${svcLabel} — Journal Articles`
      if (paramSection === 'book') return `${svcLabel} — Book Manuscripts`
      return svcLabel
    }
    return svcLabel
  }

  const preSelectionLabel = getPreSelectionLabel()

  // Form state
  const [salutation, setSalutation]   = useState('')
  const [service, setService]         = useState(paramService)
  const [section, setSection]         = useState(paramSection)
  const [editingTier, setEditingTier] = useState(paramTier)
  const [journalTier, setJournalTier] = useState(paramSection === 'journal' ? paramTier : '')
  const [bookStage, setBookStage]     = useState(paramStage)

  // Book checkboxes — pre-check the incoming stage or all if pipeline
  const initialChecked = paramPipeline
    ? BOOK_STAGES.map(s => s.id)
    : paramStage ? [paramStage] : []
  const [checkedStages, setCheckedStages] = useState<string[]>(initialChecked)

  const [wordCount, setWordCount]     = useState<number>(paramWords || 0)
  const [deadline, setDeadline]       = useState<Date | null>(null)
  const [fileName, setFileName]       = useState('')
  const [salutInput, setSalutInput]   = useState('')
  const [firstName, setFirstName]     = useState('')
  const [lastName, setLastName]       = useState('')
  const [email, setEmail]             = useState('')
  const [note, setNote]               = useState('')
  // Quote vs start toggle
  const [intent, setIntent]           = useState<'quote' | 'start'>('quote')
  const [submitted, setSubmitted]     = useState(false)

  function toggleStage(id: string) {
    setCheckedStages(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const isValid =
    (hasPreSelection || service) &&
    firstName.trim() !== '' &&
    email.trim() !== '' &&
    deadline !== null

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) setFileName(file.name)
  }

  function handleSubmit() {
    if (!isValid) return
    setSubmitted(true)
  }

  // Determine which section drives the sidebar
  const sidebarSection  = hasPreSelection ? paramSection  : section
  const sidebarTier     = hasPreSelection ? paramTier     : (service === 'editing' ? editingTier : journalTier)
  const sidebarStage    = hasPreSelection ? paramStage    : bookStage
  const sidebarPipeline = hasPreSelection ? paramPipeline : false

  // ─── Success screen ───────────────────────────────────────────────────────

  if (submitted) {
    return (
      <Box bg={active.background} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <Box style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }} py={rem(80)}>
          <Container size="sm">
            <Box
              p={{ base: rem(40), md: rem(60) }}
              bg={active.surface}
              style={{ border: `1px solid ${active.primary}12`, textAlign: 'center' }}
            >
              <Stack align="center" gap="lg">
                <Box
                  style={{
                    width: rem(64),
                    height: rem(64),
                    backgroundColor: `${active.accent}12`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconCheck size={32} color={active.accent} />
                </Box>
                <Title order={2} style={{ fontFamily: 'var(--font-serif)', fontSize: rem(28), color: active.primary }}>
                  {intent === 'start' ? 'Ready to go — deposit invoice incoming.' : 'Brief received.'}
                </Title>
                <Text size="md" c="dimmed" lh={1.7} style={{ maxWidth: '44ch' }}>
                  {intent === 'start'
                    ? <>Micah will review your project and send a <strong style={{ color: active.primary }}>50% deposit invoice</strong> to <strong style={{ color: active.primary }}>{email}</strong> within 24 hours. Work begins on receipt.</>
                    : <>Micah will review your project personally and send a scoped quote to{' '}<strong style={{ color: active.primary }}>{email}</strong> within 24 hours.{!fileName && ' Reply to that email to attach your manuscript when ready.'}</>
                  }
                </Text>
                <Text size="sm" c="dimmed" style={{ fontStyle: 'italic' }}>
                  No automated response — a real person reads every submission.
                </Text>
                <Link href="/scholarcrafted" style={{ textDecoration: 'none' }}>
                  <Button variant="outline" radius={0} mt="sm" style={{ borderColor: `${active.primary}30`, color: active.primary }}>
                    Return to ScholarCrafted
                  </Button>
                </Link>
              </Stack>
            </Box>
          </Container>
        </Box>
      </Box>
    )
  }

  // ─── Form ─────────────────────────────────────────────────────────────────

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary, display: 'flex', flexDirection: 'column' }}>
      {/* Minimal sticky header — contains back + logo + exit */}
      <Box
        py={rem(14)}
        style={{
          borderBottom: `1px solid ${active.primary}10`,
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: `${active.background}f2`,
          backdropFilter: 'blur(12px)',
          flexShrink: 0,
        }}
      >
        <Container size={1100}>
          <Group justify="space-between" align="center">
            {/* Left: back link + logo */}
            <Group gap={rem(24)} align="center">
              {hasPreSelection && (
                <Link href={backUrl} style={{ textDecoration: 'none' }}>
                  <Group gap={rem(6)} align="center">
                    <IconArrowLeft size={14} color={active.accent} />
                    <Text size="xs" fw={600} style={{ color: active.accent, letterSpacing: '0.04em' }}>
                      Back
                    </Text>
                  </Group>
                </Link>
              )}
              <Link href="/scholarcrafted" style={{ textDecoration: 'none' }}>
                <Text fw={700} size="lg" c={active.primary} style={{ fontFamily: 'var(--font-serif)' }}>
                  ScholarCrafted
                </Text>
              </Link>
            </Group>
            {/* Right: exit */}
            <Link href="/scholarcrafted" style={{ textDecoration: 'none' }}>
              <Group
                gap="xs"
                align="center"
                style={{
                  border: `1px solid ${active.primary}30`,
                  padding: `${rem(6)} ${rem(14)}`,
                  cursor: 'pointer',
                }}
              >
                <Text size="xs" fw={700} c={active.primary} style={{ letterSpacing: '0.1em' }}>EXIT</Text>
                <IconX size={12} color={active.primary} />
              </Group>
            </Link>
          </Group>
        </Container>
      </Box>

      {/* Page header */}
      <Box pt={{ base: rem(48), md: rem(64) }} pb={rem(36)} bg={active.background}>
        <Container size={1100}>
          <Stack gap={rem(12)} style={{ maxWidth: 720 }}>
            <Text
              size="xs"
              fw={700}
              style={{
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: active.accent,
                fontFamily: 'var(--font-heading-sans), var(--font-sans)',
              }}
            >
              Submit Your Manuscript
            </Text>
            <Title
              order={1}
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: active.primary,
                fontFamily: 'var(--font-display), var(--font-serif)',
                fontWeight: 600,
              }}
            >
              One form. A scoped quote within 24 hours.
            </Title>

            {/* Pre-selection confirmation pill — no Change link, EXIT handles navigation */}
            {hasPreSelection && (
              <Box
                px={rem(14)}
                py={rem(8)}
                mt={rem(4)}
                style={{
                  backgroundColor: `${active.accent}10`,
                  border: `1px solid ${active.accent}30`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: rem(8),
                }}
              >
                <IconCheck size={13} color={active.accent} />
                <Text size="sm" fw={600} c={active.primary} style={{ fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                  {preSelectionLabel}
                </Text>
              </Box>
            )}
          </Stack>
        </Container>
      </Box>

      {/* Two-column layout: responsive via CSS grid */}
      <Box py={rem(48)} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}10`, flex: 1 }}>
        <Container size={1100}>
          <Box
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr)',
              gap: rem(32),
            }}
          >
            {/* Single FormBody + sidebar, stacked on mobile, side-by-side on desktop via style tag */}
            <style>{`
              @media (min-width: 768px) {
                .sc-form-grid { grid-template-columns: minmax(0,1fr) 300px !important; }
              }
            `}</style>
            <Box
              className="sc-form-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0,1fr)',
                gap: rem(40),
                alignItems: 'start',
              }}
            >
              {/* Form */}
              <FormBody
                hasPreSelection={hasPreSelection}
                service={service} setService={setService}
                section={section} setSection={setSection}
                editingTier={editingTier} setEditingTier={setEditingTier}
                journalTier={journalTier} setJournalTier={setJournalTier}
                bookStage={bookStage} setBookStage={setBookStage}
                paramSection={paramSection}
                checkedStages={checkedStages} toggleStage={toggleStage}
                salutation={salutation} setSalutation={setSalutation}
                firstName={firstName} setFirstName={setFirstName}
                lastName={lastName} setLastName={setLastName}
                email={email} setEmail={setEmail}
                note={note} setNote={setNote}
                wordCount={wordCount} setWordCount={setWordCount}
                deadline={deadline} setDeadline={setDeadline}
                fileName={fileName} fileInputRef={fileInputRef}
                handleFileChange={handleFileChange}
                intent={intent} setIntent={setIntent}
                isValid={Boolean(isValid)} handleSubmit={handleSubmit}
                active={active}
              />
              {/* Sidebar */}
              <OrderSidebar
                service={hasPreSelection ? paramService : service}
                section={sidebarSection}
                tier={sidebarTier}
                stage={sidebarStage}
                pipeline={sidebarPipeline}
                checkedStages={checkedStages}
                accent={active.accent}
                primary={active.primary}
                surface={active.background}
                background={active.background}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

// ─── Form body (extracted so it can be used in both mobile/desktop slots) ─────

function FormBody({
  hasPreSelection,
  service, setService,
  section, setSection,
  editingTier, setEditingTier,
  journalTier, setJournalTier,
  bookStage, setBookStage,
  paramSection,
  checkedStages, toggleStage,
  salutation, setSalutation,
  firstName, setFirstName,
  lastName, setLastName,
  email, setEmail,
  note, setNote,
  wordCount, setWordCount,
  deadline, setDeadline,
  fileName, fileInputRef, handleFileChange,
  intent, setIntent,
  isValid, handleSubmit,
  active,
}: {
  hasPreSelection: boolean
  service: string; setService: (v: string) => void
  section: string; setSection: (v: string) => void
  editingTier: string; setEditingTier: (v: string) => void
  journalTier: string; setJournalTier: (v: string) => void
  bookStage: string; setBookStage: (v: string) => void
  paramSection: string
  checkedStages: string[]; toggleStage: (id: string) => void
  salutation: string; setSalutation: (v: string) => void
  firstName: string; setFirstName: (v: string) => void
  lastName: string; setLastName: (v: string) => void
  email: string; setEmail: (v: string) => void
  note: string; setNote: (v: string) => void
  wordCount: number; setWordCount: (v: number) => void
  deadline: Date | null; setDeadline: (v: Date | null) => void
  fileName: string; fileInputRef: React.RefObject<HTMLInputElement | null>
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  intent: 'quote' | 'start'; setIntent: (v: 'quote' | 'start') => void
  isValid: boolean; handleSubmit: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  active: any
}) {
  const { accent, primary, surface, background } = active

  // Show book checkboxes when section=book (either from URL params or user selection)
  const showBookCheckboxes = (hasPreSelection && paramSection === 'book') || (!hasPreSelection && section === 'book')

  return (
    <Stack gap={rem(40)}>

      {/* ── SERVICE SELECTION (only if no pre-selection) ─────────────── */}
      {!hasPreSelection && (
        <FormSection title="What do you need?" accent={accent} primary={primary}>
          <Stack gap={rem(24)}>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={rem(2)}>
              {[
                {
                  id: 'editing',
                  icon: <IconPencil size={22} />,
                  label: 'Editing & Compliance',
                  desc: 'Line editing, style conformity, citations, academic tone. Priced per word.',
                },
                {
                  id: 'publication',
                  icon: <IconBook2 size={22} />,
                  label: 'Publication Support',
                  desc: 'Journal submission pipeline or book manuscript pipeline.',
                },
              ].map((svc) => (
                <SelectionTile
                  key={svc.id}
                  icon={svc.icon}
                  label={svc.label}
                  desc={svc.desc}
                  selected={service === svc.id}
                  onClick={() => {
                    setService(svc.id)
                    setSection('')
                    setEditingTier('')
                    setJournalTier('')
                    setBookStage('')
                  }}
                  accent={accent}
                  primary={primary}
                  surface={surface}
                  background={background}
                />
              ))}
            </SimpleGrid>

            {service === 'editing' && (
              <Box>
                <Text size="xs" fw={700} mb={rem(10)} style={{ letterSpacing: '0.12em', color: '#888', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                  WHICH TIER? (optional — we can recommend)
                </Text>
                <Group gap={rem(2)}>
                  {Object.entries(EDITING_TIER_LABELS).map(([id, { label }]) => (
                    <UnstyledButton
                      key={id}
                      onClick={() => setEditingTier(editingTier === id ? '' : id)}
                      px={rem(20)} py={rem(12)}
                      style={{
                        backgroundColor: editingTier === id ? primary : background,
                        color: editingTier === id ? '#fff' : primary,
                        border: `1px solid ${editingTier === id ? primary : `${primary}20`}`,
                        fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                        fontSize: rem(13), fontWeight: editingTier === id ? 700 : 500,
                        letterSpacing: '0.02em', transition: 'all 0.15s ease',
                      }}
                    >
                      {label}
                    </UnstyledButton>
                  ))}
                </Group>
              </Box>
            )}

            {service === 'publication' && (
              <Box>
                <Text size="xs" fw={700} mb={rem(10)} style={{ letterSpacing: '0.12em', color: '#888', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                  JOURNAL ARTICLES OR BOOK MANUSCRIPTS?
                </Text>
                <Group gap={rem(2)}>
                  {[
                    { id: 'journal', label: 'Journal Articles', icon: <IconFileText size={15} /> },
                    { id: 'book', label: 'Book Manuscripts', icon: <IconBook2 size={15} /> },
                  ].map((opt) => (
                    <UnstyledButton
                      key={opt.id}
                      onClick={() => { setSection(opt.id); setJournalTier(''); setBookStage('') }}
                      px={rem(20)} py={rem(12)}
                      style={{
                        backgroundColor: section === opt.id ? primary : background,
                        color: section === opt.id ? '#fff' : primary,
                        border: `1px solid ${section === opt.id ? primary : `${primary}20`}`,
                        fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                        fontSize: rem(13), fontWeight: section === opt.id ? 700 : 500,
                        display: 'flex', alignItems: 'center', gap: rem(6),
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {opt.icon} {opt.label}
                    </UnstyledButton>
                  ))}
                </Group>
              </Box>
            )}

            {service === 'publication' && section === 'journal' && (
              <Box>
                <Text size="xs" fw={700} mb={rem(10)} style={{ letterSpacing: '0.12em', color: '#888', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                  TIER? (optional — we can recommend)
                </Text>
                <Group gap={rem(2)}>
                  {Object.entries(JOURNAL_TIER_LABELS).map(([id, { label }]) => (
                    <UnstyledButton
                      key={id}
                      onClick={() => setJournalTier(journalTier === id ? '' : id)}
                      px={rem(20)} py={rem(12)}
                      style={{
                        backgroundColor: journalTier === id ? primary : background,
                        color: journalTier === id ? '#fff' : primary,
                        border: `1px solid ${journalTier === id ? primary : `${primary}20`}`,
                        fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                        fontSize: rem(13), fontWeight: journalTier === id ? 700 : 500,
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {label}
                    </UnstyledButton>
                  ))}
                </Group>
              </Box>
            )}
          </Stack>
        </FormSection>
      )}

      {/* ── BOOK STAGE CHECKBOXES ──────────────────────────────────────── */}
      {showBookCheckboxes && (
        <FormSection title="Which stage(s) do you need?" accent={accent} primary={primary}>
          <Stack gap={rem(10)}>
            <Text size="sm" c="dimmed" lh={1.6} mb={rem(4)}>
              Select all that apply. If you need the full pipeline, tick all five — we'll price the bundle.
            </Text>
            {BOOK_STAGES.map((stg) => (
              <UnstyledButton
                key={stg.id}
                onClick={() => toggleStage(stg.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: rem(12),
                  padding: `${rem(14)} ${rem(16)}`,
                  backgroundColor: checkedStages.includes(stg.id) ? `${accent}08` : background,
                  border: `1px solid ${checkedStages.includes(stg.id) ? accent : `${primary}15`}`,
                  transition: 'all 0.15s ease',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <Box
                  style={{
                    width: rem(20),
                    height: rem(20),
                    border: `2px solid ${checkedStages.includes(stg.id) ? accent : `${primary}30`}`,
                    backgroundColor: checkedStages.includes(stg.id) ? accent : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.15s ease',
                  }}
                >
                  {checkedStages.includes(stg.id) && <IconCheck size={12} color="#fff" />}
                </Box>
                <Box style={{ flex: 1 }}>
                  <Text size="sm" fw={600} c={primary}>{stg.label}</Text>
                  <Text size="xs" c="dimmed">{stg.price}</Text>
                </Box>
              </UnstyledButton>
            ))}
          </Stack>
        </FormSection>
      )}

      {/* ── DOCUMENT UPLOAD ───────────────────────────────────────────── */}
      <FormSection title="Upload your manuscript" accent={accent} primary={primary}>
        <Stack gap={rem(16)}>
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
              border: `2px dashed ${fileName ? accent : `${primary}20`}`,
              backgroundColor: fileName ? `${accent}06` : background,
              padding: rem(32),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: rem(10),
              transition: 'all 0.2s ease',
              width: '100%',
            }}
          >
            {fileName ? (
              <>
                <IconCheck size={28} color={accent} />
                <Text size="sm" fw={600} c={primary}>{fileName}</Text>
                <Text size="xs" c="dimmed">Click to change</Text>
              </>
            ) : (
              <>
                <IconUpload size={28} color="#aaa" />
                <Text size="sm" fw={600} c={primary}>Click to upload your document</Text>
                <Text size="xs" c="dimmed">.docx, .pdf, .doc, .rtf — or attach by email after submitting</Text>
              </>
            )}
          </UnstyledButton>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={rem(16)}>
            <NumberInput
              label="Word count"
              description="Approximate — used for pricing"
              placeholder="e.g. 12 000"
              radius={0}
              min={0}
              value={wordCount || ''}
              onChange={(val) => setWordCount(typeof val === 'number' ? val : 0)}
            />
            <DatePickerInput
              label="Deadline"
              description="Include a 24–48h buffer before your actual deadline"
              placeholder="Select a date"
              required
              radius={0}
              minDate={new Date()}
              value={deadline}
              onChange={(val) => setDeadline(val as Date | null)}
            />
          </SimpleGrid>
        </Stack>
      </FormSection>

      {/* ── CONTACT DETAILS ───────────────────────────────────────────── */}
      <FormSection title="Your details" accent={accent} primary={primary}>
        <Stack gap={rem(16)}>
          {/* Salutation + first name + last name row */}
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={rem(12)}>
            <Select
              label="Salutation"
              placeholder="—"
              radius={0}
              data={SALUTATIONS}
              value={salutation}
              onChange={(v) => setSalutation(v ?? '')}
              comboboxProps={{ radius: 0 }}
            />
            <TextInput
              label="First name"
              placeholder="Jane"
              required
              radius={0}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextInput
              label="Last name"
              placeholder="Doe"
              radius={0}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </SimpleGrid>
          <TextInput
            label="Email address"
            placeholder="you@university.edu"
            required
            radius={0}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            description="We recommend your academic email. Micah's quote goes here."
          />
          <Textarea
            label="Anything specific to mention? (optional)"
            placeholder="Style guide required, target journal, stage in the process, specific concerns..."
            radius={0}
            minRows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </Stack>
      </FormSection>

      {/* ── INTENT TOGGLE ─────────────────────────────────────────────── */}
      <FormSection title="How would you like to proceed?" accent={accent} primary={primary}>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={rem(2)}>
          <UnstyledButton
            onClick={() => setIntent('quote')}
            style={{
              padding: rem(20),
              backgroundColor: intent === 'quote' ? primary : background,
              border: `1px solid ${intent === 'quote' ? primary : `${primary}18`}`,
              transition: 'all 0.15s ease',
              textAlign: 'left',
              display: 'flex',
              gap: rem(14),
              alignItems: 'flex-start',
            }}
          >
            <Box
              style={{
                width: rem(36),
                height: rem(36),
                backgroundColor: intent === 'quote' ? 'rgba(255,255,255,0.15)' : `${accent}12`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, color: intent === 'quote' ? '#fff' : accent,
              }}
            >
              <IconMailForward size={18} />
            </Box>
            <Box>
              <Text fw={700} size="sm" style={{ color: intent === 'quote' ? '#fff' : primary, marginBottom: rem(4) }}>
                Request a quote first
              </Text>
              <Text size="xs" lh={1.5} style={{ color: intent === 'quote' ? 'rgba(255,255,255,0.72)' : `${primary}90` }}>
                We'll email a firm, scoped price within 24 hours. No obligation to proceed.
              </Text>
            </Box>
          </UnstyledButton>

          <UnstyledButton
            onClick={() => setIntent('start')}
            style={{
              padding: rem(20),
              backgroundColor: intent === 'start' ? primary : background,
              border: `1px solid ${intent === 'start' ? primary : `${primary}18`}`,
              transition: 'all 0.15s ease',
              textAlign: 'left',
              display: 'flex',
              gap: rem(14),
              alignItems: 'flex-start',
            }}
          >
            <Box
              style={{
                width: rem(36),
                height: rem(36),
                backgroundColor: intent === 'start' ? 'rgba(255,255,255,0.15)' : `${accent}12`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, color: intent === 'start' ? '#fff' : accent,
              }}
            >
              <IconReceipt size={18} />
            </Box>
            <Box>
              <Text fw={700} size="sm" style={{ color: intent === 'start' ? '#fff' : primary, marginBottom: rem(4) }}>
                Ready to start — invoice me
              </Text>
              <Text size="xs" lh={1.5} style={{ color: intent === 'start' ? 'rgba(255,255,255,0.72)' : `${primary}90` }}>
                Send a 50% deposit invoice. Work begins on receipt.
              </Text>
            </Box>
          </UnstyledButton>
        </SimpleGrid>
      </FormSection>

      {/* ── SUBMIT ────────────────────────────────────────────────────── */}
      <Box>
        <Button
          size="lg"
          radius={0}
          fullWidth
          rightSection={<IconArrowRight size={18} />}
          disabled={!isValid}
          onClick={handleSubmit}
          style={{
            backgroundColor: isValid ? accent : `${primary}20`,
            color: isValid ? '#fff' : `${primary}60`,
            fontFamily: 'var(--font-heading-sans), var(--font-sans)',
            letterSpacing: '0.06em',
            fontWeight: 700,
            height: rem(56),
            border: 'none',
            transition: 'background-color 0.2s ease',
            cursor: isValid ? 'pointer' : 'not-allowed',
          }}
        >
          {intent === 'start' ? 'SEND MY BRIEF — INVOICE ME' : 'SEND MY BRIEF — REQUEST QUOTE'}
        </Button>
        <Text size="xs" c="dimmed" mt={rem(10)} ta="center" style={{ letterSpacing: '0.04em' }}>
          Strict NDA · No AI tools used on your manuscript · Scoped quote within 24 hours
        </Text>
      </Box>

    </Stack>
  )
}

// ─── Helper components ────────────────────────────────────────────────────────

function FormSection({ title, children, accent, primary }: { title: string; children: React.ReactNode; accent: string; primary: string }) {
  return (
    <Box>
      <Text
        size="xs"
        fw={700}
        mb={rem(16)}
        style={{
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: accent,
          fontFamily: 'var(--font-heading-sans), var(--font-sans)',
          borderBottom: `1px solid ${primary}08`,
          paddingBottom: rem(10),
        }}
      >
        {title}
      </Text>
      {children}
    </Box>
  )
}

function SelectionTile({
  icon, label, desc, selected, onClick, accent, primary, surface, background,
}: {
  icon: React.ReactNode
  label: string
  desc: string
  selected: boolean
  onClick: () => void
  accent: string
  primary: string
  surface: string
  background: string
}) {
  return (
    <UnstyledButton
      onClick={onClick}
      style={{
        display: 'block',
        padding: rem(24),
        backgroundColor: selected ? primary : background,
        border: `1px solid ${selected ? primary : `${primary}18`}`,
        transition: 'all 0.2s ease',
        textAlign: 'left',
        position: 'relative',
      }}
    >
      <Group gap={rem(14)} wrap="nowrap" align="flex-start">
        <Box
          style={{
            width: rem(40), height: rem(40),
            flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: selected ? 'rgba(255,255,255,0.15)' : `${accent}12`,
            color: selected ? '#fff' : accent,
          }}
        >
          {icon}
        </Box>
        <Box style={{ flex: 1 }}>
          <Text fw={700} size="sm" style={{ color: selected ? '#fff' : primary, marginBottom: rem(4) }}>{label}</Text>
          <Text size="xs" lh={1.5} style={{ color: selected ? 'rgba(255,255,255,0.72)' : `${primary}99` }}>{desc}</Text>
        </Box>
        {selected && (
          <Box style={{ position: 'absolute', top: rem(16), right: rem(16) }}>
            <IconCheck size={16} color="#fff" />
          </Box>
        )}
      </Group>
    </UnstyledButton>
  )
}
