import type { ViteSSGContext } from "vite-ssg"

export type UserModule = (ctx: ViteSSGContext) => void

export enum PostStatus {
  PUBLISHED = "published",
  DRAFT = "draft",
}

export interface Author {
  name: string
  email: string
}

export interface PostSource {
  title: string
  url: string
}

export interface PostMetaData {
  title: string
  category: string
  createdAt: Date
  tags: string[]
}

export interface PostMetaDataFinal extends PostMetaData {
  status: PostStatus
  author: Author
  featureImage: string
  series: string
  updatedAt: Date
  fileName: string
  slug: string
  url: string
  description: string
  sources: PostSource[]
}
