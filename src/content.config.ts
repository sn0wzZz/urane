import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'
import { adSchema, authorSchema, blogSchema, categorySchema, fieldSchema } from './schemas'

const blogs = defineCollection({
  loader: glob({ base: './src/content/blogs', pattern: '**/*.{md,mdx}'}),
  schema: blogSchema,
})
const ads = defineCollection({
  loader: glob({ base: './src/content/ads', pattern: '**/*.{md,mdx}'}),
  schema: adSchema,
})

const authors = defineCollection({
  loader: glob({ base: './src/content/authors', pattern: '**/*.{md,mdx}' }),
  schema: authorSchema,
})

const categories = defineCollection({
  loader: glob({ base: './src/content/categories', pattern: '**/*.{md,mdx}' }),
  schema: categorySchema
})
const fields = defineCollection({
  loader: glob({ base: './src/content/fields', pattern: '**/*.{md,mdx}' }),
  schema: fieldSchema
})

export const collections = { blogs, authors, categories, fields, ads }
