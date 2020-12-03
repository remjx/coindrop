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
}

const LatestPostsItem: FunctionComponent<LatestPostsItemProps> = ({ post }) => {
    const { slug, datePublished, title, description, coverImage, coverImageDescr } = post;
    const coverImageUrl = `/blog-images/${slug}/${coverImage}`;
    const Link: FunctionComponent = ({ children }) => (
        <NextLink href={`/blog/${slug}`}>
            <a className={styles.link}>
                {children}
            </a>
        </NextLink>
    );
    return (
        <Flex borderWidth="1px" borderRadius="lg" mb={4}>
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
            <Navbar isAuthOpen={null} />
            <hr />
            <Heading
                as="h1"
                my={6}
                textAlign="center"
            >
                Blog - Latest Posts
            </Heading>
            {
                posts.length > 1
                ? posts.map(post => <LatestPostsItem post={post} />)
                : <Text textAlign="center" mb={4}>No posts yet.</Text>
            }
            <Flex justify="space-around" align="center">
                <NextLink href={page <= 1 ? '#' : `/blog/page/${page - 1}`}>
                    <a>
                        <Button
                            disabled={page <= 1}
                        >
                            Newer
                        </Button>
                    </a>
                </NextLink>
                <Text>Page {page} of {pageTotal}</Text> {/* eslint-disable-line react/jsx-one-expression-per-line */}
                <NextLink href={page >= pageTotal ? '#' : `/blog/page/${page + 1}`}>
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
