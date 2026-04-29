'use client'

import React, { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Container,
  Title,
  Text,
  Box,
  SimpleGrid,
  Stack,
  Button,
  TextInput,
  Textarea,
  rem,
  Group,
  UnstyledButton,
  Progress,
  Badge,
  ActionIcon,
  Center,
  Divider,
  useMantineTheme,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import dayjs from 'dayjs'
import {
  IconUsers,
  IconEdit,
  IconMicroscope,
  IconCheck,
  IconArrowRight,
  IconArrowLeft,
  IconCertificate,
  IconClock,
  IconFileText,
  IconSearch,
} from '@tabler/icons-react'
import Link from 'next/link'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'
import { ScrollToTop } from '../_components/ScrollToTop'

const INNER_WIDTH = 1100

interface StepData {
  interest: string
  metBefore: string
  coach: string
  specifics: string
  discipline: string
  stage: string
  preferredDate: Date | null
  preferredTime: string
  name: string
  email: string
  description: string
}

const COACHES = [
  'Brandon',
  'Denise',
  'Ethar',
  'Kerryn',
  'Lani',
  'Matthew',
  'Nichole',
  'Suzanne',
  'Tara',
]

const FORMATTED_VALUES: Record<string, string> = {
  // Interest
  coaching: 'Live Academic Coaching',
  data_support: 'Custom Research & Data Support',
  editing: 'Structural Editing & Proofreading',
  other: 'Not Sure Yet',
  
  // MetBefore
  no: 'No, first time',
  yes: 'Yes, had intro call',
  
  // Specifics
  friction: 'Committee Friction',
  block: 'Methodological Block',
  narrative: 'The Narrative Gap',
  momentum: 'Momentum Collapse',
  
  // Discipline
  social: 'Social Sciences',
  stem: 'STEM',
  humanities: 'Humanities & Arts',
  professional: 'Professional Doctorates',
  
  // Stage
  proposal: 'Proposal Phase',
  collection: 'Data Collection',
  drafting: 'Drafting Chapters',
  review: 'Final Review',

  // Time
  morning: '09:00 - 12:00',
  afternoon: '13:00 - 17:00',
  evening: '18:00 - 20:00',
}

export default function ConsultationPage() {
  return (
    <Suspense fallback={<Box style={{ minHeight: '100vh' }} />}>
      <ConsultationWizard />
    </Suspense>
  )
}

function ConsultationWizard() {
  const searchParams = useSearchParams()
  const initialInterest = searchParams.get('interest') || ''
  const initialMetBefore = searchParams.get('metBefore') || ''

  let initialStep = 0
  if (initialInterest) {
    if (initialInterest !== 'editing') {
      initialStep = 1
      if (initialMetBefore === 'no') {
        initialStep = 3 // skip to specifics
      } else if (initialMetBefore === 'yes') {
        initialStep = 2 // select coach
      }
    }
  }

  const [step, setStep] = useState(initialStep)
  const [data, setData] = useState<StepData>({
    interest: initialInterest,
    metBefore: initialMetBefore,
    coach: '',
    specifics: '',
    discipline: '',
    stage: '',
    preferredDate: new Date(),
    preferredTime: '',
    name: '',
    email: '',
    description: '',
  })

  const theme = useMantineTheme()
  const active = theme.other
  const totalSteps = 10

  const nextStep = () => {
    setStep((s) => {
      if (s === 0) {
        if (data.interest === 'coaching' || data.interest === 'data_support') return 1
        return 3 // Skip to specifics
      }
      if (s === 1) {
        if (data.metBefore === 'yes') return 2
        return 3 // Skip to specifics
      }
      return Math.min(s + 1, totalSteps)
    })
  }

  const prevStep = () => {
    setStep((s) => {
      if (s === 3) {
        if (data.interest === 'coaching' || data.interest === 'data_support') {
          return data.metBefore === 'yes' ? 2 : 1
        }
        return 0
      }
      if (s === 2) return 1
      return Math.max(s - 1, 0)
    })
  }

  const selectOption = (field: keyof StepData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }))

    // Immediate actions for specific selections
    if (field === 'interest') {
      if (value === 'editing') {
        window.location.href = '/scholarcrafted/request-review?service=Structural%20Editing%20%26%20Proofreading'
        return
      }
      if (value === 'coaching' || value === 'data_support') setStep(1)
      else setStep(3)
    } else if (field === 'metBefore') {
      if (value === 'yes') setStep(2)
      else setStep(3)
    } else if (field === 'coach') {
      // Redirect to login if coach is selected
      window.location.href = '/admin/login'
    } else if (field !== 'preferredDate' && field !== 'preferredTime') {
      nextStep()
    }
  }

  const stepHeadlines = [
    {
      title: 'What are you interested in?',
      desc: "This short diagnostic helps us understand your project's unique needs, ensuring our initial consultation is as productive as possible.",
    },
    {
      title: 'Have you had an initial consultation yet?',
      desc: "Tell us if you've already had an introductory consultation.",
    },
    {
      title: 'Who did you meet with?',
      desc: "If you can't remember, please check your appointment confirmation email.",
    },
    {
      title: 'Identify your "Stall Point"',
      desc: 'Select the primary obstacle currently preventing your progress.',
    },
    {
      title: 'Your Academic Discipline',
      desc: 'This allows us to assign a Squad Leader with specific expertise in your field.',
    },
    {
      title: 'What is your current phase?',
      desc: 'This helps us tailor our strategic advice to your specific stage in the doctoral journey.',
    },
    {
      title: 'Request a preferred window',
      desc: 'Our team is available for strategy sessions during the following windows. We will confirm your final time via email.',
    },
    {
      title: 'Review Your Information',
      desc: 'Please take a moment to confirm your selections before proceeding.',
    },
    {
      title: 'Finalize your inquiry',
      desc: 'Please provide your contact information and a brief overview of your research.',
    },
    {
      title: 'Audit Initialized.',
      desc: 'You have taken a decisive step toward completion. Micah, PhD is personally reviewing your research profile.',
    },
  ]

  const stepsContent = [
    <StepInterest key={0} data={data} selectOption={selectOption} />,
    <StepMetBefore key={1} data={data} selectOption={selectOption} />,
    <StepSelectCoach key={2} data={data} selectOption={selectOption} />,
    <StepSpecifics key={3} data={data} selectOption={selectOption} />,
    <StepDiscipline key={4} data={data} selectOption={selectOption} />,
    <StepStage key={5} data={data} selectOption={selectOption} />,
    <StepDateTime key={6} data={data} setData={setData} nextStep={nextStep} />,
    <StepReview key={7} data={data} setStep={setStep} nextStep={nextStep} />,
    <StepForm key={8} data={data} setData={setData} nextStep={nextStep} />,
    <StepSuccess key={9} data={data} setStep={setStep} />,
  ]
  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />
      
      {/* Top Section - Background */}
      <Box component="section" pt={{ base: rem(60), md: rem(100) }} pb={rem(60)} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <Group justify="space-between" align="center" mb={rem(60)} style={{ opacity: step < totalSteps ? 1 : 0, transition: 'opacity 0.3s ease' }}>
            {step > 0 && step < totalSteps ? (
              <UnstyledButton
                onClick={prevStep}
                style={{ display: 'flex', alignItems: 'center', gap: rem(8), transition: 'opacity 0.2s ease' }}
                _hover={{ opacity: 0.7 }}
              >
                <IconArrowLeft size={16} color={active.primary} />
                <Text size="xs" fw={700} style={{ letterSpacing: '0.1em', textTransform: 'uppercase', color: active.primary }}>
                  Back
                </Text>
              </UnstyledButton>
            ) : <Box w={100} />}
            
            {step < totalSteps && (
              <Stack gap="xs" align="center">
                <Text size="xs" fw={700} style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }} c="dimmed">
                  Diagnostic Step {step + 1}
                </Text>
                <Progress
                  value={(step / (totalSteps - 1)) * 100}
                  color={active.accent || active.primary}
                  size="md"
                  radius={0}
                  style={{ width: rem(200), backgroundColor: `${active.primary}20` }}
                />
              </Stack>
            )}
            
            <Box w={100} /> {/* Spacer to perfectly center the progress bar */}
          </Group>

          {step < totalSteps && (
            <Box style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
              <Title
                order={1}
                style={{
                  fontSize: rem(42),
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  color: active.primary,
                  fontFamily: 'var(--font-serif)',
                }}
              >
                {stepHeadlines[step].title}
              </Title>
              {stepHeadlines[step].desc && (
                <Text size="lg" c="dimmed" lh={1.6} mt="xl" style={{ margin: '1.5rem auto 0' }}>
                  {stepHeadlines[step].desc}
                </Text>
              )}
            </Box>
          )}
        </Container>
      </Box>

      {/* Main Content Section - Surface */}
      <Box component="section" py={rem(80)} bg={active.surface} style={{ borderTop: `1px solid ${active.primary}22` }}>
        <Container size="md">
          <Box style={{ maxWidth: 800, margin: '0 auto' }}>
            {stepsContent[step]}
          </Box>
        </Container>
      </Box>
      
      <Footer />
    </Box>
  )
}

// Step Components
function StepInterest({ data, selectOption }: any) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" mt={rem(40)}>
      {[
        {
          id: 'coaching',
          title: 'Live Academic Coaching',
          desc: '1-on-1 strategic support and mentorship',
          icon: <IconUsers size={28} />,
        },
        {
          id: 'data_support',
          title: 'Custom Research & Data Support',
          desc: 'Technical assistance, NVivo, SPSS, and methodology review',
          icon: <IconMicroscope size={28} />,
        },
        {
          id: 'editing',
          title: 'Structural Editing & Proofreading',
          desc: 'Manuscript refinement and formatting',
          icon: <IconEdit size={28} />,
        },
        {
          id: 'other',
          title: 'Not Sure Yet',
          desc: 'Let us help diagnose your exact needs',
          icon: <IconSearch size={28} />,
        },
      ].map((item) => (
        <SelectionCard
          key={item.id}
          title={item.title}
          description={item.desc}
          icon={item.icon}
          active={data.interest === item.id}
          onClick={() => selectOption('interest', item.id)}
        />
      ))}
    </SimpleGrid>
  )
}

function StepMetBefore({ data, selectOption }: any) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" mt={rem(40)}>
      {[
        {
          id: 'no',
          title: 'No, this is my first time.',
          desc: "I'm looking for a diagnostic session to discuss my research.",
          icon: <IconSearch size={28} />,
        },
        {
          id: 'yes',
          title: "Yes, I've had an introductory call.",
          desc: "I want to be routed to my existing coach's dashboard.",
          icon: <IconUsers size={28} />,
        },
      ].map((item) => (
        <SelectionCard
          key={item.id}
          title={item.title}
          description={item.desc}
          icon={item.icon}
          active={data.metBefore === item.id}
          onClick={() => selectOption('metBefore', item.id)}
        />
      ))}
    </SimpleGrid>
  )
}

function StepSelectCoach({ data, selectOption }: any) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg" mt={rem(40)}>
      {COACHES.map((coach) => (
        <SelectionCard
          key={coach}
          title={coach}
          description="ScholarCrafted Faculty"
          icon={<IconUsers size={20} />}
          active={data.coach === coach}
          onClick={() => selectOption('coach', coach)}
        />
      ))}
    </SimpleGrid>
  )
}

function StepSpecifics({ data, selectOption }: any) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" mt={rem(40)}>
      {[
        {
          id: 'friction',
          title: 'Committee Friction',
          desc: 'Navigating contradictory feedback or stagnant reviews.',
          icon: <IconSearch size={28} />,
        },
        {
          id: 'block',
          title: 'Methodological Block',
          desc: 'Stuck on research design, logic, or data analysis.',
          icon: <IconMicroscope size={28} />,
        },
        {
          id: 'narrative',
          title: 'The Narrative Gap',
          desc: "The data exists, but the scholarly story isn't flowing.",
          icon: <IconEdit size={28} />,
        },
        {
          id: 'momentum',
          title: 'Momentum Collapse',
          desc: 'Stalled after a long break or life event.',
          icon: <IconClock size={28} />,
        },
      ].map((item) => (
        <SelectionCard
          key={item.id}
          title={item.title}
          description={item.desc}
          icon={item.icon}
          active={data.specifics === item.id}
          onClick={() => selectOption('specifics', item.id)}
        />
      ))}
    </SimpleGrid>
  )
}

function StepDiscipline({ data, selectOption }: any) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" mt={rem(40)}>
      {[
        {
          id: 'social',
          title: 'Social Sciences',
          desc: 'Psychology, Education, Sociology, etc.',
          icon: <IconUsers size={28} />,
        },
        {
          id: 'stem',
          title: 'STEM',
          desc: 'Science, Tech, Engineering, Math.',
          icon: <IconMicroscope size={28} />,
        },
        {
          id: 'humanities',
          title: 'Humanities & Arts',
          desc: 'History, Literature, Philosophy, etc.',
          icon: <IconFileText size={28} />,
        },
        {
          id: 'professional',
          title: 'Professional Doctorates',
          desc: 'EdD, DBA, DNP, Clinical Degrees.',
          icon: <IconCertificate size={28} />,
        },
      ].map((item) => (
        <SelectionCard
          key={item.id}
          title={item.title}
          description={item.desc}
          icon={item.icon}
          active={data.discipline === item.id}
          onClick={() => selectOption('discipline', item.id)}
        />
      ))}
    </SimpleGrid>
  )
}

function StepStage({ data, selectOption }: any) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" mt={rem(40)}>
      {[
        {
          id: 'proposal',
          title: 'Proposal Phase',
          desc: 'Conceptualizing and initial drafting',
          icon: <IconFileText size={28} />,
        },
        {
          id: 'collection',
          title: 'Data Collection',
          desc: 'Gathering field data or literature',
          icon: <IconSearch size={28} />,
        },
        {
          id: 'drafting',
          title: 'Drafting Chapters',
          desc: 'Transforming data into analysis',
          icon: <IconEdit size={28} />,
        },
        {
          id: 'review',
          title: 'Final Review',
          desc: 'Polishing for committee submission',
          icon: <IconCheck size={28} />,
        },
      ].map((item) => (
        <SelectionCard
          key={item.id}
          title={item.title}
          description={item.desc}
          icon={item.icon}
          active={data.stage === item.id}
          onClick={() => selectOption('stage', item.id)}
        />
      ))}
    </SimpleGrid>
  )
}

function StepDateTime({ data, setData, nextStep }: any) {
  const { other: active } = useMantineTheme()
  return (
    <Box bg={active.background} p={rem(40)} style={{ border: '1px solid #eee' }} mt={rem(40)}>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(60)}>
        <Stack align="center" gap="md">
          <DatePicker
            value={data.preferredDate}
            onChange={(d) => setData((prev: any) => ({ ...prev, preferredDate: d }))}
            minDate={new Date()}
            classNames={{ day: 'calendar-day' }}
          />
        </Stack>
        <Stack gap="md">
          <Stack gap="sm">
            {[
              { id: 'morning', title: 'Morning', range: '09:00 - 12:00' },
              { id: 'afternoon', title: 'Afternoon', range: '13:00 - 17:00' },
              { id: 'evening', title: 'Evening', range: '18:00 - 20:00' },
            ].map((slot) => (
              <UnstyledButton
                key={slot.id}
                onClick={() => setData((prev: any) => ({ ...prev, preferredTime: slot.id }))}
                style={{
                  padding: rem(16),
                  border: `1px solid ${data.preferredTime === slot.id ? active.primary : '#eee'}`,
                  backgroundColor:
                    data.preferredTime === slot.id ? active.surface : active.background,
                  transition: 'all 0.2s ease',
                }}
              >
                <Group justify="space-between">
                  <Text fw={600} color={active.primary}>
                    {slot.title}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {slot.range}
                  </Text>
                </Group>
              </UnstyledButton>
            ))}
          </Stack>
          <Button
            size="lg"
            variant="filled"
            bg={active.primary}
            radius={0}
            mt="xl"
            disabled={!data.preferredDate || !data.preferredTime}
            onClick={nextStep}
            rightSection={<IconArrowRight size={18} />}
          >
            CONTINUE
          </Button>
        </Stack>
      </SimpleGrid>
    </Box>
  )
}

function StepForm({ data, setData, nextStep }: any) {
  const { other: active } = useMantineTheme()
  return (
    <Box bg={active.background} p={rem(40)} style={{ border: '1px solid #eee' }} mt={rem(40)}>
      <Stack gap="lg">
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
          <TextInput
            label="Full Name"
            placeholder="e.g. Dr. Jane Smith"
            radius={0}
            value={data.name}
            onChange={(e) => setData((prev: any) => ({ ...prev, name: e.target.value }))}
          />
          <TextInput
            label="Email Address"
            placeholder="e.g. j.smith@university.edu"
            radius={0}
            value={data.email}
            onChange={(e) => setData((prev: any) => ({ ...prev, email: e.target.value }))}
          />
        </SimpleGrid>
        <Textarea
          label="Brief Project Description"
          placeholder="Describe your research topic and current challenges..."
          minRows={4}
          radius={0}
          value={data.description}
          onChange={(e) => setData((prev: any) => ({ ...prev, description: e.target.value }))}
        />
        <Stack gap="sm" mt="md">
          <Button
            size="lg"
            variant="filled"
            bg={active.primary}
            radius={0}
            onClick={nextStep}
            rightSection={<IconArrowRight size={18} />}
          >
            SUBMIT INQUIRY
          </Button>
          <Text size="xs" c="dimmed" style={{ textAlign: 'center' }}>
            This is a free, 15-minute introductory call to get to know your needs, not a coaching
            session.{' '}
            <Link
              href="/scholarcrafted/services/private-coaching"
              style={{ color: active.primary }}
            >
              Find out more here
            </Link>
            .
          </Text>
        </Stack>
      </Stack>
    </Box>
  )
}

function StepSuccess({ data, setStep }: any) {
  const { other: active } = useMantineTheme()
  return (
    <Stack gap={rem(60)} align="center" style={{ textAlign: 'center' }}>
      <Stack gap="xl" align="center">
        <Box c={active.accent}>
          <IconCertificate size={64} stroke={1.5} />
        </Box>
        <Box>
          <Text size="lg" mt="md" c="dimmed" lh={1.6} style={{ maxWidth: 600 }}>
            You have taken a decisive step toward completion. Micah, PhD is personally reviewing
            your research profile to initiate your **Preliminary Technical Audit**.
          </Text>
        </Box>
      </Stack>

      <SimpleGrid
        cols={{ base: 1, md: 2 }}
        spacing={rem(40)}
        style={{ textAlign: 'left', width: '100%' }}
      >
        <Box p={rem(40)} bg={active.background} style={{ border: '1px solid #eee' }}>
          <Stack gap="xl">
            <Text
              size="xs"
              fw={700}
              style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}
              c="dimmed"
            >
              Next Steps: Agency Ingestion
            </Text>
            <Stack gap="lg">
              <Group align="flex-start" gap="md" wrap="nowrap">
                <Text fw={700} c={active.accent}>
                  01
                </Text>
                <Box>
                  <Text fw={600} size="sm">
                    Technical Audit Initiated
                  </Text>
                  <Text size="xs" c="dimmed">
                    Our team is cross-referencing your project goals against publisher and
                    university standards.
                  </Text>
                </Box>
              </Group>
              <Group align="flex-start" gap="md" wrap="nowrap">
                <Text fw={700} c={active.accent}>
                  02
                </Text>
                <Box>
                  <Text fw={600} size="sm">
                    Project Vault Setup
                  </Text>
                  <Text size="xs" c="dimmed">
                    A secure repository is being architected to house your manuscripts and future
                    WASM-rendered proofs.
                  </Text>
                </Box>
              </Group>
              <Group align="flex-start" gap="md" wrap="nowrap">
                <Text fw={700} c={active.accent}>
                  03
                </Text>
                <Box>
                  <Text fw={600} size="sm">
                    Strategic Confirmation
                  </Text>
                  <Text size="xs" c="dimmed">
                    Check your inbox. We&apos;ve sent a preliminary guide to protect your momentum
                    while we finalize your consultation time.
                  </Text>
                </Box>
              </Group>
            </Stack>
          </Stack>
        </Box>

        <Box p={rem(40)} bg={active.background} style={{ border: '1px solid #eee' }}>
          <Stack gap="xl">
            <Text
              size="xs"
              fw={700}
              style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}
              c="dimmed"
            >
              Community of Scholars
            </Text>
            <Stack gap="lg">
              <Box>
                <Text size="sm" fs="italic" lh={1.6}>
                  &quot;I was stuck for 18 months before this consultation. Within 30 minutes, Micah
                  identified a structural flaw in my second chapter that changed everything.&quot;
                </Text>
                <Text size="xs" fw={700} mt="xs" style={{ letterSpacing: '0.05em' }}>
                  &mdash; DR. SARAH J., PH.D. (YALE)
                </Text>
              </Box>
              <Divider style={{ opacity: 0.3 }} />
              <Box>
                <Text size="sm" fs="italic" lh={1.6}>
                  &quot;The most rigorous academic support I&apos;ve encountered. They don&apos;t do
                  the work for you; they help you produce work you are proud to defend.&quot;
                </Text>
                <Text size="xs" fw={700} mt="xs" style={{ letterSpacing: '0.05em' }}>
                  &mdash; DR. MARCUS K., PH.D. (OXFORD)
                </Text>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </SimpleGrid>

      <Link href="/scholarcrafted" style={{ textDecoration: 'none' }}>
        <Button
          variant="outline"
          color={active.primary}
          radius={0}
          px={rem(60)}
          style={{ borderColor: active.primary, color: active.primary }}
        >
          RETURN TO HOME
        </Button>
      </Link>
    </Stack>
  )
}



function StepReview({ data, setStep, nextStep }: any) {
  const { other: active } = useMantineTheme()
  
  const formatDate = (date: Date | null) => {
    return date ? dayjs(date).format('MMMM D, YYYY') : 'N/A'
  }

  const formatTime = (timeId: string) => {
    switch (timeId) {
      case 'morning':
        return '09:00 - 12:00'
      case 'afternoon':
        return '13:00 - 17:00'
      case 'evening':
        return '18:00 - 20:00'
      default:
        return 'N/A'
    }
  }

  const reviewItems = [
    { label: 'Interest', value: FORMATTED_VALUES[data.interest] || data.interest, editableStep: 0 },
    { label: 'Met Before', value: FORMATTED_VALUES[data.metBefore] || data.metBefore, editableStep: 1 },
    { label: 'Coach', value: data.coach, editableStep: 2 },
    { label: 'Stall Point', value: FORMATTED_VALUES[data.specifics] || data.specifics, editableStep: 3 },
    { label: 'Discipline', value: FORMATTED_VALUES[data.discipline] || data.discipline, editableStep: 4 },
    { label: 'Current Phase', value: FORMATTED_VALUES[data.stage] || data.stage, editableStep: 5 },
    { label: 'Preferred Date', value: formatDate(data.preferredDate), editableStep: 6 },
    { label: 'Preferred Time', value: formatTime(data.preferredTime), editableStep: 6 },
  ]

  return (
    <Stack gap="xl" mt={rem(20)}>
      <Box 
        bg={active.background} 
        p={{ base: rem(30), sm: rem(50) }} 
        style={{ border: `1px solid ${active.primary}22` }}
      >
        <Stack gap="lg">
          {reviewItems.map(
            (item, index) =>
              item.value &&
              item.value !== 'N/A' && (
                <Box key={item.label}>
                  <Group justify="space-between" align="center" wrap="nowrap">
                    <Text fw={600} size="sm" c="dimmed" style={{ letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      {item.label}
                    </Text>
                    <Group gap="sm">
                      <Text fw={500} size="md" c={active.primary} style={{ textAlign: 'right', fontFamily: 'var(--font-serif)' }}>
                        {item.value}
                      </Text>
                      {item.editableStep !== undefined && (
                        <ActionIcon
                          variant="subtle"
                          color={active.primary}
                          onClick={() => setStep(item.editableStep)}
                          title={`Edit ${item.label}`}
                          radius={0}
                          size="sm"
                        >
                          <IconEdit size={16} />
                        </ActionIcon>
                      )}
                    </Group>
                  </Group>
                  {index < reviewItems.length - 1 && (
                    <Divider mt="lg" mb={0} style={{ opacity: 0.5, borderColor: `${active.primary}22` }} />
                  )}
                </Box>
              ),
          )}
        </Stack>
      </Box>

      <Group justify="center" mt="xl">
        <Button
          size="xl"
          radius={0}
          variant="filled"
          bg={active.primary}
          onClick={nextStep}
          rightSection={<IconArrowRight size={20} />}
          px={rem(40)}
        >
          CONFIRM AND PROCEED
        </Button>
      </Group>
    </Stack>
  )
}

function SelectionCard({ title, description, icon, active, onClick }: any) {
  const theme = useMantineTheme()
  const activeTheme = theme.other

  return (
    <UnstyledButton
      onClick={onClick}
      style={{
        padding: rem(32),
        backgroundColor: active ? activeTheme.background : activeTheme.surface,
        border: `1px solid ${active ? activeTheme.primary : `${activeTheme.primary}22`}`,
        transition: 'all 0.2s ease',
        position: 'relative',
        textAlign: 'left',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = activeTheme.background;
          e.currentTarget.style.borderColor = activeTheme.primary;
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = activeTheme.surface;
          e.currentTarget.style.borderColor = `${activeTheme.primary}22`;
        }
      }}
    >
      <Group justify="space-between" align="flex-start" mb="xl">
        <Box 
          c={active ? activeTheme.primary : 'dimmed'} 
          style={{ transition: 'color 0.2s ease' }}
        >
          {icon}
        </Box>
        {active && (
          <Box c={activeTheme.primary}>
            <IconCheck size={24} stroke={3} />
          </Box>
        )}
      </Group>
      
      <Text fw={600} size="xl" mb={rem(8)} style={{ color: activeTheme.primary }}>
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6} style={{ flexGrow: 1 }}>
        {description}
      </Text>
    </UnstyledButton>
  )
}
