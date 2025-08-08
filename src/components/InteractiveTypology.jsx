import { h } from 'preact';
import { useState, useCallback } from 'preact/hooks';
import 'bootstrap-icons/font/bootstrap-icons.css';

// The data structure representing the hierarchy of the diagram
const typologyData = {
  name: 'Biosphere',
  level: 0,
  description: 'The global ecological system integrating all living beings and their relationships, including their interaction with the elements of the lithosphere, geosphere, hydrosphere, and atmosphere.',
  children: [
    {
      name: '1. Realms',
      level: 1,
      description: 'The highest level, dividing Earth into five fundamental spheres based on the medium supporting life: Terrestrial, Freshwater, Marine, Subterranean, and Atmospheric.',
      children: [
        {
          name: '2. Biomes',
          level: 2,
          description: 'Within each realm, ecosystems group into 25 functional biomes that share similar ecological processes and environmental constraints (e.g., Tropical Forests, Deserts, Coral Reefs).',
          children: [
            {
              name: '3. Functional Groups',
              level: 3,
              description: 'Over 110 specific ecosystem units that share similar assembly processes and functions within each biome (e.g., Lowland Rainforests, Montane Cloud Forests).',
              children: [
                { name: '4. Biogeographic Ecotypes', level: 4, description: 'Regional manifestations of a functional group, reflecting unique species compositions due to biogeographic history (e.g., Amazonian Lowland Rainforest).', children: [] },
                { name: '5. Global Ecosystem Types', level: 5, description: 'Fine-scale units based on specific biotic and abiotic compositions, often mapped at a global scale.', children: [] },
                { name: '6. Local Ecosystem Types', level: 6, description: 'The most detailed level, corresponding to local mapping units and vegetation classifications used in specific regions or countries.', children: [] },
              ]
            }
          ]
        }
      ]
    }
  ]
};

// A recursive component to render each node in the tree
const Node = ({ node, onSelect, selectedNode, expandedNodes, onToggleExpand }) => {
  const isSelected = selectedNode && selectedNode.name === node.name;
  const isExpanded = expandedNodes[node.name];

  const handleNodeClick = () => {
    onSelect(node);
    onToggleExpand(node.name);
  };

  return (
    <li className={`level-${node.level}`}>
      <div className={`node-content ${isSelected ? 'selected' : ''}`}>
        <button onClick={handleNodeClick} className="node-button">
          {node.children.length > 0 && (
            <span className={`toggle-icon ${isExpanded ? 'expanded' : ''}`}>
              <i className="bi bi-chevron-right"></i>
            </span>
          )}
          <span className="node-name">{node.name}</span>
        </button>
      </div>
      {isExpanded && node.children.length > 0 && (
        <ul className="children-list">
          {node.children.map(child => (
            <Node
              key={child.name}
              node={child}
              onSelect={onSelect}
              selectedNode={selectedNode}
              expandedNodes={expandedNodes}
              onToggleExpand={onToggleExpand}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

// The main component that holds the state and layout
export default function InteractiveTypology() {
  const [selectedNode, setSelectedNode] = useState(typologyData);
  const [expandedNodes, setExpandedNodes] = useState({ 'Biosphere': true, '1. Realms': true });

  const handleToggleExpand = useCallback((nodeName) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeName]: !prev[nodeName]
    }));
  }, []);

  return (
    <div className="typology-wrapper">
      <div className="diagram-panel">
        <ul className="tree-root">
          <Node
            node={typologyData}
            onSelect={setSelectedNode}
            selectedNode={selectedNode}
            expandedNodes={expandedNodes}
            onToggleExpand={handleToggleExpand}
          />
        </ul>
      </div>
      <div className="info-panel">
        {selectedNode ? (
          <>
            <h3 className="info-title">{selectedNode.name}</h3>
            <p className="info-description">{selectedNode.description}</p>
          </>
        ) : (
          <p>Click on a level to learn more.</p>
        )}
      </div>
      <style>{`
        .typology-wrapper {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin: 2.5rem 0;
          background-color: var(--color-bg-alt);
          border: 1px solid var(--color-border);
          border-radius: 12px;
          padding: 1.5rem;
        }
        @media (min-width: 768px) {
          .typology-wrapper {
            grid-template-columns: 1fr 1fr;
          }
        }
        .diagram-panel { font-family: var(--font-sans); }
        .tree-root, .children-list { list-style: none; padding-left: 0; }
        .children-list { padding-left: 24px; margin-top: 8px; position: relative; }
        .children-list::before {
            content: '';
            position: absolute;
            left: 0;
            top: -10px;
            bottom: 10px;
            width: 1px;
            background-color: var(--color-border);
        }
        .node-content { position: relative; }
        li::before {
            content: '';
            position: absolute;
            left: -24px;
            top: 18px;
            width: 24px;
            height: 1px;
            background-color: var(--color-border);
        }
        .tree-root > li::before {
            display: none;
        }

        .node-button {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            border: 1px solid var(--color-border);
            border-radius: 6px;
            background-color: var(--color-bg);
            color: var(--color-text);
            width: 100%;
            text-align: left;
            cursor: pointer;
            transition: all 0.2s;
        }
        .node-content.selected > .node-button {
            border-color: var(--color-primary);
            background-color: color-mix(in srgb, var(--color-primary), transparent 90%);
            color: var(--color-primary);
        }
        .node-button:hover {
            border-color: var(--color-accent);
        }
        .toggle-icon {
            display: inline-block;
            transition: transform 0.2s;
        }
        .toggle-icon.expanded {
            transform: rotate(90deg);
        }

        .info-panel {
            background-color: var(--color-bg);
            padding: 1.5rem;
            border-radius: 8px;
            border: 1px solid var(--color-border);
        }
        .info-title {
            font-family: var(--font-sans);
            font-size: 1.5rem;
            color: var(--color-primary);
            margin-top: 0 !important;
            margin-bottom: 1rem !important;
            border: none !important;
            padding: 0 !important;
        }
        .info-description {
            font-family: var(--font-serif);
            color: var(--color-text-muted);
            font-size: 1rem;
            line-height: 1.7;
        }
      `}</style>
    </div>
  );
}