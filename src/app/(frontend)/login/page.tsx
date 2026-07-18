'use client';
import React from 'react';
import { 
  Box, 
  Container, 
  Title, 
  Text, 
  TextInput, 
  PasswordInput, 
  Button, 
  Stack, 
  Group, 
  Paper,
  ThemeIcon,
  Divider
} from '@mantine/core';

import { 
  IconShieldLock, 
  IconFingerprint, 
  IconDeviceMobile,
  IconArrowRight
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide credentials.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.errors?.[0]?.message || 'Invalid credentials.');
        setLoading(false);
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      console.error(err);
      setError('An error occurred during authentication.');
      setLoading(false);
    }
  };

  return (
    <Box 
      component="main" 
      mih="100vh" 
      bg="dark-forest" 
      display="flex" 
      style={{ 
        alignItems: 'center', 
        justifyContent: 'center',
        paddingTop: 80,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* 1. Cinematic Lab Background */}
      <Box
        pos="absolute"
        top={0}
        right={0}
        bottom={0}
        left={0}
        opacity={0.02}
        style={{
          backgroundImage: `
            linear-gradient(var(--mantine-color-burnished-gold-7) 1px, transparent 1px),
            linear-gradient(90deg, var(--mantine-color-burnished-gold-7) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <Container size="xs" w="100%" pos="relative">
        <Stack gap="xl">
          {/* 2. The High-Security Gate */}
          <Paper 
            withBorder 
            p={60} 
            radius={0} 
            bg="rgba(14, 29, 22, 0.6)" 
            style={{ 
              border: '1px solid var(--mantine-color-deep-green-7)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <Stack gap={40} component="form" onSubmit={handleLogin}>
              <Box ta="center">
                <ThemeIcon color="burnished-gold" variant="outline" size={60} radius={0} mb="xl" style={{ border: '1px solid var(--mantine-color-burnished-gold-7)' }}>
                  <IconShieldLock size={35} />
                </ThemeIcon>
                <Title order={1} ff="var(--font-display)" c="parchment" size="2rem" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Institutional <Text component="span" inherit c="burnished-gold">Access</Text>
                </Title>
                <Text ff="var(--font-body)" size="7px" c="deep-green.3" mt={8} style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>
                  Secure Author Portal // Encrypted Session
                </Text>
              </Box>

              {error && (
                <Text color="red" size="sm" ta="center" ff="var(--font-body)">
                  {error}
                </Text>
              )}

              <Stack gap="md">
                <TextInput 
                  placeholder="Principal Identifier (Email)" 
                  variant="unstyled"
                  p="md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  styles={{
                    input: {
                      background: 'black',
                      border: '1px solid var(--mantine-color-deep-green-7)',
                      color: 'var(--mantine-color-parchment-0)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      letterSpacing: '1px'
                    }
                  }}
                />
                <PasswordInput 
                  placeholder="Access Key" 
                  variant="unstyled"
                  p="md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  styles={{
                    input: {
                      background: 'black',
                      border: '1px solid var(--mantine-color-deep-green-7)',
                      color: 'var(--mantine-color-parchment-0)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      letterSpacing: '1px'
                    }
                  }}
                />
              </Stack>

              <Button 
                type="submit"
                fullWidth 
                size="lg" 
                color="burnished-gold" 
                c="dark-forest" 
                radius={0}
                loading={loading}
                rightSection={<IconArrowRight size={18} />}
              >
                Establish Connection
              </Button>

              <Divider color="deep-green.7" label="MFA PROTOCOLS" labelPosition="center" />

              <Group grow gap="md">
                <Button variant="outline" color="deep-green.3" radius={0} size="xs" leftSection={<IconFingerprint size={14} />}>
                  Biometric
                </Button>
                <Button variant="outline" color="deep-green.3" radius={0} size="xs" leftSection={<IconDeviceMobile size={14} />}>
                  Authenticator
                </Button>
              </Group>
            </Stack>
          </Paper>

          {/* 3. Session Metadata */}
          <Group justify="space-between" px="md">
            <Text ff="var(--font-body)" size="7px" c="deep-green.3" style={{ letterSpacing: '2px' }}>IP: 192.168.1.XXX</Text>
            <Text ff="var(--font-body)" size="7px" c="deep-green.3" style={{ letterSpacing: '2px' }}>STATUS: PORTAL_GATE_ACTIVE</Text>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}
