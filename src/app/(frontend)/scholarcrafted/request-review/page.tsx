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

  const [step, setStep] = useState(1)
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
    service: 'Structural Editing & Proofreading',
  })

  const [manuscript, setManuscript] = useState<FileWithPath[]>([])
  const [guidelines, setGuidelines] = useState<FileWithPath[]>([])
  const [isSaved, setIsSaved] = useState(false)

  // Load from localStorage & searchParams on mount
  React.useEffect(() => {
    // 1. First, load draft if any exists
    const saved = localStorage.getItem('scholarcrafted_intake_draft')
    let draftData: any = {}
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // Convert deadline string back to Date object
        if (parsed.deadline) parsed.deadline = new Date(parsed.deadline)
        draftData = parsed
      } catch (e) {
        console.error('Failed to load draft', e)
      }
    }

    // 2. Read query params (which take precedence on deep link from the interactive page)
    const queryWordCount = searchParams.get('wordCount')
    const queryHours = searchParams.get('hours')
    const queryService = searchParams.get('service')

    const initialData = {
      service: 'Structural Editing & Proofreading',
      ...draftData,
    }

    if (queryWordCount) {
      initialData.wordCount = parseInt(queryWordCount, 10) || 0
    }

    if (queryService) {
      if (queryService === 'Formatting') {
        initialData.service = 'Structural Editing & Proofreading'
      } else if (queryService === 'TechnicalSupport') {
        initialData.service = 'Custom Research & Data Support'
      } else {
        initialData.service = queryService
      }
    }
    
    if (queryHours && queryService === 'TechnicalSupport') {
      const estimationText = `[Estimated Support Request: ${queryHours} hours ($${parseInt(queryHours, 10) * 90})]`
      if (!initialData.additionalInstructions?.includes(estimationText)) {
        initialData.additionalInstructions = `${estimationText}\n` + (initialData.additionalInstructions || '')
      }
    }

    // 3. Read saved step unless forced by query params
    const savedStep = localStorage.getItem('scholarcrafted_intake_step')
    let initialStep = 1
    if (savedStep && !queryWordCount && !queryHours && !queryService) {
      const parsedStep = parseInt(savedStep, 10)
      if (parsedStep >= 1 && parsedStep <= 3) {
        initialStep = parsedStep
      }
    }
    setStep(initialStep)

    setFormData((prev) => ({ ...prev, ...initialData }))
  }, [searchParams])

  // Save to localStorage on change
  React.useEffect(() => {
    if (!submitted) {
      localStorage.setItem('scholarcrafted_intake_draft', JSON.stringify(formData))
      localStorage.setItem('scholarcrafted_intake_step', step.toString())
      setIsSaved(true)
      const timeout = setTimeout(() => setIsSaved(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [formData, step, submitted])

  const handleSubmit = () => {
    console.log({ ...formData, manuscript, guidelines })
    localStorage.removeItem('scholarcrafted_intake_draft')
    localStorage.removeItem('scholarcrafted_intake_step')
    setSubmitted(true)
  }

  const isStep1Valid = formData.wordCount > 0 && formData.deadline !== null && formData.service.trim() !== ''
  const isStep2Valid = manuscript.length > 0
  const isStep3Valid = 
    formData.firstName.trim() !== '' && 
    formData.lastName.trim() !== '' && 
    formData.email.trim() !== '' && 
    formData.phone.trim() !== '' && 
    formData.consent

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
              Thank you, {formData.firstName}. We have received your documents for <strong>{formData.service}</strong>. A
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
                  
                  {/* Academic Stepper Header */}
                  <Box pb="md" style={{ borderBottom: '1px solid oklch(0% 0 0 / 0.05)' }}>
                    <Group justify="space-between" align="center">
                      <Group gap="xs">
                        <Text 
                          size="xs" 
                          fw={700} 
                          c={step === 1 ? active.accent : 'dark.8'} 
                          style={{ letterSpacing: '0.1em', transition: 'color 0.3s ease' }}
                        >
                          01 SPECS
                        </Text>
                        <Text size="xs" c="dimmed">/</Text>
                        <Text 
                          size="xs" 
                          fw={700} 
                          c={step === 2 ? active.accent : 'dark.8'} 
                          style={{ letterSpacing: '0.1em', transition: 'color 0.3s ease' }}
                        >
                          02 DOCUMENTS
                        </Text>
                        <Text size="xs" c="dimmed">/</Text>
                        <Text 
                          size="xs" 
                          fw={700} 
                          c={step === 3 ? active.accent : 'dark.8'} 
                          style={{ letterSpacing: '0.1em', transition: 'color 0.3s ease' }}
                        >
                          03 SECURE QUOTE
                        </Text>
                      </Group>
                      
                      <Text size="xs" c="dimmed" fw={600}>
                        STEP {step} OF 3
                      </Text>
                    </Group>
                    <Box mt="xs" style={{ height: 2, backgroundColor: 'oklch(0% 0 0 / 0.05)', position: 'relative' }}>
                      <Box 
                        style={{ 
                          height: '100%', 
                          width: `${(step / 3) * 100}%`, 
                          backgroundColor: active.accent, 
                          transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)' 
                        }} 
                      />
                    </Box>
                  </Box>

                  {/* Step 1: Project Specifications */}
                  {step === 1 && (
                    <Stack gap="xl">
                      {/* Dynamic Baseline Estimate Callout */}
                      {(searchParams.get('wordCount') || searchParams.get('hours')) && (
                        <Box 
                          p="md" 
                          bg="oklch(99% 0.005 60)" 
                          style={{ 
                            borderLeft: `4px solid ${active.accent}`,
                            borderTop: '1px solid oklch(93% 0.005 60)',
                            borderRight: '1px solid oklch(93% 0.005 60)',
                            borderBottom: '1px solid oklch(93% 0.005 60)'
                          }}
                        >
                          <Stack gap="xs">
                            <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                              Selected Baseline Estimate
                            </Text>
                            <Text size="lg" fw={700} c={active.primary} style={{ fontFamily: 'var(--font-serif)' }}>
                              {searchParams.get('wordCount') ? (
                                <>Estimated Rate: ${(parseInt(searchParams.get('wordCount')!, 10) * 0.044).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <Text span size="xs" c="dimmed" fw={500}>({parseInt(searchParams.get('wordCount')!, 10).toLocaleString()} words @ $0.044/word)</Text></>
                              ) : (
                                <>Estimated Rate: ${(parseInt(searchParams.get('hours')!, 10) * 90).toLocaleString()} <Text span size="xs" c="dimmed" fw={500}>({searchParams.get('hours')} hours @ $90/hr)</Text></>
                              )}
                            </Text>
                            <Text size="xs" c="dimmed" lh={1.4}>
                              This baseline estimate has been locked into your request. Complete your details to secure this rate. A faculty coordinator will review your materials to confirm structural complexity and issue your official quote.
                            </Text>
                          </Stack>
                        </Box>
                      )}

                      <Box>
                        <Group gap="xs" mb="lg">
                          <ThemeIcon variant="light" color="dark" radius="xl" size="sm">
                            <IconLock size={14} />
                          </ThemeIcon>
                          <Text fw={700} size="sm" style={{ letterSpacing: '0.05em', textTransform: 'uppercase' }}>Project Specifications</Text>
                        </Group>

                        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
                          <Box>
                            <Text size="sm" fw={500} mb={4}>
                              Selected Service <Text span c="red" ml={2}>*</Text>
                            </Text>
                            <Select
                              placeholder="Select service"
                              required
                              radius={0}
                              data={['Structural Editing & Proofreading', 'Custom Research & Data Support']}
                              value={formData.service}
                              onChange={(val) => setFormData({ ...formData, service: val || '' })}
                            />
                            <Text size="xs" c="dimmed" mt={4} style={{ visibility: 'hidden' }}>
                              Placeholder description for baseline alignment
                            </Text>
                          </Box>

                          <Box>
                            <Text size="sm" fw={500} mb={4}>
                              Word Count of Document <Text span c="red" ml={2}>*</Text>
                            </Text>
                            <NumberInput
                              placeholder="e.g. 45000"
                              required
                              radius={0}
                              min={0}
                              value={formData.wordCount}
                              onChange={(val) => setFormData({ ...formData, wordCount: typeof val === 'number' ? val : 0 })}
                            />
                            <Text size="xs" c="dimmed" mt={4}>
                              Exclude appendices from count.
                            </Text>
                          </Box>
                        </SimpleGrid>

                        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl" mt="xl">
                          <Box>
                            <Text size="sm" fw={500} mb={4}>
                              Desired Return Date <Text span c="red" ml={2}>*</Text>
                            </Text>
                            <DatePickerInput
                              placeholder="Select a date"
                              required
                              radius={0}
                              minDate={new Date()}
                              value={formData.deadline}
                              onChange={(val) => setFormData({ ...formData, deadline: val as Date | null })}
                            />
                            <Text size="xs" c="dimmed" mt={4}>
                              Include a 24-48h buffer before your actual deadline.
                            </Text>
                          </Box>

                          <Box>
                            <Text size="sm" fw={500} mb={4}>
                              How did you hear about us? <Text span c="red" ml={2}>*</Text>
                            </Text>
                            <Select
                              placeholder="Select an option"
                              required
                              radius={0}
                              data={['Search Engine', 'University Referral', 'Colleague/Friend', 'Social Media', 'Academic Journal', 'Other']}
                              value={formData.referral}
                              onChange={(val) => setFormData({ ...formData, referral: val || '' })}
                            />
                            <Text size="xs" c="dimmed" mt={4} style={{ visibility: 'hidden' }}>
                              Placeholder description for baseline alignment
                            </Text>
                          </Box>
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
                      </Box>

                      <Group justify="flex-end" mt="xl">
                        <Button
                          size="md"
                          variant="filled"
                          bg={active.primary}
                          radius={0}
                          onClick={() => setStep(2)}
                          disabled={!isStep1Valid}
                          style={{ letterSpacing: '0.05em' }}
                          className="impeccable-button"
                        >
                          Continue to Upload
                        </Button>
                      </Group>
                    </Stack>
                  )}

                  {/* Step 2: Document Uploads */}
                  {step === 2 && (
                    <Stack gap="xl">
                      <Box>
                        <Text fw={700} size="sm" mb="lg" style={{ letterSpacing: '0.05em', textTransform: 'uppercase' }}>Document Uploads</Text>
                        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                          <Stack gap="xs">
                            <Text size="sm" fw={500}>Attach Your Manuscript (Required)</Text>
                            <Dropzone onDrop={setManuscript} multiple={false} styles={{ root: { backgroundColor: active.surface, borderStyle: 'dashed' } }}>
                              <Group justify="center" gap="md" mih={120} style={{ pointerEvents: 'none' }}>
                                {manuscript.length > 0 ? (
                                  <Stack align="center" gap={4}>
                                    <IconCheck size={30} color={active.accent} />
                                    <Text size="xs" style={{ textAlign: 'center', maxWidth: rem(180) }} truncate>{manuscript[0].name}</Text>
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
                              <Group justify="center" gap="md" mih={120} style={{ pointerEvents: 'none' }}>
                                {guidelines.length > 0 ? (
                                  <Stack align="center" gap={4}>
                                    <IconCheck size={30} color={active.accent} />
                                    <Text size="xs" style={{ textAlign: 'center', maxWidth: rem(180) }} truncate>{guidelines[0].name}</Text>
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

                      <Group justify="space-between" mt="xl">
                        <Button
                          size="md"
                          variant="outline"
                          color={active.primary}
                          radius={0}
                          onClick={() => setStep(1)}
                          style={{ borderColor: active.primary, letterSpacing: '0.05em' }}
                          className="impeccable-button"
                        >
                          Back to Specs
                        </Button>
                        <Button
                          size="md"
                          variant="filled"
                          bg={active.primary}
                          radius={0}
                          onClick={() => setStep(3)}
                          disabled={!isStep2Valid}
                          style={{ letterSpacing: '0.05em' }}
                          className="impeccable-button"
                        >
                          Continue to Identity
                        </Button>
                      </Group>
                    </Stack>
                  )}

                  {/* Step 3: Identity & NDA */}
                  {step === 3 && (
                    <Stack gap="xl">
                      {/* Contact Information */}
                      <Box>
                        <Group justify="space-between" mb="lg">
                          <Group gap="xs">
                            <ThemeIcon variant="light" color="dark" radius="xl" size="sm">
                              <IconFileText size={14} />
                            </ThemeIcon>
                            <Text fw={700} size="sm" style={{ letterSpacing: '0.05em', textTransform: 'uppercase' }}>Contact Details</Text>
                          </Group>
                          {isSaved && (
                            <Group gap={4}>
                              <IconCheck size={12} color={active.accent} />
                              <Text size="xs" c="dimmed" fw={500}>Draft Saved</Text>
                            </Group>
                          )}
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
                        </SimpleGrid>

                        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl" mt="xl">
                          <Box>
                            <Text size="sm" fw={500} mb={4}>
                              Personal Email <Text span c="red" ml={2}>*</Text>
                            </Text>
                            <TextInput
                              placeholder="e.g. jane.smith@gmail.com"
                              required
                              radius={0}
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            <Text size="xs" c="dimmed" mt={4}>
                              Avoid university emails to ensure delivery through firewalls.
                            </Text>
                          </Box>

                          <Box>
                            <Text size="sm" fw={500} mb={4}>
                              Phone Number <Text span c="red" ml={2}>*</Text>
                            </Text>
                            <Group gap="xs" wrap="nowrap" style={{ alignItems: 'stretch' }}>
                              <Select
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
                                style={{ width: rem(150), flexShrink: 0 }}
                                value={formData.countryCode}
                                onChange={(val) => setFormData({ ...formData, countryCode: val || '' })}
                              />
                              <TextInput
                                placeholder="712 345 678"
                                required
                                radius={0}
                                style={{ flexGrow: 1 }}
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              />
                            </Group>
                            <Text size="xs" c="dimmed" mt={4}>
                              We will contact you via email if international.
                            </Text>
                          </Box>
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

                      {/* NDA Section */}
                      <Box>
                        <Text fw={700} size="sm" mb="md" style={{ letterSpacing: '0.05em', textTransform: 'uppercase' }}>Confidentiality Agreement</Text>
                        <ScrollArea h={180} type="always" p="md" offsetScrollbars style={{ backgroundColor: active.surface, border: '1px solid #eee' }}>
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

                      <Group justify="space-between" mt="xl">
                        <Button
                          size="md"
                          variant="outline"
                          color={active.primary}
                          radius={0}
                          onClick={() => setStep(2)}
                          style={{ borderColor: active.primary, letterSpacing: '0.05em' }}
                          className="impeccable-button"
                        >
                          Back to Upload
                        </Button>
                        <Button
                          size="md"
                          variant="filled"
                          bg={active.primary}
                          radius={0}
                          onClick={handleSubmit}
                          disabled={!isStep3Valid}
                          style={{ letterSpacing: '0.05em' }}
                          className="impeccable-button"
                        >
                          Submit Request
                        </Button>
                      </Group>

                      <Text size="xs" c="dimmed" style={{ textAlign: 'center' }} mt="md">
                        By submitting, you agree to our Terms of Service and Privacy Policy. 
                        A deposit may be required to secure scheduling for future work.
                      </Text>
                    </Stack>
                  )}

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
