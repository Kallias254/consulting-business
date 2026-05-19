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
  rem,
  Group,
  useMantineTheme,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'
import Link from 'next/link'
import {
  IconCheck,
  IconCompass,
  IconTarget,
  IconMessageCircle,
  IconCertificate,
  IconUpload,
  IconFileText,
  IconEdit,
  IconAward,
} from '@tabler/icons-react'
import { SECTION_SPACING, INNER_WIDTH } from '@/layout'

const coachingSteps = [
  {
    step: '01',
    title: 'The Diagnostic Phase',
    subtitle: 'Untangling the Roadmap',
    desc: 'We start by auditing your current progress, your committee feedback, and your research design. We identify exactly where the stall is happening and why.',
    icon: IconCompass,
    tasks: [
      'Detailed audit of your current drafts',
      'Direct de-coding of committee feedback',
      'Identifying and mapping structural gaps',
      'Locating logic or data bottlenecks'
    ]
  },
  {
    step: '02',
    title: 'Strategic Milestones',
    subtitle: 'Building the Schedule',
    desc: 'We move from "hoping to finish" to a concrete calendar. We break your dissertation into manageable pieces with hyper-specific deliverables for each week.',
    icon: IconTarget,
    tasks: [
      'Custom, weekly writing schedules',
      'Regular conceptual alignment checks',
      'Detailed, chapter-level milestone roadmaps',
      'Setting highly realistic deliverables'
    ]
  },
  {
    step: '03',
    title: 'Iterative Refinement',
    subtitle: 'Execution & Feedback',
    desc: 'This is where the real work happens. We meet via video to solve methodological puzzles, review new drafts, and sharpen your authentic academic voice.',
    icon: IconMessageCircle,
    tasks: [
      'Ongoing 1-on-1 video deep dives',
      'Complete structural draft reviews',
      'Proactive accountability check-ins',
      'Step-by-step drafting and editing support'
    ]
  },
  {
    step: '04',
    title: 'Defense Readiness',
    subtitle: 'Final Validation',
    desc: 'As you approach submission, we pivot to defense coaching. We help you conceptualize your arguments so you can stand before your committee with absolute authority.',
    icon: IconCertificate,
    tasks: [
      'Realistic mock defense prep sessions',
      'Clear synthesis of arguments',
      'Technical pre-submission formatting audit',
      'Guidance on addressing final committee revisions'
    ]
  }
]

const editingSteps = [
  {
    step: '01',
    title: 'Submission & Scope',
    subtitle: 'Requesting Review',
    desc: 'You upload your manuscript, draft chapters, or raw data files through our secure portal, detailing your university’s guidelines and specific editorial concerns.',
    icon: IconUpload,
    tasks: [
      'Secure manuscript or data file upload',
      'Submission of university style manuals',
      'Specifying areas needing heavy focus',
      '100% confidential file handling'
    ]
  },
  {
    step: '02',
    title: 'Diagnostic Proposal',
    subtitle: 'Flat-Rate Quote',
    desc: 'A senior faculty consultant reviews your files to assess structural health and editing complexity, delivering a formal flat-rate proposal with a guaranteed delivery date.',
    icon: IconFileText,
    tasks: [
      'Assessment of structural writing health',
      'Transparent flat-rate price quotation',
      'Guaranteed delivery timeline commitment',
      'Detailed scope of all editing activities'
    ]
  },
  {
    step: '03',
    title: 'Editorial Execution',
    subtitle: 'Rigorous Faculty Editing',
    desc: 'Our specialized editors refine your manuscript. We do not just fix typos—we actively align arguments, polish flow, resolve citation errors, and harden your logic.',
    icon: IconEdit,
    tasks: [
      'Style, flow, and sentence polishing',
      'Structural alignment of arguments & logic',
      'Complete audit of citations & references',
      'Detailed marginal advice & explanations'
    ]
  },
  {
    step: '04',
    title: 'Delivery & Revisions',
    subtitle: 'Handback & Support',
    desc: 'We deliver your polished, defensible manuscript. We do not disappear—we remain fully available to help you understand the changes and address any committee feedback.',
    icon: IconAward,
    tasks: [
      'Tracked changes & clean manuscripts',
      'Detailed advisory editor\'s summary note',
      'Post-editing consultation call review',
      'Support addressing future faculty edits'
    ]
  }
]

export default function HowItWorksPage() {
  const theme = useMantineTheme()
  const active = theme.other
  const [path, setPath] = useState<'coaching' | 'editing'>('coaching')

  const steps = path === 'coaching' ? coachingSteps : editingSteps

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* Hero Header */}
      <Box component="section" pt={rem(140)} pb={rem(60)}>
        <Container size={1100}>
          <Stack gap="xl">
            <Box style={{ maxWidth: 800 }}>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}
                c={active.accent}
              >
                The Client Journey
              </Text>
              <Title
                order={1}
                mt="md"
                style={{
                  fontSize: rem(56),
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: active.primary,
                  fontFamily: 'var(--font-serif)'
                }}
              >
                A guided path from <br />
                stalled draft to submission.
              </Title>
              <Text size="lg" mt="xl" c="dimmed" lh={1.6} style={{ fontSize: rem(20) }}>
                Our process is designed to reduce the inherent uncertainty of independent research. 
                Select your path below to see exactly how we walk with you.
              </Text>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Path Selector Tabs */}
      <Box component="section" pb={rem(40)}>
        <Container size={1100}>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
            {/* Coaching Tab Button */}
            <UnstyledButton
              onClick={() => setPath('coaching')}
              style={{
                padding: rem(30),
                backgroundColor: path === 'coaching' ? `${active.primary}04` : 'transparent',
                border: `2px solid ${path === 'coaching' ? active.accent : `${active.primary}12`}`,
                transition: 'all 0.25s ease',
                textAlign: 'left',
              }}
            >
              <Group gap="md" wrap="nowrap" align="center">
                <ThemeIcon size={40} radius="xl" variant={path === 'coaching' ? 'filled' : 'light'} color={active.accent}>
                  <IconCompass size={22} />
                </ThemeIcon>
                <Box>
                  <Text fw={700} size="lg" c={active.primary}>Private Advisory Pathway</Text>
                  <Text size="xs" c="dimmed" mt={2}>For Live Coaching, Strategic Consulting & Logic Planning</Text>
                </Box>
              </Group>
            </UnstyledButton>

            {/* Editing Tab Button */}
            <UnstyledButton
              onClick={() => setPath('editing')}
              style={{
                padding: rem(30),
                backgroundColor: path === 'editing' ? `${active.primary}04` : 'transparent',
                border: `2px solid ${path === 'editing' ? active.accent : `${active.primary}12`}`,
                transition: 'all 0.25s ease',
                textAlign: 'left',
              }}
            >
              <Group gap="md" wrap="nowrap" align="center">
                <ThemeIcon size={40} radius="xl" variant={path === 'editing' ? 'filled' : 'light'} color={active.accent}>
                  <IconEdit size={22} />
                </ThemeIcon>
                <Box>
                  <Text fw={700} size="lg" c={active.primary}>Project-Based Pathway</Text>
                  <Text size="xs" c="dimmed" mt={2}>For Manuscript Editing, Proofreading & Data Support</Text>
                </Box>
              </Group>
            </UnstyledButton>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Interactive Timeline Section */}
      <Box
        component="section"
        className="academic-watermark"
        py={SECTION_SPACING}
        bg={active.surface}
        style={{ borderTop: `1px solid ${active.primary}11` }}
      >
        <Container size={1100}>
          <Box style={{ position: 'relative', marginTop: rem(20) }}>
            {/* Vertical Timeline Connection Line */}
            <Box 
              style={{ 
                position: 'absolute', 
                left: rem(24), 
                top: rem(24), 
                bottom: rem(24), 
                width: '2px', 
                backgroundColor: `${active.accent}20`,
                zIndex: 0
              }}
              visibleFrom="sm"
            />

            <Stack gap={rem(80)}>
              {steps.map((phase, i) => (
                <Group key={i} align="flex-start" wrap="nowrap" gap="xl" style={{ position: 'relative', zIndex: 1 }}>
                  {/* Timeline Node Badge */}
                  <Box 
                    style={{ 
                      flex: '0 0 50px', 
                      height: '50px', 
                      borderRadius: '50%', 
                      backgroundColor: active.background,
                      border: `2px solid ${active.accent}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 0 0 4px ${active.background}`,
                    }}
                    visibleFrom="sm"
                  >
                    <Text fw={700} style={{ fontSize: rem(18), color: active.accent, fontFamily: 'var(--font-serif)' }}>{phase.step}</Text>
                  </Box>

                  <Box style={{ flex: 1, paddingLeft: rem(10) }}>
                    <Group gap="sm" mb="xs">
                      <ThemeIcon size={24} radius="xl" variant="light" color={active.accent} style={{ display: 'inline-flex' }}>
                        <phase.icon size={14} />
                      </ThemeIcon>
                      <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}>{phase.subtitle}</Text>
                    </Group>
                    
                    <Title order={3} style={{ fontSize: rem(28), color: active.primary, marginBottom: rem(12), fontFamily: 'var(--font-serif)' }}>
                      {phase.title}
                    </Title>
                    
                    <Text size="md" lh={1.7} c="dimmed" mb="lg" style={{ maxWidth: 700 }}>
                      {phase.desc}
                    </Text>
                    
                    {/* Vertical Bullets List (Grouped into two neat columns on large screens) */}
                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" style={{ maxWidth: 700 }}>
                      {phase.tasks.map((task, j) => (
                        <Group key={j} gap="sm" wrap="nowrap" align="flex-start">
                          <IconCheck size={16} color={active.accent} stroke={3} style={{ marginTop: rem(2) }} />
                          <Text size="sm" c={active.primary} lh={1.4}>{task}</Text>
                        </Group>
                      ))}
                    </SimpleGrid>
                  </Box>
                </Group>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box component="section" py={SECTION_SPACING}>
        <Container size={760}>
          <Stack gap="xl" align="center" style={{ textAlign: 'center' }}>
            <Title order={2} style={{ fontSize: rem(42), color: active.primary, fontFamily: 'var(--font-serif)' }}>
              What happens next?
            </Title>
            <Text size="lg" c="dimmed" lh={1.6}>
              After you submit your project files and requirements for review, our faculty will perform a professional assessment and issue a customized service proposal and quote designed to get you to submission within 24 hours.
            </Text>
            <Group gap="md">
              <Link href="/scholarcrafted/request-review" style={{ textDecoration: 'none' }}>
                <Button size="lg" variant="filled" bg={active.primary} radius={0} className="impeccable-button">
                  GET A QUOTE
                </Button>
              </Link>
              <Link href="/scholarcrafted/about" style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  variant="outline"
                  color={active.primary}
                  radius={0}
                  style={{ borderColor: active.primary, color: active.primary }}
                >
                  LEARN ABOUT THE TEAM
                </Button>
              </Link>
            </Group>
          </Stack>
        </Container>
      </Box>

      <Footer bg={active.surface} />
    </Box>
  )
}
