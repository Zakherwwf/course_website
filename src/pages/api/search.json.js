// src/pages/api/search.json.js

import { getCollection } from 'astro:content';

// Function to strip HTML tags and clean text
function stripHtml(html) {
  return html.replace(/<[^>]*>?/gm, '');
}

// Function to extract text content from markdown/MDX
function extractTextFromMarkdown(content) {
  // Remove frontmatter if present
  const withoutFrontmatter = content.replace(/^---[\s\S]*?---/, '');

  // Remove MDX/JSX components (like <LearningObjectives>, <Map>, etc.)
  const withoutComponents = withoutFrontmatter.replace(/<[^>]*>/g, '');

  // Remove markdown syntax
  const withoutMarkdown = withoutComponents
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*{1,2}([^*]+)\*{1,2}/g, '$1') // Remove bold/italic
    .replace(/`([^`]+)`/g, '$1') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1') // Remove images, keep alt text
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/^\s*[-*+]\s+/gm, '') // Remove list markers
    .replace(/^\s*\d+\.\s+/gm, '') // Remove numbered list markers
    .replace(/^\s*>\s+/gm, '') // Remove blockquotes
    .replace(/\n{2,}/g, '\n') // Replace multiple newlines with single
    .trim();

  return withoutMarkdown;
}

export async function GET() {
  const searchableData = [];

  try {
    // If you're using Astro Content Collections
    if (typeof getCollection !== 'undefined') {
      try {
        // Try to get from content collections first
        const posts = await getCollection('blog'); // Adjust collection name as needed

        posts.forEach(post => {
          if (!post.slug.includes('quiz')) {
            const cleanText = extractTextFromMarkdown(post.body || '');
            searchableData.push({
              slug: `/blog/${post.slug}`, // Adjust path as needed
              title: post.data.title,
              body: cleanText,
            });
          }
        });
      } catch (e) {
        console.log('Content collections not available, falling back to file system approach');
      }
    }

    // Fallback: Direct file system approach if content collections aren't set up
    if (searchableData.length === 0) {
      // Import all MDX files
      const modules = import.meta.glob('/src/pages/**/*.{md,mdx}', {
        query: '?raw',
        import: 'default'
      });

      for (const path in modules) {
        // Skip quiz pages and API routes
        if (path.includes('/quiz') || path.includes('/api/')) continue;

        try {
          const content = await modules[path]();

          // Extract the slug from the file path
          const slug = path
            .replace('/src/pages', '')
            .replace(/\.(md|mdx)$/, '')
            .replace(/\/index$/, '');

          // Extract frontmatter for title
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
          let title = 'Untitled';

          if (frontmatterMatch) {
            const frontmatter = frontmatterMatch[1];
            const titleMatch = frontmatter.match(/title:\s*["']?([^"'\n]+)["']?/);
            if (titleMatch) {
              title = titleMatch[1];
            }
          }

          // Extract and clean the body content
          const cleanText = extractTextFromMarkdown(content);

          searchableData.push({
            slug: slug || '/',
            title: title,
            body: cleanText,
          });
        } catch (error) {
          console.warn(`Failed to process ${path}:`, error.message);
        }
      }
    }

    return new Response(JSON.stringify(searchableData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=3600' // Cache for 1 hour
      }
    });

  } catch (error) {
    console.error('Search API error:', error);

    return new Response(JSON.stringify({
      error: 'Failed to generate search index',
      details: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

// Alternative approach: If you want to use a different method
export async function GET_ALTERNATIVE() {
  const searchableData = [];

  // Get all page files using dynamic imports
  const pageFiles = [
    '/src/pages/index.astro',
    '/src/pages/chapter1.md',
    '/src/pages/chapter2.md',
    '/src/pages/chapter3.md',
    // Add your specific pages here
  ];

  for (const filePath of pageFiles) {
    try {
      // For .md/.mdx files, you can import them as raw text
      const response = await fetch(`${filePath}?raw`);
      if (response.ok) {
        const content = await response.text();

        // Extract title and clean content
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        let title = 'Untitled';

        if (frontmatterMatch) {
          const frontmatter = frontmatterMatch[1];
          const titleMatch = frontmatter.match(/title:\s*["']?([^"'\n]+)["']?/);
          if (titleMatch) {
            title = titleMatch[1];
          }
        }

        const cleanText = extractTextFromMarkdown(content);
        const slug = filePath.replace('/src/pages', '').replace(/\.(astro|md|mdx)$/, '');

        searchableData.push({
          slug: slug || '/',
          title: title,
          body: cleanText,
        });
      }
    } catch (error) {
      console.warn(`Failed to process ${filePath}:`, error.message);
    }
  }

  return new Response(JSON.stringify(searchableData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}