'use client'

import React, { useState } from 'react'
import {
  Container,
  Title,
  Text,
  Box,
  Stack,
  Button,
  TextInput,
  Textarea,
  rem,
  Group,
  useMantineTheme,
  Alert,
} from '@mantine/core'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'
import { useSearchParams } from 'next/navigation'
import { IconCheck, IconInfoCircle } from '@tabler/icons-react'
import Link from 'next/link'

const INNER_WIDTH = 760

export default function RequestServicePage() {
  const theme = useMantineTheme()
  const active = theme.other
  const searchParams = useSearchParams()
  const service = searchParams.get('service') || 'the selected service'

  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = () => {
    // In a real app, you'd send this data to your backend
    console.log({ service, name, email })
    setSubmitted(true)
  }

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      <Container size={INNER_WIDTH} py={rem(100)}>
        {submitted ? (
          <Stack gap="xl" align="center" style={{ textAlign: 'center' }}>
            <Box c={active.accent}>
              <IconCheck size={64} stroke={1.5} />
            </Box>
            <Title
              order={1}
              style={{ fontFamily: 'var(--font-serif)', color: active.primary, fontWeight: 400 }}
            >
              Request Received
            </Title>
            <Text size="lg" c="dimmed" lh={1.6} style={{ maxWidth: 600 }}>
              Thank you, {name}. We have received your request regarding <strong>{service}</strong>.
              A faculty member will review your details and contact you at <strong>{email}</strong>{' '}
              within 24 hours to schedule a 15-minute introductory call.
            </Text>
            <Link href="/scholarcrafted/services" style={{ textDecoration: 'none' }}>
              <Button variant="outline" color={active.primary} radius={0} mt="md">
                RETURN TO SERVICES
              </Button>
            </Link>
          </Stack>
        ) : (
          <Stack gap="xl">
            <Box style={{ textAlign: 'center' }}>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c="dimmed"
              >
                Initiate a Review
              </Text>
              <Title
                order={1}
                mt="md"
                style={{
                  fontSize: rem(48),
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  color: active.primary,
                  fontFamily: 'var(--font-serif)',
                }}
              >
                Request for: {service}
              </Title>
            </Box>

            <Box
              bg={active.surface}
              p={rem(40)}
              style={{ border: `1px solid ${active.primary}22` }}
            >
              <Stack gap="lg">
                <TextInput
                  label="Full Name"
                  placeholder="e.g. Dr. Jane Smith"
                  radius={0}
                  onChange={(e) => setName(e.currentTarget.value)}
                />
                <TextInput
                  label="Email Address"
                  placeholder="e.g. j.smith@university.edu"
                  radius={0}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
                <Textarea
                  label="Brief Project Description (Optional)"
                  placeholder="Provide a short summary of your manuscript or data challenge..."
                  minRows={4}
                  radius={0}
                />
                <Stack gap="sm" mt="md">
                  <Button
                    size="lg"
                    variant="filled"
                    bg={active.primary}
                    radius={0}
                    onClick={handleSubmit}
                  >
                    SUBMIT REQUEST
                  </Button>
                  <Text size="xs" c="dimmed" style={{ textAlign: 'center' }}>
                    This will initiate a free, 15-minute introductory call to assess your
                    project&apos;s needs.
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        )}
      </Container>

      <Footer />
    </Box>
  )
}
