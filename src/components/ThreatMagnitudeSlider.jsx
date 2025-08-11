// Enhanced ThreatMagnitudeSlider.jsx - More scientific and visually sophisticated
import { useState, useEffect, useRef } from 'preact/hooks';

export function ThreatMagnitudeSlider() {
  const [selectedThreat, setSelectedThreat] = useState('extinction');
  const [isAnimating, setIsAnimating] = useState(false);
  const chartRef = useRef(null);

  const threats = {
    extinction: {
      title: "Biodiversity Loss Rate",
      current: 1000,
      natural: 1,
      unit: "times natural background rate",
      description: "Current extinction rates are 100-1,000× higher than natural background rates",
      color: "#dc2626",
      gradient: ["#dc2626", "#ef4444"],
      icon: "🦋",
      source: "IPBES Global Assessment 2019",
      scale: "logarithmic"
    },
    coral: {
      title: "Coral Reef Degradation",
      current: 50,
      target: 10,
      unit: "% of reefs degraded",
      description: "50% of coral reefs degraded in just 30 years due to warming and acidification",
      color: "#ea580c",
      gradient: ["#ea580c", "#f97316"],
      icon: "🪸",
      source: "UNEP Coral Reef Unit 2021",
      scale: "linear"
    },
    wetlands: {
      title: "Wetland Loss Since 1700",
      current: 85,
      target: 15,
      unit: "% lost globally",
      description: "85% of wetlands lost - the most severe ecosystem impact globally",
      color: "#2563eb",
      gradient: ["#2563eb", "#3b82f6"],
      icon: "🌿",
      source: "Ramsar Convention 2021",
      scale: "linear"
    },
    vertebrates: {
      title: "Vertebrate Population Decline",
      current: 69,
      baseline: 0,
      unit: "% decline since 1970",
      description: "Living Planet Index shows 69% average decline in vertebrate populations",
      color: "#7c3aed",
      gradient: ["#7c3aed", "#8b5cf6"],
      icon: "🐘",
      source: "WWF Living Planet Report 2022",
      scale: "linear"
    },
    ocean: {
      title: "Ocean Temperature Anomaly",
      current: 1.1,
      safe: 0.5,
      unit: "°C above 20th century average",
      description: "Ocean warming drives marine ecosystem disruption and coral bleaching",
      color: "#059669",
      gradient: ["#059669", "#10b981"],
      icon: "🌊",
      source: "NOAA Ocean Climate Indicators 2023",
      scale: "linear"
    }
  };

  const threat = threats[selectedThreat];

  // Enhanced visualization with D3-style animation
  useEffect(() => {
    if (!chartRef.current) return;

    const canvas = chartRef.current;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Create sophisticated gradient
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, threat.gradient[0]);
    gradient.addColorStop(1, threat.gradient[1]);

    // Calculate bar dimensions
    const maxValue = Math.max(threat.current, threat.target || threat.natural || threat.safe || 100);
    const barHeight = height * 0.6;
    const barY = (height - barHeight) / 2;

    let barWidth;
    if (threat.scale === 'logarithmic' && threat.natural) {
      barWidth = (Math.log10(threat.current) / Math.log10(maxValue)) * width * 0.8;
    } else {
      barWidth = (threat.current / maxValue) * width * 0.8;
    }

    // Animate bar growth
    let animationProgress = 0;
    const animate = () => {
      if (animationProgress < 1) {
        animationProgress += 0.02;

        ctx.clearRect(0, 0, width, height);

        // Draw background
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(20, barY, width * 0.8, barHeight);

        // Draw animated bar
        const currentWidth = barWidth * animationProgress;
        ctx.fillStyle = gradient;
        ctx.fillRect(20, barY, currentWidth, barHeight);

        // Add glow effect
        ctx.shadowColor = threat.color;
        ctx.shadowBlur = 10;
        ctx.fillRect(20, barY, currentWidth, barHeight);
        ctx.shadowBlur = 0;

        // Draw target line if exists
        if (threat.target || threat.safe) {
          const targetValue = threat.target || threat.safe;
          const targetX = 20 + (targetValue / maxValue) * width * 0.8;
          ctx.strokeStyle = '#1f2937';
          ctx.lineWidth = 3;
          ctx.setLineDash([5, 5]);
          ctx.beginPath();
          ctx.moveTo(targetX, barY - 10);
          ctx.lineTo(targetX, barY + barHeight + 10);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [selectedThreat]);

  return (
    <div className="enhanced-threat-slider">
      <div className="threat-header">
        <h3>Global Environmental Threats: Scientific Assessment</h3>
        <p>Explore quantified environmental pressures with real scientific data and sources</p>
      </div>

      {/* Advanced threat selector with icons */}
      <div className="threat-grid">
        {Object.entries(threats).map(([key, t]) => (
          <button
            key={key}
            onClick={() => {
              setSelectedThreat(key);
              setIsAnimating(true);
            }}
            className={`threat-card ${selectedThreat === key ? 'active' : ''}`}
            style={{ '--threat-color': t.color }}
          >
            <div className="threat-icon">{t.icon}</div>
            <div className="threat-name">{t.title}</div>
            <div className="threat-value">
              {t.current}{t.unit.includes('times') ? '×' : t.unit.includes('%') ? '%' : t.unit.includes('°C') ? '°C' : ''}
            </div>
          </button>
        ))}
      </div>

      {/* Enhanced visualization */}
      <div className="threat-visualization">
        <div className="viz-header">
          <div className="threat-meta">
            <h4 style={{ color: threat.color }}>
              {threat.icon} {threat.title}
            </h4>
            <div className="scale-indicator">
              Scale: {threat.scale} | Source: {threat.source}
            </div>
          </div>
          <div className="current-value">
            <span className="value-number">{threat.current}</span>
            <span className="value-unit">{threat.unit}</span>
          </div>
        </div>

        {/* Canvas for sophisticated visualization */}
        <canvas
          ref={chartRef}
          width={800}
          height={120}
          className="threat-canvas"
        />

        {/* Reference values */}
        <div className="reference-values">
          {threat.natural && (
            <div className="ref-value natural">
              <span className="ref-label">Natural rate:</span>
              <span className="ref-number">{threat.natural}{threat.unit}</span>
            </div>
          )}
          {threat.target && (
            <div className="ref-value target">
              <span className="ref-label">Target limit:</span>
              <span className="ref-number">{threat.target}{threat.unit}</span>
            </div>
          )}
          {threat.safe && (
            <div className="ref-value safe">
              <span className="ref-label">Safe threshold:</span>
              <span className="ref-number">{threat.safe}{threat.unit}</span>
            </div>
          )}
        </div>

        <div className="threat-description">
          <p>{threat.description}</p>
        </div>
      </div>

      <style jsx>{`
        .enhanced-threat-slider {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 2rem;
          margin: 2rem 0;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
        }

        .threat-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .threat-header h3 {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          color: var(--color-primary);
          margin: 0 0 0.5rem 0;
        }

        .threat-header p {
          color: var(--color-text-muted);
          font-size: 1rem;
          margin: 0;
        }

        .threat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
          margin: 2rem 0;
        }

        .threat-card {
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.5rem 1rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .threat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--threat-color);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .threat-card:hover::before {
          transform: scaleX(1);
        }

        .threat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          border-color: var(--threat-color);
        }

        .threat-card.active {
          border-color: var(--threat-color);
          background: linear-gradient(135deg, white 0%, color-mix(in srgb, var(--threat-color), transparent 95%) 100%);
          transform: translateY(-2px);
        }

        .threat-card.active::before {
          transform: scaleX(1);
        }

        .threat-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .threat-name {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--color-text);
          margin-bottom: 0.5rem;
        }

        .threat-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--threat-color);
        }

        .threat-visualization {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          margin-top: 1.5rem;
          border: 1px solid #e5e7eb;
        }

        .viz-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .threat-meta h4 {
          font-size: 1.5rem;
          margin: 0 0 0.5rem 0;
          font-family: var(--font-sans);
        }

        .scale-indicator {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          font-style: italic;
        }

        .current-value {
          text-align: right;
        }

        .value-number {
          font-size: 3rem;
          font-weight: 900;
          line-height: 1;
        }

        .value-unit {
          font-size: 1rem;
          color: var(--color-text-muted);
          margin-left: 0.25rem;
        }

        .threat-canvas {
          width: 100%;
          height: 120px;
          border-radius: 8px;
          margin: 1rem 0;
        }

        .reference-values {
          display: flex;
          gap: 2rem;
          margin: 1.5rem 0;
          flex-wrap: wrap;
        }

        .ref-value {
          background: #f8fafc;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }

        .ref-label {
          display: block;
          font-size: 0.8rem;
          color: var(--color-text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.25rem;
        }

        .ref-number {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--color-text);
        }

        .threat-description {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          padding: 1.5rem;
          border-radius: 8px;
          border-left: 4px solid #0ea5e9;
          margin-top: 1.5rem;
        }

        .threat-description p {
          margin: 0;
          font-style: italic;
          color: var(--color-text);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .viz-header {
            flex-direction: column;
            gap: 1rem;
          }

          .current-value {
            text-align: left;
          }

          .reference-values {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

// Enhanced PlanetaryBoundariesWheel.jsx - More scientific accuracy
export function PlanetaryBoundariesWheel() {
  const [selectedBoundary, setSelectedBoundary] = useState('climate');
  const [isLoaded, setIsLoaded] = useState(false);

  // Updated with latest scientific data (2023/2024)
  const boundaries = {
    climate: {
      name: "Climate Change",
      current: 421,
      safe: 350,
      dangerous: 450,
      unit: "ppm CO₂",
      status: "exceeded",
      color: "#dc2626",
      angle: 0,
      details: "Atmospheric CO₂ levels have exceeded safe limits. Current trajectory leads to 2-3°C warming.",
      tipping: "1.5°C warming threshold likely crossed by 2030",
      source: "IPCC AR6, NOAA 2024"
    },
    biodiversity: {
      name: "Biosphere Integrity",
      current: 1000,
      safe: 1,
      unit: "×10 E/MSY*",
      status: "exceeded",
      color: "#b91c1c",
      angle: 51,
      details: "Extinction rates 100-1,000× higher than natural background. Ecosystem function severely compromised.",
      tipping: "Cascading ecosystem collapse in multiple biomes",
      source: "IPBES 2019, Steffen et al. 2015"
    },
    nitrogen: {
      name: "Biogeochemical Flows",
      current: 150,
      safe: 62,
      unit: "Tg N/yr to ocean",
      status: "exceeded",
      color: "#ea580c",
      angle: 102,
      details: "Nitrogen and phosphorus cycles severely disrupted by industrial agriculture and fertilizer use.",
      tipping: "Widespread eutrophication and dead zones",
      source: "Richardson et al. 2023"
    },
    acidification: {
      name: "Ocean Acidification",
      current: 2.9,
      safe: 2.75,
      unit: "Ω arag",
      status: "approaching",
      color: "#d97706",
      angle: 153,
      details: "Ocean pH declining due to CO₂ absorption. Carbonate saturation approaching critical levels.",
      tipping: "Collapse of calcifying marine organisms",
      source: "Jiang et al. 2023"
    },
    freshwater: {
      name: "Freshwater Change",
      current: 2800,
      safe: 4000,
      unit: "km³/year",
      status: "safe",
      color: "#059669",
      angle: 204,
      details: "Global freshwater use within safe limits, but severe regional water stress in many areas.",
      tipping: "Regional water conflicts and ecosystem collapse",
      source: "Gleeson et al. 2020"
    },
    landuse: {
      name: "Land-System Change",
      current: 12,
      safe: 15,
      unit: "% converted to crops",
      status: "approaching",
      color: "#d97706",
      angle: 255,
      details: "Approaching safe limits for cropland expansion. Habitat fragmentation accelerating.",
      tipping: "Biodiversity collapse in agricultural landscapes",
      source: "Newbold et al. 2016"
    },
    ozone: {
      name: "Stratospheric Ozone",
      current: 5,
      safe: 5,
      unit: "% below 1980 levels",
      status: "safe",
      color: "#059669",
      angle: 306,
      details: "Montreal Protocol success story. Ozone layer recovering but still vulnerable to new threats.",
      tipping: "UV radiation increase damaging ecosystems",
      source: "WMO Ozone Assessment 2022"
    },
    aerosols: {
      name: "Atmospheric Aerosols",
      current: 25,
      safe: 25,
      unit: "AOD* regional peak",
      status: "approaching",
      color: "#d97706",
      angle: 360,
      details: "Regional air pollution affects monsoons and climate. Not yet quantified globally.",
      tipping: "Disruption of regional climate patterns",
      source: "Steffen et al. 2015"
    }
  };

  const boundary = boundaries[selectedBoundary];
  const percentage = Math.min(100, (boundary.current / Math.max(boundary.safe, boundary.dangerous || boundary.safe)) * 100);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="enhanced-planetary-boundaries">
      <div className="boundaries-header">
        <h3>Planetary Boundaries Framework</h3>
        <p>Interactive exploration of Earth's safe operating space for humanity</p>
        <div className="framework-note">
          <strong>Note:</strong> *E/MSY = Extinctions per Million Species-Years | *AOD = Aerosol Optical Depth
        </div>
      </div>

      <div className="boundaries-container">
        {/* Interactive wheel */}
        <div className="wheel-section">
          <div className="wheel-wrapper">
            <svg viewBox="0 0 400 400" className="boundaries-wheel">
              {/* Background circle */}
              <circle cx="200" cy="200" r="180" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
              <circle cx="200" cy="200" r="120" fill="none" stroke="#e5e7eb" strokeWidth="1"/>

              {/* Boundary segments */}
              {Object.entries(boundaries).map(([key, b], index) => {
                const isActive = selectedBoundary === key;
                const startAngle = b.angle - 22.5;
                const endAngle = b.angle + 22.5;
                const outerRadius = isActive ? 190 : 180;
                const innerRadius = 120;

                const startAngleRad = (startAngle * Math.PI) / 180;
                const endAngleRad = (endAngle * Math.PI) / 180;

                const x1 = 200 + innerRadius * Math.cos(startAngleRad);
                const y1 = 200 + innerRadius * Math.sin(startAngleRad);
                const x2 = 200 + outerRadius * Math.cos(startAngleRad);
                const y2 = 200 + outerRadius * Math.sin(startAngleRad);
                const x3 = 200 + outerRadius * Math.cos(endAngleRad);
                const y3 = 200 + outerRadius * Math.sin(endAngleRad);
                const x4 = 200 + innerRadius * Math.cos(endAngleRad);
                const y4 = 200 + innerRadius * Math.sin(endAngleRad);

                const pathData = `M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1}`;

                return (
                  <g key={key}>
                    <path
                      d={pathData}
                      fill={isActive ? b.color : `${b.color}80`}
                      stroke="white"
                      strokeWidth="2"
                      className="boundary-segment"
                      onClick={() => setSelectedBoundary(key)}
                      style={{
                        cursor: 'pointer',
                        filter: isActive ? 'drop-shadow(0 0 8px rgba(0,0,0,0.3))' : 'none',
                        transition: 'all 0.3s ease'
                      }}
                    />

                    {/* Status indicator */}
                    <circle
                      cx={200 + 150 * Math.cos((b.angle * Math.PI) / 180)}
                      cy={200 + 150 * Math.sin((b.angle * Math.PI) / 180)}
                      r="8"
                      fill={b.status === 'exceeded' ? '#dc2626' : b.status === 'approaching' ? '#d97706' : '#059669'}
                      stroke="white"
                      strokeWidth="2"
                    />
                  </g>
                );
              })}

              {/* Center display */}
              <circle cx="200" cy="200" r="110" fill="white" stroke="#e5e7eb" strokeWidth="2"/>
              <text x="200" y="190" textAnchor="middle" className="center-title" fill="#374151" fontSize="14" fontWeight="600">
                Earth System
              </text>
              <text x="200" y="210" textAnchor="middle" className="center-subtitle" fill="#6b7280" fontSize="12">
                Safe Operating Space
              </text>
            </svg>
          </div>

          {/* Legend */}
          <div className="status-legend">
            <div className="legend-item">
              <div className="legend-dot exceeded"></div>
              <span>Exceeded (High Risk)</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot approaching"></div>
              <span>Approaching (Increasing Risk)</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot safe"></div>
              <span>Safe (Low Risk)</span>
            </div>
          </div>
        </div>

        {/* Detailed information panel */}
        <div className="details-panel">
          <div className="boundary-header">
            <h4 style={{ color: boundary.color }}>
              {boundary.name}
            </h4>
            <div className={`status-badge ${boundary.status}`}>
              {boundary.status.toUpperCase()}
            </div>
          </div>

          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-label">Current Value</div>
              <div className="metric-value" style={{ color: boundary.color }}>
                {boundary.current} {boundary.unit}
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Safe Boundary</div>
              <div className="metric-value">
                {boundary.safe} {boundary.unit}
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Risk Level</div>
              <div className="progress-container">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${Math.min(100, percentage)}%`,
                      backgroundColor: boundary.color
                    }}
                  />
                </div>
                <span className="progress-text">{Math.round(percentage)}%</span>
              </div>
            </div>
          </div>

          <div className="boundary-details">
            <div className="detail-section">
              <h5>Current Status</h5>
              <p>{boundary.details}</p>
            </div>
            <div className="detail-section">
              <h5>Tipping Point Risk</h5>
              <p>{boundary.tipping}</p>
            </div>
            <div className="detail-section">
              <h5>Data Source</h5>
              <p className="source">{boundary.source}</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .enhanced-planetary-boundaries {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 2rem;
          margin: 2rem 0;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
        }

        .boundaries-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .boundaries-header h3 {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          color: var(--color-primary);
          margin: 0 0 0.5rem 0;
        }

        .boundaries-header p {
          color: var(--color-text-muted);
          margin: 0 0 1rem 0;
        }

        .framework-note {
          background: #f0f9ff;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.85rem;
          color: #0369a1;
          border: 1px solid #bae6fd;
        }

        .boundaries-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: start;
        }

        .wheel-section {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .wheel-wrapper {
          width: 100%;
          max-width: 400px;
          margin-bottom: 1.5rem;
        }

        .boundaries-wheel {
          width: 100%;
          height: auto;
        }

        .boundary-segment:hover {
          opacity: 0.8;
        }

        .status-legend {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          background: white;
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }

        .legend-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .legend-dot.exceeded { background: #dc2626; }
        .legend-dot.approaching { background: #d97706; }
        .legend-dot.safe { background: #059669; }

        .details-panel {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          border: 1px solid #e5e7eb;
        }

        .boundary-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .boundary-header h4 {
          font-size: 1.25rem;
          margin: 0;
          font-family: var(--font-sans);
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .status-badge.exceeded {
          background: #fee2e2;
          color: #dc2626;
        }

        .status-badge.approaching {
          background: #fef3c7;
          color: #d97706;
        }

        .status-badge.safe {
          background: #dcfce7;
          color: #059669;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .metric-card {
          background: #f8fafc;
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }

        .metric-card:last-child {
          grid-column: 1 / -1;
        }

        .metric-label {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.5rem;
        }

        .metric-value {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--color-text);
        }

        .progress-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .progress-bar {
          flex: 1;
          height: 8px;
          background: #f1f5f9;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.6s ease;
        }

        .progress-text {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-text-muted);
        }

        .boundary-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .detail-section h5 {
          font-size: 0.9rem;
          color: var(--color-primary);
          margin: 0 0 0.5rem 0;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-section p {
          margin: 0;
          line-height: 1.5;
          color: var(--color-text);
        }

        .source {
          font-style: italic;
          color: var(--color-text-muted) !important;
        }

        @media (max-width: 768px) {
          .boundaries-container {
            grid-template-columns: 1fr;
          }
          
          .metrics-grid {
            grid-template-columns: 1fr;
          }
          
          .metric-card:last-child {
            grid-column: 1;
          }
        }
      `}</style>
    </div>
  );
}

// Enhanced ConservationTimelineSlider.jsx - More scientific rigor
export function ConservationTimelineSlider() {
  const [selectedProject, setSelectedProject] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const intervalRef = useRef(null);

  // Updated with more recent data and scientific metrics
  const projects = [
    {
      title: "Yellowstone Wolf Reintroduction",
      location: "Greater Yellowstone Ecosystem, USA",
      timespan: "1995-2023",
      type: "Keystone Species Restoration",
      before: "Zero wolves (extirpated 1926)",
      after: "95-100 wolves in 8-10 packs",
      impact: "Trophic cascade: 70% reduction in elk browsing, willow recovery, beaver return",
      metrics: {
        species: "+15 species returned",
        vegetation: "+300% riparian vegetation",
        ecosystem: "Full trophic cascade restored"
      },
      cost: "$1M initial investment",
      benefit: "$35M annual tourism revenue",
      color: "#059669",
      evidence: "Ripple & Beschta 2012; Smith et al. 2020",
      coordinates: [44.6, -110.5]
    },
    {
      title: "Costa Rica Forest Recovery",
      location: "Costa Rica",
      timespan: "1985-2023",
      type: "National Payment for Ecosystem Services",
      before: "24% forest cover (1985)",
      after: "54% forest cover (2023)",
      impact: "PES program: $500M invested, 1M hectares under management",
      metrics: {
        carbon: "42 Mt CO₂ sequestered",
        biodiversity: "25% increase in species",
        economy: "$4.2B ecotourism revenue"
      },
      cost: "$500M over 25 years",
      benefit: "$4.2B tourism + ecosystem services",
      color: "#0891b2",
      evidence: "Daniels et al. 2010; Börner et al. 2017",
      coordinates: [9.7, -84.0]
    },
    {
      title: "China Loess Plateau Restoration",
      location: "Loess Plateau, China",
      timespan: "1999-2019",
      type: "Landscape-Scale Ecosystem Restoration",
      before: "640,000 km² severely degraded",
      after: "35,000 km² restored, 2.5M people benefited",
      impact: "Largest restoration project in history: $2.5B investment",
      metrics: {
        erosion: "85% reduction in soil loss",
        vegetation: "50% increase in cover",
        income: "60% increase in rural income"
      },
      cost: "$2.5B (World Bank + China)",
      benefit: "$12B in ecosystem services",
      color: "#7c3aed",
      evidence: "World Bank 2019; Chen et al. 2021",
      coordinates: [36.0, 109.0]
    },
    {
      title: "Rwanda Mountain Gorilla Recovery",
      location: "Volcanoes National Park, Rwanda",
      timespan: "1980-2023",
      type: "Flagship Species Conservation",
      before: "254 individuals (1981 census)",
      after: "1,063 individuals (2023 census)",
      impact: "Community-based conservation + anti-poaching: 300% population increase",
      metrics: {
        population: "320% increase",
        tourism: "$438M annual revenue",
        poverty: "41% reduction around park"
      },
      cost: "$200M conservation investment",
      benefit: "$438M annual tourism",
      color: "#dc2626",
      evidence: "Kalpers et al. 2003; ORTPN 2023",
      coordinates: [-1.5, 29.5]
    },
    {
      title: "Great Barrier Reef Restoration",
      location: "Great Barrier Reef, Australia",
      timespan: "2018-2023",
      type: "Marine Ecosystem Intervention",
      before: "50% coral cover lost (1985-2018)",
      after: "Coral cover stabilized, local recovery",
      impact: "Largest marine restoration: coral seeding, crown-of-thorns control",
      metrics: {
        coral: "15% cover increase (treated areas)",
        species: "200+ fish species recovering",
        tourism: "$6.4B industry protected"
      },
      cost: "$3B Reef 2050 Plan",
      benefit: "$6.4B annual tourism value",
      color: "#ea580c",
      evidence: "GBRMPA 2022; Hughes et al. 2023",
      coordinates: [-18.3, 147.7]
    }
  ];

  const project = projects[selectedProject];

  useEffect(() => {
    if (isAutoPlay) {
      intervalRef.current = setInterval(() => {
        setSelectedProject((prev) => (prev + 1) % projects.length);
      }, 6000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isAutoPlay]);

  return (
    <div className="enhanced-conservation-timeline">
      <div className="timeline-header">
        <h3>Conservation Success Stories: Evidence-Based Results</h3>
        <p>Scientifically documented conservation achievements with quantified outcomes</p>
        <div className="controls">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`autoplay-btn ${isAutoPlay ? 'active' : ''}`}
          >
            {isAutoPlay ? '⏸️ Pause' : '▶️ Auto Play'}
          </button>
        </div>
      </div>

      {/* Interactive timeline */}
      <div className="timeline-track">
        <div className="track-line">
          {projects.map((_, index) => (
            <div key={index} className="timeline-marker">
              <button
                className={`marker-btn ${selectedProject === index ? 'active' : ''}`}
                onClick={() => {
                  setSelectedProject(index);
                  setIsAutoPlay(false);
                }}
                style={{ '--project-color': projects[index].color }}
              >
                <span className="marker-year">
                  {projects[index].timespan.split('-')[0]}
                </span>
              </button>
            </div>
          ))}
        </div>
        <div
          className="progress-indicator"
          style={{
            width: `${((selectedProject + 1) / projects.length) * 100}%`,
            backgroundColor: project.color
          }}
        />
      </div>

      {/* Project showcase */}
      <div className="project-showcase">
        <div className="project-card">
          <div className="project-header">
            <div className="project-meta">
              <div className="project-type" style={{ backgroundColor: project.color }}>
                {project.type}
              </div>
              <h4 style={{ color: project.color }}>
                {project.title}
              </h4>
              <div className="project-location">
                📍 {project.location} • {project.timespan}
              </div>
            </div>
            <div className="project-impact">
              <div className="impact-metric">
                <div className="impact-label">Total Investment</div>
                <div className="impact-value">{project.cost}</div>
              </div>
              <div className="impact-metric">
                <div className="impact-label">Economic Return</div>
                <div className="impact-value">{project.benefit}</div>
              </div>
            </div>
          </div>

          <div className="transformation-display">
            <div className="before-after-grid">
              <div className="state-panel before">
                <div className="state-header">
                  <span className="state-label">BEFORE</span>
                  <span className="state-icon">❌</span>
                </div>
                <div className="state-content">
                  {project.before}
                </div>
              </div>

              <div className="transformation-arrow">
                <div className="arrow-body">
                  <span className="arrow-text">Scientific Intervention</span>
                  <div className="arrow-tip">→</div>
                </div>
              </div>

              <div className="state-panel after">
                <div className="state-header">
                  <span className="state-label">AFTER</span>
                  <span className="state-icon">✅</span>
                </div>
                <div className="state-content">
                  {project.after}
                </div>
              </div>
            </div>
          </div>

          <div className="scientific-metrics">
            <h5>Quantified Outcomes</h5>
            <div className="metrics-grid">
              {Object.entries(project.metrics).map(([key, value]) => (
                <div key={key} className="metric-item">
                  <div className="metric-key">{key}</div>
                  <div className="metric-value">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="evidence-section">
            <div className="impact-summary">
              <h5>Conservation Impact</h5>
              <p>{project.impact}</p>
            </div>
            <div className="scientific-evidence">
              <h5>Scientific Evidence</h5>
              <p className="evidence-citation">{project.evidence}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="navigation-controls">
        <button
          onClick={() => {
            setSelectedProject((prev) => (prev - 1 + projects.length) % projects.length);
            setIsAutoPlay(false);
          }}
          className="nav-btn prev"
        >
          ← Previous Case
        </button>

        <div className="project-counter">
          <span className="current">{selectedProject + 1}</span>
          <span className="separator">of</span>
          <span className="total">{projects.length}</span>
          <span className="label">Success Stories</span>
        </div>

        <button
          onClick={() => {
            setSelectedProject((prev) => (prev + 1) % projects.length);
            setIsAutoPlay(false);
          }}
          className="nav-btn next"
        >
          Next Case →
        </button>
      </div>

      <style jsx>{`
        .enhanced-conservation-timeline {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 2rem;
          margin: 2rem 0;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
        }

        .timeline-header {
          text-align: center;
          margin-bottom: 2rem;
          position: relative;
        }

        .timeline-header h3 {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          color: var(--color-primary);
          margin: 0 0 0.5rem 0;
        }

        .timeline-header p {
          color: var(--color-text-muted);
          margin: 0 0 1rem 0;
        }

        .controls {
          position: absolute;
          top: 0;
          right: 0;
        }

        .autoplay-btn {
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .autoplay-btn:hover {
          border-color: var(--color-primary);
        }

        .autoplay-btn.active {
          background: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
        }

        .timeline-track {
          position: relative;
          margin: 2rem 0;
          padding: 1rem 0;
        }

        .track-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .track-line::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 2px;
          background: #e5e7eb;
          z-index: 1;
        }

        .progress-indicator {
          position: absolute;
          top: 50%;
          left: 0;
          height: 4px;
          border-radius: 2px;
          transition: all 0.6s ease;
          z-index: 1;
          transform: translateY(-50%);
        }

        .timeline-marker {
          position: relative;
          z-index: 3;
        }

        .marker-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 3px solid white;
          background: #f1f5f9;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .marker-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        .marker-btn.active {
          background: var(--project-color);
          color: white;
          transform: scale(1.2);
          box-shadow: 0 0 20px var(--project-color);
        }

        .marker-year {
          font-size: 0.8rem;
          font-weight: 700;
        }

        .project-showcase {
          margin: 2rem 0;
        }

        .project-card {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          border: 1px solid #e5e7eb;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
        }

        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .project-type {
          display: inline-block;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 1rem;
        }

        .project-meta h4 {
          font-size: 1.5rem;
          margin: 0 0 0.5rem 0;
          font-family: var(--font-sans);
        }

        .project-location {
          color: var(--color-text-muted);
          font-size: 0.95rem;
        }

        .project-impact {
          display: flex;
          gap: 2rem;
        }

        .impact-metric {
          text-align: right;
        }

        .impact-label {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .impact-value {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--color-text);
          margin-top: 0.25rem;
        }

        .transformation-display {
          margin: 2rem 0;
        }

        .before-after-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 1.5rem;
          align-items: center;
        }

        .state-panel {
          background: #f8fafc;
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          border: 2px solid;
        }

        .state-panel.before {
          border-color: #ef4444;
          background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
        }

        .state-panel.after {
          border-color: #10b981;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
        }

        .state-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .state-label {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--color-text-muted);
        }

        .state-icon {
          font-size: 1.2rem;
        }

        .state-content {
          font-weight: 600;
          color: var(--color-text);
          line-height: 1.4;
        }

        .transformation-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .arrow-body {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .arrow-text {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .arrow-tip {
          font-size: 2rem;
          color: var(--color-accent);
          font-weight: bold;
        }

        .scientific-metrics {
          background: #f0f9ff;
          border-radius: 12px;
          padding: 1.5rem;
          margin: 2rem 0;
          border: 1px solid #bae6fd;
        }

        .scientific-metrics h5 {
          margin: 0 0 1rem 0;
          color: #0369a1;
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .metric-item {
          background: white;
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid #e0f2fe;
        }

        .metric-key {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.5rem;
        }

        .metric-value {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0369a1;
        }

        .evidence-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 2rem;
        }

        .evidence-section h5 {
          margin: 0 0 0.75rem 0;
          color: var(--color-primary);
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .evidence-section p {
          margin: 0;
          line-height: 1.5;
          color: var(--color-text);
        }

        .evidence-citation {
          font-style: italic;
          color: var(--color-text-muted) !important;
          font-size: 0.9rem;
        }

        .navigation-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #e5e7eb;
        }

        .nav-btn {
          background: var(--color-primary);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-btn:hover {
          background: var(--color-accent);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .project-counter {
          text-align: center;
        }

        .current {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-primary);
        }

        .separator {
          margin: 0 0.5rem;
          color: var(--color-text-muted);
        }

        .total {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--color-text);
        }

        .label {
          display: block;
          font-size: 0.8rem;
          color: var(--color-text-muted);
          margin-top: 0.25rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        @media (max-width: 768px) {
          .before-after-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .transformation-arrow {
            order: 2;
          }

          .arrow-tip {
            transform: rotate(90deg);
          }

          .project-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .project-impact {
            width: 100%;
            justify-content: space-between;
          }

          .evidence-section {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .navigation-controls {
            flex-direction: column;
            gap: 1rem;
          }

          .controls {
            position: static;
            margin-top: 1rem;
          }
        }
      `}</style>
    </div>
  );
}