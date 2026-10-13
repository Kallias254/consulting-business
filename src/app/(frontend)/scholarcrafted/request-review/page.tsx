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
} from '@tabler/icons-react'
import Link from 'next/link'

// ─── Label maps ───────────────────────────────────────────────────────────────

const SERVICE_LABELS: Record<string, string> = {
  editing: 'Editing & Compliance',
  publication: 'Publication Support',
}

const EDITING_TIER_LABELS: Record<string, string> = {
  advanced: 'Advanced Editing',
  premium: 'Premium Editing',
  scientific: 'Scientific Editing Pro',
}

const JOURNAL_TIER_LABELS: Record<string, string> = {
  essentials: 'Essentials',
  pro: 'Pro',
  full: 'Full',
}

const BOOK_STAGE_LABELS: Record<string, string> = {
  '01': 'Stage 01 — Publisher Selection',
  '02': 'Stage 02 — Book Proposal',
  '03': 'Stage 03 — Manuscript Editing',
  '04': 'Stage 04 — Galley Proof Review',
  '05': 'Stage 05 — Back-of-Book Indexing',
}

// ─── Page wrapper ─────────────────────────────────────────────────────────────

export default function RequestReviewPage() {
  return (
    <Suspense fallback={<Box style={{ minHeight: '100vh' }} />}>
      <RequestReviewContent />
    </Suspense>
  )
}

// ─── Main content ─────────────────────────────────────────────────────────────

function RequestReviewContent() {
  const theme = useMantineTheme()
  const active = theme.other
  const searchParams = useSearchParams()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Read URL params for pre-selection
  const paramService = searchParams.get('service') ?? '' // 'editing' | 'publication'
  const paramSection = searchParams.get('section') ?? '' // 'journal' | 'book'
  const paramTier    = searchParams.get('tier') ?? ''    // 'advanced'|'premium'|'scientific'|'essentials'|'pro'|'full'
  const paramStage   = searchParams.get('stage') ?? ''   // '01'–'05'
  const paramWords   = parseInt(searchParams.get('wordCount') ?? '0', 10)

  // Derive human-readable pre-selection label
  function getPreSelectionLabel() {
    if (!paramService) return ''
    const svcLabel = SERVICE_LABELS[paramService] ?? paramService
    if (paramService === 'editing' && paramTier) {
      return `${svcLabel} — ${EDITING_TIER_LABELS[paramTier] ?? paramTier}`
    }
    if (paramService === 'publication') {
      if (paramSection === 'journal' && paramTier) {
        return `${svcLabel} — Journal Articles — ${JOURNAL_TIER_LABELS[paramTier] ?? paramTier}`
      }
      if (paramSection === 'book' && paramStage) {
        return `${svcLabel} — Book Manuscripts — ${BOOK_STAGE_LABELS[paramStage] ?? `Stage ${paramStage}`}`
      }
      if (paramSection === 'journal') return `${svcLabel} — Journal Articles`
      if (paramSection === 'book') return `${svcLabel} — Book Manuscripts`
      return svcLabel
    }
    return svcLabel
  }

  const preSelectionLabel = getPreSelectionLabel()
  const hasPreSelection = !!paramService

  // Form state
  const [service, setService] = useState(paramService)
  const [section, setSection] = useState(paramSection) // journal | book
  const [editingTier, setEditingTier] = useState(paramTier)
  const [journalTier, setJournalTier] = useState(paramSection === 'journal' ? paramTier : '')
  const [bookStage, setBookStage] = useState(paramStage)
  const [wordCount, setWordCount] = useState<number>(paramWords || 0)
  const [deadline, setDeadline] = useState<Date | null>(null)
  const [fileName, setFileName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const isValid =
    (hasPreSelection || service) &&
    firstName.trim() !== '' &&
    email.trim() !== '' &&
    deadline !== null

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      // Word count estimation: ~250 words/page, rough only
    }
  }

  function handleSubmit() {
    if (!isValid) return
    setSubmitted(true)
  }

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
                  Brief received.
                </Title>
                <Text size="md" c="dimmed" lh={1.7} style={{ maxWidth: '44ch' }}>
                  Micah will review your project personally and send a scoped quote to{' '}
                  <strong style={{ color: active.primary }}>{email}</strong> within 24 hours.
                  {!fileName && ' Reply to that email to attach your manuscript when ready.'}
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
      {/* Minimal header */}
      <Box
        py={rem(16)}
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
        <Container size={900}>
          <Group justify="space-between" align="center">
            <Link href="/scholarcrafted" style={{ textDecoration: 'none' }}>
              <Text fw={700} size="lg" c={active.primary} style={{ fontFamily: 'var(--font-serif)' }}>
                ScholarCrafted
              </Text>
            </Link>
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
      <Box pt={{ base: rem(56), md: rem(72) }} pb={rem(40)} bg={active.background}>
        <Container size={900}>
          {hasPreSelection ? (
            <Stack gap={rem(12)} style={{ maxWidth: 680 }}>
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
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: active.primary,
                  fontFamily: 'var(--font-display), var(--font-serif)',
                  fontWeight: 600,
                }}
              >
                One form. A scoped quote within 24 hours.
              </Title>
              {/* Pre-selection confirmation pill */}
              <Group gap={rem(8)} align="center" mt={rem(4)}>
                <Box
                  px={rem(14)}
                  py={rem(8)}
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
                <Link href="/scholarcrafted/request-review" style={{ textDecoration: 'none' }}>
                  <Text size="xs" c="dimmed" style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                    Change
                  </Text>
                </Link>
              </Group>
            </Stack>
          ) : (
            <Stack gap={rem(12)} style={{ maxWidth: 680 }}>
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
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: active.primary,
                  fontFamily: 'var(--font-display), var(--font-serif)',
                  fontWeight: 600,
                }}
              >
                Tell us what you need. We'll do the rest.
              </Title>
              <Text size="md" c="dimmed" lh={1.7}>
                Micah reviews every submission personally and sends a firm quote within 24 hours.
              </Text>
            </Stack>
          )}
        </Container>
      </Box>

      {/* Form body */}
      <Box py={rem(48)} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}10`, flex: 1 }}>
        <Container size={900}>
          <Stack gap={rem(40)}>

            {/* ── SERVICE SELECTION (only if no pre-selection) ─────────── */}
            {!hasPreSelection && (
              <FormSection title="What do you need?" accent={active.accent} primary={active.primary}>
                <Stack gap={rem(24)}>
                  {/* Service picker */}
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
                        onClick={() => { setService(svc.id); setSection(''); setEditingTier(''); setJournalTier(''); setBookStage('') }}
                        accent={active.accent}
                        primary={active.primary}
                        surface={active.surface}
                        background={active.background}
                      />
                    ))}
                  </SimpleGrid>

                  {/* Editing tier picker */}
                  {service === 'editing' && (
                    <Box>
                      <Text size="xs" fw={700} mb={rem(10)} style={{ letterSpacing: '0.12em', color: '#888', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                        WHICH TIER? (optional — we can recommend)
                      </Text>
                      <Group gap={rem(2)}>
                        {Object.entries(EDITING_TIER_LABELS).map(([id, label]) => (
                          <UnstyledButton
                            key={id}
                            onClick={() => setEditingTier(editingTier === id ? '' : id)}
                            px={rem(20)}
                            py={rem(12)}
                            style={{
                              backgroundColor: editingTier === id ? active.primary : active.background,
                              color: editingTier === id ? '#fff' : active.primary,
                              border: `1px solid ${editingTier === id ? active.primary : `${active.primary}20`}`,
                              fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                              fontSize: rem(13),
                              fontWeight: editingTier === id ? 700 : 500,
                              letterSpacing: '0.02em',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            {label}
                          </UnstyledButton>
                        ))}
                      </Group>
                    </Box>
                  )}

                  {/* Publication: journal vs book */}
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
                            px={rem(20)}
                            py={rem(12)}
                            style={{
                              backgroundColor: section === opt.id ? active.primary : active.background,
                              color: section === opt.id ? '#fff' : active.primary,
                              border: `1px solid ${section === opt.id ? active.primary : `${active.primary}20`}`,
                              fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                              fontSize: rem(13),
                              fontWeight: section === opt.id ? 700 : 500,
                              display: 'flex',
                              alignItems: 'center',
                              gap: rem(6),
                              transition: 'all 0.15s ease',
                            }}
                          >
                            {opt.icon} {opt.label}
                          </UnstyledButton>
                        ))}
                      </Group>
                    </Box>
                  )}

                  {/* Journal tier */}
                  {service === 'publication' && section === 'journal' && (
                    <Box>
                      <Text size="xs" fw={700} mb={rem(10)} style={{ letterSpacing: '0.12em', color: '#888', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                        TIER? (optional — we can recommend)
                      </Text>
                      <Group gap={rem(2)}>
                        {Object.entries(JOURNAL_TIER_LABELS).map(([id, label]) => (
                          <UnstyledButton
                            key={id}
                            onClick={() => setJournalTier(journalTier === id ? '' : id)}
                            px={rem(20)}
                            py={rem(12)}
                            style={{
                              backgroundColor: journalTier === id ? active.primary : active.background,
                              color: journalTier === id ? '#fff' : active.primary,
                              border: `1px solid ${journalTier === id ? active.primary : `${active.primary}20`}`,
                              fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                              fontSize: rem(13),
                              fontWeight: journalTier === id ? 700 : 500,
                              transition: 'all 0.15s ease',
                            }}
                          >
                            {label}
                          </UnstyledButton>
                        ))}
                      </Group>
                    </Box>
                  )}

                  {/* Book stage */}
                  {service === 'publication' && section === 'book' && (
                    <Box>
                      <Text size="xs" fw={700} mb={rem(10)} style={{ letterSpacing: '0.12em', color: '#888', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                        WHICH STAGE? (optional — we can recommend)
                      </Text>
                      <Stack gap={rem(2)}>
                        {Object.entries(BOOK_STAGE_LABELS).map(([id, label]) => (
                          <UnstyledButton
                            key={id}
                            onClick={() => setBookStage(bookStage === id ? '' : id)}
                            px={rem(16)}
                            py={rem(10)}
                            style={{
                              backgroundColor: bookStage === id ? active.primary : active.background,
                              color: bookStage === id ? '#fff' : active.primary,
                              border: `1px solid ${bookStage === id ? active.primary : `${active.primary}15`}`,
                              fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                              fontSize: rem(13),
                              fontWeight: bookStage === id ? 700 : 500,
                              textAlign: 'left',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            {label}
                          </UnstyledButton>
                        ))}
                      </Stack>
                    </Box>
                  )}
                </Stack>
              </FormSection>
            )}

            {/* ── DOCUMENT UPLOAD ───────────────────────────────────────── */}
            <FormSection title="Upload your manuscript" accent={active.accent} primary={active.primary}>
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
                    border: `2px dashed ${fileName ? active.accent : `${active.primary}20`}`,
                    backgroundColor: fileName ? `${active.accent}06` : active.background,
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
                      <IconCheck size={28} color={active.accent} />
                      <Text size="sm" fw={600} c={active.primary}>{fileName}</Text>
                      <Text size="xs" c="dimmed">Click to change</Text>
                    </>
                  ) : (
                    <>
                      <IconUpload size={28} color="#aaa" />
                      <Text size="sm" fw={600} c={active.primary}>Click to upload your document</Text>
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

            {/* ── CONTACT DETAILS ───────────────────────────────────────── */}
            <FormSection title="Your details" accent={active.accent} primary={active.primary}>
              <Stack gap={rem(16)}>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={rem(16)}>
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
                    required
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

            {/* ── SUBMIT ────────────────────────────────────────────────── */}
            <Box>
              <Button
                size="lg"
                radius={0}
                fullWidth
                rightSection={<IconArrowRight size={18} />}
                disabled={!isValid}
                onClick={handleSubmit}
                style={{
                  backgroundColor: isValid ? active.accent : `${active.primary}20`,
                  color: isValid ? '#fff' : `${active.primary}60`,
                  fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                  letterSpacing: '0.06em',
                  fontWeight: 700,
                  height: rem(56),
                  border: 'none',
                  transition: 'background-color 0.2s ease',
                  cursor: isValid ? 'pointer' : 'not-allowed',
                }}
              >
                INITIATE FACULTY REVIEW
              </Button>
              <Text size="xs" c="dimmed" mt={rem(10)} ta="center" style={{ letterSpacing: '0.04em' }}>
                Strict NDA · No AI tools used on your manuscript · Scoped quote within 24 hours
              </Text>
            </Box>

          </Stack>
        </Container>
      </Box>
    </Box>
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
            width: rem(40),
            height: rem(40),
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: selected ? 'rgba(255,255,255,0.15)' : `${accent}12`,
            color: selected ? '#fff' : accent,
          }}
        >
          {icon}
        </Box>
        <Box style={{ flex: 1 }}>
          <Text fw={700} size="sm" style={{ color: selected ? '#fff' : primary, marginBottom: rem(4) }}>
            {label}
          </Text>
          <Text size="xs" lh={1.5} style={{ color: selected ? 'rgba(255,255,255,0.72)' : `${primary}99` }}>
            {desc}
          </Text>
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
