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
  IconX,
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
  block: 'Methodology or Data Hurdles',
  narrative: 'Argument Flow & Structure',
  momentum: 'Stalled Momentum',
  
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
  morning: 'Morning (09:00 - 12:00)',
  afternoon: 'Afternoon (13:00 - 17:00)',
  evening: 'Evening (18:00 - 20:00)',
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
  const totalSteps = 9
  const isSuccessStep = step === totalSteps - 1

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
      title: 'How can we best support you today?',
      desc: "This short diagnostic helps us match you with the right faculty lead, ensuring our first conversation is focused on your specific goals.",
    },
    {
      title: 'Have we met before?',
      desc: "Let us know if you've already had an introductory consultation with one of our coaches.",
    },
    {
      title: 'Who did you meet with?',
      desc: "If you're already working with a specific coach, we'll keep you in their loop.",
    },
    {
      title: 'Where are you currently feeling stuck?',
      desc: 'Identify the biggest hurdle currently preventing your progress so we can jump straight to the solution.',
    },
    {
      title: 'What is your field of study?',
      desc: 'This allows us to pair you with an advisor who understands the specific conventions and expectations of your discipline.',
    },
    {
      title: 'Where are you in the process?',
      desc: "Whether you're just starting your proposal or pushing through the final chapters, we'll meet you exactly where you are.",
    },
    {
      title: 'Pick a preferred window',
      desc: "Pick a preferred window that works for you. We'll match you with a faculty lead and confirm your 15-minute intro via email.",
    },
    {
      title: 'Finalize your inquiry',
      desc: 'Please provide your contact information and a brief overview of your research.',
    },
    {
      title: 'Thank You. Audit Initialized.',
      desc: 'Thank you for taking a decisive step toward completion. Micah, PhD is personally reviewing your research profile. You will receive an email within 24 hours to confirm your advisor pairing and introductory session.',
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
    <StepForm key={7} data={data} setData={setData} nextStep={nextStep} />,
    <StepSuccess key={8} data={data} setStep={setStep} />,
  ]
  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary, display: 'flex', flexDirection: 'column' }}>
      <Box 
        component="header" 
        py={rem(20)} 
        style={{ 
          borderBottom: `1px solid ${active.primary}11`,
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: `${active.background}f2`,
          backdropFilter: 'blur(12px)',
          flexShrink: 0
        }}
      >
        <Container size={INNER_WIDTH}>
          <Group justify="space-between" align="center">
            <Link href="/scholarcrafted" style={{ textDecoration: 'none', color: active.primary }}>
              <Text fw={700} size="xl" >
                ScholarCrafted
              </Text>
            </Link>
            <Button 
              component={Link}
              href="/scholarcrafted"
              variant="outline" 
              size="xs" 
              radius="xl" 
              rightSection={<IconX size={14} />}
              style={{ 
                borderColor: `${active.primary}40`, 
                color: active.primary,
                backgroundColor: 'transparent',
                opacity: 0.8,
                textDecoration: 'none'
              }}
            >
              <Text className="impeccable-eyebrow" size="xs">EXIT</Text>
            </Button>
          </Group>
        </Container>
      </Box>
      
      {/* Top Section - Background */}
      <Box 
        component="section" 
        pt={isSuccessStep ? { base: rem(30), md: rem(50) } : { base: rem(60), md: rem(100) }} 
        pb={isSuccessStep ? rem(20) : rem(60)} 
        bg={active.background} 
        style={{ flexShrink: 0 }}
      >
        <Container size={INNER_WIDTH}>
          <Group justify="space-between" align="center" mb={isSuccessStep ? rem(24) : rem(60)} style={{ opacity: step < totalSteps ? 1 : 0, transition: 'opacity 0.3s ease' }}>
            <Box w={100} />
            
            {step < totalSteps && (
              <Stack gap="xs" align="center">
                <Text className="impeccable-eyebrow" size="xs"  c="dimmed">
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
                  fontSize: isSuccessStep ? rem(32) : rem(42),
                  lineHeight: 1.2,
                  color: active.primary }}
              >
                {stepHeadlines[step].title}
              </Title>
              {stepHeadlines[step].desc && (
                <Text size={isSuccessStep ? "md" : "lg"} c="dimmed" lh={1.6} style={{ 
                  marginTop: isSuccessStep ? '0.75rem' : '1.5rem',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginBottom: 0
                }}>
                  {stepHeadlines[step].desc}
                </Text>
              )}
            </Box>
          )}
        </Container>
      </Box>
      {/* Main Content Section - Surface */}
      <Box 
        component="section" 
        className="academic-watermark"
        py={isSuccessStep ? rem(30) : rem(80)} 
        bg={active.surface} 
        style={{ borderTop: `1px solid ${active.primary}12`, flex: 1 }}
      >
        <Container size={isSuccessStep ? 1000 : "md"}>
          <Box style={{ maxWidth: isSuccessStep ? 1000 : 800, margin: '0 auto' }}>
            {step > 0 && !isSuccessStep && (
              <UnstyledButton
                onClick={prevStep}
                style={{ display: 'flex', alignItems: 'center', gap: rem(8), transition: 'opacity 0.2s ease', marginBottom: rem(32) }}
              >
                <IconArrowLeft size={16} color={active.primary} />
                <Text className="impeccable-eyebrow" size="xs" style={{ color: active.primary }}>
                  Back
                </Text>
              </UnstyledButton>
            )}
            {stepsContent[step]}
          </Box>
        </Container>
      </Box>
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
          id: 'momentum',
          title: 'Stalled Momentum',
          desc: 'Stalled after a long break or life event.',
          icon: <IconClock size={28} />,
        },
        {
          id: 'block',
          title: 'Methodology or Data Hurdles',
          desc: 'Stuck on research design, logic, or data analysis.',
          icon: <IconMicroscope size={28} />,
        },
        {
          id: 'narrative',
          title: 'Argument Flow & Structure',
          desc: "The data exists, but the scholarly story isn't flowing.",
          icon: <IconEdit size={28} />,
        },
        {
          id: 'friction',
          title: 'Committee Friction',
          desc: 'Navigating contradictory feedback or stagnant reviews.',
          icon: <IconSearch size={28} />,
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
    <SimpleGrid cols={1} spacing="lg" mt={rem(40)}>
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
    <Box bg={active.background} p={rem(40)} style={{ border: `1px solid ${active.primary}12` }} mt={rem(40)}>
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
                  transition: 'all 0.2s ease' }}
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
    <Box bg={active.background} p={rem(40)} style={{ border: `1px solid ${active.primary}12` }} mt={rem(40)}>
      <Stack gap="lg">
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
          <TextInput
            label="Full Name"
            placeholder="e.g. Dr. Jane Smith"
            value={data.name}
            onChange={(e) => setData((prev: any) => ({ ...prev, name: e.target.value }))}
          />
          <TextInput
            label="Email Address"
            placeholder="e.g. j.smith@university.edu"
            value={data.email}
            onChange={(e) => setData((prev: any) => ({ ...prev, email: e.target.value }))}
          />
        </SimpleGrid>
        <Textarea
          label="Brief Project Description"
          placeholder="Describe your research topic and current challenges..."
          minRows={4}
          value={data.description}
          onChange={(e) => setData((prev: any) => ({ ...prev, description: e.target.value }))}
        />
        <Stack gap="sm" mt="md">
          <Button
            size="lg"
            variant="filled"
            bg={active.primary}
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
    <Stack gap={rem(32)} align="center" style={{ textAlign: 'center', width: '100%' }}>
      {/* Explore Other Services Section */}
      <Stack gap={rem(40)} mt={0} style={{ width: '100%', textAlign: 'left', maxWidth: rem(1000) }}>
        <Divider style={{ opacity: 0.15 }} />
        <Stack gap="xs" style={{ textAlign: 'center' }}>
          <Title order={2} style={{ fontSize: rem(36), color: active.primary }}>
            Explore Other Services
          </Title>
          <Text size="lg" c="dimmed">
            Need a different type of support? We have you covered.
          </Text>
        </Stack>
        
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
          {/* Card 1 */}
          <Box p={rem(40)} bg={active.background} style={{ border: `1px solid #eee`, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Stack gap="xl" flex={1}>
              <Stack gap="xs">
                <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.1em' }}>
                  MANUSCRIPT REFINEMENT
                </Text>
                <Title order={3} style={{ color: active.primary }}>
                  Structural Editing &amp; Proofreading
                </Title>
              </Stack>
              <Text size="sm" c="dimmed" lh={1.6}>
                From macro-level argument flow to micro-level prose precision, we ensure your research is presented with the clarity, tone, and authority expected by your committee.
              </Text>
            </Stack>
            <Box mt={rem(40)}>
              <Link href="/scholarcrafted/services/editing-proofreading" style={{ textDecoration: 'none' }}>
                <Button variant="outline" color={active.primary} radius={0} fullWidth style={{ borderColor: active.primary }}>
                  View Editing Services
                </Button>
              </Link>
            </Box>
          </Box>

          {/* Card 2 */}
          <Box p={rem(40)} bg={active.background} style={{ border: `1px solid #eee`, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Stack gap="xl" flex={1}>
              <Stack gap="xs">
                <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.1em' }}>
                  1-ON-1 GUIDANCE
                </Text>
                <Title order={3} style={{ color: active.primary }}>
                  Live Academic Coaching
                </Title>
              </Stack>
              <Text size="sm" c="dimmed" lh={1.6}>
                A strategic partnership to help you overcome roadblocks, manage your project, and finish with confidence. Perfect for when you are stuck and need real-time instructional support.
              </Text>
            </Stack>
            <Box mt={rem(40)}>
              <Link href="/scholarcrafted/services/private-coaching" style={{ textDecoration: 'none' }}>
                <Button variant="outline" color={active.primary} radius={0} fullWidth style={{ borderColor: active.primary }}>
                  View Coaching Services
                </Button>
              </Link>
            </Box>
          </Box>
        </SimpleGrid>
      </Stack>

      <Link href="/scholarcrafted" style={{ textDecoration: 'none', marginTop: rem(24) }}>
        <Button
          variant="outline"
          color={active.primary}
          px={rem(60)}
          style={{ borderColor: active.primary, color: active.primary }}
        >
          RETURN TO HOME
        </Button>
      </Link>
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
        display: 'block',
        padding: rem(20),
        backgroundColor: active ? activeTheme.background : activeTheme.surface,
        border: `1px solid ${active ? activeTheme.primary : `${activeTheme.primary}22`}`,
        transition: 'all 0.2s ease',
        position: 'relative',
        textAlign: 'left',
        width: '100%',
        height: '100%',
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
      <Group align="center" wrap="nowrap" gap="xl" style={{ height: '100%' }}>
        <Box 
          c={active ? activeTheme.primary : 'dimmed'} 
          style={{ transition: 'color 0.2s ease', flexShrink: 0 }}
        >
          {icon}
        </Box>
        
        <Stack gap={rem(4)} style={{ flex: 1 }}>
          <Text fw={600} size="xl" style={{ color: activeTheme.primary, lineHeight: 1.2 }}>
            {title}
          </Text>
          <Text size="sm" c="dimmed" lh={1.5}>
            {description}
          </Text>
        </Stack>

        {active && (
          <Box c={activeTheme.primary} style={{ flexShrink: 0 }}>
            <IconCheck size={24} stroke={3} />
          </Box>
        )}
      </Group>
    </UnstyledButton>
  )
}
