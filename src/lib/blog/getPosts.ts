import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { PostMetaData, Post } from './types';

const postsDirectory = join(process.cwd(), 'blog/posts');

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content }: { data: PostMetaData, content: string } = matter(fileContents);
  return {
      ...data,
      slug: realSlug,
      content,
  };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (new Date(post1.datePublished) > new Date(post2.datePublished) ? -1 : 1));
  return posts;
}
