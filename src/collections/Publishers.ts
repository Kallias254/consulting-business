import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Publishers: CollectionConfig = {
  slug: 'publishers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'website', 'primaryContact'],
  },
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'submissionPortal',
      type: 'text',
    },
    {
      name: 'primaryContact',
      type: 'text',
      admin: {
        description: 'Key contact or editor name if known',
      },
    },
    {
      name: 'globalGuidelines',
      type: 'textarea',
      admin: {
        description: 'General formatting or house style rules',
      },
    },
  ],
}
