import { CollectionConfig } from 'payload'
import { VideoBlock } from './blocks/VideoBlock'
import { QuizBlock } from './blocks/QuizBlock'

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Course Title',
      required: true,
    },
    {
      name: 'description',
      label: 'Course Description',
      type: 'richText',
      required: true,
    },
    {
      name: 'thumbnail',
      label: 'Course Thumbnail',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'curriculum',
      label: 'Curriculum',
      type: 'blocks',
      blocks: [VideoBlock, QuizBlock],
    },
  ],
}
