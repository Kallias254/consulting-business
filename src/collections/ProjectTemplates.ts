import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const ProjectTemplates: CollectionConfig = {
  slug: 'project-templates',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'publisher', 'productType'],
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
      admin: {
        placeholder: 'e.g. Routledge Handbook (Standard)',
      },
    },
    {
      name: 'publisher',
      type: 'relationship',
      relationTo: 'publishers',
      required: true,
    },
    {
      name: 'productType',
      type: 'select',
      required: true,
      options: [
        { label: 'Journal Article', value: 'journal_article' },
        { label: 'Handbook', value: 'handbook' },
        { label: 'Textbook', value: 'textbook' },
        { label: 'Grant Proposal', value: 'grant_proposal' },
        { label: 'Dissertation', value: 'dissertation' },
      ],
    },
    {
      name: 'units',
      type: 'array',
      labels: {
        singular: 'Required Unit',
        plural: 'Required Units',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Narrative (Text)', value: 'narrative' },
            { label: 'Technical (Methods)', value: 'technical' },
            { label: 'Data (Figures/Tables)', value: 'data' },
            { label: 'Bibliography', value: 'bibliography' },
            { label: 'Front Matter', value: 'front_matter' },
          ],
        },
        {
          name: 'guidelines',
          type: 'textarea',
          admin: {
            description: 'Specific rules for this unit (e.g. word counts, section headers)',
          },
        },
        {
          name: 'validationChecklist',
          type: 'array',
          fields: [
            {
              name: 'item',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
