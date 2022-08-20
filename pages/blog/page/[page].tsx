import { FunctionComponent } from 'react';
import { NextSeo } from 'next-seo';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllPosts } from '../../../src/lib/blog/getPosts';
import { default as LatestPosts, LatestPostsProps } from '../../../components/Blog/LatestPosts/LatestPosts';

const postsPerPage = 8;

const LatestPostsPage: FunctionComponent<LatestPostsProps> = (props) => {
  const { page } = props;
  return (
    <>
      <NextSeo
        title={page === 1 ? "Coindrop Blog" : `Coindrop Blog | Page ${page}`}
        description="Learn about the easiest way to accept donations and tips"
      />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <LatestPosts {...props} />
    </>
  );
};

export default LatestPostsPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { page: pageStr } = params;
    const pageNum = parseInt(Array.isArray(pageStr) ? pageStr[0] : pageStr, 10);
    let posts = getAllPosts([
        'author',
        'title',
        'description',
        'coverImage',
        'coverImageDescr',
        'datePublished',
        'slug',
    ]);
    const pageTotal = Math.ceil(posts.length / postsPerPage);
    posts = posts
        .filter(post => post.slug !== 'privacy-policy' && post.slug !== 'terms-of-service')
        .sort((post1, post2) => (new Date(post1.datePublished) > new Date(post2.datePublished) ? -1 : 1))
        .slice((pageNum - 1) * postsPerPage, pageNum * postsPerPage);
    return {
        props: {
            posts,
            page: pageNum,
            pageTotal,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = getAllPosts([]);
    const pageTotal = Math.ceil(posts.length / postsPerPage);
    const pages = [];
    let counter = 1;
    do {
        pages.push(counter.toString());
        counter += 1;
    } while (counter <= pageTotal);
    return {
      paths: pages.map(page => ({
          params: {
            page,
          },
        })),
      fallback: false,
    };
};
