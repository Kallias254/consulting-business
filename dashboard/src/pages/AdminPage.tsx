import { useEffect, useState } from 'react'
import {
  Container, Title, Text, Stack, Paper, Group, Badge,
  Loader, Center, Table, Box, SimpleGrid, Divider, Button, Alert, Tabs, Card, RingProgress, ActionIcon, Tooltip,
} from '@mantine/core'
import {
  IconUsers, IconShieldCheck, IconMail, IconGitPullRequest, IconUserPlus,
  IconAlertCircle, IconCheck, IconX, IconInbox, IconSearch, IconNotification, IconBook
} from '@tabler/icons-react'
import pb from '@/lib/pb'
import type { RecordModel } from 'pocketbase'

export default function AdminPage() {
  const [users, setUsers] = useState<RecordModel[]>([])
  const [auditLogs, setAuditLogs] = useState<RecordModel[]>([])
  const [correspondence, setCorrespondence] = useState<RecordModel[]>([])
  const [leads, setLeads] = useState<RecordModel[]>([])
  const [loading, setLoading] = useState(true)
  const [convertingId, setConvertingId] = useState<string | null>(null)
  const [approvingId, setApprovingId] = useState<string | null>(null)
  const [conversionError, setConversionError] = useState('')
  const [activeTab, setActiveTab] = useState<string | null>('triage')

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

  const handleApproveEmail = async (corrId: string) => {
    setApprovingId(corrId)
    try {
      await pb.collection('correspondence').update(corrId, {
        status: 'sent',
      })
    } catch (err) {
      console.error(err)
    } finally {
      setApprovingId(null)
    }
  }

  const handleRejectEmail = async (corrId: string) => {
    try {
      await pb.collection('correspondence').update(corrId, {
        status: 'draft',
      })
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <Center style={{ minHeight: '50vh' }}><Loader color="yellow" /></Center>

  function roleColor(r: string) {
    return r === 'admin' ? 'red' : r === 'lead_researcher' ? 'blue' : r === 'researcher' ? 'green' : 'gray'
  }

  const pendingApprovals = correspondence.filter(c => c.status === 'pending_approval')
  const newLeads = leads.filter(l => l.status === 'new' || !l.status)

  return (
    <Container size="xl" fluid style={{ background: '#F4F1EA', minHeight: '100vh', paddingTop: 20 }}>
      <Stack gap={40}>
        {/* Header Block */}
        <Box
          p="xl"
          style={{
            background: 'linear-gradient(135deg, #0A1A10 0%, #162E1D 100%)',
            border: '1px solid #1A3A22',
            color: '#FBFBF9',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            borderRadius: 0,
          }}
        >
          <Group justify="space-between">
            <Stack gap={4}>
              <Title
                order={2}
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '2.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                Vance Lab <Text component="span" inherit c="yellow.6">Control Board</Text>
              </Title>
              <Text c="dimmed" size="xs" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                Operational Triage, Clearance Chain & Lifecycle Analytics
              </Text>
            </Stack>
            <Badge color="yellow" variant="outline" size="lg" style={{ borderRadius: 0 }}>
              SECURE CONNECT
            </Badge>
          </Group>
        </Box>

        {/* Dynamic Metric Cards */}
        <SimpleGrid cols={{ base: 1, sm: 4 }}>
          {[
            { label: 'Triage Queue', value: newLeads.length, desc: 'Unassigned prospects', color: 'yellow' },
            { label: 'Clearance Chain', value: pendingApprovals.length, desc: 'Emails awaiting approval', color: 'red' },
            { label: 'User Registry', value: users.length, desc: 'Enrolled staff & clients', color: 'green' },
            { label: 'Log Records', value: auditLogs.length, desc: 'Lifecycle audit log events', color: 'gray' },
          ].map((stat) => (
            <Card key={stat.label} withBorder radius={0} p="lg" style={{ background: '#FBFBF9', borderColor: '#E0DBCC' }}>
              <Group justify="space-between">
                <Stack gap={2}>
                  <Text size="xs" c="dimmed" style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '9px', fontWeight: 700 }}>
                    {stat.label}
                  </Text>
                  <Text size="2.2rem" fw={700} style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0A1A10' }}>
                    {stat.value}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {stat.desc}
                  </Text>
                </Stack>
                <RingProgress
                  size={50}
                  thickness={4}
                  sections={[{ value: 100, color: stat.color }]}
                  label={
                    <Center>
                      <IconBook size={16} style={{ color: 'var(--mantine-color-dimmed)' }} />
                    </Center>
                  }
                />
              </Group>
            </Card>
          ))}
        </SimpleGrid>

        {conversionError && (
          <Alert icon={<IconAlertCircle size={16} />} title="Operational Failure" color="red" radius={0}>
            {conversionError}
          </Alert>
        )}

        {/* Tabbed Triage Deck */}
        <Tabs value={activeTab} onChange={setActiveTab} color="yellow" variant="outline" style={{ background: '#FBFBF9', border: '1px solid #E0DBCC' }}>
          <Tabs.List style={{ background: '#F4F1EA', borderBottom: '1px solid #E0DBCC' }}>
            <Tabs.Tab value="triage" leftSection={<IconGitPullRequest size={16} />} style={{ borderRadius: 0, fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>
              Intake Pipeline ({leads.length})
            </Tabs.Tab>
            <Tabs.Tab value="clearance" leftSection={<IconMail size={16} />} style={{ borderRadius: 0, fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>
              Clearance Chain ({pendingApprovals.length})
            </Tabs.Tab>
            <Tabs.Tab value="users" leftSection={<IconUsers size={16} />} style={{ borderRadius: 0, fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>
              Staff & Roster ({users.length})
            </Tabs.Tab>
            <Tabs.Tab value="logs" leftSection={<IconShieldCheck size={16} />} style={{ borderRadius: 0, fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>
              System Logs ({auditLogs.length})
            </Tabs.Tab>
          </Tabs.List>

          {/* 📬 Triage & Intake Pipeline */}
          <Tabs.Panel value="triage" p="xl">
            <Stack gap="lg">
              <Box>
                <Title order={4} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem' }}>
                  Intake & Prospect Registry
                </Title>
                <Text size="xs" c="dimmed">
                  Verify and promote incoming scholar leads into client users and active workflow projects.
                </Text>
              </Box>

              <Table striped highlightOnHover verticalSpacing="md">
                <Table.Thead style={{ background: '#F4F1EA' }}>
                  <Table.Tr>
                    <Table.Th style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Prospect</Table.Th>
                    <Table.Th style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Academic Target</Table.Th>
                    <Table.Th style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Proposal details</Table.Th>
                    <Table.Th style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'right' }}>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {leads.length === 0 ? (
                    <Table.Tr>
                      <Table.Td colSpan={4}><Text c="dimmed" ta="center" py="xl">No pending proposal submissions in queue.</Text></Table.Td>
                    </Table.Tr>
                  ) : leads.map(lead => (
                    <Table.Tr key={lead.id}>
                      <Table.Td>
                        <Text size="sm" fw={600} c="dark">{lead.name}</Text>
                        <Text size="xs" c="dimmed" style={{ fontFamily: 'monospace' }}>{lead.email}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{lead.university || '—'}</Text>
                        <Badge variant="outline" color="gray" size="xs">{lead.targetPublisher || 'unspecified'}</Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="xs">Document Type: <Text component="span" fw={600} inherit>{lead.documentType?.replace('_', ' ')}</Text></Text>
                        <Text size="xs">Proposed: <Text component="span" fw={600} inherit>{lead.projectStatus}</Text></Text>
                      </Table.Td>
                      <Table.Td style={{ textAlign: 'right' }}>
                        <Button
                          size="xs"
                          color="yellow"
                          c="dark"
                          onClick={() => handleConvertLead(lead)}
                          loading={convertingId === lead.id}
                          leftSection={<IconUserPlus size={14} />}
                          style={{ borderRadius: 0 }}
                        >
                          Convert Lead
                        </Button>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Stack>
          </Tabs.Panel>

          {/* 🛡️ Clearance Chain Tab */}
          <Tabs.Panel value="clearance" p="xl">
            <Stack gap="lg">
              <Box>
                <Title order={4} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem' }}>
                  The Clearance Chain (Draft-and-Authorize)
                </Title>
                <Text size="xs" c="dimmed">
                  Verify and send outgoing email drafts composed by researchers containing sensitive milestones or files.
                </Text>
              </Box>

              {pendingApprovals.length === 0 ? (
                <Paper withBorder p="xl" style={{ borderColor: '#E0DBCC', background: '#F4F1EA', borderRadius: 0 }}>
                  <Text c="dimmed" ta="center">All email correspondence drafts are currently cleared and dispatched.</Text>
                </Paper>
              ) : (
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                  {pendingApprovals.map(email => (
                    <Card key={email.id} withBorder radius={0} p="lg" style={{ background: '#FBFBF9', borderColor: '#E0DBCC' }}>
                      <Stack gap="md">
                        <Group justify="space-between">
                          <Box>
                            <Badge color="red" variant="light" size="xs" style={{ borderRadius: 0, marginBottom: 4 }}>
                              PENDING CLEARANCE
                            </Badge>
                            <Text fw={600} size="sm" c="dark">{email.subject}</Text>
                          </Box>
                          <Text size="xs" c="dimmed">{new Date(email.created).toLocaleDateString()}</Text>
                        </Group>

                        <Divider color="#E0DBCC" />

                        <Box>
                          <Text size="xs" c="dimmed">Recipient:</Text>
                          <Text size="xs" fw={600} style={{ fontFamily: 'monospace' }}>{email.recipientEmail} ({email.target})</Text>
                        </Box>

                        <Box p="md" style={{ background: '#F4F1EA', border: '1px solid #E0DBCC', whiteSpace: 'pre-wrap', fontFamily: 'Inter, sans-serif', fontSize: '12px' }}>
                          {email.content}
                        </Box>

                        <Group gap="xs" justify="flex-end">
                          <Button
                            variant="subtle"
                            color="gray"
                            size="xs"
                            leftSection={<IconX size={14} />}
                            onClick={() => handleRejectEmail(email.id)}
                            style={{ borderRadius: 0 }}
                          >
                            Return to Draft
                          </Button>
                          <Button
                            color="yellow"
                            c="dark"
                            size="xs"
                            leftSection={<IconCheck size={14} />}
                            onClick={() => handleApproveEmail(email.id)}
                            loading={approvingId === email.id}
                            style={{ borderRadius: 0 }}
                          >
                            Authorize & Send
                          </Button>
                        </Group>
                      </Stack>
                    </Card>
                  ))}
                </SimpleGrid>
              )}
            </Stack>
          </Tabs.Panel>

          {/* 👥 Users Tab */}
          <Tabs.Panel value="users" p="xl">
            <Stack gap="lg">
              <Box>
                <Title order={4} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem' }}>
                  Registry & Roster
                </Title>
                <Text size="xs" c="dimmed">
                  Manage accounts, view access tiers, and check institutional alignment credentials.
                </Text>
              </Box>

              <Table striped highlightOnHover verticalSpacing="sm">
                <Table.Thead style={{ background: '#F4F1EA' }}>
                  <Table.Tr>
                    <Table.Th style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Name / Identity</Table.Th>
                    <Table.Th style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Access tier</Table.Th>
                    <Table.Th style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Joined</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {users.map(u => (
                    <Table.Tr key={u.id}>
                      <Table.Td>
                        <Text size="sm" fw={600}>{u.name || '—'}</Text>
                        <Text size="xs" c="dimmed" style={{ fontFamily: 'monospace' }}>{u.email}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Group gap={4}>
                          {((u.roles as string[]) || []).map(r => (
                            <Badge key={r} color={roleColor(r)} variant="light" size="xs" style={{ borderRadius: 0 }}>{r}</Badge>
                          ))}
                        </Group>
                      </Table.Td>
                      <Table.Td><Text size="xs" c="dimmed">{new Date(u.created).toLocaleDateString()}</Text></Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Stack>
          </Tabs.Panel>

          {/* 📜 Audit Stream Tab */}
          <Tabs.Panel value="logs" p="xl">
            <Stack gap="lg">
              <Box>
                <Title order={4} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem' }}>
                  Lifecycle Audit Stream
                </Title>
                <Text size="xs" c="dimmed">
                  Dynamic database sync monitoring, security clearances, and automated script results.
                </Text>
              </Box>

              <Table striped highlightOnHover verticalSpacing="sm">
                <Table.Thead style={{ background: '#F4F1EA' }}>
                  <Table.Tr>
                    <Table.Th style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Event</Table.Th>
                    <Table.Th style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Stream</Table.Th>
                    <Table.Th style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Project</Table.Th>
                    <Table.Th style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Importance</Table.Th>
                    <Table.Th style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Time</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {auditLogs.length === 0 ? (
                    <Table.Tr>
                      <Table.Td colSpan={5}><Text c="dimmed" ta="center" py="md">No audit events logged yet.</Text></Table.Td>
                    </Table.Tr>
                  ) : auditLogs.map(log => (
                    <Table.Tr key={log.id}>
                      <Table.Td>
                        <Text size="sm" style={{ fontFamily: 'monospace', fontWeight: 600 }}>{log.eventType}</Text>
                        <Text size="xs" c="dimmed">{(log.payload as any)?.message || ''}</Text>
                      </Table.Td>
                      <Table.Td><Badge color="gray" variant="outline" size="xs" style={{ borderRadius: 0 }}>{log.stream}</Badge></Table.Td>
                      <Table.Td><Text size="sm">{log.expand?.project?.title ?? '—'}</Text></Table.Td>
                      <Table.Td>
                        <Badge color={log.importance === 'high' ? 'red' : log.importance === 'medium' ? 'yellow' : 'gray'} variant="light" size="xs" style={{ borderRadius: 0 }}>
                          {log.importance}
                        </Badge>
                      </Table.Td>
                      <Table.Td><Text size="xs" c="dimmed">{new Date(log.created).toLocaleString()}</Text></Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  )
}


