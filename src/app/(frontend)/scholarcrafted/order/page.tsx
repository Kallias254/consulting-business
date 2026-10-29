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

const PROJECT_TYPE_OPTIONS = [
  {
    value: 'journal-article',
    label: '1. Journal Article or Standalone Chapter (Chapter-to-paper conversion, single chapter, or journal article · 4,000–12,000 words)',
  },
  {
    value: 'book-monograph',
    label: '2. Book Monograph & Press Proposal (University press proposal, sample chapters, or full book manuscript · Oxford, Routledge, etc.)',
  },
  {
    value: 'full-dissertation',
    label: "3. Full Dissertation or Thesis (Pre-Defense Polish) (Multi-chapter doctoral dissertation or master's thesis before deposit · 30,000–90,000+ words)",
  },
  {
    value: 'rnr-rebuttal',
    label: '4. Revise & Resubmit (R&R) & Reviewer Rebuttal (Point-by-point response matrix, reviewer diplomacy review & manuscript restructuring)',
  },
  {
    value: 'bespoke-latex',
    label: '5. Bespoke Project / Multi-Author / LaTeX Engineering (Multi-author edited volume, research grant proposal, or specialized LaTeX/Typst formatting)',
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
    a: 'Rather than charging low per-word micro-fees through automated shopping carts, ScholarCrafted structures projects with a single transparent flat fee ($600–$1,800 for articles; $1,500–$3,500+ for book monographs). Terms are split into a 50% deposit upfront and 50% upon final delivery of publication-ready files, maintaining aligned incentives and rigorous accountability.',
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

  const resolveInitialType = () => {
    if (!trackParam) return null
    if (['journal', 'chapter', 'article', 'a', 'track-a', 'track_a'].includes(trackParam)) {
      return 'journal-article'
    }
    if (['book', 'monograph', 'press', 'proposal', 'b', 'track-b', 'track_b'].includes(trackParam)) {
      return 'book-monograph'
    }
    if (['dissertation', 'thesis', 'defense'].includes(trackParam)) {
      return 'full-dissertation'
    }
    if (['rnr', 'review', 'rebuttal', 'revision'].includes(trackParam)) {
      return 'rnr-rebuttal'
    }
    if (['custom', 'bespoke', 'latex', 'multi-author', 'grant'].includes(trackParam)) {
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
    const typeLabel = chosenOption ? chosenOption.label.split(' (')[0] : selectedProjectType

    try {
      await fetch('/api/submit-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          salutation,
          firstName,
          lastName,
          email,
          institution,
          documentType: `${typeLabel} (${discipline}) · Target: ${targetPub || 'Not specified'}`,
          service: selectedProjectType,
          tier: selectedProjectType,
          wordCount,
          deadline,
          instructions: `${instructions}${wantCall ? ' [REQUESTED 15-MIN SCOPING CALL WITH DR. DOBSON]' : ''}`,
          intent: 'quote',
          fileName: file ? file.name : undefined,
        }),
      })
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
              FACULTY-LED EDITORIAL &amp; PUBLICATION ADVISORY
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
                maxWidth: '26ch',
              }}
            >
              Request Your Custom Project Scope
            </Title>

            <Text size="md" c="dimmed" lh={1.75} style={{ maxWidth: '64ch' }}>
              Receive an itemized milestone proposal and confirmed delivery schedule within 24 hours. We structure engagements with single transparent flat fees ($600–$1,800 for articles; $1,500–$3,500+ for book monographs) and aligned 50/50 payment terms.
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* ── Scoping Hub Form & Overview ── */}
      <Box component="section" py={SECTION_SPACING} bg={active.background}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <SimpleGrid cols={{ base: 1, lg: 12 }} spacing={{ base: rem(28), lg: rem(44) }} style={{ alignItems: 'flex-start' }}>
            {/* Left Column: Scope Overview & Commitments (5 cols) */}
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
                    24-HOUR PROPOSAL GUARANTEE
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
                        desc: 'Delivered within 24 hours. A clear, itemized proposal with a single flat fee ($600–$1,800 for articles; $1,500–$3,500+ for books).',
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
                        <Text
                          size="xs"
                          fw={700}
                          c={active.accent}
                          style={{ letterSpacing: '0.14em', textTransform: 'uppercase' }}
                        >
                          PROJECT INTAKE &amp; SCOPING
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
                          Tell Us About Your Manuscript
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
                          label="Primary Academic Email *"
                          placeholder="jane.doe@stanford.edu"
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
                        size="lg"
                        radius={0}
                        loading={isSubmitting}
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
                        Request Milestone Proposal (24h Guaranteed)
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
