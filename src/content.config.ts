import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/pages/projects" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      tags: z.array(z.string()),
      year: z.number(),
      description: z.string(),
      image: image(),
      priority: z.number(),
      links: z
        .array(
          z.object({
            name: z.string(),
            url: z.string(),
          }),
        )
        .optional(),
    }),
});

const graphics = defineCollection({
  loader: glob({
    pattern: "index.yaml",
    base: "./src/data/graphics/lets-study",
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string().optional(),
      collections: z
        .array(
          z.object({
            images: z.array(image()),
          }),
        )
        .optional(),
      images: z.array(image()).optional(),
    }),
});

export const collections = { projects, graphics };
