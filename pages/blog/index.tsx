import { FunctionComponent } from 'react';
import { GetStaticProps } from 'next';
import { getAllPosts } from '../../src/lib/blog/getPosts';
import { PostType } from '../../src/lib/blog/types';
import { Post } from '../../components/Blog/Post/Post';

const BlogHome: FunctionComponent = (props) => (
  <Post {...props} />
);

export default BlogHome;

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts([
    'author',
    'datePublished',
    'title',
    'description',
    'images',
    'slug',
  ]);
  return {
    props: {
      ...post,
    },
  };
};
