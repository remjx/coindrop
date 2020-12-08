/* eslint-disable arrow-body-style */

import { FunctionComponent } from 'react';
import { Button, Box, Text, Heading, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
// import dayjs from 'dayjs';
import { Navbar } from '../../Navbar/Navbar';
import { PostType } from '../../../src/lib/blog/types';
import styles from './LatestPosts.module.scss';
import Footer from '../../Footer/Footer';

type LatestPostsItemProps = {
    post: Partial<PostType>
    isLastOnPage: boolean
}

const LatestPostsItem: FunctionComponent<LatestPostsItemProps> = ({ post, isLastOnPage }) => {
    const { slug, title, description, coverImage, coverImageDescr } = post;
    const coverImageUrl = `/blog-content/${slug}/${coverImage}`;
    const Link: FunctionComponent = ({ children }) => (
        <NextLink href={`/blog/${slug}`}>
            <a className={styles.link}>
                {children}
            </a>
        </NextLink>
    );
    return (
        <>
        <Flex mb={4} mx={6}>
            <Flex flex="none">
                <Link>
                    <Image src={coverImageUrl} width={200} height={200} alt={coverImageDescr} />
                </Link>
            </Flex>
            <Box my={3} mx={4}>
                <Link>
                    <Heading as="h2">{title}</Heading>
                </Link>
                {/* <Text fontSize="sm">{dayjs(datePublished).format('MMM DD, YYYY')}</Text> */}
                <Text>{description}</Text>
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
        <Box
            id="page-container"
            maxW="940px"
            mx="auto"
        >
            <Navbar />
            <hr />
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
                    <a>
                        <Button
                            disabled={page <= 1}
                        >
                            Newer
                        </Button>
                    </a>
                </NextLink>
                <Text>Page {page} of {pageTotal}</Text> {/* eslint-disable-line react/jsx-one-expression-per-line */}
                {/* TODO: is this bad for SEO? remove link if on last page? */}
                <NextLink href={`/blog/page/${page + 1}`}>
                    <a>
                        <Button
                            disabled={page >= pageTotal}
                        >
                            Older
                        </Button>
                    </a>
                </NextLink>
            </Flex>
            <Footer />
        </Box>
    );
};
