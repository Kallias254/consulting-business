import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Container, Title, Text, Stack, Paper, Group, Badge,
  Loader, Center, Button, Box, Divider, Textarea, Select,
} from '@mantine/core'
import { IconArrowLeft, IconSend } from '@tabler/icons-react'
import pb from '@/lib/pb'
import type { RecordModel } from 'pocketbase'
import { useAuth } from '@/hooks/useAuth'

export default function CorrespondencePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [emails, setEmails] = useState<RecordModel[]>([])
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState('')
  const [subject, setSubject] = useState('')
  const [target, setTarget] = useState<string | null>('client')
  const [recipientEmail, setRecipientEmail] = useState('')
  const [sending, setSending] = useState(false)

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
      // Fetch author expand info if it's missing on immediate list append
      const enriched = await pb.collection('correspondence').getOne(rec.id, { expand: 'author' })
      setEmails(prev => [enriched, ...prev])
      setSubject('')
      setContent('')
      setRecipientEmail('')
    } catch (e) {
      console.error(e)
    } finally {
      setSending(false)
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

        <Title order={2} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem' }}>
          Correspondence <Text component="span" inherit c="yellow.6">Log</Text>
        </Title>

        {/* Compose */}
        <Paper withBorder p="xl" style={{ borderColor: '#E0DBCC', background: '#FBFBF9' }}>
          <Stack gap="md">
            <Title order={5} style={{ fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '11px', color: '#9A9A9A' }}>
              New Correspondence
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

        <Divider color="#E0DBCC" />

        {/* Thread */}
        <Stack gap="md">
          {emails.length === 0 ? (
            <Text c="dimmed" ta="center">No correspondence for this project yet.</Text>
          ) : (
            emails.map(email => (
              <Paper key={email.id} withBorder p="lg" style={{ borderColor: '#E0DBCC', background: '#FBFBF9' }}>
                <Group justify="space-between" mb="sm">
                  <Stack gap={2}>
                    <Text fw={600} size="sm">{email.subject}</Text>
                    <Text size="xs" c="dimmed">
                      From: {email.expand?.author?.name ?? email.expand?.author?.email ?? 'Unknown'} →{' '}
                      <Badge size="xs" color="gray" variant="outline">{email.target}</Badge>
                    </Text>
                  </Stack>
                  <Stack gap={2} align="flex-end">
                    <Badge color={email.status === 'sent' ? 'green' : 'yellow'} variant="light" size="sm">
                      {email.status}
                    </Badge>
                    <Text size="xs" c="dimmed">{new Date(email.created).toLocaleString()}</Text>
                  </Stack>
                </Group>
                <Text size="sm" style={{ whiteSpace: 'pre-wrap', fontFamily: 'Inter, sans-serif' }}>
                  {email.content}
                </Text>
              </Paper>
            ))
          )}
        </Stack>
      </Stack>
    </Container>
  )
}
