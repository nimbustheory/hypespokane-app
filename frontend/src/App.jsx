import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [health, setHealth] = useState(null)
  const [venues, setVenues] = useState([])
  const [loading, setLoading] = useState(true)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  useEffect(() => {
    fetch(`${API_URL}/api/health`)
      .then(res => res.json())
      .then(data => {
        setHealth(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Backend connection failed:', err)
        setLoading(false)
      })

    fetch(`${API_URL}/api/venues`)
      .then(res => res.json())
      .then(data => setVenues(data))
      .catch(err => console.error('Failed to fetch venues:', err))
  }, [])

  return (
    <div className="App">
      <h1>🎉 HypeSpokane</h1>
      
      <div style={{ margin: '20px', padding: '20px', background: '#f0f0f0', borderRadius: '8px' }}>
        <h2>Backend Status</h2>
        {loading ? (
          <p>Connecting to backend...</p>
        ) : health ? (
          <div>
            <p>✅ Status: {health.status}</p>
            <p>📡 Message: {health.message}</p>
            <p>🕐 Time: {new Date(health.timestamp).toLocaleString()}</p>
          </div>
        ) : (
          <p>❌ Backend connection failed</p>
        )}
      </div>

      <div style={{ margin: '20px', padding: '20px', background: '#f0f0f0', borderRadius: '8px' }}>
        <h2>Venues ({venues.length})</h2>
        {venues.length === 0 ? (
          <p>No venues yet. Database is empty but connected!</p>
        ) : (
          <ul>
            {venues.map(venue => (
              <li key={venue.id}>{venue.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
