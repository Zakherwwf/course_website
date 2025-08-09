// src/pages/api/search.json.js

// Using import.meta.glob to dynamically import all pages at build time
// The '?raw' query loads the file content as a string.
// We are interested in .md, .mdx, and .astro files from src/pages.
const modules = import.meta.glob('/src/pages/**/*.{md,mdx,astro}', {
  query: '?raw',
  import: 'default'
});

// Function to extract text content from markdown/MDX/Astro files
// This function attempts to remove frontmatter, JSX/MDX components, and markdown syntax
function extractTextFromContent(content) {
  // 1. Remove frontmatter (if present)
  const withoutFrontmatter = content.replace(/^---\n([\s\S]*?)\n---/, '');

  // 2. Remove Astro/MDX/JSX components (anything within <...>)
  // This is a basic regex and might not catch all complex cases but works for most.
  const withoutComponents = withoutFrontmatter.replace(/<[^>]*>/g, '');

  // 3. Remove markdown syntax
  const withoutMarkdown = withoutComponents
    .replace(/#{1,6}\s+/g, '') // Headers (e.g., # Title)
    .replace(/\*{1,2}([^*]+)\*{1,2}/g, '$1') // Bold/italic (e.g., **text**)
    .replace(/`([^`]+)`/g, '$1') // Inline code (e.g., `code`)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links (e.g., [text](url), keeps text)
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1') // Images (e.g., ![alt](url), keeps alt text)
    .replace(/```[\s\S]*?```/g, '') // Code blocks
    .replace(/^\s*[-*+]\s+/gm, '') // List markers (e.g., - item)
    .replace(/^\s*\d+\.\s+/gm, '') // Numbered list markers (e.g., 1. item)
    .replace(/^\s*>\s+/gm, '') // Blockquotes
    .replace(/\n{2,}/g, '\n') // Replace multiple newlines with single
    .trim();

  return withoutMarkdown;
}

// Main GET function for the API route
export async function GET() {
  const searchableData = [];

  for (const path in modules) {
    // Exclude API routes and quiz pages from the search index
    if (path.includes('/api/') || path.includes('/quiz')) continue;

    try {
      // Dynamically import the raw content of the file
      const content = await modules[path]();

      // Extract the slug (URL path) from the file path
      let slug = path
        .replace('/src/pages', '') // Remove the '/src/pages' prefix
        .replace(/\.(md|mdx|astro)$/, ''); // Remove file extensions

      // Astro automatically creates index.html for folders or /index files.
      // We want the slug to be '/about-wwf/' instead of '/about-wwf/index'
      if (slug.endsWith('/index')) {
        slug = slug.slice(0, -5); // Remove '/index'
      }

      // Ensure a trailing slash for consistent URLs, unless it's the root '/'
      if (slug !== '/' && !slug.endsWith('/')) {
        slug += '/';
      }

      // Extract frontmatter to get the title
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      let title = 'Untitled Page'; // Default title if not found

      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        const titleMatch = frontmatter.match(/title:\s*["']?([^"'\n]+)["']?/);
        if (titleMatch && titleMatch[1]) {
          title = titleMatch[1].trim();
        }
      } else if (path.includes('/index.astro')) {
          // Special case for homepage, usually doesn't have frontmatter but we know its title
          title = "WWF North Africa Talent Academy";
      }


      // Extract and clean the body content for indexing
      const cleanText = extractTextFromContent(content);

      searchableData.push({
        slug: slug,
        title: title,
        body: cleanText,
      });

    } catch (error) {
      console.warn(`Failed to process ${path} for search index:`, error.message);
    }
  }

  // Return the JSON response
  return new Response(JSON.stringify(searchableData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600' // Cache for 1 hour for browsers/CDNs
    }
  });
}