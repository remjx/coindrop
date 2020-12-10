import { FunctionComponent } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import { getAllPosts, getPostBySlug } from '../../src/lib/blog/getPosts';
import { PostTypePreHydrate } from '../../src/lib/blog/types';
import Post from '../../components/Blog/Post/Post';
import { components } from '../../components/Blog/ComponentMapping';

const BlogPost: FunctionComponent<PostTypePreHydrate> = ({
  author,
  datePublished,
  dateModified,
  title,
  description,
  images,
  slug,
  source,
}) => {
  const content = hydrate(source, { components });
  return (
      <Post
        author={author}
        datePublished={datePublished}
        dateModified={dateModified}
        title={title}
        description={description}
        images={images}
        slug={slug}
        content={content}
      />
  );
};

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
  const mdxSource: string = await renderToString(post.content, { components });
  delete post.content;
  return {
    props: {
      ...post,
      source: mdxSource,
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
