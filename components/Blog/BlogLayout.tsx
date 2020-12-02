import { NextSeo, ArticleJsonLd } from 'next-seo';
import { FunctionComponent } from 'react';
import { Box, Text, Heading, Avatar, Flex } from '@chakra-ui/react';
import { Navbar } from '../Navbar/Navbar';
import { PostMetaData } from '../../src/lib/blog/types';
import { authors } from '../../blog/authors';

export type BlogLayoutProps = {
    meta: PostMetaData
    slug: string
}
export const BlogLayout: FunctionComponent<BlogLayoutProps> = ({
        meta: {
            author,
            datePublished,
            dateModified,
            title,
            description,
            images,
        },
        slug,
        children,
    }) => {
        console.log('authors', authors)
        console.log('author', author)
        console.log('authors[author]', authors[author])
    const { avatar } = authors[author];
    return (
        <>
            <NextSeo
                title={`${title} | Coindrop`}
                description={description}
            />
            <ArticleJsonLd
                url={`https://coindrop.to/blog/${slug}`}
                title={title}
                images={images}
                datePublished={datePublished}
                dateModified={dateModified}
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
                <Heading as="h1" size="3xl">
                    {title}
                </Heading>
                <Flex align="center">
                    <Avatar name={author} src={avatar} size="md" />
                    <Text>{author}</Text>
                </Flex>
                {children}
            </Box>
        </>
    );
};
