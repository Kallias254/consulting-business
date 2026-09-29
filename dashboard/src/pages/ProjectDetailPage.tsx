import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Container, Title, Text, Stack, Group, Badge, Progress,
  Paper, Box, Loader, Center, Button, Table, Divider,
  TextInput, Select, FileButton, Alert, Grid, Textarea, Timeline,
} from '@mantine/core'
import {
  IconArrowLeft, IconMail, IconClipboardList, IconFolder,
  IconUpload, IconFileDownload, IconAlertCircle, IconTimeline,
  IconClock, IconCircleCheck,
} from '@tabler/icons-react'
import pb from '@/lib/pb'
import { useAuth } from '@/hooks/useAuth'
import type { RecordModel } from 'pocketbase'

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const [project, setProject] = useState<RecordModel | null>(null)
  const [tasks, setTasks] = useState<RecordModel[]>([])
  const [media, setMedia] = useState<RecordModel[]>([])
  const [correspondence, setCorrespondence] = useState<RecordModel[]>([])
  const [loading, setLoading] = useState(true)

  // Upload state
  const [file, setFile] = useState<File | null>(null)
  const [label, setLabel] = useState('')
  const [fileType, setFileType] = useState<string | null>('manuscript_draft')
  const [version, setVersion] = useState<string>('1')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  // Recap state
  const [recap, setRecap] = useState('')
  const [savingRecap, setSavingRecap] = useState(false)

  // Determine user permissions
  const roles: string[] = (user?.roles as string[]) ?? []
  const isAdmin = roles.includes('admin') || roles.includes('lead_researcher') || roles.includes('researcher')

  useEffect(() => {
    if (!id) return
    Promise.all([
      pb.collection('projects').getOne(id, { expand: 'client,leadResearcher' }),
      pb.collection('tasks').getFullList({ filter: `project="${id}"`, sort: 'due', expand: 'assignedTo' }),
      pb.collection('media').getFullList({ filter: `project="${id}"`, sort: '-created' }),
      pb.collection('correspondence').getFullList({ filter: `project="${id}"`, sort: '-created', expand: 'author' }),
    ])
      .then(([proj, taskList, mediaList, corrList]) => {
        setProject(proj)
        setRecap(proj.statusRecap || '')
        setTasks(taskList)
        setMedia(mediaList)
        setCorrespondence(corrList)
      })
      .catch((err) => {
        console.error('Failed to load project details:', err)
        navigate('/projects')
      })
      .finally(() => setLoading(false))

    // Realtime subscriptions
    pb.collection('projects').subscribe(id, (e) => {
      if (e.action === 'update') {
        pb.collection('projects').getOne(id, { expand: 'client,leadResearcher' })
          .then(proj => {
            setProject(proj)
            setRecap(prev => prev || proj.statusRecap || '')
          })
          .catch(() => setProject(e.record))
      } else if (e.action === 'delete') {
        navigate('/projects', { replace: true })
      }
    })

    pb.collection('tasks').subscribe('*', (e) => {
      if (e.record.project !== id) return

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

    pb.collection('correspondence').subscribe('*', (e) => {
      if (e.record.project !== id) return

      if (e.action === 'create') {
        pb.collection('correspondence').getOne(e.record.id, { expand: 'author' })
          .then(newC => setCorrespondence(prev => [newC, ...prev.filter(c => c.id !== newC.id)]))
          .catch(() => setCorrespondence(prev => [e.record, ...prev.filter(c => c.id !== e.record.id)]))
      } else if (e.action === 'update') {
        pb.collection('correspondence').getOne(e.record.id, { expand: 'author' })
          .then(upC => setCorrespondence(prev => prev.map(c => c.id === upC.id ? upC : c)))
          .catch(() => setCorrespondence(prev => prev.map(c => c.id === e.record.id ? e.record : c)))
      } else if (e.action === 'delete') {
        setCorrespondence(prev => prev.filter(c => c.id !== e.record.id))
      }
    })

    return () => {
      pb.collection('projects').unsubscribe(id)
      pb.collection('tasks').unsubscribe('*')
      pb.collection('media').unsubscribe('*')
      pb.collection('correspondence').unsubscribe('*')
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
      formData.append('visibility', isAdmin ? 'internal' : 'client_visible')

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

  const handleSaveRecap = async () => {
    if (!id || !project) return
    setSavingRecap(true)
    try {
      const updated = await pb.collection('projects').update(id, { statusRecap: recap })
      setProject(updated)
    } catch (err) {
      console.error('Failed to update status recap:', err)
    } finally {
      setSavingRecap(false)
    }
  }

  if (loading) return <Center style={{ minHeight: '50vh' }}><Loader color="yellow" size="xl" /></Center>
  if (!project) return null

  const progress = project.progress ?? 0

  function priorityColor(p: string) {
    return p === 'high' || p === 'urgent' ? 'red' : p === 'medium' ? 'yellow' : 'gray'
  }
  function taskStatusColor(s: string) {
    return s === 'done' ? 'green' : s === 'in_progress' ? 'blue' : 'gray'
  }

  const getFileUrl = (record: RecordModel) => {
    return pb.files.getUrl(record, record.file)
  }

  interface TimelineEvent {
    id: string
    date: Date
    title: string
    description: string
    type: string
    color: string
    icon: React.ElementType
    link?: string
  }

  // Synthesize Chronological Juncture Points Timeline (Concept C)
  const timelineEvents: TimelineEvent[] = [
    ...(project ? [{
      id: 'project-created',
      date: new Date(project.created),
      title: 'Project Initiated',
      description: `Project "${project.title}" was successfully launched on Vance Lab operations cockpit.`,
      type: 'system',
      color: 'blue',
      icon: IconCircleCheck,
    }] : []),
    ...tasks.map(task => ({
      id: task.id,
      date: new Date(task.created),
      title: `Task Added: ${task.title}`,
      description: task.description || `Status set to ${task.status.replace('_', ' ')} (Priority: ${task.priority})`,
      type: 'task',
      color: task.status === 'done' ? 'green' : 'blue',
      icon: IconClipboardList,
    })),
    ...media.filter(item => isAdmin || item.visibility === 'client_visible' || item.fileType === 'output_pdf').map(item => ({
      id: item.id,
      date: new Date(item.created),
      title: `Deliverable Released: ${item.label}`,
      description: `File: ${item.file} (v${item.version})`,
      type: 'file',
      color: item.fileType === 'output_pdf' ? 'yellow' : 'gray',
      icon: IconFolder,
      link: getFileUrl(item),
    })),
    ...correspondence.map(corr => ({
      id: corr.id,
      date: new Date(corr.created),
      title: `Correspondence Logged: ${corr.subject}`,
      description: `Target: ${corr.target.toUpperCase()} (${corr.recipientEmail}) — Status: ${corr.status}`,
      type: 'correspondence',
      color: corr.status === 'sent' ? 'yellow' : 'orange',
      icon: IconMail,
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime())

  // Filters for client-facing view
  const clientSharedMedia = media.filter(item => item.visibility === 'client_visible' || item.fileType === 'output_pdf')
  const clientTasks = tasks.filter(task => task.expand?.assignedTo?.id === user?.id)

  const renderTimeline = (limit?: number) => {
    const events = limit ? timelineEvents.slice(0, limit) : timelineEvents
    if (events.length === 0) {
      return <Text size="sm" c="dimmed" style={{ fontFamily: 'Inter, sans-serif' }}>No activity has been logged for this project yet.</Text>
    }
    return (
      <Timeline active={events.length - 1} bulletSize={10} lineWidth={1} color="yellow" styles={{
        item: { paddingBottom: 32, paddingLeft: 12 },
        itemBullet: { backgroundColor: '#B8873A', borderColor: '#B8873A' }
      }}>
        {events.map((event) => {
          const isFile = event.type === 'file'
          const isCorr = event.type === 'correspondence'

          const formattedDate = event.date.toLocaleDateString('en-US', {
            day: 'numeric', month: 'long', year: 'numeric'
          })
          const formattedTime = event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

          return (
            <Timeline.Item key={event.id}>
              <Stack gap={3}>

                {/* Category label + date — Inter, same as sidebar labels elsewhere */}
                <Group gap={6} align="center">
                  <Text fw={700} c={isFile ? 'yellow.7' : isCorr ? 'blue.6' : 'green.7'}
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                    {event.type}
                  </Text>
                  <Text c="dimmed" style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px' }}>·</Text>
                  <Text c="dimmed" style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px' }}>
                    {formattedDate} at {formattedTime}
                  </Text>
                </Group>

                {/* Title — Cormorant Garamond, same as project title on this page */}
                <Text style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.35rem', fontWeight: 500, color: '#0A1A10', lineHeight: 1.25 }}>
                  {event.title.replace(/^(Task Added: |Deliverable Released: |Correspondence Logged: )/, '')}
                </Text>

                {/* Description — Inter throughout, it's all factual metadata */}
                <Text c="dimmed" style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  lineHeight: 1.5,
                  color: '#6B6B65'
                }}>
                  {event.description}
                </Text>

                {/* Download link — Inter uppercase, same style as nav labels */}
                {event.link && (
                  <a href={event.link} target="_blank" rel="noopener noreferrer" download
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '1px', color: '#B8873A',
                      textDecoration: 'underline', textUnderlineOffset: '3px', marginTop: 4 }}>
                    Download
                  </a>
                )}

              </Stack>
            </Timeline.Item>
          )
        })}
      </Timeline>
    )
  }

  // 👑 ADMIN WORKBENCH LAYOUT
  const renderAdminView = () => {
    return (
      <Grid gutter={40}>
        {/* Left Side: Tasks and Files */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap={40}>
            {/* Open Tasks */}
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
                  Correspondence Panel
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

            {/* File Vault */}
            <Stack gap="md">
              <Group gap="xs">
                <IconFolder size={18} color="#B8873A" />
                <Title order={4} style={{ fontFamily: 'Inter, sans-serif' }}>File Vault (Full Access)</Title>
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

                  <Grid align="flex-end" gutter="md">
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                      <TextInput
                        label="Document Label"
                        placeholder="e.g. Chapter 2 Draft"
                        value={label}
                        onChange={e => setLabel(e.target.value)}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 4 }}>
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
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                      <TextInput
                        label="Version"
                        placeholder="e.g. 1"
                        value={version}
                        onChange={e => setVersion(e.target.value)}
                        type="number"
                      />
                    </Grid.Col>
                  </Grid>

                  <Group justify="space-between" mt="xs">
                    <Group gap="xs">
                      <FileButton onChange={setFile}>
                        {(props) => (
                          <Button {...props} variant="outline" color="yellow" size="sm">
                            Select File
                          </Button>
                        )}
                      </FileButton>
                      {file && (
                        <Text size="xs" c="dimmed">
                          Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </Text>
                      )}
                    </Group>
                    <Button
                      color="yellow"
                      c="dark"
                      onClick={handleUpload}
                      disabled={!file}
                      loading={uploading}
                      leftSection={<IconUpload size={14} />}
                      size="sm"
                    >
                      Upload to Vault
                    </Button>
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
                        <Table.Th style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>Visibility</Table.Th>
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
                            <Badge variant="dot" color={item.visibility === 'client_shared' ? 'green' : 'gray'} size="sm">
                              {item.visibility === 'client_shared' ? 'Shared' : 'Internal'}
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
        </Grid.Col>

        {/* Right Side: Recap Editor and Dense History */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Stack gap={30}>
            {/* Concept B: Recap Editor */}
            <Paper withBorder p="lg" style={{ borderColor: '#E0DBCC', background: '#FBFBF9' }}>
              <Stack gap="sm">
                <Text size="xs" fw={700} c="dimmed" style={{ letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Executive Status Recap
                </Text>
                <Textarea
                  placeholder="Give a short recap of where this project stands for client context (e.g. 'Undergoing review with editor. Next follow-up is Aug 1.')"
                  value={recap}
                  onChange={e => setRecap(e.target.value)}
                  minRows={4}
                  styles={{ input: { fontFamily: 'serif', fontSize: '0.95rem', background: '#FBFBF9' } }}
                />
                <Button color="yellow" c="dark" size="xs" onClick={handleSaveRecap} loading={savingRecap} style={{ alignSelf: 'flex-end' }}>
                  Save Recap Summary
                </Button>
              </Stack>
            </Paper>

            {/* Concept C: Dense Audit Timeline */}
            <Paper withBorder p="lg" style={{ borderColor: '#E0DBCC', background: '#FBFBF9' }}>
              <Stack gap="md">
                <Group gap="xs" mb="xs">
                  <IconTimeline size={16} color="#B8873A" />
                  <Text size="xs" fw={700} c="dimmed" style={{ letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Activity History
                  </Text>
                </Group>
                <Box style={{ maxHeight: 600, overflowY: 'auto', paddingRight: 10 }}>
                  {renderTimeline()}
                </Box>
              </Stack>
            </Paper>
          </Stack>
        </Grid.Col>
      </Grid>
    )
  }

  // 👤 CLIENT VIEW LAYOUT
  const renderClientView = () => {
    return (
      <Grid gutter={40}>
        {/* Left Side: Concept B Recap and Concept C Chronological Timeline */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap={40}>
            {/* Concept B: Prominent Executive Recap */}
            <Paper withBorder p="xl" style={{ borderColor: '#B8873A', borderLeftWidth: 4, background: '#FBFBF9', boxShadow: '0 8px 32px rgba(184, 135, 58, 0.04)' }}>
              <Stack gap="xs">
                <Text size="xs" fw={700} c="yellow.8" style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>
                  Latest Project Status Recap
                </Text>
                <Text ff="serif" size="lg" style={{ color: '#3A3A36', fontStyle: 'italic', lineHeight: 1.6 }}>
                  {project.statusRecap || "Your project details and milestone metrics are being calculated. Vance Lab is configuring your initial files."}
                </Text>
              </Stack>
            </Paper>

            {/* Concept C: High-Level Juncture Points Timeline */}
            <Stack gap="md">
              <Group gap="xs">
                <IconTimeline size={18} color="#B8873A" />
                <Title order={3} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem' }}>Project Journey Timeline</Title>
              </Group>
              <Paper withBorder p="xl" style={{ borderColor: '#E0DBCC', background: '#FBFBF9' }}>
                {renderTimeline()}
              </Paper>
            </Stack>
          </Stack>
        </Grid.Col>

        {/* Right Side: Shared Vault & Personal Tasks */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Stack gap={30}>
            {/* Client Shared Files */}
            <Paper withBorder p="lg" style={{ borderColor: '#E0DBCC', background: '#FBFBF9' }}>
              <Stack gap="md">
                <Group gap="xs">
                  <IconFolder size={16} color="#B8873A" />
                  <Text size="xs" fw={700} c="dimmed" style={{ letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Released Deliverables
                  </Text>
                </Group>
                
                {clientSharedMedia.length === 0 ? (
                  <Text size="sm" c="dimmed" ta="center" py="lg">No shared deliverables or reports released yet.</Text>
                ) : (
                  <Stack gap="xs">
                    {clientSharedMedia.map(item => (
                      <Paper key={item.id} withBorder p="xs" style={{ background: '#F4F1EA', borderColor: '#E0DBCC' }}>
                        <Group justify="space-between" wrap="nowrap">
                          <Box style={{ overflow: 'hidden' }}>
                            <Text size="xs" fw={600} style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{item.label}</Text>
                            <Text size="xxs" c="dimmed">Version {item.version} • {new Date(item.created).toLocaleDateString()}</Text>
                          </Box>
                          <Button component="a" href={getFileUrl(item)} target="_blank" download variant="subtle" color="yellow" size="xs">
                            Get
                          </Button>
                        </Group>
                      </Paper>
                    ))}
                  </Stack>
                )}
              </Stack>
            </Paper>

            {/* Action Items for Client */}
            <Paper withBorder p="lg" style={{ borderColor: '#E0DBCC', background: '#FBFBF9' }}>
              <Stack gap="md">
                <Group gap="xs">
                  <IconClipboardList size={16} color="#B8873A" />
                  <Text size="xs" fw={700} c="dimmed" style={{ letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Your Action Items
                  </Text>
                </Group>

                {clientTasks.length === 0 ? (
                  <Text size="sm" c="dimmed" ta="center" py="lg">You have no pending action items at this stage.</Text>
                ) : (
                  <Stack gap="xs">
                    {clientTasks.map(task => (
                      <Paper key={task.id} withBorder p="sm" style={{ background: '#FBFBF9', borderColor: '#E0DBCC' }}>
                        <Group justify="space-between" wrap="nowrap" align="flex-start">
                          <Box>
                            <Text size="xs" fw={600}>{task.title}</Text>
                            <Text size="xxs" c="dimmed" mt={2}>{task.description || "No description provided."}</Text>
                            <Text size="xxs" c={priorityColor(task.priority)} fw={600} mt={4}>Due: {task.due ? new Date(task.due).toLocaleDateString() : '—'}</Text>
                          </Box>
                          <Badge size="xs" color={taskStatusColor(task.status)} variant="light">
                            {task.status}
                          </Badge>
                        </Group>
                      </Paper>
                    ))}
                  </Stack>
                )}
              </Stack>
            </Paper>

            {/* Client file upload block */}
            <Paper withBorder p="lg" style={{ borderColor: '#E0DBCC', background: '#FBFBF9' }}>
              <Stack gap="sm">
                <Group gap="xs">
                  <IconUpload size={16} color="#B8873A" />
                  <Text size="xs" fw={700} c="dimmed" style={{ letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Submit Draft or Document
                  </Text>
                </Group>
                <Text size="xxs" c="dimmed">
                  Upload a draft, bibliography, or guidelines document to your secure folder vault.
                </Text>

                {uploadError && (
                  <Alert icon={<IconAlertCircle size={12} />} color="red" py="xs">
                    <Text size="xxs">{uploadError}</Text>
                  </Alert>
                )}

                <TextInput
                  placeholder="Document Label (e.g. Chapter 2 Bib)"
                  value={label}
                  onChange={e => setLabel(e.target.value)}
                  styles={{ input: { fontSize: '11px', height: '32px' } }}
                />

                <Group justify="space-between">
                  <FileButton onChange={setFile}>
                    {(props) => (
                      <Button {...props} variant="outline" color="yellow" size="xs">
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
                    size="xs"
                  >
                    Upload
                  </Button>
                </Group>
                {file && (
                  <Text size="xxs" c="dimmed" ta="center">
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </Text>
                )}
              </Stack>
            </Paper>
          </Stack>
        </Grid.Col>
      </Grid>
    )
  }

  return (
    <Container size="xl" fluid>
      <Stack gap={32}>

        {/* Header */}
        <Box>
          <Group justify="space-between" align="flex-start">
            <Stack gap={4}>
              <Title order={1} style={{ fontSize: '2.2rem', fontFamily: 'Cormorant Garamond, serif' }}>
                {project.title}
              </Title>
              <Text c="dimmed" size="sm" style={{ fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Current Objective: {project.nextMilestone || 'No milestone set'}
              </Text>
            </Stack>
            <Group gap="sm" align="center">
              <Badge color={project.status === 'active' ? 'green' : 'gray'} variant="light" size="lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                {project.status}
              </Badge>
              <Button
                variant="subtle" color="gray" size="xs" leftSection={<IconArrowLeft size={12} />}
                onClick={() => navigate('/projects')}
              >
                All Projects
              </Button>
            </Group>
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

        {/* Render View Based on Role */}
        {isAdmin ? renderAdminView() : renderClientView()}
      </Stack>
    </Container>
  )
}
