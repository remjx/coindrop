import { NextSeo, ArticleJsonLd } from 'next-seo';
import { FunctionComponent } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Navbar } from '../Navbar/Navbar';

export type BlogLayoutProps = {
    meta: {
        author: string
        datePublished: Date
        dateModified: Date
        title: string
        description: string
    }
}
export const BlogLayout: FunctionComponent<BlogLayoutProps> = ({
        meta: {
            author,
            datePublished,
            dateModified,
            title,
            description,
        },
        children,
    }) => (
    <>
        <NextSeo
            title={`${title} | Coindrop`}
            description={description}
        />
        <ArticleJsonLd
            url="https://example.com/article"
            title="Article headline"
            images={[
                'https://example.com/photos/1x1/photo.jpg',
                'https://example.com/photos/4x3/photo.jpg',
                'https://example.com/photos/16x9/photo.jpg',
            ]}
            datePublished={datePublished.toISOString()}
            dateModified={dateModified.toISOString()}
            authorName={author}
            publisherName="Coindrop"
            publisherLogo="https://coindrop.to/piggy-256.png"
            description={description}
        />
        <Box
            maxW="960px"
            mx="auto"
            px={4}
            mb={6}
        >
            <Navbar isAuthOpen={null} />
            <Text>
                Author:
                {author}
            </Text>
            {children}
        </Box>
    </>
);
