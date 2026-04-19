'use client'

import React from 'react'
import { Container, Title, Text, Box, Stack, Button, TextInput, Textarea, Select, SimpleGrid, rem } from '@mantine/core'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'

const SECTION_SPACING = rem(100)
const INNER_WIDTH = 760

export default function ConsultationPage() {
  return (
    <Box bg="white" style={{ minHeight: '100vh', color: '#111' }}>
      <Navbar />

      <Box component="section" pt={rem(100)} pb={rem(60)}>
        <Container size={INNER_WIDTH}>
          <Stack gap="xl" align="center" style={{ textAlign: 'center' }}>
            <Box>
              <Text size="xs" fw={700} style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }} c="dimmed">The First Step</Text>
              <Title order={1} mt="md" style={{ fontSize: rem(48), fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Book a Strategic Review
              </Title>
            </Box>
            <Text size="lg" c="dimmed" lh={1.6} style={{ maxWidth: 600 }}>
              The purpose of this consultation is to understand your project in detail and provide a preliminary assessment of its structural and strategic needs. No obligation is required.
            </Text>
          </Stack>
        </Container>
      </Box>

      <Box component="section" py={SECTION_SPACING} bg="#F9F8F6" style={{ borderTop: '1px solid #eee' }}>
        <Container size={INNER_WIDTH}>
          <Box bg="white" p={rem(60)} style={{ border: '1px solid #eee' }}>
             <Stack gap="xl">
                <Title order={3} style={{ fontWeight: 400, fontSize: rem(24), fontFamily: 'var(--font-serif)' }}>Inquiry Form</Title>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                  <TextInput label="Full Name" placeholder="e.g. Dr. Jane Smith" radius={0} />
                  <TextInput label="Email Address" placeholder="e.g. j.smith@university.edu" radius={0} />
                </SimpleGrid>

                <Select
                  label="Type of Project"
                  placeholder="Select option"
                  data={['Dissertation', 'Thesis', 'Academic Book', 'Journal Article']}
                  radius={0}
                />

                <Select
                  label="Current Stage"
                  placeholder="Select option"
                  data={['Proposal Phase', 'Data Collection', 'Drafting Chapters', 'Final Review']}
                  radius={0}
                />

                <Textarea
                  label="Brief Project Description"
                  placeholder="Describe your research topic and current challenges..."
                  minRows={4}
                  radius={0}
                />

                <Stack gap="sm" mt="md">
                  <Button size="lg" variant="filled" color="dark.9" radius={0}>SUBMIT INQUIRY</Button>
                  <Text size="xs" c="dimmed" style={{ textAlign: 'center' }}>
                    All communications and manuscripts are handled with strict academic confidentiality.
                  </Text>
                </Stack>
             </Stack>
          </Box>
        </Container>
      </Box>

      <Box component="section" py={SECTION_SPACING}>
        <Container size={INNER_WIDTH}>
           <Stack gap="xl" align="center" style={{ textAlign: 'center' }}>
             <Title order={2} style={{ fontSize: rem(32), fontWeight: 400 }}>What to expect</Title>
             <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
                <Stack gap="xs">
                   <Text fw={700} size="xs" c="dimmed">01</Text>
                   <Text size="sm" fw={500}>Confirmation within 24 hours.</Text>
                </Stack>
                <Stack gap="xs">
                   <Text fw={700} size="xs" c="dimmed">02</Text>
                   <Text size="sm" fw={500}>Intake questionnaire for context.</Text>
                </Stack>
                <Stack gap="xs">
                   <Text fw={700} size="xs" c="dimmed">03</Text>
                   <Text size="sm" fw={500}>30-minute strategic review call.</Text>
                </Stack>
             </SimpleGrid>
           </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
