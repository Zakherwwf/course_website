import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import Fuse from 'fuse.js';

export default function Search() {
  const [fuse, setFuse] = useState(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef(null);

  // Fetch search data and initialize Fuse.js on component mount
  useEffect(() => {
    fetch('/course_website/api/search.json')
      .then(response => response.json())
      .then(data => {
        const fuseInstance = new Fuse(data, {
          keys: ['title', 'body'],
          includeMatches: true,
          minMatchCharLength: 2,
          threshold: 0.4, // Adjust for fuzziness (0=perfect, 1=any match)
        });
        setFuse(fuseInstance);
      });
  }, []);

  // Handle clicks outside the search component to close results
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchContainerRef]);

  const handleSearch = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    if (fuse && newQuery.length > 1) {
      const searchResults = fuse.search(newQuery);
      setResults(searchResults.slice(0, 5)); // Show top 5 results
    } else {
      setResults([]);
    }
  };

  return (
    <div className="search-container" ref={searchContainerRef}>
      <div className="search-input-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          onFocus={() => setIsFocused(true)}
          placeholder="Search chapters..."
          className="search-input"
        />
      </div>
      {isFocused && query.length > 1 && (
        <div className="search-results">
          {results.length > 0 ? (
            <ul>
              {results.map(({ item, matches }) => (
                <li key={item.slug}>
                  <a href={item.slug}>
                    <span className="result-title">{item.title}</span>
                    {matches && matches[0] && (
                      <span className="result-snippet">
                        ...{getSnippet(item.body, matches[0].indices)}...
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-results">No results found for "{query}"</div>
          )}
        </div>
      )}
      <style>{`
        .search-container { position: relative; width: 100%; }
        .search-input-wrapper { display: flex; align-items: center; background-color: var(--color-bg-alt); border-radius: 8px; border: 1px solid var(--color-border); padding: 0.5rem 0.75rem; transition: border-color 0.2s; }
        .search-input-wrapper:focus-within { border-color: var(--color-primary); }
        .search-input-wrapper svg { color: var(--color-text-muted); margin-right: 0.5rem; }
        .search-input { width: 100%; border: none; background: transparent; color: var(--color-text); font-family: var(--font-sans); font-size: 1rem; }
        .search-input:focus { outline: none; }
        .search-results { position: absolute; top: calc(100% + 8px); left: 0; right: 0; background-color: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-height: 400px; overflow-y: auto; z-index: 20; }
        .search-results ul { list-style: none; margin: 0; padding: 0.5rem; }
        .search-results li a { display: block; padding: 0.75rem 1rem; border-radius: 6px; text-decoration: none; }
        .search-results li a:hover { background-color: rgba(94, 234, 212, 0.1); }
        .result-title { display: block; font-family: var(--font-sans); font-weight: 600; color: var(--color-primary); }
        .result-snippet { display: block; font-family: var(--font-sans); font-size: 0.85rem; color: var(--color-text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 0.25rem; }
        .no-results { padding: 1.5rem; text-align: center; color: var(--color-text-muted); font-family: var(--font-sans); }
      `}</style>
    </div>
  );
}

// Helper function to create a snippet around the matched text
function getSnippet(text, indices) {
    const [start, end] = indices[0];
    const snippetStart = Math.max(0, start - 30);
    const snippetEnd = Math.min(text.length, end + 30);
    return text.substring(snippetStart, snippetEnd);
}