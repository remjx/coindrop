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
    datePublished: string
    dateModified?: string
}

export type PostFrontMatter = PostFrontMatterData & PostFrontMatterDates

export type PostType = PostFrontMatterData & PostFrontMatterDates & {
    slug: string
}

export type PostTypePreHydrate = PostType & {
    source: string
}

export type PostTypePostHydrate = Omit<Omit<PostType & { content: any }, "coverImage">, "coverImageDescr">
