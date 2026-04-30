'use client'

import React from 'react'
import {
  Container,
  Title,
  Text,
  Box,
  Stack,
  Button,
  rem,
  useMantineTheme,
  Group,
  Divider,
} from '@mantine/core'
import { Navbar } from '../../../_components/Navbar'
import { Footer } from '../../../_components/Footer'
import Link from 'next/link'
import { IconArrowLeft, IconClock, IconUser } from '@tabler/icons-react'
import { useParams } from 'next/navigation'

const INNER_WIDTH = 760

// Static article content keyed by slug
const articleContent: Record<
  string,
  {
    title: string
    category: string
    readTime: string
    author: string
    date: string
    heroColor: string
    body: string[]
  }
> = {
  'dissertation-chair-ghosting': {
    title: 'What to do when your Dissertation Chair ghosts you.',
    category: 'COMMITTEE POLITICS',
    readTime: '6 min read',
    author: 'Micah, PhD',
    date: 'April 2026',
    heroColor: '#1a1a2e',
    body: [
      "It happens more often than anyone admits. You send a draft. A week passes. Then two. You follow up. Silence. Your Chair, the person whose entire professional mandate is to guide your research, has gone dark. And suddenly, the most important project of your academic life is stuck waiting on a single person's reply.",
      "Here is the truth no one tells you at orientation: your Chair's primary obligation is to their own research, their own tenure file, and their own students — roughly in that order. You are one of many. This is not malicious; it is structural. Understanding this removes the emotional sting and lets you operate strategically.",
      "**Step 1: Move from reactive to proactive communication.** Do not wait for your Chair to respond before you move forward. Continue writing. When you send a follow-up, attach a specific question and a specific decision you need made, not an open-ended 'just checking in'. Busy academics respond to specific asks.",
      "**Step 2: Document every interaction.** Send brief 'confirmation of understanding' emails after any conversation, in-person or otherwise. This creates a paper trail that protects you and creates implicit accountability on their end.",
      "**Step 3: Activate your committee.** Your Chair is not your only resource. If a committee member has relevant expertise on the chapter you are stuck on, email them directly. Copy your Chair. This is entirely appropriate and professionally signals that your project is moving.",
      "**Step 4: Escalate to your Graduate Director if necessary.** If four to six weeks have passed with no substantive response to a critical document, this is a systemic failure, not a personal slight. Your Graduate Program Director exists precisely for situations like this. Frame the conversation professionally: you are not complaining, you are ensuring your timeline remains viable.",
      "The doctoral process is designed to build resilience. Navigating a silent Chair is one of its most common — and most instructive — tests. You will need to advocate for yourself. Start now.",
    ],
  },
  'qualitative-thematic-analysis-rejected': {
    title: 'Why your qualitative thematic analysis was rejected (and how to fix it).',
    category: 'METHODOLOGY',
    readTime: '8 min read',
    author: 'Micah, PhD',
    date: 'March 2026',
    heroColor: '#1a1a2e',
    body: [
      "Your Chapter 4 came back with devastating feedback: your committee does not accept the analysis. After months of interviews, transcription, and coding, the rejection feels personal. It is not. It is almost certainly one of four fixable methodological failures.",
      "**Failure 1: Themes are topics, not themes.** The most common error. 'Participant experiences of stress' is a topic. 'Institutional ambiguity as the primary driver of doctoral attrition' is a theme. A true theme makes an interpretive claim about your data. Review every theme heading and ask: does this tell the reader *what* the data says, or merely *what* the data is about?",
      "**Failure 2: The analysis lacks theoretical grounding.** Thematic analysis conducted without a stated epistemological lens is data description, not qualitative research. Your committee is asking: through what theoretical framework are you interpreting these patterns? Your codebook and your memo trail must demonstrate this.",
      "**Failure 3: No audit trail.** Can a reader trace a specific quote back to a code, back to a theme? If your methodology chapter does not describe a transparent coding process — initial codes, axial codes, and the logic of theme consolidation — your analysis appears arbitrary.",
      "**Failure 4: Reflexivity is absent or performative.** A single paragraph about your positionality does not constitute reflexivity. Genuine reflexivity is woven throughout the analysis: how did your assumptions, your cultural position, and your relationship to the research site shape what you noticed and what you did not?",
      "The fix for all four failures begins with going back to your theoretical framework before you touch a single code. Ground the analysis, then rebuild the audit trail. Your data is likely fine. Your interpretive apparatus is what needs fortification.",
    ],
  },
  'abd-trap-restart-research': {
    title: "The 'ABD' Trap: How to restart your research after a 6-month break.",
    category: 'STRATEGY',
    readTime: '5 min read',
    author: 'Micah, PhD',
    date: 'February 2026',
    heroColor: '#1a1a2e',
    body: [
      "All But Dissertation. The label sounds almost like an achievement. It is not. It is the most dangerous stage of the doctoral journey, the point at which the structure of coursework and deadlines has dissolved and the only thing keeping you moving is internal motivation — a notoriously unreliable resource.",
      "A six-month break is common. A two-year break is more common than departments will admit. Returning feels impossible not because the work is harder than before, but because the psychological distance has transformed the dissertation from a manuscript into a monument. It has become something too large to touch.",
      "**The re-entry principle: shrink the task until it is absurd.** Do not plan to 'work on Chapter 3 today'. Plan to open your document and read two pages. That is it. The goal is to break the avoidance pattern, not to produce. Re-entry is a behavioral problem before it is an academic one.",
      "**Audit your committee relationship immediately.** Before you write a single sentence, email your Chair. Do not apologize at length. Simply state that you are re-engaging and would like to schedule a brief call to reorient on your current standing. This surfaces any institutional problems early and resets the professional relationship.",
      "**Rebuild your structure before your content.** Create a simple weekly writing schedule. Two sessions of ninety minutes each is sufficient to make measurable progress. Protect these sessions like a clinical appointment. Do not optimize the schedule — implement it.",
      "You have not failed. You have paused. The scholarship still needs doing, and you are still the person to do it. The only question is whether you choose to re-engage today or in another six months.",
    ],
  },
  'research-questions-paradigm-alignment': {
    title: 'How to properly align your Research Questions with your Paradigm.',
    category: 'METHODOLOGY',
    readTime: '10 min read',
    author: 'Micah, PhD',
    date: 'January 2026',
    heroColor: '#1a1a2e',
    body: [
      "One of the most persistent — and consequential — errors in doctoral research is the misalignment between a researcher's stated paradigm and their actual research questions. A researcher claims to operate from a constructivist position, then writes RQs that seek to identify causal variables. The committee notices. The proposal stalls.",
      "**What is a paradigm and why does it matter?** A paradigm is your foundational set of beliefs about the nature of reality (ontology), how we can know it (epistemology), and therefore how we should study it (methodology). It is not a preference or a tradition. It is a logical architecture. Every methodological choice you make must be traceable back to it.",
      "**The constructivist researcher** believes reality is socially constructed and multiple. Their RQs therefore ask *how* participants experience, construct, or make meaning of a phenomenon. They do not seek to measure or generalize.",
      "**The post-positivist researcher** believes reality exists independently but can only be imperfectly measured. Their RQs seek to explain or predict relationships between variables, acknowledging measurement error.",
      "**The pragmatist researcher** focuses on what works. Their RQs are driven by the problem to be solved, and they use mixed methods to triangulate answers without commitment to a single ontological stance.",
      "**The diagnostic test.** Take your primary research question. Ask yourself: what would count as an answer to this question? If the answer is a number or a statistical relationship, your paradigm must be post-positivist or pragmatist. If the answer is a rich interpretive account of lived experience, your paradigm must be constructivist or interpretivist. Mismatches at this level produce incoherent dissertations that no methodological sophistication can rescue.",
      "Alignment is not a bureaucratic requirement. It is the difference between research that holds together and research that collapses under its own internal contradictions.",
    ],
  },
}

export default function ArticlePage() {
  const params = useParams()
  const slug = params?.slug as string
  const theme = useMantineTheme()
  const active = theme.other

  const article = articleContent[slug]

  if (!article) {
    return (
      <Box bg={active.background} style={{ minHeight: '100vh' }}>
        <Navbar />
        <Container size={INNER_WIDTH} py={rem(120)}>
          <Stack gap="xl" align="center" style={{ textAlign: 'center' }}>
            <Title order={1} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, color: active.primary }}>
              Article not found.
            </Title>
            <Link href="/scholarcrafted/resources" style={{ textDecoration: 'none' }}>
              <Button variant="outline" radius={0} color={active.primary} style={{ borderColor: active.primary }}>
                Back to Resources
              </Button>
            </Link>
          </Stack>
        </Container>
        <Footer />
      </Box>
    )
  }

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* Hero */}
      <Box
        component="section"
        bg={active.background}
        style={{
          paddingTop: rem(100),
          paddingBottom: rem(80),
        }}
      >
        <Container size={INNER_WIDTH}>
          <Group justify="space-between" align="flex-start">
            <Stack gap="md" style={{ maxWidth: 800 }}>
              <Text
                size="xs"
                fw={700}
                c="dimmed"
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
              >
                {article.category}
              </Text>
              <Title
                order={1}
                c={active.primary}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 400,
                  fontSize: rem(56),
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}
              >
                {article.title}
              </Title>
              <Group gap="xl" mt="sm">
                <Group gap="xs">
                  <IconUser size={14} color={active.primary} style={{ opacity: 0.6 }} />
                  <Text size="sm" c="dimmed">
                    {article.author}
                  </Text>
                </Group>
                <Group gap="xs">
                  <IconClock size={14} color={active.primary} style={{ opacity: 0.6 }} />
                  <Text size="sm" c="dimmed">
                    {article.readTime}
                  </Text>
                </Group>
                <Text size="sm" c="dimmed">
                  {article.date}
                </Text>
              </Group>
            </Stack>

            <Link
              href="/scholarcrafted/resources/articles"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: `${rem(8)} ${rem(16)}`,
                border: `1px solid ${active.primary}22`,
                borderRadius: rem(100),
                transition: 'all 0.2s ease',
              }}
              className="back-btn"
            >
              <IconArrowLeft size={14} color={active.primary} style={{ opacity: 0.7 }} />
              <Text size="xs" fw={600} c={active.primary} style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Back to Articles
              </Text>
            </Link>
          </Group>
        </Container>
      </Box>

      {/* Article Body */}
      <Box
        component="section"
        py={rem(80)}
        bg={active.surface}
        style={{ borderTop: `1px solid ${active.primary}22` }}
      >
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(32)}>
            {article.body.map((paragraph, i) => (
              <Text
                key={i}
                size="lg"
                lh={1.9}
                c={paragraph.startsWith('**') ? active.primary : 'dimmed'}
                fw={paragraph.startsWith('**') ? 600 : 400}
                style={{ fontSize: rem(18) }}
              >
                {paragraph.replace(/\*\*/g, '')}
              </Text>
            ))}
          </Stack>

          <Divider my={rem(80)} style={{ borderColor: `${active.primary}22` }} />

          {/* Inline CTA */}
          <Box
            p={rem(60)}
            bg={active.background}
            style={{ border: `1px solid ${active.primary}22`, textAlign: 'center' }}
          >
            <Stack gap="xl" align="center">
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c="dimmed"
              >
                Still Stuck?
              </Text>
              <Title order={2} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: rem(36), color: active.primary }}>
                Let our faculty diagnose the problem in 15 minutes.
              </Title>
              <Text size="md" c="dimmed" lh={1.7} style={{ maxWidth: 500 }}>
                Reading about the problem is the first step. Getting expert eyes on your specific case is the one that actually moves the needle.
              </Text>
              <Link href="/scholarcrafted/consultation?interest=other&metBefore=no" style={{ textDecoration: 'none' }}>
                <Button size="lg" variant="filled" bg={active.primary} radius={0}>
                  FREE INTRODUCTORY CALL
                </Button>
              </Link>
            </Stack>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
