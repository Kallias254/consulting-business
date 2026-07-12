import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container, Title, Text, SimpleGrid, Box, Stack,
  Loader, Center, Paper, Badge, Progress, Group, Button,
} from '@mantine/core'
import { IconArrowRight, IconClock } from '@tabler/icons-react'
import pb from '@/lib/pb'
import type { RecordModel } from 'pocketbase'

function statusColor(status: string) {
  const map: Record<string, string> = {
    active: 'green', completed: 'blue', on_hold: 'yellow', archived: 'gray',
  }
  return map[status] ?? 'gray'
}

function ProjectCard({ project }: { project: RecordModel }) {
  const navigate = useNavigate()
  const progress = project.progress ?? 0

  return (
    <Paper
      withBorder p="xl"
      style={{
        background: '#FBFBF9', borderColor: '#E0DBCC',
        cursor: 'pointer', transition: 'box-shadow 0.2s ease',
      }}
      onClick={() => navigate(`/projects/${project.id}`)}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = '')}
    >
      <Stack gap="md">
        <Group justify="space-between" align="flex-start">
          <Stack gap={4} style={{ flex: 1 }}>
            <Title order={3} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem' }}>
              {project.title}
            </Title>
            <Text size="xs" c="dimmed" style={{ fontFamily: 'Inter, sans-serif' }}>
              {project.nextMilestone || 'No milestone set'}
            </Text>
          </Stack>
          <Badge color={statusColor(project.status)} variant="light" size="sm">
            {project.status?.replace('_', ' ')}
          </Badge>
        </Group>

        <Box>
          <Group justify="space-between" mb={6}>
            <Text size="xs" c="dimmed" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Readiness
            </Text>
            <Text size="xs" fw={700} c="yellow.7">
              {progress}%
            </Text>
          </Group>
          <Progress value={progress} color="yellow" size="sm" />
        </Box>

        <Group justify="space-between">
          <Group gap={6}>
            <IconClock size={12} color="#9A9A9A" />
            <Text size="xs" c="dimmed">
              {new Date(project.updated).toLocaleDateString()}
            </Text>
          </Group>
          <Button
            variant="subtle" color="yellow" size="xs" rightSection={<IconArrowRight size={12} />}
            onClick={(e) => { e.stopPropagation(); navigate(`/projects/${project.id}`) }}
          >
            Open
          </Button>
        </Group>
      </Stack>
    </Paper>
  )
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<RecordModel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    pb.collection('projects')
      .getFullList({ sort: '-created', expand: 'client,leadResearcher' })
      .then(setProjects)
      .catch(() => setError('Failed to load projects.'))
      .finally(() => setLoading(false))

    // Realtime project synchronization
    pb.collection('projects').subscribe('*', (e) => {
      if (e.action === 'create') {
        // Enriched records require expand data from server
        pb.collection('projects').getOne(e.record.id, { expand: 'client,leadResearcher' })
          .then(newRecord => {
            setProjects(prev => [newRecord, ...prev])
          })
          .catch(() => {
            setProjects(prev => [e.record, ...prev])
          })
      } else if (e.action === 'update') {
        pb.collection('projects').getOne(e.record.id, { expand: 'client,leadResearcher' })
          .then(updatedRecord => {
            setProjects(prev => prev.map(p => p.id === e.record.id ? updatedRecord : p))
          })
          .catch(() => {
            setProjects(prev => prev.map(p => p.id === e.record.id ? e.record : p))
          })
      } else if (e.action === 'delete') {
        setProjects(prev => prev.filter(p => p.id !== e.record.id))
      }
    })

    return () => {
      pb.collection('projects').unsubscribe('*')
    }
  }, [])

  if (loading) {
    return (
      <Center style={{ minHeight: '50vh' }}>
        <Loader color="yellow" size="xl" />
      </Center>
    )
  }

  if (error) {
    return (
      <Center style={{ minHeight: '50vh' }}>
        <Text c="red">{error}</Text>
      </Center>
    )
  }

  return (
    <Container size="xl" fluid>
      <Stack gap={40}>
        <Box>
          <Title order={2} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', textTransform: 'uppercase' }}>
            Project{' '}
            <Text component="span" inherit c="yellow.6">Dashboard</Text>
          </Title>
          <Text c="dimmed" size="sm" mt={4}>
            Select a project to view its detailed status and history.
          </Text>
        </Box>

        {projects.length === 0 ? (
          <Paper withBorder p="xl" style={{ borderColor: '#E0DBCC', background: '#FBFBF9' }}>
            <Text c="dimmed" ta="center">No active projects found for your account.</Text>
          </Paper>
        ) : (
          <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="xl">
            {projects.map(p => <ProjectCard key={p.id} project={p} />)}
          </SimpleGrid>
        )}
      </Stack>
    </Container>
  )
}
