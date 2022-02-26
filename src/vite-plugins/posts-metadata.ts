import path from "path"
import fs from "fs"
import type { Plugin, ResolvedConfig } from "vite"
import ParseMD from "./parse-md"
import type {
  Author,
  PostMetaData,
  PostMetaDataFinal,
  PostSource,
  PostStatus,
} from "~/types"

interface PostMetaDataJson extends PostMetaData {
  status: string
  author?: string
  featureImage?: string
  sources?: PostSource[]
  series?: string
  updatedAt?: Date
}

const authors: Record<string, Author> = {
  johan_vergeer: {
    name: "Johan Vergeer",
    email: "johanvergeer@gmail.com",
    twitter_handle: "@johan_vergeer",
  },
}

/**
 *
 * @param author is information about the author, formatted as `[name] <[email]>`
 */
const parseAuthor = (author?: string): Author =>
  author ? authors[author] || authors.johan_vergeer : authors.johan_vergeer

const parseDescription = (content: string): string => {
  const separator = "<!--more-->"

  if (content.includes(separator)) {
    // TODO: markdown to html
    return content.split(separator)[0].trim()
  }
  return ""
}

const toSlug = (fileName: string): string => fileName.split(".")[0]

export function calculateReadingTime(content: string) {
  // const contentString = JSON.stringify(document.body)
  const words = content.split(" ").length
  const wordsPerMinute = 200

  return Math.ceil(words / wordsPerMinute)
}

const processPostsMetadata = (): Plugin => {
  let isProduction = false

  return {
    name: "vite-plugin-md-to-json",
    enforce: "pre",
    configResolved(config: ResolvedConfig) {
      isProduction = config.isProduction
    },
    async buildStart() {
      const markdownFilesPath = path.resolve("src/pages/blog")
      const markdownFiles = fs.readdirSync(markdownFilesPath)

      const blogIndex = markdownFiles
        .map(
          (
            fileName
          ): {
            metadataJson: PostMetaDataJson
            fileName: string
            content: string
          } => {
            const fileContents = fs.readFileSync(
              path.join(markdownFilesPath, fileName),
              "utf8"
            )

            const { metadata, content } = ParseMD(fileContents)
            const metadataJson = metadata as PostMetaDataJson

            // metadata
            return { metadataJson, fileName, content }
          }
        )
        .map((meta): PostMetaDataFinal => {
          // TODO: add validations
          const { metadataJson, fileName, content } = meta
          return {
            title: metadataJson.title,
            category: metadataJson.category,
            createdAt: metadataJson.createdAt,
            tags: metadataJson.tags,
            updatedAt: metadataJson.updatedAt || metadataJson.createdAt,
            series: metadataJson.series || "",
            status: metadataJson.status as PostStatus,
            sources: metadataJson.sources || [],
            featureImage: metadataJson.featureImage || "",
            author: parseAuthor(metadataJson.author),
            fileName: fileName,
            slug: toSlug(fileName),
            url: `/blog/${toSlug(fileName)}`,
            description: parseDescription(content),
            readingTime: calculateReadingTime(content),
          }
        })

      await fs.writeFileSync(
        "public/blogIndex.json",
        JSON.stringify(blogIndex, null, isProduction ? 0 : 2)
      )
    },
  }
}

export default processPostsMetadata
