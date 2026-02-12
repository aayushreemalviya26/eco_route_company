import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import { analyzeRoute } from '../api';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './PlanRoute.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function MapUpdater({ coords }) {
  const map = useMap();
  if (coords && coords.length > 0) map.fitBounds(coords, { padding: [50, 50] });
  return null;
}

const PlanRoute = () => {
  const [inputs, setInputs] = useState({ start: '', end: '' });
  const [suggestions, setSuggestions] = useState({ start: [], end: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [routeData, setRouteData] = useState(null);

  const debounceTimer = useRef(null);

  const fetchSuggestions = (query, field) => {
    setInputs(prev => ({ ...prev, [field]: query }));
    if (query.length < 3) {
      setSuggestions(prev => ({ ...prev, [field]: [] }));
      return;
    }

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&singleLine=${encodeURIComponent(query)}&maxLocations=5`
        );
        const data = await res.json();
        const formatted = (data.candidates || []).map(c => ({
          display_name: c.address
        }));
        setSuggestions(prev => ({ ...prev, [field]: formatted }));
      } catch (e) {
        console.error("Suggestion error:", e);
      }
    }, 500);
  };

  const handleSelect = (place, field) => {
    setInputs(prev => ({ ...prev, [field]: place.display_name }));
    setSuggestions({ start: [], end: [] });
  };

  const handleCalculate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeRoute(inputs.start, inputs.end);
      const leafletCoords = data.route_geometry.map(c => [c[1], c[0]]);
      setRouteData({ ...data, leafletCoords });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="plan-route-container">
      <div className="search-card">
        <h2>🌿 Eco-Route Planner</h2>
        <form onSubmit={handleCalculate} autoComplete="off">
          <div className="input-group">
            <label>Starting Point</label>
            <input
              type="text"
              value={inputs.start}
              placeholder="Search origin..."
              onChange={(e) => fetchSuggestions(e.target.value, 'start')}
            />
            {suggestions.start.length > 0 && (
              <ul className="autocomplete-list">
                {suggestions.start.map((p, i) => (
                  <li key={i} onClick={() => handleSelect(p, 'start')}>{p.display_name}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="input-group">
            <label>Destination</label>
            <input
              type="text"
              value={inputs.end}
              placeholder="Search destination..."
              onChange={(e) => fetchSuggestions(e.target.value, 'end')}
            />
            {suggestions.end.length > 0 && (
              <ul className="autocomplete-list">
                {suggestions.end.map((p, i) => (
                  <li key={i} onClick={() => handleSelect(p, 'end')}>{p.display_name}</li>
                ))}
              </ul>
            )}
          </div>

          <button type="submit" className="calc-btn" disabled={loading}>
            {loading ? "Calculating Best Eco-Path..." : "Find Greenest Route"}
          </button>
        </form>

        {error && <div className="error-msg">⚠️ {error}</div>}

        {routeData && (
          <div className="eco-result-card fade-in">
            <div className="eco-badge-premium">
              <div className="indicator-dot"></div>
              OPTIMAL ENVIRONMENTAL PATH
            </div>

            <div className="eco-score-section">
              <div className="eco-score-header">
                <span className="eco-label">Efficiency Analysis</span>
                <span className="eco-value">{routeData.eco_score}<small>/100</small></span>
              </div>
              <div className="eco-progress-container">
                <div
                  className="eco-progress-bar"
                  style={{
                    width: `${routeData.eco_score}%`,
                    background: routeData.eco_score > 70 ? '#059669' : routeData.eco_score > 40 ? '#d97706' : '#dc2626'
                  }}
                ></div>
              </div>
            </div>

            <div className="eco-stats-row">
              <div className="eco-stat-box">
                <div className="stat-visual traffic-icon"></div>
                <div className="stat-content">
                  <label>Congestion Index</label>
                  <p className="stat-number">-{routeData.traffic_penalty} <small>pts</small></p>
                  <span className="stat-tag">{routeData.traffic_condition || 'Nominal'}</span>
                </div>
              </div>

              <div className="stat-box eco-stat-box">
                <div className="stat-visual terrain-icon"></div>
                <div className="stat-content">
                  <label>Vertical Displacement</label>
                  <p className="stat-number">-{routeData.terrain_penalty} <small>pts</small></p>
                  <span className="stat-tag">Terrain Impact</span>
                </div>
              </div>
            </div>

            <div className="eco-footer-metrics">
              <div className="metric-pill co2">
                <span className="metric-label">NET CO2 REDUCTION</span>
                <span className="metric-val">{routeData.co2_saved_kg} kg</span>
              </div>
              <div className="metric-pill distance">
                <span className="metric-label">TOTAL LOGISTICS</span>
                <span className="metric-val">{routeData.distance_km} km</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="map-card">
        <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {routeData && (
            <>
              <Marker position={routeData.start_coords} />
              <Marker position={routeData.end_coords} />
              <Polyline
                positions={routeData.leafletCoords}
                color="#00b894"
                weight={7}
                opacity={0.9}
              />
              <MapUpdater coords={routeData.leafletCoords} />
            </>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default PlanRoute;