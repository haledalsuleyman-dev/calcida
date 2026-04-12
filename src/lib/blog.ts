import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  lastUpdated?: string;
  description: string;
  content: string;
  category: string;
  keywords?: string[];
  relatedCalculators?: string[];
  relatedArticles?: string[];
}

export function getSortedPostsData(): BlogPost[] {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".mdx" from file name to get id
    const slug = fileName.replace(/\.mdx$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);

    // Combine the data with the id
    return {
      slug,
      content,
      ...(data as { 
        title: string; 
        date: string; 
        description: string; 
        category: string;
        lastUpdated?: string;
        keywords?: string[];
        relatedCalculators?: string[];
        relatedArticles?: string[];
      }),
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostData(slug: string): BlogPost | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    ...(data as { 
      title: string; 
      date: string; 
      description: string; 
      category: string;
      lastUpdated?: string;
      keywords?: string[];
      relatedCalculators?: string[];
      relatedArticles?: string[];
    }),
  };
}
