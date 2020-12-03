export type PostFrontMatter = {
    author: string
    datePublished: string
    dateModified: string
    title: string
    description: string
    images: string[]
}

export type PostType = PostFrontMatter & { slug: string, content: string }
