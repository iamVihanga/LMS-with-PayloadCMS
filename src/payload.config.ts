import { s3Storage } from '@payloadcms/storage-s3'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import brevoAdapter from './utils/brevoAdapter'
import { Students } from './collections/Students'
import { Courses } from './collections/courses/Courses'
import { Participation } from './collections/courses/Participation'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  // Database Collections
  collections: [Users, Media, Students, Courses, Participation],

  // Adapters
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  email: brevoAdapter(),

  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env?.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env?.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env?.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env?.S3_REGION || '',
      },
    }),
  ],
})
