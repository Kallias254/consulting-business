import type { RequiredDataFromCollectionSlug } from 'payload'

// Used for pre-seeded content so that the homepage is not empty
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  hero: {
    type: 'scholarHero',
    richText: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'A white-label academic agency for the elite scholar. We handle the hidden curriculum—typesetting, stats, and strategy—so you can focus on the discovery.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
  },
  meta: {
    description: 'Faculty-led research services for publication success.',
    title: 'SCIENTIST / aaS - Publication Success',
  },
  title: 'Home',
  layout: [
    {
      blockType: 'scholarCards',
      cards: [
        {
          title: 'THE FINISHER',
          subtitle: 'EDITING & FORMATTING',
          description: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: '• Technical polish & syntax' }],
                },
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: '• Citation cleanup (BibTeX/Zotero)' }],
                },
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: '• Typst/LaTeX Typesetting' }],
                },
              ],
            },
          },
        },
        {
          title: 'THE SCHOLAR',
          subtitle: 'CONSULTING & STATS',
          highlight: true,
          description: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: '• Methodology refinement' }],
                },
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: '• Statistical analysis (R/Python)' }],
                },
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: '• Peer review simulation' }],
                },
              ],
            },
          },
        },
        {
          title: 'THE PRO',
          subtitle: 'FULL-CYCLE SUPPORT',
          description: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: '• End-to-end project management' }],
                },
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: '• Journal liaison & correspondence' }],
                },
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: '• Grant writing assistance' }],
                },
              ],
            },
          },
        },
      ],
    },
    {
      blockType: 'scholarMethodology',
      steps: [
        {
          title: 'Intake & Strategy',
          description: 'Direct consultation with a Principal. We define the target journal, the technical scope, and the timeline.',
        },
        {
          title: 'Specialized Execution',
          description: 'Assigned to subject-matter experts. Quants handle data, editors handle prose, engineers handle LaTeX.',
        },
        {
          title: 'Faculty Review',
          description: 'The "White-Glove" pass. An active Professor reviews the manuscript against peer-review standards.',
        },
      ],
    },
  ],
}
