import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

export default function Map({ center, zoom, markers }) {
  const mapRef = useRef(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  // Enhanced data with actual geographic boundaries for Mediterranean climate regions
  const mediterraneanRegions = [
    {
      name: "Mediterranean Basin",
      color: "#e11d48",
      glowColor: "rgba(225, 29, 72, 0.4)",
      coordinates: [
        // Simplified polygon covering Mediterranean climate areas
        [43.5, -9], [43.5, 3], [42, 9], [40, 15], [39, 23], [37, 28], [35, 33], [34, 35],
        [33, 36], [32, 35], [31, 33], [30, 30], [30, 25], [31, 20], [32, 15], [33, 10],
        [34, 5], [35, 0], [36, -5], [37, -8], [39, -9], [41, -9], [43.5, -9]
      ],
      species: 25000,
      endemism: 52,
      area: 2300000,
      keyFacts: ["Oldest Mediterranean climate region", "Cradle of civilization", "Most species-rich"]
    },
    {
      name: "California Floristic Province",
      color: "#7c3aed",
      glowColor: "rgba(124, 58, 237, 0.4)",
      coordinates: [
        [42, -124.5], [42, -119], [39, -119], [37, -118], [35, -117], [33, -117],
        [32, -117], [32, -119], [33, -120], [34, -121], [36, -122], [38, -123],
        [40, -124], [42, -124.5]
      ],
      species: 4426,
      endemism: 35,
      area: 324000,
      keyFacts: ["Home to coastal redwoods", "Silicon Valley biodiversity", "Fire-adapted chaparral"]
    },
    {
      name: "Central Chile",
      color: "#059669",
      glowColor: "rgba(5, 150, 105, 0.4)",
      coordinates: [
        [-30, -71.5], [-30, -70], [-33, -70], [-35, -70], [-37, -71], [-37, -73],
        [-35, -73.5], [-33, -73], [-30, -72], [-30, -71.5]
      ],
      species: 2400,
      endemism: 46,
      area: 90000,
      keyFacts: ["Smallest Mediterranean region", "Wine country", "Andes mountain backdrop"]
    },
    {
      name: "Cape Floristic Province",
      color: "#dc2626",
      glowColor: "rgba(220, 38, 38, 0.4)",
      coordinates: [
        [-32, 18], [-32, 21], [-33, 23], [-34, 24], [-35, 24], [-35, 22], [-34, 20],
        [-34, 18], [-33, 17], [-32, 18]
      ],
      species: 9000,
      endemism: 69,
      area: 90000,
      keyFacts: ["Highest endemism rate", "Fynbos vegetation", "Table Mountain region"]
    },
    {
      name: "Southwest Australia",
      color: "#2563eb",
      glowColor: "rgba(37, 99, 235, 0.4)",
      coordinates: [
        [-35, 115], [-35, 119], [-33, 120], [-31, 119], [-30, 117], [-31, 115],
        [-33, 114], [-35, 115]
      ],
      species: 7380,
      endemism: 49,
      area: 310000,
      keyFacts: ["Ancient landscapes", "Eucalyptus diversity", "Isolated evolution"]
    }
  ];

  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current) {
      import('leaflet').then(L => {
        if (mapRef.current && !mapRef.current._leaflet_id) {

          // Enhanced icon configuration
          delete L.Icon.Default.prototype._getIconUrl;
          L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
          });

          // Create map with enhanced styling
          const map = L.map(mapRef.current, {
            zoomControl: false,
            attributionControl: false,
            worldCopyJump: true,
            maxBounds: [[-90, -180], [90, 180]],
            maxBoundsViscosity: 1.0
          }).setView(center, zoom);

          // Beautiful dark tile layer
          L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap contributors © CARTO',
            maxZoom: 19,
            subdomains: 'abcd'
          }).addTo(map);

          // Add enhanced controls
          L.control.zoom({
            position: 'topright',
            zoomInTitle: 'Zoom in to explore regions',
            zoomOutTitle: 'Zoom out for global view'
          }).addTo(map);

          L.control.attribution({
            position: 'bottomright',
            prefix: false
          }).addTo(map);

          // Store region polygons for interaction
          const regionPolygons = [];

          // Add Mediterranean climate regions as colored polygons
          mediterraneanRegions.forEach((region, index) => {
            // Create the main region polygon
            const polygon = L.polygon(region.coordinates, {
              color: region.color,
              weight: 3,
              opacity: 0.9,
              fillColor: region.color,
              fillOpacity: 0.25,
              className: `region-${index}`,
              smoothFactor: 1.5
            }).addTo(map);

            // Create a glow effect polygon (slightly larger)
            const glowPolygon = L.polygon(region.coordinates, {
              color: region.glowColor,
              weight: 8,
              opacity: 0.3,
              fillColor: 'transparent',
              fillOpacity: 0,
              className: `glow-${index}`,
              interactive: false
            }).addTo(map);

            // Enhanced popup content
            const popupContent = `
              <div class="region-popup">
                <div class="popup-header" style="border-left: 4px solid ${region.color};">
                  <h3>${region.name}</h3>
                  <div class="region-badge" style="background: ${region.color};">
                    Mediterranean Climate
                  </div>
                </div>
                
                <div class="stats-container">
                  <div class="stat-row">
                    <div class="stat-box">
                      <div class="stat-number">${region.species.toLocaleString()}</div>
                      <div class="stat-label">Plant Species</div>
                    </div>
                    <div class="stat-box">
                      <div class="stat-number">${region.endemism}%</div>
                      <div class="stat-label">Endemic</div>
                    </div>
                    <div class="stat-box">
                      <div class="stat-number">${(region.area / 1000).toLocaleString()}k</div>
                      <div class="stat-label">km² Area</div>
                    </div>
                  </div>
                </div>

                <div class="key-facts">
                  <h4>Key Features:</h4>
                  <ul>
                    ${region.keyFacts.map(fact => `<li>${fact}</li>`).join('')}
                  </ul>
                </div>

                <div class="popup-footer">
                  <small>Mediterranean Climate Region ${index + 1} of 5</small>
                </div>
              </div>
            `;

            polygon.bindPopup(popupContent, {
              maxWidth: 380,
              className: 'custom-region-popup',
              offset: [0, -10]
            });

            // Enhanced hover interactions
            polygon.on('mouseover', function(e) {
              this.setStyle({
                weight: 4,
                fillOpacity: 0.4,
                opacity: 1
              });

              // Enhance glow effect
              glowPolygon.setStyle({
                weight: 12,
                opacity: 0.5
              });

              setHoveredRegion(region.name);

              // Bring to front
              this.bringToFront();
              glowPolygon.bringToFront();
              this.bringToFront(); // Ensure main polygon is on top
            });

            polygon.on('mouseout', function(e) {
              this.setStyle({
                weight: 3,
                fillOpacity: selectedRegion === region.name ? 0.35 : 0.25,
                opacity: 0.9
              });

              // Reset glow effect
              glowPolygon.setStyle({
                weight: 8,
                opacity: 0.3
              });

              if (selectedRegion !== region.name) {
                setHoveredRegion(null);
              }
            });

            polygon.on('click', function(e) {
              setSelectedRegion(region.name);

              // Highlight selected region
              regionPolygons.forEach(p => {
                if (p.polygon !== this) {
                  p.polygon.setStyle({ fillOpacity: 0.15, opacity: 0.6 });
                  p.glow.setStyle({ opacity: 0.2 });
                }
              });

              this.setStyle({ fillOpacity: 0.4, opacity: 1 });
              glowPolygon.setStyle({ opacity: 0.6 });

              // Smooth zoom to region bounds with padding
              const bounds = this.getBounds();
              map.fitBounds(bounds, {
                padding: [50, 50],
                maxZoom: 6,
                animate: true,
                duration: 1.2
              });
            });

            // Store references
            regionPolygons.push({
              polygon: polygon,
              glow: glowPolygon,
              data: region
            });
          });

          // Enhanced legend with region colors
          const legend = L.control({ position: 'bottomleft' });
          legend.onAdd = function(map) {
            const div = L.DomUtil.create('div', 'enhanced-legend');

            let legendContent = `
              <div class="legend-header">
                <h4>Mediterranean Climate Regions</h4>
                <p>5 regions • 2% of Earth's land • 20% of plant diversity</p>
              </div>
              <div class="legend-items">
            `;

            mediterraneanRegions.forEach(region => {
              legendContent += `
                <div class="legend-item" data-region="${region.name}">
                  <div class="legend-color" style="background: ${region.color}; box-shadow: 0 0 8px ${region.glowColor};"></div>
                  <div class="legend-text">
                    <span class="region-name">${region.name}</span>
                    <span class="region-stats">${region.species.toLocaleString()} species • ${region.endemism}% endemic</span>
                  </div>
                </div>
              `;
            });

            legendContent += `
              </div>
              <div class="legend-footer">
                <small>Click regions to explore • Hover for details</small>
              </div>
            `;

            div.innerHTML = legendContent;

            // Add legend interactions
            div.addEventListener('mouseover', (e) => {
              if (e.target.closest('.legend-item')) {
                const regionName = e.target.closest('.legend-item').dataset.region;
                const targetPolygon = regionPolygons.find(p => p.data.name === regionName);
                if (targetPolygon) {
                  targetPolygon.polygon.fire('mouseover');
                }
              }
            });

            div.addEventListener('mouseout', (e) => {
              if (e.target.closest('.legend-item')) {
                const regionName = e.target.closest('.legend-item').dataset.region;
                const targetPolygon = regionPolygons.find(p => p.data.name === regionName);
                if (targetPolygon) {
                  targetPolygon.polygon.fire('mouseout');
                }
              }
            });

            div.addEventListener('click', (e) => {
              if (e.target.closest('.legend-item')) {
                const regionName = e.target.closest('.legend-item').dataset.region;
                const targetPolygon = regionPolygons.find(p => p.data.name === regionName);
                if (targetPolygon) {
                  targetPolygon.polygon.fire('click');
                }
              }
            });

            return div;
          };
          legend.addTo(map);

          // Store map reference for cleanup
          mapRef.current._leafletMap = map;
          mapRef.current._regionPolygons = regionPolygons;
        }
      });
    }
  }, [center, zoom, markers]);

  return (
    <div className="visual-map-container">
      <div ref={mapRef} className="map-display"></div>

      {/* Enhanced hover panel */}
      {hoveredRegion && (
        <div className="hover-panel">
          <div className="hover-content">
            <h4>{hoveredRegion}</h4>
            <p>Mediterranean climate ecosystem</p>
            <div className="hover-hint">
              <span>Click to explore this region</span>
            </div>
          </div>
        </div>
      )}

      {/* Reset view button */}
      <button
        className="reset-view-btn"
        onClick={() => {
          if (mapRef.current?._leafletMap) {
            mapRef.current._leafletMap.setView(center, zoom, { animate: true, duration: 1 });
            setSelectedRegion(null);
            setHoveredRegion(null);

            // Reset all region styles
            if (mapRef.current._regionPolygons) {
              mapRef.current._regionPolygons.forEach(({ polygon, glow }) => {
                polygon.setStyle({ fillOpacity: 0.25, opacity: 0.9 });
                glow.setStyle({ opacity: 0.3 });
              });
            }
          }
        }}
        title="Reset to global view"
      >
        🌍 Global View
      </button>

      <style jsx>{`
        .visual-map-container {
          height: 800px;
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin: 2rem 0;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          position: relative;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.05);
        }

        .map-display {
          height: 100%;
          width: 100%;
        }

        /* Enhanced Legend Styling */
        :global(.enhanced-legend) {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(30, 41, 59, 0.96) 100%);
          color: white;
          padding: 2rem;
          border-radius: 16px;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          min-width: 400px;
          max-width: 450px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        :global(.legend-header h4) {
          margin: 0 0 0.75rem 0;
          color: #06b6d4;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.025em;
        }

        :global(.legend-header p) {
          margin: 0 0 2rem 0;
          font-size: 1rem;
          opacity: 0.9;
          color: #e2e8f0;
          line-height: 1.5;
          font-weight: 400;
        }

        :global(.legend-items) {
          margin-bottom: 1.5rem;
        }

        :global(.legend-item) {
          display: flex;
          align-items: center;
          margin-bottom: 1.25rem;
          padding: 1rem 1.25rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid transparent;
          background: rgba(255, 255, 255, 0.03);
        }

        :global(.legend-item:hover) {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateX(6px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        :global(.legend-color) {
          width: 24px;
          height: 24px;
          border-radius: 8px;
          margin-right: 1.25rem;
          border: 2px solid rgba(255, 255, 255, 0.4);
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        :global(.legend-item:hover .legend-color) {
          transform: scale(1.15);
          border-color: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
        }

        :global(.legend-text) {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        :global(.region-name) {
          font-weight: 600;
          font-size: 1.1rem;
          color: #f8fafc;
          margin-bottom: 0.375rem;
          letter-spacing: -0.01em;
        }

        :global(.region-stats) {
          font-size: 0.9rem;
          color: #cbd5e1;
          opacity: 0.95;
          line-height: 1.3;
          font-weight: 400;
        }

        :global(.legend-footer) {
          text-align: center;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
        }

        :global(.legend-footer small) {
          color: #94a3b8;
          font-size: 0.85rem;
          font-weight: 500;
        }

        /* Enhanced Hover Panel */
        .hover-panel {
          position: absolute;
          top: 30px;
          right: 30px;
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(30, 41, 59, 0.96) 100%);
          border-radius: 16px;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          z-index: 1000;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
          animation: slideInFromRight 0.3s ease-out;
          min-width: 320px;
        }

        .hover-content {
          padding: 2rem;
          color: white;
        }

        .hover-content h4 {
          margin: 0 0 0.75rem 0;
          color: #06b6d4;
          font-size: 1.375rem;
          font-weight: 700;
          letter-spacing: -0.025em;
        }

        .hover-content p {
          margin: 0 0 1rem 0;
          font-size: 1rem;
          color: #e2e8f0;
          opacity: 0.95;
          line-height: 1.4;
        }

        .hover-hint {
          padding: 0.875rem 1.125rem;
          background: rgba(6, 182, 212, 0.25);
          border-radius: 10px;
          border: 1px solid rgba(6, 182, 212, 0.4);
        }

        .hover-hint span {
          font-size: 0.9rem;
          color: #67e8f9;
          font-weight: 600;
          letter-spacing: 0.01em;
        }

        /* Reset View Button */
        .reset-view-btn {
          position: absolute;
          top: 30px;
          left: 30px;
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(30, 41, 59, 0.96) 100%);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.25);
          padding: 1rem 1.5rem;
          border-radius: 12px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          backdrop-filter: blur(20px);
          transition: all 0.3s ease;
          z-index: 1000;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          letter-spacing: 0.01em;
        }

        .reset-view-btn:hover {
          background: linear-gradient(135deg, rgba(79, 70, 229, 0.9) 0%, rgba(6, 182, 212, 0.9) 100%);
          border-color: rgba(79, 70, 229, 0.6);
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(79, 70, 229, 0.4);
        }

        /* Enhanced Popup Styling */
        :global(.leaflet-popup-content-wrapper) {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          color: #1e293b;
          border-radius: 20px;
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(0, 0, 0, 0.06);
          border: none;
          padding: 0;
          overflow: hidden;
          min-width: 420px;
        }

        :global(.leaflet-popup-tip) {
          background: white;
          border: none;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }

        :global(.region-popup) {
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        :global(.popup-header) {
          padding: 2rem 2rem 1.5rem 2rem;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          margin: 0;
          border-left: 6px solid;
        }

        :global(.popup-header h3) {
          margin: 0 0 1rem 0;
          font-size: 1.75rem;
          font-weight: 800;
          color: #1e293b;
          letter-spacing: -0.025em;
          line-height: 1.2;
        }

        :global(.region-badge) {
          display: inline-block;
          padding: 0.5rem 1.125rem;
          border-radius: 25px;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          color: white;
          letter-spacing: 0.75px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        :global(.stats-container) {
          padding: 2rem;
        }

        :global(.stat-row) {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        :global(.stat-box) {
          text-align: center;
          padding: 1.5rem;
          background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
          border-radius: 16px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          transition: transform 0.2s ease;
        }

        :global(.stat-box:hover) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        :global(.stat-number) {
          display: block;
          font-size: 2rem;
          font-weight: 900;
          color: #1e293b;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        :global(.stat-label) {
          font-size: 0.85rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.75px;
        }

        :global(.key-facts) {
          padding: 0 2rem;
          margin-bottom: 2rem;
        }

        :global(.key-facts h4) {
          margin: 0 0 1.25rem 0;
          font-size: 1.25rem;
          font-weight: 700;
          color: #374151;
          letter-spacing: -0.01em;
        }

        :global(.key-facts ul) {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        :global(.key-facts li) {
          padding: 0.875rem 0;
          font-size: 1rem;
          color: #4b5563;
          border-bottom: 1px solid #f3f4f6;
          position: relative;
          padding-left: 2rem;
          line-height: 1.5;
          font-weight: 500;
        }

        :global(.key-facts li:before) {
          content: "▶";
          color: #06b6d4;
          position: absolute;
          left: 0.5rem;
          font-weight: bold;
          font-size: 0.875rem;
        }

        :global(.key-facts li:last-child) {
          border-bottom: none;
        }

        :global(.popup-footer) {
          text-align: center;
          padding: 1.5rem 2rem 2rem 2rem;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }

        :global(.popup-footer small) {
          color: #64748b;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.025em;
        }

        /* Enhanced Controls */
        :global(.leaflet-control-zoom) {
          border: none !important;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25) !important;
        }

        :global(.leaflet-control-zoom a) {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(30, 41, 59, 0.96) 100%) !important;
          color: white !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          backdrop-filter: blur(20px);
          transition: all 0.3s ease !important;
          width: 48px !important;
          height: 48px !important;
          line-height: 46px !important;
          font-size: 24px !important;
          font-weight: bold !important;
          border-radius: 12px !important;
          margin-bottom: 4px !important;
        }

        :global(.leaflet-control-zoom a:hover) {
          background: linear-gradient(135deg, rgba(79, 70, 229, 0.9) 0%, rgba(6, 182, 212, 0.9) 100%) !important;
          transform: scale(1.08);
          border-color: rgba(79, 70, 229, 0.6) !important;
          box-shadow: 0 8px 24px rgba(79, 70, 229, 0.5) !important;
        }

        :global(.leaflet-control-attribution) {
          background: rgba(15, 23, 42, 0.9) !important;
          color: #cbd5e1 !important;
          backdrop-filter: blur(20px);
          border-radius: 12px 0 0 0 !important;
          border: 1px solid rgba(255, 255, 255, 0.15) !important;
          font-size: 0.85rem !important;
          padding: 0.75rem 1rem !important;
          font-weight: 500;
        }

        :global(.leaflet-control-attribution a) {
          color: #06b6d4 !important;
          font-weight: 600;
        }

        :global(.leaflet-popup-close-button) {
          font-size: 24px !important;
          padding: 12px !important;
          color: #64748b !important;
          background: #f1f5f9 !important;
          border-radius: 50% !important;
          width: 40px !important;
          height: 40px !important;
          right: 12px !important;
          top: 12px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: all 0.3s ease !important;
          border: 1px solid rgba(0, 0, 0, 0.1) !important;
          font-weight: bold !important;
        }

        :global(.leaflet-popup-close-button:hover) {
          color: #1e293b !important;
          background: #e2e8f0 !important;
          transform: scale(1.1) !important;
          border-color: rgba(0, 0, 0, 0.2) !important;
        }

        /* Animations */
        @keyframes slideInFromRight {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .visual-map-container {
            height: 700px;
          }

          :global(.enhanced-legend) {
            min-width: 350px;
            max-width: 380px;
            padding: 1.5rem;
          }

          :global(.legend-header h4) {
            font-size: 1.25rem;
          }

          .hover-panel {
            min-width: 280px;
          }

          :global(.leaflet-popup-content-wrapper) {
            min-width: 360px;
          }
        }

        @media (max-width: 768px) {
          .visual-map-container {
            height: 600px;
            border-radius: 12px;
          }

          :global(.enhanced-legend) {
            min-width: 300px;
            max-width: 320px;
            padding: 1.25rem;
          }

          :global(.legend-header h4) {
            font-size: 1.125rem;
          }

          :global(.legend-header p) {
            font-size: 0.9rem;
          }

          :global(.region-name) {
            font-size: 1rem;
          }

          :global(.region-stats) {
            font-size: 0.8rem;
          }

          .hover-panel {
            top: 15px;
            right: 15px;
            min-width: 260px;
          }

          .hover-content {
            padding: 1.5rem;
          }

          .hover-content h4 {
            font-size: 1.125rem;
          }

          .reset-view-btn {
            top: 15px;
            left: 15px;
            padding: 0.75rem 1.125rem;
            font-size: 0.9rem;
          }

          :global(.leaflet-popup-content-wrapper) {
            min-width: 300px;
          }

          :global(.popup-header) {
            padding: 1.5rem;
          }

          :global(.popup-header h3) {
            font-size: 1.5rem;
          }

          :global(.stats-container) {
            padding: 1.5rem;
          }

          :global(.stat-row) {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          :global(.stat-box) {
            padding: 1.25rem;
          }

          :global(.stat-number) {
            font-size: 1.75rem;
          }

          :global(.key-facts) {
            padding: 0 1.5rem;
          }

          :global(.key-facts h4) {
            font-size: 1.125rem;
          }

          :global(.key-facts li) {
            font-size: 0.9rem;
            padding: 0.75rem 0;
          }

          :global(.leaflet-control-zoom a) {
            width: 42px !important;
            height: 42px !important;
            line-height: 40px !important;
            font-size: 20px !important;
          }
        }

        @media (max-width: 480px) {
          .visual-map-container {
            height: 500px;
            margin: 1rem 0;
          }

          :global(.enhanced-legend) {
            min-width: 260px;
            max-width: 280px;
            padding: 1rem;
          }

          :global(.legend-item) {
            padding: 0.75rem;
          }

          .hover-panel {
            min-width: 240px;
          }

          .hover-content {
            padding: 1.25rem;
          }

          .reset-view-btn {
            padding: 0.625rem 1rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}