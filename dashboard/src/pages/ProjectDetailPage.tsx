import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Container, Title, Text, Stack, Group, Badge, Progress,
  Paper, Box, Loader, Center, Button, Table, Divider,
  TextInput, Select, FileButton, Alert,
} from '@mantine/core'
import { IconArrowLeft, IconMail, IconClipboardList, IconFolder, IconUpload, IconFileDownload, IconAlertCircle } from '@tabler/icons-react'
import pb from '@/lib/pb'
import type { RecordModel } from 'pocketbase'

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [project, setProject] = useState<RecordModel | null>(null)
  const [tasks, setTasks] = useState<RecordModel[]>([])
  const [media, setMedia] = useState<RecordModel[]>([])
  const [loading, setLoading] = useState(true)

  // Upload state
  const [file, setFile] = useState<File | null>(null)
  const [label, setLabel] = useState('')
  const [fileType, setFileType] = useState<string | null>('manuscript_draft')
  const [version, setVersion] = useState<string>('1')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  useEffect(() => {
    if (!id) return
    Promise.all([
      pb.collection('projects').getOne(id, { expand: 'client,leadResearcher' }),
      pb.collection('tasks').getFullList({ filter: `project="${id}"`, sort: 'due', expand: 'assignedTo' }),
      pb.collection('media').getFullList({ filter: `project="${id}"`, sort: '-created' }),
    ])
      .then(([proj, taskList, mediaList]) => {
        setProject(proj)
        setTasks(taskList)
        setMedia(mediaList)
      })
      .catch(() => navigate('/projects'))
      .finally(() => setLoading(false))

    // Realtime subscriptions
    pb.collection('projects').subscribe(id, (e) => {
      if (e.action === 'update') {
        pb.collection('projects').getOne(id, { expand: 'client,leadResearcher' })
          .then(setProject)
          .catch(() => setProject(e.record))
      } else if (e.action === 'delete') {
        navigate('/projects', { replace: true })
      }
    })

    pb.collection('tasks').subscribe('*', (e) => {
      // Filter actions for this project ID
      const targetProj = e.record.project
      if (targetProj !== id) return

      if (e.action === 'create') {
        pb.collection('tasks').getOne(e.record.id, { expand: 'assignedTo' })
          .then(newT => setTasks(prev => [...prev.filter(t => t.id !== newT.id), newT].sort((a,b) => new Date(a.due).getTime() - new Date(b.due).getTime())))
          .catch(() => setTasks(prev => [...prev.filter(t => t.id !== e.record.id), e.record]))
      } else if (e.action === 'update') {
        pb.collection('tasks').getOne(e.record.id, { expand: 'assignedTo' })
          .then(upT => setTasks(prev => prev.map(t => t.id === upT.id ? upT : t)))
          .catch(() => setTasks(prev => prev.map(t => t.id === e.record.id ? e.record : t)))
      } else if (e.action === 'delete') {
        setTasks(prev => prev.filter(t => t.id !== e.record.id))
      }
    })

    pb.collection('media').subscribe('*', (e) => {
      if (e.record.project !== id) return

      if (e.action === 'create') {
        setMedia(prev => [e.record, ...prev.filter(m => m.id !== e.record.id)])
      } else if (e.action === 'update') {
        setMedia(prev => prev.map(m => m.id === e.record.id ? e.record : m))
      } else if (e.action === 'delete') {
        setMedia(prev => prev.filter(m => m.id !== e.record.id))
      }
    })

    return () => {
      pb.collection('projects').unsubscribe(id)
      pb.collection('tasks').unsubscribe('*')
      pb.collection('media').unsubscribe('*')
    }
  }, [id, navigate])

  const handleUpload = async () => {
    if (!file || !id) return
    setUploading(true)
    setUploadError('')
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('project', id)
      formData.append('label', label || file.name)
      formData.append('fileType', fileType || 'other')
      formData.append('version', version || '1')
      formData.append('source', 'upload')
      formData.append('visibility', 'internal')

      const record = await pb.collection('media').create(formData)
      setMedia(prev => [record, ...prev.filter(m => m.id !== record.id)])
      setFile(null)
      setLabel('')
      setVersion(prev => String(parseInt(prev, 10) + 1))
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload document.')
    } finally {
      setUploading(false)
    }
  }

  if (loading) return <Center style={{ minHeight: '50vh' }}><Loader color="yellow" size="xl" /></Center>
  if (!project) return null

  const progress = project.progress ?? 0

  function priorityColor(p: string) {
    return p === 'high' ? 'red' : p === 'medium' ? 'yellow' : 'gray'
  }
  function taskStatusColor(s: string) {
    return s === 'done' ? 'green' : s === 'in_progress' ? 'blue' : 'gray'
  }

  // Get file URL helper using pocketbase sdk helper
  const getFileUrl = (record: RecordModel) => {
    return pb.files.getUrl(record, record.file)
  }

  return (
    <Container size="xl" fluid>
      <Stack gap={40}>
        {/* Back */}
        <Button
          variant="subtle" color="gray" size="xs" leftSection={<IconArrowLeft size={14} />}
          onClick={() => navigate('/projects')}
          style={{ alignSelf: 'flex-start' }}
        >
          All Projects
        </Button>

        {/* Header */}
        <Box>
          <Group justify="space-between" align="flex-start">
            <Stack gap={4}>
              <Title order={1} style={{ fontSize: '2.2rem' }}>
                {project.title}
              </Title>
              <Text c="dimmed" size="sm">{project.nextMilestone}</Text>
            </Stack>
            <Badge color={project.status === 'active' ? 'green' : 'gray'} variant="light" size="lg">
              {project.status}
            </Badge>
          </Group>

          <Box mt="lg">
            <Group justify="space-between" mb={6}>
              <Text size="xs" c="dimmed" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                Overall Readiness
              </Text>
              <Text size="sm" fw={700} c="yellow.7">{progress}%</Text>
            </Group>
            <Progress value={progress} color="yellow" size="md" />
          </Box>
        </Box>

        <Divider color="#E0DBCC" />

        {/* Tasks */}
        <Stack gap="md">
          <Group justify="space-between">
            <Group gap="xs">
              <IconClipboardList size={18} color="#B8873A" />
              <Title order={4} style={{ fontFamily: 'Inter, sans-serif' }}>Open Tasks</Title>
            </Group>
            <Button
              variant="outline" color="yellow" size="xs" leftSection={<IconMail size={14} />}
              onClick={() => navigate(`/projects/${id}/correspondence`)}
            >
              Correspondence
            </Button>
          </Group>

          {tasks.length === 0 ? (
            <Paper withBorder p="lg" style={{ borderColor: '#E0DBCC', background: '#FBFBF9' }}>
              <Text c="dimmed" ta="center">No tasks assigned to this project.</Text>
            </Paper>
          ) : (
            <Paper withBorder style={{ borderColor: '#E0DBCC', overflow: 'hidden', background: '#FBFBF9' }}>
              <Table striped highlightOnHover>
                <Table.Thead style={{ background: '#F4F1EA' }}>
                  <Table.Tr>
                    <Table.Th style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>Task</Table.Th>
                    <Table.Th style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>Assigned</Table.Th>
                    <Table.Th style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>Priority</Table.Th>
                    <Table.Th style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>Status</Table.Th>
                    <Table.Th style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>Due</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {tasks.map(task => (
                    <Table.Tr key={task.id}>
                      <Table.Td>
                        <Text size="sm" fw={500}>{task.title}</Text>
                        <Text size="xs" c="dimmed">{task.description}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{task.expand?.assignedTo?.name ?? task.expand?.assignedTo?.email ?? '—'}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge color={priorityColor(task.priority)} variant="light" size="sm">{task.priority}</Badge>
                      </Table.Td>
                      <Table.Td>
                        <Badge color={taskStatusColor(task.status)} variant="light" size="sm">
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

        <Divider color="#E0DBCC" />

        {/* Media / File Vault */}
        <Stack gap="md">
          <Group gap="xs">
            <IconFolder size={18} color="#B8873A" />
            <Title order={4} style={{ fontFamily: 'Inter, sans-serif' }}>File Vault</Title>
          </Group>

          {/* Upload Form */}
          <Paper withBorder p="lg" style={{ borderColor: '#E0DBCC', background: '#FBFBF9' }}>
            <Stack gap="md">
              <Text size="xs" fw={700} c="dimmed" style={{ letterSpacing: '1px', textTransform: 'uppercase' }}>
                Upload Document
              </Text>
              
              {uploadError && (
                <Alert icon={<IconAlertCircle size={16} />} title="Upload Failed" color="red">
                  {uploadError}
                </Alert>
              )}

              <Group grow align="flex-end">
                <TextInput
                  label="Document Label"
                  placeholder="e.g. Chapter 2 Draft"
                  value={label}
                  onChange={e => setLabel(e.target.value)}
                />
                <Select
                  label="Type"
                  value={fileType}
                  onChange={setFileType}
                  data={[
                    { value: 'manuscript_draft', label: 'Manuscript Draft' },
                    { value: 'artwork', label: 'Artwork / Asset' },
                    { value: 'guideline', label: 'Guidelines' },
                    { value: 'bibliography', label: 'Bibliography' },
                    { value: 'output_pdf', label: 'Formatted PDF Output' },
                    { value: 'other', label: 'Other Document' },
                  ]}
                />
                <TextInput
                  label="Version"
                  placeholder="e.g. 1"
                  value={version}
                  onChange={e => setVersion(e.target.value)}
                  type="number"
                />
                <Box>
                  <Group gap="xs">
                    <FileButton onChange={setFile}>
                      {(props) => (
                        <Button {...props} variant="outline" color="yellow">
                          Select File
                        </Button>
                      )}
                    </FileButton>
                    <Button
                      color="yellow"
                      c="dark"
                      onClick={handleUpload}
                      disabled={!file}
                      loading={uploading}
                      leftSection={<IconUpload size={14} />}
                    >
                      Upload
                    </Button>
                  </Group>
                  {file && (
                    <Text size="xs" c="dimmed" mt={4}>
                      Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </Text>
                  )}
                </Box>
              </Group>
            </Stack>
          </Paper>

          {/* List of Files */}
          {media.length === 0 ? (
            <Paper withBorder p="lg" style={{ borderColor: '#E0DBCC', background: '#FBFBF9' }}>
              <Text c="dimmed" ta="center">No files uploaded to this vault yet.</Text>
            </Paper>
          ) : (
            <Paper withBorder style={{ borderColor: '#E0DBCC', overflow: 'hidden', background: '#FBFBF9' }}>
              <Table striped highlightOnHover>
                <Table.Thead style={{ background: '#F4F1EA' }}>
                  <Table.Tr>
                    <Table.Th style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>Label</Table.Th>
                    <Table.Th style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>Type</Table.Th>
                    <Table.Th style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>Version</Table.Th>
                    <Table.Th style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>Uploaded</Table.Th>
                    <Table.Th></Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {media.map(item => (
                    <Table.Tr key={item.id}>
                      <Table.Td>
                        <Text size="sm" fw={500}>{item.label}</Text>
                        <Text size="xs" c="dimmed">{item.file}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge variant="outline" color="gray" size="sm">
                          {item.fileType?.replace('_', ' ')}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">v{item.version}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="xs" c="dimmed">
                          {new Date(item.created).toLocaleString()}
                        </Text>
                      </Table.Td>
                      <Table.Td style={{ textAlign: 'right' }}>
                        <Button
                          component="a"
                          href={getFileUrl(item)}
                          target="_blank"
                          download
                          variant="subtle"
                          color="yellow"
                          size="xs"
                          leftSection={<IconFileDownload size={14} />}
                        >
                          Download
                        </Button>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Paper>
          )}
        </Stack>
      </Stack>
    </Container>
  )
}
