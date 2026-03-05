import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['client'],
      options: [
        {
          label: 'Principal (Micah)',
          value: 'principal',
        },
        {
          label: 'Admin (You)',
          value: 'admin',
        },
        {
          label: 'Lead Researcher',
          value: 'lead_researcher',
        },
        {
          label: 'Researcher',
          value: 'researcher',
        },
        {
          label: 'Client',
          value: 'client',
        },
      ],
      required: true,
      saveToJWT: true,
    },
  ],
  timestamps: true,
}
