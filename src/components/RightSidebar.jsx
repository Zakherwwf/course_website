import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

export default function RightSidebar({ headings = [] }) {
  const [activeId, setActiveId] = useState(null);
  const observer = useRef(null);

  useEffect(() => {
    const handleObserver = (entries) => {
      // Find the first intersecting element from the top of the viewport
      const intersecting = entries.filter(e => e.isIntersecting);
      if (intersecting.length > 0) {
        // Prioritize the topmost visible entry
        setActiveId(intersecting[0].target.id);
      }
    };

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: `-60px 0px -40% 0px`, // viewport area to check for intersection
    });

    const elements = document.querySelectorAll('.prose h2');
    elements.forEach((elem) => observer.current.observe(elem));

    return () => observer.current?.disconnect();
  }, []);

  return (
    <aside className="right-sidebar">
      <nav>
        <h4>On this page</h4>
        <ul>
          {headings.map((heading) => (
            <li key={heading.slug}>
              <a
                href={`#${heading.slug}`}
                className={activeId === heading.slug ? 'active' : ''}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <style>{`
        .right-sidebar {
          position: sticky;
          top: 60px;
          height: calc(100vh - 60px);
          padding: 2rem 1.5rem;
          overflow-y: auto;
        }
        @media (max-width: 1023px) {
          .right-sidebar {
            display: none;
          }
        }
        .right-sidebar h4 {
            font-family: var(--font-sans);
            font-weight: 600;
            font-size: 0.9rem;
            margin-bottom: 1rem;
            color: var(--color-text);
        }
        .right-sidebar ul { list-style: none; padding: 0; }
        .right-sidebar li { margin-bottom: 0.5rem; }
        .right-sidebar a {
            display: block;
            color: var(--color-text-muted);
            text-decoration: none;
            font-family: var(--font-sans);
            font-size: 0.85rem;
            transition: color 0.2s, border-color 0.2s;
            border-left: 2px solid var(--color-border);
            padding-left: 1rem;
        }
        .right-sidebar a:hover { color: var(--color-text); }
        .right-sidebar a.active {
            color: var(--color-accent);
            font-weight: 600;
            border-left-color: var(--color-accent);
        }
      `}</style>
    </aside>
  );
}