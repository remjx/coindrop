import { FunctionComponent } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllPosts, getPostBySlug } from '../../src/lib/blog/getPosts';
import markdownToHtml from '../../src/lib/blog/markdownToHtml';
import { BlogLayout, BlogLayoutProps } from '../../components/Blog/BlogLayout';

type BlogPostProps = BlogLayoutProps & { contentHtml: string, slug: string }

const BlogPost: FunctionComponent<BlogPostProps> = ({ contentHtml, meta, slug }) => (
  <BlogLayout meta={meta} slug={slug}>
      <div
        dangerouslySetInnerHTML={{ __html: contentHtml }} // eslint-disable-line react/no-danger
      />
  </BlogLayout>
);

export default BlogPost;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPostBySlug(params.slug);
  const contentHtml = await markdownToHtml(post.content || '');
  const { content, slug, ...meta } = post; // eslint-disable-line @typescript-eslint/no-unused-vars

  return {
    props: {
      meta,
      slug,
      contentHtml,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();

  return {
    paths: posts.map(post => ({
        params: {
          slug: post.slug,
        },
      })),
    fallback: false,
  };
};
