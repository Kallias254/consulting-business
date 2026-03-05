import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Tasks: CollectionConfig = {
  slug: 'tasks',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'project', 'assignedTo', 'status', 'due'],
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
      name: 'project',
      type: 'relationship',
      relationTo: 'projects',
      required: true,
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      filterOptions: ({ user }) => {
        return {
          roles: { in: ['researcher', 'lead_researcher'] },
        }
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'todo',
      options: [
        { label: 'To Do', value: 'todo' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Internal Review (QC)', value: 'review' },
        { label: 'Done', value: 'done' },
      ],
      required: true,
    },
    {
      name: 'priority',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
        { label: 'Urgent', value: 'urgent' },
      ],
      required: true,
    },
    {
      name: 'due',
      type: 'date',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'outputLink',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        description: 'Link to the resulting file/artifact in Media',
      },
    },
  ],
  timestamps: true,
}
