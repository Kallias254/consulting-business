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
import { EditorialCard, EditorialReveal, ReadingProgressBar } from '../_components/EditorialPrimitives'
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
    a: `Every engagement is scoped with fixed milestone pricing rather than commodity word counting. We evaluate your manuscript length, disciplinary conventions, and publisher standards to deliver a transparent, itemized proposal within 24 hours. Engagements are structured under aligned 50/50 terms (50% deposit upon project initiation, 50% upon final delivery of publication-ready files).`,
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
      <ReadingProgressBar />
      <Navbar />

      {/* ── Hero (matches About page structure & typography) ── */}
      <Box component="section" pt={{ base: rem(100), md: rem(132) }} pb={{ base: rem(56), md: rem(80) }} bg={active.background}>
        <Container size={INNER_WIDTH} px={{ base: 'md', sm: 'xl' }}>
          <Box style={{ maxWidth: 820 }}>
            <Text
              size="xs"
              fw={700}
              style={{ letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}
              c={active.accent}
            >
              FREQUENTLY ASKED QUESTIONS
            </Text>
            <Title
              order={1}
              mt="sm"
              style={{
                fontSize: 'clamp(2.2rem, 4.8vw, 3.6rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: active.primary,
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
              }}
            >
              Questions scholars actually ask.
            </Title>
            <Text size="lg" mt="xl" c="dimmed" lh={1.75} style={{ maxWidth: '62ch' }}>
              Straight answers on journal &amp; book production, multi-contributor handbooks, institutional grant invoicing, confidentiality, and our faculty-directed process.
            </Text>
          </Box>
        </Container>
      </Box>

      {/* ── Accordion Sections ───────────────────────────────────────── */}
      <Box
        component="section"
        py={SECTION_SPACING}
        bg={active.surface}
        style={{ borderTop: `1px solid ${active.primary}10` }}
      >
        <Container size={INNER_WIDTH} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap={rem(64)} style={{ maxWidth: 880 }}>

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

      {/* ── Trust Bar (matches About EditorialCard style) ─────────────── */}
      <Box
        py={SECTION_SPACING}
        bg={active.background}
        style={{ borderTop: `1px solid ${active.primary}10` }}
      >
        <Container size={INNER_WIDTH} px={{ base: 'md', sm: 'xl' }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(24)}>
            <EditorialReveal delay={0}>
              <EditorialCard p={{ base: rem(28), md: rem(32) }} bg={active.surface} style={{ height: '100%' }}>
                <Group align="flex-start" gap="md" wrap="nowrap">
                  <IconShieldCheck size={24} color={active.accent} stroke={1.6} style={{ flexShrink: 0, marginTop: rem(2) }} />
                  <Stack gap={rem(6)}>
                    <Text fw={700} size="sm" c={active.primary}>
                      Zero Ghostwriting. Full COPE Compliance.
                    </Text>
                    <Text size="sm" c="dimmed" lh={1.7}>
                      We architect, structure, and prepare manuscripts and volumes you have authored. Your findings, voice, and intellectual ownership remain 100% yours.
                    </Text>
                  </Stack>
                </Group>
              </EditorialCard>
            </EditorialReveal>
            <EditorialReveal delay={70}>
              <EditorialCard p={{ base: rem(28), md: rem(32) }} bg={active.surface} style={{ height: '100%' }}>
                <Group align="flex-start" gap="md" wrap="nowrap">
                  <IconFileCheck size={24} color={active.accent} stroke={1.6} style={{ flexShrink: 0, marginTop: rem(2) }} />
                  <Stack gap={rem(6)}>
                    <Text fw={700} size="sm" c={active.primary}>
                      365-Day Reviewer Coverage &amp; Institutional Invoicing
                    </Text>
                    <Text size="sm" c="dimmed" lh={1.7}>
                      Every full project includes 365 days of secondary revision support for committee or peer-review memos, plus itemized invoices for startup and grant funds.
                    </Text>
                  </Stack>
                </Group>
              </EditorialCard>
            </EditorialReveal>
          </SimpleGrid>
        </Container>
      </Box>

      {/* ── CTA (matches About page CTA style) ────────────────────────── */}
      <Box
        py={SECTION_SPACING}
        bg={active.surface}
        style={{ borderTop: `1px solid ${active.primary}10` }}
      >
        <Container size={INNER_WIDTH} px={{ base: 'md', sm: 'xl' }}>
          <Stack align="center" gap="lg" style={{ textAlign: 'center' }}>
            <Title
              order={2}
              style={{
                fontSize: 'clamp(1.75rem, 3.2vw, 2.3rem)',
                color: active.primary,
                fontFamily: 'var(--font-serif)',
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              Ready to map out your project scope?
            </Title>
            <Text size="md" c="dimmed" lh={1.7} style={{ maxWidth: 560 }}>
              Share your manuscript, book proposal, or handbook details. We return an itemized milestone roadmap and schedule within 24 hours.
            </Text>
            <Group gap="md" justify="center" wrap="wrap">
              <Link href="/order" style={{ textDecoration: 'none' }}>
                <Button
                  size="md"
                  radius={0}
                  style={{ backgroundColor: active.accent, color: '#ffffff', fontWeight: 700, height: rem(48), paddingLeft: rem(28), paddingRight: rem(28) }}
                  rightSection={<IconArrowRight size={16} />}
                >
                  Get a Project Scope
                </Button>
              </Link>
              <Link href="/services" style={{ textDecoration: 'none' }}>
                <Button
                  size="md"
                  variant="outline"
                  radius={0}
                  color={active.primary}
                  style={{ borderColor: `${active.primary}35`, color: active.primary, fontWeight: 600, height: rem(48) }}
                >
                  Explore Services
                </Button>
              </Link>
            </Group>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
