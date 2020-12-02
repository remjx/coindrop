import { FunctionComponent } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllDocs, getDocBySlug } from '../lib/docs'
import markdownToHtml from '../lib/markdown'
import { BlogLayout, BlogLayoutProps } from '../../components/Blog/BlogLayout';

type BlogPostProps = BlogLayoutProps & { content: any }

const BlogPost: FunctionComponent<BlogPostProps> = ({ meta, content }) => (
  <BlogLayout meta={meta}>
      {content}
  </BlogLayout>
);

export default BlogPost;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const doc = getDocBySlug(params.slug);
  const content = await markdownToHtml(doc.content || '');

  return {
    props: {
      ...doc,
      content,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const docs = getAllDocs();

  return {
    paths: docs.map(doc => ({
        params: {
          slug: doc.slug,
        },
      })),
    fallback: false,
  };
};
