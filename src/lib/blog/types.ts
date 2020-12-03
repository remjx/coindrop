export type PostFrontMatter = {
    author: string
    datePublished: string
    dateModified: string
    title: string
    description: string
    coverImage: string // stored in public/blog-images/[slug]/
    coverImageDescr: string
    images: string[]
        // per https://developers.google.com/search/docs/data-types/article,
        // For best results, provide multiple high-resolution images
        // (minimum of 800,000 pixels when multiplying width and height)
        // with the following aspect ratios: 16x9, 4x3, and 1x1.
}

export type PostType = PostFrontMatter & { slug: string, content: string }
