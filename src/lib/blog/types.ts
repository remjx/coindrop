export type PostMetaData = {
    author: string
    datePublished: string
    dateModified?: string
    title: string
    description: string
    images: string[]
}

export type Post = PostMetaData & { slug: string, content: string }
