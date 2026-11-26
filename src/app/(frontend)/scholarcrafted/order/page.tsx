'use client'

import React, { useState, useEffect, Suspense } from 'react'
import {
  Container,
  Title,
  Text,
  Box,
  SimpleGrid,
  Grid,
  Stack,
  Button,
  rem,
  Group,
  useMantineTheme,
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
import { EditorialCard, EditorialReveal } from '../_components/EditorialPrimitives'
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

const PROJECT_TYPE_OPTIONS = [
  {
    value: 'book-monograph',
    label: 'Book Monograph or University Press Proposal',
  },
  {
    value: 'edited-handbook',
    label: 'Edited Volume or Multi-Contributor Handbook',
  },
  {
    value: 'journal-article',
    label: 'Journal Article or Dissertation Chapter',
  },
  {
    value: 'rnr-rebuttal',
    label: 'Revise & Resubmit (R&R) Response & Overhaul',
  },
  {
    value: 'grant-fellowship',
    label: 'Research Grant or Fellowship Proposal',
  },
  {
    value: 'full-dissertation',
    label: "Full Dissertation or Master's Thesis (Pre-Defense)",
  },
  {
    value: 'bespoke-latex',
    label: 'Bespoke Project, LaTeX / Typst, or Indexing',
  },
]

const orderFAQs = [
  {
    q: 'What does "100% Track Changes" mean?',
    a: 'Every single line edit, structural transposition, and vocabulary refinement is logged as a visible Track Change in Microsoft Word (or corresponding annotations in LaTeX/PDF). You can review, accept, or reject each edit with a single click. Your intellectual voice and scholarly findings remain 100% your own.',
  },
  {
    q: 'How does the project scoping and proposal process work?',
    a: 'You submit your project details, target publication, and manuscript draft (or word count). Within 24 hours, Dr. Micah Dobson personally assesses your narrative structure and delivers an itemized milestone proposal outlining exact deliverables, schedule, and pricing. You can also schedule an optional 15-minute scoping call before work begins.',
  },
  {
    q: 'How does the 50/50 payment milestone plan work?',
    a: 'ScholarCrafted structures engagements with transparent fixed milestone pricing tailored to your manuscript length, technical complexity, and publisher requirements. Terms are split into a 50% deposit upon project initiation and 50% upon final delivery of publication-ready files, ensuring aligned incentives, mutual accountability, and uninterrupted editorial continuity.',
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

  const trackParam = (searchParams.get('type') || searchParams.get('track'))?.toLowerCase()
  const refParam = searchParams.get('ref')?.toLowerCase()
  const isMicahReferral = refParam === 'micah' || refParam === 'dobson'

  const resolveInitialType = () => {
    if (!trackParam) return null
    if (['journal', 'chapter', 'article', 'a', 'track-a', 'track_a'].includes(trackParam)) {
      return 'journal-article'
    }
    if (['book', 'monograph', 'press', 'proposal', 'b', 'track-b', 'track_b'].includes(trackParam)) {
      return 'book-monograph'
    }
    if (['handbook', 'volume', 'edited', 'contributors'].includes(trackParam)) {
      return 'edited-handbook'
    }
    if (['grant', 'fellowship', 'nsf', 'nih', 'mcbay'].includes(trackParam)) {
      return 'grant-fellowship'
    }
    if (['dissertation', 'thesis', 'defense'].includes(trackParam)) {
      return 'full-dissertation'
    }
    if (['rnr', 'review', 'rebuttal', 'revision'].includes(trackParam)) {
      return 'rnr-rebuttal'
    }
    if (['custom', 'bespoke', 'latex', 'multi-author'].includes(trackParam)) {
      return 'bespoke-latex'
    }
    return null
  }

  const [selectedProjectType, setSelectedProjectType] = useState<string | null>(resolveInitialType())
  const [typeError, setTypeError] = useState(false)

  // Form State
  const [salutation, setSalutation] = useState('Dr.')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [institution, setInstitution] = useState('')
  const [discipline, setDiscipline] = useState<string | null>(DISCIPLINES[0].value)
  const [wordCount, setWordCount] = useState<number | string>(8000)
  const [targetPub, setTargetPub] = useState('')
  const [deadline, setDeadline] = useState('')
  const [instructions, setInstructions] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [wantCall, setWantCall] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  // Handle Custom Scope submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedProjectType) {
      setTypeError(true)
      return
    }
    setTypeError(false)
    setIsSubmitting(true)

    const chosenOption = PROJECT_TYPE_OPTIONS.find((p) => p.value === selectedProjectType)
    const typeLabel = chosenOption ? chosenOption.label : selectedProjectType

    try {
      const formData = new FormData()
      formData.append('salutation', salutation)
      formData.append('firstName', firstName)
      formData.append('lastName', lastName)
      formData.append('email', email)
      formData.append('institution', institution)
      formData.append('documentType', `${typeLabel} (${discipline}) · Target: ${targetPub || 'Not specified'}`)
      formData.append('service', selectedProjectType)
      formData.append('tier', selectedProjectType)
      if (wordCount) formData.append('wordCount', String(wordCount))
      if (deadline) formData.append('deadline', deadline)
      formData.append('instructions', `${isMicahReferral ? '[REFERRED BY DR. MICAH DOBSON] ' : ''}${instructions}${wantCall ? ' [REQUESTED 15-MIN SCOPING CALL]' : ''}`)
      formData.append('intent', 'quote')
      if (file) {
        formData.append('file', file)
      }

      const res = await fetch('/api/submit-project', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        console.error('[submit-project] Non-OK response:', res.status)
      }
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
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
            {isMicahReferral && (
              <Box
                px={rem(16)}
                py={rem(8)}
                bg={active.background}
                style={{ border: `1px solid ${active.accent}45` }}
              >
                <Text size="xs" fw={600} c={active.primary} style={{ letterSpacing: '0.04em' }}>
                  Referred by <span style={{ color: active.accent, fontWeight: 700 }}>Dr. Micah J. Dobson</span> &mdash; Priority 24-Hour Project Scoping
                </Text>
              </Box>
            )}

            <Title
              order={1}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.1rem, 4.2vw, 3.25rem)',
                fontWeight: 600,
                lineHeight: 1.15,
                color: active.primary,
                letterSpacing: '-0.015em',
                maxWidth: '26ch',
              }}
            >
              Request Your Custom Project Scope
            </Title>

            <Text size="md" c="dimmed" lh={1.75} style={{ maxWidth: '64ch' }}>
              Receive an itemized project roadmap, milestone deliverables, and confirmed publication schedule within 24 hours. Confidential, NDA-protected, and faculty-directed.
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* ── Scoping Hub Form & Overview ── */}
      <Box component="section" py={SECTION_SPACING} bg={active.background}>
        <Container size={1040} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap={rem(32)}>
            {/* Centered Custom Scope Request Form */}
            <Box
              p={{ base: rem(28), sm: rem(36), md: rem(44) }}
              bg={active.surface}
              style={{
                border: `1px solid ${active.primary}18`,
                boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
              }}
            >
                {submitted ? (
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
                      Project Brief Received
                    </Title>
                    <Text size="sm" c="dimmed" lh={1.7} style={{ maxWidth: '48ch' }}>
                      Thank you, {firstName || 'Scholar'}. Dr. Micah Dobson is personally reviewing your project brief and preparing a custom milestone proposal with guaranteed delivery timelines and 50/50 payment terms.
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
                          1. A formal scoped proposal will be emailed to <strong>{email}</strong> within 24 hours.
                        </Text>
                        <Text size="xs" c="dimmed">
                          2. The proposal will include itemized deliverables, milestone phases, and an exact delivery date.
                        </Text>
                        <Text size="xs" c="dimmed">
                          3. If you requested a scoping call, Dr. Dobson will reach out with direct calendar availability.
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
                        onClick={() => setSubmitted(false)}
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
                  <form onSubmit={handleSubmit}>
                    <Stack gap="lg">
                      <Box>
                        <Title
                          order={3}
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: rem(24),
                            color: active.primary,
                            fontWeight: 600,
                          }}
                        >
                          Tell Us About Your Manuscript
                        </Title>
                        <Text size="xs" c="dimmed" mt={rem(4)}>
                          Receive an itemized milestone proposal and confirmed delivery schedule within 24 hours.
                        </Text>
                      </Box>

                      <Divider color={`${active.primary}10`} />

                      {/* Contact Details */}
                      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="sm">
                        <Select
                          label="Salutation"
                          data={SALUTATIONS}
                          value={salutation}
                          onChange={(v) => setSalutation(v ?? 'Dr.')}
                          radius={0}
                          size="sm"
                        />
                        <TextInput
                          label="First Name *"
                          placeholder="Jane"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          radius={0}
                          size="sm"
                        />
                        <TextInput
                          label="Last Name *"
                          placeholder="Doe"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          radius={0}
                          size="sm"
                        />
                      </SimpleGrid>

                      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                        <TextInput
                          label="Email Address *"
                          placeholder="you@university.edu or name@gmail.com"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          radius={0}
                          size="sm"
                          description="Your milestone proposal will be sent here."
                        />
                        <TextInput
                          label="University / Institution *"
                          placeholder="e.g. Stanford, Cambridge, Michigan"
                          required
                          value={institution}
                          onChange={(e) => setInstitution(e.target.value)}
                          radius={0}
                          size="sm"
                        />
                      </SimpleGrid>

                      {/* Primary Document or Project Type */}
                      <Select
                        label="Primary Document or Project Type *"
                        placeholder="Select your project type (e.g., Chapter, Article, Monograph)..."
                        data={PROJECT_TYPE_OPTIONS}
                        value={selectedProjectType}
                        onChange={(v) => {
                          setSelectedProjectType(v)
                          if (v) setTypeError(false)
                        }}
                        error={typeError ? 'Please select your document or project type' : undefined}
                        required
                        clearable
                        radius={0}
                        size="sm"
                      />

                      {/* Discipline */}
                      <Select
                        label="Academic Discipline *"
                        data={DISCIPLINES}
                        value={discipline}
                        onChange={setDiscipline}
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
                          value={wordCount}
                          onChange={setWordCount}
                          radius={0}
                          size="sm"
                          description="E.g., 7,500 for paper; 75,000 for monograph"
                        />
                        <TextInput
                          label="Target Journal or University Press"
                          placeholder="e.g. Oxford, Routledge, Q1 Journal"
                          value={targetPub}
                          onChange={(e) => setTargetPub(e.target.value)}
                          radius={0}
                          size="sm"
                        />
                      </SimpleGrid>

                      <TextInput
                        label="Target Deadline / Submission Date"
                        placeholder="e.g. June 15th (Defense date) or 2-week journal window"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        radius={0}
                        size="sm"
                      />

                      {/* File Attachment */}
                      <FileInput
                        label="Attach Manuscript Draft / Table of Contents (Optional)"
                        placeholder="Choose file (.docx, .pdf, .tex)"
                        leftSection={<IconUpload size={16} />}
                        value={file}
                        onChange={setFile}
                        radius={0}
                        size="sm"
                        description="All files held in secure encrypted storage under strict NDA."
                      />

                      {/* Project Details */}
                      <Textarea
                        label="Committee Feedback or Special Instructions"
                        placeholder="Describe specific revision areas, conflicting advisor comments, style manual requirements (APA, Chicago, IEEE), or chapters requiring restructure..."
                        minRows={3}
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        radius={0}
                        size="sm"
                      />

                      {/* Optional Call Checkbox */}
                      <Checkbox
                        label="I would also like to schedule an introductory 15-minute scoping call with Dr. Micah Dobson"
                        checked={wantCall}
                        onChange={(e) => setWantCall(e.currentTarget.checked)}
                        styles={{ label: { fontSize: rem(13), color: active.primary } }}
                      />

                      <Button
                        type="submit"
                        size="md"
                        radius={0}
                        loading={isSubmitting}
                        rightSection={<IconArrowRight size={16} />}
                        style={{
                          backgroundColor: active.accent,
                          color: '#ffffff',
                          fontWeight: 700,
                          fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                          letterSpacing: '0.04em',
                          height: rem(46),
                          alignSelf: 'flex-start',
                          paddingLeft: rem(28),
                          paddingRight: rem(28),
                        }}
                      >
                        Submit Project Brief
                      </Button>

                      <Text size="xs" c="dimmed" style={{ textAlign: 'center' }}>
                        Itemized 24-hour milestone scope &bull; 365-day revision coverage included &bull; Strict NDA
                      </Text>
                    </Stack>
                  </form>
                )}
              </Box>

            {/* Supporting Overview Cards below the centered form */}
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(24)} style={{ alignItems: 'stretch' }}>
              <EditorialCard
                p={{ base: rem(22), md: rem(28) }}
                bg={active.surface}
                interactive={false}
                style={{ height: '100%' }}
              >
                <Title
                  order={3}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: rem(21),
                    color: active.primary,
                    fontWeight: 600,
                    lineHeight: 1.25,
                  }}
                >
                  What Every Full Project Scope Includes:
                </Title>

                <Divider color={`${active.primary}10`} my={rem(16)} />

                <Stack gap={rem(14)}>
                  {[
                    {
                      title: '24-Hour Custom Milestone Proposal',
                      desc: 'An itemized production roadmap with confirmed turnaround dates, deliverable stages, and transparent fixed terms.',
                    },
                    {
                      title: 'Publisher & Discipline Alignment',
                      desc: 'Matched to your target press, journal board, or grant agency (Routledge, Cognella, Oxford, Q1/Q2, NSF/Foundation).',
                    },
                    {
                      title: '365-Day Committee & Reviewer Coverage',
                      desc: 'Secondary revision passes at zero extra charge when your advisor, committee, or peer reviewers request changes.',
                    },
                    {
                      title: 'Official Editorial Compliance Certificate',
                      desc: 'Issued upon completion for graduate school clearance, institutional reporting, or journal submission verification.',
                    },
                  ].map((item, i) => (
                    <Group key={i} gap="sm" align="flex-start" wrap="nowrap">
                      <IconCheck size={16} color={active.accent} style={{ flexShrink: 0, marginTop: rem(2) }} />
                      <Box>
                        <Text size="xs" fw={700} c={active.primary} lh={1.35}>
                          {item.title}
                        </Text>
                        <Text size="xs" c="dimmed" lh={1.45} mt={rem(2)}>
                          {item.desc}
                        </Text>
                      </Box>
                    </Group>
                  ))}
                </Stack>
              </EditorialCard>

              {/* Faculty Scoping Call Card */}
              <EditorialCard
                p={{ base: rem(22), md: rem(28) }}
                bg={active.surface}
                style={{ height: '100%' }}
              >
                <Stack gap="sm" style={{ height: '100%', justifyContent: 'space-between' }}>
                  <Stack gap="xs">
                    <Group gap="xs">
                      <IconMessages size={18} color={active.accent} />
                      <Text size="xs" fw={700} c={active.primary} style={{ letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        Prefer to Discuss First?
                      </Text>
                    </Group>
                    <Title order={4} style={{ fontFamily: 'var(--font-serif)', fontSize: rem(20), color: active.primary, fontWeight: 600 }}>
                      Book a 15-Minute Scoping Consultation
                    </Title>
                    <Text size="sm" c="dimmed" lh={1.65}>
                      Discuss your manuscript timeline, target press, or multi-contributor workflow before requesting a formal project proposal.
                    </Text>
                  </Stack>
                  <Anchor
                    href="https://calendly.com/misedajoseph-30-minutes-call/discovery-session"
                    target="_blank"
                    rel="noopener noreferrer"
                    c={active.accent}
                    size="sm"
                    fw={700}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: rem(6),
                      textDecoration: 'none',
                      marginTop: rem(8),
                    }}
                  >
                    Book 15-Min Scoping Call &rarr;
                  </Anchor>
                </Stack>
              </EditorialCard>
            </SimpleGrid>
          </Stack>
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
                <EditorialReveal key={i} delay={i * 60}>
                  <EditorialCard
                    p={{ base: rem(24), md: rem(28) }}
                    bg={active.background}
                    style={{ height: '100%' }}
                  >
                    <Box mb="md">{card.icon}</Box>
                    <Text fw={700} size="sm" c={active.primary} mb={rem(6)}>
                      {card.title}
                    </Text>
                    <Text size="xs" c="dimmed" lh={1.65}>
                      {card.desc}
                    </Text>
                  </EditorialCard>
                </EditorialReveal>
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
