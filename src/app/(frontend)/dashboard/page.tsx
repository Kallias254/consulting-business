'use client'
import React, { useEffect, useState } from 'react'
import { Container, Title, Text, SimpleGrid, Box, Stack, Loader, Center, Paper } from '@mantine/core'
import { ProjectCard, ProjectSummary } from '@/components/ProjectCard'
import { useRouter } from 'next/navigation'

export default function ProjectHubPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<ProjectSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadDashboardData() {
      try {
        // 1. Check authentication status
        const meRes = await fetch('/api/users/me')
        if (!meRes.ok) {
          router.push('/login')
          return
        }
        const meData = await meRes.json()
        if (!meData.user) {
          router.push('/login')
          return
        }

        // 2. Fetch projects from Payload CMS REST API
        // For a Principal, we can fetch all projects.
        // For a Client, Payload access controls automatically filter projects where the client field matches the user id.
        const projectsRes = await fetch('/api/projects?limit=100')
        if (!projectsRes.ok) {
          setError('Failed to load projects.')
          setLoading(false);
          return
        }

        const projectsData = await projectsRes.json()
        const mappedProjects: ProjectSummary[] = (projectsData.docs || []).map((p: any) => ({
          id: p.slug,
          name: p.title,
          tagline: p.nextMilestone || 'No update available.',
          status: p.status === 'active' ? 'Active Review' : p.status.toUpperCase(),
          readiness: p.progress || 0,
        }))

        setProjects(mappedProjects)
      } catch (err) {
        console.error(err)
        setError('An error occurred while loading dashboard data.')
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [router])

  if (loading) {
    return (
      <Center style={{ minHeight: '50vh' }}>
        <Loader color="burnished-gold" size="xl" />
      </Center>
    )
  }

  if (error) {
    return (
      <Container size="xl" fluid>
        <Center style={{ minHeight: '50vh' }}>
          <Text c="red" size="lg" ff="var(--font-body)">
            {error}
          </Text>
        </Center>
      </Container>
    )
  }

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
        {projects.length === 0 ? (
          <Paper withBorder p="xl" radius={0} style={{ borderColor: '#E0DBCC', backgroundColor: '#FBFBF9' }}>
            <Text c="dimmed" ta="center" ff="var(--font-body)">
              No active projects found for your account.
            </Text>
          </Paper>
        ) : (
          <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="xl">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Container>
  )
}
