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
  TextInput,
  Textarea,
  rem,
  Group,
  UnstyledButton,
  Progress,
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
  specifics: string
  stage: string
  preferredDate: Date | null
  preferredTime: string
  name: string
  email: string
  description: string
}

export default function ConsultationPage() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<StepData>({
    interest: '',
    specifics: '',
    stage: '',
    preferredDate: new Date(),
    preferredTime: '',
    name: '',
    email: '',
    description: '',
  })

  const theme = useMantineTheme()
  const active = theme.other
  const totalSteps = 5

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps))
  const prevStep = () => setStep((s) => Math.max(s - 1, 0))

  const selectOption = (field: keyof StepData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }))
    if (field !== 'preferredDate' && field !== 'preferredTime') {
      nextStep()
    }
  }

  const stepHeadlines = [
    {
      title: 'What are you interested in?',
      desc: "This short diagnostic helps us understand your project's unique needs, ensuring our initial consultation is as productive as possible.",
    },
    {
      title: 'How can we best support you?',
      desc: 'Select the primary area where you feel you need the most immediate intervention.',
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
      title: 'Finalize your inquiry',
      desc: 'Please provide your contact information and a brief overview of your research.',
    },
    {
      title: 'Consultation Initialized.',
      desc: 'You have taken a decisive step toward completion. Micah, PhD is personally reviewing your research profile and will confirm your strategy session within 24 hours.',
    },
  ]

  const stepsContent = [
    <StepInterest key={0} data={data} selectOption={selectOption} />,
    <StepSpecifics key={1} data={data} selectOption={selectOption} />,
    <StepStage key={2} data={data} selectOption={selectOption} />,
    <StepDateTime key={3} data={data} setData={setData} nextStep={nextStep} />,
    <StepForm key={4} data={data} setData={setData} nextStep={nextStep} />,
    <StepSuccess key={5} data={data} setStep={setStep} />,
  ]

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* Top White Section */}
      <Box component="section" pt={rem(100)} pb={rem(60)} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <Box style={{ maxWidth: 800, margin: 'auto', textAlign: 'center' }}>
            {step < totalSteps && (
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c="dimmed"
              >
                Step {step + 1}
              </Text>
            )}
            <Title
              order={1}
              mt="md"
              style={{
                fontSize: rem(48),
                fontWeight: 400,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: active.primary,
                fontFamily: 'var(--font-serif)',
              }}
            >
              {stepHeadlines[step].title}
            </Title>
            <Text size="lg" c="dimmed" lh={1.6} mt="xl">
              {stepHeadlines[step].desc}
            </Text>
          </Box>
        </Container>
      </Box>

      {/* Main Stepper Section on Gray */}
      <Box
        component="section"
        py={rem(80)}
        bg={active.surface}
        style={{ borderTop: `1px solid ${active.primary}22` }}
      >
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(40)}>
            {step < totalSteps && (
              <Stack gap="md">
                <Progress
                  value={(step / (totalSteps - 1)) * 100}
                  size="sm"
                  color={active.primary}
                  radius={0}
                  styles={{ section: { transition: 'width 500ms ease' } }}
                />
                <Group justify="space-between" w="100%">
                  {step > 0 ? (
                    <UnstyledButton
                      onClick={prevStep}
                      style={{ display: 'flex', alignItems: 'center', gap: rem(8) }}
                    >
                      <IconArrowLeft size={16} />
                      <Text
                        size="xs"
                        fw={700}
                        style={{
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: active.primary,
                        }}
                      >
                        Back
                      </Text>
                    </UnstyledButton>
                  ) : (
                    <div />
                  )}
                  <Text
                    size="xs"
                    fw={700}
                    style={{ letterSpacing: '0.1em', color: active.primary }}
                  >
                    {step + 1} / {totalSteps}
                  </Text>
                </Group>
              </Stack>
            )}

            <Box mt="xl">{stepsContent[step]}</Box>
          </Stack>
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
          title: 'Private Coaching',
          desc: '1-on-1 strategic support and mentorship',
          icon: <IconUsers size={28} />,
        },
        {
          id: 'editing',
          title: 'Express Services',
          desc: 'Editorial, coding, and technical support',
          icon: <IconEdit size={28} />,
        },
        {
          id: 'blueprints',
          title: 'Research Blueprints',
          desc: 'Guided courses and project templates',
          icon: <IconFileText size={28} />,
        },
        {
          id: 'events',
          title: 'Free Events',
          desc: 'Workshops and group methodology sessions',
          icon: <IconCertificate size={28} />,
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

function StepSpecifics({ data, selectOption }: any) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" mt={rem(40)}>
      {[
        {
          id: 'methodology',
          title: 'Methodology Design',
          desc: 'Structuring your research approach',
          icon: <IconSearch size={28} />,
        },
        {
          id: 'editing',
          title: 'Language & Flow',
          desc: 'Refining prose and structural logic',
          icon: <IconEdit size={28} />,
        },
        {
          id: 'coding',
          title: 'Data Coding',
          desc: 'Qualitative or quantitative analysis',
          icon: <IconClock size={28} />,
        },
        {
          id: 'defense',
          title: 'Defense Strategy',
          desc: 'Preparation for the final committee',
          icon: <IconCertificate size={28} />,
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
              href="/scholarcrafted/services/dissertation-coaching"
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
            your research profile and will confirm your strategy session within 24 hours.
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
              While You Wait
            </Text>
            <Stack gap="lg">
              <Group align="flex-start" gap="md" wrap="nowrap">
                <Text fw={700} c={active.accent}>
                  01
                </Text>
                <Box>
                  <Text fw={600} size="sm">
                    Audit your latest feedback
                  </Text>
                  <Text size="xs" c="dimmed">
                    Review the most recent comments from your committee to identify recurring
                    themes.
                  </Text>
                </Box>
              </Group>
              <Group align="flex-start" gap="md" wrap="nowrap">
                <Text fw={700} c={active.accent}>
                  02
                </Text>
                <Box>
                  <Text fw={600} size="sm">
                    Isolate the "Stall Point"
                  </Text>
                  <Text size="xs" c="dimmed">
                    Pinpoint the exact chapter or conceptual bridge where your momentum collapsed.
                  </Text>
                </Box>
              </Group>
              <Group align="flex-start" gap="md" wrap="nowrap">
                <Text fw={700} c={active.accent}>
                  03
                </Text>
                <Box>
                  <Text fw={600} size="sm">
                    Check your inbox
                  </Text>
                  <Text size="xs" c="dimmed">
                    We've sent a preliminary onboarding document to <strong>{data.email}</strong>.
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
                  "I was stuck for 18 months before this consultation. Within 30 minutes, Micah
                  identified a structural flaw in my second chapter that changed everything."
                </Text>
                <Text size="xs" fw={700} mt="xs" style={{ letterSpacing: '0.05em' }}>
                  &mdash; DR. SARAH J., PH.D. (YALE)
                </Text>
              </Box>
              <Divider style={{ opacity: 0.3 }} />
              <Box>
                <Text size="sm" fs="italic" lh={1.6}>
                  "The most rigorous academic support I've encountered. They don't do the work for
                  you; they help you produce work you are proud to defend."
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

function SelectionCard({ title, description, icon, active, onClick }: any) {
  const theme = useMantineTheme()
  const activeTheme = theme.other

  return (
    <UnstyledButton
      onClick={onClick}
      style={{
        padding: rem(32),
        backgroundColor: active ? activeTheme.surface : 'white',
        border: `1px solid ${active ? activeTheme.primary : '#eee'}`,
        transition: 'all 0.2s ease',
        position: 'relative',
        textAlign: 'left',
        height: '100%',
      }}
      className="selection-card"
    >
      <Stack gap="md">
        <Box c={active ? activeTheme.accent : 'dark.2'} style={{ transition: 'color 0.2s ease' }}>
          {icon}
        </Box>
        <Stack gap={4}>
          <Text
            fw={600}
            size="lg"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: rem(22),
              color: activeTheme.primary,
            }}
          >
            {title}
          </Text>
          <Text size="sm" c="dimmed" lh={1.5}>
            {description}
          </Text>
        </Stack>
      </Stack>
      {active && (
        <Box style={{ position: 'absolute', top: rem(20), right: rem(20) }} c={activeTheme.accent}>
          <IconCheck size={20} stroke={3} />
        </Box>
      )}
    </UnstyledButton>
  )
}
