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

  // --- Step Components ---

  const StepInterest = () => (
    <Stack gap="xl">
      <Box style={{ textAlign: 'center' }}>
        <Text
          size="xs"
          fw={700}
          style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
          c="dimmed"
        >
          Step 01
        </Text>
        <Title
          order={1}
          mt="md"
          style={{
            fontSize: rem(42),
            fontWeight: 400,
            fontFamily: 'var(--font-serif)',
            color: active.primary,
          }}
        >
          What are you interested in?
        </Title>
      </Box>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
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
    </Stack>
  )

  const StepSpecifics = () => (
    <Stack gap="xl">
      <Box style={{ textAlign: 'center' }}>
        <Text
          size="xs"
          fw={700}
          style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
          c="dimmed"
        >
          Step 02
        </Text>
        <Title
          order={1}
          mt="md"
          style={{
            fontSize: rem(42),
            fontWeight: 400,
            fontFamily: 'var(--font-serif)',
            color: active.primary,
          }}
        >
          How can we best support you?
        </Title>
      </Box>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
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
    </Stack>
  )

  const StepStage = () => (
    <Stack gap="xl">
      <Box style={{ textAlign: 'center' }}>
        <Text
          size="xs"
          fw={700}
          style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
          c="dimmed"
        >
          Step 03
        </Text>
        <Title
          order={1}
          mt="md"
          style={{
            fontSize: rem(42),
            fontWeight: 400,
            fontFamily: 'var(--font-serif)',
            color: active.primary,
          }}
        >
          What is your current phase?
        </Title>
      </Box>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
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
    </Stack>
  )

  const StepDateTime = () => (
    <Stack gap="xl">
      <Box style={{ textAlign: 'center' }}>
        <Text
          size="xs"
          fw={700}
          style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
          c="dimmed"
        >
          Step 04
        </Text>
        <Title
          order={1}
          mt="md"
          style={{
            fontSize: rem(42),
            fontWeight: 400,
            fontFamily: 'var(--font-serif)',
            color: active.primary,
          }}
        >
          Request a preferred window
        </Title>
      </Box>
      <Box bg={active.background} p={rem(40)} style={{ border: '1px solid #eee' }}>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(60)}>
          <Stack align="center" gap="md">
            <Text fw={700} size="xs" style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Select Date
            </Text>
            <DatePicker
              value={data.preferredDate}
              onChange={(d) => setData((prev) => ({ ...prev, preferredDate: d }))}
              minDate={new Date()}
              classNames={{ day: 'calendar-day' }}
            />
          </Stack>
          <Stack gap="md">
            <Text fw={700} size="xs" style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Select Time Window
            </Text>
            <Stack gap="sm">
              {[
                { id: 'morning', title: 'Morning', range: '09:00 - 12:00' },
                { id: 'afternoon', title: 'Afternoon', range: '13:00 - 17:00' },
                { id: 'evening', title: 'Evening', range: '18:00 - 20:00' },
              ].map((slot) => (
                <UnstyledButton
                  key={slot.id}
                  onClick={() => setData((prev) => ({ ...prev, preferredTime: slot.id }))}
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
    </Stack>
  )

  const StepForm = () => (
    <Stack gap="xl">
      <Box style={{ textAlign: 'center' }}>
        <Text
          size="xs"
          fw={700}
          style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
          c="dimmed"
        >
          Step 05
        </Text>
        <Title
          order={1}
          mt="md"
          style={{
            fontSize: rem(42),
            fontWeight: 400,
            fontFamily: 'var(--font-serif)',
            color: active.primary,
          }}
        >
          Finalize your inquiry
        </Title>
      </Box>
      <Box bg={active.background} p={rem(40)} style={{ border: '1px solid #eee' }}>
        <Stack gap="lg">
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
            <TextInput
              label="Full Name"
              placeholder="e.g. Dr. Jane Smith"
              radius={0}
              value={data.name}
              onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
            />
            <TextInput
              label="Email Address"
              placeholder="e.g. j.smith@university.edu"
              radius={0}
              value={data.email}
              onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
            />
          </SimpleGrid>
          <Textarea
            label="Brief Project Description"
            placeholder="Describe your research topic and current challenges..."
            minRows={4}
            radius={0}
            value={data.description}
            onChange={(e) => setData((prev) => ({ ...prev, description: e.target.value }))}
          />
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
        </Stack>
      </Box>
    </Stack>
  )

  const StepSuccess = () => (
    <Stack gap={rem(60)} align="center" style={{ textAlign: 'center' }}>
      <Stack gap="xl" align="center">
        <Box c={active.accent}>
          <IconCertificate size={64} stroke={1.5} />
        </Box>
        <Box>
          <Title
            order={1}
            style={{
              fontSize: rem(42),
              fontWeight: 400,
              fontFamily: 'var(--font-serif)',
              color: active.primary,
            }}
          >
            Consultation Initialized.
          </Title>
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

  return (
    <Box
      bg={active.surface}
      style={{ minHeight: '100vh', color: active.primary, position: 'relative' }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* Hide global elements */
        header, footer { display: none !important; }

        .calendar-day[data-selected] {
          background-color: ${active.primary} !important;
          color: white !important;
          border-radius: 0 !important;
        }
        .calendar-day {
          border-radius: 0 !important;
        }

        .selection-card:hover {
          border-color: ${active.primary} !important;
          background-color: ${active.surface} !important;
        }
        .selection-card:hover svg {
          color: ${active.accent} !important;
        }
      `,
        }}
      />

      {/* Header-lite */}
      <Box component="nav" py="xl" style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <Container size={INNER_WIDTH}>
          <Group justify="space-between">
            <Link href="/scholarcrafted" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Stack gap={0}>
                <Text
                  fw={700}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: rem(20),
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    color: active.primary,
                  }}
                >
                  SCHOLARCRAFTED
                </Text>
              </Stack>
            </Link>
            {step < totalSteps && (
              <UnstyledButton
                onClick={() => (window.location.href = '/scholarcrafted')}
                style={{ opacity: 0.5 }}
              >
                <Text
                  size="xs"
                  fw={700}
                  style={{
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: active.primary,
                  }}
                >
                  Exit
                </Text>
              </UnstyledButton>
            )}
          </Group>
        </Container>
      </Box>

      <Center style={{ minHeight: '100vh', padding: `${rem(100)} 0` }}>
        <Container size={INNER_WIDTH} w="100%">
          <Stack gap={rem(60)}>
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

            <Box>
              {step === 0 && <StepInterest />}
              {step === 1 && <StepSpecifics />}
              {step === 2 && <StepStage />}
              {step === 3 && <StepDateTime />}
              {step === 4 && <StepForm />}
              {step === 5 && <StepSuccess />}
            </Box>
          </Stack>
        </Container>
      </Center>
    </Box>
  )
}

interface CardProps {
  title: string
  description: string
  icon: React.ReactNode
  active: boolean
  onClick: () => void
}

function SelectionCard({ title, description, icon, active, onClick }: CardProps) {
  const theme = useMantineTheme()
  const activeTheme = theme.other

  return (
    <UnstyledButton
      onClick={onClick}
      style={{
        padding: rem(32),
        backgroundColor: active ? activeTheme.background : 'white',
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
