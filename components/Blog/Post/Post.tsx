import { NextSeo, ArticleJsonLd } from 'next-seo';
import { FunctionComponent } from 'react';
import { Box, Link, Text, Heading, Avatar, Flex } from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Navbar } from '../../Navbar/Navbar';
import { PostType } from '../../../src/lib/blog/types';
import { authors } from '../../../blog/authors';
import styles from './Post.module.scss';

dayjs.extend(relativeTime);

export const Post: FunctionComponent<PostType> = ({
        author,
        datePublished,
        dateModified,
        title,
        description,
        images,
        slug,
        content,
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
                <hr />
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
                            <Flex direction="column" ml={1} align="flex-start">
                                <Text fontSize="sm">
                                    <Text>
                                        {author}
                                    </Text>
                                    <Link href={authorUrl} isExternal>
                                        {authorHandle}
                                    </Link>
                                </Text>
                            </Flex>
                    </Flex>
                </Box>
                <hr />
                <Box
                    id="body-container"
                    className={styles.all}
                    mt={4}
                >
                    <div
                        dangerouslySetInnerHTML={{ __html: content }} // eslint-disable-line react/no-danger
                    />
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
