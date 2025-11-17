import { CollectionConfig } from 'payload'

export const Participation: CollectionConfig = {
  slug: 'participation',
  fields: [
    {
      name: 'participant',
      label: 'Participant',
      type: 'relationship',
      relationTo: 'students',
      required: true,
    },
    {
      name: 'course',
      label: 'Course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
    },
    {
      name: 'progress',
      label: 'Progress',
      type: 'number',
    },
  ],
}
