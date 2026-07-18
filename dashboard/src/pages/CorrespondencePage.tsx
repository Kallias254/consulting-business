import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Container, Title, Text, Stack, Paper, Group, Badge,
  Loader, Center, Button, Box, Divider, Textarea, Select,
} from '@mantine/core'
import { IconArrowLeft, IconSend, IconSparkles, IconDeviceMobile, IconClock, IconLink, IconClipboardList, IconPaperclip } from '@tabler/icons-react'
import pb from '@/lib/pb'
import type { RecordModel } from 'pocketbase'
import { useAuth } from '@/hooks/useAuth'

const detectLinks = (text: string): string[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  return text.match(urlRegex) || []
}

const detectFiles = (text: string): string[] => {
  const fileRegex = /([\w\d_-]+\.(pdf|docx|doc|xlsx|xls|pptx|png|jpg|jpeg|zip))/gi
  // Clean duplicates and return matches
  const matches = text.match(fileRegex) || []
  return Array.from(new Set(matches))
}

export default function CorrespondencePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const roles = (user?.roles as string[]) ?? []
  const isAdmin = roles.includes('admin')

  const [emails, setEmails] = useState<RecordModel[]>([])
  const [loading, setLoading] = useState(true)
  const [convertedTaskIds, setConvertedTaskIds] = useState<string[]>([])
  const [copiedFileNames, setCopiedFileNames] = useState<string[]>([])
  const [content, setContent] = useState('')
  const [subject, setSubject] = useState('')
  const [target, setTarget] = useState<string | null>('client')
  const [recipientEmail, setRecipientEmail] = useState('')
  const [sending, setSending] = useState(false)

  // Automation & Simulation State
  const [pulseLoading, setPulseLoading] = useState(false)
  const [simulateLoading, setSimulateLoading] = useState(false)
  const [simulateScenario, setSimulateScenario] = useState<string | null>('routledge')

  useEffect(() => {
    if (!id) return
    pb.collection('correspondence')
      .getFullList({ filter: `project="${id}"`, sort: '-created', expand: 'author' })
      .then(setEmails)
      .catch(console.error)
      .finally(() => setLoading(false))

    // Realtime correspondence synchronization
    pb.collection('correspondence').subscribe('*', (e) => {
      if (e.record.project !== id) return

      if (e.action === 'create') {
        pb.collection('correspondence').getOne(e.record.id, { expand: 'author' })
          .then(newCorr => setEmails(prev => [newCorr, ...prev.filter(c => c.id !== newCorr.id)]))
          .catch(() => setEmails(prev => [e.record, ...prev.filter(c => c.id !== e.record.id)]))
      } else if (e.action === 'update') {
        pb.collection('correspondence').getOne(e.record.id, { expand: 'author' })
          .then(upCorr => setEmails(prev => prev.map(c => c.id === upCorr.id ? upCorr : c)))
          .catch(() => setEmails(prev => prev.map(c => c.id === e.record.id ? e.record : c)))
      } else if (e.action === 'delete') {
        setEmails(prev => prev.filter(c => c.id !== e.record.id))
      }
    })

    return () => {
      pb.collection('correspondence').unsubscribe('*')
    }
  }, [id])

  const handleSend = async () => {
    if (!subject || !content || !recipientEmail || !id || !user) return
    setSending(true)
    try {
      const rec = await pb.collection('correspondence').create({
        project: id,
        author: user.id,
        target,
        recipientEmail,
        subject,
        content,
        status: 'draft',
      })
      const enriched = await pb.collection('correspondence').getOne(rec.id, { expand: 'author' })
      setEmails(prev => [enriched, ...prev.filter(c => c.id !== enriched.id)])
      setSubject('')
      setContent('')
      setRecipientEmail('')
    } catch (e) {
      console.error(e)
    } finally {
      setSending(false)
    }
  }

  const handleFridayPulse = async () => {
    if (!id) return
    setPulseLoading(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8099'
      const response = await fetch(`${apiUrl}/api/ai/friday-pulse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${pb.authStore.token}`,
        },
        body: JSON.stringify({ projectId: id }),
      })
      const result = await response.json()
      if (result.success) {
        // Realtime subscription automatically appends it to the UI!
      }
    } catch (e) {
      console.error(e)
    } finally {
      setPulseLoading(false)
    }
  }

  const handleSimulateCC = async () => {
    if (!id) return
    setSimulateLoading(true)
    
    let sub = ''
    let body = ''
    
    if (simulateScenario === 'routledge') {
      sub = "Fwd: Hip Hop's Enduring Influence Proposal & Guidelines"
      body = `Greetings Operations Team,\n\nI am forwarding the core details regarding the Handbook project. We need to integrate broader public health and global perspectives to meet Routledge's requirements.\n\nShared Documents:\n- [Attached: routledge_proposal_v3.docx]\n- [Attached: bibliography_index_raw.xlsx]\n\nLet's get this logged to our timeline and ensure the bibliography is validated.\n\nBest,\nMicah Dobson\nLecturer, NCSU`
    } else if (simulateScenario === 'sports') {
      sub = 'Fwd: Under Armor Sports Lab timeline alignment'
      body = `Hi operational partner,\n\nHere are the updated requirements for the Sports Innovation Lab curriculum design draft. Let's make sure the outline matches their guidelines.\n\nShared Documents:\n- [Attached: sports_lab_outline.pdf]\n\nMicah Dobson`
    } else {
      sub = 'Fwd: Fulbright application statement revisions'
      body = `Greetings,\n\nForwarding my latest Fulbright Statement and Country Selection draft. Let's check for any missing research citations.\n\nShared Documents:\n- [Attached: dobson_cv_h31vsd3ws4.pdf]\n- [Attached: fulbright_statement_draft_v1.docx]\n\nMicah Dobson`
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8099'
      const response = await fetch(`${apiUrl}/api/correspondence/cc`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: 'mpdobson@ncsu.edu',
          recipientEmail: 'cc@vance-lab.com',
          subject: sub,
          content: body,
          projectId: id,
          status: 'sent',
        }),
      })
      const result = await response.json()
      if (result.success) {
        // Realtime subscription automatically appends it!
      }
    } catch (e) {
      console.error(e)
    } finally {
      setSimulateLoading(false)
    }
  }

  // Helper to approve/send correspondence
  const handleApproveAndSend = async (corrId: string) => {
    try {
      await pb.collection('correspondence').update(corrId, {
        status: 'sent',
        sentAt: new Date().toISOString()
      })
    } catch (e) {
      console.error(e)
    }
  }

  // Convert an email to an active roadmap task
  const handleConvertToTask = async (email: RecordModel) => {
    if (!id) return
    try {
      const due = new Date()
      due.setDate(due.getDate() + 7)

      await pb.collection('tasks').create({
        project: id,
        title: `Align: ${email.subject.replace(/^(Fwd:\s*)+/i, '')}`,
        description: `Triggered from Correspondence Log. Content:\n\n${email.content}`,
        priority: 'medium',
        status: 'not_started',
        due: due.toISOString(),
      })
      setConvertedTaskIds(prev => [...prev, email.id])
    } catch (e) {
      console.error('Failed to convert correspondence to task:', e)
    }
  }

  // Persistently copy an email attachment match into the project's File Vault
  const handleCopyToVault = async (fileName: string) => {
    if (!id) return
    try {
      const ext = fileName.split('.').pop()?.toLowerCase() || 'other'
      const type = ext === 'pdf' ? 'output_pdf' : ext === 'docx' || ext === 'doc' ? 'manuscript_draft' : 'other'

      // Clean label
      const cleanLabel = fileName
        .split('.')[0]
        .split('_')
        .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')

      await pb.collection('media').create({
        project: id,
        label: cleanLabel,
        fileType: type,
        version: '1',
        source: 'email_extraction',
        visibility: 'internal',
      })
      setCopiedFileNames(prev => [...prev, fileName])
    } catch (e) {
      console.error('Failed to copy file to vault:', e)
    }
  }

  if (loading) return <Center style={{ minHeight: '50vh' }}><Loader color="yellow" /></Center>

  return (
    <Container size="xl" fluid>
      <Stack gap={32}>
        <Button variant="subtle" color="gray" size="xs" leftSection={<IconArrowLeft size={14} />}
          onClick={() => navigate(`/projects/${id}`)} style={{ alignSelf: 'flex-start' }}>
          Back to Project
        </Button>

        <Group justify="space-between" align="center">
          <Title order={2} style={{ fontSize: '2rem' }}>
            Correspondence <Text component="span" inherit c="yellow.6">Log</Text>
          </Title>

          <Badge variant="dot" color="yellow" size="lg">
            Active Realtime Sync
          </Badge>
        </Group>

        {/* Strategic Automation & Simulation Widget */}
        {isAdmin && (
          <Paper withBorder p="xl" style={{ borderColor: '#E0DBCC', background: '#F5F2EA', borderRadius: '8px' }}>
            <Stack gap="md">
              <Group align="center">
                <IconSparkles size={18} color="gold" />
                <Title order={4} style={{ fontSize: '1.25rem' }}>
                  Principal's Cockpit & Inbound CC Simulation
                </Title>
              </Group>
              
              <Text size="sm" c="dimmed">
                Direct predecessor workflows for Vance Lab. Test the <strong>Friday Status Pulse</strong> generator (which automatically pulls task logs and stages an email for your approval) or <strong>Simulate Inbound Forward (CC)</strong> representing emails sent directly from Micah's mobile client.
              </Text>

              <Divider color="#E0DBCC" style={{ opacity: 0.5 }} />

              <Group align="flex-end" gap="lg" wrap="wrap">
                {/* Friday Status Pulse Generator */}
                <Box style={{ flex: '1 1 300px' }}>
                  <Text size="xs" fw={700} c="dark" mb={6} style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Weekly Status Pulse
                  </Text>
                  <Button
                    color="yellow"
                    c="dark"
                    leftSection={<IconSparkles size={14} />}
                    onClick={handleFridayPulse}
                    loading={pulseLoading}
                    fullWidth
                  >
                    Generate Friday Status Pulse Draft
                  </Button>
                </Box>

                {/* CC Inbound Simulation */}
                <Box style={{ flex: '2 1 400px' }}>
                  <Text size="xs" fw={700} c="dark" mb={6} style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Simulate Micah's Mobile Forward (CC)
                  </Text>
                  <Group gap="xs" grow>
                    <Select
                      value={simulateScenario}
                      onChange={setSimulateScenario}
                      data={[
                        { value: 'routledge', label: 'Routledge Handbook Proposal' },
                        { value: 'sports', label: 'Sports Innovation Lab Outline' },
                        { value: 'fulbright', label: 'Fulbright Statement Draft' }
                      ]}
                      styles={{ input: { borderColor: '#E0DBCC', background: 'white' } }}
                    />
                    <Button
                      variant="outline"
                      color="dark"
                      leftSection={<IconDeviceMobile size={14} />}
                      onClick={handleSimulateCC}
                      loading={simulateLoading}
                    >
                      Simulate CC Inbound
                    </Button>
                  </Group>
                </Box>
              </Group>
            </Stack>
          </Paper>
        )}

        {/* Compose */}
        {isAdmin && (
          <Paper withBorder p="xl" style={{ borderColor: '#E0DBCC', background: '#FBFBF9' }}>
            <Stack gap="md">
              <Title order={5} style={{ fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '11px', color: '#9A9A9A' }}>
                Compose Direct Correspondence
              </Title>
              <Group grow align="flex-end">
                <Select
                  label="To" value={target} onChange={setTarget}
                  data={[{ value: 'client', label: 'Client' }, { value: 'publisher', label: 'Publisher' }, { value: 'other', label: 'Researcher / Other' }]}
                  styles={{ input: { borderColor: '#E0DBCC' } }}
                />
                <Box>
                  <Text size="xs" c="dimmed" mb={4}>Recipient Email</Text>
                  <input
                    value={recipientEmail} onChange={e => setRecipientEmail(e.target.value)}
                    placeholder="recipient@example.com"
                    style={{
                      width: '100%', padding: '8px 12px', border: '1px solid #E0DBCC',
                      background: 'white', fontFamily: 'Inter, sans-serif', fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </Box>
                <Box>
                  <Text size="xs" c="dimmed" mb={4}>Subject</Text>
                  <input
                    value={subject} onChange={e => setSubject(e.target.value)}
                    placeholder="Email subject..."
                    style={{
                      width: '100%', padding: '8px 12px', border: '1px solid #E0DBCC',
                      background: 'white', fontFamily: 'Inter, sans-serif', fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </Box>
              </Group>
              <Textarea
                value={content} onChange={e => setContent(e.target.value)}
                placeholder="Write your message..."
                minRows={4} autosize
                styles={{ input: { borderColor: '#E0DBCC', fontFamily: 'Inter, sans-serif' } }}
              />
              <Button
                color="yellow" c="dark" rightSection={<IconSend size={14} />}
                onClick={handleSend} loading={sending} disabled={!subject || !content || !recipientEmail}
                style={{ alignSelf: 'flex-start' }}
              >
                Send Correspondence
              </Button>
            </Stack>
          </Paper>
        )}

        <Divider color="#E0DBCC" />

        {/* Thread */}
        <Stack gap="lg">
          {(() => {
            const visibleEmails = emails.filter(email => {
              if (isAdmin) return true
              return email.status === 'sent'
            })

            if (visibleEmails.length === 0) {
              return (
                <Paper withBorder p="xl" style={{ borderColor: '#E0DBCC', background: '#FBFBF9', textAlign: 'center' }}>
                  <Text c="dimmed" size="sm" style={{ fontFamily: 'Inter, sans-serif' }}>No correspondence history recorded for this project.</Text>
                </Paper>
              )
            }

            return visibleEmails.map(email => {
              const isPending = email.status === 'pending_approval'
              const isDraft = email.status === 'draft'
              const isSent = email.status === 'sent'
              
              // Color palettes
              let bg = '#FBFBF9'
              let borderCol = '#E0DBCC'
              let borderStyle: 'solid' | 'dashed' = 'solid'
              let shadow = 'none'

              if (isPending) {
                bg = '#FFFDF5'
                borderCol = '#B8873A'
                borderStyle = 'dashed'
                shadow = '0 4px 20px rgba(184, 135, 58, 0.06)'
              } else if (isDraft) {
                bg = '#F5F5F2'
                borderCol = '#D1CBB5'
              }

              // Extract initials for avatars
              const authorName = email.expand?.author?.name ?? email.expand?.author?.email ?? 'System'
              const initials = authorName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()

              return (
                <Paper
                  key={email.id}
                  withBorder
                  p={30}
                  style={{
                    backgroundColor: bg,
                    borderColor: borderCol,
                    borderStyle: borderStyle,
                    borderWidth: isPending ? '2px' : '1px',
                    boxShadow: shadow,
                    borderRadius: '4px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = isPending 
                      ? '0 8px 30px rgba(184, 135, 58, 0.12)' 
                      : '0 8px 24px rgba(0,0,0,0.04)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = shadow
                  }}
                >
                  <Group justify="space-between" align="flex-start" wrap="nowrap" gap="md">
                    <Group align="flex-start" gap="md" style={{ flex: 1 }}>
                      {/* Avatar */}
                      <Center
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: '50%',
                          backgroundColor: email.target === 'client' ? '#0A1A10' : '#B8873A',
                          color: 'white',
                          fontFamily: 'Outfit, sans-serif',
                          fontWeight: 700,
                          fontSize: '15px',
                        }}
                      >
                        {initials}
                      </Center>

                      <Stack gap={6} style={{ flex: 1 }}>
                        <Title
                          order={4}
                          style={{
                            fontSize: '1.25rem',
                            color: '#0A1A10',
                            letterSpacing: '0.2px',
                          }}
                        >
                          {email.subject}
                        </Title>
                        
                        <Group gap={8} wrap="wrap">
                          <Text size="xs" fw={600} style={{ fontFamily: 'Inter, sans-serif', color: '#6A6555' }}>
                            {authorName}
                          </Text>
                          <Text size="xs" c="dimmed">
                            →
                          </Text>
                          <Badge
                            size="xs"
                            variant="dot"
                            color={email.target === 'client' ? 'green' : 'yellow'}
                            styles={{ label: { fontFamily: 'Inter, sans-serif', letterSpacing: '0.5px' } }}
                          >
                            {email.target?.toUpperCase()}
                          </Badge>

                          {email.recipientEmail && (
                            <Text size="xs" c="dimmed" style={{ fontFamily: 'Inter, sans-serif' }}>
                              [To: {email.recipientEmail}]
                            </Text>
                          )}
                        </Group>
                      </Stack>
                    </Group>

                    {/* Metadata & Actions */}
                    <Stack gap={8} align="flex-end" style={{ shrink: 0 }}>
                      <Group gap="xs">
                        {isPending && (
                          <Badge color="yellow" variant="light" size="sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                            STAGED DRAFT (BUFFER)
                          </Badge>
                        )}
                        {isDraft && (
                          <Badge color="gray" variant="light" size="sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                            DRAFT
                          </Badge>
                        )}
                        {isSent && (
                          <Badge color="green" variant="light" size="sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                            SENT & RECORDED
                          </Badge>
                        )}

                        {isPending && isAdmin && (
                          <Button
                            size="xs"
                            color="yellow"
                            c="dark"
                            onClick={() => handleApproveAndSend(email.id)}
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                          >
                            Approve & Release (Clearance)
                          </Button>
                        )}

                        {isAdmin && (
                          <Button
                            size="xs"
                            variant="outline"
                            color={convertedTaskIds.includes(email.id) ? 'green' : 'yellow'}
                            leftSection={<IconClipboardList size={12} />}
                            onClick={() => handleConvertToTask(email)}
                            disabled={convertedTaskIds.includes(email.id)}
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            {convertedTaskIds.includes(email.id) ? '✓ Task Created' : 'Convert to Task'}
                          </Button>
                        )}
                      </Group>
                      <Group gap={6} style={{ color: '#8A8575' }}>
                        <IconClock size={12} />
                        <Text size="xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {new Date(email.created).toLocaleString()}
                        </Text>
                      </Group>
                    </Stack>
                  </Group>

                  <Divider my="md" color="#E0DBCC" style={{ opacity: 0.5 }} />

                  {/* Body Text */}
                  <Text
                    size="sm"
                    style={{
                      whiteSpace: 'pre-wrap',
                      fontFamily: 'Inter, sans-serif',
                      color: '#2A2A28',
                      lineHeight: '1.6',
                      paddingLeft: '54px',
                    }}
                  >
                    {email.content}
                  </Text>

                  {/* Extracted Assets Section */}
                  {(() => {
                    const links = detectLinks(email.content)
                    const files = detectFiles(email.content)
                    if (links.length === 0 && files.length === 0) return null

                    return (
                      <Stack gap="sm" mt="lg" style={{ paddingLeft: '54px' }}>
                        {links.length > 0 && (
                          <Group gap="xs">
                            {links.map((link: string, idx: number) => (
                              <Button
                                key={idx}
                                component="a"
                                href={link}
                                target="_blank"
                                variant="light"
                                color="yellow"
                                size="xs"
                                leftSection={<IconLink size={12} />}
                                styles={{
                                  root: {
                                    background: 'rgba(184, 135, 58, 0.08)',
                                    border: '1px solid rgba(184, 135, 58, 0.2)',
                                    color: '#B8873A',
                                  }
                                }}
                              >
                                Open Reference Link
                              </Button>
                            ))}
                          </Group>
                        )}

                        {files.length > 0 && (
                          <Stack gap="xs" mt={4}>
                            <Text size="xxs" fw={700} style={{ color: '#8A8575', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'Inter, sans-serif' }}>
                              Detected Shared Files
                            </Text>
                            <Group gap="xs">
                              {files.map((file: string, idx: number) => {
                                const isCopied = copiedFileNames.includes(file)
                                return (
                                  <Paper
                                    key={idx}
                                    withBorder
                                    p="xs"
                                    style={{
                                      background: '#FDFDFD',
                                      borderColor: isCopied ? '#D2E7D6' : '#E0DBCC',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '12px',
                                      borderRadius: '4px',
                                    }}
                                  >
                                    <IconPaperclip size={14} color={isCopied ? '#40C057' : '#8A8575'} />
                                    <Text size="xs" fw={600} style={{ fontFamily: 'Inter, sans-serif', color: '#2A2A28' }}>
                                      {file}
                                    </Text>
                                    {isAdmin && (
                                      <Button
                                        size="xs"
                                        variant="subtle"
                                        color={isCopied ? 'green' : 'yellow'}
                                        onClick={() => handleCopyToVault(file)}
                                        disabled={isCopied}
                                        style={{ height: '22px', fontSize: '10px', padding: '0 8px' }}
                                      >
                                        {isCopied ? '✓ In Vault' : 'Copy to Vault'}
                                      </Button>
                                    )}
                                  </Paper>
                                )
                              })}
                            </Group>
                          </Stack>
                        )}
                      </Stack>
                    )
                  })()}
                </Paper>
              )
            })
          })()}
        </Stack>
      </Stack>
    </Container>
  )
}
