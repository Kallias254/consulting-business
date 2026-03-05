import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'leadResearcher', 'status'],
  },
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      filterOptions: ({ user }) => {
        return {
          roles: { contains: 'client' },
        }
      },
    },
    {
      name: 'leadResearcher',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      filterOptions: ({ user }) => {
        return {
          roles: { contains: 'lead_researcher' },
        }
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'onboarding',
      options: [
        { label: 'Onboarding', value: 'onboarding' },
        { label: 'Active Sprint', value: 'active' },
        { label: 'Peer Review / Waiting', value: 'waiting' },
        { label: 'Finalizing', value: 'finalizing' },
        { label: 'Completed', value: 'completed' },
      ],
      required: true,
    },
    {
      name: 'nextMilestone',
      type: 'text',
      admin: {
        description: 'Displayed in the Friday Pulse for the client',
      },
    },
    {
      name: 'progress',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 0,
    },
    {
      name: 'vaultFolder',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        description: 'Link to the project root folder in Media',
      },
    },
    {
      name: 'units',
      type: 'array',
      labels: {
        singular: 'Manuscript Unit',
        plural: 'Manuscript Units',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'draft',
          options: [
            { label: 'Drafting', value: 'draft' },
            { label: 'Internal Review (QC)', value: 'internal_review' },
            { label: 'Scholar Review', value: 'scholar_review' },
            { label: 'Validated', value: 'validated' },
          ],
        },
        {
          name: 'currentVersion',
          type: 'relationship',
          relationTo: 'media',
        },
        {
          name: 'versionHistory',
          type: 'array',
          fields: [
            {
              name: 'versionNumber',
              type: 'text',
              required: true,
            },
            {
              name: 'file',
              type: 'relationship',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'timestamp',
              type: 'date',
              required: true,
              defaultValue: () => new Date(),
            },
          ],
        },
        {
          name: 'progress',
          type: 'number',
          min: 0,
          max: 100,
          defaultValue: 0,
        },
      ],
    },
  ],
  timestamps: true,
}
