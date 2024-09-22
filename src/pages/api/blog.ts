import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { NextApiRequest, NextApiResponse } from 'next';

const blogDirectory = path.join(process.cwd(), 'src/data/blog');

// API to get all blog posts
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const fileNames = fs.readdirSync(blogDirectory);
  const allPosts = fileNames.map((fileName) => {
    const post = fileName.replace(/\.md$/, '');
    const fullPath = path.join(blogDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data } = matter(fileContents); // Extract front matter (title, date)
    return {
      post,
      title: data.title,
      date: data.date,
      ...data,
    };
  });

  res.status(200).json(allPosts); // Send the blog posts as JSON
}
