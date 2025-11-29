import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Layout from '../Layout'

describe('Layout', () => {
  it('displays header with title', () => {
    render(
      <MemoryRouter>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: /SPACEX/i })).toBeInTheDocument()
  })

  it('displays navigation', () => {
    render(
      <MemoryRouter>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </MemoryRouter>
    )

    expect(screen.getByText(/Launches/i)).toBeInTheDocument()
    expect(screen.getByText(/Analytics/i)).toBeInTheDocument()
  })

  it('displays children content', () => {
    render(
      <MemoryRouter>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </MemoryRouter>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })
})

