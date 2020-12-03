/* eslint-disable arrow-body-style */

import { FunctionComponent } from 'react';
import { Button, Box, Text, Heading, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import dayjs from 'dayjs';
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
            <a>
                {children}
            </a>
        </NextLink>
    );
    return (
        <Link>
            <Flex borderWidth="1px" borderRadius="lg">
                <Link>
                    <Image src={coverImageUrl} width={250} height={250} alt={coverImageDescr} />
                </Link>
                <Box>
                    <Link>
                        <Heading as="h2">{title}</Heading>
                    </Link>
                    <Text>{description}</Text>
                    <Text>{dayjs(datePublished).format('MMM DD, YYYY')}</Text>
                </Box>
            </Flex>
        </Link>
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
            maxW="960px"
            mx="auto"
            px={4}
            mb={6}
        >
            <Navbar isAuthOpen={null} />
            <hr />
            <Heading>
                Latest Posts
            </Heading>
            {posts.map(post => <LatestPostsItem post={post} />)}
            <Flex justify="space-around" align="center">
                <NextLink href={`/blog/page/${page - 1}`}>
                    <Button
                        disabled={page === 1}
                    >
                        Newer
                    </Button>
                </NextLink>
                <Text>Page {page} of {pageTotal}</Text> {/* eslint-disable-line react/jsx-one-expression-per-line */}
                <NextLink href={`/blog/page/${page + 1}`}>
                    <Button
                        disabled={page === pageTotal}
                    >
                        Older
                    </Button>
                </NextLink>
            </Flex>
            <Footer />
        </Box>
    );
};
