import { defineCollection } from "astro/content/config";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./content/blog" }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.date(),
        tags: z.array(z.object({
            name: z.string()
        })).optional()
    })
})

const pages = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./content/pages" }),
    schema: z.object({
        title: z.string(),
        description: z.string()
    })
})

export const collections = { blog, pages }