import { FunctionComponent } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllPosts, getPostBySlug } from '../../src/lib/blog/getPosts';
import markdownToHtml from '../../src/lib/blog/markdownToHtml';
import { PostType } from '../../src/lib/blog/types';
import { Post } from '../../components/Blog/Post/Post';

const BlogPost: FunctionComponent<PostType> = (props) => (
  <Post {...props} />
);

export default BlogPost;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const post = getPostBySlug(slug, [
    'author',
    'datePublished',
    'dateModified',
    'title',
    'description',
    'images',
    'content',
    'slug',
  ]);
  const content = await markdownToHtml(post.content || '');
  return {
    props: {
      ...post,
      content,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts(['slug']);
  return {
    paths: posts.map(post => ({
        params: {
          slug: post.slug,
        },
      })),
    fallback: false,
  };
};
