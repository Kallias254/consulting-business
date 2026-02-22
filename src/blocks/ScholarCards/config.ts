import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ScholarCards: Block = {
  slug: 'scholarCards',
  fields: [
    {
      name: 'cards',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
        },
        {
          name: 'description',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
        },
        {
          name: 'highlight',
          type: 'checkbox',
          label: 'Highlight this card',
        },
        {
          name: 'buttonLabel',
          type: 'text',
          defaultValue: 'Select Path',
        },
      ],
      minRows: 1,
      maxRows: 3,
    },
  ],
  labels: {
    plural: 'Scholar Cards',
    singular: 'Scholar Card',
  },
}
