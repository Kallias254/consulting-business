'use client'

import React from 'react'
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Box,
  SimpleGrid,
  Badge,
  Card,
  Avatar,
  ThemeIcon,
  rem,
  useMantineTheme,
  Divider,
} from '@mantine/core'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'
import { IconLock, IconLockOpen, IconBook, IconArrowRight, IconFileText } from '@tabler/icons-react'

const SECTION_SPACING = rem(120)

// --- MOCK DATA ---
const editorBio = {
  name: "Dr. Micah [Last Name]",
  role: "Editor-in-Chief",
  institution: "NC State / JCSU",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
  message: "We are curating a definitive, 200,000-word volume on the intersection of Hip Hop and Sport. With 11 chapters already secured from leading scholars, we are now opening 7 highly specific vacancies to ensure comprehensive, global representation. We invite rigorous, methodological proposals that address these remaining conceptual gaps."
}

const chapters = [
  { id: 1, section: "I. Foundations", title: "The Historical Nexus of Hip Hop and Athletics", status: "confirmed", author: "Dr. A. Smith" },
  { id: 2, section: "I. Foundations", title: "Commercialization and the Hip Hop Athlete", status: "confirmed", author: "Dr. B. Johnson" },
  { id: 3, section: "II. Global South Perspectives", title: "African Soccer and Hip Hop Integration", status: "open", target: "Global South Scholar" },
  { id: 4, section: "II. Global South Perspectives", title: "Latin American Baseball and Reggaeton", status: "open", target: "Latin American Specialist" },
  { id: 5, section: "III. Intersectional Identities", title: "Queer Voices in Athletic Hip Hop Spaces", status: "open", target: "Queer Studies Scholar" },
  { id: 6, section: "III. Intersectional Identities", title: "Women in Sports: The Hip Hop Influence", status: "confirmed", author: "Dr. C. Davis" },
  { id: 7, section: "IV. Media & Representation", title: "Sports Journalism and Hip Hop Vernacular", status: "confirmed", author: "Dr. D. Wilson" },
  { id: 8, section: "IV. Media & Representation", title: "Digital Media, Athletes, and Soundtracks", status: "open", target: "Media Studies Focus" },
  // Truncated for the mock...
]

export default function RoutledgeHandbookMock() {
  const theme = useMantineTheme()
  const active = theme.other || { primary: '#1A1A1A', background: '#FAFAFA', surface: '#FFFFFF', accent: '#D4AF37' }

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* Hero Section */}
      <Box component="section" pt={rem(160)} pb={rem(80)}>
        <Container size={1100}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(60)} verticalSpacing="xl">
            <Stack gap="xl">
              <Stack gap="xs">
                <Text
                  size="xs"
                  fw={700}
                  style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                  c="dimmed"
                >
                  Official Call For Chapters
                </Text>
                <Title
                  order={1}
                  style={{
                    fontSize: rem(54),
                    fontWeight: 400,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: active.primary,
                    fontFamily: 'var(--font-serif)',
                  }}
                >
                  The Routledge Handbook of Hip Hop and Sport
                </Title>
              </Stack>
              <Text size="xl" lh={1.6} c="dimmed">
                A definitive academic volume exploring the socio-cultural, economic, and political intersections of global sporting cultures and Hip Hop.
              </Text>
              
              <Group mt="md">
                <Button size="lg" variant="filled" bg={active.primary} radius={0} rightSection={<IconArrowRight size={18} />}>
                  Submit Abstract
                </Button>
                <Button size="lg" variant="outline" color={active.primary} radius={0} rightSection={<IconFileText size={18} />}>
                  Download PDF Prospectus
                </Button>
              </Group>
            </Stack>

            {/* Editor Profile Card */}
            <Box>
              <Card p={rem(40)} radius={0} bg={active.surface} style={{ border: '1px solid #eee' }}>
                <Stack gap="xl">
                  <Group wrap="nowrap">
                    <Avatar src={editorBio.image} size={80} radius={0} />
                    <Box>
                      <Text fw={700} size="lg" style={{ fontFamily: 'var(--font-serif)' }}>{editorBio.name}</Text>
                      <Text size="sm" c={active.accent} fw={600} style={{ letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        {editorBio.role}
                      </Text>
                      <Text size="sm" c="dimmed">{editorBio.institution}</Text>
                    </Box>
                  </Group>
                  <Divider />
                  <Text size="sm" lh={1.7} c="dimmed" style={{ fontStyle: 'italic' }}>
                    &quot;{editorBio.message}&quot;
                  </Text>
                  
                  {/* Funding Badge - Highlighted as requested */}
                  <Box mt="md" p="md" bg={`${active.primary}05`} style={{ borderLeft: `3px solid ${active.accent}` }}>
                    <Text size="sm" fw={600} c={active.primary}>
                      Supported by $20,000 Institutional Research Funding
                    </Text>
                  </Box>
                </Stack>
              </Card>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Table of Contents / Architecture Section */}
      <Box component="section" py={SECTION_SPACING} bg={active.surface} style={{ borderTop: '1px solid #eee' }}>
        <Container size={1100}>
          <Stack gap={rem(60)}>
            <Box style={{ textAlign: 'center' }}>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c="dimmed"
              >
                Project Architecture
              </Text>
              <Title
                order={2}
                mt="md"
                style={{ fontSize: rem(40), fontWeight: 400, color: active.primary, fontFamily: 'var(--font-serif)' }}
              >
                Targeted Vacancies
              </Title>
              <Text size="lg" c="dimmed" mt="md" style={{ maxWidth: 600, margin: '16px auto 0' }}>
                Review the structural logic of the handbook below. We are actively headhunting for the specific open slots highlighted in gold.
              </Text>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
              {chapters.map((chapter) => (
                <Card 
                  key={chapter.id} 
                  p="xl" 
                  radius={0} 
                  style={{ 
                    border: chapter.status === 'open' ? `1px solid ${active.accent}` : '1px solid #eee',
                    backgroundColor: chapter.status === 'open' ? `${active.accent}05` : active.surface,
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    cursor: chapter.status === 'open' ? 'pointer' : 'default',
                  }}
                >
                  <Stack gap="md" justify="space-between" h="100%">
                    <Box>
                      <Group justify="space-between" align="flex-start" mb="sm">
                        <Text size="xs" fw={700} c="dimmed" style={{ letterSpacing: '0.1em' }}>
                          {chapter.section}
                        </Text>
                        {chapter.status === 'open' ? (
                          <Badge color="yellow" variant="light" radius={0} leftSection={<IconLockOpen size={12} />}>
                            OPEN CALL
                          </Badge>
                        ) : (
                          <Badge color="gray" variant="light" radius={0} leftSection={<IconLock size={12} />}>
                            CONFIRMED
                          </Badge>
                        )}
                      </Group>
                      <Title order={4} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, lineHeight: 1.4 }}>
                        {chapter.title}
                      </Title>
                    </Box>
                    
                    <Box pt="md" style={{ borderTop: '1px solid #eee' }}>
                      {chapter.status === 'open' ? (
                        <Text size="sm" fw={600} c={active.accent}>
                          Targeting: {chapter.target} &rarr;
                        </Text>
                      ) : (
                        <Text size="sm" c="dimmed">
                          Allocated to: {chapter.author}
                        </Text>
                      )}
                    </Box>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
            
            <Group justify="center" mt="xl">
              <Button size="lg" variant="filled" bg={active.primary} radius={0}>
                View Full Submission Guidelines
              </Button>
            </Group>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
