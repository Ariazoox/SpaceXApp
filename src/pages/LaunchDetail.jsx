import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { spacexApi } from '../services/spacexApi'
import './LaunchDetail.css'

function LaunchDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [launch, setLaunch] = useState(null)
  const [rocket, setRocket] = useState(null)
  const [launchpad, setLaunchpad] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadLaunchDetails()
  }, [id])

  const loadLaunchDetails = async () => {
    try {
      setLoading(true)
      setError(null)
      const launchData = await spacexApi.getLaunchById(id)
      setLaunch(launchData)

      if (launchData.rocket) {
        try {
          const rocketData = await spacexApi.getRocket(launchData.rocket)
          setRocket(rocketData)
        } catch (err) {
          console.error('Error loading rocket:', err)
        }
      }

      if (launchData.launchpad) {
        try {
          const launchpadData = await spacexApi.getLaunchpad(launchData.launchpad)
          setLaunchpad(launchpadData)
        } catch (err) {
          console.error('Error loading launchpad:', err)
        }
      }
    } catch (err) {
      setError('Error loading mission details')
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

  if (loading) {
    return (
        <div className="loading-container">
        <div className="loading-spinner"></div>
        <span>Loading mission data...</span>
      </div>
    )
  }

  if (error || !launch) {
    return (
      <div className="error-container">
        <div className="error-message">
          <span className="error-icon">⚠</span>
          {error || 'Mission not found'}
        </div>
        <Link to="/" className="back-link">
          ← Back to List
        </Link>
      </div>
    )
  }

  return (
    <div className="launch-detail-page">
      <div className="detail-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1 className="detail-title">
          <span className="title-prefix">Mission Details</span>
          {launch.name || 'Unknown Mission'}
        </h1>
      </div>

      <div className="detail-grid">
        <div className="detail-section">
          <div className="section-header">
            General Information
          </div>
          <div className="section-content">
            <div className="info-row">
              <span className="info-label">Flight Number:</span>
              <span className="info-value">{launch.flight_number || 'N/A'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Launch Date:</span>
              <span className="info-value">{formatDate(launch.date_utc)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Status:</span>
              <span
                className="info-value status-badge"
                style={{ 
                  color: getStatusColor(launch.success),
                  backgroundColor: getStatusColor(launch.success) + '20'
                }}
              >
                {getStatusText(launch.success)}
              </span>
            </div>
            {launch.details && (
              <div className="info-row full-width">
                <span className="info-label">Details:</span>
                <span className="info-value">{launch.details}</span>
              </div>
            )}
          </div>
        </div>

        {rocket && (
          <div className="detail-section">
            <div className="section-header">
              Rocket
            </div>
            <div className="section-content">
              <div className="info-row">
                <span className="info-label">Name:</span>
                <span className="info-value">{rocket.name || 'N/A'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Type:</span>
                <span className="info-value">{rocket.type || 'N/A'}</span>
              </div>
              {rocket.description && (
                <div className="info-row full-width">
                  <span className="info-label">Description:</span>
                  <span className="info-value">{rocket.description}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {launchpad && (
          <div className="detail-section">
            <div className="section-header">
              Launch Site
            </div>
            <div className="section-content">
              <div className="info-row">
                <span className="info-label">Name:</span>
                <span className="info-value">{launchpad.name || 'N/A'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Location:</span>
                <span className="info-value">
                  {launchpad.locality || 'N/A'}, {launchpad.region || 'N/A'}
                </span>
              </div>
              {launchpad.details && (
                <div className="info-row full-width">
                  <span className="info-label">Details:</span>
                  <span className="info-value">{launchpad.details}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {launch.links && (
          <div className="detail-section">
            <div className="section-header">
              Links
            </div>
            <div className="section-content">
              {launch.links.presskit && (
                <a
                  href={launch.links.presskit}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                >
                  Press Kit →
                </a>
              )}
              {launch.links.webcast && (
                <a
                  href={launch.links.webcast}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                >
                  Video →
                </a>
              )}
              {launch.links.article && (
                <a
                  href={launch.links.article}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                >
                  Article →
                </a>
              )}
              {launch.links.wikipedia && (
                <a
                  href={launch.links.wikipedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                >
                  Wikipedia →
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LaunchDetail

