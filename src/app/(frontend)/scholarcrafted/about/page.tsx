'use client'

import React from 'react'
import {
  Container,
  Title,
  Text,
  Box,
  SimpleGrid,
  Stack,
  Image,
  Divider,
  rem,
  Group,
  Button,
  useMantineTheme,
  ThemeIcon,
  Center,
} from '@mantine/core'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'
import Link from 'next/link'
import { IconCheck, IconX, IconMessageChatbot, IconRocket } from '@tabler/icons-react'

const SECTION_SPACING = rem(140)
const INNER_WIDTH = 800

const team = [
  {
    name: 'Micah, PhD',
    role: 'Faculty Lead & Founder',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000',
  },
  {
    name: 'Dr. Al-Saraf',
    role: 'Qualitative Specialist',
    image:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=1000',
  },
  {
    name: 'Dr. Haining',
    role: 'STEM & Medical Sciences',
    image:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1000',
  },
  {
    name: 'Dr. Warren',
    role: 'Humanities & SocSci',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=1000',
  },
  {
    name: 'Dr. Lehan',
    role: 'Statistical Analysis',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1000',
  },
  {
    name: 'Dr. Simmons',
    role: 'Manuscript Architecture',
    image:
      'https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&q=80&w=1000',
  },
  {
    name: 'Dr. Jansen',
    role: 'Ethics & Compliance',
    image:
      'https://images.unsplash.com/photo-1560250047-0ae9630c494d?auto=format&fit=crop&q=80&w=1000',
  },
  {
    name: 'Dr. Moore',
    role: 'Post-Doctoral Strategy',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1000',
  },
  {
    name: 'Dr. Phair',
    role: 'Grant Writing',
    image:
      'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&q=80&w=1000',
  },
  {
    name: 'Dr. Rautenbach',
    role: 'Journal Submissions',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000',
  },
]

const awards = [
  '#1 in Trustpilot’s “Private Tutor” Category',
  'Winner: Most Trusted Dissertation Coach (Business Excellence Awards)',
  'Winner: Best Private Coaching Service (AI International)',
  'Gold Award for Science & Education Video (TITAN)',
  'Accredited Member of The Tutor’s Association UK',
  '100+ years combined academic experience within the team',
  '10,000+ students supported on a 1:1 basis',
]

export default function AboutPage() {
  const theme = useMantineTheme()
  const active = theme.other

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* Hero: Philosophy */}
      <Box component="section" pt={rem(100)} pb={rem(80)} bg={active.background}>
        <Container size={1100}>
          <Box style={{ maxWidth: 800 }}>
            <Text
              size="xs"
              fw={700}
              style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
              c="dimmed"
            >
              About ScholarCrafted
            </Text>
            <Title
              order={1}
              mt="md"
              style={{
                fontSize: rem(56),
                fontWeight: 400,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: active.primary,
              }}
            >
              Scholarly Rigor. <br />
              Human Guidance.
            </Title>
            <Text size="xl" c="dimmed" lh={1.6} mt="xl" style={{ maxWidth: 600 }}>
              While algorithms can check for plagiarism, they cannot replicate the nuanced,
              structural insight of a seasoned academic. Our institution is founded on the principle
              of PhD-led mentorship.
            </Text>
          </Box>
        </Container>
      </Box>

      {/* Team Grid */}
      <Box
        component="section"
        py={SECTION_SPACING}
        bg={active.surface}
        style={{ borderTop: '1px solid #eee' }}
      >
        <Container size={1100}>
          <SimpleGrid cols={{ base: 2, sm: 4, md: 5 }} spacing="xl">
            {team.map((member) => (
              <Stack key={member.name} gap="sm" align="center">
                <Image
                  src={member.image}
                  alt={member.name}
                  radius="50%"
                  h={150}
                  w={150}
                  fit="cover"
                  style={{ border: '1px solid #eee' }}
                />
                <Stack gap={0} align="center" style={{ textAlign: 'center' }}>
                  <Text fw={600} size="sm">
                    {member.name}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {member.role}
                  </Text>
                </Stack>
              </Stack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* The Client Journey */}
      <Box component="section" py={SECTION_SPACING} bg={active.background}>
        <Container size={1100}>
          <Stack gap={rem(80)} align="center" style={{ textAlign: 'center' }}>
            <Box style={{ maxWidth: 700 }}>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c="dimmed"
              >
                The Client Journey
              </Text>
              <Title
                order={2}
                mt="md"
                style={{ fontSize: rem(48), fontWeight: 400, color: active.primary }}
              >
                A clear, structured process <br /> from start to finish.
              </Title>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(60)}>
              <Stack align="center" gap="md">
                <ThemeIcon size={64} radius="xl" variant="light" color="dark">
                  <IconMessageChatbot size={32} stroke={1.5} />
                </ThemeIcon>
                <Text fw={700} size="lg" style={{ fontFamily: 'var(--font-serif)' }}>
                  01. Strategic Review
                </Text>
                <Text size="sm" c="dimmed" lh={1.6}>
                  A deep-dive consultation to understand your project, identify roadblocks, and map
                  a clear path forward.
                </Text>
              </Stack>
              <Stack align="center" gap="md">
                <ThemeIcon size={64} radius="xl" variant="light" color="dark">
                  <IconRocket size={32} stroke={1.5} />
                </ThemeIcon>
                <Text fw={700} size="lg" style={{ fontFamily: 'var(--font-serif)' }}>
                  02. Guided Implementation
                </Text>
                <Text size="sm" c="dimmed" lh={1.6}>
                  Work directly with a PhD-level specialist to execute the plan with regular
                  check-ins and structured feedback.
                </Text>
              </Stack>
              <Stack align="center" gap="md">
                <ThemeIcon size={64} radius="xl" variant="light" color="dark">
                  <IconCheck size={32} stroke={1.5} />
                </ThemeIcon>
                <Text fw={700} size="lg" style={{ fontFamily: 'var(--font-serif)' }}>
                  03. Final Submission
                </Text>
                <Text size="sm" c="dimmed" lh={1.6}>
                  Finalize your manuscript with confidence, knowing it has been rigorously reviewed
                  for clarity, structure, and impact.
                </Text>
              </Stack>
            </SimpleGrid>
            <Link href="/scholarcrafted/how-it-works" style={{ textDecoration: 'none' }}>
              <Button
                size="lg"
                variant="outline"
                color={active.primary}
                radius={0}
                style={{ borderColor: active.primary }}
              >
                LEARN MORE ABOUT OUR PROCESS
              </Button>
            </Link>
          </Stack>
        </Container>
      </Box>

      {/* What we do / don't do */}
      <Box
        component="section"
        py={SECTION_SPACING}
        bg={active.surface}
        style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}
      >
        <Container>
          <Box style={{ textAlign: 'center', marginBottom: rem(60) }}>
            <Title
              order={2}
              style={{ fontWeight: 400, fontFamily: 'var(--font-serif)', color: active.primary }}
            >
              Hands-on help, the right way.
            </Title>
          </Box>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(60)}>
            <Stack>
              <Group gap="md">
                <ThemeIcon size="lg" radius="xl" color="green">
                  <IconCheck size={20} stroke={3} />
                </ThemeIcon>
                <Title order={3} style={{ fontWeight: 500, color: active.primary }}>
                  What we do.
                </Title>
              </Group>
              <Text size="md" c="dimmed" lh={1.7}>
                Simply put, we do everything ethically can to help you achieve your academic goals.
                In practical terms, this means straightforward, action-oriented advice, honest
                feedback and tailored support – when and where you need it.
              </Text>
            </Stack>
            <Stack>
              <Group gap="md">
                <ThemeIcon size="lg" radius="xl" color="red">
                  <IconX size={20} stroke={3} />
                </ThemeIcon>
                <Title order={3} style={{ fontWeight: 500, color: active.primary }}>
                  What we don&rsquo;t do.
                </Title>
              </Group>
              <Text size="md" c="dimmed" lh={1.7}>
                We don&rsquo;t offer unethical shortcuts. We&rsquo;ll never write your dissertation,
                thesis or paper for you. We abide by the Tutors’ Association code of ethics and
                stand firmly against academic misconduct.
              </Text>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Track Record */}
      <Box
        component="section"
        py={SECTION_SPACING}
        bg={active.background}
        style={{ borderTop: '1px solid #eee' }}
      >
        <Container size={INNER_WIDTH}>
          <Stack gap="xl">
            <Box style={{ textAlign: 'center' }}>
              <Title
                order={2}
                style={{
                  fontSize: rem(42),
                  fontWeight: 400,
                  fontFamily: 'var(--font-serif)',
                  color: active.primary,
                }}
              >
                A track record that speaks for itself.
              </Title>
            </Box>
            <Box p={rem(40)} bg={active.surface} style={{ border: '1px solid #ddd' }}>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                {awards.map((award, i) => (
                  <Group key={i} gap="sm" wrap="nowrap">
                    <Box
                      w={6}
                      h={6}
                      bg={active.accent}
                      style={{ borderRadius: '50%', flexShrink: 0 }}
                    />
                    <Text size="sm" c="dimmed">
                      {award}
                    </Text>
                  </Group>
                ))}
              </SimpleGrid>
            </Box>
            <Center mt="md">
              <Button
                size="lg"
                variant="outline"
                color={active.primary}
                radius={0}
                style={{ borderColor: active.primary }}
              >
                CHAT WITH A FACULTY COACH
              </Button>
            </Center>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
