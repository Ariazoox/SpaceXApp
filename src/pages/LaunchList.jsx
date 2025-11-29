import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { spacexApi } from '../services/spacexApi'
import './LaunchList.css'

function LaunchList() {
  const [launches, setLaunches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    loadLaunches()
  }, [page])

  const loadLaunches = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await spacexApi.getLaunches(page, 20)
      setLaunches(prev => [...prev, ...data.docs])
      setHasMore(data.hasNextPage)
    } catch (err) {
      setError('Error loading missions')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusColor = (success) => {
    if (success === null) return 'var(--spacex-warning)'
    return success ? 'var(--spacex-success)' : 'var(--spacex-error)'
  }

  const getStatusText = (success) => {
    if (success === null) return 'PENDING'
    return success ? 'SUCCESS' : 'FAILED'
  }

  return (
    <div className="launch-list-page">
      <div className="page-header">
        <h1 className="page-title">
          <span className="title-prefix">Launches</span>
          Mission List
        </h1>
        <div className="page-stats">
          <span className="stat-item">
            Total: <strong>{launches.length}</strong>
          </span>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <span className="error-icon">⚠</span>
          {error}
        </div>
      )}

      <div className="launches-grid">
        {launches.map((launch) => (
          <Link
            key={launch.id}
            to={`/launch/${launch.id}`}
            className="launch-card"
          >
            <div className="card-header">
              <div className="card-id">Mission #{launch.flight_number || 'N/A'}</div>
              <div
                className="card-status"
                style={{ 
                  color: getStatusColor(launch.success),
                  backgroundColor: getStatusColor(launch.success) + '20'
                }}
              >
                {getStatusText(launch.success)}
              </div>
            </div>
            <div className="card-body">
              <h3 className="card-name">{launch.name || 'Unknown Mission'}</h3>
              <div className="card-details">
                <div className="detail-item">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">{formatDate(launch.date_utc)}</span>
                </div>
                {launch.rocket && (
                  <div className="detail-item">
                    <span className="detail-label">Rocket:</span>
                    <span className="detail-value">ID: {launch.rocket}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="card-footer">
              <span className="card-link">View Details →</span>
            </div>
          </Link>
        ))}
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <span>Loading missions...</span>
        </div>
      )}

      {!loading && hasMore && !error && (
        <div className="load-more-container">
          <button
            className="load-more-btn"
            onClick={() => setPage(prev => prev + 1)}
          >
            Load More Missions
          </button>
        </div>
      )}

      {!hasMore && launches.length > 0 && (
        <div className="end-message">
          All missions loaded
        </div>
      )}
    </div>
  )
}

export default LaunchList

