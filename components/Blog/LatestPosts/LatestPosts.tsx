/* eslint-disable arrow-body-style */

import { FunctionComponent } from 'react';
import { Button, Box, Text, Heading, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { PostType } from '../../../src/lib/blog/types';
import styles from './LatestPosts.module.scss';
import { withDefaultLayout } from '../../Layout/DefaultLayoutHOC';

type LatestPostsItemProps = {
    post: Partial<PostType>
    isLastOnPage: boolean
}

const LatestPostsItem: FunctionComponent<LatestPostsItemProps> = ({ post, isLastOnPage }) => {
    const { slug, title, description, coverImage, coverImageDescr } = post;
    const coverImageUrl = `/blog-content/${slug}/${coverImage}`;
    const Link: FunctionComponent<{ children: React.ReactNode }> = ({ children }) => (
        <NextLink href={`/blog/${slug}`} className={styles.link}>
            {children}
        </NextLink>
    );
    return (
        <>
        <Flex mb={4} mx={6} direction={["column", "row"]}>
            <Flex
                flex="none"
                align={["center", "initial"]}
                justify={["center", "initial"]}
            >
                <Link>
                    <Image src={coverImageUrl} width={200} height={200} alt={coverImageDescr} />
                </Link>
            </Flex>
            <Box mb={3} mx={4}>
                <Link>
                    <Heading as="h2">{title}</Heading>
                </Link>
                <Text mt={3}>{description}</Text>
                <Flex
                    justify={["center", null, "flex-end"]}
                    mt={2}
                    mr={[null, null, 6]}
                >
                    <Link>
                        <Button>
                            Read more
                        </Button>
                    </Link>
                </Flex>
            </Box>
        </Flex>
        {!isLastOnPage && (
            <Box my={5}>
                <hr />
            </Box>
        )}
        </>
    );
};

export type LatestPostsProps = {
    posts: Partial<PostType>[]
    page: number
    pageTotal: number
}

export const LatestPosts: FunctionComponent<LatestPostsProps> = ({ posts, page, pageTotal }) => {
    return (
        <>
            <Heading
                as="h1"
                size="2xl"
                my={10}
                textAlign="center"
            >
                Latest Posts
            </Heading>
            {
                posts.length >= 1
                ? posts.map((post, index) => <LatestPostsItem key={post.slug} post={post} isLastOnPage={index === posts.length - 1} />)
                : <Text textAlign="center" mb={4}>No posts yet.</Text>
            }
            <Flex justify="space-around" align="center">
                {/* TODO: is this bad for SEO? remove link if on last page? */}
                <NextLink href={`/blog/page/${page - 1}`}>
                    <Button
                        disabled={page <= 1}
                    >
                        Newer
                    </Button>
                </NextLink>
                <Text>Page {page} of {pageTotal}</Text> {/* eslint-disable-line react/jsx-one-expression-per-line */}
                {/* TODO: is this bad for SEO? remove link if on last page? */}
                <NextLink href={`/blog/page/${page + 1}`}>
                    <Button
                        disabled={page >= pageTotal}
                    >
                        Older
                    </Button>
                </NextLink>
            </Flex>
        </>
    );
};

export default withDefaultLayout(LatestPosts);
