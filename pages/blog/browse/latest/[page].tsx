import { FunctionComponent } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllPosts } from '../../../../src/lib/blog/getPosts';
import { LatestPosts, LatestPostsProps } from '../../../../components/Blog/LatestPosts/LatestPosts';

const postsPerPage = 1;

const LatestPostsPage: FunctionComponent<LatestPostsProps> = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <LatestPosts {...props} />
);

export default LatestPostsPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { page: pageStr } = params;
    const pageNum = parseInt(Array.isArray(pageStr) ? pageStr[0] : pageStr, 10);
    let posts = getAllPosts([
        'author',
        'datePublished',
        'title',
        'description',
        'coverImage',
        'coverImageDescr',
        'slug',
    ]);
    const pageTotal = Math.ceil(posts.length / postsPerPage);
    posts = posts
        .sort((post1, post2) => (post1.datePublished > post2.datePublished ? -1 : 1))
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
