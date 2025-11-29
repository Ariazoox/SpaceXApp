import { useState, useEffect } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { spacexApi } from '../services/spacexApi'
import './Visualizations.css'

function Visualizations() {
  const [launches, setLaunches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await spacexApi.getAllLaunches()
      setLaunches(data)
    } catch (err) {
      setError('Error loading data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getSuccessData = () => {
    const success = launches.filter(l => l.success === true).length
    const failed = launches.filter(l => l.success === false).length
    const pending = launches.filter(l => l.success === null).length

    return [
      { name: 'Success', value: success, color: '#27ae60' },
      { name: 'Failed', value: failed, color: '#e74c3c' },
      { name: 'Pending', value: pending, color: '#f39c12' },
    ]
  }

  const getLaunchesByYear = () => {
    const yearMap = {}
    launches.forEach(launch => {
      if (launch.date_utc) {
        const year = new Date(launch.date_utc).getFullYear()
        yearMap[year] = (yearMap[year] || 0) + 1
      }
    })

    return Object.entries(yearMap)
      .map(([year, count]) => ({ year: parseInt(year), count }))
      .sort((a, b) => a.year - b.year)
      .slice(-10) // Last 10 years
  }

  const getLaunchDistribution = () => {
    const ranges = [
      { range: '2010-2012', min: 2010, max: 2012 },
      { range: '2013-2015', min: 2013, max: 2015 },
      { range: '2016-2018', min: 2016, max: 2018 },
      { range: '2019-2021', min: 2019, max: 2021 },
      { range: '2022-2024', min: 2022, max: 2024 },
    ]

    return ranges.map(({ range, min, max }) => {
      const count = launches.filter(launch => {
        if (!launch.date_utc) return false
        const year = new Date(launch.date_utc).getFullYear()
        return year >= min && year <= max
      }).length
      return { range, count }
    })
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{payload[0].name || payload[0].payload.name}</p>
          <p className="tooltip-value" style={{ color: payload[0].color }}>
            {payload[0].value}
          </p>
        </div>
      )
    }
    return null
  }

  if (loading) {
    return (
        <div className="loading-container">
        <div className="loading-spinner"></div>
        <span>Loading analytics...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <span className="error-icon">⚠</span>
          {error}
        </div>
      </div>
    )
  }

  const successData = getSuccessData()
  const launchesByYear = getLaunchesByYear()
  const distribution = getLaunchDistribution()

  return (
    <div className="visualizations-page">
      <div className="page-header">
        <h1 className="page-title">
          <span className="title-prefix">Analytics</span>
          Data Visualizations
        </h1>
        <div className="page-stats">
          <span className="stat-item">
            Total Missions: <strong>{launches.length}</strong>
          </span>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-section">
          <div className="chart-header">
            Success/Failure Distribution
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={successData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {successData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-section">
          <div className="chart-header">
            Launches by Year (Last 10 Years)
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={launchesByYear}>
                <CartesianGrid strokeDasharray="3 3" stroke="#34495e" />
                <XAxis
                  dataKey="year"
                  stroke="#bdc3c7"
                  style={{ fontFamily: 'inherit' }}
                />
                <YAxis
                  stroke="#bdc3c7"
                  style={{ fontFamily: 'inherit' }}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  contentStyle={{
                    backgroundColor: '#2c3e50',
                    border: '1px solid #005288',
                    color: '#ffffff',
                    borderRadius: '4px',
                  }}
                />
                <Bar dataKey="count" fill="#005288" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-section full-width">
          <div className="chart-header">
            Launch Distribution by Period
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={distribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#34495e" />
                <XAxis
                  dataKey="range"
                  stroke="#bdc3c7"
                  style={{ fontFamily: 'inherit' }}
                />
                <YAxis
                  stroke="#bdc3c7"
                  style={{ fontFamily: 'inherit' }}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  contentStyle={{
                    backgroundColor: '#2c3e50',
                    border: '1px solid #005288',
                    color: '#ffffff',
                    borderRadius: '4px',
                  }}
                />
                <Bar dataKey="count" fill="#005288" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Visualizations

