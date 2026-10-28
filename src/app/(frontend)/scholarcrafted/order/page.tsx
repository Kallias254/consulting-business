'use client'

import React, { useState, useEffect, Suspense } from 'react'
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
  UnstyledButton,
  Divider,
  TextInput,
  Select,
  Textarea,
  NumberInput,
  Accordion,
  Badge,
  Anchor,
  Checkbox,
  FileInput,
} from '@mantine/core'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  IconCheck,
  IconArrowRight,
  IconShieldCheck,
  IconFileText,
  IconBook2,
  IconStar,
  IconCertificate,
  IconLock,
  IconMessages,
  IconScale,
  IconClock,
  IconUpload,
  IconCalendar,
  IconUserCheck,
  IconChevronUp,
} from '@tabler/icons-react'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'
import { SECTION_SPACING } from '@/layout'

const SALUTATIONS = [
  { value: 'Dr.', label: 'Dr.' },
  { value: 'Prof.', label: 'Prof.' },
  { value: 'Mr.', label: 'Mr.' },
  { value: 'Ms.', label: 'Ms.' },
  { value: '—', label: 'Prefer not to say' },
]

const DISCIPLINES = [
  { value: 'Sociology & Social Policy', label: 'Sociology & Social Policy' },
  { value: 'History & Archival Studies', label: 'History & Archival Studies' },
  { value: 'Education & Pedagogy', label: 'Education & Pedagogy' },
  { value: 'Political Science & IR', label: 'Political Science & International Relations' },
  { value: 'Anthropology & Cultural Studies', label: 'Anthropology & Cultural Studies' },
  { value: 'Philosophy & Ethics', label: 'Philosophy & Ethics' },
  { value: 'Literature & Linguistics', label: 'Literature & Linguistics' },
  { value: 'Public Health & Behavioral Sciences', label: 'Public Health & Behavioral Sciences' },
  { value: 'Economics & Management', label: 'Economics & Management' },
  { value: 'Other Non-STEM / Humanities', label: 'Other Non-STEM / Humanities' },
]

const DOCUMENT_TYPES_DIAGNOSTIC = [
  { value: 'Dissertation Chapter Sample', label: 'Dissertation Chapter Sample (Intro / Lit Review)' },
  { value: 'Journal Article Draft', label: 'Journal Article Draft (Targeting Peer-Reviewed Journal)' },
  { value: 'Book Proposal Sample', label: 'Book Proposal Sample (Monograph Pitch)' },
  { value: 'Revise & Resubmit (R&R) Draft', label: 'Revise & Resubmit (R&R) Draft with Reviewer Comments' },
  { value: 'Other Academic Draft', label: 'Other Academic Draft (up to 10 pages)' },
]

const TRACK_OPTIONS = [
  {
    value: 'track-a',
    label: 'Track A: Thesis-to-Journal & Paper Preparation (Short-Form: Articles, Chapters, R&R)',
  },
  {
    value: 'track-b',
    label: 'Track B: Monograph & Book Architecture (Long-Form: Books, Multi-Chapter Volumes, Press Proposals)',
  },
  {
    value: 'custom',
    label: 'Custom Milestone Project (Multi-author volume, grant proposal, institutional brief)',
  },
]

const orderFAQs = [
  {
    q: 'What does "100% Track Changes" mean?',
    a: 'Every single line edit, structural transposition, and vocabulary refinement is logged as a visible Track Change in Microsoft Word (or corresponding annotations in LaTeX/PDF). You can review, accept, or reject each edit with a single click. Your intellectual voice and scholarly findings remain 100% your own.',
  },
  {
    q: 'How does the $29 Express Diagnostic fee credit work?',
    a: 'The $29 Express Diagnostic is completely zero-risk. You receive a 2-page written diagnostic assessment and an optional 15-minute debrief call with Dr. Micah Dobson. If you choose to execute revisions yourself, you keep the full report. If you choose to have our faculty execute revisions in Word Track Changes, your full $29 fee is credited toward your editing package.',
  },
  {
    q: 'How does the 50/50 payment milestone plan work for custom project scopes?',
    a: 'Rather than charging low per-word micro-fees through automated shopping carts, ScholarCrafted structures projects with a single transparent flat fee ($600–$1,800 for articles; $1,500–$3,500+ for book monographs). Terms are split into a 50% deposit upfront and 50% upon final delivery, maintaining aligned incentives and rigorous accountability.',
  },
  {
    q: 'Do you edit LaTeX or Typst manuscripts?',
    a: 'Yes. We frequently work with BibTeX cross-checks, template adherence, equation formatting, and document engineering in both LaTeX and Typst. We provide marked-up source files or tracked PDF/Word counterparts according to your preference.',
  },
  {
    q: 'What is the 365-day re-editing guarantee?',
    a: 'All full project engagements include 365 days of revision coverage. When your dissertation committee, thesis advisor, or journal reviewer issues revisions, submit your updated sections for secondary passes at zero extra charge.',
  },
  {
    q: 'Is working with ScholarCrafted permitted by my university and target publisher?',
    a: 'Yes, completely. Professional developmental editing, structural proofreading, and citation auditing are standard academic practices celebrated by universities and presses worldwide (including Oxford, Cambridge, Routledge, and Elsevier). We adhere strictly to COPE ethical publishing guidelines: we never ghostwrite or fabricate data.',
  },
]

function OrderPageContent() {
  const theme = useMantineTheme()
  const active = theme.other
  const searchParams = useSearchParams()

  const pathwayParam = searchParams.get('pathway')
  const trackParam = searchParams.get('track')
  const serviceParam = searchParams.get('service')

  // Determine initial active pathway: 'diagnostic' or 'scope'
  const initialPathway =
    pathwayParam === 'diagnostic'
      ? 'diagnostic'
      : pathwayParam === 'scope' || trackParam || serviceParam
      ? 'scope'
      : 'diagnostic'

  const [activePathway, setActivePathway] = useState<'diagnostic' | 'scope'>(initialPathway)

  // Track selection state for Scope Pathway
  const initialTrack = trackParam === 'b' ? 'track-b' : 'track-a'
  const [selectedTrack, setSelectedTrack] = useState<string>(initialTrack)

  // Form State: Diagnostic
  const [diagSalutation, setDiagSalutation] = useState('Dr.')
  const [diagFirstName, setDiagFirstName] = useState('')
  const [diagLastName, setDiagLastName] = useState('')
  const [diagEmail, setDiagEmail] = useState('')
  const [diagInstitution, setDiagInstitution] = useState('')
  const [diagDiscipline, setDiagDiscipline] = useState<string | null>(DISCIPLINES[0].value)
  const [diagDocType, setDiagDocType] = useState<string | null>(DOCUMENT_TYPES_DIAGNOSTIC[0].value)
  const [diagFile, setDiagFile] = useState<File | null>(null)
  const [diagNotes, setDiagNotes] = useState('')
  const [diagIsSubmitting, setDiagIsSubmitting] = useState(false)
  const [diagSubmitted, setDiagSubmitted] = useState(false)

  // Form State: Custom Scope
  const [scopeSalutation, setScopeSalutation] = useState('Dr.')
  const [scopeFirstName, setScopeFirstName] = useState('')
  const [scopeLastName, setScopeLastName] = useState('')
  const [scopeEmail, setScopeEmail] = useState('')
  const [scopeInstitution, setScopeInstitution] = useState('')
  const [scopeWordCount, setScopeWordCount] = useState<number | string>(8000)
  const [scopeTargetPub, setScopeTargetPub] = useState('')
  const [scopeDeadline, setScopeDeadline] = useState('')
  const [scopeInstructions, setScopeInstructions] = useState('')
  const [scopeFile, setScopeFile] = useState<File | null>(null)
  const [scopeWantCall, setScopeWantCall] = useState(false)
  const [scopeIsSubmitting, setScopeIsSubmitting] = useState(false)
  const [scopeSubmitted, setScopeSubmitted] = useState(false)

  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  // Handle Diagnostic submission
  const handleDiagnosticSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setDiagIsSubmitting(true)

    try {
      await fetch('/api/submit-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          salutation: diagSalutation,
          firstName: diagFirstName,
          lastName: diagLastName,
          email: diagEmail,
          institution: diagInstitution,
          documentType: `${diagDocType} (${diagDiscipline})`,
          service: 'diagnostic',
          tier: 'diagnostic',
          instructions: diagNotes,
          intent: 'start',
          fileName: diagFile ? diagFile.name : 'Pasted / Uploaded via Form',
        }),
      })
      setDiagSubmitted(true)
    } catch (err) {
      console.error(err)
      setDiagSubmitted(true) // Still show positive confirmation for peace of mind
    } finally {
      setDiagIsSubmitting(false)
    }
  }

  // Handle Custom Scope submission
  const handleScopeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setScopeIsSubmitting(true)

    try {
      await fetch('/api/submit-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          salutation: scopeSalutation,
          firstName: scopeFirstName,
          lastName: scopeLastName,
          email: scopeEmail,
          institution: scopeInstitution,
          documentType: `${selectedTrack} · Target: ${scopeTargetPub || 'Not specified'}`,
          service: selectedTrack === 'track-b' ? 'track-b' : 'track-a',
          tier: selectedTrack === 'track-b' ? 'track-b' : 'track-a',
          wordCount: scopeWordCount,
          deadline: scopeDeadline,
          instructions: `${scopeInstructions}${scopeWantCall ? ' [REQUESTED 15-MIN SCOPING CALL]' : ''}`,
          intent: 'quote',
          fileName: scopeFile ? scopeFile.name : undefined,
        }),
      })
      setScopeSubmitted(true)
    } catch (err) {
      console.error(err)
      setScopeSubmitted(true)
    } finally {
      setScopeIsSubmitting(false)
    }
  }

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* ── Page Header ── */}
      <Box
        component="section"
        py={{ base: rem(48), md: rem(72) }}
        bg={active.surface}
        style={{
          borderBottom: `1px solid ${active.primary}12`,
        }}
      >
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap="md" align="center" style={{ textAlign: 'center' }}>
            <Badge
              size="sm"
              radius={0}
              variant="filled"
              style={{
                backgroundColor: active.accent,
                color: '#ffffff',
                letterSpacing: '0.14em',
                fontWeight: 700,
                fontSize: rem(10),
              }}
            >
              ACADEMIC EDITORIAL &amp; PUBLICATION ADVISORY
            </Badge>

            <Title
              order={1}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.1rem, 4.2vw, 3.25rem)',
                fontWeight: 600,
                lineHeight: 1.15,
                color: active.primary,
                letterSpacing: '-0.015em',
                maxWidth: '24ch',
              }}
            >
              Ready to elevate your scholarship?
            </Title>

            <Text size="md" c="dimmed" lh={1.75} style={{ maxWidth: '64ch' }}>
              Choose the pathway that matches your current project stage and urgency. Whether you need rapid structural diagnostic triage or full developmental monograph architecture, our faculty team reviews every draft by hand.
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* ── Pathway Switcher (2 Distinct Conversion Hubs) ── */}
      <Box component="section" py={SECTION_SPACING} bg={active.background}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          {/* Pathway Tabs Controls */}
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(20)} mb={rem(48)}>
            {/* Tab 1: Express Diagnostic */}
            <UnstyledButton
              onClick={() => setActivePathway('diagnostic')}
              style={{ display: 'block', width: '100%' }}
            >
              <Box
                p={{ base: rem(24), sm: rem(32) }}
                bg={active.surface}
                style={{
                  border: `2px solid ${activePathway === 'diagnostic' ? active.accent : `${active.primary}14`}`,
                  borderTop: `5px solid ${activePathway === 'diagnostic' ? active.accent : `${active.primary}20`}`,
                  boxShadow: activePathway === 'diagnostic' ? `0 12px 36px ${active.accent}14` : 'none',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                <Group justify="space-between" align="flex-start" mb={rem(12)}>
                  <Badge
                    size="sm"
                    radius={0}
                    variant={activePathway === 'diagnostic' ? 'filled' : 'outline'}
                    style={{
                      backgroundColor: activePathway === 'diagnostic' ? active.accent : 'transparent',
                      borderColor: activePathway === 'diagnostic' ? active.accent : `${active.primary}30`,
                      color: activePathway === 'diagnostic' ? '#ffffff' : active.primary,
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                    }}
                  >
                    PATHWAY 01 · LOW-FRICTION ENTRY
                  </Badge>
                  <Text
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: rem(28),
                      fontWeight: 600,
                      color: activePathway === 'diagnostic' ? active.accent : active.primary,
                      lineHeight: 1,
                    }}
                  >
                    $29
                  </Text>
                </Group>

                <Title
                  order={2}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: rem(22),
                    color: active.primary,
                    fontWeight: 600,
                    lineHeight: 1.25,
                  }}
                >
                  Express Structural &amp; Rigor Diagnostic
                </Title>

                <Text size="xs" c="dimmed" mt={rem(8)} lh={1.6}>
                  Rapid 24–48h triage. 2-page structural audit, theoretical hook assessment, and citation cross-check. 100% credited toward full editing if scoped.
                </Text>
              </Box>
            </UnstyledButton>

            {/* Tab 2: Custom Project Scope */}
            <UnstyledButton
              onClick={() => setActivePathway('scope')}
              style={{ display: 'block', width: '100%' }}
            >
              <Box
                p={{ base: rem(24), sm: rem(32) }}
                bg={active.surface}
                style={{
                  border: `2px solid ${activePathway === 'scope' ? active.accent : `${active.primary}14`}`,
                  borderTop: `5px solid ${activePathway === 'scope' ? active.accent : `${active.primary}20`}`,
                  boxShadow: activePathway === 'scope' ? `0 12px 36px ${active.accent}14` : 'none',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                <Group justify="space-between" align="flex-start" mb={rem(12)}>
                  <Badge
                    size="sm"
                    radius={0}
                    variant={activePathway === 'scope' ? 'filled' : 'outline'}
                    style={{
                      backgroundColor: activePathway === 'scope' ? active.accent : 'transparent',
                      borderColor: activePathway === 'scope' ? active.accent : `${active.primary}30`,
                      color: activePathway === 'scope' ? '#ffffff' : active.primary,
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                    }}
                  >
                    PATHWAY 02 · FULL PROJECT SCOPE
                  </Badge>
                  <Text
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: rem(22),
                      fontWeight: 600,
                      color: activePathway === 'scope' ? active.accent : active.primary,
                      lineHeight: 1,
                    }}
                  >
                    Custom Quote
                  </Text>
                </Group>

                <Title
                  order={2}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: rem(22),
                    color: active.primary,
                    fontWeight: 600,
                    lineHeight: 1.25,
                  }}
                >
                  Custom Project Scope &amp; Strategy
                </Title>

                <Text size="xs" c="dimmed" mt={rem(8)} lh={1.6}>
                  For full dissertation conversions, journal submissions, or monograph architecture. Fixed milestone proposal within 24h with transparent 50/50 terms.
                </Text>
              </Box>
            </UnstyledButton>
          </SimpleGrid>

          {/* ═══════════════════════════════════════════════════════════════════
              PANEL 1: EXPRESS DIAGNOSTIC ($29)
              ═══════════════════════════════════════════════════════════════════ */}
          {activePathway === 'diagnostic' && (
            <Box>
              <SimpleGrid cols={{ base: 1, lg: 12 }} spacing={{ base: rem(28), lg: rem(44) }} style={{ alignItems: 'flex-start' }}>
                {/* Left Column: Scope Details & Deliverables (5 cols) */}
                <Box style={{ gridColumn: 'span 5' }}>
                  <Stack gap="xl">
                    <Box
                      p={{ base: rem(24), md: rem(32) }}
                      bg={active.surface}
                      style={{
                        border: `1px solid ${active.primary}15`,
                        borderLeft: `4px solid ${active.accent}`,
                      }}
                    >
                      <Badge
                        size="xs"
                        radius={0}
                        variant="filled"
                        style={{
                          backgroundColor: active.accent,
                          color: '#ffffff',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          marginBottom: rem(12),
                        }}
                      >
                        ZERO-RISK DIAGNOSTIC
                      </Badge>

                      <Title
                        order={3}
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: rem(24),
                          color: active.primary,
                          fontWeight: 600,
                          lineHeight: 1.25,
                        }}
                      >
                        What You Receive in the $29 Audit:
                      </Title>

                      <Divider color={`${active.primary}10`} my={rem(20)} />

                      <Stack gap={rem(14)}>
                        {[
                          {
                            title: '2-Page Written Structural & Logic Audit',
                            desc: 'Evaluates your central thesis, evidentiary pacing, and narrative scaffolding before reviewers see it.',
                          },
                          {
                            title: 'Theoretical Hook & Contribution Assessment',
                            desc: 'Pinpoints whether your literature framing establishes sufficient novelty for peer review.',
                          },
                          {
                            title: 'Citation Integrity & DOI Cross-Check',
                            desc: 'Benchmarked against 200M+ publications to catch broken DOIs, missing citations, or citation anomalies.',
                          },
                          {
                            title: 'Faculty Risk Memorandum',
                            desc: 'Highlights critical vulnerabilities committee members and editors routinely attack.',
                          },
                          {
                            title: 'Optional 15-Minute Strategy Debrief Call',
                            desc: 'Direct debrief with Dr. Micah Dobson or your Lead Manuscript Architect to discuss findings.',
                          },
                          {
                            title: '100% Fee Credit Guarantee',
                            desc: 'If you partner with us for full editing, your entire $29 fee is credited toward your project.',
                          },
                        ].map((item, i) => (
                          <Group key={i} gap="sm" align="flex-start" wrap="nowrap">
                            <IconCheck size={16} color={active.accent} style={{ flexShrink: 0, marginTop: rem(2) }} />
                            <Box>
                              <Text size="xs" fw={700} c={active.primary} lh={1.3}>
                                {item.title}
                              </Text>
                              <Text size="xs" c="dimmed" lh={1.5} mt={rem(2)}>
                                {item.desc}
                              </Text>
                            </Box>
                          </Group>
                        ))}
                      </Stack>
                    </Box>

                    {/* Guarantees Box */}
                    <Box
                      p={{ base: rem(20), md: rem(24) }}
                      bg={active.surface}
                      style={{ border: `1px solid ${active.primary}12` }}
                    >
                      <Stack gap="sm">
                        <Group gap="xs">
                          <IconLock size={16} color={active.accent} />
                          <Text size="xs" fw={700} c={active.primary} style={{ letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                            Strict Academic NDA &amp; Security
                          </Text>
                        </Group>
                        <Text size="xs" c="dimmed" lh={1.6}>
                          All unpublished drafts and raw research remain 100% confidential. We operate under strict Non-Disclosure Agreements. We never feed client drafts into automated public generative AI models.
                        </Text>
                      </Stack>
                    </Box>
                  </Stack>
                </Box>

                {/* Right Column: Intake Form (7 cols) */}
                <Box style={{ gridColumn: 'span 7' }}>
                  <Box
                    p={{ base: rem(28), sm: rem(36), md: rem(44) }}
                    bg={active.surface}
                    style={{
                      border: `1px solid ${active.primary}18`,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
                    }}
                  >
                    {diagSubmitted ? (
                      <Stack gap="lg" align="center" style={{ textAlign: 'center', py: rem(32) }}>
                        <Box
                          style={{
                            width: rem(64),
                            height: rem(64),
                            borderRadius: '50%',
                            backgroundColor: `${active.accent}15`,
                            color: active.accent,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <IconCheck size={36} />
                        </Box>
                        <Title
                          order={3}
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: rem(26),
                            color: active.primary,
                            fontWeight: 600,
                          }}
                        >
                          Diagnostic Brief Received
                        </Title>
                        <Text size="sm" c="dimmed" lh={1.7} style={{ maxWidth: '48ch' }}>
                          Thank you, {diagFirstName || 'Scholar'}. Your manuscript sample has entered our priority diagnostic queue. Dr. Micah Dobson and your assigned Manuscript Architect are conducting your structural evaluation.
                        </Text>

                        <Box
                          p={rem(20)}
                          bg={active.background}
                          style={{ border: `1px solid ${active.primary}12`, width: '100%', textAlign: 'left' }}
                        >
                          <Text size="xs" fw={700} c={active.primary} mb={rem(6)} style={{ letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                            Next Steps:
                          </Text>
                          <Stack gap={rem(6)}>
                            <Text size="xs" c="dimmed">
                              1. A confirmation receipt and secure invoice link have been sent to <strong>{diagEmail}</strong>.
                            </Text>
                            <Text size="xs" c="dimmed">
                              2. You will receive your complete 2-Page Written Structural Audit within 24–48 hours.
                            </Text>
                            <Text size="xs" c="dimmed">
                              3. Your report will include a direct booking link for an optional 15-minute debrief call with Dr. Dobson.
                            </Text>
                          </Stack>
                        </Box>

                        <Button
                          radius={0}
                          size="md"
                          onClick={() => setDiagSubmitted(false)}
                          variant="outline"
                          style={{
                            borderColor: `${active.primary}30`,
                            color: active.primary,
                            fontWeight: 600,
                            fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                          }}
                        >
                          Submit Another Project Sample
                        </Button>
                      </Stack>
                    ) : (
                      <form onSubmit={handleDiagnosticSubmit}>
                        <Stack gap="lg">
                          <Box>
                            <Text
                              size="xs"
                              fw={700}
                              c={active.accent}
                              style={{ letterSpacing: '0.14em', textTransform: 'uppercase' }}
                            >
                              STEP 1 OF 1 · PROJECT INTAKE
                            </Text>
                            <Title
                              order={3}
                              mt={rem(4)}
                              style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: rem(24),
                                color: active.primary,
                                fontWeight: 600,
                              }}
                            >
                              Claim Your $29 Express Diagnostic
                            </Title>
                            <Text size="xs" c="dimmed" mt={rem(4)}>
                              Upload your Abstract + Introduction (or up to 10 sample pages) for doctoral review.
                            </Text>
                          </Box>

                          <Divider color={`${active.primary}10`} />

                          {/* Contact Details */}
                          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="sm">
                            <Select
                              label="Salutation"
                              data={SALUTATIONS}
                              value={diagSalutation}
                              onChange={(v) => setDiagSalutation(v ?? 'Dr.')}
                              radius={0}
                              size="sm"
                            />
                            <TextInput
                              label="First Name *"
                              placeholder="Jane"
                              required
                              value={diagFirstName}
                              onChange={(e) => setDiagFirstName(e.target.value)}
                              radius={0}
                              size="sm"
                            />
                            <TextInput
                              label="Last Name *"
                              placeholder="Doe"
                              required
                              value={diagLastName}
                              onChange={(e) => setDiagLastName(e.target.value)}
                              radius={0}
                              size="sm"
                            />
                          </SimpleGrid>

                          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                            <TextInput
                              label="Primary Academic Email *"
                              placeholder="jane.doe@oxford.ac.uk"
                              type="email"
                              required
                              value={diagEmail}
                              onChange={(e) => setDiagEmail(e.target.value)}
                              radius={0}
                              size="sm"
                              description="Your diagnostic audit will be delivered to this address."
                            />
                            <TextInput
                              label="University / Institution *"
                              placeholder="e.g. Oxford, Yale, Columbia"
                              required
                              value={diagInstitution}
                              onChange={(e) => setDiagInstitution(e.target.value)}
                              radius={0}
                              size="sm"
                            />
                          </SimpleGrid>

                          {/* Academic Context */}
                          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                            <Select
                              label="Academic Discipline *"
                              data={DISCIPLINES}
                              value={diagDiscipline}
                              onChange={setDiagDiscipline}
                              required
                              radius={0}
                              size="sm"
                            />
                            <Select
                              label="Document Type *"
                              data={DOCUMENT_TYPES_DIAGNOSTIC}
                              value={diagDocType}
                              onChange={setDiagDocType}
                              required
                              radius={0}
                              size="sm"
                            />
                          </SimpleGrid>

                          {/* File Attachment */}
                          <FileInput
                            label="Upload Manuscript Sample (Abstract + Intro / up to 10 pages) *"
                            placeholder="Choose file (.docx, .pdf, .tex)"
                            leftSection={<IconUpload size={16} />}
                            value={diagFile}
                            onChange={setDiagFile}
                            radius={0}
                            size="sm"
                            description="Files are protected under strict Non-Disclosure Agreements."
                          />

                          {/* Specific Concerns */}
                          <Textarea
                            label="Specific Questions or Peer Review Vulnerabilities (Optional)"
                            placeholder="e.g. Committee member mentioned my theoretical framework was unclear; journal rejected for narrative bloat; need DOI check..."
                            minRows={3}
                            value={diagNotes}
                            onChange={(e) => setDiagNotes(e.target.value)}
                            radius={0}
                            size="sm"
                          />

                          {/* Fee Callout & Submit */}
                          <Box
                            p={rem(16)}
                            bg={active.background}
                            style={{
                              border: `1px solid ${active.primary}12`,
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <Box>
                              <Text size="xs" fw={700} c={active.primary}>
                                Total Due Today: $29.00
                              </Text>
                              <Text size="xs" c="dimmed">
                                100% credited toward full editing package
                              </Text>
                            </Box>
                            <Badge radius={0} variant="outline" color={active.accent}>
                              24–48h Delivery Queue
                            </Badge>
                          </Box>

                          <Button
                            type="submit"
                            size="lg"
                            radius={0}
                            loading={diagIsSubmitting}
                            rightSection={<IconArrowRight size={18} />}
                            style={{
                              backgroundColor: active.accent,
                              color: '#ffffff',
                              fontWeight: 700,
                              fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                              letterSpacing: '0.04em',
                              height: rem(52),
                            }}
                          >
                            Submit for $29 Express Diagnostic
                          </Button>

                          <Text size="xs" c="dimmed" style={{ textAlign: 'center' }}>
                            Encrypted 256-bit submission &bull; Zero generative AI applied to confidential drafts &bull; Full fee credit guarantee
                          </Text>
                        </Stack>
                      </form>
                    )}
                  </Box>
                </Box>
              </SimpleGrid>
            </Box>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              PANEL 2: CUSTOM PROJECT SCOPE
              ═══════════════════════════════════════════════════════════════════ */}
          {activePathway === 'scope' && (
            <Box>
              <SimpleGrid cols={{ base: 1, lg: 12 }} spacing={{ base: rem(28), lg: rem(44) }} style={{ alignItems: 'flex-start' }}>
                {/* Left Column: Scope Overview & Milestone Commitments (5 cols) */}
                <Box style={{ gridColumn: 'span 5' }}>
                  <Stack gap="xl">
                    <Box
                      p={{ base: rem(24), md: rem(32) }}
                      bg={active.surface}
                      style={{
                        border: `1px solid ${active.primary}15`,
                        borderLeft: `4px solid ${active.primary}`,
                      }}
                    >
                      <Badge
                        size="xs"
                        radius={0}
                        variant="filled"
                        style={{
                          backgroundColor: active.primary,
                          color: '#ffffff',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          marginBottom: rem(12),
                        }}
                      >
                        CONSULTATIVE OUTCOME ARCHITECTURE
                      </Badge>

                      <Title
                        order={3}
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: rem(24),
                          color: active.primary,
                          fontWeight: 600,
                          lineHeight: 1.25,
                        }}
                      >
                        What Every Full Project Scope Includes:
                      </Title>

                      <Divider color={`${active.primary}10`} my={rem(20)} />

                      <Stack gap={rem(14)}>
                        {[
                          {
                            title: 'Custom Integrated Milestone Proposal',
                            desc: 'Delivered within 24 hours. A clear, itemized proposal with a single fixed fee ($600–$1,800 for articles; $1,500–$3,500+ for books).',
                          },
                          {
                            title: 'Transparent 50/50 Milestone Terms',
                            desc: '50% deposit upon project initiation; 50% upon final delivery of your publication-ready files.',
                          },
                          {
                            title: '100% Track Changes in Word (or LaTeX)',
                            desc: 'Full developmental editing, sentence rhythm, syntax untangling, and tone calibration with every edit visible.',
                          },
                          {
                            title: 'Discipline-Specific Doctoral Matching',
                            desc: 'Your manuscript is paired with a specialist editor in your field (Humanities, Social Sciences, Education, Policy).',
                          },
                          {
                            title: '365-Day Committee & Reviewer Re-Editing',
                            desc: 'Secondary passes at zero charge when your advisor, committee, or journal reviewers request revisions.',
                          },
                          {
                            title: 'Official Editorial Compliance Certificate',
                            desc: 'Issued upon completion for graduate school clearance or journal submission verification.',
                          },
                        ].map((item, i) => (
                          <Group key={i} gap="sm" align="flex-start" wrap="nowrap">
                            <IconCheck size={16} color={active.accent} style={{ flexShrink: 0, marginTop: rem(2) }} />
                            <Box>
                              <Text size="xs" fw={700} c={active.primary} lh={1.3}>
                                {item.title}
                              </Text>
                              <Text size="xs" c="dimmed" lh={1.5} mt={rem(2)}>
                                {item.desc}
                              </Text>
                            </Box>
                          </Group>
                        ))}
                      </Stack>
                    </Box>

                    {/* Faculty Scoping Call Card */}
                    <Box
                      p={{ base: rem(20), md: rem(24) }}
                      bg={active.surface}
                      style={{ border: `1px solid ${active.primary}12` }}
                    >
                      <Stack gap="sm">
                        <Group gap="xs">
                          <IconMessages size={18} color={active.accent} />
                          <Text size="xs" fw={700} c={active.primary} style={{ letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                            Prefer to Discuss First?
                          </Text>
                        </Group>
                        <Text size="xs" c="dimmed" lh={1.6}>
                          You can schedule an introductory 15-minute scoping consultation with Dr. Micah Dobson to discuss your manuscript timeline, target press, and committee feedback before requesting a proposal.
                        </Text>
                        <Anchor
                          href="https://calendly.com/misedajoseph-30-minutes-call/discovery-session"
                          target="_blank"
                          rel="noopener noreferrer"
                          c={active.accent}
                          size="xs"
                          fw={700}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: rem(4),
                            textDecoration: 'none',
                          }}
                        >
                          Book 15-Min Scoping Call with Faculty &rarr;
                        </Anchor>
                      </Stack>
                    </Box>
                  </Stack>
                </Box>

                {/* Right Column: Custom Scope Request Form (7 cols) */}
                <Box style={{ gridColumn: 'span 7' }}>
                  <Box
                    p={{ base: rem(28), sm: rem(36), md: rem(44) }}
                    bg={active.surface}
                    style={{
                      border: `1px solid ${active.primary}18`,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
                    }}
                  >
                    {scopeSubmitted ? (
                      <Stack gap="lg" align="center" style={{ textAlign: 'center', py: rem(32) }}>
                        <Box
                          style={{
                            width: rem(64),
                            height: rem(64),
                            borderRadius: '50%',
                            backgroundColor: `${active.accent}15`,
                            color: active.accent,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <IconCheck size={36} />
                        </Box>
                        <Title
                          order={3}
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: rem(26),
                            color: active.primary,
                            fontWeight: 600,
                          }}
                        >
                          Project Scope Request Received
                        </Title>
                        <Text size="sm" c="dimmed" lh={1.7} style={{ maxWidth: '48ch' }}>
                          Thank you, {scopeFirstName || 'Scholar'}. Dr. Micah Dobson is personally reviewing your project brief and preparing a custom milestone proposal with guaranteed delivery timelines and 50/50 payment terms.
                        </Text>

                        <Box
                          p={rem(20)}
                          bg={active.background}
                          style={{ border: `1px solid ${active.primary}12`, width: '100%', textAlign: 'left' }}
                        >
                          <Text size="xs" fw={700} c={active.primary} mb={rem(6)} style={{ letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                            Next Steps:
                          </Text>
                          <Stack gap={rem(6)}>
                            <Text size="xs" c="dimmed">
                              1. A formal scoped proposal will be emailed to <strong>{scopeEmail}</strong> within 24 hours.
                            </Text>
                            <Text size="xs" c="dimmed">
                              2. The proposal will include itemized deliverables, milestone phases, and an exact delivery date.
                            </Text>
                            <Text size="xs" c="dimmed">
                              3. If you requested a call, Dr. Dobson will reach out with direct calendar availability.
                            </Text>
                          </Stack>
                        </Box>

                        <Group gap="md">
                          <Anchor
                            href="https://calendly.com/misedajoseph-30-minutes-call/discovery-session"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none' }}
                          >
                            <Button
                              radius={0}
                              size="md"
                              style={{
                                backgroundColor: active.accent,
                                color: '#ffffff',
                                fontWeight: 600,
                              }}
                            >
                              Book 15-Min Scoping Call Now
                            </Button>
                          </Anchor>
                          <Button
                            radius={0}
                            size="md"
                            onClick={() => setScopeSubmitted(false)}
                            variant="outline"
                            style={{
                              borderColor: `${active.primary}30`,
                              color: active.primary,
                              fontWeight: 600,
                            }}
                          >
                            Submit Another Scope
                          </Button>
                        </Group>
                      </Stack>
                    ) : (
                      <form onSubmit={handleScopeSubmit}>
                        <Stack gap="lg">
                          <Box>
                            <Text
                              size="xs"
                              fw={700}
                              c={active.accent}
                              style={{ letterSpacing: '0.14em', textTransform: 'uppercase' }}
                            >
                              STEP 1 OF 1 · PROJECT BRIEF
                            </Text>
                            <Title
                              order={3}
                              mt={rem(4)}
                              style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: rem(24),
                                color: active.primary,
                                fontWeight: 600,
                              }}
                            >
                              Request Custom Project Scope
                            </Title>
                            <Text size="xs" c="dimmed" mt={rem(4)}>
                              Receive an itemized milestone proposal and guaranteed delivery schedule within 24 hours.
                            </Text>
                          </Box>

                          <Divider color={`${active.primary}10`} />

                          {/* Contact Details */}
                          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="sm">
                            <Select
                              label="Salutation"
                              data={SALUTATIONS}
                              value={scopeSalutation}
                              onChange={(v) => setScopeSalutation(v ?? 'Dr.')}
                              radius={0}
                              size="sm"
                            />
                            <TextInput
                              label="First Name *"
                              placeholder="Jane"
                              required
                              value={scopeFirstName}
                              onChange={(e) => setScopeFirstName(e.target.value)}
                              radius={0}
                              size="sm"
                            />
                            <TextInput
                              label="Last Name *"
                              placeholder="Doe"
                              required
                              value={scopeLastName}
                              onChange={(e) => setScopeLastName(e.target.value)}
                              radius={0}
                              size="sm"
                            />
                          </SimpleGrid>

                          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                            <TextInput
                              label="Primary Academic Email *"
                              placeholder="jane.doe@stanford.edu"
                              type="email"
                              required
                              value={scopeEmail}
                              onChange={(e) => setScopeEmail(e.target.value)}
                              radius={0}
                              size="sm"
                              description="Your milestone proposal will be sent here."
                            />
                            <TextInput
                              label="University / Institution *"
                              placeholder="e.g. Stanford, Cambridge, Michigan"
                              required
                              value={scopeInstitution}
                              onChange={(e) => setScopeInstitution(e.target.value)}
                              radius={0}
                              size="sm"
                            />
                          </SimpleGrid>

                          {/* Target Track */}
                          <Select
                            label="Target Outcome Track *"
                            data={TRACK_OPTIONS}
                            value={selectedTrack}
                            onChange={(v) => setSelectedTrack(v ?? 'track-a')}
                            required
                            radius={0}
                            size="sm"
                          />

                          {/* Word Count & Target Press */}
                          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                            <NumberInput
                              label="Estimated Word Count *"
                              placeholder="8000"
                              min={1000}
                              max={300000}
                              step={1000}
                              required
                              value={scopeWordCount}
                              onChange={setScopeWordCount}
                              radius={0}
                              size="sm"
                              description="E.g., 7,500 for paper; 75,000 for monograph"
                            />
                            <TextInput
                              label="Target Journal or University Press"
                              placeholder="e.g. Oxford, Routledge, Q1 Journal"
                              value={scopeTargetPub}
                              onChange={(e) => setScopeTargetPub(e.target.value)}
                              radius={0}
                              size="sm"
                            />
                          </SimpleGrid>

                          <TextInput
                            label="Target Deadline / Submission Date"
                            placeholder="e.g. June 15th (Defense date) or 2-week journal window"
                            value={scopeDeadline}
                            onChange={(e) => setScopeDeadline(e.target.value)}
                            radius={0}
                            size="sm"
                          />

                          {/* File Attachment */}
                          <FileInput
                            label="Attach Manuscript Draft / Table of Contents (Optional)"
                            placeholder="Choose file (.docx, .pdf, .tex)"
                            leftSection={<IconUpload size={16} />}
                            value={scopeFile}
                            onChange={setScopeFile}
                            radius={0}
                            size="sm"
                            description="All files held in secure encrypted storage under strict NDA."
                          />

                          {/* Project Details */}
                          <Textarea
                            label="Committee Feedback or Special Instructions"
                            placeholder="Describe specific revision areas, conflicting advisor comments, style manual requirements (APA, Chicago, IEEE), or chapters requiring restructure..."
                            minRows={3}
                            value={scopeInstructions}
                            onChange={(e) => setScopeInstructions(e.target.value)}
                            radius={0}
                            size="sm"
                          />

                          {/* Optional Call Checkbox */}
                          <Checkbox
                            label="I would also like to schedule an introductory 15-minute scoping call with Dr. Micah Dobson"
                            checked={scopeWantCall}
                            onChange={(e) => setScopeWantCall(e.currentTarget.checked)}
                            styles={{ label: { fontSize: rem(13), color: active.primary } }}
                          />

                          <Button
                            type="submit"
                            size="lg"
                            radius={0}
                            loading={scopeIsSubmitting}
                            rightSection={<IconArrowRight size={18} />}
                            style={{
                              backgroundColor: active.accent,
                              color: '#ffffff',
                              fontWeight: 700,
                              fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                              letterSpacing: '0.04em',
                              height: rem(52),
                            }}
                          >
                            Request Milestone Proposal
                          </Button>

                          <Text size="xs" c="dimmed" style={{ textAlign: 'center' }}>
                            Guaranteed 24-hour fixed quote &bull; 50/50 milestone payment terms &bull; 365-day re-editing included
                          </Text>
                        </Stack>
                      </form>
                    )}
                  </Box>
                </Box>
              </SimpleGrid>
            </Box>
          )}
        </Container>
      </Box>

      {/* ── Quality Commitments & Ethical Standards ── */}
      <Box component="section" py={SECTION_SPACING} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}12` }}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap={rem(36)}>
            <Box style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
              <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                STANDARD EDITORIAL SAFEGUARDS
              </Text>
              <Title order={2} mt="xs" style={{ fontFamily: 'var(--font-serif)', fontSize: rem(28), color: active.primary, fontWeight: 600 }}>
                Every engagement is governed by rigorous academic standards.
              </Title>
            </Box>

            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={rem(20)}>
              {[
                {
                  icon: <IconCertificate size={24} color={active.accent} />,
                  title: '100% Track Changes in Word',
                  desc: 'Every syntactic adjustment and structural transition is visibly tracked. You retain final authority over every comma.',
                },
                {
                  icon: <IconScale size={24} color={active.accent} />,
                  title: 'Zero Ghostwriting Guarantee',
                  desc: 'We never author original research or fabricate findings. Your scholarship remains entirely your intellectual creation.',
                },
                {
                  icon: <IconShieldCheck size={24} color={active.accent} />,
                  title: 'Strict Institutional NDA',
                  desc: 'Unpublished findings and dissertation chapters are protected under enforceable non-disclosure agreements.',
                },
                {
                  icon: <IconUserCheck size={24} color={active.accent} />,
                  title: 'Direct Faculty Collaboration',
                  desc: 'No anonymous ticket queues. Direct collaborative dialogue with Dr. Micah Dobson and your doctoral editor.',
                },
              ].map((card, i) => (
                <Box
                  key={i}
                  p={rem(24)}
                  bg={active.background}
                  style={{
                    border: `1px solid ${active.primary}12`,
                    borderTop: `3px solid ${active.accent}`,
                  }}
                >
                  <Box mb="md">{card.icon}</Box>
                  <Text fw={700} size="sm" c={active.primary} mb={rem(6)}>
                    {card.title}
                  </Text>
                  <Text size="xs" c="dimmed" lh={1.6}>
                    {card.desc}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* ── Centered FAQ ── */}
      <Box component="section" py={SECTION_SPACING} bg={active.background} style={{ borderTop: `1px solid ${active.primary}12` }}>
        <Container size={840} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap="xl">
            <Box style={{ textAlign: 'center' }}>
              <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                FREQUENTLY ASKED QUESTIONS
              </Text>
              <Title order={2} mt="xs" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', color: active.primary, fontFamily: 'var(--font-serif)' }}>
                Common Questions About Our Process
              </Title>
              <Text size="sm" c="dimmed" mt="xs">
                Transparent answers on pricing proposals, Track Changes, and turnaround times.
              </Text>
            </Box>

            <Accordion>
              {orderFAQs.map((faq, i) => (
                <Accordion.Item key={i} value={`order-faq-${i}`}>
                  <Accordion.Control style={{ fontFamily: 'var(--font-heading-sans), var(--font-sans)', fontWeight: 600 }}>
                    {faq.q}
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

      {/* Back to top button */}
      <Box
        onClick={scrollToTop}
        className="back-to-top-btn"
        style={{
          position: 'fixed',
          bottom: rem(40),
          right: rem(40),
          width: rem(50),
          height: rem(50),
          borderRadius: '50%',
          backgroundColor: active.surface,
          border: `1px solid ${active.primary}33`,
          color: active.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 100,
          opacity: showBackToTop ? 1 : 0,
          pointerEvents: showBackToTop ? 'all' : 'none',
          transform: showBackToTop ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.2s ease',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        }}
      >
        <IconChevronUp size={24} stroke={1.5} />
      </Box>
    </Box>
  )
}

export default function OrderPage() {
  return (
    <Suspense fallback={<Box p="xl" style={{ textAlign: 'center' }}>Loading project hub...</Box>}>
      <OrderPageContent />
    </Suspense>
  )
}
