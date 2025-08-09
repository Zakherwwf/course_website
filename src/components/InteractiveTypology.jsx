import { h } from 'preact';
import { useState, useCallback } from 'preact/hooks';

// Enhanced data structure with professional classification details
const typologyData = {
  name: 'Biosphere',
  level: 0,
  code: 'BIOSPHERE',
  units: 1,
  description: 'The global ecological system integrating all living beings and their relationships, including their interaction with the elements of the lithosphere, geosphere, hydrosphere, and atmosphere.',
  coverage: 'Global',
  keyProcess: 'Energy flow & nutrient cycling',
  children: [
    {
      name: 'Realms',
      level: 1,
      code: 'L1-REALMS',
      units: 5,
      description: 'The highest classification level, dividing Earth into five fundamental spheres based on the medium supporting life: Terrestrial, Freshwater, Marine, Subterranean, and Atmospheric.',
      coverage: 'Global distribution',
      keyProcess: 'Environmental filtering',
      examples: ['Terrestrial', 'Marine', 'Freshwater', 'Subterranean', 'Atmospheric'],
      children: [
        {
          name: 'Biomes',
          level: 2,
          code: 'L2-BIOMES',
          units: 25,
          description: 'Within each realm, ecosystems group into 25 functional biomes that share similar ecological processes and environmental constraints.',
          coverage: 'Continental to global scale',
          keyProcess: 'Climate-ecosystem interactions',
          examples: ['Tropical Forests', 'Temperate Grasslands', 'Coral Reefs', 'Boreal Forests'],
          children: [
            {
              name: 'Functional Groups',
              level: 3,
              code: 'L3-GROUPS',
              units: 110,
              description: 'Over 110 specific ecosystem units that share similar assembly processes and functions within each biome.',
              coverage: 'Regional to continental',
              keyProcess: 'Assembly mechanisms',
              examples: ['Lowland Rainforests', 'Montane Cloud Forests', 'Seasonal Floodplains', 'Alpine Shrublands'],
              children: [
                {
                  name: 'Biogeographic Ecotypes',
                  level: 4,
                  code: 'L4-ECOTYPES',
                  units: 500,
                  description: 'Regional manifestations of a functional group, reflecting unique species compositions due to biogeographic history.',
                  coverage: 'Regional scale',
                  keyProcess: 'Biogeographic filtering',
                  examples: ['Amazonian Lowland Rainforest', 'Congo Basin Rainforest', 'Southeast Asian Rainforest']
                },
                {
                  name: 'Global Ecosystem Types',
                  level: 5,
                  code: 'L5-GLOBAL',
                  units: 1000,
                  description: 'Fine-scale units based on specific biotic and abiotic compositions, often mapped at a global scale.',
                  coverage: 'Local to regional',
                  keyProcess: 'Local adaptation',
                  examples: ['Amazonian Terra Firme Forest', 'Amazonian Várzea Forest', 'Amazonian Igapó Forest']
                },
                {
                  name: 'Local Ecosystem Types',
                  level: 6,
                  code: 'L6-LOCAL',
                  units: '10,000+',
                  description: 'The most detailed level, corresponding to local mapping units and vegetation classifications used in specific regions or countries.',
                  coverage: 'Local scale',
                  keyProcess: 'Site-specific conditions',
                  examples: ['Local forest associations', 'Site-specific wetlands', 'Municipal park types']
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export default function EnhancedInteractiveTypology() {
  const [selectedNode, setSelectedNode] = useState(typologyData);
  const [expandedNodes, setExpandedNodes] = useState({
    'Biosphere': true,
    'Realms': true,
    'Biomes': true
  });
  const [viewMode, setViewMode] = useState('hierarchy'); // 'hierarchy' or 'details'

  const handleToggleExpand = useCallback((nodeName) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeName]: !prev[nodeName]
    }));
  }, []);

  const handleSelectNode = useCallback((node) => {
    setSelectedNode(node);
  }, []);

  const getLevelColor = (level) => {
    const colors = [
      'var(--color-primary)',     // Level 0 - Biosphere
      '#059669',                  // Level 1 - Realms
      '#0891b2',                  // Level 2 - Biomes
      '#7c3aed',                  // Level 3 - Functional Groups
      '#dc2626',                  // Level 4 - Ecotypes
      '#ea580c',                  // Level 5 - Global Types
      '#9333ea'                   // Level 6 - Local Types
    ];
    return colors[level] || 'var(--color-text-muted)';
  };

  const TreeNode = ({ node, depth = 0 }) => {
    const isSelected = selectedNode && selectedNode.name === node.name;
    const isExpanded = expandedNodes[node.name];
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div className="tree-node" style={{ '--node-depth': depth }}>
        <div
          className={`node-header ${isSelected ? 'selected' : ''}`}
          onClick={() => handleSelectNode(node)}
          style={{ '--level-color': getLevelColor(node.level) }}
        >
          <div className="node-main">
            <div className="node-indicator">
              {hasChildren && (
                <button
                  className={`expand-button ${isExpanded ? 'expanded' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleExpand(node.name);
                  }}
                  aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${node.name}`}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 12,15 18,9"/>
                  </svg>
                </button>
              )}
              <div className="level-badge">
                <span className="level-number">{node.level}</span>
              </div>
            </div>

            <div className="node-content">
              <div className="node-title">
                <h4>{node.name}</h4>
                <div className="node-meta">
                  <span className="code-badge">{node.code}</span>
                  <span className="units-badge">
                    <span className="units-number">{node.units}</span>
                    <span className="units-label">units</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="node-children">
            {node.children.map(child => (
              <TreeNode key={child.name} node={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="typology-framework">
      <div className="framework-header">
        <div className="header-content">
          <h3>IUCN Global Ecosystem Typology</h3>
          <p>Hierarchical classification system organizing Earth's ecosystems by functional characteristics</p>
        </div>
        <div className="view-controls">
          <button
            className={`view-button ${viewMode === 'hierarchy' ? 'active' : ''}`}
            onClick={() => setViewMode('hierarchy')}
          >
            Hierarchy
          </button>
          <button
            className={`view-button ${viewMode === 'details' ? 'active' : ''}`}
            onClick={() => setViewMode('details')}
          >
            Details
          </button>
        </div>
      </div>

      <div className="framework-body">
        <div className="hierarchy-panel">
          <div className="panel-header">
            <h4>Classification Hierarchy</h4>
            <p>Click to explore each level of the typology</p>
          </div>

          <div className="tree-container">
            <TreeNode node={typologyData} />
          </div>
        </div>

        <div className="details-panel">
          <div className="panel-header">
            <h4>Level Details</h4>
            <p>Selected: {selectedNode.name}</p>
          </div>

          <div className="details-content">
            <div className="details-main">
              <div className="level-info">
                <div className="level-header">
                  <div className="level-indicator" style={{ '--level-color': getLevelColor(selectedNode.level) }}>
                    <span className="level-text">Level {selectedNode.level}</span>
                  </div>
                  <h3>{selectedNode.name}</h3>
                </div>

                <div className="classification-meta">
                  <div className="meta-item">
                    <span className="meta-label">Classification Code</span>
                    <span className="meta-value">{selectedNode.code}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Number of Units</span>
                    <span className="meta-value">{selectedNode.units}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Spatial Coverage</span>
                    <span className="meta-value">{selectedNode.coverage}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Key Process</span>
                    <span className="meta-value">{selectedNode.keyProcess}</span>
                  </div>
                </div>
              </div>

              <div className="description-section">
                <h5>Description</h5>
                <p>{selectedNode.description}</p>
              </div>

              {selectedNode.examples && (
                <div className="examples-section">
                  <h5>Representative Examples</h5>
                  <div className="examples-grid">
                    {selectedNode.examples.map((example, index) => (
                      <div key={index} className="example-item">
                        <div className="example-dot"></div>
                        <span className="example-text">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="framework-footer">
        <div className="classification-note">
          <p><strong>Classification Methodology:</strong> The IUCN Global Ecosystem Typology uses a deductive, top-down approach based on ecological theory and expert knowledge to create a comprehensive, globally applicable framework.</p>
        </div>
      </div>
    </div>
  );
}

const styles = `
  .typology-framework {
    margin: 3rem 0;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 2px;
    overflow: hidden;
  }

  .framework-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 2rem 2rem 1.5rem 2rem;
    border-bottom: 1px solid var(--color-border);
    background: var(--color-bg-alt);
  }

  .header-content h3 {
    font-family: var(--font-sans);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text);
    margin: 0 0 0.5rem 0;
    letter-spacing: -0.02em;
  }

  .header-content p {
    font-family: var(--font-sans);
    font-size: 0.95rem;
    color: var(--color-text-muted);
    margin: 0;
    line-height: 1.4;
  }

  .view-controls {
    display: flex;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 2px;
    overflow: hidden;
  }

  .view-button {
    padding: 0.5rem 1rem;
    background: transparent;
    border: none;
    font-family: var(--font-sans);
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-text-muted);
    cursor: pointer;
    transition: all 0.2s ease;
    border-right: 1px solid var(--color-border);
  }

  .view-button:last-child {
    border-right: none;
  }

  .view-button.active {
    background: var(--color-primary);
    color: white;
  }

  .view-button:not(.active):hover {
    background: var(--color-bg-alt);
    color: var(--color-text);
  }

  .framework-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 600px;
  }

  .hierarchy-panel,
  .details-panel {
    border-right: 1px solid var(--color-border);
  }

  .details-panel {
    border-right: none;
  }

  .panel-header {
    padding: 1.5rem 2rem 1rem 2rem;
    border-bottom: 1px solid var(--color-border);
    background: var(--color-bg-alt);
  }

  .panel-header h4 {
    font-family: var(--font-sans);
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-text);
    margin: 0 0 0.25rem 0;
  }

  .panel-header p {
    font-family: var(--font-sans);
    font-size: 0.85rem;
    color: var(--color-text-muted);
    margin: 0;
  }

  .tree-container {
    padding: 1rem;
    max-height: 500px;
    overflow-y: auto;
  }

  .tree-node {
    margin-bottom: 0.5rem;
  }

  .node-header {
    padding: 0.75rem 1rem;
    border: 1px solid var(--color-border);
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: var(--color-bg);
    margin-left: calc(var(--node-depth) * 1.5rem);
  }

  .node-header:hover {
    background: var(--color-bg-alt);
    border-color: var(--level-color);
  }

  .node-header.selected {
    background: var(--color-bg-alt);
    border-color: var(--level-color);
    border-left-width: 3px;
  }

  .node-main {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .node-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .expand-button {
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    cursor: pointer;
    color: var(--color-text-muted);
    transition: all 0.2s ease;
    border-radius: 2px;
  }

  .expand-button:hover {
    background: var(--color-bg-alt);
    color: var(--color-text);
  }

  .expand-button.expanded svg {
    transform: rotate(180deg);
  }

  .level-badge {
    width: 24px;
    height: 24px;
    background: var(--level-color);
    color: white;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .level-number {
    font-family: var(--font-sans);
    font-size: 0.75rem;
    font-weight: 700;
  }

  .node-content {
    flex: 1;
  }

  .node-title h4 {
    font-family: var(--font-serif);
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text);
    margin: 0 0 0.25rem 0;
    line-height: 1.2;
  }

  .node-meta {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .code-badge {
    font-family: var(--font-sans);
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--color-text-muted);
    background: var(--color-bg-alt);
    padding: 0.2rem 0.5rem;
    border: 1px solid var(--color-border);
    border-radius: 2px;
  }

  .units-badge {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-family: var(--font-sans);
    font-size: 0.7rem;
  }

  .units-number {
    font-weight: 700;
    color: var(--color-text);
  }

  .units-label {
    font-weight: 500;
    color: var(--color-text-muted);
  }

  .node-children {
    margin-top: 0.5rem;
  }

  .details-content {
    padding: 2rem;
    height: 500px;
    overflow-y: auto;
  }

  .level-info {
    margin-bottom: 2rem;
  }

  .level-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .level-indicator {
    padding: 0.5rem 1rem;
    background: var(--level-color);
    color: white;
    border-radius: 2px;
    flex-shrink: 0;
  }

  .level-text {
    font-family: var(--font-sans);
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .level-header h3 {
    font-family: var(--font-serif);
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-text);
    margin: 0;
    line-height: 1.2;
  }

  .classification-meta {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .meta-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.75rem;
    background: var(--color-bg-alt);
    border: 1px solid var(--color-border);
    border-radius: 2px;
  }

  .meta-label {
    font-family: var(--font-sans);
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .meta-value {
    font-family: var(--font-sans);
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--color-text);
  }

  .description-section,
  .examples-section {
    margin-bottom: 2rem;
  }

  .description-section h5,
  .examples-section h5 {
    font-family: var(--font-sans);
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--color-text);
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin: 0 0 1rem 0;
  }

  .description-section p {
    font-family: var(--font-sans);
    font-size: 1rem;
    line-height: 1.6;
    color: var(--color-text);
    margin: 0;
  }

  .examples-grid {
    display: grid;
    gap: 0.5rem;
  }

  .example-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background: var(--color-bg-alt);
    border: 1px solid var(--color-border);
    border-radius: 2px;
    transition: all 0.2s ease;
  }

  .example-item:hover {
    border-color: var(--color-primary);
  }

  .example-dot {
    width: 6px;
    height: 6px;
    background: var(--color-primary);
    border-radius: 50%;
    flex-shrink: 0;
  }

  .example-text {
    font-family: var(--font-sans);
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--color-text);
  }

  .framework-footer {
    padding: 1.5rem 2rem;
    background: var(--color-bg-alt);
    border-top: 1px solid var(--color-border);
  }

  .classification-note p {
    font-family: var(--font-sans);
    font-size: 0.9rem;
    line-height: 1.5;
    color: var(--color-text-muted);
    margin: 0;
  }

  @media (max-width: 768px) {
    .framework-header {
      flex-direction: column;
      gap: 1rem;
      align-items: stretch;
    }

    .framework-body {
      grid-template-columns: 1fr;
    }

    .details-panel {
      border-top: 1px solid var(--color-border);
    }

    .node-header {
      margin-left: calc(var(--node-depth) * 1rem);
    }

    .classification-meta {
      grid-template-columns: 1fr;
    }

    .level-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .node-header,
    .expand-button,
    .example-item {
      transition: none;
    }

    .expand-button.expanded svg {
      transform: none;
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}