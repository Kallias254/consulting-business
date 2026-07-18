import { useEffect, useState } from 'react'
import {
  Container, Title, Text, Stack, Paper, Group, Badge,
  Loader, Center, Table, Progress, Box,
} from '@mantine/core'
import { IconClipboardList, IconClock, IconCircleCheck } from '@tabler/icons-react'
import pb from '@/lib/pb'
import type { RecordModel } from 'pocketbase'
import { useAuth } from '@/hooks/useAuth'

export default function ResearcherPage() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<RecordModel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.id) return
    // Filter to tasks assigned to the logged-in researcher
    pb.collection('tasks')
      .getFullList({ filter: `assignedTo="${user.id}"`, sort: 'due', expand: 'project' })
      .then(setTasks)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [user?.id])

  if (loading) return <Center style={{ minHeight: '50vh' }}><Loader color="yellow" /></Center>

  const open = tasks.filter(t => t.status !== 'done')
  const done = tasks.filter(t => t.status === 'done')
  const completionPct = tasks.length > 0 ? Math.round((done.length / tasks.length) * 100) : 0

  function priorityColor(p: string) {
    return p === 'high' ? 'red' : p === 'medium' ? 'yellow' : 'gray'
  }
  function statusColor(s: string) {
    return s === 'done' ? 'green' : s === 'in_progress' ? 'blue' : 'gray'
  }

  return (
    <Container size="xl" fluid>
      <Stack gap={40}>
        {/* Header */}
        <Box>
          <Title order={2} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', textTransform: 'uppercase' }}>
            Researcher <Text component="span" inherit c="yellow.6">Workbench</Text>
          </Title>
          <Text c="dimmed" size="sm" mt={4}>
            Your active assignments across all projects.
          </Text>
        </Box>

        {/* Sprint Stats */}
        <Group grow>
          <Paper withBorder p="lg" style={{ borderColor: '#E0DBCC', background: '#FBFBF9' }}>
            <Group gap="xs" mb="xs">
              <IconClipboardList size={16} color="#B8873A" />
              <Text size="xs" style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '10px', color: '#9A9A9A' }}>Open Tasks</Text>
            </Group>
            <Text size="2rem" fw={700} style={{ fontFamily: 'Cormorant Garamond, serif' }}>{open.length}</Text>
          </Paper>
          <Paper withBorder p="lg" style={{ borderColor: '#E0DBCC', background: '#FBFBF9' }}>
            <Group gap="xs" mb="xs">
              <IconCircleCheck size={16} color="#5B8C6A" />
              <Text size="xs" style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '10px', color: '#9A9A9A' }}>Completed</Text>
            </Group>
            <Text size="2rem" fw={700} style={{ fontFamily: 'Cormorant Garamond, serif' }}>{done.length}</Text>
          </Paper>
          <Paper withBorder p="lg" style={{ borderColor: '#E0DBCC', background: '#FBFBF9' }}>
            <Group gap="xs" mb="xs">
              <IconClock size={16} color="#9A9A9A" />
              <Text size="xs" style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '10px', color: '#9A9A9A' }}>Sprint Velocity</Text>
            </Group>
            <Group align="center" gap="sm">
              <Text size="2rem" fw={700} style={{ fontFamily: 'Cormorant Garamond, serif' }}>{completionPct}%</Text>
              <Progress value={completionPct} color="yellow" size="sm" style={{ flex: 1 }} />
            </Group>
          </Paper>
        </Group>

        {/* Task Table */}
        {tasks.length === 0 ? (
          <Paper withBorder p="xl" style={{ borderColor: '#E0DBCC', background: '#FBFBF9' }}>
            <Text c="dimmed" ta="center">No tasks assigned to you.</Text>
          </Paper>
        ) : (
          <Paper withBorder style={{ borderColor: '#E0DBCC', overflow: 'hidden', background: '#FBFBF9' }}>
            <Table striped highlightOnHover>
              <Table.Thead style={{ background: '#F4F1EA' }}>
                <Table.Tr>
                  {['Task', 'Project', 'Priority', 'Status', 'Due'].map(h => (
                    <Table.Th key={h} style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                      {h}
                    </Table.Th>
                  ))}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {tasks.map(task => (
                  <Table.Tr key={task.id} style={{ opacity: task.status === 'done' ? 0.5 : 1 }}>
                    <Table.Td>
                      <Text size="sm" fw={500}>{task.title}</Text>
                      <Text size="xs" c="dimmed">{task.description}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{task.expand?.project?.title ?? '—'}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge color={priorityColor(task.priority)} variant="light" size="sm">{task.priority}</Badge>
                    </Table.Td>
                    <Table.Td>
                      <Badge color={statusColor(task.status)} variant="light" size="sm">
                        {task.status?.replace('_', ' ')}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text size="xs" c="dimmed">
                        {task.due ? new Date(task.due).toLocaleDateString() : '—'}
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>
        )}
      </Stack>
    </Container>
  )
}
