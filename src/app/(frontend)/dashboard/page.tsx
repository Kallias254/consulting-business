'use client'
import React from 'react'
import { Container, Title, Text, SimpleGrid, Box, Stack } from '@mantine/core'
import { ProjectCard, ProjectSummary } from '@/components/ProjectCard'

// --- MOCK DATA ---
// In a real application, you would fetch this list of projects
// for the logged-in client from your API.
const clientProjects: ProjectSummary[] = [
  {
    id: 'the-millennial-handbook',
    name: 'The Millennial Handbook',
    tagline: 'Final Scholarly Review of the complete manuscript.',
    status: 'Active Review',
    readiness: 92,
  },
  {
    id: 'quantum-gravity-revisited',
    name: 'Quantum Gravity Revisited',
    tagline: 'Initial intake and technical assessment of draft chapters.',
    status: 'Intake Phase',
    readiness: 15,
  },
  {
    id: 'crc-press-typst-conversion',
    name: 'CRC Press Typst Conversion',
    tagline: 'Awaiting final assets from the publisher for typesetting.',
    status: 'On Hold',
    readiness: 45,
  },
]
// --- END MOCK DATA ---

export default function ProjectHubPage() {
  return (
    <Container size="xl" fluid>
      <Stack gap={40}>
        {/* Page Header */}
        <Box>
          <Title
            order={2}
            ff="var(--font-display)"
            size="2.5rem"
            style={{ textTransform: 'uppercase' }}
          >
            Project <Text component="span" inherit c="burnished-gold.7">Dashboard</Text>
          </Title>
          <Text c="dimmed" size="sm" ff="var(--font-body)" mt={4}>
            Select a project below to view its detailed status and history.
          </Text>
        </Box>

        {/* Project Grid */}
        <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="xl">
          {clientProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  )
}
