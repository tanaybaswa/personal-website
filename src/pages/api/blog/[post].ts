import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm'; // Add remark-gfm for table and list support
import type { NextApiRequest, NextApiResponse } from 'next';

const blogDirectory = path.join(process.cwd(), 'src/data/blog');

// API to fetch a single blog post by slug
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { post } = req.query;
  const fullPath = path.join(blogDirectory, `${post}.md`);

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents); // Extract front matter (title, date) and content

    const processedContent = await remark()
      .use(html, { sanitize: false }) // Use remark-html to convert markdown to HTML
      .use(gfm) // Use GitHub flavored markdown to handle tables, strikethrough, etc.
      .process(content);
    const contentHtml = processedContent.toString();

    res.status(200).json({
      title: data.title,
      date: data.date,
      content: contentHtml, // Send the post content as HTML
    });
  } catch (error) {
    res.status(404).json({ message: 'Post not found', error: (error as Error).message });
  }
}
