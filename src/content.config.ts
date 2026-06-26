import { defineCollection, reference } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'


const categories = defineCollection({
  loader: glob({base: './src/content/categories', pattern: '*.yml'}),
  schema: z.object({
    title: z.string()
  })
})

const products = defineCollection({
  loader: glob({base: './src/content/products', pattern: '**/*.yml'}),
  schema: z.object({
    category: reference('categories'),
    title: z.string(),
    price: z.number(),
    extras: z.array(reference('extras')).default([])
  })
})

const extras = defineCollection({
  loader: glob({base: './src/content/extras', pattern: '*.yml'}),
  schema: z.object({
    title: z.string(),
    items: z.array(z.object({
      title: z.string(),
      price: z.number()
    }))
  })
})

export const collections = { categories, products, extras }
