import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import LaunchList from '../LaunchList'
import { spacexApi } from '../../services/spacexApi'

vi.mock('../../services/spacexApi')

describe('LaunchList', () => {
  const mockLaunches = {
    docs: [
      {
        id: '1',
        name: 'Test Mission 1',
        flight_number: 1,
        date_utc: '2023-01-01T00:00:00.000Z',
        success: true,
        rocket: 'rocket1',
      },
      {
        id: '2',
        name: 'Test Mission 2',
        flight_number: 2,
        date_utc: '2023-02-01T00:00:00.000Z',
        success: false,
        rocket: 'rocket2',
      },
    ],
    hasNextPage: false,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('displays the list of launches', async () => {
    spacexApi.getLaunches.mockResolvedValue(mockLaunches)

    render(
      <MemoryRouter>
        <LaunchList />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Test Mission 1')).toBeInTheDocument()
      expect(screen.getByText('Test Mission 2')).toBeInTheDocument()
    })
  })

  it('displays loading message', () => {
    spacexApi.getLaunches.mockImplementation(
      () => new Promise(() => {}) // Promise that never resolves
    )

    render(
      <MemoryRouter>
        <LaunchList />
      </MemoryRouter>
    )

    expect(screen.getByText(/Loading missions/i)).toBeInTheDocument()
  })

  it('displays error message on failure', async () => {
    spacexApi.getLaunches.mockRejectedValue(new Error('API Error'))

    render(
      <MemoryRouter>
        <LaunchList />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(/Error loading missions/i)).toBeInTheDocument()
    })
  })
})

