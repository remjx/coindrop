type PostFrontMatterData = {
    author: string
    title: string
    description: string
    coverImage: string // stored in public/blog-content/[slug]/
    coverImageDescr: string
    images: string[]
        // per https://developers.google.com/search/docs/data-types/article,
        // For best results, provide multiple high-resolution images
        // (minimum of 800,000 pixels when multiplying width and height)
        // with the following aspect ratios: 16x9, 4x3, and 1x1.
}
type PostFrontMatterDates = {
    datePublished: Date
    dateModified?: Date
}

export type PostFrontMatter = PostFrontMatterData & PostFrontMatterDates

export type PostType = PostFrontMatterData & {
    slug: string
    content: string
    datePublished: string
    dateModified?: string
}
