'use client'

import React, { useState, Suspense } from 'react'
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
  Progress,
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'
import { useSearchParams } from 'next/navigation'
import {
  IconCheck,
  IconX,
  IconFileText,
  IconMicroscope,
  IconEdit,
  IconSearch,
  IconArrowLeft,
  IconSchool,
  IconCertificate,
  IconUser,
  IconNotebook,
} from '@tabler/icons-react'
import Link from 'next/link'
import { INNER_WIDTH } from '@/layout'

export default function RequestReviewPage() {
  return (
    <Suspense fallback={<Box bg="gray.1" style={{ minHeight: '100vh' }} />}>
      <RequestReviewContent />
    </Suspense>
  )
}

function SelectionCard({ title, description, icon, active, onClick }: any) {
  const theme = useMantineTheme()
  const current = theme.other

  return (
    <UnstyledButton
      onClick={onClick}
      style={{
        display: 'block',
        width: '100%',
        padding: rem(24),
        backgroundColor: active ? current.primary : current.surface,
        border: `1px solid ${active ? current.primary : 'rgba(0,0,0,0.1)'}`,
        transition: 'all 0.2s ease',
        color: active ? 'white' : current.primary,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Group wrap="nowrap" align="flex-start" gap="md">
        <Box c={active ? 'white' : current.accent}>{icon}</Box>
        <Box style={{ flex: 1 }}>
          <Text fw={600} size="lg" mb={4} style={{ color: active ? 'white' : current.primary }}>
            {title}
          </Text>
          <Text size="sm" style={{ color: active ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.6)' }} lh={1.4}>
            {description}
          </Text>
        </Box>
        {active && (
          <Box style={{ position: 'absolute', top: rem(24), right: rem(24) }}>
            <IconCheck size={20} color="white" />
          </Box>
        )}
      </Group>
    </UnstyledButton>
  )
}

function RequestReviewContent() {
  const theme = useMantineTheme()
  const active = theme.other
  const searchParams = useSearchParams()

  const [step, setStep] = useState(0)
  const [data, setData] = useState({
    service: '',
    academicLevel: '',
    university: '',
    wordCount: 0,
    deadline: null as Date | null,
    details: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  const totalSteps = 6
  const isSuccessStep = step === totalSteps - 1

  // Handle direct links from Service pages (e.g. ?service=Custom%20Research)
  React.useEffect(() => {
    const queryService = searchParams.get('service')
    if (queryService && step === 0 && !data.service) {
      let mappedService = queryService
      if (queryService.includes('Editing') || queryService === 'Formatting') mappedService = 'editing'
      if (queryService.includes('Research') || queryService.includes('Data')) mappedService = 'data_support'
      if (queryService.includes('Technical')) mappedService = 'technical'

      setData((prev) => ({ ...prev, service: mappedService }))
      setStep(1) // skip the first step since it's pre-filled
    }
  }, [searchParams])

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps - 1))
  const prevStep = () => setStep((s) => Math.max(s - 1, 0))

  const selectOption = (field: keyof typeof data, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }))
    nextStep()
  }

  const stepHeadlines = [
    {
      title: 'What do you need help with?',
      desc: 'Select the primary service you require so we can tailor the rest of this intake form.',
    },
    {
      title: 'What is your academic level?',
      desc: 'Select your level of study so we can match your project with a faculty lead of matching scholarly expertise.',
    },
    {
      title: 'Institution & Scope',
      desc: 'This helps us assign your project to the correct disciplinary background and prepare university-specific formatting.',
    },
    {
      title: 'Provide Project Details',
      desc: 'Specify unique formatting needs, style guides (e.g. APA, Harvard), or specific goals you want us to address.',
    },
    {
      title: 'Identity & Contact',
      desc: 'Please provide your details so we can email your secure project proposal within 24 hours.',
    },
    {
      title: 'Request Received',
      desc: 'Thank you for submitting your project details. A faculty coordinator will review your materials and issue a formal quote shortly.',
    },
  ]

  const isStep2Valid = data.university.trim() !== '' && data.deadline !== null
  const isStep3Valid = data.details.trim().length > 10
  const isStep4Valid = data.firstName.trim() !== '' && data.lastName.trim() !== '' && data.email.trim() !== ''

  const stepsContent = [
    <StepService key={0} data={data} selectOption={selectOption} />,
    <StepAcademicLevel key={1} data={data} selectOption={selectOption} />,
    <StepScope key={2} data={data} setData={setData} nextStep={nextStep} isValid={isStep2Valid} />,
    <StepDetails key={3} data={data} setData={setData} nextStep={nextStep} isValid={isStep3Valid} />,
    <StepIdentity key={4} data={data} setData={setData} nextStep={nextStep} isValid={isStep4Valid} />,
    <StepSuccess key={5} data={data} />,
  ]

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary, display: 'flex', flexDirection: 'column' }}>
      <Box 
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
            <Link href="/scholarcrafted" style={{ textDecoration: 'none' }}>
              <Group 
                gap="xs" 
                align="center" 
                p="xs" 
                style={{ 
                  borderRadius: rem(100), 
                  border: `1px solid ${active.primary}40`, 
                  cursor: 'pointer',
                  paddingLeft: rem(16),
                  paddingRight: rem(12),
                }}
              >
                <Text className="impeccable-eyebrow" size="xs" c={active.primary}>EXIT</Text>
                <IconX size={14} color={active.primary} />
              </Group>
            </Link>
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
            
            {step < totalSteps && !isSuccessStep && (
              <Stack gap="xs" align="center">
                <Text className="impeccable-eyebrow" size="xs" c="dimmed">
                  Quote Request Step {step + 1}
                </Text>
                <Progress
                  value={(step / (totalSteps - 2)) * 100}
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

function StepService({ data, selectOption }: any) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" mt={rem(40)}>
      {[
        {
          id: 'editing',
          title: 'Structural Editing & Proofreading',
          desc: 'Manuscript refinement, formatting, and proofing',
          icon: <IconEdit size={28} />,
        },
        {
          id: 'data_support',
          title: 'Custom Research & Data Support',
          desc: 'Technical assistance, NVivo, SPSS, methodology',
          icon: <IconMicroscope size={28} />,
        },
        {
          id: 'technical',
          title: 'Targeted Technical Support',
          desc: 'Reference styling, compliance matrices, indexing',
          icon: <IconFileText size={28} />,
        },
        {
          id: 'other',
          title: 'Unsure / Other',
          desc: 'Submit for a custom faculty assessment',
          icon: <IconSearch size={28} />,
        },
      ].map((item) => (
        <SelectionCard
          key={item.id}
          title={item.title}
          description={item.desc}
          icon={item.icon}
          active={data.service === item.id}
          onClick={() => selectOption('service', item.id)}
        />
      ))}
    </SimpleGrid>
  )
}

function StepAcademicLevel({ data, selectOption }: any) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" mt={rem(40)}>
      {[
        {
          id: 'undergrad',
          title: 'Undergraduate',
          desc: 'Coursework assignments, honor theses, or capstone projects.',
          icon: <IconNotebook size={28} />,
        },
        {
          id: 'masters',
          title: "Master's Degree",
          desc: 'Master theses, research essays, or course projects.',
          icon: <IconSchool size={28} />,
        },
        {
          id: 'doctoral',
          title: 'Doctoral (PhD / EdD / DBA)',
          desc: 'Doctoral dissertations, proposals, or complex monographs.',
          icon: <IconCertificate size={28} />,
        },
        {
          id: 'professional',
          title: 'Professional / Post-Doc',
          desc: 'Journal manuscripts, grant proposals, or book drafts.',
          icon: <IconUser size={28} />,
        },
      ].map((item) => (
        <SelectionCard
          key={item.id}
          title={item.title}
          description={item.desc}
          icon={item.icon}
          active={data.academicLevel === item.id}
          onClick={() => selectOption('academicLevel', item.id)}
        />
      ))}
    </SimpleGrid>
  )
}

function StepScope({ data, setData, nextStep, isValid }: any) {
  const { other: active } = useMantineTheme()
  return (
    <Box bg={active.background} p={rem(40)} style={{ border: `1px solid ${active.primary}12` }} mt={rem(40)}>
      <Stack gap="xl">
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          <TextInput
            label="University / Institution Affiliation"
            placeholder="e.g. Harvard University"
            required
            radius={0}
            value={data.university}
            onChange={(e) => setData({ ...data, university: e.target.value })}
            description="Allows us to match university-specific formatting guidelines."
          />
          <NumberInput
            label="Approximate Word Count"
            placeholder="e.g. 15000"
            radius={0}
            min={0}
            value={data.wordCount}
            onChange={(val) => setData({ ...data, wordCount: typeof val === 'number' ? val : 0 })}
            description="Optional for technical or hourly support."
          />
        </SimpleGrid>

        <DatePickerInput
          label="Desired Return Date"
          placeholder="Select a date"
          required
          radius={0}
          minDate={new Date()}
          value={data.deadline}
          onChange={(val) => setData({ ...data, deadline: val as Date | null })}
          description="Include a 24-48h buffer before your actual deadline."
        />

        <Group justify="flex-end" mt="md">
          <Button
            size="lg"
            bg={active.primary}
            radius={0}
            onClick={nextStep}
            disabled={!isValid}
            className="impeccable-button"
          >
            CONTINUE
          </Button>
        </Group>
      </Stack>
    </Box>
  )
}

function StepDetails({ data, setData, nextStep, isValid }: any) {
  const { other: active } = useMantineTheme()
  return (
    <Box bg={active.background} p={rem(40)} style={{ border: `1px solid ${active.primary}12` }} mt={rem(40)}>
      <Stack gap="xl">
        <Textarea
          label="How would you like us to help?"
          placeholder="Specify unique formatting needs, style guides (APA, MLA), or specific concerns you want the faculty to address..."
          required
          radius={0}
          minRows={5}
          value={data.details}
          onChange={(e) => setData({ ...data, details: e.target.value })}
        />

        <Group justify="flex-end" mt="md">
          <Button
            size="lg"
            bg={active.primary}
            radius={0}
            onClick={nextStep}
            disabled={!isValid}
            className="impeccable-button"
          >
            CONTINUE TO CONTACT
          </Button>
        </Group>
      </Stack>
    </Box>
  )
}

function StepIdentity({ data, setData, nextStep, isValid }: any) {
  const { other: active } = useMantineTheme()
  return (
    <Box bg={active.background} p={rem(40)} style={{ border: `1px solid ${active.primary}12` }} mt={rem(40)}>
      <Stack gap="xl">
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
          <TextInput
            label="First Name"
            placeholder="e.g. Jane"
            required
            radius={0}
            value={data.firstName}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
          />
          <TextInput
            label="Last Name"
            placeholder="e.g. Doe"
            required
            radius={0}
            value={data.lastName}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
          />
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
          <TextInput
            label="Email Address"
            placeholder="e.g. jane.doe@university.edu"
            required
            radius={0}
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            description="We recommend using your academic email if possible."
          />
          <TextInput
            label="Phone Number"
            placeholder="e.g. +1 (555) 000-0000"
            radius={0}
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            description="Optional. Used only for text alerts regarding your quote."
          />
        </SimpleGrid>

        <Group justify="flex-end" mt="xl">
          <Button
            size="lg"
            bg={active.primary}
            radius={0}
            onClick={nextStep}
            disabled={!isValid}
            className="impeccable-button"
          >
            REQUEST CUSTOM QUOTE
          </Button>
        </Group>
      </Stack>
    </Box>
  )
}

function StepSuccess({ data }: any) {
  const { other: active } = useMantineTheme()
  return (
    <Box bg={active.background} p={rem(60)} style={{ border: `1px solid ${active.primary}12`, textAlign: 'center' }} mt={rem(40)}>
      <Stack align="center" gap="lg">
        <Box c={active.accent}>
          <IconCheck size={64} stroke={1.5} />
        </Box>
        <Title order={2} style={{ color: active.primary }}>
          Submission Securely Received
        </Title>
        <Text size="lg" c="dimmed" lh={1.6} style={{ maxWidth: 600 }}>
          Thank you, {data.firstName || 'there'}. We have securely received your details. A
          faculty coordinator will review your submission and issue a formal quote to{' '}
          <strong>{data.email}</strong> within 24 hours.
        </Text>
        <Link href="/scholarcrafted" style={{ textDecoration: 'none' }}>
          <Button variant="outline" color={active.primary} radius={0} mt="xl">
            RETURN TO HOME
          </Button>
        </Link>
      </Stack>
    </Box>
  )
}
