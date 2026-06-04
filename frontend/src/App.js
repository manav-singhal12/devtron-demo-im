import React, { useState } from 'react';

export default function App() {
  const [region, setRegion] = useState('Mumbai');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const backendBase = process.env.REACT_APP_BACKEND || 'http://localhost:4000';

  async function search() {
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const res = await fetch(`${backendBase}/api/recommendations?region=${encodeURIComponent(region)}&top=10`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <h2>Region Weighted Search</h2>
      <div style={{ marginBottom: 12 }}>
        <input value={region} onChange={(e) => setRegion(e.target.value)} placeholder="Enter region (city or state)" />
        <button onClick={search} style={{ marginLeft: 8 }}>Search</button>
      </div>

      {loading && <div>Loading…</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {results && (
        <div>
          <div style={{ marginBottom: 8 }}>
            Results for <strong>{results.query}</strong> — {results.totalMatched} matched
          </div>

          <div style={{ marginBottom: 12 }}>
            <strong>Weights</strong>: location={Number(results.weights.location).toFixed(2)}, rating={Number(results.weights.rating).toFixed(2)}, frequency={Number(results.weights.frequency).toFixed(2)}
          </div>

          <div style={{ marginBottom: 16 }}>
            <h3>Top Results</h3>
            <ol>
              {results.topResults.map((s) => (
                <li key={s.id} style={{ marginBottom: 6 }}>
                  <strong>{s.name}</strong> — {s.category} — {s.city}, {s.region} — rating: {s.rating} — score: {Number(s.finalScore).toFixed(4)}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3>By Category</h3>
            {Object.entries(results.byCategory).map(([cat, arr]) => (
              <div key={cat} style={{ border: '1px solid #ddd', padding: 10, marginBottom: 10 }}>
                <div style={{ fontWeight: 'bold' }}>{cat} — {arr.length} suppliers</div>
                <ul>
                  {arr.map((s) => (
                    <li key={s.id}>
                      <strong>{s.name}</strong> — {s.city}, {s.region} — rating: {s.rating} — score: {Number(s.finalScore).toFixed(4)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
