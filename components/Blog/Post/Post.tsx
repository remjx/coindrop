import { NextSeo, ArticleJsonLd } from 'next-seo';
import { FunctionComponent } from 'react';
import { Box, Container, Link, Text, Heading, Avatar, Flex } from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Navbar } from '../../Navbar/Navbar';
import { PostTypePostHydrate } from '../../../src/lib/blog/types';
import { authors } from '../../../blog/authors';
import styles from './Post.module.scss';
import Footer from '../../Footer/Footer';

dayjs.extend(relativeTime);

export const Post: FunctionComponent<PostTypePostHydrate> = ({
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
                publisherLogo="https://coindrop.to/piggy-256.png" // TODO: change this to a valid AMP logo size https://developers.google.com/search/docs/data-types/article
                description={description}
            />
            <Box
                id="page-container"
                maxW="960px"
                mx="auto"
                px={4}
                mb={6}
            >
                <Navbar />
                <hr />
                <article>
                    <Heading
                        as="h1"
                        size="2xl"
                        textAlign="center"
                        my={6}
                    >
                        {title}
                    </Heading>
                    <Flex
                        direction={["column", null, "row"]}
                        align={["initial", null, "center"]}
                        alignItems="center"
                        justify="center"
                        mb={4}
                    >
                        <Text
                            id="publish-date"
                            mb={[4, null, "auto"]}
                            mt={[0, null, "auto"]}
                            textAlign="center"
                            mr={[null, null, 12]}
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
                    </Flex>
                    <hr />
                    <Container
                        mt={8}
                        maxW="md"
                    >
                        {content}
                    </Container>
                    {dateModified && (
                        <Text
                            id="modified-date"
                            mt={4}
                            fontSize="sm"
                            textAlign="center"
                        >
                            {`Last updated ${dayjs(dateModified).format('dddd, MMMM D, YYYY')} (${dayjs(dateModified).fromNow()})`}
                        </Text>
                    )}
                </article>
                <Footer />
            </Box>
        </>
    );
};
