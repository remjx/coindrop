import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { PostFrontMatter, PostType } from './types';

const postsDirectory = join(process.cwd(), 'blog/posts');

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[]): Partial<PostType> {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content }: { data: Partial<PostFrontMatter>, content: string } = matter(fileContents);
  const filteredData: Partial<PostType> = {};
  fields.forEach((field) => {
    if (field === 'slug') {
      filteredData[field] = realSlug;
    } else if (field === 'content') {
      filteredData[field] = content;
    } else if (field.startsWith('date')) {
      filteredData[field] = data[field].toISOString();
    } else if (data[field]) {
      filteredData[field] = data[field];
    }
  });
  return filteredData;
}

export function getAllPosts(fields: string[]): Partial<PostType>[] {
  const slugs = getPostSlugs();
  const posts: Partial<PostType>[] = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => (new Date(post1.datePublished) > new Date(post2.datePublished) ? -1 : 1));
  return posts;
}
