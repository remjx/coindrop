import { NextSeo, ArticleJsonLd } from 'next-seo';
import { FunctionComponent } from 'react';
import { Box, Link, Text, Heading, Avatar, Flex } from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Navbar } from '../Navbar/Navbar';
import { PostMetaData } from '../../src/lib/blog/types';
import { authors } from '../../blog/authors';
import styles from './BlogLayout.module.scss';

dayjs.extend(relativeTime);

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
    const { avatar: authorAvatar, handle: authorHandle, url: authorUrl } = authors[author];
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
                id="page-container"
                maxW="960px"
                mx="auto"
                px={4}
                mb={6}
            >
                <Navbar isAuthOpen={null} />
                <Heading
                    as="h1"
                    size="2xl"
                    textAlign="center"
                    my={6}
                >
                    {title}
                </Heading>
                <Box
                    align="center"
                    mb={4}
                >
                    <Text
                        id="publish-date"
                        mb={4}
                    >
                        {`${dayjs(datePublished).format('dddd, MMMM D, YYYY')} (${dayjs(datePublished).fromNow()})`}
                    </Text>
                    <Flex
                        id="author"
                        align="center"
                        justify="center"
                        >
                        <Avatar name={author} src={authorAvatar} size="sm" />
                        <Text fontSize="sm">
                            <Flex direction="column" ml={1} align="flex-start">
                                <Text>
                                    {author}
                                </Text>
                                <Link href={authorUrl} isExternal>
                                    {authorHandle}
                                </Link>
                            </Flex>
                        </Text>
                    </Flex>
                </Box>
                <Box
                    id="body-container"
                    className={styles.all}
                >
                    {children}
                </Box>
                <Text
                    id="modified-date"
                    mt={4}
                >
                    {`Last updated ${dayjs(dateModified).format('dddd, MMMM D, YYYY')} (${dayjs(dateModified).fromNow()})`}
                </Text>
            </Box>
        </>
    );
};
