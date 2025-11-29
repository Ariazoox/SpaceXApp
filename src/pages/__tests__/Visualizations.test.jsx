import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Visualizations from '../Visualizations'
import { spacexApi } from '../../services/spacexApi'

vi.mock('../../services/spacexApi')

describe('Visualizations', () => {
  const mockLaunches = [
    {
      id: '1',
      date_utc: '2023-01-01T00:00:00.000Z',
      success: true,
    },
    {
      id: '2',
      date_utc: '2023-02-01T00:00:00.000Z',
      success: false,
    },
    {
      id: '3',
      date_utc: '2023-03-01T00:00:00.000Z',
      success: true,
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('displays visualizations', async () => {
    spacexApi.getAllLaunches.mockResolvedValue(mockLaunches)

    render(
      <MemoryRouter>
        <Visualizations />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(/Data Visualizations/i)).toBeInTheDocument()
      expect(screen.getByText(/Success\/Failure Distribution/i)).toBeInTheDocument()
    })
  })

  it('displays loading message', () => {
    spacexApi.getAllLaunches.mockImplementation(
      () => new Promise(() => {})
    )

    render(
      <MemoryRouter>
        <Visualizations />
      </MemoryRouter>
    )

    expect(screen.getByText(/Loading analytics/i)).toBeInTheDocument()
  })

  it('displays error message on failure', async () => {
    spacexApi.getAllLaunches.mockRejectedValue(new Error('API Error'))

    render(
      <MemoryRouter>
        <Visualizations />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(/Error loading data/i)).toBeInTheDocument()
    })
  })
})

