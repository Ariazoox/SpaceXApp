import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import LaunchDetail from '../LaunchDetail'
import { spacexApi } from '../../services/spacexApi'

vi.mock('../../services/spacexApi')

describe('LaunchDetail', () => {
  const mockLaunch = {
    id: '1',
    name: 'Test Mission',
    flight_number: 1,
    date_utc: '2023-01-01T00:00:00.000Z',
    success: true,
    details: 'Test details',
    rocket: 'rocket1',
    launchpad: 'launchpad1',
    links: {
      presskit: 'https://example.com/presskit',
      webcast: 'https://example.com/webcast',
    },
  }

  const mockRocket = {
    id: 'rocket1',
    name: 'Falcon 9',
    type: 'rocket',
    description: 'Test rocket description',
  }

  const mockLaunchpad = {
    id: 'launchpad1',
    name: 'Launch Complex 39A',
    locality: 'Cape Canaveral',
    region: 'Florida',
    details: 'Test launchpad details',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('displays launch details', async () => {
    spacexApi.getLaunchById.mockResolvedValue(mockLaunch)
    spacexApi.getRocket.mockResolvedValue(mockRocket)
    spacexApi.getLaunchpad.mockResolvedValue(mockLaunchpad)

    render(
      <MemoryRouter initialEntries={['/launch/1']}>
        <LaunchDetail />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Test Mission')).toBeInTheDocument()
      expect(screen.getByText('Falcon 9')).toBeInTheDocument()
      expect(screen.getByText('Launch Complex 39A')).toBeInTheDocument()
    })
  })

  it('displays loading message', () => {
    spacexApi.getLaunchById.mockImplementation(
      () => new Promise(() => {})
    )

    render(
      <MemoryRouter initialEntries={['/launch/1']}>
        <LaunchDetail />
      </MemoryRouter>
    )

    expect(screen.getByText(/Loading mission data/i)).toBeInTheDocument()
  })

  it('displays error message if launch does not exist', async () => {
    spacexApi.getLaunchById.mockRejectedValue(new Error('Not found'))

    render(
      <MemoryRouter initialEntries={['/launch/1']}>
        <LaunchDetail />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(/Error loading mission details/i)).toBeInTheDocument()
    })
  })
})

