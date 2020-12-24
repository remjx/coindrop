import { NextSeo, ArticleJsonLd } from 'next-seo';
import { FunctionComponent } from 'react';
import { Container, Link, Text, Heading, Avatar, Flex, useTheme } from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { PostTypePostHydrate } from '../../../src/lib/blog/types';
import { authors } from '../../../blog/authors';
import { withDefaultLayout } from '../../Layout/DefaultLayoutHOC';

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
    const theme = useTheme();
    return (
        <>
            <NextSeo
                title={`${title} | Coindrop blog`}
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
                    maxW={theme.breakpoints.md}
                >
                    {content}
                    {dateModified && (
                        <>
                        <Text
                            id="modified-date"
                            fontSize="sm"
                            textAlign="center"
                        >
                            {`Last updated ${dayjs(dateModified).format('dddd, MMMM D, YYYY')} (${dayjs(dateModified).fromNow()})`}
                        </Text>
                        <Text
                            fontSize="xs"
                            textAlign="center"
                        >
                            <Link
                                href={`https://github.com/remjx/coindrop/commits/master/blog/posts/${slug}/index.mdx`}
                            >
                                <u>View edits</u>
                            </Link>
                        </Text>
                        </>
                    )}
                </Container>
            </article>
        </>
    );
};

export default withDefaultLayout(Post);
