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
  Select,
  NumberInput,
  SimpleGrid,
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { Dropzone, FileWithPath } from '@mantine/dropzone'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'
import { useSearchParams } from 'next/navigation'
import { IconCheck, IconUpload, IconX, IconFileText } from '@tabler/icons-react'
import Link from 'next/link'

const INNER_WIDTH = 760

export default function RequestReviewPage() {
  const theme = useMantineTheme()
  const active = theme.other
  const searchParams = useSearchParams()
  const service = searchParams.get('service') || 'the selected service'

  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [files, setFiles] = useState<FileWithPath[]>([])

  const handleSubmit = () => {
    // In a real app, you'd handle the file upload here
    console.log({ service, name, email, files })
    setSubmitted(true)
  }

  const previews = files.map((file, index) => {
    return (
      <Text key={index} size="sm">
        {file.name}
      </Text>
    )
  })

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {submitted ? (
        <Container size={INNER_WIDTH} py={rem(140)}>
          <Stack gap="xl" align="center" style={{ textAlign: 'center' }}>
            <Box c={active.accent}>
              <IconCheck size={64} stroke={1.5} />
            </Box>
            <Title
              order={1}
              style={{ fontFamily: 'var(--font-serif)', color: active.primary, fontWeight: 400 }}
            >
              Submission Received
            </Title>
            <Text size="lg" c="dimmed" lh={1.6} style={{ maxWidth: 600 }}>
              Thank you, {name}. We have received your document for a <strong>{service}</strong>. A
              faculty member will review your submission and send a formal quote to{' '}
              <strong>{email}</strong> within 24 hours.
            </Text>
            <Link href="/scholarcrafted/services" style={{ textDecoration: 'none' }}>
              <Button variant="outline" color={active.primary} radius={0} mt="md">
                RETURN TO SERVICES
              </Button>
            </Link>
          </Stack>
        </Container>
      ) : (
        <>
          <Box component="section" pt={rem(100)} pb={rem(60)} bg={active.background}>
            <Container size={INNER_WIDTH}>
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
            </Container>
          </Box>
          <Box component="section" py={rem(80)} bg={active.surface}>
            <Container size={INNER_WIDTH}>
              <Box bg="white" p={rem(40)} style={{ border: `1px solid #eee` }}>
                <Stack gap="lg">
                  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
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
                  </SimpleGrid>
                  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                    <Select
                      label="Word Count (Approx.)"
                      placeholder="Select a range"
                      data={[
                        'Up to 3,000 words',
                        '3,000 - 7,000 words',
                        '7,000 - 15,000 words',
                        '15,000+ words',
                      ]}
                      radius={0}
                    />
                    <DatePickerInput
                      label="Required Deadline"
                      placeholder="Select a date"
                      radius={0}
                      minDate={new Date()}
                    />
                  </SimpleGrid>

                  <Dropzone onDrop={setFiles} mt="md" radius={0}>
                    <Group justify="center" gap="xl" mih={120} style={{ pointerEvents: 'none' }}>
                      <Dropzone.Accept>
                        <IconUpload size={rem(40)} stroke={1.5} />
                      </Dropzone.Accept>
                      <Dropzone.Reject>
                        <IconX size={rem(40)} stroke={1.5} />
                      </Dropzone.Reject>
                      <Dropzone.Idle>
                        <IconFileText size={rem(40)} stroke={1.5} />
                      </Dropzone.Idle>
                      <Stack align="center">
                        <Text size="lg" inline>
                          Drag your document here or click to select file
                        </Text>
                        <Text size="sm" c="dimmed" inline mt={7}>
                          Attach your manuscript (PDF, DOCX, or Pages)
                        </Text>
                      </Stack>
                    </Group>
                  </Dropzone>

                  {files.length > 0 && <Box mt="md">{previews}</Box>}

                  <Stack gap="sm" mt="md">
                    <Button
                      size="lg"
                      variant="filled"
                      bg={active.primary}
                      radius={0}
                      onClick={handleSubmit}
                      disabled={files.length === 0}
                    >
                      GET MY QUOTE
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Container>
          </Box>
        </>
      )}

      <Footer />
    </Box>
  )
}
