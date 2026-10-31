'use client'

import React from 'react'
import {
  Container,
  Title,
  Text,
  Box,
  Stack,
  rem,
  useMantineTheme,
  Accordion,
  Button,
  Group,
  SimpleGrid,
} from '@mantine/core'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'
import { READING_WIDTH, INNER_WIDTH, SECTION_SPACING } from '@/layout'
import Link from 'next/link'
import { IconArrowRight, IconShieldCheck, IconFileCheck } from '@tabler/icons-react'

// ─── FAQ Data ──────────────────────────────────────────────────────────────

const editingFaqs = [
  {
    q: 'How does your faculty-led scoping and editorial process work?',
    a: `We reject opaque, commodity per-word checkout carts. Academic scholarship requires tailored intellectual engagement. When you submit your manuscript through our Project Scoping portal, Dr. Micah Dobson and our faculty review your draft, target journal or university press guidelines, and committee feedback. Within 24 hours, you receive a transparent milestone proposal outlining the exact editorial roadmap, timeline, and fixed fee. Engagements operate on clear 50/50 milestone terms (50% retainer deposit, 50% upon completed milestone delivery).`,
  },
  {
    q: 'What are your primary publication pathways?',
    a: `Our Journal Pipeline converts dissertation research and draft manuscripts into high-impact, standalone peer-reviewed articles formatted for specific Q1/Q2 journal guidelines. Our Monograph & University Press Pipeline assists scholars turning doctoral dissertations or book projects into acquisition-ready manuscripts and proposals for top university presses (Oxford, Cambridge, Routledge, Harvard, etc.). For custom needs—such as R&R response matrices, citation audits, or pre-defense polish—we provide bespoke scoping.`,
  },
  {
    q: 'My committee returned my draft with revision comments. How do you help?',
    a: `Committee revision comments and Revise & Resubmit (R&R) letters require structural and developmental intervention, not superficial proofreading. We analyze committee feedback or reviewer matrices section by section, restructure your argument flow, resolve methodological framing, and deliver tracked-changes revisions alongside a point-by-point response memo.`,
  },
  {
    q: 'How is your editing different from running my manuscript through Grammarly or ChatGPT?',
    a: `AI grammar tools catch surface-level errors. They do not understand what your committee expects, how your discipline constructs an argument, or whether your methodology chapter is logically sequenced. They do not know the difference between APA 7th and Chicago 17th footnote style, and they cannot flag a passive construction that is actually appropriate for your field. Our editor reads your entire manuscript with knowledge of your discipline and institutional submission context. Every edit is in tracked changes — you see exactly what was changed and why, and you accept or reject each one.`,
  },
  {
    q: 'Will my committee or graduate school know I used an editing service?',
    a: `Professional manuscript editing is universally permitted and widely encouraged at the graduate level. Graduate schools distinguish sharply between editing (permitted) and ghostwriting (not permitted). Our services fall squarely in the editing category: we refine the language and structure of work you have written. We do not generate content, rewrite arguments, or fabricate original text. All delivery includes a tracked-changes file and a clean copy — you remain the sole intellectual author.`,
  },
  {
    q: 'What file formats do you work with?',
    a: `We work primarily in Microsoft Word (.docx) with tracked changes enabled. This is the universal format accepted by ProQuest, institutional repositories, and most journal submission systems. If your manuscript is in LaTeX, Google Docs, or PDF, contact us before submitting — we can accommodate in most cases with a brief conversion step.`,
  },
  {
    q: 'How long does editing take?',
    a: `Turnaround depends on manuscript length and the agreed project milestones. Standard articles and journal conversions typically require 5–8 business days, while comprehensive monograph and book proposals range from 10–18 business days. We treat conference deadlines, defense dates, and press submission cutoffs as firm commitments. Rush turnarounds are evaluated on a case-by-case basis during scoping.`,
  },
]

const citationFaqs = [
  {
    q: 'My Zotero export is a disaster — wrong punctuation, missing DOIs, inconsistent style. Can you fix it?',
    a: `Yes, this is one of the most common things we fix. Zotero and EndNote exports frequently produce style-inconsistent reference lists — incorrect punctuation, missing issue numbers, malformed DOIs, and mixed styles within a single list. We rebuild the reference list from scratch against your required style manual, verify every DOI, repair dead links, and return a clean, submission-ready list.`,
  },
  {
    q: 'How does the citation audit work — what exactly do you check?',
    a: `We cross-check every inline citation in the body of your manuscript against its corresponding reference list entry. We flag: citations present in the text but absent from the reference list; references in the list with no corresponding in-text citation; DOI errors and broken URLs; style-manual punctuation violations; missing author names, volume numbers, or page ranges; and any inconsistencies in how the same source is cited across the document. You receive a detailed audit report alongside the corrected files.`,
  },
  {
    q: 'My journal requires a different citation style than my dissertation used. Can you convert the whole list?',
    a: `Yes. Full style conversion — for example, from APA 7th to Chicago 17th author-date, or from MLA to Vancouver — is a standard part of our citation audit service. Provide us with the target journal's style guide or a link to their author instructions, and we convert the entire reference list and inline citations to match.`,
  },
]

const manuscriptFaqs = [
  {
    q: 'I want to turn my dissertation into a journal article. Is that a service you offer?',
    a: `Yes — Track 1 of our Book & Journal Preparation service is specifically designed for thesis-to-article structural conversion. Dissertations and journal articles are structurally different documents. A dissertation chapter does not become a journal article by cutting words — the framing, literature positioning, methods summary, and results presentation must be rebuilt to journal conventions. We provide a section-by-section structural memo outlining the conversion strategy, then execute the restructuring with you.`,
  },
  {
    q: 'I\'m writing a book proposal for Routledge. What does your proposal packaging service include?',
    a: `Track 2 covers book proposal packaging to the specific template and house style of your target press (Routledge, Oxford, SAGE, Cambridge, Palgrave, and others). This includes: prospectus narrative (argument statement, market analysis, chapter summaries, competing works), sample chapter preparation, author bio formatting, and table of contents alignment to press specifications. We do not write your argument for you — we structure and format the proposal you have developed to match what acquisitions editors at these presses look for.`,
  },
  {
    q: 'I\'m submitting to a specific journal. Can you format to their exact template?',
    a: `Yes. Track 3 covers exact target journal submission formatting — word count compliance, section structure (Abstract, Introduction, Methods, Results, Discussion, References), figure and table formatting, author information pages, and submission checklist verification. Provide us with the journal name or a link to their author guidelines, and we match the manuscript precisely.`,
  },
]

const integrityFaqs = [
  {
    q: 'Is using an editing service allowed by my university or press?',
    a: `Yes. Professional editing is explicitly permitted and routinely recommended by graduate schools, publishers, and journals worldwide. The APA Ethics Code, MLA Handbook, and Chicago Manual all recognize the distinction between editing (permissible) and ghostwriting (not permissible). Universities encourage students to seek professional editorial review as part of the preparation process. Publishers expect submitted manuscripts to have been professionally edited. We provide editing — your intellectual content, arguments, findings, and voice remain entirely yours.`,
  },
  {
    q: 'What is your confidentiality policy?',
    a: `Your manuscript and research data are treated as strictly confidential. We sign a Non-Disclosure & Confidentiality Agreement before you submit any document. Your research, institutional affiliation, and personal information are never shared, sold, published, or disclosed to any third party under any circumstances. Files are stored securely and deleted from our systems upon project completion.`,
  },
  {
    q: 'Do you write any content for me? What counts as ghostwriting?',
    a: `We do not write original content, generate arguments, fabricate literature review text, or produce any section of your manuscript. Ghostwriting is the composition of original intellectual content attributed to another person — we do not do this under any circumstances. What we do: refine language, correct style-manual compliance, restructure existing sections for logical flow, flag unclear passages with editorial queries (which you resolve), and format the document to institutional or journal specifications. Your ideas, arguments, and findings are yours. We make them clearer and more publishable.`,
  },
]

const logisticsFaqs = [
  {
    q: 'How do I get a price quote?',
    a: `Every engagement is scoped with fixed milestone pricing rather than commodity word counting. Typical peer-reviewed journal conversion milestones range between $600 and $1,800. Complete university press monograph proposals and structural editing range between $1,500 and $3,500+. We guarantee a transparent, itemized proposal within 24 hours of receiving your manuscript, structured under 50/50 terms (50% retainer deposit, 50% upon milestone completion).`,
  },
  {
    q: 'My defense is in two weeks. Is there a rush option?',
    a: `Yes. Accelerated timelines are evaluated during initial scoping. If you have an urgent submission cutoff or defense date, note it on your intake form. We will confirm within 24 hours whether our faculty schedule can support your deadline without sacrificing editorial rigor.`,
  },
  {
    q: 'What happens after I submit my manuscript?',
    a: `Within 24 hours of submission, Dr. Micah Dobson or an assigned doctoral specialist reviews your draft, notes, and target publication guidelines. We issue a formal Project Scope with itemized deliverables, timeline, and fixed fee. You also have the option to schedule a complimentary 15-minute scoping call to review the plan before committing. Once approved and deposit is received, editorial execution begins immediately.`,
  },
  {
    q: 'Do you offer follow-up support if reviewers or committees request further adjustments?',
    a: `Yes. Academic publishing is an iterative dialogue. All milestone packages include follow-up review for edits directly addressing reviewer or committee feedback within the agreed project scope. For formal Revise & Resubmit (R&R) cycles, we provide dedicated response matrix structuring and diplomacy audits.`,
  },
]

// ─── Reusable Accordion Block ────────────────────────────────────────────────

function FaqBlock({
  title,
  faqs,
  prefix,
  active,
}: {
  title: string
  faqs: { q: string; a: string }[]
  prefix: string
  active: Record<string, string>
}) {
  return (
    <Box>
      <Title
        order={2}
        mb="xl"
        style={{
          fontSize: rem(26),
          color: active.primary,
          fontFamily: 'var(--font-serif)',
          borderBottom: `1px solid ${active.primary}12`,
          paddingBottom: rem(16),
        }}
      >
        {title}
      </Title>
      <Accordion variant="separated" radius={0}>
        {faqs.map((faq, i) => (
          <Accordion.Item
            key={i}
            value={`${prefix}-${i}`}
            style={{
              backgroundColor: active.background,
              borderColor: `${active.primary}12`,
              marginBottom: rem(10),
            }}
          >
            <Accordion.Control
              style={{
                fontWeight: 600,
                color: active.primary,
                padding: `${rem(18)} ${rem(20)}`,
                fontSize: rem(15),
                lineHeight: 1.5,
              }}
            >
              {faq.q}
            </Accordion.Control>
            <Accordion.Panel style={{ padding: `0 ${rem(20)} ${rem(20)}` }}>
              <Text
                size="sm"
                lh={1.85}
                c="dimmed"
                style={{ whiteSpace: 'pre-line' }}
              >
                {faq.a}
              </Text>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Box>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function FAQPage() {
  const theme = useMantineTheme()
  const active = theme.other

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <Box component="section" pt={rem(140)} pb={rem(80)} bg={active.background}>
        <Container size={READING_WIDTH}>
          <Box style={{ maxWidth: 760 }}>
            <Text
              size="xs"
              fw={700}
              style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}
              c={active.accent}
            >
              Common Questions
            </Text>
            <Title
              order={1}
              mt="md"
              style={{
                fontSize: rem(54),
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: active.primary,
                fontFamily: 'var(--font-serif)',
              }}
            >
              Questions scholars actually ask.
            </Title>
            <Text size="lg" mt="xl" c="dimmed" lh={1.7} style={{ fontSize: rem(19) }}>
              Straight answers on editorial tracks, milestone scoping, confidentiality, turnaround, and our faculty-led process.
            </Text>
          </Box>
        </Container>
      </Box>

      {/* ── Accordion Sections ───────────────────────────────────────── */}
      <Box
        component="section"
        className="academic-watermark"
        py={SECTION_SPACING}
        bg={active.surface}
        style={{ borderTop: `1px solid ${active.primary}12` }}
      >
        <Container size={READING_WIDTH}>
          <Stack gap={rem(72)}>

            <FaqBlock
              title="Manuscript Editing"
              faqs={editingFaqs}
              prefix="editing"
              active={active}
            />

            <FaqBlock
              title="Citation & Reference Audits"
              faqs={citationFaqs}
              prefix="citations"
              active={active}
            />

            <FaqBlock
              title="Book & Journal Preparation"
              faqs={manuscriptFaqs}
              prefix="manuscript"
              active={active}
            />

            <FaqBlock
              title="Academic Integrity & Confidentiality"
              faqs={integrityFaqs}
              prefix="integrity"
              active={active}
            />

            <FaqBlock
              title="Pricing, Timelines & Process"
              faqs={logisticsFaqs}
              prefix="logistics"
              active={active}
            />

          </Stack>
        </Container>
      </Box>

      {/* ── Trust Bar ─────────────────────────────────────────────────── */}
      <Box
        py={rem(60)}
        bg={active.background}
        style={{ borderTop: `1px solid ${active.primary}12` }}
      >
        <Container size={INNER_WIDTH}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            <Group align="flex-start" gap="md">
              <IconShieldCheck size={28} color={active.accent} stroke={1.5} />
              <Stack gap={rem(4)}>
                <Text fw={700} size="sm">
                  Zero Ghostwriting. Zero Exceptions.
                </Text>
                <Text size="xs" c="dimmed" lh={1.6}>
                  We refine, format, and structure manuscript you have written. We do not generate content, write
                  arguments, or fabricate text under any circumstances.
                </Text>
              </Stack>
            </Group>
            <Group align="flex-start" gap="md">
              <IconFileCheck size={28} color={active.accent} stroke={1.5} />
              <Stack gap={rem(4)}>
                <Text fw={700} size="sm">
                  Tracked Changes — Every Single Edit
                </Text>
                <Text size="xs" c="dimmed" lh={1.6}>
                  Every edit is delivered in tracked-changes mode. You see exactly what changed and why. You approve
                  or reject each change individually.
                </Text>
              </Stack>
            </Group>
          </SimpleGrid>
        </Container>
      </Box>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <Box
        py={rem(80)}
        bg={active.surface}
        style={{ borderTop: `1px solid ${active.primary}12` }}
      >
        <Container size={READING_WIDTH}>
          <Stack align="center" gap="lg" style={{ textAlign: 'center' }}>
            <Title
              order={2}
              style={{
                fontSize: rem(36),
                color: active.primary,
                fontFamily: 'var(--font-serif)',
                lineHeight: 1.2,
              }}
            >
              Still not sure which service you need?
            </Title>
            <Text size="md" c="dimmed" lh={1.7} style={{ maxWidth: 520 }}>
              Submit your manuscript or proposal draft for a custom project scope. We review it and respond within 24 hours with an itemized editorial roadmap and guaranteed milestone terms.
            </Text>
            <Group gap="md" justify="center" wrap="wrap">
              <Link href="/order" style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  radius={0}
                  w={{ base: '100%', sm: 'auto' }}
                  style={{ backgroundColor: active.primary, color: active.background }}
                  rightSection={<IconArrowRight size={16} />}
                >
                  Request Custom Project Scope
                </Button>
              </Link>
              <Link href="/services" style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  variant="outline"
                  radius={0}
                  w={{ base: '100%', sm: 'auto' }}
                  color={active.primary}
                  style={{ borderColor: active.primary }}
                >
                  Browse All Services
                </Button>
              </Link>
            </Group>
          </Stack>
        </Container>
      </Box>

      <Footer bg={active.surface} />
    </Box>
  )
}
