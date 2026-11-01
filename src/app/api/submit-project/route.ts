import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey || resendApiKey.startsWith('your_resend')) {
      console.error('[submit-project] RESEND_API_KEY is not configured in environment variables')
      return NextResponse.json(
        { success: false, error: 'RESEND_API_KEY is not configured' },
        { status: 500 },
      )
    }

    const resend = new Resend(resendApiKey)
    const contentType = req.headers.get('content-type') || ''

    let salutation = ''
    let firstName = ''
    let lastName = ''
    let email = ''
    let institution = ''
    let documentType = ''
    let service = ''
    let tier = ''
    let wordCount = ''
    let deadline = ''
    let instructions = ''
    let intent = 'quote'
    let fileName = ''
    const attachments: Array<{ filename: string; content: Buffer }> = []

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      salutation = (formData.get('salutation') as string) || ''
      firstName = (formData.get('firstName') as string) || ''
      lastName = (formData.get('lastName') as string) || ''
      email = (formData.get('email') as string) || ''
      institution = (formData.get('institution') as string) || ''
      documentType = (formData.get('documentType') as string) || ''
      service = (formData.get('service') as string) || ''
      tier = (formData.get('tier') as string) || ''
      wordCount = (formData.get('wordCount') as string) || ''
      deadline = (formData.get('deadline') as string) || ''
      instructions = (formData.get('instructions') as string) || ''
      intent = (formData.get('intent') as string) || 'quote'

      const file = formData.get('file') as File | null
      if (file && file.size > 0) {
        fileName = file.name
        const bytes = await file.arrayBuffer()
        attachments.push({
          filename: file.name,
          content: Buffer.from(bytes),
        })
      }
    } else {
      const body = await req.json()
      salutation = body.salutation || ''
      firstName = body.firstName || ''
      lastName = body.lastName || ''
      email = body.email || ''
      institution = body.institution || ''
      documentType = body.documentType || ''
      service = body.service || ''
      tier = body.tier || ''
      wordCount = body.wordCount ? String(body.wordCount) : ''
      deadline = body.deadline || ''
      instructions = body.instructions || ''
      intent = body.intent || 'quote'
      fileName = body.fileName || ''
    }

    const clientName = [salutation !== '—' ? salutation : '', firstName, lastName].filter(Boolean).join(' ')
    const serviceLabel = getServiceLabel(service, tier)
    const intentLabel = intent === 'start' ? 'START IMMEDIATELY (Invoice Request)' : 'QUOTE REQUEST'

    // ── 1. Notify Micah & Joseph with Attached Manuscript ──────────────────────
    const adminNotification = await resend.emails.send({
      from: 'ScholarCrafted Intake <intake@scholarcrafted.com>',
      to: ['joseph@scholarcrafted.com', 'contact@scholarcrafted.com'],
      replyTo: email,
      subject: `[${intentLabel}] ${clientName} — ${serviceLabel}`,
      attachments: attachments.length > 0 ? attachments : undefined,
      html: `
        <div style="font-family: Georgia, serif; max-width: 640px; margin: 0 auto; color: #1a1a1a;">
          <div style="border-left: 4px solid #E65C38; padding-left: 24px; margin-bottom: 32px;">
            <p style="font-size: 12px; letter-spacing: 0.1em; color: #E65C38; text-transform: uppercase; margin: 0 0 8px;">
              New Project Brief — ${intentLabel}
            </p>
            <h1 style="font-size: 28px; margin: 0; line-height: 1.2;">${clientName}</h1>
            <p style="font-size: 16px; color: #666; margin: 4px 0 0;">${email}${institution ? ` · ${institution}` : ''}</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; font-size: 13px; color: #999; width: 160px; text-transform: uppercase; letter-spacing: 0.06em;">Service</td>
              <td style="padding: 12px 0; font-size: 15px; font-weight: 600;">${serviceLabel}</td>
            </tr>
            ${documentType ? `
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; font-size: 13px; color: #999; text-transform: uppercase; letter-spacing: 0.06em;">Document Type</td>
              <td style="padding: 12px 0; font-size: 15px;">${documentType}</td>
            </tr>` : ''}
            ${wordCount ? `
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; font-size: 13px; color: #999; text-transform: uppercase; letter-spacing: 0.06em;">Word Count</td>
              <td style="padding: 12px 0; font-size: 15px;">${Number(wordCount).toLocaleString()} words</td>
            </tr>` : ''}
            ${deadline ? `
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; font-size: 13px; color: #999; text-transform: uppercase; letter-spacing: 0.06em;">Deadline</td>
              <td style="padding: 12px 0; font-size: 15px;">${deadline}</td>
            </tr>` : ''}
            ${fileName ? `
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; font-size: 13px; color: #999; text-transform: uppercase; letter-spacing: 0.06em;">Attached File</td>
              <td style="padding: 12px 0; font-size: 15px; font-weight: 600; color: #E65C38;">📎 ${fileName} (Attached to this email)</td>
            </tr>` : ''}
          </table>

          ${instructions ? `
          <div style="background: #f9f8f6; border: 1px solid #eee; padding: 20px; margin-bottom: 32px;">
            <p style="font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 0.06em; margin: 0 0 8px;">Special Instructions</p>
            <p style="font-size: 15px; line-height: 1.7; margin: 0; color: #333;">${instructions}</p>
          </div>` : ''}

          <div style="background: ${intent === 'start' ? '#E65C38' : '#1a1a1a'}; color: #fff; padding: 20px 24px;">
            <p style="margin: 0; font-size: 14px; line-height: 1.6;">
              ${intent === 'start'
                ? '⚡ <strong>Client wants to start immediately.</strong> Send 50% deposit invoice within 24 hours. Reply to this email goes directly to the client.'
                : '📋 <strong>Quote requested.</strong> Send scoped quote within 24 hours. Reply to this email goes directly to the client.'}
            </p>
          </div>
        </div>
      `,
    })

    if (adminNotification.error) {
      console.error('[submit-project] Resend admin notification error:', adminNotification.error)
    }

    // ── 2. Confirm to client ───────────────────────────────────────────────────
    if (email) {
      const clientConfirmation = await resend.emails.send({
        from: 'Dr. Micah Dobson · ScholarCrafted <contact@scholarcrafted.com>',
        to: email,
        subject: `Brief received — ${intent === 'start' ? 'invoice incoming' : 'quote incoming'} · ScholarCrafted`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 580px; margin: 0 auto; color: #1a1a1a;">
            <div style="border-top: 3px solid #E65C38; padding-top: 32px; margin-bottom: 32px;">
              <p style="font-size: 13px; color: #E65C38; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 16px;">ScholarCrafted</p>
              <h1 style="font-size: 26px; line-height: 1.2; margin: 0 0 16px;">Brief received, ${firstName}.</h1>
              <p style="font-size: 16px; line-height: 1.7; color: #444; margin: 0;">
                ${intent === 'start'
                  ? `I've reviewed your project brief for <strong>${serviceLabel}</strong> and will send your 50% deposit invoice within the next 24 hours. Work commences upon receipt of payment.`
                  : `I've received your project brief for <strong>${serviceLabel}</strong> and will send a scoped quote within the next 24 hours.`}
              </p>
            </div>

            <div style="border-left: 2px solid #eee; padding-left: 20px; margin-bottom: 32px;">
              <p style="font-size: 13px; color: #999; margin: 0 0 4px;">What you submitted</p>
              <p style="font-size: 15px; margin: 0; color: #333;">
                ${serviceLabel}${wordCount ? ` · ${Number(wordCount).toLocaleString()} words` : ''}${deadline ? ` · Deadline ${deadline}` : ''}
              </p>
            </div>

            <p style="font-size: 15px; line-height: 1.7; color: #444; margin: 0 0 24px;">
              If you have any additional files or context, simply reply to this email. All manuscripts are handled under strict NDA and reviewed personally.
            </p>

            <p style="font-size: 15px; line-height: 1.7; color: #444; margin: 0 0 32px;">
              — Dr. Micah Dobson<br>
              <span style="color: #999; font-size: 13px;">ScholarCrafted · Faculty-Led Manuscript Production</span>
            </p>

            <div style="border-top: 1px solid #eee; padding-top: 20px;">
              <p style="font-size: 12px; color: #bbb; margin: 0;">
                Strictly Confidential · No AI applied to your manuscript · scholarcrafted.com
              </p>
            </div>
          </div>
        `,
      })

      if (clientConfirmation.error) {
        console.error('[submit-project] Resend client confirmation error:', clientConfirmation.error)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[submit-project] error:', error)
    return NextResponse.json({ success: false, error: 'Failed to send' }, { status: 500 })
  }
}

function getServiceLabel(service: string, tier: string): string {
  const serviceMap: Record<string, string> = {
    'journal-article': 'Journal Article or Dissertation Chapter',
    'book-monograph': 'Book Monograph or University Press Proposal',
    'full-dissertation': "Full Dissertation or Master's Thesis (Pre-Defense)",
    'rnr-rebuttal': 'Revise & Resubmit (R&R) Response & Overhaul',
    'bespoke-latex': 'Bespoke Project, Multi-Author Volume, or LaTeX / Typst',
    diagnostic: 'Express Structural & Rigor Diagnostic',
    'track-a': 'Journal Pipeline: Thesis-to-Journal & Paper Preparation',
    'track-b': 'Book Pipeline: Monograph & University Press Architecture',
    scope: 'Custom Milestone Project Scope',
    custom: 'Custom Milestone Project Scope',
    editing: 'Editing & Compliance',
    'ai-audit': 'AI Manuscript Audit',
    publication: 'Publication Support',
    journal: 'Journal Publication Support',
    book: 'Book Manuscript Publishing',
  }
  const tierMap: Record<string, string> = {
    'journal-article': 'Journal Article / Chapter',
    'book-monograph': 'Book Monograph / Proposal',
    'full-dissertation': 'Dissertation / Thesis',
    'rnr-rebuttal': 'R&R Response',
    'bespoke-latex': 'Bespoke / Multi-Author',
    diagnostic: 'Express Diagnostic',
    'track-a': 'Journal Pipeline',
    'track-b': 'Monograph Pipeline',
    advanced: 'Advanced Editing',
    premium: 'Premium Editing',
    scientific: 'Scientific Editing Pro',
    single: 'Single Audit',
    bundle: 'Bundle Audit',
    essentials: 'Essentials Pack',
    pro: 'Pro Pack',
    full: 'Full Publication Pack',
  }
  const svc = serviceMap[service] || service
  const t = tierMap[tier] || tier
  return t ? `${svc} — ${t}` : svc
}
