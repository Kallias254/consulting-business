import { useEffect, useState } from 'react'
import {
  Container, Title, Text, Stack, Paper, Group, Badge,
  Loader, Center, Table, Box, SimpleGrid, Divider, Button, Alert,
} from '@mantine/core'
import { IconUsers, IconShieldCheck, IconMail, IconGitPullRequest, IconUserPlus, IconAlertCircle } from '@tabler/icons-react'
import pb from '@/lib/pb'
import type { RecordModel } from 'pocketbase'

export default function AdminPage() {
  const [users, setUsers] = useState<RecordModel[]>([])
  const [auditLogs, setAuditLogs] = useState<RecordModel[]>([])
  const [correspondence, setCorrespondence] = useState<RecordModel[]>([])
  const [leads, setLeads] = useState<RecordModel[]>([])
  const [loading, setLoading] = useState(true)
  const [convertingId, setConvertingId] = useState<string | null>(null)
  const [conversionError, setConversionError] = useState('')

  useEffect(() => {
    Promise.all([
      pb.collection('users').getFullList({ sort: 'created' }),
      pb.collection('audit_logs').getFullList({ sort: '-created', expand: 'project' }),
      pb.collection('correspondence').getFullList({ sort: '-created', expand: 'project,author' }),
      pb.collection('leads').getFullList({ sort: '-created' }),
    ])
      .then(([u, logs, corr, lds]) => {
        setUsers(u)
        setAuditLogs(logs)
        setCorrespondence(corr)
        setLeads(lds)
      })
      .catch(console.error)
      .finally(() => setLoading(false))

    // Realtime subscriptions for admin panels
    pb.collection('users').subscribe('*', (e) => {
      if (e.action === 'create') {
        setUsers(prev => [...prev.filter(u => u.id !== e.record.id), e.record].sort((a,b) => new Date(a.created).getTime() - new Date(b.created).getTime()))
      } else if (e.action === 'update') {
        setUsers(prev => prev.map(u => u.id === e.record.id ? e.record : u))
      } else if (e.action === 'delete') {
        setUsers(prev => prev.filter(u => u.id !== e.record.id))
      }
    })

    pb.collection('audit_logs').subscribe('*', (e) => {
      if (e.action === 'create') {
        pb.collection('audit_logs').getOne(e.record.id, { expand: 'project' })
          .then(newLog => setAuditLogs(prev => [newLog, ...prev.filter(l => l.id !== newLog.id)]))
          .catch(() => setAuditLogs(prev => [e.record, ...prev.filter(l => l.id !== e.record.id)]))
      } else if (e.action === 'update') {
        pb.collection('audit_logs').getOne(e.record.id, { expand: 'project' })
          .then(upLog => setAuditLogs(prev => prev.map(l => l.id === upLog.id ? upLog : l)))
          .catch(() => setAuditLogs(prev => prev.map(l => l.id === e.record.id ? e.record : l)))
      } else if (e.action === 'delete') {
        setAuditLogs(prev => prev.filter(l => l.id !== e.record.id))
      }
    })

    pb.collection('correspondence').subscribe('*', (e) => {
      if (e.action === 'create') {
        pb.collection('correspondence').getOne(e.record.id, { expand: 'project,author' })
          .then(newC => setCorrespondence(prev => [newC, ...prev.filter(c => c.id !== newC.id)]))
          .catch(() => setCorrespondence(prev => [e.record, ...prev.filter(c => c.id !== e.record.id)]))
      } else if (e.action === 'update') {
        pb.collection('correspondence').getOne(e.record.id, { expand: 'project,author' })
          .then(upC => setCorrespondence(prev => prev.map(c => c.id === upC.id ? upC : c)))
          .catch(() => setCorrespondence(prev => prev.map(c => c.id === e.record.id ? e.record : c)))
      } else if (e.action === 'delete') {
        setCorrespondence(prev => prev.filter(c => c.id !== e.record.id))
      }
    })

    pb.collection('leads').subscribe('*', (e) => {
      if (e.action === 'create') {
        setLeads(prev => [e.record, ...prev.filter(l => l.id !== e.record.id)])
      } else if (e.action === 'update') {
        setLeads(prev => prev.map(l => l.id === e.record.id ? e.record : l))
      } else if (e.action === 'delete') {
        setLeads(prev => prev.filter(l => l.id !== e.record.id))
      }
    })

    return () => {
      pb.collection('users').unsubscribe('*')
      pb.collection('audit_logs').unsubscribe('*')
      pb.collection('correspondence').unsubscribe('*')
      pb.collection('leads').unsubscribe('*')
    }
  }, [])

  const handleConvertLead = async (lead: RecordModel) => {
    setConvertingId(lead.id)
    setConversionError('')

    try {
      // 1. Create client user
      const clientEmail = lead.email
      const clientName = lead.name
      const generatedPassword = Math.random().toString(36).slice(-8) + '!' + Math.random().toString(36).slice(-4).toUpperCase()
      
      const newClient = await pb.collection('users').create({
        email: clientEmail,
        password: generatedPassword,
        passwordConfirm: generatedPassword,
        name: clientName,
        roles: ['client'],
        institution: lead.university || '',
        verified: true,
        emailVisibility: true,
      })

      // 2. Create the associated project
      const title = `Project: ${lead.documentType.replace('_', ' ')} - ${clientName}`
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      
      // Select the first available researcher or fallback to logged in user
      const researcherId = users.find(u => 
        (u.roles as string[])?.includes('lead_researcher') || 
        (u.roles as string[])?.includes('researcher')
      )?.id || pb.authStore.model?.id

      const newProject = await pb.collection('projects').create({
        title,
        slug,
        client: newClient.id,
        leadResearcher: researcherId,
        status: 'active',
        progress: 10,
        nextMilestone: 'Initial manuscript Ingestion',
        showOnPortfolio: false,
        sentimentScore: 80,
      })

      // 3. Log conversion audit event
      await pb.collection('audit_logs').create({
        project: newProject.id,
        stream: 'lifecycle',
        eventType: 'sentiment_alert', // lifecycle alert tag
        importance: 'medium',
        payload: {
          leadId: lead.id,
          message: `Lead converted successfully. Created client user (${clientEmail}) and project (${newProject.title}).`,
        },
      })

      // 4. Delete converted lead to clear the intake queue
      await pb.collection('leads').delete(lead.id)
    } catch (err: any) {
      setConversionError(err.message || 'Failed to convert lead.')
    } finally {
      setConvertingId(null)
    }
  }

  if (loading) return <Center style={{ minHeight: '50vh' }}><Loader color="yellow" /></Center>

  function roleColor(r: string) {
    return r === 'admin' ? 'red' : r === 'lead_researcher' ? 'blue' : r === 'researcher' ? 'green' : 'gray'
  }

  return (
    <Container size="xl" fluid>
      <Stack gap={40}>
        <Box>
          <Title order={2} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', textTransform: 'uppercase' }}>
            Admin <Text component="span" inherit c="yellow.6">Control Panel</Text>
          </Title>
          <Text c="dimmed" size="sm" mt={4}>System overview — users, intake pipeline, audit logs, correspondence.</Text>
        </Box>

        {/* Stat cards */}
        <SimpleGrid cols={{ base: 1, sm: 4 }}>
          {[
            { icon: IconUsers, label: 'Total Users', value: users.length },
            { icon: IconGitPullRequest, label: 'Intake Queue', value: leads.length },
            { icon: IconShieldCheck, label: 'Audit Events', value: auditLogs.length },
            { icon: IconMail, label: 'Correspondence', value: correspondence.length },
          ].map(({ icon: Icon, label, value }) => (
            <Paper key={label} withBorder p="lg" style={{ borderColor: '#E0DBCC', background: '#FBFBF9' }}>
              <Group gap="xs" mb="xs">
                <Icon size={16} color="#B8873A" />
                <Text size="xs" style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '10px', color: '#9A9A9A' }}>{label}</Text>
              </Group>
              <Text size="2rem" fw={700} style={{ fontFamily: 'Cormorant Garamond, serif' }}>{value}</Text>
            </Paper>
          ))}
        </SimpleGrid>

        {/* Conversion error banner */}
        {conversionError && (
          <Alert icon={<IconAlertCircle size={16} />} title="Conversion Failed" color="red">
            {conversionError}
          </Alert>
        )}

        {/* Intake Pipeline Table */}
        <Stack gap="md">
          <Group gap="xs">
            <IconGitPullRequest size={18} color="#B8873A" />
            <Title order={4} style={{ fontFamily: 'Inter, sans-serif' }}>Intake Pipeline</Title>
          </Group>
          <Paper withBorder style={{ borderColor: '#E0DBCC', overflow: 'hidden', background: '#FBFBF9' }}>
            <Table striped highlightOnHover>
              <Table.Thead style={{ background: '#F4F1EA' }}>
                <Table.Tr>
                  {['Prospect', 'Academic Target', 'Details', 'Actions'].map(h => (
                    <Table.Th key={h} style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>{h}</Table.Th>
                  ))}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {leads.length === 0 ? (
                  <Table.Tr>
                    <Table.Td colSpan={4}><Text c="dimmed" ta="center" py="md">No pending proposal submissions in queue.</Text></Table.Td>
                  </Table.Tr>
                ) : leads.map(lead => (
                  <Table.Tr key={lead.id}>
                    <Table.Td>
                      <Text size="sm" fw={600}>{lead.name}</Text>
                      <Text size="xs" c="dimmed">{lead.email}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{lead.university || '—'}</Text>
                      <Badge variant="outline" color="gray" size="xs">{lead.targetPublisher || 'unspecified'}</Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text size="xs">Document: <Text component="span" fw={600} inherit>{lead.documentType}</Text></Text>
                      <Text size="xs">Proposed: <Text component="span" fw={600} inherit>{lead.projectStatus}</Text></Text>
                    </Table.Td>
                    <Table.Td>
                      <Button
                        size="xs"
                        color="yellow"
                        c="dark"
                        onClick={() => handleConvertLead(lead)}
                        loading={convertingId === lead.id}
                        leftSection={<IconUserPlus size={14} />}
                      >
                        Convert Lead
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>
        </Stack>

        <Divider color="#E0DBCC" />

        {/* Users table */}
        <Stack gap="md">
          <Group gap="xs">
            <IconUsers size={18} color="#B8873A" />
            <Title order={4} style={{ fontFamily: 'Inter, sans-serif' }}>User Roster</Title>
          </Group>
          <Paper withBorder style={{ borderColor: '#E0DBCC', overflow: 'hidden', background: '#FBFBF9' }}>
            <Table striped highlightOnHover>
              <Table.Thead style={{ background: '#F4F1EA' }}>
                <Table.Tr>
                  {['Email', 'Name', 'Roles', 'Created'].map(h => (
                    <Table.Th key={h} style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>{h}</Table.Th>
                  ))}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {users.map(u => (
                  <Table.Tr key={u.id}>
                    <Table.Td><Text size="sm">{u.email}</Text></Table.Td>
                    <Table.Td><Text size="sm">{u.name || '—'}</Text></Table.Td>
                    <Table.Td>
                      <Group gap={4}>
                        {((u.roles as string[]) || []).map(r => (
                          <Badge key={r} color={roleColor(r)} variant="light" size="xs">{r}</Badge>
                        ))}
                      </Group>
                    </Table.Td>
                    <Table.Td><Text size="xs" c="dimmed">{new Date(u.created).toLocaleDateString()}</Text></Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>
        </Stack>

        <Divider color="#E0DBCC" />

        {/* Audit Log */}
        <Stack gap="md">
          <Group gap="xs">
            <IconShieldCheck size={18} color="#B8873A" />
            <Title order={4} style={{ fontFamily: 'Inter, sans-serif' }}>Audit Log</Title>
          </Group>
          <Paper withBorder style={{ borderColor: '#E0DBCC', overflow: 'hidden', background: '#FBFBF9' }}>
            <Table striped highlightOnHover>
              <Table.Thead style={{ background: '#F4F1EA' }}>
                <Table.Tr>
                  {['Event', 'Stream', 'Project', 'Importance', 'Time'].map(h => (
                    <Table.Th key={h} style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>{h}</Table.Th>
                  ))}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {auditLogs.length === 0 ? (
                  <Table.Tr>
                    <Table.Td colSpan={5}><Text c="dimmed" ta="center" py="md">No audit events yet.</Text></Table.Td>
                  </Table.Tr>
                ) : auditLogs.map(log => (
                  <Table.Tr key={log.id}>
                    <Table.Td><Text size="sm" style={{ fontFamily: 'monospace' }}>{log.eventType}</Text></Table.Td>
                    <Table.Td><Badge color="gray" variant="outline" size="xs">{log.stream}</Badge></Table.Td>
                    <Table.Td><Text size="sm">{log.expand?.project?.title ?? '—'}</Text></Table.Td>
                    <Table.Td>
                      <Badge color={log.importance === 'high' ? 'red' : log.importance === 'medium' ? 'yellow' : 'gray'} variant="light" size="xs">
                        {log.importance}
                      </Badge>
                    </Table.Td>
                    <Table.Td><Text size="xs" c="dimmed">{new Date(log.created).toLocaleString()}</Text></Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>
        </Stack>
      </Stack>
    </Container>
  )
}

