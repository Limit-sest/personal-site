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
    pattern: "**/index.yaml",
    base: "./src/assets/graphics",
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string().optional(),
      year: z.number().optional(),
      images: z
        .array(
          z.object({
            path: image(),
            colspan: z.number().max(3).default(1),
            rowspan: z.number().max(3).default(1),
          }),
        )
        .optional(),
    }),
});

export const collections = { projects, graphics };
