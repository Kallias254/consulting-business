import type { Block } from 'payload'

export const ScholarMethodology: Block = {
  slug: 'scholarMethodology',
  fields: [
    {
      name: 'steps',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
      minRows: 1,
      maxRows: 3,
    },
  ],
  labels: {
    plural: 'Scholar Methodologies',
    singular: 'Scholar Methodology',
  },
}
