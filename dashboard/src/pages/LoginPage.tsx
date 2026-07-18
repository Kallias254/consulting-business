import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Container, Title, Text, TextInput, PasswordInput,
  Button, Stack, Group, Paper, ThemeIcon, Divider,
} from '@mantine/core'
import { IconShieldLock, IconFingerprint, IconDeviceMobile, IconArrowRight } from '@tabler/icons-react'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) { setError('Please provide credentials.'); return }
    setLoading(true)
    setError('')
    try {
      await login(email, password)
      // pb.authStore now has the token — navigate based on role
      navigate('/projects', { replace: true })
    } catch {
      setError('Invalid credentials or account not found.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      component="main"
      style={{
        minHeight: '100vh',
        background: '#0A1A10',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid background */}
      <Box
        pos="absolute" top={0} right={0} bottom={0} left={0}
        style={{
          opacity: 0.03,
          backgroundImage: `
            linear-gradient(#B8873A 1px, transparent 1px),
            linear-gradient(90deg, #B8873A 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <Container size="xs" w="100%" style={{ position: 'relative' }}>
        <Stack gap="xl">
          <Paper
            withBorder p={60}
            style={{
              background: 'rgba(14, 29, 22, 0.6)',
              border: '1px solid #1A3A22',
              boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
              backdropFilter: 'blur(20px)',
              borderRadius: 0,
            }}
          >
            <Stack gap={40} component="form" onSubmit={handleLogin}>
              <Box ta="center">
                <ThemeIcon
                  color="yellow" variant="outline" size={60}
                  style={{ border: '1px solid #B8873A', borderRadius: 0, marginBottom: 24 }}
                >
                  <IconShieldLock size={35} />
                </ThemeIcon>
                <Title
                  order={1}
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    color: '#FBFBF9',
                    fontSize: '2rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                >
                  Institutional{' '}
                  <Text component="span" inherit c="yellow.6">Access</Text>
                </Title>
                <Text
                  size="xs" mt={8}
                  style={{
                    color: '#5B8C6A',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '7px',
                  }}
                >
                  Secure Author Portal // Encrypted Session
                </Text>
              </Box>

              {error && (
                <Text c="red" size="sm" ta="center">
                  {error}
                </Text>
              )}

              <Stack gap="md">
                <TextInput
                  placeholder="Principal Identifier (Email)"
                  variant="unstyled"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  styles={{
                    input: {
                      background: 'black',
                      border: '1px solid #1A3A22',
                      color: '#FBFBF9',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.8rem',
                      letterSpacing: '1px',
                      padding: '12px 16px',
                    },
                  }}
                />
                <PasswordInput
                  placeholder="Access Key"
                  variant="unstyled"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  styles={{
                    input: {
                      background: 'black',
                      border: '1px solid #1A3A22',
                      color: '#FBFBF9',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.8rem',
                      letterSpacing: '1px',
                      padding: '12px 16px',
                    },
                    innerInput: { background: 'transparent' },
                  }}
                />
              </Stack>

              <Button
                type="submit" fullWidth size="lg"
                color="yellow" c="dark" loading={loading}
                rightSection={<IconArrowRight size={18} />}
                style={{ borderRadius: 0 }}
              >
                Establish Connection
              </Button>

              <Divider color="#1A3A22" label="MFA PROTOCOLS" labelPosition="center"
                styles={{ label: { color: '#5B8C6A', fontSize: '9px', letterSpacing: '2px' } }}
              />

              <Group grow gap="md">
                <Button variant="outline" color="gray" size="xs" leftSection={<IconFingerprint size={14} />}>
                  Biometric
                </Button>
                <Button variant="outline" color="gray" size="xs" leftSection={<IconDeviceMobile size={14} />}>
                  Authenticator
                </Button>
              </Group>
            </Stack>
          </Paper>

          <Group justify="space-between" px="md">
            <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '7px', color: '#5B8C6A', letterSpacing: '2px' }}>
              STATUS: PORTAL_GATE_ACTIVE
            </Text>
            <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: '7px', color: '#5B8C6A', letterSpacing: '2px' }}>
              BACKEND: POCKETBASE_v0.39.6
            </Text>
          </Group>
        </Stack>
      </Container>
    </Box>
  )
}
