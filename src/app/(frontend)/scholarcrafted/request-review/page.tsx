'use client'

import React, { useState, Suspense } from 'react'
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
  Radio,
  Checkbox,
  ScrollArea,
  Divider,
  ThemeIcon,
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { Dropzone, FileWithPath } from '@mantine/dropzone'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'
import { useSearchParams } from 'next/navigation'
import { IconCheck, IconUpload, IconX, IconFileText, IconPhone, IconMail, IconLock } from '@tabler/icons-react'
import Link from 'next/link'
import { SECTION_SPACING, INNER_WIDTH, READING_WIDTH } from '@/layout'

export default function RequestReviewPage() {
  return (
    <Suspense fallback={<Box bg="gray.1" style={{ minHeight: '100vh' }} />}>
      <RequestReviewContent />
    </Suspense>
  )
}

function RequestReviewContent() {
  const theme = useMantineTheme()
  const active = theme.other
  const searchParams = useSearchParams()
  const service = searchParams.get('service') || 'Professional Editing'

  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+254',
    contactPreference: 'email',
    wordCount: 0,
    deadline: null as Date | null,
    additionalInstructions: '',
    referral: '',
    consent: false,
  })

  const [manuscript, setManuscript] = useState<FileWithPath[]>([])
  const [guidelines, setGuidelines] = useState<FileWithPath[]>([])

  const handleSubmit = () => {
    console.log({ ...formData, manuscript, guidelines })
    setSubmitted(true)
  }

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {submitted ? (
        <Container size={READING_WIDTH} py={rem(140)}>
          <Stack gap="xl" align="center" style={{ textAlign: 'center' }}>
            <Box c={active.accent}>
              <IconCheck size={64} stroke={1.5} />
            </Box>
            <Title order={1} style={{ color: active.primary }}>
              Submission Received
            </Title>
            <Text size="lg" c="dimmed" lh={1.6} style={{ maxWidth: 600 }}>
              Thank you, {formData.firstName}. We have received your documents for <strong>{service}</strong>. A
              faculty coordinator will review your submission and issue a formal quote to{' '}
              <strong>{formData.email}</strong> within 24 hours.
            </Text>
            <Link href="/scholarcrafted" style={{ textDecoration: 'none' }}>
              <Button variant="outline" color={active.primary} radius={0} mt="md">
                RETURN TO HOME
              </Button>
            </Link>
          </Stack>
        </Container>
      ) : (
        <>
          <Box component="section" pt={rem(100)} pb={rem(40)} bg={active.background}>
            <Container size={READING_WIDTH}>
              <Stack gap="xs" align="center" style={{ textAlign: 'center' }}>
                <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  Intake Process
                </Text>
                <Title
                  order={1}
                  style={{
                    fontSize: rem(48),
                    lineHeight: 1.1,
                    color: active.primary,
                    fontFamily: 'var(--font-serif)'
                  }}
                >
                  Request an Editing Estimate
                </Title>
                <Text size="sm" c="dimmed" mt="md" style={{ maxWidth: 600 }}>
                  To receive a quote, complete the form below and attach your document as a Word file. 
                  Quotes are issued via email within 24 hours of receipt.
                </Text>
              </Stack>
            </Container>
          </Box>

          <Box component="section" py={rem(60)} bg={active.surface}>
            <Container size={READING_WIDTH}>
              <Box bg="white" p={{ base: rem(20), sm: rem(60) }} style={{ border: `1px solid oklch(0% 0 0 / 0.08)`, boxShadow: '0 4px 24px oklch(0% 0 0 / 0.02)' }}>
                <Stack gap={rem(40)}>
                  {/* Contact Information */}
                  <Box>
                    <Group gap="xs" mb="lg">
                      <ThemeIcon variant="light" color="dark" radius="xl" size="sm">
                        <IconFileText size={14} />
                      </ThemeIcon>
                      <Text fw={700} size="sm" style={{ letterSpacing: '0.05em', textTransform: 'uppercase' }}>Contact Details</Text>
                    </Group>
                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
                      <TextInput
                        label="First Name"
                        placeholder="e.g. Jane"
                        required
                        radius={0}
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      />
                      <TextInput
                        label="Last Name"
                        placeholder="e.g. Smith"
                        required
                        radius={0}
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      />
                      <TextInput
                        label="Personal Email"
                        placeholder="e.g. jane.smith@gmail.com"
                        description="Avoid university emails to ensure delivery through firewalls."
                        required
                        radius={0}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      <Group grow align="flex-end" gap="xs">
                        <Select
                          label="Country"
                          placeholder="+254"
                          data={[
                            { value: '+254', label: '🇰🇪 KE (+254)' },
                            { value: '+1', label: '🇺🇸 US (+1)' },
                            { value: '+44', label: '🇬🇧 UK (+44)' },
                            { value: '+61', label: '🇦🇺 AU (+61)' },
                            { value: '+27', label: '🇿🇦 ZA (+27)' },
                            { value: '+91', label: '🇮🇳 IN (+91)' },
                            { value: '+86', label: '🇨🇳 CN (+86)' },
                            { value: '+49', label: '🇩🇪 DE (+49)' },
                            { value: '+33', label: '🇫🇷 FR (+33)' },
                            { value: '+971', label: '🇦🇪 AE (+971)' },
                          ]}
                          searchable
                          radius={0}
                          style={{ maxWidth: rem(140) }}
                          value={formData.countryCode}
                          onChange={(val) => setFormData({ ...formData, countryCode: val || '' })}
                        />
                        <TextInput
                          label="Phone Number"
                          placeholder="712 345 678"
                          description="We will contact you via email if international."
                          required
                          radius={0}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </Group>
                    </SimpleGrid>

                    <Radio.Group
                      label="Would you like for us to call you today to discuss your quote?"
                      required
                      mt="xl"
                      value={formData.contactPreference}
                      onChange={(val) => setFormData({ ...formData, contactPreference: val })}
                    >
                      <Group mt="xs">
                        <Radio value="call" label="Yes, please call me" color="dark" />
                        <Radio value="email" label="No, please send me an email" color="dark" />
                      </Group>
                    </Radio.Group>
                  </Box>

                  <Divider color="oklch(0% 0 0 / 0.05)" />

                  {/* Project Specifications */}
                  <Box>
                    <Group gap="xs" mb="lg">
                      <ThemeIcon variant="light" color="dark" radius="xl" size="sm">
                        <IconLock size={14} />
                      </ThemeIcon>
                      <Text fw={700} size="sm" style={{ letterSpacing: '0.05em', textTransform: 'uppercase' }}>Project Specifications</Text>
                    </Group>
                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
                      <NumberInput
                        label="Word Count of Document"
                        placeholder="e.g. 45000"
                        description="Exclude appendices from count."
                        required
                        radius={0}
                        min={0}
                        value={formData.wordCount}
                        onChange={(val) => setFormData({ ...formData, wordCount: typeof val === 'number' ? val : 0 })}
                      />
                      <DatePickerInput
                        label="Desired Return Date"
                        placeholder="Select a date"
                        description="Include a 24-48h buffer before your actual deadline."
                        required
                        radius={0}
                        minDate={new Date()}
                        value={formData.deadline}
                        onChange={(val) => setFormData({ ...formData, deadline: val })}
                      />
                    </SimpleGrid>
                    <Textarea
                      label="Additional Instructions"
                      placeholder="Specify unique formatting needs, style guides (APA, MLA), or specific concerns..."
                      mt="xl"
                      radius={0}
                      minRows={4}
                      value={formData.additionalInstructions}
                      onChange={(e) => setFormData({ ...formData, additionalInstructions: e.target.value })}
                    />
                    <Select
                      label="How did you hear about us?"
                      placeholder="Select an option"
                      required
                      mt="xl"
                      radius={0}
                      data={['Search Engine', 'University Referral', 'Colleague/Friend', 'Social Media', 'Academic Journal', 'Other']}
                      value={formData.referral}
                      onChange={(val) => setFormData({ ...formData, referral: val || '' })}
                    />
                  </Box>

                  <Divider color="oklch(0% 0 0 / 0.05)" />

                  {/* Document Uploads */}
                  <Box>
                    <Text fw={700} size="sm" mb="lg" style={{ letterSpacing: '0.05em', textTransform: 'uppercase' }}>Document Uploads</Text>
                    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                      <Stack gap="xs">
                        <Text size="sm" fw={500}>Attach Your Manuscript (Required)</Text>
                        <Dropzone onDrop={setManuscript} multiple={false} styles={{ root: { backgroundColor: active.surface, borderStyle: 'dashed' } }}>
                          <Group justify="center" gap="md" mih={100} style={{ pointerEvents: 'none' }}>
                            {manuscript.length > 0 ? (
                              <Stack align="center" gap={4}>
                                <IconCheck size={30} color={active.accent} />
                                <Text size="xs" style={{ textAlign: 'center' }}>{manuscript[0].name}</Text>
                              </Stack>
                            ) : (
                              <>
                                <IconFileText size={30} stroke={1.5} color="gray" />
                                <Text size="xs" c="dimmed">Drag Word file or click</Text>
                              </>
                            )}
                          </Group>
                        </Dropzone>
                      </Stack>

                      <Stack gap="xs">
                        <Text size="sm" fw={500}>Program Guidelines (Optional)</Text>
                        <Dropzone onDrop={setGuidelines} multiple={false} styles={{ root: { backgroundColor: active.surface, borderStyle: 'dashed' } }}>
                          <Group justify="center" gap="md" mih={100} style={{ pointerEvents: 'none' }}>
                            {guidelines.length > 0 ? (
                              <Stack align="center" gap={4}>
                                <IconCheck size={30} color={active.accent} />
                                <Text size="xs" style={{ textAlign: 'center' }}>{guidelines[0].name}</Text>
                              </Stack>
                            ) : (
                              <>
                                <IconUpload size={30} stroke={1.5} color="gray" />
                                <Text size="xs" c="dimmed">Attach template or guide</Text>
                              </>
                            )}
                          </Group>
                        </Dropzone>
                      </Stack>
                    </SimpleGrid>
                  </Box>

                  <Divider color="oklch(0% 0 0 / 0.05)" />

                  {/* NDA Section */}
                  <Box>
                    <Text fw={700} size="sm" mb="md" style={{ letterSpacing: '0.05em', textTransform: 'uppercase' }}>Confidentiality Agreement</Text>
                    <ScrollArea h={200} type="always" p="md" offsetScrollbars style={{ backgroundColor: active.surface, border: '1px solid #eee' }}>
                      <Text size="xs" lh={1.6} c="dimmed">
                        <Text fw={700} mb="xs" c="dark">CONFIDENTIALITY AND NON-DISCLOSURE AGREEMENT</Text>
                        This Agreement is made between The Dissertation Coach (referred to as the "Company") and the client (referred to as the "Client"). The purpose of this Agreement is to ensure the confidentiality of information shared...
                        <br /><br />
                        <Text fw={700} c="dark">CONFIDENTIAL INFORMATION.</Text> Includes, but is not limited to, documents, records, data (verbal, electronic, or written), models, designs, technical procedures, analyses, compilations, studies, software, prototypes, formulas, methodologies, formulations, know-how, experimental results, specifications, and other business information...
                        <br /><br />
                        <Text fw={700} c="dark">SURVIVAL OF CONFIDENTIALITY AND NON-USE.</Text> The Company will ensure that its affiliates, employees, officers, directors, owners, agents, consultants, and representatives given access to the Confidential Information comply with this Agreement's terms. The Company and the Client will maintain confidentiality indefinitely unless otherwise agreed in writing...
                        <br /><br />
                        <Text fw={700} c="dark">GOVERNING LAW.</Text> This Agreement is governed by the laws of North Carolina, with venue and jurisdiction in the state and federal courts of the Company's jurisdiction.
                        <br /><br />
                        <Text fw={700} c="dark">ELECTRONIC SIGNATURE.</Text> The Client's electronic signature (consent below) is valid and binding for this Agreement.
                      </Text>
                    </ScrollArea>
                    <Checkbox
                      mt="md"
                      label="I consent to this agreement and understand that my document will only be used for the purposes of determining an estimate."
                      required
                      color="dark"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    />
                  </Box>

                  <Button
                    size="xl"
                    variant="filled"
                    bg={active.primary}
                    radius={0}
                    onClick={handleSubmit}
                    disabled={!formData.consent || manuscript.length === 0 || !formData.firstName || !formData.email}
                    style={{ letterSpacing: '0.1em' }}
                  >
                    SUBMIT
                  </Button>

                  <Text size="xs" c="dimmed" style={{ textAlign: 'center' }}>
                    By submitting, you agree to our Terms of Service and Privacy Policy. 
                    A deposit may be required to secure scheduling for future work.
                  </Text>
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
